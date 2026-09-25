import type { BookChapter } from '../books';
import { exam8 } from './exam-ch8';

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
          en: "In this chapter, we wrap up the main text of the book by exploring one of the most important code organization patterns in all of programming: the module. As we'll see, modules are inherently built from what we've already covered: the payoff for your efforts in learning lexical scope and closure.",
          az: 'Bu fəsildə bütün proqramlaşdırmada ən vacib kod təşkili nümunələrindən birini — modulu — araşdıraraq kitabın əsas mətnini yekunlaşdırırıq. Görəcəyimiz kimi, modullar mahiyyətcə artıq keçdiyimiz şeylərdən qurulur: bu, leksik scope və closure-u öyrənməyə sərf etdiyin zəhmətin bəhrəsidir.'
        },
        {
          en: "We've examined every angle of lexical scope, from the breadth of the global scope down through nested block scopes, into the intricacies of the variable lifecycle. Then we leveraged lexical scope to understand the full power of closure.",
          az: 'Leksik scope-un hər tərəfinə baxdıq: qlobal scope-un genişliyindən iç-içə blok scope-lara qədər, dəyişənin həyat dövrünün incəliklərinə qədər. Sonra closure-un bütün gücünü anlamaq üçün leksik scope-dan istifadə etdik.'
        },
        {
          en: "Take a moment to reflect on how far you've come in this journey so far; you've taken big steps in getting to know JS more deeply!",
          az: 'Bir anlıq bu səyahətdə nə qədər irəlilədiyini düşün; JS-i daha dərindən tanımaqda böyük addımlar atmısan!'
        },
        {
          en: 'The central theme of this book has been that understanding and mastering scope and closure is key in properly structuring and organizing our code, especially the decisions on where to store information in variables.',
          az: 'Bu kitabın əsas mövzusu budur: scope-u və closure-u anlamaq və mənimsəmək kodumuzu düzgün qurmağın və təşkil etməyin, xüsusən məlumatı dəyişənlərdə harada saxlamaq qərarlarının açarıdır.'
        },
        {
          en: 'Our goal in this final chapter is to appreciate how modules embody the importance of these topics, elevating them from abstract concepts to concrete, practical improvements in building programs.',
          az: 'Bu son fəsildə məqsədimiz modulların bu mövzuların vacibliyini necə təcəssüm etdirdiyini, onları mücərrəd anlayışlardan proqram qurmaqda konkret, praktik təkmilləşdirmələrə necə yüksəltdiyini qiymətləndirməkdir.'
        }
      ]
    },
    {
      id: 'encapsulation',
      heading: 'Encapsulation and Least Exposure (POLE)',
      headingAz: 'İnkapsulyasiya və ən az açıqlıq (POLE)',
      blocks: [
        {
          en: "[[encapsulation]] is often cited as a principle of object-oriented (OO) programming, but it's more fundamental and broadly applicable than that. The goal of encapsulation is the bundling or co-location of information (data) and behavior (functions) that together serve a common purpose.",
          az: '[[encapsulation]] tez-tez obyekt yönümlü (OO) proqramlaşdırmanın prinsipi kimi göstərilir, amma o, bundan daha fundamental və geniş tətbiq olunandır. İnkapsulyasiyanın məqsədi birlikdə ortaq məqsədə xidmət edən məlumatı (datanı) və davranışı (funksiyaları) bir yerə toplamaq və ya yan-yana yerləşdirməkdir.'
        },
        {
          en: 'Independent of any syntax or code mechanisms, the spirit of encapsulation can be realized in something as simple as using separate files to hold bits of the overall program with common purpose. If we bundle everything that powers a list of search results into a single file called "search-list.js", we\'re encapsulating that part of the program.',
          az: 'Hər hansı sintaksis və ya kod mexanizmindən asılı olmayaraq, inkapsulyasiyanın ruhu proqramın ortaq məqsədli hissələrini ayrı fayllarda saxlamaq kimi sadə bir şeydə də reallaşa bilər. Axtarış nəticələri siyahısını işlədən hər şeyi «search-list.js» adlı tək faylda toplasaq, proqramın həmin hissəsini inkapsulyasiya edirik.'
        },
        {
          en: 'The recent trend in modern front-end programming to organize applications around Component architecture pushes encapsulation even further. For many, it feels natural to consolidate everything that constitutes the search results list — even beyond code, including presentational markup and styling — into a single unit of program logic, something tangible we can interact with. And then we label that collection the "SearchList" component.',
          az: 'Müasir frontend proqramlaşdırmada tətbiqləri Komponent arxitekturası ətrafında təşkil etmək trendi inkapsulyasiyanı daha da irəli aparır. Çoxları üçün axtarış nəticələri siyahısını təşkil edən hər şeyi — koddan kənara çıxaraq, təqdimat markapı və stillər də daxil olmaqla — tək proqram məntiqi vahidində, qarşılıqlı əlaqədə ola biləcəyimiz konkret bir şeydə birləşdirmək təbii görünür. Sonra həmin toplunu «SearchList» komponenti adlandırırıq.'
        },
        {
          en: 'Another key goal is the control of visibility of certain aspects of the encapsulated data and functionality. Recall from Chapter 6 the *least exposure* principle ([[pole]]), which seeks to defensively guard against various dangers of scope over-exposure; these affect both variables and functions. In JS, we most often implement visibility control through the mechanics of lexical scope.',
          az: 'Başqa bir əsas məqsəd inkapsulyasiya olunmuş data və funksionallığın müəyyən tərəflərinin görünməsinə nəzarətdir. 6-cı fəsildən *ən az açıqlıq* prinsipini ([[pole]]) xatırla: o, scope-un həddindən artıq açıqlığının müxtəlif təhlükələrindən müdafiə olunmağa çalışır; bu təhlükələr həm dəyişənlərə, həm də funksiyalara təsir edir. JS-də görünmə nəzarətini ən çox leksik scope mexanizmi ilə həyata keçiririk.'
        },
        {
          en: "The idea is to group alike program bits together, and selectively limit programmatic access to the parts we consider *private* details. What's not considered private is then marked as *public*, accessible to the whole program.",
          az: 'İdeya oxşar proqram hissələrini bir yerə toplamaq və *gizli* detal saydığımız hissələrə proqram çıxışını seçici şəkildə məhdudlaşdırmaqdır. Gizli sayılmayan hər şey isə bütün proqram üçün əlçatan — *açıq* (public) kimi işarələnir.'
        },
        {
          en: "The natural effect of this effort is better code organization. It's easier to build and maintain software when we know where things are, with clear and obvious boundaries and connection points. It's also easier to maintain quality if we avoid the pitfalls of over-exposed data and functionality.",
          az: 'Bu səyin təbii nəticəsi daha yaxşı kod təşkilidir. Şeylərin harada olduğunu bildikdə, aydın və açıq sərhədlər və birləşmə nöqtələri olduqda proqram qurmaq və saxlamaq daha asandır. Həddindən artıq açıq data və funksionallıq tələlərindən qaçsaq, keyfiyyəti qorumaq da asanlaşır.'
        },
        {
          en: 'These are some of the main benefits of organizing JS programs into modules.',
          az: 'Bunlar JS proqramlarını modullara ayırmağın əsas faydalarından bəziləridir.'
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
          en: 'A module is a collection of related data and functions (often referred to as methods in this context), characterized by a division between hidden *private* details and *public* accessible details, usually called the "public API."',
          az: 'Modul əlaqəli data və funksiyaların (bu kontekstdə çox vaxt metod adlanır) toplusudur və gizli *private* detallarla əlçatan *public* detallar arasındakı bölgü ilə səciyyələnir; sonuncular adətən «public API» adlanır.'
        },
        {
          en: 'A module is also stateful: it maintains some information over time, along with functionality to access and update that information.',
          az: 'Modul həm də vəziyyətlidir (stateful): zaman ərzində müəyyən məlumatı saxlayır, həmçinin həmin məlumata çıxış və onu yeniləmək üçün funksionallığa malikdir.'
        },
        {
          en: "> **NOTE:** A broader concern of the module pattern is fully embracing system-level modularization through loose-coupling and other program architecture techniques. That's a complex topic well beyond the bounds of our discussion, but is worth further study beyond this book.",
          az: '> **QEYD:** Modul nümunəsinin daha geniş məsələsi zəif bağlılıq (loose-coupling) və digər proqram arxitekturası texnikaları vasitəsilə sistem səviyyəsində modullaşmanı tam mənimsəməkdir. Bu, müzakirəmizin hüdudlarından xeyli kənara çıxan mürəkkəb mövzudur, amma bu kitabdan sonra əlavə öyrənməyə dəyər.'
        },
        {
          en: "To get a better sense of what a module is, let's compare some module characteristics to useful code patterns that aren't quite modules.",
          az: 'Modulun nə olduğunu daha yaxşı hiss etmək üçün modulun bəzi xüsusiyyətlərini tam modul olmayan faydalı kod nümunələri ilə müqayisə edək.'
        },
        { en: '## Namespaces (Stateless Grouping)', az: '## Namespace-lər (vəziyyətsiz qruplaşdırma)' },
        {
          en: "If you group a set of related functions together, without data, then you don't really have the expected encapsulation a module implies. The better term for this grouping of stateless functions is a namespace:",
          az: 'Bir qrup əlaqəli funksiyanı data olmadan bir yerə toplasan, modulun nəzərdə tutduğu gözlənilən inkapsulyasiya əslində olmur. Vəziyyətsiz funksiyaların bu cür qruplaşdırması üçün daha yaxşı termin namespace-dir (ad məkanı):'
        },
        {
          code: '// namespace, not module\nvar Utils = {\n  cancelEvt(evt) {\n    evt.preventDefault();\n    evt.stopPropagation();\n    evt.stopImmediatePropagation();\n  },\n  wait(ms) {\n    return new Promise(function c(res){\n      setTimeout(res,ms);\n    });\n  },\n  isValidEmail(email) {\n    return /[^@]+@[^@.]+\\.[^@.]+/.test(email);\n  }\n};'
        },
        {
          en: "`Utils` here is a useful collection of utilities, yet they're all state-independent functions. Gathering functionality together is generally good practice, but that doesn't make this a module. Rather, we've defined a `Utils` namespace and organized the functions under it.",
          az: 'Buradakı `Utils` faydalı utilitlər toplusudur, amma hamısı vəziyyətdən asılı olmayan funksiyalardır. Funksionallığı bir yerə toplamaq ümumən yaxşı təcrübədir, lakin bu, onu modul etmir. Əksinə, biz `Utils` namespace-i təyin etmişik və funksiyaları onun altında təşkil etmişik.'
        },
        { en: '## Data Structures (Stateful Grouping)', az: '## Data strukturları (vəziyyətli qruplaşdırma)' },
        {
          en: "Even if you bundle data and stateful functions together, if you're not limiting the visibility of any of it, then you're stopping short of the POLE aspect of encapsulation; it's not particularly helpful to label that a module. Consider:",
          az: 'Data və vəziyyətli funksiyaları bir yerə toplasan belə, onların heç birinin görünməsini məhdudlaşdırmırsansa, inkapsulyasiyanın POLE tərəfinə çatmırsan; bunu modul adlandırmaq xüsusi faydalı deyil. Buna bax:'
        },
        {
          code: '// data structure, not module\nvar Student = {\n  records: [\n    { id: 14, name: "Kyle", grade: 86 },\n    { id: 73, name: "Suzy", grade: 87 },\n    { id: 112, name: "Frank", grade: 75 },\n    { id: 6, name: "Sarah", grade: 91 }\n  ],\n  getName(studentID) {\n    var student = this.records.find(\n      student => student.id == studentID\n    );\n    return student.name;\n  }\n};\n\nStudent.getName(73);\n// Suzy'
        },
        {
          en: "Since `records` is publicly accessible data, not hidden behind a public API, `Student` here isn't really a module.",
          az: '`records` public API-nin arxasında gizlədilməmiş, açıq əlçatan data olduğu üçün buradakı `Student` əslində modul deyil.'
        },
        {
          en: "`Student` does have the data-and-functionality aspect of encapsulation, but not the visibility-control aspect. It's best to label this an instance of a data structure.",
          az: '`Student` inkapsulyasiyanın «data və funksionallıq» tərəfinə malikdir, amma «görünmə nəzarəti» tərəfinə yox. Bunu data strukturunun nüsxəsi adlandırmaq ən yaxşısıdır.'
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
          en: 'To embody the full spirit of the module pattern, we not only need grouping and state, but also access control through visibility (private vs. public).',
          az: 'Modul nümunəsinin tam ruhunu təcəssüm etdirmək üçün bizə təkcə qruplaşdırma və state yox, həm də görünmə vasitəsilə çıxış nəzarəti (private və public) lazımdır.'
        },
        {
          en: 'Let\'s turn `Student` from the previous section into a module. We\'ll start with a form I call the "classic module," which was originally referred to as the "revealing module" when it first emerged in the early 2000s. Consider:',
          az: 'Gəl əvvəlki bölmədəki `Student`-i modula çevirək. «Klassik modul» adlandırdığım formadan başlayacağıq; o, 2000-ci illərin əvvəlində ilk yarananda «revealing module» (açan modul) adlanırdı. Buna bax:'
        },
        {
          code: 'var Student = (function defineStudent(){\n  var records = [\n    { id: 14, name: "Kyle", grade: 86 },\n    { id: 73, name: "Suzy", grade: 87 },\n    { id: 112, name: "Frank", grade: 75 },\n    { id: 6, name: "Sarah", grade: 91 }\n  ];\n\n  var publicAPI = {\n    getName\n  };\n\n  return publicAPI;\n\n  // ************************\n\n  function getName(studentID) {\n    var student = records.find(\n      student => student.id == studentID\n    );\n    return student.name;\n  }\n})();\n\nStudent.getName(73);   // Suzy'
        },
        {
          en: '`Student` is now an instance of a module. It features a public API with a single method: `getName(..)`. This method is able to access the private hidden `records` data.',
          az: '`Student` indi modulun nüsxəsidir. Onun tək metodlu public API-si var: `getName(..)`. Bu metod gizli `records` datasına çata bilir.'
        },
        {
          en: '> **WARNING:** I should point out that the explicit student data being hard-coded into this module definition is just for our illustration purposes. A typical module in your program will receive this data from an outside source, typically loaded from databases, JSON data files, Ajax calls, etc. The data is then injected into the module instance typically through method(s) on the module\'s public API.',
          az: '> **XƏBƏRDARLIQ:** Qeyd etməliyəm ki, tələbə datasının bu modul tərifinə birbaşa yazılması yalnız nümunə üçündür. Proqramındakı tipik modul bu datanı xarici mənbədən — adətən verilənlər bazasından, JSON fayllarından, Ajax çağırışlarından və s. — alacaq. Data sonra adətən modulun public API-sindəki metod(lar) vasitəsilə modul nüsxəsinə ötürülür.'
        },
        { en: 'How does the classic module format work?', az: 'Klassik modul formatı necə işləyir?' },
        {
          en: 'Notice that the instance of the module is created by the `defineStudent()` IIFE being executed. This IIFE returns an object (named `publicAPI`) that has a property on it referencing the inner `getName(..)` function.',
          az: 'Diqqət et ki, modulun nüsxəsi `defineStudent()` IIFE-sinin icrası ilə yaradılır. Bu IIFE daxili `getName(..)` funksiyasına istinad edən xassəsi olan obyekt (`publicAPI` adlı) qaytarır.'
        },
        {
          en: "Naming the object `publicAPI` is stylistic preference on my part. The object can be named whatever you like (JS doesn't care), or you can just return an object directly without assigning it to any internal named variable. More on this choice in Appendix A.",
          az: 'Obyekti `publicAPI` adlandırmaq mənim üslub seçimimdir. Obyektə istədiyin adı verə bilərsən (JS-in fərqi yoxdur) və ya obyekti heç bir daxili adlı dəyişənə mənimsətmədən birbaşa qaytara bilərsən. Bu seçim haqqında ətraflı Əlavə A-da.'
        },
        {
          en: 'From the outside, `Student.getName(..)` invokes this exposed inner function, which maintains access to the inner `records` variable via closure.',
          az: 'Çöldən `Student.getName(..)` bu açılmış daxili funksiyanı çağırır; o isə daxili `records` dəyişəninə closure vasitəsilə çıxışı saxlayır.'
        },
        {
          en: "You don't have to return an object with a function as one of its properties. You could just return a function directly, in place of the object. That still satisfies all the core bits of a classic module.",
          az: 'Xassələrindən biri funksiya olan obyekt qaytarmaq məcburi deyil. Obyektin yerinə birbaşa funksiya qaytara bilərdin. Bu da klassik modulun bütün əsas şərtlərini ödəyir.'
        },
        {
          en: 'By virtue of how lexical scope works, defining variables and functions inside your outer module definition function makes everything *by default* private. Only properties added to the public API object returned from the function will be exported for external public use.',
          az: 'Leksik scope-un işləmə qaydasına görə, dəyişənləri və funksiyaları xarici modul tərifi funksiyasının içində təyin etmək hər şeyi *standart olaraq* gizli edir. Yalnız funksiyanın qaytardığı public API obyektinə əlavə olunan xassələr xarici açıq istifadə üçün ixrac olunur.'
        },
        {
          en: 'The use of an IIFE implies that our program only ever needs a single central instance of the module, commonly referred to as a "singleton." Indeed, this specific example is simple enough that there\'s no obvious reason we\'d need anything more than just one instance of the `Student` module.',
          az: 'IIFE istifadəsi proqramımıza modulun yalnız bir mərkəzi nüsxəsinin lazım olduğunu nəzərdə tutur; bu, adətən «singleton» adlanır. Həqiqətən, bu konkret nümunə kifayət qədər sadədir və `Student` modulunun birdən çox nüsxəsinə ehtiyac duymağımız üçün açıq səbəb yoxdur.'
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
          en: 'But if we did want to define a module that supported multiple instances in our program, we can slightly tweak the code:',
          az: 'Lakin proqramımızda bir neçə nüsxəni dəstəkləyən modul təyin etmək istəsəydik, kodu bir az dəyişə bilərik:'
        },
        {
          code: '// factory function, not singleton IIFE\nfunction defineStudent() {\n  var records = [\n    { id: 14, name: "Kyle", grade: 86 },\n    { id: 73, name: "Suzy", grade: 87 },\n    { id: 112, name: "Frank", grade: 75 },\n    { id: 6, name: "Sarah", grade: 91 }\n  ];\n\n  var publicAPI = {\n    getName\n  };\n\n  return publicAPI;\n\n  // ************************\n\n  function getName(studentID) {\n    var student = records.find(\n      student => student.id == studentID\n    );\n    return student.name;\n  }\n}\n\nvar fullTime = defineStudent();\nfullTime.getName(73);            // Suzy'
        },
        {
          en: 'Rather than specifying `defineStudent()` as an IIFE, we just define it as a normal standalone function, which is commonly referred to in this context as a "module factory" function.',
          az: '`defineStudent()`-i IIFE kimi yazmaq əvəzinə onu sadəcə adi müstəqil funksiya kimi təyin edirik; bu kontekstdə ona adətən «modul fabriki» funksiyası deyilir.'
        },
        {
          en: 'We then call the module factory, producing an instance of the module that we label `fullTime`. This module instance implies a new instance of the inner scope, and thus a new closure that `getName(..)` holds over `records`. `fullTime.getName(..)` now invokes the method on that specific instance.',
          az: 'Sonra modul fabrikini çağırırıq və `fullTime` adlandırdığımız modul nüsxəsini alırıq. Bu modul nüsxəsi daxili scope-un yeni nüsxəsi, deməli `getName(..)`-un `records` üzərində saxladığı yeni closure deməkdir. `fullTime.getName(..)` indi metodu həmin konkret nüsxədə çağırır.'
        },
        { en: '## Classic Module Definition', az: '## Klassik modulun tərifi' },
        {
          en: 'So to clarify what makes something a classic module:\n\n- There must be an outer scope, typically from a module factory function running at least once.\n- The module\'s inner scope must have at least one piece of hidden information that represents state for the module.\n- The module must return on its public API a reference to at least one function that has closure over the hidden module state (so that this state is actually preserved).',
          az: 'Deməli, nəyisə klassik modul edən şərtlər bunlardır:\n\n- Xarici scope olmalıdır — adətən ən azı bir dəfə işləyən modul fabriki funksiyasından.\n- Modulun daxili scope-unda modulun state-ini təmsil edən ən azı bir gizli məlumat olmalıdır.\n- Modul public API-sində gizli modul state-i üzərində closure-u olan ən azı bir funksiyaya istinad qaytarmalıdır (ki, bu state həqiqətən qorunsun).'
        },
        {
          en: "You'll likely run across other variations on this classic module approach, which we'll look at in more detail in Appendix A.",
          az: 'Çox güman ki, bu klassik modul yanaşmasının başqa variantlarına da rast gələcəksən; onlara Əlavə A-da daha ətraflı baxacağıq.'
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
          en: "In Chapter 4, we introduced the CommonJS module format used by Node. Unlike the classic module format described earlier, where you could bundle the module factory or IIFE alongside any other code including other modules, CommonJS modules are file-based; one module per file.",
          az: '4-cü fəsildə Node-un istifadə etdiyi CommonJS modul formatını təqdim etdik. Modul fabrikini və ya IIFE-ni digər modullar da daxil olmaqla istənilən başqa kodla bir yerə yığa bildiyin əvvəlki klassik modul formatından fərqli olaraq, CommonJS modulları fayl əsaslıdır: hər faylda bir modul.'
        },
        { en: "Let's tweak our module example to adhere to that format:", az: 'Gəl modul nümunəmizi bu formata uyğunlaşdıraq:' },
        {
          code: 'module.exports.getName = getName;\n\n// ************************\n\nvar records = [\n  { id: 14, name: "Kyle", grade: 86 },\n  { id: 73, name: "Suzy", grade: 87 },\n  { id: 112, name: "Frank", grade: 75 },\n  { id: 6, name: "Sarah", grade: 91 }\n];\n\nfunction getName(studentID) {\n  var student = records.find(\n    student => student.id == studentID\n  );\n  return student.name;\n}'
        },
        {
          en: "The `records` and `getName` identifiers are in the top-level scope of this module, but that's not the global scope (as explained in Chapter 4). As such, everything here is *by default* private to the module.",
          az: '`records` və `getName` identifikatorları bu modulun yuxarı səviyyəli scope-undadır, amma bu, qlobal scope deyil (4-cü fəsildə izah olunduğu kimi). Buna görə buradakı hər şey *standart olaraq* modul üçün gizlidir.'
        },
        {
          en: 'To expose something on the public API of a CommonJS module, you add a property to the empty object provided as `module.exports`. In some older legacy code, you may run across references to just a bare `exports`, but for code clarity you should always fully qualify that reference with the `module.` prefix.',
          az: 'CommonJS modulunun public API-sində nəyisə açmaq üçün `module.exports` kimi verilən boş obyektə xassə əlavə edirsən. Bəzi köhnə kodlarda sadəcə çılpaq `exports`-a istinadlara rast gələ bilərsən, amma kodun aydınlığı üçün həmin istinadı həmişə tam şəkildə `module.` prefiksi ilə yazmalısan.'
        },
        {
          en: 'For style purposes, I like to put my "exports" at the top and my module implementation at the bottom. But these exports can be placed anywhere. I strongly recommend collecting them all together, either at the top or bottom of your file.',
          az: 'Üslub baxımından «export»larımı yuxarıda, modul reallaşdırmasını isə aşağıda yerləşdirməyi xoşlayıram. Lakin bu export-lar istənilən yerdə ola bilər. Onların hamısını faylın ya yuxarısında, ya da aşağısında bir yerə toplamağı qətiyyətlə tövsiyə edirəm.'
        },
        { en: 'Some developers have the habit of replacing the default exports object, like this:', az: 'Bəzi developerlərin standart exports obyektini belə əvəz etmək vərdişi var:' },
        { code: '// defining a new object for the API\nmodule.exports = {\n  // ..exports..\n};' },
        {
          en: 'There are some quirks with this approach, including unexpected behavior if multiple such modules circularly depend on each other. As such, I recommend against replacing the object. If you want to assign multiple exports at once, using object literal style definition, you can do this instead:',
          az: 'Bu yanaşmanın bəzi qəribəlikləri var, o cümlədən bir neçə belə modul dövri olaraq bir-birindən asılı olanda gözlənilməz davranış. Buna görə obyekti əvəz etməyi tövsiyə etmirəm. Obyekt literalı üslubunda bir neçə export-u birdən mənimsətmək istəyirsənsə, əvəzində bunu edə bilərsən:'
        },
        { code: 'Object.assign(module.exports,{\n  // .. exports ..\n});' },
        {
          en: "What's happening here is defining the `{ .. }` object literal with your module's public API specified, and then `Object.assign(..)` is performing a shallow copy of all those properties onto the existing `module.exports` object, instead of *replacing* it. This is a nice balance of convenience and safer module behavior.",
          az: 'Burada modulunun public API-si göstərilmiş `{ .. }` obyekt literalı təyin olunur, sonra `Object.assign(..)` bütün həmin xassələri mövcud `module.exports` obyektini *əvəz etmədən* onun üzərinə dayaz (shallow) şəkildə kopyalayır. Bu, rahatlıq ilə daha təhlükəsiz modul davranışı arasında yaxşı balansdır.'
        },
        {
          en: 'To include another module instance into your module/program, use Node\'s `require(..)` method. Assuming this module is located at "/path/to/student.js", this is how we can access it:',
          az: 'Moduluna/proqramına başqa modul nüsxəsini daxil etmək üçün Node-un `require(..)` metodundan istifadə et. Bu modulun «/path/to/student.js»-də yerləşdiyini fərz etsək, ona belə müraciət edə bilərik:'
        },
        { code: 'var Student = require("/path/to/student.js");\n\nStudent.getName(73);\n// Suzy' },
        {
          en: '`Student` now references the public API of our example module.',
          az: '`Student` indi nümunə modulumuzun public API-sinə istinad edir.'
        },
        {
          en: 'CommonJS modules behave as singleton instances, similar to the IIFE module definition style presented before. No matter how many times you `require(..)` the same module, you just get additional references to the single shared module instance.',
          az: 'CommonJS modulları əvvəl göstərilən IIFE modul tərifi üslubuna bənzər şəkildə singleton nüsxələr kimi davranır. Eyni modulu neçə dəfə `require(..)` etməyindən asılı olmayaraq, sadəcə tək ortaq modul nüsxəsinə əlavə istinadlar alırsan.'
        },
        {
          en: '`require(..)` is an all-or-nothing mechanism; it includes a reference of the entire exposed public API of the module. To effectively access only part of the API, the typical approach looks like this:',
          az: '`require(..)` «ya hamısı, ya heç nə» mexanizmidir; o, modulun açılmış bütün public API-sinə istinad daxil edir. API-nin yalnız bir hissəsinə faktiki çıxış üçün tipik yanaşma belə görünür:'
        },
        {
          code: 'var getName = require("/path/to/student.js").getName;\n\n// or alternately:\n\nvar { getName } = require("/path/to/student.js");'
        },
        {
          en: "Similar to the classic module format, the publicly exported methods of a CommonJS module's API hold closures over the internal module details. That's how the module singleton state is maintained across the lifetime of your program.",
          az: 'Klassik modul formatında olduğu kimi, CommonJS modulu API-sinin açıq ixrac olunan metodları daxili modul detalları üzərində closure saxlayır. Modulun singleton state-i proqramının bütün ömrü boyu məhz belə qorunur.'
        },
        {
          en: '> **NOTE:** In Node `require("student")` statements, non-absolute paths (`"student"`) assume a ".js" file extension and search "node_modules".',
          az: '> **QEYD:** Node-da `require("student")` ifadələrində mütləq olmayan yollar (`"student"`) «.js» fayl uzantısını fərz edir və «node_modules»-da axtarılır.'
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
          en: 'The ESM format shares several similarities with the CommonJS format. ESM is file-based, and module instances are singletons, with everything private *by default*. One notable difference is that ESM files are assumed to be strict-mode, without needing a `"use strict"` pragma at the top. There\'s no way to define an ESM as non-strict-mode.',
          az: 'ESM formatının CommonJS formatı ilə bir neçə oxşarlığı var. ESM fayl əsaslıdır, modul nüsxələri singleton-dur və hər şey *standart olaraq* gizlidir. Nəzərəçarpan fərqlərdən biri budur ki, ESM faylları yuxarıda `"use strict"` pragmasına ehtiyac olmadan sərt rejimdə sayılır. ESM-i qeyri-sərt rejimdə təyin etməyin yolu yoxdur.'
        },
        {
          en: 'Instead of `module.exports` in CommonJS, ESM uses an `export` keyword to expose something on the public API of the module. The `import` keyword replaces the `require(..)` statement. Let\'s adjust "students.js" to use the ESM format:',
          az: 'CommonJS-dəki `module.exports` əvəzinə ESM modulun public API-sində nəyisə açmaq üçün `export` açar sözündən istifadə edir. `import` açar sözü `require(..)` ifadəsini əvəz edir. Gəl «students.js»-i ESM formatına uyğunlaşdıraq:'
        },
        {
          code: 'export { getName };\n\n// ************************\n\nvar records = [\n  { id: 14, name: "Kyle", grade: 86 },\n  { id: 73, name: "Suzy", grade: 87 },\n  { id: 112, name: "Frank", grade: 75 },\n  { id: 6, name: "Sarah", grade: 91 }\n];\n\nfunction getName(studentID) {\n  var student = records.find(\n    student => student.id == studentID\n  );\n  return student.name;\n}'
        },
        {
          en: 'The only change here is the `export { getName }` statement. As before, `export` statements can appear anywhere throughout the file, though `export` must be at the top-level scope; it cannot be inside any other block or function.',
          az: 'Burada yeganə dəyişiklik `export { getName }` ifadəsidir. Əvvəlki kimi, `export` ifadələri faylın istənilən yerində ola bilər, amma `export` yuxarı səviyyəli scope-da olmalıdır; heç bir başqa blokun və ya funksiyanın içində ola bilməz.'
        },
        {
          en: 'ESM offers a fair bit of variation on how the `export` statements can be specified. For example:',
          az: 'ESM `export` ifadələrinin necə yazıla biləcəyinə dair xeyli variant təklif edir. Məsələn:'
        },
        { code: 'export function getName(studentID) {\n  // ..\n}' },
        {
          en: 'Even though `export` appears before the `function` keyword here, this form is still a `function` declaration that also happens to be exported. That is, the `getName` identifier is *function hoisted* (see Chapter 5), so it\'s available throughout the whole scope of the module.',
          az: 'Burada `export` `function` açar sözündən əvvəl gəlsə də, bu forma yenə də həm də ixrac olunan `function` bəyannaməsidir. Yəni `getName` identifikatoru *function hoisting*-ə məruz qalır (bax: 5-ci fəsil), ona görə modulun bütün scope-u boyu əlçatandır.'
        },
        { en: 'Another allowed variation:', az: 'İcazə verilən başqa bir variant:' },
        { code: 'export default function getName(studentID) {\n  // ..\n}' },
        {
          en: 'This is a so-called "default export," which has different semantics from other exports. In essence, a "default export" is a shorthand for consumers of the module when they `import`, giving them a terser syntax when they only need this single default API member.',
          az: 'Bu, digər export-lardan fərqli semantikası olan sözdə «default export»-dur. Mahiyyətcə «default export» modulu istifadə edənlər üçün `import` edərkən qısa yoldur: onlara yalnız bu tək default API üzvü lazım olanda daha yığcam sintaksis verir.'
        },
        {
          en: 'Non-`default` exports are referred to as "named exports."',
          az: '`default` olmayan export-lar «named export» (adlı export) adlanır.'
        },
        {
          en: 'The `import` keyword — like `export`, it must be used only at the top level of an ESM outside of any blocks or functions — also has a number of variations in syntax. The first is referred to as "named import":',
          az: '`import` açar sözünün də — `export` kimi, o da yalnız ESM-in yuxarı səviyyəsində, heç bir blok və ya funksiyanın xaricində istifadə olunmalıdır — bir sıra sintaksis variantları var. Birincisi «named import» (adlı import) adlanır:'
        },
        { code: 'import { getName } from "/path/to/students.js";\n\ngetName(73);   // Suzy' },
        {
          en: 'As you can see, this form imports only the specifically named public API members from a module (skipping anything not named explicitly), and it adds those identifiers to the top-level scope of the current module. This type of `import` is a familiar style to those used to package imports in languages like Java.',
          az: 'Gördüyün kimi, bu forma moduldan yalnız konkret adı çəkilən public API üzvlərini (açıq adı çəkilməyən hər şeyi ötürərək) import edir və həmin identifikatorları cari modulun yuxarı səviyyəli scope-una əlavə edir. Bu tip `import` Java kimi dillərdə paket importlarına öyrəşənlər üçün tanış üslubdur.'
        },
        {
          en: 'Multiple API members can be listed inside the `{ .. }` set, separated with commas. A named import can also be *renamed* with the `as` keyword:',
          az: '`{ .. }` içində vergüllə ayrılmış bir neçə API üzvü sadalana bilər. Adlı import `as` açar sözü ilə *yenidən adlandırıla* da bilər:'
        },
        { code: 'import { getName as getStudentName }\n  from "/path/to/students.js";\n\ngetStudentName(73);\n// Suzy' },
        { en: 'If `getName` is a "default export" of the module, we can import it like this:', az: '`getName` modulun «default export»-udursa, onu belə import edə bilərik:' },
        { code: 'import getName from "/path/to/students.js";\n\ngetName(73);   // Suzy' },
        {
          en: 'The only difference here is dropping the `{ }` around the import binding. If you want to mix a default import with other named imports:',
          az: 'Burada yeganə fərq import bağlamasının ətrafındakı `{ }`-nin buraxılmasıdır. Default importu digər adlı importlarla qarışdırmaq istəyirsənsə:'
        },
        { code: 'import { default as getName, /* .. others .. */ }\n  from "/path/to/students.js";\n\ngetName(73);   // Suzy' },
        {
          en: 'By contrast, the other major variation on `import` is called "namespace import":',
          az: 'Bunun əksinə, `import`-un digər əsas variantı «namespace import» adlanır:'
        },
        { code: 'import * as Student from "/path/to/students.js";\n\nStudent.getName(73);   // Suzy' },
        {
          en: "As is likely obvious, the `*` imports everything exported to the API, default and named, and stores it all under the single namespace identifier as specified. This approach most closely matches the form of classic modules for most of JS's history.",
          az: 'Yəqin aydındır ki, `*` API-yə ixrac olunan hər şeyi — default və adlıları — import edir və hamısını göstərilən tək namespace identifikatoru altında saxlayır. Bu yanaşma JS tarixinin böyük hissəsində klassik modulların formasına ən çox uyğun gələndir.'
        },
        {
          en: "> **NOTE:** As of the time of this writing, modern browsers have supported ESM for a few years now, but Node's stable'ish support for ESM is fairly recent, and has been evolving for quite a while. The evolution is likely to continue for another year or more; the introduction of ESM to JS back in ES6 created a number of challenging compatibility concerns for Node's interop with CommonJS modules. Consult Node's ESM documentation for all the latest details: https://nodejs.org/api/esm.html",
          az: '> **QEYD:** Bu sətirlər yazılarkən müasir brauzerlər artıq bir neçə ildir ESM-i dəstəkləyirdi, amma Node-un ESM-ə nisbətən stabil dəstəyi olduqca yeni idi və xeyli müddətdir inkişaf edirdi. İnkişafın daha bir il və ya daha çox davam edəcəyi ehtimal olunurdu; ESM-in hələ ES6-da JS-ə gətirilməsi Node-un CommonJS modulları ilə qarşılıqlı işləməsi üçün bir sıra çətin uyğunluq problemləri yaratdı. Ən son detallar üçün Node-un ESM sənədlərinə bax: https://nodejs.org/api/esm.html'
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
          en: "Whether you use the classic module format (browser or Node), CommonJS format (in Node), or ESM format (browser or Node), modules are one of the most effective ways to structure and organize your program's functionality and data.",
          az: 'Klassik modul formatından (brauzer və ya Node), CommonJS formatından (Node-da) və ya ESM formatından (brauzer və ya Node) istifadə etməyindən asılı olmayaraq, modullar proqramının funksionallığını və datasını qurmağın və təşkil etməyin ən effektiv yollarından biridir.'
        },
        {
          en: 'The module pattern is the conclusion of our journey in this book of learning how we can use the rules of lexical scope to place variables and functions in proper locations. POLE is the defensive *private by default* posture we always take, making sure we avoid over-exposure and interact only with the minimal public API surface area necessary.',
          az: 'Modul nümunəsi bu kitabdakı səyahətimizin — dəyişənləri və funksiyaları düzgün yerlərə qoymaq üçün leksik scope qaydalarından necə istifadə edə biləcəyimizi öyrənməyin — yekunudur. POLE həmişə tutduğumuz müdafiə mövqeyidir — *standart olaraq gizli*: həddindən artıq açıqlıqdan qaçmaq və yalnız zəruri minimal public API səthi ilə qarşılıqlı əlaqədə olmaq.'
        },
        {
          en: 'And underneath modules, the *magic* of how all our module state is maintained is closures leveraging the lexical scope system.',
          az: 'Modulların altında isə bütün modul state-imizin necə qorunmasının *sehri* leksik scope sistemindən istifadə edən closure-lardır.'
        },
        {
          en: "That's it for the main text. Congratulations on quite a journey so far! As I've said numerous times throughout, it's a really good idea to pause, reflect, and practice what we've just discussed.",
          az: 'Əsas mətn bununla bitdi. Belə uzun səyahətə görə təbriklər! Kitab boyu dəfələrlə dediyim kimi, dayanmaq, düşünmək və indicə müzakirə etdiklərimizi məşq etmək həqiqətən yaxşı fikirdir.'
        },
        {
          en: "When you're comfortable and ready, check out the appendices, which dig deeper into some of the corners of these topics, and also challenge you with some practice exercises to solidify what you've learned.",
          az: 'Rahat və hazır olanda əlavələrə bax: onlar bu mövzuların bəzi künclərinə daha dərindən enir və öyrəndiklərini möhkəmləndirmək üçün sənə bir neçə məşq tapşırığı da verir.'
        }
      ],
      note: 'Kitabın bütün xətti bir zəncirdir:\n\n```text\nKompilyasiya → leksik scope → scope zənciri → hoisting/TDZ\n→ POLE (ən az açıqlıq) → closure → modul\n```\n\nHər halqa əvvəlkinin üzərində qurulur. İndi React-də `useState`, `useEffect`, custom hook, ESM import-larını gördükdə arxasında dayanan mexanizmi — leksik scope və closure-u — tanıyacaqsan. Növbəti addım: yol xəritəsindəki «Scope, hoisting, closure və TDZ» mövzusunu bu biliklə yenidən oxu.',
      terms: ['closure', 'pole']
    }
  ],
  exam: exam8
};
