# 🔧 Troubleshooting

## Problemas Comuns e Soluções

### 1. Backend não inicia

**Erro**: `Cannot find module '@nestjs/core'`

**Solução**:
```bash
cd backend
npm install
cd ..
```

---

### 2. Frontend não inicia

**Erro**: `Cannot find module 'react'`

**Solução**:
```bash
cd frontend
npm install
cd ..
```

---

### 3. Erro de CORS

**Erro**: `Access to fetch at 'http://localhost:3001' from origin 'http://localhost:3000' has been blocked by CORS`

**Solução**:
- Verificar se o backend está rodando na porta 3001
- Reiniciar o backend

---

### 4. Porta já em uso

**Erro**: `Port 3000 is already in use` ou `Port 3001 is already in use`

**Solução**:
```bash
# Encontrar processo usando a porta
lsof -i :3000
lsof -i :3001

# Matar o processo
kill -9 <PID>
```

---

### 5. TypeScript errors no backend

**Erro**: `Cannot find module '../../../configs/demoUsers'`

**Solução**:
- Verificar se a pasta `configs` existe na raiz
- Reiniciar o backend

---

### 6. Eventos não aparecem no Debug Panel

**Solução**:
1. Abrir DevTools do navegador (F12)
2. Verificar console para erros
3. Verificar se o backend está respondendo
4. Fazer logout e login novamente

---

### 7. Métricas vazias no Intelligence

**Causa**: Nenhum evento foi capturado ainda

**Solução**:
1. Executar pelo menos uma jornada completa
2. Fazer login → Simulação → Contratação
3. Recarregar a página `/intelligence`

---

### 8. Jornada não está sendo aplicada

**Solução**:
1. Verificar se selecionou a jornada no Debug Panel
2. Fazer logout
3. Fazer login novamente (a jornada é aplicada no login)

---

## Comandos Úteis

### Limpar tudo e reinstalar

```bash
# Remover node_modules
rm -rf node_modules backend/node_modules frontend/node_modules

# Remover package-lock
rm -rf package-lock.json backend/package-lock.json frontend/package-lock.json

# Reinstalar
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### Ver logs do backend

```bash
cd backend
npm run start:dev
```

### Ver logs do frontend

```bash
cd frontend
npm run dev
```

### Verificar portas em uso

```bash
lsof -i :3000
lsof -i :3001
```

---

## Verificação de Saúde

### Backend está funcionando?

```bash
curl http://localhost:3001/intelligence/metrics
```

Deve retornar JSON com métricas.

### Frontend está funcionando?

Abrir: http://localhost:3000

Deve mostrar tela de login.

---

## Logs de Debug

### Habilitar logs detalhados no backend

Editar `backend/src/main.ts`:

```typescript
app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);
```

### Ver eventos no console do navegador

Abrir DevTools (F12) → Console

Todos os eventos aparecem com prefixo `🔔 Event:`

---

## Contato

Se o problema persistir, verifique:
1. Node.js versão 18+ instalado
2. npm versão 9+ instalado
3. Portas 3000 e 3001 livres
4. Sem firewall bloqueando localhost

---

**Última atualização**: 2025-11-20
