/* ==========================================================
   CONTEÚDO EDITÁVEL DO SITE
   Para trocar os cases (textos e prints) ou o feed, edite este arquivo.
   Imagens: coloque em assets/cases/ (WebP, 3:4, ~600×800) e escreva o caminho.
   Lista vazia [] = mostra espaços cinza no lugar dos prints.
   ========================================================== */

window.CLOSER = {
  whatsapp: {
    numero: '5547933884494',
    mensagem: 'Oi, Closer! Vi o site de vocês e quero entender como vocês podem ajudar a minha marca.'
  },

  // ID do pixel da Meta (Gerenciador de Negócios Closer Branding). Vazio = pixel desligado.
  pixelId: '',

  // Serviços e etapas ficam direto no index.html (seções "O que fazemos" e "Como trabalhamos"),
  // para o Google ler o texto sem depender de JavaScript.

  cases: [
    {
      nome: 'Patrícia Boeving', nicho: 'Fotógrafa', cidade: 'Santa Catarina',
      desafio: 'Trazer constância e uma identidade real para o perfil: mostrar quem é a Patrícia.',
      etiquetas: ['Posicionamento', 'Identidade', 'Constância'],
      perfil: 'patriciaboevingfotografia',
      antes: ['assets/cases/patricia/antes/1.webp', 'assets/cases/patricia/antes/2.webp', 'assets/cases/patricia/antes/3.webp', 'assets/cases/patricia/antes/4.webp', 'assets/cases/patricia/antes/5.webp', 'assets/cases/patricia/antes/6.webp'],
      depois: ['assets/cases/patricia/depois/1.webp', 'assets/cases/patricia/depois/2.webp', 'assets/cases/patricia/depois/3.webp', 'assets/cases/patricia/depois/4.webp', 'assets/cases/patricia/depois/5.webp', 'assets/cases/patricia/depois/6.webp']
    },
    {
      nome: 'Sheila Siedel', nicho: 'Advogada', cidade: 'Santa Catarina',
      desafio: 'Começamos do zero: ela ainda não tinha um perfil profissional.',
      etiquetas: ['Perfil do zero', 'Posicionamento', 'Conteúdo'],
      perfil: 'seidel.advocacia',
      semAntes: true, antes: [],
      depois: ['assets/cases/sheila/depois/1.webp', 'assets/cases/sheila/depois/2.webp', 'assets/cases/sheila/depois/3.webp', 'assets/cases/sheila/depois/4.webp', 'assets/cases/sheila/depois/5.webp', 'assets/cases/sheila/depois/6.webp']
    },
    {
      nome: 'TallHaus', nicho: 'Chalé', cidade: 'Santa Catarina',
      desafio: 'Trazer constância e uma nova identidade para o perfil.',
      etiquetas: ['Nova identidade', 'Constância'],
      perfil: 'chalestalhaus',
      antes: ['assets/cases/tallhaus/antes/1.webp', 'assets/cases/tallhaus/antes/2.webp', 'assets/cases/tallhaus/antes/3.webp', 'assets/cases/tallhaus/antes/4.webp', 'assets/cases/tallhaus/antes/5.webp', 'assets/cases/tallhaus/antes/6.webp'],
      depois: ['assets/cases/tallhaus/depois/1.webp', 'assets/cases/tallhaus/depois/2.webp', 'assets/cases/tallhaus/depois/3.webp', 'assets/cases/tallhaus/depois/4.webp', 'assets/cases/tallhaus/depois/5.webp', 'assets/cases/tallhaus/depois/6.webp']
    },
    {
      nome: 'Aline Barboza', nicho: 'Consultora financeira', cidade: 'Santa Catarina',
      desafio: 'Trazer constância, uma identidade nova e mostrar o que de fato é o trabalho dela.',
      etiquetas: ['Nova identidade', 'Posicionamento', 'Constância'],
      perfil: 'alinebarboza.financas',
      antes: ['assets/cases/aline/antes/1.webp', 'assets/cases/aline/antes/2.webp', 'assets/cases/aline/antes/3.webp', 'assets/cases/aline/antes/4.webp', 'assets/cases/aline/antes/5.webp', 'assets/cases/aline/antes/6.webp'],
      depois: ['assets/cases/aline/depois/1.webp', 'assets/cases/aline/depois/2.webp', 'assets/cases/aline/depois/3.webp', 'assets/cases/aline/depois/4.webp', 'assets/cases/aline/depois/5.webp', 'assets/cases/aline/depois/6.webp']
    }
  ],

  // Últimos posts do @closer.branding (use 4, 8 ou 12: a grade tem 4 colunas). Ex.: { src: 'assets/feed/01.webp', alt: 'Post: afinal, o que fazemos?' }
  feed: [
    { src: 'assets/feed/01.webp', alt: 'Post da Closer: afinal, o que fazemos?' },
    { src: 'assets/feed/02.webp', alt: 'Post da Closer: antes de existir a Closer, existia uma pergunta' },
    { src: 'assets/feed/03.webp', alt: 'Post da Closer com a foto de uma cebola' },
    { src: 'assets/feed/04.webp', alt: 'Vídeo da Closer: reunião de planejamento' },
    { src: 'assets/feed/05.webp', alt: 'Vídeo da Closer: o logo escrito à mão' },
    { src: 'assets/feed/06.webp', alt: 'Post da Closer apresentando Michele Borges' },
    { src: 'assets/feed/07.webp', alt: 'Post da Closer apresentando Kati Henschel' },
    { src: 'assets/feed/08.webp', alt: 'Vídeo da Closer: Closer Branding' }
  ]
};
