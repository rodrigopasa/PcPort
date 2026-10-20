/**
 * The game, as distinct from the port.
 *
 * An entry carries two dates that mean different things: when the game
 * originally shipped, and when this port shipped. Separate records keep the two
 * from being conflated. Keyed by the catalog's `game` field; `scripts/enrich.ts`
 * fills cover art from IGDB over the top.
 *
 * Release dates and credits are established facts about well-known commercial
 * releases. Nothing here is invented to fill a gap — a game with no record
 * simply has none, and the page renders without it.
 */
export type GameMeta = {
  /** Original commercial release of the version the port is based on. */
  releasedAt: string
  developer: string
  publisher?: string
  genres: string[]
  igdbId?: number
  coverUrl?: string
  summary: { pt: string; en: string }
}

export const GAMES: Record<string, GameMeta> = {
  'ocarina-of-time': {
    releasedAt: '1998-11-21',
    developer: 'Nintendo EAD',
    publisher: 'Nintendo',
    genres: ['Ação', 'Aventura'],
    summary: {
      pt: 'A aventura que estabeleceu a mira automática e o combate com espada em 3D. Link atravessa o tempo entre a infância e a vida adulta para deter Ganondorf.',
      en: 'The adventure that established lock-on targeting and 3D swordplay. Link crosses time between childhood and adulthood to stop Ganondorf.',
    },
  },
  'majoras-mask': {
    releasedAt: '2000-04-27',
    developer: 'Nintendo EAD',
    publisher: 'Nintendo',
    genres: ['Ação', 'Aventura'],
    summary: {
      pt: 'Link tem três dias para impedir que a lua caia sobre Termina, repetindo o ciclo quantas vezes for preciso. As máscaras de transformação são o centro do jogo.',
      en: 'Link has three days to stop the moon falling on Termina, repeating the cycle as often as needed. Transformation masks sit at the centre of the design.',
    },
  },
  'super-mario-64': {
    releasedAt: '1996-06-23',
    developer: 'Nintendo EAD',
    publisher: 'Nintendo',
    genres: ['Plataforma'],
    summary: {
      pt: 'O jogo que definiu como se move uma câmera e um personagem em três dimensões. Mario entra em quadros do castelo de Peach para recuperar as Estrelas de Poder.',
      en: 'The game that defined how a camera and a character move in three dimensions. Mario enters paintings in Peach\'s castle to recover the Power Stars.',
    },
  },
  'sonic-unleashed': {
    releasedAt: '2008-11-18',
    developer: 'Sonic Team',
    publisher: 'Sega',
    genres: ['Plataforma', 'Ação'],
    summary: {
      pt: 'Fases de dia em alta velocidade alternam com fases noturnas de combate corpo a corpo, movidas pelo Hedgehog Engine criado para o jogo.',
      en: 'High-speed daytime stages alternate with night-time brawling, driven by the Hedgehog Engine built for the game.',
    },
  },
  'jak-and-daxter': {
    releasedAt: '2001-12-03',
    developer: 'Naughty Dog',
    publisher: 'Sony Computer Entertainment',
    genres: ['Plataforma', 'Aventura'],
    summary: {
      pt: 'Jak e Daxter percorrem um mundo aberto contínuo, sem telas de carregamento entre as áreas — façanha técnica notável no PlayStation 2.',
      en: 'Jak and Daxter cross one continuous open world with no loading screens between areas — a notable technical feat on the PlayStation 2.',
    },
  },
  'goldeneye-007': {
    releasedAt: '1997-08-25',
    developer: 'Rare',
    publisher: 'Nintendo',
    genres: ['Tiro em primeira pessoa'],
    summary: {
      pt: 'O FPS que definiu o gênero no console, com missões baseadas no filme e um multiplayer em tela dividida que marcou uma geração inteira.',
      en: 'The shooter that defined the genre on console, with film-based missions and a split-screen multiplayer that marked an entire generation.',
    },
  },
  'banjo-tooie': {
    releasedAt: '2000-11-20',
    developer: 'Rare',
    publisher: 'Nintendo',
    genres: ['Plataforma', 'Coletáveis'],
    summary: {
      pt: 'Sequência de Banjo-Kazooie, com mundos maiores e interligados, movimentos novos e a possibilidade de separar a dupla.',
      en: 'The sequel to Banjo-Kazooie, with larger interconnected worlds, new moves and the ability to split the duo.',
    },
  },
  'pokemon-snap': {
    releasedAt: '1999-03-21',
    developer: 'HAL Laboratory',
    publisher: 'Nintendo',
    genres: ['Fotografia', 'Trilho'],
    summary: {
      pt: 'Em vez de capturar, você fotografa. Um trajeto sobre trilhos pela Ilha Pokémon em que a pontuação depende do enquadramento e do momento.',
      en: 'Instead of catching, you photograph. An on-rails route through Pokémon Island where your score depends on framing and timing.',
    },
  },
  'splinter-cell-double-agent': {
    releasedAt: '2006-10-17',
    developer: 'Ubisoft Shanghai',
    publisher: 'Ubisoft',
    genres: ['Furtividade', 'Ação'],
    summary: {
      pt: 'Sam Fisher se infiltra numa organização terrorista e precisa equilibrar a confiança dos dois lados — escolhas que mudam o desfecho.',
      en: 'Sam Fisher infiltrates a terrorist organisation and must balance the trust of both sides — choices that change the ending.',
    },
  },
  'condemned-2': {
    releasedAt: '2008-03-11',
    developer: 'Monolith Productions',
    publisher: 'Sega',
    genres: ['Terror', 'Ação em primeira pessoa'],
    summary: {
      pt: 'Terror em primeira pessoa com combate corpo a corpo pesado e investigação forense, seguindo Ethan Thomas em espiral de alcoolismo.',
      en: 'First-person horror with heavy melee combat and forensic investigation, following Ethan Thomas through a spiral of alcoholism.',
    },
  },
  'deadly-premonition': {
    releasedAt: '2010-02-23',
    developer: 'Access Games',
    publisher: 'Marvelous',
    genres: ['Terror', 'Mundo aberto'],
    summary: {
      pt: 'Investigação de assassinato em uma cidadezinha americana, num mundo aberto com rotina de personagens. Cultuado pelo tom peculiar.',
      en: 'A murder investigation in a small American town, in an open world with scheduled NPC routines. Celebrated for its peculiar tone.',
    },
  },
  ffta: {
    releasedAt: '2003-02-14',
    developer: 'Square',
    publisher: 'Square Enix',
    genres: ['RPG tático'],
    summary: {
      pt: 'Combate tático por turnos em grade isométrica, com sistema de classes e leis que restringem o que cada batalha permite.',
      en: 'Turn-based tactical combat on an isometric grid, with a job system and laws that restrict what each battle allows.',
    },
  },
  'kh-days': {
    releasedAt: '2009-05-30',
    developer: 'h.a.n.d.',
    publisher: 'Square Enix',
    genres: ['RPG de ação'],
    summary: {
      pt: 'Acompanha Roxas durante seus dias na Organização XIII, preenchendo a lacuna entre Kingdom Hearts e Kingdom Hearts II.',
      en: 'Follows Roxas through his days in Organization XIII, filling the gap between Kingdom Hearts and Kingdom Hearts II.',
    },
  },
  'dragons-crown': {
    releasedAt: '2018-02-06',
    developer: 'Vanillaware',
    publisher: 'Atlus',
    genres: ['Beat \'em up', 'RPG de ação'],
    summary: {
      pt: 'Beat \'em up em 2D desenhado à mão, com seis classes jogáveis e progressão de RPG. A versão Pro roda em 4K com trilha regravada.',
      en: 'A hand-painted 2D beat \'em up with six playable classes and RPG progression. The Pro version runs at 4K with a re-recorded score.',
    },
  },
  'god-of-war': {
    releasedAt: '2005-03-22',
    developer: 'Santa Monica Studio',
    publisher: 'Sony Computer Entertainment',
    genres: ['Ação', 'Hack and slash'],
    summary: {
      pt: 'Kratos serve aos deuses do Olimpo para se livrar das próprias memórias. O jogo que fundou a série, com combate em corrente e quebra-cabeças.',
      en: 'Kratos serves the gods of Olympus to be rid of his own memories. The game that founded the series, with chained blades and puzzles.',
    },
  },
  bloodborne: {
    releasedAt: '2015-03-24',
    developer: 'FromSoftware',
    publisher: 'Sony Computer Entertainment',
    genres: ['RPG de ação', 'Soulslike'],
    summary: {
      pt: 'Caçada noturna pela cidade gótica de Yharnam, tomada por uma praga que transforma gente em bestas. O combate troca o escudo pela esquiva.',
      en: 'A night-long hunt through the gothic city of Yharnam, overtaken by a plague that turns people into beasts. Combat trades the shield for dodging.',
    },
  },
  'def-jam-ffny': {
    releasedAt: '2004-09-20',
    developer: 'AKI Corporation',
    publisher: 'EA Games',
    genres: ['Luta'],
    summary: {
      pt: 'Luta com rappers licenciados em arenas onde o cenário faz parte do combate. Cultuado pelo sistema de agarrões herdado dos jogos de wrestling da AKI.',
      en: 'Fighting with licensed rappers in arenas where the environment is part of the fight. Celebrated for the grapple system inherited from AKI\'s wrestling games.',
    },
  },
  'halo-2': {
    releasedAt: '2004-11-09',
    developer: 'Bungie',
    publisher: 'Microsoft Game Studios',
    genres: ['Tiro em primeira pessoa'],
    summary: {
      pt: 'Alterna entre o Master Chief e o Arbiter, e levou o multiplayer online do Xbox ao seu auge com o Xbox Live.',
      en: 'Alternates between the Master Chief and the Arbiter, and took Xbox online multiplayer to its peak on Xbox Live.',
    },
  },
  'ninja-gaiden-black': {
    releasedAt: '2005-09-20',
    developer: 'Team Ninja',
    publisher: 'Tecmo',
    genres: ['Ação', 'Hack and slash'],
    summary: {
      pt: 'Versão definitiva do Ninja Gaiden de 2004, conhecida pela dificuldade e por um dos sistemas de combate mais precisos da sua geração.',
      en: 'The definitive version of the 2004 Ninja Gaiden, known for its difficulty and one of the most precise combat systems of its generation.',
    },
  },
  'ssx-tricky': {
    releasedAt: '2001-11-05',
    developer: 'EA Canada',
    publisher: 'EA Sports BIG',
    genres: ['Esporte', 'Arcade'],
    summary: {
      pt: 'Snowboard arcade com pistas exageradas e manobras Uber. Trilha e locução marcaram a identidade da série.',
      en: 'Arcade snowboarding with exaggerated courses and Uber tricks. Its soundtrack and commentary defined the series\' identity.',
    },
  },
  'the-darkness': {
    releasedAt: '2007-06-25',
    developer: 'Starbreeze Studios',
    publisher: '2K Games',
    genres: ['Tiro em primeira pessoa'],
    summary: {
      pt: 'Baseado na HQ, segue Jackie Estacado e o poder sombrio que o habita, com mecânicas ligadas à luz e à escuridão.',
      en: 'Based on the comic, it follows Jackie Estacado and the dark power inhabiting him, with mechanics tied to light and shadow.',
    },
  },
  'dead-rising-2-case-zero': {
    releasedAt: '2010-08-31',
    developer: 'Capcom Vancouver',
    publisher: 'Capcom',
    genres: ['Ação', 'Sobrevivência'],
    summary: {
      pt: 'Prólogo jogável de Dead Rising 2, ambientado em Still Creek, com armas combinadas e um limite de tempo apertado.',
      en: 'A playable prologue to Dead Rising 2, set in Still Creek, with combo weapons and a tight time limit.',
    },
  },
  'wwe-svr-2011': {
    releasedAt: '2010-10-26',
    developer: 'Yuke\'s',
    publisher: 'THQ',
    genres: ['Luta', 'Esporte'],
    summary: {
      pt: 'Último SmackDown vs. Raw antes da série virar WWE \'12, com modo Road to WrestleMania e criação de lutadores.',
      en: 'The last SmackDown vs. Raw before the series became WWE \'12, with Road to WrestleMania and a creation suite.',
    },
  },
  'spider-man-edge-of-time': {
    releasedAt: '2011-10-04',
    developer: 'Beenox',
    publisher: 'Activision',
    genres: ['Ação', 'Aventura'],
    summary: {
      pt: 'Dois Homens-Aranha em épocas diferentes agem em paralelo, com ações de um alterando o mundo do outro em tempo real.',
      en: 'Two Spider-Men in different eras act in parallel, with one\'s actions altering the other\'s world in real time.',
    },
  },
  'lotr-return-of-the-king': {
    releasedAt: '2003-11-05',
    developer: 'EA Redwood Shores',
    publisher: 'Electronic Arts',
    genres: ['Ação', 'Hack and slash'],
    summary: {
      pt: 'Combate em arena pelas batalhas do terceiro filme, com três caminhos de personagem e cooperativo local.',
      en: 'Arena combat through the third film\'s battles, with three character paths and local co-op.',
    },
  },
  'colin-mcrae-rally-2': {
    releasedAt: '2000-09-29',
    developer: 'Codemasters',
    publisher: 'Codemasters',
    genres: ['Corrida', 'Rali'],
    summary: {
      pt: 'Rali com física exigente e navegação por notas do copiloto, referência do gênero antes da série DiRT.',
      en: 'Rally with demanding physics and co-driver pace notes, a benchmark for the genre before the DiRT series.',
    },
  },
  'red-alert': {
    releasedAt: '1996-10-31',
    developer: 'Westwood Studios',
    publisher: 'Virgin Interactive',
    genres: ['Estratégia em tempo real'],
    summary: {
      pt: 'Estratégia em tempo real numa história alternativa em que Einstein apaga Hitler da linha do tempo e a União Soviética invade a Europa.',
      en: 'Real-time strategy in an alternate history where Einstein erases Hitler from the timeline and the Soviet Union invades Europe.',
    },
  },
  doaxbv: {
    releasedAt: '2003-01-23',
    developer: 'Team Ninja',
    publisher: 'Tecmo',
    genres: ['Esporte'],
    summary: {
      pt: 'Vôlei de praia com o elenco de Dead or Alive, além de minijogos e gestão de itens ao longo de duas semanas de férias.',
      en: 'Beach volleyball with the Dead or Alive cast, plus minigames and item management across a two-week holiday.',
    },
  },
  'celeste-64': {
    releasedAt: '2024-01-30',
    developer: 'Extremely OK Games',
    genres: ['Plataforma'],
    summary: {
      pt: 'Comemoração dos seis anos de Celeste: uma reinterpretação em três dimensões feita em menos de duas semanas pelos próprios criadores.',
      en: 'A sixth-anniversary celebration of Celeste: a three-dimensional reinterpretation built in under two weeks by its original creators.',
    },
  },
  taisei: {
    releasedAt: '2011-01-01',
    developer: 'Taisei Project',
    genres: ['Shoot \'em up', 'Bullet hell'],
    summary: {
      pt: 'Shoot \'em up livre ambientado no universo de Tōhō Project, desenvolvido abertamente desde o início dos anos 2010.',
      en: 'A free and open shoot \'em up set in the Tōhō Project universe, developed in the open since the early 2010s.',
    },
  },
}

export function gameFor(key: string | null): GameMeta | null {
  return key ? (GAMES[key] ?? null) : null
}
