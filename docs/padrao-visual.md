# Padrão visual — Steve Jobs Imports

Regra geral: **preto, branco e cinza. Nenhuma cor decorativa.**

## 1. Paleta (única permitida)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#ffffff` | fundo de página |
| `--surface` | `#f5f5f7` | cartões e faixas |
| `--text` | `#1d1d1f` | texto principal |
| `--muted` | `#6e6e73` | texto secundário |
| `--border` | `#d2d2d7` | divisórias |
| `--accent` | `#1d1d1f` | botões e links (neutro) |

Proibido: azul `#0071e3`, verde WhatsApp `#25d366`, azul Facebook/Google, laranja,
amarelo, vermelho. Se precisar indicar estado, use texto + peso da fonte, não cor.

## 2. Tipografia

- Família única: **Inter** (400, 500, 600). Sem Orbitron, sem fonte decorativa.
- Títulos: `letter-spacing: -0.02em`, peso 600.
- Corpo: 16–17 px, `line-height: 1.6`, largura máxima 68ch.

## 3. Imagens — padrão obrigatório

Todas as imagens são geradas/entregues em **WebP**, com estas regras:

- **Fundo: branco puro `#FFFFFF`**. Não use `#f5f5f7`, cinza, gradiente ou fundo transparente.
  O produto precisa "flutuar" no mesmo branco da página, sem emenda visível.
- **Margem de respiro**: 8% de espaço vazio em cada lado. Produto nunca encosta na borda.
- **Proporções**:
  - card de produto: **4:5** → 1200 × 1500 px
  - imagem de categoria: **1:1** → 1000 × 1000 px
  - banner de topo: **16:9** → 1920 × 1080 px
  - foto de cliente: **1:1** → 800 × 800 px
- **Sombra**: apenas contato suave e curta, opacidade ≤ 12%, sem sombra dura.
- **Reflexo**: permitido só no vidro/tela, neutro (sem tom azulado ou colorido).
- **Peso máximo**: 300 KB por imagem. Qualidade WebP 80–85.
- **Nunca** aplicar texto, logo, emoji ou marca d'água dentro da imagem.

## 4. Nomes de produto

- Apenas o modelo: `X50 Pro`, `V35`, `V20 Mini`, `iPhone 18 Pro Max`.
- Proibido no título: potência (`1000W`), marca do fabricante (`INOW`), adjetivo
  (`Premium`, `Top`, `Incrível`), emoji.
- A potência e a ficha técnica vão no corpo da página, em lista de especificações.

## 5. Emojis

Proibidos na interface. Nenhum 🔥 ⚡ ✨ 📲 🚫 em título, botão, badge ou card.

## 6. Responsividade

- Container: `max-width: 1200px`, padding lateral `clamp(16px, 4vw, 48px)`.
- Breakpoints: 1024 / 800 / 768 / 480 px.
- Grade de produtos: 4 → 3 → 2 → 1 coluna.
- Toda imagem com `aspect-ratio` fixo para não gerar layout shift (CLS).
- Alvo de toque mínimo: 44 × 44 px.
