# Relatório de alterações

## Onde ver

- **No Antigravity**: painel Source Control (Ctrl+Shift+G) mostra cada arquivo alterado, antes/depois.
- **No GitHub**: branch `estilo-limpo` (quando enviada) com o diff completo.

## O que foi alterado nesta rodada (pasta local)

| Arquivo | Alteração |
|---|---|
| 10 páginas de bike | emojis removidos, título = só o modelo (`V35`, `X50 Pro`, `V9 Max`…) |
| `iphone18-prevenda.html` | emoji removido, título = `iPhone 18 Pro Max` |
| `bikes.html` | título padronizado, marca corrigida (era "JOBS MAFIA") |
| `catalogo.html` | título padronizado |
| `index.html` | título com marca única |
| `style.css` | azul `#0071e3` → neutro `#1d1d1f`; `#0062cc` → `#000` |

## Regras aplicadas

1. Marca única: **Steve Jobs Imports** em todas as páginas (antes havia "JOBS MAFIA").
2. Títulos sem potência: "Bicicleta Elétrica V35 1000W | JOBS MAFIA" → "V35 | Steve Jobs Imports".
3. Headings de produto apenas com o nome do modelo.
4. Zero emojis em todas as 14 páginas.
5. Paleta neutra no CSS (ver `docs/padrao-visual.md`).

## Pendências

- Aplicar o mesmo tratamento de SEO (description, canonical, Open Graph, JSON-LD) na versão local.
- Reprocessar as imagens com fundo branco `#FFFFFF` no padrão 4:5 / 1:1.
- Revisar cores restantes no CSS (31 hex distintos, sendo 5 de marcas externas).
- Auditar responsividade nas 4 larguras de breakpoint.
