#!/bin/bash

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}║     🚀 INSTALAR NODE.JS VIA NVM                       ║${NC}"
echo -e "${BLUE}║        (Compatível com macOS Sequoia)                 ║${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar se NVM já está instalado
if [ -d "$HOME/.nvm" ]; then
    echo -e "${YELLOW}⚠️  NVM já está instalado${NC}"
    echo ""
    
    # Carregar NVM
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    echo -e "${BLUE}Versões do Node.js instaladas:${NC}"
    nvm list
    echo ""
else
    echo -e "${BLUE}📦 Instalando NVM...${NC}"
    echo ""
    
    # Instalar NVM
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erro ao instalar NVM${NC}"
        exit 1
    fi
    
    echo ""
    echo -e "${GREEN}✅ NVM instalado com sucesso!${NC}"
    echo ""
    
    # Carregar NVM
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Instalar Node.js LTS
echo -e "${BLUE}📦 Instalando Node.js LTS (v20)...${NC}"
echo ""

nvm install 20

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar Node.js${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Node.js instalado com sucesso!${NC}"
echo ""

# Definir como padrão
echo -e "${BLUE}⚙️  Configurando Node.js v20 como padrão...${NC}"
nvm use 20
nvm alias default 20

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}║     ✅ INSTALAÇÃO CONCLUÍDA!                          ║${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Mostrar versões
echo -e "${BLUE}📋 Versões instaladas:${NC}"
echo -e "   Node.js: ${GREEN}$(node --version)${NC}"
echo -e "   npm:     ${GREEN}$(npm --version)${NC}"
echo ""

# Adicionar ao shell profile
SHELL_PROFILE=""
if [ -f "$HOME/.zshrc" ]; then
    SHELL_PROFILE="$HOME/.zshrc"
elif [ -f "$HOME/.bashrc" ]; then
    SHELL_PROFILE="$HOME/.bashrc"
elif [ -f "$HOME/.bash_profile" ]; then
    SHELL_PROFILE="$HOME/.bash_profile"
fi

if [ -n "$SHELL_PROFILE" ]; then
    # Verificar se já está no profile
    if ! grep -q "NVM_DIR" "$SHELL_PROFILE"; then
        echo -e "${BLUE}⚙️  Adicionando NVM ao $SHELL_PROFILE...${NC}"
        echo "" >> "$SHELL_PROFILE"
        echo "# NVM (Node Version Manager)" >> "$SHELL_PROFILE"
        echo 'export NVM_DIR="$HOME/.nvm"' >> "$SHELL_PROFILE"
        echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> "$SHELL_PROFILE"
        echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> "$SHELL_PROFILE"
        echo ""
        echo -e "${GREEN}✅ NVM adicionado ao $SHELL_PROFILE${NC}"
    else
        echo -e "${GREEN}✅ NVM já está configurado no $SHELL_PROFILE${NC}"
    fi
fi

echo ""
echo -e "${YELLOW}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${YELLOW}║                                                        ║${NC}"
echo -e "${YELLOW}║     ⚠️  IMPORTANTE - LEIA ISTO                        ║${NC}"
echo -e "${YELLOW}║                                                        ║${NC}"
echo -e "${YELLOW}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}Para usar o Node.js neste terminal, execute:${NC}"
echo ""
echo -e "   ${BLUE}export NVM_DIR=\"\$HOME/.nvm\"${NC}"
echo -e "   ${BLUE}[ -s \"\$NVM_DIR/nvm.sh\" ] && \\. \"\$NVM_DIR/nvm.sh\"${NC}"
echo ""
echo -e "${YELLOW}Ou simplesmente:${NC}"
echo ""
echo -e "   ${BLUE}source ~/.zshrc${NC}  ${YELLOW}(se usa zsh)${NC}"
echo -e "   ${BLUE}source ~/.bashrc${NC} ${YELLOW}(se usa bash)${NC}"
echo ""
echo -e "${YELLOW}Ou abra um NOVO TERMINAL${NC}"
echo ""
echo -e "${GREEN}Depois, rode a demo:${NC}"
echo -e "   ${BLUE}./start-demo.sh${NC}"
echo ""
