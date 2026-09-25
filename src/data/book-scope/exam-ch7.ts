import type { ExamQuestion } from '../books';

export const exam7: ExamQuestion[] = [
  {
    q: 'Kitaba görə closure nəyin davranışıdır?',
    options: [
      'Obyektlərin və siniflərin',
      'Yalnız funksiyaların',
      'Bütün dəyişənlərin',
      'Yalnız modulların'
    ],
    answer: 1,
    why: 'Closure yalnız funksiyalarda olur. Obyektin və ya sinfin closure-u yoxdur (sinfin metodlarının ola bilər).'
  },
  {
    q: 'Closure-un müşahidə olunması üçün funksiya harada çağırılmalıdır?',
    options: [
      'Təyin olunduğu eyni scope-da',
      'Təyin olunduğu yerdən fərqli scope zənciri qolunda',
      'Yalnız qlobal scope-da',
      'Harada olursa olsun'
    ],
    answer: 1,
    why: 'Funksiya təyin olunduğu scope-da çağırılırsa, bu, sadəcə leksik scope-dur — closure olsa da, olmasa da davranış eyni olardı.'
  },
  {
    q: '`lookupStudent(..)` bitdikdən sonra `chosenStudents[0]("Hello")` niyə hələ də `students` və `studentID`-yə çata bilir?',
    options: [
      'Bu dəyişənlər qlobaldır',
      'Daxili `greetStudent` onlar üzərində qapanır və onları GC-dən qoruyur',
      'JS funksiyanı yenidən çağırır',
      '`return` dəyişənləri kopyalayır'
    ],
    answer: 1,
    why: 'Closure daxili funksiyaya xarici scope bitdikdən sonra da xarici dəyişənlərə çıxışı saxlamağa imkan verir. Closure olmasaydı, bu dəyişənlər təmizlənər və `ReferenceError` gözlənilərdi.'
  },
  {
    q: '`students.find(student => student.id == studentID)` ifadəsində `studentID` üzərindəki closure-u kim saxlayır?',
    options: [
      '`greetStudent(..)`',
      '`lookupStudent(..)`',
      'Arrow funksiya — o da ayrıca scope (NARINCI(4)) yaradır',
      'Heç kim, `studentID` qlobaldır'
    ],
    answer: 2,
    why: 'Arrow funksiyalar da scope yaradır. `studentID` istinadı arrow funksiyanın içindədir, ona görə closure-u həmin callback saxlayır.'
  },
  {
    q: 'Bu kodda neçə closure var və `add42To(9)` nə qaytarır?',
    code: 'function adder(num1) {\n  return function addTo(num2){\n    return num1 + num2;\n  };\n}\n\nvar add10To = adder(10);\nvar add42To = adder(42);',
    options: [
      'Bir closure (bir tərif var); `19`',
      'İki closure — hər `adder` çağırışı yeni `addTo` nüsxəsi və yeni closure yaradır; `51`',
      'Closure yoxdur; `51`',
      'İki closure; `19`'
    ],
    answer: 1,
    why: 'Closure funksiyanın tək leksik tərifi ilə yox, nüsxəsi ilə bağlıdır. Hər nüsxə öz `num1` üzərində qapanır: `42 + 9 = 51`.'
  },
  {
    q: 'Closure dəyişənin nəyini saxlayır?',
    options: [
      'Funksiya yaradılan andakı dəyərin surətini (snapshot)',
      'Dəyişənin özünə canlı əlaqəni — onu oxumaq və yeniləmək olar',
      'Yalnız ilk mənimsədilən dəyəri',
      'Dəyişənin tipini'
    ],
    answer: 1,
    why: 'Closure snapshot deyil, canlı əlaqədir. `makeCounter` nümunəsində qapanılan `count` hər çağırışda yenilənir.'
  },
  {
    q: 'Bu kod nə çap edir?',
    code: "var studentName = 'Frank';\n\nvar greeting = function hello() {\n  console.log(`Hello, ${ studentName }!`);\n};\n\nstudentName = 'Suzy';\n\ngreeting();",
    options: ['`Hello, Frank!`', '`Hello, Suzy!`', '`Hello, undefined!`', '`ReferenceError`'],
    answer: 1,
    why: '`greeting` `"Frank"` dəyəri üzərində yox, `studentName` dəyişəni üzərində qapanır. Çağırış anında dəyişənin cari dəyəri `"Suzy"`-dir.'
  },
  {
    q: 'Bu kodda `keeps[0]()` nə qaytarır və niyə?',
    code: 'var keeps = [];\n\nfor (var i = 0; i < 3; i++) {\n  keeps[i] = function keepI(){\n    return i;\n  };\n}\n\nkeeps[0]();',
    options: [
      '`0` — funksiya birinci iterasiyada yaradılıb',
      '`3` — `var` ilə yalnız bir `i` var və üç funksiyanın hamısı onun üzərində qapanır',
      '`undefined`',
      '`2`'
    ],
    answer: 1,
    why: 'Hər funksiyanın ayrıca closure-u var, amma hamısı eyni ortaq `i` üzərindədir. Dövrün sonunda `i` `3` olur.'
  },
  {
    q: 'Əvvəlki dövr nümunəsində funksiyaların `0`, `1`, `2` qaytarması üçün ən sadə düzəliş hansıdır?',
    options: [
      '`var i`-ni `const i` ilə əvəz etmək',
      '`var i`-ni `let i` ilə əvəz etmək — hər iterasiya öz `i`-sini alır',
      'Funksiyaları `setTimeout`-a salmaq',
      'Funksiyaları arrow funksiya etmək'
    ],
    answer: 1,
    why: '`for` dövründəki `let` hər iterasiya üçün yeni dəyişən yaradır, ona görə hər closure öz `i`-si üzərində qapanır. Alternativ: hər iterasiyada `let j = i;` yaradıb `j` üzərində qapanmaq.'
  },
  {
    q: 'Ajax callback-i `lookupStudentRecord(..)` çoxdan bitdikdən sonra çağırılanda `studentID`-yə niyə çata bilir?',
    options: [
      '`ajax` onu yadda saxlayır',
      'Closure',
      '`studentID` qlobaldır',
      'Brauzer onu keşləyir'
    ],
    answer: 1,
    why: 'Callback yaradıldığı mühit üzərində qapanır. Hadisə işləyiciləri, `setTimeout` və `fetch().then()` də eyni səbəbdən işləyir.'
  },
  {
    q: 'Hansı nümunədə müşahidə olunan closure VAR?',
    options: [
      'Daxili funksiya xarici funksiyanın içində dərhal çağırılır',
      'Daxili funksiya yalnız qlobal dəyişənə istinad edir',
      'Daxili funksiya qaytarılır, sonra çöldən çağırılır və xarici funksiyanın parametrinə istinad edir',
      'Daxili funksiya qaytarılır, amma heç vaxt çağırılmır'
    ],
    answer: 2,
    why: 'Tərifin üç şərti: funksiya olmalıdır, xarici scope-dan dəyişənə istinad etməlidir və dəyişəndən fərqli scope zənciri qolunda çağırılmalıdır. Qlobal dəyişənlər üzərində müşahidə olunan closure olmur.'
  },
  {
    q: 'Closure-un saxladığı dəyişən nə vaxt GC ilə təmizlənə bilər?',
    options: [
      'Xarici funksiya bitən kimi',
      'Həmin dəyişən üzərində qapanan bütün funksiya istinadları atılanda',
      'Heç vaxt',
      'Səhifə yenilənəndə'
    ],
    answer: 1,
    why: 'Closure funksiya nüsxəsinə bağlıdır. Son istinad qalana qədər dəyişən yaşayır — ona görə artıq lazım olmayan hadisə işləyicilərinin abunəliyini ləğv etmək vacibdir.'
  },
  {
    q: 'Konseptual olaraq closure necə sayılır və reallıqda nə baş verir?',
    options: [
      'Scope üzrə; mühərriklər həmişə bütün scope-u saxlayır',
      'Dəyişən üzrə; reallaşdırmada isə scope üzrədir və mühərrik könüllü optimallaşdırma ilə istifadə olunmayan dəyişənləri çıxara bilər',
      'Dəyişən üzrə; mühərriklər həmişə yalnız istinad olunan dəyişənləri saxlayır',
      'Heç biri, closure yalnız funksiyanın özünü saxlayır'
    ],
    answer: 1,
    why: '`eval(..)` nümunəsi göstərir ki, bəzən bütün scope saxlanmalıdır. Optimallaşdırma spesifikasiyanın tələbi deyil, ona görə ona tam güvənmək olmaz.'
  },
  {
    q: '`manageStudentGrades` nümunəsində böyük `studentRecords` massivinin yaddaşda qalmaması üçün müəllif nə təklif edir?',
    options: [
      'Massivi `delete` ilə silmək',
      '`studentRecords = null;` — dəyişən closure scope-unda qalsa belə, artıq böyük massivə istinad etmir',
      'Funksiyanı ikinci dəfə çağırmaq',
      '`Object.freeze(studentRecords)`'
    ],
    answer: 1,
    why: 'Dəyişəni closure scope-undan silə bilmərik, amma onun dəyərini atmaqla massivin GC ilə təmizlənməsinə imkan veririk. Optimallaşdırmaya güvənməkdən bu daha təhlükəsizdir.'
  },
  {
    q: 'Closure-un alternativ (reallaşdırma) modelinə görə nə baş verir?',
    options: [
      'Funksiya nüsxəsi xarici scope-a köçür və gizli əlaqə aparır',
      'Funksiya nüsxəsi öz scope mühitində yerində qalır; çölə yalnız ona istinad gedir, istinad qaldıqca bütün mühit canlı qalır',
      'Funksiya hər çağırışda yenidən kompilyasiya olunur',
      'Closure yalnız sinxron callback-lərdə olur'
    ],
    answer: 1,
    why: 'Bu modeldə closure funksiya nüsxəsini bütöv scope mühiti ilə birlikdə ona ən azı bir istinad qaldıqca canlı saxlamaqdır. Müşahidə olunan nəticələr hər iki modeldə eynidir.'
  },
  {
    q: '`setupButtonHandler(btn)` versiyası ilk `makeRequest(evt)` versiyasından nə ilə yaxşıdır?',
    options: [
      'Daha az kod yazılır',
      '`data-kind` atributu bir dəfə oxunur və closure-da saxlanılır — hər klikdə DOM oxunmur, dəyişən də qlobal deyil',
      'Hadisə işləyicisi sinxron olur',
      'Ajax sorğusu daha tez göndərilir'
    ],
    answer: 1,
    why: 'Closure işləyiciyə əvvəlcədən müəyyən olunmuş məlumatı yadda saxlamağa imkan verir (səmərəlilik) və `recordKind`-in açıqlığını məhdudlaşdırır (oxunaqlılıq, POLE).'
  },
  {
    q: 'Qismən tətbiq (partial application) nədir?',
    options: [
      'Funksiyanı yalnız bir hissəsini icra etmək',
      'Bir neçə giriş tələb edən funksiyanın bəzi girişlərini əvvəlcədən verib, qalanlarını sonra vermək; ilkin girişlər closure-da yadda saxlanılır',
      'Funksiyanın adını qismən dəyişmək',
      'Funksiyanı iki fayla bölmək'
    ],
    answer: 1,
    why: '`defineHandler(requestURL, requestData)` URL və məlumatı qabaqcadan alır və `evt`-i sonra gözləyən funksiya qaytarır. Currying də eyni ideyaya əsaslanır.'
  }
];
