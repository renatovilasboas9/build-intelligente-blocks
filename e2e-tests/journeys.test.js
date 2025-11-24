const axios = require('axios');

const API_URL = 'http://localhost:3001';

describe('Jornadas E2E', () => {
  beforeAll(async () => {
    // Aguardar backend estar pronto
    let attempts = 0;
    while (attempts < 30) {
      try {
        await axios.get(`${API_URL}/health`);
        break;
      } catch (error) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  });

  describe('Jornada 1: Carla - Fluxo Padrão', () => {
    it('deve completar jornada com sucesso', async () => {
      // 1. Login
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        cpf: '11111111111',
        password: '123456',
        journeyName: 'carla_default'
      });
      
      expect(loginResponse.status).toBe(200);
      expect(loginResponse.data.success).toBe(true);
      expect(loginResponse.data.user.name).toBe('Carla');
      
      // 2. Simulação
      const simulationResponse = await axios.post(`${API_URL}/loan/simulate`, {
        cpf: '11111111111',
        amount: 10000,
        installments: 12,
        journeyName: 'carla_default'
      });
      
      expect(simulationResponse.status).toBe(200);
      expect(simulationResponse.data.success).toBe(true);
      expect(simulationResponse.data.simulation).toBeDefined();
      
      const simulationId = simulationResponse.data.simulation.id;
      
      // 3. Contratação
      const contractResponse = await axios.post(`${API_URL}/loan/contract`, {
        cpf: '11111111111',
        simulationId,
        journeyName: 'carla_default'
      });
      
      expect(contractResponse.status).toBe(200);
      expect(contractResponse.data.status).toBe('APPROVED');
    });
  });

  describe('Jornada 2: Jorge - Alta Latência', () => {
    it('deve detectar fricção de latência', async () => {
      // 1. Login
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        cpf: '22222222222',
        password: '123456',
        journeyName: 'jorge_high_latency'
      });
      
      expect(loginResponse.status).toBe(200);
      
      // 2. Simulação com delay
      const startTime = Date.now();
      const simulationResponse = await axios.post(`${API_URL}/loan/simulate`, {
        cpf: '22222222222',
        amount: 15000,
        installments: 24,
        journeyName: 'jorge_high_latency'
      });
      const duration = Date.now() - startTime;
      
      expect(simulationResponse.status).toBe(200);
      expect(duration).toBeGreaterThan(3000); // Deve ter delay de 3.5s
      
      // 3. Verificar métricas de fricção
      const metricsResponse = await axios.get(`${API_URL}/intelligence/metrics`);
      expect(metricsResponse.data.frictionPoints).toBeDefined();
      
      const latencyFriction = metricsResponse.data.frictionPoints.find(
        fp => fp.type === 'loan_simulation_latency_high'
      );
      expect(latencyFriction).toBeDefined();
    });
  });

  describe('Jornada 3: Marcos - Contrato Rejeitado', () => {
    it('deve rejeitar contrato e calcular receita perdida', async () => {
      // 1. Login
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        cpf: '33333333333',
        password: '123456',
        journeyName: 'marcos_rejected'
      });
      
      expect(loginResponse.status).toBe(200);
      
      // 2. Simulação
      const simulationResponse = await axios.post(`${API_URL}/loan/simulate`, {
        cpf: '33333333333',
        amount: 20000,
        installments: 36,
        journeyName: 'marcos_rejected'
      });
      
      expect(simulationResponse.status).toBe(200);
      const simulationId = simulationResponse.data.simulation.id;
      
      // 3. Contratação (deve ser rejeitada)
      const contractResponse = await axios.post(`${API_URL}/loan/contract`, {
        cpf: '33333333333',
        simulationId,
        journeyName: 'marcos_rejected'
      });
      
      expect(contractResponse.status).toBe(200);
      expect(contractResponse.data.status).toBe('REJECTED');
      expect(contractResponse.data.reason).toBe('RISK_POLICY');
      
      // 4. Verificar receita perdida nas métricas
      const metricsResponse = await axios.get(`${API_URL}/intelligence/metrics`);
      expect(metricsResponse.data.revenueLost).toBeGreaterThan(0);
    });
  });
});
