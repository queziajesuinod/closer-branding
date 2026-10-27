# Closer Branding · site

Landing page one page da Closer Branding: *Pessoas e marcas, na sua essência.*
HTML, CSS e JavaScript puros, sem build. Feito para celular primeiro.

## Estrutura

```
site/                 ← o que vai para o ar (só esta pasta é publicada)
  index.html          página completa: textos, serviços, etapas, SEO
  js/conteudo.js      ✏️ cases (textos e prints), feed do Instagram, WhatsApp, ID do pixel
  js/main.js          comportamento: menu, Antes/Depois, animações, cookies, pixel
  css/                tokens.css (design system) · components.css · site.css
  assets/             fotos, prints dos cases, feed, ícones
  robots.txt · sitemap.xml · site.webmanifest
  serve.json          cabeçalhos de cache e segurança (usados localmente e no servidor)
closer-ds/            design system (documentação visual dos tokens e componentes)
docs/SEO.md           mapa de SEO e pendências
docker-stack.yml      deploy no servidor (Docker Swarm + Traefik)
```

## Ver localmente

Precisa do [Node.js](https://nodejs.org) instalado. Na primeira vez:

```bash
npm install
```

Depois, sempre que quiser ver o site:

```bash
npm run dev
```

Abra http://localhost:4174 (para o design system: `npm run ds` → http://localhost:4173).

Sem instalar nada, também dá para usar a extensão **Live Server** do VS Code: clique com o botão direito em `site/index.html` → *Open with Live Server*.

## Editar conteúdo

- **Cases e feed:** `site/js/conteudo.js`. Prints em `site/assets/cases/<cliente>/antes|depois/N.webp`, formato 3:4 (~400×530), WebP.
- **Textos das seções, serviços e etapas:** direto no `site/index.html`.
- **Pixel da Meta:** preencher `pixelId` em `site/js/conteudo.js` (só carrega após o aceite de cookies).

Depois de mudar CSS ou JS, suba o número em `?v=` nos links do `index.html` para o navegador pegar a versão nova.

## Publicar

### No servidor (Docker Swarm + Traefik)

O passo a passo completo está no topo do `docker-stack.yml`. Em resumo:

1. Secret `github_token_deploy` com um token de leitura do repositório (se já existe por outro projeto e enxerga este repositório, reaproveite).
2. Aponte o DNS de `closerbranding.com.br` e `www.closerbranding.com.br` para o servidor.
3. Primeiro deploy:

   ```bash
   docker stack deploy -c docker-stack.yml closer
   ```

4. Atualizações: faça o push para a `main` e rode

   ```bash
   docker service update --force closer_site
   ```

### Domínio

O site usa `https://closerbranding.com.br/`. Se o domínio mudar, troque em `docker-stack.yml`, `site/index.html`, `site/robots.txt` e `site/sitemap.xml`.
