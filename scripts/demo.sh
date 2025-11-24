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
echo -e "${CYAN}║     🚀 DEMO DE DATA PRODUCTS                          ║${NC}"
echo -e "${CYAN}║        Inicialização Completa                         ║${NC}"
echo -e "${CYAN}║                                                        ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Carregar NVM se existir
if [ -d "$HOME/.nvm" ]; then
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Verificar Node.js
echo -e "${BLUE}📋 Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado${NC}"
    echo -e "${YELLOW}Execute: ./instalar-node-nvm.sh${NC}"
    exit 1
fi

NODE_VERSION=$(node -v)
NODE_MAJOR=$(node -v | cut -d'.' -f1 | sed 's/v//')

if [ "$NODE_MAJOR" -lt 14 ]; then
    echo -e "${RED}❌ Node.js $NODE_VERSION é muito antigo${NC}"
    echo -e "${YELLOW}Carregando NVM...${NC}"
    
    # Tentar carregar NVM
    if [ -d "$HOME/.nvm" ]; then
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        nvm use 20 2>/dev/null || nvm use default 2>/dev/null
        
        # Verificar novamente
        NODE_VERSION=$(node -v)
        NODE_MAJOR=$(node -v | cut -d'.' -f1 | sed 's/v//')
        
        if [ "$NODE_MAJOR" -lt 14 ]; then
            echo -e "${RED}❌ Ainda usando Node.js antigo${NC}"
            echo -e "${YELLOW}Execute: ./instalar-node-nvm.sh${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}Execute: ./instalar-node-nvm.sh${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Node.js $NODE_VERSION${NC}"
echo ""

# Criar diretório de logs
mkdir -p logs

# Limpar logs antigos
> logs/backend.log
> logs/frontend.log

# Verificar e liberar portas
echo -e "${BLUE}🔍 Verificando portas...${NC}"

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Porta 3000 em uso. Liberando...${NC}"
    kill -9 $(lsof -t -i:3000) 2>/dev/null
fi

if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Porta 3001 em uso. Liberando...${NC}"
    kill -9 $(lsof -t -i:3001) 2>/dev/null
fi

echo -e "${GREEN}✅ Portas 3000 e 3001 livres${NC}"
echo ""

# Verificar dependências
echo -e "${BLUE}📦 Verificando dependências...${NC}"

if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependências do backend...${NC}"
    cd backend && npm install > /dev/null 2>&1 && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependências do frontend...${NC}"
    cd frontend && npm install > /dev/null 2>&1 && cd ..
fi

echo -e "${GREEN}✅ Dependências OK${NC}"
echo ""

# Iniciar Backend
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🔧 INICIANDO BACKEND                                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

cd backend
node src/server.js > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo -e "${GREEN}✅ Backend iniciado (PID: $BACKEND_PID)${NC}"
echo -e "   Porta: ${CYAN}3001${NC}"
echo -e "   Logs:  ${YELLOW}logs/backend.log${NC}"
echo ""

# Salvar PID
echo "$BACKEND_PID" > .backend.pid

# Verificar health do backend
echo -e "${BLUE}🔍 Aguardando backend ficar pronto...${NC}"
./scripts/check-backend.sh

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Backend falhou ao iniciar${NC}"
    echo ""
    echo -e "${YELLOW}Logs do backend:${NC}"
    tail -20 logs/backend.log
    echo ""
    kill -9 $BACKEND_PID 2>/dev/null
    rm -f .backend.pid
    exit 1
fi

# Iniciar Frontend
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🎨 INICIANDO FRONTEND                                 ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo -e "${GREEN}✅ Frontend iniciado (PID: $FRONTEND_PID)${NC}"
echo -e "   Porta: ${CYAN}3000${NC}"
echo -e "   Logs:  ${YELLOW}logs/frontend.log${NC}"
echo ""

# Salvar PID
echo "$FRONTEND_PID" > .frontend.pid

# Aguardar frontend inicializar
echo -e "${BLUE}⏳ Aguardando frontend inicializar...${NC}"
sleep 8

# Verificar se frontend está rodando
if ! ps -p $FRONTEND_PID > /dev/null 2>&1; then
    echo -e "${RED}❌ Frontend falhou ao iniciar${NC}"
    echo ""
    echo -e "${YELLOW}Logs do frontend:${NC}"
    tail -20 logs/frontend.log
    echo ""
    kill -9 $BACKEND_PID 2>/dev/null
    rm -f .backend.pid .frontend.pid
    exit 1
fi

# Sucesso!
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}║     ✅ DEMO RODANDO COM SUCESSO!                      ║${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  📍 INFORMAÇÕES                                        ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}URLs:${NC}"
echo -e "   Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "   Backend:  ${GREEN}http://localhost:3001${NC}"
echo -e "   Health:   ${GREEN}http://localhost:3001/health${NC}"
echo ""
echo -e "${BLUE}PIDs:${NC}"
echo -e "   Backend:  ${YELLOW}$BACKEND_PID${NC}"
echo -e "   Frontend: ${YELLOW}$FRONTEND_PID${NC}"
echo ""
echo -e "${BLUE}Logs:${NC}"
echo -e "   Backend:  ${YELLOW}tail -f logs/backend.log${NC}"
echo -e "   Frontend: ${YELLOW}tail -f logs/frontend.log${NC}"
echo ""

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  🎮 COMO USAR                                          ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}1.${NC} Abra o navegador em: ${GREEN}http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}2.${NC} Clique no botão ${CYAN}🔧 Debug Panel${NC} (canto superior direito)"
echo ""
echo -e "${YELLOW}3.${NC} Selecione uma jornada:"
echo -e "   • ${CYAN}carla_default${NC} - Fluxo padrão"
echo -e "   • ${CYAN}carla_personalized${NC} - Experiência otimizada"
echo -e "   • ${CYAN}jorge_high_latency${NC} - Delay de 3.5s"
echo -e "   • ${CYAN}jorge_password_issue${NC} - Erro de senha"
echo -e "   • ${CYAN}marcos_rejected${NC} - Contrato rejeitado"
echo ""
echo -e "${YELLOW}4.${NC} Faça login:"
echo -e "   CPF:   ${CYAN}11111111111${NC} (ou 22222222222, 33333333333)"
echo -e "   Senha: ${CYAN}qualquer valor${NC}"
echo ""
echo -e "${YELLOW}5.${NC} Explore a demo!"
echo ""

echo -e "${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  🛑 PARA PARAR                                         ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "   Execute: ${YELLOW}./stop-demo.sh${NC}"
echo -e "   Ou:      ${YELLOW}kill -9 $BACKEND_PID $FRONTEND_PID${NC}"
echo ""

# Abrir navegador automaticamente
echo -e "${BLUE}🌐 Abrindo navegador...${NC}"
sleep 2

if command -v open &> /dev/null; then
    open http://localhost:3000
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000
elif command -v start &> /dev/null; then
    start http://localhost:3000
fi

echo ""
echo -e "${GREEN}✨ Aproveite a demo! ✨${NC}"
echo ""
echo -e "${BLUE}📚 Documentação:${NC}"
echo -e "   Roteiro: ${YELLOW}DEMO_GUIDE.md${NC}"
echo -e "   Ajuda:   ${YELLOW}RODAR-AGORA.md${NC}"
echo ""
