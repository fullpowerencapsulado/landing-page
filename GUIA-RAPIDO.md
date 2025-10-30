# ⚡ GUIA RÁPIDO - INSTALAÇÃO EM 3 PASSOS

## 🚀 Instalação Super Rápida

### OPÇÃO 1: Instalação Automática (Recomendado)

1. **Extraia todos os arquivos** para `D:\Sistemas\Encapsulado\`

2. **Clique com botão direito** em `INSTALAR.ps1`

3. **Selecione**: "Executar com PowerShell"

4. **Pronto!** O site abrirá automaticamente

---

### OPÇÃO 2: Instalação Manual

#### Passo 1: Verificar Node.js
Abra o PowerShell e digite:
```powershell
node --version
```

**Se não estiver instalado:**
- Baixe em: https://nodejs.org/
- Instale e reinicie o PowerShell

#### Passo 2: Copiar Arquivos
Copie todos os arquivos para:
```
D:\Sistemas\Encapsulado\
```

#### Passo 3: Instalar e Rodar
No PowerShell, execute:
```powershell
cd D:\Sistemas\Encapsulado
npm install
npm run dev
```

**Pronto!** Acesse: http://localhost:3000

---

## 📦 Arquivos Incluídos

```
✓ package.json           - Configuração do projeto
✓ vite.config.js        - Configuração do Vite
✓ tailwind.config.js    - Configuração Tailwind
✓ postcss.config.js     - Configuração PostCSS
✓ index.html            - HTML principal
✓ main.jsx              - Entrada React
✓ App.jsx               - Componente raiz
✓ full-power-landing.jsx - Landing page completa
✓ index.css             - Estilos e animações
✓ .gitignore            - Arquivos ignorados
✓ README.md             - Documentação completa
✓ INSTALAR.ps1          - Script de instalação
✓ GUIA-RAPIDO.md        - Este arquivo
```

---

## 🎯 Comandos Essenciais

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria versão otimizada para produção |
| `npm run preview` | Visualiza build de produção |

---

## 🌐 Publicar no Servidor

### Passo 1: Criar Build
```powershell
npm run build
```

### Passo 2: Upload
Copie todo conteúdo da pasta `dist/` para:
```
https://serverartseven.com.br/saudeemhabitos/
```

Via FTP, cPanel ou qualquer gerenciador de arquivos.

---

## 🎨 Personalização Rápida

### Mudar Cores
Edite `full-power-landing.jsx` e procure por:
- `purple-600` → Sua cor principal
- `fuchsia-600` → Sua cor secundária

### Adicionar WhatsApp
Procure por `[Inserir número]` e substitua pelo número real.

### Modificar Preços
Procure pela seção "Kits e Preços" no código.

---

## ❓ Problemas Comuns

### "npm não é reconhecido"
**Solução:** Instale o Node.js e reinicie o PowerShell

### "Porta 3000 já em uso"
**Solução:** Em `vite.config.js`, mude a porta para 3001

### Site não carrega
**Solução:** 
```powershell
npm install
npm run dev
```

---

## 📱 Teste Mobile

O site é totalmente responsivo! Para testar:

1. Abra o site no navegador
2. Pressione `F12` (DevTools)
3. Clique no ícone de celular
4. Teste diferentes resoluções

---

## ✨ Features Incluídas

✅ Design roxo moderno e profissional
✅ Animações fluidas em todos elementos
✅ Timer de urgência em tempo real
✅ Contador de estoque dinâmico
✅ 6 depoimentos com avaliações
✅ 3 opções de kits com preços
✅ Seção de garantia destacada
✅ FAQ interativo
✅ CTAs estratégicos (8 botões)
✅ Totalmente responsivo
✅ SEO otimizado
✅ Performance A+

---

## 🎁 Bônus Incluídos

1. Script de instalação automática
2. Guias de documentação
3. Código limpo e comentado
4. Configuração de build otimizada
5. Estrutura escalável

---

## 🚀 Próximos Passos

1. ✅ Instalar e testar localmente
2. 📝 Personalizar textos e imagens
3. 💳 Integrar gateway de pagamento
4. 📊 Adicionar pixels de rastreamento
5. 🌐 Fazer upload para servidor
6. 📈 Configurar anúncios
7. 💰 Começar a vender!

---

## 💡 Dicas de Conversão

- Teste diferentes CTAs
- Adicione urgência real (estoque limitado)
- Use provas sociais (depoimentos)
- Mantenha carregamento rápido
- Otimize para mobile (60%+ do tráfego)
- Adicione chat online se possível
- Teste cores dos botões (A/B test)

---

## 📞 Suporte

Problemas? Siga estes passos:

1. Leia o `README.md` completo
2. Verifique se Node.js está instalado
3. Execute `npm install` novamente
4. Limpe cache: `npm cache clean --force`
5. Reinstale: `rm -r node_modules && npm install`

---

**🎯 Landing page pronta para gerar vendas!**

Desenvolvido com foco em **alta conversão** e **performance máxima**.
