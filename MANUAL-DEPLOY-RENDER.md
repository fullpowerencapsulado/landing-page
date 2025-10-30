# Manual de Deploy no Render.com

Este manual ensina como fazer o deploy da Landing Page Full Power no Render.com, passo a passo.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- ✅ Conta no GitHub (já feito)
- ✅ Projeto enviado para o GitHub em https://github.com/fullpowerencapsulado/landing-page
- ✅ Conta no Render.com (criar em https://render.com se ainda não tiver)

---

## 🚀 Passo 1: Criar Conta no Render.com

1. Acesse https://render.com
2. Clique em **"Get Started"** ou **"Sign Up"**
3. Escolha **"Sign up with GitHub"** (recomendado)
4. Autorize o Render a acessar sua conta do GitHub
5. Complete o cadastro com suas informações

---

## 🔗 Passo 2: Conectar Repositório do GitHub

1. No painel do Render, clique em **"New +"** (canto superior direito)
2. Selecione **"Static Site"**
3. Clique em **"Connect a repository"**
4. Se solicitado, autorize o Render a acessar seus repositórios
5. Procure e selecione o repositório: **fullpowerencapsulado/landing-page**
6. Clique em **"Connect"**

---

## ⚙️ Passo 3: Configurar o Deploy

Preencha os campos da seguinte forma:

### Configurações Básicas

| Campo | Valor |
|-------|-------|
| **Name** | `landing-page-full-power` (ou qualquer nome de sua preferência) |
| **Branch** | `main` |
| **Root Directory** | (deixe vazio) |
| **Environment** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### Configurações Detalhadas

**Name (Nome do Serviço):**
- Este será o nome do seu site
- Exemplo: `landing-page-full-power`
- O URL ficará: `https://landing-page-full-power.onrender.com`

**Branch:**
- Selecione: `main`
- O Render fará deploy automático sempre que houver push nesta branch

**Build Command (Comando de Build):**
```bash
npm install && npm run build
```
- `npm install`: Instala todas as dependências do projeto
- `npm run build`: Gera os arquivos otimizados de produção

**Publish Directory (Diretório de Publicação):**
```
dist
```
- Pasta onde o Vite gera os arquivos de produção

---

## 🎯 Passo 4: Configurações Avançadas (Opcional)

Antes de criar o serviço, você pode expandir **"Advanced"** e configurar:

### Auto-Deploy
- ✅ Deixe **"Auto-Deploy"** marcado
- Isso fará deploy automático a cada push no GitHub

### Environment Variables (Variáveis de Ambiente)
- Para este projeto, não é necessário adicionar variáveis
- Deixe em branco por enquanto

---

## 🎨 Passo 5: Criar o Serviço

1. Revise todas as configurações
2. Clique no botão **"Create Static Site"** (parte inferior da página)
3. O Render começará a fazer o build automaticamente

---

## ⏳ Passo 6: Acompanhar o Deploy

Após criar o serviço:

1. Você será redirecionado para a página de logs
2. Aguarde o processo de build (geralmente 2-5 minutos)
3. Você verá logs como:
   ```
   Installing dependencies...
   Running build command...
   Build successful!
   Deploy live!
   ```

### Status do Deploy

- 🔵 **In Progress**: Build em andamento
- 🟢 **Live**: Deploy concluído com sucesso
- 🔴 **Failed**: Erro no deploy (veja solução de problemas abaixo)

---

## 🌐 Passo 7: Acessar Seu Site

Quando o deploy estiver completo:

1. No topo da página, você verá o URL do seu site
2. Exemplo: `https://landing-page-full-power.onrender.com`
3. Clique no link para abrir seu site
4. **Pronto!** Sua landing page está no ar! 🎉

---

## 🔄 Como Atualizar o Site

Para atualizar o conteúdo do site:

### Método 1: Push no GitHub (Automático)
```bash
# Faça suas alterações no código
git add .
git commit -m "Atualização da landing page"
git push origin main
```
O Render detectará automaticamente e fará o deploy da nova versão!

### Método 2: Deploy Manual
1. Acesse o painel do Render
2. Clique no seu serviço
3. Clique em **"Manual Deploy"** > **"Deploy latest commit"**

---

## 📱 Configurar Domínio Personalizado (Opcional)

Se você tem um domínio próprio (ex: www.fullpower.com.br):

### No Render:
1. Vá para o painel do seu serviço
2. Clique em **"Settings"**
3. Role até **"Custom Domains"**
4. Clique em **"Add Custom Domain"**
5. Digite seu domínio: `www.fullpower.com.br`
6. O Render fornecerá um endereço CNAME

### No seu provedor de domínio:
1. Acesse o painel DNS do seu domínio
2. Crie um registro CNAME:
   - **Name/Host**: `www`
   - **Value/Points to**: (o endereço fornecido pelo Render)
   - **TTL**: 3600 (ou automático)
3. Aguarde propagação DNS (até 48h, geralmente menos)

---

## 🛠️ Solução de Problemas

### Problema: Build Failed (Falha no Build)

**Causa**: Erro durante a instalação ou build

**Solução**:
1. Veja os logs de erro no Render
2. Verifique se o `package.json` está correto
3. Certifique-se que Build Command é: `npm install && npm run build`
4. Certifique-se que Publish Directory é: `dist`

### Problema: Página em branco após deploy

**Causa**: Configuração incorreta do Vite

**Solução**:
1. Verifique se o arquivo `vite.config.js` está configurado corretamente
2. Certifique-se de que a pasta `dist` está sendo gerada
3. Tente fazer um deploy manual

### Problema: Imagens não aparecem

**Causa**: Caminhos incorretos das imagens

**Solução**:
1. Certifique-se de que as imagens estão na pasta `public/`
2. Use caminhos relativos: `/imagem.png` ao invés de `./imagem.png`
3. Faça um novo commit e push

### Problema: Deploy muito lento

**Causa**: Muitas dependências ou arquivos grandes

**Solução**:
1. O primeiro deploy é mais lento (Render faz cache)
2. Próximos deploys serão mais rápidos
3. Aguarde pacientemente (5-10 minutos no primeiro deploy)

### Problema: Auto-deploy não está funcionando

**Causa**: Webhook do GitHub não configurado

**Solução**:
1. Vá em Settings do serviço no Render
2. Verifique se "Auto-Deploy" está ativado
3. Reconecte o repositório se necessário

---

## 📊 Monitoramento

### Acessar Logs
1. Painel do Render > Seu serviço
2. Clique em **"Logs"**
3. Veja logs em tempo real do seu deploy

### Métricas
1. Painel do Render > Seu serviço
2. Clique em **"Metrics"**
3. Veja estatísticas de uso, tráfego, etc.

---

## 💰 Planos do Render

### Plano Free (Gratuito)
- ✅ Perfeito para este projeto
- ✅ Sites estáticos ilimitados
- ✅ 100GB de largura de banda/mês
- ✅ SSL automático (HTTPS)
- ✅ Deploy automático do GitHub
- ⚠️ Site pode hibernar após inatividade (demora alguns segundos para acordar)

### Plano Pago (Starter - $7/mês)
- Sem hibernação
- Mais largura de banda
- Suporte prioritário

---

## 🎓 Resumo Rápido

```bash
# 1. Já tem projeto no GitHub ✅
https://github.com/fullpowerencapsulado/landing-page

# 2. Criar conta no Render.com
https://render.com

# 3. Configurações do Deploy:
Name: landing-page-full-power
Branch: main
Build Command: npm install && npm run build
Publish Directory: dist

# 4. Clicar em "Create Static Site"

# 5. Aguardar deploy (2-5 minutos)

# 6. Acessar URL fornecido
https://[seu-nome].onrender.com
```

---

## 📞 Suporte

**Documentação Oficial do Render:**
https://render.com/docs/static-sites

**Comunidade Render:**
https://community.render.com

**Problemas com este projeto:**
Crie uma issue no GitHub: https://github.com/fullpowerencapsulado/landing-page/issues

---

## ✅ Checklist Final

Antes de fazer deploy, verifique:

- [ ] Projeto está no GitHub
- [ ] Conta criada no Render.com
- [ ] Repositório conectado ao Render
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `dist`
- [ ] Auto-Deploy ativado
- [ ] Deploy iniciado com sucesso
- [ ] Site acessível no URL fornecido

---

## 🎉 Parabéns!

Sua Landing Page Full Power está no ar e acessível para o mundo todo!

Compartilhe o link e comece a receber seus leads!

---

**Criado com [Claude Code](https://claude.com/claude-code)**
