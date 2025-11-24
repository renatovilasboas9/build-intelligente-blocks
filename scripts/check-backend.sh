#!/bin/bash

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BACKEND_URL="http://localhost:3001"
MAX_ATTEMPTS=30
ATTEMPT=0

echo -e "${BLUE}🔍 Verificando se backend está rodando...${NC}"

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    ATTEMPT=$((ATTEMPT + 1))
    
    # Tentar conectar ao health check
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/health" 2>/dev/null)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ Backend está rodando e respondendo!${NC}"
        echo ""
        
        # Mostrar informações do health check
        HEALTH_INFO=$(curl -s "$BACKEND_URL/health" 2>/dev/null)
        echo -e "${BLUE}📊 Informações do Backend:${NC}"
        echo "$HEALTH_INFO" | grep -E '"status"|"uptime"|"version"' | sed 's/^/   /'
        echo ""
        
        exit 0
    fi
    
    if [ $ATTEMPT -eq 1 ]; then
        echo -e "${YELLOW}⏳ Aguardando backend iniciar...${NC}"
    fi
    
    # Mostrar progresso
    if [ $((ATTEMPT % 5)) -eq 0 ]; then
        echo -e "${YELLOW}   Tentativa $ATTEMPT de $MAX_ATTEMPTS...${NC}"
    fi
    
    sleep 1
done

echo ""
echo -e "${RED}❌ Backend não respondeu após $MAX_ATTEMPTS segundos${NC}"
echo ""
echo -e "${YELLOW}Possíveis causas:${NC}"
echo -e "   1. Backend não foi iniciado"
echo -e "   2. Porta 3001 está ocupada"
echo -e "   3. Erro ao iniciar o backend"
echo ""
echo -e "${BLUE}Verifique os logs:${NC}"
echo -e "   ${YELLOW}cat logs/backend.log${NC}"
echo ""
echo -e "${BLUE}Ou tente iniciar manualmente:${NC}"
echo -e "   ${YELLOW}cd backend && node src/server.js${NC}"
echo ""

exit 1
