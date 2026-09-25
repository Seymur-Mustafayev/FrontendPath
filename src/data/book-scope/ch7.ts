import type { BookChapter } from '../books';
import { exam7 } from './exam-ch7';

export const ch7: BookChapter = {
  id: 'ch7',
  no: 7,
  title: 'Using Closures',
  titleAz: 'Closure-lardan istifadə',
  sum: 'Closure-un müşahidəyə əsaslanan tərifi: canlı əlaqə, snapshot yox; dövrlərdə closure, callback-lər, həyat dövrü və GC, dəyişən üzrə və ya scope üzrə closure, alternativ model və praktik faydalar.',
  sections: [
    {
      id: 'intro',
      heading: 'Chapter 7: Using Closures',
      headingAz: 'Fəsil 7: Closure-lardan istifadə',
      blocks: [
        {
          en: "Up to this point, we've focused on the ins and outs of lexical scope, and how that affects the organization and usage of variables in our programs.",
          az: 'İndiyə qədər leksik scope-un incəliklərinə və onun proqramlarımızda dəyişənlərin təşkilinə və istifadəsinə necə təsir etdiyinə fokuslanmışdıq.'
        },
        {
          en: "Our attention again shifts broader in abstraction, to the historically somewhat daunting topic of closure. Don't worry! You don't need an advanced computer science degree to make sense of it. Our broad goal in this book is not merely to understand scope, but to more effectively use it in the structure of our programs; closure is central to that effort.",
          az: 'Diqqətimiz yenidən daha geniş abstraksiyaya — tarixən bir qədər qorxuducu sayılan [[closure]] mövzusuna keçir. Narahat olma! Onu anlamaq üçün kompüter elmləri üzrə yüksək dərəcə lazım deyil. Bu kitabdakı geniş məqsədimiz təkcə scope-u anlamaq deyil, həm də ondan proqramlarımızın strukturunda daha effektiv istifadə etməkdir; closure bu səyin mərkəzindədir.'
        },
        {
          en: 'Recall the main conclusion of Chapter 6: the *least exposure* principle ([[pole]]) encourages us to use block (and function) scoping to limit the scope exposure of variables. This helps keep code understandable and maintainable, and helps avoid many scoping pitfalls (i.e., name collision, etc.).',
          az: '6-cı fəslin əsas nəticəsini xatırla: *ən az açıqlıq* prinsipi ([[pole]]) dəyişənlərin scope açıqlığını məhdudlaşdırmaq üçün blok (və funksiya) scope-undan istifadəyə təşviq edir. Bu, kodu anlaşıqlı və saxlanıla bilən edir, bir çox scope tələsindən (məsələn, ad toqquşmasından) qaçmağa kömək edir.'
        },
        {
          en: 'Closure builds on this approach: for variables we need to use over time, instead of placing them in larger outer scopes, we can encapsulate (more narrowly scope) them but still preserve access from inside functions, for broader use. Functions *remember* these referenced scoped variables via closure.',
          az: 'Closure bu yanaşmanın üzərində qurulur: zaman ərzində istifadə etməli olduğumuz dəyişənləri daha böyük xarici scope-lara qoymaq əvəzinə onları inkapsulyasiya edə (daha dar scope-a sala), amma daha geniş istifadə üçün funksiyaların içindən onlara çıxışı saxlaya bilərik. Funksiyalar istinad etdikləri bu scope dəyişənlərini closure vasitəsilə *yadda saxlayır*.'
        },
        {
          en: "We already saw an example of this kind of closure in the previous chapter (`factorial(..)` in Chapter 6), and you've almost certainly already used it in your own programs. If you've ever written a callback that accesses variables outside its own scope... guess what!? That's closure.",
          az: 'Bu cür closure-un nümunəsini əvvəlki fəsildə artıq gördük (6-cı fəsildə `factorial(..)`) və demək olar ki, əminəm, sən onu öz proqramlarında artıq istifadə etmisən. Əgər heç öz scope-undan kənardakı dəyişənlərə müraciət edən callback yazmısansa... təxmin et!? Bu, closure-dur.'
        },
        {
          en: 'Closure is one of the most important language characteristics ever invented in programming — it underlies major programming paradigms, including Functional Programming (FP), modules, and even a bit of class-oriented design. Getting comfortable with closure is required for mastering JS and effectively leveraging many important design patterns throughout your code.',
          az: 'Closure proqramlaşdırmada indiyə qədər icad olunmuş ən vacib dil xüsusiyyətlərindən biridir — o, Funksional Proqramlaşdırma (FP), modullar və hətta bir qədər də sinif yönümlü dizayn daxil olmaqla əsas proqramlaşdırma paradiqmalarının təməlindədir. JS-i mənimsəmək və kodunda bir çox vacib dizayn nümunəsindən effektiv istifadə etmək üçün closure ilə rahat olmaq zəruridir.'
        },
        {
          en: 'Addressing all aspects of closure requires a daunting mountain of discussion and code throughout this chapter. Make sure to take your time and ensure you\'re comfortable with each bit before moving onto the next.',
          az: 'Closure-un bütün cəhətlərini əhatə etmək bu fəsil boyu qorxuducu həcmdə müzakirə və kod tələb edir. Tələsmə və növbəti hissəyə keçməzdən əvvəl hər birini rahat başa düşdüyünə əmin ol.'
        }
      ],
      terms: ['closure', 'pole']
    },
    {
      id: 'see-closure',
      heading: 'See the Closure',
      headingAz: 'Closure-u görmək',
      blocks: [
        {
          en: "Closure is originally a mathematical concept, from lambda calculus. But I'm not going to list out math formulas or use a bunch of notation and jargon to define it.",
          az: 'Closure əslində lambda hesabından gələn riyazi anlayışdır. Lakin onu təyin etmək üçün riyazi düsturlar sadalamayacağam və ya çoxlu işarə və jarqondan istifadə etməyəcəyəm.'
        },
        {
          en: "Instead, I'm going to focus on a practical perspective. We'll start by defining closure in terms of what we can observe in different behavior of our programs, as opposed to if closure was not present in JS. However, later in this chapter, we're going to flip closure around to look at it from an *alternative perspective*.",
          az: 'Əvəzində praktik baxışa fokuslanacağam. Closure-u proqramlarımızın davranışında — JS-də closure olmasaydı olacağından fərqli olaraq — müşahidə edə bildiyimiz şeylərlə təyin etməklə başlayacağıq. Lakin bu fəslin sonrakı hissəsində closure-u çevirib ona *alternativ baxışla* baxacağıq.'
        },
        {
          en: "Closure is a behavior of functions and only functions. If you aren't dealing with a function, closure does not apply. An object cannot have closure, nor does a class have closure (though its functions/methods might). Only functions have closure.",
          az: 'Closure funksiyaların və yalnız funksiyaların davranışıdır. Funksiya ilə iş görmürsənsə, closure tətbiq olunmur. Obyektin closure-u ola bilməz, sinfin də closure-u yoxdur (amma onun funksiyalarının/metodlarının ola bilər). Closure yalnız funksiyalarda olur.'
        },
        {
          en: 'For closure to be observed, a function must be invoked, and specifically it must be invoked in a different branch of the scope chain from where it was originally defined. A function executing in the same scope it was defined would not exhibit any observably different behavior with or without closure being possible; by the observational perspective and definition, that is not closure.',
          az: 'Closure-un müşahidə olunması üçün funksiya çağırılmalıdır, həm də məhz ilk dəfə təyin olunduğu yerdən fərqli scope zənciri qolunda çağırılmalıdır. Təyin olunduğu eyni scope-da icra olunan funksiya closure mümkün olsa da, olmasa da müşahidə olunan heç bir fərqli davranış göstərməz; müşahidə baxımından və tərifinə görə bu, closure deyil.'
        },
        {
          en: "Let's look at some code, annotated with its relevant scope bubble colors (see Chapter 2):",
          az: 'Gəl müvafiq scope qabarcığı rəngləri ilə işarələnmiş koda baxaq (bax: 2-ci fəsil):'
        },
        {
          code: "// outer/global scope: RED(1)\n\nfunction lookupStudent(studentID) {\n  // function scope: BLUE(2)\n\n  var students = [\n    { id: 14, name: 'Kyle' },\n    { id: 73, name: 'Suzy' },\n    { id: 112, name: 'Frank' },\n    { id: 6, name: 'Sarah' }\n  ];\n\n  return function greetStudent(greeting){\n    // function scope: GREEN(3)\n\n    var student = students.find(\n      student => student.id == studentID\n    );\n\n    return `${ greeting }, ${ student.name }!`;\n  };\n}\n\nvar chosenStudents = [\n  lookupStudent(6),\n  lookupStudent(112)\n];\n\n// accessing the function's name:\nchosenStudents[0].name;\n// greetStudent\n\nchosenStudents[0]('Hello');\n// Hello, Sarah!\n\nchosenStudents[1]('Howdy');\n// Howdy, Frank!"
        },
        {
          en: 'The first thing to notice about this code is that the `lookupStudent(..)` outer function creates and returns an inner function called `greetStudent(..)`. `lookupStudent(..)` is called twice, producing two separate instances of its inner `greetStudent(..)` function, both of which are saved into the `chosenStudents` array.',
          az: 'Bu kodda ilk diqqət edilməli şey xarici `lookupStudent(..)` funksiyasının `greetStudent(..)` adlı daxili funksiya yaradıb qaytarmasıdır. `lookupStudent(..)` iki dəfə çağırılır və daxili `greetStudent(..)` funksiyasının iki ayrı nüsxəsini yaradır; hər ikisi `chosenStudents` massivinə yazılır.'
        },
        {
          en: "We verify that's the case by checking the `.name` property of the returned function saved in `chosenStudents[0]`, and it's indeed an instance of the inner `greetStudent(..)`.",
          az: 'Bunu `chosenStudents[0]`-da saxlanan qaytarılmış funksiyanın `.name` xassəsini yoxlayaraq təsdiqləyirik — o, həqiqətən daxili `greetStudent(..)`-un nüsxəsidir.'
        },
        {
          en: "After each call to `lookupStudent(..)` finishes, it would seem like all its inner variables would be discarded and GC'd (garbage collected). The inner function is the only thing that seems to be returned and preserved. But here's where the behavior differs in ways we can start to observe.",
          az: '`lookupStudent(..)`-a hər çağırış bitdikdən sonra elə görünür ki, onun bütün daxili dəyişənləri atılmalı və zibil yığıcı (GC — garbage collector) tərəfindən təmizlənməlidir. Qaytarılan və qorunan yeganə şey daxili funksiya kimi görünür. Lakin davranış məhz burada müşahidə etməyə başlaya biləcəyimiz şəkildə fərqlənir.'
        },
        {
          en: 'While `greetStudent(..)` does receive a single argument as the parameter named `greeting`, it also makes reference to both `students` and `studentID`, identifiers which come from the enclosing scope of `lookupStudent(..)`. Each of those references from the inner function to the variable in an outer scope is called a *closure*. In academic terms, each instance of `greetStudent(..)` *closes over* the outer variables `students` and `studentID`.',
          az: '`greetStudent(..)` `greeting` adlı parametr kimi tək arqument qəbul etsə də, həm də `lookupStudent(..)`-un əhatə edən scope-undan gələn `students` və `studentID` identifikatorlarına istinad edir. Daxili funksiyadan xarici scope-dakı dəyişənə olan bu istinadların hər biri *closure* adlanır. Akademik dillə desək, `greetStudent(..)`-un hər nüsxəsi xarici `students` və `studentID` dəyişənləri *üzərində qapanır* (closes over).'
        },
        {
          en: 'So what do those closures do here, in a concrete, observable sense?',
          az: 'Bəs bu closure-lar burada konkret, müşahidə oluna bilən mənada nə edir?'
        },
        {
          en: "Closure allows `greetStudent(..)` to continue to access those outer variables even after the outer scope is finished (when each call to `lookupStudent(..)` completes). Instead of the instances of `students` and `studentID` being GC'd, they stay around in memory. At a later time when either instance of the `greetStudent(..)` function is invoked, those variables are still there, holding their current values.",
          az: 'Closure `greetStudent(..)`-a xarici scope bitdikdən sonra da (`lookupStudent(..)`-a hər çağırış tamamlandıqda) həmin xarici dəyişənlərə çıxışı davam etdirməyə imkan verir. `students` və `studentID` nüsxələri GC tərəfindən təmizlənmək əvəzinə yaddaşda qalır. Sonradan `greetStudent(..)` funksiyasının istənilən nüsxəsi çağırılanda həmin dəyişənlər hələ də oradadır və cari dəyərlərini saxlayır.'
        },
        {
          en: 'If JS functions did not have closure, the completion of each `lookupStudent(..)` call would immediately tear down its scope and GC the `students` and `studentID` variables. When we later called one of the `greetStudent(..)` functions, what would then happen?',
          az: 'JS funksiyalarında closure olmasaydı, hər `lookupStudent(..)` çağırışının tamamlanması onun scope-unu dərhal söküb `students` və `studentID` dəyişənlərini GC ilə təmizləyərdi. Sonra `greetStudent(..)` funksiyalarından birini çağıranda nə baş verərdi?'
        },
        {
          en: "If `greetStudent(..)` tried to access what it thought was a BLUE(2) marble, but that marble did not actually exist (anymore), the reasonable assumption is we should get a `ReferenceError`, right?",
          az: '`greetStudent(..)` MAVİ(2) mərmər saydığı şeyə müraciət etməyə çalışsaydı, amma həmin mərmər artıq mövcud olmasaydı, ağlabatan fərziyyə `ReferenceError` almalı olduğumuzdur, elə deyilmi?'
        },
        {
          en: 'But we don\'t get an error. The fact that the execution of `chosenStudents[0]("Hello")` works and returns us the message "Hello, Sarah!", means it was still able to access the `students` and `studentID` variables. This is a direct observation of closure!',
          az: 'Lakin səhv almırıq. `chosenStudents[0]("Hello")` icrasının işləyib bizə «Hello, Sarah!» mesajını qaytarması o deməkdir ki, o, hələ də `students` və `studentID` dəyişənlərinə çata bilib. Bu, closure-un birbaşa müşahidəsidir!'
        },
        { en: '## Pointed Closure', az: '## İti uclu closure' },
        {
          en: "Actually, we glossed over a little detail in the previous discussion which I'm guessing many readers missed!",
          az: 'Əslində əvvəlki müzakirədə kiçik bir detalın üstündən keçdik; təxmin edirəm ki, bir çox oxucu onu gözdən qaçırdı!'
        },
        {
          en: 'Because of how terse the syntax for `=>` arrow functions is, it\'s easy to forget that they still create a scope (as asserted in "Arrow Functions" in Chapter 3). The `student => student.id == studentID` arrow function is creating another scope bubble inside the `greetStudent(..)` function scope.',
          az: '`=>` arrow funksiyalarının sintaksisi çox qısa olduğu üçün onların da scope yaratdığını (3-cü fəsildə «Arrow funksiyalar» bölməsində deyildiyi kimi) unutmaq asandır. `student => student.id == studentID` arrow funksiyası `greetStudent(..)` funksiya scope-unun içində daha bir scope qabarcığı yaradır.'
        },
        {
          en: "Building on the metaphor of colored buckets and bubbles from Chapter 2, if we were creating a colored diagram for this code, there's a fourth scope at this innermost nesting level, so we'd need a fourth color; perhaps we'd pick ORANGE(4) for that scope:",
          az: '2-ci fəsildəki rəngli vedrələr və qabarcıqlar metaforuna əsaslanaraq bu kod üçün rəngli diaqram çəksəydik, bu ən daxili iç-içə səviyyədə dördüncü scope var, deməli dördüncü rəng lazım olardı; bəlkə də həmin scope üçün NARINCI(4) seçərdik:'
        },
        {
          code: 'var student = students.find(\n  student =>\n    // function scope: ORANGE(4)\n    student.id == studentID\n);'
        },
        {
          en: 'The BLUE(2) `studentID` reference is actually inside the ORANGE(4) scope rather than the GREEN(3) scope of `greetStudent(..)`; also, the `student` parameter of the arrow function is ORANGE(4), shadowing the GREEN(3) `student`.',
          az: 'MAVİ(2) `studentID` istinadı əslində `greetStudent(..)`-un YAŞIL(3) scope-unda yox, NARINCI(4) scope-dadır; həmçinin arrow funksiyanın `student` parametri NARINCI(4)-dür və YAŞIL(3) `student`-i kölgələyir.'
        },
        {
          en: "The consequence here is that this arrow function passed as a callback to the array's `find(..)` method has to hold the closure over `studentID`, rather than `greetStudent(..)` holding that closure. That's not too big of a deal, as everything still works as expected. It's just important not to skip over the fact that even tiny arrow functions can get in on the closure party.",
          az: 'Buradakı nəticə budur ki, `studentID` üzərindəki closure-u `greetStudent(..)` yox, massivin `find(..)` metoduna callback kimi ötürülən bu arrow funksiya saxlamalıdır. Bu, çox böyük məsələ deyil, çünki hər şey yenə gözlənildiyi kimi işləyir. Sadəcə vacibdir ki, hətta kiçik arrow funksiyaların da closure «şənliyinə» qoşula bildiyi faktını gözdən qaçırmayasan.'
        }
      ],
      terms: ['arrow-function', 'callback']
    },
    {
      id: 'adding-up',
      heading: 'Adding Up Closures',
      headingAz: 'Closure-ları toplamaq',
      blocks: [
        { en: "Let's examine one of the canonical examples often cited for closure:", az: 'Closure üçün tez-tez gətirilən kanonik nümunələrdən birinə baxaq:' },
        {
          code: 'function adder(num1) {\n  return function addTo(num2){\n    return num1 + num2;\n  };\n}\n\nvar add10To = adder(10);\nvar add42To = adder(42);\n\nadd10To(15);   // 25\nadd42To(9);    // 51'
        },
        {
          en: "Each instance of the inner `addTo(..)` function is closing over its own `num1` variable (with values `10` and `42`, respectively), so those `num1`'s don't go away just because `adder(..)` finishes. When we later invoke one of those inner `addTo(..)` instances, such as the `add10To(15)` call, its closed-over `num1` variable still exists and still holds the original `10` value. The operation is thus able to perform `10 + 15` and return the answer `25`.",
          az: 'Daxili `addTo(..)` funksiyasının hər nüsxəsi öz `num1` dəyişəni (müvafiq olaraq `10` və `42` dəyərləri ilə) üzərində qapanır, ona görə həmin `num1`-lər sadəcə `adder(..)` bitdiyi üçün yox olmur. Sonra həmin daxili `addTo(..)` nüsxələrindən birini, məsələn `add10To(15)`-i çağıranda onun qapandığı `num1` dəyişəni hələ də mövcuddur və ilkin `10` dəyərini saxlayır. Beləliklə əməliyyat `10 + 15` hesablayıb `25` cavabını qaytara bilir.'
        },
        {
          en: "An important detail might have been too easy to gloss over in that previous paragraph, so let's reinforce it: closure is associated with an instance of a function, rather than its single lexical definition. In the preceding snippet, there's just one inner `addTo(..)` function defined inside `adder(..)`, so it might seem like that would imply a single closure.",
          az: 'Əvvəlki abzasda vacib bir detalın üstündən asanlıqla keçmək olardı, ona görə onu möhkəmləndirək: closure funksiyanın tək leksik tərifi ilə yox, funksiyanın nüsxəsi ilə əlaqəlidir. Əvvəlki nümunədə `adder(..)`-un içində yalnız bir daxili `addTo(..)` funksiyası təyin olunub, ona görə elə görünə bilər ki, bu, tək closure deməkdir.'
        },
        {
          en: 'But actually, every time the outer `adder(..)` function runs, a *new* inner `addTo(..)` function instance is created, and for each new instance, a new closure. So each inner function instance (labeled `add10To(..)` and `add42To(..)` in our program) has its own closure over its own instance of the scope environment from that execution of `adder(..)`.',
          az: 'Lakin əslində xarici `adder(..)` funksiyası hər dəfə işləyəndə *yeni* daxili `addTo(..)` funksiya nüsxəsi yaradılır və hər yeni nüsxə üçün yeni closure. Deməli, hər daxili funksiya nüsxəsinin (proqramımızda `add10To(..)` və `add42To(..)` adlandırılanlar) `adder(..)`-un həmin icrasından gələn scope mühitinin öz nüsxəsi üzərində öz closure-u var.'
        },
        {
          en: 'Even though closure is based on lexical scope, which is handled at compile time, closure is observed as a runtime characteristic of function instances.',
          az: 'Closure kompilyasiya zamanı emal olunan leksik scope-a əsaslansa da, o, funksiya nüsxələrinin icra zamanı xüsusiyyəti kimi müşahidə olunur.'
        }
      ],
      note: 'Bu, React-in əsas mexanizmidir: hər render komponent funksiyasının yeni çağırışıdır, deməli, içində yaradılan hər handler **yeni nüsxədir** və **həmin renderin** dəyişənləri üzərində qapanır.\n\n```js\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const log = () => console.log(count);   // bu renderin count-u\n  return <button onClick={log}>{count}</button>;\n}\n```\n\n«Stale closure» buradan yaranır: köhnə renderdə yaradılmış funksiya köhnə `count`-u görür.',
      terms: ['re-render', 'usestate']
    },
    {
      id: 'live-link',
      heading: 'Live Link, Not a Snapshot',
      headingAz: 'Canlı əlaqə, snapshot yox',
      blocks: [
        {
          en: "In both examples from the previous sections, we **read the value from a variable** that was held in a closure. That makes it feel like closure might be a snapshot of a value at some given moment. Indeed, that's a common misconception.",
          az: 'Əvvəlki bölmələrdəki hər iki nümunədə closure-da saxlanan **dəyişəndən dəyəri oxuduq**. Bu, elə təəssürat yaradır ki, closure hansısa andakı dəyərin anlıq surətidir (snapshot). Həqiqətən, bu, geniş yayılmış yanlış təsəvvürdür.'
        },
        {
          en: "Closure is actually a live link, preserving access to the full variable itself. We're not limited to merely reading a value; the closed-over variable can be updated (re-assigned) as well! By closing over a variable in a function, we can keep using that variable (read and write) as long as that function reference exists in the program, and from anywhere we want to invoke that function. This is why closure is such a powerful technique used widely across so many areas of programming!",
          az: 'Closure əslində canlı əlaqədir və dəyişənin özünə tam çıxışı qoruyur. Sadəcə dəyəri oxumaqla məhdudlaşmırıq; qapanılan dəyişən yenilənə (yenidən mənimsədilə) də bilər! Funksiyada dəyişən üzərində qapanmaqla həmin funksiyaya istinad proqramda mövcud olduqca və həmin funksiyanı çağırmaq istədiyimiz istənilən yerdən o dəyişəndən istifadəyə (oxumaq və yazmaq) davam edə bilərik. Closure-un proqramlaşdırmanın bu qədər çox sahəsində geniş istifadə olunan güclü texnika olmasının səbəbi budur!'
        },
        { en: 'Figure 4 depicts the function instances and scope links:', az: 'Şəkil 4 funksiya nüsxələrini və scope əlaqələrini təsvir edir:' },
        {
          caption: 'Şəkil 4: Closure-ların vizuallaşdırılması',
          code: 'RED(1) global\n│  add10To ───────────────┐      add42To ───────────────┐\n│                         ▼                              ▼\n├─ BLUE(2) adder(10)   GREEN(3) addTo   BLUE(2) adder(42)   GREEN(3) addTo\n│    num1 = 10  ◄──── closure            num1 = 42  ◄──── closure'
        },
        {
          en: 'As shown in Figure 4, each call to `adder(..)` creates a new BLUE(2) scope containing a `num1` variable, as well as a new instance of `addTo(..)` function as a GREEN(3) scope. Notice that the function instances (`addTo10(..)` and `addTo42(..)`) are present in and invoked from the RED(1) scope.',
          az: 'Şəkil 4-də göstərildiyi kimi, `adder(..)`-a hər çağırış `num1` dəyişənini ehtiva edən yeni MAVİ(2) scope, həmçinin YAŞIL(3) scope kimi `addTo(..)` funksiyasının yeni nüsxəsini yaradır. Diqqət et ki, funksiya nüsxələri (`addTo10(..)` və `addTo42(..)`) QIRMIZI(1) scope-da mövcuddur və oradan çağırılır.'
        },
        { en: "Now let's examine an example where the closed-over variable is updated:", az: 'İndi qapanılan dəyişənin yeniləndiyi nümunəyə baxaq:' },
        {
          code: 'function makeCounter() {\n  var count = 0;\n\n  return function getCurrent() {\n    count = count + 1;\n    return count;\n  };\n}\n\nvar hits = makeCounter();\n\n// later\n\nhits();   // 1\n\n// later\n\nhits();   // 2\nhits();   // 3'
        },
        {
          en: 'The `count` variable is closed over by the inner `getCurrent()` function, which keeps it around instead of it being subjected to GC. The `hits()` function calls access *and* update this variable, returning an incrementing count each time.',
          az: '`count` dəyişəni üzərində daxili `getCurrent()` funksiyası qapanır və onu GC-yə məruz qalmaqdan qoruyub saxlayır. `hits()` funksiyasının çağırışları bu dəyişənə müraciət edir *və* onu yeniləyir, hər dəfə artan sayı qaytarır.'
        },
        {
          en: "Though the enclosing scope of a closure is typically from a function, that's not actually required; there only needs to be an inner function present inside an outer scope:",
          az: 'Closure-un əhatə edən scope-u adətən funksiyadan olsa da, bu, əslində məcburi deyil; sadəcə xarici scope-un içində daxili funksiyanın olması lazımdır:'
        },
        {
          code: 'var hits;\n{   // an outer scope (but not a function)\n  let count = 0;\n  hits = function getCurrent(){\n    count = count + 1;\n    return count;\n  };\n}\nhits();   // 1\nhits();   // 2\nhits();   // 3'
        },
        {
          en: "> **NOTE:** I deliberately defined `getCurrent()` as a `function` expression instead of a `function` declaration. This isn't about closure, but with the dangerous quirks of FiB (Chapter 6).",
          az: '> **QEYD:** `getCurrent()`-i qəsdən `function` bəyannaməsi yox, `function` ifadəsi kimi təyin etdim. Bu, closure ilə deyil, FiB-in təhlükəli qəribəlikləri ilə bağlıdır (6-cı fəsil).'
        },
        {
          en: 'Because it\'s so common to mistake closure as value-oriented instead of variable-oriented, developers sometimes get tripped up trying to use closure to snapshot-preserve a value from some moment in time. Consider:',
          az: 'Closure-u dəyişən yönümlü yox, dəyər yönümlü saymaq çox yayılmış səhv olduğu üçün developerlər bəzən hansısa andakı dəyəri anlıq surət kimi saxlamaq üçün closure-dan istifadə etməyə çalışarkən büdrəyirlər. Buna bax:'
        },
        {
          code: "var studentName = 'Frank';\n\nvar greeting = function hello() {\n  // we are closing over `studentName`,\n  // not \"Frank\"\n  console.log(\n    `Hello, ${ studentName }!`\n  );\n}\n\n// later\n\nstudentName = 'Suzy';\n\n// later\n\ngreeting();\n// Hello, Suzy!"
        },
        {
          en: 'By defining `greeting()` (aka, `hello()`) when `studentName` holds the value `"Frank"` (before the re-assignment to `"Suzy"`), the mistaken assumption is often that the closure will capture `"Frank"`. But `greeting()` is closed over the variable `studentName`, not its value. Whenever `greeting()` is invoked, the current value of the variable (`"Suzy"`, in this case) is reflected.',
          az: '`greeting()` (yəni `hello()`) `studentName` `"Frank"` dəyərini saxladığı vaxt (`"Suzy"`-yə yenidən mənimsətmədən əvvəl) təyin olunduğu üçün çox vaxt yanlış fərz olunur ki, closure `"Frank"`-ı tutacaq. Lakin `greeting()` `studentName` dəyişəninin dəyəri üzərində yox, dəyişənin özü üzərində qapanıb. `greeting()` hər dəfə çağırılanda dəyişənin cari dəyəri (bu halda `"Suzy"`) əks olunur.'
        },
        { en: 'The classic illustration of this mistake is defining functions inside a loop:', az: 'Bu səhvin klassik nümunəsi dövrün içində funksiyalar təyin etməkdir:' },
        {
          code: 'var keeps = [];\n\nfor (var i = 0; i < 3; i++) {\n  keeps[i] = function keepI(){\n    // closure over `i`\n    return i;\n  };\n}\n\nkeeps[0]();   // 3 -- WHY!?\nkeeps[1]();   // 3\nkeeps[2]();   // 3'
        },
        {
          en: "> **NOTE:** This kind of closure illustration typically uses a `setTimeout(..)` or some other callback like an event handler, inside the loop. I've simplified the example by storing function references in an array, so that we don't need to consider asynchronous timing in our analysis. The closure principle is the same, regardless.",
          az: '> **QEYD:** Closure-un bu cür nümunəsində adətən dövrün içində `setTimeout(..)` və ya hadisə işləyicisi kimi başqa callback istifadə olunur. Təhlildə asinxron zamanlamanı nəzərə almamaq üçün funksiya istinadlarını massivdə saxlayaraq nümunəni sadələşdirdim. Closure prinsipi hər halda eynidir.'
        },
        {
          en: 'You might have expected the `keeps[0]()` invocation to return `0`, since that function was created during the first iteration of the loop when `i` was `0`. But again, that assumption stems from thinking of closure as value-oriented rather than variable-oriented.',
          az: 'Gözləyə bilərdin ki, `keeps[0]()` çağırışı `0` qaytarsın, çünki həmin funksiya dövrün birinci iterasiyasında, `i` `0` olanda yaradılıb. Lakin yenə deyirəm, bu fərziyyə closure-u dəyişən yönümlü yox, dəyər yönümlü düşünməkdən qaynaqlanır.'
        },
        {
          en: 'Something about the structure of a `for`-loop can trick us into thinking that each iteration gets its own new `i` variable; in fact, this program only has one `i` since it was declared with `var`.',
          az: '`for` dövrünün quruluşunda nəsə bizi aldadıb hər iterasiyanın öz yeni `i` dəyişəninin olduğunu düşündürə bilər; əslində bu proqramda yalnız bir `i` var, çünki o, `var` ilə elan olunub.'
        },
        {
          en: "Each saved function returns `3`, because by the end of the loop, the single `i` variable in the program has been assigned `3`. Each of the three functions in the `keeps` array do have individual closures, but they're all closed over that same shared `i` variable.",
          az: 'Saxlanan hər funksiya `3` qaytarır, çünki dövrün sonunda proqramdakı tək `i` dəyişəninə `3` mənimsədilib. `keeps` massivindəki üç funksiyanın hər birinin ayrıca closure-u var, amma hamısı həmin ortaq `i` dəyişəni üzərində qapanıb.'
        },
        {
          en: 'Of course, a single variable can only ever hold one value at any given moment. So if you want to preserve multiple values, you need a different variable for each.',
          az: 'Əlbəttə, bir dəyişən istənilən anda yalnız bir dəyər saxlaya bilər. Deməli, bir neçə dəyəri qorumaq istəyirsənsə, hər biri üçün ayrı dəyişən lazımdır.'
        },
        {
          en: "How could we do that in the loop snippet? Let's create a new variable for each iteration:",
          az: 'Dövr nümunəsində bunu necə edə bilərdik? Gəl hər iterasiya üçün yeni dəyişən yaradaq:'
        },
        {
          code: "var keeps = [];\n\nfor (var i = 0; i < 3; i++) {\n  // new `j` created each iteration, which gets\n  // a copy of the value of `i` at this moment\n  let j = i;\n\n  // the `i` here isn't being closed over, so\n  // it's fine to immediately use its current\n  // value in each loop iteration\n  keeps[i] = function keepEachJ(){\n    // close over `j`, not `i`!\n    return j;\n  };\n}\nkeeps[0]();   // 0\nkeeps[1]();   // 1\nkeeps[2]();   // 2"
        },
        {
          en: 'Each function is now closed over a separate (new) variable from each iteration, even though all of them are named `j`. And each `j` gets a copy of the value of `i` at that point in the loop iteration; that `j` never gets re-assigned. So all three functions now return their expected values: `0`, `1`, and `2`!',
          az: 'İndi hər funksiya, hamısının adı `j` olsa da, hər iterasiyadan gələn ayrı (yeni) dəyişən üzərində qapanır. Hər `j` dövr iterasiyasının həmin nöqtəsindəki `i` dəyərinin surətini alır; həmin `j` heç vaxt yenidən mənimsədilmir. Beləliklə üç funksiyanın hamısı indi gözlənilən dəyərləri qaytarır: `0`, `1` və `2`!'
        },
        {
          en: 'Again remember, even if we were using asynchrony in this program, such as passing each inner `keepEachJ()` function into `setTimeout(..)` or some event handler subscription, the same kind of closure behavior would still be observed.',
          az: 'Yenə yadda saxla: bu proqramda asinxronluqdan istifadə etsəydik belə — məsələn, hər daxili `keepEachJ()` funksiyasını `setTimeout(..)`-a və ya hansısa hadisə işləyicisi abunəliyinə ötürsəydik — eyni closure davranışı müşahidə olunardı.'
        },
        {
          en: 'Recall the "Loops" section in Chapter 5, which illustrates how a `let` declaration in a `for` loop actually creates not just one variable for the loop, but actually creates a new variable for *each iteration* of the loop. That trick/quirk is exactly what we need for our loop closures:',
          az: '5-ci fəsildəki «Dövrlər» bölməsini xatırla: orada göstərilir ki, `for` dövründəki `let` bəyannaməsi dövr üçün sadəcə bir dəyişən yox, əslində dövrün *hər iterasiyası* üçün yeni dəyişən yaradır. Bu hiylə/qəribəlik dövrdəki closure-larımız üçün məhz lazım olandır:'
        },
        {
          code: "var keeps = [];\n\nfor (let i = 0; i < 3; i++) {\n  // the `let i` gives us a new `i` for\n  // each iteration, automatically!\n  keeps[i] = function keepEachI(){\n    return i;\n  };\n}\nkeeps[0]();   // 0\nkeeps[1]();   // 1\nkeeps[2]();   // 2"
        },
        {
          en: "Since we're using `let`, three `i`'s are created, one for each loop, so each of the three closures *just work* as expected.",
          az: '`let` istifadə etdiyimiz üçün üç `i` yaradılır — hər dövr üçün bir — ona görə üç closure-un hər biri gözlənildiyi kimi *sadəcə işləyir*.'
        }
      ],
      note: '**Closure dəyəri yox, dəyişəni saxlayır** — bu fəslin ən vacib cümləsidir.\n\nReact-də bunun əksini görürsən: `count` `const`-dur və hər render yeni dəyişən yaradır, ona görə köhnə closure köhnə dəyişəni (köhnə dəyəri) görür. Həll yolları:\n\n```js\nsetCount((c) => c + 1);          // funksional yeniləmə — son dəyəri alır\nconst ref = useRef(count);       // ref — bütün renderlər üçün tək «dəyişən»\n```\n\n`useRef` məhz `makeCounter`-dəki `count` kimi işləyir: bir dəyişən, çox oxuyan.',
      terms: ['usestate']
    },
    {
      id: 'common-closures',
      heading: 'Common Closures: Ajax and Events',
      headingAz: 'Adi closure-lar: Ajax və hadisələr',
      blocks: [
        { en: 'Closure is most commonly encountered with callbacks:', az: 'Closure-a ən çox callback-lərdə rast gəlinir:' },
        {
          code: 'function lookupStudentRecord(studentID) {\n  ajax(\n    `https://some.api/student/${ studentID }`,\n    function onRecord(record) {\n      console.log(\n        `${ record.name } (${ studentID })`\n      );\n    }\n  );\n}\n\nlookupStudentRecord(114);\n// Frank (114)'
        },
        {
          en: 'The `onRecord(..)` callback is going to be invoked at some point in the future, after the response from the Ajax call comes back. This invocation will happen from the internals of the `ajax(..)` utility, wherever that comes from. Furthermore, when that happens, the `lookupStudentRecord(..)` call will long since have completed.',
          az: '`onRecord(..)` callback-i gələcəkdə, Ajax çağırışının cavabı qayıtdıqdan sonra hansısa anda çağırılacaq. Bu çağırış `ajax(..)` utilitinin — o haradan gəlirsə gəlsin — daxilindən baş verəcək. Üstəlik, bu baş verəndə `lookupStudentRecord(..)` çağırışı çoxdan tamamlanmış olacaq.'
        },
        {
          en: 'Why then is `studentID` still around and accessible to the callback? Closure.',
          az: 'Bəs onda `studentID` niyə hələ də mövcuddur və callback üçün əlçatandır? Closure.'
        },
        { en: 'Event handlers are another common usage of closure:', az: 'Hadisə işləyiciləri closure-un başqa bir geniş yayılmış istifadəsidir:' },
        {
          code: 'function listenForClicks(btn,label) {\n  btn.addEventListener("click",function onClick(){\n    console.log(\n      `The ${ label } button was clicked!`\n    );\n  });\n}\n\nvar submitBtn = document.getElementById("submit-btn");\n\nlistenForClicks(submitBtn,"Checkout");'
        },
        {
          en: 'The `label` parameter is closed over by the `onClick(..)` event handler callback. When the button is clicked, `label` still exists to be used. This is closure.',
          az: '`label` parametri üzərində `onClick(..)` hadisə işləyicisi callback-i qapanır. Düyməyə basılanda `label` hələ də istifadə üçün mövcuddur. Bu, closure-dur.'
        }
      ],
      note: 'Frontend-də yazdığın asinxron kodun demək olar ki, hamısı closure-dur:\n\n```js\nasync function loadUser(id) {\n  const res = await fetch(`/api/users/${id}`);\n  // await-dən sonra da `id` əlçatandır — closure\n  return { id, ...(await res.json()) };\n}\n```\n\n`fetch(...).then(...)`, `setTimeout`, `addEventListener`, `useEffect` — hamısı funksiyanı «sonraya» ötürür və o funksiya yarandığı mühiti özü ilə aparır.',
      terms: ['event-listener', 'fetch', 'promise']
    },
    {
      id: 'observable-definition',
      heading: "What If I Can't See It?",
      headingAz: 'Görə bilmirəmsə?',
      blocks: [
        { en: "You've probably heard this common adage:", az: 'Yəqin bu məşhur deyimi eşitmisən:' },
        {
          en: '> If a tree falls in the forest but nobody is around to hear it, does it make a sound?',
          az: '> Meşədə ağac yıxılırsa, amma ətrafda onu eşidən yoxdursa, səs çıxırmı?'
        },
        {
          en: "It's a silly bit of philosophical gymnastics. Of course from a scientific perspective, sound waves are created. But the real point: *does it matter* if the sound happens?",
          az: 'Bu, bir az axmaq fəlsəfi gimnastikadır. Əlbəttə, elmi baxımdan səs dalğaları yaranır. Amma əsl məsələ: səsin olub-olmamasının *fərqi varmı*?'
        },
        {
          en: 'Remember, the emphasis in our definition of closure is observability. If a closure exists (in a technical, implementation, or academic sense) but it cannot be observed in our programs, *does it matter?* No.',
          az: 'Unutma, closure tərifimizdə vurğu müşahidə olunmaqdadır. Closure (texniki, reallaşdırma və ya akademik mənada) mövcuddursa, amma proqramlarımızda müşahidə oluna bilmirsə, *bunun fərqi varmı?* Yox.'
        },
        {
          en: "To reinforce this point, let's look at some examples that are *not* observably based on closure.",
          az: 'Bu fikri möhkəmləndirmək üçün müşahidə baxımından closure-a əsaslan*mayan* bəzi nümunələrə baxaq.'
        },
        { en: 'For example, invoking a function that makes use of lexical scope lookup:', az: 'Məsələn, leksik scope axtarışından istifadə edən funksiyanı çağırmaq:' },
        {
          code: 'function say(myName) {\n  var greeting = "Hello";\n  output();\n\n  function output() {\n    console.log(\n      `${ greeting }, ${ myName }!`\n    );\n  }\n}\n\nsay("Kyle");\n// Hello, Kyle!'
        },
        {
          en: "The inner function `output()` accesses the variables `greeting` and `myName` from its enclosing scope. But the invocation of `output()` happens in that same scope, where of course `greeting` and `myName` are still available; that's just lexical scope, not closure.",
          az: 'Daxili `output()` funksiyası əhatə edən scope-dan `greeting` və `myName` dəyişənlərinə müraciət edir. Lakin `output()`-un çağırışı həmin eyni scope-da baş verir, orada isə `greeting` və `myName`, təbii ki, hələ də əlçatandır; bu, sadəcə leksik scope-dur, closure deyil.'
        },
        {
          en: "Any lexically scoped language whose functions didn't support closure would still behave this same way.",
          az: 'Funksiyaları closure-u dəstəkləməyən istənilən leksik scope-lu dil də eyni şəkildə davranardı.'
        },
        {
          en: "In fact, global scope variables essentially cannot be (observably) closed over, because they're always accessible from everywhere. No function can ever be invoked in any part of the scope chain that is not a descendant of the global scope.",
          az: 'Əslində qlobal scope dəyişənləri üzərində mahiyyətcə (müşahidə olunan şəkildə) qapanmaq mümkün deyil, çünki onlar həmişə hər yerdən əlçatandır. Heç bir funksiya scope zəncirinin qlobal scope-un nəslindən olmayan hissəsində çağırıla bilməz.'
        },
        { en: 'Consider:', az: 'Buna bax:' },
        {
          code: "var students = [\n  { id: 14, name: 'Kyle' },\n  { id: 73, name: 'Suzy' },\n  { id: 112, name: 'Frank' },\n  { id: 6, name: 'Sarah' }\n];\n\nfunction getFirstStudent() {\n  return function firstStudent(){\n    return students[0].name;\n  };\n}\n\nvar student = getFirstStudent();\n\nstudent();\n// Kyle"
        },
        {
          en: 'The inner `firstStudent()` function does reference `students`, which is a variable outside its own scope. But since `students` happens to be from the global scope, no matter where that function is invoked in the program, its ability to access `students` is nothing more special than normal lexical scope.',
          az: 'Daxili `firstStudent()` funksiyası öz scope-undan kənardakı `students` dəyişəninə istinad edir. Lakin `students` qlobal scope-dan olduğu üçün həmin funksiya proqramın harasında çağırılsa da, onun `students`-ə çata bilməsi adi leksik scope-dan heç nə ilə fərqlənmir.'
        },
        {
          en: "All function invocations can access global variables, regardless of whether closure is supported by the language or not. Global variables don't need to be closed over.",
          az: 'Dilin closure-u dəstəkləyib-dəstəkləməməsindən asılı olmayaraq bütün funksiya çağırışları qlobal dəyişənlərə çata bilir. Qlobal dəyişənlər üzərində qapanmağa ehtiyac yoxdur.'
        },
        { en: "Variables that are merely present but never accessed don't result in closure:", az: 'Sadəcə mövcud olan, amma heç vaxt müraciət olunmayan dəyişənlər closure yaratmır:' },
        {
          code: 'function lookupStudent(studentID) {\n  return function nobody(){\n    var msg = "Nobody\'s here yet.";\n    console.log(msg);\n  };\n}\n\nvar student = lookupStudent(112);\n\nstudent();\n// Nobody\'s here yet.'
        },
        {
          en: "The inner function `nobody()` doesn't close over any outer variables — it only uses its own variable `msg`. Even though `studentID` is present in the enclosing scope, `studentID` is not referred to by `nobody()`. The JS engine doesn't need to keep `studentID` around after `lookupStudent(..)` has finished running, so GC wants to clean up that memory!",
          az: 'Daxili `nobody()` funksiyası heç bir xarici dəyişən üzərində qapanmır — yalnız öz `msg` dəyişənindən istifadə edir. `studentID` əhatə edən scope-da olsa da, `nobody()` ona istinad etmir. `lookupStudent(..)` işini bitirdikdən sonra JS mühərrikinin `studentID`-ni saxlamasına ehtiyac yoxdur, ona görə GC həmin yaddaşı təmizləmək istəyir!'
        },
        {
          en: 'Whether JS functions support closure or not, this program would behave the same. Therefore, no observed closure here.',
          az: 'JS funksiyaları closure-u dəstəkləsə də, dəstəkləməsə də, bu proqram eyni davranardı. Deməli, burada müşahidə olunan closure yoxdur.'
        },
        { en: "If there's no function invocation, closure can't be observed:", az: 'Funksiya çağırışı yoxdursa, closure müşahidə oluna bilməz:' },
        {
          code: 'function greetStudent(studentName) {\n  return function greeting(){\n    console.log(\n      `Hello, ${ studentName }!`\n    );\n  };\n}\n\ngreetStudent("Kyle");\n\n// nothing else happens'
        },
        {
          en: "This one's tricky, because the outer function definitely does get invoked. But the inner function is the one that could have had closure, and yet it's never invoked; the returned function here is just thrown away. So even if technically the JS engine created closure for a brief moment, it was not observed in any meaningful way in this program.",
          az: 'Bu, çətin haldır, çünki xarici funksiya mütləq çağırılır. Lakin closure-u ola biləcək funksiya daxili funksiyadır və o, heç vaxt çağırılmır; burada qaytarılan funksiya sadəcə atılır. Deməli, JS mühərriki texniki olaraq qısa bir an üçün closure yaratmış olsa belə, bu proqramda o, heç bir mənalı şəkildə müşahidə olunmayıb.'
        },
        {
          en: "A tree may have fallen... but we didn't hear it, so we don't care.",
          az: 'Ağac yıxılmış ola bilər... amma biz eşitmədik, ona görə bizim üçün fərqi yoxdur.'
        },
        { en: '## Observable Definition', az: '## Müşahidəyə əsaslanan tərif' },
        { en: "We're now ready to define closure:", az: 'İndi closure-u təyin etməyə hazırıq:' },
        {
          en: "> Closure is observed when a function uses variable(s) from outer scope(s) even while running in a scope where those variable(s) wouldn't be accessible.",
          az: '> Closure funksiya xarici scope(lar)dan dəyişən(lər) istifadə edəndə, həm də o dəyişən(lər)in əlçatan olmayacağı scope-da işləyərkən belə istifadə edəndə müşahidə olunur.'
        },
        {
          en: 'The key parts of this definition are:\n\n- Must be a function involved\n- Must reference at least one variable from an outer scope\n- Must be invoked in a different branch of the scope chain from the variable(s)',
          az: 'Bu tərifin əsas hissələri bunlardır:\n\n- Funksiya iştirak etməlidir\n- Xarici scope-dan ən azı bir dəyişənə istinad etməlidir\n- Dəyişən(lər)dən fərqli scope zənciri qolunda çağırılmalıdır'
        },
        {
          en: 'This observation-oriented definition means we shouldn\'t dismiss closure as some indirect, academic trivia. Instead, we should look and plan for the direct, concrete effects closure has on our program behavior.',
          az: 'Bu müşahidə yönümlü tərif o deməkdir ki, closure-u dolayı, akademik xırdalıq kimi rədd etməməliyik. Əksinə, closure-un proqramımızın davranışına birbaşa, konkret təsirlərini görməli və onları planlaşdırmalıyıq.'
        }
      ],
      note: 'Müsahibədə «closure nədir?» sualına bu tərifi üç şərtlə söylə, sonra `makeCounter` nümunəsini yaz. Bu, «funksiya içində funksiya» kimi yarımçıq cavabdan xeyli güclüdür.\n\nYadda saxla: funksiya öz scope-u daxilində çağırılırsa — bu, **sadəcə leksik scope-dur**. Closure funksiya «başqa yerə getdikdə» görünür.'
    },
    {
      id: 'lifecycle-gc',
      heading: 'The Closure Lifecycle and Garbage Collection (GC)',
      headingAz: 'Closure-un həyat dövrü və zibil yığımı (GC)',
      blocks: [
        {
          en: 'Since closure is inherently tied to a function instance, its closure over a variable lasts as long as there is still a reference to that function.',
          az: 'Closure mahiyyətcə funksiya nüsxəsinə bağlı olduğu üçün onun dəyişən üzərindəki closure-u həmin funksiyaya istinad qaldıqca davam edir.'
        },
        {
          en: "If ten functions all close over the same variable, and over time nine of these function references are discarded, the lone remaining function reference still preserves that variable. Once that final function reference is discarded, the last closure over that variable is gone, and the variable itself is GC'd.",
          az: 'On funksiyanın hamısı eyni dəyişən üzərində qapanırsa və zaman keçdikcə bu funksiya istinadlarından doqquzu atılırsa, qalan yeganə funksiya istinadı həmin dəyişəni hələ də qoruyur. Son funksiya istinadı atılan kimi həmin dəyişən üzərindəki sonuncu closure yox olur və dəyişənin özü GC tərəfindən təmizlənir.'
        },
        {
          en: "This has an important impact on building efficient and performant programs. Closure can unexpectedly prevent the GC of a variable that you're otherwise done with, which leads to run-away memory usage over time. That's why it's important to discard function references (and thus their closures) when they're not needed anymore.",
          az: 'Bunun səmərəli və məhsuldar proqramlar qurmağa mühüm təsiri var. Closure artıq işin bitdiyi dəyişənin GC ilə təmizlənməsinin gözlənilmədən qarşısını ala bilər və bu, zaman keçdikcə nəzarətsiz yaddaş istifadəsinə aparır. Buna görə funksiya istinadlarını (və deməli onların closure-larını) artıq lazım olmayanda atmaq vacibdir.'
        },
        { en: 'Consider:', az: 'Buna bax:' },
        {
          code: 'function manageBtnClickEvents(btn) {\n  var clickHandlers = [];\n\n  return function listener(cb){\n    if (cb) {\n      let clickHandler =\n        function onClick(evt){\n          console.log("clicked!");\n          cb(evt);\n        };\n      clickHandlers.push(clickHandler);\n      btn.addEventListener(\n        "click",\n        clickHandler\n      );\n    }\n    else {\n      // passing no callback unsubscribes\n      // all click handlers\n      for (let handler of clickHandlers) {\n        btn.removeEventListener(\n          "click",\n          handler\n        );\n      }\n\n      clickHandlers = [];\n    }\n  };\n}\n\n// var mySubmitBtn = ..\nvar onSubmit = manageBtnClickEvents(mySubmitBtn);\n\nonSubmit(function checkout(evt){\n  // handle checkout\n});\n\nonSubmit(function trackAction(evt){\n  // log action to analytics\n});\n\n// later, unsubscribe all handlers:\nonSubmit();'
        },
        {
          en: 'In this program, the inner `onClick(..)` function holds a closure over the passed in `cb` (the provided event callback). That means the `checkout()` and `trackAction()` function expression references are held via closure (and cannot be GC\'d) for as long as these event handlers are subscribed.',
          az: 'Bu proqramda daxili `onClick(..)` funksiyası ötürülən `cb` (verilən hadisə callback-i) üzərində closure saxlayır. Bu o deməkdir ki, bu hadisə işləyiciləri abunə olduqca `checkout()` və `trackAction()` funksiya ifadəsi istinadları closure vasitəsilə saxlanılır (və GC ilə təmizlənə bilmir).'
        },
        {
          en: 'When we call `onSubmit()` with no input on the last line, all event handlers are unsubscribed, and the `clickHandlers` array is emptied. Once all click handler function references are discarded, the closures of `cb` references to `checkout()` and `trackAction()` are discarded.',
          az: 'Son sətirdə `onSubmit()`-i girişsiz çağıranda bütün hadisə işləyicilərinin abunəliyi ləğv olunur və `clickHandlers` massivi boşaldılır. Bütün klik işləyicisi funksiya istinadları atılan kimi `checkout()` və `trackAction()`-a olan `cb` istinadlarının closure-ları da atılır.'
        },
        {
          en: "When considering the overall health and efficiency of the program, unsubscribing an event handler when it's no longer needed can be even more important than the initial subscription!",
          az: 'Proqramın ümumi sağlamlığı və səmərəliliyi baxımından hadisə işləyicisi artıq lazım olmayanda onun abunəliyini ləğv etmək ilkin abunəlikdən də vacib ola bilər!'
        }
      ],
      note: 'Bu, React-də `useEffect` cleanup funksiyasının niyə mövcud olduğunun izahıdır:\n\n```js\nuseEffect(() => {\n  const onResize = () => setWidth(window.innerWidth);\n  window.addEventListener(\'resize\', onResize);\n  return () => window.removeEventListener(\'resize\', onResize);\n}, []);\n```\n\nCleanup olmasa, komponent unmount olandan sonra da `onResize` (və onun closure-u) yaşayır — bu, klassik [[memory-leak]]-dir.',
      terms: ['cleanup', 'useeffect']
    },
    {
      id: 'per-variable',
      heading: 'Per Variable or Per Scope?',
      headingAz: 'Dəyişən üzrə, yoxsa scope üzrə?',
      blocks: [
        {
          en: 'Another question we need to tackle: should we think of closure as applied only to the referenced outer variable(s), or does closure preserve the entire scope chain with all its variables?',
          az: 'Həll etməli olduğumuz başqa sual: closure-u yalnız istinad olunan xarici dəyişən(lər)ə tətbiq olunan kimi düşünməliyik, yoxsa closure bütün dəyişənləri ilə bütöv scope zəncirini qoruyur?'
        },
        {
          en: 'In other words, in the previous event subscription snippet, is the inner `onClick(..)` function closed over only `cb`, or is it also closed over `clickHandler`, `clickHandlers`, and `btn`?',
          az: 'Başqa sözlə, əvvəlki hadisə abunəliyi nümunəsində daxili `onClick(..)` funksiyası yalnız `cb` üzərində qapanır, yoxsa həm də `clickHandler`, `clickHandlers` və `btn` üzərində?'
        },
        {
          en: 'Conceptually, closure is **per variable** rather than *per scope*. Ajax callbacks, event handlers, and all other forms of function closures are typically assumed to close over only what they explicitly reference.',
          az: 'Konseptual olaraq closure *scope üzrə* yox, **dəyişən üzrə**dir. Ajax callback-lərinin, hadisə işləyicilərinin və funksiya closure-larının bütün digər formalarının adətən yalnız açıq şəkildə istinad etdikləri şey üzərində qapandığı fərz olunur.'
        },
        { en: 'But the reality is more complicated than that.', az: 'Lakin reallıq bundan mürəkkəbdir.' },
        { en: 'Another program to consider:', az: 'Baxılası başqa bir proqram:' },
        {
          code: "function manageStudentGrades(studentRecords) {\n  var grades = studentRecords.map(getGrade);\n\n  return addGrade;\n\n  // ************************\n\n  function getGrade(record){\n    return record.grade;\n  }\n\n  function sortAndTrimGradesList() {\n    // sort by grades, descending\n    grades.sort(function desc(g1,g2){\n      return g2 - g1;\n    });\n\n    // only keep the top 10 grades\n    grades = grades.slice(0,10);\n  }\n\n  function addGrade(newGrade) {\n    grades.push(newGrade);\n    sortAndTrimGradesList();\n    return grades;\n  }\n}\n\nvar addNextGrade = manageStudentGrades([\n  { id: 14, name: 'Kyle', grade: 86 },\n  { id: 73, name: 'Suzy', grade: 87 },\n  { id: 112, name: 'Frank', grade: 75 },\n  // ..many more records..\n  { id: 6, name: 'Sarah', grade: 91 }\n]);\n\n// later\n\naddNextGrade(81);\naddNextGrade(68);\n// [ .., .., ... ]"
        },
        {
          en: 'The outer function `manageStudentGrades(..)` takes a list of student records, and returns an `addGrade(..)` function reference, which we externally label `addNextGrade(..)`. Each time we call `addNextGrade(..)` with a new grade, we get back a current list of the top 10 grades, sorted numerically descending (see `sortAndTrimGradesList()`).',
          az: 'Xarici `manageStudentGrades(..)` funksiyası tələbə qeydlərinin siyahısını qəbul edir və çöldə `addNextGrade(..)` adlandırdığımız `addGrade(..)` funksiya istinadını qaytarır. `addNextGrade(..)`-u hər dəfə yeni qiymətlə çağıranda ədədi olaraq azalan sırada düzülmüş ən yaxşı 10 qiymətin cari siyahısını geri alırıq (bax: `sortAndTrimGradesList()`).'
        },
        {
          en: "From the end of the original `manageStudentGrades(..)` call, and between the multiple `addNextGrade(..)` calls, the `grades` variable is preserved inside `addGrade(..)` via closure; that's how the running list of top grades is maintained. Remember, it's a closure over the *variable* `grades` itself, not the array it holds.",
          az: 'İlkin `manageStudentGrades(..)` çağırışının sonundan və çoxsaylı `addNextGrade(..)` çağırışları arasında `grades` dəyişəni closure vasitəsilə `addGrade(..)`-un içində qorunur; ən yaxşı qiymətlərin cari siyahısı məhz belə saxlanılır. Unutma, bu, saxladığı massiv üzərində yox, `grades` *dəyişəninin* özü üzərində closure-dur.'
        },
        {
          en: "That's not the only closure involved, however. Can you spot other variables being closed over?",
          az: 'Lakin iştirak edən yeganə closure bu deyil. Üzərində qapanılan başqa dəyişənləri görə bilirsənmi?'
        },
        {
          en: 'Did you spot that `addGrade(..)` references `sortAndTrimGradesList`? That means it\'s also closed over that identifier, which happens to hold a reference to the `sortAndTrimGradesList()` function. That second inner function has to stay around so that `addGrade(..)` can keep calling it, which also means any variables *it* closes over stick around — though, in this case, nothing extra is closed over there.',
          az: '`addGrade(..)`-un `sortAndTrimGradesList`-ə istinad etdiyini gördünmü? Bu o deməkdir ki, o, həm də `sortAndTrimGradesList()` funksiyasına istinad saxlayan həmin identifikator üzərində qapanır. Bu ikinci daxili funksiya qalmalıdır ki, `addGrade(..)` onu çağırmağa davam edə bilsin; bu isə o deməkdir ki, *onun* qapandığı istənilən dəyişən də qalır — baxmayaraq ki, bu halda orada əlavə heç nə üzərində qapanılmır.'
        },
        { en: 'What else is closed over?', az: 'Başqa nə üzərində qapanılır?' },
        {
          en: "Consider the `getGrade` variable (and its function); is it closed over? It's referenced in the outer scope of `manageStudentGrades(..)` in the `.map(getGrade)` call. But it's not referenced in `addGrade(..)` or `sortAndTrimGradesList()`.",
          az: '`getGrade` dəyişəninə (və onun funksiyasına) bax; onun üzərində qapanılırmı? O, `manageStudentGrades(..)`-un xarici scope-unda `.map(getGrade)` çağırışında istinad olunur. Lakin `addGrade(..)` və ya `sortAndTrimGradesList()`-də istinad olunmur.'
        },
        {
          en: "What about the (potentially) large list of student records we pass in as `studentRecords`? Is that variable closed over? If it is, the array of student records is never getting GC'd, which leads to this program holding onto a larger amount of memory than we might assume. But if we look closely again, none of the inner functions reference `studentRecords`.",
          az: 'Bəs `studentRecords` kimi ötürdüyümüz (potensial olaraq) böyük tələbə qeydləri siyahısı? Bu dəyişən üzərində qapanılırmı? Əgər qapanılırsa, tələbə qeydləri massivi heç vaxt GC ilə təmizlənmir və proqram güman etdiyimizdən çox yaddaş tutur. Lakin yenidən diqqətlə baxsaq, daxili funksiyaların heç biri `studentRecords`-a istinad etmir.'
        },
        {
          en: "According to the *per variable* definition of closure, since `getGrade` and `studentRecords` are *not* referenced by the inner functions, they're not closed over. They should be freely available for GC right after the `manageStudentGrades(..)` call completes.",
          az: 'Closure-un *dəyişən üzrə* tərifinə görə, `getGrade` və `studentRecords` daxili funksiyalar tərəfindən istinad *olunmadığı* üçün onların üzərində qapanılmır. `manageStudentGrades(..)` çağırışı tamamlanan kimi onlar GC üçün sərbəst olmalıdır.'
        },
        {
          en: "Indeed, try debugging this code in a recent JS engine, like v8 in Chrome, placing a breakpoint inside the `addGrade(..)` function. You may notice that the inspector **does not** list the `studentRecords` variable. That's proof, debugging-wise anyway, that the engine does not maintain `studentRecords` via closure. Phew!",
          az: 'Həqiqətən, bu kodu Chrome-dakı v8 kimi yeni JS mühərrikində `addGrade(..)` funksiyasının içinə breakpoint qoyaraq debug etməyə çalış. Görə bilərsən ki, inspektor `studentRecords` dəyişənini **göstərmir**. Bu, heç olmasa debug baxımından, mühərrikin `studentRecords`-u closure vasitəsilə saxlamadığının sübutudur. Uf!'
        },
        {
          en: 'But how reliable is this observation as proof? Consider this (rather contrived!) program:',
          az: 'Bəs bu müşahidə sübut kimi nə qədər etibarlıdır? Bu (olduqca süni!) proqrama bax:'
        },
        {
          code: 'function storeStudentInfo(id,name,grade) {\n  return function getInfo(whichValue){\n    // warning:\n    //   using `eval(..)` is a bad idea!\n    var val = eval(whichValue);\n    return val;\n  };\n}\n\nvar info = storeStudentInfo(73,"Suzy",87);\n\ninfo("name");\n// Suzy\n\ninfo("grade");\n// 87'
        },
        {
          en: 'Notice that the inner function `getInfo(..)` is not explicitly closed over any of `id`, `name`, or `grade` variables. And yet, calls to `info(..)` seem to still be able to access the variables, albeit through use of the `eval(..)` lexical scope cheat (see Chapter 1).',
          az: 'Diqqət et ki, daxili `getInfo(..)` funksiyası `id`, `name` və ya `grade` dəyişənlərinin heç biri üzərində açıq şəkildə qapanmır. Buna baxmayaraq, `info(..)` çağırışları — `eval(..)` leksik scope hiyləsi (bax: 1-ci fəsil) vasitəsilə olsa da — dəyişənlərə hələ də çata bilir.'
        },
        {
          en: 'So all the variables were definitely preserved via closure, despite not being explicitly referenced by the inner function. So does that disprove the *per variable* assertion in favor of *per scope*? Depends.',
          az: 'Deməli, daxili funksiya açıq şəkildə istinad etməsə də, bütün dəyişənlər mütləq closure vasitəsilə qorunub. Bəs bu, *dəyişən üzrə* iddianı *scope üzrə* iddianın xeyrinə təkzib edirmi? Asılıdır.'
        },
        {
          en: "Many modern JS engines do apply an *optimization* that removes any variables from a closure scope that aren't explicitly referenced. However, as we see with `eval(..)`, there are situations where such an optimization cannot be applied, and the closure scope continues to contain all its original variables. In other words, closure must be *per scope*, implementation wise, and then an optional optimization trims down the scope to only what was closed over (a similar outcome as *per variable* closure).",
          az: 'Bir çox müasir JS mühərriki açıq istinad olunmayan dəyişənləri closure scope-undan çıxaran *optimallaşdırma* tətbiq edir. Lakin `eval(..)` ilə gördüyümüz kimi, belə optimallaşdırmanın tətbiq oluna bilmədiyi hallar var və closure scope-u bütün ilkin dəyişənlərini saxlamağa davam edir. Başqa sözlə, reallaşdırma baxımından closure *scope üzrə* olmalıdır, sonra isə könüllü optimallaşdırma scope-u yalnız üzərində qapanılan şeyə qədər kəsir (*dəyişən üzrə* closure-a oxşar nəticə).'
        },
        {
          en: "Even as recent as a few years ago, many JS engines did not apply this optimization; it's possible your websites may still run in such browsers, especially on older or lower-end devices. That means it's possible that long-lived closures such as event handlers may be holding onto memory much longer than we would have assumed.",
          az: 'Hətta cəmi bir neçə il əvvəl bir çox JS mühərriki bu optimallaşdırmanı tətbiq etmirdi; saytlarının hələ də belə brauzerlərdə, xüsusən köhnə və ya zəif cihazlarda işləməsi mümkündür. Bu o deməkdir ki, hadisə işləyiciləri kimi uzunömürlü closure-lar yaddaşı güman etdiyimizdən xeyli uzun müddət tuta bilər.'
        },
        {
          en: "And the fact that it's an optional optimization in the first place, rather than a requirement of the specification, means that we shouldn't just casually over-assume its applicability.",
          az: 'Bunun spesifikasiyanın tələbi yox, ilk növbədə könüllü optimallaşdırma olması isə o deməkdir ki, onun tətbiq olunacağını düşünmədən fərz etməməliyik.'
        },
        {
          en: "In cases where a variable holds a large value (like an object or array) and that variable is present in a closure scope, if you don't need that value anymore and don't want that memory held, it's safer (memory usage) to manually discard the value rather than relying on closure optimization/GC.",
          az: 'Dəyişən böyük dəyər (məsələn, obyekt və ya massiv) saxlayırsa və o, closure scope-undadırsa, həmin dəyər artıq lazım deyilsə və o yaddaşın tutulmasını istəmirsənsə, closure optimallaşdırmasına/GC-yə güvənmək əvəzinə dəyəri əl ilə atmaq (yaddaş istifadəsi baxımından) daha təhlükəsizdir.'
        },
        {
          en: "Let's apply a *fix* to the earlier `manageStudentGrades(..)` example to ensure the potentially large array held in `studentRecords` is not caught up in a closure scope unnecessarily:",
          az: 'Gəl əvvəlki `manageStudentGrades(..)` nümunəsinə *düzəliş* tətbiq edək ki, `studentRecords`-dakı potensial olaraq böyük massiv lazımsız yerə closure scope-una ilişməsin:'
        },
        {
          code: 'function manageStudentGrades(studentRecords) {\n  var grades = studentRecords.map(getGrade);\n\n  // unset `studentRecords` to prevent unwanted\n  // memory retention in the closure\n  studentRecords = null;\n\n  return addGrade;\n  // ..\n}'
        },
        {
          en: "We're not removing `studentRecords` from the closure scope; that we cannot control. We're ensuring that even if `studentRecords` remains in the closure scope, that variable is no longer referencing the potentially large array of data; the array can be GC'd.",
          az: '`studentRecords`-u closure scope-undan silmirik; buna nəzarət edə bilmərik. Təmin edirik ki, `studentRecords` closure scope-unda qalsa belə, həmin dəyişən artıq potensial olaraq böyük məlumat massivinə istinad etmir; massiv GC ilə təmizlənə bilər.'
        },
        {
          en: "Again, in many cases JS might automatically optimize the program to the same effect. But it's still a good habit to be careful and explicitly make sure we don't keep any significant amount of device memory tied up any longer than necessary.",
          az: 'Yenə deyirəm, bir çox halda JS proqramı avtomatik eyni nəticəyə optimallaşdıra bilər. Lakin diqqətli olmaq və cihaz yaddaşının əhəmiyyətli hissəsini lazım olandan uzun tutmadığımıza açıq şəkildə əmin olmaq yenə də yaxşı vərdişdir.'
        },
        {
          en: "As a matter of fact, we also technically don't need the function `getGrade()` anymore after the `.map(getGrade)` call completes. If profiling our application showed this was a critical area of excess memory use, we could possibly eek out a tiny bit more memory by freeing up that reference so its value isn't tied up either. That's likely unnecessary in this toy example, but this is a general technique to keep in mind if you're optimizing the memory footprint of your application.",
          az: 'Əslində texniki olaraq `.map(getGrade)` çağırışı tamamlandıqdan sonra `getGrade()` funksiyası da artıq lazım deyil. Tətbiqin profilləşdirilməsi bunun həddindən artıq yaddaş istifadəsinin kritik sahəsi olduğunu göstərsəydi, həmin istinadı da boşaldaraq bir az daha yaddaş qazana bilərdik. Bu oyuncaq nümunədə yəqin lazımsızdır, amma tətbiqinin yaddaş izini optimallaşdırırsansa, yadda saxlamalı ümumi texnikadır.'
        },
        {
          en: "The takeaway: it's important to know where closures appear in our programs, and what variables are included. We should manage these closures carefully so we're only holding onto what's minimally needed and not wasting memory.",
          az: 'Nəticə: proqramlarımızda closure-ların harada göründüyünü və hansı dəyişənlərin daxil olduğunu bilmək vacibdir. Bu closure-ları diqqətlə idarə etməliyik ki, yalnız minimal lazım olanı saxlayaq və yaddaşı boşuna sərf etməyək.'
        }
      ],
      note: 'Praktik nəticə: uzunömürlü closure-larda (hadisə işləyiciləri, interval-lar, qlobal store abunəlikləri) böyük data saxlayan dəyişənlərə diqqət et.\n\nChrome DevTools → Memory → Heap snapshot ilə yoxlaya bilərsən: closure-un saxladığı obyektlər «Retainers» bölməsində `context` kimi görünür.',
      terms: ['gc', 'devtools']
    },
    {
      id: 'alternative',
      heading: 'An Alternative Perspective',
      headingAz: 'Alternativ baxış',
      blocks: [
        {
          en: 'Reviewing our working definition for closure, the assertion is that functions are "first-class values" that can be passed around the program, just like any other value. Closure is the link-association that connects that function to the scope/variables outside of itself, no matter where that function goes.',
          az: 'Closure üçün işçi tərifimizi nəzərdən keçirsək, iddia budur ki, funksiyalar proqramda istənilən digər dəyər kimi ötürülə bilən «birinci dərəcəli dəyərlərdir» ([[first-class-function]]). Closure isə funksiya haraya getməsindən asılı olmayaraq onu özündən kənardakı scope/dəyişənlərlə birləşdirən əlaqədir.'
        },
        {
          en: "Let's recall a code example from earlier in this chapter, again with relevant scope bubble colors annotated:",
          az: 'Bu fəslin əvvəlindəki kod nümunəsini müvafiq scope qabarcığı rəngləri ilə yenidən xatırlayaq:'
        },
        {
          code: '// outer/global scope: RED(1)\n\nfunction adder(num1) {\n  // function scope: BLUE(2)\n\n  return function addTo(num2){\n    // function scope: GREEN(3)\n\n    return num1 + num2;\n  };\n}\n\nvar add10To = adder(10);\nvar add42To = adder(42);\n\nadd10To(15);   // 25\nadd42To(9);    // 51'
        },
        {
          en: 'Our current perspective suggests that wherever a function is passed and invoked, closure preserves a hidden link back to the original scope to facilitate the access to the closed-over variables. Figure 4, repeated here for convenience, illustrates this notion:',
          az: 'Hazırkı baxışımız deyir ki, funksiya harada ötürülüb çağırılsa, closure qapanılan dəyişənlərə çıxışı təmin etmək üçün ilkin scope-a gizli əlaqə saxlayır. Rahatlıq üçün burada təkrarlanan Şəkil 4 bu anlayışı göstərir:'
        },
        {
          caption: 'Şəkil 4 (təkrar): Closure-ların vizuallaşdırılması',
          code: 'RED(1) global\n│  add10To ───────────────┐      add42To ───────────────┐\n│                         ▼                              ▼\n├─ BLUE(2) adder(10)   GREEN(3) addTo   BLUE(2) adder(42)   GREEN(3) addTo\n│    num1 = 10  ◄──── closure            num1 = 42  ◄──── closure'
        },
        {
          en: 'But there\'s another way of thinking about closure, and more precisely the nature of functions being *passed around*, that may help deepen the mental models.',
          az: 'Lakin closure haqqında, daha dəqiq desək, funksiyaların *ötürülməsinin* təbiəti haqqında düşünməyin başqa yolu da var; bu, zehni modelləri dərinləşdirməyə kömək edə bilər.'
        },
        {
          en: 'This alternative model de-emphasizes "functions as first-class values," and instead embraces how functions (like all non-primitive values) are held by reference in JS, and assigned/passed by reference-copy — see Appendix A of the *Get Started* book for more information.',
          az: 'Bu alternativ model «birinci dərəcəli dəyər kimi funksiyalar» vurğusunu azaldır və əvəzində funksiyaların (bütün primitiv olmayan dəyərlər kimi) JS-də istinadla saxlandığını və istinadın surəti ilə mənimsədildiyini/ötürüldüyünü qəbul edir — ətraflı məlumat üçün *Get Started* kitabının Əlavə A-sına bax.'
        },
        {
          en: 'Instead of thinking about the inner function instance of `addTo(..)` moving to the outer RED(1) scope via the `return` and assignment, we can envision that function instances actually just stay in place in their own scope environment, of course with their scope-chain intact.',
          az: '`addTo(..)`-un daxili funksiya nüsxəsinin `return` və mənimsətmə vasitəsilə xarici QIRMIZI(1) scope-a köçdüyünü düşünmək əvəzinə təsəvvür edə bilərik ki, funksiya nüsxələri əslində öz scope mühitlərində, təbii ki, scope zəncirləri toxunulmaz halda, yerində qalır.'
        },
        {
          en: 'What gets sent to the RED(1) scope is **just a reference** to the in-place function instance, rather than the function instance itself. Figure 5 depicts the inner function instances remaining in place, pointed to by the RED(1) `addTo10` and `addTo42` references, respectively:',
          az: 'QIRMIZI(1) scope-a göndərilən funksiya nüsxəsinin özü yox, yerində qalan funksiya nüsxəsinə **sadəcə istinaddır**. Şəkil 5 yerində qalan daxili funksiya nüsxələrini və onlara müvafiq olaraq işarə edən QIRMIZI(1) `addTo10` və `addTo42` istinadlarını təsvir edir:'
        },
        {
          caption: 'Şəkil 5: Closure-ların vizuallaşdırılması (alternativ)',
          code: 'RED(1) global:   addTo10 ──┐              addTo42 ──┐\n                            │ (reference)             │ (reference)\n                            ▼                         ▼\nBLUE(2) adder(10) { num1 = 10                BLUE(2) adder(42) { num1 = 42\n  GREEN(3) addTo  ← stays in place             GREEN(3) addTo  ← stays in place\n}                                            }'
        },
        {
          en: 'As shown in Figure 5, each call to `adder(..)` still creates a new BLUE(2) scope containing a `num1` variable, as well as an instance of the GREEN(3) `addTo(..)` scope. But what\'s different from Figure 4 is, now these GREEN(3) instances remain in place, naturally nested inside of their BLUE(2) scope instances. The `addTo10` and `addTo42` references are moved to the RED(1) outer scope, not the function instances themselves.',
          az: 'Şəkil 5-də göstərildiyi kimi, `adder(..)`-a hər çağırış yenə `num1` dəyişənini ehtiva edən yeni MAVİ(2) scope və YAŞIL(3) `addTo(..)` scope-unun nüsxəsini yaradır. Lakin Şəkil 4-dən fərq budur ki, indi bu YAŞIL(3) nüsxələr yerində, təbii olaraq öz MAVİ(2) scope nüsxələrinin içində qalır. QIRMIZI(1) xarici scope-a funksiya nüsxələrinin özləri yox, `addTo10` və `addTo42` istinadları köçürülür.'
        },
        {
          en: 'When `addTo10(15)` is called, the `addTo(..)` function instance (still in place in its original BLUE(2) scope environment) is invoked. Since the function instance itself never moved, of course it still has natural access to its scope chain. Same with the `addTo42(9)` call — nothing special here beyond lexical scope.',
          az: '`addTo10(15)` çağırılanda `addTo(..)` funksiya nüsxəsi (hələ də ilkin MAVİ(2) scope mühitində, yerindədir) çağırılır. Funksiya nüsxəsinin özü heç vaxt yerindən tərpənmədiyi üçün, təbii ki, onun scope zəncirinə təbii çıxışı hələ də var. `addTo42(9)` çağırışında da eynidir — burada leksik scope-dan başqa xüsusi heç nə yoxdur.'
        },
        {
          en: 'So what then *is* closure, if not the *magic* that lets a function maintain a link to its original scope chain even as that function moves around in other scopes? In this alternative model, functions stay in place and keep accessing their original scope chain just like they always could.',
          az: 'Bəs onda closure funksiyanın başqa scope-larda gəzərkən belə ilkin scope zənciri ilə əlaqəni saxlamasına imkan verən *sehr* deyilsə, *nədir*? Bu alternativ modeldə funksiyalar yerində qalır və həmişə olduğu kimi ilkin scope zəncirinə müraciət etməyə davam edir.'
        },
        {
          en: 'Closure instead describes the *magic* of **keeping alive a function instance, along with its whole scope environment and chain, for as long as there\'s at least one reference to that function instance floating around in any other part of the program.**',
          az: 'Closure isə əvəzində bu *sehri* təsvir edir: **proqramın hansısa başqa hissəsində həmin funksiya nüsxəsinə ən azı bir istinad dolaşdıqca funksiya nüsxəsini bütöv scope mühiti və zənciri ilə birlikdə canlı saxlamaq.**'
        },
        {
          en: "That definition of closure is less observational and a bit less familiar-sounding compared to the traditional academic perspective. But it's nonetheless still useful, because the benefit is that we simplify explanation of closure to a straightforward combination of references and in-place function instances.",
          az: 'Closure-un bu tərifi ənənəvi akademik baxışla müqayisədə daha az müşahidə yönümlüdür və bir qədər az tanış səslənir. Lakin yenə də faydalıdır, çünki closure-un izahını istinadların və yerində qalan funksiya nüsxələrinin sadə birləşməsinə endirir.'
        },
        {
          en: 'The previous model (Figure 4) is not *wrong* at describing closure in JS. It\'s just more conceptually inspired, an academic perspective on closure. By contrast, the alternative model (Figure 5) could be described as a bit more implementation focused, how JS actually works.',
          az: 'Əvvəlki model (Şəkil 4) JS-də closure-u təsvir etməkdə *yanlış* deyil. O, sadəcə daha konseptual ruhlu, closure-a akademik baxışdır. Əksinə, alternativ model (Şəkil 5) bir qədər daha reallaşdırma yönümlü — JS-in əslində necə işlədiyinə yönəlmiş — kimi təsvir oluna bilər.'
        },
        {
          en: 'Both perspectives/models are useful in understanding closure, but the reader may find one a little easier to hold than the other. Whichever you choose, the observable outcomes in our program are the same.',
          az: 'Hər iki baxış/model closure-u anlamaqda faydalıdır, amma oxucu birini digərindən bir az daha asan yadda saxlaya bilər. Hansını seçsən də, proqramımızda müşahidə olunan nəticələr eynidir.'
        },
        {
          en: '> **NOTE:** This alternative model for closure does affect whether we classify synchronous callbacks as examples of closure or not. More on this nuance in Appendix A.',
          az: '> **QEYD:** Closure üçün bu alternativ model sinxron callback-ləri closure nümunəsi kimi təsnif edib-etməməyimizə təsir edir. Bu incəlik haqqında ətraflı Əlavə A-da.'
        }
      ],
      note: 'İki model eyni nəticəni verir, sadəcə fərqli bucaqdan baxır:\n\n- **Müşahidə modeli:** funksiya «səyahət edir» və mühitini özü ilə aparır.\n- **Reallaşdırma modeli:** funksiya yerində qalır, çölə yalnız ona **istinad** çıxır; istinad qaldıqca bütün mühit yaşayır.\n\nİkinci model GC və yaddaş sızmalarını anlamaq üçün daha faydalıdır: «bu mühiti kim hələ də saxlayır?» sualını verməyə öyrədir.',
      terms: ['first-class-function', 'lexical-environment']
    },
    {
      id: 'why-closure',
      heading: 'Why Closure?',
      headingAz: 'Niyə closure?',
      blocks: [
        {
          en: "Now that we have a well-rounded sense of what closure is and how it works, let's explore some ways it can improve the code structure and organization of an example program.",
          az: 'Closure-un nə olduğu və necə işlədiyi barədə hərtərəfli təsəvvürümüz olduğu üçün indi onun nümunə proqramın kod quruluşunu və təşkilini necə yaxşılaşdıra biləcəyinə baxaq.'
        },
        {
          en: 'Imagine you have a button on a page that when clicked, should retrieve and send some data via an Ajax request. Without using closure:',
          az: 'Təsəvvür et ki, səhifədə düymə var və ona basılanda Ajax sorğusu ilə hansısa məlumatı götürüb göndərməlidir. Closure-dan istifadə etmədən:'
        },
        {
          code: 'var APIendpoints = {\n  studentIDs:\n    "https://some.api/register-students",\n  // ..\n};\n\nvar data = {\n  studentIDs: [ 14, 73, 112, 6 ],\n  // ..\n};\n\nfunction makeRequest(evt) {\n  var btn = evt.target;\n  var recordKind = btn.dataset.kind;\n  ajax(\n    APIendpoints[recordKind],\n    data[recordKind]\n  );\n}\n\n// <button data-kind="studentIDs">\n//    Register Students\n// </button>\nbtn.addEventListener("click",makeRequest);'
        },
        {
          en: 'The `makeRequest(..)` utility only receives an `evt` object from a click event. From there, it has to retrieve the `data-kind` attribute from the target button element, and use that value to lookup both a URL for the API endpoint as well as what data should be included in the Ajax request.',
          az: '`makeRequest(..)` utiliti klik hadisəsindən yalnız `evt` obyektini alır. Oradan hədəf düymə elementindən `data-kind` atributunu götürməli və həmin dəyərlə həm API endpoint-i üçün URL-i, həm də Ajax sorğusuna daxil edilməli məlumatı tapmalıdır.'
        },
        {
          en: "This works OK, but it's unfortunate (inefficient, more confusing) that the event handler has to read a DOM attribute each time it's fired. Why couldn't an event handler *remember* this value? Let's try using closure to improve the code:",
          az: 'Bu, işləyir, amma hadisə işləyicisinin hər dəfə işə düşəndə DOM atributunu oxumalı olması təəssüf doğurur (səmərəsiz və daha çaşdırıcıdır). Niyə hadisə işləyicisi bu dəyəri *yadda saxlaya* bilməsin? Kodu yaxşılaşdırmaq üçün closure-dan istifadə etməyə çalışaq:'
        },
        {
          code: 'var APIendpoints = {\n  studentIDs:\n    "https://some.api/register-students",\n  // ..\n};\n\nvar data = {\n  studentIDs: [ 14, 73, 112, 6 ],\n  // ..\n};\n\nfunction setupButtonHandler(btn) {\n  var recordKind = btn.dataset.kind;\n\n  btn.addEventListener(\n    "click",\n    function makeRequest(evt){\n      ajax(\n        APIendpoints[recordKind],\n        data[recordKind]\n      );\n    }\n  );\n}\n\n// <button data-kind="studentIDs">\n//    Register Students\n// </button>\n\nsetupButtonHandler(btn);'
        },
        {
          en: 'With the `setupButtonHandler(..)` approach, the `data-kind` attribute is retrieved once and assigned to the `recordKind` variable at initial setup. `recordKind` is then closed over by the inner `makeRequest(..)` click handler, and its value is used on each event firing to look up the URL and data that should be sent.',
          az: '`setupButtonHandler(..)` yanaşmasında `data-kind` atributu bir dəfə götürülür və ilkin quraşdırma zamanı `recordKind` dəyişəninə mənimsədilir. Sonra `recordKind` üzərində daxili `makeRequest(..)` klik işləyicisi qapanır və onun dəyəri hər hadisədə göndəriləcək URL və məlumatı tapmaq üçün istifadə olunur.'
        },
        {
          en: "> **NOTE:** `evt` is still passed to `makeRequest(..)`, though in this case we're not using it anymore. It's still listed, for consistency with the previous snippet.",
          az: '> **QEYD:** `evt` hələ də `makeRequest(..)`-a ötürülür, baxmayaraq ki, bu halda artıq ondan istifadə etmirik. O, əvvəlki nümunə ilə ardıcıllıq üçün siyahıda saxlanılıb.'
        },
        {
          en: 'By placing `recordKind` inside `setupButtonHandler(..)`, we limit the scope exposure of that variable to a more appropriate subset of the program; storing it globally would have been worse for code organization and readability. Closure lets the inner `makeRequest()` function instance *remember* this variable and access whenever it\'s needed.',
          az: '`recordKind`-i `setupButtonHandler(..)`-ın içinə qoymaqla həmin dəyişənin scope açıqlığını proqramın daha uyğun alt hissəsi ilə məhdudlaşdırırıq; onu qlobal saxlamaq kod təşkili və oxunaqlılıq üçün daha pis olardı. Closure daxili `makeRequest()` funksiya nüsxəsinə bu dəyişəni *yadda saxlamağa* və lazım olanda ona müraciət etməyə imkan verir.'
        },
        { en: 'Building on this pattern, we could have looked up both the URL and data once, at setup:', az: 'Bu nümunə üzərində qurularaq həm URL-i, həm də məlumatı quraşdırma zamanı bir dəfə tapa bilərdik:' },
        {
          code: 'function setupButtonHandler(btn) {\n  var recordKind = btn.dataset.kind;\n  var requestURL = APIendpoints[recordKind];\n  var requestData = data[recordKind];\n\n  btn.addEventListener(\n    "click",\n    function makeRequest(evt){\n      ajax(requestURL,requestData);\n    }\n  );\n}'
        },
        {
          en: 'Now `makeRequest(..)` is closed over `requestURL` and `requestData`, which is a little bit cleaner to understand, and also slightly more performant.',
          az: 'İndi `makeRequest(..)` `requestURL` və `requestData` üzərində qapanır; bu, anlamaq üçün bir az daha təmiz, həm də bir qədər daha məhsuldardır.'
        },
        {
          en: 'Two similar techniques from the Functional Programming (FP) paradigm that rely on closure are partial application and currying. Briefly, with these techniques, we alter the *shape* of functions that require multiple inputs so some inputs are provided up front, and other inputs are provided later; the initial inputs are remembered via closure. Once all inputs have been provided, the underlying action is performed.',
          az: 'Funksional Proqramlaşdırma (FP) paradiqmasından closure-a əsaslanan iki oxşar texnika qismən tətbiq (partial application) və currying-dir. Qısaca, bu texnikalarla bir neçə giriş tələb edən funksiyaların *formasını* dəyişirik ki, bəzi girişlər əvvəlcədən, digərləri isə sonra verilsin; ilkin girişlər closure vasitəsilə yadda saxlanılır. Bütün girişlər veriləndən sonra əsas əməliyyat yerinə yetirilir.'
        },
        {
          en: 'By creating a function instance that encapsulates some information inside (via closure), the function-with-stored-information can later be used directly without needing to re-provide that input. This makes that part of the code cleaner, and also offers the opportunity to label partially applied functions with better semantic names.',
          az: 'İçində (closure vasitəsilə) hansısa məlumatı inkapsulyasiya edən funksiya nüsxəsi yaratmaqla sonra həmin «məlumat saxlanmış funksiyadan» o girişi yenidən vermədən birbaşa istifadə etmək olar. Bu, kodun həmin hissəsini daha təmiz edir və qismən tətbiq olunmuş funksiyaları daha yaxşı semantik adlarla adlandırmağa imkan verir.'
        },
        { en: 'Adapting partial application, we can further improve the preceding code:', az: 'Qismən tətbiqi uyğunlaşdıraraq əvvəlki kodu daha da yaxşılaşdıra bilərik:' },
        {
          code: 'function defineHandler(requestURL,requestData) {\n  return function makeRequest(evt){\n    ajax(requestURL,requestData);\n  };\n}\n\nfunction setupButtonHandler(btn) {\n  var recordKind = btn.dataset.kind;\n  var handler = defineHandler(\n    APIendpoints[recordKind],\n    data[recordKind]\n  );\n  btn.addEventListener("click",handler);\n}'
        },
        {
          en: 'The `requestURL` and `requestData` inputs are provided ahead of time, resulting in the `makeRequest(..)` partially applied function, which we locally label `handler`. When the event eventually fires, the final input (`evt`, even though it\'s ignored) is passed to `handler()`, completing its inputs and triggering the underlying Ajax request.',
          az: '`requestURL` və `requestData` girişləri əvvəlcədən verilir və nəticədə lokal olaraq `handler` adlandırdığımız qismən tətbiq olunmuş `makeRequest(..)` funksiyası alınır. Hadisə nəhayət işə düşəndə son giriş (`evt`, nəzərə alınmasa da) `handler()`-ə ötürülür, girişlər tamamlanır və əsas Ajax sorğusu işə düşür.'
        },
        {
          en: 'Behavior-wise, this program is pretty similar to the previous one, with the same type of closure. But by isolating the creation of `makeRequest(..)` in a separate utility (`defineHandler(..)`), we make that definition more reusable across the program. We also explicitly limit the closure scope to only the two variables needed.',
          az: 'Davranış baxımından bu proqram eyni tip closure ilə əvvəlkinə olduqca oxşardır. Lakin `makeRequest(..)`-un yaradılmasını ayrıca utilitə (`defineHandler(..)`) ayırmaqla həmin tərifi proqram boyu təkrar istifadəyə daha yararlı edirik. Həmçinin closure scope-unu açıq şəkildə yalnız lazım olan iki dəyişənlə məhdudlaşdırırıq.'
        }
      ],
      note: 'Qismən tətbiq React-də hər gün lazım olur:\n\n```js\nconst handleChange = (field) => (e) =>\n  setForm((f) => ({ ...f, [field]: e.target.value }));\n<input onChange={handleChange(\'email\')} />\n<input onChange={handleChange(\'password\')} />\n```\n\n`handleChange(\'email\')` `field`-i closure-da saxlayan yeni funksiya qaytarır — hər input üçün ayrıca handler yazmağa ehtiyac qalmır.'
    },
    {
      id: 'closer',
      heading: 'Closer to Closure',
      headingAz: 'Closure-a daha yaxın',
      blocks: [
        {
          en: "As we close down a dense chapter, take some deep breaths let it all sink in. Seriously, that's a lot of information for anyone to consume!",
          az: 'Bu sıx fəsli bağlayarkən bir neçə dərin nəfəs al və hamısının yerinə oturmasına imkan ver. Ciddi deyirəm, bu, hər kəsin həzm etməsi üçün çoxlu məlumatdır!'
        },
        {
          en: 'We explored two models for mentally tackling closure:\n\n- **Observational:** closure is a function instance remembering its outer variables even as that function is passed to and invoked in other scopes.\n- **Implementational:** closure is a function instance and its scope environment preserved in-place while any references to it are passed around and invoked from other scopes.',
          az: 'Closure-u zehni olaraq anlamaq üçün iki modeli araşdırdıq:\n\n- **Müşahidə modeli:** closure — funksiya başqa scope-lara ötürülüb orada çağırılsa belə, xarici dəyişənlərini yadda saxlayan funksiya nüsxəsidir.\n- **Reallaşdırma modeli:** closure — ona olan istinadlar ötürülüb başqa scope-lardan çağırılarkən yerində qorunan funksiya nüsxəsi və onun scope mühitidir.'
        },
        {
          en: 'Summarizing the benefits to our programs:\n\n- Closure can improve efficiency by allowing a function instance to remember previously determined information instead of having to compute it each time.\n- Closure can improve code readability, bounding scope-exposure by encapsulating variable(s) inside function instances, while still making sure the information in those variables is accessible for future use. The resultant narrower, more specialized function instances are cleaner to interact with, since the preserved information doesn\'t need to be passed in every invocation.',
          az: 'Proqramlarımız üçün faydaları yekunlaşdıraq:\n\n- Closure funksiya nüsxəsinə əvvəlcədən müəyyən olunmuş məlumatı hər dəfə hesablamaq əvəzinə yadda saxlamağa imkan verməklə səmərəliliyi artıra bilər.\n- Closure dəyişən(lər)i funksiya nüsxələrinin içində inkapsulyasiya edib scope açıqlığını məhdudlaşdırmaqla, eyni zamanda həmin dəyişənlərdəki məlumatın gələcək istifadə üçün əlçatan qalmasını təmin etməklə kodun oxunaqlılığını artıra bilər. Nəticədə alınan daha dar, daha ixtisaslaşmış funksiya nüsxələri ilə işləmək daha rahatdır, çünki qorunan məlumatı hər çağırışda ötürməyə ehtiyac yoxdur.'
        },
        {
          en: "Before you move on, take some time to restate this summary *in your own words*, explaining what closure is and why it's helpful in your programs. The main book text concludes with a final chapter that builds on top of closure with the module pattern.",
          az: 'Davam etməzdən əvvəl bu xülasəni *öz sözlərinlə* yenidən ifadə etməyə vaxt ayır: closure-un nə olduğunu və proqramlarında niyə faydalı olduğunu izah et. Kitabın əsas mətni closure üzərində qurulan modul nümunəsi haqqında son fəsillə bitir.'
        }
      ],
      note: 'Müəllifin tapşırığını et: closure-un nə olduğunu və proqramlarında niyə faydalı olduğunu öz sözlərinlə yaz. Yoxlama üçün bu üç sualı cavablandır:\n\n1. `for (var i…)` ilə `for (let i…)` nümunəsində closure-lar niyə fərqli davranır?\n2. `useEffect` cleanup-ı yaddaş baxımından niyə vacibdir?\n3. «Stale closure» nədir və necə düzəldilir?'
    }
  ],
  exam: exam7
};
