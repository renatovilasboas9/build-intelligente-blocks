# 🧩 Build-Intelligent-Blocks (BIB)
**A Local-First, Domain-Driven, AI-Optional App Factory**

Build-Intelligent-Blocks (BIB) is an open-source, domain-driven app factory, fully local-first and powered by optional AI.

It enables developers, architects and product teams to collaboratively design, refine and incrementally build full-stack applications using React + Node.js + SQLite, with or without AI.

Everything starts with:
```bash
bib create app my-app
cd my-app
```

Then you add features as domains inside `/app/domains`, always following the BIB structure.

**BIB-CLI** is the command-line engine that powers refinement, generation, local orchestration and testing.

## 📚 Table of Contents

- [What is BIB?](#-what-is-bib)
- [Philosophy](#-philosophy)
- [Architecture Overview](#-architecture-overview)
- [Local-First Stack](#-local-first-stack)
- [Repository Structure](#-repository-structure)
- [Spec System (Business / Tech / AI)](#-spec-system-business--tech--ai)
- [Feature Lifecycle](#-feature-lifecycle)
- [Testing & Local In-App Execution](#-testing--local-in-app-execution)
- [Optional ML / GenAI](#-optional-ml--genai)
- [End-to-End Real Example](#-end-to-end-real-example)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

## 🧠 What is BIB?

BIB = Build-Intelligent-Blocks, a platform for building software incrementally and by domain, using local and deterministic environments.

BIB brings:
- **Domain-driven structure** (everything belongs to a feature/domain)
- **Incremental development** (UI-first → domain → API → DB → optional AI)
- **Spec-driven workflows**
- **Local execution** for everything: build, DB, test runners, e2e video recording
- **Optional GenAI** for refinement, codegen, UX exploration, or AI features
- **ACM (Application Construction Manager)** to orchestrate and visualize all features and tests

## 🧭 Philosophy

- **Local-first**: everything must run offline.
- **Domain-first**: features are isolated slices containing all their parts.
- **Spec-driven**: BDD + TechSpec + AiSpec lead the implementation.
- **AI-optional**: features can be built with or without AI ports.
- **Incremental**: generate, refine, test, adjust — loop forever.
- **Testable**: you can run unit/integration/e2e from the app itself.
- **Auditable**: tests, logs and e2e videos are kept per domain.

## 🏛 Architecture Overview

BIB has three main components:

### 1. BIB-CLI (local AI-assisted CLI)
The CLI refines:
- Business drafts → BDD
- Tech drafts → TechSpec
- AI drafts → AiSpec (optional)

And generates:
- Front-end (React)
- Back-end (Node.js)
- DB infrastructure (SQLite + Prisma)
- AI ports/adapters (if enabled)
- Tests (unit, integration, e2e)

Runs locally and offline.

### 2. ACM (Application Construction Manager)
A local Node.js web app that:
- displays all features ("domains")
- runs tests on demand
- shows logs & videos
- tracks spec & build status
- orchestrates codegen via BIB-CLI
- ensures domain isolation
- helps stakeholders audit everything

### 3. Generated App (React + Node + SQLite)
After `bib create app`, you get a fully local development environment:
```bash
npm run dev:app        # runs the generated app (React+Node)
npm run dev:acm        # runs the ACM dashboard
```

## 💻 Local-First Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Frontend | React | Vite or Next.js (local mode) |
| Backend | Node.js | Fastify or Express |
| Database | SQLite | Prisma ORM (migrations local) |
| E2E Tests | Playwright | Video enabled by default |
| AI (opt.) | Local ports | You choose: fake, offline, or provider |

All deterministic, all local.

## 🗂 Repository Structure

```
/bib-cli                    # CLI powered by GenAI (optional use)
/acm                        # Local orchestrator web app (Node+React)
/my-app                     # created by `bib create app my-app`
  /frontend
    /domains
      /<feature>            # e.g. instagramImagePost
        components/
        pages/
        api/
        tests.unit/
        tests.e2e/
  /backend
    /domains
      /<feature>
        domain/
        infra/
        tests.unit/
        tests.integration/
  /domains-meta
    /<feature>
      specs/
        F_<FEATURE>.feature
        F_<FEATURE>.tech.yaml
        F_<FEATURE>.ai.yaml       # optional
      acmStatus.json
      tests.status.json
      e2e.videos/
  prisma/
    schema.prisma
  package.json
```

Everything lives within a domain.

## 📄 Spec System (Business / Tech / AI)

1. **BusinessSpec → BDD (.feature)**
   Generated from natural language.

2. **TechSpec → architecture (.tech.yaml)**
   Defines patterns, UI-first, repository patterns, DB strategy, test strategy.

3. **AiSpec → optional AI (.ai.yaml)**
   Defines ports, models, constraints, fallback.
   `enabled: false` or absence of AiSpec → feature has zero AI.

## 🔄 Feature Lifecycle

1. `bib create feature F_X`
2. Add business draft (.draft.md)
3. `bib business refine-bdd`
4. `bib business publish-bdd`
5. Add tech draft
6. `bib tech refine-architecture`
7. `bib tech publish-architecture`
8. Optional: AI draft → refine → publish
9. `bib generate frontend`
10. Validate prototype (UI-first)
11. `bib generate backend`
12. `bib generate persistence` (SQLite)
13. `bib generate ai-integration` (optional)
14. Run tests via CLI or ACM UI

## 🧪 Testing & Local In-App Execution

Every domain includes:
- frontend unit tests
- backend unit tests
- backend integration tests
- full E2E tests (Playwright)
- e2e video outputs

**Run tests via CLI:**
```bash
bib test run --feature F_X
bib test run --feature F_X --type unit_frontend
bib test run --scenario SCN_X_003
```

**Run tests inside ACM (the app itself)**
In ACM UI:
1. Open Feature → Tests
2. Click "Run unit tests"
3. See:
   - status
   - logs
   - coverage
   - videos (for E2E)

This is ideal for auditors, product owners, QAs, devs.

## 🧬 Optional ML / GenAI

BIB never forces AI. For each feature:
- Add AiSpec only if needed
- AI adapters only generate if AiSpec has `enabled: true`
- Ports isolate AI behind stable interfaces

Examples:
```typescript
export interface ImageGenPort {
  generateImages(input: { prompt: string; count: number }): Promise<{ urls: string[] }>
}
```

Fake versions allow full offline AI simulation.

## 🎬 End-to-End Real Example

**Feature: F_INSTAGRAM_IMAGE_POST**
**Project: my-app**

### Step 1 – Create App
```bash
bib create app my-app
cd my-app
```

### Step 2 – Add Feature
```bash
bib create feature instagramImagePost
```

This creates:
- `/app/frontend/domains/instagramImagePost`
- `/app/backend/domains/instagramImagePost`
- `/app/domains-meta/instagramImagePost/specs`

### Step 3 – Business writes natural language → refine to BDD
```bash
bib business refine-bdd --feature F_INSTAGRAM_IMAGE_POST
```
Produces BDD scenarios (AI image generation, drag text, warnings, etc.)

### Step 4 – Tech refines architecture
```bash
bib tech refine-architecture --feature F_INSTAGRAM_IMAGE_POST
```

### Step 5 – Optional AI spec
```bash
bib data refine-ai --feature F_INSTAGRAM_IMAGE_POST
```

### Step 6 – Generate UI-first prototype
```bash
bib generate frontend --feature F_INSTAGRAM_IMAGE_POST
```
Open local app: http://localhost:4000/instagramImagePost

### Step 7 – Run frontend unit tests from the ACM
1. Open ACM: http://localhost:4500
2. Go to Feature → Tests → Run unit tests
3. See results, logs.

### Step 8 – Generate backend + DB
```bash
bib generate backend --feature F_INSTAGRAM_IMAGE_POST
bib generate persistence --feature F_INSTAGRAM_IMAGE_POST
```

### Step 9 – Run full e2e
```bash
bib test run --feature F_INSTAGRAM_IMAGE_POST --type e2e
```
Or run from ACM UI → "Run E2E"

Watch recorded video from:
`/app/domains-meta/instagramImagePost/e2e.videos`

## 🚀 Roadmap

- Plugin system (scaffolding templates)
- Multi-stack support
- Offline LLM provider support
- Full CI integration
- VSCode extension (BIB spec assistant)
- Repository examples (Todo, Blog, Instagram, CRM)

## 🤝 Contributing

We welcome:
- feature ideas
- domain examples
- code generators
- AI adapters
- documentation
- UI enhancements for ACM

Always follow the domain structure:
- `frontend/domains/<feature>`
- `backend/domains/<feature>`
- `domains-meta/<feature>`

## 📜 License

MIT License. Build-Intelligent-Blocks (BIB) is open-source for anyone to use, modify, and evolve.