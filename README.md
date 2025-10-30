# 🚀 Full Power - Landing Page de Alta Conversão

Landing page moderna e responsiva desenvolvida com React, Vite e Tailwind CSS, com animações fluidas e design otimizado para conversão.

## 🎨 Características

- ✨ Design moderno com gradientes roxos e animações suaves
- 📱 Totalmente responsivo (Web e Mobile)
- ⚡ Performance otimizada com Vite
- 🎭 Animações em todos os elementos
- 🎯 Otimizado para alta conversão
- 🔒 Seções de garantia e credibilidade
- ⏰ Timer de urgência e escassez
- 💬 Depoimentos reais com avaliações
- 📦 Múltiplas opções de kits

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- npm (vem com Node.js) ou yarn

### Como verificar se está instalado:

Abra o PowerShell e execute:

```powershell
node --version
npm --version
```

Se não estiver instalado, baixe e instale o Node.js em: https://nodejs.org/

## 🛠️ Instalação

### Passo 1: Criar a pasta do projeto

Abra o PowerShell como Administrador e execute:

```powershell
cd D:\Sistemas
mkdir Encapsulado
cd Encapsulado
```

### Passo 2: Copiar todos os arquivos

Copie todos os arquivos desta pasta para `D:\Sistemas\Encapsulado\`:

- package.json
- vite.config.js
- tailwind.config.js
- postcss.config.js
- index.html
- index.css
- main.jsx
- App.jsx
- full-power-landing.jsx

### Passo 3: Instalar as dependências

No PowerShell, dentro da pasta do projeto, execute:

```powershell
npm install
```

Este comando irá instalar todas as dependências necessárias (React, Vite, Tailwind CSS, etc).

### Passo 4: Iniciar o servidor de desenvolvimento

Após a instalação, execute:

```powershell
npm run dev
```

O site abrirá automaticamente em seu navegador em: `http://localhost:3000`

## 🌐 Build para Produção

Para gerar os arquivos otimizados para publicação no seu servidor:

```powershell
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### Fazer upload para seu servidor

Após o build, copie todo o conteúdo da pasta `dist/` para:
`https://serverartseven.com.br/saudeemhabitos/`

## 📱 Estrutura do Projeto

```
Encapsulado/
├── index.html              # HTML principal
├── main.jsx                # Ponto de entrada do React
├── App.jsx                 # Componente raiz
├── full-power-landing.jsx  # Landing page completa
├── index.css               # Estilos globais e animações
├── package.json            # Dependências do projeto
├── vite.config.js          # Configuração do Vite
├── tailwind.config.js      # Configuração do Tailwind
└── postcss.config.js       # Configuração do PostCSS
```

## 🎨 Cores do Tema

O site usa uma paleta de cores baseada em roxo:

- **Roxo Principal**: `#9333EA` (purple-600)
- **Roxo Escuro**: `#7E22CE` (purple-700)
- **Fúcsia**: `#C026D3` (fuchsia-600)
- **Gradientes**: Combinações de roxo e fúcsia

## ✨ Seções Incluídas

1. **Hero Section** - Chamada principal com timer de urgência
2. **Problema** - Identificação das dores do cliente
3. **Solução** - Apresentação do Full Power
4. **Benefícios** - 5 benefícios principais + bônus
5. **Depoimentos** - 6 testemunhos reais com avaliações
6. **Kits e Preços** - 3 opções de compra
7. **Garantia** - 30 dias incondicional
8. **Como Usar** - Instruções claras
9. **Contraindicações** - Transparência
10. **FAQ** - Perguntas frequentes
11. **CTA Final** - Última chamada para ação
12. **Footer** - Informações legais

## 🔧 Comandos Úteis

```powershell
# Iniciar desenvolvimento
npm run dev

# Criar build de produção
npm run build

# Visualizar build localmente
npm run preview

# Limpar cache (se necessário)
rm -r node_modules
npm install
```

## 🚨 Resolução de Problemas

### Erro: "npm não é reconhecido"
- Reinstale o Node.js: https://nodejs.org/
- Reinicie o PowerShell após a instalação

### Erro: "Cannot find module"
- Execute: `npm install`

### Porta 3000 já em uso
- Edite `vite.config.js` e mude a porta para outra (ex: 3001)

### Site não carrega animações
- Limpe o cache do navegador (Ctrl + Shift + Del)
- Execute: `npm run build` novamente

## 📞 Suporte

Se precisar de ajuda:
1. Verifique se todos os arquivos foram copiados corretamente
2. Confirme que o Node.js está instalado (`node --version`)
3. Execute `npm install` novamente
4. Reinicie o PowerShell

## 📄 Licença

Projeto proprietário - Full Power Landing Page

---

**Desenvolvido com ❤️ para conversão máxima**

🎯 **Próximos passos:**
1. Customize os números de WhatsApp e e-mail no código
2. Adicione suas fotos de antes/depois se tiver
3. Configure o gateway de pagamento
4. Adicione pixel do Facebook/Google Ads se necessário
5. Faça testes A/B dos CTAs
