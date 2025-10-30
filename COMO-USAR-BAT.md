# 🚀 Guia dos Arquivos .BAT

## Arquivos Criados

### 1. `iniciar-sistema.bat` - Limpeza Completa + Iniciar
**Quando usar:** Quando houver problemas, bugs ou após atualizar o código

**O que faz:**
- ✅ Verifica se Node.js está instalado
- 🧹 Remove `node_modules`, `dist`, `build`, `.cache`
- 🧹 Limpa cache do npm
- 📦 Reinstala todas as dependências
- 🚀 Inicia o servidor de desenvolvimento

**Como usar:**
```
Duplo clique em: iniciar-sistema.bat
```

---

### 2. `iniciar-rapido.bat` - Início Rápido (Recomendado)
**Quando usar:** Para uso diário, quando tudo está funcionando

**O que faz:**
- ✅ Verifica se Node.js está instalado
- ✅ Verifica se dependências estão instaladas (instala se necessário)
- 🚀 Inicia o servidor de desenvolvimento

**Como usar:**
```
Duplo clique em: iniciar-rapido.bat
```

---

### 3. `gerar-build.bat` - Gerar Build de Produção
**Quando usar:** Quando for publicar o site no servidor

**O que faz:**
- ✅ Verifica Node.js e dependências
- 🧹 Remove build anterior
- 📦 Gera build otimizado na pasta `dist`
- ❓ Oferece opção de visualizar o build localmente

**Como usar:**
```
Duplo clique em: gerar-build.bat
```

**Após gerar:**
1. Abra a pasta `dist`
2. Faça upload dos arquivos para: `serverartseven.com.br/saudeemhabitos/`

---

## 🎯 Qual usar?

| Situação | Arquivo |
|----------|---------|
| Primeiro uso | `iniciar-sistema.bat` |
| Uso diário | `iniciar-rapido.bat` |
| Após puxar código do Git | `iniciar-sistema.bat` |
| Travou ou deu erro | `iniciar-sistema.bat` |
| Publicar no servidor | `gerar-build.bat` |

---

## 🌐 Acessando o Sistema

Após iniciar com qualquer `.bat`, o sistema estará disponível em:

```
http://localhost:3000
```

O navegador deve abrir automaticamente. Se não abrir, copie e cole o link acima.

---

## ⚠️ Solucionando Problemas

### "Node.js não encontrado"
- Instale o Node.js: https://nodejs.org/
- Escolha a versão LTS (recomendada)
- Reinicie o computador após instalar

### "Porta 3000 já em uso"
- Feche qualquer servidor rodando
- Ou pressione `Ctrl+C` no terminal anterior
- Execute o `.bat` novamente

### "Falha ao instalar dependências"
- Verifique sua conexão com a internet
- Execute `iniciar-sistema.bat` para limpeza completa

---

## 🛑 Parando o Servidor

Para parar o servidor a qualquer momento:

1. Clique na janela do terminal
2. Pressione `Ctrl + C`
3. Confirme com `S` se perguntado

---

## 📝 Dicas

- **Use `iniciar-rapido.bat` no dia a dia** - é mais rápido
- **Use `iniciar-sistema.bat` quando houver problemas** - resolve 90% dos bugs
- **Sempre gere um novo build** antes de publicar mudanças no servidor
- **Não feche a janela do terminal** enquanto estiver trabalhando no site
