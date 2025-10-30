# Deploy no Render - Configuração Completa

## Problema Resolvido

As páginas ficavam em branco no mobile e PC devido a:
1. **API Key não estava sendo injetada no build de produção**
2. **vite.svg referenciado mas inexistente (404)**
3. **Warnings de preload de imagens não utilizadas**

## ✅ Correções Aplicadas

### 1. Vite Config - Injeção de Variáveis de Ambiente
```js
// vite.config.js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      'import.meta.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY)
    },
    // ... resto da config
  }
})
```

### 2. Proteção no Serviço Gemini
```js
// services/geminiService.js
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  console.error('⚠️ VITE_API_KEY não configurada');
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
```

### 3. Correção do Favicon
```html
<!-- Antes (404) -->
<link rel="icon" type="image/svg+xml" href="/vite.svg" />

<!-- Depois -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
```

### 4. Remoção de Preloads Desnecessários
Removido preload de imagens que não eram usadas imediatamente, mantendo apenas fontes críticas.

## 🚀 Configuração no Render

### Passo 1: Adicionar Variável de Ambiente
No painel do Render:
1. Acesse seu serviço: https://dashboard.render.com
2. Vá em **Environment** → **Environment Variables**
3. Adicione:
   - **Key:** `VITE_API_KEY`
   - **Value:** `AIzaSyAqF6H68mJP1vTD-x_wt3S-TdWeZoUsMSU`

### Passo 2: Build Command
```bash
npm install && npm run build
```

### Passo 3: Publish Directory
```
dist
```

### Passo 4: Deploy
Após adicionar a variável de ambiente, faça um novo deploy:
- **Manual Deploy** → Click em "Deploy latest commit"

## 🧪 Como Testar

### Verificar se a API Key está funcionando:
1. Abra o console do navegador (F12)
2. Digite: `console.log(import.meta.env.VITE_API_KEY)`
3. Deve mostrar a chave (em dev) ou estar presente no código compilado (em prod)

### Verificar se o chat funciona:
1. Clique no botão de chat flutuante
2. Envie uma mensagem
3. Deve receber resposta da Ana

## ⚠️ Importante

- A API Key é **injetada em tempo de build**, não em runtime
- Qualquer alteração na `VITE_API_KEY` requer **rebuild completo**
- Em produção, a chave fica "hardcoded" no JS compilado (isso é normal para aplicações frontend)

## 🔒 Segurança

Para maior segurança em produção, considere:
1. Criar uma **API Key específica para produção** no Google AI Studio
2. Restringir a chave por **domínio** (apenas seu domínio .onrender.com)
3. Implementar um **backend proxy** para esconder a chave do cliente

### Configuração de Restrições (Recomendado):
1. Acesse: https://aistudio.google.com/apikey
2. Selecione sua chave
3. Em "Application restrictions":
   - Escolha "HTTP referrers"
   - Adicione: `https://landing-page-npxq.onrender.com/*`
   - Adicione: `http://localhost:*` (para dev)

## 📝 Logs de Debug

Se ainda houver problemas, verifique os logs:
```bash
# No console do navegador, procure por:
⚠️ VITE_API_KEY não configurada  # <- API Key ausente
Chat AI não pode ser inicializado  # <- Falha na inicialização
```

## 🎯 Resultado Esperado

Após as correções:
- ✅ Página carrega normalmente no mobile e desktop
- ✅ Chat AI funciona corretamente
- ✅ Sem erros de API Key no console
- ✅ Sem erros 404
- ✅ Sem warnings de preload

## 🔄 Próximos Passos (Opcional)

Para melhorar ainda mais:
1. Criar backend proxy para API Key
2. Implementar rate limiting
3. Adicionar analytics de uso do chat
4. Cache de respostas frequentes
