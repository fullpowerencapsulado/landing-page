# 🎨 GUIA DE CORES E CUSTOMIZAÇÃO

## Cores Atuais (Roxo/Púrpura)

O site está configurado com uma paleta roxa profissional:

### Cores Principais
- **Roxo Principal**: `purple-600` → `#9333EA`
- **Roxo Escuro**: `purple-700` → `#7E22CE`
- **Roxo Médio**: `purple-500` → `#A855F7`
- **Roxo Claro**: `purple-400` → `#C084FC`
- **Fúcsia**: `fuchsia-600` → `#C026D3`

### Cores Secundárias
- **Fundo Escuro**: `slate-950` → `#020617`
- **Texto Claro**: `white` → `#FFFFFF`
- **Acentos Verde**: `green-400/500/600` (garantia, sucesso)
- **Acentos Vermelho**: `red-400/500/600` (urgência, alertas)

---

## Como Mudar as Cores

### Método 1: Tailwind (Recomendado)

Abra o arquivo `full-power-landing.jsx` e use buscar/substituir:

**Para mudar de Roxo para Azul:**
```
Buscar: purple-
Substituir: blue-

Buscar: fuchsia-
Substituir: cyan-
```

**Para mudar de Roxo para Verde:**
```
Buscar: purple-
Substituir: emerald-

Buscar: fuchsia-
Substituir: green-
```

**Para mudar de Roxo para Laranja:**
```
Buscar: purple-
Substituir: orange-

Buscar: fuchsia-
Substituir: amber-
```

---

### Método 2: Cores Personalizadas

Edite `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Suas cores personalizadas
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7', // Cor principal
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
    },
  },
  plugins: [],
}
```

Depois substitua no código:
```
purple-600 → primary-600
purple-700 → primary-700
```

---

## 🎨 Paletas Sugeridas por Nicho

### 1. Saúde e Bem-Estar (Verde)
```
Principal: emerald-600
Secundária: teal-600
Acento: lime-500
```

### 2. Tecnologia (Azul)
```
Principal: blue-600
Secundária: cyan-600
Acento: sky-400
```

### 3. Luxo/Premium (Dourado)
```
Principal: amber-600
Secundária: yellow-600
Acento: orange-500
```

### 4. Feminino (Rosa)
```
Principal: pink-600
Secundária: rose-600
Acento: fuchsia-500
```

### 5. Corporativo (Cinza/Azul)
```
Principal: slate-700
Secundária: blue-600
Acento: indigo-500
```

### 6. Energia/Fitness (Vermelho)
```
Principal: red-600
Secundária: orange-600
Acento: yellow-500
```

---

## Cores do Tailwind CSS

### Escala de Cinzas
- `slate-` - Cinza azulado
- `gray-` - Cinza neutro
- `zinc-` - Cinza frio
- `neutral-` - Cinza quente
- `stone-` - Cinza terroso

### Cores Vibrantes
- `red-` - Vermelho
- `orange-` - Laranja
- `amber-` - Âmbar
- `yellow-` - Amarelo
- `lime-` - Lima
- `green-` - Verde
- `emerald-` - Esmeralda
- `teal-` - Verde-azulado
- `cyan-` - Ciano
- `sky-` - Azul céu
- `blue-` - Azul
- `indigo-` - Índigo
- `violet-` - Violeta
- `purple-` - Roxo
- `fuchsia-` - Fúcsia
- `pink-` - Rosa
- `rose-` - Rosê

### Intensidade
Cada cor tem 11 variações (50-950):
- `50` - Muito claro
- `100-300` - Claro
- `400-600` - Médio
- `700-900` - Escuro
- `950` - Muito escuro

---

## 🎯 Onde Mudar Cada Cor

### Fundo Geral
```jsx
bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950
```

### Botões CTA
```jsx
bg-gradient-to-r from-purple-600 via-purple-700 to-fuchsia-600
```

### Cards/Boxes
```jsx
bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40
border border-purple-500/30
```

### Títulos
```jsx
bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent
```

### Hover Effects
```jsx
hover:shadow-2xl hover:shadow-purple-500/50
```

---

## 🌈 Testando Cores

Use o site oficial do Tailwind para visualizar:
https://tailwindcss.com/docs/customizing-colors

Ou teste online:
https://www.tailwindshades.com/

---

## 💡 Dicas de Design

### Contraste
- Fundo escuro + texto claro
- Botões vibrantes + fundo neutro
- Garantia verde + fundo escuro

### Hierarquia
- **Primária**: CTAs principais (comprar)
- **Secundária**: Informações importantes
- **Terciária**: Texto de apoio

### Consistência
- Use no máximo 3 cores principais
- Mantenha a mesma intensidade (500-600)
- Use variações da mesma cor

### Acessibilidade
- Contraste mínimo 4.5:1 para texto
- Teste em modo escuro/claro
- Considere daltonismo

---

## 🔧 Mudanças Rápidas

### Mudar COR DO BOTÃO PRINCIPAL

Busque no código:
```jsx
className="... from-purple-600 via-purple-700 to-fuchsia-600 ..."
```

Substitua por sua cor:
```jsx
className="... from-blue-600 via-blue-700 to-cyan-600 ..."
```

### Mudar COR DOS CARDS

Busque:
```jsx
className="... from-purple-900/40 to-fuchsia-900/40 border border-purple-500/30 ..."
```

Substitua:
```jsx
className="... from-blue-900/40 to-cyan-900/40 border border-blue-500/30 ..."
```

### Mudar COR DOS TÍTULOS

Busque:
```jsx
className="... from-purple-400 to-fuchsia-400 ..."
```

Substitua:
```jsx
className="... from-blue-400 to-cyan-400 ..."
```

---

## 📱 Teste em Diferentes Telas

Sempre teste suas cores em:
- ✅ Desktop (monitor grande)
- ✅ Laptop (monitor médio)
- ✅ Tablet (iPad, Android)
- ✅ Smartphone (iPhone, Android)
- ✅ Modo claro (se aplicável)
- ✅ Modo escuro

---

## 🎨 Geradores de Paleta

Sites úteis para criar paletas:
- https://coolors.co/
- https://color.adobe.com/
- https://mycolor.space/
- https://paletton.com/
- https://colorhunt.co/

---

## ⚠️ Cuidados ao Mudar Cores

1. **Mantenha contraste adequado** para legibilidade
2. **Teste todos os estados** (hover, active, focus)
3. **Verifique animações** (algumas podem usar cores fixas)
4. **Considere a psicologia das cores**:
   - Verde → saúde, crescimento
   - Azul → confiança, tecnologia
   - Vermelho → urgência, energia
   - Roxo → luxo, criatividade
   - Laranja → entusiasmo, ação

---

## 🚀 Exemplo Prático

**Mudar TODO o site de Roxo para Azul:**

1. Abra `full-power-landing.jsx`
2. Use "Find and Replace" (Ctrl+H):

```
Substituir:
purple-50    → blue-50
purple-100   → blue-100
purple-200   → blue-200
purple-300   → blue-300
purple-400   → blue-400
purple-500   → blue-500
purple-600   → blue-600
purple-700   → blue-700
purple-800   → blue-800
purple-900   → blue-900
purple-950   → blue-950

fuchsia-400  → cyan-400
fuchsia-500  → cyan-500
fuchsia-600  → cyan-600
fuchsia-900  → cyan-900
```

3. Salve o arquivo
4. Recarregue o navegador (Ctrl+R)

**Pronto! Seu site agora é azul!** 🎉

---

**Dica Final:** Sempre mantenha uma cópia do arquivo original antes de fazer mudanças drásticas de cor!
