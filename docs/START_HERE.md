# 🚀 COMECE AQUI - Demo de Data Products

## ⚡ Instalação e Execução em 1 Comando

```bash
./start-demo.sh
```

**Pronto!** O script vai:
1. ✅ Limpar instalações anteriores
2. ✅ Instalar todas as dependências
3. ✅ Iniciar backend (porta 3001)
4. ✅ Iniciar frontend (porta 3000)
5. ✅ Abrir navegador automaticamente

---

## 🛑 Para Parar a Demo

```bash
./stop-demo.sh
```

---

## 🎮 Como Usar a Demo

### 1. Acesse o Frontend
- URL: http://localhost:3000
- O navegador abre automaticamente

### 2. Abra o Debug Panel
- Clique no botão **🔧 Debug Panel** (canto superior direito)

### 3. Selecione uma Jornada
Escolha uma das jornadas disponíveis:
- `carla_default` - Fluxo padrão sem fricções
- `carla_personalized` - Experiência otimizada
- `jorge_high_latency` - Demonstra impacto de latência
- `jorge_password_issue` - Demonstra fricção de autenticação
- `marcos_rejected` - Demonstra perda de receita

### 4. Faça Login
Use um dos CPFs:
- **Carla**: `11111111111`
- **Jorge**: `22222222222`
- **Marcos**: `33333333333`

**Senha**: Qualquer valor (ex: `123456`)

### 5. Explore!
- Navegue pelo fluxo de empréstimo
- Veja eventos sendo capturados no Debug Panel
- Compare Analytics vs Intelligence
- Observe as fricções em ação

---

## 📊 Principais Telas

### 🏠 Home
- Dashboard principal
- Acesso a simulação, analytics e intelligence

### 💰 Simulação de Empréstimo
- Ajuste valor e parcelas
- Veja simulação em tempo real
- Observe delays configurados

### 📊 Analytics Tradicional
- Métricas superficiais
- Mostra limitações do analytics convencional

### 🧠 Data Product Intelligence
- Análise profunda de fricções
- Impacto financeiro (R$ 190k/mês)
- Teste A/B (variante B converte 39% mais)
- Recomendações acionáveis

---

## 🎬 Roteiro de Apresentação

Siga o arquivo **[DEMO_GUIDE.md](DEMO_GUIDE.md)** para uma apresentação completa de 20 minutos.

**Casos de uso demonstrados**:
1. **Jorge - Alta Latência** (3.5s) → Perda de R$ 50k/mês
2. **Jorge - Erro de Senha** → Perda de R$ 15k/mês
3. **Marcos - Contrato Rejeitado** → Perda de R$ 80k/mês
4. **Carla - Personalização** → Ganho de R$ 45k/mês

---

## 📝 Logs

Os logs ficam salvos em:
- `logs/backend.log` - Logs do backend
- `logs/frontend.log` - Logs do frontend

Para ver logs em tempo real:
```bash
tail -f logs/backend.log
tail -f logs/frontend.log
```

---

## 🆘 Problemas?

### Backend não inicia
```bash
# Ver logs
cat logs/backend.log

# Reinstalar
./stop-demo.sh
rm -rf backend/node_modules
cd backend && npm install && cd ..
./start-demo.sh
```

### Frontend não inicia
```bash
# Ver logs
cat logs/frontend.log

# Reinstalar
./stop-demo.sh
rm -rf frontend/node_modules
cd frontend && npm install && cd ..
./start-demo.sh
```

### Porta ocupada
```bash
# Liberar portas
./stop-demo.sh

# Ou manualmente
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:3001)
```

### Limpar tudo e recomeçar
```bash
./stop-demo.sh
rm -rf node_modules backend/node_modules frontend/node_modules
rm -rf backend/dist frontend/dist
rm -rf logs
./start-demo.sh
```

---

## 📚 Documentação Completa

| Documento | Descrição |
|-----------|-----------|
| **[DEMO_GUIDE.md](DEMO_GUIDE.md)** | Roteiro de apresentação (20 min) |
| **[QUICK_START.md](QUICK_START.md)** | Guia de instalação detalhado |
| **[EXECUTIVE_SUMMARY.md](EXECUTIVE_SUMMARY.md)** | Resumo executivo com ROI |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | Arquitetura técnica |
| **[FAQ.md](FAQ.md)** | Perguntas frequentes |
| **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** | Solução de problemas |

**Total**: 13 documentos completos

---

## 💡 Dicas

### Preparar para Apresentação
```bash
# 1. Parar demo
./stop-demo.sh

# 2. Iniciar demo (limpa eventos antigos)
./start-demo.sh

# 3. Aguardar 20 segundos
# 4. Começar apresentação
```

### Testar Todas as Jornadas
1. Abra Debug Panel
2. Selecione jornada
3. Faça logout
4. Faça login novamente
5. Execute fluxo completo
6. Repita para cada jornada

### Ver Métricas em Tempo Real
1. Abra http://localhost:3000/intelligence
2. Execute algumas jornadas
3. Recarregue a página para ver métricas atualizadas

---

## 🎯 Próximos Passos

1. ✅ Rode a demo: `./start-demo.sh`
2. ✅ Explore todas as jornadas
3. ✅ Leia [DEMO_GUIDE.md](DEMO_GUIDE.md)
4. ✅ Prepare sua apresentação
5. ✅ Mostre o valor de Data Products!

---

## 🌟 Mensagem Final

> "Analytics mostra o passado.  
> Data Products constroem o futuro.  
> Dados transformados em decisões.  
> Decisões transformadas em resultados."

**ROI Demonstrado**: R$ 190.000/mês em oportunidades

**Boa demo! 🚀**
