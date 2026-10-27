(function () {
  'use strict';
  var C = window.CLOSER;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  // ---------- WhatsApp ----------
  var waUrl = 'https://wa.me/' + C.whatsapp.numero + '?text=' + encodeURIComponent(C.whatsapp.mensagem);
  $$('[data-wa]').forEach(function (a) {
    a.href = waUrl;
    a.addEventListener('click', function () { if (window.fbq) window.fbq('track', 'Contact'); });
  });

  // ---------- Cases ----------
  function tiles(list, nome, quando) {
    var n = Math.max(list.length, 6), out = '';
    for (var i = 0; i < n; i++) {
      var src = list[i];
      out += src
        ? '<div class="case__tile"><img src="' + esc(src) + '" alt="Publicação de ' + esc(nome) + ', ' + quando + ' da Closer" loading="lazy"></div>'
        : '<div class="case__tile case__tile--empty" aria-hidden="true">print ' + (i + 1) + '</div>';
    }
    return out;
  }
  $('#cases-list').innerHTML = C.cases.map(function (c, k) {
    var id = 'case-' + k;
    var antes = c.semAntes
      ? '<div class="case__grid"><div class="case__empty"><p class="t-hand" style="margin:0">antes: não existia perfil profissional</p></div></div>'
      : '<div class="case__grid">' + tiles(c.antes, c.nome, 'antes') + '</div>';
    return '<article class="case reveal" data-case aria-labelledby="' + id + '-nome">' +
      '<div class="case__head">' +
        '<span class="tag" style="justify-self:start">Um dos nossos clientes</span>' +
        '<h3 class="t-h2 case__name" id="' + id + '-nome">' + esc(c.nome) + '</h3>' +
        '<p class="t-label case__meta">' + esc(c.nicho) + ' · ' + esc(c.cidade) + '</p>' +
        '<p class="case__challenge">' + esc(c.desafio) + '</p>' +
        '<div class="case__tags">' + c.etiquetas.map(function (t) { return '<span class="tag tag--outline">' + esc(t) + '</span>'; }).join('') + '</div>' +
      '</div>' +
      '<div class="segmented" role="tablist" aria-label="Comparar o perfil de ' + esc(c.nome) + '" style="justify-self:start">' +
        '<button type="button" role="tab" id="' + id + '-t-antes" aria-controls="' + id + '-antes" aria-selected="false" tabindex="-1" data-show="antes">Antes</button>' +
        '<button type="button" role="tab" id="' + id + '-t-depois" aria-controls="' + id + '-depois" aria-selected="true" data-show="depois">Depois</button>' +
      '</div>' +
      '<div class="case__compare">' +
        '<div class="case__col case__col--antes" role="tabpanel" id="' + id + '-antes" aria-labelledby="' + id + '-t-antes" data-panel="antes" hidden><h4 class="t-label t-muted">Antes</h4>' + antes + '</div>' +
        '<div class="case__col" role="tabpanel" id="' + id + '-depois" aria-labelledby="' + id + '-t-depois" data-panel="depois"><h4 class="t-label">Depois, com a Closer</h4><div class="case__grid">' + tiles(c.depois, c.nome, 'depois') + '</div></div>' +
      '</div>' +
      '<a class="btn btn--secondary btn--sm case__link" style="justify-self:start" href="https://instagram.com/' + esc(c.perfil) + '" target="_blank" rel="noopener">Ver @' + esc(c.perfil) + '</a>' +
    '</article>';
  }).join('');

  $$('[data-case]').forEach(function (c) {
    var tabs = $$('[role=tab]', c);
    function select(t) {
      tabs.forEach(function (b) { var on = b === t; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
      $$('[data-panel]', c).forEach(function (p) {
        p.hidden = p.dataset.panel !== t.dataset.show;
        if (!p.hidden) { p.classList.remove('is-swapping'); void p.offsetWidth; p.classList.add('is-swapping'); }
      });
    }
    $$('.case__tile', c).forEach(function (tile, i) { tile.style.setProperty('--t', i % 6); });
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var n = tabs[(i + 1) % tabs.length]; n.focus(); select(n);
      });
    });
  });

  // ---------- Feed ----------
  var feed = C.feed.length ? C.feed : Array.apply(null, Array(6)).map(function () { return null; });
  $('#feed-grid').innerHTML = feed.map(function (p, i) {
    return p
      ? '<a href="https://instagram.com/closer.branding" target="_blank" rel="noopener"><img src="' + esc(p.src) + '" alt="' + esc(p.alt) + '" loading="lazy"></a>'
      : '<div class="case__tile--empty" aria-hidden="true">post ' + (i + 1) + '</div>';
  }).join('');

  // ---------- Header: linha ao rolar + seção ativa ----------
  var header = $('#header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var navLinks = $$('.header__nav a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id); if (a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'true'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['sobre', 'servicos', 'cases', 'contato'].forEach(function (id) { spy.observe(document.getElementById(id)); });
  }

  // ---------- Menu do celular ----------
  var menu = $('#menu'), openBtn = $('.header .header__menu'), lastFocus;
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    openBtn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (lenis) { if (open) lenis.stop(); else lenis.start(); }
    if (open) { lastFocus = document.activeElement; $('[data-close]', menu).focus(); } else if (lastFocus) { lastFocus.focus(); }
  }
  openBtn.addEventListener('click', function () { setMenu(true); });
  $('[data-close]', menu).addEventListener('click', function () { setMenu(false); });
  $$('nav a, [data-wa]', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });

  // ---------- Botão flutuante: aparece assim que o WhatsApp do topo sai da tela, some na chamada final/rodapé ----------
  var fab = $('.fab'), toTop = $('.to-top');
  if ('IntersectionObserver' in window) {
    var heroCta = $('.hero [data-wa]'), finalSec = $('#contato'), footerEl = $('.footer'), visible = { hero: true, final: false, footer: false };
    var fabObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target === heroCta ? 'hero' : en.target === footerEl ? 'footer' : 'final'] = en.isIntersecting; });
      var atEnd = visible.final || visible.footer;
      fab.classList.toggle('is-hidden', visible.hero || atEnd);
      toTop.classList.toggle('is-hidden', !atEnd);
      toTop.tabIndex = atEnd ? 0 : -1;
    }, { threshold: 0.15 });
    fabObs.observe(heroCta); fabObs.observe(finalSec); fabObs.observe(footerEl);
  } else { fab.classList.remove('is-hidden'); toTop.classList.remove('is-hidden'); toTop.tabIndex = 0; }

  // ---------- Voltar ao topo: aparece na chamada final e no rodapé, no lugar do WhatsApp ----------
  toTop.addEventListener('click', function () {
    $('.header .logo').focus({ preventScroll: true }); // foco antes: mover o foco depois cancela a rolagem suave
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });

  // ---------- Movimento: entradas, títulos, fotos, manifesto, parallax ----------
  var motionOk = 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Quebra o texto em palavras, preservando itálicos/negritos e <br>
  function splitWords(el, mask) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement('span'); w.className = 'w'; w.style.setProperty('--i', i++);
            if (mask) { var inner = document.createElement('span'); inner.className = 'w__i'; inner.textContent = part; w.appendChild(inner); }
            else w.textContent = part;
            frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') { walk(n); }
      });
    })(el);
  }

  var lenis = null;
  if (motionOk) {
    document.body.classList.add('motion');

    // Títulos com máscara palavra por palavra
    $$('.hero__title, .section__title, .services__head h2, .final__title, .case__name, .feed__head h3').forEach(function (h) {
      splitWords(h, true); h.classList.add('split');
    });
    $('.hero__title').style.setProperty('--d', '150ms');

    // Fotos com cortina
    $$('.founder, .method__media').forEach(function (f) { f.classList.add('img-reveal'); });

    // Manifesto acende ao rolar
    var scrub = $('.manifesto__quote'); splitWords(scrub, false); scrub.classList.add('scrub');
    var scrubWords = $$('.w', scrub);

    // Cascata do feed
    $$('#feed-grid > *').forEach(function (el, i) { el.style.setProperty('--t', i); });

    // Observa tudo que entra na tela
    var targets = $$('.reveal, .split, .img-reveal, .service, .audience__list li, .method__steps .step, #feed-grid, .note');
    var rv = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); rv.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    targets.forEach(function (el) {
      if (el.classList.contains('reveal') && !el.style.transitionDelay) {
        var sib = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
        el.style.transitionDelay = Math.min(sib, 4) * 90 + 'ms';
      }
      if (el.closest('.hero')) return; // o topo entra pela sequência de carregamento
      rv.observe(el);
    });

    // Sequência de entrada do topo
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      document.body.classList.add('is-loaded'); $('.hero__title').classList.add('is-in');
    }); });

    // Deriva da marca d'água e manifesto acendendo (só transform/opacity, barato)
    var marks = $$('.watermark');
    var vh = window.innerHeight;
    window.addEventListener('resize', function () { vh = window.innerHeight; }, { passive: true });
    function frame() {
      // marca d'água desliza na horizontal conforme a seção passa
      marks.forEach(function (m, k) {
        var r = m.parentNode.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var p = (vh - r.top) / (vh + r.height); // 0 → 1
        m.style.transform = 'translate3d(' + ((k % 2 ? 1 : -1) * (p - .5) * 12) + '%,0,0)';
      });
      // manifesto: cada palavra acende quando a linha passa do meio da tela
      if (scrubWords.length) {
        var sr = scrub.getBoundingClientRect();
        var prog = Math.min(1, Math.max(0, (vh * .85 - sr.top) / (sr.height + vh * .35)));
        var lit = Math.round(prog * scrubWords.length);
        scrubWords.forEach(function (w, j) { w.classList.toggle('on', j < lit); });
      }
    }

    // Rolagem suave com inércia (só mouse/trackpad; toque continua nativo)
    if (window.Lenis && window.matchMedia('(pointer: fine)').matches) {
      lenis = new window.Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
      lenis.on('scroll', frame);
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
      // âncoras do menu respeitam o header fixo
      $$('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          var id = a.getAttribute('href'); if (id.length < 2) return;
          var el = document.querySelector(id); if (!el) return;
          e.preventDefault(); lenis.scrollTo(el, { offset: id === '#topo' ? -200 : -60 });
        });
      });
    } else {
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return; ticking = true;
        requestAnimationFrame(function () { frame(); ticking = false; });
      }, { passive: true });
    }
    frame();
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  // ---------- Cookies + Pixel da Meta (LGPD) ----------
  var KEY = 'closer-consent', banner = $('#cookie');
  function getConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function loadPixel() {
    if (!C.pixelId || window.fbq) return;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', C.pixelId); window.fbq('track', 'PageView');
  }
  function showBanner(show) { banner.hidden = !show; document.body.classList.toggle('has-cookie', show); }
  var consent = getConsent();
  if (consent === 'sim') loadPixel(); else if (!consent) showBanner(true);
  $$('[data-consent]', banner).forEach(function (b) {
    b.addEventListener('click', function () {
      setConsent(b.dataset.consent); showBanner(false);
      if (b.dataset.consent === 'sim') loadPixel();
    });
  });
  $('[data-cookie-reopen]').addEventListener('click', function (e) { e.preventDefault(); showBanner(true); });

  $('#year').textContent = new Date().getFullYear();
})();
