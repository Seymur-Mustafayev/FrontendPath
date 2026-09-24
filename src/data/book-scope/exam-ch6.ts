import type { ExamQuestion } from '../books';

export const exam6: ExamQuestion[] = [
  {
    q: 'POLE (Principle of Least Exposure) dəyişənlər üçün nə tələb edir?',
    options: [
      'Bütün dəyişənləri qlobal scope-da saxla ki, hamı çata bilsin',
      'Standart olaraq minimumu aç: dəyişənləri mümkün qədər kiçik və dərin iç-içə scope-larda elan et',
      'Hər dəyişəni ayrıca modulda saxla',
      'Yalnız `const` istifadə et'
    ],
    answer: 1,
    why: 'POLE POLP-un (ən az imtiyaz) scope səviyyəsindəki variantıdır: yalnız zəruri olanı aç, qalan hər şeyi mümkün qədər gizli saxla.'
  },
  {
    q: 'Dəyişənlərin lazımsız açıqlığı hansı üç əsas təhlükə yaradır?',
    options: [
      'Yavaş kompilyasiya, böyük bandl, yaddaş sızması',
      'Ad toqquşmaları, gözlənilməz davranış, arzuolunmaz asılılıq',
      'Sintaksis səhvləri, TDZ səhvləri, tip səhvləri',
      'Hoisting, shadowing, closure'
    ],
    answer: 1,
    why: 'Ortaq scope-dakı eyni adlar toqquşur; başqaları gizli detalları gözlənilməz şəkildə istifadə edir; açıq qoyulan hissələrdən asılılıq yaranır və gələcəkdə refaktorinqi çətinləşdirir.'
  },
  {
    q: '`diff(x, y)` funksiyasında `tmp` niyə `if` blokunun içində `let` ilə elan olunub?',
    code: 'function diff(x,y) {\n  if (x > y) {\n    let tmp = x;\n    x = y;\n    y = tmp;\n  }\n  return y - x;\n}',
    options: [
      '`var` burada `SyntaxError` verərdi',
      'POLE: `tmp` yalnız yerdəyişmə üçün lazımdır, ona görə ən kiçik scope-da gizlədilir',
      'Performansı artırmaq üçün',
      '`let` funksiyada yalnız bloklarda istifadə oluna bilər'
    ],
    answer: 1,
    why: 'Nəticə eyni olsa da, POLE-a görə `tmp` mümkün qədər gizli olmalıdır — o, yalnız `if` bloku üçün lazımdır.'
  },
  {
    q: '`factorial`-ın `cache`-ini niyə sadəcə funksiyanın içində elan etmək olmur?',
    options: [
      'Funksiyanın içində obyekt yaratmaq olmur',
      '`cache` çağırışlar arasında yaşamalıdır — funksiyanın içində olsa, hər çağırışda yenidən yaranar',
      '`cache` rekursiyaya mane olar',
      'Olur, heç bir fərqi yoxdur'
    ],
    answer: 1,
    why: 'Funksiyanın scope-u hər çağırışda yenidən yaradılır. Keş çağırışlar arasında qalmalıdır, ona görə o, qlobal scope ilə `factorial`-ın içi arasındakı aralıq scope-a (məsələn, `hideTheCache`) qoyulur.'
  },
  {
    q: 'Funksiya nəticəsini eyni girişlər üçün keşləmək texnikası necə adlanır?',
    options: ['Hoisting', 'Memoization', 'Shadowing', 'Currying'],
    answer: 1,
    why: 'Bu, Funksional Proqramlaşdırmada «memoization» adlanır və closure-a əsaslanır. React-dəki `useMemo` və `React.memo` eyni ideyanın tətbiqidir.'
  },
  {
    q: '`(function hideTheCache() { ... })()` formasında `hideTheCache` adının xarici scope ilə toqquşmaması nə ilə izah olunur?',
    options: [
      'IIFE-lərin adı olmur',
      'Funksiya ifadəsinin adı xarici scope-a yox, funksiyanın öz scope-una düşür',
      'Ad avtomatik unikal edilir',
      'IIFE sərt rejimdə işləyir'
    ],
    answer: 1,
    why: '3-cü fəsildən: funksiya ifadəsinin ad identifikatoru öz scope-undadır. Ona görə hər IIFE-yə eyni ad versən də, toqquşma olmur.'
  },
  {
    q: 'IIFE nədir?',
    options: [
      'Dərhal çağırılan funksiya ifadəsi — dəyişənləri gizlətmək üçün scope yaradır',
      'Import olunan funksiya ifadəsi',
      'Asinxron funksiya',
      'Funksiya bəyannaməsinin qısa forması'
    ],
    answer: 0,
    why: 'Immediately Invoked Function Expression: `(function(){ ... })()`. İfadə olduğu üçün ifadəyə icazə verilən istənilən yerdə istifadə oluna bilər.'
  },
  {
    q: 'Müstəqil IIFE-də funksiyanın ətrafındakı `( .. )` mötərizələri niyə məcburidir?',
    options: [
      'Oxunaqlılıq üçün',
      'Onlar funksiyanı bəyannamə yox, ifadə kimi fərqləndirir',
      'Onlar scope yaradır',
      'Məcburi deyil'
    ],
    answer: 1,
    why: 'Ifadənin ortasında (məsələn, `var x = function(){}()`) mötərizələr könüllüdür. Müstəqil IIFE-də isə onlar olmasa, parser `function`-ı bəyannamə kimi oxuyar. Ardıcıllıq üçün həmişə yazmaq tövsiyə olunur.'
  },
  {
    q: 'Kodu IIFE-yə bükəndə hansı ifadələrin mənası dəyişir?',
    options: [
      '`let` və `const`',
      '`return`, `this`, `break` və `continue`',
      '`if` və `else`',
      'Heç biri'
    ],
    answer: 1,
    why: 'IIFE tam funksiyadır: `return` IIFE-yə aid olur, arrow olmayan IIFE `this`-i dəyişir, `break`/`continue` isə funksiya sərhədindən keçə bilmir. Belə hallarda scope-u blokla yaratmaq daha yaxşıdır.'
  },
  {
    q: '`{ .. }` fiqurlu mötərizə cütü nə vaxt scope olur?',
    options: [
      'Həmişə',
      'Yalnız içində `let` və ya `const` bəyannaməsi olanda',
      'Yalnız `if` və ya `for`-a bağlı olanda',
      'Heç vaxt, yalnız funksiyalar scope yaradır'
    ],
    answer: 1,
    why: 'İfadə olan hər `{ .. }` blokdur, amma scope yalnız blok scope-lu bəyannamələri saxlamaq lazım olanda yaranır.'
  },
  {
    q: 'Hansı `{ .. }` blok (və scope) DEYİL?',
    options: [
      '`if (x) { let y = 1; }`',
      '`{ let a = 1; }` — müstəqil blok',
      'Obyekt literalı `{ a: 1 }`',
      '`for (let i = 0; i < 3; i++) { }`'
    ],
    answer: 2,
    why: 'Obyekt literalı, `class` gövdəsi və `switch`-in `case` bəndləri ətrafındakı `{ }` blok deyil. Funksiya gövdəsi texniki olaraq blok deyil, amma funksiya scope-udur.'
  },
  {
    q: '`let` bəyannaməsini blokun ortasına qoymalı olduğunu görəndə müəllif nə məsləhət görür?',
    options: [
      'Onu `var`-a çevir',
      'Onu funksiyanın yuxarısına köçür',
      '«TDZ həyəcanı!» — blokun birinci yarısında lazım deyilsə, onu daxili açıq `{ }` bloka al',
      'Heç nə, bu, normaldır'
    ],
    answer: 2,
    why: 'Daxili açıq blok həm açıqlığı daraldır, həm də bəyannaməni öz scope-unun yuxarısına gətirir — TDZ pəncərəsi sıfıra enir.'
  },
  {
    q: 'Müəllif `var`-ı nə üçün istifadə etməyi tövsiyə edir?',
    options: [
      'Heç vaxt, `var` köhnəlib',
      'Funksiyanın bütün (və ya çox) hissəsində lazım olan, funksiyanın yuxarı səviyyəsində elan olunan dəyişənlər üçün',
      'Yalnız dövr sayğacları üçün',
      'Yalnız qlobal sabitlər üçün'
    ],
    answer: 1,
    why: 'Müəllifin (mübahisəli olduğunu özü etiraf etdiyi) fikri: `var` «bütün funksiyaya aid» siqnalı verir, `let` isə blok scope-u. Sənaye praktikasında (ESLint `no-var`) isə adətən yalnız `const`/`let` istifadə olunur.'
  },
  {
    q: 'Dəyişənin harada elan olunacağına qərar verərkən əsas sual hansıdır?',
    options: [
      '«Hansı açar sözü daha qısadır?»',
      '«Bu dəyişən üçün kifayət edən ən minimal scope açıqlığı hansıdır?»',
      '«Dəyişən neçə dəfə istifadə olunur?»',
      '«Dəyişən sətir, yoxsa rəqəmdir?»'
    ],
    answer: 1,
    why: 'Qərar açar sözə görə verilmir. Əvvəl scope seçilir, sonra ona uyğun açar söz: blok scope üçün `let`, funksiya scope-u üçün (müəllifə görə) `var`.'
  },
  {
    q: 'Bu kodun son sətri nə edir?',
    code: "try {\n  doesntExist();\n}\ncatch (err) {\n  var outerVariable = true;\n}\n\nconsole.log(outerVariable);\nconsole.log(err);",
    options: [
      '`true`, sonra səhv obyektini çap edir',
      '`ReferenceError` atır — `err` yalnız `catch` blokunun scope-undadır',
      '`undefined` çap edir',
      '`SyntaxError`'
    ],
    answer: 1,
    why: '`catch (err)` parametri blok scope-ludur. Blokdakı `var` isə xarici scope-a bağlanır, ona görə `outerVariable` çöldə `true`-dur, `err` isə mövcud deyil.'
  },
  {
    q: 'ES2019-dan bəri parametrsiz `catch { ... }` yazanda nə olur?',
    options: [
      '`SyntaxError`',
      '`catch` bloku yenə blokdur, amma standart olaraq scope deyil',
      'Səhv avtomatik yenidən atılır',
      'Səhv `window.error`-a yazılır'
    ],
    answer: 1,
    why: 'Səhv dəyəri lazım deyilsə, bəyannaməni buraxmaq olar. Bu, sintaksisi sadələşdirir və lazımsız scope-u aradan qaldırır.'
  },
  {
    q: 'Bu kod brauzerdə (məsələn, Chrome/v8) adətən nə edir?',
    code: 'if (false) {\n  function ask() {\n    console.log("Does this run?");\n  }\n}\nask();',
    options: [
      '`ReferenceError` — spesifikasiyaya görə funksiya blok scope-ludur',
      '`TypeError` — identifikator blokdan kənarda var, amma dəyəri `undefined`-dir',
      '«Does this run?» çap edir',
      '`SyntaxError`'
    ],
    answer: 1,
    why: 'Spesifikasiya (1)-i tələb edir, amma köhnə saytları sındırmamaq üçün Əlavə B brauzer mühərriklərinə kənarlaşmağa icazə verir və v8 (Node daxil) (2) kimi davranır. Nəticə mühitdən asılıdır — ona görə FiB-dən qaçmaq lazımdır.'
  },
  {
    q: 'FiB-dən qaçmaq üçün müəllif nə tövsiyə edir?',
    options: [
      'Funksiyaları həmişə `if` bloklarında elan et',
      '`function` bəyannaməsini heç vaxt birbaşa blokun içinə qoyma; şərti tərif lazımdırsa, blokda funksiya ifadəsi mənimsət',
      'Yalnız arrow funksiyaları istifadə et',
      'Funksiyaları `var` ilə elan et'
    ],
    answer: 1,
    why: 'Funksiya bəyannamələrini funksiyanın (və ya qlobal scope-un) yuxarı səviyyəsinə qoy. Blokların içində `function` ifadələri tamamilə qaydasındadır, problem yalnız bəyannamələrdədir.'
  }
];
