export const SCOPE_TERMS: Record<
  string,
  [string, string, string] | [string, string, string, string]
> = {
  'scope-manager': [
    'Scope Manager',
    'Scope meneceri',
    'Kitabın 2-ci fəslindəki metafora: hər scope-un öz «meneceri» var, o, həmin scope-da elan olunmuş identifikatorların siyahısını saxlayır.\n\nKompilyator ondan «bu adı eşitmisən?» deyə soruşur və lazım gələrsə, yeni dəyişən qeydiyyata alınır. İcra zamanı isə mühərrik ondan dəyişəni tapmağı xahiş edir; tapılmasa, sual bir səviyyə yuxarıdakı menecerə ötürülür ([[scope-chain]]).'
  ],
  'accidental-global': [
    'Accidental Global',
    'Təsadüfi qlobal dəyişən',
    'Qeyri-sərt rejimdə heç yerdə elan olunmamış dəyişənə dəyər yazanda JS səssizcə qlobal dəyişən yaradır.\n\n```js\nfunction save() {\n  total = 100;   // let/const/var yoxdur\n}\nsave();\nconsole.log(total);   // 100 — qlobal oldu!\n```\n\n[[js-strict-mode]]-da (və ES modullarında) bu, `ReferenceError` verir — təsadüfi qlobal dəyişənlərdən qorunmağın ən yaxşı yolu budur.'
  ],
  shadowing: [
    'Shadowing',
    'Kölgələmə',
    'Daxili scope-da xarici scope-dakı dəyişənlə eyni adlı dəyişən elan olunanda daxili dəyişən xarici olanı «kölgədə qoyur»: həmin nöqtədən içəriyə doğru xarici dəyişənə adı ilə çatmaq mümkün olmur.\n\n```js\nconst name = \'Kyle\';\nfunction greet(name) {   // parametr xarici name-i kölgələyir\n  return name;\n}\ngreet(\'Suzy\');   // Suzy\n```\n\nESLint-in `no-shadow` qaydası təsadüfi kölgələməni tutur.'
  ],
  'global-scope': [
    'Global Scope',
    'Qlobal scope',
    'Ən xarici scope — scope zəncirinin son dayanacağı. JS-in daxili imkanları (`Math`, `JSON`, `Promise`) və mühitin API-ləri (`window`, `document`, `setTimeout`) burada yaşayır.\n\nAdi `<script>` faylında yuxarı səviyyəli `var`/`function` qlobal olur. ES modullarında və Node-da isə faylın yuxarı səviyyəsi qlobal deyil — modul scope-udur. Qlobal scope-u çirkləndirmək ad toqquşmalarına aparır; buna görə müasir kod modullardan istifadə edir.'
  ],
  'global-object': [
    'Global Object',
    'Qlobal obyekt',
    'Qlobal scope-un obyekt təsviri. Mühitdən asılı olaraq adı fərqlidir: brauzerdə `window`, Web Worker-də `self`, Node-da `global`, hər yerdə isə [[globalthis]].\n\nYalnız `var` və `function` bəyannamələri qlobal obyektdə xassə kimi güzgülənir; `let`, `const`, `class` isə yox:\n\n```js\nvar a = 1;  let b = 2;\nwindow.a;   // 1\nwindow.b;   // undefined\n```'
  ],
  globalthis: [
    'globalThis',
    'globalThis',
    'ES2020-də əlavə olunan, qlobal obyektə bütün mühitlərdə (brauzer, Node, Web Worker) işləyən standart istinad. `window`, `self`, `global` fərqlərini düşünmədən universal kod yazmağa imkan verir.\n\n```js\nif (typeof globalThis.fetch !== \'function\') {\n  // köhnə mühit — polyfill yüklə\n}\n```'
  ],
  'named-function-expression': [
    'Named Function Expression',
    'Adlı funksiya ifadəsi',
    'Dəyər kimi istifadə olunan, amma öz adı olan funksiya: `const f = function helper() {}`.\n\nAd (`helper`) xarici scope-a düşmür — yalnız funksiyanın öz içində görünür və yalnız oxunandır. Faydaları: stack trace-də ad görünür, funksiya özünü rekursiv çağıra bilir. Adsız versiya «anonim funksiya ifadəsi» adlanır.'
  ],
  'arrow-function': [
    'Arrow Function',
    'Arrow funksiya',
    'ES6-da gələn qısa funksiya ifadəsi sintaksisi: `(a, b) => a + b`.\n\nScope baxımından adi funksiya kimidir — öz scope-unu yaradır. Real fərqləri:\n\n- öz [[this]]-i yoxdur, xarici `this`-i götürür;\n- öz `arguments`-i yoxdur;\n- `new` ilə çağırıla bilməz;\n- leksik olaraq anonimdir (adı yalnız dəyişəndən çıxarılır).'
  ],
  'web-worker': [
    'Web Worker',
    'Web Worker',
    'JS faylını əsas axından ayrı, fon axınında işlədən brauzer imkanı. Ağır hesablamalar UI-ni dondurmasın deyə istifadə olunur.\n\nWorker-in öz qlobal scope-u var (`self`), DOM-a çıxışı yoxdur. Əsas axınla əlaqə yalnız `postMessage` və `onmessage` ilə olur.\n\n```js\nconst worker = new Worker(new URL(\'./worker.ts\', import.meta.url), { type: \'module\' });\nworker.postMessage(bigData);\n```'
  ],
  commonjs: [
    'CommonJS',
    'CommonJS modulları',
    'Node-un ilkin modul formatı: `require()` ilə import, `module.exports` ilə export. Hər fayl ayrıca moduldur və singleton kimi davranır.\n\n```js\nconst { getName } = require(\'./student.js\');\nmodule.exports.getName = getName;\n```\n\n[[esm]]-dən fərqli olaraq dinamikdir (icra zamanı işləyir), ona görə bandler istifadə olunmayan hissələri ata bilmir ([[tree-shaking]] zəifdir).'
  ],
  redeclaration: [
    'Re-declaration',
    'Təkrar bəyannamə',
    'Eyni dəyişəni bir scope-da ikinci dəfə elan etmə cəhdi.\n\n- `var` ilə: icazə verilir, amma heç nə etmir (no-op) — dəyər sıfırlanmır.\n- `let`/`const` iştirak edirsə: `SyntaxError` — «has already been declared».\n\n```js\nvar a = 1;\nvar a;          // a hələ də 1\nlet b = 1;\nlet b = 2;      // SyntaxError\n```\n\nDövrün hər iterasiyası yeni scope nüsxəsi olduğu üçün dövrün içindəki `let` təkrar bəyannamə sayılmır.'
  ],
  pole: [
    'POLE — Principle of Least Exposure',
    'Ən az açıqlıq prinsipi',
    'Hər dəyişən və funksiyanı işləməsi üçün kifayət edən ən kiçik scope-da elan et; qalan hər şeyi gizli saxla.\n\nÜç təhlükədən qoruyur: **ad toqquşmaları**, **gözlənilməz davranış** (başqası sənin gizli datanı dəyişir) və **arzuolunmaz asılılıq** (başqa kod sənin daxili detalından asılı olur və refaktorinqi çətinləşdirir).\n\nFrontend-də: komponent daxili state-i props kimi açmır, modul yalnız lazım olanı `export` edir.'
  ],
  iife: [
    'IIFE — Immediately Invoked Function Expression',
    'Dərhal çağırılan funksiya ifadəsi',
    'Təyin olunduğu anda çağırılan funksiya ifadəsi. Dəyişənləri gizlətmək üçün ayrıca scope yaradır.\n\n```js\nconst counter = (function () {\n  let count = 0;             // çöldən görünmür\n  return () => ++count;\n})();\n```\n\nES modullarından əvvəl «modul» yaratmağın əsas yolu idi. Bu gün ən çox `useEffect` içində async funksiya çağırmaq üçün görünür. Diqqət: IIFE funksiya sərhədi olduğu üçün `return`, `this`, `break`, `continue`-nin mənasını dəyişir.'
  ],
  memoization: [
    'Memoization',
    'Memoizasiya',
    'Funksiyanın nəticəsini girişə görə keşləmək: eyni giriş yenidən gələndə hesablama təkrarlanmır, keşdən qaytarılır. Keş adətən [[closure]]-da gizlədilir.\n\n```js\nconst square = (() => {\n  const cache = {};\n  return (n) => cache[n] ?? (cache[n] = n * n);\n})();\n```\n\nReact-də `useMemo`, `useCallback`, `React.memo` eyni ideyanın tətbiqləridir. Yaddaşı sürətə dəyişir — keşin böyüməsinə diqqət et.'
  ],
  fib: [
    'FiB — Function Declarations in Blocks',
    'Bloklarda funksiya bəyannamələri',
    '`if`, `for` və ya açıq `{ }` blokunun içində `function ad() {}` bəyannaməsi. Spesifikasiyaya görə blok scope-ludur, lakin köhnə davranışa uyğunluq üçün brauzer mühərrikləri (və Node) fərqli işləyir — nəticə mühitdən asılı olur.\n\nQayda: blokun içində funksiya **bəyannaməsi** yazma. Şərtli funksiya lazımdırsa, funksiya **ifadəsi** istifadə et:\n\n```js\nconst format = isMobile ? shortFormat : longFormat;\n```'
  ],
  gc: [
    'Garbage Collection (GC)',
    'Zibil yığımı',
    'JS mühərrikinin artıq heç yerdən istinad olunmayan dəyərlərin yaddaşını avtomatik azad etməsi.\n\nDəyişən hələ də hansısa [[closure]] tərəfindən saxlanırsa, təmizlənmir. Buna görə silinməmiş hadisə işləyiciləri, interval-lar və abunəliklər [[memory-leak]] yaradır. React-də `useEffect` cleanup funksiyası məhz bu istinadları qırmaq üçündür.'
  ],
  callback: [
    'Callback',
    'Callback funksiya',
    'Başqa funksiyaya arqument kimi ötürülən və sonra — dərhal (`map`, `find`) və ya gələcəkdə (`setTimeout`, `addEventListener`, `then`) — çağırılan funksiya.\n\nCallback-lər ən çox rast gəlinən [[closure]] formasıdır: callback yarandığı scope-dakı dəyişənləri, həmin scope çoxdan bitsə belə, görür.\n\n```js\nfunction load(id) {\n  fetch(`/api/${id}`).then((res) => console.log(id, res.status));\n}\n```'
  ],
  'partial-application': [
    'Partial Application',
    'Qismən tətbiq',
    'Bir neçə arqument qəbul edən funksiyanın bəzi arqumentlərini əvvəlcədən verib, qalanlarını gözləyən yeni funksiya almaq. Əvvəlcədən verilən arqumentlər [[closure]]-da saxlanılır. Yaxın qohumu **currying**-dir (arqumentləri bir-bir qəbul edən funksiyalar zənciri).\n\n```js\nconst handleChange = (field) => (e) =>\n  setForm((f) => ({ ...f, [field]: e.target.value }));\n```'
  ],
  encapsulation: [
    'Encapsulation',
    'İnkapsulyasiya',
    'Birlikdə bir məqsədə xidmət edən data və davranışı bir yerə yığmaq və daxili detalları çöldən gizlətmək.\n\nİki tərəfi var: **qruplaşdırma** (əlaqəli şeylər bir yerdədir — məsələn, bir komponent faylı) və **görünməyə nəzarət** (yalnız public API açıqdır). JS-də gizlilik əsasən leksik scope və [[closure]] ilə, həmçinin `class`-ın `#private` sahələri ilə təmin olunur.'
  ],
  'namespace-object': [
    'Namespace',
    'Ad məkanı (namespace)',
    'Əlaqəli, lakin vəziyyətsiz (state saxlamayan) funksiyaları bir obyekt altında qruplaşdırmaq: `Utils.wait()`, `Utils.isValidEmail()`.\n\nBu, modul deyil: nə gizli state, nə də gizli detal var. ESM-də `import * as Utils from \'./utils\'` də namespace obyekti yaradır. Pis deyil — sadəcə onu modul adlandırma.'
  ],
  'module-factory': [
    'Module Factory',
    'Modul fabriki',
    'Hər çağırışda modulun **yeni, müstəqil** nüsxəsini (öz gizli state-i ilə) qaytaran adi funksiya. IIFE ilə yaradılan [[singleton]]-dan fərqi budur ki, istənilən qədər nüsxə yaratmaq olar.\n\n```js\nfunction createStore(initial) {\n  let state = initial;\n  return { get: () => state, set: (v) => { state = v; } };\n}\nconst a = createStore(0);\nconst b = createStore(10);   // ayrı state\n```\n\nCustom hook-lar da hər komponent üçün ayrıca state yaradan fabriklərdir.'
  ],
  singleton: [
    'Singleton',
    'Tək nüsxə (singleton)',
    'Bütün proqram üçün yalnız bir nüsxəsi olan modul və ya obyekt. IIFE ilə yaradılan klassik modul, CommonJS modulu və ES modulu singleton-dur: faylı neçə dəfə import etsən də, eyni nüsxəni alırsan.\n\nFrontend-də tipik singleton-lar: API client, global store (Zustand, Redux), i18n instansiyası. Diqqət: singleton-dakı state bütün tətbiq üçün ortaqdır — testlər arasında sıfırlanmalıdır.'
  ]
};
