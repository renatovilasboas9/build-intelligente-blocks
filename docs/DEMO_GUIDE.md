# 🎬 Guia de Apresentação da Demo

## 📋 Preparação (5 minutos antes)

1. Abrir 3 terminais:
   - Terminal 1: Backend (`npm run dev:backend`)
   - Terminal 2: Frontend (`npm run dev:frontend`)
   - Terminal 3: Livre para comandos

2. Abrir 2 abas do navegador:
   - Aba 1: http://localhost:3000 (App)
   - Aba 2: http://localhost:3000/analytics (Analytics)

3. Abrir Debug Panel no canto superior direito

---

## 🎯 Roteiro de Apresentação (20 minutos)

### 1. INTRODUÇÃO - Analytics Tradicional (3 min)

**Objetivo**: Mostrar as limitações do analytics convencional

**Passos**:
1. Navegar para `/analytics`
2. Mostrar métricas superficiais:
   - "Veja, temos 3.250 sessões"
   - "Bounce rate de 42%"
   - "Taxa de conversão de 18%"
3. **Destacar o problema**:
   - "Mas POR QUÊ o bounce rate aumentou?"
   - "ONDE exatamente os usuários estão travando?"
   - "QUANTO dinheiro estamos perdendo?"
   - "O QUE fazer para melhorar?"

**Frase de impacto**:
> "Analytics tradicional mostra O QUÊ aconteceu. Data Products explicam POR QUÊ e COMO resolver."

---

### 2. DEMONSTRAÇÃO DE FRICÇÕES (8 min)

#### 2.1 Jorge - Alta Latência (3 min)

**Objetivo**: Mostrar impacto de performance

**Passos**:
1. Abrir Debug Panel
2. Selecionar jornada: `jorge_high_latency`
3. Fazer login:
   - CPF: `22222222222`
   - Senha: qualquer
4. Navegar: Home → Simulação
5. Clicar em "Simular"
6. **AGUARDAR 3.5 segundos** (mostrar o delay)
7. Comentar: "Vejam, 3.5 segundos de espera. Parece pouco?"

**Observar no Debug Panel**:
- Evento `loan_simulation_latency_high` capturado
- Fricção registrada

**Frase de impacto**:
> "Cada segundo de latência custa conversão. Vamos ver o impacto financeiro disso."

#### 2.2 Jorge - Problema de Senha (2 min)

**Objetivo**: Mostrar fricção de autenticação

**Passos**:
1. Fazer logout
2. Selecionar jornada: `jorge_password_issue`
3. Tentar login (vai falhar na primeira vez)
4. Tentar novamente (vai pedir verificação de dispositivo)
5. Inserir código: `123456`

**Observar no Debug Panel**:
- Evento `login_failed`
- Evento `device_verification_required`

**Frase de impacto**:
> "Cada fricção de autenticação afasta clientes. Quantos perdemos por isso?"

#### 2.3 Marcos - Contrato Rejeitado (3 min)

**Objetivo**: Mostrar perda de receita

**Passos**:
1. Fazer logout
2. Selecionar jornada: `marcos_rejected`
3. Login: CPF `33333333333`
4. Navegar: Home → Simulação
5. Simular: R$ 20.000 em 24x
6. Confirmar contratação
7. **VER REJEIÇÃO**

**Observar no Debug Panel**:
- Evento `loan_contract_rejected`
- Motivo: `RISK_POLICY`

**Frase de impacto**:
> "Marcos queria R$ 20 mil. Rejeitamos. Mas será que deveríamos? Vamos analisar."

---

### 3. DATA PRODUCT INTELLIGENCE (6 min)

**Objetivo**: Mostrar o poder da análise profunda

**Passos**:
1. Navegar para `/intelligence`
2. **Mostrar KPIs**:
   - Receita capturada vs perdida
   - Taxa de conversão real
3. **Friction Points**:
   - Gráfico mostrando onde usuários travam
   - Impacto financeiro de cada fricção
4. **Teste A/B**:
   - Comparação Variante A vs B
   - Vencedor e melhoria percentual
5. **Recomendações**:
   - Otimizar performance: +R$ 50k/mês
   - Personalização: +R$ 45k/mês
   - Melhorar auth: +R$ 15k/mês
   - Revisar risco: +R$ 80k/mês

**Frase de impacto**:
> "Agora sim! Sabemos ONDE está o problema, QUANTO custa e O QUE fazer."

---

### 4. PERSONALIZAÇÃO INTELIGENTE (3 min)

**Objetivo**: Mostrar experiência otimizada

**Passos**:
1. Fazer logout
2. Selecionar jornada: `carla_personalized`
3. Login: CPF `11111111111`
4. Navegar: Home → Simulação
5. **Observar diferenças**:
   - Simulação mais rápida (300ms)
   - Fluxo otimizado
   - Experiência premium

**Observar no Debug Panel**:
- Variante B atribuída
- Eventos de conversão

**Comparar com Carla Default**:
1. Fazer logout
2. Selecionar: `carla_default`
3. Repetir fluxo
4. Mostrar diferença no Data Product

**Frase de impacto**:
> "Personalização baseada em dados aumenta conversão em 35%. É ROI imediato."

---

## 🎯 Mensagens-Chave para Enfatizar

### Durante a Demo:

1. **Analytics vs Inteligência**
   - Analytics: "O quê aconteceu"
   - Data Product: "Por quê, quanto custa, como resolver"

2. **Fricções Custam Dinheiro**
   - Cada segundo de latência = perda de conversão
   - Cada rejeição sem contexto = cliente perdido
   - Impacto mensurável em R$

3. **Dados Guiam Decisões**
   - Não é opinião, são dados reais
   - Testes A/B provam o que funciona
   - Recomendações são acionáveis

4. **Personalização Aumenta ROI**
   - Experiência adaptada ao perfil
   - Redução de fricções
   - Aumento de conversão

---

## 💡 Perguntas Esperadas e Respostas

### "Como vocês calculam o impacto financeiro?"

**Resposta**:
> "Cruzamos eventos de fricção com dados de receita potencial. Por exemplo, se Marcos foi rejeitado em um empréstimo de R$ 20k, registramos essa perda. Multiplicamos por todos os casos similares e temos o impacto total."

### "Isso funciona em produção?"

**Resposta**:
> "Sim! Esta é uma demo simplificada, mas a arquitetura é a mesma: Event Bus captura tudo, backend processa, Data Product analisa. Em produção, usaríamos Kafka, data warehouse e ML para recomendações ainda mais precisas."

### "Quanto tempo leva para implementar?"

**Resposta**:
> "Depende da maturidade dos dados. Com eventos já capturados, 2-3 sprints para MVP. O ROI começa a aparecer em semanas, não meses."

### "E a privacidade dos dados?"

**Resposta**:
> "Todos os dados são anonimizados e agregados. Não expomos informações pessoais. Seguimos LGPD/GDPR à risca."

---

## 🚀 Fechamento (2 min)

### Recapitular Valor:

1. ✅ **Identificamos fricções específicas** (não apenas "bounce rate alto")
2. ✅ **Calculamos impacto financeiro real** (R$ 190k/mês de oportunidade)
3. ✅ **Oferecemos recomendações acionáveis** (não apenas insights)
4. ✅ **Provamos com testes A/B** (dados, não opiniões)
5. ✅ **Personalizamos experiências** (aumento de 35% na conversão)

### Call to Action:

> "Data Products transformam dados em decisões. Analytics mostra o passado. Inteligência constrói o futuro. Vamos começar?"

---

## 📊 Métricas de Sucesso da Demo

Após a apresentação, você deve ter demonstrado:

- ✅ 3 tipos diferentes de fricção
- ✅ Impacto financeiro calculado (R$ 190k+ de oportunidade)
- ✅ Teste A/B funcionando
- ✅ Personalização em ação
- ✅ Diferença clara entre Analytics e Data Product

---

## 🎓 Dicas de Apresentação

1. **Ritmo**: Não corra. Deixe os delays acontecerem (mostra realismo)
2. **Interação**: Pergunte "Vocês veem o problema aqui?" antes de explicar
3. **Contraste**: Sempre volte ao Analytics para mostrar a limitação
4. **Números**: Enfatize valores em R$ (executivos adoram ROI)
5. **Simplicidade**: Não entre em detalhes técnicos a menos que perguntem

---

**Boa apresentação! 🚀**
