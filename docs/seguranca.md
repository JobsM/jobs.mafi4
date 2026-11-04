# Segurança do site

Site estático (HTML + CSS + JS puro, sem banco de dados). Isso já elimina várias classes de ataque —
mas não todas. Abaixo, o que existe, o que foi corrigido e o que depende de você.

## O que NÃO se aplica a este site

| Ataque | Por quê não se aplica |
|---|---|
| **SQL Injection** | Não existe banco de dados nem SQL. Nenhuma query é montada. |
| **IDOR** | Não há área logada nem objeto por ID no servidor (ex.: `/pedido?id=42`). |
| **DDoS** | Não há servidor próprio; quem absorve é a Vercel/Cloudflare. |
| **MITM** | Resolvido por HTTPS + HSTS (headers em `vercel.json`). |

## O que se aplica

| Risco | Situação | Ação |
|---|---|---|
| **XSS** | Baixo: não há `innerHTML`, `eval` nem `document.write` no código | Manter assim. Nunca usar `innerHTML` com dado de usuário. |
| **Tabnabbing** | 79 links `target="_blank"` sem `rel` | **Corrigido** com `rel="noopener noreferrer"`. |
| **Supply chain (CDN)** | Swiper e Font Awesome vêm de CDN sem SRI | Adicionar `integrity` + `crossorigin`, ou hospedar localmente. |
| **Clickjacking** | Sem proteção de frame | **Corrigido** com `X-Frame-Options: DENY` + `frame-ancestors 'none'`. |
| **Vazamento de chave** | Supabase está comentado, sem chave no código | Nunca commitar chave. Se usar Supabase, só a `anon key` no front. |
| **Formulário** | `waitlist-form` não envia para servidor | Se um dia enviar, validar no servidor e usar rate limit. |

## Regras para o dia a dia

1. **Nunca** cole chave secreta (Supabase service key, token) no HTML ou no `script.js`.
2. **Nunca** use `innerHTML` com texto que vem de fora (query string, input, API).
3. Todo link externo com `target="_blank"` precisa de `rel="noopener noreferrer"`.
4. Script de CDN só com `integrity` (SRI) ou hospedado no próprio domínio.
5. Se um dia houver backend: validar entrada, usar prepared statements e checar permissão em **cada** requisição.

## Como testar depois de publicar

- `https://securityheaders.com/?q=stevemobile.com.br` — nota dos headers.
- `https://observatory.mozilla.org/` — varredura Mozilla.
