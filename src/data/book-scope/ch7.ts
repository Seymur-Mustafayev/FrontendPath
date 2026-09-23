import type { BookChapter } from '../books';

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
          en: 'Our attention again shifts broader in abstraction, to the historically somewhat daunting topic of closure. Don\'t worry! You don\'t need an advanced computer science degree to make sense of it. Our broad goal in this book is not merely to understand scope, but to more effectively use it in the structure of our programs; closure is central to that effort.',
          az: 'Diqqətimiz yenidən daha geniş abstraksiyaya — tarixən bir qədər qorxulu sayılan closure mövzusuna keçir. Narahat olma! Onu başa düşmək üçün yüksək kompüter elmləri dərəcəsi lazım deyil. Bu kitabdakı ümumi məqsədimiz sadəcə scope-u anlamaq deyil, ondan proqramlarımızın strukturunda daha səmərəli istifadə etməkdir; closure bu səyin mərkəzindədir.'
        },
        {
          en: 'Closure builds on the POLE approach: for variables we need to use over time, instead of placing them in larger outer scopes, we can encapsulate (more narrowly scope) them but still preserve access from inside functions, for broader use. Functions remember these referenced scoped variables via closure.',
          az: 'Closure POLE yanaşması üzərində qurulur: zaman ərzində istifadə etməli olduğumuz dəyişənləri daha böyük xarici scope-lara qoymaq əvəzinə, onları inkapsulyasiya edə (daha dar scope-a sala), lakin daha geniş istifadə üçün funksiyaların içindən onlara çıxışı saxlaya bilərik. Funksiyalar istinad etdikləri bu scope dəyişənlərini closure vasitəsilə yadda saxlayır.'
        },
        {
          en: 'If you\'ve ever written a callback that accesses variables outside its own scope... guess what!? That\'s closure. Closure is one of the most important language characteristics ever invented in programming — it underlies major programming paradigms, including Functional Programming (FP), modules, and even a bit of class-oriented design.',
          az: 'Əgər nə vaxtsa öz scope-undan kənardakı dəyişənlərə müraciət edən callback yazmısansa... tap görək nədir!? Bu, closure-dur. Closure proqramlaşdırmada indiyə qədər icad olunmuş ən vacib dil xüsusiyyətlərindən biridir — funksional proqramlaşdırma (FP), modullar və hətta bir qədər sinif yönümlü dizayn da daxil olmaqla əsas proqramlaşdırma paradiqmalarının təməlindədir.'
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
          en: 'Closure is a behavior of functions and only functions. If you aren\'t dealing with a function, closure does not apply. An object cannot have closure, nor does a class have closure (though its functions/methods might). For closure to be observed, a function must be invoked, and specifically it must be invoked in a different branch of the scope chain from where it was originally defined.',
          az: 'Closure funksiyaların, yalnız funksiyaların davranışıdır. Funksiya ilə işləmirsənsə, closure tətbiq olunmur. Obyektin closure-u ola bilməz, sinfin də closure-u yoxdur (baxmayaraq ki, onun funksiyalarının/metodlarının ola bilər). Closure-un müşahidə olunması üçün funksiya çağırılmalıdır, həm də məhz ilk təyin olunduğu yerdən fərqli scope zənciri qolunda çağırılmalıdır.'
        },
        {
          code: '// outer/global scope: RED(1)\nfunction lookupStudent(studentID) {\n  // function scope: BLUE(2)\n  var students = [\n    { id: 14, name: \'Kyle\' },\n    { id: 73, name: \'Suzy\' },\n    { id: 112, name: \'Frank\' },\n    { id: 6, name: \'Sarah\' }\n  ];\n  return function greetStudent(greeting){\n    // function scope: GREEN(3)\n    var student = students.find(\n      student => student.id == studentID\n    );\n    return `${ greeting }, ${ student.name }!`;\n  };\n}\n\nvar chosenStudents = [\n  lookupStudent(6),\n  lookupStudent(112)\n];\n\nchosenStudents[0](\'Hello\');   // Hello, Sarah!\nchosenStudents[1](\'Howdy\');   // Howdy, Frank!'
        },
        {
          en: 'After each call to `lookupStudent(..)` finishes, it would seem like all its inner variables would be discarded and GC\'d ([[gc]]). But while `greetStudent(..)` does receive a single argument as the parameter named `greeting`, it also makes reference to both `students` and `studentID`, identifiers which come from the enclosing scope of `lookupStudent(..)`. Each of those references from the inner function to the variable in an outer scope is called a [[closure]]. In academic terms, each instance of `greetStudent(..)` **closes over** the outer variables `students` and `studentID`.',
          az: '`lookupStudent(..)`-un hər çağırışı bitəndən sonra onun bütün daxili dəyişənlərinin atılıb zibil yığımı ilə təmizlənəcəyi ([[gc]]) görünə bilər. Lakin `greetStudent(..)` `greeting` adlı parametr kimi tək arqument qəbul etsə də, həm də `lookupStudent(..)`-un əhatə edən scope-undan gələn `students` və `studentID` identifikatorlarına istinad edir. Daxili funksiyadan xarici scope-dakı dəyişənə olan bu istinadların hər birinə [[closure]] deyilir. Akademik dillə desək, `greetStudent(..)`-un hər nüsxəsi xarici `students` və `studentID` dəyişənləri **üzərində qapanır** (closes over).'
        },
        {
          en: 'Closure allows `greetStudent(..)` to continue to access those outer variables even after the outer scope is finished. Instead of the instances of `students` and `studentID` being GC\'d, they stay around in memory. If JS functions did not have closure, the completion of each `lookupStudent(..)` call would immediately tear down its scope, and we should get a `ReferenceError`. But we don\'t get an error. This is a direct observation of closure!',
          az: 'Closure `greetStudent(..)`-a xarici scope bitdikdən sonra da həmin xarici dəyişənlərə müraciət etməyə imkan verir. `students` və `studentID` nüsxələri zibil yığımı ilə təmizlənmək əvəzinə yaddaşda qalır. JS funksiyalarının closure-u olmasaydı, hər `lookupStudent(..)` çağırışının bitməsi dərhal onun scope-unu sökərdi və biz `ReferenceError` almalı idik. Amma səhv almırıq. Bu, closure-un birbaşa müşahidəsidir!'
        },
        {
          en: '## Pointed Closure',
          az: '## Arrow funksiyada closure'
        },
        {
          en: 'Because of how terse the syntax for `=>` arrow functions is, it\'s easy to forget that they still create a scope. The `student => student.id == studentID` arrow function is creating another scope bubble inside the `greetStudent(..)` function scope — call it ORANGE(4). The consequence here is that this arrow function passed as a callback to the array\'s `find(..)` method has to hold the closure over `studentID`, rather than `greetStudent(..)` holding that closure. Even tiny arrow functions can get in on the closure party.',
          az: '`=>` arrow funksiyalarının sintaksisi çox qısa olduğu üçün onların da scope yaratdığını unutmaq asandır. `student => student.id == studentID` arrow funksiyası `greetStudent(..)` funksiya scope-unun içində daha bir scope qabarcığı yaradır — ona NARINCI(4) deyək. Nəticədə `studentID` üzərindəki closure-u `greetStudent(..)` yox, massivin `find(..)` metoduna callback kimi ötürülən bu arrow funksiya saxlamalıdır. Hətta kiçik arrow funksiyalar da closure məclisinə qoşula bilər.'
        }
      ],
      terms: ['arrow-function', 'callback']
    },
    {
      id: 'adding-up',
      heading: 'Adding Up Closures',
      headingAz: 'Closure-ları toplamaq',
      blocks: [
        {
          code: 'function adder(num1) {\n  return function addTo(num2){\n    return num1 + num2;\n  };\n}\n\nvar add10To = adder(10);\nvar add42To = adder(42);\n\nadd10To(15);   // 25\nadd42To(9);    // 51'
        },
        {
          en: 'Each instance of the inner `addTo(..)` function is closing over its own `num1` variable (with values `10` and `42`, respectively), so those `num1`\'s don\'t go away just because `adder(..)` finishes.',
          az: 'Daxili `addTo(..)` funksiyasının hər nüsxəsi öz `num1` dəyişəni üzərində qapanır (müvafiq olaraq `10` və `42` dəyərləri ilə), ona görə bu `num1`-lər `adder(..)` bitdi deyə yox olmur.'
        },
        {
          en: 'An important detail: closure is associated with an **instance** of a function, rather than its single lexical definition. Every time the outer `adder(..)` function runs, a new inner `addTo(..)` function instance is created, and for each new instance, a new closure. Even though closure is based on lexical scope, which is handled at compile time, closure is observed as a runtime characteristic of function instances.',
          az: 'Vacib detal: closure funksiyanın tək leksik tərifi ilə yox, onun **nüsxəsi** ilə bağlıdır. Xarici `adder(..)` funksiyası hər dəfə işləyəndə yeni daxili `addTo(..)` funksiya nüsxəsi yaradılır və hər yeni nüsxə üçün yeni closure. Closure kompilyasiya zamanı emal olunan leksik scope-a əsaslansa da, funksiya nüsxələrinin icra zamanı xüsusiyyəti kimi müşahidə olunur.'
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
          en: 'Closure is actually a live link, preserving access to the full variable itself. We\'re not limited to merely reading a value; the closed-over variable can be updated (re-assigned) as well! By closing over a variable in a function, we can keep using that variable (read and write) as long as that function reference exists in the program, and from anywhere we want to invoke that function.',
          az: 'Closure əslində canlı əlaqədir və dəyişənin özünə tam çıxışı saxlayır. Yalnız dəyəri oxumaqla məhdudlaşmırıq; üzərində qapanılmış dəyişəni yeniləmək (yenidən mənimsətmək) də olar! Funksiyada dəyişən üzərində qapanaraq, həmin funksiyanın istinadı proqramda mövcud olduqca və funksiyanı harada çağırmaq istəsək, həmin dəyişəndən istifadə etməyə (oxumağa və yazmağa) davam edə bilərik.'
        },
        {
          code: 'function makeCounter() {\n  var count = 0;\n  return function getCurrent() {\n    count = count + 1;\n    return count;\n  };\n}\n\nvar hits = makeCounter();\nhits();   // 1\nhits();   // 2\nhits();   // 3'
        },
        {
          en: 'Because it\'s so common to mistake closure as value-oriented instead of variable-oriented, developers sometimes get tripped up trying to use closure to snapshot-preserve a value from some moment in time. The classic illustration of this mistake is defining functions inside a loop:',
          az: 'Closure çox vaxt dəyişən yönümlü yox, dəyər yönümlü kimi səhv başa düşüldüyü üçün developerlər bəzən closure ilə müəyyən andakı dəyəri «snapshot» kimi saxlamağa çalışanda ilişirlər. Bu səhvin klassik nümunəsi dövrün içində funksiyalar təyin etməkdir:'
        },
        {
          code: 'var keeps = [];\nfor (var i = 0; i < 3; i++) {\n  keeps[i] = function keepI(){\n    // closure over `i`\n    return i;\n  };\n}\nkeeps[0]();   // 3 -- WHY!?\nkeeps[1]();   // 3\nkeeps[2]();   // 3'
        },
        {
          en: 'Each saved function returns `3`, because by the end of the loop, the single `i` variable in the program has been assigned `3`. Each of the three functions in the `keeps` array do have individual closures, but they\'re all closed over that same shared `i` variable. A `let` declaration in a `for` loop creates a new variable for each iteration of the loop. That trick/quirk is exactly what we need for our loop closures:',
          az: 'Saxlanılan hər funksiya `3` qaytarır, çünki dövrün sonunda proqramdakı tək `i` dəyişəninə `3` mənimsədilib. `keeps` massivindəki üç funksiyanın hər birinin ayrıca closure-u var, lakin hamısı eyni ortaq `i` dəyişəni üzərində qapanıb. `for` dövründəki `let` bəyannaməsi isə dövrün hər iterasiyası üçün yeni dəyişən yaradır. Bu xüsusiyyət dövr closure-larımız üçün məhz lazım olandır:'
        },
        {
          code: 'var keeps = [];\nfor (let i = 0; i < 3; i++) {\n  // the `let i` gives us a new `i` for\n  // each iteration, automatically!\n  keeps[i] = function keepEachI(){\n    return i;\n  };\n}\nkeeps[0]();   // 0\nkeeps[1]();   // 1\nkeeps[2]();   // 2'
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
        {
          en: 'Closure is most commonly encountered with callbacks:',
          az: 'Closure ən çox callback-lərdə rast gəlinir:'
        },
        {
          code: 'function lookupStudentRecord(studentID) {\n  ajax(\n    `https://some.api/student/${ studentID }`,\n    function onRecord(record) {\n      console.log(`${ record.name } (${ studentID })`);\n    }\n  );\n}\n\nlookupStudentRecord(114);\n// Frank (114)'
        },
        {
          en: 'The `onRecord(..)` callback is going to be invoked at some point in the future, after the response from the Ajax call comes back. When that happens, the `lookupStudentRecord(..)` call will long since have completed. Why then is `studentID` still around and accessible to the callback? Closure.',
          az: '`onRecord(..)` callback-i gələcəkdə, Ajax sorğusunun cavabı gələndən sonra çağırılacaq. Bu baş verəndə `lookupStudentRecord(..)` çağırışı çoxdan bitmiş olacaq. Bəs niyə `studentID` hələ də mövcuddur və callback üçün əlçatandır? Closure.'
        },
        {
          caption: 'Hadisə işləyicisi `label` üzərində qapanır',
          code: 'function listenForClicks(btn,label) {\n  btn.addEventListener(\'click\',function onClick(){\n    console.log(`The ${ label } button was clicked!`);\n  });\n}\n\nvar submitBtn = document.getElementById(\'submit-btn\');\nlistenForClicks(submitBtn,\'Checkout\');'
        }
      ],
      note: 'Frontend-də yazdığın asinxron kodun demək olar ki, hamısı closure-dur:\n\n```js\nasync function loadUser(id) {\n  const res = await fetch(`/api/users/${id}`);\n  // await-dən sonra da `id` əlçatandır — closure\n  return { id, ...(await res.json()) };\n}\n```\n\n`fetch(...).then(...)`, `setTimeout`, `addEventListener`, `useEffect` — hamısı funksiyanı «sonraya» ötürür və o funksiya yarandığı mühiti özü ilə aparır.',
      terms: ['event-listener', 'fetch', 'promise']
    },
    {
      id: 'observable-definition',
      heading: 'What If I Can\'t See It? Observable Definition',
      headingAz: 'Görə bilmirəmsə? Müşahidəyə əsaslanan tərif',
      blocks: [
        {
          en: 'Remember, the emphasis in our definition of closure is observability. If a closure exists (in a technical, implementation, or academic sense) but it cannot be observed in our programs, does it matter? No. For example, invoking a function that makes use of lexical scope lookup in the same scope is just lexical scope, not closure:',
          az: 'Unutma: closure tərifimizdə vurğu müşahidə oluna bilməkdədir. Closure (texniki, reallaşdırma və ya akademik mənada) mövcuddursa, lakin proqramlarımızda müşahidə oluna bilmirsə, bunun önəmi varmı? Yox. Məsələn, eyni scope-da leksik scope axtarışından istifadə edən funksiyanı çağırmaq sadəcə leksik scope-dur, closure yox:'
        },
        {
          code: 'function say(myName) {\n  var greeting = \'Hello\';\n  output();\n  function output() {\n    console.log(`${ greeting }, ${ myName }!`);\n  }\n}\n\nsay(\'Kyle\');\n// Hello, Kyle!'
        },
        {
          en: 'Global scope variables essentially cannot be (observably) closed over, because they\'re always accessible from everywhere. Variables that are merely present but never accessed don\'t result in closure. And if there\'s no function invocation, closure can\'t be observed.',
          az: 'Qlobal scope dəyişənləri üzərində mahiyyətcə (müşahidə olunan şəkildə) qapanmaq olmur, çünki onlar həmişə hər yerdən əlçatandır. Sadəcə mövcud olan, lakin heç vaxt müraciət edilməyən dəyişənlər closure yaratmır. Funksiya çağırışı yoxdursa, closure müşahidə oluna bilməz.'
        },
        {
          en: '> Closure is observed when a function uses variable(s) from outer scope(s) even while running in a scope where those variable(s) wouldn\'t be accessible.',
          az: '> Closure o zaman müşahidə olunur ki, funksiya xarici scope(lar)dakı dəyişən(lər)dən, həmin dəyişən(lər)in əlçatan olmayacağı scope-da işləyərkən belə, istifadə edir.'
        },
        {
          en: 'The key parts of this definition are: must be a function involved; must reference at least one variable from an outer scope; must be invoked in a different branch of the scope chain from the variable(s).',
          az: 'Bu tərifin əsas hissələri: funksiya iştirak etməlidir; xarici scope-dan ən azı bir dəyişənə istinad etməlidir; dəyişən(lər)dən fərqli scope zənciri qolunda çağırılmalıdır.'
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
          en: 'Since closure is inherently tied to a function instance, its closure over a variable lasts as long as there is still a reference to that function. If ten functions all close over the same variable, and over time nine of these function references are discarded, the lone remaining function reference still preserves that variable. Once that final function reference is discarded, the last closure over that variable is gone, and the variable itself is GC\'d.',
          az: 'Closure mahiyyətcə funksiya nüsxəsinə bağlı olduğu üçün onun dəyişən üzərindəki closure-u həmin funksiyaya istinad qaldıqca davam edir. On funksiya eyni dəyişən üzərində qapanıbsa və zamanla bu funksiya istinadlarından doqquzu atılıbsa, qalan tək funksiya istinadı həmin dəyişəni hələ də saxlayır. Son funksiya istinadı atılan kimi həmin dəyişən üzərindəki son closure yox olur və dəyişənin özü zibil yığımı ilə təmizlənir.'
        },
        {
          en: 'Closure can unexpectedly prevent the GC of a variable that you\'re otherwise done with, which leads to run-away memory usage over time. That\'s why it\'s important to discard function references (and thus their closures) when they\'re not needed anymore.',
          az: 'Closure artıq işin bitdiyi dəyişənin zibil yığımını gözlənilmədən əngəlləyə bilər və bu, zamanla nəzarətsiz yaddaş istifadəsinə aparır. Buna görə funksiya istinadlarını (və deməli, onların closure-larını) artıq lazım olmayanda atmaq vacibdir.'
        },
        {
          code: 'function manageBtnClickEvents(btn) {\n  var clickHandlers = [];\n  return function listener(cb){\n    if (cb) {\n      let clickHandler = function onClick(evt){\n        console.log(\'clicked!\');\n        cb(evt);\n      };\n      clickHandlers.push(clickHandler);\n      btn.addEventListener(\'click\', clickHandler);\n    }\n    else {\n      // passing no callback unsubscribes all click handlers\n      for (let handler of clickHandlers) {\n        btn.removeEventListener(\'click\', handler);\n      }\n      clickHandlers = [];\n    }\n  };\n}\n\nvar onSubmit = manageBtnClickEvents(mySubmitBtn);\nonSubmit(function checkout(evt){ /* .. */ });\nonSubmit(function trackAction(evt){ /* .. */ });\n\n// later, unsubscribe all handlers:\nonSubmit();'
        },
        {
          en: 'The inner `onClick(..)` function holds a closure over the passed in `cb`. That means the `checkout()` and `trackAction()` function expression references are held via closure (and cannot be GC\'d) for as long as these event handlers are subscribed. Unsubscribing an event handler when it\'s no longer needed can be even more important than the initial subscription!',
          az: 'Daxili `onClick(..)` funksiyası ötürülən `cb` üzərində closure saxlayır. Bu o deməkdir ki, `checkout()` və `trackAction()` funksiya ifadəsi istinadları bu hadisə işləyiciləri abunə olduqca closure vasitəsilə saxlanılır (və zibil yığımı ilə təmizlənə bilməz). Artıq lazım olmayan hadisə işləyicisindən abunəliyi ləğv etmək ilkin abunəlikdən də vacib ola bilər!'
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
          en: 'Should we think of closure as applied only to the referenced outer variable(s), or does closure preserve the entire scope chain with all its variables? Conceptually, closure is per variable rather than per scope. Ajax callbacks, event handlers, and all other forms of function closures are typically assumed to close over only what they explicitly reference. But the reality is more complicated than that.',
          az: 'Closure-u yalnız istinad edilən xarici dəyişən(lər)ə tətbiq olunan kimi düşünməliyik, yoxsa closure bütün dəyişənləri ilə birlikdə bütün scope zəncirini saxlayır? Konseptual olaraq closure scope üzrə yox, dəyişən üzrədir. Ajax callback-ləri, hadisə işləyiciləri və funksiya closure-larının bütün digər formalarının adətən yalnız açıq şəkildə istinad etdikləri şeylər üzərində qapandığı güman edilir. Lakin reallıq bundan mürəkkəbdir.'
        },
        {
          code: 'function storeStudentInfo(id,name,grade) {\n  return function getInfo(whichValue){\n    // warning:\n    //   using `eval(..)` is a bad idea!\n    var val = eval(whichValue);\n    return val;\n  };\n}\n\nvar info = storeStudentInfo(73,\'Suzy\',87);\ninfo(\'name\');    // Suzy\ninfo(\'grade\');   // 87'
        },
        {
          en: 'Many modern JS engines do apply an optimization that removes any variables from a closure scope that aren\'t explicitly referenced. However, as we see with `eval(..)`, there are situations where such an optimization cannot be applied, and the closure scope continues to contain all its original variables. In other words, closure must be per scope, implementation wise, and then an optional optimization trims down the scope to only what was closed over.',
          az: 'Bir çox müasir JS mühərriki closure scope-undan açıq istinad edilməyən dəyişənləri silən optimallaşdırma tətbiq edir. Lakin `eval(..)` nümunəsində gördüyümüz kimi, belə optimallaşdırmanın tətbiq oluna bilmədiyi hallar var və closure scope-u bütün ilkin dəyişənlərini saxlamağa davam edir. Başqa sözlə, reallaşdırma baxımından closure scope üzrə olmalıdır, sonra isə könüllü optimallaşdırma scope-u yalnız üzərində qapanılan şeylərə qədər kəsir.'
        },
        {
          en: 'In cases where a variable holds a large value (like an object or array) and that variable is present in a closure scope, if you don\'t need that value anymore and don\'t want that memory held, it\'s safer (memory usage) to manually discard the value rather than relying on closure optimization/GC:',
          az: 'Dəyişən böyük dəyər (məsələn, obyekt və ya massiv) saxlayırsa və həmin dəyişən closure scope-undadırsa, o dəyərə artıq ehtiyacın yoxdursa və yaddaşın tutulmasını istəmirsənsə, closure optimallaşdırmasına/GC-yə güvənmək əvəzinə dəyəri əllə atmaq (yaddaş baxımından) daha təhlükəsizdir:'
        },
        {
          code: 'function manageStudentGrades(studentRecords) {\n  var grades = studentRecords.map(getGrade);\n\n  // unset `studentRecords` to prevent unwanted\n  // memory retention in the closure\n  studentRecords = null;\n\n  return addGrade;\n  // ..\n}'
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
          en: 'Our current perspective suggests that wherever a function is passed and invoked, closure preserves a hidden link back to the original scope to facilitate the access to the closed-over variables. But there\'s another way of thinking about closure. This alternative model de-emphasizes "functions as first-class values," and instead embraces how functions (like all non-primitive values) are held by reference in JS, and assigned/passed by reference-copy.',
          az: 'İndiki baxışımıza görə, funksiya hara ötürülüb çağırılırsa, closure üzərində qapanılan dəyişənlərə çıxışı təmin etmək üçün ilkin scope-a gizli əlaqə saxlayır. Lakin closure haqqında başqa düşünmə tərzi də var. Bu alternativ model «birinci dərəcəli dəyər kimi funksiyalar» ideyasını arxa plana keçirir və bunun əvəzinə funksiyaların (bütün qeyri-primitiv dəyərlər kimi) JS-də istinadla saxlandığını, istinadın surəti ilə mənimsədilib ötürüldüyünü önə çəkir.'
        },
        {
          en: 'Instead of thinking about the inner function instance of `addTo(..)` moving to the outer RED(1) scope via the `return` and assignment, we can envision that function instances actually just stay in place in their own scope environment, of course with their scope-chain intact. What gets sent to the RED(1) scope is just a reference to the in-place function instance, rather than the function instance itself.',
          az: '`addTo(..)` daxili funksiya nüsxəsinin `return` və mənimsətmə vasitəsilə xarici QIRMIZI(1) scope-a köçdüyünü düşünmək əvəzinə, təsəvvür edə bilərik ki, funksiya nüsxələri əslində öz scope mühitlərində yerində qalır, təbii ki, scope zəncirləri bütöv şəkildə. QIRMIZI(1) scope-a funksiya nüsxəsinin özü yox, yerində qalan funksiya nüsxəsinə sadəcə istinad göndərilir.'
        },
        {
          en: 'In this alternative model, functions stay in place and keep accessing their original scope chain just like they always could. Closure instead describes the magic of **keeping alive a function instance**, along with its whole scope environment and chain, for as long as there\'s at least one reference to that function instance floating around in any other part of the program.',
          az: 'Bu alternativ modeldə funksiyalar yerində qalır və həmişə olduğu kimi ilkin scope zəncirlərinə çıxışı davam etdirir. Closure isə, əvəzində, **funksiya nüsxəsini** bütün scope mühiti və zənciri ilə birlikdə — proqramın hər hansı başqa hissəsində həmin funksiya nüsxəsinə ən azı bir istinad olduqca — **canlı saxlamaq** sehrini təsvir edir.'
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
          en: 'Imagine you have a button on a page that when clicked, should retrieve and send some data via an Ajax request. Without closure, the event handler has to read a DOM attribute each time it\'s fired. Why couldn\'t an event handler remember this value? Let\'s try using closure to improve the code:',
          az: 'Təsəvvür et ki, səhifədə düymə var və ona klik ediləndə Ajax sorğusu ilə müəyyən data götürülüb göndərilməlidir. Closure olmadan hadisə işləyicisi hər dəfə işə düşəndə DOM atributunu oxumalıdır. Niyə hadisə işləyicisi bu dəyəri yadda saxlaya bilməsin? Kodu yaxşılaşdırmaq üçün closure-dan istifadə edək:'
        },
        {
          code: 'function setupButtonHandler(btn) {\n  var recordKind = btn.dataset.kind;\n  var requestURL = APIendpoints[recordKind];\n  var requestData = data[recordKind];\n\n  btn.addEventListener(\n    \'click\',\n    function makeRequest(evt){\n      ajax(requestURL,requestData);\n    }\n  );\n}'
        },
        {
          en: 'Two similar techniques from the Functional Programming (FP) paradigm that rely on closure are [[partial-application]] and currying. With these techniques, we alter the shape of functions that require multiple inputs so some inputs are provided up front, and other inputs are provided later; the initial inputs are remembered via closure. Once all inputs have been provided, the underlying action is performed.',
          az: 'Funksional proqramlaşdırma (FP) paradiqmasından closure-a əsaslanan iki oxşar texnika [[partial-application]] və currying-dir. Bu texnikalarla bir neçə giriş tələb edən funksiyaların formasını dəyişirik: bəzi girişlər əvvəlcədən, digərləri sonra verilir; ilkin girişlər closure vasitəsilə yadda saxlanılır. Bütün girişlər veriləndə əsas əməliyyat yerinə yetirilir.'
        },
        {
          caption: 'Qismən tətbiq: URL və data əvvəlcədən verilir, `evt` sonra',
          code: 'function defineHandler(requestURL,requestData) {\n  return function makeRequest(evt){\n    ajax(requestURL,requestData);\n  };\n}\n\nfunction setupButtonHandler(btn) {\n  var recordKind = btn.dataset.kind;\n  var handler = defineHandler(\n    APIendpoints[recordKind],\n    data[recordKind]\n  );\n  btn.addEventListener(\'click\',handler);\n}'
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
          en: 'We explored two models for mentally tackling closure:\n\n**Observational:** closure is a function instance remembering its outer variables even as that function is passed to and invoked in other scopes.\n\n**Implementational:** closure is a function instance and its scope environment preserved in-place while any references to it are passed around and invoked from other scopes.',
          az: 'Closure-u zehnən mənimsəmək üçün iki model araşdırdıq:\n\n**Müşahidə modeli:** closure funksiya başqa scope-lara ötürülüb orada çağırılanda belə xarici dəyişənlərini yadda saxlayan funksiya nüsxəsidir.\n\n**Reallaşdırma modeli:** closure ona olan istinadlar ötürülüb başqa scope-lardan çağırılarkən yerində saxlanılan funksiya nüsxəsi və onun scope mühitidir.'
        },
        {
          en: 'Summarizing the benefits to our programs: closure can improve efficiency by allowing a function instance to remember previously determined information instead of having to compute it each time. Closure can improve code readability, bounding scope-exposure by encapsulating variable(s) inside function instances, while still making sure the information in those variables is accessible for future use.',
          az: 'Proqramlarımız üçün faydaları yekunlaşdıraq: closure funksiya nüsxəsinə əvvəlcədən müəyyən olunmuş məlumatı hər dəfə hesablamaq əvəzinə yadda saxlamağa imkan verməklə səmərəliliyi artıra bilər. Closure dəyişən(lər)i funksiya nüsxələrinin içində inkapsulyasiya edərək scope açıqlığını məhdudlaşdırmaqla, həm də bu dəyişənlərdəki məlumatın gələcək istifadə üçün əlçatan qalmasını təmin etməklə kodun oxunaqlılığını artıra bilər.'
        }
      ],
      note: 'Müəllifin tapşırığını et: closure-un nə olduğunu və proqramlarında niyə faydalı olduğunu öz sözlərinlə yaz. Yoxlama üçün bu üç sualı cavablandır:\n\n1. `for (var i…)` ilə `for (let i…)` nümunəsində closure-lar niyə fərqli davranır?\n2. `useEffect` cleanup-ı yaddaş baxımından niyə vacibdir?\n3. «Stale closure» nədir və necə düzəldilir?'
    }
  ]
};
