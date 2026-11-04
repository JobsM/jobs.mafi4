# Arquivo — produtos fora de linha

Aqui ficam páginas de produtos que saíram do catálogo, mas que podem voltar depois.
**Nada é apagado**: o arquivo continua versionado no Git.

## Como arquivar uma bike

1. Mova a página: `v20-mini.html` → `arquivo/bikes/v20-mini.html`
2. Em `bikes.html`, apague o `<article class="produto-card">` (ou `<a class="produto-card">`) daquele modelo.
3. Em `catalogo.html`, apague o card correspondente.
4. Se houver link no menu ou no rodapé, remova.
5. Rode `git add -A && git commit -m "arquiva V20 Mini"`.

## Como trazer de volta

1. Mova de volta: `arquivo/bikes/v20-mini.html` → `v20-mini.html`
2. Recrie o card em `bikes.html` e `catalogo.html` copiando o formato de outro modelo.
3. Confira se as imagens em `img/` continuam lá (elas não são apagadas no arquivamento).

## Regra de nomenclatura

- Página: `<modelo>.html` em minúsculas, com hífen (`x50-pro.html`).
- Imagem: `img/<modelo>-1.webp`, `-2.webp`, `-3.webp`.
