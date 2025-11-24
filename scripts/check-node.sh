#!/bin/bash

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}║     🔍 VERIFICAÇÃO DE VERSÃO DO NODE.JS               ║${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado!${NC}"
    echo ""
    echo -e "${YELLOW}Por favor, instale Node.js primeiro:${NC}"
    echo -e "   ${BLUE}https://nodejs.org/${NC}"
    echo ""
    echo -e "${YELLOW}Ou leia: ${BLUE}ATUALIZAR-NODE.md${NC}"
    exit 1
fi

# Obter versão
NODE_VERSION=$(node -v)
NODE_MAJOR=$(node -v | cut -d'.' -f1 | sed 's/v//')

echo -e "${BLUE}📋 Versão atual do Node.js:${NC} ${YELLOW}$NODE_VERSION${NC}"
echo ""

# Verificar versão
if [ "$NODE_MAJOR" -ge 18 ]; then
    echo -e "${GREEN}✅ Versão do Node.js é adequada!${NC}"
    echo -e "${GREEN}   Você pode rodar a demo sem problemas.${NC}"
    echo ""
    echo -e "${BLUE}Para iniciar a demo:${NC}"
    echo -e "   ${YELLOW}./start-demo.sh${NC}"
    exit 0
elif [ "$NODE_MAJOR" -ge 14 ]; then
    echo -e "${YELLOW}⚠️  Versão do Node.js é antiga mas pode funcionar.${NC}"
    echo -e "${YELLOW}   Recomendamos atualizar para v18+ ou v20+${NC}"
    echo ""
    echo -e "${BLUE}Para atualizar:${NC}"
    echo -e "   ${YELLOW}Leia: ATUALIZAR-NODE.md${NC}"
    echo ""
    echo -e "${BLUE}Para tentar rodar mesmo assim:${NC}"
    echo -e "   ${YELLOW}./start-demo.sh${NC}"
    exit 0
else
    echo -e "${RED}❌ Versão do Node.js é MUITO ANTIGA!${NC}"
    echo -e "${RED}   Versão mínima: v14${NC}"
    echo -e "${RED}   Recomendada: v18+ ou v20+${NC}"
    echo ""
    echo -e "${YELLOW}A demo NÃO VAI FUNCIONAR com esta versão.${NC}"
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║                                                        ║${NC}"
    echo -e "${BLUE}║     📖 COMO ATUALIZAR O NODE.JS                       ║${NC}"
    echo -e "${BLUE}║                                                        ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}Opção 1: Usando Homebrew (macOS)${NC}"
    echo -e "   ${BLUE}brew install node@20${NC}"
    echo ""
    echo -e "${YELLOW}Opção 2: Usando NVM (Recomendado)${NC}"
    echo -e "   ${BLUE}curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash${NC}"
    echo -e "   ${BLUE}source ~/.zshrc${NC}"
    echo -e "   ${BLUE}nvm install --lts${NC}"
    echo -e "   ${BLUE}nvm use --lts${NC}"
    echo ""
    echo -e "${YELLOW}Opção 3: Download Direto${NC}"
    echo -e "   ${BLUE}https://nodejs.org/${NC}"
    echo ""
    echo -e "${YELLOW}📚 Guia completo:${NC}"
    echo -e "   ${BLUE}cat ATUALIZAR-NODE.md${NC}"
    echo ""
    exit 1
fi
