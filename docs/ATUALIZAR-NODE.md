# 🔄 Como Atualizar o Node.js

## 📋 Versão Atual

Você está usando: **Node.js v10.15.3** (muito antiga!)

**Versão recomendada**: Node.js v18+ ou v20+ (LTS)

---

## 🍎 Atualizar no macOS

### Opção 1: Usando Homebrew (Recomendado)

```bash
# 1. Instalar Homebrew (se não tiver)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Instalar Node.js LTS
brew install node@20

# 3. Verificar versão
node --version
npm --version
```

### Opção 2: Usando NVM (Node Version Manager)

```bash
# 1. Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 2. Recarregar terminal
source ~/.zshrc  # ou source ~/.bashrc

# 3. Instalar Node.js LTS
nvm install --lts

# 4. Usar a versão instalada
nvm use --lts

# 5. Definir como padrão
nvm alias default node

# 6. Verificar versão
node --version
npm --version
```

### Opção 3: Download Direto

1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS** (Long Term Support)
3. Execute o instalador
4. Siga as instruções
5. Reinicie o terminal
6. Verifique: `node --version`

---

## 🐧 Atualizar no Linux

### Ubuntu/Debian

```bash
# 1. Adicionar repositório NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# 2. Instalar Node.js
sudo apt-get install -y nodejs

# 3. Verificar versão
node --version
npm --version
```

### Usando NVM (Recomendado)

```bash
# 1. Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 2. Recarregar terminal
source ~/.bashrc

# 3. Instalar Node.js LTS
nvm install --lts

# 4. Usar a versão instalada
nvm use --lts

# 5. Definir como padrão
nvm alias default node

# 6. Verificar versão
node --version
npm --version
```

---

## 🪟 Atualizar no Windows

### Opção 1: Download Direto

1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS** (Long Term Support)
3. Execute o instalador `.msi`
4. Siga as instruções
5. Reinicie o terminal
6. Verifique: `node --version`

### Opção 2: Usando Chocolatey

```powershell
# 1. Instalar Chocolatey (se não tiver)
# Execute como Administrador
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# 2. Instalar Node.js
choco install nodejs-lts

# 3. Verificar versão
node --version
npm --version
```

---

## ✅ Após Atualizar

### 1. Verificar Versões

```bash
node --version   # Deve mostrar v18+ ou v20+
npm --version    # Deve mostrar v9+ ou v10+
```

### 2. Limpar Cache

```bash
npm cache clean --force
```

### 3. Reinstalar Dependências da Demo

```bash
cd ~/caminho/para/demo-data-products

# Limpar tudo
rm -rf node_modules backend/node_modules frontend/node_modules
rm -rf backend/dist frontend/dist
rm -f package-lock.json backend/package-lock.json frontend/package-lock.json

# Reinstalar
./start-demo.sh
```

---

## 🎯 Versões Recomendadas

| Versão | Status | Recomendação |
|--------|--------|--------------|
| **v20.x** | LTS Atual | ⭐⭐⭐ Melhor escolha |
| **v18.x** | LTS | ⭐⭐ Boa escolha |
| v16.x | Manutenção | ⚠️ Ainda funciona |
| v14.x | EOL | ❌ Não usar |
| v12.x | EOL | ❌ Não usar |
| **v10.x** | EOL | ❌ **Sua versão atual** |

**EOL** = End of Life (sem suporte)

---

## 🔍 Verificar Instalação

```bash
# Versão do Node.js
node --version

# Versão do npm
npm --version

# Onde está instalado
which node
which npm

# Testar Node.js
node -e "console.log('Node.js funcionando!')"

# Testar npm
npm --version
```

---

## 🆘 Problemas Comuns

### "command not found: node"

**Solução**: Adicione ao PATH

```bash
# macOS/Linux - Adicione ao ~/.zshrc ou ~/.bashrc
export PATH="/usr/local/bin:$PATH"

# Recarregue
source ~/.zshrc  # ou source ~/.bashrc
```

### "permission denied"

**Solução**: Use sudo ou corrija permissões

```bash
# Corrigir permissões npm (macOS/Linux)
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Múltiplas versões instaladas

**Solução**: Use NVM para gerenciar

```bash
# Listar versões instaladas
nvm list

# Usar versão específica
nvm use 20

# Definir padrão
nvm alias default 20
```

---

## 📚 Recursos

- **Site Oficial**: https://nodejs.org/
- **NVM**: https://github.com/nvm-sh/nvm
- **Homebrew**: https://brew.sh/
- **Documentação**: https://nodejs.org/docs/

---

## 🚀 Próximos Passos

Após atualizar o Node.js:

1. ✅ Verificar versão: `node --version`
2. ✅ Limpar projeto: `rm -rf node_modules backend/node_modules frontend/node_modules`
3. ✅ Rodar demo: `./start-demo.sh`
4. ✅ Testar: http://localhost:3000

---

## 💡 Dica: Usar NVM

NVM permite ter múltiplas versões do Node.js e trocar facilmente:

```bash
# Instalar várias versões
nvm install 18
nvm install 20

# Trocar entre versões
nvm use 18
nvm use 20

# Ver versão atual
nvm current

# Listar instaladas
nvm list
```

**Recomendação**: Use NVM para desenvolvimento!

---

**Após atualizar, rode novamente: `./start-demo.sh`** 🚀
