import type { ExamQuestion } from '../books';

export const exam1: ExamQuestion[] = [
  {
    q: 'Kitaba görə JS proqramı necə emal olunur?',
    options: [
      'Yuxarıdan aşağı, sətir-sətir interpretasiya olunur',
      'Ən azı iki mərhələdə: əvvəl parse/kompilyasiya, sonra icra',
      'Yalnız əvvəlcədən build addımında kompilyasiya olunur',
      'Hər sətir icra olunmazdan dərhal əvvəl ayrıca kompilyasiya olunur'
    ],
    answer: 1,
    why: 'Fəslin əsas iddiası: emal (ən azı) iki mərhələdə baş verir — əvvəl parse/kompilyasiya, sonra icra. Bu, nəzəriyyə yox, müşahidə oluna bilən faktdır: sintaksis səhvləri, erkən səhvlər və hoisting bunu sübut edir.'
  },
  {
    q: 'Klassik kompilyator nəzəriyyəsindəki üç mərhələnin düzgün ardıcıllığı hansıdır?',
    options: [
      'Parsing → Tokenizing/Lexing → Code Generation',
      'Code Generation → Parsing → Tokenizing/Lexing',
      'Tokenizing/Lexing → Parsing → Code Generation',
      'Tokenizing/Lexing → Code Generation → Parsing'
    ],
    answer: 2,
    why: 'Əvvəl simvollar tokenlərə bölünür (tokenizing/lexing), sonra tokenlərdən AST qurulur (parsing), sonda AST icra oluna bilən koda çevrilir (code generation).'
  },
  {
    q: 'Tokenizing ilə lexing arasındakı fərq nədədir?',
    options: [
      'Lexing tokenləri vəziyyətli (stateful) qaydalarla tanıyır, tokenizing isə vəziyyətsiz',
      'Lexing AST qurur, tokenizing isə qurmur',
      'Tokenizing yalnız boşluqları silir',
      'Heç bir fərq yoxdur, sadəcə iki addır'
    ],
    answer: 0,
    why: 'Fərq incə və akademikdir: tokenləşdirici `a`-nın ayrıca token olub-olmadığını müəyyən etmək üçün vəziyyətli parse qaydalarına müraciət edirsə, bu, **lexing** adlanır.'
  },
  {
    q: 'Bu proqram işə salınanda nə baş verir?',
    code: "var greeting = 'Hello';\nconsole.log(greeting);\ngreeting = .'Hi';",
    options: [
      "`'Hello'` çap olunur, sonra SyntaxError atılır",
      'Heç nə çap olunmur, dərhal SyntaxError atılır',
      "`'Hello'` və `'Hi'` çap olunur",
      'Yalnız üçüncü sətir ötürülür, qalan kod işləyir'
    ],
    answer: 1,
    why: "Mühərrik bütün proqramı icradan əvvəl parse edir və üçüncü sətirdəki səhvi görür, ona görə `console.log` heç vaxt işləmir. JS sətir-sətir icra olunsaydı, əvvəlcə `'Hello'` çap olunardı."
  },
  {
    q: "Bu kodda `'Howdy'` niyə çap olunmur?",
    code: "console.log('Howdy');\nsaySomething('Hello', 'Hi');\n\nfunction saySomething(greeting, greeting) {\n  'use strict';\n  console.log(greeting);\n}",
    options: [
      '`console.log` sərt rejimdə işləmir',
      'Funksiya hoist olunmadığı üçün çağırış uğursuz olur',
      "Sərt rejim təkrarlanan parametr adını qadağan edir və bu «erkən səhv» icradan əvvəl atılır",
      'Proqramda sintaksis səhvi yoxdur, sadəcə nəticə boşdur'
    ],
    answer: 2,
    why: "Bu, tokenlərin səhv düzülüşü deyil, amma spesifikasiya sərt rejimdə onu **erkən səhv** kimi icradan əvvəl atmağı tələb edir. Mühərrik `'use strict'`-in gövdədə olduğunu parametrləri emal edərkən bilir — deməli kod əvvəlcədən tam parse olunub."
  },
  {
    q: '`ReferenceError` harada və niyə yaranır?',
    code: "function saySomething() {\n  var greeting = 'Hello';\n  {\n    greeting = 'Howdy';\n    let greeting = 'Hi';\n    console.log(greeting);\n  }\n}\nsaySomething();",
    options: [
      "`var greeting = 'Hello'` sətrində, çünki `var` blokda icazəli deyil",
      "`console.log` sətrində, çünki `greeting` iki dəfə elan olunub",
      "Səhv yoxdur, `'Hi'` çap olunur",
      "`greeting = 'Howdy'` sətrində, çünki bu ad növbəti sətirdəki `let greeting`-ə aiddir və hələ TDZ-dədir"
    ],
    answer: 3,
    why: "Blokdakı `greeting` artıq kompilyasiya zamanı `let greeting`-ə bağlanıb. Bəyannamə sətrinə çatmamış ona müraciət Temporal Dead Zone (TDZ) səbəbindən `ReferenceError` verir."
  },
  {
    q: '«`let` və `const` hoist olunmur» iddiası haqqında kitab nə deyir?',
    options: [
      'Doğrudur — TDZ məhz bunu göstərir',
      'Yanlışdır — onlar da hoist olunur, sadəcə bəyannaməyə qədər TDZ-də qalırlar',
      'Yalnız `const` üçün doğrudur',
      'Yalnız qeyri-sərt rejimdə doğrudur'
    ],
    answer: 1,
    why: 'Müəllif açıq xəbərdarlıq edir: bu iddia dəqiq deyil. `let`/`const` da scope-un əvvəlində qeydiyyata alınır, amma ilkinləşdirilmir; bəyannaməyə qədər TDZ-dədir. Ətraflısı 5-ci fəsildə.'
  },
  {
    q: 'Nümunə proqramda neçə *target* istinadı var?',
    code: "var students = [ /* .. */ ];\n\nfunction getStudentName(studentID) {\n  for (let student of students) {\n    if (student.id == studentID) {\n      return student.name;\n    }\n  }\n}\n\nvar nextStudent = getStudentName(73);\nconsole.log(nextStudent);",
    options: ['3', '4', '5', '6'],
    answer: 2,
    why: '`students = [..]`, `nextStudent = ..`, dövrdəki `student`, `73`-ün `studentID` parametrinə mənimsədilməsi və `function getStudentName` bəyannaməsi — cəmi beş target. Qalanları source-dur.'
  },
  {
    q: '`getStudentName(73)` çağırışında gizli target mənimsətməsi hansıdır?',
    options: [
      '`getStudentName` dəyişəninə yeni funksiya yazılır',
      '`73` arqumenti `studentID` parametrinə mənimsədilir',
      '`console` obyektinə dəyər yazılır',
      'Burada target yoxdur, yalnız source var'
    ],
    answer: 1,
    why: 'Funksiya çağırışında arqument parametrə mənimsədilir — bu, target istinadıdır. `getStudentName` özü isə burada source-dur (funksiya dəyəri oxunur).'
  },
  {
    q: 'Nümunədəki `id`, `name` və `log` nədir?',
    options: [
      'Target istinadları',
      'Source istinadları',
      'Qlobal dəyişənlər',
      'Xassələr — dəyişən istinadı deyil'
    ],
    answer: 3,
    why: '`student.id`, `student.name`, `console.log` — bunlar obyekt xassələridir, ona görə scope qaydalarına aid deyil.'
  },
  {
    q: '`eval(..)` və `with` haqqında hansı doğrudur?',
    options: [
      'Qeyri-sərt rejimdə scope-u icra anında dəyişə bilirlər; sərt rejimdə bu imkan yoxdur',
      'Hər ikisi performansı yaxşılaşdırır',
      'Yalnız sərt rejimdə işləyirlər',
      'Scope-u yalnız kompilyasiya zamanı dəyişirlər'
    ],
    answer: 0,
    why: '`eval` icra anında `var`/`function` bəyannaməsi əlavə edə bilir, `with` obyekti scope-a çevirir. Hər ikisi performansa və oxunaqlılığa zərərlidir, sərt rejimdə isə bu «hiylələr» mümkün deyil.'
  },
  {
    q: 'Leksik scope nə ilə müəyyən olunur?',
    options: [
      'Funksiyanın harada çağırıldığı ilə',
      'Funksiya, blok və dəyişən bəyannamələrinin bir-birinə nisbətən harada yazıldığı ilə',
      'Proqramın icra vaxtındakı şəraitlə',
      '`this` açar sözünün dəyəri ilə'
    ],
    answer: 1,
    why: '«Leksik scope»un əsas ideyası: o, tamamilə kodun yazıldığı yerlə — funksiyaların, blokların və bəyannamələrin yerləşməsi ilə idarə olunur.'
  },
  {
    q: '`let` ilə elan olunan dəyişən hansı scope-a bağlanır?',
    options: [
      'Həmişə qlobal scope-a',
      'Ən yaxın əhatə edən funksiyaya',
      'Ən yaxın əhatə edən `{ .. }` blokuna',
      'Çağırış yerindəki scope-a'
    ],
    answer: 2,
    why: '`let`/`const` blok səviyyəli bəyannamədir və ən yaxın `{ .. }` blokuna bağlanır; `var` isə ən yaxın funksiyaya.'
  },
  {
    q: 'Kompilyasiya zamanı scope-lar üçün yaddaş ayrılırmı?',
    options: [
      'Bəli, bütün scope-lar kompilyasiyada yaradılır',
      'Xeyr — kompilyasiya yalnız scope-ların xəritəsini qurur, scope-lar isə icra zamanı, hər dəfə işə düşəndə yaradılır',
      'Yalnız qlobal scope üçün ayrılır',
      'Yalnız `var` dəyişənləri üçün ayrılır'
    ],
    answer: 1,
    why: 'Kompilyasiya proqramın nəyə ehtiyacı olacağının planını (xəritəsini) qurur. Scope-lar isə icra anında, hər dəfə həmin scope işə düşəndə yaradılır — bu, closure-u anlamağın açarıdır.'
  }
];
