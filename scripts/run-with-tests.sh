#!/bin/bash

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

clear

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                                        ║${NC}"
echo -e "${CYAN}║     🧪 DEMO COM TESTES AUTOMATIZADOS                  ║${NC}"
echo -e "${CYAN}║                                                        ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Carregar NVM
if [ -d "$HOME/.nvm" ]; then
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm use 20 2>/dev/null || nvm use default 2>/dev/null
fi

# Verificar Node.js
NODE_VERSION=$(node -v 2>/dev/null)
if [ -z "$NODE_VERSION" ]; then
    echo -e "${RED}❌ Node.js não encontrado${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $NODE_VERSION${NC}"
echo ""

# Instalar dependências se necessário
echo -e "${BLUE}📦 Verificando dependências...${NC}"
if [ ! -d "node_modules" ]; then
    npm install
fi

if [ ! -d "app-back-end/node_modules" ]; then
    cd app-back-end && npm install && cd ..
fi

if [ ! -d "e2e-tests/node_modules" ]; then
    cd e2e-tests && npm install && cd ..
fi

echo -e "${GREEN}✅ Dependências OK${NC}"
echo ""

# Executar testes unitários do backend
echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  🧪 TESTES UNITÁRIOS - BACKEND                         ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

cd app-back-end
npm test

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ❌ TESTES FALHARAM - DEMO NÃO SERÁ INICIADA          ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}Corrija os testes antes de continuar.${NC}"
    cd ..
    exit 1
fi

cd ..

echo ""
echo -e "${GREEN}✅ Todos os testes unitários passaram!${NC}"
echo ""

# Iniciar backend para testes E2E
echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  🚀 INICIANDO BACKEND PARA TESTES E2E                  ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Liberar portas
lsof -ti:3001 | xargs kill -9 2>/dev/null

# Iniciar backend
cd app-back-end
node src/server.js > ../logs/test-backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo -e "${GREEN}✅ Backend iniciado (PID: $BACKEND_PID)${NC}"
echo ""

# Aguardar backend
echo -e "${BLUE}⏳ Aguardando backend...${NC}"
sleep 5

# Executar testes E2E
echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  🧪 TESTES E2E - JORNADAS                              ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

cd e2e-tests
npm test

E2E_RESULT=$?
cd ..

# Parar backend de teste
kill -9 $BACKEND_PID 2>/dev/null

if [ $E2E_RESULT -ne 0 ]; then
    echo ""
    echo -e "${RED}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ❌ TESTES E2E FALHARAM - DEMO NÃO SERÁ INICIADA      ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Todos os testes E2E passaram!${NC}"
echo ""

# Todos os testes passaram - iniciar demo
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}║  ✅ TODOS OS TESTES PASSARAM - INICIANDO DEMO         ║${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Executar demo
./scripts/demo.sh
