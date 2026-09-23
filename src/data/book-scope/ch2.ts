import type { BookChapter } from '../books';

export const ch2: BookChapter = {
  id: 'ch2',
  no: 2,
  title: 'Illustrating Lexical Scope',
  titleAz: 'Leksik scope-un təsviri',
  sum: 'Scope-u üç metaforla qururuq: rəngli mərmərlər və vedrələr, mühərrikin daxilindəki söhbət və scope «binası».',
  sections: [
    {
      id: 'intro',
      heading: 'Chapter 2: Illustrating Lexical Scope',
      headingAz: 'Fəsil 2: Leksik scope-un təsviri',
      blocks: [
        {
          en: 'In Chapter 1, we explored how scope is determined during code compilation, a model called [[lexical-scope]]. The term "lexical" refers to the first stage of compilation (lexing/parsing).',
          az: '1-ci fəsildə scope-un kodun kompilyasiyası zamanı necə müəyyən olunduğunu araşdırdıq; bu modelin adı [[lexical-scope]]-dur. «Lexical» termini kompilyasiyanın ilk mərhələsinə (lexing/parse) işarə edir.'
        },
        {
          en: 'To properly reason about our programs, it\'s important to have a solid conceptual foundation of how scope works. If we rely on guesses and intuition, we may accidentally get the right answers some of the time, but many other times we\'re far off. This isn\'t a recipe for success.',
          az: 'Proqramlarımız barədə düzgün düşünə bilmək üçün scope-un necə işlədiyinə dair möhkəm konseptual təməl vacibdir. Təxmin və intuisiyaya güvənsək, bəzən təsadüfən düzgün cavab alarıq, amma çox vaxt həqiqətdən uzaq düşərik. Bu, uğurun resepti deyil.'
        },
        {
          en: 'Like way back in grade school math class, getting the right answer isn\'t enough if we don\'t show the correct steps to get there! We need to build accurate and helpful mental models as foundation moving forward.',
          az: 'Məktəbdəki riyaziyyat dərsində olduğu kimi, ora aparan düzgün addımları göstərməsək, düzgün cavab almaq kifayət deyil! İrəliləmək üçün təməl kimi dəqiq və faydalı zehni modellər qurmalıyıq.'
        },
        {
          en: 'This chapter will illustrate scope with several metaphors. The goal here is to think about how your program is handled by the JS engine in ways that more closely align with how the JS engine actually works.',
          az: 'Bu fəsil scope-u bir neçə metafora ilə təsvir edəcək. Məqsəd proqramının JS mühərriki tərəfindən necə emal olunduğunu mühərrikin real iş prinsipinə daha yaxın şəkildə düşünməkdir.'
        }
      ],
      note: 'Bu fəsil yeni qayda öyrətmir — 1-ci fəsildəki qaydaları «görmək» üçün şəkil verir. Üç metaforu yadda saxla, çünki kitabın qalan hissəsi bunların üzərində qurulur:\n\n1. **Mərmərlər və vedrələr** — dəyişən hansı scope-a aiddir?\n2. **Dostlar arasında söhbət** — kompilyasiya və icra zamanı kim nə soruşur?\n3. **Bina** — dəyişən tapılmayanda axtarış hara gedir?'
    },
    {
      id: 'marbles',
      heading: 'Marbles, and Buckets, and Bubbles... Oh My!',
      headingAz: 'Mərmərlər, vedrələr və qabarcıqlar',
      blocks: [
        {
          en: 'One metaphor I\'ve found effective in understanding scope is sorting colored marbles into buckets of their matching color.',
          az: 'Scope-u anlamaqda effektiv bildiyim metaforalardan biri rəngli mərmərləri öz rənglərinə uyğun vedrələrə çeşidləməkdir.'
        },
        {
          en: 'Imagine you come across a pile of marbles, and notice that all the marbles are colored red, blue, or green. Let\'s sort all the marbles, dropping the red ones into a red bucket, green into a green bucket, and blue into a blue bucket. After sorting, when you later need a green marble, you already know the green bucket is where to go to get it.',
          az: 'Təsəvvür et ki, bir yığın mərmərə rast gəlirsən və görürsən ki, hamısı qırmızı, mavi və ya yaşıldır. Gəl hamısını çeşidləyək: qırmızıları qırmızı vedrəyə, yaşılları yaşıl vedrəyə, mavini mavi vedrəyə atırıq. Çeşidləmədən sonra yaşıl mərmər lazım olanda artıq bilirsən ki, yaşıl vedrəyə getməlisən.'
        },
        {
          en: 'In this metaphor, the marbles are the variables in our program. The buckets are scopes (functions and blocks), which we just conceptually assign individual colors for our discussion purposes. The color of each marble is thus determined by which color scope we find the marble originally created in.',
          az: 'Bu metaforada mərmərlər proqramımızdakı dəyişənlərdir. Vedrələr isə scope-lardır (funksiyalar və bloklar); müzakirə üçün onlara şərti olaraq ayrı-ayrı rənglər veririk. Deməli, hər mərmərin rəngi onun ilk dəfə hansı rəngli scope-da yaradıldığı ilə müəyyən olunur.'
        },
        {
          caption: '1-ci fəslin nümunəsi — scope rəngləri ilə',
          code: '// outer/global scope: RED\nvar students = [\n  { id: 14, name: \'Kyle\' },\n  { id: 73, name: \'Suzy\' },\n  { id: 112, name: \'Frank\' },\n  { id: 6, name: \'Sarah\' }\n];\nfunction getStudentName(studentID) {\n  // function scope: BLUE\n  for (let student of students) {\n    // loop scope: GREEN\n    if (student.id == studentID) {\n      return student.name;\n    }\n  }\n}\nvar nextStudent = getStudentName(73);\nconsole.log(nextStudent);   // Suzy'
        },
        {
          en: 'We\'ve designated three scope colors with code comments: RED (outermost global scope), BLUE (scope of function `getStudentName(..)`), and GREEN (scope of/inside the `for` loop).',
          az: 'Kod şərhləri ilə üç scope rəngi təyin etdik: QIRMIZI (ən xarici, qlobal scope), MAVİ (`getStudentName(..)` funksiyasının scope-u) və YAŞIL (`for` dövrünün daxilindəki scope).'
        },
        {
          caption: 'Qabarcıqlar və onların içindəki mərmərlər',
          code: 'RED(1)   global scope   → students, getStudentName, nextStudent\nBLUE(2)  getStudentName → studentID\nGREEN(3) for-loop       → student'
        },
        {
          en: 'Scope bubbles are determined during compilation based on where the functions/blocks of scope are written, the nesting inside each other, and so on. Each scope bubble is entirely contained within its parent scope bubble — a scope is never partially in two different outer scopes.',
          az: 'Scope qabarcıqları kompilyasiya zamanı funksiya/blokların harada yazılmasına, bir-birinin içində necə yerləşməsinə və s. əsasən müəyyən olunur. Hər scope qabarcığı tamamilə öz valideyn qabarcığının içindədir — scope heç vaxt qismən iki fərqli xarici scope-da olmur.'
        },
        {
          en: 'Each marble (variable/identifier) is colored based on which bubble (bucket) it\'s declared in, not the color of the scope it may be accessed from (e.g., `students` on line 9 and `studentID` on line 10).',
          az: 'Hər mərmər (dəyişən/identifikator) harada elan olunduğu qabarcığın (vedrənin) rəngini alır — ona müraciət edilən scope-un rəngini yox (məsələn, 9-cu sətirdəki `students` və 10-cu sətirdəki `studentID`).'
        },
        {
          en: 'References (non-declarations) to variables/identifiers are allowed if there\'s a matching declaration either in the current scope, or any scope above/outside the current scope, but not with declarations from lower/nested scopes.',
          az: 'Dəyişənlərə/identifikatorlara istinadlara (bəyannamə olmayanlara) yalnız o halda icazə verilir ki, uyğun bəyannamə ya cari scope-da, ya da ondan yuxarıdakı/xaricdəki hər hansı scope-da olsun; aşağıdakı/iç-içə scope-lardakı bəyannamələrə isə yox.'
        },
        {
          en: 'An expression in the RED(1) bucket only has access to RED(1) marbles, not BLUE(2) or GREEN(3). An expression in the BLUE(2) bucket can reference either BLUE(2) or RED(1) marbles, not GREEN(3). And an expression in the GREEN(3) bucket has access to RED(1), BLUE(2), and GREEN(3) marbles.',
          az: 'QIRMIZI(1) vedrədəki ifadə yalnız QIRMIZI(1) mərmərlərə çıxış əldə edir, MAVİ(2) və ya YAŞIL(3) mərmərlərə yox. MAVİ(2) vedrədəki ifadə MAVİ(2) və ya QIRMIZI(1) mərmərlərə müraciət edə bilər, YAŞIL(3)-a yox. YAŞIL(3) vedrədəki ifadə isə QIRMIZI(1), MAVİ(2) və YAŞIL(3) mərmərlərin hamısına çıxış əldə edir.'
        },
        {
          en: '> **NOTE:** The JS engine doesn\'t generally determine these marble colors during runtime; the "lookup" here is a rhetorical device to help you understand the concepts. During compilation, most or all variable references will match already-known scope buckets, so their color is already determined, and stored with each marble reference to avoid unnecessary lookups as the program runs.',
          az: '> **QEYD:** JS mühərriki bu mərmər rənglərini adətən icra zamanı müəyyən etmir; buradakı «axtarış» anlayışları başa düşmək üçün ritorik vasitədir. Kompilyasiya zamanı dəyişən istinadlarının əksəriyyəti (və ya hamısı) artıq məlum scope vedrələrinə uyğunlaşır, yəni rəngləri artıq müəyyəndir və proqram işləyərkən lazımsız axtarışlardan qaçmaq üçün hər mərmər istinadı ilə birlikdə saxlanılır.'
        }
      ],
      note: 'Ən vacib cümlə: mərmərin rəngi onun **elan olunduğu** yerlə müəyyən olunur, istifadə olunduğu yerlə yox.\n\nGörünmə qaydası bir istiqamətlidir: içəridən çölə baxmaq olar, çöldən içəriyə yox.\n\n```js\nfunction outer() {\n  const a = 1;          // MAVİ\n  if (true) {\n    const b = 2;        // YAŞIL\n    console.log(a, b);  // YAŞIL ifadə həm MAVİ, həm YAŞIL-ı görür\n  }\n  console.log(b);       // ReferenceError — MAVİ YAŞIL-ı görmür\n}\n```\n\nReact-də komponentin içində yazdığın handler komponentin state və props-unu görür — çünki o, komponentin «vedrəsinin» içində yazılıb.'
    },
    {
      id: 'conversation',
      heading: 'A Conversation Among Friends',
      headingAz: 'Dostlar arasında söhbət',
      blocks: [
        {
          en: 'Another useful metaphor for the process of analyzing variables and the scopes they come from is to imagine various conversations that occur inside the engine as code is processed and then executed. Let\'s now meet the members of the JS engine that will have conversations as they process our program:',
          az: 'Dəyişənlərin və onların gəldiyi scope-ların təhlili üçün digər faydalı metafora kod emal olunub icra edilərkən mühərrikin içində baş verən müxtəlif söhbətləri təsəvvür etməkdir. Gəl proqramımızı emal edərkən söhbət edəcək JS mühərriki üzvləri ilə tanış olaq:'
        },
        {
          en: '**Engine:** responsible for start-to-finish compilation and execution of our JavaScript program.\n\n**Compiler:** one of Engine\'s friends; handles all the dirty work of parsing and code-generation.\n\n**Scope Manager:** another friend of Engine; collects and maintains a lookup list of all the declared variables/identifiers, and enforces a set of rules as to how these are accessible to currently executing code ([[scope-manager]]).',
          az: '**Engine (Mühərrik):** JavaScript proqramımızın əvvəldən sonadək kompilyasiyası və icrasına cavabdehdir.\n\n**Compiler (Kompilyator):** Mühərrikin dostlarından biri; parse və kod generasiyasının bütün «çirkli» işini görür.\n\n**Scope Manager (Scope meneceri):** Mühərrikin başqa bir dostu; elan olunmuş bütün dəyişənlərin/identifikatorların axtarış siyahısını toplayır və saxlayır, cari icra olunan kodun onlara necə çıxış əldə edəcəyi barədə qaydaları tətbiq edir ([[scope-manager]]).'
        },
        {
          en: 'We typically think of `var students = [ .. ]` as a single statement, but that\'s not how our friend Engine sees it. In fact, JS treats these as two distinct operations, one which Compiler will handle during compilation, and the other which Engine will handle during execution.',
          az: '`var students = [ .. ]` ifadəsini adətən tək ifadə kimi düşünürük, lakin dostumuz Mühərrik onu belə görmür. Əslində JS bunu iki ayrı əməliyyat kimi qəbul edir: birini Kompilyator kompilyasiya zamanı, digərini isə Mühərrik icra zamanı emal edir.'
        },
        {
          en: '1. Encountering `var students`, Compiler will ask Scope Manager to see if a variable named `students` already exists for that particular scope bucket. If so, Compiler would ignore this declaration and move on. Otherwise, Compiler will produce code that (at execution time) asks Scope Manager to create a new variable called `students` in that scope bucket.\n\n2. Compiler then produces code for Engine to later execute, to handle the `students = []` assignment. The code Engine runs will first ask Scope Manager if there is a variable called `students` accessible in the current scope bucket. If not, Engine keeps looking elsewhere. Once Engine finds a variable, it assigns the reference of the `[ .. ]` array to it.',
          az: '1. `var students` ilə qarşılaşanda Kompilyator Scope Manager-dən soruşur ki, həmin scope vedrəsində `students` adlı dəyişən artıq varmı. Varsa, Kompilyator bu bəyannaməni nəzərə almır və davam edir. Yoxdursa, Kompilyator elə kod yaradır ki, (icra zamanı) Scope Manager-dən həmin vedrədə `students` adlı yeni dəyişən yaratmağı xahiş etsin.\n\n2. Sonra Kompilyator `students = []` mənimsətməsini emal etmək üçün Mühərrikin sonradan icra edəcəyi kodu yaradır. Mühərrikin işlətdiyi kod əvvəlcə Scope Manager-dən soruşur ki, cari scope vedrəsində `students` adlı əlçatan dəyişən varmı. Yoxdursa, Mühərrik başqa yerlərdə axtarmağa davam edir. Dəyişəni tapan kimi ona `[ .. ]` massivinin istinadını mənimsədir.'
        },
        {
          caption: 'Kompilyasiya mərhələsi: Kompilyator ↔ Scope Manager',
          code: 'Compiler: Hey, Scope Manager (of the global scope), I found a formal\n          declaration for an identifier called students, ever heard of it?\n(Global) Scope Manager: Nope, never heard of it, so I just created it for you.\nCompiler: Hey, Scope Manager, getStudentName points to a function,\n          so we need a new scope bucket.\n(Function) Scope Manager: Got it, here\'s the scope bucket.\nCompiler: Hey, Scope Manager (of the function), I found a formal\n          parameter declaration for studentID, ever heard of it?\n(Function) Scope Manager: Nope, but now it\'s created in this scope.'
        },
        {
          caption: 'İcra mərhələsi: Mühərrik ↔ Scope Manager',
          code: 'Engine: Hey, Scope Manager (of the global scope), before we begin, can you\n        look up the identifier getStudentName so I can assign this function to it?\n(Global) Scope Manager: Yep, here\'s the variable.\nEngine: Hey, Scope Manager, I found a target reference for students,\n        ever heard of it?\n(Global) Scope Manager: Yes, it was formally declared for this scope, so here it is.\nEngine: Thanks, I\'m initializing students to undefined, so it\'s ready to use.\n...\nEngine: Great, the value in getStudentName is a function, so I\'m going to execute it.'
        },
        {
          en: 'To review and summarize how a statement like `var students = [ .. ]` is processed, in two distinct steps:\n\n1. Compiler sets up the declaration of the scope variable (since it wasn\'t previously declared in the current scope).\n\n2. While Engine is executing, to process the assignment part of the statement, Engine asks Scope Manager to look up the variable, initializes it to `undefined` so it\'s ready to use, and then assigns the array value to it.',
          az: '`var students = [ .. ]` kimi ifadənin iki ayrı addımda necə emal olunduğunu yekunlaşdıraq:\n\n1. Kompilyator scope dəyişəninin bəyannaməsini qurur (çünki o, cari scope-da əvvəllər elan olunmayıb).\n\n2. Mühərrik icra edərkən ifadənin mənimsətmə hissəsini emal etmək üçün Scope Manager-dən dəyişəni tapmağı xahiş edir, onu istifadəyə hazır olsun deyə `undefined` ilə ilkinləşdirir, sonra ona massiv dəyərini mənimsədir.'
        }
      ],
      note: 'Bu bölmənin mesajı: bir sətir iki iş deməkdir — **bəyannamə** (kompilyasiya) və **mənimsətmə** (icra). Hoisting-in bütün «sirri» budur.\n\n```js\nconsole.log(x);   // undefined — dəyişən artıq var, dəyər hələ yazılmayıb\nvar x = 5;\n```\n\nMüsahibə cavabı: «var bəyannaməsi scope-un əvvəlinə qaldırılır və undefined ilə ilkinləşdirilir, mənimsətmə isə öz yerində qalır.»',
      terms: ['engine', 'hoisting']
    },
    {
      id: 'nested-scope',
      heading: 'Nested Scope',
      headingAz: 'İç-içə scope',
      blocks: [
        {
          en: 'When it comes time to execute the `getStudentName()` function, Engine asks for a Scope Manager instance for that function\'s scope, and it will then proceed to look up the parameter (`studentID`) to assign the `73` argument value to, and so on.',
          az: '`getStudentName()` funksiyasını icra etmək vaxtı çatanda Mühərrik həmin funksiyanın scope-u üçün Scope Manager nüsxəsi istəyir, sonra `73` arqument dəyərini mənimsətmək üçün parametri (`studentID`) axtarır və s.'
        },
        {
          en: 'The function scope for `getStudentName(..)` is nested inside the global scope. The block scope of the `for`-loop is similarly nested inside that function scope. Scopes can be lexically nested to any arbitrary depth as the program defines.',
          az: '`getStudentName(..)` funksiyasının scope-u qlobal scope-un içindədir. `for` dövrünün blok scope-u da eyni qaydada həmin funksiya scope-unun içindədir. Scope-lar proqramın təyin etdiyi istənilən dərinliyə qədər leksik olaraq iç-içə ola bilər.'
        },
        {
          en: 'Each scope gets its own Scope Manager instance each time that scope is executed (one or more times). Each scope automatically has all its identifiers registered at the start of the scope being executed (this is called "variable hoisting"; see Chapter 5).',
          az: 'Hər scope hər dəfə icra olunanda (bir və ya bir neçə dəfə) öz Scope Manager nüsxəsini alır. Scope icra olunmağa başlayanda onun bütün identifikatorları avtomatik qeydiyyata alınır (buna «variable hoisting» deyilir; bax: 5-ci fəsil).'
        },
        {
          en: 'At the beginning of a scope, if any identifier came from a `function` declaration, that variable is automatically initialized to its associated function reference. And if any identifier came from a `var` declaration (as opposed to `let` / `const`), that variable is automatically initialized to `undefined` so that it can be used; otherwise, the variable remains uninitialized (aka, in its "TDZ", see Chapter 5) and cannot be used until its full declaration-and-initialization are executed.',
          az: 'Scope-un əvvəlində identifikator `function` bəyannaməsindən gəlibsə, həmin dəyişən avtomatik olaraq ona aid funksiyanın istinadı ilə ilkinləşdirilir. İdentifikator `var` bəyannaməsindən gəlibsə (`let` / `const`-dan fərqli olaraq), istifadə oluna bilsin deyə avtomatik `undefined` ilə ilkinləşdirilir; əks halda dəyişən ilkinləşdirilməmiş qalır (yəni öz «TDZ»-sindədir, bax: 5-ci fəsil) və tam bəyannamə-ilkinləşdirmə icra olunana qədər istifadə edilə bilməz.'
        },
        {
          caption: '`students` funksiyada tapılmır — axtarış bir səviyyə yuxarı gedir',
          code: 'Engine: Hey, Scope Manager (for the function), I have a source reference\n        for students, ever heard of it?\n(Function) Scope Manager: Nope, never heard of it. Try the next outer scope.\nEngine: Hey, Scope Manager (for the global scope), I have a source reference\n        for students, ever heard of it?\n(Global) Scope Manager: Yep, it was formally declared, here it is.'
        },
        {
          en: 'One of the key aspects of lexical scope is that any time an identifier reference cannot be found in the current scope, the next outer scope in the nesting is consulted; that process is repeated until an answer is found or there are no more scopes to consult.',
          az: 'Leksik scope-un əsas xüsusiyyətlərindən biri budur: identifikator istinadı cari scope-da tapılmayanda iç-içə quruluşda növbəti xarici scope-a müraciət olunur; bu proses cavab tapılana və ya müraciət ediləcək scope qalmayana qədər təkrarlanır.'
        }
      ],
      note: '«Hər scope hər icrada öz nüsxəsini alır» — bu cümləni yadda saxla. Funksiyanı 3 dəfə çağırsan, onun lokal dəyişənlərinin 3 ayrı dəsti yaranır.\n\nBəyannamə növünə görə scope-un əvvəlində vəziyyət:\n\n```text\nfunction f() {}  → dərhal funksiya ilə ilkinləşir\nvar x            → undefined ilə ilkinləşir\nlet / const      → ilkinləşməmiş (TDZ) — bəyannamə sətrinə qədər\n```\n\nBu cədvəl [[tdz]] və [[hoisting]] suallarının 90%-ni cavablandırır.',
      terms: ['scope-chain']
    },
    {
      id: 'lookup-failures',
      heading: 'Lookup Failures',
      headingAz: 'Axtarış uğursuz olanda',
      blocks: [
        {
          en: 'When Engine exhausts all lexically available scopes (moving outward) and still cannot resolve the lookup of an identifier, an error condition then exists. However, depending on the mode of the program (strict-mode or not) and the role of the variable (i.e., target vs. source; see Chapter 1), this error condition will be handled differently.',
          az: 'Mühərrik leksik olaraq əlçatan bütün scope-ları (çölə doğru hərəkət edərək) yoxlayıb yenə də identifikatoru tapa bilmirsə, səhv vəziyyəti yaranır. Lakin proqramın rejimindən (sərt rejim olub-olmaması) və dəyişənin rolundan (target və ya source; bax: 1-ci fəsil) asılı olaraq bu vəziyyət fərqli emal olunur.'
        },
        {
          en: '## Undefined Mess',
          az: '## «Undefined» qarışıqlığı'
        },
        {
          en: 'If the variable is a source, an unresolved identifier lookup is considered an undeclared (unknown, missing) variable, which always results in a `ReferenceError` being thrown. Also, if the variable is a target, and the code at that moment is running in strict-mode, the variable is considered undeclared and similarly throws a `ReferenceError` ([[undeclared]]).',
          az: 'Dəyişən source-dursa, tapılmayan identifikator elan olunmamış (naməlum, olmayan) dəyişən sayılır və bu, həmişə `ReferenceError` atılması ilə nəticələnir. Həmçinin dəyişən target-dirsə və kod həmin an sərt rejimdə işləyirsə, dəyişən yenə elan olunmamış sayılır və eyni şəkildə `ReferenceError` atılır ([[undeclared]]).'
        },
        {
          en: '"Not defined" really means "not declared" — or, rather, "undeclared," as in a variable that has no matching formal declaration in any lexically available scope. By contrast, "undefined" really means a variable was found (declared), but the variable otherwise has no other value in it at the moment, so it defaults to the `undefined` value.',
          az: '«Not defined» əslində «elan olunmayıb», yəni «undeclared» deməkdir — heç bir leksik əlçatan scope-da uyğun rəsmi bəyannaməsi olmayan dəyişən. «Undefined» isə dəyişənin tapıldığını (elan olunduğunu), sadəcə hazırda içində başqa dəyər olmadığını, ona görə də standart olaraq `undefined` dəyərini daşıdığını bildirir.'
        },
        {
          caption: '`typeof` hər iki halda eyni sətri qaytarır',
          code: 'var studentName;\ntypeof studentName;   // "undefined"\n\ntypeof doesntExist;   // "undefined"'
        },
        {
          en: 'These two variable references are in very different conditions, but JS sure does muddy the waters. Unfortunately, JS developers just have to pay close attention to not mix up which kind of "undefined" they\'re dealing with!',
          az: 'Bu iki dəyişən istinadı tamamilə fərqli vəziyyətdədir, lakin JS vəziyyəti xeyli bulandırır. Təəssüf ki, JS developerləri hansı növ «undefined» ilə işlədiklərini qarışdırmamaq üçün diqqətli olmalıdırlar!'
        },
        {
          en: '## Global... What!?',
          az: '## Qlobal... nə!?'
        },
        {
          en: 'If the variable is a target and strict-mode is not in effect, a confusing and surprising legacy behavior kicks in. The troublesome outcome is that the global scope\'s Scope Manager will just create an accidental global variable to fulfill that target assignment ([[accidental-global]])!',
          az: 'Dəyişən target-dirsə və sərt rejim aktiv deyilsə, çaşdırıcı və gözlənilməz köhnə davranış işə düşür. Problemli nəticə budur ki, qlobal scope-un Scope Manager-i həmin target mənimsətməsini yerinə yetirmək üçün sadəcə təsadüfi qlobal dəyişən yaradır ([[accidental-global]])!'
        },
        {
          code: 'function getStudentName() {\n  // assignment to an undeclared variable :(\n  nextStudent = \'Suzy\';\n}\ngetStudentName();\nconsole.log(nextStudent);\n// "Suzy" -- oops, an accidental-global variable!'
        },
        {
          en: 'This sort of accident (almost certain to lead to bugs eventually) is a great example of the beneficial protections offered by strict-mode, and why it\'s such a bad idea not to be using strict-mode. In strict-mode, the Global Scope Manager would instead have responded: "Nope, never heard of it. Sorry, I\'ve got to throw a `ReferenceError`."',
          az: 'Bu cür təsadüf (demək olar ki, gec-tez buga aparır) sərt rejimin verdiyi faydalı qorumaların və sərt rejimdən istifadə etməməyin niyə pis fikir olduğunun gözəl nümunəsidir. Sərt rejimdə Qlobal Scope Manager belə cavab verərdi: «Yox, heç eşitməmişəm. Bağışla, `ReferenceError` atmalıyam.»'
        },
        {
          en: 'Never rely on accidental global variables. Always use strict-mode, and always formally declare your variables. You\'ll then get a helpful `ReferenceError` if you ever mistakenly try to assign to a not-declared variable.',
          az: 'Heç vaxt təsadüfi qlobal dəyişənlərə güvənmə. Həmişə sərt rejimdən istifadə et və dəyişənlərini həmişə rəsmi şəkildə elan et. Onda elan olunmamış dəyişənə səhvən dəyər yazmağa çalışsan, faydalı `ReferenceError` alacaqsan.'
        }
      ],
      note: 'Müsahibədə tez-tez soruşulur: «`undefined` ilə `not defined` fərqi nədir?»\n\n- `undefined` — dəyişən **var**, sadəcə dəyəri yoxdur.\n- `not defined` — dəyişən heç yerdə **elan olunmayıb** → `ReferenceError`.\n\nPraktik qeyd: ES modulları (`import`/`export`) və `class` gövdələri avtomatik sərt rejimdədir. Vite/React layihəndə yazdığın kod artıq ES modul olduğu üçün təsadüfi qlobal dəyişən problemi orada sənə `ReferenceError` kimi görünəcək.',
      terms: ['js-strict-mode', 'target-source']
    },
    {
      id: 'building',
      heading: 'Building On Metaphors',
      headingAz: 'Metaforların üzərində qurmaq',
      blocks: [
        {
          en: 'To visualize nested scope resolution, I prefer yet another metaphor, an office building. The building represents our program\'s nested scope collection. The first floor of the building represents the currently executing scope. The top level of the building is the global scope.',
          az: 'İç-içə scope axtarışını təsəvvür etmək üçün daha bir metaforu — ofis binasını üstün tuturam. Bina proqramımızın iç-içə scope-lar toplusunu təmsil edir. Binanın birinci mərtəbəsi hazırda icra olunan scope-dur. Binanın ən üst mərtəbəsi isə qlobal scope-dur.'
        },
        {
          en: 'You resolve a target or source variable reference by first looking on the current floor, and if you don\'t find it, taking the elevator to the next floor (i.e., an outer scope), looking there, then the next, and so on. Once you get to the top floor (the global scope), you either find what you\'re looking for, or you don\'t. But you have to stop regardless.',
          az: 'Target və ya source dəyişən istinadını tapmaq üçün əvvəlcə cari mərtəbəyə baxırsan; tapmasan, liftlə növbəti mərtəbəyə (yəni xarici scope-a) qalxırsan, orada axtarırsan, sonra növbətisinə və s. Ən üst mərtəbəyə (qlobal scope-a) çatanda ya axtardığını tapırsan, ya da tapmırsan. Amma hər halda dayanmalısan.'
        },
        {
          caption: 'Scope «binası» — axtarış yalnız yuxarı gedir',
          code: '  [ global scope      ]  ← top floor: the lookup stops here\n  [ getStudentName()  ]  ↑\n  [ for-loop block    ]  ↑  ← current floor: the lookup starts here'
        },
        {
          en: 'Before continuing, go find some code in one of your projects and run through these conversations. Seriously, actually speak out loud. Find a friend and practice each role with them. If either of you find yourself confused or tripped up, spend more time reviewing this material.',
          az: 'Davam etməzdən əvvəl layihələrindən birində kod tap və bu söhbətləri onun üzərində keç. Ciddi deyirəm, həqiqətən ucadan danış. Bir dost tap və hər rolu onunla məşq et. İkinizdən biri çaşsa və ya ilişsə, bu materialı təkrarlamağa daha çox vaxt ayır.'
        }
      ],
      note: 'Məşq: aşağıdakı kodda hər dəyişən istinadı üçün «bina»da hansı mərtəbədə tapıldığını de.\n\n```js\nconst theme = \'dark\';\nfunction App() {\n  const user = \'Aysel\';\n  function Header() {\n    return `${user} / ${theme}`;\n  }\n  return Header();\n}\n```\n\n`user` → 1 mərtəbə yuxarı (App), `theme` → 2 mərtəbə yuxarı (qlobal). Bu vərdiş React-də props-un haradan gəldiyini oxumaq üçün də lazımdır.'
    }
  ]
};
