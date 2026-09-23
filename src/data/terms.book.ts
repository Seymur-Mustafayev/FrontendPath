/**
 * Kitab fəsillərində keçən terminlər.
 * Bunlar əsas lüğətə (glossary.ts) qarışdırılır, ona görə açarlar unikal olmalıdır.
 *
 * `def` sahəsi çoxparaqraflı ola bilər: TermDialog onu TopicBody ilə render edir,
 * yəni içində `## başlıq`, ``` kod bloku ```, `> qeyd` və [[digər-termin]] işləyir.
 */
export const BOOK_TERMS: Record<
  string,
  [string, string, string] | [string, string, string, string]
> = {
  engine: [
    'JS Engine',
    'JavaScript mühərriki',
    "Kodunu emal edib icra edən proqram: V8 (Chrome, Node.js), SpiderMonkey (Firefox), JavaScriptCore (Safari).\n\nMühərrik kodu sadəcə sətir-sətir oxumur — əvvəl onu parse edir, daxili təsvirə (bytecode) çevirir, sonra icra edir və icra zamanı isti (tez-tez işləyən) hissələri yenidən optimallaşdırır.\n\nKitabın əsas iddiası budur: bu emal modelini bilmədən [[scope]] qaydalarını izah etmək mümkün deyil.",
    'V8 → parse → AST → bytecode (Ignition) → optimallaşdırılmış kod (TurboFan)'
  ],
  compilation: [
    'Compilation',
    'Kompilyasiya',
    "Mənbə kodun bütöv şəkildə maşının anladığı təlimatlar siyahısına çevrilməsi. Nəticə adətən fayl kimi saxlanılır və sonra icra olunur.\n\nJavaScript-də bu proses build addımında yox, kod icra olunmazdan bir neçə mikrosaniyə əvvəl baş verir. Buna baxmayaraq, ardıcıllıq eynidir: əvvəl bütün proqram parse/kompilyasiya olunur, sonra icra başlayır.\n\n[[two-phases]] mövzusuna bax — kitab bunun sübutunu üç davranışla göstərir."
  ],
  interpretation: [
    'Interpretation',
    'İnterpretasiya',
    'Mənbə kodun sətir-sətir emal olunması: hər sətir çevrilir və dərhal icra olunur, sonra növbəti sətrə keçilir.\n\nJS uzun müddət «interpreted scripting language» sayılıb, lakin müasir mühərriklərin davranışı buna uyğun gəlmir — sintaksis səhvi proqramın sonunda olsa belə, birinci sətir heç vaxt icra olunmur.'
  ],
  tokenizing: [
    'Tokenizing / Lexing',
    'Tokenləşdirmə / leksik təhlil',
    "Kompilyasiyanın birinci mərhələsi: simvollar axını dilin anladığı mənalı hissələrə — tokenlərə — bölünür.\n\n```\nvar a = 2;   →   [var] [a] [=] [2] [;]\n```\n\nTokenizing və lexing arasındakı fərq incədir: token vəziyyətsiz (stateless) tanınırsa — tokenizing, tanınma zamanı vəziyyətli (stateful) parse qaydaları işə düşürsə — lexing.\n\n«Lexical scope» termini məhz bu mərhələnin adından gəlir ([[lexical-scope]])."
  ],
  ast: [
    'Parsing / AST',
    'Parse və Abstrakt Sintaksis Ağacı',
    "İkinci mərhələ: token axını proqramın qrammatik strukturunu təsvir edən iç-içə ağaca çevrilir. Bu ağacın adı Abstract Syntax Tree (AST)-dir.\n\n```\nvar a = 2;\n\nVariableDeclaration\n ├─ Identifier (a)\n └─ AssignmentExpression\n     └─ NumericLiteral (2)\n```\n\nPraktik fayda: ESLint, Prettier, Babel, TypeScript və Vite — hamısı kodu məhz AST səviyyəsində oxuyub dəyişir. Kodunun «niyə belə düzəldi» sualının cavabı adətən AST-dədir."
  ],
  'code-generation': [
    'Code Generation',
    'Kod generasiyası',
    "Üçüncü mərhələ: AST icra oluna bilən təlimatlara çevrilir. `var a = 2;` üçün mühərrik `a` dəyişənini yaradan (yaddaş ayıran) və ona dəyər yazan təlimatlar qurur.\n\nBu mərhələnin detalları dilə və platformaya görə kəskin dəyişir; kitab qəsdən bura girmir və müşahidə oluna bilən davranışa fokuslanır."
  ],
  jit: [
    'JIT (Just-In-Time)',
    'İcra anında kompilyasiya',
    'JS mühərrikinin vaxtı yoxdur: kompilyasiya build addımında deyil, icradan bir neçə mikrosaniyə əvvəl baş verir. Sürəti qorumaq üçün mühərrik hiylələrdən istifadə edir — funksiyaları tənbəl (lazy) kompilyasiya edir, tez-tez işləyən «isti» kodu isə yenidən kompilyasiya edib optimallaşdırır.\n\nBu, sənin kodunun eyni funksiyası proqramın müxtəlif anlarında fərqli sürətdə işləyə bilməsinin səbəbidir.'
  ],
  'two-phases': [
    'Two Phases (parse, then execute)',
    'İki mərhələ: əvvəl parse, sonra icra',
    "Kitabın mərkəzi iddiası: JS proqramı ən azı iki mərhələdə emal olunur — əvvəl bütöv parse/kompilyasiya, sonra icra.\n\nSpesifikasiya «kompilyasiya» sözünü tələb etmir, lakin tələb etdiyi davranışlar yalnız bu modellə mümkündür. Sübut üç müşahidədir: [[syntax-error]], [[early-error]] və [[hoisting]].\n\nPraktik nəticə: [[scope]] strukturu icradan ƏVVƏL müəyyən olunur və işləmə şəraitindən asılı deyil."
  ],
  'syntax-error': [
    'Syntax Error',
    'Sintaksis səhvi',
    "Kodun qrammatik qaydaya uymaması. Vacib müşahidə: səhv üçüncü sətirdə olsa belə, birinci sətirdəki `console.log` İCRA OLUNMUR.\n\n```js\nvar greeting = 'Hello';\nconsole.log(greeting);\ngreeting = .'Hi';\n// SyntaxError: unexpected token .\n// «Hello» ekrana ÇIXMIR\n```\n\nBu, mühərrikin bütün proqramı icradan əvvəl parse etdiyinin birbaşa sübutudur."
  ],
  'early-error': [
    'Early Error',
    'Erkən səhv',
    "Sintaksis baxımından düzgün, lakin spesifikasiyanın icradan əvvəl atılmasını tələb etdiyi səhv.\n\n```js\nconsole.log('Howdy');\nsaySomething('Hello','Hi');\n// SyntaxError: Duplicate parameter name not allowed\n\nfunction saySomething(greeting,greeting) {\n  'use strict';\n  console.log(greeting);\n}\n```\n\n«Howdy» çap olunmur. Diqqət: `'use strict'` pragması funksiyanın İÇİNDƏ, parametrlərdən SONRA yazılıb — deməli mühərrik parametrləri yoxlayanda artıq bütün funksiyanı oxuyub. Bu, [[two-phases]] modelinin ikinci sübutudur ([[js-strict-mode]])."
  ],
  'js-strict-mode': [
    "Strict Mode ('use strict')",
    'Sərt rejim',
    "JS-in daha təhlükəsiz alt dəsti. Fayl və ya funksiyanın başında `'use strict'` ilə açılır; ES modullarında və siniflərdə avtomatik aktivdir.\n\nQadağan etdikləri: təsadüfən qlobal dəyişən yaratmaq, təkrarlanan parametr adı, [[with-statement]], [[eval]]-in scope-u dəyişməsi və daha çoxu.\n\nMüasir kodda bu rejim praktiki olaraq həmişə aktivdir — kitabdakı «hiylələrin» çoxu buna görə artıq mümkün deyil."
  ],
  hoisting_book: [
    'Hoisting (kitab tərifi)',
    'Qaldırma',
    "Bəyannamələrin icradan əvvəl scope-a qeydiyyatdan keçməsi. Kitab bunu [[two-phases]] modelinin üçüncü sübutu kimi göstərir:\n\n```js\nfunction saySomething() {\n  var greeting = 'Hello';\n  {\n    greeting = 'Howdy';   // səhv BURADAN gəlir\n    let greeting = 'Hi';\n    console.log(greeting);\n  }\n}\nsaySomething();\n// ReferenceError: Cannot access 'greeting' before initialization\n```\n\nMühərrik `greeting = 'Howdy'` sətrində artıq bilir ki, bu ad NÖVBƏTİ sətirdəki blok-scope-lu `let greeting`-ə aiddir. Bunu yalnız kodu əvvəlcədən emal edib scope-ları qurmaqla bilmək olar.\n\n> Kitabın xəbərdarlığı: «let/const hoist olunmur» ifadəsi yanlışdır — onlar da qaldırılır, sadəcə [[tdz]] daxilində qalır."
  ],
  'target-source': [
    'Target vs Source (LHS / RHS)',
    'Hədəf və mənbə',
    "Bəyannamələrdən başqa, proqramdakı hər dəyişən istinadı iki roldan birini oynayır: ona dəyər yazılırsa — target (LHS), dəyəri oxunursa — source (RHS).\n\n```js\nstudents = [ /* ... */ ];        // target\nfor (let student of students)     // student: target, students: source\ngetStudentName(73)                // 73 → studentID parametrinə yazılır: target\nfunction getStudentName(id) {}    // funksiya bəyannaməsi: xüsusi target halı\nconsole.log(nextStudent)          // console və nextStudent: source\n```\n\nNiyə vacibdir: axtarış uğursuz olanda nəticə rola görə dəyişir. Sərt rejimdə tapılmayan target da, source da ReferenceError verir; qeyri-sərt rejimdə isə tapılmayan target təsadüfən qlobal dəyişən yarada bilir."
  ],
  'function-hoisting': [
    'Function Hoisting',
    'Funksiyanın qaldırılması',
    "Funksiya bəyannaməsində ad və funksiya dəyəri arasındakı əlaqə kompilyasiya zamanı, scope-un ƏN ƏVVƏLİNDƏ qurulur — `=` mənimsətməsini gözləmir.\n\n```js\ngreet();   // işləyir\nfunction greet(){ console.log('salam'); }\n\ngreet2();  // TypeError: greet2 is not a function\nvar greet2 = function(){};   // yalnız `greet2` qaldırılır, dəyər yox\n```\n\nBuna görə `function` bəyannaməsi ilə funksiya ifadəsi (expression) arasındakı fərq real davranış fərqidir, üslub məsələsi deyil."
  ],
  eval: [
    'eval()',
    'Sətri kod kimi icra etmək',
    "Sətir şəklində verilmiş kodu icra anında kompilyasiya edib işlədir. İçində `var` və ya `function` bəyannaməsi varsa, hazırkı scope-u DƏYİŞİR:\n\n```js\nfunction badIdea() {\n  eval(\"var oops = 'Ugh!';\");\n  console.log(oops);   // Ugh!\n}\n```\n\nNiyə pisdir: artıq kompilyasiya olunmuş və optimallaşdırılmış scope hər çağırışda yenidən qurulur (performans), kod oxunmaz olur və istifadəçi datası ilə birləşəndə birbaşa kod icrası zəifliyi yaradır ([[xss]] ilə eyni ailədən).\n\nSərt rejimdə bəyannamələr çağıran scope-a təsir etmir."
  ],
  'with-statement': [
    'with',
    'with bloku',
    "Obyekti icra anında lokal scope-a çevirir — xassələri həmin blokda dəyişən kimi görünür:\n\n```js\nvar badIdea = { oops: 'Ugh!' };\nwith (badIdea) {\n  console.log(oops);   // Ugh!\n}\n```\n\nBurada qlobal scope dəyişmir, lakin `badIdea` obyekti kompilyasiya zamanı yox, icra anında scope-a çevrilir. Performans və oxunaqlılıq baxımından zərərlidir və sərt rejimdə tamamilə qadağandır."
  ],
  'lexical-scope': [
    'Lexical Scope',
    'Leksik scope',
    "JS-in scope modeli: dəyişənin harada görünəcəyi tamamilə funksiyaların, blokların və bəyannamələrin KODDAKI YERLƏŞMƏSİ ilə müəyyən olunur — funksiyanın harada çağırıldığı ilə yox.\n\n«Lexical» sözü kompilyasiyanın [[tokenizing]] mərhələsinin adından gəlir.\n\nQaydalar: `var` ən yaxın funksiyaya, `let`/`const` ən yaxın `{ }` blokuna bağlanır ([[function-scope]], [[block-scope]]). Dinamik scope-lu dillərdən (məsələn bəzi shell dilləri) əsas fərq budur."
  ],
  'block-scope': [
    'Block Scope',
    'Blok scope',
    "`let` və `const` ilə elan olunan dəyişən ən yaxın `{ .. }` blokuna aiddir: `if`, `for`, və ya sadəcə müstəqil blok.\n\n```js\nif (true) {\n  let a = 1;\n  var b = 2;\n}\nconsole.log(b);   // 2\nconsole.log(a);   // ReferenceError\n```\n\nPraktik nəticə: dövrlərdə `let` hər iterasiya üçün yeni bağlanış yaradır — [[closure]] mövzusundakı klassik `setTimeout` nümunəsinin həlli budur."
  ],
  'function-scope': [
    'Function Scope',
    'Funksiya scope-u',
    '`var` ilə elan olunan dəyişən blokdan asılı olmayaraq ən yaxın funksiyaya aiddir. Ona görə `if` və ya `for` daxilində elan olunan `var` blokdan kənarda da görünür.\n\nBu davranış səhv deyil, sadəcə köhnə modeldir; müasir kodda default seçim `const`, lazım gələndə `let`-dir.'
  ],
  'scope-chain': [
    'Scope Chain',
    'Scope zənciri',
    "Dəyişən cari scope-da tapılmasa, mühərrik bir səviyyə yuxarı — əhatə edən scope-a baxır. Bu proses uyğun bəyannamə tapılana qədər, ya da qlobal scope-a çatana qədər davam edir.\n\nHeç yerdə tapılmasa dəyişən «undeclared» sayılır ([[undeclared]]).\n\nZəncir kompilyasiya zamanı qurulur, yəni hansı dəyişənin hansı scope-a aid olduğu icradan əvvəl bəllidir."
  ],
  undeclared: [
    'Undeclared vs Undefined',
    'Elan olunmamış və təyin olunmamış',
    "İki tamamilə fərqli hal:\n\n```js\nlet a;\nconsole.log(a);      // undefined — dəyişən var, dəyəri yoxdur\nconsole.log(b);      // ReferenceError: b is not defined — belə dəyişən YOXDUR\n```\n\n«Undeclared» o deməkdir ki, dəyişən heç bir leksik scope-da tapılmadı. Qeyri-sərt rejimdə tapılmayan target istinad qəzaən qlobal dəyişən yaradır — bu, sərt rejimin qadağan etdiyi ən zərərli davranışlardandır."
  ],
  'lexical-environment': [
    'Lexical Environment',
    'Leksik mühit',
    'Scope-un icra anındakı real təcəssümü. Kompilyasiya yalnız PLAN qurur — hansı scope-ların olacağını və hansı identifikatorların hara qeydiyyatdan keçəcəyini müəyyən edir; yaddaş ayrılmır.\n\nScope-lar isə yalnız icra zamanı, hər dəfə həmin scope işə düşəndə yaradılır. Buna görə eyni funksiyanın iki çağırışı iki ayrı mühit yaradır — [[closure]] məhz buna əsaslanır.'
  ],
  'first-class-function': [
    'First-class Function',
    'Birinci dərəcəli funksiya',
    "Funksiyalar JS-də adi dəyərdir: dəyişənə yazıla, arqument kimi ötürülə, başqa funksiyadan qaytarıla bilər.\n\n```js\nconst run = (fn) => fn();\nconst make = () => () => 'salam';\n```\n\nBu xüsusiyyət [[closure]] ilə birləşəndə React-in bütün hook modeli mümkün olur: funksiya yarandığı mühiti özü ilə daşıyır və sonradan istənilən yerdə çağırıla bilər."
  ],
  'module-pattern': [
    'Module Pattern',
    'Modul nümunəsi',
    "Daxili scope-da gizli dəyişənlər saxlayan, çölə isə yalnız seçilmiş funksiyaları verən kod təşkili üsulu. Gizliliyi təmin edən mexanizm [[closure]]-dur.\n\n```js\nfunction createCounter(){\n  let count = 0;                 // xaricdən əlçatmaz\n  return {\n    inc: () => ++count,\n    get: () => count\n  };\n}\n```\n\nMüasir [[esm]] modulları eyni ideyanın dil səviyyəsindəki formasıdır: export olunmayan hər şey modulun daxilində qalır."
  ],
  identifier: [
    'Identifier',
    'İdentifikator',
    "Dəyişən, funksiya, sinif və ya parametr adı. Kitabın qeydi: `student.id`, `student.name` və `console.log` ifadələrində `id`, `name`, `log` identifikator deyil — onlar XASSƏ (property) adlarıdır.\n\nFərq vacibdir: scope qaydaları yalnız identifikatorlara aiddir, xassə axtarışı isə [[prototype]] zənciri ilə gedir."
  ]
};
