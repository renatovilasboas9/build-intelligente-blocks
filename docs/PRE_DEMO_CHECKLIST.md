# ✅ Checklist Pré-Apresentação

## 📋 30 Minutos Antes da Demo

### 1. Ambiente Técnico

- [ ] Node.js 18+ instalado e funcionando
- [ ] npm 9+ instalado e funcionando
- [ ] Todas as dependências instaladas (`npm install` em root, backend e frontend)
- [ ] Backend compilando sem erros
- [ ] Frontend compilando sem erros
- [ ] Portas 3000 e 3001 livres
- [ ] Nenhum firewall bloqueando localhost

### 2. Serviços Rodando

- [ ] Backend iniciado (`npm run dev:backend`)
- [ ] Backend respondendo em http://localhost:3001
- [ ] Frontend iniciado (`npm run dev:frontend`)
- [ ] Frontend acessível em http://localhost:3000
- [ ] Sem erros no console do backend
- [ ] Sem erros no console do frontend

### 3. Navegador

- [ ] Chrome ou Firefox atualizado
- [ ] Abas preparadas:
  - [ ] Aba 1: http://localhost:3000 (App)
  - [ ] Aba 2: http://localhost:3000/analytics
  - [ ] Aba 3: http://localhost:3000/intelligence
- [ ] DevTools aberto (F12) para mostrar eventos
- [ ] Zoom do navegador em 100%
- [ ] Modo tela cheia (F11) opcional

### 4. Debug Panel

- [ ] Debug Panel abre corretamente
- [ ] Todas as jornadas aparecem no dropdown
- [ ] Usuários de demo listados
- [ ] Log de eventos funcionando

### 5. Teste Rápido

- [ ] Login com Carla (11111111111) funciona
- [ ] Navegação Home → Simulação funciona
- [ ] Simulação retorna resultado
- [ ] Contratação funciona
- [ ] Analytics mostra dados
- [ ] Intelligence mostra métricas
- [ ] Eventos aparecem no Debug Panel

---

## 📱 15 Minutos Antes da Demo

### 1. Apresentação

- [ ] Projetor/tela compartilhada funcionando
- [ ] Resolução adequada (1920x1080 recomendado)
- [ ] Som funcionando (se necessário)
- [ ] Backup: gravação de tela pronta (se internet cair)

### 2. Materiais

- [ ] DEMO_GUIDE.md aberto para consulta
- [ ] EXECUTIVE_SUMMARY.md impresso/disponível
- [ ] Slides de apoio prontos (se houver)
- [ ] Calculadora para mostrar ROI ao vivo

### 3. Dados Limpos

- [ ] Reiniciar backend para limpar eventos antigos
- [ ] Reiniciar frontend para estado limpo
- [ ] Verificar que métricas começam zeradas

### 4. Roteiro Mental

- [ ] Revisar os 3 casos de uso (Jorge latência, Jorge senha, Marcos rejeição)
- [ ] Memorizar CPFs dos usuários
- [ ] Saber ordem das jornadas
- [ ] Preparar respostas para perguntas comuns

---

## 🎯 5 Minutos Antes da Demo

### 1. Foco

- [ ] Fechar notificações do sistema
- [ ] Fechar Slack/Teams/Email
- [ ] Colocar celular no silencioso
- [ ] Avisar equipe que está em apresentação

### 2. Postura

- [ ] Respirar fundo
- [ ] Tomar água
- [ ] Posicionar-se confortavelmente
- [ ] Testar microfone (se remoto)

### 3. Última Verificação

- [ ] Backend ainda rodando
- [ ] Frontend ainda acessível
- [ ] Debug Panel funcionando
- [ ] Tudo pronto para começar

---

## 🚀 Durante a Demo

### Checklist de Execução

#### Introdução (3 min)
- [ ] Mostrar Analytics tradicional
- [ ] Destacar limitações
- [ ] Fazer pergunta provocativa: "Mas POR QUÊ?"

#### Jorge - Latência (3 min)
- [ ] Selecionar jornada `jorge_high_latency`
- [ ] Login: 22222222222
- [ ] Navegar até simulação
- [ ] AGUARDAR os 3.5 segundos (não pular!)
- [ ] Mostrar evento no Debug Panel
- [ ] Comentar impacto

#### Jorge - Senha (2 min)
- [ ] Logout
- [ ] Selecionar jornada `jorge_password_issue`
- [ ] Tentar login (vai falhar)
- [ ] Tentar novamente
- [ ] Verificar dispositivo (123456)
- [ ] Mostrar eventos

#### Marcos - Rejeição (3 min)
- [ ] Logout
- [ ] Selecionar jornada `marcos_rejected`
- [ ] Login: 33333333333
- [ ] Simular R$ 20.000
- [ ] Confirmar contratação
- [ ] VER REJEIÇÃO
- [ ] Enfatizar perda de receita

#### Data Product (6 min)
- [ ] Navegar para /intelligence
- [ ] Mostrar KPIs
- [ ] Explicar Friction Points
- [ ] Mostrar A/B Test
- [ ] Destacar Recomendações
- [ ] Enfatizar ROI (R$ 190k/mês)

#### Personalização (3 min)
- [ ] Logout
- [ ] Selecionar `carla_personalized`
- [ ] Login: 11111111111
- [ ] Mostrar experiência otimizada
- [ ] Comparar com carla_default
- [ ] Destacar aumento de conversão

---

## 🎤 Frases-Chave para Usar

### Ao Mostrar Analytics
> "Veja, temos dados. Mas e daí? O que fazer com isso?"

### Ao Mostrar Latência
> "3.5 segundos. Parece pouco? Custa R$ 50 mil por mês."

### Ao Mostrar Rejeição
> "Marcos queria R$ 20 mil. Rejeitamos. Será que deveríamos?"

### Ao Mostrar Data Product
> "AGORA sim! Sabemos ONDE, QUANTO e O QUÊ fazer."

### Ao Mostrar ROI
> "R$ 190 mil por mês em oportunidades. Payback em menos de 1 mês."

### Ao Fechar
> "Data Products transformam dados em decisões. Vamos começar?"

---

## ❌ O Que NÃO Fazer

- [ ] ❌ Não correr. Deixe os delays acontecerem
- [ ] ❌ Não entrar em detalhes técnicos demais
- [ ] ❌ Não pular etapas do roteiro
- [ ] ❌ Não ignorar perguntas da audiência
- [ ] ❌ Não focar só em tecnologia
- [ ] ❌ Não esquecer de mencionar ROI
- [ ] ❌ Não deixar de fazer o contraste Analytics vs Intelligence

---

## 🆘 Plano B (Se Algo Der Errado)

### Backend Caiu
1. Reiniciar rapidamente
2. Enquanto isso, mostrar slides
3. Explicar conceitos verbalmente
4. Voltar à demo quando estiver pronto

### Frontend Caiu
1. Recarregar página
2. Se não resolver, reiniciar
3. Usar gravação de tela de backup
4. Continuar apresentação

### Internet Caiu (Se Remoto)
1. Usar gravação de tela
2. Reagendar se necessário
3. Enviar materiais por email

### Pergunta Difícil
1. Agradecer a pergunta
2. Responder o que souber
3. Oferecer follow-up depois
4. Não inventar resposta

---

## 📊 Métricas de Sucesso da Apresentação

Após a demo, você deve ter:

- [ ] Demonstrado 3+ fricções diferentes
- [ ] Mostrado impacto financeiro (R$ 190k+)
- [ ] Provado diferença Analytics vs Intelligence
- [ ] Executado teste A/B
- [ ] Mostrado personalização
- [ ] Respondido perguntas da audiência
- [ ] Deixado claro o próximo passo
- [ ] Conseguido buy-in dos stakeholders

---

## 📞 Contatos de Emergência

- **Suporte Técnico**: [seu contato]
- **Backup Apresentador**: [colega]
- **Documentação**: README.md, TROUBLESHOOTING.md

---

## 🎓 Dicas Finais

1. **Respire**: Você está preparado
2. **Seja Natural**: Não precisa decorar, entenda o conceito
3. **Interaja**: Faça perguntas à audiência
4. **Mostre Paixão**: Você acredita no que está apresentando
5. **Foque no Valor**: ROI, ROI, ROI

---

**Boa sorte! Você vai arrasar! 🚀**

---

## ✅ Checklist Final

Antes de começar, confirme:

- [ ] ✅ Ambiente técnico OK
- [ ] ✅ Serviços rodando
- [ ] ✅ Navegador preparado
- [ ] ✅ Materiais prontos
- [ ] ✅ Roteiro revisado
- [ ] ✅ Mindset positivo

**ESTÁ PRONTO PARA APRESENTAR!**
