# 🚀 Guia de Expansão da Demo

## Como Adicionar Novos Recursos

### 1. Adicionar Novo Usuário

**Arquivo**: `configs/demoUsers.ts`

```typescript
{
  id: 'maria',
  name: 'Maria',
  cpf: '44444444444',
  profile: 'premium',
  journeys: ['maria_vip', 'maria_standard']
}
```

### 2. Criar Nova Jornada

**Arquivo**: `configs/demoJourneys.ts`

```typescript
maria_vip: {
  login: {
    failFirstAttempt: false,
    requireDeviceVerification: false
  },
  simulation: {
    delayMs: 200,  // Super rápido
    forceError: false,
    emitFrictionEventIfDelayAboveMs: 1000
  },
  contract: {
    status: 'APPROVED'
  },
  abTest: {
    variant: 'B'
  },
  personalization: {
    showPremiumOffer: true,
    reduceSteps: true,
    prefillForm: true,
    highlightCTA: true
  }
}
```

### 3. Adicionar Novo Tipo de Fricção

**Backend**: `backend/src/events/events.service.ts`

```typescript
getFrictionEvents(): Event[] {
  const frictionTypes = [
    'login_failed',
    'password_incorrect',
    'device_verification_required',
    'loan_simulation_latency_high',
    'loan_contract_rejected',
    'friction_dropoff',
    'payment_method_failed',  // NOVO
    'document_upload_error'   // NOVO
  ];
  
  return this.events.filter(e => frictionTypes.includes(e.type));
}
```

**Frontend**: Emitir evento

```typescript
eventBus.emit('friction:detected', { 
  type: 'payment_method_failed', 
  metadata: { method: 'credit_card', reason: 'expired' } 
});
```

### 4. Adicionar Nova Métrica

**Backend**: `backend/src/intelligence/intelligence.service.ts`

```typescript
getMetrics() {
  // ... métricas existentes
  
  // NOVA MÉTRICA
  const avgSimulationTime = this.calculateAvgSimulationTime();
  const topFrictionHours = this.getTopFrictionHours();
  
  return {
    // ... métricas existentes
    avgSimulationTime,
    topFrictionHours
  };
}

private calculateAvgSimulationTime(): number {
  const simulations = this.eventsService.getEventsByType('loan_simulation_complete');
  const totalTime = simulations.reduce((sum, e) => sum + (e.metadata.duration || 0), 0);
  return simulations.length > 0 ? totalTime / simulations.length : 0;
}
```

**Frontend**: Exibir métrica

```typescript
<div className="bg-gray-800 rounded-lg shadow-lg p-6">
  <p className="text-gray-400 text-sm mb-1">Tempo Médio de Simulação</p>
  <p className="text-3xl font-bold text-white">
    {metrics?.avgSimulationTime?.toFixed(0)}ms
  </p>
</div>
```

### 5. Adicionar Nova Tela

**Criar componente**: `frontend/src/pages/ProfilePage.tsx`

```typescript
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p>Nome: {user?.name}</p>
          <p>CPF: {user?.cpf}</p>
          <p>Perfil: {user?.profile}</p>
        </div>
      </div>
    </div>
  );
}
```

**Adicionar rota**: `frontend/src/App.tsx`

```typescript
<Route path="/profile" element={<ProfilePage />} />
```

### 6. Adicionar Novo Endpoint

**Backend**: `backend/src/intelligence/intelligence.controller.ts`

```typescript
@Get('user-segments')
getUserSegments() {
  return this.intelligenceService.getUserSegments();
}
```

**Backend**: `backend/src/intelligence/intelligence.service.ts`

```typescript
getUserSegments() {
  const allEvents = this.eventsService.getAllEvents();
  
  // Segmentar usuários por comportamento
  const segments = {
    highValue: [],
    atRisk: [],
    engaged: []
  };
  
  // Lógica de segmentação...
  
  return segments;
}
```

**Frontend**: Consumir endpoint

```typescript
const segments = await api.getUserSegments();
```

### 7. Adicionar Personalização Avançada

**Backend**: `backend/src/intelligence/intelligence.service.ts`

```typescript
getRecommendations(cpf: string) {
  // ... código existente
  
  // NOVA RECOMENDAÇÃO
  if (this.shouldShowCashbackOffer(user)) {
    recommendations.push({
      type: 'cashback_offer',
      priority: 'high',
      action: 'Oferecer cashback de 2%',
      impact: 'Aumento de 20% na conversão',
      estimatedRevenue: 30000,
      details: {
        cashbackPercentage: 2,
        maxAmount: 500
      }
    });
  }
  
  return { recommendations };
}

private shouldShowCashbackOffer(user: any): boolean {
  // Lógica para determinar se deve mostrar cashback
  return user.profile === 'premium' && this.hasHighEngagement(user);
}
```

### 8. Adicionar Gráfico Customizado

**Frontend**: `frontend/src/pages/IntelligencePage.tsx`

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dados
const conversionTrendData = [
  { day: 'Seg', rate: 15 },
  { day: 'Ter', rate: 18 },
  { day: 'Qua', rate: 22 },
  { day: 'Qui', rate: 20 },
  { day: 'Sex', rate: 25 }
];

// Componente
<div className="bg-gray-800 rounded-lg shadow-lg p-6">
  <h3 className="text-2xl font-bold text-white mb-4">
    Tendência de Conversão
  </h3>
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={conversionTrendData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
      <XAxis dataKey="day" stroke="#9CA3AF" />
      <YAxis stroke="#9CA3AF" />
      <Tooltip 
        contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
      />
      <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
</div>
```

### 9. Adicionar Filtros de Data

**Backend**: `backend/src/intelligence/intelligence.controller.ts`

```typescript
@Get('metrics')
getMetrics(
  @Query('startDate') startDate?: string,
  @Query('endDate') endDate?: string
) {
  return this.intelligenceService.getMetrics(startDate, endDate);
}
```

**Backend**: `backend/src/intelligence/intelligence.service.ts`

```typescript
getMetrics(startDate?: string, endDate?: string) {
  let events = this.eventsService.getAllEvents();
  
  // Filtrar por data
  if (startDate) {
    events = events.filter(e => e.timestamp >= new Date(startDate));
  }
  if (endDate) {
    events = events.filter(e => e.timestamp <= new Date(endDate));
  }
  
  // Calcular métricas com eventos filtrados...
}
```

**Frontend**: Adicionar seletor de data

```typescript
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');

const loadMetrics = async () => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const data = await fetch(`/intelligence/metrics?${params}`);
  setMetrics(data);
};
```

### 10. Adicionar Exportação de Dados

**Backend**: `backend/src/intelligence/intelligence.controller.ts`

```typescript
@Get('export/csv')
exportCSV(@Res() res: Response) {
  const metrics = this.intelligenceService.getMetrics();
  const csv = this.intelligenceService.convertToCSV(metrics);
  
  res.header('Content-Type', 'text/csv');
  res.attachment('metrics.csv');
  res.send(csv);
}
```

**Frontend**: Botão de exportação

```typescript
<button
  onClick={() => window.open('http://localhost:3001/intelligence/export/csv')}
  className="px-4 py-2 bg-green-600 text-white rounded-lg"
>
  📥 Exportar CSV
</button>
```

---

## Ideias de Expansão

### Funcionalidades Avançadas

1. **Machine Learning**
   - Predição de churn
   - Recomendação de produtos
   - Detecção de anomalias

2. **Segmentação Avançada**
   - RFM (Recency, Frequency, Monetary)
   - Clustering de usuários
   - Personas automáticas

3. **Alertas Inteligentes**
   - Notificação de fricções críticas
   - Alertas de queda de conversão
   - Sugestões proativas

4. **Testes Multivariados**
   - Mais de 2 variantes
   - Testes simultâneos
   - Análise estatística avançada

5. **Jornadas Dinâmicas**
   - Adaptação em tempo real
   - Regras de negócio complexas
   - Fluxos condicionais

6. **Integração com BI**
   - Conectar com Tableau/PowerBI
   - Dashboards executivos
   - Relatórios automatizados

7. **Gamificação**
   - Pontos por ações
   - Badges de conquistas
   - Ranking de usuários

8. **Chat/Suporte**
   - Chatbot integrado
   - Suporte contextual
   - Histórico de interações

---

## Boas Práticas

### Ao Adicionar Novos Recursos

1. **Mantenha a Simplicidade**
   - Código limpo e legível
   - Comentários quando necessário
   - Evite over-engineering

2. **Siga os Padrões**
   - Use a estrutura existente
   - Mantenha consistência de nomenclatura
   - Respeite a arquitetura

3. **Teste Localmente**
   - Verifique no Debug Panel
   - Teste todas as jornadas
   - Valide métricas

4. **Documente**
   - Atualize README se necessário
   - Comente código complexo
   - Mantenha CHANGELOG

5. **Performance**
   - Evite loops desnecessários
   - Use memoização quando apropriado
   - Otimize queries

---

## Exemplos de Casos de Uso

### 1. E-commerce

```typescript
// Jornada de abandono de carrinho
cart_abandonment: {
  login: { failFirstAttempt: false },
  simulation: { delayMs: 500 },
  contract: { status: 'APPROVED' },
  abTest: { variant: 'A' },
  personalization: {
    showRecoveryOffer: true,
    discountPercentage: 10
  }
}
```

### 2. SaaS

```typescript
// Jornada de trial para paid
trial_conversion: {
  login: { failFirstAttempt: false },
  simulation: { delayMs: 300 },
  contract: { status: 'APPROVED' },
  abTest: { variant: 'B' },
  personalization: {
    showFeatureHighlights: true,
    extendTrial: true
  }
}
```

### 3. Fintech

```typescript
// Jornada de investimento
investment_onboarding: {
  login: { requireDeviceVerification: true },
  simulation: { delayMs: 1000 },
  contract: { status: 'APPROVED' },
  abTest: { variant: 'A' },
  personalization: {
    showRiskProfile: true,
    recommendPortfolio: true
  }
}
```

---

**A demo foi construída para ser facilmente expansível. Divirta-se criando! 🚀**
