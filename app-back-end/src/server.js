const express = require('express');
const cors = require('cors');
const path = require('path');

// Importar configurações
const demoUsers = require('../../configs/demoUsers-js');
const demoJourneys = require('../../configs/demoJourneys-js');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Armazenamento em memória
const events = [];
const simulations = new Map();
const loginAttempts = new Map();
let eventIdCounter = 1;
let simulationIdCounter = 1;

// Função auxiliar para capturar eventos
function captureEvent(userId, type, metadata = {}, journeyName = null, abVariant = null) {
  const event = {
    id: `evt_${eventIdCounter++}`,
    userId,
    type,
    timestamp: new Date(),
    metadata,
    journeyName,
    abVariant
  };
  events.push(event);
  console.log(`📊 Evento capturado: ${type} - User: ${userId}`);
  return event;
}

// Função para calcular parcela
function calculateInstallment(principal, rate, periods) {
  const x = Math.pow(1 + rate, periods);
  return (principal * x * rate) / (x - 1);
}

// Função para delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
    version: '1.0.0',
    endpoints: {
      auth: ['POST /auth/login', 'POST /auth/verify-device'],
      loan: ['POST /loan/simulate', 'POST /loan/contract'],
      intelligence: [
        'GET /intelligence/metrics',
        'GET /intelligence/recommendations',
        'GET /intelligence/ab-results',
        'GET /intelligence/friction-points'
      ]
    }
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Demo de Data Products - Backend API',
    status: 'running',
    health: '/health',
    docs: 'Ver README.md para documentação completa'
  });
});

// ============================================
// ROTAS DE AUTENTICAÇÃO
// ============================================

app.post('/auth/login', async (req, res) => {
  const { cpf, password, journeyName } = req.body;

  if (!cpf || !password) {
    return res.status(400).json({ message: 'CPF e senha são obrigatórios' });
  }

  const user = demoUsers.findUserByCpf(cpf);
  
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const activeJourney = journeyName || demoUsers.getUserDefaultJourney(cpf);
  const journeyConfig = demoJourneys.getJourneyConfig(activeJourney);

  if (!journeyConfig) {
    return res.status(400).json({ message: 'Jornada não configurada' });
  }

  const attempts = loginAttempts.get(cpf) || 0;
  
  if (journeyConfig.login.failFirstAttempt && attempts === 0) {
    loginAttempts.set(cpf, attempts + 1);
    
    captureEvent(
      user.id,
      'login_failed',
      { cpf, reason: 'password_incorrect', attempt: 1 },
      activeJourney
    );

    return res.status(401).json({ message: 'Senha incorreta' });
  }

  loginAttempts.set(cpf, 0);

  captureEvent(
    user.id,
    'login_success',
    { cpf, attempt: attempts + 1 },
    activeJourney
  );

  if (journeyConfig.login.requireDeviceVerification) {
    captureEvent(
      user.id,
      'device_verification_required',
      { cpf },
      activeJourney
    );

    return res.json({
      success: true,
      requiresDeviceVerification: true,
      user: {
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        profile: user.profile
      },
      journeyName: activeJourney
    });
  }

  res.json({
    success: true,
    requiresDeviceVerification: false,
    user: {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      profile: user.profile
    },
    journeyName: activeJourney,
    token: `token_${user.id}_${Date.now()}`
  });
});

app.post('/auth/verify-device', async (req, res) => {
  const { cpf, code, journeyName } = req.body;

  if (!cpf || !code) {
    return res.status(400).json({ message: 'CPF e código são obrigatórios' });
  }

  const user = demoUsers.findUserByCpf(cpf);
  
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const activeJourney = journeyName || demoUsers.getUserDefaultJourney(cpf);

  captureEvent(
    user.id,
    'device_verification_success',
    { cpf, code },
    activeJourney
  );

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      profile: user.profile
    },
    journeyName: activeJourney,
    token: `token_${user.id}_${Date.now()}`
  });
});

// ============================================
// ROTAS DE EMPRÉSTIMO
// ============================================

app.post('/loan/simulate', async (req, res) => {
  const { cpf, amount, installments, journeyName } = req.body;

  if (!cpf || !amount || !installments) {
    return res.status(400).json({ message: 'Dados incompletos' });
  }

  const user = demoUsers.findUserByCpf(cpf);
  
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const activeJourney = journeyName || demoUsers.getUserDefaultJourney(cpf);
  const journeyConfig = demoJourneys.getJourneyConfig(activeJourney);

  if (!journeyConfig) {
    return res.status(400).json({ message: 'Jornada não configurada' });
  }

  const startTime = Date.now();

  captureEvent(
    user.id,
    'loan_simulation_start',
    { cpf, amount, installments },
    activeJourney,
    journeyConfig.abTest.variant
  );

  if (journeyConfig.simulation.delayMs) {
    await delay(journeyConfig.simulation.delayMs);
  }

  const endTime = Date.now();
  const duration = endTime - startTime;

  if (
    journeyConfig.simulation.emitFrictionEventIfDelayAboveMs &&
    duration > journeyConfig.simulation.emitFrictionEventIfDelayAboveMs
  ) {
    captureEvent(
      user.id,
      'loan_simulation_latency_high',
      { cpf, duration, threshold: journeyConfig.simulation.emitFrictionEventIfDelayAboveMs },
      activeJourney,
      journeyConfig.abTest.variant
    );
  }

  if (journeyConfig.simulation.forceError) {
    captureEvent(
      user.id,
      'loan_simulation_error',
      { cpf, reason: 'forced_error' },
      activeJourney,
      journeyConfig.abTest.variant
    );

    return res.status(500).json({ message: 'Erro na simulação' });
  }

  const interestRate = 0.0299;
  const installmentValue = calculateInstallment(amount, interestRate, installments);
  const totalAmount = installmentValue * installments;

  const simulationId = `sim_${simulationIdCounter++}`;
  const simulation = {
    id: simulationId,
    cpf,
    amount,
    installments,
    installmentValue,
    totalAmount,
    interestRate,
    createdAt: new Date()
  };

  simulations.set(simulationId, simulation);

  captureEvent(
    user.id,
    'loan_simulation_complete',
    { ...simulation, duration },
    activeJourney,
    journeyConfig.abTest.variant
  );

  res.json({
    success: true,
    simulation
  });
});

app.post('/loan/contract', async (req, res) => {
  const { cpf, simulationId, journeyName } = req.body;

  if (!cpf || !simulationId) {
    return res.status(400).json({ message: 'Dados incompletos' });
  }

  const user = demoUsers.findUserByCpf(cpf);
  
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const simulation = simulations.get(simulationId);
  
  if (!simulation) {
    return res.status(404).json({ message: 'Simulação não encontrada' });
  }

  const activeJourney = journeyName || demoUsers.getUserDefaultJourney(cpf);
  const journeyConfig = demoJourneys.getJourneyConfig(activeJourney);

  if (!journeyConfig) {
    return res.status(400).json({ message: 'Jornada não configurada' });
  }

  captureEvent(
    user.id,
    'loan_contract_start',
    { cpf, simulationId },
    activeJourney,
    journeyConfig.abTest.variant
  );

  if (journeyConfig.contract.status === 'REJECTED') {
    captureEvent(
      user.id,
      'loan_contract_rejected',
      { 
        cpf, 
        simulationId, 
        reason: journeyConfig.contract.rejectionReason,
        potentialRevenue: simulation.totalAmount
      },
      activeJourney,
      journeyConfig.abTest.variant
    );

    return res.json({
      success: false,
      status: 'REJECTED',
      reason: journeyConfig.contract.rejectionReason,
      message: 'Contrato não aprovado pela política de risco'
    });
  }

  const contractId = `contract_${Date.now()}`;

  captureEvent(
    user.id,
    'loan_contract_approved',
    { 
      cpf, 
      simulationId, 
      contractId,
      revenue: simulation.totalAmount
    },
    activeJourney,
    journeyConfig.abTest.variant
  );

  captureEvent(
    user.id,
    'ab_conversion',
    { 
      cpf, 
      variant: journeyConfig.abTest.variant,
      revenue: simulation.totalAmount
    },
    activeJourney,
    journeyConfig.abTest.variant
  );

  res.json({
    success: true,
    status: 'APPROVED',
    contractId,
    simulation
  });
});

// ============================================
// ROTAS DE INTELLIGENCE
// ============================================

app.get('/intelligence/metrics', (req, res) => {
  const frictionEvents = events.filter(e => 
    ['login_failed', 'password_incorrect', 'device_verification_required', 
     'loan_simulation_latency_high', 'loan_contract_rejected', 'friction_dropoff'].includes(e.type)
  );
  
  const uniqueUsers = new Set(events.map(e => e.userId)).size;
  const conversions = events.filter(e => e.type === 'loan_contract_approved').length;
  const conversionRate = uniqueUsers > 0 ? (conversions / uniqueUsers) * 100 : 0;
  
  const revenueEvents = events.filter(e => e.type === 'loan_contract_approved');
  const revenueCapture = revenueEvents.reduce((sum, e) => sum + (e.metadata.revenue || 0), 0);
  
  const lostRevenueEvents = events.filter(e => e.type === 'loan_contract_rejected');
  const revenueLost = lostRevenueEvents.reduce((sum, e) => sum + (e.metadata.potentialRevenue || 0), 0);
  
  const frictionByType = {};
  frictionEvents.forEach(event => {
    if (!frictionByType[event.type]) {
      frictionByType[event.type] = {
        type: event.type,
        count: 0,
        users: new Set(),
        totalImpact: 0
      };
    }
    frictionByType[event.type].count++;
    frictionByType[event.type].users.add(event.userId);
    
    if (event.type === 'loan_contract_rejected') {
      frictionByType[event.type].totalImpact += event.metadata.potentialRevenue || 0;
    } else if (event.type === 'loan_simulation_latency_high') {
      frictionByType[event.type].totalImpact += 5000;
    } else {
      frictionByType[event.type].totalImpact += 2000;
    }
  });

  const frictionPoints = Object.values(frictionByType).map(fp => ({
    type: fp.type,
    count: fp.count,
    affectedUsers: fp.users.size,
    estimatedImpact: Math.round(fp.totalImpact * 100) / 100
  }));

  const abEvents = events.filter(e => e.abVariant);
  const variantA = abEvents.filter(e => e.abVariant === 'A');
  const variantB = abEvents.filter(e => e.abVariant === 'B');
  
  const conversionsA = variantA.filter(e => e.type === 'ab_conversion').length;
  const conversionsB = variantB.filter(e => e.type === 'ab_conversion').length;
  
  const usersA = new Set(variantA.map(e => e.userId)).size;
  const usersB = new Set(variantB.map(e => e.userId)).size;
  
  const conversionRateA = usersA > 0 ? (conversionsA / usersA) * 100 : 0;
  const conversionRateB = usersB > 0 ? (conversionsB / usersB) * 100 : 0;
  
  const revenueA = variantA
    .filter(e => e.type === 'ab_conversion')
    .reduce((sum, e) => sum + (e.metadata.revenue || 0), 0);
  
  const revenueB = variantB
    .filter(e => e.type === 'ab_conversion')
    .reduce((sum, e) => sum + (e.metadata.revenue || 0), 0);

  res.json({
    totalUsers: uniqueUsers,
    totalEvents: events.length,
    conversions,
    conversionRate: Math.round(conversionRate * 100) / 100,
    revenueCapture: Math.round(revenueCapture * 100) / 100,
    revenueLost: Math.round(revenueLost * 100) / 100,
    totalRevenuePotential: Math.round((revenueCapture + revenueLost) * 100) / 100,
    frictionPoints,
    abTestResults: {
      variantA: {
        users: usersA,
        conversions: conversionsA,
        conversionRate: Math.round(conversionRateA * 100) / 100,
        revenue: Math.round(revenueA * 100) / 100
      },
      variantB: {
        users: usersB,
        conversions: conversionsB,
        conversionRate: Math.round(conversionRateB * 100) / 100,
        revenue: Math.round(revenueB * 100) / 100
      },
      winner: conversionRateB > conversionRateA ? 'B' : 'A',
      improvement: Math.round(Math.abs(conversionRateB - conversionRateA) * 100) / 100
    },
    timestamp: new Date()
  });
});

app.get('/intelligence/recommendations', (req, res) => {
  const { cpf } = req.query;
  
  const user = demoUsers.findUserByCpf(cpf);
  
  if (!user) {
    return res.json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }

  const userEvents = events.filter(e => e.userId === user.id);
  const frictionEvents = userEvents.filter(e => 
    ['login_failed', 'loan_simulation_latency_high', 'loan_contract_rejected'].includes(e.type)
  );

  const recommendations = [];

  if (frictionEvents.some(e => e.type === 'login_failed')) {
    recommendations.push({
      type: 'reduce_auth_friction',
      priority: 'high',
      action: 'Implementar autenticação biométrica',
      impact: 'Redução de 40% em falhas de login',
      estimatedRevenue: 15000
    });
  }

  if (frictionEvents.some(e => e.type === 'loan_simulation_latency_high')) {
    recommendations.push({
      type: 'optimize_performance',
      priority: 'critical',
      action: 'Otimizar API de simulação',
      impact: 'Redução de 60% no tempo de resposta',
      estimatedRevenue: 50000
    });
  }

  if (frictionEvents.some(e => e.type === 'loan_contract_rejected')) {
    recommendations.push({
      type: 'improve_approval_rate',
      priority: 'high',
      action: 'Revisar política de risco',
      impact: 'Aumento de 25% em aprovações',
      estimatedRevenue: 80000
    });
  }

  if (user.profile === 'premium' || userEvents.length > 5) {
    recommendations.push({
      type: 'personalization',
      priority: 'medium',
      action: 'Ativar fluxo personalizado',
      impact: 'Aumento de 35% na conversão',
      estimatedRevenue: 45000,
      details: {
        showPremiumOffer: true,
        reduceSteps: true,
        prefillForm: true,
        highlightCTA: true
      }
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      profile: user.profile
    },
    frictionCount: frictionEvents.length,
    recommendations,
    timestamp: new Date()
  });
});

app.get('/intelligence/journey/:userId', (req, res) => {
  const { userId } = req.params;
  const userEvents = events.filter(e => e.userId === userId);
  
  res.json({
    userId,
    totalEvents: userEvents.length,
    events: userEvents.map(e => ({
      id: e.id,
      type: e.type,
      timestamp: e.timestamp,
      metadata: e.metadata,
      journeyName: e.journeyName,
      abVariant: e.abVariant
    }))
  });
});

app.get('/intelligence/ab-results', (req, res) => {
  const abEvents = events.filter(e => e.abVariant);
  const variantA = abEvents.filter(e => e.abVariant === 'A');
  const variantB = abEvents.filter(e => e.abVariant === 'B');
  
  const conversionsA = variantA.filter(e => e.type === 'ab_conversion').length;
  const conversionsB = variantB.filter(e => e.type === 'ab_conversion').length;
  
  const usersA = new Set(variantA.map(e => e.userId)).size;
  const usersB = new Set(variantB.map(e => e.userId)).size;
  
  const conversionRateA = usersA > 0 ? (conversionsA / usersA) * 100 : 0;
  const conversionRateB = usersB > 0 ? (conversionsB / usersB) * 100 : 0;
  
  const revenueA = variantA
    .filter(e => e.type === 'ab_conversion')
    .reduce((sum, e) => sum + (e.metadata.revenue || 0), 0);
  
  const revenueB = variantB
    .filter(e => e.type === 'ab_conversion')
    .reduce((sum, e) => sum + (e.metadata.revenue || 0), 0);

  res.json({
    variantA: {
      users: usersA,
      conversions: conversionsA,
      conversionRate: Math.round(conversionRateA * 100) / 100,
      revenue: Math.round(revenueA * 100) / 100
    },
    variantB: {
      users: usersB,
      conversions: conversionsB,
      conversionRate: Math.round(conversionRateB * 100) / 100,
      revenue: Math.round(revenueB * 100) / 100
    },
    winner: conversionRateB > conversionRateA ? 'B' : 'A',
    improvement: Math.round(Math.abs(conversionRateB - conversionRateA) * 100) / 100
  });
});

app.get('/intelligence/friction-points', (req, res) => {
  const frictionEvents = events.filter(e => 
    ['login_failed', 'password_incorrect', 'device_verification_required', 
     'loan_simulation_latency_high', 'loan_contract_rejected', 'friction_dropoff'].includes(e.type)
  );
  
  const frictionByType = {};
  frictionEvents.forEach(event => {
    if (!frictionByType[event.type]) {
      frictionByType[event.type] = {
        type: event.type,
        count: 0,
        users: new Set(),
        totalImpact: 0
      };
    }
    frictionByType[event.type].count++;
    frictionByType[event.type].users.add(event.userId);
    
    if (event.type === 'loan_contract_rejected') {
      frictionByType[event.type].totalImpact += event.metadata.potentialRevenue || 0;
    } else if (event.type === 'loan_simulation_latency_high') {
      frictionByType[event.type].totalImpact += 5000;
    } else {
      frictionByType[event.type].totalImpact += 2000;
    }
  });

  const frictionPoints = Object.values(frictionByType).map(fp => ({
    type: fp.type,
    count: fp.count,
    affectedUsers: fp.users.size,
    estimatedImpact: Math.round(fp.totalImpact * 100) / 100
  }));

  res.json(frictionPoints);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('');
  console.log('🚀 Backend rodando em http://localhost:' + PORT);
  console.log('');
  console.log('📊 Endpoints disponíveis:');
  console.log('   POST /auth/login');
  console.log('   POST /auth/verify-device');
  console.log('   POST /loan/simulate');
  console.log('   POST /loan/contract');
  console.log('   GET  /intelligence/metrics');
  console.log('   GET  /intelligence/recommendations');
  console.log('   GET  /intelligence/ab-results');
  console.log('');
});
