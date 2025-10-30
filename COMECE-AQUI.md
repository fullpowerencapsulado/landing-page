# 🎯 COMECE AQUI - GUIA PARA LEIGOS

## 👋 Olá! Seja bem-vindo(a)!

Você acabou de baixar uma **landing page profissional** para vender o Full Power.

**Não sabe nada de programação?** Sem problema! Este guia foi feito pra você.

---

## 🤔 O Que Você Precisa Fazer?

São apenas **3 passos simples**:

### ✅ PASSO 1: Instalar o Node.js
### ✅ PASSO 2: Rodar o Instalador
### ✅ PASSO 3: Ver o Site Funcionando

Vamos lá! 👇

---

## 📥 PASSO 1: Instalar o Node.js

### O que é Node.js?
É um programa que permite o seu computador rodar o site.

### Como instalar?

1. **Abra o PowerShell**
   - Aperte a tecla do Windows
   - Digite: `powershell`
   - Clique em "Windows PowerShell"

2. **Verifique se já está instalado**
   - Digite: `node --version`
   - Aperte Enter

3. **Se aparecer um número** (tipo: v18.17.0)
   - ✅ **Ótimo! Node.js já está instalado!**
   - Pule para o PASSO 2

4. **Se der erro** ("não é reconhecido...")
   - ❌ **Você precisa instalar**
   - Acesse: https://nodejs.org/
   - Clique no botão verde grande (versão recomendada)
   - Baixe e instale (próximo, próximo, instalar)
   - Depois de instalar, **FECHE E ABRA O POWERSHELL DE NOVO**

---

## 🚀 PASSO 2: Rodar o Instalador

### Opção A: Instalação Automática (MAIS FÁCIL)

1. **Localize os arquivos**
   - Você baixou uma pasta com vários arquivos
   - Dentro tem um arquivo chamado: `INSTALAR.ps1`

2. **Execute o instalador**
   - Clique com o **botão direito** em `INSTALAR.ps1`
   - Escolha: **"Executar com PowerShell"**

3. **Aguarde**
   - Vai aparecer uma janela preta
   - Vai instalar várias coisas (é normal)
   - Pode demorar 2-5 minutos

4. **Quando perguntar**
   - "Deseja iniciar o servidor? (S/N)"
   - **Digite: S** (e aperte Enter)

5. **Pronto!**
   - O site vai abrir sozinho no seu navegador
   - Se não abrir, acesse: http://localhost:3000

---

### Opção B: Instalação Manual (SE A OPÇÃO A NÃO FUNCIONAR)

1. **Abra o PowerShell**
   - Tecla Windows + digite `powershell`
   - Clique com botão direito em "PowerShell"
   - Escolha "Executar como Administrador"

2. **Navegue até a pasta**
   ```
   cd D:\Sistemas\Encapsulado
   ```
   *(Se salvou em outro lugar, mude o caminho)*

3. **Instale as dependências**
   ```
   npm install
   ```
   *(Aguarde terminar - pode demorar alguns minutos)*

4. **Inicie o site**
   ```
   npm run dev
   ```

5. **Acesse no navegador**
   - Abra seu navegador
   - Digite: http://localhost:3000

---

## 🎉 PASSO 3: Site Funcionando!

Se tudo deu certo, você verá:

- ✅ Uma página roxa linda
- ✅ Animações suaves
- ✅ Timer contando
- ✅ Botões brilhando
- ✅ Tudo responsivo

### 🎮 Teste!

- Role a página
- Clique nos botões
- Abra no celular (use o mesmo Wi-Fi)
- Acesse: `http://SEU-IP:3000`

---

## 📝 E Agora? Como Personalizar?

### 🔧 Coisas Básicas que Você DEVE Mudar:

1. **Adicionar seu WhatsApp**
   - Abra: `full-power-landing.jsx`
   - Procure (Ctrl+F): `[Inserir número]`
   - Substitua pelo seu número

2. **Adicionar seu E-mail**
   - Mesmo arquivo
   - Procure: `[Inserir e-mail]`
   - Substitua pelo seu e-mail

3. **Conferir Preços**
   - Procure: "R$" no arquivo
   - Confirme se os valores estão corretos

### 🎨 Quer Mudar as Cores?

- Leia o arquivo: `CORES.md`
- Tem um passo a passo simples
- Pode mudar de roxo para azul, verde, etc

### ✅ Antes de Publicar

- Leia o arquivo: `CHECKLIST.md`
- É uma lista de tudo que você deve fazer
- Não pule essa parte!

---

## 🌐 Como Colocar no Ar (Servidor Real)?

### Quando terminar de personalizar:

1. **Criar versão final**
   ```
   npm run build
   ```

2. **Localizar os arquivos**
   - Vai criar uma pasta chamada `dist`
   - Dentro tem todos os arquivos otimizados

3. **Fazer upload**
   - Acesse seu cPanel / FTP
   - Navegue até: `saudeemhabitos`
   - Envie TODO conteúdo da pasta `dist`

4. **Testar**
   - Acesse: https://serverartseven.com.br/saudeemhabitos/
   - Veja se está tudo funcionando

---

## ❓ Perguntas Frequentes

### "Aparece erro ao executar INSTALAR.ps1"
**R:** Tente executar como Administrador:
- Botão direito no arquivo
- "Executar como Administrador"
- Digite "S" se perguntar

### "npm não é reconhecido"
**R:** Node.js não está instalado ou PowerShell não foi reiniciado
- Instale o Node.js
- Feche TODO PowerShell aberto
- Abra de novo
- Tente novamente

### "Porta 3000 já está em uso"
**R:** Tem outro programa usando a porta
- Feche outros servidores
- Ou mude a porta no arquivo `vite.config.js` (mude 3000 para 3001)

### "Site não carrega as animações"
**R:** Cache do navegador
- Aperte Ctrl + Shift + Delete
- Limpe o cache
- Recarregue (Ctrl + R)

### "Como parar o servidor?"
**R:** No PowerShell onde está rodando
- Aperte: **Ctrl + C**
- Depois pode fechar a janela

### "Como rodar de novo?"
**R:** Abra o PowerShell
```
cd D:\Sistemas\Encapsulado
npm run dev
```

---

## 📚 Arquivos para Ler (por Ordem)

### Se você é INICIANTE TOTAL:
1. 👉 **COMECE-AQUI.md** (este arquivo)
2. 📖 **GUIA-RAPIDO.md** (resumo)
3. ✅ **CHECKLIST.md** (antes de publicar)
4. 🎨 **CORES.md** (se quiser mudar cores)

### Se você tem ALGUMA experiência:
1. 📖 **README.md** (documentação técnica)
2. 📋 **INDICE.md** (entender estrutura)
3. ✅ **CHECKLIST.md** (otimização)

---

## 🆘 Precisa de Ajuda?

### Erros Comuns e Soluções:

| Problema | Solução |
|----------|---------|
| npm não reconhecido | Instalar Node.js |
| Porta em uso | Mudar porta ou fechar outros apps |
| Site não abre | Verificar se rodou `npm run dev` |
| Erro ao instalar | Rodar como Administrador |
| Erro de sintaxe | Não mexer em arquivos .js/.json |

---

## ✨ Dicas Importantes

### ⚠️ NÃO MEXA nestes arquivos (a não ser que saiba):
- ❌ `package.json`
- ❌ `vite.config.js`
- ❌ `postcss.config.js`
- ❌ `main.jsx`
- ❌ `App.jsx`

### ✅ PODE e DEVE mexer:
- ✅ `full-power-landing.jsx` (conteúdo da página)
- ✅ `index.html` (título, descrição, analytics)
- ✅ `TODOS OS ARQUIVOS .md` (são só documentação)

### 💾 Sempre Faça Backup:
- Antes de mexer em qualquer coisa
- Copie o arquivo original
- Renomeie: `arquivo-original-BACKUP.jsx`

---

## 🎯 Próximos Passos

Agora que o site está rodando:

1. ✅ **Explore o site**
   - Role a página toda
   - Clique em tudo
   - Teste no celular

2. ✅ **Personalize**
   - Adicione seus contatos
   - Confira os preços
   - Teste os botões

3. ✅ **Leia o CHECKLIST**
   - Antes de publicar
   - É importante!

4. ✅ **Publique**
   - Faça o build
   - Envie para o servidor
   - Comece a vender!

---

## 🎊 Parabéns!

Você acabou de instalar uma landing page profissional!

**Características do seu site:**
- ⚡ Rápido e otimizado
- 📱 Funciona em celular
- 🎨 Design moderno
- ✨ Animações suaves
- 🎯 Focado em vender

**Agora é só:**
1. Personalizar com suas informações
2. Configurar pagamento
3. Publicar
4. Divulgar
5. **VENDER!** 💰

---

## 💡 Lembre-se

- **Você NÃO precisa saber programar** para usar isto
- **Apenas siga os passos** deste guia
- **Peça ajuda** se travar em alguma parte
- **Não tenha medo** de explorar e testar
- **Faça backup** antes de grandes mudanças
- **Teste TUDO** antes de publicar

---

## 🚀 Boas Vendas!

Esta landing page foi criada com foco em **CONVERSÃO**.

Cada detalhe foi pensado para **VENDER MAIS**:
- Cores chamativas (roxo)
- Animações que prendem atenção
- Timer de urgência
- Provas sociais (depoimentos)
- Múltiplos CTAs
- Garantia destacada
- Design profissional

**Agora é com você!** 

Use bem esta ferramenta e **transforme visitantes em clientes!**

---

**🎯 Boa sorte e excelentes vendas! 💜**

*Qualquer dúvida, releia este guia com calma.*
*Todos os passos estão aqui!*
