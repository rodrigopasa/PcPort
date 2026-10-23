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

  'santiquiroz/gears-of-war-2-pc-port': {
    pt: [
      'Você precisa da sua própria cópia de varejo de Gears of War 2 para Xbox 360, extraída para uma pasta. O projeto não distribui nada do jogo.',
      'A pasta extraída tem que conter o arquivo default.xex e a pasta GearGame. Se a sua cópia ainda é uma ISO, extraia com uma ferramenta de desempacotar imagem de Xbox 360 — o port lê a pasta, não a imagem.',
      'Requer Windows 10 ou 11 de 64 bits e uma placa de vídeo com DirectX 12.',
      'Baixe o arquivo win64 da release mais recente. Cuidado: o .apk da mesma release é a build de Android, não serve no PC.',
      'Extraia e execute o gow2.exe. O executável não é assinado, então o Windows mostra "O Windows protegeu o computador": clique em Mais informações e depois em Executar assim mesmo.',
      'Na primeira execução ele pede a pasta do jogo e guarda o caminho num arquivo de texto ao lado do executável. Para trocar de pasta depois, apague esse arquivo.',
      'Se for jogar cooperativo por rede local, autorize o gow2.exe no firewall do Windows quando ele pedir — sem isso os outros jogadores não encontram a sua partida.',
    ],
    en: [
      'You need your own retail copy of Gears of War 2 for Xbox 360, extracted to a folder. The project distributes nothing from the game.',
      'That folder has to contain the default.xex file and the GearGame folder. If your copy is still an ISO, unpack it with an Xbox 360 image tool — the port reads the folder, not the image.',
      'Requires 64-bit Windows 10 or 11 and a DirectX 12 graphics card.',
      'Download the win64 archive from the latest release. Note that the .apk in the same release is the Android build and will not run on a PC.',
      'Extract it and run gow2.exe. The executable is unsigned, so Windows shows "Windows protected your PC": click More info, then Run anyway.',
      'On first launch it asks for the game folder and remembers the path in a text file beside the executable. To choose a different folder later, delete that file.',
      'For System Link co-op, allow gow2.exe through the Windows firewall when prompted — without that the other players cannot find your game.',
    ],
  },

  'FishB0nes98/Tekken3Recompiled': {
    pt: [
      'Você precisa da sua própria imagem de disco de Tekken 3, versão americana (SLUS-00402), em CUE/BIN. O projeto é feito para essa revisão.',
      'Baixe o pacote Easy Setup da release e extraia o ZIP inteiro numa pasta com permissão de escrita — extrair só parte do pacote é o erro mais comum aqui.',
      'Deixe pelo menos 4 GB livres: a primeira configuração baixa as ferramentas de compilação e prepara o jogo na sua máquina.',
      'Abra o executável do launcher, aponte para a sua imagem CUE/BIN e confirme a configuração. A primeira vez demora; as seguintes abrem direto.',
      'Para habilitar a Jun Kazama, o projeto também pede os conjuntos de arcade tekken3 e tektagt no formato não mesclado. Sem eles o resto do jogo funciona normalmente.',
      'Não use o botão Code → Download ZIP do GitHub: aquele arquivo é o código-fonte e não contém o jogo.',
    ],
    en: [
      'You need your own Tekken 3 disc image, the US release (SLUS-00402), as CUE/BIN. The project targets that revision.',
      'Download the Easy Setup package from the release and extract the whole ZIP into a folder you can write to — extracting only part of the package is the most common mistake here.',
      'Leave at least 4 GB free: first-time setup downloads the build tools and prepares the game locally.',
      'Open the launcher executable, point it at your CUE/BIN image and confirm setup. The first run takes a while; later ones open straight away.',
      'To enable Jun Kazama the project also asks for the non-merged tekken3 and tektagt arcade sets. Without them the rest of the game works normally.',
      'Do not use GitHub\'s Code → Download ZIP button: that archive is the source code and contains no game.',
    ],
  },

  'CTR-tools/ctr-native': {
    pt: [
      'Você precisa da sua própria imagem de disco de Crash Team Racing, versão americana (NTSC-U).',
      'O formato importa e é onde quase todos tropeçam: tem que ser o BIN cru de PlayStation, setores MODE2/2352, faixa única. Um .iso "cozido" de 2048 bytes por setor não serve, porque perde dados que o jogo lê.',
      'Baixe a release do seu sistema e extraia numa pasta vazia.',
      'Crie uma pasta chamada assets ao lado do executável e coloque a imagem lá com o nome que o projeto espera (ctr-u.bin).',
      'Execute o ctr_native.exe no Windows, ou ctr_native no Linux.',
      'Se preferir compilar, o projeto usa CMake 3.20 ou mais novo com o Visual Studio 2022 (workload de C++ para desktop) ou MSYS2 com o GCC de 32 bits. O SDL3 vem no código e é compilado junto — não precisa instalar à parte.',
    ],
    en: [
      'You need your own Crash Team Racing disc image, the US release (NTSC-U).',
      'The format matters and is where nearly everyone trips: it has to be the raw PlayStation BIN, MODE2/2352 sectors, single track. A cooked 2048-byte .iso will not do, because it drops data the game reads.',
      'Download the release for your platform and extract it into an empty folder.',
      'Create a folder called assets beside the executable and put the image there under the name the project expects (ctr-u.bin).',
      'Run ctr_native.exe on Windows, or ctr_native on Linux.',
      'To build it yourself the project uses CMake 3.20 or newer with Visual Studio 2022 (Desktop development with C++) or MSYS2 with the 32-bit GCC. SDL3 ships in the source and is compiled along with it — nothing to install separately.',
    ],
  },

  'griches/EternalDarknessRecomp': {
    pt: [
      'Você precisa da sua própria imagem do disco europeu de Eternal Darkness, em .iso ou .gcm. O projeto é feito para a versão europeia.',
      'No Windows: baixe o pacote x64 da release e extraia numa pasta com permissão de escrita — Documentos ou uma pasta de jogos, nunca Arquivos de Programas.',
      'Coloque a sua imagem na subpasta dump e execute o play.bat. Se o Windows avisar que protegeu o computador, clique em Mais informações e em Executar assim mesmo.',
      'A primeira execução traduz o disco e monta o jogo a partir dele, o que leva um ou dois minutos. Depois disso ele abre na hora.',
      'No Mac (Apple Silicon, macOS 13 ou mais novo) o app não é notarizado: clique com o botão direito, escolha Abrir e confirme. Depois arraste a imagem do disco para a janela dele.',
      'No Linux ou Steam Deck, descompacte o pacote e execute o play.sh. No Deck, adicione o play.sh como jogo externo pelo modo Desktop.',
      'O pacote de texturas em alta resolução é opcional e grande (quase 3 GB). Se for usar, descompacte as pastas dentro de uma pasta chamada textures.',
    ],
    en: [
      'You need your own image of the European Eternal Darkness disc, as .iso or .gcm. The project targets the European release.',
      'On Windows: download the x64 package from the release and extract it into a folder you can write to — Documents or a games folder, never Program Files.',
      'Put your image in the dump subfolder and run play.bat. If Windows says it protected your PC, click More info, then Run anyway.',
      'The first run translates the disc and builds the game from it, which takes a minute or two. After that it starts immediately.',
      'On a Mac (Apple silicon, macOS 13 or newer) the app is not notarised: right-click, choose Open and confirm. Then drag the disc image onto its window.',
      'On Linux or Steam Deck, unpack the archive and run play.sh. On a Deck, add play.sh as a non-Steam game from Desktop Mode.',
      'The HD texture pack is optional and large (close to 3 GB). To use it, unpack the folders into a folder called textures.',
    ],
  },

  'drakolordx7/KillzoneRecomp': {
    pt: [
      'Você precisa da sua própria imagem de disco de Killzone, versão americana (SCUS-97402). Nenhum código ou dado do jogo acompanha o projeto.',
      'Baixe o ZIP da release mais recente e extraia numa pasta vazia.',
      'Execute o killzone.exe e aponte o launcher para a sua imagem. Ele confere se a versão é a suportada antes de seguir.',
      'Está em alfa: a inicialização, os menus, a criação de perfil e a primeira missão são verificados automaticamente a cada release. Partidas longas ainda estão sendo testadas, então leia as notas da versão.',
      'A mira por mouse é nativa, sem aceleração ou zona morta, e as teclas são remapeáveis. Controles funcionam com o layout original do PS2.',
      'O modo online não está incluído e não há como ativá-lo — os servidores do jogo saíram do ar há anos.',
    ],
    en: [
      'You need your own Killzone disc image, the US release (SCUS-97402). No game code or data ships with the project.',
      'Download the ZIP from the latest release and extract it into an empty folder.',
      'Run killzone.exe and point the launcher at your image. It checks that the version is the supported one before going on.',
      'This is alpha: boot, menus, profile creation and the first mission are verified automatically on each release. Longer sessions are still being tested, so read the release notes.',
      'Mouse aim is native, with no acceleration or dead zone, and keys are rebindable. Controllers work with the original PS2 layout.',
      'Online play is not included and cannot be enabled — the game\'s servers shut down years ago.',
    ],
  },

  'christianortel/skate2-recompile-pc': {
    pt: [
      'Você precisa dos seus próprios arquivos extraídos de Skate 2 para Xbox 360, na revisão que o projeto declara suportar. Se a sua cópia é uma ISO ou um arquivo compactado, extraia antes de importar.',
      'Requer Windows 10 ou 11 de 64 bits, placa de vídeo com Direct3D 12 e um controle. Teclado e mouse não substituem o controle aqui.',
      'Baixe o ZIP nomeado para Windows x64 na página de releases. O Code → Download ZIP e os arquivos "Source code" são para quem programa e não contêm o executável do jogo.',
      'Extraia o ZIP inteiro numa pasta com permissão de escrita.',
      'Execute o importador do pacote e selecione a pasta extraída do jogo, aquela que contém o default.xex e a pasta data. A importação copia e verifica os arquivos uma única vez.',
      'Conecte o controle e abra o launcher. Se ele pedir o runtime do Visual C++ x64, instale pelo atalho que vem no pacote e abra de novo.',
      'Se o desempenho não fechar, troque o perfil de renderização: o padrão é 2x, e existe um perfil 1x para placas mais modestas.',
    ],
    en: [
      'You need your own extracted Skate 2 files for Xbox 360, at the revision the project documents as supported. If your copy is an ISO or a compressed archive, extract it before importing.',
      'Requires 64-bit Windows 10 or 11, a Direct3D 12 graphics card and a controller. Keyboard and mouse are not a substitute here.',
      'Download the named Windows x64 ZIP from the releases page. Code → Download ZIP and the "Source code" archives are for developers and contain no game executable.',
      'Extract the whole ZIP into a folder you can write to.',
      'Run the package\'s import step and select your extracted game folder, the one holding default.xex and the data folder. Importing copies and verifies the files once.',
      'Connect your controller and open the launcher. If it asks for the Visual C++ x64 runtime, install it from the shortcut included in the package and launch again.',
      'If performance does not hold up, switch the rendering profile: the default is 2x, and there is a 1x profile for more modest cards.',
    ],
  },

  'jedijosh920/SWROTS-PC': {
    pt: [
      'Você precisa da sua própria cópia de Star Wars Episode III: Revenge of the Sith para o Xbox original, na versão americana. O projeto não inclui código, arte, áudio nem qualquer dado do jogo.',
      'Não é emulador: o código do próprio jogo roda direto no PC, e as partes do Xbox das quais ele dependia são substituídas por código nativo do Windows. O programa é de 32 bits.',
      'Baixe a release mais recente e siga o passo de configuração descrito ali — o projeto está em desenvolvimento ativo e esse passo muda entre versões, então vale ler a página da release em vez de confiar na memória.',
      'Está em desenvolvimento inicial: o jogo inicia, roda os vídeos e os menus, e dá para jogar com troca de fase, reinício de missão e salvamento. Ninguém terminou do começo ao fim ainda.',
      'Funciona com teclado e mouse, controles de Xbox e controles de PlayStation (DualShock 4 e DualSense), com vibração.',
      'Mods entram como arquivos soltos: é possível trocar texturas e modelos sem remontar os arquivos do jogo.',
    ],
    en: [
      'You need your own copy of Star Wars Episode III: Revenge of the Sith for the original Xbox, the North American release. The project includes no game code, art, audio or any other game data.',
      'It is not an emulator: the game\'s own code runs directly on your PC, and the parts of the Xbox it relied on are replaced by native Windows code. The program is 32-bit.',
      'Download the latest release and follow the setup step documented there — the project is under active development and that step changes between versions, so read the release page rather than trusting memory.',
      'This is early development: the game boots, plays its movies and menus, and is playable through level changes, mission restarts and saving. Nobody has played it start to finish yet.',
      'It supports keyboard and mouse, Xbox controllers and PlayStation controllers (DualShock 4 and DualSense), with rumble.',
      'Mods load as loose files: you can replace textures and models without rebuilding the game\'s archives.',
    ],
  },

  'theokyr/Project8Recomp': {
    pt: [
      'Você precisa da sua própria cópia de Tony Hawk\'s Project 8 para Xbox 360 como imagem .iso. Não precisa extrair: o launcher lê a imagem direto.',
      'Deixe cerca de 5 GB livres e tenha uma placa de vídeo com suporte a Vulkan.',
      'Baixe a release do seu sistema e descompacte numa pasta com permissão de escrita.',
      'Execute o programa e aponte para a sua .iso. Ele confere a imagem em menos de um segundo e recusa ali uma versão que não é a suportada — antes de escrever 4,7 GB, não depois.',
      'Se a imagem bate, ele copia os dados do jogo para a mesma pasta. Isso leva alguns minutos e pode ser interrompido.',
      'Deixe o limitador de quadros ligado, que é o padrão. Com ele desligado, as cenas dentro das fases rodam de três a cinco vezes mais rápido — é o problema conhecido que mais confunde quem instala.',
      'Tudo fica nessa única pasta: dados, saves e configurações. Nada é escrito em outro lugar do sistema. Para abrir as configurações depois, execute o programa com a opção --gui.',
      'No Steam Deck, adicione o executável como jogo externo e não force o Proton na build de Linux. No macOS o app é assinado mas não notarizado: botão direito, Abrir, Abrir.',
    ],
    en: [
      'You need your own copy of Tony Hawk\'s Project 8 for Xbox 360 as an .iso image. No extraction needed: the launcher reads the image directly.',
      'Leave about 5 GB free and have a graphics card with Vulkan support.',
      'Download the release for your platform and unpack it into a folder you can write to.',
      'Run the program and point it at your .iso. It checks the image in well under a second and refuses an unsupported release right there — before writing 4.7 GB, not after.',
      'On a match it copies the game data into the same folder. That takes a few minutes and can be stopped.',
      'Leave the frame rate cap on, which is the default. With it off, in-level cutscenes run three to five times too fast — the known issue that confuses new installs most.',
      'Everything lives in that one folder: data, saves and settings. Nothing is written elsewhere on your system. To reach the settings later, run the program with the --gui option.',
      'On Steam Deck, add the executable as a non-Steam game and do not force Proton for the Linux build. On macOS the app is signed but not notarised: right-click, Open, Open.',
    ],
  },

  'MaryNCRT/Ultimate-Mortal-Kombat-3-iOS-Decompiled': {
    pt: [
      'Este projeto parte da versão de iOS de Ultimate Mortal Kombat 3, a 1.2.59, e gera um executável nativo. Você precisa do seu próprio arquivo .ipa dessa versão exata — nenhum binário ou dado do jogo é distribuído.',
      'O caminho mais simples no Windows e no Linux é o launcher do projeto: ele recebe o seu .ipa, baixa sozinho o compilador que o projeto fixa, extrai os dados e compila o jogo. Não é preciso ter compilador instalado.',
      'Se preferir a linha de comando, coloque o .ipa na raiz do projeto e rode o script de build em Python passando o caminho do arquivo. Ele valida o .ipa, extrai as tabelas de dados e prepara uma pasta pronta para jogar.',
      'A versão do .ipa é verificada. Um arquivo de outra versão é recusado na validação, então confira antes de culpar a compilação.',
      'O porte nativo está jogável em alfa, com renderizador OpenGL próprio, proporções de 4:3 a 21:9, teclado e controle, dois jogadores local e multijogador em rede.',
      'A descompilação em si está completa e verificada contra um oráculo automático, o que é diferente de o jogo estar completo — leia as notas da versão antes de reportar problema.',
    ],
    en: [
      'This project works from the iOS release of Ultimate Mortal Kombat 3, version 1.2.59, and produces a native executable. You need your own .ipa of that exact version — no game binary or data is distributed.',
      'The simplest route on Windows and Linux is the project\'s launcher: it takes your .ipa, downloads the compiler the project pins, extracts the data and builds the game. No compiler needs to be installed.',
      'If you prefer the command line, put the .ipa in the project root and run the Python build script with the file\'s path. It validates the .ipa, extracts the data tables and prepares a ready-to-play folder.',
      'The .ipa version is checked. A file from another version is refused at validation, so verify that before blaming the build.',
      'The native port is playable in alpha, with its own OpenGL renderer, aspect ratios from 4:3 to 21:9, keyboard and gamepad, local two-player and networked multiplayer.',
      'The decompilation itself is complete and verified against an automated oracle, which is not the same as the game being complete — read the release notes before filing a problem.',
    ],
  },

  'GRAnimated/MinecraftLCE': {
    pt: [
      'Atenção antes de começar: este projeto é uma descompilação em andamento e não serve para jogar. Ele não contém dados do jogo e não produz um Minecraft jogável no PC.',
      'O trabalho é feito sobre o binário da edição de Nintendo Switch, a versão 1.0.17, porque foi a única compilada com um compilador que dá para identificar e igualar instrução por instrução.',
      'Para compilar você precisa extrair o executável principal da sua própria cópia dessa versão. O projeto não fornece esse arquivo e não vai fornecer.',
      'Quem for contribuir também costuma usar o executável da edição de Wii U para aproveitar os símbolos de função, que são a única fonte de nomes reais no projeto.',
      'Se o que você quer é jogar a versão de console no PC, este repositório não é o caminho — ele é material para quem quer entender ou reconstruir o código.',
    ],
    en: [
      'Before you start: this project is a decompilation in progress and is not something you play. It contains no game data and does not produce a playable Minecraft on PC.',
      'The work is done against the Nintendo Switch edition binary, version 1.0.17, because that is the only one built with a compiler that can be identified and matched instruction for instruction.',
      'To build it you need to extract the main executable from your own copy of that version. The project does not supply that file and will not.',
      'Contributors also tend to use the Wii U edition executable for its function symbols, which are the only source of real names in the project.',
      'If what you want is to play the console edition on a PC, this repository is not the route — it is material for people reading or rebuilding the code.',
    ],
  },

  'pmret/papermario': {
    pt: [
      'Este é um projeto de descompilação, não um port pronto para jogar. O resultado da compilação é uma ROM, não um executável de PC.',
      'Você precisa da sua própria ROM de Paper Mario para colocar na pasta que as instruções de build indicam. O repositório não distribui ROM nem dado do jogo.',
      'A compilação é verificada por igualdade: ela monta uma ROM e compara com a sua. Se o resultado não bater byte a byte, quase sempre é ROM de região ou revisão diferente da esperada.',
      'Siga as instruções de instalação do próprio repositório para montar o ambiente — ele depende de uma cadeia de ferramentas específica de Nintendo 64, e versão errada de compilador é a causa mais comum de falha.',
      'O valor aqui é o código: é dele que saem os ports nativos e os mods. Se você quer apenas jogar no PC, acompanhe os projetos que usam esta descompilação como base.',
    ],
    en: [
      'This is a decompilation project, not a ready-to-play port. What the build produces is a ROM, not a PC executable.',
      'You need your own Paper Mario ROM, placed in the folder the build instructions specify. The repository distributes no ROM and no game data.',
      'The build is checked by equality: it assembles a ROM and compares it against yours. When the result does not match byte for byte, it is almost always a ROM from a different region or revision than expected.',
      'Follow the repository\'s own install instructions to set the environment up — it depends on a specific Nintendo 64 toolchain, and the wrong compiler version is the most common cause of failure.',
      'The value here is the code: it is what native ports and mods are built from. If you only want to play on a PC, follow the projects that use this decompilation as their base.',
    ],
  },

  'pret/pokeemerald': {
    pt: [
      'Este é um projeto de descompilação. A compilação gera uma ROM de Game Boy Advance, não um executável de PC.',
      'Você precisa da sua própria ROM de Pokémon Emerald como base, colocada onde as instruções de instalação do repositório indicam. Nenhuma ROM acompanha o projeto.',
      'Siga o arquivo de instruções de instalação do repositório: o ambiente depende de uma cadeia de ferramentas específica de GBA, e ela é a parte que dá trabalho — não o código.',
      'A compilação é verificada por igualdade com a ROM original. Resultado diferente quase sempre significa revisão ou região de ROM diferente da esperada.',
      'É daqui que saem a maioria dos ROM hacks e das traduções da terceira geração: o código em C é legível e modificável, o que a ROM sozinha não é.',
    ],
    en: [
      'This is a decompilation project. The build produces a Game Boy Advance ROM, not a PC executable.',
      'You need your own Pokémon Emerald ROM as a base, placed where the repository\'s install instructions say. No ROM ships with the project.',
      'Follow the repository\'s install instructions: the environment depends on a specific GBA toolchain, and that is the part that takes the work — not the code.',
      'The build is checked for equality against the original ROM. A mismatch almost always means a ROM revision or region other than the expected one.',
      'This is where most third-generation ROM hacks and translations come from: the C code is readable and changeable, which the ROM on its own is not.',
    ],
  },

  'TeamGDB/Yakumo': {
    pt: [
      'Você precisa da sua própria imagem de disco de Monster Hunter Portable 3rd para PSP. O jogo nunca saiu do Japão, então a cópia é a japonesa — e o projeto traz tradução de texto da comunidade por arquivo separado, instalada depois pelo menu do próprio jogo.',
      'O caminho mais simples é baixar a release estável mais recente, que vem compilada. Compilar você mesmo também é suportado e documentado.',
      'O executável do jogo é preparado a partir da sua imagem pelo próprio programa, com a opção de instalação apontando para o seu .iso. Não é preciso nenhuma ferramenta externa de descriptografia.',
      'Depois disso, a imagem e o executável preparado são vinculados ao perfil do jogo pelos scripts que acompanham o projeto.',
      'Se for compilar: precisa de CMake 3.20 ou mais novo, Ninja, um compilador C++20, Python 3, SDL3, Vulkan e o glslangValidator. No macOS e no Linux também precisa de make e um compilador C, porque o build monta o próprio FFmpeg para a música e os vídeos; no Windows não precisa.',
      'Reserve alguns gigabytes de memória livre para compilar — o código recompilado é grande, e falta de memória é a causa mais comum de build interrompido.',
      'Status: jogável. Leia as notas da release antes de reportar problema.',
    ],
    en: [
      'You need your own Monster Hunter Portable 3rd disc image for PSP. The game never released outside Japan, so the copy is the Japanese one — and the project offers community text translations as a separate file, installed afterwards from the game\'s own menu.',
      'The simplest route is to download the latest stable release, which comes prebuilt. Building it yourself is also supported and documented.',
      'The game executable is prepared from your image by the program itself, using its install option pointed at your .iso. No external decryption tool is needed.',
      'After that, the image and the prepared executable are linked into the game profile by the scripts that ship with the project.',
      'To build it: CMake 3.20 or newer, Ninja, a C++20 compiler, Python 3, SDL3, Vulkan and glslangValidator. On macOS and Linux you also need make and a C compiler, because the build makes its own FFmpeg for the music and the movies; on Windows it does not.',
      'Set aside a few gigabytes of free memory for the build — the recompiled code is large, and running out of memory is the most common cause of a halted build.',
      'Status: playable. Read the release notes before filing a problem.',
    ],
  },

  'OpenDriver2/REDRIVER2': {
    pt: [
      'Você precisa dos seus próprios dois CDs de Driver 2. O jogo saiu em dois discos e o port lê dados dos dois — ficar só com o CD1 é o que mais trava gente aqui.',
      'Dumpe cada CD para ISO ou BIN/CUE. As revisões com suporte completo são SLUS-01161/SLUS-01318 (americana 1.0), as mesmas com sufixo GH (Greatest Hits 1.1), SLES-02993/SLES-12993 (europeia 1.0) e as mesmas com sufixo P (Platinum 1.1).',
      'Baixe a release do REDRIVER2 e extraia numa pasta só dela.',
      'Instale um runtime Java: a conversão de vídeo e áudio do CD depende dele, e sem Java ela falha sem explicar o motivo.',
      'O caminho mais simples é pegar o Launcher do projeto, colocá-lo na mesma pasta, abrir o assistente de instalação e apontar as imagens de CD1 e CD2.',
      'Sem o launcher, renomeie as imagens para Driver2CD1.bin e Driver2CD2.bin dentro de install/, confira se o config.ini aponta para a de CD1 na seção [cdfs], e rode o script de conversão de FMV/XA antes de abrir o jogo. Essa conversão é o passo demorado: vários minutos.',
      'No Windows, se o executável não abrir, instale o redistribuível do Visual C++. A página de instalação no wiki do projeto tem os links e o mapeamento de controles.',
    ],
    en: [
      'You need both of your own Driver 2 CDs. The game shipped on two discs and the port reads data from both — stopping at CD1 is what trips most people up here.',
      'Dump each CD to ISO or BIN/CUE. The fully supported revisions are SLUS-01161/SLUS-01318 (US 1.0), the same with a GH suffix (Greatest Hits 1.1), SLES-02993/SLES-12993 (EU 1.0) and the same with a P suffix (Platinum 1.1).',
      'Download the REDRIVER2 release and extract it into a folder of its own.',
      'Install a Java runtime: the CD video and audio conversion depends on it, and without Java it fails without saying why.',
      'The easiest route is the project Launcher: put it in the same folder, open the setup wizard and point it at your CD1 and CD2 images.',
      'Without the launcher, rename the images to Driver2CD1.bin and Driver2CD2.bin inside install/, check that config.ini\u2019s [cdfs] section points at the CD1 one, and run the FMV/XA conversion script before starting the game. That conversion is the slow step: several minutes.',
      'On Windows, if the executable will not start, install the Visual C++ redistributable. The project wiki install page carries the links and the control mapping.',
    ],
  },

  'wipeout-phantom-edition/wipeout-phantom-edition': {
    pt: [
      'Você precisa da sua própria cópia de WipeOut de PlayStation, região americana. Dados das versões oficiais de PC não funcionam — esse é o engano mais comum.',
      'Baixe a release e extraia a pasta wipeout para onde você quiser.',
      'O caminho recomendado é a imagem de disco: coloque a sua em wipeout/diskimages. Ela precisa ser multi-bin — nove arquivos .bin mais um .cue — com a primeira trilha em MODE2/2352 e as outras como AUDIO. Um .iso de trilha única não serve.',
      'Abra o jogo. Na primeira execução ele procura os arquivos que faltam e extrai da imagem. A busca é por hash no trilho de dados, então em máquina com menos de oito núcleos esse passo é lento.',
      'Depois que você chegar ao menu principal uma vez, as imagens de disco não são mais necessárias e podem sair da pasta.',
      'Se você já tem os arquivos soltos do jogo — são 517 — copie-os direto para wipeout/wipeoutgame. A desvantagem é a música: ela está em trilhas Red Book do CD, fora do sistema de arquivos, e não vem por cópia. Para ter música, use a imagem de disco, ou coloque arquivos próprios em wipeout/music seguindo a numeração de 01 a 32 descrita no musicgoeshere.txt daquela pasta.',
      'Nos menus de opções ficam as novidades: quadros destravados, alta resolução, widescreen, distância de visão e o modelo de colisão com a parede (Modern, Classic ou Legacy).',
    ],
    en: [
      'You need your own PlayStation copy of WipeOut, US region. Data from the official PC versions does not work — that is the most common mistake here.',
      'Download the release and extract the wipeout folder wherever you like.',
      'The recommended route is the disc image: put yours in wipeout/diskimages. It has to be multi-bin — nine .bin files plus one .cue — with the first track as MODE2/2352 and the rest as AUDIO. A single-track .iso will not do.',
      'Start the game. On first launch it looks for missing data files and extracts them from the image. The search is hash-based over the data track, so on a machine with fewer than eight cores this step is slow.',
      'Once you have reached the main menu once, the disc images are no longer needed and can leave the folder.',
      'If you already have the loose game files — 517 of them — copy them straight into wipeout/wipeoutgame. The catch is the music: it lives in Red Book CD audio tracks, outside the file system, and does not come across. For music, use the disc image, or put your own files in wipeout/music following the 01-to-32 numbering described in that folder\u2019s musicgoeshere.txt.',
      'The options menus hold the additions: uncapped frame rate, high resolution, widescreen, view distance and the wall-collision model (Modern, Classic or Legacy).',
    ],
  },

  'nathanialf/ico-pc': {
    pt: [
      'Você precisa da sua própria cópia de ICO, e a região importa: só valem o disco europeu (SCES-50760), o japonês (SCPS-11003) ou o coreano (SCPS-56001). O número está impresso no disco e na caixa. A versão americana não funciona.',
      'Transforme o disco numa imagem. Vale .iso, .chd ou .bin — o japonês é um CD, então a imagem dele costuma vir como .bin com .cue ao lado, e o .cue também serve.',
      'Baixe o pacote do seu sistema. No Windows, extraia o -win.zip para uma pasta onde você tenha permissão de escrita, mantenha todos os arquivos juntos e rode o ico_pc_x64.exe dentro de x64.',
      'No Linux ou Steam Deck, use o AppImage: coloque-o numa pasta própria, marque o arquivo como executável e abra. No macOS com Apple Silicon, na primeira vez clique com o botão direito em ICO e escolha Abrir, porque o pacote não é assinado.',
      'Deixe cerca de 1 GB livre: a primeira execução copia os arquivos do jogo para fora da imagem de disco, e é esse o passo que demora.',
      'Os extras de imagem — resolução maior, widescreen, movimento mais suave — vêm desligados de propósito, e a taxa de quadros só fica presa à do PS2 se você escolher Original. A câmera no mouse já vem ligada.',
    ],
    en: [
      'You need your own copy of ICO, and the region matters: only the European disc (SCES-50760), the Japanese one (SCPS-11003) or the Korean one (SCPS-56001) work. The number is printed on the disc and on the case. The American release does not.',
      'Turn the disc into an image. .iso, .chd and .bin all work — the Japanese release is a CD, so its image usually comes as a .bin with a .cue beside it, and the .cue works too.',
      'Download the package for your system. On Windows, extract the -win.zip into a folder you can write to, keep all the files together, and run ico_pc_x64.exe inside x64.',
      'On Linux or the Steam Deck use the AppImage: put it in a folder of its own, mark the file executable and open it. On an Apple-silicon Mac, right-click ICO and choose Open the first time, because the package is not signed.',
      'Leave about 1 GB free: the first start copies the game files out of the disc image, and that is the step that takes a while.',
      'The picture extras — sharper image, widescreen, smoother motion — start off on purpose, and the frame rate is only held to the PS2\u2019s if you pick Original. The mouse camera starts on.',
    ],
  },

  'PaulCombal/mw2-recompiled': {
    pt: [
      'Você precisa de uma imagem do disco de Xbox 360 de Modern Warfare 2, versão 1.0.557 (americana ou europeia). O launcher confere a versão; o Title Update 6 ele baixa sozinho.',
      'Escolha entre a build steam e a lan. A steam deixa só seus amigos do Steam entrarem e ignora tráfego de quem não está no lobby; a lan abre para qualquer um na mesma rede.',
      'Extraia o pacote onde quiser, abra o mw2-launcher e escolha INSTALL GAME. Ele pede a sua ISO, copia os arquivos para a pasta game/ ao lado e aplica o title update. Uma pasta de disco já extraída também serve.',
      'Reserve 8 GB de disco. A máquina precisa de processador com SSE4.2 (Intel a partir de 2008, AMD a partir de 2011) e GPU com Vulkan 1.2.',
      'Antes da primeira partida o launcher compila todos os shaders do jogo para a sua placa de vídeo. Isso leva cerca de um minuto, e volta a acontecer depois de uma atualização do jogo, do driver de vídeo ou de uma mudança de RESOLUTION.',
      'Tenha um controle à mão: o teclado só cobre os menus.',
      'Se o update não baixar, o launcher diz onde consegui-lo e aceita o arquivo por --update. Matchmaking público e playlists ranqueadas não existem aqui, porque dependiam dos servidores da Activision.',
    ],
    en: [
      'You need an image of the Xbox 360 disc of Modern Warfare 2, version 1.0.557 (USA or Europe). The launcher checks the version; it downloads title update 6 itself.',
      'Pick the steam or the lan build. The steam one lets only your Steam friends join and ignores traffic from anyone outside your lobby; the lan one is open to anyone on the same network.',
      'Extract the package anywhere, start mw2-launcher and choose INSTALL GAME. It asks for your ISO, copies the game files into game/ beside it and applies the title update. An already-extracted disc folder works too.',
      'Set aside 8 GB of disk. The machine needs a CPU with SSE4.2 (Intel from 2008, AMD from 2011) and a Vulkan 1.2 GPU.',
      'Before you first play, the launcher compiles all of the game shaders for your graphics card. That takes about a minute, and happens again after a game or driver update, or a change of RESOLUTION.',
      'Have a controller ready: the keyboard only covers the menus.',
      'If the update will not download, the launcher says where to get it and takes the file with --update. Public matchmaking and ranked playlists are not here, because they needed Activision\u2019s servers.',
    ],
  },

  'SpeedBreakerProject/speedbreaker': {
    pt: [
      'Você precisa de uma imagem do seu próprio disco de Xbox 360 de Need for Speed: Most Wanted (2005), versão americana NTSC-U em inglês. A versão de PC do jogo não serve: o projeto recompila o código do Xbox 360.',
      'O instalador aceita uma .iso completa, uma XISO reduzida ou uma pasta com os arquivos do disco já extraídos. Não é preciso title update.',
      'Baixe o pacote do seu dispositivo: SteamOS (Steam Deck, Steam Machine, Steam Frame), Linux ou Mac. Para iPhone e iPad existe um IPA experimental para sideload.',
      'Na primeira execução o programa procura a sua imagem, confirma que é o jogo e a versão certos, copia e verifica cada arquivo. Isso leva alguns minutos no máximo. Depois você pode apagar a imagem.',
      'Seus saves e ajustes ficam separados do jogo, então sobrevivem a uma atualização do SpeedBreaker ou a uma reinstalação do jogo.',
      'As configurações abrem com F1, com Back + Start no controle, ou com um toque de três dedos no iPhone e no iPad — inclusive no meio de uma corrida.',
      'No Steam Deck, faça o download e a descompactação em Modo Desktop. A página de releases mostra o que existe para cada plataforma.',
    ],
    en: [
      'You need an image of your own Xbox 360 disc of Need for Speed: Most Wanted (2005), the USA NTSC-U English release. The PC version of the game will not do: the project recompiles the Xbox 360 code.',
      'The installer takes a full .iso, a trimmed XISO, or a folder with the disc files already extracted. No title update is needed.',
      'Download the package for your device: SteamOS (Steam Deck, Steam Machine, Steam Frame), Linux or Mac. For iPhone and iPad there is an experimental IPA to sideload.',
      'On first run the program looks for your image, confirms it is the right game and version, then copies and verifies every file. That takes a few minutes at most. Afterwards you can delete the image.',
      'Your saves and settings are kept apart from the game, so they survive a SpeedBreaker update or a reinstall of the game.',
      'Settings open with F1, with Back + Start on a controller, or a three-finger tap on iPhone and iPad — mid-race included.',
      'On the Steam Deck, download and unpack in Desktop Mode. The releases page shows what exists for each platform.',
    ],
  },

  'gamboozino/ngbrecomp': {
    pt: [
      'Você precisa da sua própria cópia de Ninja Gaiden Black do Xbox original, release americana de varejo (NTSC-U, title ID 5443000D). O programa confere isso e recusa outra versão.',
      'Na primeira execução ele pede a sua cópia: serve uma imagem de disco (.iso, um dump completo do Redump, ou o .7z/.zip em que ela veio) ou uma pasta de arquivos extraídos contendo default.xbe.',
      'Deixe cerca de 6 GB livres: a instalação dos dados acontece uma vez e é o passo demorado.',
      'No Windows, extraia o NinjaGaidenBlack-windows-x64.zip e rode o executável. Precisa de Windows 10 ou 11 de 64 bits e driver de GPU com Vulkan 1.3.',
      'No Linux ou Steam Deck, marque o AppImage como executável e abra. Precisa de glibc 2.35 ou mais novo e Vulkan 1.3.',
      'No Steam Deck, adicione o AppImage ao Steam para jogar no Game Mode e escolha 16:10 nas opções. Se o jogo fechar ao apertar Play no Game Mode, é um defeito conhecido do cliente estável do Steam com jogos de fora da loja: use o Steam Beta, ou coloque APPIMAGE_EXTRACT_AND_RUN=1 %command% nas opções de inicialização.',
      'Nas opções estão resolução de render até 10x, filtragem anisotrópica, MSAA, sombras mais nítidas, 16:9, 16:10 e 21:9, teclado e mouse com remapeamento, e a opção de pular as aberturas.',
    ],
    en: [
      'You need your own copy of Ninja Gaiden Black for the original Xbox, the retail USA release (NTSC-U, title ID 5443000D). The program checks for it and refuses another version.',
      'On first start it asks for your copy: a disc image (.iso, a full Redump dump, or the .7z/.zip it came in) or a folder of extracted files containing default.xbe.',
      'Leave about 6 GB free: the data install happens once and is the slow step.',
      'On Windows, extract NinjaGaidenBlack-windows-x64.zip and run the executable. It needs 64-bit Windows 10 or 11 and a GPU driver with Vulkan 1.3.',
      'On Linux or the Steam Deck, mark the AppImage executable and open it. It needs glibc 2.35 or newer and Vulkan 1.3.',
      'On the Steam Deck, add the AppImage to Steam to play in Game Mode and pick 16:10 in the settings. If the game closes the moment you press Play in Game Mode, that is a known bug in the stable Steam client with non-Steam games: switch to the Steam Beta, or set APPIMAGE_EXTRACT_AND_RUN=1 %command% in the launch options.',
      'The settings hold render resolution up to 10x, anisotropic filtering, MSAA, sharper shadows, 16:9, 16:10 and 21:9, rebindable keyboard and mouse, and an option to skip the intros.',
    ],
  },

  'GiZcesi/OpenTricky': {
    pt: [
      'Você precisa de uma imagem de disco (.iso ou .xiso) do seu próprio SSX Tricky do Xbox original, release americana. O projeto recompila o código do Xbox: as versões de PS2, GameCube, PAL e japonesa não funcionam.',
      'Precisa de Windows 10 ou 11 de 64 bits e placa com Direct3D 11. No Linux e no Steam Deck ele roda via Proton, e a lentidão que havia ali foi corrigida.',
      'Baixe o OpenTricky-<versão>-unstable-win64.zip da página de releases e extraia numa pasta nova e vazia.',
      'Abra o OpenTricky.exe, que é o launcher, e aponte a sua imagem de disco. Ele confere a imagem e guarda o caminho.',
      'Escolha um preset ou ajuste à mão e aperte PLAY. O preset Original Xbox desliga de uma vez todos os extras visuais; o preset de Steam Deck se aplica sozinho na primeira execução ali.',
      'O jogo em si é bin\\SSX Tricky.exe, e abre direto com os mesmos ajustes.',
      'O Windows SmartScreen pode avisar porque o programa não é assinado: escolha Mais informações e depois Executar assim mesmo. Esta é uma release instável — leia os problemas conhecidos na página de releases antes de reportar bug.',
    ],
    en: [
      'You need a disc image (.iso or .xiso) of your own SSX Tricky for the original Xbox, USA release. The project recompiles the Xbox code: the PS2, GameCube, PAL and Japanese versions do not work.',
      'It needs 64-bit Windows 10 or 11 and a Direct3D 11 card. On Linux and the Steam Deck it runs under Proton, and the slow frame rate there has been fixed.',
      'Download OpenTricky-<version>-unstable-win64.zip from the releases page and extract it into a new, empty folder.',
      'Start OpenTricky.exe, which is the launcher, and point it at your disc image. It checks the image and remembers where it is.',
      'Pick a preset or set your own, then press PLAY. The Original Xbox preset turns every visual extra off at once; the Steam Deck preset applies itself on the first start there.',
      'The game itself is bin\\SSX Tricky.exe, and it starts straight away with the same settings.',
      'Windows SmartScreen may warn you because the program is not code-signed: choose More info, then Run anyway. This is an unstable release — read the known issues on the releases page before filing a bug.',
    ],
  },

  'LittleBitUA/DownpourRecomp': {
    pt: [
      'Você precisa da sua própria cópia de Silent Hill: Downpour do Xbox 360 — disco, versão digital ou backup de qualquer das duas. Vale a região americana ou a europeia (title id 4B4E0823).',
      'Desde a versão 1.1.7 uma ISO comum do seu disco basta: o assistente da primeira execução extrai tudo sozinho e reconhece os formatos Redump, XGD3 e dump cru. Árvores de arquivos já extraídas de versões anteriores continuam funcionando.',
      'Precisa de um PC com Windows 10 ou 11 de 64 bits e GPU com Direct3D 12. A exigência de AVX2 caiu na 1.1.7, então processadores anteriores a 2013 também iniciam o jogo.',
      'Baixe o zip da última release e extraia num lugar com permissão de escrita, por exemplo C:\\Games\\DownpourRecomp.',
      'Abra o PlayDownpour.exe e aperte Play. O assistente pede a sua ISO e, quando chegar a vez, o arquivo do Title Update 1 — ou busca o TU1 sozinho. A extração é retomável: se interromper, abra de novo e ela continua de onde parou.',
      'A primeira inicialização compila a biblioteca de shaders da sua placa; nas seguintes isso não acontece de novo.',
      'Dentro do jogo, F4 abre as configurações, F7 as conquistas e F3 o diagnóstico. A pasta é portátil: saves, configuração e cache de shader ficam todos ali dentro e vão junto se você mover a pasta.',
    ],
    en: [
      'You need your own copy of Silent Hill: Downpour for the Xbox 360 — disc, digital download, or a backup of either. The USA and European regions both work (title id 4B4E0823).',
      'Since version 1.1.7 a plain ISO of your disc is enough: the first-run wizard extracts everything itself and recognises Redump, XGD3 and raw dump layouts. Pre-extracted file trees from older versions keep working.',
      'You need a 64-bit Windows 10 or 11 PC with a Direct3D 12 GPU. The AVX2 requirement was dropped in 1.1.7, so pre-2013 processors boot the game too.',
      'Download the latest release zip and extract it somewhere you can write, for example C:\\Games\\DownpourRecomp.',
      'Start PlayDownpour.exe and hit Play. The wizard asks for your ISO and, when it gets there, for your Title Update 1 file — or it fetches TU1 itself. Extraction is resumable: interrupt it, reopen, and it continues where it stopped.',
      'The first boot compiles the shader library for your GPU vendor; later boots do not repeat it.',
      'In game, F4 opens the settings, F7 the achievements and F3 the diagnostics. The folder is portable: saves, config and the warm shader cache all live inside it and move with it.',
    ],
  },

  'psxrestore/Condemned2Recomp': {
    pt: [
      'Você precisa da sua própria cópia de Condemned 2: Bloodshot do Xbox 360 e precisa extrair dela os dados do jogo — o repositório não distribui nenhum.',
      'O projeto está em andamento e já é jogável, mas espere defeitos e travamentos.',
      'Para compilar, você precisa do ReXGlue SDK, do Visual Studio 2022 com o workload de desenvolvimento desktop em C++, CMake 3.25 ou mais novo, LLVM/Clang 20 ou mais novo, e Ninja.',
      'Clone com --recursive: sem os submódulos a configuração do CMake falha.',
      'No Windows, rode a configuração do preset win-amd64-release, depois o alvo condemned2recomp_codegen, e só então a build completa. O codegen é o passo demorado — ele gera o C++ a partir do binário do jogo antes de qualquer compilação.',
      'A build de Linux existe mas é marcada como não testada.',
      'Os controles de teclado e mouse vêm mapeados: LMB e RMB são os golpes e os tiros, MMB bloqueia, R abre as ferramentas forenses, de 1 a 4 escolhem luz UV, câmera, espectrômetro e GPS, e F4 abre as configurações.',
    ],
    en: [
      'You need your own copy of Condemned 2: Bloodshot for the Xbox 360, and you have to extract the game data from it — the repository distributes none.',
      'The project is a work in progress and already playable, but expect bugs and crashes.',
      'To build it you need the ReXGlue SDK, Visual Studio 2022 with the Desktop development with C++ workload, CMake 3.25 or newer, LLVM/Clang 20 or newer, and Ninja.',
      'Clone with --recursive: without the submodules the CMake configure step fails.',
      'On Windows, configure the win-amd64-release preset, then build the condemned2recomp_codegen target, and only then the full build. Codegen is the slow step — it generates the C++ from the game binary before anything is compiled.',
      'A Linux build exists but is marked untested.',
      'Keyboard and mouse come mapped: LMB and RMB are the swings and the fire buttons, MMB blocks, R opens the forensic tools, 1 to 4 pick the UV light, camera, spectrometer and GPS, and F4 opens the settings.',
    ],
  },

  'JackandBeans/Snap64Recomp': {
    pt: [
      'Você precisa da sua própria ROM do cartucho americano de Pokémon Snap. Só essa serve: as versões japonesa, europeia e australiana são builds diferentes, e o port foi feito a partir da americana. O SHA-1 esperado é edc7c49cc568c045fe48be0d18011c30f393cbaf.',
      'Baixe o zip da página de releases e descompacte onde quiser. Nada precisa ser instalado.',
      'Coloque a ROM ao lado do Snap64Recomp.exe com o nome pokemonsnap.z64 — ou abra o programa sem ela: ele pede o arquivo, confere, e copia para o lugar com esse nome. Ele só pergunta uma vez, e uma ROM errada é recusada com a mensagem do motivo.',
      'Abra o programa. Como ele não é assinado, o Windows pode mostrar o aviso do SmartScreen: clique em Mais informações e depois em Executar assim mesmo. A primeira inicialização demora mais que as seguintes porque o renderizador monta os shaders da sua placa; eles ficam em cache/.',
      'Não existe launcher nem overlay: tudo que o port acrescenta está dentro da tela de Options do próprio jogo. Esc, ou Select no controle, abre por cima de onde você estiver.',
      'Widescreen, taxa de quadros e os outros extras vêm desligados, no que o console fazia. Eles estão em Options > Graphics.',
      'Precisa de Windows 10 (1809 ou mais novo) ou 11 com driver que suporte Direct3D 12 Shader Model 6.3 — driver anterior ao fim de 2018 é velho demais e o port avisa. No Linux e no Steam Deck precisa de Vulkan 1.2, e essas builds são experimentais. Em qualquer caso, processador de 64 bits com SSE4.1.',
    ],
    en: [
      'You need your own ROM of the US Pokémon Snap cartridge. Only that one works: the Japanese, European and Australian releases are different builds of the game, and the port is made from the US one. The expected SHA-1 is edc7c49cc568c045fe48be0d18011c30f393cbaf.',
      'Download the zip from the releases page and unpack it anywhere. Nothing has to be installed.',
      'Put the ROM next to Snap64Recomp.exe named pokemonsnap.z64 — or just start the program without it: it asks for the file, checks it, and copies it into place under that name. It only asks once, and a wrong file is refused with a message saying why.',
      'Start the program. It is not signed, so Windows may show the SmartScreen box: click More info, then Run anyway. The first start takes longer than later ones because the renderer builds the shader programs your GPU needs; they are kept in cache/.',
      'There is no launcher and no overlay: everything the port adds is inside the game own Options screen. Esc, or Select on a pad, opens it over whichever screen you are on.',
      'Widescreen, the frame rate and the other enhancements all start off, set to what the console did. They are under Options > Graphics.',
      'It needs Windows 10 (1809 or newer) or 11 with a driver supporting Direct3D 12 Shader Model 6.3 — a driver from before late 2018 is too old, and the port says so. On Linux and the Steam Deck it needs Vulkan 1.2, and those builds are experimental. Either way, a 64-bit CPU with SSE4.1.',
    ],
  },

  'klorfmorf/Goemon64Recomp': {
    pt: [
      'Você precisa da sua própria cópia da versão norte-americana de Mystical Ninja Starring Goemon. Outras versões podem ganhar suporte no futuro, mas hoje é essa.',
      'Baixe a release para o seu sistema e extraia. No Steam Deck, extraia a build de Linux e, no modo desktop, clique com o botão direito no executável e escolha adicionar ao Steam.',
      'Abra o programa e aponte a sua cópia no menu principal. Não existe etapa separada de extração nem build para fazer: ele carrega os dados direto do arquivo que você indicou.',
      'A máquina precisa de GPU com Direct3D 12.0 (Shader Model 6), Vulkan 1.2, ou Metal com Argument Buffers Tier 2 — na prática, uma GeForce GT 630, uma Radeon HD 7750 de 2012, uma Intel HD 510 ou mais novas. Em x86-64, processador com SSE4.1.',
      'Se ele travar ao iniciar, atualize o driver de vídeo antes de procurar outra causa.',
      'A taxa de quadros por padrão segue o seu monitor, e mudá-la não altera a jogabilidade. Mas limitadores de quadros externos, como o do painel da NVIDIA, causam engasgos conhecidos: desligue-os e use o controle de quadros do menu gráfico de dentro do jogo.',
      'Mods e pacotes de textura entram arrastando os arquivos para a janela antes de começar, ou pelo botão Install Mods no menu de mods.',
    ],
    en: [
      'You need your own copy of the North American version of Mystical Ninja Starring Goemon. Other versions may be supported later, but today it is that one.',
      'Download the release for your system and extract it. On the Steam Deck, extract the Linux build and, in desktop mode, right-click the executable and choose to add it to Steam.',
      'Start the program and point it at your copy in the main menu. There is no separate extraction step and nothing to build: it loads the assets straight from the file you gave it.',
      'The machine needs a GPU supporting Direct3D 12.0 (Shader Model 6), Vulkan 1.2, or Metal Argument Buffers Tier 2 — in practice a GeForce GT 630, a Radeon HD 7750 from 2012, an Intel HD 510 or newer. On x86-64, a CPU with SSE4.1.',
      'If it crashes on startup, update your graphics driver before looking for another cause.',
      'The frame rate follows your monitor by default, and changing it has no effect on gameplay. External frame limiters, such as the NVIDIA Control Panel one, are known to cause stuttering: turn them off and use the frame rate slider in the in-game graphics menu instead.',
      'Mods and texture packs install by dragging the files onto the game window before starting, or through the Install Mods button in the mod menu.',
    ],
  },

  'some-scurvy-dog/banjo-tooie-scurvy-dog-port': {
    pt: [
      'Você precisa da sua própria ROM de Banjo-Tooie, versão NTSC-U 1.0. O jogo não vem incluído.',
      'Isto é um alpha: o projeto está em andamento e o desenho dele ainda muda entre versões.',
      'Baixe o ZIP mais recente da página de releases, extraia tudo numa mesma pasta e abra o BanjoTooieScurvyDogPort.exe. Na primeira execução ele pede a ROM.',
      'A release atual é só para Windows x64.',
      'O guia do jogador, dentro de docs/PLAYER_GUIDE.md no repositório, cobre a ROM aceita, os saves, como trazer um save do Alpha 3, controles e solução de problemas — vale ler antes de reportar qualquer coisa.',
      'Pacotes de textura do RT64 funcionam. Mods de código e patches de ROM não são suportados nesta versão.',
      'O projeto declara que parte substancial do código foi gerada com ferramentas de IA, revisada e testada pelo mantenedor. Ele também não tem ligação com o BanjoRecomp.',
    ],
    en: [
      'You need your own Banjo-Tooie ROM, the NTSC-U 1.0 release. The game is not included.',
      'This is an alpha: the project is a work in progress and its design still changes between releases.',
      'Download the latest ZIP from the releases page, extract all of it into one folder and run BanjoTooieScurvyDogPort.exe. On first launch it asks for your ROM.',
      'The current release is for Windows x64 only.',
      'The player guide, at docs/PLAYER_GUIDE.md in the repository, covers the supported ROM, saves, bringing over an Alpha 3 save, controls and troubleshooting — worth reading before you report anything.',
      'RT64 texture packs work. Code mods and ROM patches are not supported in this release.',
      'The project states that AI tools generated substantial portions of its code, with the maintainer directing development and testing the game. It is also not affiliated with BanjoRecomp.',
    ],
  },

  'murkantor/Project-Midas': {
    pt: [
      'O projeto é um port de PC em andamento, construído a partir da decompilação de GoldenEye 007 do Nintendo 64, e roda no Windows e no Linux.',
      'Você precisa da sua própria imagem do cartucho americano. Para jogar a build pronta, coloque-a na pasta Data ao lado do executável — o Data/README.txt lista os formatos aceitos e as outras formas de apontar o caminho.',
      'Rode o ProjectMidas.exe no Windows ou o ProjectMidas no Linux.',
      'As configurações ficam em midas.ini, criado na primeira execução; apagá-lo restaura os padrões, e o midas_ini_help.txt explica os campos. O save vai para Data/Saves/eeprom.bin, e os binds de teclado e mouse ficam em Data/Devices/kbm.gedevice.',
      'No Windows o jogo não abre console: se algo der errado, o registro está em Data/Logs/ge_direct.log, e um travamento escreve Data/Logs/crash.log.',
      'A pasta Mods existe mas esta build carrega só o cartucho original.',
      'Para compilar do zero, a build roda em Docker e pede o cartucho como baserom.u.z64 na raiz do repositório, com SHA-1 abe01e4aeb033b6c0836819f549c791b26cfde83. No Windows, use WSL e clone dentro do WSL, não em /mnt/c — a diferença de velocidade é grande. A extração dos assets é um passo único e demorado antes da primeira compilação.',
      'O projeto declara uso de IA no desenvolvimento.',
    ],
    en: [
      'The project is a work-in-progress PC port built from the Nintendo 64 GoldenEye 007 decompilation, and it runs on Windows and Linux.',
      'You need your own image of the US cart. To play the prebuilt release, put it in the Data folder next to the executable — Data/README.txt lists the accepted formats and the other ways to point the game at it.',
      'Run ProjectMidas.exe on Windows or ProjectMidas on Linux.',
      'Settings live in midas.ini, written on first run; deleting it restores the defaults, and midas_ini_help.txt explains the fields. The save goes to Data/Saves/eeprom.bin, and keyboard and mouse binds sit in Data/Devices/kbm.gedevice.',
      'On Windows the game opens no console window: if something goes wrong, the run log is at Data/Logs/ge_direct.log, and a crash writes Data/Logs/crash.log.',
      'A Mods folder exists but this build loads the stock cart only.',
      'To build from source, the build runs in Docker and wants the cart as baserom.u.z64 in the repository root, SHA-1 abe01e4aeb033b6c0836819f549c791b26cfde83. On Windows, use WSL and clone inside WSL rather than under /mnt/c — the speed difference is large. Extracting the assets is a one-off slow step before the first build.',
      'The project discloses the use of AI in its development.',
    ],
  },

  'Jorge262007/FFTARecomp': {
    pt: [
      'Você precisa da sua própria ROM de Final Fantasy Tactics Advance. A americana é a de referência; desde a versão 3.0 a ROM europeia também é aceita, e os saves são compatíveis entre regiões.',
      'Baixe o instalador da sua plataforma na página de releases: Windows, Linux ou o instalador dedicado de Steam Deck (o de Linux também funciona lá). Existe ainda uma versão nativa de Android.',
      'Rode o instalador e aponte a ROM. Ele recompila o jogo a partir dela — desde a 3.0 isso leva poucos segundos e ocupa cerca de 11 MB, contra os quase 800 MB e dois minutos das versões anteriores.',
      'Não é preciso BIOS de console: o jogo roda como programa nativo, não em emulador.',
      'Dentro do jogo, Esc abre o menu de opções. Ali ficam widescreen (Auto, 16:10, 16:9, 20:9, 21:9 e 32:9), zoom, modelo de tela, grade, escala, vsync, áudio e avanço rápido.',
      'O modo de áudio normal mantém a música na velocidade certa enquanto o jogo avança rápido — é o que a maioria quer no avanço rápido.',
      'Mouse e teclado existem mas são experimentais e ainda não cobrem o jogo todo: ligue em Input > Mouse and Keyboard. No Android, os controles de toque ficam em Input > Touchscreen > Touch Controls.',
    ],
    en: [
      'You need your own Final Fantasy Tactics Advance ROM. The USA release is the reference one; since version 3.0 the European ROM is accepted too, and saves are compatible between regions.',
      'Download the installer for your platform from the releases page: Windows, Linux, or the dedicated Steam Deck installer (the Linux one also works there). There is a native Android version as well.',
      'Run the installer and point it at your ROM. It recompiles the game from it — since 3.0 that takes a few seconds and about 11 MB, against the roughly 800 MB and two minutes of earlier versions.',
      'No console BIOS is needed: the game runs as a native program, not in an emulator.',
      'In game, Esc opens the options menu. That is where widescreen lives (Auto, 16:10, 16:9, 20:9, 21:9 and 32:9), along with zoom, screen model, grid, scaling, vsync, audio and fast forward.',
      'Normal audio mode keeps the music at its proper speed while the game fast-forwards — which is what most people want from fast forward.',
      'Mouse and keyboard exist but are experimental and do not cover the whole game yet: turn them on under Input > Mouse and Keyboard. On Android, the touch controls are under Input > Touchscreen > Touch Controls.',
    ],
  },

  'Unchiga/YuGiOhForbiddenMemoriesRecomp': {
    pt: [
      'Antes de qualquer coisa: este repositório foi aposentado. O desenvolvimento continua em Unchiga/Yu-Gi-Oh-Forbidden-Memories-Recompiled, agora como port nativo feito a partir da decompilação em vez de recompilação estática do código MIPS. Aqui as releases param na v0.6.2.',
      'Você precisa da sua própria cópia de Yu-Gi-Oh! Forbidden Memories, versão americana SLUS-01411. É a única suportada.',
      'Nem o repositório nem os downloads trazem código ou dados do jogo: a sua cópia é verificada e recompilada na sua máquina, na primeira execução.',
      'Não é preciso BIOS de PlayStation: o projeto já vem com o OpenBIOS.',
      'Extraia a release por cima de uma instalação existente para manter saves, save states e configurações.',
      'Dentro do jogo, F10 abre a barra de menus, e por VIEW > FM EDITOR se chega ao editor de cartas, tabelas de drop, fusões, diálogo e duelistas da CPU.',
      'Netplay existe, para dois jogadores. Para releases novas, mods e correções, vá ao repositório novo.',
    ],
    en: [
      'First things first: this repository has been retired. Development continues at Unchiga/Yu-Gi-Oh-Forbidden-Memories-Recompiled, now as a native port built from the decompilation rather than a static recompilation of the MIPS code. Releases here stop at v0.6.2.',
      'You need your own copy of Yu-Gi-Oh! Forbidden Memories, the USA release SLUS-01411. It is the only supported one.',
      'Neither the repository nor its downloads carry game code or data: your copy is verified and recompiled locally on the first run.',
      'No PlayStation BIOS is needed: the project bundles OpenBIOS.',
      'Extract a release over an existing install to keep your saves, save states and settings.',
      'In game, F10 opens the menu bar, and VIEW > FM EDITOR gets you to the editor for cards, drop tables, fusions, dialogue and CPU duelists.',
      'Netplay exists, for two players. For new releases, mods and fixes, go to the new repository.',
    ],
  },

  'sonicfreak1337/SARecomp': {
    pt: [
      'Você precisa da sua própria cópia da versão de Dreamcast de Sonic Adventure, e a revisão importa: o instalador exige a PAL v1.003 de 1999.',
      'Mantenha o .gdi junto de todas as trilhas dele, com os nomes de arquivo que o descritor cita. Extraia qualquer arquivo compactado antes de selecionar — selecionar um .zip é o erro que mais aparece aqui.',
      'Baixe o pacote da sua plataforma na página de releases: instalador .exe no Windows, AppImage no Linux e um AppImage específico de Steam Deck. Os ZIPs de código-fonte do GitHub não são instaladores de jogador.',
      'No Windows, rode o setup e selecione o seu .gdi; depois abra o Sonic Adventure Recompiled. O setup é em inglês, mas o idioma de texto e de voz do jogo muda nas Opções.',
      'No Linux, guarde o AppImage numa pasta permanente, marque como executável e rode como usuário normal — não precisa de sudo.',
      'No Steam Deck, rode o setup em Modo Desktop, adicione o AppImage ao Steam e jogue em Gaming Mode. Não force Proton.',
      'Isto é um beta: as sete histórias são jogáveis do começo ao fim, e o trabalho atual é polimento, compatibilidade e desempenho. O guia completo de instalação, com os hashes de disco, está em docs/INSTALLATION.md.',
    ],
    en: [
      'You need your own copy of the Dreamcast version of Sonic Adventure, and the revision matters: the installer requires PAL v1.003 (1999).',
      'Keep the .gdi together with all of its track files, under the filenames the descriptor references. Extract any archives before selecting — picking a .zip is the mistake that comes up most here.',
      'Download the package for your platform from the releases page: a .exe installer on Windows, an AppImage on Linux, and a separate Steam Deck AppImage. GitHub source-code ZIPs are not player installers.',
      'On Windows, run setup and select your .gdi, then launch Sonic Adventure Recompiled. Setup is in English, but the in-game text and voice languages change in Options.',
      'On Linux, keep the AppImage in a permanent folder, make it executable and run it as your normal user — no sudo needed.',
      'On the Steam Deck, run setup in Desktop Mode, add the AppImage to Steam, then play in Gaming Mode. Do not force Proton.',
      'This is a beta: all seven stories are playable from start to finish, and current work is polish, compatibility and performance. The full installation guide, with the disc hashes, is at docs/INSTALLATION.md.',
    ],
  },

  'pablocpas/OpenCMR2': {
    pt: [
      'Você precisa da sua própria cópia da versão de PC de Colin McRae Rally 2.0, de 2000 — é dela que o port parte, não de uma versão de console.',
      'Baixe o pacote da sua plataforma na página de releases: Windows x64, Linux x86-64, Linux ARM64, Linux 32 bits, macOS Apple Silicon ou o APK de Android.',
      'Extraia e rode o opencmr2. Na primeira execução ele abre um seletor de pasta: aponte a instalação do jogo. A própria pasta, uma pasta dentro dela ou a pasta acima dela — qualquer uma serve. O caminho é verificado e guardado, e os arquivos ficam onde estão.',
      'Se você tem só o CD ou uma ISO, instale ou extraia o jogo antes: o OpenCMR2 lê as pastas instaladas Game, FrontEnd, Sounds, CountrySpecific e SetupRep, e não inicia se faltar uma. É aqui que trava quem aponta direto para a imagem de disco.',
      'Dá para pular o diálogo apontando a instalação por --data <pasta>, pela variável de ambiente OPENCMR2_DATA, por [paths] data no opencmr2.ini, ou copiando os arquivos para uma pasta Data ao lado do executável.',
      'Alt+Enter alterna tela cheia e janela, e o estado é salvo. As melhorias do SilentPatch já vêm embutidas: widescreen com perspectiva correta em vez de imagem esticada, campo de visão configurável, e quadros altos ou variáveis sem alterar a velocidade do jogo nem a física.',
      'No macOS o pacote não é assinado: rode xattr -dr com.apple.quarantine na pasta extraída uma vez. No Android, copie a instalação para o aparelho e escolha a pasta no seletor do sistema — os arquivos são copiados para dentro do app uma vez, cerca de 700 MB.',
    ],
    en: [
      'You need your own copy of the PC version of Colin McRae Rally 2.0, from 2000 — that is what the port is built from, not a console release.',
      'Download the package for your platform from the releases page: Windows x64, Linux x86-64, Linux ARM64, Linux 32-bit, macOS Apple Silicon, or the Android APK.',
      'Extract it and run opencmr2. On first launch it opens a folder dialog: point it at your game installation. The installation itself, a folder inside it or a parent folder all work. The location is checked and remembered, and the game files stay where they are.',
      'If you only have the CD or an ISO, install or extract the game first: OpenCMR2 reads the installed folders Game, FrontEnd, Sounds, CountrySpecific and SetupRep, and does not start when one is missing. This is where people who point it straight at a disc image get stuck.',
      'You can skip the dialog by passing --data <dir>, setting the OPENCMR2_DATA environment variable, setting [paths] data in opencmr2.ini, or copying the files into a Data folder next to the executable.',
      'Alt+Enter switches between fullscreen and a window, and the choice is saved. The SilentPatch improvements are built in: widescreen with the correct perspective instead of a stretched picture, a configurable field of view, and high or variable frame rates without changing the game speed or the physics.',
      'On macOS the package is not signed: run xattr -dr com.apple.quarantine on the extracted folder once. On Android, copy the installation to the device and pick it in the system folder picker — the files are copied into the app once, about 700 MB.',
    ],
  },

  'dk8827/ra-port': {
    pt: [
      'Este é um source port nativo de Command & Conquer: Red Alert para macOS, Linux, Android e iOS — não existe build de Windows aqui, e nem releases prontas: você compila.',
      'Ele parte do código que a Electronic Arts liberou sob GPLv3 com termos adicionais. Nenhum dado de jogo vem no repositório: você precisa dos arquivos do seu próprio Red Alert, dos dois discos (Allied e Soviet).',
      'No macOS, instale as ferramentas com brew install cmake ninja pkg-config sdl2 e xcode-select --install, depois configure com CMake usando Ninja e compile o alvo redalert_mac.',
      'No Ubuntu, instale build-essential, cmake, ninja-build, pkg-config e libsdl2-dev, e compile o alvo redalert_linux.',
      'Prepare os dados com scripts/prepare_assets_from_local.sh passando --allies e --soviet apontando as pastas de cada disco. Sem os dois, as campanhas não ficam completas.',
      'Rode com scripts/run_mac_dev.sh --no-build ou scripts/run_linux_dev.sh --no-build.',
      'Campanhas Aliada e Soviética, escaramuça local e vídeos com som funcionam. Multiplayer em rede ainda não está ligado, os pacotes de expansão não são foco, e não existe bundle .app: a build gera um executável comum. Android e iOS saem só como builds de debug locais.',
    ],
    en: [
      'This is a native source port of Command & Conquer: Red Alert for macOS, Linux, Android and iOS — there is no Windows build here, and no prebuilt releases either: you compile it.',
      'It is based on the code Electronic Arts released under GPLv3 with additional terms. No game data ships in the repository: you need the files from your own Red Alert, from both discs (Allied and Soviet).',
      'On macOS, install the tools with brew install cmake ninja pkg-config sdl2 and xcode-select --install, then configure with CMake using Ninja and build the redalert_mac target.',
      'On Ubuntu, install build-essential, cmake, ninja-build, pkg-config and libsdl2-dev, and build the redalert_linux target.',
      'Prepare the data with scripts/prepare_assets_from_local.sh, passing --allies and --soviet pointed at each disc folder. Without both, the campaigns are incomplete.',
      'Run it with scripts/run_mac_dev.sh --no-build or scripts/run_linux_dev.sh --no-build.',
      'The Allied and Soviet campaigns, local skirmish and videos with sound all work. Network multiplayer is not wired up yet, the expansion packs are not a focus, and there is no .app bundle: the build produces a plain executable. Android and iOS exist only as local debug builds.',
    ],
  },

  'dk8827/cnc-port': {
    pt: [
      'Este é um source port nativo do Command & Conquer original (Tiberian Dawn) feito para macOS, com builds de debug de Android e iOS para desenvolvimento. Não há releases prontas: você compila.',
      'Ele parte do código que a Electronic Arts liberou sob GPLv3 com termos adicionais. O repositório não traz dados de jogo.',
      'Os dados que ele espera são os do C&C Gold, que a EA liberou como freeware, nas duas campanhas: GDI e Nod.',
      'No macOS, instale as ferramentas com brew install cmake ninja pkg-config sdl2 e xcode-select --install, configure com CMake usando Ninja e compile o alvo cnc_mac.',
      'Prepare os dados locais com o script do repositório antes de rodar, seguindo as instruções da seção de dados do jogo no README.',
      'Menu principal, jogo tático, vídeos, teclado, mouse e toque já funcionam. O que ainda não: missões avançadas, saves e menus menos comuns precisam de teste mais amplo, não existem pacotes distribuíveis, e multiplayer em rede está fora do marco atual.',
    ],
    en: [
      'This is a native source port of the original Command & Conquer (Tiberian Dawn) aimed at macOS, with Android and iOS debug builds for development. There are no prebuilt releases: you compile it.',
      'It is based on the code Electronic Arts released under GPLv3 with additional terms. The repository carries no game data.',
      'The data it expects is the C&C Gold data EA released as freeware, for both campaigns: GDI and Nod.',
      'On macOS, install the tools with brew install cmake ninja pkg-config sdl2 and xcode-select --install, configure with CMake using Ninja and build the cnc_mac target.',
      'Prepare your local game data with the repository script before running, following the game data section of the README.',
      'The title menu, the tactical game, movies, keyboard, mouse and touch input all work. What does not yet: later missions, saves and unusual menus still need wider testing, there are no distributable packages, and network multiplayer is outside the current milestone.',
    ],
  },

  'zeldaret/mm': {
    pt: [
      'Antes de tudo: isto é uma decompilação, não um port jogável. O próprio projeto diz que não produz, e não vai produzir, um port de PC. Não existe executável para baixar e jogar.',
      'O que ele faz é reconstruir o código-fonte de Majora\'s Mask a partir do binário, para que a compilação devolva uma ROM idêntica à original.',
      'A única versão suportada hoje é a americana de Nintendo 64. A intenção é cobrir as outras versões de varejo com o tempo — mas não as de Majora\'s Mask 3D, que é outro jogo.',
      'O repositório não inclui assets nem assembly: compilar exige a sua própria cópia do jogo, de onde os dados são extraídos.',
      'A compilação devolve mm-n64-us.z64 (MD5 f46493eaa0628827dbd6ad3ecd8d65d6) e a versão comprimida mm-n64-us-compressed.z64 (MD5 2a0a8acb61538235bc1094d297fb6556). Conferir esses MD5 é como você sabe que deu certo.',
      'Os passos de ambiente ficam na seção Installation do README, por sistema operacional, e mudam com frequência — siga o README em vez de um passo a passo decorado.',
      'O código ainda está em movimento: partes da ROM não são "shiftable", então modificar certas áreas hoje é difícil, e a estrutura pode mudar sem aviso. Para jogar Majora\'s Mask no PC, o que existe é o 2 Ship 2 Harkinian, que é outro projeto deste catálogo.',
    ],
    en: [
      'First things first: this is a decompilation, not a playable port. The project states outright that it does not, and will not, produce a PC port. There is no executable to download and play.',
      'What it does is rebuild the source code of Majora\'s Mask from the binary, so that compiling it returns a ROM identical to the original.',
      'The only version supported today is the N64 US release. The intent is to cover the other retail versions over time — but not Majora\'s Mask 3D, which is a different game.',
      'The repository includes no assets and no assembly: building requires your own copy of the game, which the data is extracted from.',
      'A build returns mm-n64-us.z64 (MD5 f46493eaa0628827dbd6ad3ecd8d65d6) and the compressed mm-n64-us-compressed.z64 (MD5 2a0a8acb61538235bc1094d297fb6556). Checking those MD5s is how you know it worked.',
      'The environment steps live in the README Installation section, per operating system, and they change often — follow the README rather than a memorised recipe.',
      'The code is still moving: parts of the ROM are not yet shiftable, so modifying certain areas is currently hard, and the structure can change without warning. To play Majora\'s Mask on PC, what exists is 2 Ship 2 Harkinian, a different project in this catalog.',
    ],
  },

  'zeldaret/botw': {
    pt: [
      'Antes de tudo: isto é uma decompilação experimental e em andamento, não um port. O próprio repositório diz que não contém assets nem conteúdo de RomFS e que não pode ser usado para jogar Breath of the Wild.',
      'O alvo é a versão 1.5.0 de Switch.',
      'O objetivo declarado é entender o funcionamento interno do jogo, ajudar na caça a glitches e registrar o conhecimento existente de forma permanente e sem ambiguidade — não entregar um executável.',
      'O progresso, em porcentagem de código e de funções, fica na página do projeto, botw.link, que também é onde está a documentação para quem quer contribuir.',
      'Se você chegou aqui procurando Breath of the Wild no PC, este projeto não é o caminho. Ele serve a quem quer ler e entender o código.',
    ],
    en: [
      'First things first: this is an experimental, work-in-progress decompilation, not a port. The repository says plainly that it contains no game assets or RomFS content and cannot be used to play Breath of the Wild.',
      'The target is version 1.5.0 on Switch.',
      'Its stated goal is to understand the game internals, aid glitch hunting and document existing knowledge in a permanent, unambiguous form — not to produce an executable.',
      'Progress, as a percentage of code and of functions, lives on the project site, botw.link, which is also where the contributor documentation is.',
      'If you came here looking for Breath of the Wild on PC, this project is not the route. It serves people who want to read and understand the code.',
    ],
  },

  'shdecompilations/silent-hill-decomp': {
    pt: [
      'Antes de tudo: isto é uma decompilação, e o projeto afirma explicitamente que não produz, e não vai produzir, um port — para PC ou qualquer outra plataforma. O código não está pronto para ser portado: falta documentação e ele é reorganizado constantemente.',
      'O que ele faz é reconstruir o código do Silent Hill de PlayStation 1 em C, de modo que a compilação devolva um binário idêntico ao original.',
      'A porcentagem de progresso mede quanto do código compilado já foi "matched" — isto é, quanto do C escrito compila para um resultado idêntico ao assembly original. Chegar a 100% é o fim da primeira fase, não do projeto.',
      'Depois disso ainda vêm nomear funções e variáveis que hoje têm nomes gerados como func_80241A30, transformar dados binários crus em structs de C, tornar a build independente de endereços fixos, e documentar como os sistemas se encaixam.',
      'Há vários rastreadores de progresso porque o jogo distribui a lógica em muitos overlays binários separados; o executável principal na release NTSC 1.1 é o SLUS_007.07, e ele serve sobretudo como gerenciador de memória.',
      'O projeto é tocado à mão: a equipe declara que nenhum código de jogo gerado por IA entrou na decompilação.',
      'Forks podem portar ou acrescentar recursos, mas a decompilação em si segue humana. Se você quer jogar, este repositório não é o caminho.',
    ],
    en: [
      'First things first: this is a decompilation, and the project states explicitly that it does not, and will not, produce a port — to PC or any other platform. The codebase is not port-ready: documentation is missing and it is reorganised constantly.',
      'What it does is rebuild the PlayStation 1 Silent Hill code in C, so that compiling it returns a binary identical to the original.',
      'The progress percentage measures how much of the compiled code has been matched — how much of the written C compiles to output identical to the original assembly. Reaching 100% is the end of the first phase, not of the project.',
      'After that still come naming the functions and variables that today carry generated names like func_80241A30, turning raw binary data into proper C structs, making the build independent of hardcoded addresses, and documenting how the systems fit together.',
      'There are several progress trackers because the game spreads its logic across many separate binary overlays; the main executable on the NTSC 1.1 release is SLUS_007.07, and it mostly serves as a memory handler.',
      'The project is human-driven: the team states that no AI-generated game code has knowingly gone into the decompilation.',
      'Forks may port it or add features, but the decompilation itself stays human-led. If you want to play, this repository is not the route.',
    ],
  },

  'Xeeynamo/sotn-decomp': {
    pt: [
      'Antes de tudo: isto é uma decompilação em andamento, não um port pronto para jogar. Ela reconstrói o código de Symphony of the Night a partir dos binários, e compila byte a byte para os mesmos binários do jogo.',
      'As versões suportadas hoje são quatro: us, a build de referência de PlayStation 1 com serial SLUS-00067; hd, uma build japonesa de PS1 nunca lançada, encontrada nos dados de Dracula X Chronicles; pspeu, a build europeia de Dracula X Chronicles; e saturn, o port feito por uma equipe externa.',
      'O repositório não inclui assets nem o assembly necessário para compilar: é preciso ter a sua própria cópia do jogo, da qual os assets são extraídos.',
      'Os passos de compilação ficam no wiki do projeto, na página Build, e o guia de decompilação na página Decompilation. Siga-os de lá: eles acompanham o estado atual do repositório.',
      'O progresso por versão fica em sotn.xee.dev e também no decomp.dev.',
      'Se você quer contribuir, o projeto pede justamente isso: a decompilação é trabalho longo e manual, e noções básicas de programação já bastam para começar.',
    ],
    en: [
      'First things first: this is a work-in-progress decompilation, not a ready-to-play port. It rebuilds the Symphony of the Night code from the binaries, and compiles byte-for-byte to the same binaries as the game.',
      'Four versions are supported today: us, the PlayStation 1 reference build with serial SLUS-00067; hd, an unreleased PS1 Japanese build found in the Dracula X Chronicles game data; pspeu, the European build from Dracula X Chronicles; and saturn, the port made by an external team.',
      'The repository includes neither assets nor the assembly needed to compile: a prior copy of the game is required, and the assets are extracted from it.',
      'The build steps live in the project wiki, on the Build page, and the decompilation guide on the Decompilation page. Follow them there: they track the current state of the repository.',
      'Per-version progress is at sotn.xee.dev and on decomp.dev.',
      'If you want to contribute, that is exactly what the project asks for: decompiling is long, manual work, and basic programming skills are enough to start.',
    ],
  },

  'pret/pokefirered': {
    pt: [
      'Antes de tudo: isto é uma decompilação de Pokémon FireRed e LeafGreen em inglês, não um port de PC. O que ela produz são ROMs de Game Boy Advance, não um executável.',
      'Compilando, saem seis ROMs, cada uma com o SHA-1 documentado no README: pokefirered.gba, pokeleafgreen.gba, as revisões rev1 das duas, e as versões switch das duas. Comparar o SHA-1 é como você confirma que a build está correta.',
      'O repositório não traz dados do jogo: você precisa da sua própria cópia para extrair o que falta.',
      'Os passos de ambiente ficam no INSTALL.md do repositório, por sistema operacional. Use-o em vez de um passo a passo decorado: a toolchain da pret muda com o tempo.',
      'A utilidade prática disso é modding: com o código reconstruído, hacks de ROM deixam de depender de edição binária.',
      'Para contatos e os outros projetos da pret, a referência é pret.github.io.',
    ],
    en: [
      'First things first: this is a decompilation of English Pokémon FireRed and LeafGreen, not a PC port. What it produces are Game Boy Advance ROMs, not an executable.',
      'Building it yields six ROMs, each with its SHA-1 documented in the README: pokefirered.gba, pokeleafgreen.gba, the rev1 revisions of both, and the switch versions of both. Comparing the SHA-1 is how you confirm the build is correct.',
      'The repository carries no game data: you need your own copy to extract what is missing.',
      'The environment steps live in the repository INSTALL.md, per operating system. Use it rather than a memorised recipe: the pret toolchain changes over time.',
      'The practical use of this is modding: with the source rebuilt, ROM hacks no longer depend on binary editing.',
      'For contacts and the other pret projects, the reference is pret.github.io.',
    ],
  },

  'pret/pokeruby': {
    pt: [
      'Antes de tudo: isto é uma disassembly de Pokémon Ruby e Sapphire, não um port de PC. O resultado são ROMs de Game Boy Advance.',
      'Compilando, saem pokeruby.gba (SHA-1 f28b6ffc97847e94a6c21a63cacf633ee5c8df1e) e pokesapphire.gba (SHA-1 3ccbbd45f8553c36463f13b938e833f652b793e4). Conferir esses hashes é a prova de que a build saiu certa.',
      'O repositório não traz dados do jogo: a sua própria cópia é necessária.',
      'Os passos de configuração ficam no INSTALL.md do repositório. Siga-os de lá.',
      'Note que a pret mantém também o pokeemerald, que é a decompilação mais completa da mesma geração e costuma ser a base recomendada para quem quer modificar.',
      'Para contatos e os outros projetos da pret, a referência é pret.github.io.',
    ],
    en: [
      'First things first: this is a disassembly of Pokémon Ruby and Sapphire, not a PC port. What comes out are Game Boy Advance ROMs.',
      'Building it yields pokeruby.gba (SHA-1 f28b6ffc97847e94a6c21a63cacf633ee5c8df1e) and pokesapphire.gba (SHA-1 3ccbbd45f8553c36463f13b938e833f652b793e4). Checking those hashes is the proof the build came out right.',
      'The repository carries no game data: your own copy is required.',
      'The setup steps live in the repository INSTALL.md. Follow them there.',
      'Note that pret also maintains pokeemerald, the more complete decompilation of the same generation, which is usually the recommended base for modding.',
      'For contacts and the other pret projects, the reference is pret.github.io.',
    ],
  },

  'pret/pokeheartgold': {
    pt: [
      'Antes de tudo: isto é uma disassembly em andamento de Pokémon HeartGold e SoulSilver, não um port de PC. O resultado são ROMs de Nintendo DS.',
      'O próprio repositório avisa que está em estado instável: nomes de símbolo e estrutura do código mudam drasticamente e sem aviso. Se você usar isso como base de um mod, o risco é seu.',
      'Como a ROM não está totalmente decompilada, qualquer modificação que mude o tamanho ou o layout de uma função ou estrutura de dados pode travar o jogo. Esse é o problema concreto que mais aparece aqui.',
      'Compilando, saem pokeheartgold.us.nds (SHA-1 4fcded0e2713dc03929845de631d0932ea2b5a37) e pokesoulsilver.us.nds (SHA-1 f8dc38ea20c17541a43b58c5e6d18c1732c7e582).',
      'Os passos de configuração ficam no INSTALL.md do repositório.',
      'Para contatos e os outros projetos da pret, a referência é pret.github.io.',
    ],
    en: [
      'First things first: this is a work-in-progress disassembly of Pokémon HeartGold and SoulSilver, not a PC port. What comes out are Nintendo DS ROMs.',
      'The repository itself warns that it is in an unstable state: symbol names and code structure change drastically and without warning. If you use this as a base for your own mods, you accept the risk.',
      'Because the ROM is not fully decompiled, any modification that affects the size or layout of a function or data structure can crash the game. That is the concrete problem that comes up most here.',
      'Building it yields pokeheartgold.us.nds (SHA-1 4fcded0e2713dc03929845de631d0932ea2b5a37) and pokesoulsilver.us.nds (SHA-1 f8dc38ea20c17541a43b58c5e6d18c1732c7e582).',
      'The setup steps live in the repository INSTALL.md.',
      'For contacts and the other pret projects, the reference is pret.github.io.',
    ],
  },

  'pret/pokeplatinum': {
    pt: [
      'Antes de tudo: isto é uma decompilação em andamento de Pokémon Platinum, não um port de PC. O resultado são ROMs de Nintendo DS.',
      'Compilando, saem duas revisões da ROM americana: a Rev 1, com SHA-1 0862ec35b24de5c7e2dcb88c9eea0873110d755c, e a Rev 0, com SHA-1 ce81046eda7d232513069519cb2085349896dec7. Saber qual revisão você tem importa — o hash é o que diz.',
      'O repositório não traz dados do jogo: a sua própria cópia é necessária.',
      'Os passos de configuração ficam no INSTALL.md do repositório, e quem quer contribuir encontra as regras no CONTRIBUTING.md.',
      'Para contatos e os outros projetos da pret, a referência é pret.github.io.',
    ],
    en: [
      'First things first: this is a work-in-progress decompilation of Pokémon Platinum, not a PC port. What comes out are Nintendo DS ROMs.',
      'Building it yields two revisions of the US ROM: Rev 1, SHA-1 0862ec35b24de5c7e2dcb88c9eea0873110d755c, and Rev 0, SHA-1 ce81046eda7d232513069519cb2085349896dec7. Knowing which revision you have matters — the hash is what tells you.',
      'The repository carries no game data: your own copy is required.',
      'The setup steps live in the repository INSTALL.md, and contributors will find the rules in CONTRIBUTING.md.',
      'For contacts and the other pret projects, the reference is pret.github.io.',
    ],
  },

  'pret/pokediamond': {
    pt: [
      'Antes de tudo: isto é uma decompilação em andamento de Pokémon Diamond, não um port de PC. O resultado são ROMs de Nintendo DS.',
      'Compilando, saem pokediamond.us.nds (SHA-1 a46233d8b79a69ea87aa295a0efad5237d02841e) e pokepearl.us.nds (SHA-1 99083bf15ec7c6b81b4ba241ee10abd9e80999ac). As duas versões saem da mesma build.',
      'O repositório não traz dados do jogo: a sua própria cópia é necessária.',
      'Os passos de configuração ficam no INSTALL.md do repositório, e as instruções para contribuir no CONTRIBUTING.md.',
      'Para contatos e os outros projetos da pret, a referência é pret.github.io.',
    ],
    en: [
      'First things first: this is a work-in-progress decompilation of Pokémon Diamond, not a PC port. What comes out are Nintendo DS ROMs.',
      'Building it yields pokediamond.us.nds (SHA-1 a46233d8b79a69ea87aa295a0efad5237d02841e) and pokepearl.us.nds (SHA-1 99083bf15ec7c6b81b4ba241ee10abd9e80999ac). Both versions come out of the same build.',
      'The repository carries no game data: your own copy is required.',
      'The setup steps live in the repository INSTALL.md, and the contributor instructions in CONTRIBUTING.md.',
      'For contacts and the other pret projects, the reference is pret.github.io.',
    ],
  },

  'SAT-R/sa2': {
    pt: [
      'Este é um projeto duplo: a decompilação de Sonic Advance 1 e 2 e, saindo da mesma base de código, ports de PC de verdade. Mas não há executável pronto para baixar — você compila.',
      'Você precisa da sua própria ROM, e a região importa por alvo: sa1.gba é a europeia (SHA-1 eb00f101af23d728075ac2117e27ecd8a4b4c3e9) e sa2.gba é a americana (SHA-1 7bcd6a07af7c894746fa28073fe0c0e34408022d). Há também alvos para as versões europeia, japonesa, Virtual Console japonesa e a beta de 2002 do SA2.',
      'Os ports jogáveis vêm de alvos próprios do make: sdl para Linux e macOS, sdl_win32 para Windows, ps2 para PlayStation 2 (exige o PS2DEV) e sdl_psp para PSP (exige o PSPDEV). O alvo win32, em OpenGL, está marcado como não funcional.',
      'Compilado como port, o jogo sai em widescreen, a 426x240.',
      'Os passos de configuração do repositório ficam no INSTALL.md. Siga-os de lá.',
      'A build do SA2 é 100% a partir de arquivos C, com cerca de 60 funções que ainda não dão match. Mais de 600 funções seguem sem nome, então o código é navegável mas não está documentado.',
      'Se você pensa em contribuir, note a política do projeto: nada de LLM em issues nem em pull requests. O projeto existe como exercício de aprendizado humano.',
    ],
    en: [
      'This is two projects in one: the decompilation of Sonic Advance 1 and 2 and, out of the same codebase, actual PC ports. But there is no prebuilt executable to download — you build it.',
      'You need your own ROM, and the region matters per target: sa1.gba is the European release (SHA-1 eb00f101af23d728075ac2117e27ecd8a4b4c3e9) and sa2.gba is the US one (SHA-1 7bcd6a07af7c894746fa28073fe0c0e34408022d). There are also targets for the European, Japanese, Japanese Virtual Console and 2002 beta builds of SA2.',
      'The playable ports come from their own make targets: sdl for Linux and macOS, sdl_win32 for Windows, ps2 for the PlayStation 2 (needs PS2DEV) and sdl_psp for the PSP (needs PSPDEV). The win32 OpenGL target is marked non-functional.',
      'Built as a port, the game comes out widescreen, at 426x240.',
      'The repository setup steps live in INSTALL.md. Follow them there.',
      'The SA2 build is 100% from C files, with around 60 functions that still do not match. Over 600 functions remain unnamed, so the code is navigable but not documented.',
      'If you are thinking of contributing, note the project policy: no LLMs in issues and none in pull requests. The project exists as a human learning exercise.',
    ],
  },

  'GensokyoClub/th06': {
    pt: [
      'Antes de tudo: o ramo principal deste projeto é uma reconstrução do código-fonte original, não um port. Para uma versão jogável em Linux e Windows moderno, o que existe é o ramo portable do mesmo repositório.',
      'Você precisa da sua própria cópia do executável original, 東方紅魔郷.exe, versão 1.02h. O SHA-256 esperado é 9f76483c46256804792399296619c1274363c31cd8f1775fafb55106fb852245 — no Windows, confira com certutil -hashfile <arquivo> SHA256.',
      'Copie esse executável para resources/th06.exe dentro do repositório. É esse o passo que falta quando a build não encontra nada.',
      'O ambiente de build é peculiar: ele é montado em cima do Visual Studio 2002 e do DirectX 8.0 recuperados do Web Archive. O script scripts/create_devenv.py baixa e instala compilador, bibliotecas e ferramentas por você.',
      'Precisa de Python 3.4 ou mais novo. No Linux e no macOS, também msiextract e wine — no macOS, prefira o CrossOver, para evitar problemas de heap do CL.EXE. Nesses sistemas, rode scripts/create_th06_prefix no lugar.',
      'Depois disso, python3 ./scripts/build.py gera o build.ninja e roda a build.',
      'Para comparar o resultado com o binário original, o projeto usa o reccmp, que gera um relatório de precisão em HTML. É assim que o progresso é medido.',
    ],
    en: [
      'First things first: this project main branch is a reconstruction of the original source code, not a port. For a version that runs on Linux and modern Windows, what exists is the portable branch of the same repository.',
      'You need your own copy of the original executable, 東方紅魔郷.exe, version 1.02h. The expected SHA-256 is 9f76483c46256804792399296619c1274363c31cd8f1775fafb55106fb852245 — on Windows, check it with certutil -hashfile <file> SHA256.',
      'Copy that executable to resources/th06.exe inside the repository. That is the step that is missing when the build finds nothing.',
      'The build environment is unusual: it is assembled on top of Visual Studio 2002 and DirectX 8.0 recovered from the Web Archive. The scripts/create_devenv.py script downloads and installs the compiler, libraries and tools for you.',
      'You need Python 3.4 or newer. On Linux and macOS, also msiextract and wine — on macOS prefer CrossOver, to avoid CL.EXE heap problems. On those systems, run scripts/create_th06_prefix instead.',
      'After that, python3 ./scripts/build.py generates build.ninja and runs the build.',
      'To compare the result with the original binary, the project uses reccmp, which produces an HTML accuracy report. That is how progress is measured.',
    ],
  },

  'projectPiki/pikmin2': {
    pt: [
      'Antes de tudo: isto é uma decompilação em andamento de Pikmin 2, não um port de PC. O que ela produz é o main.dol do GameCube, que você roda num emulador como o Dolphin.',
      'Você precisa da sua própria cópia do jogo. As versões suportadas são GPVE01 (varejo americano), GPVE01_D17 e GPVE01_D18 (demos americanas), GPVP01 (PAL) e GPVJ01 (japonesa).',
      'O passo que trava a maioria: você não copia a imagem de disco, você extrai os dados de sistema dela. No Dolphin, clique com o botão direito no jogo, vá em Properties, aba Filesystem, clique com o botão direito em Disc e escolha Extract System Data.',
      'Extraia para a pasta da sua versão — orig/GPVE01 para a americana. Depois disso o arquivo orig/GPVE01/sys/main.dol precisa existir; se não existir, a extração não foi a certa.',
      'Instale Python e ninja no PATH. No Windows, use as ferramentas nativas: WSL e msys2 não são necessários, e sob WSL o objdiff não recebe notificações do sistema de arquivos. No macOS, precisa do wine-crossover; no Linux x86, o wibo é baixado automaticamente.',
      'Rode python configure.py (com --version para outra release) e depois ninja.',
      'A build americana com --non-matching é, pelo melhor conhecimento do projeto, funcionalmente equivalente e compila inteira a partir dos arquivos C++ — é essa a build que serve para mod. Ela desliga a verificação final de hash, então não espere o hash bater.',
    ],
    en: [
      'First things first: this is a work-in-progress decompilation of Pikmin 2, not a PC port. What it produces is the GameCube main.dol, which you run in an emulator such as Dolphin.',
      'You need your own copy of the game. The supported versions are GPVE01 (US retail), GPVE01_D17 and GPVE01_D18 (US demos), GPVP01 (PAL) and GPVJ01 (Japan).',
      'The step that trips most people up: you do not copy the disc image, you extract its system data. In Dolphin, right-click the game, go to Properties, the Filesystem tab, right-click Disc and choose Extract System Data.',
      'Extract into your version folder — orig/GPVE01 for the US release. Afterwards the file orig/GPVE01/sys/main.dol must exist; if it does not, you extracted the wrong thing.',
      'Install Python and ninja on your PATH. On Windows use native tooling: WSL and msys2 are not required, and under WSL objdiff cannot get filesystem notifications. On macOS you need wine-crossover; on Linux x86, wibo is downloaded for you.',
      'Run python configure.py (with --version for another release), then ninja.',
      'The US build with --non-matching is, to the project best knowledge, functionally equivalent and compiles entirely from the C++ sources — that is the build to use for modding. It disables the final hash verification, so do not expect the hash to match.',
    ],
  },

  'projectPiki/pikmin': {
    pt: [
      'Antes de tudo: isto é uma decompilação de Pikmin do GameCube, não um port de PC. O que ela produz é o binário do jogo, que você roda num emulador.',
      'A decompilação é completa e dá match em cinco versões: GPIE01_00 (americana rev 0), GPIE01_01 (americana rev 1, a padrão), GPIJ01_01 e GPIJ01_02 (japonesas rev 1 e 2) e GPIP01_00 (europeia rev 0). Os discos de demo ainda não chegam a 100%.',
      'Você precisa da sua própria cópia. Diferente do Pikmin 2, aqui você copia a imagem de disco inteira: coloque-a em orig/GPIE01_01, ou na pasta da sua versão.',
      'Os formatos aceitos são ISO (GCM), RVZ, WIA, WBFS, CISO, NFS, GCZ e TGC.',
      'Instale Python e ninja no PATH. No Windows, use as ferramentas nativas — WSL e msys2 não são necessários. No macOS, precisa do wine-crossover; no Linux x86, o wibo é baixado automaticamente.',
      'Rode python configure.py (com --version para usar outra release) e depois ninja. Depois da primeira build, a imagem de disco pode ser apagada para liberar espaço.',
      'Quando a build passa, aparece um objdiff.json na raiz: é o que o objdiff usa para comparar função por função o seu resultado com o original.',
    ],
    en: [
      'First things first: this is a decompilation of GameCube Pikmin, not a PC port. What it produces is the game binary, which you run in an emulator.',
      'The decompilation is complete and matching on five versions: GPIE01_00 (US rev 0), GPIE01_01 (US rev 1, the default), GPIJ01_01 and GPIJ01_02 (Japan rev 1 and 2) and GPIP01_00 (Europe rev 0). The demo discs are not yet at 100%.',
      'You need your own copy. Unlike Pikmin 2, here you copy the whole disc image: put it in orig/GPIE01_01, or in your version folder.',
      'The accepted formats are ISO (GCM), RVZ, WIA, WBFS, CISO, NFS, GCZ and TGC.',
      'Install Python and ninja on your PATH. On Windows use native tooling — WSL and msys2 are not required. On macOS you need wine-crossover; on Linux x86, wibo is downloaded for you.',
      'Run python configure.py (with --version to use another release), then ninja. After the first build the disc image can be deleted to save space.',
      'When the build succeeds an objdiff.json appears in the root: that is what objdiff uses to compare your result against the original, function by function.',
    ],
  },

  'halo-re/halo': {
    pt: [
      'Antes de tudo: isto não é um port de PC pronto. É uma reimplementação em andamento do Halo: Combat Evolved do Xbox original, e o que a build produz é um XBE remendado que você roda no xemu ou num Xbox — não um executável de Windows.',
      'O método é incremental: pedaços do jogo são reescritos em C, compilados e aplicados por cima do executável original, substituindo as implementações equivalentes. Hoje o laço principal do jogo e várias funções já estão reimplementados.',
      'Você precisa da sua própria cópia: o repositório não inclui o executável nem os assets.',
      'Antes de compilar, monte a pasta halo-patched com os arquivos do disco de varejo e o executável original versão 01.10.12.2276 (MD5 c7869590a1c64ad034e49a5ee0c02465) renomeado para cachebeta.xbe. Esse nome exato é o que o build espera.',
      'A build roda com Visual Studio ou Clang, no Windows, macOS e Linux, e precisa de Python 3 com as dependências do requirements.txt, além do CMake. Também dá para compilar dentro de um container Docker.',
      'Quando termina, o jogo com a reimplementação aplicada fica em halo-patched/default.xbe. Use o extract-xiso para gerar uma ISO da pasta halo-patched e rode essa ISO no xemu.',
      'O relatório de progresso em blam.info mostra o que já foi reimplementado e permite navegar o grafo de chamadas — é por onde se começa a entender o código.',
    ],
    en: [
      'First things first: this is not a finished PC port. It is a work-in-progress re-implementation of original-Xbox Halo: Combat Evolved, and what the build produces is a patched XBE you run in xemu or on an Xbox — not a Windows executable.',
      'The method is incremental: pieces of the game are rewritten in C, compiled, and patched over the original executable so they replace their counterparts. Today the main game loop and several more functions are re-implemented.',
      'You need your own copy: the repository includes neither the executable nor the assets.',
      'Before building, prepare the halo-patched directory with the retail disc files and the original executable version 01.10.12.2276 (MD5 c7869590a1c64ad034e49a5ee0c02465) renamed to cachebeta.xbe. That exact filename is what the build expects.',
      'The build runs with Visual Studio or Clang on Windows, macOS and Linux, and needs Python 3 with the requirements.txt dependencies plus CMake. You can also build inside a Docker container.',
      'When it finishes, the game with the re-implementation patched in sits at halo-patched/default.xbe. Use extract-xiso to make an ISO from the halo-patched directory, and run that ISO in xemu.',
      'The progress report at blam.info shows what has been re-implemented and lets you explore the call graph — that is where understanding the code starts.',
    ],
  },

  'EXOK/Celeste64': {
    pt: [
      'Este é um jogo completo e gratuito, feito pelos próprios desenvolvedores de Celeste em menos de duas semanas para o sexto aniversário do jogo. Você não precisa de cópia de nada.',
      'Se você só quer jogar, a versão pronta está no itch.io da Maddy Makes Games — não é preciso compilar.',
      'Para compilar, você precisa do .NET 10.0.',
      'Clone o repositório, rode dotnet restore para garantir que os pacotes NuGet foram encontrados, e depois dotnet run ou dotnet build no Celeste64.csproj.',
      'Vale saber o que você está rodando: os autores descrevem o projeto como um jogo de game jam, feito muito rápido, pouco otimizado e escrito com bibliotecas voltadas a 2D. Problemas de desempenho não são defeitos de instalação.',
      'A IP de Celeste e tudo na pasta Content pertencem à Maddy Makes Games; a pasta Source é MIT, com exceções anotadas. Mods e fan games não comerciais usando os assets são aceitos, desde que fique claro que não são feitos nem endossados pela equipe de Celeste.',
    ],
    en: [
      'This is a complete, free game, made by Celeste\'s own developers in under two weeks for the game\'s sixth anniversary. You need no copy of anything.',
      'If you just want to play, the prebuilt version is on Maddy Makes Games\' itch.io page — no building required.',
      'To build it, you need .NET 10.0.',
      'Clone the repository, run dotnet restore so the NuGet packages are found, then dotnet run or dotnet build on Celeste64.csproj.',
      'Worth knowing what you are running: the authors describe it as a game-jam project, put together very quickly, not very optimized and coded in libraries mostly intended for 2D. Performance quirks are not install problems.',
      'The Celeste IP and everything in the Content folder belong to Maddy Makes Games; the Source folder is MIT, with noted exceptions. Non-commercial mods and fan games using the assets are fine, as long as it is clear they are not made or endorsed by the Celeste team.',
    ],
  },

  'taisei-project/taisei': {
    pt: [
      'Este é um jogo completo e gratuito — um fan game de código aberto no universo de Touhou, com história, música, arte e mecânicas próprias. Você não precisa de cópia de nenhum jogo.',
      'Se você só quer jogar, baixe o binário pronto na página de Releases: há versões para Windows x64, Linux e macOS. Também existe uma build experimental de Nintendo Switch (homebrew) e uma de WebGL para jogar no navegador.',
      'Atenção a uma pegadinha do GitHub: o link Download ZIP da página principal do repositório não funciona para este projeto, porque o GitHub não empacota submódulos. Para o código-fonte, baixe o arquivo da página de Releases, que foi montado à mão.',
      'Clonando, use git clone --recurse-submodules. E rode git submodule update sempre que puxar código novo ou trocar de branch — os scripts ./pull e ./checkout fazem isso por você.',
      'Para compilar, o projeto recomenda um sistema POSIX (Linux, macOS). O caminho mais curto é meson setup build/, meson compile -C build/ e meson install -C build/. A lista de dependências está em doc/BUILD.rst.',
      'Seus replays, capturas e configurações ficam num diretório próprio por plataforma: %APPDATA%\\taisei no Windows, $HOME/Library/Application Support/taisei no macOS, e $XDG_DATA_HOME/taisei ou $HOME/.local/share/taisei no Linux. A variável TAISEI_STORAGE_PATH muda isso.',
      'As instruções de jogo ficam em doc/GAME.rst, e a documentação sobre controles e outros tópicos em doc/README.rst.',
    ],
    en: [
      'This is a complete, free game — an open-source fan game set in the Touhou universe, with its own story, music, art and gameplay mechanics. You need no copy of any game.',
      'If you just want to play, grab a prebuilt binary from the Releases page: there are builds for Windows x64, Linux and macOS. There is also an experimental Nintendo Switch (homebrew) build and a WebGL one you can play in a browser.',
      'Mind one GitHub trap: the Download ZIP link on the repository main page does not work for this project, because GitHub does not package submodules. For the source, download the archive from the Releases page, which was assembled by hand.',
      'If you clone, use git clone --recurse-submodules. And run git submodule update whenever you pull new code or switch branches — the ./pull and ./checkout helper scripts do it for you.',
      'To build, the project recommends a POSIX system (Linux, macOS). The shortest route is meson setup build/, meson compile -C build/ and meson install -C build/. The dependency list is in doc/BUILD.rst.',
      'Your replays, screenshots and settings go to a per-platform directory: %APPDATA%\\taisei on Windows, $HOME/Library/Application Support/taisei on macOS, and $XDG_DATA_HOME/taisei or $HOME/.local/share/taisei on Linux. The TAISEI_STORAGE_PATH variable overrides it.',
      'The gameplay instructions are in doc/GAME.rst, and the documentation on controllers and other topics in doc/README.rst.',
    ],
  },

  'xenia-project/xenia': {
    pt: [
      'Isto é um emulador experimental de Xbox 360, não um port de um jogo só. Ele recria o console por software e roda a sua própria cópia do jogo sem alterá-la.',
      'Baixe a build do seu sistema. No Windows, as releases ficam num repositório separado, xenia-project/release-builds-windows — não é na página do código.',
      'Antes de investir tempo num jogo, consulte a lista de compatibilidade do projeto, em xenia-project/game-compatibility: o próprio README resume a situação em "vários jogos reais rodam, vários não".',
      'Os passos de configuração ficam na página Quickstart do wiki do projeto, e as dúvidas comuns na página FAQ. Vale ler o FAQ antes de abrir pergunta.',
      'Você precisa das suas próprias cópias dos jogos. O projeto se descreve como experimento, pesquisa e material educativo sobre emulação, e declara que não existe para viabilizar pirataria.',
      'Para compilar do código, o documento é docs/building.md, que também explica o script xb usado no projeto.',
    ],
    en: [
      'This is an experimental Xbox 360 emulator, not a port of one game. It recreates the console in software and runs your own copy of a game unmodified.',
      'Download the build for your system. On Windows, the releases live in a separate repository, xenia-project/release-builds-windows — not on the code page.',
      'Before investing time in a game, check the project compatibility list at xenia-project/game-compatibility: the README itself sums up the situation as quite a few real games running and quite a few not.',
      'The setup steps live on the Quickstart page of the project wiki, and the common questions on the FAQ page. Reading the FAQ before asking is worth it.',
      'You need your own copies of the games. The project describes itself as experimentation, research and education on emulation, and states it is not for enabling illegal activity.',
      'To build from source, the document is docs/building.md, which also explains the xb script the project uses.',
    ],
  },

  'mikage-emu/mikage-dev': {
    pt: [
      'Isto é a Developer Edition do Mikage, um emulador de Nintendo 3DS: não há release pronta aqui, você compila.',
      'Para compilar, precisa de CMake e Conan 2. O caminho é criar uma pasta build, rodar conan install .. -of . --build=missing, configurar o CMake com o toolchain do Conan e Ninja, e então ninja && sudo ninja install. No Linux, as bibliotecas do Vulkan também são necessárias e o Conan não as compila.',
      'Se você tem GCC 15 ou mais novo, o passo do Conan pode falhar por uma mudança nas flags padrão: acrescente tools.build:cflags=["-std=gnu17"] em [conf] no seu perfil do Conan e tente de novo.',
      'A primeira execução exige três coisas montadas: um aes_keys.txt completo na pasta build, uma NAND virtual inicializada a partir da partição de update de um jogo, e o setup inicial do sistema do 3DS executado.',
      'As duas últimas saem de um comando só, com um jogo que tenha partição de update: ./source/mikage game.cci --bootstrap_nand --launch_menu. Hoje isso provavelmente exige um jogo da região europeia.',
      'Depois de montado, basta ./source/mikage game.cci ou ./source/mikage --launch_menu. Em ambos os casos, rode source conanrun.sh antes, para que os diretórios de biblioteca sejam encontrados.',
      'Os controles vêm mapeados de forma peculiar: setas direita, baixo, cima e esquerda são A, B, X e Y; WASD é o circle pad; IJKL é o d-pad; Q e E são L e R; Enter é START, Shift é SELECT, e Backspace é HOME (duas vezes desliga).',
    ],
    en: [
      'This is the Developer Edition of Mikage, a Nintendo 3DS emulator: there is no prebuilt release here, you compile it.',
      'To build it you need CMake and Conan 2. The route is to make a build folder, run conan install .. -of . --build=missing, configure CMake with the Conan toolchain and Ninja, then ninja && sudo ninja install. On Linux the Vulkan libraries are also required and Conan does not build them.',
      'If you have GCC 15 or newer, the Conan step may fail because of a change in the default compilation flags: add tools.build:cflags=["-std=gnu17"] under [conf] in your Conan profile and try again.',
      'The first launch requires three things in place: a complete aes_keys.txt in the build folder, a virtual NAND bootstrapped from a game update partition, and the 3DS initial system setup run.',
      'The last two come from a single command, given a game with an update partition: ./source/mikage game.cci --bootstrap_nand --launch_menu. Today this probably requires a game of the EU region.',
      'Once set up, ./source/mikage game.cci or ./source/mikage --launch_menu is enough. Either way, run source conanrun.sh first so the library directories are found.',
      'The controls are mapped unusually: the right, down, up and left arrows are A, B, X and Y; WASD is the circle pad; IJKL is the d-pad; Q and E are L and R; Enter is START, Shift is SELECT, and Backspace is HOME (press twice to power down).',
    ],
  },

  'ran-j/PS2Recomp': {
    pt: [
      'Antes de tudo: isto não é um jogo. É uma ferramenta — um recompilador estático que traduz binários ELF de PlayStation 2 para C++, mais um runtime para executar o código gerado. Não há nada para instalar e jogar.',
      'Ela se divide em quatro módulos: ps2xAnalyzer, que varre o ELF e escreve a configuração TOML; ps2xRecomp, que lê o TOML e o ELF e gera o C++; ps2xRuntime, que hospeda memória, registro de funções, syscalls e os stubs de hardware; e ps2xIOP, que executa módulos IRX.',
      'Para compilar, precisa de CMake 3.20 ou mais novo, compilador C++20 (testado sobretudo com MSVC) e suporte a SSE4/AVX no host. Clone com --recurse-submodules.',
      'O fluxo recomendado para jogos de varejo ou com símbolos removidos passa pelo Ghidra: abra o ELF, rode o script ExportPS2Functions.java do projeto, use o TOML e o CSV exportados, e recompile com esse TOML. O caminho curto pelo ps2_analyzer serve para experimentos locais ou ELFs que ainda têm símbolos de debug.',
      'O que mais trava gente: endereços não são portáveis. Um binding do tipo handler@0xADDRESS precisa ser o início exato da função naquele build específico do ELF, e não vale entre jogos, regiões ou builds diferentes. O nome do handler também precisa existir nas listas do runtime.',
      'O conselho do próprio projeto é não começar pelo binding manual por endereço: recompile primeiro a partir do TOML/CSV exportado do Ghidra, porque os limites de função e os pontos de entrada sintéticos a mais valem mais que a triagem manual.',
      'As limitações estão declaradas: desempenho muito ruim em VU e GS, e emulação de hardware parcial, com muitos caminhos em stub.',
    ],
    en: [
      'First things first: this is not a game. It is a tool — a static recompiler that translates PlayStation 2 ELF binaries into C++, plus a runtime to execute the generated code. There is nothing here to install and play.',
      'It splits into four modules: ps2xAnalyzer, which scans the ELF and writes the TOML config; ps2xRecomp, which reads the TOML and ELF and generates the C++; ps2xRuntime, which hosts memory, function registration, syscall dispatch and hardware stubs; and ps2xIOP, which executes IRX modules.',
      'To build it you need CMake 3.20 or newer, a C++20 compiler (tested mainly with MSVC) and SSE4/AVX support on the host. Clone with --recurse-submodules.',
      'The recommended workflow for retail or stripped games goes through Ghidra: open the ELF, run the project ExportPS2Functions.java script, use the exported TOML and CSV, and recompile with that TOML. The short route through ps2_analyzer is for quick local experiments or ELFs that still carry debug symbols.',
      'What trips people up most: addresses are not portable. A handler@0xADDRESS binding has to be the exact function start in that specific ELF build, and does not carry across games, regions or builds. The handler name must also exist in the runtime call lists.',
      'The project own advice is not to start with manual address binding: recompile from the Ghidra-exported TOML/CSV first, because the extra function boundaries and synthetic entry points matter more than manual early triage.',
      'The limitations are stated outright: performance is very bad for VU and GS, and hardware emulation is partial with many paths stubbed.',
    ],
  },

  'arcanite24/pinyon-shift': {
    pt: [
      'Serve uma cópia só: o disco americano de varejo de Forza Horizon, serial MS-2505, title ID 4D5309C9. O launcher aceita a ISO que você mesmo extraiu do seu disco, ou uma pasta com os arquivos extraídos sem modificação.',
      'Baixe PinyonShift-Launcher.zip da última release, extraia e abra PinyonShiftLauncher.exe. No Linux ou Steam Deck é o pacote .tar.gz; no Mac, o .zip de arm64.',
      'Arraste a ISO para a janela do launcher, ou escolha a imagem pelo seletor de arquivos. Confirme a posse e peça para verificar e construir.',
      'Deixe o launcher aberto durante a construção: ela instala as ferramentas sozinha e leva de 20 a 60 minutos, com cerca de 30 GB livres de disco. Se o Windows precisar reiniciar, o processo continua depois que você entrar de novo.',
      'Precisa de placa com Vulkan 1.3. NVIDIA é a testada; AMD e Intel ainda não foram qualificadas.',
      'O launcher não é assinado, então o Windows pode avisar. Baixe apenas das releases do próprio repositório.',
      'Depois de construído, abra pelo botão de jogar; F6 abre as configurações dentro do jogo.',
    ],
    en: [
      'Only one copy works: the USA retail Forza Horizon disc, serial MS-2505, title ID 4D5309C9. The launcher takes the ISO you made from your own disc, or an unmodified folder of the extracted files.',
      'Download PinyonShift-Launcher.zip from the latest release, extract it and run PinyonShiftLauncher.exe. On Linux or a Steam Deck it is the .tar.gz package; on a Mac, the arm64 .zip.',
      'Drag the ISO onto the launcher window, or pick it with the file chooser. Confirm ownership, then ask it to verify and build.',
      'Leave the launcher open while it builds: it installs the build tools itself and takes 20 to 60 minutes, needing about 30 GB of free disk. If Windows has to restart, setup carries on after you sign in.',
      'A GPU with Vulkan 1.3 is required. NVIDIA is the tested one; AMD and Intel are not yet qualified.',
      'The launcher is not code-signed, so Windows may warn about it. Download it only from the repository own releases.',
      'Once built, start it from the play button; F6 opens the in-game settings.',
    ],
  },

  'HayatoG/iss_pc': {
    pt: [
      'Tudo vem do seu próprio PlayStation 4. A versão aceita é inFAMOUS Second Son CUSA00223 (americana), jogo base 1.00 com a atualização 1.07, juntados numa única pasta — o base primeiro, a atualização copiada por cima. São cerca de 33 GB.',
      'O eboot.bin tem de ser o da 1.07, não o do jogo base: é o erro que mais derruba a primeira execução. As bibliotecas libc.prx e libSceFios2.prx em sce_module/ também saem da atualização.',
      'Da pasta sce_sys/ vêm param.sfo, playgo-chunk.dat, icon0.png e pic1.png; de base mais atualização vêm art/ (cache, movies, ui), playgo.pgm, sce_discmap.plt e sce_discmap_patch.plt. A lista completa está em docs/ARQUIVOS_NECESSARIOS.md e nas notas de cada release.',
      'Nada de firmware do console é necessário aqui: o áudio é do próprio port.',
      'Baixe o pacote do seu sistema (Windows 10 1903 ou mais novo, ou Linux x86-64 com glibc 2.39+), extraia e abra o launcher. Escolha a pasta do jogo e clique em jogar.',
      'Precisa de placa com Vulkan 1.3, 6 GB de VRAM recomendados, e os ~33 GB livres. Se o jogo engasgar muito, a opção de precisão de GPU na tela de Gráficos tem um modo rápido.',
      'Se o launcher novo não abrir na sua máquina, use o inFAMOUS Second Son (classic), que fica na mesma pasta e compartilha as mesmas configurações e saves.',
      'No jogo, F10 liga o contador de quadros e Insert abre o menu do port.',
    ],
    en: [
      'Everything comes from your own PlayStation 4. The accepted version is inFAMOUS Second Son CUSA00223 (US), base game 1.00 with update 1.07, merged into one folder — the base first, the update copied over it. About 33 GB.',
      'The eboot.bin must be the 1.07 one, not the base game: that is what most often kills the first launch. The libc.prx and libSceFios2.prx libraries in sce_module/ come from the update too.',
      'From sce_sys/ you need param.sfo, playgo-chunk.dat, icon0.png and pic1.png; from base plus update, art/ (cache, movies, ui), playgo.pgm, sce_discmap.plt and sce_discmap_patch.plt. The full list is in docs/ARQUIVOS_NECESSARIOS.md and in every release notes.',
      'No console firmware is needed here: the audio is the port own.',
      'Download the package for your system (Windows 10 1903 or newer, or x86-64 Linux with glibc 2.39+), extract it and open the launcher. Pick the game folder and press play.',
      'You need a GPU with Vulkan 1.3, 6 GB of VRAM recommended, and the ~33 GB free. If it stutters badly, the GPU accuracy option on the Graphics screen has a fast mode.',
      'If the new launcher does not open on your machine, use inFAMOUS Second Son (classic) in the same folder: same settings, same saves.',
      'In game, F10 toggles the frame counter and Insert opens the port menu.',
    ],
  },

  'HayatoG/tlg_pc': {
    pt: [
      'Tudo vem do seu próprio PlayStation 4. O port aceita The Last Guardian CUSA03627 (americana) ou CUSA03745 (europeia), com a atualização 01.03, juntados numa pasta só: jogo base primeiro, atualização por cima. São cerca de 25 GB.',
      'O eboot.bin precisa ser o da 01.03. Os quatro psarc grandes (trico_boot, trico_001, trico_002, trico_003) vêm do jogo base; os com sufixo p vêm da atualização; e cada idioma é um psarc próprio de uns 280 MB.',
      'A CUSA03745 europeia traz 15 idiomas, a CUSA03627 americana traz quatro (inglês, português, espanhol e francês). O launcher lista os idiomas da cópia que você carregou.',
      'Para o áudio, o projeto pede libSceNgs2.sprx, de /system/common/lib/ do seu próprio PS4, colocado na pasta system_lib/ ao lado do executável.',
      'Montar a pasta: despeje jogo e atualização numa unidade USB em exFAT, copie o base no PC e então copie o conteúdo da atualização por cima, substituindo. Confira os tamanhos — arquivos acima de 4 GB enviados por FTP do GoldHEN 2.2 chegam truncados, e é por isso que o USB é o caminho.',
      'Baixe o pacote do seu sistema, extraia, abra o launcher, escolha a pasta e o idioma, e clique em jogar. Precisa de Vulkan 1.3 e ~25 GB livres.',
      'Em CPUs Intel anteriores à Haswell, que não têm MOVBE, BMI1 nem LZCNT, o port emula essas instruções no início automaticamente — o log diz quando isso acontece.',
    ],
    en: [
      'Everything comes from your own PlayStation 4. The port accepts The Last Guardian CUSA03627 (US) or CUSA03745 (EU), with update 01.03, merged into one folder: base game first, update on top. About 25 GB.',
      'The eboot.bin must be the 01.03 one. The four large psarc files (trico_boot, trico_001, trico_002, trico_003) come from the base game; the ones with a p suffix come from the update; and each language is its own psarc of about 280 MB.',
      'The EU CUSA03745 ships 15 languages, the US CUSA03627 ships four (English, Portuguese, Spanish, French). The launcher lists the languages of the copy you loaded.',
      'For audio the project asks for libSceNgs2.sprx, from /system/common/lib/ on your own PS4, placed in the system_lib/ folder beside the executable.',
      'Building the folder: dump the game and the update to an exFAT USB drive, copy the base onto the PC, then copy the update contents over it, replacing files. Check the sizes — files over 4 GB sent through GoldHEN 2.2 FTP arrive truncated, which is why the USB drive is the route.',
      'Download the package for your system, extract it, open the launcher, pick the folder and the language, and press play. You need Vulkan 1.3 and ~25 GB free.',
      'On Intel CPUs before Haswell, which lack MOVBE, BMI1 and LZCNT, the port emulates those instructions at startup automatically — the log says when it does.',
    ],
  },

  'HayatoG/gr2_pc': {
    pt: [
      'Tudo vem do seu próprio PlayStation 4. A versão aceita é Gravity Rush 2 CUSA03694 (americana) com a atualização 01.11, juntados numa pasta só. São cerca de 28 GB.',
      'O eboot.bin precisa ser o da 01.11. Os dois psarc grandes (Gravite2_Chunk0 e Chunk1, 10 e 15,8 GB) vêm do jogo base; os Patch_Chunk vêm da atualização; e libc.prx, libSceFios2.prx, libSceJobManager.prx e sysdata/libSceSecure.prx vêm do base.',
      'Para o áudio, o projeto pede libSceNgs2.sprx, de /system/common/lib/ do seu PS4, na pasta system_lib/ ao lado do executável — sem ele, não há som.',
      'Montar a pasta: despeje jogo e atualização numa unidade USB em exFAT e copie a atualização por cima do base. Alternativa sem gastar espaço duas vezes: o script scripts/make_game_view.py monta a pasta com links.',
      'Confira os tamanhos antes de reclamar de erro: arquivos acima de 4 GB pelo FTP do GoldHEN 2.2 chegam truncados.',
      'Baixe o pacote do seu sistema, extraia, abra o launcher, escolha a pasta e o idioma do jogo, e clique em jogar.',
      'No jogo, F10 liga o contador de quadros e Insert abre o menu do port. O mouse gira a câmera; Esc solta o cursor e um clique na janela o recaptura.',
    ],
    en: [
      'Everything comes from your own PlayStation 4. The accepted version is Gravity Rush 2 CUSA03694 (US) with update 01.11, merged into one folder. About 28 GB.',
      'The eboot.bin must be the 01.11 one. The two large psarc files (Gravite2_Chunk0 and Chunk1, 10 and 15.8 GB) come from the base game; the Patch_Chunk ones come from the update; and libc.prx, libSceFios2.prx, libSceJobManager.prx and sysdata/libSceSecure.prx come from the base.',
      'For audio the project asks for libSceNgs2.sprx, from /system/common/lib/ on your PS4, in the system_lib/ folder beside the executable — without it there is no sound.',
      'Building the folder: dump the game and the update to an exFAT USB drive and copy the update over the base. To avoid spending the space twice, scripts/make_game_view.py builds the folder with links instead.',
      'Check the file sizes before blaming an error: files over 4 GB sent through GoldHEN 2.2 FTP arrive truncated.',
      'Download the package for your system, extract it, open the launcher, pick the folder and the game language, and press play.',
      'In game, F10 toggles the frame counter and Insert opens the port menu. The mouse turns the camera; Esc releases the cursor and a click in the window takes it back.',
    ],
  },

  'SlickAmogus/silent-hill-decomp': {
    pt: [
      'Extraia a release onde você quiser e coloque a imagem do seu disco de Silent Hill na pasta gamedata. O nome do arquivo não importa: o launcher detecta a região sozinho.',
      'Abra SilentHillPC para jogar, ou SilentHillPC_Launcher para configurar antes. A build não é assinada, então o SmartScreen pode barrar na primeira vez — rode o jogo uma vez e depois o launcher.',
      'Se aparecerem glitches ou artefatos gráficos, troque o renderizador na configuração: a opção renderer aceita d3d11, vulkan ou warp.',
      'Windows (ou wine) é o recomendado. As builds de Linux e macOS ainda têm problemas conhecidos.',
      'O Mod Manager do launcher extrai os arquivos do disco para uma árvore de assets soltos, converte texturas para PNG e aceita substituições em gamedata/load/. Substituições precisam caber no tamanho do original, com exceção de texturas maiores.',
    ],
    en: [
      'Extract the release wherever you like and put your own Silent Hill disc image in the gamedata folder. The filename does not matter: the launcher detects the region by itself.',
      'Run SilentHillPC to play, or SilentHillPC_Launcher to configure first. The build is unsigned, so SmartScreen may block it the first time — run the game once, then the launcher.',
      'If you get visual glitches or artefacts, change the renderer in the config: the renderer option takes d3d11, vulkan or warp.',
      'Windows (or wine) is the recommended platform. The Linux and macOS builds still have known issues.',
      'The launcher Mod Manager unpacks the disc files into a loose asset tree, converts textures to PNG and accepts replacements in gamedata/load/. A replacement must fit the original size, oversized textures excepted.',
    ],
  },

  'TGP482/BLACK-XBERecomp': {
    pt: [
      'Coloque os arquivos do jogo na pasta assets. Serve a ISO ou os arquivos de dados extraídos da release americana ou europeia de Black no Xbox original.',
      'Rode BLACK.exe. A primeira execução compila o código do jogo para o seu PC e só acontece uma vez.',
      'As configurações do recomp ficam no menu de opções dentro do jogo, ou no overlay de Settings, que abre com F10 por padrão.',
      'Se você for compilar em vez de usar a release, a pasta assets precisa dos arquivos extraídos, não da ISO: o default.xbe da release americana com o resto dos arquivos do jogo ao lado. A primeira compilação leva de 30 a 90 minutos em máquina mais fraca.',
      'Reserve cerca de 3 GB para os arquivos do jogo, o código compilado e os saves. Precisa de placa com Direct3D 12.',
    ],
    en: [
      'Put your game files in the assets folder. Either an ISO or the extracted data files of the USA or Europe release of Black on the original Xbox will do.',
      'Run BLACK.exe. The first start compiles the game code for your PC and happens only once.',
      'Recomp settings live in the in-game options menu, or in the Settings overlay, which opens with F10 by default.',
      'If you build instead of using the release, assets needs the extracted files, not an ISO: the USA release default.xbe with the rest of the game files beside it. The first build takes 30 to 90 minutes on a weaker machine.',
      'Leave about 3 GB for the game files, the compiled game code and saves. A GPU with Direct3D 12 is required.',
    ],
  },

  'TGP482/SCDA-XBERecomp': {
    pt: [
      'Coloque os arquivos do jogo na pasta assets. Para jogar, serve a ISO ou os arquivos extraídos da versão de Xbox original de Splinter Cell: Double Agent.',
      'Rode SCDA.exe. A primeira execução compila o código do jogo para o seu PC e só acontece uma vez.',
      'As configurações do recomp ficam no menu de opções dentro do jogo, ou no overlay que abre com F10 por padrão.',
      'Para compilar, a ISO não serve: os arquivos precisam estar extraídos, com default.xbe e sc4_adv.xbe na pasta assets e as pastas Default, Media e adv ao lado deles.',
      'Precisa de placa com Direct3D 12. O jogo roda como programa Windows de 64 bits, substituindo a resolução original de 640x480 pela do seu monitor.',
    ],
    en: [
      'Put your game files in the assets folder. To play, either an ISO or the extracted files of the original Xbox version of Splinter Cell: Double Agent will do.',
      'Run SCDA.exe. The first start compiles the game code for your PC and happens only once.',
      'Recomp settings live in the in-game options menu, or in the overlay that opens with F10 by default.',
      'For building, an ISO does not work: the files must be extracted, with default.xbe and sc4_adv.xbe in the assets folder and the Default, Media and adv folders beside them.',
      'A GPU with Direct3D 12 is required. The game runs as a 64-bit Windows program, replacing the original 640x480 resolution with your monitor own.',
    ],
  },

  'samuelit0davila/fifa-street-pc-port': {
    pt: [
      'Você precisa da sua própria ISO de Xbox 360 de FIFA Street (2012). O instalador lê a imagem; nada do jogo vem no download.',
      'Baixe o ReStreet-Setup.exe da última release e rode. Ele pergunta a sua ISO, a pasta de instalação, o seu nome online e o servidor (Europa ou América do Sul).',
      'Abra o launcher pelo atalho na área de trabalho e aperte jogar. Reserve cerca de 12 GB livres para uma instalação nova.',
      'Já tem o ReStreet instalado? Na versão 1.5.1 ou mais nova, o próprio launcher atualiza — sem ISO de novo, mantendo nome, servidor, configurações e progresso do World Tour.',
      'Em PC mais fraco, abra a aba de Gráficos no launcher e use resolução interna 1x, desligando oclusão de ambiente e MSAA.',
      'No Linux roda por Proton, com um launcher nativo que também instala o jogo. Precisa de Steam com algum Proton instalado.',
      'Há um guia passo a passo com imagens em PDF no repositório, em inglês, português e espanhol.',
    ],
    en: [
      'You need your own Xbox 360 ISO of FIFA Street (2012). The installer reads the image; nothing of the game ships in the download.',
      'Download ReStreet-Setup.exe from the latest release and run it. It asks for your ISO, an install folder, your online name and your server (Europe or South America).',
      'Open the launcher from the desktop shortcut and press play. Leave about 12 GB free for a new install.',
      'Already have ReStreet? On 1.5.1 or newer the launcher updates itself — no ISO needed again, and your name, server, settings and World Tour progress are kept.',
      'On a weaker PC, open the Graphics tab in the launcher and use 1x internal resolution, with ambient occlusion and MSAA off.',
      'On Linux it runs through Proton, with a native Linux launcher that also installs the game. You need Steam with any Proton installed.',
      'The repository has a step-by-step PDF guide with pictures, in English, Portuguese and Spanish.',
    ],
  },

  'OpenSmash-Ultimate/WindowSmash': {
    pt: [
      'Serve uma versão só: Super Smash Bros. Ultimate na 13.0.5, a última atualização. Qualquer outra faz o instalador parar e avisar em vermelho.',
      'Conta como 13.0.5: o jogo com o .nsp da atualização 13.0.5 ao lado numa pasta (o jogo em 1.0.0 é a melhor base), o jogo instalado no yuzu ou no Ryujinx já atualizado, ou um dump com a 13.0.5 já aplicada.',
      'Além do jogo, o instalador precisa das suas chaves (prod.keys e title.keys) e do firmware do seu Switch — as fontes do jogo saem do firmware. Se você já jogou no yuzu ou no Ryujinx nessa máquina, ele encontra tudo sozinho.',
      'Arquivos comprimidos (.nsz, .xcz) precisam voltar a .nsp ou .xci antes.',
      'Baixe o repositório como ZIP, extraia numa unidade com cerca de 60 GB livres, fora da Área de Trabalho e dos Documentos (o OneDrive tenta subir uma build de ~30 GB), e dê dois cliques em Install WindowSmash.bat.',
      'Ele instala o que faltar (Python, um compilador, SDL3), abre uma janela para você escolher as três pastas e o nome online, e então compila o jogo: de 30 minutos a algumas horas. Se parar no meio, rode o .bat de novo e ele continua de onde estava.',
      'Precisa de processador com AVX2 — Intel Core de 4ª geração (2013) ou mais novo, ou qualquer Ryzen. A maioria dos Pentium e Celeron não tem.',
      'Deixe os arquivos do jogo onde estão depois de instalar: dependendo do tipo, o jogo continua lendo os dados deles.',
    ],
    en: [
      'Only one version works: Super Smash Bros. Ultimate at 13.0.5, its last update. Any other makes the installer stop and say so in red.',
      'These count as 13.0.5: the game with the 13.0.5 update .nsp beside it in one folder (the game at 1.0.0 is the best base), the game installed in yuzu or Ryujinx already updated, or a dump with 13.0.5 merged in.',
      'Besides the game, the installer needs your keys (prod.keys and title.keys) and your Switch firmware — the game fonts come out of the firmware. If you have played the game in yuzu or Ryujinx on this PC, it finds all of it by itself.',
      'Compressed files (.nsz, .xcz) have to be turned back into .nsp or .xci first.',
      'Download the repository as a ZIP, extract it onto a drive with about 60 GB free, away from Desktop and Documents (OneDrive will try to upload a ~30 GB build), and double-click Install WindowSmash.bat.',
      'It installs whatever is missing (Python, a compiler, SDL3), opens a window for you to pick the three folders and your online name, and then builds the game: 30 minutes to a few hours. If it stops partway, run the .bat again and it carries on where it left off.',
      'You need a CPU with AVX2 — a 4th generation Intel Core (2013) or newer, or any Ryzen. Most Pentium and Celeron chips do not have it.',
      'Leave your game files where they are after the install: depending on their kind, the game keeps reading its data from them.',
    ],
  },

  'Dyotson/ForzaHorizon1-ReImagined': {
    pt: [
      'A cópia aceita é a sua de Forza Horizon na versão base: o pacote Games on Demand (4D5309C9/00007000/<nome> com a pasta <nome>.data/), ou o disco 1 de varejo como ISO, ou uma pasta com os arquivos dele.',
      'Opcional mas recomendado: o pacote do Title Update 4 (4D5309C9/000B0000/<nome>, update 4000D145), que libera o Horizon Rally e o 1000 Club.',
      'Baixe o launcher da última release — no Linux um Flatpak (ou .tar.gz), no Windows um instalador — e aponte, na tela de Setup, para o seu pacote ou a ISO do disco 1, e opcionalmente para o Title Update 4 e a pasta de DLC.',
      'Mande construir. O launcher gera o jogo da sua cópia e compila, baixando compilador e SDK se você não tiver. Em 8 núcleos, a compilação completa com o Title Update 4 leva de 3,6 a 4,6 minutos e deixa cerca de 15 GB em disco. Pode ser cancelada e retomada, e só se repete quando algo muda.',
      'No Flatpak, instale a extensão do compilador uma vez (org.freedesktop.Sdk.Extension.llvm22, 0,5 GB): sem ela o launcher baixa um compilador de 2 GB em vez disso, e avisa.',
      'Precisa de Linux x86-64 ou Windows 10/11 64 bits, placa com Vulkan 1.3 e cerca de 15 GB de disco.',
      'Cada opção do forza.toml tem página nas configurações do launcher: taxa de quadros, tela, teclado e mouse, servidor online, perfil e importação de saves do Xenia.',
    ],
    en: [
      'The accepted copy is your own Forza Horizon at base version: the Games on Demand package (4D5309C9/00007000/<name> with its <name>.data/ folder), or retail disc 1 as an ISO, or a folder of its files.',
      'Optional but recommended: the Title Update 4 package (4D5309C9/000B0000/<name>, update 4000D145), which unlocks Horizon Rally and the 1000 Club.',
      'Download the launcher from the latest release — a Flatpak (or .tar.gz) on Linux, an installer on Windows — and on its Setup page point it at your package or your disc 1 ISO, and optionally at Title Update 4 and a DLC folder.',
      'Then build. The launcher generates the game from your copy and compiles it, downloading a compiler and the SDK if you have none. On 8 cores a full build with Title Update 4 takes about 3.6 to 4.6 minutes and leaves around 15 GB on disk. It can be cancelled and resumed, and only repeats when something changed.',
      'With the Flatpak, install the compiler extension once (org.freedesktop.Sdk.Extension.llvm22, 0.5 GB): without it the launcher downloads a 2 GB compiler instead, and tells you so.',
      'You need Linux x86-64 or 64-bit Windows 10/11, a GPU with Vulkan 1.3 and about 15 GB of disk.',
      'Every forza.toml setting has a page in the launcher settings: frame rate, display, keyboard and mouse bindings, online server, profile and Xenia save import.',
    ],
  },

  'NoRain211/doaxvb-re': {
    pt: [
      'Você precisa da sua própria ISO americana do jogo. O ZIP da beta já traz Python, Capstone, Git, CMake e o extrator de ISO.',
      'Extraia o ZIP numa pasta nova de caminho curto, arraste a sua ISO para cima de BuildGame.cmd e espere a mensagem de setup concluído.',
      'Na primeira execução, o setup baixa o compilador clang do llvm-mingw para dentro da própria pasta: 190 MB de download, cerca de 715 MB depois de extraído. Isso não pede permissão de administrador, Visual Studio nem Windows SDK.',
      'ZIPs de release até a 0.6.0 RC1 se comportam diferente: eles oferecem rodar o instalador do C++ Build Tools da Microsoft, que pede administrador e vários GB de disco. Siga os avisos dele antes de arrastar a ISO.',
      'Depois rode Launcher.cmd da mesma pasta para escolher resolução, MSAA, SMAA e sombras do sol, e aperte jogar. RunGame.cmd direto usa os padrões.',
      'Ao atualizar, construa numa pasta nova e deixe a instalação anterior e os saves onde estão.',
      'Não rode o DS4Windows junto: ele acrescenta um controle Xbox emulado, então um só pad aparece duas vezes e ocupa duas portas de jogador. Se abrir pela Steam, desligue o Steam Input.',
    ],
    en: [
      'You need your own USA ISO of the game. The beta ZIP already bundles Python, Capstone, Git, CMake and the ISO extractor.',
      'Extract the ZIP into a new folder with a short path, drag your ISO onto BuildGame.cmd, and wait for setup to report it is complete.',
      'On the first run setup downloads the llvm-mingw clang compiler into its own folder: a 190 MB download, about 715 MB extracted. It needs no administrator approval, no Visual Studio and no Windows SDK.',
      'Release ZIPs up to 0.6.0 RC1 behave differently: they offer to run Microsoft C++ Build Tools installer, which needs administrator approval and several GB of disk. Follow its prompts before dragging the ISO.',
      'Then run Launcher.cmd from the same folder to pick resolution, MSAA, SMAA and sun shadows, and press play. Running RunGame.cmd directly uses the defaults.',
      'When updating, build in a new folder and leave your previous install and saves alone.',
      'Do not run DS4Windows alongside it: it adds an emulated Xbox controller, so one pad shows up twice and takes two player ports. If you launch through Steam, turn Steam Input off.',
    ],
  },

  'Yokimitsuro/khdays-port': {
    pt: [
      'A cópia aceita é a sua ROM da release europeia de KINGDOM HEARTS 358/2 Days para Nintendo DS. O instalador do Windows pede essa ROM e prepara os dados do jogo a partir dela.',
      'Se você mantém uma cópia pelo KH Melon Mix dentro da pasta do KINGDOM HEARTS HD 1.5+2.5 ReMIX, o instalador a encontra sozinho.',
      'Baixe o instalador na página de releases: ele é o suficiente além da sua ROM. Nada do jogo vem com ele.',
      'O mesmo instalador pode também montar o pacote HD a partir das suas coleções HD, acrescentar o port à Steam (PC e Steam Deck) e instalar o mod studio.',
      'Para compilar em vez de usar o instalador, confira e extraia a sua cópia com os scripts do projeto (verify_rom.py e extract_data.py, Python 3.11+); os dados saem em data/extracted/<hash>/, que nunca é comitado. Depois build.py --config Release, com Visual Studio 2026, CMake, Ninja e pycparser.',
      'Hoje a build é Windows x64. O port avisa quando sai uma release mais nova.',
    ],
    en: [
      'The accepted copy is your own ROM of the European release of KINGDOM HEARTS 358/2 Days for Nintendo DS. The Windows installer asks for that ROM and prepares the game data from it.',
      'If you keep a copy through KH Melon Mix inside your KINGDOM HEARTS HD 1.5+2.5 ReMIX folder, the installer finds it by itself.',
      'Download the installer from the releases page: besides your ROM it is all you need. Nothing of the game comes with it.',
      'The same installer can also build the HD pack from your HD collections, add the port to Steam (PC and Steam Deck), and install the mod studio.',
      'To build from source instead, verify and extract your copy with the project scripts (verify_rom.py and extract_data.py, Python 3.11+); the data lands in data/extracted/<hash>/, which is never committed. Then build.py --config Release, with Visual Studio 2026, CMake, Ninja and pycparser.',
      'Today the build is Windows x64. The port tells you when a newer release is out.',
    ],
  },

  'saulob/dragons-crown-pro-pc': {
    pt: [
      'A cópia aceita é um .pkg descriptografado de PlayStation 4 de Dragon\'s Crown Pro — e de uma das versões exatas que o port conhece. Um pacote ainda criptografado para o console não abre no PC.',
      'As versões americanas são CUSA10454: a 1.00 é o pacote base e a 1.01 é atualização instalada sobre ela. As japonesas são CUSA07001, onde a 1.00 já é jogo completo e as 1.02 e 1.03 são atualizações. As de Ásia e Hong Kong são CUSA10209, com a 1.02 instalada sobre a 1.00.',
      'O launcher confere Title ID, Content ID e versão no param.sfo antes de desempacotar, e o hash do eboot.bin antes de instalar. Qualquer outra versão é recusada, porque o port foi construído para esse código exato.',
      'Baixe o ZIP do Windows da última release, extraia onde você possa escrever e rode dragons_crown_pro.exe. Na página de jogar, use instalar jogo e escolha o seu .pkg.',
      'Espere até aparecer que está pronto para jogar: o pacote é desempacotado na pasta game ao lado do programa, cerca de 6 GB. O .pkg só é lido, e pode ser apagado depois.',
      'Precisa de placa com Vulkan 1.3 e as extensões VK_EXT_robustness2, VK_KHR_push_descriptor e VK_EXT_vertex_attribute_divisor.',
      'As versões japonesa e de Ásia/Hong Kong ainda não estão totalmente testadas, e nelas os cheats e os ícones de controle Xbox não estão disponíveis. As builds 1.01 americana e 1.02 de Ásia renderizam no tamanho original em 16:9, porque os pontos de resolução interna delas ainda não foram verificados.',
      'No Linux e no Steam Deck é a AppImage, com os mesmos passos. Marque-a como executável antes.',
    ],
    en: [
      'The accepted copy is a decrypted PlayStation 4 .pkg of Dragon\'s Crown Pro — and one of the exact versions the port knows. A package still encrypted for a console cannot be unpacked on a PC.',
      'The US builds are CUSA10454: 1.00 is the base package and 1.01 is an update installed over it. The Japanese builds are CUSA07001, where 1.00 is already a complete game and 1.02 and 1.03 are updates. The Asia and Hong Kong builds are CUSA10209, with 1.02 installed over 1.00.',
      'The launcher checks Title ID, Content ID and version in the param.sfo before it unpacks anything, and the eboot.bin hash before it installs the result. Any other version is refused, because the port is built for that exact game code.',
      'Download the Windows ZIP from the latest release, extract it somewhere you can write to, and run dragons_crown_pro.exe. On the Play page, use the install-game button and pick your .pkg.',
      'Wait until it reports it is ready to play: the package is unpacked into the game folder next to the program, about 6 GB. The .pkg is only read, and you can delete it afterwards.',
      'You need a GPU with Vulkan 1.3 and the VK_EXT_robustness2, VK_KHR_push_descriptor and VK_EXT_vertex_attribute_divisor extensions.',
      'The Japanese and Asia/Hong Kong builds are not yet fully tested, and on them the cheats and Xbox controller prompts are unavailable. The US 1.01 and Asia 1.02 builds render at their original size in 16:9, because their render resolution sites have not been verified yet.',
      'On Linux and the Steam Deck it is the AppImage, with the same steps. Mark it executable first.',
    ],
  },

  'LittleBitUA/DPRecomp': {
    pt: [
      'Serve o seu disco de Deadly Premonition de Xbox 360, europeu (PAL) ou americano (NTSC), como imagem ou como arquivos extraídos. O ZIP traz uma build recompilada para cada região, e o launcher escolhe a certa a partir do seu default.xex.',
      'Baixe o ZIP do Windows da última release e descompacte fora de Arquivos de Programas.',
      'Para os dados do jogo, há dois caminhos: abrir o launcher e deixar o instalador embutido extrair a sua ISO para assets\\ (alguns minutos, e pode ser retomado), ou copiar o conteúdo extraído do disco de modo que o default.xex caia em assets\\default.xex.',
      'Rode PlayDeadlyPremonition.exe e aperte jogar. A primeira execução compila shaders por cerca de um minuto; as seguintes são instantâneas. Os saves ficam em userdata\\ ao lado do jogo.',
      'Reserve cerca de 6 GB livres para os dados do jogo. Precisa de placa Direct3D 12 com rasterizer-ordered views (NVIDIA GTX 900+, AMD RX 400+, Intel Arc).',
      'Para atualizar, o próprio launcher mostra uma faixa de atualização disponível e instala no lugar, mantendo saves e configurações.',
      'O port é portátil: saves, configuração e cache de shaders ficam na pasta do jogo, e ele roda em CPUs da era SSE4.1, sem exigir AVX.',
    ],
    en: [
      'Your own Xbox 360 Deadly Premonition disc works, European (PAL) or USA (NTSC), as an image or as extracted files. The ZIP holds a recompiled build for each region, and the launcher picks the right one from your default.xex.',
      'Download the Windows ZIP from the latest release and unzip it outside Program Files.',
      'For the game data there are two routes: open the launcher and let its built-in installer extract your .iso into assets\\ (a few minutes, resumable), or copy the extracted disc contents so that default.xex ends up at assets\\default.xex.',
      'Run PlayDeadlyPremonition.exe and press play. The first launch compiles shaders for about a minute; later launches are instant. Saves live in userdata\\ beside the game.',
      'Leave about 6 GB free for the game data. You need a Direct3D 12 GPU with rasterizer-ordered views (NVIDIA GTX 900+, AMD RX 400+, Intel Arc).',
      'To update, the launcher itself shows an update banner and installs the new version in place, keeping your saves and settings.',
      'The port is portable: saves, config and the shader cache live in the game folder, and it runs on SSE4.1-era CPUs with no AVX required.',
    ],
  },

  'KIexster/god-of-war-recomp': {
    pt: [
      'A cópia aceita é a sua de God of War em PlayStation 2, versão americana NTSC-U, SCUS-97399. O executável que o projeto recompila é o SCUS_973.99 desse disco.',
      'O jogo não lê a ISO: ele lê os arquivos extraídos do disco, cada um no setor original. Extraia com o script do projeto (tools/iso_extract.py, Python 3), que deixa o SCUS_973.99, os módulos .IRX, os PART1.PAK e PART2.PAK das duas camadas do DVD e o índice .disc_layout numa pasta.',
      'Reserve cerca de 20 GB livres — só o disco extraído são ~8,5 GB — e 16 GB de RAM recomendados, porque a compilação usa todos os núcleos.',
      'Instale as ferramentas com o script 1 do projeto (Visual Studio 2022 Build Tools com a carga de C++, Git, Python 3) e então rode o script 2 para compilar. A primeira compilação leva de 20 a 40 minutos.',
      'Depois rode o script 3. F2 mostra o medidor de quadros, F11 alterna janela e tela cheia, F1 abre o depurador do runtime.',
      'Opcional: a etapa de IOP nativo compila os 8 módulos IRX do jogo antes do tempo e encurta o carregamento — o jogo começa em cerca de 21 segundos em vez de 34. Exige uma execução para despejar os módulos e uma recompilação em seguida.',
      'Se o caminho de compilação der erro de limite de 260 caracteres, é por isso que o script clona em uma pasta curta na raiz da unidade; a variável GOW_WORK muda esse lugar.',
    ],
    en: [
      'The accepted copy is your own PlayStation 2 God of War, USA NTSC-U, SCUS-97399. The executable the project recompiles is the SCUS_973.99 from that disc.',
      'The game does not read the ISO: it reads the disc files extracted, each at its original sector. Extract them with the project script (tools/iso_extract.py, Python 3), which leaves SCUS_973.99, the .IRX modules, PART1.PAK and PART2.PAK from both DVD layers, and the .disc_layout index in one folder.',
      'Leave about 20 GB free — the extracted disc alone is ~8.5 GB — and 16 GB of RAM is recommended, because the build uses every core.',
      'Install the tools with the project first script (Visual Studio 2022 Build Tools with the C++ workload, Git, Python 3), then run the second to build. The first build takes 20 to 40 minutes.',
      'Then run the third script. F2 shows an FPS meter, F11 switches between window and fullscreen, F1 opens the runtime debugger.',
      'Optional: the native IOP step compiles the game 8 IRX modules ahead of time and shortens loading — gameplay starts at about 21 seconds instead of 34. It needs one run to dump the modules and a rebuild after it.',
      'If the build path hits the 260-character limit, that is why the script clones into a short folder at the root of a drive; the GOW_WORK variable changes where.',
    ],
  },

  'distilledorion-sketch/Initial-D-Arcade-Stage-3-Native-SH-4-Recompilation-WIP-': {
    pt: [
      'Este não é um port de Dreamcast, e o executável não roda o jogo através de uma BIOS de NAOMI 2 — uma BIOS não é exigida nem aceita. O utilitário de setup usa a sua cópia apenas para verificar e extrair localmente os dados que a recompilação precisa.',
      'Você fornece dois arquivos seus, com esses nomes exatos: gds-0033.chd e 317-0384-com.pic, o CHD correspondente e o PIC de segurança que combina com ele.',
      'Baixe e extraia o ZIP da pré-release v2489, coloque os seus dois arquivos na pasta game files que vem dentro dele e rode o executável.',
      'O launcher do Windows confere cada entrada, diz qual arquivo está faltando ou está errado, extrai o que precisa e conserta um setup incompleto. Python não é necessário.',
      'Reserve cerca de 1,3 GB de espaço temporário livre durante a extração da primeira execução.',
      'Esta versão está marcada como obsoleta no próprio README, que manda procurar a build mais nova pelo canal do projeto. Veja a página da release antes de reportar problema.',
    ],
    en: [
      'This is not a Dreamcast port, and the released executable does not run the game through a NAOMI 2 BIOS — a BIOS is neither required nor accepted. The setup utility uses your copy only to verify and locally extract the data the recompilation needs.',
      'You supply two of your own files, with these exact names: gds-0033.chd and 317-0384-com.pic, the matching CHD and the security PIC that goes with it.',
      'Download and extract the v2489 prerelease ZIP, put your two files in the game files folder inside it, and run the executable.',
      'The Windows launcher checks each input, says which file is missing or incorrect, extracts what it needs and repairs an incomplete setup. Python is not required.',
      'Allow roughly 1.3 GB of temporary free space during the first-run extraction.',
      'This version is marked obsolete in the project own README, which points to a newer build through the project channel. Check the release page before reporting a problem.',
    ],
  },

  'chrissotraidis/projectreach': {
    pt: [
      'Comece pela edição de Xbox: ela tem a campanha completa, constrói em qualquer computador e precisa de um arquivo só seu — uma imagem de disco de Halo: Combat Evolved do Xbox original, o jogo de 2001.',
      'O arquivo termina em .iso ou .xiso e é usado como está. Se vier dentro de .zip, .7z ou .rar, descompacte antes.',
      'A melhor escolha é a versão americana (NTSC), a única testada em iPhone, iPad e Mac. O motor que o projeto usa diz que a europeia (PAL) e outras funcionam, mas elas não foram testadas aqui.',
      'Não servem: Halo de PC, Halo: Custom Edition, o Anniversary, a Master Chief Collection, Halo 2 ou qualquer Halo posterior, e as versões de Xbox 360, One ou Series.',
      'Depois de instalar, abra o programa, escolha acrescentar o seu disco de Xbox e selecione o arquivo. Ele copia os mapas, cerca de 2 GB, e então você pode jogar. A cópia dos mapas fica guardada, então a imagem de disco pode ser apagada depois.',
      'Se aparecer que o arquivo não é imagem de disco de Xbox, ou não é Halo: Combat Evolved, você escolheu o arquivo errado.',
      'A edição de PC (Custom Edition) é opcional, só serve para entrar nos servidores da comunidade, e exige um Mac com Apple silicon para construir, mais o instalador 1.00 original e um arquivo de texto com a sua chave de produto.',
      'Para atualizar, instale a versão nova por cima da antiga; nunca apague o aplicativo primeiro.',
    ],
    en: [
      'Start with the Xbox edition: it has the full campaign, it builds on any computer, and it needs only one file from you — a disc image of Halo: Combat Evolved for the original Xbox, the 2001 game.',
      'The file ends in .iso or .xiso and is used as it is. If it came inside a .zip, .7z or .rar, unpack it first.',
      'The best choice is the USA (NTSC) version, the only one tested on iPhone, iPad and Mac. The engine the project uses says the European (PAL) and other versions work, but they have not been tested here.',
      'These will not work: Halo for PC, Halo: Custom Edition, Anniversary, the Master Chief Collection, Halo 2 or any later Halo, and the Xbox 360, One or Series versions.',
      'After installing, open the app, choose to add your Xbox disc and select your file. It copies the maps, about 2 GB, and then you can play. It keeps its own copy of the maps, so the disc image can be deleted afterwards.',
      'A message that the file is not an Xbox disc image, or not Halo: Combat Evolved, means you picked the wrong file.',
      'The PC edition (Custom Edition) is optional, only for joining the community servers, and needs an Apple silicon Mac to build, plus the original 1.00 installer and a text file holding your product key.',
      'To update, install the new version over the old app; never delete it first.',
    ],
  },

  'vyanhursky/DefJamFFNY-recomp': {
    pt: [
      'Você precisa da sua própria imagem de disco americana de Xbox, ou do dump extraído dela, que combine com o manifesto de dumps suportados do projeto (config/dump-manifest.json).',
      'Baixe o setup do seu sistema na última release: instalador .exe no Windows, .dmg no macOS Apple Silicon, .tar.gz no Linux e Steam Deck.',
      'No setup, escolha o seu dump, a pasta de instalação e a pasta de dados. Se quiser texturas em HD, ligue a geração delas — isso pede mais disco e mais tempo de instalação.',
      'Deixe o setup verificar, recompilar e construir o jogo. Ele constrói a partir do seu dump em vez de baixar um jogo pronto.',
      'Depois abra o launcher, escolha as configurações de tela e de controle, e mande jogar. O overlay de F1 dentro do jogo muda as mesmas opções, que ficam em settings.ini na sua pasta de dados.',
      'O guia de instalação do projeto (docs/setup-installer.md) cobre requisitos por plataforma, os avisos de aplicativo não assinado, espaço em disco, atualizações e reparos.',
    ],
    en: [
      'You need your own USA Xbox disc image, or the extracted dump of it, matching the project supported dump manifest (config/dump-manifest.json).',
      'Download the setup for your system from the latest release: an .exe installer on Windows, a .dmg on Apple Silicon macOS, a .tar.gz on Linux and the Steam Deck.',
      'In setup, choose your dump, an install folder and a data folder. If you want HD textures, enable their generation — that needs more disk space and more install time.',
      'Let setup verify, recompile and build the game. It builds from your dump rather than downloading a precompiled game.',
      'Then open the launcher, choose your display and input settings, and press play. The F1 overlay in game changes the same options, which are stored in settings.ini in your data folder.',
      'The project install guide (docs/setup-installer.md) covers platform requirements, unsigned-app prompts, disk space, updates and repairs.',
    ],
  },

  'KaikoClanworth1/wwe-svr2011-pc': {
    pt: [
      'Serve uma cópia só: uma imagem .iso do seu disco de Xbox 360 de WWE SmackDown vs. Raw 2011. As versões de PS3, Wii, PS2 e PSP não funcionam.',
      'Baixe o ZIP da última release e descompacte onde quiser. Ele traz o launcher e o programa do jogo, sem nenhum dado de jogo.',
      'Abra SvR2011 Launcher.exe e vá na aba de instalação: escolha a sua .iso, escolha uma pasta vazia de destino e mande instalar. O launcher só lê a imagem, nunca a altera.',
      'A instalação copia cerca de 5,3 GB para fora da imagem e põe o programa de PC ao lado. Se você interromper, clique em instalar de novo mais tarde e ele continua de onde parou. Reserve cerca de 6 GB no total.',
      'Na aba de configurações escolha janela ou tela cheia, resolução e VSync; na aba de jogar, aperte jogar. Os saves ficam em Saves\\ dentro da pasta do jogo.',
      'Precisa de Windows 10 ou 11 64 bits, placa Direct3D 12 e processador de 2009 ou mais novo (SSE4.2). No Steam Deck ele roda a 55-60 quadros por Proton.',
      'Da versão 0.2.0 em diante o launcher se atualiza sozinho, mantendo saves, configurações, músicas e vídeos. Vindo da 0.1.0, que não tem atualizador, baixe a 0.2.0 uma vez e instale na mesma pasta do jogo.',
    ],
    en: [
      'Only one copy works: an .iso image of your own Xbox 360 WWE SmackDown vs. Raw 2011 disc. The PS3, Wii, PS2 and PSP versions will not work.',
      'Download the ZIP from the latest release and unzip it anywhere. It holds the launcher and the game program, with no game data.',
      'Open SvR2011 Launcher.exe and go to the Install tab: choose your .iso, choose an empty destination folder and click Install. The launcher only reads the image and never changes it.',
      'The install copies about 5.3 GB out of the image and puts the PC program beside it. If you stop it, click Install again later and it carries on where it left off. Leave about 6 GB in total.',
      'On the Settings tab pick windowed or fullscreen, the resolution and VSync; on the Play tab, press Play. Saves go to Saves\\ inside the game folder.',
      'You need 64-bit Windows 10 or 11, a Direct3D 12 GPU and a CPU from about 2009 or later (SSE4.2). On a Steam Deck it runs at 55-60 fps through Proton.',
      'From version 0.2.0 the launcher updates itself, keeping saves, settings, music and movies. Coming from 0.1.0, which has no updater, download 0.2.0 once and install it into the same game folder.',
    ],
  },

  'Alexbeav/fm4-recomp': {
    pt: [
      'A cópia validada é uma só: Forza Motorsport 4, edição europeia Game of the Year, title ID 4D530910, media ID 42C67824 — e o disco 1 dela, extraído.',
      'Uma ISO não serve: o port quer a pasta extraída. Nela precisam estar, direto na raiz, o default.xex, o XMediaFacade_default.xex e o SpeechFacade_default.xex, mais a árvore Media completa.',
      'Baixe o ZIP de Windows x64 da última release, extraia, copie a sua pasta extraída do disco 1 para dentro da pasta game dele e dê dois cliques em Launch FM4.bat. O ZIP já traz o executável e as DLLs; não precisa de compilador nem SDK para jogar.',
      'O conteúdo do disco 2 entra separado: extraia os quatro pacotes de conteúdo do seu disco 2 para um diretório e rode o .bat de instalação de disco 2 apontando para ele. O instalador confere o title ID e o tipo de conteúdo de cada pacote STFS antes de aceitar, e pacotes já instalados são pulados.',
      'Depois da instalação do disco 2, as execuções normais usam a cópia nos dados de usuário e não precisam mais do diretório de origem.',
      'Esta é uma release alpha experimental. Leia a página de limitações do projeto (docs/PLAYING.md) antes de reportar problema.',
    ],
    en: [
      'Only one copy is validated: Forza Motorsport 4, Europe Game of the Year edition, title ID 4D530910, media ID 42C67824 — and its disc 1, extracted.',
      'An ISO is not enough: the port wants the extracted folder. Directly inside it must sit default.xex, XMediaFacade_default.xex and SpeechFacade_default.xex, plus the full Media tree.',
      'Download the Windows x64 ZIP from the latest release, extract it, copy your extracted disc 1 into its game folder, and double-click Launch FM4.bat. The ZIP ships the executable and the required DLLs; no compiler or SDK is needed to play.',
      'Disc 2 content goes in separately: extract the four marketplace-content packages from your own disc 2 into one directory, then run the disc 2 install .bat pointing at it. The installer validates each STFS package title ID and content type before accepting it, and packages already installed are skipped.',
      'After the disc 2 install, normal launches use the copy in user data and no longer need the source directory.',
      'This is an experimental alpha release. Read the project limitations page (docs/PLAYING.md) before reporting a problem.',
    ],
  },

  'alexbeavs-ps1-ports/psxrecomp-ports': {
    pt: [
      'Cada download aqui é um kit de construção, não um executável jogável: não há dados de disco, BIOS, código gerado nem jogo pronto dentro dele. Você fornece o dump do disco original correspondente e o kit gera o jogo no seu PC.',
      'Os kits da Wave 1 (v0.2.3) exigem a BIOS de varejo que eles pedem, do seu próprio console. Os da Wave 2 (v0.3.0, v0.3.3, v0.3.4) recomendam uma BIOS SCPH de varejo da mesma região do jogo, e já incluem a OpenBIOS, de licença MIT, como alternativa.',
      'Extraia um kit por vez numa pasta com permissão de escrita, fora de Arquivos de Programas — por exemplo Documentos\\PSXRecomp.',
      'Nos kits antigos de Windows, o passo é o SETUP.bat: ele pede o .cue do disco 1 e a BIOS pedida, baixa as ferramentas com hash fixado e constrói o executável localmente. O primeiro setup leva alguns minutos. Depois disso, PLAY.bat abre o launcher, onde você atribui teclado ou controle a cada jogador.',
      'Os kits das Waves 3 e 4 têm instruções próprias: siga as da release que você baixou, em vez das do SETUP.bat.',
      'O executável construído localmente não é assinado, então o Windows pode avisar de publicador desconhecido. Para conferir um kit você mesmo, compare o SHA-256 do download com o .sha256 ao lado dele ou com o SHA256SUMS.txt da release.',
      'Dentro do jogo, F1 abre o menu: modos de tela, apresentação, filtragem de textura, volume, roteamento de portas de controle, e troca de disco durante a sessão.',
      'Limitação declarada: a maioria dos títulos passou por uma checagem automática de que inicia, não por uma conclusão do jogo de ponta a ponta. Leia as notas e o COMPATIBILITY.md da release escolhida.',
    ],
    en: [
      'Each download here is a build kit, not a playable executable: it contains no disc data, no BIOS, no generated code and no prebuilt game. You supply the dump of the matching original disc, and the kit generates the title on your PC.',
      'Wave 1 kits (v0.2.3) require the retail BIOS they ask for, from your own console. Wave 2 kits (v0.3.0, v0.3.3, v0.3.4) recommend a retail SCPH BIOS matching the game region, and already include the MIT-licensed OpenBIOS as a fallback.',
      'Extract one kit at a time into a normal writable folder, outside Program Files — for example Documents\\PSXRecomp.',
      'On the older Windows kits, the step is SETUP.bat: it asks for disc 1 CUE and the requested BIOS, downloads the hash-pinned tools and builds the executable locally. The first setup takes several minutes. After that PLAY.bat opens the launcher, where you assign keyboard or a gamepad to each player card.',
      'Wave 3 and Wave 4 kits have their own setup instructions: follow the ones for the release you downloaded rather than the SETUP.bat steps.',
      'The locally built executable is not signed, so Windows may warn about an unknown publisher. To check a kit yourself, compare the download SHA-256 with the .sha256 beside it or with the release SHA256SUMS.txt.',
      'In game, F1 opens the menu: fullscreen and window modes, presentation, texture filtering, volume, controller-port routing, and changing disc for the session.',
      'A stated limitation: most titles have an automated startup-survival pass, not an end-to-end completion claim. Read the notes and the COMPATIBILITY.md of the release you pick.',
    ],
  },

  'BlackLineInteractive/Driveclub-Port': {
    pt: [
      'Este repositório tem dois backends e cada um quer uma versão diferente do jogo. O de macOS, aqui, é para Mac Intel e espera a v1.05; o de Windows, documentado na pasta windows/, espera um dump descriptografado da v1.28.',
      'A cópia aceita é a sua de Driveclub de PlayStation 4, CUSA00003, como dump descriptografado (fSELF/fPKG). Nenhum arquivo do jogo vem no repositório.',
      'No Windows, as builds prontas de release não pedem Python nem ferramentas de compilação: baixe a release e aponte para o seu dump. Precisa de Windows 10/11 64 bits, CPU com AVX e placa com Vulkan 1.3.',
      'No macOS, a construção é local: Xcode, CMake 3.24 ou mais novo, Ninja e SDL3 (brew install cmake ninja sdl3), e um Mac Intel com GPU capaz de Metal 3.',
      'Para desempacotar o PKG, o projeto traz tools/extract.sh, que recebe o caminho do seu pacote e a pasta de saída.',
      'Este não é um emulador de uso geral: código de PS4 é x86-64 e, em Mac Intel, executa direto, sem recompilação de CPU. O que é substituído são as bibliotecas de sistema da Sony e a GPU.',
    ],
    en: [
      'This repository holds two backends, and each wants a different version of the game. The macOS one, here, is for Intel Macs and expects v1.05; the Windows one, documented in the windows/ folder, expects a decrypted dump of v1.28.',
      'The accepted copy is your own PlayStation 4 Driveclub, CUSA00003, as a decrypted dump (fSELF/fPKG). No game file ships in the repository.',
      'On Windows, the ready-to-play release builds need no Python and no build tools: download a release and point it at your dump. You need 64-bit Windows 10/11, a CPU with AVX and a GPU with Vulkan 1.3.',
      'On macOS, you build locally: Xcode, CMake 3.24 or newer, Ninja and SDL3 (brew install cmake ninja sdl3), and an Intel Mac with a Metal 3-capable GPU.',
      'To unpack the PKG, the project ships tools/extract.sh, which takes the path to your package and an output folder.',
      'This is not a general-purpose emulator: PS4 code is x86-64, so on Intel Macs it runs directly with no CPU recompilation. What gets replaced are Sony system libraries and the GPU.',
    ],
  },

  'cdlewis/snowboardkids2-recomp': {
    pt: [
      'Serve uma ROM só: a versão americana do lançamento de Nintendo 64 de Snowboard Kids 2. Isto não é um emulador e não roda outra ROM qualquer.',
      'Formatos diferentes de .z64 são convertidos automaticamente, desde que seja a ROM certa.',
      'Baixe a release e abra o programa: ele pede a sua ROM. Nem o repositório nem as releases contêm dados do jogo.',
      'Precisa de placa com Direct3D 12.0 (Shader Model 6), Vulkan 1.2 ou Metal com Argument Buffers Tier 2. Em x86-64, o processador também precisa de SSE4.1. No Windows, instale o Visual C++ Redistributable.',
      'Se o jogo travar ao iniciar, atualize o driver da placa de vídeo. Overlays como MSI Afterburner e programas como o Wallpaper Engine causam problemas de desempenho e podem impedir o jogo de desenhar direito.',
      'O save fica em %LOCALAPPDATA%\\SnowboardKids2Recompiled\\saves no Windows, em ~/.config no Linux e em ~/Library/Application Support no macOS. Um arquivo portable.txt ao lado do executável muda tudo para a pasta dele.',
      'Para trocar de jogo, não se troca a ROM: instalam-se mods, pelo suporte a mod do próprio port.',
    ],
    en: [
      'Only one ROM works: the US version of the Nintendo 64 release of Snowboard Kids 2. This is not an emulator and will not run any other ROM.',
      'Formats other than .z64 are converted automatically, as long as it is the correct ROM.',
      'Download the release and open the program: it asks for your ROM. Neither the repository nor the releases contain game assets.',
      'You need a GPU with Direct3D 12.0 (Shader Model 6), Vulkan 1.2 or Metal Argument Buffers Tier 2. On x86-64 the CPU also needs SSE4.1. On Windows, install the Visual C++ Redistributable.',
      'If it crashes on startup, update your graphics driver. Overlays such as MSI Afterburner, and software such as Wallpaper Engine, cause performance problems and can stop the game drawing correctly.',
      'The save file lives in %LOCALAPPDATA%\\SnowboardKids2Recompiled\\saves on Windows, ~/.config on Linux and ~/Library/Application Support on macOS. A portable.txt beside the executable moves everything into its own folder.',
      'To change the game you do not change the ROM: you install mods, through the port own mod support.',
    ],
  },

  'kirklandsig/halo2-decompiled': {
    pt: [
      'Atenção antes de começar: este é um projeto de descompilação em andamento, não um port jogável. Ele não contém dados do jogo, nem o executável, nem imagem de disco, e não produz um Halo 2 jogável no PC.',
      'O que ele faz é recriar a lógica do executável de varejo de Halo 2 do Xbox original em C e C++ legível, conferindo cada função recriada contra os bytes do executável original.',
      'Para construir ou conferir qualquer coisa, você fornece os arquivos originais da sua própria cópia. O XBE de varejo vai em orig/default.xbe (ou aponte a variável RETAIL_XBE para ele). Para tirar o XBE de uma imagem de disco sua, o projeto traz tools/xiso_extract.py.',
      'A conferência byte a byte hoje depende do compilador original: a pasta xbox do toolchain de desenvolvimento vai em sdk/xbox (ou na variável XDK_DIR). O projeto não distribui, não linka e não ajuda a obter esse material, e sem ele você ainda pode fazer análise, documentação e revisão.',
      'Instale as dependências de Python (pip install -r requirements-dev.txt). No Git Bash, rode também export MSYS_NO_PATHCONV=1, senão ele reescreve os argumentos com barra que o compilador recebe.',
      'A verificação é tools/check.py: ela constrói o jogo inteiro como uma imagem LTCG, compara cada função descompilada com os bytes de varejo e grava o estado de cada uma (matched, near ou todo) de volta no inventário. Ela sai com erro enquanto qualquer função divergir.',
      'Para escolher trabalho, tools/ready.py lista funções prontas para serem feitas, seguindo docs/DECOMPILING.md.',
    ],
    en: [
      'Before you start: this is a work-in-progress decompilation, not a playable port. It contains no game assets, no game executable and no disc image, and it does not produce a playable Halo 2 on PC.',
      'What it does is recreate the program logic of the retail Halo 2 executable for the original Xbox in readable C and C++, checking each recreated function against the retail executable bytes.',
      'To build or check anything you supply the original files from your own copy. The retail XBE goes at orig/default.xbe (or point the RETAIL_XBE variable at it). To read the XBE out of a disc image of your own copy, the project ships tools/xiso_extract.py.',
      'Byte-for-byte checking currently depends on the original compiler: the development toolchain xbox folder goes at sdk/xbox (or in XDK_DIR). The project does not distribute, link to or assist with obtaining that material, and without it you can still do analysis, documentation and review.',
      'Install the Python dependencies (pip install -r requirements-dev.txt). In Git Bash, also run export MSYS_NO_PATHCONV=1, or it rewrites the slash-style arguments the compiler takes.',
      'The check is tools/check.py: it builds the whole game as one LTCG image, compares every decompiled function with the retail bytes, and writes each function status (matched, near or todo) back into the inventory. It exits with an error while any function differs.',
      'To pick work, tools/ready.py lists the functions ready to be done, following docs/DECOMPILING.md.',
    ],
  },

  'omarma/tekken3-expanded': {
    pt: [
      'Este mod junta três fontes e todas vêm de você. A obrigatória é o Tekken 3 de PlayStation, versão americana SLUS-00402: um .cue com os .bin dele, uma faixa por .bin ou um .bin único com as três. A Track 1 tem 632.532.768 bytes e SHA-1 68f32a8657376cb4d4504c160fd5e8ae4a4f18d6.',
      'A segunda obrigatória é o ROM de arcade do Tekken Tag Tournament, o tektagt.zip: o conjunto tektagt (World, TEG2/VER.C1, set 1), ou tektagtuc1, tektagtub ou tektagtjc1, em formato non-merged. Os quatro importam os mesmos personagens; outras revisões não são suportadas.',
      'Opcionais: o tekken3.zip (conjunto tekken3, World TET2/VER.E1) para as dificuldades e os cenários de arcade, e o Tekken Tag Tournament de PlayStation 2 (SLUS-20001) só para a música das cinemáticas.',
      'O que vale é o conteúdo dos arquivos, não o nome: conjuntos feitos para versões antigas do MAME nomeiam os mesmos chips de outra forma e funcionam. Para conferir você mesmo, copie o zip sozinho numa pasta vazia com o nome esperado e rode o MAME 0.289 com -verifyroms; ele precisa dizer que o romset está bom.',
      'Deixe os arquivos onde quiser: o setup pergunta cada um e nunca os move nem altera. Mantenha o .cue junto de todos os .bin que ele lista, e não descompacte os zips de arcade.',
      'Dica que poupa trabalho: ponha tudo numa pasta só. Quando você escolhe o disco, o setup preenche tektagt.zip e tekken3.zip sozinho se eles estiverem ao lado.',
      'No Windows, instale o Python 3.13 mantendo o py launcher e o tcl/tk marcados, e extraia o pacote inteiro com o 7-Zip. Não inicie o setup de dentro do ZIP: o Windows roda de uma pasta temporária com só parte dos arquivos. Ponha a pasta num caminho curto sem caracteres especiais e fora do OneDrive.',
      'Rode o setup, que baixa o próprio compilador sem instalar nada no sistema e sem administrador, escolha os arquivos e espere. Ao terminar, o launcher abre e você clica em jogar.',
    ],
    en: [
      'This mod draws on three sources and all of them come from you. The required one is PlayStation Tekken 3, USA SLUS-00402: a .cue with its .bin files, one per track or a single .bin holding all three. Its Track 1 is 632,532,768 bytes, SHA-1 68f32a8657376cb4d4504c160fd5e8ae4a4f18d6.',
      'The second required one is the Tekken Tag Tournament arcade ROM, tektagt.zip: the tektagt set (World, TEG2/VER.C1, set 1), or tektagtuc1, tektagtub or tektagtjc1, non-merged. All four import the same characters; other revisions are not supported.',
      'Optional: tekken3.zip (the tekken3 set, World TET2/VER.E1) for the arcade difficulty levels and stages, and PlayStation 2 Tekken Tag Tournament (SLUS-20001) only for the cinematics music.',
      'What counts is the content of the files, not their names: sets made for older MAME versions name the same chips differently and work. To check yours, copy the zip alone into an empty folder under the expected name and run MAME 0.289 with -verifyroms; it must report the romset is good.',
      'Keep your files wherever you like: the setup asks for each one and never moves or changes them. Keep the .cue beside every .bin it lists, and do not unzip the arcade ROMs.',
      'A tip that saves work: put them all in one folder. When you choose the disc, the setup fills in tektagt.zip and tekken3.zip by itself if they sit next to it.',
      'On Windows, install Python 3.13 keeping the py launcher and tcl/tk ticked, and extract the whole package with 7-Zip. Do not start the setup from inside the ZIP: Windows then runs it from a temporary folder holding only part of the files. Put the folder on a short path without special characters and outside OneDrive.',
      'Run the setup, which downloads its own compiler without installing anything system-wide and without admin rights, choose your files, and wait. When it finishes the launcher opens and you press play.',
    ],
  },

  'YuutaTsubasa/Free-Riders-Recompiled': {
    pt: [
      'Você precisa da sua própria imagem de disco (.iso) de Sonic Free Riders de Xbox 360. Nada do jogo vem nos downloads.',
      'Baixe a release do seu sistema: zip no Windows, tarball no Linux, zip no macOS, .ipa no iOS ou APK no Android. Descompacte numa pasta só dela.',
      'Abra o programa e escolha a sua .iso quando o launcher pedir: ele copia os dados do jogo para junto de si. Depois mande iniciar o jogo.',
      'No Android, prefira o APK android10-arm64 se você tiver Android 10 ou mais novo: ele usa armazenamento nativo por thread e reduz o custo de CPU. O pacote android-arm64 mantém compatibilidade com Android 9. Os dois usam a mesma identidade de app e atualizam a instalação existente sem desinstalar.',
      'No iOS, você pode em vez disso copiar a .iso pelo app Arquivos para a pasta do jogo, onde o launcher a encontra.',
      'No macOS, abra o app pela primeira vez com clique direito e abrir: ele não é notarizado.',
      'Precisa de CPU com AVX no Windows e no Linux, e placa com Direct3D 12 ou Vulkan 1.2. No Mac, macOS 13.3 ou mais novo em Apple Silicon — ali os menus rodam cheios, mas as corridas ainda estão lentas num M1.',
    ],
    en: [
      'You need your own Xbox 360 disc image (.iso) of Sonic Free Riders. Nothing of the game ships in the downloads.',
      'Download the release for your system: the Windows zip, the Linux tarball, the macOS zip, the iOS .ipa or the Android APK. Unpack it into a folder of its own.',
      'Start the program and choose your .iso when the launcher asks: it copies the game data beside itself. Then press start game.',
      'On Android, prefer the android10-arm64 APK if you are on Android 10 or later: it uses native thread-local storage and cuts CPU overhead. The android-arm64 package keeps Android 9 compatibility. Both share the same app identity and update an existing install without uninstalling.',
      'On iOS you can instead copy the .iso with the Files app into the game folder, where the launcher finds it.',
      'On macOS, open the app the first time with right-click and Open: it is not notarised.',
      'You need a CPU with AVX on Windows and Linux, and a GPU with Direct3D 12 or Vulkan 1.2. On a Mac, macOS 13.3 or newer on Apple Silicon — there the menus run at full speed, but races are still slow on an M1.',
    ],
  },

  'OpenPortroid/ArmyOfTwoRecompilation': {
    pt: [
      'A cópia aceita é a sua de Army of Two no Xbox 360, release europeia, mais o Title Update 2. A DLC é opcional.',
      'Baixe o pacote da página de releases e extraia numa pasta com permissão de escrita, fora de Arquivos de Programas.',
      'Rode ArmyOfTwoLauncher.exe. Se o jogo não estiver instalado, ele abre a tela de instalação.',
      'Escolha a imagem de disco (.iso) ou o default.xex de um jogo extraído, e o pacote do Title Update 2, o arquivo TU_12K222C_0000004000000.00000000000G1. Pacotes de DLC são opcionais.',
      'Aperte instalar: os arquivos são copiados para assets\\. Reserve cerca de 6 GB de disco, mais 1,3 GB se você for instalar a DLC.',
      'Nas primeiras execuções o jogo compila shaders, então há engasgos curtos. Isso passa.',
      'Os saves ficam em Documentos\\armyoftworecomp_tu2. Para atualizar, extraia o pacote novo por cima do antigo.',
      'Precisa de Windows 10/11 x64 e placa com Direct3D 12. O modo cooperativo online funciona sem depender dos servidores da EA, e há tela dividida numa máquina só, com os dispositivos de cada jogador escolhidos no launcher.',
    ],
    en: [
      'The accepted copy is your own Xbox 360 Army of Two, European release, plus Title Update 2. DLC is optional.',
      'Download the package from the releases page and extract it into a writable folder, outside Program Files.',
      'Run ArmyOfTwoLauncher.exe. If the game is not installed, it opens the install screen.',
      'Choose the disc image (.iso) or the default.xex of an extracted game, and the Title Update 2 package, the file TU_12K222C_0000004000000.00000000000G1. DLC packages are optional.',
      'Press Install: the files are copied into assets\\. Leave about 6 GB of disk, plus 1.3 GB if you install the DLC.',
      'On the first runs the game compiles shaders, so there are short stutters. They go away.',
      'Saves live in Documents\\armyoftworecomp_tu2. To update, extract the new package over the old one.',
      'You need Windows 10/11 x64 and a GPU with Direct3D 12. Online co-op works without relying on EA servers, and there is split-screen on one PC, with each player devices chosen in the launcher.',
    ],
  },

  'nikolaygorb/ArmyOfTwoRecomp': {
    pt: [
      'Aqui não há release pronta: você compila, e a cópia do jogo precisa estar extraída do disco de Xbox 360, não em ISO.',
      'O dump esperado é a release de varejo com title ID 4541084C, module hash AA1EA03FEC9A549C e media ID 7E3E9BEA. Confira o seu contra esses valores.',
      'Para extrair uma ISO que você já tenha, o projeto indica o extract-xiso, que desempacota a árvore de arquivos do disco. Para despejar o disco e verificar contra os hashes, ele indica o ABGX360.',
      'Copie o conteúdo extraído direto para assets/, de modo que o default.xex fique em assets/default.xex, com o resto dos arquivos do disco ao lado (AO2Game/, $SystemUpdate/ e os demais). A pasta assets/ é ignorada pelo git de propósito.',
      'Clone com submódulos (--recurse-submodules, ou git submodule update --init --recursive numa cópia que já exista): o ReXGlue SDK é submódulo fixado e é compilado junto do jogo.',
      'Compile com os presets do CMake: win-amd64-release, linux-amd64-release ou mac-amd64-release. A tradução do default.xex para C++ roda automaticamente como etapa de build sempre que o manifesto muda.',
      'Requisitos: CMake 3.25 ou mais novo, Git, Ninja e Clang/LLVM.',
    ],
    en: [
      'There is no prebuilt release here: you build it, and your copy of the game has to be extracted from the Xbox 360 disc, not left as an ISO.',
      'The expected dump is the retail release with title ID 4541084C, module hash AA1EA03FEC9A549C and media ID 7E3E9BEA. Verify yours against those values.',
      'To extract an ISO you already have, the project points to extract-xiso, which unpacks the disc file tree. To dump the disc and verify it against the hashes, it points to ABGX360.',
      'Copy the extracted contents directly into assets/, so that default.xex sits at assets/default.xex with the rest of the disc files beside it (AO2Game/, $SystemUpdate/ and the others). The assets/ folder is gitignored on purpose.',
      'Clone with submodules (--recurse-submodules, or git submodule update --init --recursive in an existing clone): the ReXGlue SDK is a pinned submodule and is built together with the game.',
      'Build with the CMake presets: win-amd64-release, linux-amd64-release or mac-amd64-release. Translating default.xex into C++ runs automatically as a build step whenever the manifest changes.',
      'Requirements: CMake 3.25 or newer, Git, Ninja and Clang/LLVM.',
    ],
  },

  'Shagg88/Athelas': {
    pt: [
      'Este launcher cobre quatro jogos do Senhor dos Anéis, e cada um quer a sua própria cópia americana. Nenhum arquivo de jogo vem incluído.',
      'As três versões de Xbox original — As Duas Torres, O Retorno do Rei e A Sociedade do Anel — são aceitas como imagem de disco (.iso) ou como os arquivos extraídos, sempre da release americana. Outras releases são reconhecidas, mas avisam antes de iniciar.',
      'A versão de PC de O Retorno do Rei entra à parte: ali o launcher instala os arquivos do ROTK Fix (as DLLs e uma pasta ROTKFix) ao lado do rotk.exe. Os jogos de Xbox são apenas lidos, nunca alterados.',
      'Baixe o zip das releases, descompacte numa pasta só dele — não dentro de uma pasta de jogo — rode Athelas.exe e mostre os seus jogos a ele. Depois aperte jogar.',
      'Para o jogo de PC, é recomendado um driver com Vulkan 1.3. Sem ele, o jogo roda pelo Direct3D 8 do Windows com as opções exclusivas do DXVK desligadas; a aba Sobre do launcher mostra qual renderizador você vai ter. Os jogos de Xbox pedem placa com DirectX 12.',
      'O ROTK Fix substitui d3d8.dll e dinput8.dll na pasta do jogo e aplica correções na memória, do jeito usual de mods, e os arquivos não são assinados. Por isso o SmartScreen pode chamar o launcher de não reconhecido e algum antivírus pode marcá-lo. Cada zip tem um .sha256 ao lado para você comparar.',
      'Para desinstalar, use remover o ROTK Fix na aba Sobre do launcher e depois apague a pasta dele.',
    ],
    en: [
      'This launcher covers four Lord of the Rings games, and each wants its own US copy. No game files are included.',
      'The three original Xbox versions — The Two Towers, The Return of the King and The Fellowship of the Ring — are accepted as a disc image (.iso) or as the extracted files, always from the US release. Other releases are recognised, with a warning before they start.',
      'The PC version of The Return of the King goes in separately: there the launcher puts the ROTK Fix files (the DLLs and a ROTKFix folder) next to rotk.exe. The Xbox games are only read, never changed.',
      'Download the zip from Releases, unzip it into a folder of its own — not into a game folder — run Athelas.exe and show it your games. Then press Play.',
      'For the PC game, a Vulkan 1.3 driver is recommended. Without one it runs through Windows own Direct3D 8 with the DXVK-only options turned off; the launcher About tab shows which renderer you will get. The Xbox games need a DirectX 12 card.',
      'ROTK Fix replaces d3d8.dll and dinput8.dll in the game folder and patches the game in memory, the usual way for game mods, and its files are not code-signed. So SmartScreen may call the launcher unrecognised and some antivirus programs may flag it. Every zip has a .sha256 beside it to compare against.',
      'To uninstall, use the remove-ROTK-Fix action on the launcher About tab, then delete the launcher folder.',
    ],
  },

  'invinceble55-wq/Estacado-The-Darkness-Recomp': {
    pt: [
      'A versão recompilada é o disco americano/europeu de The Darkness no Xbox 360 (En, Fr, De, Es, It), title ID 545407EE. A imagem de referência tem SHA-256 46f7305c1e1972e888d3624f15b0ed483923aeeb50ecad0c6bf5b42f69d52a90 e o default.xex dela, SHA-256 aace35a8f9bcdc7f28aeab9ff8cf3bdf200353f5c83705f6284487347acb3c5f.',
      'Outras releases são aceitas quando contêm o mesmo código: o launcher descriptografa o seu default.xex e compara o código, a estrutura e os dados de que ele depende. Texto, fontes e strings podem diferir, então uma release localizada que só troque isso funciona e aparece no idioma dela.',
      'Uma release com código diferente — outra build do jogo, ou uma title update — ainda não roda. O launcher diz isso na cara e salva um relatório, game_version_report.txt na pasta logs, com nomes, tamanhos e hashes apenas.',
      'Baixe o zip das releases e extraia numa pasta sua, fora de Arquivos de Programas.',
      'Rode TheDarknessSettings.exe, o launcher. Na primeira execução ele pede o seu jogo: a imagem .iso, ou a pasta com os arquivos extraídos, a que contém o default.xex. Uma imagem é extraída para a pasta game ao lado do launcher.',
      'Escolha um preset (o Enhanced é o recomendado), ajuste o que quiser e aperte jogar.',
      'Reserve cerca de 8 GB livres se você usar imagem de disco. Precisa de CPU com AVX2 (Intel Haswell / AMD Zen ou mais novo), placa Direct3D 12 e o Visual C++ 2015-2022 Redistributable x64.',
    ],
    en: [
      'The recompiled version is the USA/Europe Xbox 360 disc of The Darkness (En, Fr, De, Es, It), title ID 545407EE. The reference image has SHA-256 46f7305c1e1972e888d3624f15b0ed483923aeeb50ecad0c6bf5b42f69d52a90 and its default.xex, SHA-256 aace35a8f9bcdc7f28aeab9ff8cf3bdf200353f5c83705f6284487347acb3c5f.',
      'Other releases are accepted when they contain the same code: the launcher decrypts your default.xex and compares its code, its structure and the data the code depends on. Text, fonts and strings may differ, so a localised release that only replaces those works and shows its own language.',
      'A release with different code — another build of the game, or a title update — does not run yet. The launcher says so plainly and saves a report, game_version_report.txt in the logs folder, with names, sizes and hashes only.',
      'Download the zip from Releases and extract it to a folder of your choice, outside Program Files.',
      'Run TheDarknessSettings.exe, the launcher. On first start it asks for your game: the .iso image, or the folder with the extracted files, the one that contains default.xex. An image is extracted into the game folder next to the launcher.',
      'Pick a preset (Enhanced is the recommended one), adjust anything you like and press Play.',
      'Leave about 8 GB free if you use a disc image. You need a CPU with AVX2 (Intel Haswell / AMD Zen or newer), a Direct3D 12 GPU and the Visual C++ 2015-2022 Redistributable (x64).',
    ],
  },

  'iExplosiveRage/DBZ-Burst-Limit-Recompiled': {
    pt: [
      'Serve uma versão só: Dragon Ball Z: Burst Limit de Xbox 360, americana NTSC-U. O código recompilado combina apenas com aquele default.xex, de 7.983.104 bytes e SHA-1 aec598f88cf51181fc377b148e0b1ad30db4485c.',
      'Com outra versão o jogo fecha logo depois de abrir, e o log na pasta logs mostra uma linha de função não registrada. É o erro mais comum aqui, e a única solução é usar a versão certa.',
      'Baixe o ZIP da última alpha e extraia onde quiser. Rode burstlimit.exe: na primeira vez ele pede a sua .iso e instala os arquivos do jogo a partir dela.',
      'Para fazer à mão, extraia a sua cópia (por exemplo com o extract-xiso) para uma pasta chamada game_data_root, com default.xex na raiz dela e a pasta LONG2DATA ao lado, contendo os .CPK, SFD e SOUND.',
      'O default.xex é necessário na compilação, porque o recompilador o lê; a pasta inteira é necessária na execução.',
      'Para conferir o hash: certutil -hashfile default.xex SHA1 no Windows, sha1sum default.xex no Linux.',
      'No Linux e no Steam Deck, baixe o ZIP de linux, que traz vkd3d-proton e DXVK ao lado e um run_linux.sh. A instalação pela .iso também funciona ali.',
      'As configurações ficam em burstlimit.toml e no menu de F1; qualquer uma também pode ir pela linha de comando.',
    ],
    en: [
      'Only one version works: Dragon Ball Z: Burst Limit for Xbox 360, USA NTSC-U. The recompiled code matches only that default.xex, 7,983,104 bytes, SHA-1 aec598f88cf51181fc377b148e0b1ad30db4485c.',
      'With another version the game closes right after it opens, and the log in the logs folder shows a no-function-registered line. That is the most common failure here, and the only fix is the right version.',
      'Download the latest alpha ZIP and extract it anywhere. Run burstlimit.exe: the first time it asks for your .iso and installs the game files from it.',
      'To do it by hand, extract your copy (for example with extract-xiso) into a folder called game_data_root, with default.xex at its root and the LONG2DATA folder beside it, holding the .CPK files, SFD and SOUND.',
      'default.xex is needed at build time, because the recompiler reads it; the whole folder is needed at run time.',
      'To check the hash: certutil -hashfile default.xex SHA1 on Windows, sha1sum default.xex on Linux.',
      'On Linux and the Steam Deck, download the linux ZIP, which ships vkd3d-proton and DXVK beside it and a run_linux.sh launcher. The .iso install works there too.',
      'Settings live in burstlimit.toml and in the F1 menu; any of them can also be passed on the command line.',
    ],
  },

  'GenryTheFox0/Project-2099': {
    pt: [
      'O caminho aqui é: você fornece a sua cópia de Xbox 360 de Spider-Man: Edge of Time, o instalador faz o trabalho pesado e constrói a edição de PC.',
      'A entrada pode ser uma ISO XDVDFS, um ZIP com a raiz do jogo, um ZIP com uma imagem GOD, uma pasta extraída contendo Default.xex e Data, uma pasta externa com uma raiz de jogo compatível, ou um contêiner GOD/SVOD. Uma imagem GOD pode ser escolhida em qualquer nível que um jogador provavelmente clique.',
      'O instalador reconhece as cópias compatíveis pelo conteúdo dos arquivos, incluindo os pacotes de fase que contêm diálogo embutido — nome do contêiner, rótulo de região ou um Default.xex igual não bastam. As revisões registradas são duas de varejo americanas/europeias, a base europeia, e dois GOD russos alternativos, sendo que esses dois podem conter texto e fontes alterados.',
      'Baixe o instalador da release correspondente e deixe-o baixar e verificar o pacote de suporte daquela mesma versão. Para instalação offline, ponha o ZIP do pacote ao lado do instalador ou escolha-o nele. Não misture instalador e pacote de betas diferentes.',
      'Escolha uma pasta de destino vazia, conclua a instalação e abra o Launcher.exe instalado.',
      'Depois de instalar, a ISO, o GOD ou a pasta extraída de origem não são mais necessários: a edição de PC roda inteira do destino escolhido e não fica presa à letra da unidade de origem.',
      'Se um pacote de origem não puder ser reconhecido e reconstruído, o instalador reporta aquele pacote em vez de colocar o texto dele na árvore de idioma errada. Há guias de instalação em seis idiomas no repositório.',
    ],
    en: [
      'The route here is: you provide your compatible Xbox 360 copy of Spider-Man: Edge of Time, the installer does the ugly work and builds the PC Edition.',
      'The input can be an XDVDFS ISO, a ZIP containing the game root, a ZIP containing a GOD image, an extracted folder containing Default.xex and Data, an outer folder holding one compatible game root, or a GOD/SVOD container. A GOD image may be selected at any level a player is likely to click.',
      'The installer recognises compatible sources by file contents, including the level packages that contain embedded dialogue — a container name, a region label or a matching Default.xex alone is not enough. The recorded revisions are two USA/Europe retail ones, the EU baseline, and two alternate Russian GOD packages, the last two of which may carry altered Russian text and font encodings.',
      'Download the installer attached to the matching release and let it download and verify the support package for that same version. For an offline install, place the payload ZIP beside the installer or select it in the installer. Do not mix installer and payload from different betas.',
      'Choose an empty destination folder, complete the installation and start the installed Launcher.exe.',
      'After a successful installation the source ISO, GOD or extracted folder is no longer needed: the PC Edition runs entirely from the chosen destination and is not tied to the source drive letter.',
      'If a source package cannot be matched and reconstructed, the installer reports that package instead of silently placing its text in the wrong language tree. The repository has install guides in six languages.',
    ],
  },

  'Masterllgod/naruto-storm-generations-port-nativo': {
    pt: [
      'O port foi feito a partir de uma versão só do executável: a do disco norte-americano, NTSC-U, de Naruto Shippuden: Ultimate Ninja Storm Generations no Xbox 360. Title ID 4E4D0842, media ID 05438F06.',
      'O que vale é o default.xex ser idêntico: 11.120.640 bytes, SHA-1 644359009af057b70fbdb0d48604222141416729. Confira com Get-FileHash no PowerShell ou sha1sum no Linux e macOS. O executável tem trava de região para NTSC-U e NTSC-J, sem PAL.',
      'Extraia o disco e mantenha a pasta inteira: o default.xex e o nxeart na raiz, e a pasta data/ com cpk/, cpkAdx/, save/, sound/, system/ e ui/ dentro.',
      'No Windows, baixe o .zip da página de releases, extraia numa pasta, abra NarutoStormGenerations.exe, clique em escolher pasta e aponte para a pasta que contém o default.xex. Ajuste as configurações e mande jogar.',
      'No Android, instale o APK, copie a pasta do jogo para o aparelho, abra o app, toque em escolher pasta e permita o acesso a todos os arquivos — o jogo lê os dados direto da pasta, sem copiar nada.',
      'As configurações, os saves e o cache de shaders ficam na pasta onde você extraiu o port (naruto.ini, data/, cache/), não na pasta do jogo.',
      'Na primeira vez que cada cena aparece, o jogo compila shaders e pode engasgar. Nas vezes seguintes eles já estão salvos.',
    ],
    en: [
      'The port was made from one version of the executable only: the North American NTSC-U disc of Naruto Shippuden: Ultimate Ninja Storm Generations on Xbox 360. Title ID 4E4D0842, media ID 05438F06.',
      'What counts is that your default.xex is identical: 11,120,640 bytes, SHA-1 644359009af057b70fbdb0d48604222141416729. Check it with Get-FileHash in PowerShell or sha1sum on Linux and macOS. The executable is region-locked to NTSC-U and NTSC-J, with no PAL.',
      'Extract the disc and keep the whole folder: default.xex and nxeart at its root, and the data/ folder with cpk/, cpkAdx/, save/, sound/, system/ and ui/ inside it.',
      'On Windows, download the .zip from the releases page, extract it into a folder, open NarutoStormGenerations.exe, click the choose-folder button and point it at the folder that contains default.xex. Adjust the settings and press play.',
      'On Android, install the APK, copy the game folder onto the device, open the app, tap choose folder and allow access to all files — the game reads the data straight from that folder, copying nothing.',
      'Settings, saves and the shader cache live in the folder where you extracted the port (naruto.ini, data/, cache/), not in the game folder.',
      'The first time each scene appears the game compiles shaders and may stutter. After that they are already saved.',
    ],
  },

  'tmcleroy/cps2recomp': {
    pt: [
      'Cada jogo aqui é feito a partir de uma revisão exata do conjunto de ROM, e conjuntos de outras regiões ou revisões são recusados: as funcionalidades usam endereços encontrados naquele programa específico.',
      'Os conjuntos aceitos são sfa (Europa 950727), sfa2u (EUA 960430), sgemf (EUA 970904), xmvsf (Europa 961004), spf2t (Europa 960529), vsavj (Japão 970519), vsav2 (Japão 970913), vhunt2 (Japão 970929), avspu (EUA 940520) e dino (World 930201). O Vampire Savior Definitive precisa de vsavj e vsav2 juntos.',
      'Cada conjunto entra como zip (com o zip do conjunto-pai ao lado, se a sua coleção guarda os arquivos compartilhados lá) ou como pasta com os arquivos dele. Num jogo de CPS-2, o conjunto precisa incluir o arquivo de chave.',
      'Baixe a build do seu sistema na página de releases e descompacte. Abra o launcher e, na página de jogos, escolha a pasta onde você guarda os seus conjuntos: ele encontra cada jogo pelo nome do conjunto. Também dá para arrastar um conjunto ou a pasta para a janela.',
      'O launcher confere cada arquivo por checksum e diz qual está faltando ou está diferente. Os seus conjuntos ficam onde estão.',
      'Aperte jogar ao lado de um jogo. Vários podem rodar ao mesmo tempo, cada um na sua janela. Durante o jogo, Esc ou F1 abre o menu interno.',
      'No macOS, o app não é notarizado: na primeira vez, clique com o direito e escolha abrir. E mova o app para a pasta de Aplicativos antes de abri-lo, porque o launcher precisa poder escrever na própria pasta para se atualizar.',
    ],
    en: [
      'Each game here is made from one exact ROM set revision, and sets of other regions and revisions are refused: the features use addresses found in that specific program.',
      'The accepted sets are sfa (Europe 950727), sfa2u (USA 960430), sgemf (USA 970904), xmvsf (Europe 961004), spf2t (Europe 960529), vsavj (Japan 970519), vsav2 (Japan 970913), vhunt2 (Japan 970929), avspu (USA 940520) and dino (World 930201). Vampire Savior Definitive needs both vsavj and vsav2.',
      'Each set goes in as a zip (with its parent set zip beside it, if your collection keeps the shared files there) or as a folder of the set files. For a CPS-2 game, the set must include its key file.',
      'Download the build for your system from the releases page and unpack it. Open the launcher and, on its Games page, pick the folder where you keep your ROM sets: it finds each game by the set name. You can also drop a set, or the folder, on the window.',
      'The launcher checks every file by checksum and tells you which one is missing or different. Your sets stay where they are.',
      'Press Play beside a game. Several can run at once, each in its own window. While playing, Esc or F1 opens the in-game menu.',
      'On macOS the app is not notarized: the first time, right-click it and choose Open. And move the app into Applications before opening it, because the launcher needs to be able to write to its own folder to update itself.',
    ],
  },

  'mr-finster/vf2-recomp': {
    pt: [
      'O que o port recompila é o programa do próprio arcade, para o i960 da placa Model 2A, lido do seu vf2.zip a cada início. Só o programa do i960 é recompilado; o resto da placa roda em código do MAME.',
      'Baixe a release do seu sistema: zip de macOS, zip de Windows ou tar.gz de Linux e Steam Deck.',
      'No Mac e no Windows, descompacte (no Mac, mova o app para Aplicativos; no Windows, a pasta em qualquer lugar menos dentro de Arquivos de Programas), abra o programa e escolha o seu vf2.zip quando ele pedir. Uma cópia fica guardada, então isso é uma vez só.',
      'No Steam Deck, copie o download para o aparelho e descompacte lá mesmo, pelo gerenciador de arquivos em Modo Desktop. Descompactar no Windows, ou copiar a pasta por pendrive, pode perder as permissões dos arquivos, e então nada abre.',
      'No Deck, ponha o seu vf2.zip na pasta roms dentro da pasta do jogo, acrescente o programa à Steam como jogo não-Steam e deixe a compatibilidade com Proton desligada: é um jogo Linux nativo, e o Proton impede que ele abra.',
      'Modo portátil: um arquivo chamado portable.txt ao lado do programa faz tudo ficar naquela pasta — configurações, saves, capturas, log.txt e a cópia do seu zip.',
      'Para usar a sua própria pasta de ROMs, inicie com --roms <pasta>, ou defina a variável VF2_ROMS, ou acrescente roms_folder ao settings.ini. O log.txt diz qual pasta foi usada.',
      'As builds de Mac e Windows não são assinadas. No macOS, abra uma vez, feche a mensagem e use a opção de abrir mesmo assim em Privacidade e Segurança.',
    ],
    en: [
      'What the port recompiles is the arcade own program, for the Model 2A board i960 CPU, read from your vf2.zip each time it starts. Only the i960 program is recompiled; the rest of the board runs on MAME code.',
      'Download the release for your system: the macOS zip, the Windows zip, or the tar.gz for Linux and the Steam Deck.',
      'On Mac and Windows, unzip it (Mac: move the app to Applications; Windows: the folder anywhere but inside Program Files), open the program and choose your vf2.zip when it asks. A copy is kept, so you only do this once.',
      'On a Steam Deck, copy the download to the Deck and unpack it there, with the file manager in Desktop Mode. Unpacking on Windows, or copying the folder through a USB stick, can lose the files permissions, and then nothing launches.',
      'On the Deck, put your vf2.zip in the roms folder inside the game folder, add the program to Steam as a non-Steam game, and leave the Proton compatibility option off: it is a native Linux game, and Proton stops it launching.',
      'Portable mode: a file named portable.txt beside the program keeps everything in that folder — settings, saves, screenshots, log.txt and the copy of your zip.',
      'To use your own ROM folder, start it with --roms <folder>, or set the VF2_ROMS environment variable, or add roms_folder to settings.ini. log.txt names the folder it used.',
      'The Mac and Windows builds are not signed. On macOS, open it once, close the message, then use Open Anyway in Privacy and Security.',
    ],
  },

  'mr-finster/vf1-recomp': {
    pt: [
      'O que o port recompila é o programa NEC V60 do próprio arcade, lido do seu vf.zip, e reimplementa o resto da placa Model 1 em volta dele a partir do trabalho do MAME.',
      'Baixe a release do seu sistema: zip de macOS, zip de Windows ou tar.gz de Steam Deck e Linux x86-64.',
      'No Mac e no Windows, descompacte (no Mac, mova o app para Aplicativos; no Windows, a pasta em qualquer lugar menos dentro de Arquivos de Programas), abra o programa e escolha o seu vf.zip quando ele pedir. Uma cópia fica guardada, então isso é uma vez só.',
      'No Steam Deck, copie o download para o aparelho e descompacte lá, pelo gerenciador de arquivos em Modo Desktop: descompactar no Windows ou copiar por pendrive pode perder as permissões, e então nada abre.',
      'No Deck, ponha o seu vf.zip na pasta roms dentro da pasta do jogo, acrescente o programa à Steam como jogo não-Steam e deixe a compatibilidade com Proton desligada: é build Linux nativa.',
      'Modo portátil: um portable.txt ao lado do programa guarda tudo naquela pasta. Para apontar para a sua própria pasta de ROMs, use --roms <pasta>, a variável VF_ROMS ou roms_folder no settings.ini; ali ele procura o vf.zip e, se você tiver, o model1io.zip.',
      'As builds de Mac e Windows não são assinadas. No macOS, abra uma vez, feche a mensagem e use a opção de abrir mesmo assim em Privacidade e Segurança.',
    ],
    en: [
      'What the port recompiles is the arcade own NEC V60 program, read from your vf.zip, reimplementing the rest of the Model 1 board around it from MAME work.',
      'Download the release for your system: the macOS zip, the Windows zip, or the tar.gz for the Steam Deck and x86-64 Linux.',
      'On Mac and Windows, unzip it (Mac: move the app to Applications; Windows: the folder anywhere but inside Program Files), open the program and choose your vf.zip when it asks. A copy is kept, so you only do this once.',
      'On a Steam Deck, copy the download to the Deck and unpack it there with the file manager in Desktop Mode: unpacking on Windows or copying through a USB stick can lose the files permissions, and then nothing launches.',
      'On the Deck, put your vf.zip in the roms folder inside the game folder, add the program to Steam as a non-Steam game, and leave the Proton compatibility option off: it is a native Linux build.',
      'Portable mode: a portable.txt beside the program keeps everything in that folder. To point it at your own ROM folder, use --roms <folder>, the VF_ROMS variable or roms_folder in settings.ini; there it looks for vf.zip and, if you have it, model1io.zip.',
      'The Mac and Windows builds are not signed. On macOS, open it once, close the message, then use Open Anyway in Privacy and Security.',
    ],
  },

  'sp00nznet/redalert2-recomp': {
    pt: [
      'A cópia aceita aqui não é um disco de console: é a sua instalação de PC de Command & Conquer: Red Alert 2 e Yuri\'s Revenge pela Steam ou pelo EA App (Origin) — a pasta que contém game.exe e gamemd.exe.',
      'Os binários recompilados são o game.exe 1.006 e o gamemd.exe 1.001. Os dois jogos saem da mesma instalação, cada um no seu próprio executável.',
      'O caminho mais fácil é o instalador: baixe o da sua plataforma na última release, abra, e ele encontra o jogo na Steam ou no EA App — ou você aponta a pasta.',
      'Mande construir e, quando terminar, jogar. A primeira construção leva de 30 a 60 minutos e cerca de 6 GB, instalando as ferramentas que faltarem (no Windows, os Build Tools do Visual Studio, pedindo permissão uma vez).',
      'A alternativa são os scripts de setup: baixe o repositório como ZIP, descompacte num lugar com 6 GB livres e rode Setup.cmd no Windows ou ./setup.sh no Linux e macOS. O script pergunta antes de instalar qualquer coisa e, se você rodar de novo, pula as etapas já feitas.',
      'Os instaladores ainda não são assinados: no Windows o SmartScreen pergunta primeiro; num Mac, clique com o direito e escolha abrir.',
      'No jogo: F10 configurações, F11 tela cheia, F12 escala, F9 mods no menu principal (Linux e macOS). Num Mac, segure fn para as teclas F e use Option+Return para tela cheia.',
      'Isto não é o OpenRA, que é um motor separado reimplementando as regras: aqui roda o código da própria Westwood, recompilado.',
    ],
    en: [
      'The copy accepted here is not a console disc: it is your own PC install of Command & Conquer: Red Alert 2 and Yuri\'s Revenge from Steam or the EA App (Origin) — the folder holding game.exe and gamemd.exe.',
      'The recompiled binaries are game.exe 1.006 and gamemd.exe 1.001. Both games build from the same install, each into its own executable.',
      'The easiest route is the installer: download the one for your system from the latest release and open it — it finds your game in Steam or the EA App, or you point it at the folder.',
      'Press build and, when it is done, play. The first build takes 30 to 60 minutes and about 6 GB, installing the tools it needs (on Windows, Visual Studio Build Tools, asking for permission once).',
      'The alternative is the setup scripts: download the repository as a ZIP, unzip it somewhere with 6 GB free and run Setup.cmd on Windows or ./setup.sh on Linux and macOS. The script asks before installing anything and, on a rerun, skips the steps already finished.',
      'The installers are not signed yet: on Windows SmartScreen asks first; on a Mac, right-click and choose Open.',
      'In game: F10 settings, F11 fullscreen, F12 scaling, F9 mods at the main menu (Linux and macOS). On a Mac hold fn for the F keys and use Option+Return for fullscreen.',
      'This is not OpenRA, a separate engine that reimplements the rules: this runs Westwood own code, recompiled.',
    ],
  },

  'andrebrumdev/gow2-recomp': {
    pt: [
      'Este é um port para macOS, e a cópia aceita é a sua de God of War II HD de PlayStation 3, NPUA80491 — a pasta PS3_GAME, do seu PS3 ou do dev_hdd0/game/NPUA80491 do seu RPCS3 — mais a sua licença, o arquivo .rap correspondente.',
      'O kit monta o binário nativo no seu Mac: aponte o setup.sh para a sua pasta PS3_GAME, e ele acha o .rap no exdata do RPCS3 ou na pasta de Downloads.',
      'O setup descriptografa o EBOOT.BIN do mesmo jeito que o RPCS3 faz, recompila o código PPU com o lifter fixado, recompila os sete programas SPU, extrai os vídeos do seu gow2.psarc e liga o executável.',
      'Cada arquivo gerado é conferido contra os hashes que acompanham o kit, e o resultado é idêntico byte a byte à build que o projeto testa.',
      'Para jogar com interface, o launcher nativo (GoW2 Recomp.app) é construído por launcher/macos/build_app.sh. Nele você aponta o seu EBOOT.ELF e a sua USRDIR, escolhe opções de gráficos, áudio e controle, e gerencia mods.',
      'O launcher calcula o hash PPU do seu executável no estilo do RPCS3 e lê patches de patch.yml. Patches de dados, como proporção de tela, têm efeito; patches de código são apenas sinalizados, porque o código já foi recompilado e precisaria de uma nova tradução.',
      'Controles: WASD move, mouse na câmera, Espaço/E/J/K são os botões de ação, Enter é Start, F11 ou Cmd+Enter alterna tela cheia, Esc solta o mouse.',
    ],
    en: [
      'This is a macOS port, and the accepted copy is your own PlayStation 3 God of War II HD, NPUA80491 — the PS3_GAME folder, from your PS3 or from your RPCS3 dev_hdd0/game/NPUA80491 — plus your license, the matching .rap file.',
      'The kit builds the native binary on your Mac: point setup.sh at your PS3_GAME folder, and it finds the .rap in RPCS3 exdata or in your Downloads folder.',
      'Setup decrypts EBOOT.BIN itself the same way RPCS3 does, recompiles the PPU code with the pinned lifter, recompiles the seven SPU programs, extracts the movies from your gow2.psarc and links the executable.',
      'Every generated file is checked against the hashes shipped with the kit, and the result is byte-identical to the build the project tests.',
      'For a graphical launcher, the native GoW2 Recomp.app is built by launcher/macos/build_app.sh. In it you point at your EBOOT.ELF and your USRDIR, pick graphics, audio and control options, and manage mods.',
      'The launcher computes your executable RPCS3-style PPU hash and reads patches from patch.yml. Data patches, such as aspect ratio, take effect; code patches are only flagged, because the code was already recompiled and would need a re-lift.',
      'Controls: WASD to move, mouse for the camera, Space/E/J/K for the face buttons, Enter for Start, F11 or Cmd+Enter for fullscreen, Esc releases the mouse.',
    ],
  },

  'saulob/geometry-wars-retro-evolved-2-recompiled': {
    pt: [
      'A cópia aceita é o seu pacote Xbox Live Arcade de Geometry Wars: Retro Evolved 2, e nesta versão exata: title ID 584108FF, tipo de conteúdo 000D0000, pacote STFS LIVE, media ID 191FF297, versão 0.0.1.2.',
      'O que identifica a versão é o default.xex: 704.512 bytes, CRC32 5E9B6313, SHA-1 048B852E52A8C776C7AE752141591701B7EA5E69. Contêineres de pacote podem variar entre cópias, e o launcher confere o xex depois de extrair.',
      'Baixe o ZIP do Windows da última release e extraia onde você possa escrever. Rode geometry_wars_retro_evolved_2.exe para abrir o launcher.',
      'Na página de jogar, use instalar a partir do pacote e escolha o seu. Ele é um arquivo só, de nome hexadecimal longo e sem extensão; numa unidade de Xbox 360 fica em Content\\0000000000000000\\584108FF\\000D0000\\.',
      'Espere até aparecer que está pronto para jogar: os arquivos do jogo são copiados para a pasta game ao lado do programa. O arquivo do pacote em si não é copiado para lá.',
      'Qualquer outra versão é recusada, porque o port foi construído para esse código exato. A opção de reinstalar a partir do pacote conserta os arquivos do jogo e mantém configurações e saves.',
      'Configurações, perfil, pontuações, conquistas, progressão e cache de shaders ficam numa pasta user_data portátil ao lado do programa: copiar a pasta inteira para outro PC leva os seus dados com ela.',
      'Precisa de Windows 10/11 64 bits com placa DirectX 12, ou Linux 64 bits / Steam Deck com Vulkan, este último experimental.',
    ],
    en: [
      'The accepted copy is your own Xbox Live Arcade package of Geometry Wars: Retro Evolved 2, and this exact version: title ID 584108FF, content type 000D0000, an STFS LIVE package, media ID 191FF297, game version 0.0.1.2.',
      'What identifies the version is default.xex: 704,512 bytes, CRC32 5E9B6313, SHA-1 048B852E52A8C776C7AE752141591701B7EA5E69. Package containers can differ between copies, and the launcher checks the xex after extracting it.',
      'Download the Windows ZIP from the latest release and extract it somewhere you can write to. Run geometry_wars_retro_evolved_2.exe to open the launcher.',
      'On the Play page, use install-from-package and pick yours. It is a single file with a long hexadecimal name and no extension; on an Xbox 360 drive it is in Content\\0000000000000000\\584108FF\\000D0000\\.',
      'Wait until it says it is ready to play: the game files are copied into the game folder next to the program. The package file itself is not copied there.',
      'Any other version is refused, because the port is built for this exact game code. The reinstall-from-package action repairs the game files and keeps your settings and saves.',
      'Settings, profile, scores, achievements, progression and the shader cache live in a portable user_data folder next to the program: copying the whole folder to another PC takes your data with it.',
      'You need 64-bit Windows 10/11 with a DirectX 12 GPU, or 64-bit Linux / a Steam Deck with Vulkan, the latter experimental.',
    ],
  },

  'saulob/hard-corps-uprising-recompiled': {
    pt: [
      'A cópia aceita é o seu pacote Xbox Live Arcade de Hard Corps: Uprising, e nesta versão exata: title ID 58410A18, tipo de conteúdo 000D0000, pacote STFS LIVE, media ID 3C5663CB, versão 0.0.0.3.',
      'O que identifica a versão é o default.xex: 12.955.648 bytes, CRC32 3DF903B9, SHA-256 530EDE8ED5271051A2AB19C077A97FB167E4F30B094C292E8F59D37D0D2069DC. O launcher confere o xex depois de extrair, porque contêineres variam entre cópias.',
      'Baixe o ZIP do Windows da última release, extraia onde você possa escrever e rode hard_corps_uprising.exe para abrir o launcher.',
      'Na página de jogar, use instalar a partir do pacote e escolha o seu — um arquivo só, de nome hexadecimal longo e sem extensão, que numa unidade de Xbox 360 fica em Content\\0000000000000000\\58410A18\\000D0000\\.',
      'Espere até aparecer que está pronto para jogar: cerca de 1 GB vai para a pasta game ao lado do programa. Qualquer outra versão é recusada.',
      'A DLC (Harley Daniels, Sayuri e Leviathan) é opcional e não vem incluída: instale o jogo primeiro e então, na página de DLC, escolha cada pacote seu. O launcher confere que é pacote de Hard Corps: Uprising (mesmo title ID, tipo de conteúdo 00000002) e recusa o pacote do jogo e outros.',
      'A DLC instalada fica na pasta user_data ao lado do programa, não na pasta do jogo: reinstalar o jogo não a remove.',
      'Precisa de Windows 10/11 64 bits com placa DirectX 12, ou Linux 64 bits / Steam Deck com Vulkan, este último experimental.',
    ],
    en: [
      'The accepted copy is your own Xbox Live Arcade package of Hard Corps: Uprising, and this exact version: title ID 58410A18, content type 000D0000, an STFS LIVE package, media ID 3C5663CB, game version 0.0.0.3.',
      'What identifies the version is default.xex: 12,955,648 bytes, CRC32 3DF903B9, SHA-256 530EDE8ED5271051A2AB19C077A97FB167E4F30B094C292E8F59D37D0D2069DC. The launcher checks the xex after extracting, because containers differ between copies.',
      'Download the Windows ZIP from the latest release, extract it somewhere you can write to, and run hard_corps_uprising.exe to open the launcher.',
      'On the Play page, use install-from-package and pick yours — a single file with a long hexadecimal name and no extension, which on an Xbox 360 drive is in Content\\0000000000000000\\58410A18\\000D0000\\.',
      'Wait until it says it is ready to play: about 1 GB goes into the game folder next to the program. Any other version is refused.',
      'The DLC (Harley Daniels, Sayuri and Leviathan) is optional and not included: install the game first, then on the DLC page pick each of your own packages. The launcher checks it is a Hard Corps: Uprising package (same title ID, content type 00000002) and refuses the game package and others.',
      'Installed DLC lives in the user_data folder next to the program, not in the game folder: reinstalling the game does not remove it.',
      'You need 64-bit Windows 10/11 with a DirectX 12 GPU, or 64-bit Linux / a Steam Deck with Vulkan, the latter experimental.',
    ],
  },

  'CaiusCodes/GoldenEye-007-XBLA-PC-Recomp': {
    pt: [
      'A cópia aceita é o seu pacote Xbox Live Arcade de GoldenEye 007 — o arquivo de jogo de Xbox 360 do title ID 584108A9.',
      'Baixe o ZIP da última release e extraia a pasta do jogo onde você quiser, fora de Arquivos de Programas.',
      'Abra o executável do jogo. Na primeira vez a janela de setup abre: use o botão de procurar pacote e escolha o seu. Alternativa: deixe o arquivo do pacote ao lado do executável, ou numa pasta Game Package ao lado dele, e ele é encontrado e importado automaticamente.',
      'Marque os extras que quiser (iniciar em tela cheia, atalho na área de trabalho, jogo 100% completo) e mande jogar.',
      'Daí em diante, abrir o executável entra direto no jogo: o pacote não é mais necessário. Tudo fica dentro da pasta extraída — resources\\assets para os dados importados, resources\\userdata para saves e configurações — então ela pode ser movida ou copiada inteira.',
      'Vindo de uma release antiga, com um Setup separado e uma pasta Game: extraia para dentro ou ao lado da pasta antiga e o setup importa direto da instalação anterior, saves e configurações incluídos.',
      'O setup só lê o seu pacote e nunca o altera. Ele não baixa nada, e nem o setup nem o jogo contatam o Xbox Live.',
      'Precisa de Windows 10 ou 11 64 bits e placa com DirectX 12.',
    ],
    en: [
      'The accepted copy is your own Xbox Live Arcade package of GoldenEye 007 — the Xbox 360 game file for title ID 584108A9.',
      'Download the ZIP from the latest release and extract the game folder wherever you like, outside Program Files.',
      'Open the game executable. The first time, the setup window opens: use its browse-package button and pick yours. Alternatively, leave the package file beside the executable, or in a Game Package folder next to it, and it is found and imported automatically.',
      'Tick any extras you want (start in fullscreen, a desktop shortcut, 100% game completion) and press play.',
      'From then on, opening the executable starts the game straight away: the package is not needed again. Everything stays inside the extracted folder — resources\\assets for the imported game data, resources\\userdata for saves and settings — so it can be moved or backed up as a whole.',
      'Coming from an older release with a separate Setup program and a Game folder: extract into or next to the old folder and setup imports straight from the old install, saves and settings included.',
      'Setup only reads your package and never changes it. It downloads nothing, and neither setup nor the game contacts Xbox Live.',
      'You need 64-bit Windows 10 or 11 and a GPU with DirectX 12.',
    ],
  },

  'SulphurS16/ACFA-Port': {
    pt: [
      'A cópia aceita é a sua de ARMORED CORE for Answer no disco americano, BLUS30187 — e são os arquivos do disco que importam: a pasta que contém PS3_GAME.',
      'Além do jogo, este port pede duas coisas suas: o RPCS3, usado uma vez só durante o setup para descriptografar alguns arquivos, e o arquivo PS3UPDAT.PUP do software de sistema 4.93, que você baixa na página oficial de software de sistema do PS3 da Sony.',
      'Opcional: o pacote da atualização 01.35 do jogo, posto na pasta do jogo ou ao lado do PS3UPDAT.PUP.',
      'Baixe o ZIP da última release, extraia numa pasta com espaço (por exemplo C:\\Games\\ACFA-Port) e abra ACFA-Launcher.exe.',
      'Em pasta do jogo, escolha a que contém PS3_GAME. Então use preparar arquivos e aponte o seu rpcs3.exe e o seu PS3UPDAT.PUP. Quando o RPCS3 perguntar se quer instalar o firmware, aceite; se você tiver a atualização, aceite instalar o pacote também. Isso leva cerca de um minuto e não altera o seu RPCS3.',
      'Depois mande configurar: ele baixa as ferramentas de compilação e constrói o jogo. Leva alguns minutos e só é feito uma vez. Escolha se quer atalho e entrada no menu Iniciar, e aperte jogar.',
      'Já descriptografou os arquivos você mesmo? Pule o passo do RPCS3 e escolha a pasta deles na opção de arquivos descriptografados; o menu do launcher lista quais arquivos o port precisa.',
      'Reserve cerca de 4 GB livres e conexão com a internet. Para atualizar, descompacte a release nova numa pasta nova ou por cima da antiga, abra o launcher dela e mande configurar: ele encontra a instalação anterior e refaz só o que mudou.',
    ],
    en: [
      'The accepted copy is your own ARMORED CORE for Answer on the US disc, BLUS30187 — and what matters is the disc files: the folder that contains PS3_GAME.',
      'Besides the game, this port asks for two more things of yours: RPCS3, used once during setup to decrypt a few files, and the PS3UPDAT.PUP file of system software 4.93, which you download from Sony official PS3 system software page.',
      'Optional: the game 01.35 update package, placed in the game folder or beside PS3UPDAT.PUP.',
      'Download the ZIP from the latest release, extract it into a folder with enough space (for example C:\\Games\\ACFA-Port) and open ACFA-Launcher.exe.',
      'Under game folder, choose the one that contains PS3_GAME. Then use prepare-files and point it at your rpcs3.exe and your PS3UPDAT.PUP. When RPCS3 asks whether to install firmware, say yes; if you have the update, accept installing the package too. This takes about a minute and does not change your RPCS3.',
      'Then press set up: it downloads the build tools and builds the game. That takes a few minutes and happens once. Choose whether you want a desktop shortcut and a Start menu entry, and press play.',
      'Already decrypted the files yourself? Skip the RPCS3 step and choose their folder under decrypted files instead; the launcher menu lists which files the port needs.',
      'Leave about 4 GB free and have an internet connection. To update, unzip the new release into a new folder or over the old one, start its launcher and press set up: it finds your earlier install and rebuilds only what changed.',
    ],
  },

  'YuutaTsubasa/ChaotixRecompiled': {
    pt: [
      'Serve uma ROM só: Knuckles\' Chaotix (Japão, EUA) de Sega 32X, SHA-1 0c2fff7bc79ed26507c08ac47464c3af19f7ced7. Nenhuma BIOS de 32X é necessária.',
      'Na primeira execução, uma tela de setup pede a sua ROM. Ela lista as que consegue encontrar (Downloads, Documentos, uma pasta __ROM__ ao lado do executável, a pasta do próprio app no Android); você também pode arrastar o arquivo para a janela ou apertar O para procurar.',
      'O arquivo é verificado por SHA-1 e copiado para a pasta do próprio app, então as execuções seguintes entram direto no jogo. Se o hash não bater, a mensagem de erro mostra o caminho escolhido e os dois valores de SHA-1 — é por aí que você descobre que a ROM é outra.',
      'Para compilar, você passa o caminho da ROM na configuração do CMake (-DCHAOTIX_ROM=...): o build roda o recompilador sobre a sua ROM e compila o C++ gerado. Sem essa variável, sai só um runtime de interpretador e os testes unitários, que é o que a CI constrói, porque a CI não tem ROM.',
      'Requisitos de compilação: CMake 3.20 ou mais novo, compilador C++17, e SDL3 com SDL_ttf para a interface jogável. GCC, Clang e MSVC todos compilam a árvore sem avisos.',
      'Builds cruzadas (Android, iOS) não rodam o recompilador: compile uma vez num host com a ROM para que a pasta generated exista, e então configure a build de destino, que a aproveita.',
    ],
    en: [
      'Only one ROM works: Knuckles\' Chaotix (Japan, USA) for the Sega 32X, SHA-1 0c2fff7bc79ed26507c08ac47464c3af19f7ced7. No 32X BIOS is needed.',
      'On the first launch a setup page asks for your ROM. It lists the ones it can find (Downloads, Documents, an __ROM__ folder next to the executable, the app own folder on Android); you can also drag the file onto the window or press O to browse.',
      'The file is verified by SHA-1 and copied into the app own folder, so later launches go straight into the game. If the hash does not match, the error shows the selected path and both SHA-1 values — that is how you find out your ROM is a different one.',
      'To build, you pass the ROM path to the CMake configure step (-DCHAOTIX_ROM=...): the build runs the recompiler over your ROM and compiles the generated C++. Without that variable you get an interpreter-only runtime and the unit tests, which is what CI builds, since CI has no ROM.',
      'Build requirements: CMake 3.20 or newer, a C++17 compiler, and SDL3 plus SDL_ttf for the playable frontend. GCC, Clang and MSVC all build the tree warning-free.',
      'Cross builds (Android, iOS) do not run the recompiler: build once on a host with the ROM so the generated folder exists, then configure the target build, which picks it up.',
    ],
  },

  'AbdelmoumenDeghbouche/wipeout_pc': {
    pt: [
      'Tudo vem do seu próprio PlayStation 4. O alvo de desenvolvimento é WipEout Omega Collection CUSA07671 (americana), versão 01.00 com a atualização 01.07, juntadas numa pasta só — os arquivos da atualização substituem os do jogo base. A CUSA05670 europeia não foi testada.',
      'Um eboot.bin só roda os três jogos da coleção: WipEout 2048, WipEout HD e WipEout Fury.',
      'Para montar a pasta a partir dos seus pacotes, o projeto traz scripts/pkg_extract.py: extraia o pacote base para uma pasta e a atualização para outra, e então mova os arquivos da atualização sobre a pasta do jogo base. Uma pasta despejada com GoldHEN funciona do mesmo jeito.',
      'Baixe wipeout-windows.zip da última release, extraia, abra WipEout.exe, escolha a sua pasta do jogo — a que tem o eboot.bin — e clique em jogar.',
      'Precisa de Windows 10 ou 11 64 bits, CPU com AVX e placa com Vulkan 1.3. No Linux, é compilar do código-fonte.',
      'Se o jogo não iniciar, o carregador para na primeira função de sistema que o runtime ainda não tem e imprime o nome dela. Há um modo de checagem de imports no runner para listar essas funções de antemão.',
      'Status declarado: desenvolvimento inicial — menus e corridas (HD e 2048) rodam acima de 60 quadros. Leia a tabela de progresso do README antes de esperar o jogo inteiro.',
    ],
    en: [
      'Everything comes from your own PlayStation 4. The development target is WipEout Omega Collection CUSA07671 (US), version 01.00 with update 01.07, merged into one folder — the update files replace the base game ones. The EU CUSA05670 is untested.',
      'One eboot.bin runs all three games in the collection: WipEout 2048, WipEout HD and WipEout Fury.',
      'To build the folder from your own packages, the project ships scripts/pkg_extract.py: extract the base package into one folder and the update into another, then move the update files over the base game folder. A folder dumped with GoldHEN works the same way.',
      'Download wipeout-windows.zip from the latest release, extract it, open WipEout.exe, choose your game folder — the one with eboot.bin — and click play.',
      'You need 64-bit Windows 10 or 11, a CPU with AVX and a GPU with Vulkan 1.3. On Linux, you build from source.',
      'If the game does not start, the loader stops at the first system function the runtime does not implement and prints its name. The runner has an import-check mode to list those functions ahead of time.',
      'Stated status: early development — menus and races (HD and 2048) play above 60 FPS. Read the progress table in the README before expecting the whole game.',
    ],
  },

  'shaneomac1337/WWE-AllStars-Recomp': {
    pt: [
      'São duas coisas obrigatórias, as duas suas: a imagem de disco (.iso) de WWE All Stars no Xbox 360, release americana/europeia, e o Title Update 2 dele, despejado do seu próprio console. A DLC é opcional e também vem do seu console.',
      'Onde fica o Title Update 2: na unidade do console ou no pendrive, o arquivo tu00000005_00000000 em Content\\0000000000000000\\54510866\\000B0000, ou um arquivo cujo nome começa com TU_ na pasta Cache do console. O launcher também aceita uma pasta com ele dentro (um Content inteiro de pendrive serve) ou um zip, 7z ou rar.',
      'Baixe o ZIP da última release e extraia tudo numa pasta normal, por exemplo C:\\Games\\WWEAllStars. Não rode de dentro do zip, e evite Arquivos de Programas.',
      'Abra WWEAllStarsLauncher.exe. Se o SmartScreen avisar, escolha mais informações e executar mesmo assim: o launcher não é assinado, e isso acontece uma vez.',
      'Escolha a sua .iso (ou arraste para a janela), depois o Title Update 2 e, se quiser, a DLC. O setup copia e verifica tudo e prepara os shaders: leva alguns minutos e acontece uma vez. Os seus arquivos são apenas lidos.',
      'Reserve cerca de 8 GB livres. Precisa de Windows 10 ou 11 64 bits e placa com Vulkan e driver atualizado. O launcher recusa qualquer coisa que não seja a versão certa.',
      'Depois do primeiro setup, o jogo abre sozinho pelo executável dentro da pasta game — útil para atalho ou para acrescentar à Steam no Modo Jogo de um Steam Deck. O launcher continua sendo o lugar de mudar configurações, acrescentar DLC e consertar uma instalação.',
      'Ao atualizar, os seus saves estão em userdata: copie essa pasta para dentro da versão nova.',
    ],
    en: [
      'Two things are required, both yours: the disc image (.iso) of WWE All Stars on Xbox 360, USA/Europe release, and its Title Update 2, dumped from your own console. DLC is optional and also comes from your console.',
      'Where Title Update 2 is: on the console drive or a USB stick, the file tu00000005_00000000 in Content\\0000000000000000\\54510866\\000B0000, or a file whose name starts with TU_ in the console Cache folder. The launcher also takes a folder with it inside (a whole USB Content folder works) or a zip, 7z or rar.',
      'Download the ZIP from the latest release and extract all of it to a normal folder, for example C:\\Games\\WWEAllStars. Do not run it from inside the zip, and avoid Program Files.',
      'Open WWEAllStarsLauncher.exe. If SmartScreen warns you, choose More info, then Run anyway: the launcher is not code-signed, so this happens once.',
      'Choose your .iso (or drop it on the window), then Title Update 2, and optionally DLC. Setup copies and verifies everything and prepares the shaders: it takes a few minutes and happens once. Your files are only read, never changed.',
      'Leave about 8 GB free. You need 64-bit Windows 10 or 11 and a GPU with Vulkan and an up-to-date driver. The launcher refuses anything that is not the right version.',
      'After the first setup, the game starts on its own from the executable inside the game folder — handy for a shortcut or for adding it to Steam in Game Mode on a Steam Deck. The launcher is still where you change settings, add DLC and repair an install.',
      'When updating, your saves are in userdata: copy that folder into the new version folder.',
    ],
  },

  'wivi514/Dead_Rising_2_Case_Zero_Xenon_Recomp': {
    pt: [
      'A cópia aceita é o arquivo de pacote XBLA que o seu Xbox 360 baixou — cerca de 825 MB, sem extensão de arquivo. Na unidade do console ele está em Content/0000000000000000/58410A8D/000D0000/, com um nome longo de letras e números.',
      'Baixe a release do seu sistema (Windows, Linux, Steam Deck ou Mac Apple Silicon) e descompacte onde quiser.',
      'Copie o arquivo do pacote para a pasta assets/package/ dentro da pasta que você descompactou. Copiar a pasta 58410A8D inteira também funciona, e arrastar o arquivo para a janela do launcher também.',
      'Rode o executável do runtime. A primeira execução arruma tudo sozinha, com barra de progresso: desempacota o seu pacote, prepara os 1.367 shaders do jogo (cerca de 10 segundos) e gera os recursos de menu e de ícones a partir dos seus dados. As execuções seguintes entram direto.',
      'Se faltar algo, o jogo diz exatamente o que e onde — ele não falha com tela preta de propósito.',
      'Reserve cerca de 2 GB livres depois do desempacotamento da primeira execução. Precisa de placa com Vulkan 1.3.',
      'No Steam Deck, use o download próprio de Steam Deck e faça a primeira execução em Modo Desktop: ela leva cerca de um minuto e o Modo Jogo não mostra o progresso. No Mac, rode xattr -dr com.apple.quarantine na pasta descompactada antes da primeira abertura, porque a build não é notarizada.',
      'No Linux, a v1.0.1 exige glibc 2.43 e se recusa a iniciar abaixo disso, o que inclui qualquer SteamOS; a v1.0.2 foi construída sobre uma base mais antiga (glibc 2.35) e também sai como AppImage.',
    ],
    en: [
      'The accepted copy is the XBLA package file your Xbox 360 downloaded — about 825 MB, with no file extension. On the console storage it is at Content/0000000000000000/58410A8D/000D0000/, under a long string of letters and numbers.',
      'Download the release for your system (Windows, Linux, Steam Deck or Apple Silicon Mac) and unpack it anywhere.',
      'Copy the package file into the assets/package/ folder inside the folder you just unpacked. Copying the whole 58410A8D folder in also works, as does dragging the file onto the launcher window.',
      'Run the runtime executable. The first run sets everything up by itself under a progress bar: it unpacks your package, prepares the game 1,367 shaders (about 10 seconds) and generates the menu and prompt assets from your data. Later launches go straight into the game.',
      'If anything needed is missing, the game tells you exactly what and where — it never fails with a blank screen on purpose.',
      'Leave about 2 GB free after the first-run unpacking. You need a GPU with Vulkan 1.3.',
      'On a Steam Deck, use the dedicated Steam Deck download and do the first run in Desktop Mode: it takes about a minute and Game Mode shows no progress. On a Mac, run xattr -dr com.apple.quarantine on the unzipped folder before the first launch, because the build is not notarised.',
      'On Linux, v1.0.1 needs glibc 2.43 and refuses to start below it, which includes every SteamOS; v1.0.2 is built on an older base (glibc 2.35) and also ships as an AppImage.',
    ],
  },

  'wivi514/Dead_Rising_2_Case_West_Xenon_Recomp': {
    pt: [
      'A cópia aceita é o arquivo de pacote XBLA que o seu Xbox 360 baixou — cerca de 1,2 GB, sem extensão de arquivo. Na unidade do console ele está em Content/0000000000000000/58410B00/000D0000/, com um nome longo de letras e números.',
      'Baixe a release do seu sistema (Windows, Linux, Steam Deck ou Mac Apple Silicon) e descompacte onde quiser.',
      'Copie o arquivo do pacote para a pasta assets/package/ dentro da pasta descompactada. Copiar a pasta 58410B00 inteira também funciona, e arrastar o arquivo para a janela do launcher também.',
      'Rode o executável do runtime. A primeira execução desempacota o seu pacote, prepara os 1.322 shaders do jogo (7,5 segundos num desktop de 16 threads, mais em menos núcleos — ele usa todos) e gera a arte dos ícones de teclado a partir dos seus dados.',
      'Se faltar algo, o jogo diz exatamente o que e onde. O README dentro do pacote tem uma seção de solução de problemas.',
      'Os seus saves e configurações ficam fora da pasta do jogo (no Windows, em Jogos Salvos\\Dead Rising 2 Case West\\; no Linux, em ~/.local/share/), então você pode apagar ou trocar a pasta do jogo quando quiser sem perder progresso.',
      'No Mac, rode xattr -dr com.apple.quarantine na pasta descompactada antes da primeira abertura: a build não é notarizada.',
      'O prólogo, Dead Rising 2: Case Zero, é portado do mesmo jeito e compartilha quase tudo com este — se um deles funciona na sua máquina, o outro provavelmente também.',
    ],
    en: [
      'The accepted copy is the XBLA package file your Xbox 360 downloaded — about 1.2 GB, with no file extension. On the console storage it is at Content/0000000000000000/58410B00/000D0000/, under a long string of letters and numbers.',
      'Download the release for your system (Windows, Linux, Steam Deck or Apple Silicon Mac) and unpack it anywhere.',
      'Copy the package file into the assets/package/ folder inside the unpacked folder. Copying the whole 58410B00 folder in also works, as does dragging the file onto the launcher window.',
      'Run the runtime executable. The first run unpacks your package, prepares the game 1,322 shaders (7.5 s on a 16-thread desktop, longer on fewer cores — it uses all of them) and generates the keyboard prompt art from your data.',
      'If anything needed is missing, the game tells you exactly what and where. The README inside the bundle has a troubleshooting section.',
      'Your saves and settings live outside the game folder (Windows: Saved Games\\Dead Rising 2 Case West\\; Linux: ~/.local/share/), so you can delete or replace the game folder at any time without losing progress.',
      'On a Mac, run xattr -dr com.apple.quarantine on the unzipped folder before the first launch: the build is not notarized.',
      'The prologue, Dead Rising 2: Case Zero, is ported the same way and shares almost everything with this one — if one of them works on your machine, the other probably will too.',
    ],
  },

  'novapowers0/BloodyRoar2Recomp': {
    pt: [
      'O port traz um executável universal só: o código recompilado de cada região está ligado dentro dele, e no boot o runtime lê o SYSTEM.CNF do disco que você montou e roda o código daquela região. Você não escolhe uma build, você escolhe o seu disco.',
      'As regiões suportadas são a europeia (SLES-01722) e a americana (SCUS-94424). A do Japão/Ásia (SLPS-01842) está incluída para teste e ainda não é oficialmente suportada.',
      'Um disco de região não suportada falha com um erro de identidade claro, em vez de cair no código de outra região.',
      'Baixe o zip do seu sistema na última release e descompacte onde quiser: cada zip é autossuficiente, com executável, OpenBIOS, recursos do launcher e mods dentro.',
      'Ponha a sua imagem de Bloody Roar II (.bin/.cue, .iso ou .chd) ao lado da pasta. O launcher pede na primeira execução e guarda a escolha.',
      'Dê dois cliques no .exe no Windows, ou rode o executável no Linux depois de dar chmod +x.',
      'Se você tiver uma BIOS de varejo SCPH-1001.BIN do seu próprio console ao lado do executável, ela é usada; se não, a OpenBIOS que vem no pacote entra no lugar.',
      'Nenhum Python, compilador ou etapa de setup é necessário para jogar: o jogo recompilado já está compilado dentro do executável.',
    ],
    en: [
      'The port ships a single universal executable: the recompiled code for every region is linked into it, and at boot the runtime reads the SYSTEM.CNF of the disc you mounted and runs that region code. You do not pick a build, you pick your disc.',
      'The supported regions are Europe (SLES-01722) and USA (SCUS-94424). Japan/Asia (SLPS-01842) is included for testing and is not officially supported yet.',
      'An unsupported region disc fails with a clear identity error rather than falling through to another region code.',
      'Download the zip for your system from the latest release and unzip it anywhere: each zip is self-contained, with the executable, OpenBIOS, launcher assets and mods inside.',
      'Put your own Bloody Roar II image (.bin/.cue, .iso or .chd) beside the folder. The launcher asks for it on first run and remembers it.',
      'Double-click the .exe on Windows, or run the executable on Linux after chmod +x.',
      'If you have a retail SCPH-1001.BIN BIOS from your own console next to the executable, it is used; otherwise the bundled OpenBIOS takes its place.',
      'No Python, compiler or setup step is needed to play: the recompiled game is already compiled inside the executable.',
    ],
  },

  'parkerallan/doa3-recomp': {
    pt: [
      'A cópia aceita é a sua de Dead or Alive 3 na versão americana, como imagem de disco de Xbox original (.xiso). Nenhum arquivo do jogo vem incluído.',
      'Baixe a última release na aba de releases e abra DOA3.exe. Na primeira execução ele pede a sua imagem: os arquivos de assets são extraídos automaticamente e os dados de save são criados.',
      'Quando isso terminar, o jogo está pronto. Todos os modos são jogáveis.',
      'A tecla Escape abre o menu de overlay, onde ficam o modo online, o mapeamento de controle e as outras configurações.',
      'O jogo roda travado em 60 quadros, com opções de janela ou sem borda, 4:3 ou 16:9, e escala de resolução interna até 1440p (3x).',
      'Se der problema, o log em doa3_log.txt ajuda — é o que o projeto pede junto de um relatório.',
      'Para compilar em vez de usar a release: Visual Studio 2022 (C11) e CMake 3.20 ou mais novo; o executável sai na pasta de release do build.',
    ],
    en: [
      'The accepted copy is your own USA version of Dead or Alive 3, as an original Xbox disc image (.xiso). No game files are included.',
      'Download the latest release from the releases tab and open DOA3.exe. On the first launch it asks for your image: the asset files are extracted automatically and save data is created.',
      'Once that finishes the game is ready. All game modes are playable.',
      'The Escape key opens the overlay menu, which holds online play, controller mapping and the other settings.',
      'The game runs capped at 60 FPS, with windowed or borderless options, 4:3 or 16:9, and internal resolution scaling up to 1440p (3x).',
      'If something goes wrong, the log at doa3_log.txt helps — it is what the project asks for alongside a report.',
      'To build instead of using the release: Visual Studio 2022 (C11) and CMake 3.20 or newer; the executable lands in the build release folder.',
    ],
  },

  'PauloUbirajara/asuras-wrath-recomp': {
    pt: [
      'Aqui não há instalador: você compila e aponta o jogo para a sua cópia extraída. A cópia aceita é a sua ISO de Xbox 360 de Asura\'s Wrath.',
      'A ISO precisa ser extraída, e o projeto indica o extract-xiso para isso. Extraia para uma pasta chamada extracted ao lado do executável.',
      'Se a sua pasta extraída estiver em outro lugar, passe o caminho pelo argumento --game_data_root.',
      'Para compilar: CMake 3.25 ou mais novo e um toolchain de Clang com Ninja. Há presets de CMake para Linux, Windows e Android, e scripts de build que também empacotam um zip de release em out/dist.',
      'A DLC ainda não é suportada nem testada: há uma etapa opcional no README, mas ela está marcada como não funcional.',
      'Os caminhos do runtime são configuráveis por flags: --cache_root para o cache de pipelines e shaders Vulkan, --update_data_root para patches e DLC, --user_data_root para saves e perfil, que por padrão fica em Documentos no Windows e em ~/.local/share no Linux.',
    ],
    en: [
      'There is no installer here: you build it and point the game at your extracted copy. The accepted copy is your own Xbox 360 ISO of Asura\'s Wrath.',
      'The ISO has to be extracted, and the project points to extract-xiso for that. Extract it into a folder called extracted beside the executable.',
      'If your extracted folder is somewhere else, pass its path with the --game_data_root argument.',
      'To build: CMake 3.25 or newer and a Clang toolchain with Ninja. There are CMake presets for Linux, Windows and Android, plus build scripts that also package a release zip in out/dist.',
      'DLC is not supported or tested yet: there is an optional step in the README, but it is marked as not working.',
      'The runtime paths are configurable by flags: --cache_root for the Vulkan pipeline and shader cache, --update_data_root for patches and DLC, --user_data_root for saves and profile, which defaults to Documents on Windows and ~/.local/share on Linux.',
    ],
  },

  'alexbatalov/fallout2-re': {
    pt: [
      'Atenção antes de começar: se o seu objetivo é jogar, não é aqui. Este repositório é a Reference Edition, uma reconstrução do código original com as imperfeições dele; quem quer jogar deve usar o Fallout 2 Community Edition, que é baseado neste projeto.',
      'A cópia aceita é a sua instalação de PC de Fallout 2, comprada na GOG ou na Steam. Nenhum arquivo do jogo vem aqui.',
      'O executável gerado, fallout2-re.exe, funciona como substituto direto do fallout2.exe: copie-o para a pasta do seu Fallout 2 e rode.',
      'Baixe a build mais recente, ou compile do código-fonte; não há etapa de conversão de dados, porque ele lê os arquivos da instalação onde está.',
      'Um punhado de funções ainda não está descompilado. Elas não são essenciais para jogar: a maioria é resto do Fallout 1, e as outras fazem parte de APIs que o jogo não usava por inteiro.',
      'O objetivo declarado é restaurar o código original o mais próximo possível, não melhorar o jogo. Há um esforço paralelo de levar o código para C89, para permitir resultados binariamente idênticos com o compilador Watcom.',
    ],
    en: [
      'Before you start: if your goal is to play, this is not the place. This repository is the Reference Edition, a reconstruction of the original code with its imperfections; if you want to play, use Fallout 2 Community Edition, which is based on this project.',
      'The accepted copy is your own PC install of Fallout 2, bought on GOG or Steam. No game files ship here.',
      'The executable it produces, fallout2-re.exe, works as a drop-in replacement for fallout2.exe: copy it into your Fallout 2 directory and run it.',
      'Download the latest build, or build from source; there is no data conversion step, because it reads the files of the install it sits in.',
      'A small number of functions are not yet decompiled. They are not essential to gameplay: most are leftovers from Fallout 1, and the others are part of APIs the game never fully used.',
      'The stated goal is to restore the original source as closely as possible, not to improve the game. A parallel effort moves the codebase to C89, to allow binary-identical results with the Watcom compiler.',
    ],
  },

  'nmlgc/ReC98': {
    pt: [
      'Atenção antes de começar: este é um projeto de reconstrução de código das cinco Touhou de PC-98, não um port. O que a compilação produz são os executáveis originais do jogo, bit a bit iguais aos do ZUN — não um programa de PC moderno.',
      'E eles não rodam sozinhos: os executáveis compilados exigem os arquivos de dados originais de cada jogo na mesma pasta. O projeto não inclui nenhum dado das releases originais de PC-98.',
      'Os executáveis saem em bin\\th0?, com os mesmos nomes dos originais. Você fornece os dados da sua própria cópia ao lado deles.',
      'Para compilar, basta rodar o build.bat: ele faz a coisa certa em qualquer sistema suportado, e aborta com erro se alguma ferramenta necessária não estiver no PATH do Windows.',
      'As ferramentas exigidas são antigas e específicas: o Borland Turbo C++ 4.0J, que é o compilador que o ZUN usou e o único que compila este código de forma determinística para executáveis idênticos, e o Turbo Assembler (TASM) 5.0 ou mais novo para 32 bits de Windows.',
      'O MS-DOS Player e o Tup já vêm junto: o primeiro emula as ferramentas DOS no console do Windows, e o segundo cuida de recompilar só o que mudou.',
      'O build bundled do MS-DOS Player foi otimizado para este projeto, rodando um núcleo x86 reduzido — ele acelera a compilação em torno de 60% numa reconstrução completa comparado às builds de upstream.',
    ],
    en: [
      'Before you start: this is a source reconstruction project for the five PC-98 Touhou games, not a port. What the build produces are the game original executables, bit-perfect to ZUN own — not a modern PC program.',
      'And they do not run on their own: the compiled executables require each game original data files in the same directory. The project includes no asset data from the original PC-98 releases.',
      'The executables land in bin\\th0?, using the same names as the originals. You supply your own copy data beside them.',
      'To build, just run build.bat: it does the right thing on any supported platform, and aborts with an error if any necessary tool is missing from the Windows PATH.',
      'The required tools are old and specific: Borland Turbo C++ 4.0J, the compiler ZUN originally used and the only one that deterministically compiles this code into bit-perfect executables, and Borland Turbo Assembler (TASM) 5.0 or later for 32-bit Windows.',
      'MS-DOS Player and Tup are bundled: the first emulates the DOS tools on the Windows console, the second ensures only what changed gets rebuilt.',
      'The bundled MS-DOS Player build is profile-optimized for this project, running a reduced x86 core — it speeds up a complete rebuild by around 60% compared with the upstream builds.',
    ],
  },

  'DogParty/iPodClickWheelRecomps': {
    pt: [
      'São seis jogos aqui, cada um na sua pasta, e cada um precisa dos arquivos descriptografados do próprio jogo, tirados da sua própria cópia. Nada do jogo vem no repositório.',
      'Cada jogo tem a sua pasta numerada no iPod, e é essa pasta que você aponta: 88888 para Mini Golf, 99999 para Cubis 2, 33333 para Hold-Em, 1B200 para Lost, 1500C para Sims Bowling e 12345 para Vortex.',
      'No macOS, Linux e Windows, a primeira abertura pergunta a pasta do jogo. O programa então confere cada arquivo contra os tamanhos e checksums com que ele foi feito, e a guarda ao lado dos seus saves daí em diante.',
      'No Switch e no Android não há seletor de arquivos para perguntar, então a pasta do jogo precisa estar no lugar antes da primeira abertura. Cada build diz na tela onde é esse lugar.',
      'Mini Golf é o mais adiantado: é o único sem código traduzido por máquina sobrando e o único que roda no Switch e no Android.',
      'No Linux e no Switch não há janela de configurações, porque ela é nativa de cada sistema; e a música de fundo não toca nesses dois, porque as faixas .m4a precisam de um decodificador que o macOS, o Windows e o Android têm e esses não.',
      'Os jogos esperavam uma click wheel. Os recomps mapeiam isso para o que a sua máquina tem — setas, analógico ou d-pad — e no macOS e no Windows as teclas podem ser remapeadas.',
      'Cada pasta de jogo tem o seu próprio README, com como compilar, o que ainda é recompilado em vez de reescrito e como rodar.',
    ],
    en: [
      'There are six games here, each in its own folder, and each one needs its own decrypted game files, taken from your own copy. Nothing of the games ships in the repository.',
      'Each game has its numbered folder on the iPod, and that is the folder you point at: 88888 for Mini Golf, 99999 for Cubis 2, 33333 for Hold-Em, 1B200 for Lost, 1500C for Sims Bowling and 12345 for Vortex.',
      'On macOS, Linux and Windows the first launch asks for the game folder. The program then checks every file against the sizes and checksums it shipped with, and keeps it beside your saves from then on.',
      'On the Switch and on Android there is no file browser to ask you, so the game folder has to be in place before the first launch. Each build tells you on screen where that is.',
      'Mini Golf is the furthest along: it is the only one with no machine-translated code left in it and the only one that runs on a Switch or on Android.',
      'On Linux and the Switch there is no settings window, because that one is native to each system; and background music does not play on those two, because the .m4a tracks need a decoder that macOS, Windows and Android each have and those do not.',
      'The games expected a click wheel. The recomps map that to what your machine does have — arrow keys, a gamepad stick or a d-pad — and on macOS and Windows the keys can be rebound.',
      'Each game folder has its own README, with how to build it, what is still recompiled rather than rewritten, and how to run it.',
    ],
  },

  'whylurking/IsaacRecomp': {
    pt: [
      'A cópia aceita aqui não é um disco: é o Isaac.exe da sua instalação de The Binding of Isaac na Steam — e é nele que estão todos os gráficos, sons e código do jogo.',
      'Na pasta da Steam há dois executáveis. O Isaac.exe é o jogo; o Binding_of_Isaac.exe é só o launcher da Steam e não serve aqui. Para abrir a pasta: clique direito no jogo na Steam, Gerenciar, procurar arquivos locais.',
      'Baixe o pacote do seu sistema nas releases (Windows 64 bits ou Linux 64 bits) e extraia onde quiser.',
      'Copie o Isaac.exe da Steam para ao lado do IsaacRecomp.exe (no Linux, ao lado do binário isaac) e rode o recomp.',
      'Tem várias versões? Na Steam todas se chamam Isaac.exe. Copie-as com nomes diferentes: o nome não importa, porque cada versão é reconhecida pelo conteúdo, e o programa pergunta qual abrir. As três versões da Steam são suportadas.',
      'Precisa de Windows ou Linux 64 bits e placa com OpenGL 3.3.',
      'Se você quer trazer o progresso dos saves em Flash, cada pacote inclui uma ferramenta tools/save_converter.html: abra em qualquer navegador, e ela funciona offline, sem subir nada.',
      'A expansão Wrath of the Lamb é separada na Steam; compre-a se quiser jogá-la aqui também.',
    ],
    en: [
      'The copy accepted here is not a disc: it is the Isaac.exe of your Steam install of The Binding of Isaac — and that file is where all of the game graphics, sounds and code live.',
      'There are two executables in the Steam folder. Isaac.exe is the game; Binding_of_Isaac.exe is just the Steam launcher and is no use here. To open the folder: right-click the game in Steam, Manage, Browse local files.',
      'Download the package for your system from Releases (Windows 64-bit or Linux 64-bit) and extract it anywhere.',
      'Copy Isaac.exe from Steam next to IsaacRecomp.exe (on Linux, next to the isaac binary) and run the recomp.',
      'Have several versions? On Steam they are all called Isaac.exe. Copy them with different names: the name does not matter, because each version is recognized by its content, and the program asks which one to open. All three Steam versions are supported.',
      'You need 64-bit Windows or Linux and a graphics card that supports OpenGL 3.3.',
      'To bring your Flash save progress over, every package includes tools/save_converter.html: open it in any browser, and it works offline with nothing uploaded.',
      'The Wrath of the Lamb expansion is sold separately on Steam; buy it if you want to play it here too.',
    ],
  },

  'dbalatoni13/nfsmw': {
    pt: [
      'Atenção antes de começar: esta é uma descompilação em andamento, não um port jogável. Ela não contém nenhum asset nem assembly do jogo, e exige uma cópia sua.',
      'As versões suportadas são específicas e cada uma tem o seu próprio nome de build no projeto: a revisão 0 americana de GameCube (GOWE69), um protótipo de Xbox 360 PAL de 21 de outubro de 2005 (EUROPEGERMILESTONE), um protótipo de PS2 PAL de 20 de setembro de 2005 (SLES-53558-A124), a Black Edition americana de PS2 (SLUS-21351) e a versão 1.3 de PC (SPEED_EXE_1_3).',
      'Cada versão espera o seu binário num lugar próprio, dentro de orig/<nome da versão>/. No GameCube, extraia o NFSMWRELEASE.ELF e converta para DOL com a ferramenta dtk do próprio build. No Xbox 360, renomeie o executável do protótipo para .xex e copie. No PS2, copie o NFS.ELF.',
      'Clone o repositório, instale as dependências de Python (necessárias só para o PS2) e rode o configure.py. Para usar uma versão diferente da padrão GOWE69, passe --version com o nome dela.',
      'Depois, ninja constrói. A infraestrutura de diff do projeto compara o que você construiu com o original.',
      'O próprio projeto avisa: nenhum trabalho de port ou de funcionalidade é feito antes de existir uma base que combine quase perfeitamente, e releases e ports deles, quando prontos, saem em outro lugar.',
    ],
    en: [
      'Before you start: this is a work-in-progress decompilation, not a playable port. It contains no game assets and no assembly whatsoever, and it requires your own copy of the game.',
      'The supported versions are specific and each has its own build name in the project: the GameCube USA revision 0 (GOWE69), an Xbox 360 PAL prototype from 21 October 2005 (EUROPEGERMILESTONE), a PS2 PAL prototype from 20 September 2005 (SLES-53558-A124), the PS2 USA Black Edition (SLUS-21351) and the PC version 1.3 (SPEED_EXE_1_3).',
      'Each version expects its binary in its own place, under orig/<version name>/. For GameCube, extract NFSMWRELEASE.ELF and convert it to a DOL with the build own dtk tool. For Xbox 360, rename the prototype executable to .xex and copy it in. For PS2, copy NFS.ELF.',
      'Clone the repository, install the Python dependencies (needed for PS2 only) and run configure.py. To use a version other than the default GOWE69, pass --version with its name.',
      'Then ninja builds it. The project diffing setup compares what you built with the original.',
      'The project itself says so: no porting or feature work happens before a near-perfect matching base exists, and their own releases and ports, when ready, are published elsewhere.',
    ],
  },

  'rrika/cdcEngineDXHR': {
    pt: [
      'Este é um motor reconstruído por descompilação, não um port empacotado: não há release pronta, você compila, e o resultado é um binário de 32 bits.',
      'A cópia aceita é a sua instalação de PC de Deus Ex: Human Revolution Director\'s Cut. Na pasta dela estão os arquivos BIGFILE.000, BIGFILE.001, BIGFILE.002 e seguintes, e o DXHRDC.exe.',
      'Os dados do jogo entram por variável de ambiente: defina BIGFILE apontando para o caminho do seu BIGFILE.000 e rode o binário. No Visual Studio, isso vai nas propriedades do projeto.',
      'Se você instalou o jogo pela Steam no Windows ou no Wine, os arquivos são detectados automaticamente e a variável não é necessária.',
      'Para compilar no Linux (binário Linux de 32 bits), o build usa DirectX 11 pelo dxvk-native, e o CMake baixa e compila as fontes dele sozinho: clone, crie native_build, configure com -DNATIVE_BUILD=ON e rode make.',
      'Para compilar um binário de Windows de 32 bits no Linux, é preciso o Windows SDK; o projeto indica a ferramenta xwin para baixá-lo em sistemas que não são Windows, e o build espera encontrá-lo numa pasta chamada winsdk ao lado.',
      'No Windows com Visual Studio 2019, abra a pasta local: ele detecta o CMakeLists.txt e configura. Escolha x86, não x64.',
      'Nota de proveniência, declarada pelo projeto: esta não é uma descompilação que bate byte a byte, e parte da informação integrada vem de um vazamento de debug info de Tomb Raider (2013), que usa um motor parecido — não de um vazamento de código-fonte deste jogo.',
    ],
    en: [
      'This is an engine reconstructed by decompilation, not a packaged port: there is no prebuilt release, you build it, and the result is a 32-bit binary.',
      'The accepted copy is your own PC install of Deus Ex: Human Revolution Director\'s Cut. In its folder you will find BIGFILE.000, BIGFILE.001, BIGFILE.002 and so on, plus DXHRDC.exe.',
      'The game data goes in through an environment variable: set BIGFILE to the path of your BIGFILE.000 and run the binary. In Visual Studio that goes in the project properties.',
      'If you installed the game through Steam on Windows or Wine, the files are detected automatically and the variable is not needed.',
      'To build on Linux (a 32-bit Linux binary), the build uses DirectX 11 through dxvk-native, and CMake downloads and builds its sources for you: clone, make a native_build folder, configure with -DNATIVE_BUILD=ON and run make.',
      'To build a 32-bit Windows binary on Linux you need the Windows SDK; the project points to the xwin tool to download it on non-Windows systems, and the build expects it in a folder named winsdk beside the checkout.',
      'On Windows with Visual Studio 2019, open the local folder: it detects CMakeLists.txt and sets the build up. Pick x86, not x64.',
      'A provenance note, stated by the project: this is not a matching decompilation, and some of the integrated information comes from a debug info leak for Tomb Raider (2013), which uses a similar engine — not from a source leak of this game.',
    ],
  },

  'matiaszanolli/sega-vr-disasm': {
    pt: [
      'Atenção antes de começar: este é um projeto de desassemblagem de Virtua Racing Deluxe no Sega 32X, com trabalho de otimização para 60 quadros. O que a compilação produz é uma ROM de 32X, não um executável de PC — você joga num emulador, não aqui.',
      'A ROM não vem incluída: você fornece o dump legal da sua própria cópia, com o nome Virtua Racing Deluxe (USA).32x, na pasta roms/ do projeto.',
      'A ROM original tem 3.145.728 bytes e MD5 72b1ad0f949f68da7d0a6339ecd51a3f. Confira o seu dump contra esses valores antes de compilar.',
      'Para compilar, rode make all; a ROM reconstruída sai em build/.',
      'Para testar, use o PicoDrive: o projeto avisa que o BlastEm não tem suporte a 32X, e é a confusão mais comum aqui.',
      'Há também um frontend de profiling no projeto, que roda a ROM sem interface por um tempo determinado — a receita do README é 30 segundos.',
      'Requisitos: Python 3.x, GCC e Make (para o vasm), num ambiente tipo Unix — Linux, macOS ou WSL.',
      'A documentação de arquitetura do projeto é o lugar por onde começar a entender o que foi descoberto sobre os dois SH2 e o 68K.',
    ],
    en: [
      'Before you start: this is a disassembly project for Virtua Racing Deluxe on the Sega 32X, with optimization work towards 60 FPS. What the build produces is a 32X ROM, not a PC executable — you play it in an emulator, not here.',
      'The ROM is not included: you supply your own legal dump, named Virtua Racing Deluxe (USA).32x, in the project roms/ folder.',
      'The original ROM is 3,145,728 bytes, MD5 72b1ad0f949f68da7d0a6339ecd51a3f. Check your dump against those values before building.',
      'To build, run make all; the rebuilt ROM lands in build/.',
      'To test it, use PicoDrive: the project warns that BlastEm has no 32X support, and that is the most common confusion here.',
      'The project also ships a profiling frontend, which runs the ROM headless for a set time — the README recipe is 30 seconds.',
      'Requirements: Python 3.x, GCC and Make (for vasm), in a Unix-like environment — Linux, macOS or WSL.',
      'The project architecture documentation is the place to start if you want to understand what has been worked out about the two SH2s and the 68K.',
    ],
  },

  'nbcraft-org/nbcraft': {
    pt: [
      'Este é um fork de uma descompilação do Minecraft Pocket Edition v0.1.3, e ele compila num jogo que roda — mas sem os assets, porque nenhum vem incluído.',
      'A cópia que ele documenta é o minecraft.jar do Beta 1.7.3 da versão Java: dele saem as texturas e a arte que vão para o resource pack chamado minecraft dentro do projeto.',
      'Com Python, rode tools/extract_jar.py, arraste o minecraft.jar para a janela e aperte Enter: o script extrai os assets do JAR para o resource pack.',
      'Sem Python, dá para fazer à mão: abra o minecraft.jar como se fosse um ZIP e copie as pastas de assets (armor, art, environment, font, gui, item, misc, mob, terrain, title) e os arquivos pack.png, particles.png e terrain.png para game/assets/resource_packs/minecraft/ no projeto.',
      'Os sons saem de outro lugar: a pasta resources dentro do seu .minecraft — copie o conteúdo dela (music, sound e o resto) para a mesma pasta de resource pack.',
      'Assets de Pocket Edition, se você quiser usá-los, precisam ser extraídos manualmente da sua própria cópia do Pocket Edition.',
      'Depois disso, o resource pack minecraft é ativado automaticamente pelo jogo, se ele conseguir encontrá-lo.',
      'Antes de compilar, rode git submodule init e git submodule update para buscar as dependências. Há caminhos de build para Windows (MinGW ou Visual Studio), Linux e outros Unix, macOS e iOS.',
    ],
    en: [
      'This is a fork of a decompilation of Minecraft Pocket Edition v0.1.3, and it builds into a game that runs — but without assets, because none ship with it.',
      'The copy it documents is the minecraft.jar of Java Beta 1.7.3: that is where the textures and art for the resource pack named minecraft inside the project come from.',
      'With Python, run tools/extract_jar.py, drag minecraft.jar onto the window and press Enter: the script extracts the JAR assets into the resource pack.',
      'Without Python you can do it by hand: open minecraft.jar as if it were a ZIP and copy the asset folders (armor, art, environment, font, gui, item, misc, mob, terrain, title) plus pack.png, particles.png and terrain.png into game/assets/resource_packs/minecraft/ in the project.',
      'The sounds come from somewhere else: the resources directory inside your .minecraft folder — copy its contents (music, sound and the rest) into the same resource pack folder.',
      'Pocket Edition assets, if you want to use them, have to be extracted manually from your own copy of Pocket Edition.',
      'After that, the minecraft resource pack is enabled automatically by the game, assuming it can find it.',
      'Before building, run git submodule init and git submodule update to fetch the dependencies. There are build routes for Windows (MinGW or Visual Studio), Linux and other Unix systems, macOS and iOS.',
    ],
  },

  // Ninth batch, each written from the project's own README. bbport and
  // Donkey Kong 64 Recompiled are left on the composed steps: their READMEs
  // do not document an install sequence that could be restated without
  // guessing at it.
  "Supermedo/bloodborne_pc": {
    pt: [
      "Você precisa da sua própria cópia de Bloodborne para PS4, extraída como pasta (a que contém o eboot.bin). A edição Game of the Year (CUSA03173) já traz The Old Hunters; com o jogo base, extraia também os add-ons.",
      "Confira o processador antes de tudo, porque é o erro mais comum: o jogo usa instruções do processador do PS4 (AVX, BMI1, MOVBE, LZCNT). Precisa de Intel de 4ª geração (Haswell, 2013) ou mais novo, ou AMD Ryzen. Processador sem AVX, como muitos Pentium e Celeron, não roda.",
      "Windows 10 (versão 1903 ou mais nova) ou 11, 64 bits, e placa de vídeo com Vulkan 1.3 e driver atualizado. Deixe cerca de 6 GB de memória livre somando RAM e arquivo de paginação, ou 10 GB para 1440p e 4K. DLSS exige GeForce RTX série 20 ou mais nova.",
      "Baixe o zip da release mais recente e descompacte em qualquer pasta. Tudo o que o jogo precisa vem nele — não há mais nada para instalar.",
      "Abra o Bloodborne.exe. Na primeira vez, um assistente curto confere a pasta do jogo e o seu PC e ajusta a imagem para o seu hardware. Depois é só apertar PLAY.",
      "Dentro do jogo, Insert (ou L3+R3 no controle) abre o menu de configurações. Os controles ficam no input.ini, que aceita os arquivos de configuração do shadPS4.",
    ],
    en: [
      "You need your own copy of Bloodborne for PS4, dumped as a folder (the one holding eboot.bin). The Game of the Year edition (CUSA03173) already includes The Old Hunters; with the base game, dump your add-ons too.",
      "Check the processor first, because it is the most common problem: the game uses instructions from the PS4’s processor (AVX, BMI1, MOVBE, LZCNT). It needs a 4th-generation Intel (Haswell, 2013) or newer, or an AMD Ryzen. A processor without AVX, as many Pentium and Celeron models are, cannot run it.",
      "Windows 10 (version 1903 or later) or 11, 64-bit, and a graphics card with Vulkan 1.3 and a current driver. Leave about 6 GB of free memory across RAM and page file, or 10 GB for 1440p and 4K. DLSS needs a GeForce RTX 20 series or newer.",
      "Download the zip from the latest release and unpack it anywhere. Everything the game needs is inside — there is nothing else to install.",
      "Open Bloodborne.exe. The first time, a short guide checks the game folder and your PC and sets the picture for your hardware. Then press PLAY.",
      "In the game, Insert (or L3+R3 on a controller) opens the settings menu. Controls live in input.ini, which accepts shadPS4’s configuration files.",
    ],
  },
  "droogie/bbhost": {
    pt: [
      "Você precisa da sua própria cópia de Bloodborne para PS4 com a atualização 1.09 copiada por cima — ou guardada ao lado numa pasta CUSA00900-UPDATE, do jeito que o shadPS4 faz.",
      "Além disso, o eboot.bin da versão 1.09 descriptografado para ELF. O projeto confere o arquivo por hash SHA-256, então uma versão diferente da 1.09 é recusada — é o erro mais comum aqui.",
      "Baixe a release para Windows ou Linux.",
      "Abra o bbhost. A janela de configuração pede os dois caminhos — a pasta do jogo e o ELF —, confere os dois e guarda. Depois é apertar Play.",
      "Configuração, controles, saves, registros e solução de problemas estão na documentação de execução do próprio projeto.",
    ],
    en: [
      "You need your own copy of Bloodborne for PS4 with the 1.09 update copied over it — or kept beside it in a CUSA00900-UPDATE folder, the way shadPS4 does.",
      "On top of that, the 1.09 eboot.bin decrypted to an ELF. The project checks the file by its SHA-256 hash, so anything other than 1.09 is refused — the most common mistake here.",
      "Download the release for Windows or Linux.",
      "Start bbhost. The setup window asks for the two paths — the game folder and the ELF —, checks them and saves them. Then press Play.",
      "Configuration, controls, saves, logs and troubleshooting are in the project’s own running documentation.",
    ],
  },
  "TwilitRealm/dusklight": {
    pt: [
      "Você precisa extrair a sua própria cópia do disco de Twilight Princess. O guia de extração do Dolphin explica o processo; depois dá para converter o .iso em .rvz, pelo Dolphin ou pelo nodtool, para ocupar menos espaço.",
      "Serve qualquer disco comercial, de GameCube ou de Wii, menos o lançamento coreano de Wii.",
      "O Dusklight é construído sobre a descompilação de Twilight Princess, que hoje só bate byte a byte com a versão de GameCube. Por isso, mesmo usando um disco de Wii, você verá a interface da versão de GameCube.",
      "O mínimo de vídeo é uma placa com Direct3D 12, Vulkan 1.1 ou Metal. Placas mais antigas têm suporte de melhor esforço por Direct3D 11, sem a mesma precisão nem desempenho.",
      "Siga o guia oficial de instalação no site do projeto — ele é atualizado a cada versão, e a instalação muda conforme o sistema.",
    ],
    en: [
      "You need to dump your own copy of the Twilight Princess disc. Dolphin’s ripping guide covers how; afterwards the .iso can be converted to .rvz, with Dolphin or nodtool, to save space.",
      "Any commercial disc works, GameCube or Wii, except the Korean Wii release.",
      "Dusklight is built on the Twilight Princess decompilation, which today only matches the GameCube version byte for byte. So even with a Wii disc you will see the GameCube version’s interface.",
      "The minimum is a graphics card with Direct3D 12, Vulkan 1.1 or Metal. Older cards get best-effort support through Direct3D 11, without the same accuracy or performance.",
      "Follow the official installation guide on the project’s site — it is updated with each release, and installation differs by system.",
    ],
  },
  "snesrev/zelda3": {
    pt: [
      "Você precisa da sua própria ROM americana de A Link to the Past, com o nome zelda3.sfc. Outra região não serve para extrair os dados.",
      "Por enquanto não há executável pronto: você compila o jogo. No Windows de 64 bits o caminho é curto e não exige Visual Studio.",
      "Instale o Python marcando a opção de adicioná-lo ao PATH. Baixe o código do projeto como ZIP pelo botão Code e extraia. Coloque a ROM na pasta extraída.",
      "Baixe o compilador TCC e o SDL2 nas versões indicadas no README e extraia cada um na subpasta third-party.",
      "Rode, nesta ordem, get_python_libs.bat, extract_assets.bat (ele cria o zelda3_assets.dat a partir da sua ROM) e run_with_tcc.bat, que gera o zelda3.exe e abre o jogo.",
      "Teclas e opções ficam no zelda3.ini. Para Linux, Mac e outros compiladores, siga o arquivo de build do próprio repositório.",
    ],
    en: [
      "You need your own US ROM of A Link to the Past, named zelda3.sfc. Another region will not extract.",
      "There is no prebuilt executable yet: you build the game. On 64-bit Windows the route is short and needs no Visual Studio.",
      "Install Python with the option to add it to PATH. Download the project as a ZIP from the Code button and extract it. Put the ROM in the extracted folder.",
      "Download the TCC compiler and SDL2 at the versions the README names, and extract each into the third-party subfolder.",
      "Run, in this order, get_python_libs.bat, extract_assets.bat (it creates zelda3_assets.dat from your ROM) and run_with_tcc.bat, which produces zelda3.exe and starts the game.",
      "Keys and options live in zelda3.ini. For Linux, Mac and other compilers, follow the repository’s own build file.",
    ],
  },
  "HarbourMasters/SpaghettiKart": {
    pt: [
      "Você precisa da sua própria ROM americana de Mario Kart 64 — é a única versão suportada. Confira o SHA-1: 579C48E211AE952530FFC8738709F078D5DD215E.",
      "A ROM tem de estar em .z64. Se a sua está em .n64, converta com um conversor de ordem de bytes antes; formato errado é o erro mais comum.",
      "Baixe a release e extraia todos os arquivos numa pasta.",
      "No Windows, abra o Spaghettify.exe e escolha a sua ROM: ele gera o arquivo de dados mk64.o2r. No Linux, rode o AppImage (pode precisar de chmod +x) com zenity ou kdialog instalado.",
      "Se o jogo travar ao abrir, troque o renderizador para OpenGL no menu de configurações ou no spaghettify.cfg.json. F11 alterna a tela cheia e Esc abre as configurações.",
    ],
    en: [
      "You need your own US ROM of Mario Kart 64 — the only supported version. Check its SHA-1: 579C48E211AE952530FFC8738709F078D5DD215E.",
      "The ROM must be .z64. If yours is .n64, convert it with a byte-order converter first; the wrong format is the most common mistake.",
      "Download the release and extract every file into a folder.",
      "On Windows, open Spaghettify.exe and choose your ROM: it generates the mk64.o2r data file. On Linux, run the AppImage (it may need chmod +x) with zenity or kdialog installed.",
      "If the game crashes on start, switch the renderer to OpenGL in the settings menu or in spaghettify.cfg.json. F11 toggles fullscreen and Esc opens settings.",
    ],
  },
  "HarbourMasters/Starship": {
    pt: [
      "Você precisa da sua própria ROM americana de Star Fox 64, versão 1.0 ou 1.1 (Rev A). Os SHA-1 de cada uma estão no README do projeto.",
      "As versões japonesa e europeia não servem para gerar os dados do jogo. Elas podem ser usadas depois, junto com a americana, só para trocar as vozes (uma língua de cada vez).",
      "A ROM tem de estar em .z64; converta antes se a sua estiver em .n64.",
      "Baixe a release, extraia tudo numa pasta e abra o starship.exe. Escolha a ROM: ele gera o arquivo de dados sf64.o2r. Há também versões para Linux (AppImage) e macOS.",
      "F1 mostra a barra de menus, F11 alterna a tela cheia e Tab alterna os recursos alternativos.",
    ],
    en: [
      "You need your own US ROM of Star Fox 64, version 1.0 or 1.1 (Rev A). The SHA-1 of each is in the project’s README.",
      "The Japanese and European versions cannot generate the game data. They can be used afterwards, together with the US one, only to swap the voices (one language at a time).",
      "The ROM must be .z64; convert it first if yours is .n64.",
      "Download the release, extract everything into a folder and open starship.exe. Choose the ROM: it generates the sf64.o2r data file. There are Linux (AppImage) and macOS builds too.",
      "F1 shows the menu bar, F11 toggles fullscreen and Tab switches alternate assets.",
    ],
  },
  "BanjoRecomp/BanjoRecomp": {
    pt: [
      "Você precisa da sua própria cópia da versão norte-americana 1.0 de Banjo-Kazooie. Outra versão não é a que o projeto recompila.",
      "É plug and play: baixe a release, abra e indique a sua cópia no menu principal. Os dados são carregados direto dela — não há etapa de extração nem compilação.",
      "Placa de vídeo com Direct3D 12 (Shader Model 6), Vulkan 1.2 ou Metal. As mais antigas que devem funcionar são a GeForce GT 630, a Radeon HD 7750 e a Intel HD 510; no Mac, Apple Silicon ou Intel de 7ª geração com macOS 13.",
      "Em PC x86-64, o processador precisa de SSE4.1 (Intel Core 2 Penryn ou AMD Bulldozer em diante).",
      "Se travar ao abrir, atualize o driver de vídeo antes de qualquer outra coisa — é a causa mais comum. Tem taxa de quadros alta, widescreen, mods e suporte a Linux e Steam Deck.",
    ],
    en: [
      "You need your own copy of the North American 1.0 version of Banjo-Kazooie. Any other version is not the one the project recompiles.",
      "It is plug and play: download the release, open it and point the main menu at your copy. The assets load straight from it — no extraction or build step.",
      "A graphics card with Direct3D 12 (Shader Model 6), Vulkan 1.2 or Metal. The oldest that should work are the GeForce GT 630, the Radeon HD 7750 and the Intel HD 510; on a Mac, Apple silicon or a 7th-generation Intel on macOS 13.",
      "On an x86-64 PC the processor needs SSE4.1 (Intel Core 2 Penryn or AMD Bulldozer onwards).",
      "If it crashes on start, update the graphics driver before anything else — the most common cause. It has high framerates, widescreen, mods and Linux and Steam Deck support.",
    ],
  },
  "perfect-dark-pc-port/perfect_dark": {
    pt: [
      "Você precisa da sua própria ROM de Perfect Dark. O projeto aceita as três regiões, cada uma com nome de arquivo e executável próprios.",
      "Baixe a build automática para o seu sistema (Windows ou Linux, 64 ou 32 bits) e extraia.",
      "Crie uma pasta chamada data ao lado do executável e coloque nela a ROM americana com o nome exato pd.ntsc-final.z64. Nome errado é o erro mais comum: o jogo não acha a ROM.",
      "Para a ROM europeia, use o nome pd.pal-final.z64 e abra o executável pd.pal; para a japonesa, pd.jpn-final.z64 e o executável pd.jpn.",
      "Opcional: a ROM de Perfect Dark de Game Boy Color com o nome pd.gbc na mesma pasta emula o Transfer Pak e libera alguns cheats. A placa de vídeo precisa de OpenGL 3.0 ou mais novo.",
    ],
    en: [
      "You need your own Perfect Dark ROM. The project accepts all three regions, each with its own file name and executable.",
      "Download the automatic build for your system (Windows or Linux, 64- or 32-bit) and extract it.",
      "Create a folder called data next to the executable and put the US ROM in it under the exact name pd.ntsc-final.z64. The wrong name is the most common mistake: the game does not find the ROM.",
      "For the European ROM use the name pd.pal-final.z64 and open the pd.pal executable; for the Japanese one, pd.jpn-final.z64 and the pd.jpn executable.",
      "Optional: the Game Boy Color Perfect Dark ROM named pd.gbc in the same folder emulates the Transfer Pak and unlocks some cheats. The graphics card needs OpenGL 3.0 or newer.",
    ],
  },
  "chrissotraidis/bluewake": {
    pt: [
      "Você precisa da sua própria imagem de disco de The Wind Waker de GameCube, em .iso ou .gcm. Uma imagem .rvz do Dolphin precisa ser convertida antes: no Dolphin, clique com o botão direito no jogo e escolha Converter arquivo.",
      "No Windows, baixe o ZIP windows-x64 da release mais recente, descompacte o ZIP inteiro e abra o BlueWake.exe. Na primeira vez ele pede a imagem do disco.",
      "Precisa de processador com AVX2 (Intel Haswell, de 2013, AMD Ryzen ou mais novo) e placa de vídeo com Direct3D 12. A partir da versão 0.8, placas mais antigas recebem Direct3D 11 em vez de tela preta.",
      "Quem vinha do Wind Waker Recomp: o projeto se mudou para cá, e os saves continuam na mesma pasta (%APPDATA%\\BlueWake). Faça uma cópia dela antes de trocar.",
      "No Linux, por enquanto só há compilação a partir do código, sem AppImage pronto. O movimento suave fica desligado por padrão e liga com F10.",
    ],
    en: [
      "You need your own disc image of The Wind Waker for GameCube, as .iso or .gcm. A Dolphin .rvz image must be converted first: in Dolphin, right-click the game and choose Convert File.",
      "On Windows, download the windows-x64 ZIP from the latest release, unpack the whole ZIP and open BlueWake.exe. The first time, it asks for the disc image.",
      "It needs a processor with AVX2 (Intel Haswell from 2013, AMD Ryzen or newer) and a Direct3D 12 graphics card. From version 0.8, older cards get Direct3D 11 instead of a black screen.",
      "Coming from Wind Waker Recomp: the project moved here, and saves stay in the same folder (%APPDATA%\\BlueWake). Back it up before switching.",
      "On Linux there is only a source build for now, with no ready AppImage. Smooth motion is off by default and turns on with F10.",
    ],
  },
  "flyngmt/ACGC-PC-Port": {
    pt: [
      "Você precisa da sua própria imagem de disco de Animal Crossing de GameCube, versão americana, em ISO, GCM ou CISO.",
      "Baixe o zip da release mais recente e extraia. Não é preciso compilar nada.",
      "Coloque a imagem do disco dentro da pasta rom e abra o AnimalCrossing.exe.",
      "O jogo lê os dados direto da imagem ao iniciar — não há etapa de extração nem de preparo.",
      "As teclas podem ser trocadas no keybindings.ini, ao lado do executável, e aceitam também os botões do mouse.",
    ],
    en: [
      "You need your own disc image of Animal Crossing for GameCube, the US version, as ISO, GCM or CISO.",
      "Download the zip from the latest release and extract it. Nothing needs building.",
      "Put the disc image inside the rom folder and open AnimalCrossing.exe.",
      "The game reads its data straight from the image at start — there is no extraction or preparation step.",
      "Keys can be changed in keybindings.ini, next to the executable, and accept mouse buttons too.",
    ],
  },
  "Supermedo/uncharted_pc": {
    pt: [
      "Você precisa da sua própria cópia de Uncharted: The Nathan Drake Collection para PS4, extraída do console.",
      "Windows 10 (1903 ou mais novo) ou 11, 64 bits, com processador Intel de 4ª geração (Haswell), AMD Ryzen ou AMD FX.",
      "A placa de vídeo precisa de Vulkan 1.3 e de pelo menos 6 GB de memória de vídeo. Placas de 4 GB, como a GTX 1650 e a RX 570, ficam sem memória e fecham depois de um tempo; nelas, deixe antisserrilhamento e geração de quadros desligados. É o problema mais comum.",
      "Deixe cerca de 8 GB de memória livre somando RAM e arquivo de paginação.",
      "Baixe a release e siga a configuração descrita na página do projeto. Se o jogo travar no capítulo 2 de Uncharted 3 em taxas de quadros altas, limite a 60 na configuração de tela e mande o registro user\\last_run.log ao reportar.",
    ],
    en: [
      "You need your own copy of Uncharted: The Nathan Drake Collection for PS4, dumped from the console.",
      "Windows 10 (1903 or later) or 11, 64-bit, with a 4th-generation Intel (Haswell), AMD Ryzen or AMD FX processor.",
      "The graphics card needs Vulkan 1.3 and at least 6 GB of video memory. 4 GB cards such as the GTX 1650 and RX 570 run out of memory and close after a while; on those, keep anti-aliasing and frame generation off. It is the most common problem.",
      "Leave about 8 GB of free memory across RAM and page file.",
      "Download the release and follow the setup on the project page. If Uncharted 3 freezes in chapter 2 at high frame rates, cap it at 60 in the display settings and send user\\last_run.log when reporting.",
    ],
  },
  "AjncSystem/ShadowOfTheColossus-PC": {
    pt: [
      "Você precisa da sua própria cópia de Shadow of the Colossus para PS4 (CUSA08809), extraída do console — a versão europeia 1.01 é a recomendada. A pasta precisa ter o eboot.bin, o sce_module e o sce_sys.",
      "Precisa também de dois módulos de som do PS4 descriptografados, libSceNgs2.sprx e libSceUlt.sprx, tirados do seu console ou da pasta de módulos de uma instalação do shadPS4. Sem eles o jogo roda mudo — é o erro mais comum.",
      "Baixe o SotC-PC.zip da release, descompacte e abra o SotC.exe. Na primeira vez, o launcher procura nos seus discos a pasta do jogo, os módulos de som, um save do shadPS4 para importar e os DLCs.",
      "Confira a página do jogo e dos saves no launcher e aperte PLAY.",
      "Os modos de 60 quadros e de filtro 16x só funcionam na versão europeia 1.01; as outras rodam a 30. Requer Windows 10 ou 11 de 64 bits e placa com Vulkan 1.3.",
    ],
    en: [
      "You need your own copy of Shadow of the Colossus for PS4 (CUSA08809), dumped from the console — the European 1.01 version is recommended. The folder must hold eboot.bin, sce_module and sce_sys.",
      "You also need two decrypted PS4 sound modules, libSceNgs2.sprx and libSceUlt.sprx, taken from your console or from a shadPS4 install’s modules folder. Without them the game runs silent — the most common mistake.",
      "Download SotC-PC.zip from the release, unpack it and open SotC.exe. The first time, the launcher searches your drives for the game folder, the sound modules, a shadPS4 save to import and the DLCs.",
      "Check the game and saves page in the launcher and press PLAY.",
      "The 60 FPS and 16x filtering modes only work on the European 1.01 version; the others run at 30. Requires 64-bit Windows 10 or 11 and a Vulkan 1.3 card.",
    ],
  },
  "LoreanXavier/pt-pc": {
    pt: [
      "Você precisa da sua própria cópia de P.T. O port é feito e testado com a versão americana (CUSA01127), como pasta extraída do console ou um PKG falso feito a partir dela. A europeia (CUSA01114) também é aceita.",
      "Um PKG comprado na loja não serve: ele é criptografado para o console que o comprou, e nada aqui descriptografa. É o erro mais comum.",
      "Roda no Windows 10 ou 11, no Linux x86-64 com glibc 2.38 ou mais nova (Ubuntu 24.04, Debian 13, Fedora 39, Arch e SteamOS) e no macOS 14 ou mais novo. A placa precisa de Vulkan 1.3; no Mac, o próprio port traz a camada que roda Vulkan sobre Metal.",
      "Baixe o instalador da release, aponte para a pasta extraída ou o PKG falso e para onde instalar. Ele copia só os três arquivos do jogo que o port usa e pode criar um atalho.",
      "Uma parte do jogo pede microfone, como no PS4. Sem microfone, defina uma tecla para a palavra falada na seção de voz do pt.ini.",
    ],
    en: [
      "You need your own copy of P.T. The port is made and tested with the US release (CUSA01127), as a folder dumped from the console or a fake PKG made from it. The European release (CUSA01114) is accepted too.",
      "A store PKG will not do: it is encrypted for the console that bought it, and nothing here decrypts it. It is the most common mistake.",
      "It runs on Windows 10 or 11, on x86-64 Linux with glibc 2.38 or newer (Ubuntu 24.04, Debian 13, Fedora 39, Arch and SteamOS) and on macOS 14 or newer. The card needs Vulkan 1.3; on a Mac the port ships the layer that runs Vulkan on Metal.",
      "Download the installer from the release, point it at the dumped folder or fake PKG and at where to install. It copies only the three game archives the port uses and can make a shortcut.",
      "One part of the game asks for a microphone, as on the PS4. Without one, set a key for the spoken word in the voice section of pt.ini.",
    ],
  },
}
