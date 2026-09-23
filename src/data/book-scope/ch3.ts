import type { BookChapter } from '../books';

export const ch3: BookChapter = {
  id: 'ch3',
  no: 3,
  title: 'The Scope Chain',
  titleAz: 'Scope zənciri',
  sum: 'Axtarışın əslində kompilyasiyada həll olunması, shadowing və onun qadağan halları, funksiya adının scope-u və arrow funksiyalar.',
  sections: [
    {
      id: 'intro',
      heading: 'Chapter 3: The Scope Chain',
      headingAz: 'Fəsil 3: Scope zənciri',
      blocks: [
        {
          en: 'Chapters 1 and 2 laid down a concrete definition of lexical scope (and its parts) and illustrated helpful metaphors for its conceptual foundation. Before proceeding with this chapter, find someone else to explain (written or aloud), in your own words, what lexical scope is and why it\'s useful to understand.',
          az: '1-ci və 2-ci fəsillər leksik scope-un (və onun hissələrinin) konkret tərifini verdi və onun konseptual təməli üçün faydalı metaforlar göstərdi. Bu fəslə keçməzdən əvvəl kimisə tap və ona öz sözlərinlə (yazılı və ya şifahi) leksik scope-un nə olduğunu və onu anlamağın niyə faydalı olduğunu izah et.'
        },
        {
          en: 'Now it\'s time to dig into the nuts and bolts, so expect that things will get a lot more detailed from here forward. Stick with it, though, because these discussions really hammer home just how much we all don\'t know about scope, yet.',
          az: 'İndi incəliklərə enmək vaxtıdır, ona görə gözlə ki, bundan sonra hər şey xeyli ətraflı olacaq. Amma dayan, çünki bu müzakirələr scope haqqında hələ nə qədər az bildiyimizi çox yaxşı göstərir.'
        },
        {
          en: 'The connections between scopes that are nested within other scopes is called the [[scope-chain]], which determines the path along which variables can be accessed. The chain is directed, meaning the lookup moves upward/outward only.',
          az: 'Bir-birinin içində yerləşən scope-lar arasındakı əlaqələrə [[scope-chain]] deyilir; o, dəyişənlərə hansı yolla çatmaq mümkün olduğunu müəyyən edir. Zəncirin istiqaməti var: axtarış yalnız yuxarı/çölə doğru hərəkət edir.'
        }
      ],
      note: 'Fəslin ana fikri bir cümlədir: **zəncir yalnız yuxarı gedir**. Qalan hər şey (shadowing, funksiya adları, arrow funksiyalar) bu qaydanın nəticəsidir.\n\nMüəllifin məsləhətini ciddi qəbul et — leksik scope-u başqasına izah edə bilmirsənsə, müsahibədə də izah edə bilməyəcəksən.'
    },
    {
      id: 'lookup',
      heading: '"Lookup" Is (Mostly) Conceptual',
      headingAz: '«Axtarış» (əsasən) konseptualdır',
      blocks: [
        {
          en: 'In Chapter 2, we described the runtime access of a variable as a "lookup," where the Engine has to start by asking the current scope\'s Scope Manager if it knows about an identifier/variable, and proceeding upward/outward back through the chain of nested scopes (toward the global scope) until found, if ever. The lookup stops as soon as the first matching named declaration in a scope bucket is found.',
          az: '2-ci fəsildə dəyişənə icra zamanı müraciəti «axtarış» kimi təsvir etdik: Mühərrik əvvəlcə cari scope-un Scope Manager-indən identifikatoru/dəyişəni tanıyıb-tanımadığını soruşur, sonra tapılana qədər (əgər tapılarsa) iç-içə scope-lar zənciri ilə yuxarı/çölə (qlobal scope-a doğru) gedir. Axtarış scope vedrəsində ilk uyğun adlı bəyannamə tapılan kimi dayanır.'
        },
        {
          en: 'This suggestion of a runtime lookup process works well for conceptual understanding, but it\'s not actually how things usually work in practice.',
          az: 'İcra zamanı axtarış təsəvvürü konseptual anlayış üçün yaxşı işləyir, lakin praktikada işlər adətən belə getmir.'
        },
        {
          en: 'The color of a marble\'s bucket (aka, meta information of what scope a variable originates from) is usually determined during the initial compilation processing. Because lexical scope is pretty much finalized at that point, a marble\'s color will not change based on anything that can happen later during runtime.',
          az: 'Mərmərin vedrəsinin rəngi (yəni dəyişənin hansı scope-dan gəldiyi barədə meta-məlumat) adətən ilkin kompilyasiya emalı zamanı müəyyən olunur. Leksik scope bu nöqtədə demək olar ki, yekunlaşdığı üçün mərmərin rəngi sonradan icra zamanı baş verə biləcək heç nəyə görə dəyişmir.'
        },
        {
          en: 'In other words, Engine doesn\'t need to lookup through a bunch of scopes to figure out which scope bucket a variable comes from. That information is already known! Avoiding the need for a runtime lookup is a key optimization benefit of lexical scope.',
          az: 'Başqa sözlə, Mühərrikin dəyişənin hansı scope vedrəsindən gəldiyini anlamaq üçün bir çox scope-u axtarmasına ehtiyac yoxdur. Bu məlumat artıq məlumdur! İcra zamanı axtarışa ehtiyacın olmaması leksik scope-un əsas optimallaşdırma üstünlüyüdür.'
        },
        {
          en: 'But in what case would a marble\'s color ever not be known during compilation? Consider a reference to a variable that isn\'t declared in any lexically available scopes in the current file — each file is its own separate program from the perspective of JS compilation. If no declaration is found, that\'s not necessarily an error. Another file (program) in the runtime may indeed declare that variable in the shared global scope.',
          az: 'Bəs hansı halda mərmərin rəngi kompilyasiya zamanı məlum olmaya bilər? Cari faylda heç bir leksik əlçatan scope-da elan olunmayan dəyişənə istinadı düşün — JS kompilyasiyası baxımından hər fayl ayrıca proqramdır. Bəyannamə tapılmırsa, bu, mütləq səhv deyil. İcra mühitindəki başqa fayl (proqram) həmin dəyişəni ümumi qlobal scope-da elan edə bilər.'
        },
        {
          en: 'Any reference to a variable that\'s initially undeclared is left as an uncolored marble during that file\'s compilation; this color cannot be determined until other relevant file(s) have been compiled and the application runtime commences. However, this lookup would only be needed once per variable at most, since nothing else during runtime could later change that marble\'s color.',
          az: 'Əvvəlcə elan olunmamış dəyişənə hər istinad həmin faylın kompilyasiyası zamanı rəngsiz mərmər kimi qalır; bu rəng digər aidiyyəti fayllar kompilyasiya olunub tətbiqin icrası başlayana qədər müəyyən edilə bilməz. Lakin bu axtarış hər dəyişən üçün ən çoxu bir dəfə lazım olur, çünki icra zamanı başqa heç nə həmin mərmərin rəngini sonradan dəyişə bilməz.'
        }
      ],
      note: 'Burada iki ayrı fikir var:\n\n1. **Scope zənciri runtime-da hər dəfə gəzilmir** — mühərrik dəyişənin hansı scope-dan gəldiyini əvvəlcədən bilir. Buna görə dərin iç-içə funksiyalar «yavaş» deyil.\n2. **Hər fayl ayrıca proqramdır** — köhnə `<script>` teqləri qlobal scope vasitəsilə bir-biri ilə «danışırdı». ES modullarında isə hər faylın öz scope-u var, paylaşım yalnız `import`/`export` ilə olur.\n\nİkinci məqam 4-cü fəslin (qlobal scope) mövzusudur.',
      terms: ['esm']
    },
    {
      id: 'shadowing',
      heading: 'Shadowing',
      headingAz: 'Shadowing — kölgələmə',
      blocks: [
        {
          en: '"Shadowing" might sound mysterious and a little bit sketchy. But don\'t worry, it\'s completely legit!',
          az: '«Shadowing» (kölgələmə) sirli və bir az şübhəli səslənə bilər. Amma narahat olma, bu, tamamilə qanunidir!'
        },
        {
          en: 'Where having different lexical scope buckets starts to matter more is when you have two or more variables, each in different scopes, with the same lexical names. A single scope cannot have two or more variables with the same name; such multiple references would be assumed as just one variable.',
          az: 'Fərqli leksik scope vedrələrinin olması daha çox o zaman önəm qazanır ki, hər biri fərqli scope-da olan, eyni adlı iki və ya daha çox dəyişənin olur. Bir scope-da eyni adlı iki və ya daha çox dəyişən ola bilməz; belə çoxsaylı istinadlar tək dəyişən sayılar.'
        },
        {
          code: 'var studentName = \'Suzy\';\n\nfunction printStudent(studentName) {\n  studentName = studentName.toUpperCase();\n  console.log(studentName);\n}\n\nprintStudent(\'Frank\');       // FRANK\nprintStudent(studentName);   // SUZY\nconsole.log(studentName);    // Suzy'
        },
        {
          en: 'The `studentName` variable on line 1 (the `var studentName = ..` statement) creates a RED(1) marble. The same named variable is declared as a BLUE(2) marble on line 3, the parameter in the `printStudent(..)` function definition. All three `studentName` references inside the function will be BLUE(2).',
          az: '1-ci sətirdəki `studentName` dəyişəni (`var studentName = ..` ifadəsi) QIRMIZI(1) mərmər yaradır. Eyni adlı dəyişən 3-cü sətirdə, `printStudent(..)` funksiyasının tərifindəki parametr kimi MAVİ(2) mərmər olaraq elan olunur. Funksiyanın içindəki üç `studentName` istinadının hamısı MAVİ(2) olacaq.'
        },
        {
          en: 'This is a key aspect of lexical scope behavior, called [[shadowing]]. The BLUE(2) `studentName` variable (parameter) shadows the RED(1) `studentName`. So, the parameter is shadowing the (shadowed) global variable. Repeat that sentence to yourself a few times to make sure you have the terminology straight!',
          az: 'Bu, leksik scope davranışının əsas xüsusiyyətlərindən biridir və [[shadowing]] adlanır. MAVİ(2) `studentName` dəyişəni (parametr) QIRMIZI(1) `studentName`-i kölgələyir. Yəni parametr (kölgələnmiş) qlobal dəyişəni kölgələyir. Terminologiyanı düz başa düşdüyünə əmin olmaq üçün bu cümləni özünə bir neçə dəfə təkrarla!'
        },
        {
          en: 'When you choose to shadow a variable from an outer scope, one direct impact is that from that scope inward/downward (through any nested scopes) it\'s now impossible for any marble to be colored as the shadowed variable. It\'s lexically impossible to reference the global `studentName` anywhere inside of the `printStudent(..)` function (or from any nested scopes).',
          az: 'Xarici scope-dakı dəyişəni kölgələməyi seçəndə birbaşa nəticələrdən biri budur: həmin scope-dan içəri/aşağı (bütün iç-içə scope-lar boyunca) heç bir mərmər artıq kölgələnmiş dəyişənin rəngini ala bilməz. `printStudent(..)` funksiyasının içində (və ya istənilən iç-içə scope-dan) qlobal `studentName`-ə leksik olaraq müraciət etmək mümkün deyil.'
        }
      ],
      note: 'Shadowing gündəlik React kodunda çox tez-tez olur və çox vaxt bug mənbəyidir:\n\n```js\nconst [user, setUser] = useState(null);\nusers.map((user) => <Row key={user.id} user={user} />);\n// içəridəki `user` state-dəki `user`-i kölgələyir\n```\n\nBu, səhv deyil, amma oxuyanı çaşdırır. ESLint-in `no-shadow` qaydası məhz bunu tutur. Məsləhət: kölgələmə şüurlu qərar olsun, təsadüf yox.',
      terms: ['eslint']
    },
    {
      id: 'unshadowing',
      heading: 'Global Unshadowing Trick',
      headingAz: 'Qlobal dəyişəni «kölgədən çıxarmaq» hiyləsi',
      blocks: [
        {
          en: 'Please beware: leveraging the technique I\'m about to describe is not very good practice, as it\'s limited in utility, confusing for readers of your code, and likely to invite bugs to your program. I\'m covering it only because you may run across this behavior in existing programs.',
          az: 'Diqqət: indi təsvir edəcəyim texnikadan istifadə yaxşı təcrübə deyil — faydası məhduddur, kodunu oxuyanları çaşdırır və proqramına bug gətirə bilər. Ondan yalnız ona görə danışıram ki, mövcud proqramlarda bu davranışa rast gələ bilərsən.'
        },
        {
          en: 'In the global scope, `var` declarations and `function` declarations also expose themselves as properties (of the same name as the identifier) on the [[global-object]] — essentially an object representation of the global scope. If you\'ve written JS for a browser environment, you probably recognize the global object as `window`.',
          az: 'Qlobal scope-da `var` və `function` bəyannamələri həm də [[global-object]] üzərində (identifikatorla eyni adlı) xassə kimi görünür — bu, mahiyyətcə qlobal scope-un obyekt təsviridir. Brauzer mühiti üçün JS yazmısansa, yəqin ki, qlobal obyekti `window` kimi tanıyırsan.'
        },
        {
          code: 'var studentName = \'Suzy\';\n\nfunction printStudent(studentName) {\n  console.log(studentName);\n  console.log(window.studentName);\n}\n\nprintStudent(\'Frank\');\n// "Frank"\n// "Suzy"'
        },
        {
          en: 'The `window.studentName` is a mirror of the global `studentName` variable, not a separate snapshot copy. Changes to one are still seen from the other, in either direction. This little "trick" only works for accessing a global scope variable (not a shadowed variable from a nested scope), and even then, only one that was declared with `var` or `function`.',
          az: '`window.studentName` qlobal `studentName` dəyişəninin güzgüsüdür, ayrıca surəti deyil. Birindəki dəyişiklik hər iki istiqamətdə o birindən görünür. Bu kiçik «hiylə» yalnız qlobal scope dəyişəninə (iç-içə scope-dakı kölgələnmiş dəyişənə yox) çatmaq üçün işləyir, həm də yalnız `var` və ya `function` ilə elan olunmuş dəyişən üçün.'
        },
        {
          caption: 'Yalnız `var` və `function` qlobal obyektdə güzgülənir',
          code: 'var one = 1;\nlet notOne = 2;\nconst notTwo = 3;\nclass notThree {}\n\nconsole.log(window.one);        // 1\nconsole.log(window.notOne);     // undefined\nconsole.log(window.notTwo);     // undefined\nconsole.log(window.notThree);   // undefined'
        },
        {
          en: '## Copying Is Not Accessing',
          az: '## Kopyalamaq çıxış demək deyil'
        },
        {
          code: 'var special = 42;\n\nfunction lookingFor(special) {\n  var another = {\n    special: special\n  };\n  function keepLooking() {\n    var special = 3.141592;\n    console.log(special);\n    console.log(another.special);   // Ooo, tricky!\n    console.log(window.special);\n  }\n  keepLooking();\n}\n\nlookingFor(112358132134);\n// 3.141592\n// 112358132134\n// 42'
        },
        {
          en: '`special: special` is copying the value of the `special` parameter variable into another container (a property of the same name). That doesn\'t mean we\'re accessing the parameter `special`; it means we\'re accessing the copy of the value it had at that moment. We cannot reassign the BLUE(2) `special` parameter to a different value from inside `keepLooking()`.',
          az: '`special: special` `special` parametr dəyişəninin dəyərini başqa konteynerə (eyni adlı xassəyə) kopyalayır. Bu, `special` parametrinə çatdığımız demək deyil; bu, onun həmin andakı dəyərinin surətinə çatdığımız deməkdir. `keepLooking()`-in içindən MAVİ(2) `special` parametrinə başqa dəyər mənimsədə bilmərik.'
        },
        {
          en: 'What if we\'d used objects or arrays as the values instead of the numbers? No. Mutating the contents of the object value via a reference copy is not the same thing as lexically accessing the variable itself. We still can\'t reassign the BLUE(2) `special` parameter.',
          az: 'Bəs rəqəmlər əvəzinə dəyər kimi obyekt və ya massiv istifadə etsəydik? Yox. Obyekt dəyərinin məzmununu istinad surəti vasitəsilə dəyişmək dəyişənin özünə leksik çıxışla eyni şey deyil. MAVİ(2) `special` parametrinə yenə də yeni dəyər mənimsədə bilmərik.'
        }
      ],
      note: 'Praktik nəticə: müasir kodda `window.x` ilə qlobal dəyişənə çatmaq demək olar ki, heç vaxt lazım olmur. `let`/`const` ümumiyyətlə `window`-a düşmür.\n\n«Kopyalamaq çıxış deyil» fikri isə React üçün çox vacibdir: `useEffect`-in içində state-in **o renderdəki** dəyərini görürsən — surətini. Yeni dəyəri görmək üçün yeni render (yeni closure) lazımdır.',
      terms: ['closure', 'useeffect']
    },
    {
      id: 'illegal-shadowing',
      heading: 'Illegal Shadowing',
      headingAz: 'Qadağan olunmuş kölgələmə',
      blocks: [
        {
          en: 'Not all combinations of declaration shadowing are allowed. `let` can shadow `var`, but `var` cannot shadow `let`:',
          az: 'Bəyannamə kölgələməsinin bütün kombinasiyalarına icazə verilmir. `let` `var`-ı kölgələyə bilər, lakin `var` `let`-i kölgələyə bilməz:'
        },
        {
          code: 'function something() {\n  var special = \'JavaScript\';\n  {\n    let special = 42;   // totally fine shadowing\n  }\n}\n\nfunction another() {\n  {\n    let special = \'JavaScript\';\n    {\n      var special = \'JavaScript\';\n      // ^^^ Syntax Error\n    }\n  }\n}'
        },
        {
          en: 'The real reason it\'s raised as a `SyntaxError` is because the `var` is basically trying to "cross the boundary" of (or hop over) the `let` declaration of the same name, which is not allowed. That boundary-crossing prohibition effectively stops at each function boundary, so this variant raises no exception:',
          az: 'Bunun `SyntaxError` kimi atılmasının əsl səbəbi budur ki, `var` mahiyyətcə eyni adlı `let` bəyannaməsinin «sərhədini keçməyə» (onun üstündən tullanmağa) çalışır və buna icazə verilmir. Sərhəd keçmə qadağası hər funksiya sərhədində dayanır, ona görə bu variant heç bir istisna atmır:'
        },
        {
          code: 'function another() {\n  {\n    let special = \'JavaScript\';\n    ajax(\'https://some.url\', function callback() {\n      // totally fine shadowing\n      var special = \'JavaScript\';\n    });\n  }\n}'
        },
        {
          en: '**Summary:** `let` (in an inner scope) can always shadow an outer scope\'s `var`. `var` (in an inner scope) can only shadow an outer scope\'s `let` if there is a function boundary in between.',
          az: '**Yekun:** `let` (daxili scope-da) həmişə xarici scope-un `var`-ını kölgələyə bilər. `var` (daxili scope-da) xarici scope-un `let`-ini yalnız aralarında funksiya sərhədi olduqda kölgələyə bilər.'
        }
      ],
      note: 'Səbəbi sadədir: `var` blok scope-u tanımır, özünü **bütün funksiyaya** elan edir. Deməli, o, içindəki bloklardakı `let`-lə eyni «otaqda» toqquşur. Funksiya sərhədi isə yeni otaq açır.\n\nPraktik qayda: yeni kodda `var` yazma — bu cür tələlərin hamısı öz-özünə yox olur.',
      terms: ['block-scope', 'function-scope']
    },
    {
      id: 'function-name-scope',
      heading: 'Function Name Scope',
      headingAz: 'Funksiya adının scope-u',
      blocks: [
        {
          en: 'A `function askQuestion() { .. }` declaration will create an identifier in the enclosing scope named `askQuestion`. What about `var askQuestion = function(){ .. };`? The same is true for the variable `askQuestion` being created. But since it\'s a function expression — a function definition used as value instead of a standalone declaration — the function itself will not "hoist" (see Chapter 5).',
          az: '`function askQuestion() { .. }` bəyannaməsi əhatə edən scope-da `askQuestion` adlı identifikator yaradır. Bəs `var askQuestion = function(){ .. };`? Yaradılan `askQuestion` dəyişəni üçün də eyni şey doğrudur. Lakin bu, funksiya ifadəsi olduğu üçün — müstəqil bəyannamə deyil, dəyər kimi istifadə olunan funksiya tərifi — funksiyanın özü «hoist» olunmur (bax: 5-ci fəsil).'
        },
        {
          en: 'One major difference between function declarations and function expressions is what happens to the name identifier of the function. For formal function declarations, the name identifier ends up in the outer/enclosing scope. But in a [[named-function-expression]], the name is declared as an identifier inside the function itself:',
          az: 'Funksiya bəyannamələri ilə funksiya ifadələri arasındakı əsas fərqlərdən biri funksiyanın ad identifikatorunun taleyidir. Rəsmi funksiya bəyannamələrində ad identifikatoru xarici/əhatə edən scope-a düşür. Lakin [[named-function-expression]]-da ad funksiyanın öz içində identifikator kimi elan olunur:'
        },
        {
          code: 'var askQuestion = function ofTheTeacher() {\n  console.log(ofTheTeacher);\n};\n\naskQuestion();\n// function ofTheTeacher()...\n\nconsole.log(ofTheTeacher);\n// ReferenceError: ofTheTeacher is not defined'
        },
        {
          en: 'Not only is `ofTheTeacher` declared inside the function rather than outside, but it\'s also defined as read-only. In strict-mode, assigning to it is reported as a `TypeError`; in non-strict-mode, such an assignment fails silently with no exception.',
          az: '`ofTheTeacher` nəinki çöldə yox, funksiyanın içində elan olunur, həm də yalnız oxunan kimi təyin olunur. Sərt rejimdə ona dəyər yazmaq `TypeError` kimi bildirilir; qeyri-sərt rejimdə isə belə mənimsətmə heç bir istisna olmadan səssizcə uğursuz olur.'
        },
        {
          en: 'A function expression with a name identifier is referred to as a "named function expression," but one without a name identifier is referred to as an "anonymous function expression." Anonymous function expressions clearly have no name identifier that affects either scope.',
          az: 'Ad identifikatoru olan funksiya ifadəsi «adlı funksiya ifadəsi», ad identifikatoru olmayan isə «anonim funksiya ifadəsi» adlanır. Anonim funksiya ifadələrinin, təbii ki, heç bir scope-a təsir edən ad identifikatoru yoxdur.'
        }
      ],
      note: 'Adlı funksiya ifadəsinin praktik faydaları:\n\n- **Stack trace**-də `anonymous` əvəzinə ad görünür — debug xeyli asanlaşır.\n- Funksiya özünü adı ilə çağıra bilər (rekursiya), xarici dəyişən yenidən mənimsədilsə belə.\n\n```js\nconst fact = function f(n) { return n <= 1 ? 1 : n * f(n - 1); };\n```\n\nReact-də `export default function UserCard()` yazmaq da eyni səbəbdəndir: DevTools-da komponentin adı görünür.',
      terms: ['function-hoisting', 'devtools']
    },
    {
      id: 'arrow-functions',
      heading: 'Arrow Functions',
      headingAz: 'Arrow funksiyalar',
      blocks: [
        {
          en: 'ES6 added an additional function expression form to the language, called [[arrow-function]]. The `=>` arrow function doesn\'t require the word `function` to define it. Also, the `( .. )` around the parameter list is optional in some simple cases. Likewise, the `{ .. }` around the function body is optional in some cases. And when the `{ .. }` are omitted, a return value is sent out without using a `return` keyword.',
          az: 'ES6 dilə əlavə funksiya ifadəsi forması gətirdi: [[arrow-function]]. `=>` arrow funksiyasını təyin etmək üçün `function` sözü lazım deyil. Həmçinin bəzi sadə hallarda parametr siyahısının ətrafındakı `( .. )` məcburi deyil. Eyni şəkildə bəzi hallarda funksiya gövdəsinin ətrafındakı `{ .. }` da məcburi deyil. `{ .. }` buraxılanda isə dəyər `return` açar sözü olmadan qaytarılır.'
        },
        {
          caption: 'Arrow funksiyaların bir neçə forması',
          code: '() => 42;\nid => id.toUpperCase();\n(id,name) => ({ id, name });\n(...args) => {\n  return args[args.length - 1];\n};'
        },
        {
          en: 'Arrow functions are lexically anonymous, meaning they have no directly related identifier that references the function. The assignment to `askQuestion` creates an inferred name of "askQuestion", but that\'s not the same thing as being non-anonymous.',
          az: 'Arrow funksiyalar leksik olaraq anonimdir, yəni funksiyaya istinad edən birbaşa bağlı identifikatorları yoxdur. `askQuestion`-a mənimsətmə «askQuestion» adını çıxarsa da (inferred name), bu, anonim olmamaqla eyni şey deyil.'
        },
        {
          en: 'The real reason I bring up arrow functions is because of the common but incorrect claim that arrow functions somehow behave differently with respect to lexical scope from standard `function` functions. This is incorrect.',
          az: 'Arrow funksiyalardan danışmağımın əsl səbəbi geniş yayılmış, lakin yanlış iddiadır: guya arrow funksiyalar leksik scope baxımından adi `function` funksiyalarından fərqli davranır. Bu, yanlışdır.'
        },
        {
          en: 'Other than being anonymous (and having no declarative form), `=>` arrow functions have the same lexical scope rules as `function` functions do. An arrow function, with or without `{ .. }` around its body, still creates a separate, inner nested bucket of scope.',
          az: 'Anonim olmaları (və bəyannamə formalarının olmaması) istisna olmaqla, `=>` arrow funksiyaları `function` funksiyaları ilə eyni leksik scope qaydalarına malikdir. Arrow funksiya — gövdəsinin ətrafında `{ .. }` olsa da, olmasa da — yenə ayrıca, daxili iç-içə scope vedrəsi yaradır.'
        }
      ],
      note: 'Diqqət: arrow funksiyaların **real** fərqi scope-da deyil, [[this]]-dədir — onların öz `this`-i yoxdur, xarici `this`-i götürürlər. Həmçinin öz `arguments`-ləri yoxdur və `new` ilə çağırıla bilməzlər.\n\nMüsahibədə «arrow funksiya ilə adi funksiyanın fərqi nədir?» sualına «scope» yox, «`this`, `arguments`, `new`» cavabı gözlənilir.'
    },
    {
      id: 'backing-out',
      heading: 'Backing Out',
      headingAz: 'Geri çəkilərək',
      blocks: [
        {
          en: 'When a function (declaration or expression) is defined, a new scope is created. The positioning of scopes nested inside one another creates a natural scope hierarchy throughout the program, called the scope chain. The scope chain controls variable access, directionally oriented upward and outward.',
          az: 'Funksiya (bəyannamə və ya ifadə) təyin olunanda yeni scope yaranır. Scope-ların bir-birinin içində yerləşməsi proqram boyu təbii scope iyerarxiyası yaradır; buna scope zənciri deyilir. Scope zənciri dəyişənlərə çıxışı idarə edir və istiqaməti yuxarı və çölə doğrudur.'
        },
        {
          en: 'Each new scope offers a clean slate, a space to hold its own set of variables. When a variable name is repeated at different levels of the scope chain, shadowing occurs, which prevents access to the outer variable from that point inward.',
          az: 'Hər yeni scope təmiz vərəq, öz dəyişənlər dəstini saxlamaq üçün yer təqdim edir. Dəyişən adı scope zəncirinin fərqli səviyyələrində təkrarlananda shadowing baş verir və bu, həmin nöqtədən içəriyə doğru xarici dəyişənə çıxışın qarşısını alır.'
        }
      ],
      note: 'Fəsli üç sətirlə yadda saxla:\n\n```text\n1. Hər funksiya/blok yeni scope yaradır → zəncir yuxarı gedir\n2. Eyni ad daxildə təkrarlanırsa → xarici dəyişən kölgədə qalır\n3. var let-in sərhədini keçə bilməz; arrow funksiyanın scope-u adi funksiyadakı kimidir\n```'
    }
  ]
};
