# Closer Branding · site

Landing page one page da Closer Branding: *Pessoas e marcas, na sua essência.*
HTML, CSS e JavaScript puros, sem build. Feito para celular primeiro.

## Estrutura

```
site/                 ← o que vai para o ar (Netlify publica esta pasta)
  index.html          página completa: textos, serviços, etapas, SEO
  js/conteudo.js      ✏️ cases (textos e prints), feed do Instagram, WhatsApp, ID do pixel
  js/main.js          comportamento: menu, Antes/Depois, animações, cookies, pixel
  css/                tokens.css (design system) · components.css · site.css
  assets/             fotos, prints dos cases, feed, ícones
  robots.txt · sitemap.xml · site.webmanifest · _headers
closer-ds/            design system (documentação visual dos tokens e componentes)
docs/SEO.md           mapa de SEO e pendências
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

Conecte o repositório no Netlify e, em *Build settings*, deixe o comando de build vazio e o **Publish directory** como `site`.
Ao ligar o domínio oficial, troque `https://closerbranding.netlify.app/` em `site/index.html`, `site/robots.txt` e `site/sitemap.xml`.
