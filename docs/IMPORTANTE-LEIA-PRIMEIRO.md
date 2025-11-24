# ⚠️ IMPORTANTE - LEIA PRIMEIRO

## 🔴 Problema Detectado

Sua versão do Node.js é **v10.15.3** (muito antiga!)

**A demo NÃO VAI FUNCIONAR** com esta versão.

---

## ✅ Solução Rápida

### Opção 1: Atualização Automática (Recomendado)

```bash
./ATUALIZAR-AGORA.sh
```

Este script vai:
- ✅ Detectar seu sistema operacional
- ✅ Instalar Node.js v20 automaticamente
- ✅ Configurar tudo para você

**Tempo**: 5-10 minutos

---

### Opção 2: Verificar Versão Primeiro

```bash
./check-node.sh
```

Este script vai:
- ✅ Verificar sua versão do Node.js
- ✅ Mostrar se é adequada
- ✅ Dar instruções específicas

---

### Opção 3: Atualização Manual

Leia o guia completo:

```bash
cat ATUALIZAR-NODE.md
```

Ou abra o arquivo **ATUALIZAR-NODE.md**

---

## 🎯 Versões Recomendadas

| Versão | Status |
|--------|--------|
| **v20.x** | ⭐⭐⭐ Melhor |
| **v18.x** | ⭐⭐ Boa |
| v16.x | ⚠️ Antiga |
| **v10.x** | ❌ **Sua versão** |

---

## 🚀 Após Atualizar

1. Verificar versão:
```bash
node --version  # Deve mostrar v18+ ou v20+
```

2. Rodar a demo:
```bash
./start-demo.sh
```

---

## 🍎 macOS - Atualização Rápida

### Usando Homebrew

```bash
# Instalar Homebrew (se não tiver)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node@20

# Verificar
node --version
```

### Usando NVM (Recomendado)

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recarregar terminal
source ~/.zshrc

# Instalar Node.js
nvm install --lts
nvm use --lts

# Verificar
node --version
```

---

## 🐧 Linux - Atualização Rápida

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recarregar terminal
source ~/.bashrc

# Instalar Node.js
nvm install --lts
nvm use --lts

# Verificar
node --version
```

---

## 🪟 Windows - Atualização Rápida

1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS**
3. Execute o instalador
4. Reinicie o terminal
5. Verifique: `node --version`

---

## 📚 Mais Informações

- **Guia completo**: [ATUALIZAR-NODE.md](ATUALIZAR-NODE.md)
- **Verificar versão**: `./check-node.sh`
- **Atualizar automaticamente**: `./ATUALIZAR-AGORA.sh`

---

## 🆘 Precisa de Ajuda?

1. Leia: [ATUALIZAR-NODE.md](ATUALIZAR-NODE.md)
2. Execute: `./check-node.sh`
3. Ou: `./ATUALIZAR-AGORA.sh`

---

## ⚡ Resumo

```bash
# 1. Atualizar Node.js
./ATUALIZAR-AGORA.sh

# 2. Verificar versão
node --version

# 3. Rodar demo
./start-demo.sh
```

---

**Após atualizar o Node.js, a demo vai funcionar perfeitamente! 🚀**
