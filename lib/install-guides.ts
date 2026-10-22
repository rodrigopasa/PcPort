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
}
