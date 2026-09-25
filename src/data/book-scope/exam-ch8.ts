import type { ExamQuestion } from '../books';

export const exam8: ExamQuestion[] = [
  {
    q: 'İnkapsulyasiyanın məqsədi nədir?',
    options: [
      'Kodu daha qısa yazmaq',
      'Ortaq məqsədə xidmət edən datanı və davranışı bir yerə toplamaq və görünməyə nəzarət etmək',
      'Yalnız sinifləri istifadə etmək',
      'Bütün dəyişənləri qlobal etmək'
    ],
    answer: 1,
    why: 'İnkapsulyasiya OO-dan daha fundamentaldır: ortaq məqsədli data və funksiyaları birləşdirir. JS-də görünmə nəzarəti (POLE) ən çox leksik scope ilə həyata keçirilir.'
  },
  {
    q: 'Modulu nə səciyyələndirir?',
    options: [
      'Yalnız funksiyaların bir yerə toplanması',
      'Əlaqəli data və funksiyalar, gizli (private) detallarla açıq public API arasında bölgü, həmçinin state',
      'Yalnız ayrıca faylda olması',
      '`class` açar sözünün istifadəsi'
    ],
    answer: 1,
    why: 'Modul qruplaşdırma, state (vəziyyət) və görünmə nəzarətini (private/public) birləşdirir.'
  },
  {
    q: 'Bu `Utils` obyekti nədir?',
    code: 'var Utils = {\n  cancelEvt(evt) { /* .. */ },\n  wait(ms) { /* .. */ },\n  isValidEmail(email) { /* .. */ }\n};',
    options: ['Modul', 'Namespace — state-i olmayan funksiyaların qruplaşdırılması', 'Data strukturu', 'Singleton modul'],
    answer: 1,
    why: 'Funksiyaları bir yerə toplamaq yaxşı təcrübədir, amma data (state) olmadığı üçün bu, modul deyil, namespace-dir.'
  },
  {
    q: '`records` massivi və `getName` metodu olan adi `Student` obyekti niyə modul sayılmır?',
    options: [
      'Onun metodları yoxdur',
      '`records` açıq əlçatandır — görünmə nəzarəti (POLE) yoxdur, ona görə bu, data strukturudur',
      'O, IIFE ilə yaradılmayıb',
      '`this` istifadə edir'
    ],
    answer: 1,
    why: 'Onda data və funksionallıq var, amma gizlilik yoxdur. Modul olmaq üçün data public API-nin arxasında gizlədilməlidir.'
  },
  {
    q: 'Klassik modulda `records` necə gizli qalır, amma `getName` ona çata bilir?',
    code: 'var Student = (function defineStudent(){\n  var records = [ /* .. */ ];\n  var publicAPI = { getName };\n  return publicAPI;\n\n  function getName(studentID) { /* records istifadə edir */ }\n})();',
    options: [
      '`records` qlobaldır',
      '`records` IIFE-nin scope-undadır; `getName` onun üzərində closure saxlayır və yalnız `publicAPI` çölə qaytarılır',
      '`records` `publicAPI`-nin xassəsidir',
      '`Student` obyekti `records`-u kopyalayır'
    ],
    answer: 1,
    why: 'Modul tərifi funksiyasının içindəki hər şey standart olaraq gizlidir. Yalnız qaytarılan public API obyektinə əlavə olunanlar çölə açılır, onlar da gizli state üzərində closure saxlayır.'
  },
  {
    q: 'Modulu IIFE ilə təyin etmək nə deməkdir?',
    options: [
      'Modulun bir neçə nüsxəsi yaradıla bilər',
      'Modulun yalnız bir mərkəzi nüsxəsi (singleton) olur',
      'Modul asinxron olur',
      'Modul qlobal scope-u dəyişir'
    ],
    answer: 1,
    why: 'IIFE yalnız bir dəfə işləyir, ona görə modulun tək nüsxəsi yaranır — «singleton».'
  },
  {
    q: 'Modul fabriki (module factory) singleton IIFE-dən nə ilə fərqlənir?',
    options: [
      'Fərq yoxdur',
      'Adi funksiyadır — hər çağırışda daxili scope-un və closure-un yeni nüsxəsi ilə yeni modul nüsxəsi yaradır',
      'Yalnız Node-da işləyir',
      'Public API qaytarmır'
    ],
    answer: 1,
    why: '`defineStudent()` IIFE yox, adi funksiya olanda onu bir neçə dəfə çağırıb müstəqil nüsxələr (məsələn, `fullTime`) almaq olar.'
  },
  {
    q: 'Hansı klassik modulun tərifinə aid DEYİL?',
    options: [
      'Xarici scope olmalıdır (adətən ən azı bir dəfə işləyən modul fabriki)',
      'Daxili scope-da state-i təmsil edən ən azı bir gizli məlumat olmalıdır',
      'Public API-də gizli state üzərində closure-u olan ən azı bir funksiya qaytarılmalıdır',
      'Modul mütləq ayrıca faylda olmalıdır'
    ],
    answer: 3,
    why: 'Klassik modul istənilən kodla bir faylda ola bilər. Fayl əsaslı olmaq CommonJS və ESM modullarının xüsusiyyətidir.'
  },
  {
    q: 'CommonJS modulunun yuxarı səviyyəsində elan olunan `records` hansı scope-dadır?',
    options: [
      'Qlobal scope-da',
      'Modulun scope-unda — standart olaraq gizlidir',
      '`module.exports`-da',
      'Heç bir scope-da'
    ],
    answer: 1,
    why: 'Node hər faylı funksiyaya bükür (4-cü fəsil), ona görə yuxarı səviyyə qlobal deyil. Nəyisə açmaq üçün `module.exports`-a xassə əlavə olunur.'
  },
  {
    q: 'Müəllif CommonJS-də bir neçə export-u birdən təyin etmək üçün nəyi tövsiyə edir?',
    options: [
      '`module.exports = { ... }` ilə obyekti əvəz etmək',
      '`Object.assign(module.exports, { ... })` — mövcud obyektin üzərinə kopyalamaq',
      '`exports = { ... }`',
      '`global.exports = { ... }`'
    ],
    answer: 1,
    why: 'Obyekti əvəz etmək, xüsusən dövri asılılıqlarda, gözlənilməz davranışa səbəb ola bilər. `Object.assign` xassələri mövcud `module.exports` obyektinə dayaz kopyalayır.'
  },
  {
    q: 'Eyni CommonJS modulunu iki dəfə `require(..)` etsən nə olur?',
    options: [
      'Modulun iki müstəqil nüsxəsi yaranır',
      'Eyni tək (singleton) modul nüsxəsinə ikinci istinad alırsan',
      'Səhv atılır',
      'Modul yenidən icra olunur və state sıfırlanır'
    ],
    answer: 1,
    why: 'CommonJS modulları singleton kimi davranır: neçə dəfə `require` etsən də, eyni ortaq nüsxəyə istinad alırsan.'
  },
  {
    q: 'ES modulları haqqında hansı doğrudur?',
    options: [
      'Onları `"use strict"` olmadan qeyri-sərt rejimdə yazmaq olar',
      'Fayl əsaslıdır, nüsxələri singleton-dur, hər şey standart olaraq gizlidir və həmişə sərt rejimdədir',
      '`export` funksiyanın içində yazıla bilər',
      'Hər `import` modulun yeni nüsxəsini yaradır'
    ],
    answer: 1,
    why: 'ESM faylları avtomatik sərt rejimdədir və qeyri-sərt rejimdə təyin etməyin yolu yoxdur. `import`/`export` yalnız yuxarı səviyyədə ola bilər.'
  },
  {
    q: '`export function getName() {}` formasında `getName` hoist olunurmu?',
    options: [
      'Xeyr, `export` hoisting-i söndürür',
      'Bəli — bu, həm də ixrac olunan `function` bəyannaməsidir, function hoisting işləyir',
      'Yalnız default export olanda',
      'Yalnız CommonJS-də'
    ],
    answer: 1,
    why: '`export` açar sözü önündə olsa da, bu, yenə function bəyannaməsidir və `getName` modulun bütün scope-u boyu əlçatandır.'
  },
  {
    q: '`import getName from "./students.js"` hansı export-u gətirir?',
    options: [
      '`getName` adlı named export-u',
      'Modulun default export-unu',
      'Bütün export-ları',
      'Heç birini — `{ }` olmadan import səhvdir'
    ],
    answer: 1,
    why: '`{ }` olmayan import default export-u gətirir. Named export üçün `import { getName } from ...` yazılır.'
  },
  {
    q: '`import { getName as getStudentName } from "..."` nə edir?',
    options: [
      'Modulun daxilində `getName`-in adını dəyişir',
      'Named import-u cari modulda `getStudentName` adı ilə istifadə etməyə imkan verir',
      'İki ayrı import yaradır',
      'Default export-u gətirir'
    ],
    answer: 1,
    why: '`as` açar sözü import olunan bağlamanın cari moduldakı adını dəyişir; ixrac edən modula təsir etmir.'
  },
  {
    q: '`import * as Student from "..."` nədir?',
    options: [
      'Default import',
      'Namespace import — default və adlı bütün export-ları tək identifikator altında toplayır',
      'Dinamik import',
      'CommonJS `require` ilə eynidir'
    ],
    answer: 1,
    why: '`*` API-yə ixrac olunan hər şeyi götürür və `Student.getName(..)` kimi istifadə olunur — bu, klassik modulların formasına ən çox bənzəyir.'
  },
  {
    q: 'Kitaba görə modulların arxasındakı «sehr» nədir?',
    options: [
      'Bandlerlər',
      'Leksik scope sistemindən istifadə edən closure-lar — modul state-i məhz onlarla qorunur',
      '`this` bağlamaları',
      'Qlobal obyekt'
    ],
    answer: 1,
    why: 'Modul nümunəsi kitabın yekunudur: POLE «standart olaraq gizli» mövqeyini verir, modul state-inin qorunmasını isə leksik scope üzərində qurulan closure-lar təmin edir.'
  }
];
