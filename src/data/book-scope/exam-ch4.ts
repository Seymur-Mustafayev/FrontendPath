import type { ExamQuestion } from '../books';

export const exam4: ExamQuestion[] = [
  {
    q: 'Brauzerdə ayrı JS faylları hansı üç yolla bir-biri ilə əməkdaşlıq edə bilər?',
    options: [
      'Yalnız qlobal scope vasitəsilə',
      'ES modul importları; bandlerin ümumi sarğı scope-u; heç biri yoxdursa — qlobal scope',
      'Yalnız `localStorage` vasitəsilə',
      '`postMessage`, `fetch` və cookie-lər'
    ],
    answer: 1,
    why: 'ESM faylları yalnız `import` ilə əlaqələnir. Bandler bəzən hər şeyi bir sarğı funksiyasına bükür («tətbiq miqyaslı scope»). Heç biri yoxdursa, yeganə ortaq resurs qlobal scope olur.'
  },
  {
    q: 'Bu kodda `moduleOne` və `moduleTwo` hansı scope-dadır?',
    code: '(function wrappingOuterScope(){\n  var moduleOne = (function one(){ /* .. */ })();\n  var moduleTwo = (function two(){ /* .. */ })();\n})();',
    options: [
      'Qlobal scope-da',
      '`wrappingOuterScope` funksiyasının scope-unda — «tətbiq miqyaslı scope» rolunu oynayır',
      'Hər biri öz IIFE-sinin içində',
      'Modul scope-unda'
    ],
    answer: 1,
    why: 'Sarğı funksiyasının lokal dəyişənləri modulların bir-birinə çatması üçün ortaq vedrədir. Bu, qlobal scope-un bir növ əvəzedicisidir, amma real qlobal scope deyil.'
  },
  {
    q: 'Aşağıdakılardan hansı JS-in özünün yox, onu yerləşdirən mühitin (brauzerin) qlobal imkanıdır?',
    options: ['`JSON`', '`parseInt()`', '`document`', '`Infinity`'],
    answer: 2,
    why: '`undefined`, `NaN`, `Math`, `JSON`, `parseInt()` və s. JS-in öz daxili imkanlarıdır. `console`, DOM (`window`, `document`), taymerlər və veb API-lər isə mühitin təqdim etdiyi qloballardır.'
  },
  {
    q: 'Node-da `require()` və `__dirname` haqqında hansı doğrudur?',
    options: [
      'Qlobal scope-dakı identifikatorlardır',
      'Qlobal obyektin xassələridir',
      'Qlobal kimi görünür, amma əslində hər modulun scope-una yeridilir',
      'Yalnız ES modullarında mövcuddur'
    ],
    answer: 2,
    why: 'Node onları hər modul üçün `Module(..)` sarğı funksiyasının parametrlərinə bənzər şəkildə verir. Texniki olaraq qlobal scope-da deyillər.'
  },
  {
    q: 'Bu kod nə çap edir?',
    code: "window.something = 42;\nlet something = 'Kyle';\n\nconsole.log(something);\nconsole.log(window.something);",
    options: [
      "`'Kyle'`, sonra `'Kyle'`",
      "`42`, sonra `42`",
      "`'Kyle'`, sonra `42`",
      '`SyntaxError`'
    ],
    answer: 2,
    why: '`let` qlobal dəyişən yaradır, amma qlobal obyektdə xassə yaratmır. Nəticədə qlobal scope-un özündə leksik `something` qlobal obyektin `something` xassəsini kölgələyir.'
  },
  {
    q: 'Qlobal obyektlə qlobal scope arasında belə ayrılıqdan qaçmaq üçün müəllif nə tövsiyə edir?',
    options: [
      'Qlobal dəyişənlər üçün həmişə `let` istifadə et',
      'Qlobal dəyişənlər üçün `var` istifadə et, `let`/`const`-u blok scope-lar üçün saxla',
      'Qlobal dəyişənləri yalnız `window.x = ..` ilə yarat',
      'Qlobal dəyişənləri `const` ilə dondur'
    ],
    answer: 1,
    why: 'Müəllifin sadə qaydası: qloballar üçün `var`, bloklar üçün `let`/`const`. `window` xassəsi kimi qlobal yaratmaq isə oxuyanı çaşdırır.'
  },
  {
    q: 'HTML-də `<li id="first">` olan səhifədə JS-də `first` identifikatoru nədir?',
    options: [
      '`ReferenceError`, çünki elan olunmayıb',
      'Həmin DOM elementinə avtomatik yaradılmış qlobal dəyişən',
      '`undefined`',
      'Yalnız `document.first` kimi əlçatandır'
    ],
    answer: 1,
    why: '`id`-si olan DOM elementləri köhnə brauzer davranışına görə avtomatik qlobal dəyişən yaradır. `id` etibarlı ad deyilsə (`my-todo-list`), yalnız `window["my-todo-list"]` ilə çatmaq olar. Müəllif bunlardan istifadə etməməyi tövsiyə edir.'
  },
  {
    q: 'Brauzerdə adi skriptdə bu kod nə çap edir?',
    code: 'var name = 42;\nconsole.log(name, typeof name);',
    options: ['`42 "number"`', '`"42" "string"`', '`undefined "undefined"`', '`TypeError`'],
    answer: 1,
    why: '`window.name` əvvəlcədən təyin olunmuş getter/setter-dir və dəyəri həmişə sətrə çevirir. `var name` onu kölgələmir, sadəcə nəzərə alınmır — ona görə `42` sətir `"42"` olur.'
  },
  {
    q: 'Web Worker-də qlobal obyektə adətən necə müraciət olunur?',
    options: ['`window`', '`global`', '`self`', '`document`'],
    answer: 2,
    why: 'Worker-in DOM-u yoxdur, ona görə `window` ləqəbi də yoxdur. Qlobal obyekt `self`-dir və burada da yalnız `var`/`function` bəyannamələri onun xassəsinə çevrilir.'
  },
  {
    q: 'Scope və hoisting davranışını dəqiq yoxlamaq üçün DevTools konsolu niyə etibarlı deyil?',
    options: [
      'Konsol JS-i ümumiyyətlə kompilyasiya etmir',
      'Konsol developer rahatlığına üstünlük verir və qlobal scope-u yalnız təqlid edir, davranış spesifikasiyadan fərqlənə bilər',
      'Konsol yalnız sərt rejimdə işləyir',
      'Konsol `let` və `const`-u dəstəkləmir'
    ],
    answer: 1,
    why: 'Konsol DX-ə görə bəzi səhvləri yumşaldır; qlobal scope, hoisting və yuxarı səviyyədəki `let`/`const` davranışı real proqramdan fərqli ola bilər.'
  },
  {
    q: 'ES modulunun yuxarı səviyyəsində elan olunmuş `var studentName` nədir?',
    options: [
      'Qlobal dəyişən və `window` xassəsi',
      'Qlobal dəyişən, amma `window` xassəsi deyil',
      'Modul miqyaslı («modul-qlobal») dəyişən — qlobal deyil',
      'Səhvdir, modullarda `var` qadağandır'
    ],
    answer: 2,
    why: 'Modulun yuxarı səviyyəli scope-u qlobal scope-dan törəyir, amma orada elan olunan dəyişənlər qlobal olmur və heç bir obyektə xassə kimi əlavə olunmur.'
  },
  {
    q: 'ES modulunun içindən qlobal dəyişənlərə (məsələn, `setTimeout`) çatmaq olarmı?',
    options: [
      'Xeyr, modullar qlobal scope-dan tamamilə təcriddədir',
      'Bəli — modul scope-u qlobal scope-un içindədir, qlobal dəyişənlər leksik identifikator kimi əlçatandır',
      'Yalnız `import` etdikdən sonra',
      'Yalnız `window.` prefiksi ilə'
    ],
    answer: 1,
    why: 'Modul sanki funksiyaya bükülüb: onun scope-u qlobal scope-dan törəyir. Buna görə bütün qlobal dəyişənlər (qlobal obyektdə olub-olmamasından asılı olmayaraq) modulun içindən görünür.'
  },
  {
    q: 'Node-da CommonJS faylının yuxarı səviyyəsindəki `var` niyə qlobal dəyişən olmur?',
    options: [
      'Node `var`-ı avtomatik `let`-ə çevirir',
      'Node hər faylı icradan əvvəl funksiyaya bükür, dəyişənlər həmin funksiyanın scope-unda qalır',
      'Node-da qlobal scope yoxdur',
      'Node yalnız sərt rejimdə işləyir'
    ],
    answer: 1,
    why: 'Node kodu `function Module(module, require, __dirname, ...) { ... }` kimi bir sarğıya salıb çağırır. Ona görə yuxarı səviyyəli bəyannamələr modul scope-unda qalır.'
  },
  {
    q: 'Node-da həqiqi qlobal dəyişən necə yaradılır?',
    options: [
      'Faylın yuxarısında `var` ilə',
      '`window.x = ..` ilə',
      '`global.x = ..` ilə — Node-un verdiyi `global` obyektinə xassə əlavə etməklə',
      '`export` ilə'
    ],
    answer: 2,
    why: 'Yeganə yol `global` obyektinə xassə əlavə etməkdir. `global` identifikatorunu JS yox, Node təyin edir.'
  },
  {
    q: 'ES2020-dən bəri qlobal obyektə bütün mühitlərdə işləyən standart istinad hansıdır?',
    options: ['`window`', '`self`', '`global`', '`globalThis`'],
    answer: 3,
    why: '`globalThis` brauzerdə, worker-də və Node-da eyni qlobal obyektə işarə edir. Müəllif adındakı «this»-i çaşdırıcı sayır və öz kodunda `theGlobalScopeObject` kimi aydın ad istifadə etməyi tövsiyə edir.'
  },
  {
    q: '`(new Function("return this"))()` niyə qlobal obyekti qaytarır?',
    options: [
      '`Function()` konstruktoru həmişə sərt rejimdə işləyir',
      'Belə yaradılmış funksiya adi çağırışda qeyri-sərt rejimdə işləyir və `this` qlobal obyektə işarə edir',
      '`new` açar sözü həmişə qlobal obyekt yaradır',
      '`Function()` kodu qlobal scope-da `eval` edir və `window` qaytarır'
    ],
    answer: 1,
    why: 'Sətirdən qurulan funksiya köhnə səbəblərə görə qeyri-sərt rejimdə işləyir. Adi `()` çağırışında onun `this`-i qlobal obyekt olur.'
  }
];
