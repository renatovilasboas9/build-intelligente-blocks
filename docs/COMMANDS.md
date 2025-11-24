# ⌨️ Comandos Úteis - Referência Rápida

## 🚀 Instalação

### Instalar Tudo de Uma Vez

```bash
# Instalar root
npm install

# Instalar backend
cd backend && npm install && cd ..

# Instalar frontend
cd frontend && npm install && cd ..
```

### Ou Usar Script

```bash
chmod +x install.sh
./install.sh
```

---

## 🏃 Executar

### Rodar Backend

```bash
# Desenvolvimento (com watch)
npm run dev:backend

# Ou diretamente
cd backend
npm run start:dev
```

**Porta**: 3001  
**URL**: http://localhost:3001

### Rodar Frontend

```bash
# Desenvolvimento
npm run dev:frontend

# Ou diretamente
cd frontend
npm run dev
```

**Porta**: 3000  
**URL**: http://localhost:3000

---

## 🔨 Build

### Build Backend

```bash
npm run build:backend

# Ou diretamente
cd backend
npm run build
```

**Output**: `backend/dist/`

### Build Frontend

```bash
npm run build:frontend

# Ou diretamente
cd frontend
npm run build
```

**Output**: `frontend/dist/`

---

## 🧹 Limpeza

### Limpar node_modules

```bash
# Root
rm -rf node_modules

# Backend
rm -rf backend/node_modules

# Frontend
rm -rf frontend/node_modules

# Todos de uma vez
rm -rf node_modules backend/node_modules frontend/node_modules
```

### Limpar Builds

```bash
# Backend
rm -rf backend/dist

# Frontend
rm -rf frontend/dist

# Ambos
rm -rf backend/dist frontend/dist
```

### Limpar package-lock

```bash
# Root
rm -f package-lock.json

# Backend
rm -f backend/package-lock.json

# Frontend
rm -f frontend/package-lock.json

# Todos
rm -f package-lock.json backend/package-lock.json frontend/package-lock.json
```

### Limpeza Completa

```bash
# Remover tudo e reinstalar
rm -rf node_modules backend/node_modules frontend/node_modules
rm -rf backend/dist frontend/dist
rm -f package-lock.json backend/package-lock.json frontend/package-lock.json

npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

---

## 🔍 Diagnóstico

### Verificar Versões

```bash
# Node.js
node --version

# npm
npm --version

# TypeScript (se instalado globalmente)
tsc --version
```

### Verificar Portas em Uso

```bash
# Porta 3000 (Frontend)
lsof -i :3000

# Porta 3001 (Backend)
lsof -i :3001

# Ambas
lsof -i :3000 -i :3001
```

### Matar Processos

```bash
# Por porta
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:3001)

# Por PID (substitua <PID>)
kill -9 <PID>
```

### Testar Backend

```bash
# Health check
curl http://localhost:3001/intelligence/metrics

# Com formatação JSON (se tiver jq)
curl http://localhost:3001/intelligence/metrics | jq
```

---

## 📦 Gerenciamento de Dependências

### Adicionar Dependência

```bash
# Backend
cd backend
npm install <package-name>
cd ..

# Frontend
cd frontend
npm install <package-name>
cd ..
```

### Adicionar Dev Dependency

```bash
# Backend
cd backend
npm install --save-dev <package-name>
cd ..

# Frontend
cd frontend
npm install --save-dev <package-name>
cd ..
```

### Atualizar Dependências

```bash
# Backend
cd backend
npm update
cd ..

# Frontend
cd frontend
npm update
cd ..
```

### Listar Dependências Desatualizadas

```bash
# Backend
cd backend
npm outdated
cd ..

# Frontend
cd frontend
npm outdated
cd ..
```

---

## 🐛 Debug

### Logs do Backend

```bash
cd backend
npm run start:dev

# Com logs detalhados
DEBUG=* npm run start:dev
```

### Logs do Frontend

```bash
cd frontend
npm run dev

# Com logs detalhados
DEBUG=* npm run dev
```

### Verificar Erros de TypeScript

```bash
# Backend
cd backend
npx tsc --noEmit
cd ..

# Frontend
cd frontend
npx tsc --noEmit
cd ..
```

---

## 🧪 Testes (Para Implementar)

### Rodar Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Testes com Cobertura

```bash
# Backend
cd backend
npm run test:cov

# Frontend
cd frontend
npm run test:cov
```

---

## 📊 Análise de Código

### Lint

```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
```

### Format

```bash
# Backend
cd backend
npm run format

# Frontend
cd frontend
npm run format
```

---

## 🔐 Segurança

### Audit de Vulnerabilidades

```bash
# Root
npm audit

# Backend
cd backend
npm audit
cd ..

# Frontend
cd frontend
npm audit
cd ..
```

### Corrigir Vulnerabilidades

```bash
# Automático
npm audit fix

# Forçar correções (cuidado!)
npm audit fix --force
```

---

## 📝 Git

### Inicializar Repositório

```bash
git init
git add .
git commit -m "Initial commit: Demo de Data Products"
```

### Adicionar Remote

```bash
git remote add origin <url-do-repositorio>
git push -u origin main
```

### Criar Branch

```bash
git checkout -b feature/nova-funcionalidade
```

### Commit

```bash
git add .
git commit -m "feat: adiciona nova jornada"
git push
```

---

## 🌐 Rede

### Verificar Conectividade

```bash
# Ping localhost
ping localhost

# Testar porta
nc -zv localhost 3000
nc -zv localhost 3001
```

### Verificar Firewall (macOS)

```bash
# Status do firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate

# Listar aplicações bloqueadas
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --listapps
```

---

## 💾 Backup

### Backup de Configurações

```bash
# Copiar configs
cp -r configs configs_backup_$(date +%Y%m%d)

# Criar tarball
tar -czf demo_backup_$(date +%Y%m%d).tar.gz configs backend/src frontend/src
```

### Restaurar Backup

```bash
# Extrair tarball
tar -xzf demo_backup_20251120.tar.gz
```

---

## 📈 Performance

### Analisar Bundle Size (Frontend)

```bash
cd frontend
npm run build
npx vite-bundle-visualizer
```

### Analisar Dependências

```bash
# Backend
cd backend
npm ls

# Frontend
cd frontend
npm ls
```

---

## 🔄 Reiniciar Tudo

### Reinício Rápido

```bash
# Matar processos
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:3001)

# Reiniciar
npm run dev:backend &
npm run dev:frontend &
```

### Reinício Completo

```bash
# Matar processos
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:3001)

# Limpar e reinstalar
rm -rf node_modules backend/node_modules frontend/node_modules
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Rodar
npm run dev:backend &
npm run dev:frontend &
```

---

## 🎯 Atalhos Úteis

### Abrir no Navegador

```bash
# macOS
open http://localhost:3000

# Linux
xdg-open http://localhost:3000

# Windows (Git Bash)
start http://localhost:3000
```

### Abrir no VS Code

```bash
code .
```

### Abrir Documentação

```bash
# macOS
open README.md

# Linux
xdg-open README.md
```

---

## 📱 Comandos por Cenário

### Cenário: Primeira Instalação

```bash
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
npm run dev:backend &
npm run dev:frontend &
open http://localhost:3000
```

### Cenário: Algo Deu Errado

```bash
kill -9 $(lsof -t -i:3000) $(lsof -t -i:3001)
rm -rf node_modules backend/node_modules frontend/node_modules
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
npm run dev:backend &
npm run dev:frontend &
```

### Cenário: Atualizar Código

```bash
git pull
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
kill -9 $(lsof -t -i:3000) $(lsof -t -i:3001)
npm run dev:backend &
npm run dev:frontend &
```

### Cenário: Preparar Demo

```bash
# Limpar eventos antigos
kill -9 $(lsof -t -i:3001)
npm run dev:backend &

# Aguardar 5 segundos
sleep 5

# Abrir navegador
open http://localhost:3000
```

---

## 🔧 Variáveis de Ambiente

### Criar .env (Backend)

```bash
cd backend
cat > .env << EOF
PORT=3001
NODE_ENV=development
EOF
cd ..
```

### Criar .env (Frontend)

```bash
cd frontend
cat > .env << EOF
VITE_API_URL=http://localhost:3001
EOF
cd ..
```

---

## 📊 Monitoramento

### Ver Logs em Tempo Real

```bash
# Backend
cd backend
npm run start:dev | tee backend.log

# Frontend
cd frontend
npm run dev | tee frontend.log
```

### Monitorar Uso de Recursos

```bash
# CPU e Memória
top

# Processos Node
ps aux | grep node
```

---

## 🎓 Comandos Educacionais

### Ver Estrutura do Projeto

```bash
tree -L 3 -I 'node_modules|dist'
```

### Contar Linhas de Código

```bash
# Backend
find backend/src -name "*.ts" | xargs wc -l

# Frontend
find frontend/src -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Total
find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | xargs wc -l
```

### Ver Dependências

```bash
# Backend
cd backend
npm list --depth=0

# Frontend
cd frontend
npm list --depth=0
```

---

## 🚨 Comandos de Emergência

### Tudo Travou

```bash
# Matar todos os processos Node
killall node

# Ou mais agressivo
killall -9 node
```

### Porta Ocupada

```bash
# Descobrir o que está usando a porta
lsof -i :3000
lsof -i :3001

# Matar processo específico
kill -9 <PID>
```

### Espaço em Disco Cheio

```bash
# Limpar node_modules
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# Limpar builds
find . -name "dist" -type d -prune -exec rm -rf '{}' +

# Limpar cache npm
npm cache clean --force
```

---

**Comandos organizados para máxima produtividade! ⚡**

---

*Dica: Adicione os comandos mais usados como aliases no seu .bashrc ou .zshrc*

```bash
# Exemplo de aliases
alias demo-backend="cd ~/demo-data-products && npm run dev:backend"
alias demo-frontend="cd ~/demo-data-products && npm run dev:frontend"
alias demo-clean="cd ~/demo-data-products && rm -rf node_modules backend/node_modules frontend/node_modules"
```
