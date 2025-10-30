# Como Adicionar Vídeos de Depoimentos

## 📹 Problema Atual

Os vídeos não estão carregando porque a pasta `public/videos/` está vazia.

## ✅ Solução - Passo a Passo

### 1. Prepare seus vídeos

- **Formato recomendado:** MP4 (melhor compatibilidade)
- **Tamanho:** Máximo 50MB por vídeo (para carregamento rápido)
- **Orientação:** Vertical (formato celular) ou quadrado
- **Duração:** 15-60 segundos (ideal para depoimentos)

### 2. Renomeie os arquivos

Renomeie seus vídeos exatamente como está no código:

```
depoimento1.mp4
depoimento2.mp4
depoimento3.mp4
depoimento4.mp4
depoimento5.mp4
depoimento6.mp4
```

### 3. Coloque na pasta correta

Copie os vídeos para a pasta:
```
D:\Sistemas\Encapsulado\public\videos\
```

A estrutura deve ficar assim:
```
Encapsulado/
├── public/
│   ├── videos/
│   │   ├── depoimento1.mp4
│   │   ├── depoimento2.mp4
│   │   ├── depoimento3.mp4
│   │   ├── depoimento4.mp4
│   │   ├── depoimento5.mp4
│   │   └── depoimento6.mp4
```

### 4. Teste a página

1. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse a seção de depoimentos

3. Os vídeos devem carregar e reproduzir com áudio

## 🎬 Personalizando os Depoimentos

Para alterar os nomes e resultados, edite o array `videoTestimonials`:

```javascript
const videoTestimonials = [
  { video: 'depoimento1.mp4', name: "Seu Nome Aqui", result: "-8kg em 6 semanas" },
  // ... adicione mais ou altere conforme necessário
];
```

## ❓ Problemas Comuns

### Vídeo não carrega
- ✅ Verifique se o nome do arquivo está correto
- ✅ Verifique se o arquivo está em `public/videos/`
- ✅ Confirme que é um arquivo `.mp4` válido

### Vídeo sem áudio
- ✅ Confirme que o vídeo original tem áudio
- ✅ Teste o vídeo fora do navegador
- ✅ Aumente o volume do sistema

### Vídeo muito grande/lento
- ✅ Comprima o vídeo (use: HandBrake, FFmpeg, ou sites online)
- ✅ Reduza a resolução para 720p ou 1080p
- ✅ Use formato MP4 com codec H.264

## 🚀 Pronto!

Agora seus depoimentos em vídeo devem estar funcionando perfeitamente!
