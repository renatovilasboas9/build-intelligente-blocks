# BIB – Build-Intelligent-Blocks  
> Orquestrador visual de produtos digitais e data products, com foco em jornada do cliente, personas de suporte e prototipação em estágios.

---

## 🌎 Visão Geral

O **BIB (Build-Intelligent-Blocks)** é uma aplicação **local** com **interface gráfica** (web app) que organiza a criação de produtos digitais e data products a partir de:

- **Persona principal (cliente)**  
- **Necessidade**  
- **Job To Be Done (JTBD)**  
- **Jornadas reais de uso**  
- **Personas de suporte** (dados, segurança, DevOps, compliance, etc.)  
- **Requisitos transversais**  
- **Métricas de valor**  
- **Pipeline de maturidade da jornada** (do protótipo com fake data até o banco de dados real)  
- **Testes automatizados + vídeos E2E** como evidência da jornada funcionando.

O BIB é o **“cérebro organizador”**.  
Ele coordena pessoas, jornadas, requisitos e testes.  
Quando necessário, ele chama outras ferramentas (como o **Kiro CLI**) por baixo dos panos, sem que o usuário precise usar linha de comando.

---

## 🎯 Objetivo

- Manter o **PM focado na persona cliente e nas jornadas de valor**  
- Dar visibilidade clara de **como personas internas (dados, sec, devops, etc.) impactam essa jornada**  
- Orquestrar um **pipeline de prototipação em estágios**, evitando que código “definitivo” seja criado cedo demais  
- Garantir que **toda jornada importante** tenha:
  - requisitos de viabilidade mapeados  
  - métricas de valor ligadas  
  - testes automatizados  
  - vídeo E2E da jornada funcionando  

---

## 🧠 Conceitos Centrais

### Persona Primária (Cliente)

É a persona que recebe **valor direto** do produto.

Exemplo:
- `PER-CREATOR-LI` – Criador de conteúdo no LinkedIn  
- `PER-CLIENTE-APP` – Cliente de um app de empréstimo  

Dela derivamos:
- **Necessidade**
- **JTBD**
- **Jornadas**
- **Métricas de valor**

---

### Personas de Suporte (Enabling Personas)

São personas internas que garantem a **viabilidade** do produto:

- Dados / Analytics  
- Segurança / AppSec  
- DevOps / SRE  
- Compliance / Jurídico  
- FinOps  
- Operações / Atendimento  

Elas **não mudam a jornada principal**, mas criam **requisitos transversais** que impactam essa jornada:

- schema de dados  
- logs e rastreabilidade  
- latência e SLO  
- conformidade regulatória  
- custo por transação  

---

### Jornada (Journey)

É o “filme” que mostra **como a persona primária realiza o seu JTBD** no produto.

Exemplos:
- JNY-LI-01 → Criar rascunho de post LinkedIn com IA  
- JNY-EMP-01 → Simular e contratar empréstimo no app  

Toda jornada possui:
- **Ligação com JTBD**  
- **Passos claros** (step-by-step)  
- **Requisitos transversais associados**  
- **Métricas de valor vinculadas**  
- **Pipeline de maturidade**  
- **Testes e vídeo E2E**

---

### Requisitos Transversais

Assinados pelas personas de suporte, por exemplo:

- `SUP-DATA-01`: Todos os eventos de engajamento seguem o schema oficial  
- `SUP-SEC-01`: Nenhuma operação crítica ocorre sem consentimento explícito  
- `SUP-SRE-01`: Latência P95 < 300ms  
- `SUP-COMP-01`: Logs adequados para auditoria regulatória  

Cada requisito transversal declara em quais **jornadas do cliente** ele impacta.

---

### Métricas de Valor e Saúde

- **Métricas de valor** → ligadas à persona primária  
  - Engajamento médio por post  
  - Conversão por jornada  
  - NPS pós-jornada  

- **Métricas de saúde** → ligadas às personas de suporte  
  - % de eventos válidos  
  - Tempo para responder auditoria  
  - Latência, erro, custo, etc.

---

## 🧬 Pipeline de Maturidade da Jornada

Toda jornada passa pelo mesmo fluxo de maturidade:

1. **Fake UI**  
   - Protótipo visual com dados falsos  
   - Valida narrativa, fluxo, textos, JTBD  
   - Foco 100% na experiência da persona primária  

2. **Refinamento de Requisitos**  
   - Personas de suporte entram  
   - Definição dos requisitos transversais (dados, sec, devops, compliance…)  

3. **Testes de Frontend**  
   - UI real com mocks  
   - Testes unitários e de integração do front  
   - Nenhum backend real ainda  

4. **Backend Fake**  
   - APIs simuladas  
   - Regras de negócio básicas  
   - Sem persistência real  

5. **Banco em Memória**  
   - API real  
   - Persistência em memória (ex: SQLite in-memory)  
   - Valida schema, consulta, integridade  

6. **Testes E2E + Vídeo**  
   - UI real + backend real + “banco em memória”  
   - Testes E2E automatizados  
   - **Gravação de vídeo da jornada inteira** como evidência  

7. **Banco Real**  
   - Persistência definitiva (SQLite file, Postgres etc.)  
   - Migrations  
   - Configurações de segurança, retenção e auditoria  
   - Reexecução dos E2E + vídeos para garantir que tudo continua OK  

No BIB, cada jornada tem esse pipeline registrado e visível.

---

## 🖥️ Interface Gráfica (Web App)

O BIB é acessado por um navegador, rodando localmente.

### Telas principais

#### 1. **Dashboard de Projetos**
- Lista de projetos  
- Indicadores resumidos:
  - nº de jornadas  
  - nº de jornadas em cada estágio  
  - gaps de testes  
  - existência de vídeos E2E  

Ações:
- Criar novo projeto  
- Abrir projeto existente  

---

#### 2. **Canvas do Projeto**

Visual tipo “mapa” mostrando:

- Persona primária no centro  
- Necessidades e JTBD ligados a ela  
- Jornadas saindo como trilhas  
- Personas de suporte orbitando em volta, com seus requisitos transversais conectados às jornadas  

Ações:
- Criar / editar jornadas  
- Associar métricas de valor  
- Adicionar / editar requisitos de suporte  

---

#### 3. **Tela da Jornada**

Mostra:

- Detalhes da jornada:
  - ID, nome, JTBD, persona  
  - Passos da jornada  
- **Pipeline de maturidade** como barra ou “checklist visual”:  
  - Fake UI / Refinamento / Front tests / Backend fake / Mem DB / E2E + vídeo / DB real  
- Requisitos transversais associados  
- Métricas ligadas  
- Lista de testes (unit, integration, e2e)  
- Links para os vídeos E2E gravados  

Ações:
- Avançar para o próximo estágio do pipeline  
- Pedir geração / atualização de código (via Kiro) para um estágio específico  
- Abrir vídeo E2E em player embutido  

---

#### 4. **Tela de Requisitos Transversais**

Visão por persona de suporte:

- Persona: Dados / Sec / DevOps / Compliance etc.  
- Lista de requisitos com:
  - descrição  
  - jornadas impactadas  
  - métricas associadas  
  - status de implementação / teste  

---

#### 5. **Tela de Execuções (Runs) com IA / Kiro**

Histórico de “pedidos” feitos pelo BIB para ferramentas externas (ex: Kiro):

- Qual jornada  
- Qual estágio (backend fake, testes e2e, etc.)  
- Prompt gerado (visível)  
- Resultado (sucesso, erro, arquivos gerados)  

---

#### 6. **Galeria de Vídeos E2E**

- Lista de vídeos E2E por jornada  
- Filtros por projeto, jornada, data, resultado de teste  
- Possibilidade de comparar versões (antes/depois)

---

## 🏗️ Arquitetura Técnica (Visão Alta)

- **Frontend**: React (SPA)  
- **Backend local**: Node.js  
- **Banco de dados local**: SQLite  
- **Persistência de especificações**: arquivos `.yml` versionados em Git  
- **Ferramentas externas**:
  - Kiro CLI (ou outra engine de geração)  
  - Runner de testes (unit, integration, e2e)  
  - Gravador de vídeo (ex: Playwright/Cypress com recording)

### Papel do BIB

1. Edita e lê arquivos YML (fonte da verdade da especificação).  
2. Sincroniza esses dados em SQLite para consultas rápidas e dashboards.  
3. Orquestra:
   - estágios de maturidade  
   - chamadas ao Kiro  
   - execução de testes  
   - gravação de vídeos E2E  
4. Mostra tudo isso em uma interface visual clara.

O usuário **nunca precisa usar CLI** diretamente.  
O CLI (Kiro e outros) é chamado somente pelo backend do BIB.

---

## 🗂️ Modelo de Especificação (YAML)

Exemplo simplificado de um projeto no BIB:

```yaml
project_id: PRJ-POSTS-LINKEDIN
name: "App de Posts LinkedIn com Inteligência de Engajamento"

persona_primary:
  id: PER-CREATOR-LI
  name: "Criador de conteúdo LinkedIn"
  success_definition: "Consegue publicar conteúdos com engajamento crescente sem virar escravo do processo."

personas_support:
  - id: PER-DATA-LI
    name: "Analista de Dados"
  - id: PER-SEC-LI
    name: "Segurança"
  - id: PER-DEVOPS-LI
    name: "DevOps"
  - id: PER-GROWTH-LI
    name: "Growth"

needs:
  - id: NEED-CREATOR-01
    persona_id: PER-CREATOR-LI
    description: "Publicar conteúdos que gerem engajamento sem gastar horas escrevendo."

jobs_to_be_done:
  - id: JTBD-CREATOR-01
    persona_id: PER-CREATOR-LI
    need_id: NEED-CREATOR-01
    description: "Quando eu quiser me posicionar, quero gerar e refinar um post rapidamente para aumentar meu engajamento."

journeys:
  - id: JNY-LI-01
    jtbd_id: JTBD-CREATOR-01
    name: "Criar rascunho guiado com IA"
    steps:
      - "Selecionar objetivo do post."
      - "Informar tema e ideias-chave."
      - "Gerar 2–3 versões com IA."
      - "Editar e aprovar uma versão."
      - "Salvar rascunho pronto para publicar."
    maturity_pipeline:
      fake_ui: done
      refine_requirements: done
      frontend_tests: pending
      backend_fake: pending
      memory_database: pending
      e2e_tests_video: pending
      real_database: pending

support_requirements:
  - id: SUP-DATA-01
    persona_id: PER-DATA-LI
    description: "Todos os posts e métricas de engajamento devem seguir o schema oficial."
    impact_on: [JNY-LI-01]
  - id: SUP-SEC-01
    persona_id: PER-SEC-LI
    description: "Nenhum post será publicado automaticamente sem consentimento explícito."
    impact_on: [JNY-LI-01]

value_metrics:
  - id: MET-ENGAGEMENT-RATE
    persona_id: PER-CREATOR-LI
    name: "Engajamento médio por post"
    type: "outcome"
    target: "Crescer 20% em 3 meses"

tests:
  - id: TST-JNY-LI-01-E2E
    journey_id: JNY-LI-01
    type: "e2e"
    description: "Garantir que o criador consegue gerar, ajustar e salvar um rascunho guiado."
    video_output: "videos/jny-li-01-e2e.mp4"
    linked_metrics: [MET-ENGAGEMENT-RATE]
