#!/bin/bash

echo "🚀 Instalando Demo de Data Products..."
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Instalar dependências do root
echo -e "${BLUE}📦 Instalando dependências do monorepo...${NC}"
npm install

# Instalar dependências do backend
echo -e "${BLUE}📦 Instalando dependências do backend...${NC}"
cd backend
npm install
cd ..

# Instalar dependências do frontend
echo -e "${BLUE}📦 Instalando dependências do frontend...${NC}"
cd frontend
npm install
cd ..

echo ""
echo -e "${GREEN}✅ Instalação concluída!${NC}"
echo ""
echo "Para rodar a demo:"
echo "  1. Terminal 1: npm run dev:backend"
echo "  2. Terminal 2: npm run dev:frontend"
echo "  3. Abrir: http://localhost:3000"
echo ""
echo "📖 Leia o DEMO_GUIDE.md para roteiro de apresentação"
