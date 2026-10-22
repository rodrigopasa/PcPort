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
}
