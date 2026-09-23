import type { BookChapter } from '../books';

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
          en: 'Chapter 3 mentioned the "global scope" several times, but you may still be wondering why a program\'s outermost scope is all that important in modern JS. The vast majority of work is now done inside of functions and modules rather than globally. Is it good enough to just assert, "Avoid using the global scope," and be done with it?',
          az: '3-cü fəsildə «qlobal scope» bir neçə dəfə çəkildi, lakin yəqin hələ də düşünürsən ki, müasir JS-də proqramın ən xarici scope-u niyə bu qədər vacibdir. İşin böyük əksəriyyəti artıq qlobal səviyyədə yox, funksiya və modulların içində görülür. Sadəcə «qlobal scope-dan istifadə etmə» deyib keçmək kifayətdirmi?'
        },
        {
          en: 'The [[global-scope]] of a JS program is a rich topic, with much more utility and nuance than you would likely assume. This chapter first explores how the global scope is (still) useful and relevant to writing JS programs today, then looks at differences in where and how to access the global scope in different JS environments.',
          az: 'JS proqramının [[global-scope]]-u zəngin mövzudur — güman etdiyindən xeyli çox faydası və incəliyi var. Bu fəsil əvvəlcə qlobal scope-un bu gün JS proqramları yazmaq üçün (hələ də) necə faydalı və aktual olduğunu araşdırır, sonra müxtəlif JS mühitlərində qlobal scope-a harada və necə çatmağın fərqlərinə baxır.'
        }
      ]
    },
    {
      id: 'why-global',
      heading: 'Why Global Scope?',
      headingAz: 'Niyə qlobal scope?',
      blocks: [
        {
          en: 'Most applications are composed of multiple (sometimes many!) individual JS files. So how exactly do all those separate files get stitched together in a single runtime context by the JS engine? With respect to browser-executed applications, there are three main ways.',
          az: 'Əksər tətbiqlər bir neçə (bəzən çoxlu!) ayrı JS faylından ibarətdir. Bəs JS mühərriki bütün bu ayrı faylları vahid icra kontekstində necə birləşdirir? Brauzerdə icra olunan tətbiqlər üçün üç əsas yol var.'
        },
        {
          en: '**First**, if you\'re directly using ES modules (not transpiling them into some other module-bundle format), these files are loaded individually by the JS environment. Each module then `import`s references to whichever other modules it needs to access. The separate module files cooperate with each other exclusively through these shared imports, without needing any shared outer scope.',
          az: '**Birincisi**, ES modullarından birbaşa istifadə edirsənsə (onları başqa modul-bandl formatına çevirmədən), bu fayllar JS mühiti tərəfindən ayrı-ayrılıqda yüklənir. Hər modul ehtiyac duyduğu digər modullara istinadları `import` edir. Ayrı modul faylları bir-biri ilə yalnız bu ümumi importlar vasitəsilə əməkdaşlıq edir, heç bir ümumi xarici scope-a ehtiyac olmadan.'
        },
        {
          en: '**Second**, if you\'re using a [[bundler]] in your build process, all the files are typically concatenated together before delivery to the browser and JS engine, which then only processes one big file. In some build setups, the entire contents of the file are wrapped in a single enclosing scope, such as a wrapper function. Each piece can register itself for access from other pieces by way of local variables in that shared scope:',
          az: '**İkincisi**, build prosesində [[bundler]] istifadə edirsənsə, bütün fayllar adətən brauzerə və JS mühərrikinə çatdırılmazdan əvvəl birləşdirilir və mühərrik yalnız bir böyük faylı emal edir. Bəzi build quruluşlarında faylın bütün məzmunu tək əhatə edən scope-a, məsələn, sarğı funksiyasına bükülür. Hər hissə həmin ümumi scope-dakı lokal dəyişənlər vasitəsilə digər hissələr üçün özünü qeydiyyata ala bilər:'
        },
        {
          code: '(function wrappingOuterScope(){\n  var moduleOne = (function one(){\n    // ..\n  })();\n  var moduleTwo = (function two(){\n    // ..\n    function callModuleOne() {\n      moduleOne.someMethod();\n    }\n    // ..\n  })();\n})();'
        },
        {
          en: 'While the scope of `wrappingOuterScope()` is a function and not the full environment global scope, it does act as a sort of "application-wide scope," a bucket where all the top-level identifiers can be stored, though not in the real global scope.',
          az: '`wrappingOuterScope()`-un scope-u bütöv mühitin qlobal scope-u deyil, funksiya olsa da, bir növ «tətbiq miqyaslı scope» rolunu oynayır — bütün yuxarı səviyyəli identifikatorların saxlanıla biləcəyi vedrə, amma real qlobal scope-da yox.'
        },
        {
          en: '**And finally, the third way:** if there is no single surrounding scope encompassing all these pieces (for example, files loaded individually via `<script>` tags), the global scope is the only way for them to cooperate with each other. Each top-level variable declaration will end up as a global variable, since the global scope is the only shared resource between these separate files — they\'re independent programs, from the perspective of the JS engine.',
          az: '**Və nəhayət, üçüncü yol:** bütün bu hissələri əhatə edən vahid scope yoxdursa (məsələn, fayllar `<script>` teqləri ilə ayrı-ayrılıqda yüklənirsə), onların bir-biri ilə əməkdaşlığının yeganə yolu qlobal scope-dur. Hər yuxarı səviyyəli dəyişən bəyannaməsi qlobal dəyişənə çevrilir, çünki bu ayrı fayllar arasında yeganə ortaq resurs qlobal scope-dur — JS mühərriki baxımından onlar müstəqil proqramlardır.'
        },
        {
          en: 'The global scope is also where JS exposes its built-ins (`undefined`, `null`, `Infinity`, `NaN`; `Date()`, `Object()`, `String()`; `eval()`, `parseInt()`; `Math`, `JSON`; `Intl`, `WebAssembly`), and where the environment hosting the JS engine exposes its own built-ins (`console`; the DOM — `window`, `document`; timers — `setTimeout(..)`; web platform APIs — `navigator`, `history`, geolocation, WebRTC).',
          az: 'Qlobal scope həm də JS-in daxili imkanlarını açdığı yerdir (`undefined`, `null`, `Infinity`, `NaN`; `Date()`, `Object()`, `String()`; `eval()`, `parseInt()`; `Math`, `JSON`; `Intl`, `WebAssembly`), həm də JS mühərrikini yerləşdirən mühitin öz daxili imkanlarını açdığı yerdir (`console`; DOM — `window`, `document`; taymerlər — `setTimeout(..)`; veb platforma API-ləri — `navigator`, `history`, geolokasiya, WebRTC).'
        },
        {
          en: 'Most developers agree that the global scope shouldn\'t just be a dumping ground for every variable in your application. That\'s a mess of bugs just waiting to happen. But it\'s also undeniable that the global scope is an important glue for practically every JS application.',
          az: 'Developerlərin əksəriyyəti razıdır ki, qlobal scope tətbiqindəki hər dəyişən üçün zibillik olmamalıdır. Bu, baş verməyi gözləyən buglar yığınıdır. Lakin qlobal scope-un praktik olaraq hər JS tətbiqi üçün vacib «yapışqan» olduğu da danılmazdır.'
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
          en: 'It might seem obvious that the global scope is located in the outermost portion of a file; that is, not inside any function or other block. But it\'s not quite as simple as that. Different JS environments handle the scopes of your programs, especially the global scope, differently.',
          az: 'Qlobal scope-un faylın ən xarici hissəsində, yəni heç bir funksiya və ya blokun içində olmayan yerdə yerləşdiyi açıq görünə bilər. Lakin iş o qədər də sadə deyil. Müxtəlif JS mühitləri proqramlarının scope-larını, xüsusən qlobal scope-u fərqli emal edir.'
        },
        {
          en: 'With respect to treatment of the global scope, the most pure environment JS can be run in is as a standalone .js file loaded in a web page environment in a browser:',
          az: 'Qlobal scope-a münasibət baxımından JS-in işləyə biləcəyi ən «təmiz» mühit brauzerdə veb səhifəyə yüklənmiş müstəqil .js faylıdır:'
        },
        {
          code: 'var studentName = \'Kyle\';\n\nfunction hello() {\n  console.log(`Hello, ${ window.studentName }!`);\n}\n\nwindow.hello();\n// Hello, Kyle!'
        },
        {
          en: '## Globals Shadowing Globals',
          az: '## Qlobalları kölgələyən qloballar'
        },
        {
          en: 'An unusual consequence of the difference between a global variable and a global property of the same name is that, within just the global scope itself, a global object property can be shadowed by a global variable:',
          az: 'Qlobal dəyişənlə eyni adlı qlobal xassə arasındakı fərqin qeyri-adi nəticəsi budur ki, hətta qlobal scope-un özündə qlobal obyektin xassəsi qlobal dəyişən tərəfindən kölgələnə bilər:'
        },
        {
          code: 'window.something = 42;\nlet something = \'Kyle\';\n\nconsole.log(something);          // Kyle\nconsole.log(window.something);   // 42'
        },
        {
          en: 'It\'s almost certainly a bad idea to create a divergence between the global object and the global scope. A simple way to avoid this gotcha with global declarations: always use `var` for globals. Reserve `let` and `const` for block scopes.',
          az: 'Qlobal obyektlə qlobal scope arasında ayrılıq yaratmaq demək olar ki, həmişə pis fikirdir. Qlobal bəyannamələrdə bu tələdən qaçmağın sadə yolu: qlobal dəyişənlər üçün həmişə `var` istifadə et. `let` və `const`-u blok scope-lar üçün saxla.'
        },
        {
          en: '## DOM Globals',
          az: '## DOM qlobalları'
        },
        {
          en: 'One surprising behavior in the global scope you may encounter with browser-based JS applications: a DOM element with an `id` attribute automatically creates a global variable that references it.',
          az: 'Brauzer əsaslı JS tətbiqlərində rast gələ biləcəyin təəccüblü davranışlardan biri: `id` atributu olan DOM elementi avtomatik olaraq ona istinad edən qlobal dəyişən yaradır.'
        },
        {
          code: '<ul id="my-todo-list">\n  <li id="first">Write a book</li>\n</ul>\n\nfirst;\n// <li id="first">..</li>\nwindow[\'my-todo-list\'];\n// <ul id="my-todo-list">..</ul>'
        },
        {
          en: 'The auto-registration of all `id`-bearing DOM elements as global variables is an old legacy browser behavior that nevertheless must remain because so many old sites still rely on it. My advice is never to use these global variables, even though they will always be silently created.',
          az: '`id`-si olan bütün DOM elementlərinin avtomatik qlobal dəyişən kimi qeydiyyata alınması köhnə brauzer davranışıdır, lakin bir çox köhnə sayt hələ də ona güvəndiyi üçün qalmalıdır. Məsləhətim: bu qlobal dəyişənlər həmişə səssizcə yaradılsa da, onlardan heç vaxt istifadə etmə.'
        },
        {
          en: '## What\'s in a (Window) Name?',
          az: '## (Window) adında nə var?'
        },
        {
          code: 'var name = 42;\n\nconsole.log(name, typeof name);\n// "42" string'
        },
        {
          en: '`window.name` is a pre-defined "global" in a browser context. We used `var` for our declaration, which does not shadow the pre-defined `name` global property, so the `var` declaration is effectively ignored. And even though we assigned the number `42`, when we retrieve its value, it\'s a string `"42"`! The weirdness is because `name` is actually a pre-defined getter/setter on the `window` object, which insists on its value being a string value. Yikes!',
          az: '`window.name` brauzer kontekstində əvvəlcədən təyin olunmuş «qlobal»dır. Bəyannamə üçün `var` istifadə etdik, o isə əvvəlcədən təyin olunmuş `name` qlobal xassəsini kölgələmir, yəni `var` bəyannaməsi faktiki olaraq nəzərə alınmır. Üstəlik, `42` rəqəmini mənimsətsək də, dəyəri oxuyanda `"42"` sətri alırıq! Qəribəliyin səbəbi budur ki, `name` əslində `window` obyektində əvvəlcədən təyin olunmuş getter/setter-dir və dəyərin sətir olmasında israr edir. Vay!'
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
          en: '[[web-worker]] is a web platform extension on top of browser-JS behavior, which allows a JS file to run in a completely separate thread (operating system wise) from the thread that\'s running the main JS program. Web Worker code does not have access to the DOM, for example. Some web APIs are, however, made available to the worker, such as `navigator`.',
          az: '[[web-worker]] brauzer JS davranışı üzərində veb platforma genişlənməsidir; o, JS faylının əsas JS proqramını işlədən axından tamamilə ayrı (əməliyyat sistemi səviyyəsində) axında işləməsinə imkan verir. Məsələn, Web Worker kodunun DOM-a çıxışı yoxdur. Bununla belə, bəzi veb API-lər, məsələn `navigator`, worker üçün əlçatandır.'
        },
        {
          en: 'Since a Web Worker is treated as a wholly separate program, it does not share the global scope with the main JS program. Since there is no DOM access, the `window` alias for the global scope doesn\'t exist. In a Web Worker, the global object reference is typically made using `self`:',
          az: 'Web Worker tamamilə ayrı proqram sayıldığı üçün əsas JS proqramı ilə qlobal scope-u bölüşmür. DOM çıxışı olmadığından qlobal scope üçün `window` ləqəbi mövcud deyil. Web Worker-də qlobal obyektə istinad adətən `self` ilə edilir:'
        },
        {
          code: 'var studentName = \'Kyle\';\nlet studentID = 42;\n\nfunction hello() {\n  console.log(`Hello, ${ self.studentName }!`);\n}\n\nself.hello();\n// Hello, Kyle!\n\nself.studentID;\n// undefined'
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
          en: 'Developer Tools don\'t create a completely adherent JS environment. They do process JS code, but they also lean in favor of the UX interaction being most friendly to developers (aka, developer experience, or DX). Certain error conditions applicable to a JS program may be relaxed and not displayed when the code is entered into a developer tool.',
          az: 'Developer Tools tam uyğun JS mühiti yaratmır. Onlar JS kodunu emal edir, lakin developerlər üçün ən rahat qarşılıqlı əlaqəyə (developer experience, DX) üstünlük verir. JS proqramına aid bəzi səhv vəziyyətləri kod developer alətinə daxil ediləndə yumşaldıla və göstərilməyə bilər.'
        },
        {
          en: 'With respect to our discussions here about scope, such observable differences in behavior may include: the behavior of the global scope; hoisting (see Chapter 5); block-scoping declarators (`let` / `const`, see Chapter 6) when used in the outermost scope.',
          az: 'Scope haqqında müzakirələrimiz baxımından belə müşahidə olunan davranış fərqlərinə bunlar aid ola bilər: qlobal scope-un davranışı; hoisting (bax: 5-ci fəsil); ən xarici scope-da istifadə olunan blok-scope bəyannamələri (`let` / `const`, bax: 6-cı fəsil).'
        },
        {
          en: 'The take-away is that Developer Tools, while optimized to be convenient and useful for a variety of developer activities, are not suitable environments to determine or verify explicit and nuanced behaviors of an actual JS program context.',
          az: 'Nəticə budur: Developer Tools müxtəlif developer işləri üçün rahat və faydalı olmaq üçün optimallaşdırılsa da, real JS proqram kontekstinin dəqiq və incə davranışlarını müəyyən etmək və ya yoxlamaq üçün uyğun mühit deyil.'
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
          code: 'var studentName = \'Kyle\';\n\nfunction hello() {\n  console.log(`Hello, ${ studentName }!`);\n}\n\nhello();\n// Hello, Kyle!\n\nexport hello;'
        },
        {
          en: 'Despite being declared at the top level of the (module) file, in the outermost obvious scope, `studentName` and `hello` are not global variables. Instead, they are module-wide, or if you prefer, "module-global." However, in a module there\'s no implicit "module-wide scope object" for these top-level declarations to be added to as properties.',
          az: '(Modul) faylının yuxarı səviyyəsində, ən xarici görünən scope-da elan olunsalar da, `studentName` və `hello` qlobal dəyişən deyil. Onlar modul miqyaslıdır, istəsən, «modul-qlobal». Lakin modulda bu yuxarı səviyyəli bəyannamələrin xassə kimi əlavə olunacağı gizli «modul miqyaslı scope obyekti» yoxdur.'
        },
        {
          en: 'The module\'s top-level scope is descended from the global scope, almost as if the entire contents of the module were wrapped in a function. Thus, all variables that exist in the global scope (whether they\'re on the global object or not!) are available as lexical identifiers from inside the module\'s scope. ESM encourages a minimization of reliance on the global scope, where you `import` whatever modules you may need for the current module to operate.',
          az: 'Modulun yuxarı səviyyəli scope-u qlobal scope-dan törəyir — sanki modulun bütün məzmunu funksiyaya bükülüb. Buna görə qlobal scope-da mövcud olan bütün dəyişənlər (qlobal obyektdə olub-olmamasından asılı olmayaraq!) modulun scope-unun içindən leksik identifikator kimi əlçatandır. ESM qlobal scope-dan asılılığı minimuma endirməyi təşviq edir: cari modulun işləməsi üçün lazım olan modulları `import` edirsən.'
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
          en: 'One aspect of Node that often catches JS developers off-guard is that Node treats every single .js file that it loads, including the main one you start the Node process with, as a module (ES module or CommonJS module). The practical effect is that the top level of your Node programs is never actually the global scope, the way it is when loading a non-module file in the browser.',
          az: 'Node-un JS developerlərini tez-tez gözlənilmədən yaxalayan xüsusiyyətlərindən biri: Node yüklədiyi hər .js faylını, o cümlədən Node prosesini başlatdığın əsas faylı, modul (ES modulu və ya CommonJS modulu) kimi qəbul edir. Praktik nəticəsi budur ki, Node proqramlarının yuxarı səviyyəsi heç vaxt brauzerdə modul olmayan faylı yükləyərkən olduğu kimi qlobal scope olmur.'
        },
        {
          en: 'Node has from its beginning supported a module format referred to as [[commonjs]]. Before processing, Node effectively wraps such code in a function, so that the `var` and `function` declarations are contained in that wrapping function\'s scope, not treated as global variables:',
          az: 'Node başlanğıcdan [[commonjs]] adlanan modul formatını dəstəkləyir. Emaldan əvvəl Node belə kodu faktiki olaraq funksiyaya bükür ki, `var` və `function` bəyannamələri qlobal dəyişən sayılmasın, həmin sarğı funksiyasının scope-unda qalsın:'
        },
        {
          caption: 'Node CommonJS faylını belə görür (illüstrativ, real kod deyil)',
          code: 'function Module(module,require,__dirname,...) {\n  var studentName = \'Kyle\';\n  function hello() {\n    console.log(`Hello, ${ studentName }!`);\n  }\n  hello();\n  // Hello, Kyle!\n  module.exports.hello = hello;\n}'
        },
        {
          en: 'Node defines a number of "globals" like `require()`, but they\'re not actually identifiers in the global scope (nor properties of the global object). They\'re injected in the scope of every module, essentially a bit like the parameters listed in the `Module(..)` function declaration.',
          az: 'Node `require()` kimi bir sıra «qlobal»lar təyin edir, lakin onlar əslində qlobal scope-dakı identifikator (və ya qlobal obyektin xassəsi) deyil. Onlar hər modulun scope-una yeridilir — mahiyyətcə `Module(..)` funksiya bəyannaməsində sadalanan parametrlər kimi.'
        },
        {
          en: 'So how do you define actual global variables in Node? The only way to do so is to add properties to another of Node\'s automatically provided "globals," which is ironically called `global`. `global` is a reference to the real global scope object, somewhat like using `window` in a browser JS environment. Remember, the identifier `global` is not defined by JS; it\'s specifically defined by Node.',
          az: 'Bəs Node-da həqiqi qlobal dəyişən necə təyin edilir? Yeganə yol Node-un avtomatik verdiyi başqa bir «qlobal»a — ironik şəkildə `global` adlanana — xassə əlavə etməkdir. `global` real qlobal scope obyektinə istinaddır, brauzer JS mühitində `window` istifadəsinə bənzəyir. Unutma: `global` identifikatorunu JS yox, məhz Node təyin edir.'
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
          en: 'Reviewing the JS environments we\'ve looked at so far, a program may or may not: declare a global variable in the top-level scope with `var` or `function` declarations — or `let`, `const`, and `class`; also add global variables declarations as properties of the global scope object if `var` or `function` are used; refer to the global scope object with `window`, `self`, or `global`.',
          az: 'İndiyə qədər baxdığımız JS mühitlərini xülasə etsək, proqram bunları edə də bilər, etməyə də: yuxarı səviyyəli scope-da `var` və ya `function` bəyannamələri ilə — yaxud `let`, `const` və `class` ilə — qlobal dəyişən elan etmək; `var` və ya `function` istifadə olunubsa, qlobal dəyişən bəyannamələrini qlobal scope obyektinin xassələri kimi də əlavə etmək; qlobal scope obyektinə `window`, `self` və ya `global` ilə istinad etmək.'
        },
        {
          en: 'As of ES2020, JS has finally defined a standardized reference to the global scope object, called [[globalthis]]. So, subject to the recency of the JS engines your code runs in, you can use `globalThis` in place of any of those other approaches.',
          az: 'ES2020-dən etibarən JS nəhayət qlobal scope obyektinə standart istinad təyin etdi: [[globalthis]]. Beləliklə, kodunun işlədiyi JS mühərriklərinin kifayət qədər yeni olması şərtilə, digər bütün yanaşmaların yerinə `globalThis` istifadə edə bilərsən.'
        },
        {
          caption: 'globalThis-dən əvvəlki mühitlər üçün polifil',
          code: 'const theGlobalScopeObject =\n  (typeof globalThis != \'undefined\') ? globalThis :\n  (typeof global != \'undefined\') ? global :\n  (typeof window != \'undefined\') ? window :\n  (typeof self != \'undefined\') ? self :\n  (new Function(\'return this\'))();'
        },
        {
          en: 'The proposed name `globalThis` was fairly controversial while the feature was being added to JS. Specifically, I and many others felt the "this" reference in its name was misleading, since the reason you reference this object is to access to the global scope, never to access some sort of global/default `this` binding.',
          az: '`globalThis` adı bu imkan JS-ə əlavə olunarkən xeyli mübahisəli idi. Xüsusən mən və bir çoxları düşünürdük ki, adındakı «this» çaşdırıcıdır, çünki bu obyektə qlobal scope-a çatmaq üçün müraciət edirsən, heç vaxt hansısa qlobal/standart `this` bağlamasına çatmaq üçün yox.'
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
          en: 'Still, as our code proliferates more and more beyond the confines of the browser, it\'s especially important we have a solid grasp on the differences in how the global scope (and global scope object!) behave across different JS environments.',
          az: 'Yenə də kodumuz brauzerin hüdudlarından kənara getdikcə daha çox yayıldığı üçün qlobal scope-un (və qlobal scope obyektinin!) müxtəlif JS mühitlərində necə davrandığını möhkəm anlamaq xüsusilə vacibdir.'
        }
      ],
      note: 'Fəslin cədvəli — qlobal obyektə istinad:\n\n```text\nBrauzer (adi script) → window   (var/function → xassə olur)\nWeb Worker           → self\nNode                 → global   (fayl = modul, yuxarı səviyyə qlobal deyil)\nES modulu            → yuxarı səviyyə modul scope-dur, qlobal deyil\nHər yerdə            → globalThis\n```'
    }
  ]
};
