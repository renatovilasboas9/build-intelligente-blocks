#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}║     🚀 DEMO DE DATA PRODUCTS - INSTALAÇÃO COMPLETA    ║${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Carregar NVM se existir
if [ -d "$HOME/.nvm" ]; then
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm use 20 2>/dev/null || nvm use default 2>/dev/null
fi

# Verificar Node.js
echo -e "${BLUE}📋 Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado.${NC}"
    echo -e "${YELLOW}Leia: ATUALIZAR-NODE.md${NC}"
    exit 1
fi

NODE_VERSION=$(node -v)
NODE_MAJOR=$(node -v | cut -d'.' -f1 | sed 's/v//')

echo -e "${GREEN}✅ Node.js encontrado: $NODE_VERSION${NC}"

# Verificar se versão é adequada
if [ "$NODE_MAJOR" -lt 14 ]; then
    echo -e "${RED}❌ Node.js v$NODE_MAJOR é MUITO ANTIGO!${NC}"
    echo -e "${RED}   Versão mínima: v14${NC}"
    echo -e "${RED}   Recomendada: v18+ ou v20+${NC}"
    echo ""
    echo -e "${YELLOW}Para atualizar, leia: ${BLUE}ATUALIZAR-NODE.md${NC}"
    echo -e "${YELLOW}Ou execute: ${BLUE}./instalar-node-nvm.sh${NC}"
    echo ""
    exit 1
elif [ "$NODE_MAJOR" -lt 18 ]; then
    echo -e "${YELLOW}⚠️  Node.js v$NODE_MAJOR é antigo. Recomendamos v18+${NC}"
    echo -e "${YELLOW}   Leia: ATUALIZAR-NODE.md${NC}"
fi
echo ""

# Verificar npm
echo -e "${BLUE}📋 Verificando npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm não encontrado.${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm encontrado: $NPM_VERSION${NC}"
echo ""

# Limpar instalações anteriores
echo -e "${YELLOW}🧹 Limpando instalações anteriores...${NC}"
rm -rf node_modules backend/node_modules frontend/node_modules
rm -rf backend/dist frontend/dist
echo -e "${GREEN}✅ Limpeza concluída${NC}"
echo ""

# Instalar dependências do root
echo -e "${BLUE}📦 Instalando dependências do root...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar dependências do root${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependências do root instaladas${NC}"
echo ""

# Instalar dependências do backend
echo -e "${BLUE}📦 Instalando dependências do backend...${NC}"
cd backend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar dependências do backend${NC}"
    cd ..
    exit 1
fi
cd ..
echo -e "${GREEN}✅ Dependências do backend instaladas${NC}"
echo ""

# Instalar dependências do frontend
echo -e "${BLUE}📦 Instalando dependências do frontend...${NC}"
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar dependências do frontend${NC}"
    cd ..
    exit 1
fi
cd ..
echo -e "${GREEN}✅ Dependências do frontend instaladas${NC}"
echo ""

# Verificar portas
echo -e "${BLUE}🔍 Verificando portas 3000 e 3001...${NC}"
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Porta 3000 em uso. Matando processo...${NC}"
    kill -9 $(lsof -t -i:3000) 2>/dev/null
fi

if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Porta 3001 em uso. Matando processo...${NC}"
    kill -9 $(lsof -t -i:3001) 2>/dev/null
fi
echo -e "${GREEN}✅ Portas liberadas${NC}"
echo ""

# Criar logs directory
mkdir -p logs

echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}║     ✅ INSTALAÇÃO CONCLUÍDA COM SUCESSO!              ║${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Iniciar backend em background
echo -e "${BLUE}🚀 Iniciando Backend (porta 3001)...${NC}"
cd backend
npm run start:dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..
echo -e "${GREEN}✅ Backend iniciado (PID: $BACKEND_PID)${NC}"
echo ""

# Verificar health do backend
echo -e "${BLUE}🔍 Verificando saúde do backend...${NC}"
./check-backend.sh

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Backend não está respondendo${NC}"
    echo -e "${YELLOW}Verifique os logs: cat logs/backend.log${NC}"
    kill -9 $BACKEND_PID 2>/dev/null
    exit 1
fi

# Iniciar frontend em background
echo -e "${BLUE}🚀 Iniciando Frontend (porta 3000)...${NC}"
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..
echo -e "${GREEN}✅ Frontend iniciado (PID: $FRONTEND_PID)${NC}"
echo ""

# Aguardar frontend inicializar
echo -e "${BLUE}⏳ Aguardando frontend inicializar (10 segundos)...${NC}"
sleep 10

# Verificar se frontend está rodando
if ! ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${RED}❌ Frontend falhou ao iniciar. Verifique logs/frontend.log${NC}"
    kill -9 $BACKEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}║     🎉 DEMO RODANDO COM SUCESSO!                      ║${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📍 URLs:${NC}"
echo -e "   Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "   Backend:  ${GREEN}http://localhost:3001${NC}"
echo ""
echo -e "${BLUE}📊 PIDs dos Processos:${NC}"
echo -e "   Backend:  ${YELLOW}$BACKEND_PID${NC}"
echo -e "   Frontend: ${YELLOW}$FRONTEND_PID${NC}"
echo ""
echo -e "${BLUE}📝 Logs:${NC}"
echo -e "   Backend:  ${YELLOW}logs/backend.log${NC}"
echo -e "   Frontend: ${YELLOW}logs/frontend.log${NC}"
echo ""
echo -e "${BLUE}🎮 Como usar:${NC}"
echo -e "   1. Abra ${GREEN}http://localhost:3000${NC} no navegador"
echo -e "   2. Clique no botão ${YELLOW}🔧 Debug Panel${NC} (canto superior direito)"
echo -e "   3. Selecione uma jornada (ex: ${YELLOW}carla_default${NC})"
echo -e "   4. Faça login com CPF: ${YELLOW}11111111111${NC}"
echo -e "   5. Explore a demo!"
echo ""
echo -e "${BLUE}📚 Documentação:${NC}"
echo -e "   Roteiro de apresentação: ${YELLOW}DEMO_GUIDE.md${NC}"
echo -e "   Guia rápido: ${YELLOW}QUICK_START.md${NC}"
echo ""
echo -e "${BLUE}🛑 Para parar a demo:${NC}"
echo -e "   Execute: ${YELLOW}./stop-demo.sh${NC}"
echo -e "   Ou: ${YELLOW}kill -9 $BACKEND_PID $FRONTEND_PID${NC}"
echo ""

# Salvar PIDs para script de stop
echo "$BACKEND_PID" > .backend.pid
echo "$FRONTEND_PID" > .frontend.pid

# Abrir navegador automaticamente (opcional)
echo -e "${BLUE}🌐 Abrindo navegador...${NC}"
sleep 2
if command -v open &> /dev/null; then
    # macOS
    open http://localhost:3000
elif command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open http://localhost:3000
elif command -v start &> /dev/null; then
    # Windows (Git Bash)
    start http://localhost:3000
fi

echo ""
echo -e "${GREEN}✨ Aproveite a demo! ✨${NC}"
echo ""

# Manter script rodando e mostrar logs
echo -e "${BLUE}📊 Monitorando logs (Ctrl+C para sair do monitor, processos continuarão rodando)...${NC}"
echo ""
tail -f logs/backend.log logs/frontend.log
