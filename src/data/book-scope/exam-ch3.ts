import type { ExamQuestion } from '../books';

export const exam3: ExamQuestion[] = [
  {
    q: 'Scope zənciri nədir və hansı istiqamətdə işləyir?',
    options: [
      'İç-içə scope-lar arasındakı əlaqələr; axtarış yalnız yuxarı/çölə doğru gedir',
      'Bütün scope-ların siyahısı; axtarış istənilən istiqamətdə gedə bilər',
      'Funksiya çağırışlarının ardıcıllığı; axtarış çağıran funksiyaya doğru gedir',
      'Qlobal scope-dan içəriyə doğru gedən axtarış yolu'
    ],
    answer: 0,
    why: 'Scope zənciri iç-içə scope-ların əlaqəsidir və istiqaməti var: axtarış yalnız yuxarı/çölə doğru hərəkət edir. Zəncir çağırış sırasından yox, kodun yazıldığı yerdən asılıdır.'
  },
  {
    q: 'Praktikada mühərrik dəyişənin hansı scope-dan gəldiyini adətən nə vaxt bilir?',
    options: [
      'Hər müraciətdə scope-ları bir-bir gəzərək',
      'Kompilyasiya zamanı — bu məlumat AST-də dəyişənlə birlikdə saxlanılır',
      'Yalnız səhv atılanda',
      'Funksiya ilk dəfə çağırılanda'
    ],
    answer: 1,
    why: '«Axtarış» əsasən konseptual modeldir. Mərmərin rəngi adətən kompilyasiyada müəyyən olunur və dəyişmir, ona görə icra zamanı axtarışa ehtiyac qalmır — bu, leksik scope-un əsas optimallaşdırma üstünlüyüdür.'
  },
  {
    q: 'Hansı halda dəyişənin scope-u kompilyasiya zamanı məlum olmaya bilər?',
    options: [
      'Dəyişən `let` ilə elan olunubsa',
      'Dəyişən funksiyanın parametridirsə',
      'Dəyişən cari faylda heç yerdə elan olunmayıbsa — onu başqa fayl qlobal scope-da elan edə bilər',
      'Dəyişən dövrün içindədirsə'
    ],
    answer: 2,
    why: 'Hər fayl ayrıca proqramdır. Elan olunmamış istinad «rəngsiz mərmər» kimi qalır və onun rəngi icra zamanı, digər fayllar yükləndikdən sonra (ən çoxu bir dəfə) müəyyən olunur.'
  },
  {
    q: 'Bu kod sonda nə çap edir?',
    code: "var studentName = 'Suzy';\n\nfunction printStudent(studentName) {\n  studentName = studentName.toUpperCase();\n  console.log(studentName);\n}\n\nprintStudent(studentName);\nconsole.log(studentName);",
    options: [
      '`SUZY`, sonra `SUZY`',
      '`Suzy`, sonra `SUZY`',
      '`SUZY`, sonra `Suzy`',
      '`Suzy`, sonra `Suzy`'
    ],
    answer: 2,
    why: 'Parametr `studentName` (MAVİ) qlobal `studentName`-i (QIRMIZI) kölgələyir. Funksiyanın içindəki yenidən mənimsətmə yalnız parametrə təsir edir, qlobal dəyişən `Suzy` olaraq qalır.'
  },
  {
    q: 'Shadowing (kölgələmə) nədir?',
    options: [
      'Dəyişənin silinməsi',
      'Daxili scope-dakı eyni adlı dəyişənin xarici scope-dakı dəyişənə çıxışı bağlaması',
      'Dəyişənin qlobal obyektə köçürülməsi',
      'Eyni scope-da eyni adlı iki dəyişən elan etmək'
    ],
    answer: 1,
    why: 'Axtarış ilk uyğun adda dayandığı üçün daxili dəyişən tapılır və xarici dəyişən heç nəzərə alınmır. Həmin scope-dan içəriyə doğru kölgələnmiş dəyişənə leksik müraciət mümkün deyil.'
  },
  {
    q: 'Brauzerdə ayrıca .js faylı kimi icra olunan bu kod nə çap edir?',
    code: "var studentName = 'Suzy';\n\nfunction printStudent(studentName) {\n  console.log(window.studentName);\n}\n\nprintStudent('Frank');",
    options: ["`'Frank'`", "`'Suzy'`", '`undefined`', '`ReferenceError`'],
    answer: 1,
    why: 'Qlobal `var` bəyannaməsi qlobal obyektdə (`window`) eyni adlı xassə kimi güzgülənir. `window.studentName` kölgələnmiş qlobal dəyişənə çatmağın yeganə (tövsiyə olunmayan) yoludur.'
  },
  {
    q: 'Qlobal scope-dakı hansı bəyannamə `window`-da xassə yaratmır?',
    options: ['`var one = 1;`', '`function one() {}`', '`let notOne = 2;`', 'Hamısı xassə yaradır'],
    answer: 2,
    why: 'Yalnız `var` və `function` bəyannamələri qlobal obyektdə güzgülənir. `let`, `const` və `class` qlobal scope-da olsalar da `window`-da görünmür.'
  },
  {
    q: '`keepLooking()` içindən `lookingFor`-un `special` parametrinə necə çatmaq olar?',
    code: 'var special = 42;\n\nfunction lookingFor(special) {\n  function keepLooking() {\n    var special = 3.141592;\n    // ...\n  }\n  keepLooking();\n}',
    options: [
      '`window.special` ilə',
      '`this.special` ilə',
      '`lookingFor.special` ilə',
      'Heç cür — qlobal olmayan kölgələnmiş dəyişən tamamilə əlçatmazdır'
    ],
    answer: 3,
    why: '`window.special` yalnız QIRMIZI(1) qlobal dəyişəni (`42`) verir. MAVİ(2) parametrə kölgələndiyi scope-dan çatmağın yolu yoxdur. Onun dəyərini obyektə kopyalamaq isə çıxış deyil, sadəcə surətdir.'
  },
  {
    q: 'Parametrin dəyərini `var another = { special: special }` ilə obyektə kopyalamaq nəyə imkan verir?',
    options: [
      'Parametrin özünə yeni dəyər mənimsətməyə',
      'Parametrin həmin andakı dəyərinin surətini oxumağa — parametrin özünə çıxış yenə yoxdur',
      'Kölgələməni tamamilə aradan qaldırmağa',
      'Parametri qlobal dəyişənə çevirməyə'
    ],
    answer: 1,
    why: '«Kopyalamaq çıxış demək deyil». Hətta dəyər obyekt olsa da, onun məzmununu dəyişmək dəyişənin özünə leksik çıxış deyil — parametrə yenidən mənimsətmə etmək olmur.'
  },
  {
    q: 'Bu kodun hansı hissəsi `SyntaxError` verir?',
    code: "function another() {\n  {\n    let special = 'JavaScript';\n    {\n      var special = 'JavaScript';\n    }\n  }\n}",
    options: [
      '`let special` sətri — `let` blokda istifadə oluna bilməz',
      '`var special` sətri — `var` eyni adlı `let` bəyannaməsinin sərhədini keçməyə çalışır',
      'Heç biri, bu, adi kölgələmədir',
      'Funksiya adı `another` ehtiyat sözdür'
    ],
    answer: 1,
    why: '`var` bütün funksiyaya elan olunmaq istəyir və bunun üçün eyni adlı `let`-in üstündən «tullanmalıdır» — buna icazə yoxdur. Səhv mesajı («artıq təyin olunub») bir az çaşdırıcıdır.'
  },
  {
    q: '`var` hansı halda xarici scope-dakı `let`-i qanuni şəkildə kölgələyə bilər?',
    options: [
      'Heç vaxt',
      'Həmişə',
      'Yalnız aralarında funksiya sərhədi olduqda',
      'Yalnız sərt rejimdə'
    ],
    answer: 2,
    why: 'Sərhəd keçmə qadağası funksiya sərhədində dayanır. `let` isə daxili scope-da xarici `var`-ı həmişə kölgələyə bilər.'
  },
  {
    q: 'Bu kodda son sətir nə edir?',
    code: 'var askQuestion = function ofTheTeacher() {\n  console.log(ofTheTeacher);\n};\n\naskQuestion();\nconsole.log(ofTheTeacher);',
    options: [
      'Funksiyanı çap edir',
      '`undefined` çap edir',
      '`ReferenceError` atır — `ofTheTeacher` yalnız funksiyanın içində elan olunub',
      '`TypeError` atır'
    ],
    answer: 2,
    why: 'Adlı funksiya ifadəsinin adı xarici scope-a düşmür, funksiyanın öz içində elan olunur. Çöldə yalnız `askQuestion` var.'
  },
  {
    q: 'Adlı funksiya ifadəsinin içində onun adına (`ofTheTeacher = 42`) sərt rejimdə dəyər yazanda nə baş verir?',
    options: [
      'Ad yenidən mənimsədilir',
      '`TypeError` atılır — ad yalnız oxunandır',
      '`ReferenceError` atılır',
      'Səssizcə heç nə olmur'
    ],
    answer: 1,
    why: 'Funksiya ifadəsinin adı yalnız oxunan kimi təyin olunur. Sərt rejimdə uğursuz mənimsətmə `TypeError` verir, qeyri-sərt rejimdə isə səssizcə uğursuz olur.'
  },
  {
    q: 'Arrow funksiyalar leksik scope baxımından adi `function` funksiyalardan necə fərqlənir?',
    options: [
      'Öz scope-larını yaratmırlar, xarici scope-u istifadə edirlər',
      'Gövdədə `{ }` yoxdursa, scope yaratmırlar',
      'Fərqlənmirlər — anonim olmaları istisna olmaqla eyni leksik scope qaydalarına malikdirlər',
      'Onların içindəki `var` qlobal scope-a düşür'
    ],
    answer: 2,
    why: 'Müəllif bu geniş yayılmış iddianı yanlış sayır: arrow funksiya da ayrıca iç-içə scope vedrəsi yaradır. Onların real fərqi `this`, `arguments` və `new`-dadır, scope-da yox.'
  },
  {
    q: '`var askQuestion = () => {};` üçün `askQuestion.name` nədir və bu nə deməkdir?',
    options: [
      "`''` — arrow funksiyanın adı olmur",
      '`"askQuestion"` — çıxarılmış (inferred) ad; funksiya yenə də leksik olaraq anonimdir',
      '`"anonymous"`',
      '`"askQuestion"` — funksiya artıq anonim deyil'
    ],
    answer: 1,
    why: 'Mənimsətmə «askQuestion» adını çıxarır, amma bu, anonim olmamaq demək deyil: funksiyanın özünə istinad edən leksik identifikatoru yoxdur.'
  }
];
