# 🚀 Como Iniciar a Demo

## ⚡ Comando Único (RECOMENDADO)

```bash
./demo.sh
```

**Este é o comando mais simples e completo!**

O script faz TUDO automaticamente:
- ✅ Verifica Node.js
- ✅ Verifica e libera portas
- ✅ Instala dependências (se necessário)
- ✅ Inicia backend
- ✅ Verifica health do backend
- ✅ Inicia frontend
- ✅ Abre navegador automaticamente

**Tempo**: 10-15 segundos

---

## 🛑 Para Parar

```bash
./stop-demo.sh
```

---

## 🔍 Health Check

Para verificar se o backend está rodando:

```bash
./check-backend.sh
```

Ou acesse: http://localhost:3001/health

---

## 📊 Endpoints Disponíveis

### Health Check
```
GET http://localhost:3001/health
```

Retorna:
```json
{
  "status": "ok",
  "timestamp": "2025-11-20T...",
  "uptime": 123.45,
  "version": "1.0.0",
  "endpoints": { ... }
}
```

### Root
```
GET http://localhost:3001/
```

### Autenticação
```
POST http://localhost:3001/auth/login
POST http://localhost:3001/auth/verify-device
```

### Empréstimos
```
POST http://localhost:3001/loan/simulate
POST http://localhost:3001/loan/contract
```

### Intelligence
```
GET http://localhost:3001/intelligence/metrics
GET http://localhost:3001/intelligence/recommendations
GET http://localhost:3001/intelligence/ab-results
GET http://localhost:3001/intelligence/friction-points
```

---

## 🎮 Como Usar

### 1. Iniciar Demo
```bash
./demo.sh
```

### 2. Acessar
Navegador abre automaticamente em: **http://localhost:3000**

### 3. Usar Debug Panel
- Clique no botão **🔧 Debug Panel** (canto superior direito)
- Selecione uma jornada
- Faça login com CPF: `11111111111`

### 4. Explorar
- Home → Simulação → Contratação
- Ver Analytics vs Intelligence
- Testar diferentes jornadas

### 5. Parar
```bash
./stop-demo.sh
```

---

## 📝 Logs

### Ver logs em tempo real

**Backend**:
```bash
tail -f logs/backend.log
```

**Frontend**:
```bash
tail -f logs/frontend.log
```

**Ambos**:
```bash
tail -f logs/backend.log logs/frontend.log
```

---

## 🔄 Alternativas

### Opção 1: Script Completo (Recomendado)
```bash
./demo.sh
```

### Opção 2: Script com Instalação
```bash
./start-demo.sh
```

### Opção 3: Manual (2 Terminais)

**Terminal 1 - Backend**:
```bash
cd backend
node src/server.js
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
```

---

## 🆘 Troubleshooting

### Backend não inicia

```bash
# Ver logs
cat logs/backend.log

# Verificar porta
lsof -i :3001

# Liberar porta
kill -9 $(lsof -t -i:3001)

# Tentar novamente
./demo.sh
```

### Frontend não inicia

```bash
# Ver logs
cat logs/frontend.log

# Verificar porta
lsof -i :3000

# Liberar porta
kill -9 $(lsof -t -i:3000)

# Tentar novamente
./demo.sh
```

### Health check falha

```bash
# Verificar se backend está rodando
ps aux | grep "node src/server.js"

# Testar manualmente
curl http://localhost:3001/health

# Ver logs
cat logs/backend.log
```

---

## 💡 Dicas

### Reiniciar Demo
```bash
./stop-demo.sh && ./demo.sh
```

### Limpar e Reiniciar
```bash
./stop-demo.sh
rm -rf logs
./demo.sh
```

### Verificar Status
```bash
# Backend
curl http://localhost:3001/health

# Frontend
curl http://localhost:3000

# Processos
ps aux | grep node
```

---

## 🎯 Resumo

| Comando | Descrição |
|---------|-----------|
| `./demo.sh` | ⭐ Inicia tudo automaticamente |
| `./stop-demo.sh` | Para a demo |
| `./check-backend.sh` | Verifica health do backend |
| `./start-demo.sh` | Inicia com instalação completa |

---

## 📚 Mais Informações

- **Roteiro de apresentação**: [DEMO_GUIDE.md](DEMO_GUIDE.md)
- **Guia de uso**: [RODAR-AGORA.md](RODAR-AGORA.md)
- **Troubleshooting**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

**Comando recomendado**: `./demo.sh` 🚀
