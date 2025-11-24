# ❓ Perguntas Frequentes (FAQ)

## 🎯 Sobre a Demo

### P: O que é esta demo?

**R**: Uma demonstração executiva completa que mostra a diferença entre Analytics tradicional e Data Products inteligentes. Simula jornadas de usuários com fricções reais e demonstra como identificar, quantificar e resolver problemas usando inteligência de dados.

### P: Quanto tempo leva para rodar a demo?

**R**: 
- Instalação: 5 minutos
- Apresentação completa: 20 minutos
- Teste rápido: 5 minutos

### P: Preciso de internet para rodar?

**R**: Não! Tudo roda 100% local na sua máquina. Não há dependências externas, APIs ou serviços cloud.

### P: Posso customizar a demo?

**R**: Sim! Toda a demo é configurável através de arquivos em `/configs`. Você pode adicionar novos usuários, jornadas e comportamentos sem alterar código.

---

## 🛠️ Técnicas

### P: Quais tecnologias são usadas?

**R**:
- **Backend**: NestJS + TypeScript
- **Frontend**: React + TypeScript + Vite
- **Event Bus**: mitt
- **Charts**: Recharts
- **Storage**: In-memory (para demo)

### P: Por que in-memory storage?

**R**: Para simplificar a demo e não exigir instalação de banco de dados. Em produção, você usaria PostgreSQL, MongoDB, ou similar.

### P: Como os eventos são capturados?

**R**: Através de um Event Bus (mitt) no frontend que emite eventos para todas as ações do usuário. O backend captura esses eventos via API calls e armazena em memória.

### P: Os dados persistem entre reinicializações?

**R**: Não. Como usamos armazenamento in-memory, os dados são perdidos ao reiniciar o backend. Isso é proposital para manter a demo limpa.

### P: Posso usar banco de dados real?

**R**: Sim! Veja o arquivo EXPANSION_GUIDE.md para instruções de como adicionar PostgreSQL, MongoDB ou outro banco.

---

## 🎬 Sobre Apresentação

### P: Para quem é esta demo?

**R**:
- **C-Level**: Foco em ROI e impacto no negócio
- **Diretores**: Foco em métricas e decisões
- **Gerentes**: Foco em operação e melhorias
- **Técnicos**: Foco em arquitetura e implementação

### P: Quanto tempo dura a apresentação?

**R**: 20 minutos completos, mas pode ser adaptada:
- **Versão executiva**: 10 minutos (só highlights)
- **Versão completa**: 20 minutos (todos os casos)
- **Versão técnica**: 30 minutos (com deep dive)

### P: Preciso decorar o roteiro?

**R**: Não! Entenda os conceitos e use o DEMO_GUIDE.md como referência. O importante é transmitir o valor, não seguir um script rígido.

### P: E se algo der errado durante a demo?

**R**: Veja o PRE_DEMO_CHECKLIST.md seção "Plano B". Sempre tenha uma gravação de tela como backup.

---

## 💰 Sobre ROI e Valor

### P: Os números de ROI são reais?

**R**: São estimativas baseadas em casos reais de mercado. Você deve ajustar para o contexto da sua empresa usando dados reais.

### P: Como calcular o ROI para minha empresa?

**R**:
1. Identifique fricções específicas do seu negócio
2. Calcule taxa de conversão atual
3. Estime impacto de cada fricção
4. Multiplique por volume de usuários
5. Compare com custo de implementação

### P: Quanto custa implementar em produção?

**R**: Depende da maturidade dos dados:
- **MVP**: 2-3 sprints (R$ 100-200k)
- **Produção completa**: 4-6 sprints (R$ 300-500k)
- **ROI**: Geralmente < 6 meses

### P: Qual o tempo de implementação?

**R**:
- **MVP funcional**: 1-2 meses
- **Produção**: 3-4 meses
- **Escala completa**: 6-12 meses

---

## 🔧 Problemas Comuns

### P: Backend não inicia

**R**: 
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run start:dev
```

### P: Frontend não inicia

**R**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### P: Erro de CORS

**R**: Verifique se o backend está rodando na porta 3001 e reinicie ambos os serviços.

### P: Porta já em uso

**R**:
```bash
# Encontrar processo
lsof -i :3000
lsof -i :3001

# Matar processo
kill -9 <PID>
```

### P: Eventos não aparecem no Debug Panel

**R**: 
1. Abra DevTools (F12)
2. Verifique console para erros
3. Faça logout e login novamente
4. Reinicie o frontend se necessário

---

## 🎯 Sobre Jornadas

### P: Como funcionam as jornadas?

**R**: Cada jornada é uma configuração que define comportamentos específicos (delays, erros, aprovações, etc). O backend lê essa configuração e aplica o comportamento correspondente.

### P: Como adicionar nova jornada?

**R**: Edite `/configs/demoJourneys.ts` e adicione uma nova entrada. Não precisa alterar código.

### P: Posso ter múltiplas jornadas para o mesmo usuário?

**R**: Sim! Cada usuário pode ter várias jornadas. Você seleciona qual usar no Debug Panel.

### P: Como criar jornada personalizada?

**R**: Veja EXPANSION_GUIDE.md seção "Criar Nova Jornada" com exemplos completos.

---

## 📊 Sobre Métricas

### P: As métricas são calculadas em tempo real?

**R**: Sim! Cada vez que você acessa `/intelligence`, as métricas são recalculadas com base nos eventos capturados.

### P: Posso exportar os dados?

**R**: Atualmente não, mas veja EXPANSION_GUIDE.md seção "Adicionar Exportação de Dados" para implementar.

### P: Como adicionar nova métrica?

**R**: Edite `backend/src/intelligence/intelligence.service.ts` e adicione o cálculo. Veja EXPANSION_GUIDE.md para exemplos.

### P: Posso filtrar métricas por data?

**R**: Não na versão atual, mas veja EXPANSION_GUIDE.md seção "Adicionar Filtros de Data" para implementar.

---

## 🧪 Sobre Testes A/B

### P: Como funciona o teste A/B?

**R**: Cada jornada define uma variante (A ou B). O backend registra eventos com a variante correspondente e o Intelligence calcula métricas separadas para cada uma.

### P: Posso ter mais de 2 variantes?

**R**: Na versão atual, não. Mas é fácil expandir para A/B/C/D. Veja EXPANSION_GUIDE.md.

### P: Como determinar o vencedor?

**R**: O Intelligence compara taxa de conversão e receita de cada variante e declara o vencedor automaticamente.

### P: Os testes são estatisticamente significantes?

**R**: Na demo, não fazemos cálculo de significância estatística. Em produção, você deveria adicionar testes de hipótese (chi-quadrado, t-test, etc).

---

## 🎨 Sobre Personalização

### P: Como funciona a personalização?

**R**: Cada jornada pode ter configurações de personalização (reduceSteps, prefillForm, etc). O frontend lê essas configurações e adapta a UI.

### P: Posso adicionar novos tipos de personalização?

**R**: Sim! Edite a interface `JourneyConfig` em `/configs/demoJourneys.ts` e implemente a lógica no frontend.

### P: A personalização é baseada em ML?

**R**: Na demo, não. É baseada em regras configuradas. Em produção, você usaria modelos de ML para recomendações dinâmicas.

---

## 🚀 Sobre Produção

### P: Esta demo está pronta para produção?

**R**: Não. É uma demonstração educacional. Para produção, você precisa:
- Banco de dados persistente
- Autenticação real
- Testes automatizados
- Monitoramento
- Segurança reforçada
- Escalabilidade

### P: Quanto trabalho para levar à produção?

**R**: Depende da maturidade da sua infraestrutura:
- **Com infra pronta**: 2-3 sprints
- **Do zero**: 4-6 sprints
- **Enterprise**: 6-12 sprints

### P: Quais são os principais desafios?

**R**:
1. Captura de eventos em escala
2. Processamento em tempo real
3. Armazenamento eficiente
4. Privacidade e segurança (LGPD)
5. Integração com sistemas legados

### P: Preciso de uma equipe dedicada?

**R**: Para MVP, 2-3 desenvolvedores + 1 data analyst. Para escala, considere uma squad completa (4-6 pessoas).

---

## 📚 Sobre Documentação

### P: Onde encontro mais informações?

**R**:
- **README.md**: Visão geral
- **QUICK_START.md**: Instalação rápida
- **DEMO_GUIDE.md**: Roteiro de apresentação
- **ARCHITECTURE.md**: Detalhes técnicos
- **EXPANSION_GUIDE.md**: Como expandir
- **TROUBLESHOOTING.md**: Solução de problemas
- **EXECUTIVE_SUMMARY.md**: Resumo executivo

### P: Posso contribuir com melhorias?

**R**: Sim! A demo é open source. Faça fork, implemente melhorias e envie pull request.

### P: Há vídeos tutoriais?

**R**: Não na versão atual, mas você pode gravar sua própria apresentação e compartilhar.

---

## 🌍 Casos de Uso

### P: Esta demo serve para qualquer indústria?

**R**: O conceito sim, mas os exemplos são de fintech (empréstimos). Você pode adaptar para:
- **E-commerce**: Carrinho de compras
- **SaaS**: Onboarding de usuários
- **Marketplace**: Jornada de vendedores
- **Educação**: Matrículas
- **Saúde**: Agendamentos

### P: Como adaptar para meu negócio?

**R**:
1. Identifique jornadas críticas
2. Mapeie fricções comuns
3. Crie usuários representativos
4. Configure jornadas específicas
5. Ajuste métricas de negócio

### P: Posso usar para B2B?

**R**: Sim! Adapte as jornadas para refletir processos B2B (cotações, aprovações, contratos, etc).

---

## 💡 Conceitos

### P: O que é um Data Product?

**R**: Um produto de dados que transforma dados brutos em insights acionáveis, gerando valor mensurável para o negócio. Diferente de dashboards, Data Products explicam "por quê" e recomendam "o quê fazer".

### P: Qual a diferença entre Analytics e Intelligence?

**R**:
- **Analytics**: Mostra "o quê" aconteceu (descritivo)
- **Intelligence**: Explica "por quê" e recomenda "o quê fazer" (prescritivo)

### P: O que são Friction Points?

**R**: Pontos na jornada do usuário onde há atrito, dificuldade ou abandono. Exemplos: latência alta, erros, formulários complexos, rejeições.

### P: Como medir impacto financeiro de fricções?

**R**: 
1. Identifique a fricção
2. Calcule quantos usuários afeta
3. Estime taxa de abandono causada
4. Multiplique por valor médio de conversão
5. Resultado = receita perdida

---

## 🔐 Segurança e Privacidade

### P: Os dados são seguros?

**R**: Na demo, tudo é local e in-memory. Em produção, você deve:
- Criptografar dados sensíveis
- Anonimizar PII
- Seguir LGPD/GDPR
- Implementar controles de acesso

### P: Como garantir LGPD compliance?

**R**:
1. Anonimizar dados pessoais
2. Obter consentimento explícito
3. Permitir exclusão de dados
4. Documentar processamento
5. Implementar data retention policies

### P: Posso mostrar dados reais na demo?

**R**: NÃO! Use sempre dados fictícios. Nunca exponha informações reais de clientes.

---

## 📞 Suporte

### P: Onde consigo ajuda?

**R**:
1. Leia TROUBLESHOOTING.md
2. Verifique FAQ.md (este arquivo)
3. Revise documentação completa
4. Abra issue no repositório
5. Entre em contato com a equipe

### P: Posso contratar consultoria?

**R**: Sim! Entre em contato para discutir implementação customizada para sua empresa.

### P: Há treinamento disponível?

**R**: A documentação é completa e auto-explicativa. Para treinamento formal, entre em contato.

---

## 🎓 Aprendizado

### P: Preciso saber programar para usar?

**R**: Para rodar a demo, não. Para customizar, conhecimento básico de TypeScript ajuda. Para implementar em produção, sim, precisa de equipe técnica.

### P: Quais habilidades preciso desenvolver?

**R**:
- **Técnicas**: TypeScript, React, NestJS, Event-driven architecture
- **Dados**: SQL, análise de dados, estatística
- **Negócio**: Métricas, ROI, storytelling com dados

### P: Há cursos recomendados?

**R**:
- Event-driven architecture
- Data Products fundamentals
- A/B testing e experimentação
- Analytics vs Intelligence

---

**Não encontrou sua pergunta? Abra uma issue ou entre em contato!**
