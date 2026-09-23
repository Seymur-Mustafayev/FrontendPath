import type { BookChapter } from '../books';

export const ch8: BookChapter = {
  id: 'ch8',
  no: 8,
  title: 'The Module Pattern',
  titleAz: 'Modul nümunəsi',
  sum: 'İnkapsulyasiya və POLE, modulu namespace və data strukturundan fərqləndirən nədir; klassik modul, modul fabriki, CommonJS və ES modulları.',
  sections: [
    {
      id: 'intro',
      heading: 'Chapter 8: The Module Pattern',
      headingAz: 'Fəsil 8: Modul nümunəsi',
      blocks: [
        {
          en: 'In this chapter, we wrap up the main text of the book by exploring one of the most important code organization patterns in all of programming: the module. As we\'ll see, modules are inherently built from what we\'ve already covered: the payoff for your efforts in learning lexical scope and closure.',
          az: 'Bu fəsildə kitabın əsas mətnini bütün proqramlaşdırmada ən vacib kod təşkili nümunələrindən birini — modulu araşdıraraq yekunlaşdırırıq. Görəcəyimiz kimi, modullar mahiyyətcə artıq keçdiyimiz mövzulardan qurulur: bu, leksik scope və closure-u öyrənməyə sərf etdiyin zəhmətin bəhrəsidir.'
        },
        {
          en: 'The central theme of this book has been that understanding and mastering scope and closure is key in properly structuring and organizing our code, especially the decisions on where to store information in variables. Our goal in this final chapter is to appreciate how modules embody the importance of these topics, elevating them from abstract concepts to concrete, practical improvements in building programs.',
          az: 'Bu kitabın mərkəzi mövzusu bu olub ki, scope və closure-u anlamaq və mənimsəmək kodumuzu düzgün strukturlaşdırıb təşkil etməyin, xüsusən məlumatı hansı dəyişənlərdə saxlamaq barədə qərarların açarıdır. Bu son fəsildəki məqsədimiz modulların bu mövzuların əhəmiyyətini necə təcəssüm etdirdiyini, onları abstrakt anlayışlardan proqram qurmaqda konkret, praktik təkmilləşdirmələrə necə yüksəltdiyini dəyərləndirməkdir.'
        }
      ]
    },
    {
      id: 'encapsulation',
      heading: 'Encapsulation and Least Exposure (POLE)',
      headingAz: 'İnkapsulyasiya və ən az açıqlıq (POLE)',
      blocks: [
        {
          en: '[[encapsulation]] is often cited as a principle of object-oriented (OO) programming, but it\'s more fundamental and broadly applicable than that. The goal of encapsulation is the bundling or co-location of information (data) and behavior (functions) that together serve a common purpose.',
          az: '[[encapsulation]] tez-tez obyekt yönümlü (OO) proqramlaşdırmanın prinsipi kimi göstərilir, lakin o, bundan daha fundamental və geniş tətbiq olunandır. İnkapsulyasiyanın məqsədi birlikdə ümumi məqsədə xidmət edən məlumatın (data) və davranışın (funksiyaların) bir yerə yığılması, bir yerdə yerləşdirilməsidir.'
        },
        {
          en: 'The recent trend in modern front-end programming to organize applications around Component architecture pushes encapsulation even further. For many, it feels natural to consolidate everything that constitutes the search results list — even beyond code, including presentational markup and styling — into a single unit of program logic, something tangible we can interact with. And then we label that collection the "SearchList" component.',
          az: 'Müasir frontend proqramlaşdırmada tətbiqləri komponent arxitekturası ətrafında təşkil etmək tendensiyası inkapsulyasiyanı daha da irəli aparır. Çoxları üçün axtarış nəticələri siyahısını təşkil edən hər şeyi — koddan kənara çıxaraq, təqdimat markup-ı və stillər də daxil olmaqla — tək proqram məntiqi vahidində, qarşılıqlı əlaqə qura biləcəyimiz konkret bir şeydə birləşdirmək təbii görünür. Sonra bu toplunu «SearchList» komponenti adlandırırıq.'
        },
        {
          en: 'Another key goal is the control of visibility of certain aspects of the encapsulated data and functionality. Recall from Chapter 6 the least exposure principle ([[pole]]). The idea is to group alike program bits together, and selectively limit programmatic access to the parts we consider private details. What\'s not considered private is then marked as public, accessible to the whole program.',
          az: 'Digər əsas məqsəd inkapsulyasiya olunmuş data və funksionallığın müəyyən tərəflərinin görünməsinə nəzarətdir. 6-cı fəsildəki ən az açıqlıq prinsipini ([[pole]]) xatırla. İdeya budur ki, oxşar proqram hissələrini bir yerə yığaq və gizli detal saydığımız hissələrə proqram çıxışını seçici şəkildə məhdudlaşdıraq. Gizli sayılmayanlar isə açıq kimi işarələnir və bütün proqram üçün əlçatan olur.'
        }
      ],
      note: 'React komponenti modul ideyasının müasir formasıdır:\n\n```text\nGizli (private):  daxili state, köməkçi funksiyalar, stillər\nAçıq (public):    props (giriş) və render nəticəsi (çıxış)\n```\n\nYaxşı komponentin «public API»-si kiçikdir: az props, aydın məqsəd. Komponent 20 props qəbul edirsə, bu, POLE-un pozulduğunun siqnalıdır.',
      terms: ['component', 'props']
    },
    {
      id: 'what-is-module',
      heading: 'What Is a Module?',
      headingAz: 'Modul nədir?',
      blocks: [
        {
          en: 'A module is a collection of related data and functions (often referred to as methods in this context), characterized by a division between hidden private details and public accessible details, usually called the "public API." A module is also stateful: it maintains some information over time, along with functionality to access and update that information.',
          az: 'Modul əlaqəli data və funksiyalar (bu kontekstdə çox vaxt metodlar adlanır) toplusudur; onu gizli detallarla açıq, əlçatan detallar arasındakı bölgü xarakterizə edir — sonuncular adətən «public API» adlanır. Modul həm də vəziyyətlidir (stateful): zaman ərzində müəyyən məlumatı, eləcə də həmin məlumata çatmaq və onu yeniləmək üçün funksionallığı saxlayır.'
        },
        {
          en: '## Namespaces (Stateless Grouping)',
          az: '## Namespace-lər (vəziyyətsiz qruplaşdırma)'
        },
        {
          en: 'If you group a set of related functions together, without data, then you don\'t really have the expected encapsulation a module implies. The better term for this grouping of stateless functions is a [[namespace-object]]:',
          az: 'Bir qrup əlaqəli funksiyanı data olmadan bir yerə yığsan, modulun nəzərdə tutduğu inkapsulyasiya əslində olmur. Vəziyyətsiz funksiyaların bu cür qruplaşdırılması üçün daha uyğun termin [[namespace-object]]-dir:'
        },
        {
          code: '// namespace, not module\nvar Utils = {\n  cancelEvt(evt) {\n    evt.preventDefault();\n    evt.stopPropagation();\n    evt.stopImmediatePropagation();\n  },\n  wait(ms) {\n    return new Promise(function c(res){\n      setTimeout(res,ms);\n    });\n  },\n  isValidEmail(email) {\n    return /[^@]+@[^@.]+\\.[^@.]+/.test(email);\n  }\n};'
        },
        {
          en: '## Data Structures (Stateful Grouping)',
          az: '## Data strukturları (vəziyyətli qruplaşdırma)'
        },
        {
          en: 'Even if you bundle data and stateful functions together, if you\'re not limiting the visibility of any of it, then you\'re stopping short of the POLE aspect of encapsulation; it\'s not particularly helpful to label that a module.',
          az: 'Data və vəziyyətli funksiyaları bir yerə yığsan belə, onların heç birinin görünməsini məhdudlaşdırmırsansa, inkapsulyasiyanın POLE tərəfinə çatmamış olursan; bunu modul adlandırmaq xüsusi fayda vermir.'
        },
        {
          code: '// data structure, not module\nvar Student = {\n  records: [\n    { id: 14, name: \'Kyle\', grade: 86 },\n    { id: 73, name: \'Suzy\', grade: 87 },\n    { id: 112, name: \'Frank\', grade: 75 },\n    { id: 6, name: \'Sarah\', grade: 91 }\n  ],\n  getName(studentID) {\n    var student = this.records.find(\n      student => student.id == studentID\n    );\n    return student.name;\n  }\n};\nStudent.getName(73);\n// Suzy'
        },
        {
          en: 'Since `records` is publicly accessible data, not hidden behind a public API, `Student` here isn\'t really a module. `Student` does have the data-and-functionality aspect of encapsulation, but not the visibility-control aspect. It\'s best to label this an instance of a data structure.',
          az: '`records` public API-nin arxasında gizlədilməyən, açıq əlçatan data olduğu üçün buradakı `Student` əslində modul deyil. `Student`-də inkapsulyasiyanın «data və funksionallıq» tərəfi var, lakin «görünməyə nəzarət» tərəfi yoxdur. Bunu data strukturunun nüsxəsi adlandırmaq daha düzgündür.'
        }
      ],
      note: 'Üç anlayışı cədvəllə ayır:\n\n```text\n                 qruplaşdırma  state  gizlilik\nNamespace        ✓             ✗      ✗   (utils.ts)\nData strukturu   ✓             ✓      ✗   (adi obyekt)\nModul            ✓             ✓      ✓   (closure ilə gizli state)\n```\n\nLayihəndəki `utils/format.ts` faylı çox vaxt modul yox, namespace-dir — bunda pis heç nə yoxdur, sadəcə adını düzgün qoy.'
    },
    {
      id: 'classic-module',
      heading: 'Modules (Stateful Access Control)',
      headingAz: 'Modullar (vəziyyətli çıxış nəzarəti)',
      blocks: [
        {
          en: 'To embody the full spirit of the module pattern, we not only need grouping and state, but also access control through visibility (private vs. public). Let\'s turn `Student` from the previous section into a module. We\'ll start with a form I call the "classic module," which was originally referred to as the "revealing module" when it first emerged in the early 2000s:',
          az: 'Modul nümunəsinin ruhunu tam təcəssüm etdirmək üçün bizə təkcə qruplaşdırma və state yox, həm də görünmə (gizli və açıq) vasitəsilə çıxışa nəzarət lazımdır. Əvvəlki bölmədəki `Student`-i modula çevirək. «Klassik modul» adlandırdığım formadan başlayacağıq; o, 2000-ci illərin əvvəlində ilk dəfə yarananda «revealing module» (açan modul) adlanırdı:'
        },
        {
          code: 'var Student = (function defineStudent(){\n  var records = [\n    { id: 14, name: \'Kyle\', grade: 86 },\n    { id: 73, name: \'Suzy\', grade: 87 },\n    { id: 112, name: \'Frank\', grade: 75 },\n    { id: 6, name: \'Sarah\', grade: 91 }\n  ];\n\n  var publicAPI = {\n    getName\n  };\n\n  return publicAPI;\n\n  // ************************\n\n  function getName(studentID) {\n    var student = records.find(\n      student => student.id == studentID\n    );\n    return student.name;\n  }\n})();\n\nStudent.getName(73);   // Suzy'
        },
        {
          en: '`Student` is now an instance of a module. It features a public API with a single method: `getName(..)`. This method is able to access the private hidden `records` data. The instance of the module is created by the `defineStudent()` IIFE being executed. This IIFE returns an object (named `publicAPI`) that has a property on it referencing the inner `getName(..)` function. From the outside, `Student.getName(..)` invokes this exposed inner function, which maintains access to the inner `records` variable via closure.',
          az: '`Student` indi modulun nüsxəsidir. Onun tək metodlu public API-si var: `getName(..)`. Bu metod gizli `records` datasına çıxış əldə edə bilir. Modul nüsxəsi `defineStudent()` IIFE-si icra olunanda yaradılır. Bu IIFE daxili `getName(..)` funksiyasına istinad edən xassəsi olan obyekt (`publicAPI` adlı) qaytarır. Çöldən `Student.getName(..)` bu açılmış daxili funksiyanı çağırır, o isə closure vasitəsilə daxili `records` dəyişəninə çıxışı saxlayır.'
        },
        {
          en: 'By virtue of how lexical scope works, defining variables and functions inside your outer module definition function makes everything by default private. Only properties added to the public API object returned from the function will be exported for external public use. The use of an IIFE implies that our program only ever needs a single central instance of the module, commonly referred to as a [[singleton]].',
          az: 'Leksik scope-un iş prinsipi sayəsində dəyişən və funksiyaları xarici modul tərifi funksiyasının içində təyin etmək hər şeyi standart olaraq gizli edir. Yalnız funksiyadan qaytarılan public API obyektinə əlavə olunan xassələr xarici açıq istifadə üçün export olunur. IIFE-dən istifadə proqramımızın moduldan yalnız tək mərkəzi nüsxəyə ehtiyacı olduğunu göstərir; buna adətən [[singleton]] deyilir.'
        }
      ],
      note: 'Bu nümunə [[closure]]-un praktik zirvəsidir: `records` heç bir yolla çöldən dəyişdirilə bilməz — yalnız modulun özünün icazə verdiyi metodlarla.\n\nBu gün eyni ideyanı `class`-ın `#private` sahələri ilə də yazmaq olar, amma closure əsaslı modul hələ də Zustand store-ları, custom hook-lar və SDK-larda geniş istifadə olunur.',
      terms: ['iife', 'module-pattern', 'zustand']
    },
    {
      id: 'module-factory',
      heading: 'Module Factory (Multiple Instances)',
      headingAz: 'Modul fabriki (bir neçə nüsxə)',
      blocks: [
        {
          en: 'If we did want to define a module that supported multiple instances in our program, we can slightly tweak the code:',
          az: 'Proqramımızda bir neçə nüsxəni dəstəkləyən modul təyin etmək istəsək, kodu bir qədər dəyişə bilərik:'
        },
        {
          code: '// factory function, not singleton IIFE\nfunction defineStudent() {\n  var records = [\n    { id: 14, name: \'Kyle\', grade: 86 },\n    { id: 73, name: \'Suzy\', grade: 87 },\n    { id: 112, name: \'Frank\', grade: 75 },\n    { id: 6, name: \'Sarah\', grade: 91 }\n  ];\n\n  var publicAPI = {\n    getName\n  };\n\n  return publicAPI;\n\n  // ************************\n\n  function getName(studentID) {\n    var student = records.find(\n      student => student.id == studentID\n    );\n    return student.name;\n  }\n}\n\nvar fullTime = defineStudent();\nfullTime.getName(73);   // Suzy'
        },
        {
          en: 'Rather than specifying `defineStudent()` as an IIFE, we just define it as a normal standalone function, which is commonly referred to in this context as a [[module-factory]] function. We then call the module factory, producing an instance of the module that we label `fullTime`. This module instance implies a new instance of the inner scope, and thus a new closure that `getName(..)` holds over `records`.',
          az: '`defineStudent()`-i IIFE kimi yazmaq əvəzinə, onu adi müstəqil funksiya kimi təyin edirik; bu kontekstdə buna adətən [[module-factory]] funksiyası deyilir. Sonra modul fabrikini çağırırıq və `fullTime` adlandırdığımız modul nüsxəsini alırıq. Bu modul nüsxəsi daxili scope-un yeni nüsxəsi, deməli, `getName(..)`-in `records` üzərində saxladığı yeni closure deməkdir.'
        },
        {
          en: '## Classic Module Definition',
          az: '## Klassik modulun tərifi'
        },
        {
          en: 'So to clarify what makes something a classic module:\n\n1. There must be an outer scope, typically from a module factory function running at least once.\n2. The module\'s inner scope must have at least one piece of hidden information that represents state for the module.\n3. The module must return on its public API a reference to at least one function that has closure over the hidden module state (so that this state is actually preserved).',
          az: 'Nəyin klassik modul olduğunu dəqiqləşdirək:\n\n1. Xarici scope olmalıdır — adətən ən azı bir dəfə işləyən modul fabriki funksiyasından.\n2. Modulun daxili scope-unda modulun vəziyyətini təmsil edən ən azı bir gizli məlumat olmalıdır.\n3. Modul public API-sində gizli modul vəziyyəti üzərində closure-u olan ən azı bir funksiyaya istinad qaytarmalıdır (ki, bu vəziyyət həqiqətən qorunsun).'
        }
      ],
      note: 'Modul fabriki — hər çağırışda **yeni, müstəqil** state yaradır. Bu, custom hook-un işləmə prinsipidir:\n\n```js\nfunction useCounter(initial = 0) {\n  const [count, setCount] = useState(initial);\n  return { count, inc: () => setCount((c) => c + 1) };\n}\n// hər komponent öz sayğacını alır\nconst a = useCounter();\nconst b = useCounter(10);\n```\n\nSingleton isə bütün tətbiq üçün bir nüsxədir — məsələn, API client və ya global store.',
      terms: ['custom-hook', 'store']
    },
    {
      id: 'commonjs',
      heading: 'Node CommonJS Modules',
      headingAz: 'Node CommonJS modulları',
      blocks: [
        {
          en: 'Unlike the classic module format, where you could bundle the module factory or IIFE alongside any other code including other modules, [[commonjs]] modules are file-based; one module per file:',
          az: 'Modul fabrikini və ya IIFE-ni digər modullar da daxil olmaqla istənilən başqa kodla bir yerə yığa biləcəyin klassik modul formatından fərqli olaraq, [[commonjs]] modulları fayl əsaslıdır; hər faylda bir modul:'
        },
        {
          code: 'module.exports.getName = getName;\n\n// ************************\n\nvar records = [\n  { id: 14, name: \'Kyle\', grade: 86 },\n  { id: 73, name: \'Suzy\', grade: 87 },\n  { id: 112, name: \'Frank\', grade: 75 },\n  { id: 6, name: \'Sarah\', grade: 91 }\n];\n\nfunction getName(studentID) {\n  var student = records.find(\n    student => student.id == studentID\n  );\n  return student.name;\n}'
        },
        {
          en: 'The `records` and `getName` identifiers are in the top-level scope of this module, but that\'s not the global scope. As such, everything here is by default private to the module. To expose something on the public API of a CommonJS module, you add a property to the empty object provided as `module.exports`.',
          az: '`records` və `getName` identifikatorları bu modulun yuxarı səviyyəli scope-undadır, lakin bu, qlobal scope deyil. Buna görə burada hər şey standart olaraq modula məxsus və gizlidir. CommonJS modulunun public API-sində nəyisə açmaq üçün `module.exports` kimi verilən boş obyektə xassə əlavə edirsən.'
        },
        {
          en: 'CommonJS modules behave as singleton instances, similar to the IIFE module definition style presented before. No matter how many times you `require(..)` the same module, you just get additional references to the single shared module instance.',
          az: 'CommonJS modulları əvvəl göstərilən IIFE modul tərifi üslubu kimi singleton nüsxələr kimi davranır. Eyni modulu neçə dəfə `require(..)` etsən də, sadəcə tək ortaq modul nüsxəsinə əlavə istinadlar alırsan.'
        },
        {
          code: 'var Student = require(\'/path/to/student.js\');\nStudent.getName(73);\n// Suzy\n\nvar { getName } = require(\'/path/to/student.js\');'
        }
      ],
      note: 'CommonJS-i hələ də görəcəksən: köhnə Node paketləri, `.cjs` faylları, bəzi konfiqlər (`module.exports = {...}`).\n\nFrontend üçün vacib fərq: `require` icra zamanı işləyir və dinamikdir, ona görə bandler istifadə olunmayan hissələri ata bilmir. ESM isə statikdir və [[tree-shaking]]-ə imkan verir — kitabxana seçəndə «ESM build-i varmı?» sualını ver.',
      terms: ['singleton', 'bundler']
    },
    {
      id: 'esm',
      heading: 'Modern ES Modules (ESM)',
      headingAz: 'Müasir ES modulları (ESM)',
      blocks: [
        {
          en: 'The [[esm]] format shares several similarities with the CommonJS format. ESM is file-based, and module instances are singletons, with everything private by default. One notable difference is that ESM files are assumed to be strict-mode, without needing a `"use strict"` pragma at the top. There\'s no way to define an ESM as non-strict-mode.',
          az: '[[esm]] formatının CommonJS formatı ilə bir sıra oxşarlıqları var. ESM fayl əsaslıdır, modul nüsxələri singleton-dur və hər şey standart olaraq gizlidir. Nəzərəçarpan fərqlərdən biri: ESM faylları yuxarıda `"use strict"` pragması olmadan sərt rejimdə sayılır. ESM-i qeyri-sərt rejimdə təyin etməyin yolu yoxdur.'
        },
        {
          code: 'export { getName };\n\n// ************************\n\nvar records = [\n  { id: 14, name: \'Kyle\', grade: 86 },\n  { id: 73, name: \'Suzy\', grade: 87 },\n  { id: 112, name: \'Frank\', grade: 75 },\n  { id: 6, name: \'Sarah\', grade: 91 }\n];\n\nfunction getName(studentID) {\n  var student = records.find(\n    student => student.id == studentID\n  );\n  return student.name;\n}'
        },
        {
          en: '`export` statements can appear anywhere throughout the file, though `export` must be at the top-level scope; it cannot be inside any other block or function. `export default function getName(..)` is a so-called "default export," which has different semantics from other exports. In essence, a "default export" is a shorthand for consumers of the module when they `import`. Non-`default` exports are referred to as "named exports."',
          az: '`export` ifadələri faylın istənilən yerində ola bilər, lakin `export` yuxarı səviyyəli scope-da olmalıdır; heç bir başqa blokun və ya funksiyanın içində ola bilməz. `export default function getName(..)` «default export» adlanır və digər export-lardan fərqli semantikaya malikdir. Mahiyyətcə «default export» modulu `import` edənlər üçün qısaltmadır. `default` olmayan export-lar «named export» adlanır.'
        },
        {
          caption: '`import`-un variantları: adlı, adı dəyişdirilmiş, default və namespace import',
          code: 'import { getName } from \'/path/to/students.js\';\ngetName(73);   // Suzy\n\nimport { getName as getStudentName }\n  from \'/path/to/students.js\';\n\nimport getName from \'/path/to/students.js\';   // default export\n\nimport * as Student from \'/path/to/students.js\';\nStudent.getName(73);   // Suzy'
        },
        {
          en: 'The `import` keyword — like `export`, it must be used only at the top level of an ESM outside of any blocks or functions. The `*` imports everything exported to the API, default and named, and stores it all under the single namespace identifier as specified. This approach most closely matches the form of classic modules for most of JS\'s history.',
          az: '`import` açar sözü — `export` kimi — yalnız ESM-in yuxarı səviyyəsində, heç bir blok və ya funksiyanın içində olmadan istifadə olunmalıdır. `*` API-yə export olunan hər şeyi — default və adlı — import edir və hamısını göstərilən tək namespace identifikatoru altında saxlayır. Bu yanaşma JS tarixinin böyük hissəsindəki klassik modulların formasına ən çox uyğun gəlir.'
        }
      ],
      note: 'Sənin layihəndəki hər `.ts`/`.tsx` faylı ESM-dir. Praktik qaydalar:\n\n- **Named export-ları üstün tut** — IDE avtomatik import edir, adı dəyişdirmək (rename) etibarlı işləyir, tree-shaking daha yaxşı olur.\n- `export default` React-də adətən səhifə/route komponentləri üçün istifadə olunur (`React.lazy` default export gözləyir).\n- `import * as X` — `X.foo` formasında oxunaqlıdır, amma bandlerə «hamısı lazımdır» siqnalı verə bilər.\n\nDinamik import (`import(\'./Page\')`) isə [[code-splitting]]-in əsasıdır.',
      terms: ['named-export', 'tree-shaking', 'js-strict-mode']
    },
    {
      id: 'exit-scope',
      heading: 'Exit Scope',
      headingAz: 'Scope-dan çıxış',
      blocks: [
        {
          en: 'Whether you use the classic module format (browser or Node), CommonJS format (in Node), or ESM format (browser or Node), modules are one of the most effective ways to structure and organize your program\'s functionality and data.',
          az: 'İstər klassik modul formatından (brauzer və ya Node), istər CommonJS formatından (Node-da), istərsə də ESM formatından (brauzer və ya Node) istifadə et, modullar proqramının funksionallığını və datasını strukturlaşdırıb təşkil etməyin ən effektiv yollarından biridir.'
        },
        {
          en: 'The module pattern is the conclusion of our journey in this book of learning how we can use the rules of lexical scope to place variables and functions in proper locations. POLE is the defensive private by default posture we always take, making sure we avoid over-exposure and interact only with the minimal public API surface area necessary. And underneath modules, the magic of how all our module state is maintained is closures leveraging the lexical scope system.',
          az: 'Modul nümunəsi bu kitabdakı səyahətimizin — leksik scope qaydalarından dəyişən və funksiyaları düzgün yerlərə yerləşdirmək üçün necə istifadə edə biləcəyimizi öyrənməyimizin — yekunudur. POLE həmişə tutduğumuz müdafiə mövqeyidir — «standart olaraq gizli»: həddən artıq açıqlıqdan qaçırıq və yalnız zəruri minimal public API səthi ilə qarşılıqlı əlaqə qururuq. Modulların altında isə bütün modul vəziyyətimizin necə qorunmasının sehri leksik scope sistemindən istifadə edən closure-lardır.'
        }
      ],
      note: 'Kitabın bütün xətti bir zəncirdir:\n\n```text\nKompilyasiya → leksik scope → scope zənciri → hoisting/TDZ\n→ POLE (ən az açıqlıq) → closure → modul\n```\n\nHər halqa əvvəlkinin üzərində qurulur. İndi React-də `useState`, `useEffect`, custom hook, ESM import-larını gördükdə arxasında dayanan mexanizmi — leksik scope və closure-u — tanıyacaqsan. Növbəti addım: yol xəritəsindəki «Scope, hoisting, closure və TDZ» mövzusunu bu biliklə yenidən oxu.',
      terms: ['closure', 'pole']
    }
  ]
};
