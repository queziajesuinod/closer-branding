# Mapa de SEO · Closer Branding

Site de uma página (one page), destino de anúncio no Instagram e link direto para clientes.
Objetivo de busca: aparecer para quem procura **agência de branding / posicionamento em Santa Catarina** e, principalmente, para quem busca **"Closer Branding"** pelo nome.

## 1. Palavras-chave

| Prioridade | Termo | Onde está no site |
|---|---|---|
| Marca | closer branding, closer.branding | title, h1, logo, JSON-LD, og |
| Principal | agência de branding santa catarina | title, description, JSON-LD (areaServed) |
| Principal | posicionamento de marca / de imagem | eyebrow do topo, serviço 03, description |
| Secundária | storytelling para marcas | eyebrow do topo, description |
| Secundária | consultoria de imagem, direção criativa para redes sociais, produção de Reels, carrosséis | 7 serviços (h3, agora em HTML estático) |
| Pessoas | Michele Borges, Kati Henschel | Quem somos, alt das fotos, JSON-LD (founder) |
| Local | SC, Santa Catarina | title, description, rodapé, geo.region, JSON-LD |

## 2. O que foi aplicado

**Página (index.html)**
- `title` com 55 caracteres: "Closer Branding | Agência de Branding em Santa Catarina".
- `description` com 160 caracteres, com branding, posicionamento, storytelling, Instagram e SC.
- `canonical` absoluto. Os links do anúncio com `?utm_` e `?fbclid` apontam para a mesma página, sem conteúdo duplicado.
- `robots`: index, follow e prévia de imagem grande.
- Open Graph e Twitter com URLs absolutas. Antes a imagem de prévia era relativa e **não aparecia no WhatsApp**. Agora a imagem 1200×630 tem `alt`.
- Hierarquia: um `h1` ("Closer Branding") e um `h2` por seção. A seção "Para quem é" ganhou o seu, e os serviços, etapas e cases usam `h3`.
- **Serviços e etapas saíram do JavaScript e foram para o HTML.** O Google lê esse texto de cara, sem precisar executar scripts. É o conteúdo com mais palavras-chave do site.
- Todas as imagens têm `alt` descritivo, e as fotos das fundadoras citam o nome de cada uma.
- `lang="pt-BR"` e `og:locale` pt_BR.

**Dados estruturados (JSON-LD)**
- `WebSite`, `ProfessionalService` + `LocalBusiness` e `WebPage`, ligados por `@id`.
- O negócio traz nome, slogan, descrição, telefone, WhatsApp (contactPoint), SC/BR, fundadoras, Instagram (`sameAs`), áreas de conhecimento e os **7 serviços** em `hasOfferCatalog`.

**Arquivos novos na raiz do site**
- `robots.txt`: libera tudo e aponta o sitemap. De propósito, ele **não** bloqueia links com UTM, porque o robô do Facebook precisa deles para montar a prévia do anúncio.
- `sitemap.xml`: a página e as imagens principais.
- `favicon.ico`, `apple-touch-icon.png`, ícones 192 e 512 e `site.webmanifest`. O ícone aparece na aba, na busca do Google no celular e ao salvar o site na tela inicial.
- `_headers` (Netlify): cache de 7 dias para imagens, CSS e JS sempre conferidos e cabeçalhos de segurança.

## 3. Desempenho (Core Web Vitals)

| Métrica | O que garante |
|---|---|
| LCP (carregar o principal) | Foto do topo com `preload` e `fetchpriority="high"`, 20 KB no celular. Fontes com `display=swap` |
| CLS (layout pulando) | Todas as fotos têm `width`/`height` ou `aspect-ratio`, e as grades têm proporção fixa |
| INP (resposta ao toque) | O JS roda com `defer`. As animações usam só `transform` e `opacity`. A rolagem suave (Lenis) roda só com mouse e trackpad, e o toque do celular fica nativo |
| Peso | O código tem cerca de 70 KB. Os prints (860 KB) só carregam ao rolar (`loading="lazy"`) |

## 4. Pendências (dependem da Closer)

1. **Domínio oficial.** Hoje tudo aponta para `https://closerbranding.netlify.app/`. Ao ligar o domínio, troque esse endereço em `index.html` (está marcado com um comentário no topo), `robots.txt` e `sitemap.xml`. No Netlify, deixe o domínio oficial como principal, para o netlify.app redirecionar para ele.
2. **Google Search Console.** Cadastre o domínio, envie o `sitemap.xml` e peça a indexação.
3. **Perfil da Empresa no Google (Google Meu Negócio).** É o que mais pesa na busca local ("branding em [cidade]"). Use o mesmo nome, telefone e link do site.
4. **Cidade.** O site diz só "Santa Catarina". Com a cidade definida, ela entra no rodapé, no `addressLocality` do JSON-LD e na description, e isso melhora a busca local.
5. **Validar.** Use o Teste de Pesquisa Aprimorada do Google (search.google.com/test/rich-results) e o depurador de compartilhamento do Facebook (developers.facebook.com/tools/debug).
6. **Opcional, para ganhar mais velocidade:** hospedar as fontes no próprio site em vez do Google Fonts. Isso economiza de 100 a 300 ms no 4G.
