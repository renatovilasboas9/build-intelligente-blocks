# ⚡ Comandos Rápidos

## 🚀 Iniciar Demo

```bash
./start-demo.sh
```

**O que faz**:
- ✅ Limpa instalações anteriores
- ✅ Instala dependências (root, backend, frontend)
- ✅ Libera portas 3000 e 3001
- ✅ Inicia backend em background
- ✅ Inicia frontend em background
- ✅ Abre navegador automaticamente
- ✅ Mostra logs em tempo real

**Tempo**: ~2-3 minutos

---

## 🛑 Parar Demo

```bash
./stop-demo.sh
```

**O que faz**:
- ✅ Para backend
- ✅ Para frontend
- ✅ Libera portas 3000 e 3001
- ✅ Remove arquivos de PID

**Tempo**: ~5 segundos

---

## 🔄 Reiniciar Demo

```bash
./stop-demo.sh && ./start-demo.sh
```

---

## 🧹 Limpar Tudo e Reinstalar

```bash
./stop-demo.sh
rm -rf node_modules backend/node_modules frontend/node_modules
rm -rf backend/dist frontend/dist
rm -rf logs
./start-demo.sh
```

---

## 📊 Ver Logs

### Logs do Backend
```bash
tail -f logs/backend.log
```

### Logs do Frontend
```bash
tail -f logs/frontend.log
```

### Ambos
```bash
tail -f logs/backend.log logs/frontend.log
```

---

## 🔍 Verificar Status

### Verificar se está rodando
```bash
# Backend
curl http://localhost:3001/intelligence/metrics

# Frontend
curl http://localhost:3000
```

### Ver processos
```bash
ps aux | grep node
```

### Ver portas
```bash
lsof -i :3000
lsof -i :3001
```

---

## 🌐 Abrir no Navegador

```bash
# macOS
open http://localhost:3000

# Linux
xdg-open http://localhost:3000

# Windows (Git Bash)
start http://localhost:3000
```

---

## 🎯 Fluxo Completo de Uso

```bash
# 1. Iniciar
./start-demo.sh

# 2. Aguardar mensagem de sucesso (20-30 segundos)

# 3. Navegador abre automaticamente em http://localhost:3000

# 4. Usar a demo

# 5. Quando terminar
./stop-demo.sh
```

---

## 🆘 Comandos de Emergência

### Matar tudo relacionado a Node
```bash
killall node
```

### Liberar portas forçadamente
```bash
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:3001)
```

### Limpar cache do npm
```bash
npm cache clean --force
```

---

## 📦 Instalação Manual (se script falhar)

```bash
# Root
npm install

# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

---

## 🏃 Execução Manual (se script falhar)

### Terminal 1 - Backend
```bash
cd backend
npm run start:dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

---

## 🎓 Comandos Úteis para Desenvolvimento

### Build Backend
```bash
cd backend
npm run build
```

### Build Frontend
```bash
cd frontend
npm run build
```

### Ver estrutura do projeto
```bash
tree -L 3 -I 'node_modules|dist'
```

### Contar linhas de código
```bash
find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | xargs wc -l
```

---

## 📝 Aliases Recomendados

Adicione ao seu `~/.zshrc` ou `~/.bashrc`:

```bash
# Demo de Data Products
alias demo-start="cd ~/caminho/para/demo && ./start-demo.sh"
alias demo-stop="cd ~/caminho/para/demo && ./stop-demo.sh"
alias demo-logs="cd ~/caminho/para/demo && tail -f logs/*.log"
alias demo-clean="cd ~/caminho/para/demo && ./stop-demo.sh && rm -rf node_modules backend/node_modules frontend/node_modules"
```

Depois:
```bash
source ~/.zshrc  # ou source ~/.bashrc
```

Uso:
```bash
demo-start    # Inicia demo
demo-stop     # Para demo
demo-logs     # Ver logs
demo-clean    # Limpar tudo
```

---

## 🎬 Preparar para Apresentação

```bash
# 1. Parar demo (limpa eventos antigos)
./stop-demo.sh

# 2. Aguardar 5 segundos
sleep 5

# 3. Iniciar demo
./start-demo.sh

# 4. Aguardar mensagem de sucesso

# 5. Começar apresentação
```

---

## 🔧 Troubleshooting Rápido

### Erro: "Port already in use"
```bash
./stop-demo.sh
./start-demo.sh
```

### Erro: "Cannot find module"
```bash
./stop-demo.sh
rm -rf node_modules backend/node_modules frontend/node_modules
./start-demo.sh
```

### Erro: "Backend not responding"
```bash
cat logs/backend.log
# Ver erro específico e corrigir
```

### Erro: "Frontend not loading"
```bash
cat logs/frontend.log
# Ver erro específico e corrigir
```

---

## 📚 Mais Informações

- **Instalação detalhada**: [QUICK_START.md](QUICK_START.md)
- **Solução de problemas**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Todos os comandos**: [COMMANDS.md](COMMANDS.md)

---

**Comandos organizados para máxima produtividade! ⚡**
