# 📁 Estrutura do Projeto

## 🌳 Árvore de Diretórios

```
demo-data-products/
│
├── 📄 README.md                    # Documentação principal
├── 📄 QUICK_START.md               # Guia de instalação rápida
├── 📄 DEMO_GUIDE.md                # Roteiro de apresentação
├── 📄 ARCHITECTURE.md              # Arquitetura técnica
├── 📄 EXPANSION_GUIDE.md           # Como expandir a demo
├── 📄 TROUBLESHOOTING.md           # Solução de problemas
├── 📄 EXECUTIVE_SUMMARY.md         # Resumo executivo
├── 📄 PRE_DEMO_CHECKLIST.md        # Checklist pré-apresentação
├── 📄 FAQ.md                       # Perguntas frequentes
├── 📄 PROJECT_STRUCTURE.md         # Este arquivo
│
├── 📄 package.json                 # Configuração do monorepo
├── 📄 .gitignore                   # Arquivos ignorados pelo Git
├── 📄 install.sh                   # Script de instalação
│
├── 📁 configs/                     # ⚙️ CONFIGURAÇÕES
│   ├── demoUsers.ts                # Usuários de demonstração
│   └── demoJourneys.ts             # Jornadas configuráveis
│
├── 📁 backend/                     # 🔧 BACKEND (NestJS)
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   │
│   └── src/
│       ├── main.ts                 # Bootstrap da aplicação
│       ├── app.module.ts           # Módulo raiz
│       │
│       ├── auth/                   # Módulo de autenticação
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   └── auth.module.ts
│       │
│       ├── loan/                   # Módulo de empréstimos
│       │   ├── loan.controller.ts
│       │   ├── loan.service.ts
│       │   └── loan.module.ts
│       │
│       ├── intelligence/           # Módulo de inteligência
│       │   ├── intelligence.controller.ts
│       │   ├── intelligence.service.ts
│       │   └── intelligence.module.ts
│       │
│       └── events/                 # Módulo de eventos (Global)
│           ├── events.service.ts
│           └── events.module.ts
│
└── 📁 frontend/                    # 🎨 FRONTEND (React)
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    │
    └── src/
        ├── main.tsx                # Entry point
        ├── App.tsx                 # Router principal
        ├── index.css               # Estilos globais
        │
        ├── lib/                    # Utilitários
        │   ├── eventBus.ts         # Event Bus (mitt)
        │   └── api.ts              # Cliente HTTP
        │
        ├── contexts/               # Contextos React
        │   ├── AuthContext.tsx     # Estado de autenticação
        │   └── JourneyContext.tsx  # Estado de jornada
        │
        ├── components/             # Componentes reutilizáveis
        │   └── DebugPanel.tsx      # Painel de debug
        │
        └── pages/                  # Páginas da aplicação
            ├── LoginPage.tsx
            ├── DeviceVerificationPage.tsx
            ├── HomePage.tsx
            ├── LoanSimulationPage.tsx
            ├── LoanConfirmationPage.tsx
            ├── AnalyticsPage.tsx
            └── IntelligencePage.tsx
```

---

## 📚 Documentação

### Arquivos Principais

| Arquivo | Propósito | Audiência |
|---------|-----------|-----------|
| **README.md** | Visão geral completa | Todos |
| **QUICK_START.md** | Instalação em 5 minutos | Desenvolvedores |
| **DEMO_GUIDE.md** | Roteiro de apresentação | Apresentadores |
| **ARCHITECTURE.md** | Detalhes técnicos | Arquitetos/Devs |
| **EXPANSION_GUIDE.md** | Como expandir | Desenvolvedores |
| **TROUBLESHOOTING.md** | Solução de problemas | Todos |
| **EXECUTIVE_SUMMARY.md** | Resumo executivo | C-Level/Diretores |
| **PRE_DEMO_CHECKLIST.md** | Checklist pré-demo | Apresentadores |
| **FAQ.md** | Perguntas frequentes | Todos |

---

## ⚙️ Configurações

### `/configs/demoUsers.ts`

Define os usuários disponíveis na demo:

```typescript
{
  id: string,           // Identificador único
  name: string,         // Nome para exibição
  cpf: string,          // CPF (usado como login)
  profile: string,      // standard | premium
  journeys: string[]    // Jornadas disponíveis
}
```

**Usuários Pré-configurados**:
- Carla (11111111111) - 2 jornadas
- Jorge (22222222222) - 2 jornadas
- Marcos (33333333333) - 1 jornada

### `/configs/demoJourneys.ts`

Define comportamentos de cada jornada:

```typescript
{
  login: { ... },           // Comportamento de login
  simulation: { ... },      // Comportamento de simulação
  contract: { ... },        // Comportamento de contrato
  abTest: { ... },          // Variante A/B
  personalization: { ... }  // Personalizações
}
```

**Jornadas Pré-configuradas**:
- `carla_default` - Fluxo padrão
- `carla_personalized` - Fluxo otimizado
- `jorge_high_latency` - Alta latência
- `jorge_password_issue` - Erro de senha
- `marcos_rejected` - Contrato rejeitado

---

## 🔧 Backend (NestJS)

### Estrutura de Módulos

```
backend/src/
├── main.ts              # Bootstrap (porta 3001)
├── app.module.ts        # Módulo raiz
│
├── auth/                # Autenticação
│   ├── controller       # POST /auth/login
│   ├── service          # Lógica de autenticação
│   └── module
│
├── loan/                # Empréstimos
│   ├── controller       # POST /loan/simulate
│   │                    # POST /loan/contract
│   ├── service          # Lógica de empréstimos
│   └── module
│
├── intelligence/        # Inteligência
│   ├── controller       # GET /intelligence/metrics
│   │                    # GET /intelligence/recommendations
│   │                    # GET /intelligence/ab-results
│   ├── service          # Análise de dados
│   └── module
│
└── events/              # Eventos (Global)
    ├── service          # Captura e armazenamento
    └── module
```

### Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/login` | Login de usuário |
| POST | `/auth/verify-device` | Verificação de dispositivo |
| POST | `/loan/simulate` | Simulação de empréstimo |
| POST | `/loan/contract` | Contratação de empréstimo |
| GET | `/intelligence/metrics` | Métricas gerais |
| GET | `/intelligence/recommendations` | Recomendações por CPF |
| GET | `/intelligence/journey/:userId` | Jornada de usuário |
| GET | `/intelligence/ab-results` | Resultados A/B |
| GET | `/intelligence/friction-points` | Pontos de fricção |

---

## 🎨 Frontend (React)

### Estrutura de Componentes

```
frontend/src/
├── main.tsx             # Entry point
├── App.tsx              # Router (React Router)
│
├── lib/
│   ├── eventBus.ts      # Event Bus (mitt)
│   └── api.ts           # Cliente HTTP
│
├── contexts/
│   ├── AuthContext      # user, token, setAuth, logout
│   └── JourneyContext   # activeJourney, eventLog
│
├── components/
│   └── DebugPanel       # Painel de debug flutuante
│
└── pages/
    ├── LoginPage        # /login
    ├── DeviceVerification # /device-verification
    ├── HomePage         # /home
    ├── LoanSimulation   # /loan/simulation
    ├── LoanConfirmation # /loan/confirmation
    ├── AnalyticsPage    # /analytics
    └── IntelligencePage # /intelligence
```

### Rotas Disponíveis

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | Redirect | Redireciona para /login |
| `/login` | LoginPage | Tela de login |
| `/device-verification` | DeviceVerificationPage | Verificação 2FA |
| `/home` | HomePage | Dashboard principal |
| `/loan/simulation` | LoanSimulationPage | Simulação de empréstimo |
| `/loan/confirmation` | LoanConfirmationPage | Confirmação de contrato |
| `/analytics` | AnalyticsPage | Analytics tradicional |
| `/intelligence` | IntelligencePage | Data Product |

---

## 🔄 Fluxo de Dados

### 1. Captura de Eventos

```
Usuário interage com UI
    ↓
Componente emite evento no Event Bus
    ↓
API call para backend
    ↓
Backend captura evento via EventsService
    ↓
Evento armazenado em memória
```

### 2. Aplicação de Jornada

```
Usuário seleciona jornada no Debug Panel
    ↓
JourneyContext armazena jornada ativa
    ↓
Requisições incluem journeyName
    ↓
Backend busca configuração da jornada
    ↓
Backend aplica comportamento configurado
```

### 3. Análise de Inteligência

```
Frontend solicita métricas
    ↓
IntelligenceService busca eventos
    ↓
Calcula métricas (conversão, receita, fricções)
    ↓
Analisa A/B test
    ↓
Gera recomendações
    ↓
Retorna para frontend
    ↓
Frontend renderiza visualizações
```

---

## 📦 Dependências Principais

### Backend

```json
{
  "@nestjs/common": "^10.3.0",
  "@nestjs/core": "^10.3.0",
  "@nestjs/platform-express": "^10.3.0",
  "reflect-metadata": "^0.1.13",
  "rxjs": "^7.8.1"
}
```

### Frontend

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "mitt": "^3.0.1",
  "recharts": "^2.10.3"
}
```

---

## 🚀 Scripts Disponíveis

### Root

```bash
npm run dev:backend      # Inicia backend
npm run dev:frontend     # Inicia frontend
npm run build:backend    # Build do backend
npm run build:frontend   # Build do frontend
```

### Backend

```bash
npm run start:dev        # Desenvolvimento com watch
npm run build            # Build para produção
npm run start            # Inicia produção
```

### Frontend

```bash
npm run dev              # Desenvolvimento (porta 3000)
npm run build            # Build para produção
npm run preview          # Preview do build
```

---

## 🎯 Pontos de Entrada

### Para Desenvolvedores

1. **Começar**: `QUICK_START.md`
2. **Entender arquitetura**: `ARCHITECTURE.md`
3. **Expandir**: `EXPANSION_GUIDE.md`
4. **Resolver problemas**: `TROUBLESHOOTING.md`

### Para Apresentadores

1. **Preparar**: `PRE_DEMO_CHECKLIST.md`
2. **Apresentar**: `DEMO_GUIDE.md`
3. **Responder perguntas**: `FAQ.md`
4. **Mostrar valor**: `EXECUTIVE_SUMMARY.md`

### Para Executivos

1. **Entender valor**: `EXECUTIVE_SUMMARY.md`
2. **Ver demo**: Assistir apresentação
3. **Perguntas**: `FAQ.md`
4. **Próximos passos**: `README.md`

---

## 📊 Tamanho do Projeto

```
Linhas de Código (aproximado):
- Backend: ~1.500 linhas
- Frontend: ~2.000 linhas
- Configs: ~200 linhas
- Documentação: ~5.000 linhas

Total: ~8.700 linhas
```

---

## 🔐 Segurança

### Arquivos Sensíveis (Não Commitados)

```
node_modules/           # Dependências
dist/                   # Build outputs
.env                    # Variáveis de ambiente
.DS_Store               # macOS
```

### Dados de Demo

Todos os dados são fictícios:
- CPFs: 11111111111, 22222222222, 33333333333
- Senhas: Qualquer valor aceito
- Valores: Simulados

**NUNCA use dados reais de clientes!**

---

## 🎓 Conceitos Implementados

### Design Patterns

- ✅ Event-Driven Architecture
- ✅ Dependency Injection (NestJS)
- ✅ Context API (React)
- ✅ Repository Pattern (EventsService)
- ✅ Strategy Pattern (Jornadas)

### Best Practices

- ✅ TypeScript strict mode
- ✅ Separation of concerns
- ✅ Configuration over code
- ✅ Single Responsibility Principle
- ✅ DRY (Don't Repeat Yourself)

### Arquitetura

- ✅ Monorepo
- ✅ Microservices-ready
- ✅ API-first
- ✅ Event sourcing (simplificado)
- ✅ CORS configurado

---

**Estrutura desenhada para ser intuitiva, escalável e fácil de manter.**
