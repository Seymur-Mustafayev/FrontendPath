import type { ExamQuestion } from '../books';

export const exam5: ExamQuestion[] = [
  {
    q: 'Bu kod niyə işləyir?',
    code: "greeting();\n\nfunction greeting() {\n  console.log('Hello!');\n}",
    options: [
      'JS kodu yuxarıdan aşağı icra edir və funksiyaları əvvəlcədən tanıyır',
      'Function hoisting: `greeting` scope-un əvvəlində qeydiyyata alınır və dərhal funksiya istinadı ilə ilkinləşdirilir',
      'Funksiya çağırışları həmişə sona saxlanılır',
      '`greeting` əvvəlcə `undefined` olur, amma çağırış ona baxmayaraq işləyir'
    ],
    answer: 1,
    why: 'Rəsmi `function` bəyannaməsinin adı scope-un yuxarısında qeydiyyata alınır və əlavə olaraq funksiyanın istinadı ilə avtomatik ilkinləşdirilir. Ona görə funksiya bütün scope boyu çağırıla bilir.'
  },
  {
    q: '`var` və `function` bəyannamələri hansı scope-a bağlanır?',
    options: [
      'Ən yaxın `{ }` bloka',
      'Ən yaxın funksiya scope-una (o yoxdursa, qlobal scope-a)',
      'Həmişə qlobal scope-a',
      'Çağırış yerindəki scope-a'
    ],
    answer: 1,
    why: 'Həm function hoisting, həm də `var` hoisting-i identifikatoru ən yaxın funksiya scope-una bağlayır. `let`/`const` isə ən yaxın bloka bağlanır.'
  },
  {
    q: 'Bu kodun birinci sətri hansı səhvi atır və niyə?',
    code: "greeting();\n\nvar greeting = function greeting() {\n  console.log('Hello!');\n};",
    options: [
      '`ReferenceError` — `greeting` hələ elan olunmayıb',
      '`TypeError` — `greeting` tapılır, amma həmin an dəyəri `undefined`-dir, funksiya deyil',
      '`SyntaxError` — funksiya ifadəsini əvvəlcədən çağırmaq olmaz',
      'Səhv yoxdur, `Hello!` çap olunur'
    ],
    answer: 1,
    why: '`var greeting` hoist olunur və `undefined` ilə ilkinləşir. Funksiya ifadəsi isə yalnız icra zamanı həmin sətrə çatanda mənimsədilir. `undefined`-i çağırmaq `TypeError` verir — `ReferenceError` yox, çünki identifikator tapılıb.'
  },
  {
    q: 'Kitaba görə «hoisting» termini əslində nəyi ifadə etməlidir?',
    options: [
      'JS mühərrikinin icradan əvvəl kodu fiziki olaraq yenidən düzməsini',
      'Dəyişənin scope-a hər girişdə onun əvvəlində avtomatik qeydiyyatı üçün təlimatların kompilyasiya zamanı yaradılmasını',
      'Dəyişənlərin qlobal scope-a köçürülməsini',
      'Funksiyaların yaddaşda yuxarı ünvanlara yerləşdirilməsini'
    ],
    answer: 1,
    why: 'Mühərrik kodu yenidən düzmür — bəyannamələri tapmaq üçün kodu tam parse etməlidir, bu isə iki mərhələli emalın birinci mərhələsidir. Hoisting kompilyasiya zamanı tapşırığı kimi düşünülməlidir.'
  },
  {
    q: 'Bu kodda ikinci `console.log` nə çap edir?',
    code: "var studentName = 'Frank';\nconsole.log(studentName);\n\nvar studentName;\nconsole.log(studentName);",
    options: ['`undefined`', "`'Frank'`", '`SyntaxError`', '`null`'],
    answer: 1,
    why: 'Eyni scope-da təkrar `var` bəyannaməsi heç nə etməyən əməliyyatdır (no-op). `var studentName;` dəyəri sıfırlamır — o, `var studentName = undefined;` ilə eyni deyil.'
  },
  {
    q: 'Bu kodda `typeof greeting` nəyi qaytarır?',
    code: "var greeting;\n\nfunction greeting() {\n  console.log('Hello!');\n}\n\nvar greeting;\n\ntypeof greeting;",
    options: ['`"undefined"`', '`"function"`', '`"string"`', '`SyntaxError` atılır'],
    answer: 1,
    why: 'Function hoisting avtomatik ilkinləşdirmədə `var`-dan üstündür, identifikator funksiya istinadı ilə ilkinləşir. Təkrar `var greeting` isə heç nə etmir.'
  },
  {
    q: 'Hansı bəyannamə cütü eyni scope-da `SyntaxError` VERMİR?',
    options: [
      '`let x = 1;` və `let x = 2;`',
      '`var x = 1;` və `let x = 2;`',
      '`var x = 1;` və `var x = 2;`',
      '`let x = 1;` və `var x = 2;`'
    ],
    answer: 2,
    why: 'Dəyişəni «yenidən elan etməyin» yeganə yolu bütün bəyannamələrdə `var` istifadə etməkdir. Bəyannamələrdən biri `let`-dirsə, səhv atılır.'
  },
  {
    q: 'Kitaba görə `let`-in təkrar bəyannaməni qadağan etməsinin əsas səbəbi nədir?',
    options: [
      'Texniki cəhətdən bunu dəstəkləmək mümkün deyil',
      'Daha çox «sosial mühəndislik» — təkrar bəyannamə bug yaradan pis vərdiş sayılır',
      'Performansı artırmaq',
      '`var` ilə uyğunluq'
    ],
    answer: 1,
    why: '`var` üçün təkrar bəyannaməyə həmişə icazə verilib, deməli texniki maneə yoxdur. TC39 bunu pis vərdiş sayıb qadağan etdi. `const` üçün isə həqiqi texniki səbəb var.'
  },
  {
    q: '`const`-un təkrar bəyannaməni qadağan etməsinin texniki səbəbi nədir?',
    options: [
      '`const` yalnız qlobal scope-da işləyir',
      '`const` həmişə mənimsətmə tələb edir və yenidən mənimsədilə bilməz — təkrar bəyannamə həm də yenidən mənimsətmə olardı',
      '`const` hoist olunmur',
      'Səbəb sırf üslubdur'
    ],
    answer: 1,
    why: 'Mənimsətməsiz `const` `SyntaxError`-dur, `const`-a yenidən dəyər yazmaq isə `TypeError`. Deməli, istənilən təkrar `const` bəyannaməsi qadağan olunmuş yenidən mənimsətmə olardı.'
  },
  {
    q: 'Bu kodda hansı səhv atılır və nə vaxt?',
    code: "const studentName = 'Frank';\nconsole.log(studentName);\n\nstudentName = 'Suzy';",
    options: [
      '`SyntaxError`, proqram ümumiyyətlə başlamır',
      "`TypeError`, amma yalnız `'Frank'` çap olunduqdan sonra",
      '`ReferenceError`',
      'Səhv yoxdur'
    ],
    answer: 1,
    why: 'Sintaksis səhvləri proqramın başlamasına mane olur, tip səhvləri isə icra zamanı yaranır. Burada əvvəlcə `Frank` çap olunur, sonra yenidən mənimsətmə `TypeError` atır.'
  },
  {
    q: '`while` dövrünün içində hər iterasiyada `let value = ...` yazmaq niyə təkrar bəyannamə səhvi vermir?',
    options: [
      '`let` dövrlərdə avtomatik `var`-a çevrilir',
      'Hər iterasiya yeni scope nüsxəsidir və hər nüsxədə `value` yalnız bir dəfə elan olunur',
      'Dövrlərdə scope qaydaları tətbiq olunmur',
      'JS təkrar bəyannamə səhvlərini dövrlərdə gizlədir'
    ],
    answer: 1,
    why: 'Scope qaydaları hər scope nüsxəsinə ayrıca tətbiq olunur: icra zamanı scope-a hər girişdə hər şey sıfırlanır. Bəyannamə sözlərini zehnində silmək bunu görməyə kömək edir.'
  },
  {
    q: '`for (let i = 0; i < 3; i++) { ... }` dövründə `i` hansı scope-dadır?',
    options: [
      'Xarici (məsələn, qlobal) scope-da, bir dəfə',
      'Dövr gövdəsinin scope-unda — hər iterasiyada öz `i`-si ilə',
      'Funksiyanın scope-unda',
      'Heç bir scope-da, o, xüsusi dövr dəyişənidir'
    ],
    answer: 1,
    why: 'Konseptual olaraq dövr `let $$i` sayğacı və hər iterasiyada `let i = $$i` kimi açıla bilər. Ona görə hər iterasiyanın öz `i`-si var və təkrar bəyannamə yoxdur.'
  },
  {
    q: '`for (const i = 0; i < 3; i++) {}` nə edir?',
    options: [
      'Normal işləyir, üç dəfə təkrarlanır',
      '`SyntaxError` verir',
      'Birinci iterasiyadan sonra `TypeError` atır — `i++` sabitə yenidən mənimsətmədir',
      'Sonsuz dövrə girir'
    ],
    answer: 2,
    why: 'Problem təkrar bəyannamə deyil, sayğacın `$$i++` ilə yenidən mənimsədilməsidir — sabitlər üçün buna icazə yoxdur. `for..in` və `for..of` isə `const` ilə problemsiz işləyir.'
  },
  {
    q: 'Bu kod niyə `ReferenceError` atır?',
    code: "askQuestion();\n\nlet studentName = 'Suzy';\n\nfunction askQuestion() {\n  console.log(`${ studentName }, do you know?`);\n}",
    options: [
      '`askQuestion` hoist olunmayıb',
      '`studentName` funksiyadan görünmür',
      'Funksiya `let` sətrinə çatmazdan ƏVVƏL çağırılır — o an `studentName` hələ TDZ-dədir',
      '`console.log` sətri `let`-dən yuxarıdadır'
    ],
    answer: 2,
    why: 'TDZ-dəki «temporal» sözü kodda mövqeyə yox, zamana işarə edir. İstinad mövqe baxımından bəyannamədən sonra olsa da, zaman baxımından ondan əvvəl icra olunur.'
  },
  {
    q: 'Birinci `console.log` nə edir?',
    code: "var studentName = 'Kyle';\n\n{\n  console.log(studentName);\n\n  let studentName = 'Suzy';\n}",
    options: [
      "`'Kyle'` çap edir — daxili `let` hələ yoxdur",
      "`'Suzy'` çap edir",
      '`undefined` çap edir',
      '`ReferenceError` (TDZ) atır — daxili `studentName` blokun yuxarısına hoist olunub, amma hələ ilkinləşdirilməyib'
    ],
    answer: 3,
    why: 'Bu, `let`-in hoist olunduğunun sübutudur: hoist olunmasaydı, xarici `Kyle` çap olunardı. Daxili dəyişən blokun yuxarısında qeydiyyata alınıb və xarici dəyişəni kölgələyir, amma bəyannamə sətrinə qədər TDZ-dədir.'
  },
  {
    q: '`let x;` ilə `let x = undefined;` arasında fərq varmı?',
    options: [
      'Bəli, `let x;` dəyişəni ilkinləşdirilməmiş saxlayır',
      'Xeyr — hər ikisi bəyannamə sətrində dəyişəni `undefined` ilə ilkinləşdirir',
      'Bəli, ikincisi `SyntaxError` verir',
      'Bəli, birincisi dəyişəni TDZ-də əbədi saxlayır'
    ],
    answer: 1,
    why: '`let` scope-un əvvəlində ilkinləşmir, bəyannamə sətrində ilkinləşir — ona görə bu iki forma eyni davranır. `var`-da isə `var x;` ilə `var x = undefined;` fərqlidir.'
  },
  {
    q: 'TDZ səhvlərindən qaçmaq üçün müəllif nə tövsiyə edir?',
    options: [
      'Həmişə `var` istifadə et',
      '`let`/`const` bəyannamələrini həmişə scope-un yuxarısına qoy ki, TDZ pəncərəsi sıfıra ensin',
      'Dəyişənləri `try/catch` ilə yoxla',
      '`typeof` ilə dəyişənin mövcudluğunu yoxla'
    ],
    answer: 1,
    why: 'Bəyannamələr scope-un yuxarısında olanda TDZ pəncərəsi demək olar ki, sıfır olur və problem öz-özünə aradan qalxır.'
  }
];
