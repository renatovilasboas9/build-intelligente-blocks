#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}║     🛑 PARANDO DEMO DE DATA PRODUCTS                  ║${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Ler PIDs salvos
if [ -f .backend.pid ]; then
    BACKEND_PID=$(cat .backend.pid)
    echo -e "${BLUE}🔍 Backend PID encontrado: $BACKEND_PID${NC}"
    
    if ps -p $BACKEND_PID > /dev/null 2>&1; then
        echo -e "${YELLOW}🛑 Parando backend...${NC}"
        kill -9 $BACKEND_PID 2>/dev/null
        echo -e "${GREEN}✅ Backend parado${NC}"
    else
        echo -e "${YELLOW}⚠️  Backend já estava parado${NC}"
    fi
    
    rm -f .backend.pid
else
    echo -e "${YELLOW}⚠️  Arquivo .backend.pid não encontrado${NC}"
fi

echo ""

if [ -f .frontend.pid ]; then
    FRONTEND_PID=$(cat .frontend.pid)
    echo -e "${BLUE}🔍 Frontend PID encontrado: $FRONTEND_PID${NC}"
    
    if ps -p $FRONTEND_PID > /dev/null 2>&1; then
        echo -e "${YELLOW}🛑 Parando frontend...${NC}"
        kill -9 $FRONTEND_PID 2>/dev/null
        echo -e "${GREEN}✅ Frontend parado${NC}"
    else
        echo -e "${YELLOW}⚠️  Frontend já estava parado${NC}"
    fi
    
    rm -f .frontend.pid
else
    echo -e "${YELLOW}⚠️  Arquivo .frontend.pid não encontrado${NC}"
fi

echo ""

# Matar qualquer processo nas portas 3000 e 3001
echo -e "${BLUE}🔍 Verificando portas 3000 e 3001...${NC}"

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}🛑 Matando processos na porta 3000...${NC}"
    kill -9 $(lsof -t -i:3000) 2>/dev/null
    echo -e "${GREEN}✅ Porta 3000 liberada${NC}"
else
    echo -e "${GREEN}✅ Porta 3000 já estava livre${NC}"
fi

if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}🛑 Matando processos na porta 3001...${NC}"
    kill -9 $(lsof -t -i:3001) 2>/dev/null
    echo -e "${GREEN}✅ Porta 3001 liberada${NC}"
else
    echo -e "${GREEN}✅ Porta 3001 já estava livre${NC}"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}║     ✅ DEMO PARADA COM SUCESSO!                       ║${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Para iniciar novamente, execute:${NC}"
echo -e "   ${YELLOW}./start-demo.sh${NC}"
echo ""
