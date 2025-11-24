#!/bin/bash

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}║     🔄 ATUALIZAR NODE.JS AUTOMATICAMENTE              ║${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Detectar sistema operacional
OS="$(uname -s)"

case "${OS}" in
    Darwin*)
        echo -e "${BLUE}🍎 Sistema: macOS${NC}"
        echo ""
        echo -e "${YELLOW}Instalando Node.js v20 via NVM...${NC}"
        echo -e "${YELLOW}(Compatível com macOS Sequoia)${NC}"
        echo ""
        
        # Instalar NVM
        if [ ! -d "$HOME/.nvm" ]; then
            echo -e "${BLUE}📦 Instalando NVM...${NC}"
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
        else
            echo -e "${GREEN}✅ NVM já instalado${NC}"
        fi
        
        # Carregar NVM
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        
        # Instalar Node.js
        echo -e "${BLUE}📦 Instalando Node.js v20...${NC}"
        nvm install 20
        nvm use 20
        nvm alias default 20
        
        echo ""
        echo -e "${GREEN}✅ Node.js instalado com sucesso!${NC}"
        echo ""
        echo -e "${BLUE}Versão instalada:${NC}"
        node --version
        npm --version
        echo ""
        echo -e "${YELLOW}⚠️  IMPORTANTE: Reinicie o terminal ou execute:${NC}"
        echo -e "   ${BLUE}source ~/.zshrc${NC}"
        echo ""
        echo -e "${GREEN}Depois rode: ${YELLOW}./start-demo.sh${NC}"
        ;;
        
    Linux*)
        echo -e "${BLUE}🐧 Sistema: Linux${NC}"
        echo ""
        echo -e "${YELLOW}Instalando Node.js v20 via NVM...${NC}"
        echo ""
        
        # Instalar NVM
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
        
        # Carregar NVM
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        
        # Instalar Node.js
        nvm install --lts
        nvm use --lts
        nvm alias default node
        
        echo ""
        echo -e "${GREEN}✅ Node.js instalado com sucesso!${NC}"
        echo ""
        echo -e "${BLUE}Versão instalada:${NC}"
        node --version
        npm --version
        echo ""
        echo -e "${YELLOW}Reinicie o terminal e rode: ${BLUE}./start-demo.sh${NC}"
        ;;
        
    *)
        echo -e "${YELLOW}⚠️  Sistema não reconhecido: ${OS}${NC}"
        echo ""
        echo -e "${BLUE}Por favor, instale Node.js manualmente:${NC}"
        echo -e "   ${YELLOW}https://nodejs.org/${NC}"
        echo ""
        echo -e "${YELLOW}Ou leia: ${BLUE}ATUALIZAR-NODE.md${NC}"
        ;;
esac
