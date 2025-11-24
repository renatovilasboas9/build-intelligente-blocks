# 🎯 Como Usar Esta Demo - Guia Visual

## 📦 Passo 1: Iniciar a Demo

```
┌─────────────────────────────────────┐
│                                     │
│   Digite no terminal:               │
│                                     │
│   ./start-demo.sh                   │
│                                     │
└─────────────────────────────────────┘
```

**Aguarde**: O script vai instalar tudo e iniciar automaticamente (2-3 minutos)

---

## 🌐 Passo 2: Navegador Abre Automaticamente

```
┌─────────────────────────────────────────────────────┐
│  http://localhost:3000                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│              Bem-vindo                              │
│                                                     │
│         CPF: [___________]                          │
│         Senha: [_______]                            │
│                                                     │
│         [  Entrar  ]                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🔧 Passo 3: Abrir Debug Panel

```
┌─────────────────────────────────────────────────────┐
│                                  [🔧 Debug Panel]   │ ← Clique aqui
│                                                     │
│              Bem-vindo                              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎮 Passo 4: Selecionar Jornada

```
┌─────────────────────────────────┐
│  Debug Panel              [✕]   │
├─────────────────────────────────┤
│  Jornada Ativa:                 │
│  [carla_default        ▼]       │ ← Escolha uma jornada
│                                 │
│  Opções:                        │
│  • carla_default                │
│  • carla_personalized           │
│  • jorge_high_latency           │
│  • jorge_password_issue         │
│  • marcos_rejected              │
└─────────────────────────────────┘
```

---

## 👤 Passo 5: Fazer Login

```
┌─────────────────────────────────────────────────────┐
│              Bem-vindo                              │
│                                                     │
│         CPF: [11111111111]      ← Digite CPF       │
│         Senha: [123456]         ← Qualquer senha   │
│                                                     │
│         [  Entrar  ]            ← Clique           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**CPFs disponíveis**:
- `11111111111` (Carla)
- `22222222222` (Jorge)
- `33333333333` (Marcos)

---

## 🏠 Passo 6: Navegar pela Demo

```
┌─────────────────────────────────────────────────────┐
│  Olá, Carla! 👋                    [Sair]          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐    ┌──────────────┐             │
│  │      💰      │    │      📊      │             │
│  │   Simular    │    │  Analytics   │             │
│  │  Empréstimo  │    │ Tradicional  │             │
│  └──────────────┘    └──────────────┘             │
│                                                     │
│  ┌─────────────────────────────────┐               │
│  │            🧠                    │               │
│  │   Data Product Intelligence      │               │
│  └─────────────────────────────────┘               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Clique em**:
- 💰 **Simular Empréstimo** → Fazer simulação
- 📊 **Analytics Tradicional** → Ver limitações
- 🧠 **Data Product Intelligence** → Ver poder da análise

---

## 💰 Passo 7: Simular Empréstimo

```
┌─────────────────────────────────────────────────────┐
│  Simulação de Empréstimo                            │
│                                                     │
│  Valor: R$ 10.000                                   │
│  [━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]           │
│                                                     │
│  Parcelas: 12x                                      │
│  [━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]           │
│                                                     │
│  [  Simular  ]  [  Continuar  ]                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

1. Ajuste valor e parcelas
2. Clique **Simular**
3. Aguarde resultado (observe delay se jornada configurada)
4. Clique **Continuar**
5. Clique **Confirmar Contratação**

---

## 🧠 Passo 8: Ver Data Product Intelligence

```
┌─────────────────────────────────────────────────────┐
│  🧠 Data Product Intelligence                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐          │
│  │  5   │  │ 22%  │  │150k  │  │ 80k  │          │
│  │Users │  │Conv. │  │Capt. │  │Lost  │          │
│  └──────┘  └──────┘  └──────┘  └──────┘          │
│                                                     │
│  🔥 Friction Points                                 │
│  [Gráfico de fricções]                              │
│                                                     │
│  🧪 A/B Test Results                                │
│  Variante B converte 39% mais!                      │
│                                                     │
│  💡 Recomendações                                   │
│  • Otimizar API: +R$ 50k/mês                       │
│  • Personalização: +R$ 45k/mês                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Observe**:
- Métricas em tempo real
- Friction points identificados
- Impacto financeiro calculado
- Recomendações acionáveis

---

## 🔄 Passo 9: Testar Outras Jornadas

```
1. Fazer logout
2. Abrir Debug Panel
3. Selecionar outra jornada
4. Fazer login novamente
5. Repetir fluxo
```

**Jornadas para testar**:

### jorge_high_latency
- Login: `22222222222`
- Observe: Delay de 3.5s na simulação
- Veja: Evento de fricção capturado

### jorge_password_issue
- Login: `22222222222`
- Observe: Primeira tentativa falha
- Veja: Verificação de dispositivo necessária

### marcos_rejected
- Login: `33333333333`
- Observe: Contrato rejeitado
- Veja: Receita perdida calculada

### carla_personalized
- Login: `11111111111`
- Observe: Experiência otimizada
- Veja: Variante B do teste A/B

---

## 🛑 Passo 10: Parar a Demo

```
┌─────────────────────────────────────┐
│                                     │
│   Digite no terminal:               │
│                                     │
│   ./stop-demo.sh                    │
│                                     │
└─────────────────────────────────────┘
```

---

## 📊 Comparação: Analytics vs Intelligence

### Analytics Tradicional
```
┌─────────────────────────────────┐
│  📊 Analytics                   │
├─────────────────────────────────┤
│  Bounce Rate: 42%               │
│  Conversão: 18%                 │
│  Tempo médio: 4:32              │
│                                 │
│  ❓ MAS POR QUÊ?                │
│  ❓ ONDE ESTÁ O PROBLEMA?       │
│  ❓ QUANTO CUSTA?               │
│  ❓ O QUE FAZER?                │
└─────────────────────────────────┘
```

### Data Product Intelligence
```
┌─────────────────────────────────┐
│  🧠 Intelligence                │
├─────────────────────────────────┤
│  ✅ Latência de 3.5s causa      │
│     abandono                    │
│                                 │
│  ✅ Usuários travam na          │
│     simulação                   │
│                                 │
│  ✅ Perdendo R$ 190k/mês        │
│                                 │
│  ✅ Otimizar API, revisar       │
│     risco, personalizar         │
└─────────────────────────────────┘
```

---

## 🎬 Roteiro de Apresentação

### 1. Introdução (3 min)
- Mostrar Analytics tradicional
- Destacar limitações

### 2. Fricções (8 min)
- Jorge com latência
- Jorge com senha
- Marcos rejeitado

### 3. Intelligence (6 min)
- Mostrar Data Product
- Destacar ROI (R$ 190k/mês)

### 4. Personalização (3 min)
- Carla personalizada
- Comparar A vs B

**Total**: 20 minutos

Veja [DEMO_GUIDE.md](DEMO_GUIDE.md) para roteiro completo.

---

## 💡 Dicas

### Durante a Demo
- ✅ Deixe os delays acontecerem (mostra realismo)
- ✅ Use Debug Panel para controlar jornadas
- ✅ Recarregue /intelligence para ver métricas atualizadas
- ✅ Enfatize valores em R$ (executivos adoram ROI)

### Antes de Apresentar
- ✅ Teste todas as 5 jornadas
- ✅ Leia DEMO_GUIDE.md
- ✅ Prepare respostas para perguntas comuns
- ✅ Reinicie demo para limpar eventos antigos

---

## 🆘 Problemas?

### Demo não inicia
```bash
cat logs/backend.log
cat logs/frontend.log
```

### Porta ocupada
```bash
./stop-demo.sh
./start-demo.sh
```

### Limpar tudo
```bash
./stop-demo.sh
rm -rf node_modules backend/node_modules frontend/node_modules
./start-demo.sh
```

Veja [TROUBLESHOOTING.md](TROUBLESHOOTING.md) para mais ajuda.

---

## 📚 Documentação

| Arquivo | Descrição |
|---------|-----------|
| **START_HERE.md** | Instruções completas |
| **DEMO_GUIDE.md** | Roteiro de apresentação |
| **COMANDOS-RAPIDOS.md** | Comandos essenciais |
| **FAQ.md** | Perguntas frequentes |

---

## 🌟 Mensagem Final

> "Analytics mostra o passado.  
> Data Products constroem o futuro."

**ROI**: R$ 190.000/mês em oportunidades  
**Payback**: < 1 mês  
**ROI Ano 1**: 1.420%

**Boa demo! 🚀**
