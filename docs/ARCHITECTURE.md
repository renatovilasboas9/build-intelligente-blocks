# 🏗️ Arquitetura Técnica

## Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                         MONOREPO                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐         ┌──────────────┐                │
│  │   CONFIGS    │         │   FRONTEND   │                │
│  │              │         │              │                │
│  │ demoUsers.ts │◄────────┤  React +     │                │
│  │ demoJourneys │         │  TypeScript  │                │
│  │     .ts      │         │  + Vite      │                │
│  └──────────────┘         └───────┬──────┘                │
│         ▲                         │                        │
│         │                         │ HTTP                   │
│         │                         │ (CORS)                 │
│         │                 ┌───────▼──────┐                │
│         │                 │   BACKEND    │                │
│         │                 │              │                │
│         └─────────────────┤   NestJS +   │                │
│                           │  TypeScript  │                │
│                           └──────────────┘                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Backend (NestJS)

### Estrutura de Módulos

```
backend/src/
├── main.ts                 # Bootstrap da aplicação
├── app.module.ts           # Módulo raiz
├── auth/                   # Módulo de autenticação
│   ├── auth.controller.ts  # Endpoints de login
│   ├── auth.service.ts     # Lógica de autenticação
│   └── auth.module.ts
├── loan/                   # Módulo de empréstimos
│   ├── loan.controller.ts  # Endpoints de simulação/contrato
│   ├── loan.service.ts     # Lógica de empréstimos
│   └── loan.module.ts
├── intelligence/           # Módulo de inteligência
│   ├── intelligence.controller.ts
│   ├── intelligence.service.ts
│   └── intelligence.module.ts
└── events/                 # Módulo de eventos (Global)
    ├── events.service.ts   # Captura e armazenamento
    └── events.module.ts
```

### Fluxo de Requisição

```
1. Frontend envia requisição
   ↓
2. Controller recebe e valida
   ↓
3. Service identifica usuário e jornada
   ↓
4. Service busca configuração da jornada
   ↓
5. Service aplica comportamento configurado
   ↓
6. EventsService captura evento
   ↓
7. Response retorna ao frontend
```

### Armazenamento In-Memory

```typescript
// EventsService
private events: Event[] = [];

// LoanService
private simulations: Map<string, any> = new Map();

// AuthService
private loginAttempts: Map<string, number> = new Map();
```

**Nota**: Dados são perdidos ao reiniciar o backend (proposital para demo).

---

## Frontend (React)

### Estrutura de Componentes

```
frontend/src/
├── main.tsx                # Entry point
├── App.tsx                 # Router principal
├── lib/
│   ├── eventBus.ts         # Event Bus (mitt)
│   └── api.ts              # Cliente HTTP
├── contexts/
│   ├── AuthContext.tsx     # Estado de autenticação
│   └── JourneyContext.tsx  # Estado de jornada ativa
├── components/
│   └── DebugPanel.tsx      # Painel de debug
└── pages/
    ├── LoginPage.tsx
    ├── DeviceVerificationPage.tsx
    ├── HomePage.tsx
    ├── LoanSimulationPage.tsx
    ├── LoanConfirmationPage.tsx
    ├── AnalyticsPage.tsx
    └── IntelligencePage.tsx
```

### Event Bus (mitt)

```typescript
// Emitir evento
eventBus.emit('loan:simulation:start', { cpf, amount });

// Escutar evento
eventBus.on('loan:simulation:complete', (data) => {
  console.log('Simulação completa:', data);
});

// Escutar todos os eventos
eventBus.on('*', (type, data) => {
  console.log(`Evento: ${type}`, data);
});
```

### Fluxo de Eventos

```
1. Usuário interage com UI
   ↓
2. Componente emite evento no Event Bus
   ↓
3. API call para backend
   ↓
4. Backend processa e retorna
   ↓
5. Componente emite evento de sucesso/erro
   ↓
6. JourneyContext captura para log
   ↓
7. DebugPanel exibe em tempo real
```

---

## Configurações (configs/)

### demoUsers.ts

Define usuários disponíveis na demo:

```typescript
{
  id: string,           // Identificador único
  name: string,         // Nome para exibição
  cpf: string,          // CPF (usado como login)
  profile: string,      // standard | premium
  journeys: string[]    // Jornadas disponíveis
}
```

### demoJourneys.ts

Define comportamentos de cada jornada:

```typescript
{
  login: {
    failFirstAttempt?: boolean,
    requireDeviceVerification?: boolean
  },
  simulation: {
    delayMs?: number,
    forceError?: boolean,
    emitFrictionEventIfDelayAboveMs?: number
  },
  contract: {
    status: 'APPROVED' | 'REJECTED',
    rejectionReason?: string
  },
  abTest: {
    variant: 'A' | 'B'
  },
  personalization?: {
    showPremiumOffer?: boolean,
    reduceSteps?: boolean,
    prefillForm?: boolean,
    highlightCTA?: boolean
  }
}
```

---

## Motor de Jornadas

### Como Funciona

1. **Seleção de Jornada**
   - Usuário seleciona no Debug Panel
   - Armazenado no JourneyContext
   - Enviado em todas as requisições

2. **Aplicação de Comportamento**
   ```typescript
   // Backend identifica jornada
   const journeyConfig = getJourneyConfig(journeyName);
   
   // Aplica comportamento
   if (journeyConfig.login.failFirstAttempt) {
     throw new Error('Senha incorreta');
   }
   ```

3. **Captura de Eventos**
   ```typescript
   eventsService.captureEvent(
     userId,
     'login_failed',
     { reason: 'password_incorrect' },
     journeyName
   );
   ```

---

## Data Product Intelligence

### Cálculo de Métricas

```typescript
// Usuários únicos
const uniqueUsers = new Set(events.map(e => e.userId)).size;

// Taxa de conversão
const conversions = events.filter(e => e.type === 'loan_contract_approved').length;
const conversionRate = (conversions / uniqueUsers) * 100;

// Receita capturada
const revenueCapture = events
  .filter(e => e.type === 'loan_contract_approved')
  .reduce((sum, e) => sum + e.metadata.revenue, 0);

// Receita perdida
const revenueLost = events
  .filter(e => e.type === 'loan_contract_rejected')
  .reduce((sum, e) => sum + e.metadata.potentialRevenue, 0);
```

### Análise de Fricções

```typescript
// Agrupar por tipo
const frictionByType = frictionEvents.reduce((acc, event) => {
  if (!acc[event.type]) {
    acc[event.type] = {
      count: 0,
      users: new Set(),
      totalImpact: 0
    };
  }
  acc[event.type].count++;
  acc[event.type].users.add(event.userId);
  acc[event.type].totalImpact += estimateImpact(event);
  return acc;
}, {});
```

### Teste A/B

```typescript
// Separar por variante
const variantA = events.filter(e => e.abVariant === 'A');
const variantB = events.filter(e => e.abVariant === 'B');

// Calcular conversões
const conversionsA = variantA.filter(e => e.type === 'ab_conversion').length;
const conversionsB = variantB.filter(e => e.type === 'ab_conversion').length;

// Determinar vencedor
const winner = conversionRateB > conversionRateA ? 'B' : 'A';
```

---

## Escalabilidade

### Para Produção

Esta demo usa armazenamento in-memory. Para produção:

1. **Event Store**
   - Kafka ou RabbitMQ para streaming
   - PostgreSQL ou MongoDB para persistência

2. **Data Warehouse**
   - BigQuery, Redshift ou Snowflake
   - ETL para agregações

3. **Cache**
   - Redis para métricas em tempo real
   - Invalidação inteligente

4. **Machine Learning**
   - Modelos de predição de churn
   - Recomendações personalizadas
   - Detecção de anomalias

---

## Segurança

### Implementado

- CORS configurado
- Validação de entrada
- Dados anonimizados

### Para Produção

- Autenticação JWT
- Rate limiting
- Criptografia de dados sensíveis
- Auditoria de acesso
- LGPD/GDPR compliance

---

## Performance

### Otimizações Atuais

- Event Bus assíncrono
- Armazenamento in-memory (rápido)
- Agregações sob demanda

### Para Produção

- Cache de métricas
- Pré-agregações
- Índices de banco
- CDN para frontend
- Load balancing

---

## Monitoramento

### Para Produção

```typescript
// Instrumentação
import { Logger } from '@nestjs/common';

// Métricas
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

// Tracing
import { OpenTelemetryModule } from '@opentelemetry/api';

// Alertas
import { SlackNotifier } from './notifiers/slack';
```

---

## Extensibilidade

### Adicionar Nova Jornada

1. Editar `configs/demoJourneys.ts`
2. Adicionar configuração
3. Reiniciar backend
4. Selecionar no Debug Panel

### Adicionar Novo Evento

1. Adicionar tipo em `eventBus.ts`
2. Emitir no componente
3. Capturar no backend
4. Analisar no Intelligence

### Adicionar Nova Métrica

1. Adicionar cálculo em `intelligence.service.ts`
2. Expor no endpoint
3. Exibir no frontend

---

**Arquitetura desenhada para demonstração executiva e fácil expansão.**
