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
  /**
   * A cover verified by hand, which outranks every fetched source.
   *
   * It replaces a bare `coverUrl` that no record ever used. The dimensions
   * are part of it because a cover with none makes the page reserve no space
   * and shift when the image arrives, and the attribution is part of it
   * because an image hotlinked from someone else's CDN deserves the same
   * credit the fetched ones get — the old shape silently dropped it.
   */
  cover?: { url: string; w: number; h: number; source?: string }
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
  'breath-of-the-wild': {
    releasedAt: '2017-03-03',
    developer: 'Nintendo EPD',
    publisher: 'Nintendo',
    genres: ['Ação', 'Aventura', 'Mundo aberto'],
    summary: {
      pt: 'Hyrule aberta desde o primeiro minuto, com física e química consistentes em vez de soluções roteirizadas: o jogo aceita qualquer caminho que as regras permitam.',
      en: 'Hyrule open from the first minute, with consistent physics and chemistry instead of scripted solutions: the game accepts any route its rules allow.',
    },
  },
  'wipeout-omega-collection': {
    releasedAt: '2017-06-06',
    developer: 'Clever Beans',
    publisher: 'Sony Interactive Entertainment',
    genres: ['Corrida', 'Futurista'],
    summary: {
      pt: 'Reúne WipEout HD, Fury e 2048 remasterizados a 1080p e 60 quadros, com suporte a 4K no PS4 Pro.',
      en: 'Collects WipEout HD, Fury and 2048 remastered at 1080p and 60 frames, with 4K support on the PS4 Pro.',
    },
  },
  'cnc-tiberian-dawn': {
    cover: {
      url: 'https://thumbnails.libretro.com/DOS/Named_Boxarts/Command%20and%20Conquer.png',
      w: 512,
      h: 611,
      source: 'libretro-thumbnails',
    },
    releasedAt: '1995-08-31',
    developer: 'Westwood Studios',
    publisher: 'Virgin Interactive',
    genres: ['Estratégia em tempo real'],
    summary: {
      pt: 'O Command & Conquer original, que firmou o gênero com coleta de recursos, construção de base e vídeos em imagem real entre as missões.',
      en: 'The original Command & Conquer, which set the genre with resource harvesting, base building and full-motion video between missions.',
    },
  },
  'cnc-red-alert-2': {
    releasedAt: '2000-10-23',
    developer: 'Westwood Pacific',
    publisher: 'Electronic Arts',
    genres: ['Estratégia em tempo real'],
    summary: {
      pt: 'Aliados contra soviéticos numa guerra alternativa de tom deliberadamente exagerado, com a expansão Yuri\'s Revenge acrescentando uma terceira facção.',
      en: 'Allies against Soviets in a deliberately over-the-top alternate war, with the Yuri\'s Revenge expansion adding a third faction.',
    },
  },
  'yugioh-forbidden-memories': {
    releasedAt: '1999-12-09',
    developer: 'Konami',
    publisher: 'Konami',
    genres: ['Cartas', 'RPG'],
    summary: {
      pt: 'Card game no Egito antigo com regras próprias, diferentes do jogo de mesa — a fusão por tentativa e erro virou parte do folclore do título.',
      en: 'A card game set in ancient Egypt with its own rules, unlike the tabletop game — its trial-and-error fusion system became part of the title\'s folklore.',
    },
  },
  'pokemon-lets-go-eevee': {
    releasedAt: '2018-11-16',
    developer: 'Game Freak',
    publisher: 'Nintendo',
    genres: ['RPG'],
    summary: {
      pt: 'Releitura de Pokémon Yellow com a captura no estilo Pokémon GO, feita para quem estava chegando à série pelo celular.',
      en: 'A retelling of Pokémon Yellow with Pokémon GO-style catching, aimed at players arriving at the series from mobile.',
    },
  },
  'snowboard-kids-2': {
    releasedAt: '1999-07-29',
    developer: 'Racdym',
    publisher: 'Atlus',
    genres: ['Corrida', 'Esporte'],
    summary: {
      pt: 'Corrida de snowboard com itens e pistas de fantasia, mais próxima de Mario Kart que de um jogo de esporte sério.',
      en: 'Item-based snowboard racing on fantasy courses, closer to Mario Kart than to a serious sports game.',
    },
  },
  'conkers-bad-fur-day': {
    releasedAt: '2001-03-05',
    developer: 'Rare',
    publisher: 'Nintendo',
    genres: ['Plataforma', 'Ação'],
    summary: {
      pt: 'Plataforma adulto da Rare, com humor escatológico e paródias de cinema, lançado quando o Nintendo 64 já estava no fim.',
      en: 'Rare\'s adult platformer, with crude humour and film parodies, released as the Nintendo 64 was already ending.',
    },
  },
  'sonic-adventure': {
    releasedAt: '1998-12-23',
    developer: 'Sonic Team',
    publisher: 'Sega',
    genres: ['Plataforma', 'Ação'],
    summary: {
      pt: 'A estreia do Sonic em três dimensões e o carro-chefe do lançamento do Dreamcast, com seis personagens jogáveis e estilos de jogo distintos.',
      en: 'Sonic\'s 3D debut and the Dreamcast\'s flagship launch title, with six playable characters and distinct play styles.',
    },
  },
  'forza-motorsport-4': {
    releasedAt: '2011-10-11',
    developer: 'Turn 10 Studios',
    publisher: 'Microsoft Studios',
    genres: ['Corrida', 'Simulação'],
    summary: {
      pt: 'Simulador de corrida com mais de 500 carros e física revista, considerado o ponto alto da série na geração do Xbox 360.',
      en: 'A racing simulator with over 500 cars and revised physics, widely held as the series\' high point on the Xbox 360.',
    },
  },
  'initial-d-arcade-stage-3': {
    releasedAt: '2004-01-29',
    developer: 'Sega Rosso',
    publisher: 'Sega',
    genres: ['Corrida', 'Arcade'],
    summary: {
      pt: 'Corrida de montanha baseada no mangá Initial D, na placa NAOMI 2, com cartão de memória para guardar o progresso entre máquinas.',
      en: 'Downhill racing based on the Initial D manga, on the NAOMI 2 board, with a memory card carrying progress between cabinets.',
    },
  },
  'virtua-fighter': {
    releasedAt: '1993-12-01',
    developer: 'Sega AM2',
    publisher: 'Sega',
    genres: ['Luta'],
    summary: {
      pt: 'O primeiro jogo de luta em 3D com polígonos, feito por Yu Suzuki na placa Model 1. Trocou golpes especiais por timing e espaçamento.',
      en: 'The first 3D polygonal fighting game, by Yu Suzuki on the Model 1 board. It traded special moves for timing and spacing.',
    },
  },
  'virtua-fighter-2': {
    releasedAt: '1994-11-01',
    developer: 'Sega AM2',
    publisher: 'Sega',
    genres: ['Luta'],
    summary: {
      pt: 'A sequência rodou a 60 quadros por segundo com texturas na Model 2 e virou um dos maiores sucessos de fliperama do Japão.',
      en: 'The sequel ran at 60 frames per second with texture mapping on the Model 2, and became one of Japan\'s biggest arcade successes.',
    },
  },
  'cod-mw2': {
    releasedAt: '2009-11-10',
    developer: 'Infinity Ward',
    publisher: 'Activision',
    genres: ['Tiro em primeira pessoa'],
    summary: {
      pt: 'Campanha militar que levou a série ao auge comercial, com multiplayer de progressão por killstreaks que definiu o gênero por anos.',
      en: 'The military campaign that took the series to its commercial peak, with killstreak progression multiplayer that defined the genre for years.',
    },
  },
  'army-of-two': {
    releasedAt: '2008-03-06',
    developer: 'EA Montreal',
    publisher: 'Electronic Arts',
    genres: ['Tiro em terceira pessoa', 'Cooperativo'],
    summary: {
      pt: 'Tiro em terceira pessoa desenhado em volta da cooperação: dois mercenários dividem atenção inimiga com o sistema de aggro.',
      en: 'A third-person shooter designed around co-operation: two mercenaries split enemy attention through its aggro system.',
    },
  },
  'knuckles-chaotix': {
    releasedAt: '1995-04-21',
    developer: 'Sega',
    publisher: 'Sega',
    genres: ['Plataforma'],
    summary: {
      pt: 'Plataforma do Sega 32X em que dois personagens ficam presos por um anel elástico, e a física dessa ligação é a mecânica central.',
      en: 'A Sega 32X platformer where two characters are tethered by an elastic ring, and the physics of that tether is the core mechanic.',
    },
  },
  'gravity-rush-2': {
    releasedAt: '2017-01-18',
    developer: 'SIE Japan Studio',
    publisher: 'Sony Interactive Entertainment',
    genres: ['Ação', 'Aventura'],
    summary: {
      pt: 'Kat manipula a gravidade para cair em qualquer direção numa cidade suspensa, com estilo de arte em quadrinhos franco-belga.',
      en: 'Kat manipulates gravity to fall in any direction across a floating city, drawn in a French-Belgian comics style.',
    },
  },
  'dead-rising-2-case-west': {
    releasedAt: '2010-12-27',
    developer: 'Capcom Vancouver',
    publisher: 'Capcom',
    genres: ['Ação', 'Sobrevivência'],
    summary: {
      pt: 'Epílogo de Dead Rising 2 em que Chuck Greene e Frank West investigam juntos a instalação da Phenotrans.',
      en: 'The Dead Rising 2 epilogue, in which Chuck Greene and Frank West investigate the Phenotrans facility together.',
    },
  },
  'god-of-war-2': {
    releasedAt: '2007-03-13',
    developer: 'SCE Santa Monica Studio',
    publisher: 'Sony Computer Entertainment',
    genres: ['Ação', 'Hack and slash'],
    summary: {
      pt: 'Kratos desafia Zeus e recorre às Irmãs do Destino. Levou o PlayStation 2 ao limite técnico no fim da vida do console.',
      en: 'Kratos defies Zeus and turns to the Sisters of Fate. It pushed the PlayStation 2 to its technical limit late in the console\'s life.',
    },
  },
  'sonic-advance': {
    releasedAt: '2001-12-20',
    developer: 'Dimps',
    publisher: 'Sega',
    genres: ['Plataforma'],
    summary: {
      pt: 'O retorno do Sonic em duas dimensões no Game Boy Advance, feito pela Dimps com a Sonic Team — o primeiro Sonic num portátil da Nintendo.',
      en: 'Sonic\'s return to two dimensions on the Game Boy Advance, by Dimps with Sonic Team — the first Sonic on a Nintendo handheld.',
    },
  },
  'halo-ce': {
    releasedAt: '2001-11-15',
    developer: 'Bungie',
    publisher: 'Microsoft Game Studios',
    genres: ['Tiro em primeira pessoa'],
    summary: {
      pt: 'O jogo de lançamento do Xbox que estabeleceu o esquema de dois botões para tiro em console, com escudo recarregável e veículos.',
      en: 'The Xbox launch title that established the two-stick console shooter, with regenerating shields and vehicles.',
    },
  },
  pikmin: {
    releasedAt: '2001-10-26',
    developer: 'Nintendo EAD',
    publisher: 'Nintendo',
    genres: ['Estratégia em tempo real', 'Quebra-cabeça'],
    summary: {
      pt: 'O capitão Olimar cai num planeta hostil e comanda criaturas-planta para recuperar as peças da nave. Cada dia dura trinta minutos e os Pikmin deixados para trás morrem à noite.',
      en: 'Captain Olimar crashes on a hostile planet and commands plant creatures to recover his ship\'s parts. Each day lasts thirty minutes, and Pikmin left behind die at nightfall.',
    },
  },
  'pikmin-2': {
    releasedAt: '2004-04-29',
    developer: 'Nintendo EAD',
    publisher: 'Nintendo',
    genres: ['Estratégia em tempo real', 'Quebra-cabeça'],
    summary: {
      pt: 'Tira o limite de dias do primeiro e acrescenta cavernas geradas com regras próprias, dois capitães controláveis e duas espécies novas de Pikmin.',
      en: 'Drops the first game\'s day limit and adds rule-generated caves, two controllable captains and two new Pikmin species.',
    },
  },
  'resident-evil-4': {
    releasedAt: '2005-01-11',
    developer: 'Capcom Production Studio 4',
    publisher: 'Capcom',
    genres: ['Terror', 'Ação em terceira pessoa'],
    summary: {
      pt: 'Leon Kennedy resgata a filha do presidente numa aldeia espanhola. A câmera por cima do ombro redefiniu o jogo de ação em terceira pessoa por mais de uma década.',
      en: 'Leon Kennedy rescues the president\'s daughter in a Spanish village. Its over-the-shoulder camera redefined third-person action for over a decade.',
    },
  },
  'smash-ultimate': {
    releasedAt: '2018-12-07',
    developer: 'Bandai Namco Studios',
    publisher: 'Nintendo',
    genres: ['Luta', 'Plataforma'],
    summary: {
      pt: 'Reúne todos os lutadores que já apareceram na série, com modo aventura próprio e dezenas de cenários.',
      en: 'Brings together every fighter the series has ever featured, with its own adventure mode and dozens of stages.',
    },
  },
  'driver-2': {
    releasedAt: '2000-11-13',
    developer: 'Reflections Interactive',
    publisher: 'Infogrames',
    genres: ['Corrida', 'Ação', 'Mundo aberto'],
    summary: {
      pt: 'Sequência de Driver que acrescentou sair do carro a pé, em quatro cidades abertas com perseguições de polícia inspiradas no cinema policial dos anos 70.',
      en: 'The Driver sequel that added stepping out of the car on foot, across four open cities with police chases drawn from 1970s crime cinema.',
    },
  },
  'castlevania-sotn': {
    releasedAt: '1997-03-20',
    developer: 'Konami',
    publisher: 'Konami',
    genres: ['Metroidvania', 'RPG de ação'],
    summary: {
      pt: 'Alucard explora o castelo de Drácula num mapa interligado que se abre conforme você ganha habilidades. É metade do nome do gênero "metroidvania".',
      en: 'Alucard explores Dracula\'s castle across one interconnected map that opens up as you gain abilities. It is half the name of the metroidvania genre.',
    },
  },
  wipeout: {
    releasedAt: '1995-09-29',
    developer: 'Psygnosis',
    publisher: 'Sony Computer Entertainment',
    genres: ['Corrida', 'Futurista'],
    summary: {
      pt: 'Corrida antigravidade em alta velocidade que ajudou a definir a identidade do primeiro PlayStation, com trilha de música eletrônica e direção de arte do estúdio The Designers Republic.',
      en: 'High-speed antigravity racing that helped define the first PlayStation\'s identity, with an electronic soundtrack and art direction by The Designers Republic.',
    },
  },
  'forza-horizon': {
    releasedAt: '2012-10-23',
    developer: 'Playground Games',
    publisher: 'Microsoft Studios',
    genres: ['Corrida', 'Mundo aberto'],
    summary: {
      pt: 'O primeiro Horizon tirou a série Forza da pista fechada e a colocou num Colorado aberto, em volta de um festival de música e carros.',
      en: 'The first Horizon took the Forza series off the closed circuit and into an open Colorado, built around a music and car festival.',
    },
  },
  'silent-hill': {
    releasedAt: '1999-01-31',
    developer: 'Team Silent',
    publisher: 'Konami',
    genres: ['Terror', 'Survival horror'],
    summary: {
      pt: 'Harry Mason procura a filha desaparecida numa cidade tomada por névoa. O nevoeiro nasceu de uma limitação técnica do PlayStation e virou a assinatura da série.',
      en: 'Harry Mason searches for his missing daughter in a town swallowed by fog. The fog began as a PlayStation hardware limitation and became the series\' signature.',
    },
  },
  'infamous-second-son': {
    releasedAt: '2014-03-21',
    developer: 'Sucker Punch Productions',
    publisher: 'Sony Computer Entertainment',
    genres: ['Ação', 'Mundo aberto'],
    summary: {
      pt: 'Delsin Rowe absorve poderes de outros condutores numa Seattle aberta, com escolhas morais que mudam habilidades e final.',
      en: 'Delsin Rowe absorbs powers from other conduits across an open Seattle, with moral choices that change both abilities and ending.',
    },
  },
  black: {
    releasedAt: '2006-02-24',
    developer: 'Criterion Games',
    publisher: 'Electronic Arts',
    genres: ['Tiro em primeira pessoa'],
    summary: {
      pt: 'Tiro em primeira pessoa focado em destruição de cenário e no peso das armas, feito pelos criadores de Burnout no motor RenderWare.',
      en: 'A first-person shooter built around environmental destruction and the weight of its guns, made by the Burnout team on the RenderWare engine.',
    },
  },
  'metroid-prime': {
    releasedAt: '2002-11-17',
    developer: 'Retro Studios',
    publisher: 'Nintendo',
    genres: ['Aventura em primeira pessoa', 'Metroidvania'],
    summary: {
      pt: 'Levou Metroid para a primeira pessoa sem virar um jogo de tiro: exploração, varredura de ambiente e isolamento continuam no centro.',
      en: 'Took Metroid into first person without becoming a shooter: exploration, scanning and isolation remain at the centre.',
    },
  },
  'oddworld-abes-exoddus': {
    releasedAt: '1998-11-17',
    developer: 'Oddworld Inhabitants',
    publisher: 'GT Interactive',
    genres: ['Plataforma', 'Quebra-cabeça'],
    summary: {
      pt: 'Plataforma com quebra-cabeças em que você fala com outros Mudokons para guiá-los à segurança, em vez de lutar.',
      en: 'A puzzle platformer where you speak to fellow Mudokons to guide them to safety rather than fighting.',
    },
  },
  ico: {
    releasedAt: '2001-09-24',
    developer: 'Team Ico',
    publisher: 'Sony Computer Entertainment',
    genres: ['Aventura', 'Quebra-cabeça'],
    summary: {
      pt: 'Um menino guia uma garota pela mão através de um castelo vazio. Quase sem diálogo e sem interface, foi referência para o design minimalista que veio depois.',
      en: 'A boy leads a girl by the hand through an empty castle. Almost wordless and interface-free, it set a reference for the minimal design that followed.',
    },
  },
  'the-last-guardian': {
    releasedAt: '2016-12-06',
    developer: 'genDESIGN',
    publisher: 'Sony Interactive Entertainment',
    genres: ['Aventura', 'Quebra-cabeça'],
    summary: {
      pt: 'Um garoto e a criatura Trico resolvem quebra-cabeças juntos. O jogo aposta na teimosia do animal: ele hesita, se distrai e precisa ser convencido.',
      en: 'A boy and the creature Trico solve puzzles together. The design leans on the animal\'s stubbornness: it hesitates, gets distracted and must be coaxed.',
    },
  },
  'mystical-ninja-goemon': {
    releasedAt: '1997-08-07',
    developer: 'Konami',
    publisher: 'Konami',
    genres: ['Ação', 'Aventura'],
    summary: {
      pt: 'Aventura 3D de humor japonês com cidades exploráveis, masmorras e combates em robô gigante.',
      en: 'A comedic 3D Japanese adventure with explorable towns, dungeons and giant-robot battles.',
    },
  },
  'silent-hill-downpour': {
    releasedAt: '2012-03-13',
    developer: 'Vatra Games',
    publisher: 'Konami',
    genres: ['Terror', 'Survival horror'],
    summary: {
      pt: 'Um presidiário sobrevivente de acidente explora Silent Hill num mapa mais aberto que o dos jogos anteriores, com missões paralelas.',
      en: 'A convict who survives a crash explores Silent Hill across a more open map than earlier entries, with side quests.',
    },
  },
  'fifa-street': {
    releasedAt: '2012-03-13',
    developer: 'EA Canada',
    publisher: 'EA Sports',
    genres: ['Esporte', 'Futebol'],
    summary: {
      pt: 'Reinício da série de futebol de rua, trocando o exagero arcade dos primeiros por controle de drible mais próximo do FIFA principal.',
      en: 'A reboot of the street football series, trading the earlier games\' arcade excess for dribbling closer to mainline FIFA.',
    },
  },
  'nfs-most-wanted': {
    releasedAt: '2005-11-15',
    developer: 'EA Black Box',
    publisher: 'Electronic Arts',
    genres: ['Corrida', 'Mundo aberto'],
    summary: {
      pt: 'Perseguições policiais em mundo aberto com a Blacklist de quinze rivais. O filtro sépia e o Speedbreaker marcaram a identidade visual da série.',
      en: 'Open-world police pursuits built around a Blacklist of fifteen rivals. Its sepia filter and Speedbreaker defined the series\' look.',
    },
  },
  driveclub: {
    releasedAt: '2014-10-07',
    developer: 'Evolution Studios',
    publisher: 'Sony Computer Entertainment',
    genres: ['Corrida'],
    summary: {
      pt: 'Corrida de clubes com meteorologia dinâmica que virou referência técnica do PS4, especialmente a chuva. Os servidores foram desligados em 2020.',
      en: 'Club-based racing whose dynamic weather became a PS4 technical showcase, the rain especially. Its servers were shut down in 2020.',
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
  'paper-mario': {
    releasedAt: '2000-08-11',
    developer: 'Intelligent Systems',
    publisher: 'Nintendo',
    genres: ['RPG'],
    summary: {
      pt: 'RPG de turnos em que os personagens são recortes de papel sobre cenários tridimensionais. Os ataques pedem que o jogador acerte o tempo do botão, e cada parceiro resolve um tipo de obstáculo no mapa.',
      en: 'A turn-based RPG whose characters are paper cut-outs standing in three-dimensional scenery. Attacks ask the player to time a button press, and each partner solves one kind of obstacle on the map.',
    },
  },
  'crash-team-racing': {
    releasedAt: '1999-09-30',
    developer: 'Naughty Dog',
    publisher: 'Sony Computer Entertainment',
    genres: ['Corrida'],
    summary: {
      pt: 'Kart com um sistema de saltos que recompensa quem encadeia três turbos no tempo exato, mantendo a velocidade acumulada entre curvas. Tem modo aventura com chefes e troféus.',
      en: 'A kart racer built on a hop system that rewards chaining three boosts on the exact beat, carrying accumulated speed between corners. It includes an adventure mode with bosses and trophies.',
    },
  },
  'minecraft-lce': {
    releasedAt: '2012-05-09',
    developer: '4J Studios',
    publisher: 'Microsoft Studios',
    genres: ['Sandbox', 'Sobrevivência'],
    summary: {
      pt: 'A versão de console do Minecraft, com mundos de tamanho fixo, tela dividida local e interface pensada para controle. Recebeu pacotes de textura e mundos temáticos que a versão de PC nunca teve.',
      en: 'The console edition of Minecraft, with fixed-size worlds, local split-screen and an interface designed for a controller. It received texture packs and themed worlds the PC version never had.',
    },
  },
  'pokemon-ruby': {
    releasedAt: '2002-11-21',
    developer: 'Game Freak',
    publisher: 'Nintendo',
    genres: ['RPG'],
    summary: {
      pt: 'A terceira geração, ambientada em Hoenn. Introduziu batalhas duplas, habilidades passivas e os bônus de natureza que passaram a definir o jogo competitivo.',
      en: 'The third generation, set in Hoenn. It introduced double battles, passive abilities and the nature bonuses that went on to define competitive play.',
    },
  },
  'pokemon-firered': {
    releasedAt: '2004-01-29',
    developer: 'Game Freak',
    publisher: 'Nintendo',
    genres: ['RPG'],
    summary: {
      pt: 'Refazimento da primeira geração sobre o motor de Hoenn, o que trouxe habilidades e batalhas duplas para Kanto. Acrescentou as Ilhas Sete como área pós-jogo.',
      en: 'A remake of the first generation on the Hoenn engine, which brought abilities and double battles to Kanto. It added the Sevii Islands as a post-game area.',
    },
  },
  'pokemon-emerald': {
    releasedAt: '2004-09-16',
    developer: 'Game Freak',
    publisher: 'Nintendo',
    genres: ['RPG'],
    summary: {
      pt: 'A versão ampliada de Hoenn, com as duas equipes vilãs na mesma história e a Frente de Batalha — o conjunto de desafios mais duro que a série tinha produzido até então.',
      en: 'The expanded take on Hoenn, with both villainous teams in one story and the Battle Frontier, the hardest set of challenges the series had produced to that point.',
    },
  },
  'pokemon-diamond': {
    releasedAt: '2006-09-28',
    developer: 'Game Freak',
    publisher: 'Nintendo',
    genres: ['RPG'],
    summary: {
      pt: 'A quarta geração, em Sinnoh. Separou o cálculo de ataque físico e especial por golpe em vez de por tipo, mudança que reorganizou toda a estratégia da série.',
      en: 'The fourth generation, in Sinnoh. It split the physical and special attack calculation per move rather than per type, a change that reorganised the whole series strategy.',
    },
  },
  'pokemon-platinum': {
    releasedAt: '2008-09-13',
    developer: 'Game Freak',
    publisher: 'Nintendo',
    genres: ['RPG'],
    summary: {
      pt: 'A revisão de Sinnoh, com o Mundo Distorcido, ritmo mais rápido e a Área de Batalha no pós-jogo. É a versão que a comunidade trata como definitiva da geração.',
      en: 'The revision of Sinnoh, with the Distortion World, a faster pace and the Battle Area in the post-game. It is the version the community treats as the generation definitive one.',
    },
  },
  'pokemon-heartgold': {
    releasedAt: '2009-09-12',
    developer: 'Game Freak',
    publisher: 'Nintendo',
    genres: ['RPG'],
    summary: {
      pt: 'Refazimento da segunda geração, com Johto e Kanto no mesmo jogo. O primeiro Pokémon da equipe anda atrás do jogador, e o Pokéwalker conta passos no mundo real.',
      en: 'A remake of the second generation, with Johto and Kanto in one game. The lead team member walks behind the player, and the Pokéwalker counts real-world steps.',
    },
  },
  'eternal-darkness': {
    releasedAt: '2002-06-24',
    developer: 'Silicon Knights',
    publisher: 'Nintendo',
    genres: ['Terror', 'Ação', 'Aventura'],
    summary: {
      pt: 'Terror atravessando dois milênios, com doze personagens jogáveis em épocas diferentes. A barra de sanidade faz o próprio jogo mentir para o jogador quando ela cai.',
      en: 'Horror spanning two millennia, with twelve playable characters in different eras. The sanity meter makes the game itself lie to the player as it drains.',
    },
  },
  killzone: {
    releasedAt: '2004-11-02',
    developer: 'Guerrilla Games',
    publisher: 'Sony Computer Entertainment',
    genres: ['Tiro em primeira pessoa'],
    summary: {
      pt: 'Tiro em primeira pessoa de peso deliberado, com armas que recuam e personagens que demoram a virar. Quatro soldados jogáveis encaram a invasão Helghast.',
      en: 'A deliberately heavy first-person shooter, with weapons that kick and characters slow to turn. Four playable soldiers face the Helghast invasion.',
    },
  },
  'sonic-free-riders': {
    releasedAt: '2010-11-04',
    developer: 'Sonic Team',
    publisher: 'Sega',
    genres: ['Corrida'],
    summary: {
      pt: 'Terceiro jogo da série de pranchas aéreas, feito para controle por movimento sem acessório. Cada tipo de personagem — velocidade, força ou voo — usa atalhos diferentes na mesma pista.',
      en: 'The third game in the hoverboard series, built for controller-free motion input. Each character type — speed, power or flight — takes different shortcuts on the same track.',
    },
  },
  'skate-2': {
    releasedAt: '2009-01-21',
    developer: 'EA Black Box',
    publisher: 'Electronic Arts',
    genres: ['Esporte'],
    summary: {
      pt: 'Skate controlado pelos dois analógicos, em que o movimento do polegar imita o do pé na prancha. A sequência acrescentou descer da prancha e mover obstáculos pelo cenário.',
      en: 'Skateboarding controlled with both sticks, where the thumb motion mirrors the foot on the board. The sequel added stepping off the board and moving obstacles around the city.',
    },
  },
  doa3: {
    releasedAt: '2001-11-15',
    developer: 'Team Ninja',
    publisher: 'Tecmo',
    genres: ['Luta'],
    summary: {
      pt: 'Luta construída sobre o triângulo entre golpe, agarrão e contra-ataque, com cenários de vários níveis em que a queda continua o combo. Foi jogo de lançamento do primeiro Xbox.',
      en: 'A fighting game built on the triangle of strike, throw and hold, with multi-level stages where a fall continues the combo. It was a launch title for the first Xbox.',
    },
  },
  'tekken-3': {
    cover: {
      url: 'https://thumbnails.libretro.com/Sony%20-%20PlayStation/Named_Boxarts/Tekken%203%20(USA).png',
      w: 512,
      h: 499,
      source: 'libretro-thumbnails',
    },
    releasedAt: '1998-03-26',
    developer: 'Namco',
    publisher: 'Namco',
    genres: ['Luta'],
    summary: {
      pt: 'A conversão doméstica que acertou o desvio lateral e tornou o palco tridimensional de verdade. Trouxe os modos Tekken Force e Tekken Ball, exclusivos do console.',
      en: 'The home conversion that got sidestepping right and made the stage genuinely three-dimensional. It added the console-only Tekken Force and Tekken Ball modes.',
    },
  },
  'asuras-wrath': {
    releasedAt: '2012-02-21',
    developer: 'CyberConnect2',
    publisher: 'Capcom',
    genres: ['Ação'],
    summary: {
      pt: 'Ação dividida em episódios com vinhetas de abertura e encerramento, como uma série de televisão. Alterna luta corpo a corpo, tiro e sequências de botão em escala absurda.',
      en: 'Action split into episodes with opening and closing credits, like a television series. It alternates melee, shooting and button sequences at absurd scale.',
    },
  },
  'geometry-wars-2': {
    releasedAt: '2008-07-30',
    developer: 'Bizarre Creations',
    publisher: 'Activision',
    genres: ['Tiro', 'Arcade'],
    summary: {
      pt: 'Tiro de arena com dois analógicos e seis modos de regras distintas, cada um com sua própria tabela de pontuação entre amigos. Visual vetorial sobre grade elástica.',
      en: 'A twin-stick arena shooter with six modes of distinct rules, each with its own scoreboard among friends. Vector visuals over an elastic grid.',
    },
  },
  'armored-core-fa': {
    releasedAt: '2008-03-19',
    developer: 'FromSoftware',
    publisher: 'FromSoftware',
    genres: ['Ação', 'Simulação'],
    summary: {
      pt: 'Combate de robôs montados peça por peça, em que peso, geração de energia e refrigeração decidem a luta antes do primeiro tiro. Os NEXT voam rápido e superaquecem.',
      en: 'Mech combat with machines assembled part by part, where weight, energy generation and cooling decide the fight before the first shot. The NEXT units fly fast and overheat.',
    },
  },
  'gears-of-war-2': {
    releasedAt: '2008-11-07',
    developer: 'Epic Games',
    publisher: 'Microsoft Game Studios',
    genres: ['Tiro em terceira pessoa'],
    summary: {
      pt: 'Tiro em terceira pessoa com cobertura, recarga ativa por tempo e campanha cooperativa para dois. A sequência acrescentou o modo Horda, que virou referência do gênero.',
      en: 'A third-person cover shooter with timed active reload and a two-player co-op campaign. The sequel added Horde mode, which became a genre reference point.',
    },
  },
  'star-wars-rots': {
    releasedAt: '2005-05-05',
    developer: 'The Collective',
    publisher: 'LucasArts',
    genres: ['Ação'],
    summary: {
      pt: 'Ação de sabre de luz com combos aprendidos ao longo da campanha, cobrindo a história do terceiro filme. Tem modo de duelo para dois jogadores na mesma tela.',
      en: 'Lightsaber action with combos learned across the campaign, covering the third film story. It includes a two-player duel mode on one screen.',
    },
  },
  'dbz-burst-limit': {
    releasedAt: '2008-06-05',
    developer: 'Dimps',
    publisher: 'Bandai Namco Games',
    genres: ['Luta'],
    summary: {
      pt: 'Luta em plano bidimensional com cenários tridimensionais, construída em torno de um medidor que libera explosões de aura e defesas em momento exato. Cobre as sagas Saiyajin, Freeza e Cell.',
      en: 'Fighting on a two-dimensional plane with three-dimensional stages, built around a gauge that unlocks aura bursts and precisely timed guards. It covers the Saiyan, Frieza and Cell arcs.',
    },
  },
  'bloody-roar-2': {
    releasedAt: '1999-04-29',
    developer: 'Eighting',
    publisher: 'Hudson Soft',
    genres: ['Luta'],
    summary: {
      pt: 'Luta em que cada personagem se transforma em um animal ao encher o medidor de besta, trocando alcance e dano por velocidade. A transformação também serve para escapar de combo.',
      en: 'A fighting game where each character turns into an animal on filling the beast gauge, trading reach and damage for speed. The change is also a way out of a combo.',
    },
  },
  'tony-hawk-project-8': {
    releasedAt: '2006-11-07',
    developer: 'Neversoft',
    publisher: 'Activision',
    genres: ['Esporte'],
    summary: {
      pt: 'Skate com o modo Nail the Trick, que entra em câmera lenta e passa o controle dos pés para os dois analógicos. Cidade única e contínua, sem telas de carregamento entre áreas.',
      en: 'Skateboarding with Nail the Trick, which drops into slow motion and hands control of the feet to both sticks. A single continuous city, with no loading screens between areas.',
    },
  },
  'wwe-all-stars': {
    releasedAt: '2011-03-29',
    developer: 'THQ San Diego',
    publisher: 'THQ',
    genres: ['Luta', 'Esporte'],
    summary: {
      pt: 'Luta livre deliberadamente exagerada, com saltos de vários metros e combos aéreos, colocando lutadores clássicos contra os da época. Nada de simulação: é jogo de arcade.',
      en: 'Deliberately exaggerated wrestling, with leaps of several metres and aerial combos, setting classic wrestlers against contemporary ones. No simulation here: it is an arcade game.',
    },
  },
  'monster-hunter-portable-3rd': {
    releasedAt: '2010-12-01',
    developer: 'Capcom',
    publisher: 'Capcom',
    genres: ['Ação', 'RPG'],
    summary: {
      pt: 'A entrada de PSP que vendeu dois milhões de cópias na primeira semana no Japão e nunca saiu de lá. Caça a monstros em partidas longas, com aldeia própria, companheiros Felyne e foco em cooperativo local.',
      en: 'The PSP entry that shipped two million copies in its first week in Japan and never left the country. Long monster hunts, its own village, Felyne companions and a focus on local co-op.',
    },
  },
  'naruto-storm-generations': {
    releasedAt: '2012-02-23',
    developer: 'CyberConnect2',
    publisher: 'Bandai Namco Games',
    genres: ['Luta'],
    summary: {
      pt: 'Luta em arena tridimensional com o maior elenco da série até então, dividido entre as eras do Naruto e do Shippuden. Combate de um botão com substituição e apoio de companheiros.',
      en: 'Three-dimensional arena fighting with the largest roster in the series to that point, split between the Naruto and Shippuden eras. One-button combat with substitution and support characters.',
    },
  },
  'hard-corps-uprising': {
    releasedAt: '2011-02-16',
    developer: 'Arc System Works',
    publisher: 'Konami',
    genres: ['Ação', 'Plataforma'],
    summary: {
      pt: 'Spin-off de Contra feito pelo estúdio de Guilty Gear, com arte desenhada à mão e um sistema de avanço que deixa o jogador comprar vidas e habilidades entre as fases. Corre e atira para a direita, difícil como manda a série.',
      en: 'A Contra spin-off from the Guilty Gear studio, with hand-drawn art and a progression system that lets the player buy lives and abilities between stages. Run and gun to the right, as hard as the series demands.',
    },
  },
}

export function gameFor(key: string | null): GameMeta | null {
  return key ? (GAMES[key] ?? null) : null
}
