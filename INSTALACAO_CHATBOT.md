# Instalação do Chatbot de IA - Full Power

Este documento descreve como configurar o assistente de IA (Ana) no projeto Full Power Landing Page.

## Arquivos Criados

Os seguintes arquivos foram adicionados ao projeto:

### 1. Módulos de IA (`ia-modules/`)
- `00-master.js` - Combinação de todas as instruções
- `01-persona.js` - Personalidade da Ana (humana, empática, consultora)
- `02-knowledge-base.js` - Base de conhecimento sobre o Full Power
- `03-conversation-flow.js` - Fluxo de vendas e conversação
- `04-rules.js` - Regras fundamentais de comportamento
- `05-lead-handling.js` - Gestão de leads e objeções

### 2. Serviço (`services/`)
- `geminiService.js` - Integração com Google Gemini AI

### 3. Componente
- `AIAssistant.jsx` - Componente React do chatbot

## Instalação

### Passo 1: Instalar Dependência

Você precisa instalar o pacote `@google/genai`:

```bash
npm install @google/genai
```

### Passo 2: Configurar API Key

1. **Obter API Key do Google AI Studio:**
   - Acesse: https://aistudio.google.com/apikey
   - Faça login com sua conta Google
   - Clique em "Create API Key"
   - Copie a chave gerada

2. **Configurar variável de ambiente:**

   Crie um arquivo `.env` na raiz do projeto (se ainda não existir):

   ```env
   VITE_API_KEY=sua_chave_api_aqui
   ```

   **IMPORTANTE:** Substitua `sua_chave_api_aqui` pela sua chave real do Google AI Studio.

3. **Adicionar .env ao .gitignore:**

   Verifique se o arquivo `.gitignore` contém:

   ```
   .env
   .env.local
   ```

   Isso evita que a API key seja enviada ao GitHub.

### Passo 3: Verificar Configuração

O chatbot já está integrado na landing page! Ele aparecerá como um botão flutuante verde no canto inferior direito.

## Como Funciona

### Interface
- **Botão Flutuante:** Ícone de chat verde no canto inferior direito
- **Janela de Chat:** Abre ao clicar no botão
- **Cores:** Verde (from-green-700 to-emerald-600) para combinar com a identidade visual

### Funcionalidades
- **Mensagens Iniciais:** Ana se apresenta automaticamente quando o chat é aberto
- **Streaming de Respostas:** Mensagens aparecem em sequência com delay de 800ms
- **Indicador de Digitação:** Mostra 3 pontinhos animados enquanto a IA processa
- **Histórico de Conversa:** Mantém todo o contexto da conversa

### Personalidade da Ana
- Humana e empática (usa emojis: 😊, ✨, 💪, 😉)
- Especialista em Full Power
- Focada em vendas (guia o cliente para a compra)
- Responde com base APENAS nas informações do produto

### Modelo de IA
- **Modelo:** Gemini 2.5 Flash (Google)
- **Instruções:** Sistema de prompts modulares em 5 arquivos
- **Conhecimento:** Informações completas sobre Full Power, benefícios, composição, contra-indicações, preço

## Desenvolvimento Local

Para rodar o projeto em desenvolvimento:

```bash
npm run dev
```

O chatbot estará disponível e funcionando se a API key estiver configurada corretamente.

## Deploy no Render.com

Ao fazer deploy no Render.com, configure a variável de ambiente:

1. No dashboard do Render, vá em "Environment"
2. Adicione:
   - **Key:** `VITE_API_KEY`
   - **Value:** Sua chave do Google AI Studio

## Troubleshooting

### "Error sending message"
- Verifique se a API key está configurada corretamente no arquivo `.env`
- Verifique se a variável está como `VITE_API_KEY` (não `API_KEY`)
- Reinicie o servidor de desenvolvimento após adicionar o `.env`

### Chatbot não aparece
- Verifique se o import está correto no `full-power-landing.jsx`
- Verifique o console do navegador para erros de JavaScript
- Certifique-se de que todos os arquivos foram criados corretamente

### Respostas genéricas ou erradas
- As instruções da IA estão em `ia-modules/`
- Você pode editar esses arquivos para ajustar o comportamento
- Após editar, reinicie o servidor de desenvolvimento

## Estrutura de Arquivos

```
D:\Sistemas\Encapsulado\
├── ia-modules/
│   ├── 00-master.js          # Combina todas instruções
│   ├── 01-persona.js          # Personalidade
│   ├── 02-knowledge-base.js   # Conhecimento do produto
│   ├── 03-conversation-flow.js # Fluxo de vendas
│   ├── 04-rules.js            # Regras de comportamento
│   └── 05-lead-handling.js    # Gestão de leads
├── services/
│   └── geminiService.js       # Integração Gemini
├── AIAssistant.jsx            # Componente do chatbot
├── full-power-landing.jsx     # Landing page (importa AIAssistant)
├── .env                       # API key (não versionar!)
└── INSTALACAO_CHATBOT.md      # Este arquivo
```

## Customização

### Alterar Mensagens Iniciais
Edite o array `initialTexts` em `AIAssistant.jsx` (linha ~91):

```javascript
const initialTexts = [
  'Sua primeira mensagem 😊',
  'Sua segunda mensagem.',
  'Sua terceira mensagem?',
];
```

### Alterar Conhecimento
Edite `ia-modules/02-knowledge-base.js` para atualizar informações do produto.

### Alterar Personalidade
Edite `ia-modules/01-persona.js` para ajustar o tom e estilo da Ana.

### Alterar Cores
As cores estão em `AIAssistant.jsx`:
- Botão flutuante: `from-green-700 to-emerald-600`
- Cabeçalho: `from-green-700 to-emerald-600`
- Botão enviar: `from-green-700 to-emerald-600`
- Focus ring: `ring-green-600`

## Suporte

Para dúvidas sobre a API do Google Gemini:
- Documentação: https://ai.google.dev/docs
- API Keys: https://aistudio.google.com/apikey

---

**Desenvolvido para Full Power - Transformando vidas através do poder da natureza**
