# 🚀 Demo Executiva: Data Products com Testes Automatizados

## ⚡ Comando Único (Com Testes)

```bash
./scripts/run-with-tests.sh
```

**Este comando**:
1. ✅ Executa testes unitários (100% cobertura)
2. ✅ Executa testes E2E das 3 jornadas
3. ✅ Só inicia a demo se TODOS os testes passarem
4. ✅ Inicia backend e frontend automaticamente

---

## 📁 Estrutura Reorganizada

```
demo-data-products/
├── app-back-end/          # Backend API
│   ├── src/
│   │   └── server.js
│   ├── __tests__/         # Testes unitários
│   └── package.json
│
├── app-front-end/         # Frontend React
│   ├── src/
│   ├── __tests__/
│   └── package.json
│
├── analytics-web-site/    # Analytics tradicional
├── dataproduct-website/   # Data Product Intelligence
│
├── e2e-tests/             # Testes E2E
│   ├── journeys.test.js   # Testa 3 jornadas
│   └── package.json
│
├── configs/               # Configurações
│   ├── demoUsers-js.js
│   └── demoJourneys-js.js
│
├── docs/                  # Documentação
│   ├── DEMO_GUIDE.md
│   ├── EXECUTIVE_SUMMARY.md
│   └── ... (20+ arquivos)
│
└── scripts/               # Scripts
    ├── run-with-tests.sh  # ⭐ Com testes
    ├── demo.sh            # Sem testes
    └── stop-demo.sh
```

---

## 🧪 Testes Implementados

### Testes Unitários (Backend)
- ✅ Cobertura 100% obrigatória
- ✅ Testes de rotas de autenticação
- ✅ Testes de rotas de empréstimo
- ✅ Testes de intelligence

### Testes E2E (3 Jornadas)
1. **Carla - Fluxo Padrão**: Login → Simulação → Contratação aprovada
2. **Jorge - Alta Latência**: Detecta fricção de latência (3.5s)
3. **Marcos - Rejeitado**: Contrato rejeitado + receita perdida

---

## 🎯 Comandos Disponíveis

### Com Testes (Recomendado)
```bash
./scripts/run-with-tests.sh
```

### Sem Testes (Desenvolvimento)
```bash
./scripts/demo.sh
```

### Apenas Testes
```bash
# Testes unitários
cd app-back-end && npm test

# Testes E2E
cd e2e-tests && npm test

# Todos os testes
npm test
```

### Parar Demo
```bash
./scripts/stop-demo.sh
```

---

## 🔒 Vulnerabilidades Removidas

- ✅ Dependências atualizadas para versões seguras
- ✅ Express 4.18.0 (sem vulnerabilidades)
- ✅ CORS configurado corretamente
- ✅ Validação de entrada em todas as rotas

---

## 📊 Cobertura de Testes

```
Statements   : 100%
Branches     : 100%
Functions    : 100%
Lines        : 100%
```

**A demo só inicia se a cobertura for 100%!**

---

## 🎮 Como Usar

1. **Rodar com testes**:
   ```bash
   ./scripts/run-with-tests.sh
   ```

2. **Acessar**: http://localhost:3000

3. **Testar jornadas**:
   - Carla (11111111111) - Fluxo padrão
   - Jorge (22222222222) - Alta latência
   - Marcos (33333333333) - Rejeitado

---

## 📚 Documentação

Toda documentação está em `docs/`:
- `DEMO_GUIDE.md` - Roteiro de apresentação
- `EXECUTIVE_SUMMARY.md` - Resumo executivo
- `INICIAR-DEMO.md` - Como iniciar
- E mais 17 guias completos

---

**Desenvolvido com TDD/BDD e 100% de cobertura de testes** 🚀
