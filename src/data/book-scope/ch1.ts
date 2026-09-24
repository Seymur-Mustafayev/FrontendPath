import type { BookChapter } from '../books';

export const ch1: BookChapter = {
  id: 'ch1',
  no: 1,
  title: "What's the Scope?",
  titleAz: 'Scope nədir?',
  sum: 'JS mühərriki proqramı icradan ƏVVƏL necə emal edir və scope məhz harada müəyyən olunur.',
  sections: [
    {
      id: 'intro',
      heading: "Chapter 1: What's the Scope?",
      headingAz: 'Fəsil 1: Scope nədir?',
      blocks: [
        {
          en: "By the time you've written your first few programs, you're likely getting somewhat comfortable with creating variables and storing values in them. Working with variables is one of the most foundational things we do in programming!",
          az: 'İlk bir neçə proqramını yazana qədər, çox güman ki, dəyişən yaratmaq və onlarda dəyər saxlamaq sənin üçün artıq rahat bir işə çevrilib. Dəyişənlərlə işləmək proqramlaşdırmada gördüyümüz ən təməl işlərdən biridir!'
        },
        {
          en: "But you may not have considered very closely the underlying mechanisms used by the engine to organize and manage these variables. I don't mean how the memory is allocated on the computer, but rather: how does JS know which variables are accessible by any given statement, and how does it handle two variables of the same name?",
          az: 'Lakin ola bilsin ki, [[engine]] bu dəyişənləri təşkil etmək və idarə etmək üçün hansı daxili mexanizmlərdən istifadə etdiyini çox da yaxından düşünməmisən. Söhbət yaddaşın kompüterdə necə ayrılmasından getmir; sual budur: JS haradan bilir ki, konkret bir ifadədən hansı dəyişənlər əlçatandır, və eyni adlı iki dəyişəni necə ayırd edir?'
        },
        {
          en: "The answers to questions like these take the form of well-defined rules called [[scope]]. This book will dig through all aspects of scope — how it works, what it's useful for, gotchas to avoid — and then point toward common scope patterns that guide the structure of programs.",
          az: 'Bu tipli sualların cavabı [[scope]] adlanan dəqiq müəyyən olunmuş qaydalar şəklindədir. Bu kitab scope-un bütün tərəflərini araşdıracaq — necə işləyir, nəyə lazımdır, hansı tələlərdən qaçmaq lazımdır — və sonra proqramların strukturunu istiqamətləndirən geniş yayılmış scope nümunələrinə keçəcək.'
        },
        {
          en: 'Our first step is to uncover how the JS engine processes our program **before** it runs.',
          az: 'İlk addımımız JS mühərrikinin proqramımızı işə düşməzdən **əvvəl** necə emal etdiyini üzə çıxarmaqdır.'
        }
      ],
      note: "Fəsil bir sualla başlayır: JS haradan bilir ki, hansı dəyişən hansı sətirdən görünür?\n\nCavab budur ki, bu qaydalar təsadüfi deyil — onlar proqram İCRA OLUNMAZDAN ƏVVƏL tətbiq olunur.\n\n> Sənin üçün praktik bağlantı: React-də «köhnə state gəlir», «effekt sonsuz işləyir» tipli buglar məhz bu qatda başlayır. Yol xəritəsindəki «Scope, hoisting, closure və TDZ» mövzusu bu fəslin praktik davamıdır."
    },

    {
      id: 'about',
      heading: 'About This Book',
      headingAz: 'Bu kitab haqqında',
      blocks: [
        {
          en: "Welcome to book 2 in the *You Don't Know JS Yet* series! If you already finished *Get Started* (the first book), you're in the right spot! If not, before you proceed I encourage you to start there for the best foundation.",
          az: "*You Don't Know JS Yet* seriyasının 2-ci kitabına xoş gəldin! Əgər *Get Started* (birinci kitab) artıq bitibsə, düzgün yerdəsən! Əgər yox, davam etməzdən əvvəl ən yaxşı təməl üçün oradan başlamağını tövsiyə edirəm."
        },
        {
          en: 'Our focus will be the first of three pillars in the JS language: the scope system and its function closures, as well as the power of the module design pattern.',
          az: 'Diqqətimiz JS dilinin üç sütunundan birincisinə yönələcək: scope sistemi və onun funksiya closure-ları, həmçinin modul dizayn nümunəsinin gücü.'
        },
        {
          en: "JS is typically classified as an interpreted scripting language, so it's assumed by most that JS programs are processed in a single, top-down pass. But JS is in fact parsed/compiled in a separate phase **before execution begins**. The code author's decisions on where to place variables, functions, and blocks with respect to each other are analyzed according to the rules of scope, during the initial parsing/compilation phase. The resulting scope structure is generally unaffected by runtime conditions.",
          az: 'JS adətən interpretasiya olunan skript dili kimi təsnif edilir, ona görə çoxları elə bilir ki, JS proqramları tək, yuxarıdan aşağı gedişlə emal olunur. Əslində isə JS icra başlamazdan **əvvəl** ayrıca mərhələdə parse/kompilyasiya olunur. Müəllifin dəyişənləri, funksiyaları və blokları bir-birinə nisbətən harada yerləşdirməsi barədə qərarları məhz bu ilkin parse/kompilyasiya mərhələsində scope qaydalarına uyğun təhlil edilir. Nəticədə yaranan scope strukturu, bir qayda olaraq, işləmə şəraitindən asılı deyil.'
        },
        {
          en: 'JS functions are themselves [[first-class-function]] values; they can be assigned and passed around just like numbers or strings. But since these functions hold and access variables, they maintain their original scope no matter where in the program the functions are eventually executed. This is called [[closure]].',
          az: 'JS funksiyaları özləri birinci dərəcəli dəyərlərdir ([[first-class-function]]); onlar rəqəm və ya sətir kimi mənimsədilə və ötürülə bilir. Lakin bu funksiyalar dəyişənləri saxladığı və onlara müraciət etdiyi üçün, proqramın hansı nöqtəsində icra olunmasından asılı olmayaraq öz ilkin scope-larını qoruyurlar. Buna [[closure]] deyilir.'
        },
        {
          en: 'Modules are a code organization pattern characterized by public methods that have privileged access (via closure) to hidden variables and functions in the internal scope of the module ([[module-pattern]]).',
          az: 'Modullar kodun təşkili nümunəsidir: açıq metodlar closure vasitəsilə modulun daxili scope-undakı gizli dəyişən və funksiyalara imtiyazlı çıxış əldə edir ([[module-pattern]]).'
        }
      ],
      note: 'Kitabın üç açar anlayışı burada elan olunur:\n\n1. **Scope** — dəyişənlərin görünmə qaydaları, kompilyasiya zamanı müəyyən olunur.\n2. **Closure** — funksiya birinci dərəcəli dəyər olduğu üçün istənilən yerə ötürülə bilir, lakin yarandığı mühiti özü ilə daşıyır.\n3. **Module** — closure sayəsində daxili dəyişənləri gizlədib yalnız seçilmiş funksiyaları açan struktur.\n\nDiqqət et: «scope strukturu işləmə şəraitindən asılı deyil» cümləsi bütün kitabın oxunu qurur — funksiyanın hansı dəyişənləri görəcəyi onun HARADA YAZILDIĞINDAN asılıdır, harada çağırıldığından yox.'
    },

    {
      id: 'compiled-vs-interpreted',
      heading: 'Compiled vs. Interpreted',
      headingAz: 'Kompilyasiya və interpretasiya',
      blocks: [
        {
          en: 'You may have heard of *code compilation* before, but perhaps it seems like a mysterious black box where source code slides in one end and executable programs pop out the other.',
          az: 'Əvvəllər *kod kompilyasiyası* haqqında eşitmisən, lakin bəlkə də o, bir ucundan mənbə kodun girdiyi, o biri ucundan icra oluna bilən proqramın çıxdığı sirli qara qutu kimi görünür.'
        },
        {
          en: "It's not mysterious or magical, though. [[compilation]] is a set of steps that process the text of your code and turn it into a list of instructions the computer can understand. Typically, the whole source code is transformed at once, and those resulting instructions are saved as output (usually in a file) that can later be executed.",
          az: 'Əslində burada nə sirr var, nə sehr. [[compilation]] kodunun mətnini emal edib kompüterin başa düşdüyü təlimatlar siyahısına çevirən addımlar toplusudur. Adətən bütün mənbə kod bir dəfəyə çevrilir və alınan təlimatlar nəticə kimi (çox vaxt fayl şəklində) saxlanılır, sonra icra oluna bilir.'
        },
        {
          en: 'You also may have heard that code can be *interpreted*, so how is that different from being *compiled*?',
          az: 'Həmçinin eşitmisən ki, kod *interpretasiya* oluna bilər — bəs bunun *kompilyasiyadan* fərqi nədir?'
        },
        {
          en: '[[interpretation]] performs a similar task to compilation, in that it transforms your program into machine-understandable instructions. But the processing model is different. Unlike a program being compiled all at once, with interpretation the source code is transformed line by line; each line or statement is executed before immediately proceeding to processing the next line of the source code.',
          az: '[[interpretation]] kompilyasiyaya oxşar iş görür: proqramını maşının anladığı təlimatlara çevirir. Lakin emal modeli fərqlidir. Bütöv şəkildə kompilyasiya olunan proqramdan fərqli olaraq, interpretasiyada mənbə kod sətir-sətir çevrilir; hər sətir və ya ifadə icra olunur, yalnız bundan sonra növbəti sətrin emalına keçilir.'
        },
        {
          caption: 'Şəkil 1: Kompilyasiya olunan və interpretasiya olunan kod',
          code: 'KOMPİLYASİYA : bütün mənbə kod bir dəfəyə çevrilir → nəticə saxlanılır → sonra icra olunur\nİNTERPRETASİYA: sətir çevrilir → dərhal icra olunur → növbəti sətrə keçilir'
        },
        {
          en: 'Figure 1 illustrates compilation vs. interpretation of programs.',
          az: 'Şəkil 1 proqramların kompilyasiyası ilə interpretasiyasını müqayisəli göstərir.'
        },
        {
          en: 'Are these two processing models mutually exclusive? Generally, yes. However, the issue is more nuanced, because interpretation can actually take other forms than just operating line by line on source code text. Modern JS engines actually employ numerous variations of both compilation and interpretation in the handling of JS programs.',
          az: 'Bu iki emal modeli bir-birini istisna edirmi? Ümumən, bəli. Lakin məsələ daha incədir, çünki interpretasiya sadəcə mənbə mətn üzərində sətir-sətir işləməkdən başqa formalar da ala bilər. Müasir JS mühərrikləri JS proqramlarını emal edərkən həm kompilyasiyanın, həm də interpretasiyanın çoxsaylı variasiyalarından istifadə edir.'
        },
        {
          en: 'Recall that we surveyed this topic in Chapter 1 of the *Get Started* book. Our conclusion there is that JS is most accurately portrayed as a **compiled language**. For the benefit of readers here, the following sections will revisit and expand on that assertion.',
          az: 'Xatırla ki, bu mövzunu *Get Started* kitabının 1-ci fəslində nəzərdən keçirmişdik. Oradakı nəticəmiz bu idi: JS ən dəqiq şəkildə **kompilyasiya olunan dil** kimi təsvir olunur. Buradakı oxucuların xeyrinə növbəti bölmələr bu iddiaya yenidən qayıdacaq və onu genişləndirəcək.'
        }
      ],
      note: 'Niyə bu fərq sənə lazımdır: əgər JS sətir-sətir icra olunsaydı, növbəti bölmədəki üç nümunənin heç biri belə davranmazdı. Yəni bu, akademik mübahisə deyil — müşahidə oluna bilən davranışdır.'
    },

    {
      id: 'compiling-code',
      heading: 'Compiling Code',
      headingAz: 'Kodun kompilyasiyası',
      blocks: [
        {
          en: 'But first, why does it even matter whether JS is compiled or not?',
          az: 'Əvvəlcə: JS-in kompilyasiya olunub-olunmaması ümumiyyətlə nə üçün vacibdir?'
        },
        {
          en: 'Scope is primarily determined during compilation, so understanding how compilation and execution relate is key in mastering scope.',
          az: 'Scope əsasən kompilyasiya zamanı müəyyən olunur, ona görə kompilyasiya ilə icranın bir-birinə necə bağlandığını anlamaq scope-u mənimsəməyin açarıdır.'
        },
        {
          en: 'In classic compiler theory, a program is processed by a compiler in three basic stages:',
          az: 'Klassik kompilyator nəzəriyyəsində proqram kompilyator tərəfindən üç əsas mərhələdə emal olunur:'
        },
        {
          en: "**1. Tokenizing/Lexing** ([[tokenizing]]): breaking up a string of characters into meaningful (to the language) chunks, called tokens. For instance, consider the program `var a = 2;`. This program would likely be broken up into the following tokens: `var`, `a`, `=`, `2`, and `;`. Whitespace may or may not be persisted as a token, depending on whether it's meaningful or not.",
          az: '**1. Tokenləşdirmə/leksik təhlil** ([[tokenizing]]): simvollar sətrinin dil üçün mənalı hissələrə — tokenlərə — bölünməsi. Məsələn, `var a = 2;` proqramına bax. Bu proqram çox güman ki bu tokenlərə bölünəcək: `var`, `a`, `=`, `2` və `;`. Boşluq mənalı olub-olmamasından asılı olaraq token kimi saxlanıla da bilər, saxlanılmaya da.'
        },
        {
          en: '(The difference between tokenizing and lexing is subtle and academic, but it centers on whether or not these tokens are identified in a *stateless* or *stateful* way. Put simply, if the tokenizer were to invoke stateful parsing rules to figure out whether `a` should be considered a distinct token or just part of another token, *that* would be **lexing**.)',
          az: '(Tokenizing ilə lexing arasındakı fərq incə və akademikdir, lakin əsas məqam budur: tokenlər *vəziyyətsiz* (stateless), yoxsa *vəziyyətli* (stateful) şəkildə tanınır. Sadə desək, əgər tokenləşdirici `a`-nın ayrıca token, yoxsa başqa bir tokenin hissəsi sayılmalı olduğunu müəyyən etmək üçün vəziyyətli parse qaydalarına müraciət etsəydi, *bu*, **lexing** olardı.)'
        },
        {
          en: '**2. Parsing** ([[ast]]): taking a stream (array) of tokens and turning it into a tree of nested elements, which collectively represent the grammatical structure of the program. This is called an Abstract Syntax Tree (AST).',
          az: '**2. Parse** ([[ast]]): token axınının (massivinin) götürülüb, proqramın qrammatik strukturunu birlikdə təmsil edən iç-içə elementlər ağacına çevrilməsi. Buna Abstrakt Sintaksis Ağacı (AST) deyilir.'
        },
        {
          en: 'For example, the tree for `var a = 2;` might start with a top-level node called `VariableDeclaration`, with a child node called `Identifier` (whose value is `a`), and another child called `AssignmentExpression` which itself has a child called `NumericLiteral` (whose value is `2`).',
          az: 'Məsələn, `var a = 2;` üçün ağac yuxarı səviyyədə `VariableDeclaration` düyünü ilə başlaya bilər; onun `Identifier` adlı övladı (dəyəri `a`) və `AssignmentExpression` adlı başqa övladı olar, sonuncunun isə `NumericLiteral` adlı övladı olar (dəyəri `2`).'
        },
        {
          code: 'var a = 2;\n\nVariableDeclaration\n ├─ Identifier (a)\n └─ AssignmentExpression\n     └─ NumericLiteral (2)'
        },
        {
          en: "**3. Code Generation** ([[code-generation]]): taking an AST and turning it into executable code. This part varies greatly depending on the language, the platform it's targeting, and other factors.",
          az: '**3. Kod generasiyası** ([[code-generation]]): AST-in götürülüb icra oluna bilən koda çevrilməsi. Bu hissə dildən, hədəf platformadan və digər amillərdən asılı olaraq çox fərqlənir.'
        },
        {
          en: 'The JS engine takes the just described AST for `var a = 2;` and turns it into a set of machine instructions to actually *create* a variable called `a` (including reserving memory, etc.), and then store a value into `a`.',
          az: 'JS mühərriki `var a = 2;` üçün indicə təsvir olunan AST-i götürür və onu `a` adlı dəyişəni həqiqətən *yaradan* (yaddaş ayırmaq və s. daxil olmaqla), sonra isə `a`-ya dəyər yazan maşın təlimatları dəstinə çevirir.'
        },
        {
          en: "> **NOTE:** The implementation details of a JS engine (utilizing system memory resources, etc.) is much deeper than we will dig here. We'll keep our focus on the observable behavior of our programs and let the JS engine manage those deeper system-level abstractions.",
          az: '> **QEYD:** JS mühərrikinin reallaşdırma detalları (sistem yaddaş resurslarından istifadə və s.) burada qazacağımızdan qat-qat dərindir. Biz diqqətimizi proqramlarımızın müşahidə oluna bilən davranışında saxlayacağıq, həmin dərin sistem səviyyəli abstraksiyaları isə JS mühərrikinin öhdəsinə buraxacağıq.'
        },
        {
          en: 'The JS engine is vastly more complex than *just* these three stages. In the process of parsing and code generation, there are steps to optimize the performance of the execution (i.e., collapsing redundant elements). In fact, code can even be re-compiled and re-optimized during the progression of execution.',
          az: 'JS mühərriki *yalnız* bu üç mərhələdən qat-qat mürəkkəbdir. Parse və kod generasiyası prosesində icranın performansını optimallaşdıran addımlar var (məsələn, artıq elementlərin yığışdırılması). Hətta kod icra irəlilədikcə yenidən kompilyasiya və yenidən optimallaşdırıla bilər.'
        },
        {
          en: "So, I'm painting only with broad strokes here. But you'll see shortly why these details we *do* cover, even at a high level, are relevant.",
          az: 'Yəni burada mənzərəni yalnız iri ştrixlərlə çəkirəm. Amma tezliklə görəcəksən ki, toxunduğumuz bu detallar, hətta ümumi səviyyədə olsa belə, niyə vacibdir.'
        },
        {
          en: 'JS engines don\'t have the luxury of an abundance of time to perform their work and optimizations, because JS compilation doesn\'t happen in a build step ahead of time, as with other languages. It usually must happen in mere microseconds (or less!) right before the code is executed. To ensure the fastest performance under these constraints, JS engines use all kinds of tricks (like [[jit]], which lazy compile and even hot re-compile); these are well beyond the "scope" of our discussion here.',
          az: 'JS mühərriklərinin işini və optimallaşdırmasını aparmaq üçün bol vaxt lüksü yoxdur, çünki digər dillərdən fərqli olaraq JS kompilyasiyası əvvəlcədən build addımında baş vermir. O, adətən kod icra olunmazdan bir neçə mikrosaniyə (və ya daha az!) əvvəl baş verməlidir. Bu məhdudiyyətlər daxilində ən yüksək sürəti təmin etmək üçün mühərriklər müxtəlif hiylələrə əl atır (məsələn, tənbəl kompilyasiya edən, hətta isti kodu yenidən kompilyasiya edən [[jit]]); bunlar söhbətimizin «scope»-undan xeyli kənardadır.'
        }
      ],
      note: 'Praktik bağlantı: ESLint qaydaları, Prettier formatı, Babel/TypeScript çevirməsi və Vite-in transformasiyaları məhz AST üzərində işləyir.\n\n«ESLint bunu niyə tuta bildi, onu isə tuta bilmədi?» sualının cavabı budur — o, kodu mətn kimi yox, ağac kimi oxuyur.'
    },

    {
      id: 'two-phases',
      heading: 'Required: Two Phases',
      headingAz: 'Məcburi: iki mərhələ',
      blocks: [
        {
          en: 'To state it as simply as possible, the most important observation we can make about processing of JS programs is that it occurs in (at least) two phases: parsing/compilation first, then execution ([[two-phases]]).',
          az: 'Mümkün qədər sadə desək, JS proqramlarının emalı haqqında edə biləcəyimiz ən vacib müşahidə budur: bu proses (ən azı) iki mərhələdə baş verir — əvvəl parse/kompilyasiya, sonra icra ([[two-phases]]).'
        },
        {
          en: 'The separation of a parsing/compilation phase from the subsequent execution phase is observable fact, not theory or opinion. While the JS specification does not require "compilation" explicitly, it requires behavior that is essentially only practical with a compile-then-execute approach.',
          az: 'Parse/kompilyasiya mərhələsinin sonrakı icra mərhələsindən ayrılması müşahidə oluna bilən faktdır — nəzəriyyə və ya fikir deyil. JS spesifikasiyası «kompilyasiya»nı açıq şəkildə tələb etməsə də, praktikada yalnız «əvvəl kompilyasiya, sonra icra» yanaşması ilə mümkün olan davranışlar tələb edir.'
        },
        {
          en: 'There are three program characteristics you can observe to prove this to yourself: syntax errors, early errors, and hoisting.',
          az: 'Bunu özünə sübut etmək üçün müşahidə edə biləcəyin üç proqram xüsusiyyəti var: sintaksis səhvləri, erkən səhvlər və hoisting.'
        },
        { en: '## Syntax Errors from the Start', az: '## Ən başdan sintaksis səhvləri' },
        { en: 'Consider this program:', az: 'Bu proqrama bax:' },
        {
          code: "var greeting = 'Hello';\n\nconsole.log(greeting);\n\ngreeting = .'Hi';\n// SyntaxError: unexpected token ."
        },
        {
          en: "This program produces no output (`'Hello'` is not printed), but instead throws a [[syntax-error]] about the unexpected `.` token right before the `'Hi'` string. Since the syntax error happens after the well-formed `console.log(..)` statement, if JS was executing top-down line by line, one would expect the `'Hello'` message being printed before the syntax error being thrown. That doesn't happen.",
          az: "Bu proqram heç bir nəticə vermir (`'Hello'` çap olunmur); əvəzində `'Hi'` sətrindən əvvəlki gözlənilməz `.` tokeni haqqında [[syntax-error]] atır. Sintaksis səhvi düzgün yazılmış `console.log(..)` ifadəsindən SONRA olduğu üçün, JS sətir-sətir yuxarıdan aşağı icra etsəydi, səhv atılmazdan əvvəl `'Hello'` mesajının çap olunmasını gözləyərdik. Bu baş vermir."
        },
        {
          en: 'In fact, the only way the JS engine could know about the syntax error on the third line, before executing the first and second lines, is by the JS engine first parsing the entire program before any of it is executed.',
          az: 'Əslində, mühərrikin birinci və ikinci sətirləri icra etməzdən əvvəl üçüncü sətirdəki sintaksis səhvindən xəbər tutmasının yeganə yolu bütün proqramı — heç bir hissəsi icra olunmamış — əvvəlcə parse etməsidir.'
        },
        { en: '## Early Errors', az: '## Erkən səhvlər' },
        { en: 'Next, consider:', az: 'İndi isə buna bax:' },
        {
          code: "console.log('Howdy');\n\nsaySomething('Hello','Hi');\n// Uncaught SyntaxError: Duplicate parameter name not\n// allowed in this context\n\nfunction saySomething(greeting,greeting) {\n  'use strict';\n  console.log(greeting);\n}"
        },
        {
          en: "The `'Howdy'` message is not printed, despite being a well-formed statement.",
          az: "`'Howdy'` mesajı çap olunmur — halbuki ifadə tamamilə düzgün yazılıb."
        },
        {
          en: "Instead, just like the snippet in the previous section, the `SyntaxError` here is thrown before the program is executed. In this case, it's because strict-mode (opted in for only the `saySomething(..)` function here) forbids, among many other things, functions to have duplicate parameter names; this has always been allowed in non-strict-mode ([[js-strict-mode]]).",
          az: 'Əvəzində, əvvəlki bölmədəki nümunədə olduğu kimi, buradakı `SyntaxError` da proqram icra olunmazdan əvvəl atılır. Bu dəfə səbəb budur ki, sərt rejim (burada yalnız `saySomething(..)` funksiyası üçün aktivləşdirilib) bir çox başqa şeylərlə yanaşı funksiyalarda təkrarlanan parametr adlarını da qadağan edir; qeyri-sərt rejimdə isə bu, həmişə icazəli olub ([[js-strict-mode]]).'
        },
        {
          en: 'The error thrown is not a syntax error in the sense of being a malformed string of tokens (like `.\'Hi\'` prior), but in strict-mode is nonetheless required by the specification to be thrown as an "early error" before any execution begins ([[early-error]]).',
          az: "Atılan səhv tokenlərin səhv düzülüşü mənasında (əvvəlki `.'Hi'` kimi) sintaksis səhvi deyil, lakin sərt rejimdə spesifikasiya onun hər hansı icra başlamazdan əvvəl «erkən səhv» kimi atılmasını yenə də tələb edir ([[early-error]])."
        },
        {
          en: "But how does the JS engine know that the `greeting` parameter has been duplicated? How does it know that the `saySomething(..)` function is even in strict-mode while processing the parameter list (the `'use strict'` pragma appears only later, in the function body)?",
          az: "Bəs mühərrik `greeting` parametrinin təkrarlandığını haradan bilir? Parametr siyahısını emal edərkən `saySomething(..)` funksiyasının ümumiyyətlə sərt rejimdə olduğunu haradan bilir (axı `'use strict'` pragması daha sonra, funksiyanın gövdəsində görünür)?"
        },
        {
          en: 'Again, the only reasonable explanation is that the code must first be *fully* parsed before any execution occurs.',
          az: 'Yenə də yeganə məntiqli izah budur: kod hər hansı icradan əvvəl *bütövlükdə* parse olunmalıdır.'
        },
        { en: '## Hoisting', az: '## Hoisting' },
        { en: 'Finally, consider:', az: 'Nəhayət, buna bax:' },
        {
          code: "function saySomething() {\n  var greeting = 'Hello';\n  {\n    greeting = 'Howdy';   // error comes from here\n    let greeting = 'Hi';\n    console.log(greeting);\n  }\n}\n\nsaySomething();\n// ReferenceError: Cannot access 'greeting' before initialization"
        },
        {
          en: "The noted `ReferenceError` occurs from the line with the statement `greeting = 'Howdy'`. What's happening is that the `greeting` variable for that statement belongs to the declaration on the next line, `let greeting = 'Hi'`, rather than to the previous `var greeting = 'Hello'` statement ([[hoisting-book]]).",
          az: "Qeyd olunan `ReferenceError` `greeting = 'Howdy'` ifadəsi olan sətirdən qaynaqlanır. Baş verən budur: həmin ifadədəki `greeting` dəyişəni əvvəlki `var greeting = 'Hello'` ifadəsinə yox, NÖVBƏTİ sətirdəki `let greeting = 'Hi'` bəyannaməsinə aiddir ([[hoisting-book]])."
        },
        {
          en: 'The only way the JS engine could know, at the line where the error is thrown, that the *next statement* would declare a block-scoped variable of the same name (`greeting`) is if the JS engine had already processed this code in an earlier pass, and already set up all the scopes and their variable associations. This processing of scopes and declarations can only accurately be accomplished by parsing the program before execution.',
          az: 'Səhvin atıldığı sətirdə mühərrikin *növbəti ifadənin* eyni adlı (`greeting`) blok-scope-lu dəyişən elan edəcəyini bilməsinin yeganə yolu budur ki, o, bu kodu daha əvvəlki gedişdə artıq emal edib və bütün scope-ları, onların dəyişən bağlantılarını artıq qurub. Scope və bəyannamələrin bu cür emalını yalnız proqramı icradan əvvəl parse etməklə dəqiq həyata keçirmək olar.'
        },
        {
          en: "The `ReferenceError` here technically comes from `greeting = 'Howdy'` accessing the `greeting` variable **too early**, a conflict referred to as the Temporal Dead Zone ([[tdz]]). Chapter 5 will cover this in more detail.",
          az: "Buradakı `ReferenceError` texniki olaraq `greeting = 'Howdy'` ifadəsinin `greeting` dəyişəninə **çox tez** müraciət etməsindən yaranır; bu ziddiyyət Temporal Dead Zone ([[tdz]]) adlanır. 5-ci fəsil bunu daha ətraflı izah edəcək."
        },
        {
          en: "> **WARNING:** It's often asserted that `let` and `const` declarations are not hoisted, as an explanation of the TDZ behavior just illustrated. But this is not accurate. We'll come back and explain both the hoisting and TDZ of `let` / `const` in Chapter 5.",
          az: '> **XƏBƏRDARLIQ:** Yuxarıdakı TDZ davranışını izah etmək üçün tez-tez deyilir ki, `let` və `const` bəyannamələri hoist olunmur. Bu, doğru deyil. `let` / `const`-un həm hoisting-inə, həm də TDZ-sinə 5-ci fəsildə qayıdıb izah edəcəyik.'
        },
        {
          en: "Hopefully you're now convinced that JS programs are parsed before any execution begins. But does it prove they are compiled?",
          az: 'Ümid edirəm, indi əmin oldun ki, JS proqramları hər hansı icra başlamazdan əvvəl parse olunur. Bəs bu, onların kompilyasiya olunduğunu sübut edirmi?'
        },
        {
          en: "This is an interesting question to ponder. Could JS parse a program, but then execute that program by *interpreting* operations represented in the AST **without** first compiling the program? Yes, that is *possible*. But it's extremely unlikely, mostly because it would be extremely inefficient performance wise.",
          az: 'Bu, üzərində düşünməyə dəyər maraqlı sualdır. JS proqramı parse edib, sonra onu əvvəlcə kompilyasiya **etmədən**, AST-də təmsil olunan əməliyyatları *interpretasiya* etməklə icra edə bilərmi? Bəli, bu *mümkündür*. Lakin son dərəcə az ehtimallıdır — əsasən ona görə ki, performans baxımından həddindən artıq səmərəsiz olardı.'
        },
        {
          en: 'It\'s hard to imagine a production-quality JS engine going to all the trouble of parsing a program into an AST, but not then converting (aka, "compiling") that AST into the most efficient (binary) representation for the engine to then execute.',
          az: 'Proqramı AST-yə parse etmək zəhmətinə qatlaşan, amma sonra həmin AST-i mühərrikin icra edəcəyi ən səmərəli (binar) təmsilə çevirməyən (yəni «kompilyasiya» etməyən) istehsal səviyyəli JS mühərrikini təsəvvür etmək çətindir.'
        },
        {
          en: 'Many have endeavored to split hairs with this terminology, as there\'s plenty of nuance and "well, actually..." interjections floating around. But in spirit and in practice, what the engine is doing in processing JS programs is **much more alike compilation** than not.',
          az: 'Çoxları bu terminologiya üzərində tük bölməyə çalışıb, çünki ortalıqda kifayət qədər incəlik və «yox, əslində isə...» tipli etirazlar dolaşır. Lakin mahiyyətcə və praktikada mühərrikin JS proqramlarını emal edərkən gördüyü iş kompilyasiyaya **daha çox bənzəyir**, nəinki bənzəmir.'
        },
        {
          en: 'Classifying JS as a compiled language is not concerned with the distribution model for its binary (or byte-code) executable representations, but rather in keeping a clear distinction in our minds about the phase where JS code is processed and analyzed; this phase observably and indisputedly happens *before* the code starts to be executed.',
          az: 'JS-i kompilyasiya olunan dil kimi təsnif etmək onun binar (və ya bayt-kod) icra təmsillərinin necə yayılması ilə bağlı deyil; məqsəd zehnimizdə JS kodunun emal və təhlil olunduğu mərhələni aydın ayırmaqdır. Bu mərhələ isə müşahidə oluna bilən və mübahisəsiz şəkildə kod icra olunmağa başlamazdan *əvvəl* baş verir.'
        },
        {
          en: 'We need proper mental models of how the JS engine treats our code if we want to understand JS and scope effectively.',
          az: 'JS-i və scope-u effektiv anlamaq istəyiriksə, JS mühərrikinin kodumuzla necə davrandığına dair düzgün zehni modellərə ehtiyacımız var.'
        }
      ],
      note: 'Bu bölmə fəslin özəyidir. Müsahibə üçün: «let və const hoist olunmurmu?» sualının düzgün cavabı — **olunur**, sadəcə [[tdz]] səbəbindən bəyannamədən əvvəl müraciət ReferenceError verir. `var` isə qaldırılır və `undefined` ilə ilkinləşdirilir.\n\nBu fərqi düzgün izah etmək junior ilə middle cavabı arasındakı sərhəddir.',
      terms: ['tdz', 'js-strict-mode']
    },

    {
      id: 'compiler-speak',
      heading: 'Compiler Speak',
      headingAz: 'Kompilyator dili',
      blocks: [
        {
          en: "With awareness of the two-phase processing of a JS program (compile, then execute), let's turn our attention to how the JS engine identifies variables and determines the scopes of a program as it is compiled.",
          az: 'JS proqramının iki mərhələli emalını (əvvəl kompilyasiya, sonra icra) bildiyimizə görə, indi diqqətimizi mühərrikin kompilyasiya zamanı dəyişənləri necə tanıdığına və proqramın scope-larını necə müəyyən etdiyinə yönəldək.'
        },
        {
          en: "First, let's examine a simple JS program to use for analysis over the next several chapters:",
          az: 'Əvvəlcə növbəti bir neçə fəsil boyu təhlil üçün istifadə edəcəyimiz sadə bir JS proqramına baxaq:'
        },
        {
          caption: 'Növbəti fəsillər boyu istifadə olunacaq nümunə proqram',
          code: "var students = [\n  { id: 14, name: 'Kyle' },\n  { id: 73, name: 'Suzy' },\n  { id: 112, name: 'Frank' },\n  { id: 6, name: 'Sarah' }\n];\n\nfunction getStudentName(studentID) {\n  for (let student of students) {\n    if (student.id == studentID) {\n      return student.name;\n    }\n  }\n}\n\nvar nextStudent = getStudentName(73);\n\nconsole.log(nextStudent);\n// Suzy"
        },
        {
          en: 'Other than declarations, all occurrences of variables/identifiers in a program serve in one of two "roles": either they\'re the *target* of an assignment or they\'re the *source* of a value ([[target-source]]).',
          az: 'Bəyannamələr istisna olmaqla, proqramdakı bütün dəyişən/identifikator istinadları iki «roldan» birini oynayır: ya mənimsətmənin *target*-i (hədəfi), ya da dəyərin *source*-u (mənbəyi) olur ([[target-source]]).'
        },
        {
          en: '(When I first learned compiler theory while earning my computer science degree, we were taught the terms "LHS" (aka, *target*) and "RHS" (aka, *source*) for these roles, respectively. As you might guess from the "L" and the "R", the acronyms mean "Left-Hand Side" and "Right-Hand Side", as in left and right sides of an `=` assignment operator. However, assignment targets and sources don\'t always literally appear on the left or right of an `=`, so it\'s probably clearer to think in terms of *target* / *source* rather than *left* / *right*.)',
          az: '(Kompüter elmləri üzrə təhsil alarkən kompilyator nəzəriyyəsini ilk dəfə öyrənəndə bu rollar üçün bizə müvafiq olaraq «LHS» (yəni *target*) və «RHS» (yəni *source*) terminləri öyrədilirdi. «L» və «R» hərflərindən təxmin edə biləcəyin kimi, bu qısaltmalar «Left-Hand Side» (sol tərəf) və «Right-Hand Side» (sağ tərəf) deməkdir — yəni `=` mənimsətmə operatorunun sol və sağ tərəfləri. Lakin mənimsətmənin hədəfi və mənbəyi həmişə hərfi mənada `=`-in solunda və ya sağında olmur, ona görə *sol* / *sağ* əvəzinə *target* / *source* kimi düşünmək yəqin ki daha aydındır.)'
        },
        {
          en: "How do you know if a variable is a target? Check if there is a value that is being assigned to it; if so, it's a target. If not, then the variable is a source.",
          az: 'Dəyişənin target olduğunu necə bilmək olar? Ona dəyər mənimsədilib-mənimsədilmədiyini yoxla: mənimsədilirsə, target-dir. Yoxsa, dəyişən source-dur.'
        },
        {
          en: "For the JS engine to properly handle a program's variables, it must first label each occurrence of a variable as *target* or *source*. We'll dig in now to how each role is determined.",
          az: 'JS mühərrikinin proqramın dəyişənlərini düzgün emal etməsi üçün o, əvvəlcə dəyişənin hər istinadını *target* və ya *source* kimi işarələməlidir. İndi hər rolun necə müəyyən olunduğuna dərindən baxaq.'
        },
        { en: '## Targets', az: '## Target — hədəflər' },
        {
          en: 'What makes a variable a target? Consider:',
          az: 'Dəyişəni target edən nədir? Buna bax:'
        },
        { code: 'students = [ // ..' },
        {
          en: 'This statement is clearly an assignment operation; remember, the `var students` part is handled entirely as a declaration at compile time, and is thus irrelevant during execution; we left it out for clarity and focus. Same with the `nextStudent = getStudentName(73)` statement.',
          az: 'Bu ifadə açıq-aydın mənimsətmə əməliyyatıdır; unutma ki, `var students` hissəsi kompilyasiya zamanı tamamilə bəyannamə kimi emal olunur və ona görə icra zamanı əhəmiyyət daşımır; aydınlıq və diqqət üçün onu buraxdıq. `nextStudent = getStudentName(73)` ifadəsi də eynilə belədir.'
        },
        {
          en: 'But there are three other *target* assignment operations in the code that are perhaps less obvious. One of them:',
          az: 'Lakin kodda daha üç *target* mənimsətmə əməliyyatı var ki, onlar bəlkə də o qədər göz qabağında deyil. Onlardan biri:'
        },
        { code: 'for (let student of students) {' },
        {
          en: 'That statement assigns a value to `student` for each iteration of the loop. Another *target* reference:',
          az: 'Bu ifadə dövrün hər iterasiyasında `student`-ə dəyər mənimsədir. Başqa bir *target* istinadı:'
        },
        { code: 'getStudentName(73)' },
        {
          en: 'But how is that an assignment to a *target*? Look closely: the argument `73` is assigned to the parameter `studentID`.',
          az: 'Bəs bu necə *target*-ə mənimsətmə olur? Diqqətlə bax: `73` arqumenti `studentID` parametrinə mənimsədilir.'
        },
        {
          en: 'And there\'s one last (subtle) *target* reference in our program. Can you spot it?\n\n. . .\n\nDid you identify this one?',
          az: 'Proqramımızda daha bir sonuncu (incə) *target* istinadı var. Onu tapa bilərsənmi?\n\n. . .\n\nBunu tapdınmı?'
        },
        { code: 'function getStudentName(studentID) {' },
        {
          en: 'A `function` declaration is a special case of a *target* reference. You can think of it sort of like `var getStudentName = function(studentID)`, but that\'s not exactly accurate. An identifier `getStudentName` is declared (at compile time), but the `= function(studentID)` part is also handled at compilation; the association between `getStudentName` and the function is automatically set up at the beginning of the scope rather than waiting for an `=` assignment statement to be executed.',
          az: '`function` bəyannaməsi *target* istinadının xüsusi halıdır. Onu bir növ `var getStudentName = function(studentID)` kimi təsəvvür edə bilərsən, lakin bu, tam dəqiq deyil. `getStudentName` identifikatoru (kompilyasiya zamanı) elan olunur, amma `= function(studentID)` hissəsi də kompilyasiyada emal edilir; `getStudentName` ilə funksiya arasındakı əlaqə `=` mənimsətmə ifadəsinin icrasını gözləmədən, scope-un ən əvvəlində avtomatik qurulur.'
        },
        {
          en: '> **NOTE:** This automatic association of function and variable is referred to as "function hoisting", and is covered in detail in Chapter 5 ([[function-hoisting]]).',
          az: '> **QEYD:** Funksiya ilə dəyişənin bu avtomatik əlaqələndirilməsi «function hoisting» adlanır və 5-ci fəsildə ətraflı izah olunur ([[function-hoisting]]).'
        },
        {
          caption: 'Beş target — xülasə',
          code: 'students = [ /* .. */ ];           // 1\nnextStudent = getStudentName(73);  // 2\nfor (let student of students)      // 3 — hər iterasiyada student-ə dəyər yazılır\ngetStudentName(73)                 // 4 — 73 arqumenti studentID parametrinə yazılır\nfunction getStudentName(studentID) // 5 — target istinadının xüsusi halı'
        },
        { en: '## Sources', az: '## Source — mənbələr' },
        {
          en: "So we've identified all five *target* references in the program. The other variable references must then be *source* references (because that's the only other option!).",
          az: 'Beləliklə, proqramdakı beş *target* istinadının hamısını tapdıq. Deməli, qalan dəyişən istinadları *source* istinadları olmalıdır (çünki başqa seçim yoxdur!).'
        },
        {
          en: 'In `for (let student of students)`, we said that `student` is a *target*, but `students` is a *source* reference. In the statement `if (student.id == studentID)`, both `student` and `studentID` are *source* references. `student` is also a *source* reference in `return student.name`.',
          az: '`for (let student of students)` ifadəsində `student`-in *target* olduğunu dedik, `students` isə *source* istinadıdır. `if (student.id == studentID)` ifadəsində həm `student`, həm də `studentID` *source* istinadlarıdır. `return student.name` ifadəsində də `student` *source* istinadıdır.'
        },
        {
          en: 'In `getStudentName(73)`, `getStudentName` is a *source* reference (which we hope resolves to a function reference value). In `console.log(nextStudent)`, `console` is a *source* reference, as is `nextStudent`.',
          az: '`getStudentName(73)` ifadəsində `getStudentName` *source* istinadıdır (ümid edirik ki, funksiya istinadı dəyərinə həll olunacaq). `console.log(nextStudent)` ifadəsində `console` *source* istinadıdır, `nextStudent` də həmçinin.'
        },
        {
          en: '> **NOTE:** In case you were wondering, `id`, `name`, and `log` are all properties, not variable references ([[identifier]]).',
          az: '> **QEYD:** Əgər maraqlanırdınsa: `id`, `name` və `log` — bunların hamısı xassədir, dəyişən istinadı deyil ([[identifier]]).'
        },
        {
          en: "What's the practical importance of understanding *targets* vs. *sources*? In Chapter 2, we'll revisit this topic and cover how a variable's role impacts its lookup (specifically, if the lookup fails).",
          az: '*Target* ilə *source* fərqini anlamağın praktik əhəmiyyəti nədir? 2-ci fəsildə bu mövzuya qayıdacaq və dəyişənin rolunun onun axtarışına necə təsir etdiyini (xüsusən axtarış uğursuz olanda) izah edəcəyik.'
        }
      ],
      note: 'Niyə vacibdir: axtarış uğursuz olanda nəticə rola görə dəyişir.\n\n```js\n// source tapılmır:\nconsole.log(notDefined);   // ReferenceError — hər rejimdə\n\n// target tapılmır:\nfunction f(){ oops = 5; }  // qeyri-sərt rejim: QLOBAL dəyişən yaradır (!)\nf();                        // sərt rejimdə: ReferenceError\n```\n\nBu, sərt rejimin ən dəyərli qorumalarından biridir — təsadüfən qlobal dəyişən yaratmaq real layihədə tapılması ən çətin buglardandır.'
    },

    {
      id: 'cheating',
      heading: 'Cheating: Runtime Scope Modifications',
      headingAz: 'Hiylə: scope-u icra anında dəyişmək',
      blocks: [
        {
          en: "It should be clear by now that scope is determined as the program is compiled, and should not generally be affected by runtime conditions. However, in non-strict-mode, there are technically still two ways to cheat this rule, modifying a program's scopes during runtime.",
          az: 'Artıq aydın olmalıdır ki, scope proqram kompilyasiya olunarkən müəyyən edilir və bir qayda olaraq işləmə şəraitindən asılı olmamalıdır. Lakin qeyri-sərt rejimdə bu qaydanı aldatmağın, yəni proqramın scope-larını icra anında dəyişməyin texniki olaraq hələ də iki yolu var.'
        },
        {
          en: "Neither of these techniques *should* be used — they're both dangerous and confusing, and you should be using strict-mode (where they're disallowed) anyway. But it's important to be aware of them in case you run across them in some programs.",
          az: 'Bu üsulların heç biri istifadə olunmamalıdır — ikisi də təhlükəli və çaşdırıcıdır; onsuz da sərt rejimdən istifadə etməlisən, orada isə hər ikisi qadağandır. Amma hansısa proqramda rastlaşa biləcəyin üçün onlardan xəbərdar olmaq vacibdir.'
        },
        {
          en: 'The [[eval]] function receives a string of code to compile and execute on the fly during the program runtime. If that string of code has a `var` or `function` declaration in it, those declarations will modify the current scope that the `eval(..)` is currently executing in:',
          az: '[[eval]] funksiyası proqramın icrası zamanı anında kompilyasiya edilib icra olunacaq kod sətrini qəbul edir. Həmin sətirdə `var` və ya `function` bəyannaməsi varsa, bu bəyannamələr `eval(..)`-in hazırda icra olunduğu cari scope-u dəyişəcək:'
        },
        {
          code: "function badIdea() {\n  eval(\"var oops = 'Ugh!';\");\n  console.log(oops);\n}\nbadIdea();   // Ugh!"
        },
        {
          en: 'If the `eval(..)` had not been present, the `oops` variable in `console.log(oops)` would not exist, and would throw a `ReferenceError`. But `eval(..)` modifies the scope of the `badIdea()` function at runtime. This is bad for many reasons, including the performance hit of modifying the already compiled and optimized scope, every time `badIdea()` runs.',
          az: '`eval(..)` olmasaydı, `console.log(oops)` sətrindəki `oops` dəyişəni mövcud olmayacaq və `ReferenceError` atılacaqdı. Lakin `eval(..)` `badIdea()` funksiyasının scope-unu icra anında dəyişir. Bu, bir çox səbəbdən pisdir — o cümlədən `badIdea()` hər dəfə işləyəndə artıq kompilyasiya və optimallaşdırılmış scope-un yenidən dəyişdirilməsinin performansa vurduğu zərbə.'
        },
        {
          en: "The second cheat is the [[with-statement]] keyword, which essentially dynamically turns an object into a local scope — its properties are treated as identifiers in that new scope's block:",
          az: 'İkinci hiylə [[with-statement]] açar sözüdür: o, mahiyyətcə obyekti dinamik şəkildə lokal scope-a çevirir — obyektin xassələri həmin yeni scope blokunda identifikator kimi qəbul olunur:'
        },
        {
          code: "var badIdea = { oops: 'Ugh!' };\n\nwith (badIdea) {\n  console.log(oops);   // Ugh!\n}"
        },
        {
          en: 'The global scope was not modified here, but `badIdea` was turned into a scope at runtime rather than compile time, and its property `oops` becomes a variable in that scope. Again, this is a terrible idea, for performance and readability reasons.',
          az: 'Burada qlobal scope dəyişmədi, lakin `badIdea` kompilyasiya zamanı yox, icra anında scope-a çevrildi və onun `oops` xassəsi həmin scope-da dəyişənə çevrilir. Yenə də bu, həm performans, həm oxunaqlılıq baxımından çox pis fikirdir.'
        },
        {
          en: 'At all costs, avoid `eval(..)` (at least, `eval(..)` creating declarations) and `with`. Again, neither of these cheats is available in strict-mode, so if you just use strict-mode (you should!) then the temptation goes away!',
          az: 'Nəyin bahasına olursa olsun, `eval(..)`-dən (heç olmasa bəyannamə yaradan `eval(..)`-dən) və `with`-dən qaç. Yenə deyirəm, bu hiylələrin heç biri sərt rejimdə mövcud deyil, ona görə sadəcə sərt rejimdən istifadə etsən (etməlisən!), bu vəsvəsə öz-özünə aradan qalxır!'
        }
      ],
      note: '`eval` sadəcə performans problemi deyil: istifadəçidən gələn məlumatla birləşəndə birbaşa kod icrası zəifliyi yaradır. Eyni ailədən olan digər formalar: `new Function(str)`, `setTimeout("kod", 0)`.\n\nFrontend-də praktik qayda: xarici mənbədən gələn heç bir sətir kod kimi icra olunmamalıdır — nə `eval` ilə, nə `innerHTML` ilə ([[xss]] mövzusuna bax).'
    },

    {
      id: 'lexical-scope',
      heading: 'Lexical Scope',
      headingAz: 'Leksik scope',
      blocks: [
        {
          en: 'We\'ve demonstrated that JS\'s scope is determined at compile time; the term for this kind of scope is [[lexical-scope]]. "Lexical" is associated with the "lexing" stage of compilation, as discussed earlier in this chapter.',
          az: 'Göstərdik ki, JS-də scope kompilyasiya zamanı müəyyən olunur; bu tip scope-un adı [[lexical-scope]]-dur. «Lexical» sözü bu fəsildə əvvəl müzakirə etdiyimiz kompilyasiyanın «lexing» mərhələsi ilə bağlıdır.'
        },
        {
          en: 'To narrow this chapter down to a useful conclusion, the key idea of "lexical scope" is that it\'s controlled entirely by the placement of functions, blocks, and variable declarations, in relation to one another.',
          az: 'Fəsli faydalı bir nəticəyə yığsaq: «leksik scope»un əsas ideyası budur ki, o, tamamilə funksiyaların, blokların və dəyişən bəyannamələrinin bir-birinə nisbətən yerləşməsi ilə idarə olunur.'
        },
        {
          en: "If you place a variable declaration inside a function, the compiler handles this declaration as it's parsing the function, and associates that declaration with the function's scope ([[function-scope]]). If a variable is block-scope declared (`let` / `const`), then it's associated with the nearest enclosing `{ .. }` block, rather than its enclosing function (as with `var`) — see [[block-scope]].",
          az: 'Dəyişən bəyannaməsini funksiyanın içinə qoysan, kompilyator funksiyanı parse edərkən bu bəyannaməni emal edir və onu funksiyanın scope-u ilə əlaqələndirir ([[function-scope]]). Dəyişən blok səviyyəsində (`let` / `const`) elan olunubsa, o, `var`-dakı kimi əhatə edən funksiyaya yox, ən yaxın `{ .. }` blokuna bağlanır — bax: [[block-scope]].'
        },
        {
          en: 'Furthermore, a reference (*target* or *source* role) for a variable must be resolved as coming from one of the scopes that are *lexically available* to it; otherwise the variable is said to be "undeclared" (which usually results in an error!) — [[undeclared]]. If the variable is not declared in the current scope, the next outer/enclosing scope will be consulted. This process of stepping out one level of scope nesting continues until either a matching variable declaration can be found, or the global scope is reached and there\'s nowhere else to go ([[scope-chain]]).',
          az: 'Bundan əlavə, dəyişənə olan istinad (*target* və ya *source* rolunda) ona *leksik olaraq əlçatan* scope-lardan birindən gəlməlidir; əks halda dəyişən «undeclared» sayılır (bu isə adətən səhvlə nəticələnir!) — [[undeclared]]. Dəyişən cari scope-da elan olunmayıbsa, növbəti xarici/əhatə edən scope-a baxılır. Bir səviyyə yuxarı çıxma prosesi ya uyğun bəyannamə tapılana qədər, ya da qlobal scope-a çatıb daha getməyə yer qalmayana qədər davam edir ([[scope-chain]]).'
        },
        {
          en: "It's important to note that compilation doesn't actually *do anything* in terms of reserving memory for scopes and variables. None of the program has been executed yet.",
          az: 'Vacib qeyd: kompilyasiya scope və dəyişənlər üçün yaddaş ayırmaq baxımından əslində *heç nə etmir*. Proqramın heç bir hissəsi hələ icra olunmayıb.'
        },
        {
          en: 'Instead, compilation creates a map of all the lexical scopes that lays out what the program will need while it executes. You can think of this plan as inserted code for use at runtime, which defines all the scopes (aka, [[lexical-environment]]) and registers all the identifiers (variables) for each scope.',
          az: 'Bunun əvəzinə kompilyasiya bütün leksik scope-ların xəritəsini yaradır və proqramın icra zamanı nəyə ehtiyacı olacağını müəyyənləşdirir. Bu planı icra anında istifadə üçün əlavə olunmuş kod kimi təsəvvür edə bilərsən: o, bütün scope-ları ([[lexical-environment]]) təyin edir və hər scope üçün bütün identifikatorları (dəyişənləri) qeydiyyata alır.'
        },
        {
          en: "In other words, while scopes are identified during compilation, they're not actually created until runtime, each time a scope needs to run. In the next chapter, we'll sketch out the conceptual foundations for lexical scope.",
          az: 'Başqa sözlə, scope-lar kompilyasiya zamanı müəyyən olunsa da, əslində icra anına qədər yaradılmır — hər dəfə həmin scope işə düşəndə yaradılır. Növbəti fəsildə leksik scope-un konseptual əsaslarını təsvir edəcəyik.'
        },
        {
          caption: 'Fəslin yekunu — dörd qayda',
          code: '1. var           → ən yaxın FUNKSİYAYA bağlanır\n2. let / const   → ən yaxın { } BLOKUNA bağlanır\n3. Tapılmayan dəyişən → bir səviyyə yuxarı axtarılır (scope zənciri), qlobala qədər\n4. Heç yerdə yoxdursa → «undeclared» → adətən ReferenceError'
        }
      ],
      note: 'Ən incə məqam sonuncu cümlədədir: kompilyasiya yalnız XƏRİTƏ qurur, scope-lar isə hər çağırışda yenidən yaradılır.\n\nBu bir cümlə [[closure]] anlayışının açarıdır — hər çağırış öz mühitini yaradır, funksiya isə həmin mühiti özü ilə daşıyır. React-dəki stale closure problemi də buradan çıxır: hər render öz dəyişənlər dəstini yaradır.'
    }
  ]
};
