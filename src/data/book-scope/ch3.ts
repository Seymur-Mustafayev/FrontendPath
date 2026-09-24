import type { BookChapter } from '../books';
import { exam3 } from './exam-ch3';

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
          en: "Chapters 1 and 2 laid down a concrete definition of *lexical scope* (and its parts) and illustrated helpful metaphors for its conceptual foundation. Before proceeding with this chapter, find someone else to explain (written or aloud), in your own words, what lexical scope is and why it's useful to understand.",
          az: '1-ci və 2-ci fəsillər *leksik scope*-un (və onun hissələrinin) konkret tərifini verdi və onun konseptual təməli üçün faydalı metaforlar göstərdi. Bu fəslə keçməzdən əvvəl kimisə tap və ona öz sözlərinlə (yazılı və ya şifahi) leksik scope-un nə olduğunu və onu anlamağın niyə faydalı olduğunu izah et.'
        },
        {
          en: "That seems like a step you might skip, but I've found it really does help to take the time to reformulate these ideas as explanations to others. That helps our brains digest what we're learning!",
          az: 'Bu, ötürə biləcəyin addım kimi görünə bilər, amma gördüm ki, bu fikirləri başqalarına izah şəklində yenidən formalaşdırmağa vaxt ayırmaq həqiqətən kömək edir. Bu, beynimizə öyrəndiklərimizi həzm etməyə kömək edir!'
        },
        {
          en: "Now it's time to dig into the nuts and bolts, so expect that things will get a lot more detailed from here forward. Stick with it, though, because these discussions really hammer home just how much we all don't know about scope, yet. Make sure to take your time with the text and all the code snippets provided.",
          az: 'İndi incəliklərə enmək vaxtıdır, ona görə gözlə ki, bundan sonra hər şey xeyli ətraflı olacaq. Amma dayan, çünki bu müzakirələr scope haqqında hələ nə qədər az bildiyimizi çox yaxşı göstərir. Mətnə və verilən bütün kod nümunələrinə tələsmədən vaxt ayırdığına əmin ol.'
        },
        {
          en: "To refresh the context of our running example, let's recall the color-coded illustration of the nested scope bubbles, from Chapter 2, Figure 2:",
          az: 'Nümunə proqramımızın kontekstini təzələmək üçün 2-ci fəslin Şəkil 2-sindəki iç-içə scope qabarcıqlarının rəngli təsvirini xatırlayaq:'
        },
        {
          caption: 'Şəkil 2 (2-ci fəsil): Rəngli scope qabarcıqları',
          code: '┌─ RED(1) · global ───────────────────────────────┐\n│ students, getStudentName, nextStudent           │\n│  ┌─ BLUE(2) · getStudentName(..) ─────────────┐  │\n│  │ studentID                                  │  │\n│  │  ┌─ GREEN(3) · for-loop ────────────────┐  │  │\n│  │  │ student                              │  │  │\n│  │  └──────────────────────────────────────┘  │  │\n│  └────────────────────────────────────────────┘  │\n└──────────────────────────────────────────────────┘'
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
          en: 'In Figure 2, notice the color of the `students` variable reference in the `for`-loop. How exactly did we determine that it\'s a RED(1) marble?',
          az: 'Şəkil 2-də `for` dövründəki `students` dəyişən istinadının rənginə diqqət et. Onun QIRMIZI(1) mərmər olduğunu dəqiq necə müəyyən etdik?'
        },
        {
          en: 'In Chapter 2, we described the runtime access of a variable as a "lookup," where the *Engine* has to start by asking the current scope\'s *Scope Manager* if it knows about an identifier/variable, and proceeding upward/outward back through the chain of nested scopes (toward the global scope) until found, if ever. The lookup stops as soon as the first matching named declaration in a scope bucket is found.',
          az: '2-ci fəsildə dəyişənə icra zamanı müraciəti «axtarış» kimi təsvir etdik: *Mühərrik* əvvəlcə cari scope-un *Scope Manager*-indən identifikatoru/dəyişəni tanıyıb-tanımadığını soruşur, sonra tapılana qədər (əgər tapılarsa) iç-içə scope-lar zənciri ilə yuxarı/çölə (qlobal scope-a doğru) gedir. Axtarış scope vedrəsində ilk uyğun adlı bəyannamə tapılan kimi dayanır.'
        },
        {
          en: 'The lookup process thus determined that `students` is a RED(1) marble, because we had not yet found a matching variable name as we traversed the scope chain, until we arrived at the final RED(1) global scope.',
          az: 'Beləliklə, axtarış prosesi `students`-in QIRMIZI(1) mərmər olduğunu müəyyən etdi, çünki scope zənciri boyu irəlilədikcə son QIRMIZI(1) qlobal scope-a çatana qədər uyğun dəyişən adı tapmamışdıq.'
        },
        {
          en: 'Similarly, `studentID` in the `if`-statement is determined to be a BLUE(2) marble.',
          az: 'Eyni qaydada `if` ifadəsindəki `studentID`-nin MAVİ(2) mərmər olduğu müəyyən edilir.'
        },
        {
          en: "This suggestion of a runtime lookup process works well for conceptual understanding, but it's not actually how things usually work in practice.",
          az: 'İcra zamanı axtarış təsəvvürü konseptual anlayış üçün yaxşı işləyir, lakin praktikada işlər adətən belə getmir.'
        },
        {
          en: "The color of a marble's bucket (aka, meta information of what scope a variable originates from) is *usually* determined during the initial compilation processing. Because lexical scope is pretty much finalized at that point, a marble's color will not change based on anything that can happen later during runtime.",
          az: 'Mərmərin vedrəsinin rəngi (yəni dəyişənin hansı scope-dan gəldiyi barədə meta-məlumat) *adətən* ilkin kompilyasiya emalı zamanı müəyyən olunur. Leksik scope bu nöqtədə demək olar ki, yekunlaşdığı üçün mərmərin rəngi sonradan icra zamanı baş verə biləcək heç nəyə görə dəyişmir.'
        },
        {
          en: "Since the marble's color is known from compilation, and it's immutable, this information would likely be stored with (or at least accessible from) each variable's entry in the AST; that information is then used explicitly by the executable instructions that constitute the program's runtime.",
          az: 'Mərmərin rəngi kompilyasiyadan məlum və dəyişməz olduğu üçün bu məlumat, çox güman ki, AST-də hər dəyişənin qeydi ilə birlikdə saxlanılır (və ya heç olmasa oradan əlçatandır); sonra bu məlumatdan proqramın icrasını təşkil edən icra təlimatları açıq şəkildə istifadə edir.'
        },
        {
          en: "In other words, *Engine* (from Chapter 2) doesn't need to lookup through a bunch of scopes to figure out which scope bucket a variable comes from. That information is already known! Avoiding the need for a runtime lookup is a key optimization benefit of lexical scope. The runtime operates more performantly without spending time on all these lookups.",
          az: 'Başqa sözlə, *Mühərrikin* (2-ci fəsildən) dəyişənin hansı scope vedrəsindən gəldiyini anlamaq üçün bir çox scope-u axtarmasına ehtiyac yoxdur. Bu məlumat artıq məlumdur! İcra zamanı axtarışa ehtiyacın olmaması leksik scope-un əsas optimallaşdırma üstünlüyüdür. Bütün bu axtarışlara vaxt sərf etmədən icra daha məhsuldar işləyir.'
        },
        {
          en: 'But I said "...usually determined..." just a moment ago, with respect to figuring out a marble\'s color during compilation. So in what case would it ever *not* be known during compilation?',
          az: 'Amma bir az əvvəl mərmərin rənginin kompilyasiya zamanı müəyyən olunması haqqında «...adətən müəyyən olunur...» dedim. Bəs hansı halda o, kompilyasiya zamanı məlum *olmaya* bilər?'
        },
        {
          en: "Consider a reference to a variable that isn't declared in any lexically available scopes in the current file — see *Get Started*, Chapter 1, which asserts that each file is its own separate program from the perspective of JS compilation. If no declaration is found, that's not *necessarily* an error. Another file (program) in the runtime may indeed declare that variable in the shared global scope.",
          az: 'Cari faylda heç bir leksik əlçatan scope-da elan olunmayan dəyişənə istinadı düşün — *Get Started* kitabının 1-ci fəslinə bax: orada deyilir ki, JS kompilyasiyası baxımından hər fayl ayrıca proqramdır. Bəyannamə tapılmırsa, bu, *mütləq* səhv deyil. İcra mühitindəki başqa fayl (proqram) həmin dəyişəni ümumi qlobal scope-da elan edə bilər.'
        },
        {
          en: 'So the ultimate determination of whether the variable was ever appropriately declared in some accessible bucket may need to be deferred to the runtime.',
          az: 'Deməli, dəyişənin hansısa əlçatan vedrədə lazımi qaydada elan olunub-olunmadığına dair son qərar icra zamanına təxirə salına bilər.'
        },
        {
          en: "Any reference to a variable that's initially *undeclared* is left as an uncolored marble during that file's compilation; this color cannot be determined until other relevant file(s) have been compiled and the application runtime commences. That deferred lookup will eventually resolve the color to whichever scope the variable is found in (likely the global scope).",
          az: 'Əvvəlcə *elan olunmamış* dəyişənə hər istinad həmin faylın kompilyasiyası zamanı rəngsiz mərmər kimi qalır; bu rəng digər aidiyyəti fayllar kompilyasiya olunub tətbiqin icrası başlayana qədər müəyyən edilə bilməz. Təxirə salınmış bu axtarış sonda rəngi dəyişənin tapıldığı scope-a (çox güman ki, qlobal scope-a) görə müəyyən edəcək.'
        },
        {
          en: "However, this lookup would only be needed once per variable at most, since nothing else during runtime could later change that marble's color.",
          az: 'Lakin bu axtarış hər dəyişən üçün ən çoxu bir dəfə lazım olur, çünki icra zamanı başqa heç nə həmin mərmərin rəngini sonradan dəyişə bilməz.'
        },
        {
          en: 'The "Lookup Failures" section in Chapter 2 covers what happens if a marble is ultimately still uncolored at the moment its reference is runtime executed.',
          az: '2-ci fəsildəki «Axtarış uğursuz olanda» bölməsi mərmər istinadı icra olunan anda hələ də rəngsiz qalarsa nə baş verdiyini izah edir.'
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
          en: "Our running example for these chapters uses different variable names across the scope boundaries. Since they all have unique names, in a way it wouldn't matter if all of them were just stored in one bucket (like RED(1)).",
          az: 'Bu fəsillərdəki nümunə proqramımız scope sərhədlərində fərqli dəyişən adlarından istifadə edir. Hamısının adı unikal olduğu üçün, bir mənada, hamısının bir vedrədə (məsələn, QIRMIZI(1)-də) saxlanmasının fərqi olmazdı.'
        },
        {
          en: 'Where having different lexical scope buckets starts to matter more is when you have two or more variables, each in different scopes, with the same lexical names. A single scope cannot have two or more variables with the same name; such multiple references would be assumed as just one variable.',
          az: 'Fərqli leksik scope vedrələrinin olması daha çox o zaman önəm qazanır ki, hər biri fərqli scope-da olan, eyni adlı iki və ya daha çox dəyişənin olur. Bir scope-da eyni adlı iki və ya daha çox dəyişən ola bilməz; belə çoxsaylı istinadlar tək dəyişən sayılar.'
        },
        {
          en: "So if you need to maintain two or more variables of the same name, you must use separate (often nested) scopes. And in that case, it's very relevant how the different scope buckets are laid out.",
          az: 'Ona görə eyni adlı iki və ya daha çox dəyişən saxlamaq lazımdırsa, ayrı (çox vaxt iç-içə) scope-lardan istifadə etməlisən. Bu halda isə müxtəlif scope vedrələrinin necə düzüldüyü çox önəmlidir.'
        },
        { en: 'Consider:', az: 'Buna bax:' },
        {
          code: "var studentName = 'Suzy';\n\nfunction printStudent(studentName) {\n  studentName = studentName.toUpperCase();\n  console.log(studentName);\n}\n\nprintStudent('Frank');\n// FRANK\n\nprintStudent(studentName);\n// SUZY\n\nconsole.log(studentName);\n// Suzy"
        },
        {
          en: "> **TIP:** Before you move on, take some time to analyze this code using the various techniques/metaphors we've covered in the book. In particular, make sure to identify the marble/bubble colors in this snippet. It's good practice!",
          az: '> **MƏSLƏHƏT:** Davam etməzdən əvvəl bu kodu kitabda keçdiyimiz müxtəlif üsul/metaforlarla təhlil etməyə vaxt ayır. Xüsusilə bu nümunədəki mərmər/qabarcıq rənglərini müəyyən etdiyinə əmin ol. Bu, yaxşı məşqdir!'
        },
        {
          en: 'The `studentName` variable on line 1 (the `var studentName = ..` statement) creates a RED(1) marble. The same named variable is declared as a BLUE(2) marble on line 3, the parameter in the `printStudent(..)` function definition.',
          az: '1-ci sətirdəki `studentName` dəyişəni (`var studentName = ..` ifadəsi) QIRMIZI(1) mərmər yaradır. Eyni adlı dəyişən 3-cü sətirdə, `printStudent(..)` funksiyasının tərifindəki parametr kimi MAVİ(2) mərmər olaraq elan olunur.'
        },
        {
          en: 'What color marble will `studentName` be in the `studentName = studentName.toUpperCase()` assignment statement and the `console.log(studentName)` statement? All three `studentName` references will be BLUE(2).',
          az: '`studentName = studentName.toUpperCase()` mənimsətmə ifadəsində və `console.log(studentName)` ifadəsində `studentName` hansı rəngli mərmər olacaq? Üç `studentName` istinadının hamısı MAVİ(2) olacaq.'
        },
        {
          en: 'With the conceptual notion of the "lookup," we asserted that it starts with the current scope and works its way outward/upward, stopping as soon as a matching variable is found. The BLUE(2) `studentName` is found right away. The RED(1) `studentName` is never even considered.',
          az: '«Axtarış» anlayışı ilə demişdik ki, o, cari scope-dan başlayır və çölə/yuxarı doğru irəliləyir, uyğun dəyişən tapılan kimi dayanır. MAVİ(2) `studentName` dərhal tapılır. QIRMIZI(1) `studentName` isə heç nəzərə alınmır.'
        },
        {
          en: 'This is a key aspect of lexical scope behavior, called [[shadowing]]. The BLUE(2) `studentName` variable (parameter) shadows the RED(1) `studentName`. So, the parameter is shadowing the (shadowed) global variable. Repeat that sentence to yourself a few times to make sure you have the terminology straight!',
          az: 'Bu, leksik scope davranışının əsas xüsusiyyətlərindən biridir və [[shadowing]] adlanır. MAVİ(2) `studentName` dəyişəni (parametr) QIRMIZI(1) `studentName`-i kölgələyir. Yəni parametr (kölgələnmiş) qlobal dəyişəni kölgələyir. Terminologiyanı düz başa düşdüyünə əmin olmaq üçün bu cümləni özünə bir neçə dəfə təkrarla!'
        },
        {
          en: "That's why the re-assignment of `studentName` affects only the inner (parameter) variable: the BLUE(2) `studentName`, not the global RED(1) `studentName`.",
          az: 'Məhz buna görə `studentName`-ə yenidən mənimsətmə yalnız daxili (parametr) dəyişənə təsir edir: MAVİ(2) `studentName`-ə, qlobal QIRMIZI(1) `studentName`-ə yox.'
        },
        {
          en: "When you choose to shadow a variable from an outer scope, one direct impact is that from that scope inward/downward (through any nested scopes) it's now impossible for any marble to be colored as the shadowed variable — (RED(1), in this case). In other words, any `studentName` identifier reference will correspond to that parameter variable, never the global `studentName` variable. It's lexically impossible to reference the global `studentName` anywhere inside of the `printStudent(..)` function (or from any nested scopes).",
          az: 'Xarici scope-dakı dəyişəni kölgələməyi seçəndə birbaşa nəticələrdən biri budur: həmin scope-dan içəri/aşağı (bütün iç-içə scope-lar boyunca) heç bir mərmər artıq kölgələnmiş dəyişənin (bu halda QIRMIZI(1)) rəngini ala bilməz. Başqa sözlə, istənilən `studentName` identifikator istinadı həmin parametr dəyişəninə uyğun gələcək, heç vaxt qlobal `studentName` dəyişəninə yox. `printStudent(..)` funksiyasının içində (və ya istənilən iç-içə scope-dan) qlobal `studentName`-ə leksik olaraq müraciət etmək mümkün deyil.'
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
          en: "Please beware: leveraging the technique I'm about to describe is not very good practice, as it's limited in utility, confusing for readers of your code, and likely to invite bugs to your program. I'm covering it only because you may run across this behavior in existing programs, and understanding what's happening is critical to not getting tripped up.",
          az: 'Diqqət: indi təsvir edəcəyim texnikadan istifadə yaxşı təcrübə deyil — faydası məhduddur, kodunu oxuyanları çaşdırır və proqramına bug gətirə bilər. Ondan yalnız ona görə danışıram ki, mövcud proqramlarda bu davranışa rast gələ bilərsən, nə baş verdiyini anlamaq isə büdrəməmək üçün çox vacibdir.'
        },
        {
          en: 'It *is* possible to access a global variable from a scope where that variable has been shadowed, but not through a typical lexical identifier reference.',
          az: 'Qlobal dəyişənə onun kölgələndiyi scope-dan çatmaq *mümkündür*, amma adi leksik identifikator istinadı ilə yox.'
        },
        {
          en: "In the global scope (RED(1)), `var` declarations and `function` declarations also expose themselves as properties (of the same name as the identifier) on the [[global-object]] — essentially an object representation of the global scope. If you've written JS for a browser environment, you probably recognize the global object as `window`. That's not *entirely* accurate, but it's good enough for our discussion. In the next chapter, we'll explore the global scope/object topic more.",
          az: 'Qlobal scope-da (QIRMIZI(1)) `var` və `function` bəyannamələri həm də [[global-object]] üzərində (identifikatorla eyni adlı) xassə kimi görünür — bu, mahiyyətcə qlobal scope-un obyekt təsviridir. Brauzer mühiti üçün JS yazmısansa, yəqin ki, qlobal obyekti `window` kimi tanıyırsan. Bu, *tam* dəqiq deyil, amma müzakirəmiz üçün kifayətdir. Növbəti fəsildə qlobal scope/obyekt mövzusunu daha ətraflı araşdıracağıq.'
        },
        {
          en: 'Consider this program, specifically executed as a standalone .js file in a browser environment:',
          az: 'Brauzer mühitində məhz ayrıca .js faylı kimi icra olunan bu proqrama bax:'
        },
        {
          code: "var studentName = 'Suzy';\n\nfunction printStudent(studentName) {\n  console.log(studentName);\n  console.log(window.studentName);\n}\n\nprintStudent('Frank');\n// \"Frank\"\n// \"Suzy\""
        },
        {
          en: "Notice the `window.studentName` reference? This expression is accessing the global variable `studentName` as a property on `window` (which we're pretending for now is synonymous with the global object). That's the only way to access a shadowed variable from inside a scope where the shadowing variable is present.",
          az: '`window.studentName` istinadına diqqət etdin? Bu ifadə qlobal `studentName` dəyişəninə `window`-un (hələlik onu qlobal obyektin sinonimi sayırıq) xassəsi kimi müraciət edir. Kölgələyən dəyişənin olduğu scope-un içindən kölgələnmiş dəyişənə çatmağın yeganə yolu budur.'
        },
        {
          en: 'The `window.studentName` is a mirror of the global `studentName` variable, not a separate snapshot copy. Changes to one are still seen from the other, in either direction. You can think of `window.studentName` as a getter/setter that accesses the actual `studentName` variable. As a matter of fact, you can even *add* a variable to the global scope by creating/setting a property on the global object.',
          az: '`window.studentName` qlobal `studentName` dəyişəninin güzgüsüdür, ayrıca surəti deyil. Birindəki dəyişiklik hər iki istiqamətdə o birindən görünür. `window.studentName`-i əsl `studentName` dəyişəninə müraciət edən getter/setter kimi təsəvvür edə bilərsən. Əslində qlobal obyektdə xassə yaratmaqla/dəyər yazmaqla qlobal scope-a hətta dəyişən *əlavə edə* bilərsən.'
        },
        {
          en: "> **WARNING:** Remember: just because you *can* doesn't mean you *should*. Don't shadow a global variable that you need to access, and conversely, avoid using this trick to access a global variable that you've shadowed. And definitely don't confuse readers of your code by creating global variables as `window` properties instead of with formal declarations!",
          az: '> **XƏBƏRDARLIQ:** Unutma: *edə bilməyin* *etməli olduğun* demək deyil. Çatmalı olduğun qlobal dəyişəni kölgələmə; əksinə, kölgələdiyin qlobal dəyişənə çatmaq üçün bu hiylədən istifadə etmə. Və qlobal dəyişənləri rəsmi bəyannamə əvəzinə `window` xassəsi kimi yaradaraq kodunu oxuyanları qətiyyən çaşdırma!'
        },
        {
          en: 'This little "trick" only works for accessing a global scope variable (not a shadowed variable from a nested scope), and even then, only one that was declared with `var` or `function`.',
          az: 'Bu kiçik «hiylə» yalnız qlobal scope dəyişəninə (iç-içə scope-dakı kölgələnmiş dəyişənə yox) çatmaq üçün işləyir, həm də yalnız `var` və ya `function` ilə elan olunmuş dəyişən üçün.'
        },
        {
          en: 'Other forms of global scope declarations do not create mirrored global object properties:',
          az: 'Qlobal scope-dakı digər bəyannamə formaları qlobal obyektdə güzgü xassələri yaratmır:'
        },
        {
          code: 'var one = 1;\nlet notOne = 2;\nconst notTwo = 3;\nclass notThree {}\n\nconsole.log(window.one);       // 1\nconsole.log(window.notOne);    // undefined\nconsole.log(window.notTwo);    // undefined\nconsole.log(window.notThree);  // undefined'
        },
        {
          en: "Variables (no matter how they're declared!) that exist in any other scope than the global scope are completely inaccessible from a scope where they've been shadowed:",
          az: 'Qlobal scope-dan başqa istənilən scope-da olan dəyişənlər (necə elan olunmasından asılı olmayaraq!) kölgələndikləri scope-dan tamamilə əlçatmazdır:'
        },
        {
          code: 'var special = 42;\n\nfunction lookingFor(special) {\n  // The identifier `special` (parameter) in this\n  // scope is shadowed inside keepLooking(), and\n  // is thus inaccessible from that scope.\n\n  function keepLooking() {\n    var special = 3.141592;\n    console.log(special);\n    console.log(window.special);\n  }\n\n  keepLooking();\n}\n\nlookingFor(112358132134);\n// 3.141592\n// 42'
        },
        {
          en: 'The global RED(1) `special` is shadowed by the BLUE(2) `special` (parameter), and the BLUE(2) `special` is itself shadowed by the GREEN(3) `special` inside `keepLooking()`. We can still access the RED(1) `special` using the indirect reference `window.special`. But there\'s no way for `keepLooking()` to access the BLUE(2) `special` that holds the number `112358132134`.',
          az: 'Qlobal QIRMIZI(1) `special`-ı MAVİ(2) `special` (parametr) kölgələyir, MAVİ(2) `special`-ı isə öz növbəsində `keepLooking()`-in içindəki YAŞIL(3) `special` kölgələyir. QIRMIZI(1) `special`-a hələ də dolayı `window.special` istinadı ilə çata bilərik. Lakin `keepLooking()`-in `112358132134` rəqəmini saxlayan MAVİ(2) `special`-a çatmasının heç bir yolu yoxdur.'
        },
        { en: '## Copying Is Not Accessing', az: '## Kopyalamaq çıxış demək deyil' },
        {
          en: 'I\'ve been asked the following "But what about...?" question dozens of times. Consider:',
          az: 'Aşağıdakı «Bəs bu necə...?» sualını mənə onlarla dəfə veriblər. Buna bax:'
        },
        {
          code: 'var special = 42;\n\nfunction lookingFor(special) {\n  var another = {\n    special: special\n  };\n\n  function keepLooking() {\n    var special = 3.141592;\n    console.log(special);\n    console.log(another.special);  // Ooo, tricky!\n    console.log(window.special);\n  }\n\n  keepLooking();\n}\n\nlookingFor(112358132134);\n// 3.141592\n// 112358132134\n// 42'
        },
        {
          en: 'Oh! So does this `another` object technique disprove my claim that the `special` parameter is "completely inaccessible" from inside `keepLooking()`? No, the claim is still correct.',
          az: 'Oho! Deməli, bu `another` obyekti üsulu `special` parametrinin `keepLooking()`-in içindən «tamamilə əlçatmaz» olduğu barədə iddiamı təkzib edir? Xeyr, iddia hələ də doğrudur.'
        },
        {
          en: "`special: special` is copying the value of the `special` parameter variable into another container (a property of the same name). Of course, if you put a value in another container, shadowing no longer applies (unless `another` was shadowed, too!). But that doesn't mean we're accessing the parameter `special`; it means we're accessing the copy of the value it had at that moment, by way of *another* container (object property). We cannot reassign the BLUE(2) `special` parameter to a different value from inside `keepLooking()`.",
          az: '`special: special` `special` parametr dəyişəninin dəyərini başqa konteynerə (eyni adlı xassəyə) kopyalayır. Təbii ki, dəyəri başqa konteynerə qoysan, kölgələmə artıq tətbiq olunmur (əgər `another` də kölgələnməyibsə!). Lakin bu, `special` parametrinə çatdığımız demək deyil; bu, onun həmin andakı dəyərinin surətinə *başqa* konteyner (obyekt xassəsi) vasitəsilə çatdığımız deməkdir. `keepLooking()`-in içindən MAVİ(2) `special` parametrinə başqa dəyər mənimsədə bilmərik.'
        },
        {
          en: 'Another "But...!?" you may be about to raise: what if I\'d used objects or arrays as the values instead of the numbers (`112358132134`, etc.)? Would us having references to objects instead of copies of primitive values "fix" the inaccessibility?',
          az: 'Qaldıra biləcəyin başqa bir «Amma...!?»: rəqəmlər (`112358132134` və s.) əvəzinə dəyər kimi obyekt və ya massiv istifadə etsəydim? Primitiv dəyərlərin surəti əvəzinə obyektlərə istinadlarımızın olması əlçatmazlığı «düzəldərdimi»?'
        },
        {
          en: "No. Mutating the contents of the object value via a reference copy is **not** the same thing as lexically accessing the variable itself. We still can't reassign the BLUE(2) `special` parameter.",
          az: 'Yox. Obyekt dəyərinin məzmununu istinad surəti vasitəsilə dəyişmək dəyişənin özünə leksik çıxışla **eyni şey deyil**. MAVİ(2) `special` parametrinə yenə də yeni dəyər mənimsədə bilmərik.'
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
          code: "function something() {\n  var special = 'JavaScript';\n\n  {\n    let special = 42;   // totally fine shadowing\n\n    // ..\n  }\n}\n\nfunction another() {\n  // ..\n\n  {\n    let special = 'JavaScript';\n\n    {\n      var special = 'JavaScript';\n      // ^^^ Syntax Error\n\n      // ..\n    }\n  }\n}"
        },
        {
          en: 'Notice in the `another()` function, the inner `var special` declaration is attempting to declare a function-wide `special`, which in and of itself is fine (as shown by the `something()` function).',
          az: '`another()` funksiyasında diqqət et: daxili `var special` bəyannaməsi bütün funksiyaya aid `special` elan etməyə çalışır; bu, özlüyündə qaydasındadır (`something()` funksiyasında göstərildiyi kimi).'
        },
        {
          en: 'The syntax error description in this case indicates that `special` has already been defined, but that error message is a little misleading — again, no such error happens in `something()`, as shadowing is generally allowed just fine.',
          az: 'Bu halda sintaksis səhvinin təsviri `special`-ın artıq təyin olunduğunu bildirir, lakin bu səhv mesajı bir az çaşdırıcıdır — yenə deyirəm, `something()`-də belə səhv baş vermir, çünki kölgələməyə ümumən icazə verilir.'
        },
        {
          en: 'The real reason it\'s raised as a `SyntaxError` is because the `var` is basically trying to "cross the boundary" of (or hop over) the `let` declaration of the same name, which is not allowed.',
          az: 'Bunun `SyntaxError` kimi atılmasının əsl səbəbi budur ki, `var` mahiyyətcə eyni adlı `let` bəyannaməsinin «sərhədini keçməyə» (onun üstündən tullanmağa) çalışır və buna icazə verilmir.'
        },
        {
          en: 'That boundary-crossing prohibition effectively stops at each function boundary, so this variant raises no exception:',
          az: 'Sərhəd keçmə qadağası faktiki olaraq hər funksiya sərhədində dayanır, ona görə bu variant heç bir istisna atmır:'
        },
        {
          code: "function another() {\n  // ..\n\n  {\n    let special = 'JavaScript';\n\n    ajax('https://some.url', function callback() {\n      // totally fine shadowing\n      var special = 'JavaScript';\n\n      // ..\n    });\n  }\n}"
        },
        {
          en: "**Summary:** `let` (in an inner scope) can always shadow an outer scope's `var`. `var` (in an inner scope) can only shadow an outer scope's `let` if there is a function boundary in between.",
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
          en: 'As you\'ve seen by now, a `function` declaration looks like this:',
          az: 'Artıq gördüyün kimi, `function` bəyannaməsi belə görünür:'
        },
        { code: 'function askQuestion() {\n  // ..\n}' },
        {
          en: 'And as discussed in Chapters 1 and 2, such a `function` declaration will create an identifier in the enclosing scope (in this case, the global scope) named `askQuestion`.',
          az: '1-ci və 2-ci fəsillərdə müzakirə etdiyimiz kimi, belə `function` bəyannaməsi əhatə edən scope-da (bu halda qlobal scope-da) `askQuestion` adlı identifikator yaradır.'
        },
        { en: 'What about this program?', az: 'Bəs bu proqram?' },
        { code: 'var askQuestion = function(){\n  // ..\n};' },
        {
          en: 'The same is true for the variable `askQuestion` being created. But since it\'s a `function` expression — a function definition used as value instead of a standalone declaration — the function itself will not "hoist" (see Chapter 5).',
          az: 'Yaradılan `askQuestion` dəyişəni üçün də eyni şey doğrudur. Lakin bu, `function` ifadəsi olduğu üçün — müstəqil bəyannamə deyil, dəyər kimi istifadə olunan funksiya tərifi — funksiyanın özü «hoist» olunmur (bax: 5-ci fəsil).'
        },
        {
          en: 'One major difference between `function` declarations and `function` expressions is what happens to the name identifier of the function. Consider a named `function` expression:',
          az: '`function` bəyannamələri ilə `function` ifadələri arasındakı əsas fərqlərdən biri funksiyanın ad identifikatorunun taleyidir. Adlı `function` ifadəsinə bax:'
        },
        { code: 'var askQuestion = function ofTheTeacher(){\n  // ..\n};' },
        {
          en: "We know `askQuestion` ends up in the outer scope. But what about the `ofTheTeacher` identifier? For formal `function` declarations, the name identifier ends up in the outer/enclosing scope, so it may be reasonable to assume that's the case here. But `ofTheTeacher` is declared as an identifier **inside the function itself** ([[named-function-expression]]):",
          az: 'Bilirik ki, `askQuestion` xarici scope-a düşür. Bəs `ofTheTeacher` identifikatoru? Rəsmi `function` bəyannamələrində ad identifikatoru xarici/əhatə edən scope-a düşür, ona görə burada da belə olduğunu fərz etmək məntiqli görünə bilər. Lakin `ofTheTeacher` **funksiyanın öz içində** identifikator kimi elan olunur ([[named-function-expression]]):'
        },
        {
          code: 'var askQuestion = function ofTheTeacher() {\n  console.log(ofTheTeacher);\n};\n\naskQuestion();\n// function ofTheTeacher()...\n\nconsole.log(ofTheTeacher);\n// ReferenceError: ofTheTeacher is not defined'
        },
        {
          en: '> **NOTE:** Actually, `ofTheTeacher` is not exactly *in the scope of the function*. Appendix A, "Implied Scopes" will explain further.',
          az: '> **QEYD:** Əslində `ofTheTeacher` tam olaraq *funksiyanın scope-unda* deyil. Əlavə A-dakı «Implied Scopes» bölməsi bunu ətraflı izah edəcək.'
        },
        {
          en: 'Not only is `ofTheTeacher` declared inside the function rather than outside, but it\'s also defined as read-only:',
          az: '`ofTheTeacher` nəinki çöldə yox, funksiyanın içində elan olunur, həm də yalnız oxunan kimi təyin olunur:'
        },
        {
          code: "var askQuestion = function ofTheTeacher() {\n  'use strict';\n  ofTheTeacher = 42;   // TypeError\n\n  //..\n};\n\naskQuestion();\n// TypeError"
        },
        {
          en: 'Because we used strict-mode, the assignment failure is reported as a `TypeError`; in non-strict-mode, such an assignment fails silently with no exception.',
          az: 'Sərt rejimdən istifadə etdiyimiz üçün mənimsətmənin uğursuzluğu `TypeError` kimi bildirilir; qeyri-sərt rejimdə isə belə mənimsətmə heç bir istisna olmadan səssizcə uğursuz olur.'
        },
        {
          en: 'What about when a `function` expression has no name identifier?',
          az: 'Bəs `function` ifadəsinin ad identifikatoru olmayanda?'
        },
        { code: 'var askQuestion = function(){\n  // ..\n};' },
        {
          en: 'A `function` expression with a name identifier is referred to as a "named function expression," but one without a name identifier is referred to as an "anonymous function expression." Anonymous function expressions clearly have no name identifier that affects either scope.',
          az: 'Ad identifikatoru olan `function` ifadəsi «adlı funksiya ifadəsi», ad identifikatoru olmayan isə «anonim funksiya ifadəsi» adlanır. Anonim funksiya ifadələrinin, təbii ki, heç bir scope-a təsir edən ad identifikatoru yoxdur.'
        },
        {
          en: "> **NOTE:** We'll discuss named vs. anonymous `function` expressions in much more detail, including what factors affect the decision to use one or the other, in Appendix A.",
          az: '> **QEYD:** Adlı və anonim `function` ifadələrini, o cümlədən birini və ya digərini seçmə qərarına təsir edən amilləri Əlavə A-da daha ətraflı müzakirə edəcəyik.'
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
          en: 'ES6 added an additional `function` expression form to the language, called "arrow functions" ([[arrow-function]]):',
          az: 'ES6 dilə əlavə `function` ifadəsi forması gətirdi — «arrow funksiyalar» ([[arrow-function]]):'
        },
        { code: 'var askQuestion = () => {\n  // ..\n};' },
        {
          en: 'The `=>` arrow function doesn\'t require the word `function` to define it. Also, the `( .. )` around the parameter list is optional in some simple cases. Likewise, the `{ .. }` around the function body is optional in some cases. And when the `{ .. }` are omitted, a return value is sent out without using a `return` keyword.',
          az: '`=>` arrow funksiyasını təyin etmək üçün `function` sözü lazım deyil. Həmçinin bəzi sadə hallarda parametr siyahısının ətrafındakı `( .. )` məcburi deyil. Eyni şəkildə bəzi hallarda funksiya gövdəsinin ətrafındakı `{ .. }` da məcburi deyil. `{ .. }` buraxılanda isə dəyər `return` açar sözü olmadan qaytarılır.'
        },
        {
          en: '> **NOTE:** The attractiveness of `=>` arrow functions is often sold as "shorter syntax," and that\'s claimed to equate to objectively more readable code. This claim is dubious at best, and I believe outright misguided. We\'ll dig into the "readability" of various function forms in Appendix A.',
          az: '> **QEYD:** `=>` arrow funksiyaların cazibəsi çox vaxt «daha qısa sintaksis» kimi təqdim olunur və bunun obyektiv olaraq daha oxunaqlı kod demək olduğu iddia edilir. Bu iddia ən yaxşı halda şübhəlidir, məncə isə tamamilə yanlışdır. Müxtəlif funksiya formalarının «oxunaqlılığına» Əlavə A-da dərindən baxacağıq.'
        },
        {
          en: 'Arrow functions are lexically anonymous, meaning they have no directly related identifier that references the function. The assignment to `askQuestion` creates an inferred name of "askQuestion", but that\'s **not the same thing as being non-anonymous**:',
          az: 'Arrow funksiyalar leksik olaraq anonimdir, yəni funksiyaya istinad edən birbaşa bağlı identifikatorları yoxdur. `askQuestion`-a mənimsətmə «askQuestion» adını çıxarır (inferred name), lakin bu, **anonim olmamaqla eyni şey deyil**:'
        },
        { code: 'var askQuestion = () => {\n  // ..\n};\n\naskQuestion.name;   // askQuestion' },
        {
          en: 'Arrow functions achieve their syntactic brevity at the expense of having to mentally juggle a bunch of variations for different forms/conditions. Just a few, for example:',
          az: 'Arrow funksiyalar sintaktik qısalığa müxtəlif forma/şərtlər üçün bir çox variantı zehnində saxlamaq bahasına nail olur. Məsələn, sadəcə bir neçəsi:'
        },
        {
          code: '() => 42;\n\nid => id.toUpperCase();\n\n(id,name) => ({ id, name });\n\n(...args) => {\n  return args[args.length - 1];\n};'
        },
        {
          en: 'The real reason I bring up arrow functions is because of the common but incorrect claim that arrow functions somehow behave differently with respect to lexical scope from standard `function` functions. This is incorrect.',
          az: 'Arrow funksiyalardan danışmağımın əsl səbəbi geniş yayılmış, lakin yanlış iddiadır: guya arrow funksiyalar leksik scope baxımından adi `function` funksiyalarından fərqli davranır. Bu, yanlışdır.'
        },
        {
          en: 'Other than being anonymous (and having no declarative form), `=>` arrow functions have the same lexical scope rules as `function` functions do. An arrow function, with or without `{ .. }` around its body, still creates a separate, inner nested bucket of scope. Variable declarations inside this nested scope bucket behave the same as in a `function` scope.',
          az: 'Anonim olmaları (və bəyannamə formalarının olmaması) istisna olmaqla, `=>` arrow funksiyaları `function` funksiyaları ilə eyni leksik scope qaydalarına malikdir. Arrow funksiya — gövdəsinin ətrafında `{ .. }` olsa da, olmasa da — yenə ayrıca, daxili iç-içə scope vedrəsi yaradır. Bu iç-içə scope vedrəsindəki dəyişən bəyannamələri `function` scope-undakı kimi davranır.'
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
        },
        {
          en: 'As we step back out from these finer details, the next chapter shifts focus to the primary scope all JS programs include: the global scope.',
          az: 'Bu incə detallardan geri çəkilərkən növbəti fəsil diqqəti bütün JS proqramlarında olan əsas scope-a — qlobal scope-a yönəldir.'
        }
      ],
      note: 'Fəsli üç sətirlə yadda saxla:\n\n```text\n1. Hər funksiya/blok yeni scope yaradır → zəncir yuxarı gedir\n2. Eyni ad daxildə təkrarlanırsa → xarici dəyişən kölgədə qalır\n3. var let-in sərhədini keçə bilməz; arrow funksiyanın scope-u adi funksiyadakı kimidir\n```'
    }
  ],
  exam: exam3
};
