/**
 * Hand-written install guides, by repository.
 *
 * The generated steps in `content.ts` are composed from facts and are correct
 * but generic: download, extract, point it at your copy. For the entries that
 * carry the traffic that is not enough — the thing people actually get stuck on
 * is *which* copy. Ship of Harkinian wants a specific Ocarina of Time revision;
 * Sonic Unleashed needs Title Update 2 beside the game; OpenGOAL spends several
 * minutes decompiling before it will start. Nobody says so in Portuguese.
 *
 * These are the project's own documented requirements, restated plainly. Where
 * a project's exact wording or menu label could have changed, the step sends
 * the reader to the README rather than inventing a label — a wrong instruction
 * is worse than a missing one.
 *
 * No game file is linked, named as a download, or sourced here. The reader
 * supplies their own copy, which is what every one of these projects requires.
 */
export type Guide = { pt: string[]; en: string[] }

export const GUIDES: Record<string, Guide> = {
  'HarbourMasters/Shipwright': {
    pt: [
      'Você precisa da sua própria ROM de Ocarina of Time. Serve a versão americana ou europeia 1.0, 1.1 ou 1.2 — e a ROM de debug, se você tiver, libera recursos extras no port.',
      'A ROM precisa estar descompactada: arquivo .z64 cru. Se a sua estiver em .zip ou .7z, extraia antes.',
      'Baixe a release do Ship of Harkinian para o seu sistema e extraia numa pasta vazia, fora de Arquivos de Programas — a pasta precisa de permissão de escrita.',
      'Coloque a ROM na mesma pasta do executável e abra o programa. Na primeira execução ele lê a ROM e gera o arquivo de dados oot.otr, o que leva alguns minutos.',
      'Se ele reclamar que a ROM não é reconhecida, quase sempre é versão errada ou arquivo ainda compactado. Confira o checksum contra a lista no README do projeto.',
      'Depois do oot.otr gerado, a ROM não é mais necessária para jogar. Guarde-a mesmo assim: atualizações do port às vezes pedem para regerar os dados.',
      'Nas opções, ajuste resolução, taxa de quadros e proporção de tela. Widescreen e 60 quadros já vêm suportados e não exigem mod.',
    ],
    en: [
      'You need your own Ocarina of Time ROM. The US or EU 1.0, 1.1 or 1.2 release works — and the debug ROM, if you have it, unlocks extra features in the port.',
      'The ROM must be uncompressed: a raw .z64 file. If yours is in a .zip or .7z, extract it first.',
      'Download the Ship of Harkinian release for your platform and extract it into an empty folder outside Program Files — the folder needs write permission.',
      'Put the ROM in the same folder as the executable and run it. On first launch it reads the ROM and generates the oot.otr data file, which takes a few minutes.',
      'If it reports the ROM is unrecognised, it is almost always the wrong revision or a still-compressed file. Check its checksum against the list in the project README.',
      'Once oot.otr exists the ROM is no longer needed to play. Keep it anyway: port updates occasionally ask you to regenerate the data.',
      'In the options, set resolution, frame rate and aspect ratio. Widescreen and 60 FPS are supported out of the box and need no mod.',
    ],
  },

  '2ship2harkinian/2ship2harkinian': {
    pt: [
      'Você precisa da sua própria ROM de Majora\'s Mask, versão americana 1.0. Outras revisões não são aceitas pelo extrator.',
      'A ROM precisa estar descompactada, em .z64 cru.',
      'Baixe a release do 2 Ship 2 Harkinian e extraia numa pasta vazia com permissão de escrita.',
      'Coloque a ROM junto do executável e abra o programa. Ele gera o arquivo de dados na primeira execução — pode demorar alguns minutos.',
      'Se a ROM for recusada, confira a região e a revisão: o erro mais comum é usar a versão europeia ou japonesa.',
      'Configure resolução, widescreen e controle nas opções antes de começar.',
    ],
    en: [
      "You need your own Majora's Mask ROM, US version 1.0. The extractor does not accept other revisions.",
      'The ROM must be uncompressed, a raw .z64 file.',
      'Download the 2 Ship 2 Harkinian release and extract it into an empty folder with write permission.',
      'Put the ROM beside the executable and run it. It generates the data file on first launch, which can take a few minutes.',
      'If the ROM is rejected, check region and revision: using the EU or JP release is the most common mistake.',
      'Set resolution, widescreen and input in the options before you start.',
    ],
  },

  'hedge-dev/UnleashedRecomp': {
    pt: [
      'Você precisa da sua própria cópia de Sonic Unleashed do Xbox 360 — e, além dela, do Title Update 2 do jogo. Sem o update o port não inicia.',
      'Os arquivos precisam estar extraídos em pasta, não em imagem de disco.',
      'Baixe a release e execute o instalador guiado que vem junto.',
      'Quando ele pedir, aponte para a pasta do jogo. Depois ele pede o arquivo do Title Update separadamente — é esse o passo em que a maioria trava.',
      'O instalador converte os dados para o formato do port. É demorado e usa bastante disco; deixe espaço livre equivalente ao tamanho do jogo.',
      'Na primeira execução escolha o renderizador e a resolução. O port aceita resolução livre e quadros destravados, o que o original de console não tinha.',
    ],
    en: [
      'You need your own Xbox 360 copy of Sonic Unleashed — and, beyond it, the game\'s Title Update 2. The port will not start without the update.',
      'The files must be extracted into a folder, not left as a disc image.',
      'Download the release and run the guided installer that ships with it.',
      'Point it at the game folder when asked. It then asks for the Title Update file separately — this is the step most people get stuck on.',
      'The installer converts the data into the port\'s own format. It takes a while and uses real disk space; leave room equal to the game\'s size.',
      'On first launch pick the renderer and resolution. The port accepts arbitrary resolution and uncapped frame rate, which the console original never had.',
    ],
  },

  'open-goal/jak-project': {
    pt: [
      'Você precisa da sua própria cópia de Jak and Daxter em PlayStation 2. O launcher aceita a imagem do disco.',
      'Baixe o launcher oficial do OpenGOAL e instale normalmente.',
      'No launcher, escolha o jogo da trilogia e aponte para a sua imagem de disco.',
      'O launcher roda uma etapa de descompilação antes de o jogo abrir pela primeira vez. Ela leva vários minutos e consome bastante processador — é normal, e só acontece uma vez por jogo.',
      'Se a descompilação falhar, costuma ser imagem de disco de região não suportada. O launcher informa qual versão ele reconheceu.',
      'Depois de pronto, configure resolução, campo de visão e controle pelo próprio launcher.',
    ],
    en: [
      'You need your own PlayStation 2 copy of Jak and Daxter. The launcher accepts the disc image.',
      'Download the official OpenGOAL launcher and install it normally.',
      'In the launcher, pick the game from the trilogy and point it at your disc image.',
      'The launcher runs a decompilation step before the game opens for the first time. It takes several minutes and works the CPU hard — this is normal, and happens once per game.',
      'If decompilation fails it is usually an unsupported region. The launcher reports which version it recognised.',
      'Once it is done, set resolution, field of view and input from the launcher itself.',
    ],
  },

  'HarbourMasters/Ghostship': {
    pt: [
      'Você precisa da sua própria ROM de Super Mario 64, versão americana, descompactada em .z64.',
      'Baixe a release do Ghostship e extraia numa pasta vazia com permissão de escrita.',
      'Coloque a ROM junto do executável e abra o programa para ele extrair os dados do jogo.',
      'Escolha o renderizador na primeira execução: DirectX 11, OpenGL ou Vulkan. Em placa antiga, OpenGL costuma ser o mais estável.',
      'Ajuste resolução e controle nas opções. O port aceita tela cheia e proporções modernas.',
    ],
    en: [
      'You need your own Super Mario 64 ROM, US version, uncompressed as .z64.',
      'Download the Ghostship release and extract it into an empty folder with write permission.',
      'Put the ROM beside the executable and run it so it can extract the game data.',
      'Pick a renderer on first launch: DirectX 11, OpenGL or Vulkan. On older cards OpenGL is usually the most stable.',
      'Set resolution and input in the options. The port supports fullscreen and modern aspect ratios.',
    ],
  },

  'Odrannnn/MetroidPrimePort': {
    pt: [
      'Você precisa da sua própria cópia de Metroid Prime em GameCube, como imagem de disco.',
      'Confira a região: o port é construído sobre uma decompilação de uma versão específica, e a tela inicial do programa informa qual ele espera.',
      'Baixe a release para o seu sistema e extraia numa pasta vazia.',
      'Aponte o programa para a sua imagem de disco. Ele extrai os dados do jogo, o que leva alguns minutos.',
      'Configure resolução e controle antes de jogar. O port aceita mira por mouse, que o original de console não tinha.',
    ],
    en: [
      'You need your own GameCube copy of Metroid Prime, as a disc image.',
      'Check the region: the port is built on a decompilation of one specific revision, and its first screen states which one it expects.',
      'Download the release for your platform and extract it into an empty folder.',
      'Point the program at your disc image. It extracts the game data, which takes a few minutes.',
      'Set resolution and input before playing. The port supports mouse aiming, which the console original never had.',
    ],
  },

  'shadps4-emu/shadPS4': {
    pt: [
      'Você precisa dos seus próprios dumps de jogos de PS4. O shadPS4 não distribui nada do jogo.',
      'Confira se a sua placa de vídeo suporta Vulkan e atualize o driver — é o requisito que mais causa falha de abertura.',
      'Baixe a release para o seu sistema e extraia numa pasta vazia.',
      'Abra o programa e indique a pasta onde ficam os seus jogos. Ele lista o que reconhecer.',
      'O shadPS4 é um emulador em desenvolvimento: compatibilidade varia por jogo e por versão. Antes de concluir que algo está quebrado, confira a lista de compatibilidade do projeto.',
      'Se o desempenho estiver ruim, reduza a resolução interna antes de mexer em qualquer outra opção.',
    ],
    en: [
      'You need your own PS4 game dumps. shadPS4 distributes nothing from any game.',
      'Check that your GPU supports Vulkan and update the driver — it is the requirement that most often prevents startup.',
      'Download the release for your platform and extract it into an empty folder.',
      'Open the program and point it at the folder holding your games. It lists whatever it recognises.',
      'shadPS4 is an emulator under development: compatibility varies by game and by version. Before concluding something is broken, check the project\'s compatibility list.',
      'If performance is poor, lower the internal resolution before touching any other setting.',
    ],
  },

  'adonis-singh/re4': {
    pt: [
      'Você precisa da sua própria cópia de Resident Evil 4 de GameCube. O projeto é uma decompilação da versão de debug, então a build exata importa — o README diz qual.',
      'Este é um projeto de decompilação, não um instalador pronto: você compila a partir do código.',
      'Siga as instruções de compilação do README do repositório, que lista as ferramentas necessárias.',
      'Aponte a compilação para os arquivos extraídos da sua cópia.',
      'Acompanhe o repositório: o estado muda rápido e o que não funciona hoje pode funcionar na semana seguinte.',
    ],
    en: [
      'You need your own GameCube copy of Resident Evil 4. The project decompiles the debug build specifically, so the exact build matters — the README states which.',
      'This is a decompilation project, not a ready installer: you build it from source.',
      'Follow the build instructions in the repository README, which lists the tooling you need.',
      'Point the build at the files extracted from your own copy.',
      'Watch the repository: the state moves quickly and what does not work today may work next week.',
    ],
  },

  'Yharnam-Hunters/Paleblood': {
    pt: [
      'Você precisa do seu próprio dump de Bloodborne, versão 1.09 (CUSA03173). Outras versões não servem: a decompilação é feita em cima dessa.',
      'Este é um projeto de decompilação em andamento, não um jogo pronto para instalar.',
      'Acompanhe o repositório para ver o progresso e quando houver uma build jogável.',
      'Se o que você quer é jogar Bloodborne no PC hoje, o caminho que existe é o shadPS4 ou os ports nativos derivados do bbport — procure por eles aqui no catálogo.',
    ],
    en: [
      'You need your own Bloodborne dump, version 1.09 (CUSA03173). Other versions will not do: the decompilation targets that one.',
      'This is a decompilation in progress, not a game ready to install.',
      'Watch the repository for progress and for when a playable build appears.',
      'If what you want is to play Bloodborne on PC today, the paths that exist are shadPS4 or the native ports derived from bbport — look for them in this catalog.',
    ],
  },

  'DahSidiAbdallah/ConkerBFDReloaded': {
    pt: [
      "Você precisa da sua própria ROM de Conker's Bad Fur Day, versão americana, descompactada em .z64.",
      'Baixe a release e extraia numa pasta vazia com permissão de escrita.',
      'Aponte o programa para a ROM na primeira execução para ele gerar os dados do jogo.',
      'O port tem um modo clássico, fiel ao Nintendo 64, e um modo com melhorias. Escolha nas opções — o clássico é o mais seguro se você quer a experiência original.',
      'Ajuste resolução e controle antes de jogar.',
    ],
    en: [
      "You need your own Conker's Bad Fur Day ROM, US version, uncompressed as .z64.",
      'Download the release and extract it into an empty folder with write permission.',
      'Point the program at the ROM on first launch so it can generate the game data.',
      'The port has a classic mode faithful to the Nintendo 64 and an enhanced mode. Pick in the options — classic is the safer choice if you want the original experience.',
      'Set resolution and input before playing.',
    ],
  },

  'jkdansereau/goldeneye-pc-port': {
    pt: [
      'Você precisa da sua própria ROM de GoldenEye 007 de Nintendo 64, descompactada em .z64.',
      'Baixe a release para o seu sistema — há build para Windows, Linux, macOS e Steam Deck.',
      'Extraia numa pasta vazia e aponte o programa para a ROM na primeira execução.',
      'Configure mira por mouse e sensibilidade antes de jogar: é a maior diferença em relação ao original, e o padrão nem sempre agrada.',
      'Widescreen e taxa de quadros alta estão nas opções e não exigem mod.',
    ],
    en: [
      'You need your own Nintendo 64 GoldenEye 007 ROM, uncompressed as .z64.',
      'Download the release for your platform — there are Windows, Linux, macOS and Steam Deck builds.',
      'Extract it into an empty folder and point the program at the ROM on first launch.',
      'Set mouse aiming and sensitivity before playing: it is the biggest change from the original, and the default does not suit everyone.',
      'Widescreen and high frame rate are in the options and need no mod.',
    ],
  },

  'raulzrrs/letsgo-recomp': {
    pt: [
      "Você precisa do seu próprio dump de Pokémon: Let's Go, Eevee! de Nintendo Switch, versão 1.0.0. O projeto recompila essa versão especificamente.",
      'Baixe a release para Windows e extraia numa pasta vazia.',
      'Aponte o programa para os arquivos do seu dump.',
      'É uma recompilação estática em desenvolvimento: desempenho e compatibilidade variam. Confira as notas da release antes de abrir problema.',
    ],
    en: [
      "You need your own Nintendo Switch dump of Pokémon: Let's Go, Eevee!, version 1.0.0. The project recompiles that version specifically.",
      'Download the Windows release and extract it into an empty folder.',
      'Point the program at the files from your dump.',
      'This is a static recompilation under development: performance and compatibility vary. Read the release notes before filing a problem.',
    ],
  },
}
