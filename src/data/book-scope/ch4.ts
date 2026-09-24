import type { BookChapter } from '../books';
import { exam4 } from './exam-ch4';

export const ch4: BookChapter = {
  id: 'ch4',
  no: 4,
  title: 'Around the Global Scope',
  titleAz: 'Qlobal scope ətrafında',
  sum: 'Qlobal scope niyə hələ də vacibdir və o, brauzerdə, Web Worker-də, DevTools-da, ES modullarında və Node-da necə fərqli davranır; globalThis.',
  sections: [
    {
      id: 'intro',
      heading: 'Chapter 4: Around the Global Scope',
      headingAz: 'Fəsil 4: Qlobal scope ətrafında',
      blocks: [
        {
          en: 'Chapter 3 mentioned the "global scope" several times, but you may still be wondering why a program\'s outermost scope is all that important in modern JS. The vast majority of work is now done inside of functions and modules rather than globally.',
          az: '3-cü fəsildə «qlobal scope» bir neçə dəfə çəkildi, lakin yəqin hələ də düşünürsən ki, müasir JS-də proqramın ən xarici scope-u niyə bu qədər vacibdir. İşin böyük əksəriyyəti artıq qlobal səviyyədə yox, funksiya və modulların içində görülür.'
        },
        {
          en: 'Is it good enough to just assert, "Avoid using the global scope," and be done with it?',
          az: 'Sadəcə «qlobal scope-dan istifadə etmə» deyib keçmək kifayətdirmi?'
        },
        {
          en: 'The [[global-scope]] of a JS program is a rich topic, with much more utility and nuance than you would likely assume. This chapter first explores how the global scope is (still) useful and relevant to writing JS programs today, then looks at differences in where and *how to access* the global scope in different JS environments.',
          az: 'JS proqramının [[global-scope]]-u zəngin mövzudur — güman etdiyindən xeyli çox faydası və incəliyi var. Bu fəsil əvvəlcə qlobal scope-un bu gün JS proqramları yazmaq üçün (hələ də) necə faydalı və aktual olduğunu araşdırır, sonra müxtəlif JS mühitlərində qlobal scope-un harada olduğuna və ona *necə çatmağa* dair fərqlərə baxır.'
        },
        {
          en: 'Fully understanding the global scope is critical in your mastery of using lexical scope to structure your programs.',
          az: 'Qlobal scope-u tam anlamaq proqramlarını leksik scope ilə qurmağı mənimsəməyin üçün həlledicidir.'
        }
      ]
    },
    {
      id: 'why-global',
      heading: 'Why Global Scope?',
      headingAz: 'Niyə qlobal scope?',
      blocks: [
        {
          en: "It's likely no surprise to readers that most applications are composed of multiple (sometimes many!) individual JS files. So how exactly do all those separate files get stitched together in a single runtime context by the JS engine?",
          az: 'Oxucular üçün yəqin təəccüblü deyil ki, əksər tətbiqlər bir neçə (bəzən çoxlu!) ayrı JS faylından ibarətdir. Bəs JS mühərriki bütün bu ayrı faylları vahid icra kontekstində necə birləşdirir?'
        },
        {
          en: 'With respect to browser-executed applications, there are three main ways.',
          az: 'Brauzerdə icra olunan tətbiqlər üçün üç əsas yol var.'
        },
        {
          en: "**First**, if you're directly using ES modules (not transpiling them into some other module-bundle format), these files are loaded individually by the JS environment. Each module then `import`s references to whichever other modules it needs to access. The separate module files cooperate with each other exclusively through these shared imports, without needing any shared outer scope.",
          az: '**Birincisi**, ES modullarından birbaşa istifadə edirsənsə (onları başqa modul-bandl formatına çevirmədən), bu fayllar JS mühiti tərəfindən ayrı-ayrılıqda yüklənir. Hər modul ehtiyac duyduğu digər modullara istinadları `import` edir. Ayrı modul faylları bir-biri ilə yalnız bu ümumi importlar vasitəsilə əməkdaşlıq edir, heç bir ümumi xarici scope-a ehtiyac olmadan.'
        },
        {
          en: "**Second**, if you're using a [[bundler]] in your build process, all the files are typically concatenated together before delivery to the browser and JS engine, which then only processes one big file. Even with all the pieces of the application co-located in a single file, some mechanism is necessary for each piece to register a *name* to be referred to by other pieces, as well as some facility for that access to occur.",
          az: '**İkincisi**, build prosesində [[bundler]] istifadə edirsənsə, bütün fayllar adətən brauzerə və JS mühərrikinə çatdırılmazdan əvvəl birləşdirilir və mühərrik yalnız bir böyük faylı emal edir. Tətbiqin bütün hissələri bir faylda olsa belə, hər hissənin digər hissələrin müraciət edəcəyi *adı* qeydiyyata alması üçün hansısa mexanizm, həmçinin bu müraciətin baş verməsi üçün hansısa imkan lazımdır.'
        },
        {
          en: 'In some build setups, the entire contents of the file are wrapped in a single enclosing scope, such as a wrapper function, universal module (UMD — see Appendix A), etc. Each piece can register itself for access from other pieces by way of local variables in that shared scope. For example:',
          az: 'Bəzi build quruluşlarında faylın bütün məzmunu tək əhatə edən scope-a — sarğı funksiyasına, universal modula (UMD — bax: Əlavə A) və s. — bükülür. Hər hissə həmin ümumi scope-dakı lokal dəyişənlər vasitəsilə digər hissələr üçün özünü qeydiyyata ala bilər. Məsələn:'
        },
        {
          code: '(function wrappingOuterScope(){\n  var moduleOne = (function one(){\n    // ..\n  })();\n\n  var moduleTwo = (function two(){\n    // ..\n\n    function callModuleOne() {\n      moduleOne.someMethod();\n    }\n\n    // ..\n  })();\n})();'
        },
        {
          en: 'As shown, the `moduleOne` and `moduleTwo` local variables inside the `wrappingOuterScope()` function scope are declared so that these modules can access each other for their cooperation.',
          az: 'Göründüyü kimi, `wrappingOuterScope()` funksiyasının scope-undakı `moduleOne` və `moduleTwo` lokal dəyişənləri bu modulların əməkdaşlıq üçün bir-birinə çata bilməsi məqsədilə elan olunub.'
        },
        {
          en: 'While the scope of `wrappingOuterScope()` is a function and not the full environment global scope, it does act as a sort of "application-wide scope," a bucket where all the top-level identifiers can be stored, though not in the real global scope. It\'s kind of like a stand-in for the global scope in that respect.',
          az: '`wrappingOuterScope()`-un scope-u bütöv mühitin qlobal scope-u deyil, funksiya olsa da, bir növ «tətbiq miqyaslı scope» rolunu oynayır — bütün yuxarı səviyyəli identifikatorların saxlanıla biləcəyi vedrə, amma real qlobal scope-da yox. Bu baxımdan o, qlobal scope-un bir növ əvəzedicisidir.'
        },
        {
          en: 'And finally, the **third** way: whether a bundler tool is used for an application, or whether the (non-ES module) files are simply loaded in the browser individually (via `<script>` tags or other dynamic JS resource loading), if there is no single surrounding scope encompassing all these pieces, the **global scope** is the only way for them to cooperate with each other.',
          az: 'Və nəhayət, **üçüncü** yol: tətbiq üçün bandler alətindən istifadə olunsa da, (ES modulu olmayan) fayllar brauzerdə sadəcə ayrı-ayrılıqda yüklənsə də (`<script>` teqləri və ya digər dinamik JS resurs yükləməsi ilə), bütün bu hissələri əhatə edən vahid scope yoxdursa, onların bir-biri ilə əməkdaşlığının yeganə yolu **qlobal scope**-dur.'
        },
        {
          en: 'A bundled file of this sort often looks something like this:',
          az: 'Bu cür bandl faylı çox vaxt təxminən belə görünür:'
        },
        {
          code: 'var moduleOne = (function one(){\n  // ..\n})();\nvar moduleTwo = (function two(){\n  // ..\n\n  function callModuleOne() {\n    moduleOne.someMethod();\n  }\n\n  // ..\n})();'
        },
        {
          en: 'Here, since there is no surrounding function scope, these `moduleOne` and `moduleTwo` declarations are simply dropped into the global scope. This is effectively the same as if the files hadn\'t been concatenated, but loaded separately:',
          az: 'Burada əhatə edən funksiya scope-u olmadığı üçün `moduleOne` və `moduleTwo` bəyannamələri sadəcə qlobal scope-a düşür. Bu, faktiki olaraq faylların birləşdirilməyib ayrı-ayrılıqda yükləndiyi hal ilə eynidir:'
        },
        { caption: 'module1.js', code: 'var moduleOne = (function one(){\n  // ..\n})();' },
        {
          caption: 'module2.js',
          code: 'var moduleTwo = (function two(){\n  // ..\n\n  function callModuleOne() {\n    moduleOne.someMethod();\n  }\n\n  // ..\n})();'
        },
        {
          en: "If these files are loaded separately as normal standalone .js files in a browser environment, each top-level variable declaration will end up as a global variable, since the global scope is the only shared resource between these two separate files — they're independent programs, from the perspective of the JS engine.",
          az: 'Bu fayllar brauzer mühitində adi müstəqil .js faylları kimi ayrı-ayrılıqda yüklənsə, hər yuxarı səviyyəli dəyişən bəyannaməsi qlobal dəyişənə çevrilir, çünki bu iki ayrı fayl arasında yeganə ortaq resurs qlobal scope-dur — JS mühərriki baxımından onlar müstəqil proqramlardır.'
        },
        {
          en: "In addition to (potentially) accounting for where an application's code resides during runtime, and how each piece is able to access the other pieces to cooperate, the global scope is also where:\n\n- JS exposes its built-ins:\n- primitives: `undefined`, `null`, `Infinity`, `NaN`\n- natives: `Date()`, `Object()`, `String()`, etc.\n- global functions: `eval()`, `parseInt()`, etc.\n- namespaces: `Math`, `Atomics`, `JSON`\n- friends of JS: `Intl`, `WebAssembly`",
          az: 'Tətbiq kodunun icra zamanı harada yerləşdiyini və hər hissənin əməkdaşlıq üçün digər hissələrə necə çatdığını (potensial olaraq) müəyyən etməklə yanaşı, qlobal scope həm də:\n\n- JS-in öz daxili imkanlarını açdığı yerdir:\n- primitivlər: `undefined`, `null`, `Infinity`, `NaN`\n- nativlər: `Date()`, `Object()`, `String()` və s.\n- qlobal funksiyalar: `eval()`, `parseInt()` və s.\n- ad məkanları: `Math`, `Atomics`, `JSON`\n- JS-in dostları: `Intl`, `WebAssembly`'
        },
        {
          en: '- The environment hosting the JS engine exposes its own built-ins:\n- `console` (and its methods)\n- the DOM (`window`, `document`, etc)\n- timers (`setTimeout(..)`, etc)\n- web platform APIs: `navigator`, `history`, geolocation, WebRTC, etc.',
          az: '- JS mühərrikini yerləşdirən mühitin öz daxili imkanlarını açdığı yerdir:\n- `console` (və onun metodları)\n- DOM (`window`, `document` və s.)\n- taymerlər (`setTimeout(..)` və s.)\n- veb platforma API-ləri: `navigator`, `history`, geolokasiya, WebRTC və s.'
        },
        {
          en: 'These are just some of the many *globals* your programs will interact with.',
          az: 'Bunlar proqramlarının qarşılıqlı əlaqədə olacağı çoxsaylı *qlobalların* sadəcə bir hissəsidir.'
        },
        {
          en: '> **NOTE:** Node also exposes several elements "globally," but they\'re technically not in the `global` scope: `require()`, `__dirname`, `module`, `URL`, and so on.',
          az: '> **QEYD:** Node da bir neçə elementi «qlobal» şəkildə təqdim edir, lakin texniki baxımdan onlar `global` scope-da deyil: `require()`, `__dirname`, `module`, `URL` və s.'
        },
        {
          en: "Most developers agree that the global scope shouldn't just be a dumping ground for every variable in your application. That's a mess of bugs just waiting to happen. But it's also undeniable that the global scope is an important *glue* for practically every JS application.",
          az: 'Developerlərin əksəriyyəti razıdır ki, qlobal scope tətbiqindəki hər dəyişən üçün zibillik olmamalıdır. Bu, baş verməyi gözləyən buglar yığınıdır. Lakin qlobal scope-un praktik olaraq hər JS tətbiqi üçün vacib *yapışqan* olduğu da danılmazdır.'
        }
      ],
      note: 'Bu bölmə müasir build alətlərinin **niyə** mövcud olduğunu izah edir. Vite/webpack-dən əvvəl hər `<script>` qlobal scope-a dəyişən atırdı və iki kitabxana eyni adı istifadə edəndə biri o birini əzirdi.\n\nBundan müdafiə üçün əvvəl [[iife]] sarğıları, sonra [[commonjs]], indi isə [[esm]] yarandı. Hər mərhələ eyni problemi həll edir: **qlobal scope-u çirkləndirməmək**.'
    },
    {
      id: 'browser-window',
      heading: 'Where Exactly is this Global Scope? Browser "Window"',
      headingAz: 'Bu qlobal scope dəqiq haradadır? Brauzerin «window»-u',
      blocks: [
        {
          en: "It might seem obvious that the global scope is located in the outermost portion of a file; that is, not inside any function or other block. But it's not quite as simple as that.",
          az: 'Qlobal scope-un faylın ən xarici hissəsində, yəni heç bir funksiya və ya blokun içində olmayan yerdə yerləşdiyi açıq görünə bilər. Lakin iş o qədər də sadə deyil.'
        },
        {
          en: "Different JS environments handle the scopes of your programs, especially the global scope, differently. It's quite common for JS developers to harbor misconceptions without even realizing it.",
          az: 'Müxtəlif JS mühitləri proqramlarının scope-larını, xüsusən qlobal scope-u fərqli emal edir. JS developerlərinin bundan xəbərsiz yanlış təsəvvürlər daşıması olduqca adi haldır.'
        },
        { en: '## Browser "Window"', az: '## Brauzerin «window»-u' },
        {
          en: 'With respect to treatment of the global scope, the most *pure* environment JS can be run in is as a standalone .js file loaded in a web page environment in a browser. I don\'t mean "pure" as in nothing automatically added — lots may be added! — but rather in terms of minimal intrusion on the code or interference with its expected global scope behavior.',
          az: 'Qlobal scope-a münasibət baxımından JS-in işləyə biləcəyi ən *təmiz* mühit brauzerdə veb səhifəyə yüklənmiş müstəqil .js faylıdır. «Təmiz» dedikdə heç nəyin avtomatik əlavə olunmamasını nəzərdə tutmuram — çox şey əlavə oluna bilər! — söhbət koda minimal müdaxilədən və onun gözlənilən qlobal scope davranışına qarışmamaqdan gedir.'
        },
        { en: 'Consider this .js file:', az: 'Bu .js faylına bax:' },
        {
          code: "var studentName = 'Kyle';\n\nfunction hello() {\n  console.log(`Hello, ${ studentName }!`);\n}\n\nhello();\n// Hello, Kyle!"
        },
        {
          en: 'This code may be loaded in a web page environment using an inline `<script>` tag, a `<script src=..>` script tag in the markup, or even a dynamically created `<script>` DOM element. In all three cases, the `studentName` and `hello` identifiers are declared in the global scope.',
          az: 'Bu kod veb səhifə mühitinə daxili `<script>` teqi, markapdakı `<script src=..>` teqi və ya hətta dinamik yaradılmış `<script>` DOM elementi ilə yüklənə bilər. Hər üç halda `studentName` və `hello` identifikatorları qlobal scope-da elan olunur.'
        },
        {
          en: "That means if you access the global object (commonly, `window` in the browser), you'll find properties of those same names there:",
          az: 'Bu o deməkdir ki, qlobal obyektə (brauzerdə adətən `window`) müraciət etsən, orada həmin adlarda xassələr tapacaqsan:'
        },
        {
          code: "var studentName = 'Kyle';\n\nfunction hello() {\n  console.log(`Hello, ${ window.studentName }!`);\n}\n\nwindow.hello();\n// Hello, Kyle!"
        },
        {
          en: "That's the default behavior one would expect from a reading of the JS specification: the outer scope *is* the global scope and `studentName` is legitimately created as global variable.",
          az: 'JS spesifikasiyasını oxuyan kəsin gözlədiyi standart davranış budur: xarici scope *məhz* qlobal scope-dur və `studentName` qanuni şəkildə qlobal dəyişən kimi yaradılır.'
        },
        {
          en: "That's what I mean by *pure*. But unfortunately, that won't always be true of all JS environments you encounter, and that's often surprising to JS developers.",
          az: '*Təmiz* dedikdə nəzərdə tutduğum budur. Lakin təəssüf ki, rast gələcəyin bütün JS mühitlərində bu, həmişə belə olmayacaq və bu, JS developerlərini tez-tez təəccübləndirir.'
        },
        { en: '## Globals Shadowing Globals', az: '## Qlobalları kölgələyən qloballar' },
        {
          en: 'Recall the discussion of shadowing (and global unshadowing) from Chapter 3, where one variable declaration can override and prevent access to a declaration of the same name from an outer scope.',
          az: '3-cü fəsildəki kölgələmə (və qlobal dəyişəni kölgədən çıxarma) müzakirəsini xatırla: bir dəyişən bəyannaməsi xarici scope-dakı eyni adlı bəyannaməni üstələyib ona çıxışın qarşısını ala bilər.'
        },
        {
          en: 'An unusual consequence of the difference between a global variable and a global property of the same name is that, within just the global scope itself, a global object property can be shadowed by a global variable:',
          az: 'Qlobal dəyişənlə eyni adlı qlobal xassə arasındakı fərqin qeyri-adi nəticəsi budur ki, hətta qlobal scope-un özündə qlobal obyektin xassəsi qlobal dəyişən tərəfindən kölgələnə bilər:'
        },
        {
          code: "window.something = 42;\n\nlet something = 'Kyle';\n\nconsole.log(something);\n// Kyle\n\nconsole.log(window.something);\n// 42"
        },
        {
          en: 'The `let` declaration adds a `something` global variable but not a global object property (see Chapter 3). The effect then is that the `something` lexical identifier shadows the `something` global object property.',
          az: '`let` bəyannaməsi `something` qlobal dəyişənini əlavə edir, amma qlobal obyektin xassəsini yox (bax: 3-cü fəsil). Nəticədə `something` leksik identifikatoru `something` qlobal obyekt xassəsini kölgələyir.'
        },
        {
          en: "It's almost certainly a bad idea to create a divergence between the global object and the global scope. Readers of your code will almost certainly be tripped up.",
          az: 'Qlobal obyektlə qlobal scope arasında ayrılıq yaratmaq demək olar ki, həmişə pis fikirdir. Kodunu oxuyanlar demək olar ki, mütləq çaşacaq.'
        },
        {
          en: 'A simple way to avoid this gotcha with global declarations: always use `var` for globals. Reserve `let` and `const` for block scopes (see "Scoping with Blocks" in Chapter 6).',
          az: 'Qlobal bəyannamələrdə bu tələdən qaçmağın sadə yolu: qlobal dəyişənlər üçün həmişə `var` istifadə et. `let` və `const`-u blok scope-lar üçün saxla (bax: 6-cı fəsildə «Bloklarla scope yaratmaq»).'
        },
        { en: '## DOM Globals', az: '## DOM qlobalları' },
        {
          en: "I asserted that a browser-hosted JS environment has the most pure global scope behavior we'll see. However, it's not *entirely* pure.",
          az: 'Brauzerdə işləyən JS mühitinin görəcəyimiz ən təmiz qlobal scope davranışına malik olduğunu iddia etdim. Lakin o, *tamamilə* təmiz deyil.'
        },
        {
          en: 'One surprising behavior in the global scope you may encounter with browser-based JS applications: a DOM element with an `id` attribute automatically creates a global variable that references it.',
          az: 'Brauzer əsaslı JS tətbiqlərində rast gələ biləcəyin təəccüblü davranışlardan biri: `id` atributu olan DOM elementi avtomatik olaraq ona istinad edən qlobal dəyişən yaradır.'
        },
        { en: 'Consider this markup:', az: 'Bu markapa bax:' },
        { code: '<ul id="my-todo-list">\n  <li id="first">Write a book</li>\n  ..\n</ul>' },
        { en: 'And the JS for that page could include:', az: 'Həmin səhifənin JS kodunda isə belə ola bilər:' },
        {
          code: 'first;\n// <li id="first">..</li>\n\nwindow["my-todo-list"];\n// <ul id="my-todo-list">..</ul>'
        },
        {
          en: 'If the `id` value is a valid lexical name (like `first`), the lexical variable is created. If not, the only way to access that global is through the global object (`window[..]`).',
          az: '`id` dəyəri etibarlı leksik addırsa (məsələn, `first`), leksik dəyişən yaradılır. Deyilsə, həmin qlobala çatmağın yeganə yolu qlobal obyektdir (`window[..]`).'
        },
        {
          en: 'The auto-registration of all `id`-bearing DOM elements as global variables is an old legacy browser behavior that nevertheless must remain because so many old sites still rely on it. My advice is never to use these global variables, even though they will always be silently created.',
          az: '`id`-si olan bütün DOM elementlərinin avtomatik qlobal dəyişən kimi qeydiyyata alınması köhnə brauzer davranışıdır, lakin bir çox köhnə sayt hələ də ona güvəndiyi üçün qalmalıdır. Məsləhətim: bu qlobal dəyişənlər həmişə səssizcə yaradılsa da, onlardan heç vaxt istifadə etmə.'
        },
        { en: "## What's in a (Window) Name?", az: '## (Window) adında nə var?' },
        { en: 'Another global scope oddity in browser-based JS:', az: 'Brauzer əsaslı JS-də qlobal scope-un daha bir qəribəliyi:' },
        { code: 'var name = 42;\n\nconsole.log(name, typeof name);\n// "42" string' },
        {
          en: '`window.name` is a pre-defined "global" in a browser context; it\'s a property on the global object, so it seems like a normal global variable (yet it\'s anything but "normal").',
          az: '`window.name` brauzer kontekstində əvvəlcədən təyin olunmuş «qlobal»dır; o, qlobal obyektin xassəsidir, ona görə adi qlobal dəyişən kimi görünür (amma «adi»dən başqa hər şeydir).'
        },
        {
          en: 'We used `var` for our declaration, which **does not** shadow the pre-defined `name` global property. That means, effectively, the `var` declaration is ignored, since there\'s already a global scope object property of that name. As we discussed earlier, had we used `let name`, we would have shadowed `window.name` with a separate global `name` variable.',
          az: 'Bəyannamə üçün `var` istifadə etdik, o isə əvvəlcədən təyin olunmuş `name` qlobal xassəsini **kölgələmir**. Bu o deməkdir ki, qlobal scope obyektində artıq həmin adda xassə olduğu üçün `var` bəyannaməsi faktiki olaraq nəzərə alınmır. Əvvəl müzakirə etdiyimiz kimi, `let name` istifadə etsəydik, `window.name`-i ayrıca qlobal `name` dəyişəni ilə kölgələyərdik.'
        },
        {
          en: 'But the truly surprising behavior is that even though we assigned the number `42` to `name` (and thus `window.name`), when we then retrieve its value, it\'s a string `"42"`! In this case, the weirdness is because `name` is actually a pre-defined getter/setter on the `window` object, which insists on its value being a string value. Yikes!',
          az: 'Lakin həqiqətən təəccüblü davranış budur: `name`-ə (deməli, `window.name`-ə) `42` rəqəmini mənimsətsək də, sonra dəyərini oxuyanda `"42"` sətri alırıq! Bu halda qəribəliyin səbəbi budur ki, `name` əslində `window` obyektində əvvəlcədən təyin olunmuş getter/setter-dir və dəyərin sətir olmasında israr edir. Vay!'
        },
        {
          en: 'With the exception of some rare corner cases like DOM element ID\'s and `window.name`, JS running as a standalone file in a browser page has some of the most pure global scope behavior we will encounter.',
          az: 'DOM elementlərinin ID-ləri və `window.name` kimi bəzi nadir hallar istisna olmaqla, brauzer səhifəsində müstəqil fayl kimi işləyən JS rast gələcəyimiz ən təmiz qlobal scope davranışlarından birinə malikdir.'
        }
      ],
      note: 'Real bug nümunəsi: `var name`, `var status`, `var top` kimi adlar brauzerdə gözlənilməz davranır, çünki `window.name`, `window.status`, `window.top` artıq mövcuddur.\n\nModul sisteminə (Vite, React) keçəndə bu problemlər itir — yuxarı səviyyəli dəyişənlərin qlobal obyektə düşmür. Amma köhnə skriptlərlə və ya `<script>` teqi ilə qoşulan kitabxanalarla işləyəndə bu biliyə ehtiyacın olacaq.',
      terms: ['global-object', 'dom', 'shadowing']
    },
    {
      id: 'web-workers',
      heading: 'Web Workers',
      headingAz: 'Web Worker-lər',
      blocks: [
        {
          en: "[[web-worker]] is a web platform extension on top of browser-JS behavior, which allows a JS file to run in a completely separate thread (operating system wise) from the thread that's running the main JS program.",
          az: '[[web-worker]] brauzer JS davranışı üzərində veb platforma genişlənməsidir; o, JS faylının əsas JS proqramını işlədən axından tamamilə ayrı (əməliyyat sistemi səviyyəsində) axında işləməsinə imkan verir.'
        },
        {
          en: "Since these Web Worker programs run on a separate thread, they're restricted in their communications with the main application thread, to avoid/limit race conditions and other complications. Web Worker code does not have access to the DOM, for example. Some web APIs are, however, made available to the worker, such as `navigator`.",
          az: 'Web Worker proqramları ayrı axında işlədiyi üçün yarış vəziyyətlərinin (race condition) və digər fəsadların qarşısını almaq/məhdudlaşdırmaq məqsədilə əsas tətbiq axını ilə əlaqələri məhdudlaşdırılıb. Məsələn, Web Worker kodunun DOM-a çıxışı yoxdur. Bununla belə, bəzi veb API-lər, məsələn `navigator`, worker üçün əlçatandır.'
        },
        {
          en: "Since a Web Worker is treated as a wholly separate program, it does not share the global scope with the main JS program. However, the browser's JS engine is still running the code, so we can expect similar purity of its global scope behavior. Since there is no DOM access, the `window` alias for the global scope doesn't exist.",
          az: 'Web Worker tamamilə ayrı proqram sayıldığı üçün əsas JS proqramı ilə qlobal scope-u bölüşmür. Lakin kodu yenə də brauzerin JS mühərriki işlədir, ona görə onun qlobal scope davranışında da oxşar təmizlik gözləyə bilərik. DOM çıxışı olmadığından qlobal scope üçün `window` ləqəbi mövcud deyil.'
        },
        {
          en: 'In a Web Worker, the global object reference is typically made using `self`:',
          az: 'Web Worker-də qlobal obyektə istinad adətən `self` ilə edilir:'
        },
        {
          code: "var studentName = 'Kyle';\nlet studentID = 42;\n\nfunction hello() {\n  console.log(`Hello, ${ self.studentName }!`);\n}\n\nself.hello();\n// Hello, Kyle!\n\nself.studentID;\n// undefined"
        },
        {
          en: 'Just as with main JS programs, `var` and `function` declarations create mirrored properties on the global object (aka, `self`), where other declarations (`let`, etc) do not.',
          az: 'Əsas JS proqramlarında olduğu kimi, `var` və `function` bəyannamələri qlobal obyektdə (yəni `self`-də) güzgü xassələri yaradır, digər bəyannamələr (`let` və s.) isə yaratmır.'
        },
        {
          en: "So again, the global scope behavior we're seeing here is about as pure as it gets for running JS programs; perhaps it's even more pure since there's no DOM to muck things up!",
          az: 'Yenə deyirəm, burada gördüyümüz qlobal scope davranışı JS proqramlarını işlətmək üçün mümkün olan ən təmiz davranışdır; bəlkə də daha təmizdir, çünki işləri qarışdıran DOM yoxdur!'
        }
      ],
      note: 'Worker-lər ağır hesablamaları (böyük JSON parse, şəkil emalı, axtarış indeksi) əsas axından çıxarmaq üçündür ki, UI donmasın. Əsas axınla əlaqə yalnız `postMessage` ilə olur — ortaq dəyişən yoxdur, çünki qlobal scope-lar ayrıdır.\n\nVite-də worker yaratmaq: `new Worker(new URL(\'./worker.ts\', import.meta.url), { type: \'module\' })`.'
    },
    {
      id: 'devtools',
      heading: 'Developer Tools Console/REPL',
      headingAz: 'Developer Tools konsolu/REPL',
      blocks: [
        {
          en: "Recall from Chapter 1 in *Get Started* that Developer Tools don't create a completely adherent JS environment. They do process JS code, but they also lean in favor of the UX interaction being most friendly to developers (aka, developer experience, or DX).",
          az: '*Get Started* kitabının 1-ci fəslindən xatırla ki, Developer Tools tam uyğun JS mühiti yaratmır. Onlar JS kodunu emal edir, lakin developerlər üçün ən rahat qarşılıqlı əlaqəyə (developer experience, DX) üstünlük verir.'
        },
        {
          en: 'In some cases, favoring DX when typing in short JS snippets, over the normal strict steps expected for processing a full JS program, produces observable differences in code behavior between programs and tools. For example, certain error conditions applicable to a JS program may be relaxed and not displayed when the code is entered into a developer tool.',
          az: 'Bəzi hallarda qısa JS parçaları yazarkən tam JS proqramının emalı üçün gözlənilən adi ciddi addımlar əvəzinə DX-ə üstünlük vermək proqramlarla alətlər arasında kodun davranışında müşahidə olunan fərqlər yaradır. Məsələn, JS proqramına aid bəzi səhv vəziyyətləri kod developer alətinə daxil ediləndə yumşaldıla və göstərilməyə bilər.'
        },
        {
          en: 'With respect to our discussions here about scope, such observable differences in behavior may include:\n\n- The behavior of the global scope\n- Hoisting (see Chapter 5)\n- Block-scoping declarators (`let` / `const`, see Chapter 6) when used in the outermost scope',
          az: 'Scope haqqında buradakı müzakirələrimiz baxımından belə müşahidə olunan davranış fərqlərinə bunlar aid ola bilər:\n\n- Qlobal scope-un davranışı\n- Hoisting (bax: 5-ci fəsil)\n- Ən xarici scope-da istifadə olunan blok-scope bəyannamələri (`let` / `const`, bax: 6-cı fəsil)'
        },
        {
          en: "Although it might seem, while using the console/REPL, that statements entered in the outermost scope are being processed in the real global scope, that's not quite accurate. Such tools typically emulate the global scope position to an extent; it's emulation, not strict adherence. These tool environments prioritize developer convenience, which means that at times (such as with our current discussions regarding scope), observed behavior may deviate from the JS specification.",
          az: 'Konsol/REPL istifadə edərkən ən xarici scope-da daxil edilən ifadələrin real qlobal scope-da emal olunduğu görünə bilər, lakin bu, tam dəqiq deyil. Belə alətlər adətən qlobal scope mövqeyini müəyyən qədər təqlid edir; bu, ciddi uyğunluq yox, emulyasiyadır. Bu alət mühitləri developer rahatlığını önə çəkir, yəni bəzən (məsələn, scope haqqında indiki müzakirələrimizdə olduğu kimi) müşahidə olunan davranış JS spesifikasiyasından kənara çıxa bilər.'
        },
        {
          en: 'The take-away is that Developer Tools, while optimized to be convenient and useful for a variety of developer activities, are **not** suitable environments to determine or verify explicit and nuanced behaviors of an actual JS program context.',
          az: 'Nəticə budur: Developer Tools müxtəlif developer işləri üçün rahat və faydalı olmaq üçün optimallaşdırılsa da, real JS proqram kontekstinin dəqiq və incə davranışlarını müəyyən etmək və ya yoxlamaq üçün uyğun mühit **deyil**.'
        }
      ],
      note: 'Praktik misal: konsolda `let x = 1` yazıb Enter bas, sonra yenə `let x = 2` yaz — Chrome buna icazə verir, halbuki real proqramda bu, `SyntaxError`-dur.\n\nQayda: scope/hoisting davranışını yoxlamaq istəyirsənsə, kodu fayla yaz və ya kiçik test (Vitest) ilə işlət. Konsol sürətli yoxlama üçündür, spesifikasiyanın sübutu üçün yox.',
      terms: ['devtools', 'vitest']
    },
    {
      id: 'esm',
      heading: 'ES Modules (ESM)',
      headingAz: 'ES modulları (ESM)',
      blocks: [
        {
          en: 'ES6 introduced first-class support for the module pattern (covered in Chapter 8). One of the most obvious impacts of using [[esm]] is how it changes the behavior of the observably top-level scope in a file.',
          az: 'ES6 modul nümunəsinə (8-ci fəsildə) birinci dərəcəli dəstək gətirdi. [[esm]] istifadəsinin ən açıq təsirlərindən biri faylda görünən yuxarı səviyyəli scope-un davranışını dəyişməsidir.'
        },
        {
          en: "Recall this code snippet from earlier (which we'll adjust to ESM format by using the `export` keyword):",
          az: 'Əvvəlki kod parçasını xatırla (onu `export` açar sözü ilə ESM formatına uyğunlaşdıracağıq):'
        },
        {
          code: "var studentName = 'Kyle';\n\nfunction hello() {\n  console.log(`Hello, ${ studentName }!`);\n}\n\nhello();\n// Hello, Kyle!\n\nexport hello;"
        },
        {
          en: 'If that code is in a file that\'s loaded as an ES module, it will still run exactly the same. However, the observable effects, from the overall application perspective, will be different.',
          az: 'Bu kod ES modulu kimi yüklənən fayldadırsa, yenə tam eyni şəkildə işləyəcək. Lakin bütöv tətbiq baxımından müşahidə olunan təsirlər fərqli olacaq.'
        },
        {
          en: 'Despite being declared at the top level of the (module) file, in the outermost obvious scope, `studentName` and `hello` are not global variables. Instead, they are module-wide, or if you prefer, "module-global."',
          az: '(Modul) faylının yuxarı səviyyəsində, ən xarici görünən scope-da elan olunsalar da, `studentName` və `hello` qlobal dəyişən deyil. Onlar modul miqyaslıdır, istəsən, «modul-qlobal».'
        },
        {
          en: "However, in a module there's no implicit \"module-wide scope object\" for these top-level declarations to be added to as properties, as there is when declarations appear in the top-level of non-module JS files. This is not to say that global variables cannot exist or be accessed in such programs. It's just that global variables don't get *created* by declaring variables in the top-level scope of a module.",
          az: 'Lakin modul olmayan JS fayllarının yuxarı səviyyəsindəki bəyannamələrdən fərqli olaraq, modulda bu yuxarı səviyyəli bəyannamələrin xassə kimi əlavə olunacağı gizli «modul miqyaslı scope obyekti» yoxdur. Bu, belə proqramlarda qlobal dəyişənlərin ola bilməyəcəyi və ya onlara çatmağın mümkün olmadığı demək deyil. Sadəcə modulun yuxarı səviyyəli scope-unda dəyişən elan etməklə qlobal dəyişən *yaradılmır*.'
        },
        {
          en: "The module's top-level scope is descended from the global scope, almost as if the entire contents of the module were wrapped in a function. Thus, all variables that exist in the global scope (whether they're on the global object or not!) are available as lexical identifiers from inside the module's scope.",
          az: 'Modulun yuxarı səviyyəli scope-u qlobal scope-dan törəyir — sanki modulun bütün məzmunu funksiyaya bükülüb. Buna görə qlobal scope-da mövcud olan bütün dəyişənlər (qlobal obyektdə olub-olmamasından asılı olmayaraq!) modulun scope-unun içindən leksik identifikator kimi əlçatandır.'
        },
        {
          en: 'ESM encourages a minimization of reliance on the global scope, where you import whatever modules you may need for the current module to operate. As such, you less often see usage of the global scope or its global object.',
          az: 'ESM qlobal scope-dan asılılığı minimuma endirməyi təşviq edir: cari modulun işləməsi üçün lazım olan modulları import edirsən. Buna görə qlobal scope-un və ya onun qlobal obyektinin istifadəsinə daha az rast gəlirsən.'
        },
        {
          en: 'However, as noted earlier, there are still plenty of JS and web globals that you will continue to access from the global scope, whether you realize it or not!',
          az: 'Lakin əvvəl qeyd etdiyimiz kimi, fərqində olsan da, olmasan da, qlobal scope-dan müraciət etməyə davam edəcəyin çoxlu JS və veb qlobalları hələ də var!'
        }
      ],
      note: 'Sənin gündəlik React/Vite kodun məhz budur: hər `.tsx` faylı ayrıca moduldur. Faylın yuxarısında yazdığın `const API_URL = ...` başqa fayldan görünmür — yalnız `export` etsən.\n\nBu, qlobal adların toqquşmasını tamamilə aradan qaldırır və [[tree-shaking]]-i mümkün edir: istifadə olunmayan export-lar bandldan atılır.',
      terms: ['named-export']
    },
    {
      id: 'node',
      heading: 'Node',
      headingAz: 'Node',
      blocks: [
        {
          en: 'One aspect of Node that often catches JS developers off-guard is that Node treats every single .js file that it loads, including the main one you start the Node process with, as a *module* (ES module or CommonJS module, see Chapter 8). The practical effect is that the top level of your Node programs is **never** actually the global scope, the way it is when loading a non-module file in the browser.',
          az: 'Node-un JS developerlərini tez-tez gözlənilmədən yaxalayan xüsusiyyətlərindən biri: Node yüklədiyi hər .js faylını, o cümlədən Node prosesini başlatdığın əsas faylı, *modul* (ES modulu və ya CommonJS modulu, bax: 8-ci fəsil) kimi qəbul edir. Praktik nəticəsi budur ki, Node proqramlarının yuxarı səviyyəsi brauzerdə modul olmayan faylı yükləyərkən olduğu kimi **heç vaxt** qlobal scope olmur.'
        },
        {
          en: 'As of time of this writing, Node has recently added support for ES modules. But additionally, Node has from its beginning supported a module format referred to as "CommonJS" ([[commonjs]]), which looks like this:',
          az: 'Bu sətirlər yazılarkən Node ES modullarına dəstəyi yenicə əlavə etmişdi. Lakin bundan əlavə, Node başlanğıcdan «CommonJS» ([[commonjs]]) adlanan modul formatını dəstəkləyir; o, belə görünür:'
        },
        {
          code: "var studentName = 'Kyle';\n\nfunction hello() {\n  console.log(`Hello, ${ studentName }!`);\n}\n\nhello();\n// Hello, Kyle!\n\nmodule.exports.hello = hello;"
        },
        {
          en: 'Before processing, Node effectively wraps such code in a function, so that the `var` and `function` declarations are contained in that wrapping function\'s scope, **not** treated as global variables.',
          az: 'Emaldan əvvəl Node belə kodu faktiki olaraq funksiyaya bükür ki, `var` və `function` bəyannamələri həmin sarğı funksiyasının scope-unda qalsın, qlobal dəyişən kimi **qəbul olunmasın**.'
        },
        {
          en: 'Envision the preceding code as being seen by Node as this (illustrative, not actual):',
          az: 'Təsəvvür et ki, Node əvvəlki kodu belə görür (illüstrativ, real deyil):'
        },
        {
          code: "function Module(module,require,__dirname,...) {\n  var studentName = 'Kyle';\n\n  function hello() {\n    console.log(`Hello, ${ studentName }!`);\n  }\n\n  hello();\n  // Hello, Kyle!\n\n  module.exports.hello = hello;\n}"
        },
        {
          en: 'Node then essentially invokes the added `Module(..)` function to run your module. You can clearly see here why `studentName` and `hello` identifiers are not global, but rather declared in the module scope.',
          az: 'Sonra Node modulunu işə salmaq üçün mahiyyətcə əlavə edilmiş `Module(..)` funksiyasını çağırır. Burada `studentName` və `hello` identifikatorlarının niyə qlobal olmadığını, modul scope-unda elan olunduğunu aydın görürsən.'
        },
        {
          en: 'As noted earlier, Node defines a number of "globals" like `require()`, but they\'re not actually identifiers in the global scope (nor properties of the global object). They\'re injected in the scope of every module, essentially a bit like the parameters listed in the `Module(..)` function declaration.',
          az: 'Əvvəl qeyd etdiyimiz kimi, Node `require()` kimi bir sıra «qlobal»lar təyin edir, lakin onlar əslində qlobal scope-dakı identifikator (və ya qlobal obyektin xassəsi) deyil. Onlar hər modulun scope-una yeridilir — mahiyyətcə `Module(..)` funksiya bəyannaməsində sadalanan parametrlər kimi.'
        },
        {
          en: 'So how do you define actual global variables in Node? The only way to do so is to add properties to another of Node\'s automatically provided "globals," which is ironically called `global`. `global` is a reference to the real global scope object, somewhat like using `window` in a browser JS environment.',
          az: 'Bəs Node-da həqiqi qlobal dəyişən necə təyin edilir? Yeganə yol Node-un avtomatik verdiyi başqa bir «qlobal»a — ironik şəkildə `global` adlanana — xassə əlavə etməkdir. `global` real qlobal scope obyektinə istinaddır, brauzer JS mühitində `window` istifadəsinə bənzəyir.'
        },
        { en: 'Consider:', az: 'Buna bax:' },
        {
          code: "global.studentName = 'Kyle';\n\nfunction hello() {\n  console.log(`Hello, ${ studentName }!`);\n}\n\nhello();\n// Hello, Kyle!\n\nmodule.exports.hello = hello;"
        },
        {
          en: 'Here we add `studentName` as a property on the global object, and then in the `console.log(..)` statement we\'re able to access `studentName` as a normal global variable.',
          az: 'Burada `studentName`-i qlobal obyektə xassə kimi əlavə edirik, sonra isə `console.log(..)` ifadəsində `studentName`-ə adi qlobal dəyişən kimi müraciət edə bilirik.'
        },
        {
          en: 'Remember, the identifier `global` is not defined by JS; it\'s specifically defined by Node.',
          az: 'Unutma: `global` identifikatorunu JS yox, məhz Node təyin edir.'
        }
      ],
      note: 'Frontend developer üçün bu nə deməkdir: `vite.config.ts`, ESLint konfiqi, test faylları Node-da işləyir. Orada `window` yoxdur, `__dirname` isə yalnız CommonJS-də var (ESM-də `import.meta.url` istifadə olunur).\n\n«window is not defined» səhvi SSR-də (Next.js) məhz buna görə çıxır: komponent kodu serverdə, yəni Node-da işləyir.',
      terms: ['ssr']
    },
    {
      id: 'global-this',
      heading: 'Global This',
      headingAz: 'Global This',
      blocks: [
        {
          en: "Reviewing the JS environments we've looked at so far, a program may or may not:\n\n- Declare a global variable in the top-level scope with `var` or `function` declarations — or `let`, `const`, and `class`.\n- Also add global variables declarations as properties of the global scope object if `var` or `function` are used for the declaration.\n- Refer to the global scope object (for adding or retrieving global variables, as properties) with `window`, `self`, or `global`.",
          az: 'İndiyə qədər baxdığımız JS mühitlərini xülasə etsək, proqram bunları edə də bilər, etməyə də:\n\n- Yuxarı səviyyəli scope-da `var` və ya `function` bəyannamələri ilə — yaxud `let`, `const` və `class` ilə — qlobal dəyişən elan etmək.\n- Bəyannamə üçün `var` və ya `function` istifadə olunubsa, qlobal dəyişən bəyannamələrini qlobal scope obyektinin xassələri kimi də əlavə etmək.\n- Qlobal scope obyektinə (qlobal dəyişənləri xassə kimi əlavə etmək və ya oxumaq üçün) `window`, `self` və ya `global` ilə istinad etmək.'
        },
        {
          en: "I think it's fair to say that global scope access and behavior is more complicated than most developers assume, as the preceding sections have illustrated. But the complexity is never more obvious than in trying to nail down a universally applicable reference to the global scope object.",
          az: 'Düşünürəm ki, əvvəlki bölmələrin göstərdiyi kimi, qlobal scope-a çıxışın və onun davranışının əksər developerlərin güman etdiyindən daha mürəkkəb olduğunu demək ədalətli olar. Lakin bu mürəkkəblik heç yerdə qlobal scope obyektinə universal tətbiq oluna bilən istinad tapmağa çalışarkən olduğu qədər aydın görünmür.'
        },
        {
          en: 'Yet another "trick" for obtaining a reference to the global scope object looks like:',
          az: 'Qlobal scope obyektinə istinad əldə etmək üçün daha bir «hiylə» belə görünür:'
        },
        { code: "const theGlobalScopeObject =\n  (new Function('return this'))();" },
        {
          en: '> **NOTE:** A function can be dynamically constructed from code stored in a string value with the `Function()` constructor, similar to `eval(..)` (see "Cheating: Runtime Scope Modifications" in Chapter 1). Such a function will automatically be run in non-strict-mode (for legacy reasons) when invoked with the normal `()` function invocation as shown; its `this` will point at the global object. See the third book in the series, *Objects & Classes*, for more information on determining `this` bindings.',
          az: '> **QEYD:** Funksiya sətir dəyərində saxlanan koddan `Function()` konstruktoru ilə dinamik şəkildə qurula bilər — `eval(..)`-ə bənzər şəkildə (bax: 1-ci fəsildə «Hiylə: scope-u icra anında dəyişmək»). Belə funksiya göstərildiyi kimi adi `()` çağırışı ilə çağırılanda (köhnə səbəblərə görə) avtomatik qeyri-sərt rejimdə işləyir; onun `this`-i qlobal obyektə işarə edəcək. `this` bağlamalarının necə müəyyən olunduğu haqqında ətraflı məlumat üçün seriyanın üçüncü kitabına — *Objects & Classes*-ə bax.'
        },
        {
          en: "So, we have `window`, `self`, `global`, and this ugly `new Function(..)` trick. That's a lot of different ways to try to get at this global object. Each has its pros and cons.",
          az: 'Deməli, əlimizdə `window`, `self`, `global` və bu çirkin `new Function(..)` hiyləsi var. Bu qlobal obyektə çatmağa çalışmaq üçün çoxlu fərqli yol. Hər birinin üstünlükləri və çatışmazlıqları var.'
        },
        { en: 'Why not introduce yet another!?!?', az: 'Niyə daha birini əlavə etməyək!?!?' },
        {
          en: 'As of ES2020, JS has finally defined a standardized reference to the global scope object, called [[globalthis]]. So, subject to the recency of the JS engines your code runs in, you can use `globalThis` in place of any of those other approaches.',
          az: 'ES2020-dən etibarən JS nəhayət qlobal scope obyektinə standart istinad təyin etdi: [[globalthis]]. Beləliklə, kodunun işlədiyi JS mühərriklərinin kifayət qədər yeni olması şərtilə, digər bütün yanaşmaların yerinə `globalThis` istifadə edə bilərsən.'
        },
        {
          en: 'We could even attempt to define a cross-environment polyfill that\'s safer across pre-`globalThis` JS environments, such as:',
          az: 'Hətta `globalThis`-dən əvvəlki JS mühitlərində daha təhlükəsiz işləyən, mühitlərarası polifil təyin etməyə də cəhd edə bilərik, məsələn:'
        },
        {
          code: "const theGlobalScopeObject =\n  (typeof globalThis != 'undefined') ? globalThis :\n  (typeof global != 'undefined') ? global :\n  (typeof window != 'undefined') ? window :\n  (typeof self != 'undefined') ? self :\n  (new Function('return this'))();"
        },
        {
          en: "Phew! That's certainly not ideal, but it works if you find yourself needing a reliable global scope reference.",
          az: 'Uf! Bu, əlbəttə, ideal deyil, amma etibarlı qlobal scope istinadına ehtiyacın olsa, işləyir.'
        },
        {
          en: '(The proposed name `globalThis` was fairly controversial while the feature was being added to JS. Specifically, I and many others felt the "this" reference in its name was misleading, since the reason you reference this object is to access to the global scope, never to access some sort of global/default `this` binding. There were many other names considered, but for a variety of reasons ruled out. Unfortunately, the name chosen ended up as a last resort. If you plan to interact with the global scope object in your programs, to reduce confusion, I strongly recommend choosing a better name, such as (the laughably long but accurate!) `theGlobalScopeObject` used here.)',
          az: '(`globalThis` adı bu imkan JS-ə əlavə olunarkən xeyli mübahisəli idi. Xüsusən mən və bir çoxları düşünürdük ki, adındakı «this» çaşdırıcıdır, çünki bu obyektə qlobal scope-a çatmaq üçün müraciət edirsən, heç vaxt hansısa qlobal/standart `this` bağlamasına çatmaq üçün yox. Bir çox başqa ad da nəzərdən keçirildi, amma müxtəlif səbəblərə görə rədd edildi. Təəssüf ki, seçilən ad son çarə kimi qaldı. Proqramlarında qlobal scope obyekti ilə işləməyi planlaşdırırsansa, qarışıqlığı azaltmaq üçün daha yaxşı ad seçməyi — məsələn, burada istifadə olunan (gülməli dərəcədə uzun, amma dəqiq!) `theGlobalScopeObject` — qətiyyətlə tövsiyə edirəm.)'
        }
      ],
      note: 'Bu gün praktik cavab sadədir: universal kod yazırsansa (brauzer + Node + worker), `globalThis` istifadə et. Bütün müasir mühitlər onu dəstəkləyir.\n\n```js\nif (typeof globalThis.fetch !== \'function\') {\n  // köhnə mühit — polyfill yüklə\n}\n```',
      terms: ['this']
    },
    {
      id: 'globally-aware',
      heading: 'Globally Aware',
      headingAz: 'Qlobal şüur',
      blocks: [
        {
          en: 'The global scope is present and relevant in every JS program, even though modern patterns for organizing code into modules de-emphasizes much of the reliance on storing identifiers in that namespace.',
          az: 'Qlobal scope hər JS proqramında mövcuddur və aktualdır, baxmayaraq ki, kodu modullara ayıran müasir nümunələr identifikatorları həmin ad məkanında saxlamağa olan asılılığı xeyli azaldır.'
        },
        {
          en: "Still, as our code proliferates more and more beyond the confines of the browser, it's especially important we have a solid grasp on the differences in how the global scope (and global scope object!) behave across different JS environments.",
          az: 'Yenə də kodumuz brauzerin hüdudlarından kənara getdikcə daha çox yayıldığı üçün qlobal scope-un (və qlobal scope obyektinin!) müxtəlif JS mühitlərində necə davrandığını möhkəm anlamaq xüsusilə vacibdir.'
        },
        {
          en: 'With the big picture of global scope now sharper in focus, the next chapter again descends into the deeper details of lexical scope, examining how and when variables can be used.',
          az: 'Qlobal scope-un böyük mənzərəsi indi daha aydın olduğu üçün növbəti fəsil yenidən leksik scope-un dərin detallarına enir və dəyişənlərin necə və nə vaxt istifadə oluna biləcəyini araşdırır.'
        }
      ],
      note: 'Fəslin cədvəli — qlobal obyektə istinad:\n\n```text\nBrauzer (adi script) → window   (var/function → xassə olur)\nWeb Worker           → self\nNode                 → global   (fayl = modul, yuxarı səviyyə qlobal deyil)\nES modulu            → yuxarı səviyyə modul scope-dur, qlobal deyil\nHər yerdə            → globalThis\n```'
    }
  ],
  exam: exam4
};
