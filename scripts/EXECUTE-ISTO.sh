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
echo -e "${CYAN}║     🎯 DEMO DE DATA PRODUCTS - INSTALAÇÃO COMPLETA    ║${NC}"
echo -e "${CYAN}║                                                        ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar Node.js
NODE_VERSION=$(node -v 2>/dev/null)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')

if [ -z "$NODE_VERSION" ]; then
    echo -e "${RED}❌ Node.js não encontrado${NC}"
    NEED_INSTALL=true
elif [ "$NODE_MAJOR" -lt 14 ]; then
    echo -e "${RED}❌ Node.js $NODE_VERSION é muito antigo${NC}"
    NEED_INSTALL=true
else
    echo -e "${GREEN}✅ Node.js $NODE_VERSION encontrado${NC}"
    NEED_INSTALL=false
fi

echo ""

if [ "$NEED_INSTALL" = true ]; then
    echo -e "${YELLOW}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║                                                        ║${NC}"
    echo -e "${YELLOW}║     📦 INSTALANDO NODE.JS                             ║${NC}"
    echo -e "${YELLOW}║                                                        ║${NC}"
    echo -e "${YELLOW}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    # Executar instalação
    ./instalar-node-nvm.sh
    
    if [ $? -ne 0 ]; then
        echo ""
        echo -e "${RED}❌ Erro na instalação do Node.js${NC}"
        echo ""
        echo -e "${YELLOW}Tente manualmente:${NC}"
        echo -e "   ${BLUE}./instalar-node-nvm.sh${NC}"
        echo ""
        exit 1
    fi
    
    echo ""
    echo -e "${YELLOW}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║                                                        ║${NC}"
    echo -e "${YELLOW}║     ⚠️  AÇÃO NECESSÁRIA                               ║${NC}"
    echo -e "${YELLOW}║                                                        ║${NC}"
    echo -e "${YELLOW}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}Para ativar o Node.js neste terminal, execute:${NC}"
    echo ""
    echo -e "   ${CYAN}source ~/.zshrc${NC}"
    echo ""
    echo -e "${YELLOW}Ou abra um NOVO TERMINAL e execute:${NC}"
    echo ""
    echo -e "   ${CYAN}./start-demo.sh${NC}"
    echo ""
    exit 0
fi

# Node.js OK, rodar demo
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}║     🚀 INICIANDO DEMO                                 ║${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

./start-demo.sh
