import type { ExamQuestion } from '../books';

export const exam2: ExamQuestion[] = [
  {
    q: 'Mərmərlər metaforunda mərmərin (dəyişənin) rəngi nə ilə müəyyən olunur?',
    options: [
      'Ona müraciət edilən scope-un rəngi ilə',
      'Onun elan olunduğu scope-un (vedrənin) rəngi ilə',
      'Dəyişənin tipi ilə',
      'Dəyişənin dəyəri ilə'
    ],
    answer: 1,
    why: 'Hər mərmər elan olunduğu qabarcığın (vedrənin) rəngini alır, müraciət edildiyi scope-un rəngini yox. Məsələn, dövrdəki `students` istinadı QIRMIZI(1) mərmərdir.'
  },
  {
    q: 'YAŞIL(3) scope-dakı (`for` dövrü) ifadə hansı mərmərlərə çıxış əldə edə bilər?',
    options: [
      'Yalnız YAŞIL(3)',
      'YAŞIL(3) və MAVİ(2)',
      'QIRMIZI(1), MAVİ(2) və YAŞIL(3)',
      'Yalnız QIRMIZI(1)'
    ],
    answer: 2,
    why: 'İstinada cari scope-dakı və ondan yuxarıdakı/xaricdəki bütün scope-lardakı bəyannamələr üçün icazə var. YAŞIL(3) ən içəridədir, ona görə hər üçünü görür.'
  },
  {
    q: 'MAVİ(2) scope-dakı (`getStudentName` funksiyası) ifadə `student` (YAŞIL) dəyişəninə müraciət edə bilərmi?',
    options: [
      'Bəli, bütün scope-lar bir-birini görür',
      'Bəli, amma yalnız sərt rejimdə',
      'Xeyr — xaricdəki scope içəridəki (iç-içə) scope-un bəyannamələrini görmür',
      'Yalnız dövr bitdikdən sonra'
    ],
    answer: 2,
    why: 'Görünmə bir istiqamətlidir: içəridən çölə baxmaq olar, çöldən içəriyə yox. MAVİ(2) yalnız MAVİ(2) və QIRMIZI(1) mərmərləri görür.'
  },
  {
    q: 'Scope qabarcıqları nə vaxt müəyyən olunur?',
    options: [
      'Kompilyasiya zamanı — funksiya və blokların harada yazıldığına görə',
      'Hər funksiya çağırışında, çağırış yerinə görə',
      'Proqram bitəndə',
      'Brauzer səhifəni yükləyəndə, DOM-a görə'
    ],
    answer: 0,
    why: 'Qabarcıqlar kompilyasiya zamanı kodun quruluşuna görə müəyyən olunur. Hər qabarcıq tamamilə öz valideyninin içindədir — scope heç vaxt qismən iki xarici scope-da olmur.'
  },
  {
    q: 'JS `var students = [ .. ]` ifadəsini necə görür?',
    options: [
      'Tək əməliyyat kimi — icra zamanı hamısı birdən baş verir',
      'İki ayrı əməliyyat kimi: bəyannaməni Kompilyator, mənimsətməni icra zamanı Mühərrik emal edir',
      'Yalnız mənimsətmə kimi, bəyannamə nəzərə alınmır',
      'Üç əməliyyat kimi: lexing, parsing və mənimsətmə'
    ],
    answer: 1,
    why: 'Kompilyator Scope Manager-dən soruşub dəyişəni elan edir. İcra zamanı isə Mühərrik dəyişəni tapır, `undefined` ilə ilkinləşdirir və massivi ona mənimsədir.'
  },
  {
    q: 'Scope Manager-in vəzifəsi nədir?',
    options: [
      'Kodu tokenlərə bölmək',
      'Proqramı əvvəldən sonadək icra etmək',
      'Bəyan olunmuş identifikatorların axtarış siyahısını saxlamaq və onlara çıxış qaydalarını tətbiq etmək',
      'Maşın kodu yaratmaq'
    ],
    answer: 2,
    why: 'Engine — kompilyasiya və icraya cavabdehdir, Compiler — parse və kod generasiyasına, Scope Manager isə dəyişənlərin siyahısına və onlara çıxış qaydalarına.'
  },
  {
    q: 'Kompilyator artıq elan olunmuş dəyişənin eyni scope-da yenidən `var` bəyannaməsinə rast gələndə nə edir?',
    options: [
      'SyntaxError atır',
      'Köhnə dəyişəni silib yenisini yaradır',
      'Bəyannaməni ötürür — Scope Manager-in görəcəyi iş qalmır',
      'Yeni scope yaradır'
    ],
    answer: 2,
    why: 'Kompilyator soruşur: «heç eşitmisən?» Cavab «hə»dirsə, bəyannamə faktiki olaraq ötürülür. Yalnız «yox» olanda yeni dəyişən yaradılır.'
  },
  {
    q: 'Funksiyanı 3 dəfə çağırsan, onun scope-u neçə dəfə yaradılır?',
    options: [
      'Bir dəfə, kompilyasiya zamanı',
      'Üç dəfə — hər icrada öz Scope Manager nüsxəsi ilə',
      'Heç vaxt, funksiyalar qlobal scope-dan istifadə edir',
      'Yalnız ilk çağırışda'
    ],
    answer: 1,
    why: 'Hər scope hər dəfə icra olunanda öz Scope Manager nüsxəsini alır. Buna görə hər çağırışın öz lokal dəyişənlər dəsti olur.'
  },
  {
    q: 'Scope icra olunmağa başlayanda dəyişənlər necə ilkinləşdirilir?',
    options: [
      '`function` → funksiya istinadı, `var` → `undefined`, `let`/`const` → ilkinləşdirilmir (TDZ)',
      'Hamısı `undefined` ilə',
      '`var` → ilkinləşdirilmir, `let`/`const` → `undefined`',
      'Heç biri, hamısı bəyannamə sətrində yaradılır'
    ],
    answer: 0,
    why: 'Scope-un əvvəlində bütün identifikatorlar qeydiyyata alınır (variable hoisting). Funksiya bəyannamələri dərhal funksiyaya bağlanır, `var` `undefined` alır, `let`/`const` isə bəyannaməyə qədər TDZ-də qalır.'
  },
  {
    q: 'Bu kod nə qaytarır?',
    code: 'typeof doesntExist;',
    options: ['`ReferenceError` atılır', '`"undefined"`', '`"not defined"`', '`null`'],
    answer: 1,
    why: '`typeof` həm elan olunub dəyəri olmayan, həm də heç elan olunmamış dəyişən üçün `"undefined"` sətrini qaytarır. Kitab bunu «undefined qarışıqlığı» adlandırır.'
  },
  {
    q: 'Səhv mesajındakı «XYZ is not defined» əslində nə deməkdir?',
    options: [
      'Dəyişən var, amma dəyəri `undefined`-dir',
      'Dəyişən heç bir leksik əlçatan scope-da elan olunmayıb (undeclared)',
      'Dəyişən `null`-dur',
      'Dəyişən silinib'
    ],
    answer: 1,
    why: '«Not defined» = «undeclared», yəni uyğun bəyannamə tapılmadı. «Undefined» isə dəyişən tapılıb, sadəcə hələ dəyəri yoxdur.'
  },
  {
    q: 'Qeyri-sərt rejimdə bu kod nə çap edir?',
    code: "function getStudentName() {\n  nextStudent = 'Suzy';\n}\ngetStudentName();\nconsole.log(nextStudent);",
    options: [
      '`ReferenceError`',
      '`undefined`',
      "`'Suzy'` — qlobal Scope Manager təsadüfi qlobal dəyişən yaradır",
      'Heç nə çap olunmur'
    ],
    answer: 2,
    why: 'Target tapılmayanda və sərt rejim yoxdursa, qlobal Scope Manager «kömək edib» qlobal dəyişən yaradır. Kitab bunu «Yuck» adlandırır — bu, çox çətin tapılan buglara aparır.'
  },
  {
    q: 'Eyni kod sərt rejimdə (`\'use strict\'`) nə edərdi?',
    options: [
      "Yenə `'Suzy'` çap edərdi",
      '`ReferenceError` atardı — elan olunmamış dəyişənə mənimsətmə səhvdir',
      '`undefined` çap edərdi',
      'Dəyişəni funksiyanın scope-unda yaradardı'
    ],
    answer: 1,
    why: 'Sərt rejimdə qlobal Scope Manager belə cavab verir: «heç eşitməmişəm, `ReferenceError` atmalıyam». Ona görə həmişə sərt rejim işlət və dəyişənləri rəsmi elan et.'
  },
  {
    q: 'Bina metaforunda dəyişən axtarışı necə gedir?',
    options: [
      'Ən üst mərtəbədən (qlobal) aşağıya doğru',
      'Cari mərtəbədən başlayır, tapılmayanda bir mərtəbə yuxarı qalxır; ən üst mərtəbədə (qlobal) tapılsa da, tapılmasa da dayanır',
      'Bütün mərtəbələr eyni anda yoxlanır',
      'Yalnız cari mərtəbədə axtarılır'
    ],
    answer: 1,
    why: 'Birinci mərtəbə hazırda icra olunan scope-dur, ən üst mərtəbə — qlobal scope. Axtarış liftlə yuxarı gedir və qlobal scope-da mütləq dayanır.'
  }
];
