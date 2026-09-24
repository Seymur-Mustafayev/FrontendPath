import type { BookChapter } from '../books';
import { exam6 } from './exam-ch6';

export const ch6: BookChapter = {
  id: 'ch6',
  no: 6,
  title: 'Limiting Scope Exposure',
  titleAz: 'Scope-un açıqlığını məhdudlaşdırmaq',
  sum: 'Ən az açıqlıq prinsipi (POLE): dəyişənləri funksiya, IIFE və bloklarla gizlətmək; var və let seçimi, catch scope-u və bloklardakı funksiya bəyannamələri (FiB).',
  sections: [
    {
      id: 'intro',
      heading: 'Chapter 6: Limiting Scope Exposure',
      headingAz: 'Fəsil 6: Scope-un açıqlığını məhdudlaşdırmaq',
      blocks: [
        {
          en: 'So far our focus has been explaining the mechanics of how scopes and variables work. With that foundation now firmly in place, our attention raises to a higher level of thinking: decisions and patterns we apply across the whole program.',
          az: 'İndiyə qədər diqqətimiz scope-ların və dəyişənlərin necə işlədiyinin mexanikasını izah etməkdə idi. Bu təməl artıq möhkəm qurulduğu üçün diqqətimiz daha yüksək düşüncə səviyyəsinə qalxır: bütün proqram boyu tətbiq etdiyimiz qərarlar və nümunələr.'
        },
        {
          en: "To begin, we're going to look at how and why we should be using different levels of scope (functions and blocks) to organize our program's variables, specifically to reduce scope over-exposure.",
          az: 'Başlanğıc üçün proqramımızın dəyişənlərini təşkil etməkdə, xüsusən scope-un həddindən artıq açıqlığını azaltmaq üçün scope-un müxtəlif səviyyələrindən (funksiyalar və bloklar) necə və niyə istifadə etməli olduğumuza baxacağıq.'
        }
      ]
    },
    {
      id: 'least-exposure',
      heading: 'Least Exposure',
      headingAz: 'Ən az açıqlıq',
      blocks: [
        {
          en: 'It makes sense that functions define their own scopes. But why do we need blocks to create scopes as well?',
          az: 'Funksiyaların öz scope-larını təyin etməsi məntiqlidir. Bəs scope yaratmaq üçün bloklar da niyə lazımdır?'
        },
        {
          en: 'Software engineering articulates a fundamental discipline, typically applied to software security, called "The Principle of Least Privilege" (POLP). And a variation of this principle that applies to our current discussion is typically labeled as "Least Exposure" ([[pole]]).',
          az: 'Proqram mühəndisliyi adətən proqram təhlükəsizliyinə tətbiq olunan fundamental bir intizamı ifadə edir: «Ən az imtiyaz prinsipi» (POLP). Bu prinsipin indiki müzakirəmizə aid variantı isə adətən «Ən az açıqlıq» ([[pole]]) adlanır.'
        },
        {
          en: 'POLP expresses a defensive posture to software architecture: components of the system should be designed to function with least privilege, least access, least exposure. If each piece is connected with minimum-necessary capabilities, the overall system is stronger from a security standpoint, because a compromise or failure of one piece has a minimized impact on the rest of the system.',
          az: 'POLP proqram arxitekturasına müdafiə mövqeyini ifadə edir: sistemin komponentləri ən az imtiyaz, ən az çıxış, ən az açıqlıqla işləyəcək şəkildə layihələndirilməlidir. Hər hissə minimum zəruri imkanlarla bağlanırsa, bütöv sistem təhlükəsizlik baxımından daha möhkəm olur, çünki bir hissənin sındırılması və ya sıradan çıxması sistemin qalan hissəsinə minimal təsir göstərir.'
        },
        {
          en: 'If POLP focuses on system-level component design, the POLE *Exposure* variant focuses on a lower level; we\'ll apply it to how scopes interact with each other.',
          az: 'POLP sistem səviyyəsində komponent dizaynına fokuslanırsa, POLE — *açıqlıq* variantı — daha aşağı səviyyəyə fokuslanır; biz onu scope-ların bir-biri ilə qarşılıqlı əlaqəsinə tətbiq edəcəyik.'
        },
        {
          en: 'In following POLE, what do we want to minimize the exposure of? Simply: the variables registered in each scope.',
          az: 'POLE-a əməl edərkən nəyin açıqlığını minimuma endirmək istəyirik? Sadəcə: hər scope-da qeydiyyata alınan dəyişənlərin.'
        },
        {
          en: "Think of it this way: why shouldn't you just place all the variables of your program out in the global scope? That probably immediately feels like a bad idea, but it's worth considering why that is. When variables used by one part of the program are exposed to another part of the program, via scope, there are three main hazards that often arise:",
          az: 'Belə düşün: niyə proqramının bütün dəyişənlərini sadəcə qlobal scope-a qoymamalısan? Bu, yəqin dərhal pis fikir kimi görünür, amma bunun səbəbini düşünməyə dəyər. Proqramın bir hissəsinin istifadə etdiyi dəyişənlər scope vasitəsilə proqramın başqa hissəsinə açıq olanda çox vaxt üç əsas təhlükə yaranır:'
        },
        {
          en: "- **Naming Collisions:** if you use a common and useful variable/function name in two different parts of the program, but the identifier comes from one shared scope (like the global scope), then name collision occurs, and it's very likely that bugs will occur as one part uses the variable/function in a way the other part doesn't expect.",
          az: '- **Ad toqquşmaları:** proqramın iki fərqli hissəsində geniş yayılmış və faydalı dəyişən/funksiya adından istifadə edirsənsə, amma identifikator bir ortaq scope-dan (məsələn, qlobal scope-dan) gəlirsə, ad toqquşması baş verir və bir hissə dəyişəni/funksiyanı o biri hissənin gözləmədiyi şəkildə istifadə etdikcə bug yaranması çox ehtimallıdır.'
        },
        {
          en: 'For example, imagine if all your loops used a single global `i` index variable, and then it happens that one loop in a function is running during an iteration of a loop from another function, and now the shared `i` variable gets an unexpected value.',
          az: 'Məsələn, təsəvvür et ki, bütün dövrlərin tək qlobal `i` indeks dəyişənindən istifadə edir və elə olur ki, bir funksiyadakı dövr başqa funksiyadakı dövrün iterasiyası zamanı işləyir — və ortaq `i` dəyişəni gözlənilməz dəyər alır.'
        },
        {
          en: "- **Unexpected Behavior:** if you expose variables/functions whose usage is otherwise private to a piece of the program, it allows other developers to use them in ways you didn't intend, which can violate expected behavior and cause bugs.",
          az: '- **Gözlənilməz davranış:** əslində proqramın bir hissəsinə məxsus olan dəyişənləri/funksiyaları açıq qoysan, bu, digər developerlərə onlardan sənin nəzərdə tutmadığın şəkildə istifadə etməyə imkan verir; bu da gözlənilən davranışı poza və bug yarada bilər.'
        },
        {
          en: "For example, if your part of the program assumes an array contains all numbers, but someone else's code accesses and modifies the array to include booleans and strings, your code may then misbehave in unexpected ways.",
          az: 'Məsələn, proqramın sənin hissən massivdə yalnız rəqəmlər olduğunu fərz edirsə, amma başqasının kodu massivə müraciət edib ora boolean və sətirlər əlavə edirsə, kodun gözlənilməz şəkildə səhv işləyə bilər.'
        },
        {
          en: 'Worse, exposure of private details invites those with mal-intent to try to work around limitations you have imposed, to do things with your part of the software that shouldn\'t be allowed.',
          az: 'Daha pisi, gizli detalların açıq olması pis niyyətliləri sənin qoyduğun məhdudiyyətlərdən yan keçməyə, proqramın sənin hissəsi ilə icazə verilməməli işlər görməyə dəvət edir.'
        },
        {
          en: "- **Unintended Dependency:** if you expose variables/functions unnecessarily, it invites other developers to use and depend on those otherwise private pieces. While that doesn't break your program today, it creates a refactoring hazard in the future, because now you cannot as easily refactor that variable or function without potentially breaking other parts of the software that you don't control.",
          az: '- **Arzuolunmaz asılılıq:** dəyişənləri/funksiyaları lazımsız yerə açıq qoysan, bu, digər developerləri həmin gizli qalmalı hissələrdən istifadə etməyə və onlardan asılı olmağa dəvət edir. Bu, proqramını bu gün sındırmasa da, gələcəkdə refaktorinq təhlükəsi yaradır, çünki artıq həmin dəyişəni və ya funksiyanı nəzarət etmədiyin digər hissələri potensial olaraq sındırmadan asanlıqla refaktor edə bilməzsən.'
        },
        {
          en: 'For example, if your code relies on an array of numbers, and you later decide it\'s better to use some other data structure instead of an array, you now must take on the liability of adjusting other affected parts of the software.',
          az: 'Məsələn, kodun rəqəmlər massivinə güvənirsə və sonra massiv əvəzinə başqa məlumat strukturundan istifadənin daha yaxşı olduğuna qərar verirsənsə, indi proqramın təsirə məruz qalan digər hissələrini düzəltmək məsuliyyəti də sənin üzərinə düşür.'
        },
        {
          en: 'POLE, as applied to variable/function scoping, essentially says, default to exposing the bare minimum necessary, keeping everything else as private as possible. Declare variables in as small and deeply nested of scopes as possible, rather than placing everything in the global (or even outer function) scope.',
          az: 'Dəyişən/funksiya scope-una tətbiq olunan POLE mahiyyətcə deyir: standart olaraq yalnız ən zəruri minimumu aç, qalan hər şeyi mümkün qədər gizli saxla. Hər şeyi qlobal (və ya hətta xarici funksiya) scope-una qoymaq əvəzinə dəyişənləri mümkün qədər kiçik və dərin iç-içə scope-larda elan et.'
        },
        {
          en: 'If you design your software accordingly, you have a much greater chance of avoiding (or at least minimizing) these three hazards.',
          az: 'Proqramını buna uyğun layihələndirsən, bu üç təhlükədən qaçmaq (və ya heç olmasa onları minimuma endirmək) şansın xeyli artır.'
        },
        { en: 'Consider:', az: 'Buna bax:' },
        {
          code: 'function diff(x,y) {\n  if (x > y) {\n    let tmp = x;\n    x = y;\n    y = tmp;\n  }\n\n  return y - x;\n}\n\ndiff(3,7);   // 4\ndiff(7,5);   // 2'
        },
        {
          en: 'In this `diff(..)` function, we want to ensure that `y` is greater than or equal to `x`, so that when we subtract (`y - x`), the result is `0` or larger. If `x` is initially larger (the result would be negative!), we swap `x` and `y` using a `tmp` variable, to keep the result positive.',
          az: 'Bu `diff(..)` funksiyasında `y`-in `x`-dən böyük və ya ona bərabər olmasını təmin etmək istəyirik ki, çıxanda (`y - x`) nəticə `0` və ya daha böyük olsun. `x` əvvəlcə böyükdürsə (nəticə mənfi olardı!), nəticəni müsbət saxlamaq üçün `tmp` dəyişəni ilə `x` və `y`-in yerini dəyişirik.'
        },
        {
          en: "In this simple example, it doesn't seem to matter whether `tmp` is inside the `if` block or whether it belongs at the function level — it certainly shouldn't be a global variable! However, following the POLE principle, `tmp` should be as hidden in scope as possible. So we block scope `tmp` (using `let`) to the `if` block.",
          az: 'Bu sadə nümunədə `tmp`-in `if` blokunun içində olması və ya funksiya səviyyəsinə aid olmasının fərqi yoxmuş kimi görünür — amma o, əlbəttə, qlobal dəyişən olmamalıdır! Lakin POLE prinsipinə görə `tmp` scope-da mümkün qədər gizli olmalıdır. Ona görə `tmp`-i (`let` ilə) `if` blokunun scope-una bağlayırıq.'
        }
      ],
      note: 'POLE sadəcə JS qaydası deyil — yaxşı frontend arxitekturasının əsasıdır:\n\n- Komponentin daxili state-i props kimi çölə çıxarılmır.\n- Modul yalnız lazım olanı `export` edir, köməkçi funksiyalar faylın içində qalır.\n- Custom hook yalnız lazım olan dəyərləri qaytarır.\n\n«Arzuolunmaz asılılıq» xüsusilə ağrılıdır: bir dəfə export etdiyin köməkçi funksiyadan 20 fayl asılı olanda, onu dəyişmək bütöv refaktorinqə çevrilir.',
      terms: ['custom-hook', 'refactoring']
    },
    {
      id: 'function-scope-hiding',
      heading: 'Hiding in Plain (Function) Scope',
      headingAz: '(Funksiya) scope-unda gizlənmək',
      blocks: [
        {
          en: 'It should now be clear why it\'s important to hide our variable and function declarations in the lowest (most deeply nested) scopes possible. But how do we do so?',
          az: 'İndi aydın olmalıdır ki, dəyişən və funksiya bəyannamələrimizi mümkün qədər aşağı (ən dərin iç-içə) scope-larda gizlətmək niyə vacibdir. Bəs bunu necə edək?'
        },
        {
          en: "We've already seen the `let` and `const` keywords, which are block scoped declarators; we'll come back to them in more detail shortly. But first, what about hiding `var` or `function` declarations in scopes? That can easily be done by wrapping a `function` scope around a declaration.",
          az: 'Blok scope-lu bəyannamə sözləri olan `let` və `const`-u artıq görmüşük; tezliklə onlara daha ətraflı qayıdacağıq. Amma əvvəlcə: `var` və ya `function` bəyannamələrini scope-larda necə gizlədək? Bunu bəyannamənin ətrafına `function` scope-u bükməklə asanlıqla etmək olar.'
        },
        {
          en: "Let's consider an example where `function` scoping can be useful.",
          az: 'Gəl `function` scope-unun faydalı ola biləcəyi bir nümunəyə baxaq.'
        },
        {
          en: 'The mathematical operation "factorial" (notated as "6!") is the multiplication of a given integer against all successively lower integers down to `1` — actually, you can stop at `2` since multiplying `1` does nothing. In other words, "6!" is the same as "6 * 5!", which is the same as "6 * 5 * 4!", and so on. Because of the nature of the math involved, once any given integer\'s factorial (like "4!") has been calculated, we shouldn\'t need to do that work again, as it\'ll always be the same answer.',
          az: '«Faktorial» riyazi əməliyyatı («6!» kimi yazılır) verilmiş tam ədədin `1`-ə qədər bütün ardıcıl kiçik tam ədədlərə vurulmasıdır — əslində `2`-də dayanmaq olar, çünki `1`-ə vurmaq heç nə dəyişmir. Başqa sözlə, «6!» «6 * 5!» ilə eynidir, o da «6 * 5 * 4!» ilə və s. Riyaziyyatın təbiətinə görə hansısa tam ədədin faktorialı (məsələn, «4!») bir dəfə hesablandıqdan sonra bu işi yenidən görməyə ehtiyac olmamalıdır, çünki cavab həmişə eyni olacaq.'
        },
        {
          en: "So if you naively calculate factorial for `6`, then later want to calculate factorial for `7`, you might unnecessarily re-calculate the factorials of all the integers from 2 up to 6. If you're willing to trade memory for speed, you can solve that wasted computation by caching each integer's factorial as it's calculated:",
          az: 'Deməli, `6`-nın faktorialını sadəlövh şəkildə hesablayıb, sonra `7`-nin faktorialını hesablamaq istəsən, 2-dən 6-ya qədər bütün tam ədədlərin faktoriallarını lazımsız yerə yenidən hesablaya bilərsən. Yaddaşı sürətə dəyişməyə razısansa, bu boş hesablamanı hər tam ədədin faktorialını hesablandıqca keşləməklə həll edə bilərsən:'
        },
        {
          code: 'var cache = {};\n\nfunction factorial(x) {\n  if (x < 2) return 1;\n  if (!(x in cache)) {\n    cache[x] = x * factorial(x - 1);\n  }\n  return cache[x];\n}\n\nfactorial(6);\n// 720\n\ncache;\n// {\n//   "2": 2,\n//   "3": 6,\n//   "4": 24,\n//   "5": 120,\n//   "6": 720\n// }\n\nfactorial(7);\n// 5040'
        },
        {
          en: "We're storing all the computed factorials in `cache` so that across multiple calls to `factorial(..)`, the previous computations remain. But the `cache` variable is pretty obviously a *private* detail of how `factorial(..)` works, not something that should be exposed in an outer scope — especially not the global scope.",
          az: 'Hesablanmış bütün faktorialları `cache`-də saxlayırıq ki, `factorial(..)`-a çoxsaylı çağırışlar arasında əvvəlki hesablamalar qalsın. Lakin `cache` dəyişəni açıq-aydın `factorial(..)`-ın işləmə qaydasının *gizli* detalıdır, xarici scope-da — xüsusən qlobal scope-da — açıq qalmalı olan bir şey deyil.'
        },
        {
          en: "> **NOTE:** `factorial(..)` here is recursive — a call to itself is made from inside — but that's just for brevity of code sake; a non-recursive implementation would yield the same scoping analysis with respect to `cache`.",
          az: '> **QEYD:** Buradakı `factorial(..)` rekursivdir — içəridən özünü çağırır — amma bu, sadəcə kodun qısalığı üçündür; rekursiv olmayan reallaşdırma da `cache` baxımından eyni scope təhlilini verərdi.'
        },
        {
          en: 'However, fixing this over-exposure issue is not as simple as hiding the `cache` variable inside `factorial(..)`, as it might seem. Since we need `cache` to survive multiple calls, it must be located in a scope outside that function. So what can we do?',
          az: 'Lakin bu həddindən artıq açıqlıq problemini həll etmək göründüyü kimi `cache` dəyişənini `factorial(..)`-ın içində gizlətmək qədər sadə deyil. `cache`-in çoxsaylı çağırışlardan sonra da yaşaması lazım olduğu üçün o, həmin funksiyadan kənardakı scope-da yerləşməlidir. Bəs nə edək?'
        },
        {
          en: 'Define another middle scope (between the outer/global scope and the inside of `factorial(..)`) for `cache` to be located:',
          az: '`cache`-in yerləşməsi üçün (xarici/qlobal scope ilə `factorial(..)`-ın içi arasında) başqa bir aralıq scope təyin et:'
        },
        {
          code: '// outer/global scope\n\nfunction hideTheCache() {\n  // "middle scope", where we hide `cache`\n  var cache = {};\n\n  return factorial;\n\n  // **********************\n\n  function factorial(x) {\n    // inner scope\n    if (x < 2) return 1;\n    if (!(x in cache)) {\n      cache[x] = x * factorial(x - 1);\n    }\n    return cache[x];\n  }\n}\n\nvar factorial = hideTheCache();\n\nfactorial(6);\n// 720\n\nfactorial(7);\n// 5040'
        },
        {
          en: 'The `hideTheCache()` function serves no other purpose than to create a scope for `cache` to persist in across multiple calls to `factorial(..)`. But for `factorial(..)` to have access to `cache`, we have to define `factorial(..)` inside that same scope. Then we return the function reference, as a value from `hideTheCache()`, and store it in an outer scope variable, also named `factorial`. Now as we call `factorial(..)` (multiple times!), its persistent `cache` stays hidden yet accessible only to `factorial(..)`!',
          az: '`hideTheCache()` funksiyasının `factorial(..)`-a çoxsaylı çağırışlar arasında `cache`-in yaşaması üçün scope yaratmaqdan başqa məqsədi yoxdur. Lakin `factorial(..)`-ın `cache`-ə çıxışı olması üçün `factorial(..)`-ı həmin scope-un içində təyin etməliyik. Sonra funksiya istinadını `hideTheCache()`-dən dəyər kimi qaytarırıq və onu xarici scope-dakı, yenə `factorial` adlı dəyişəndə saxlayırıq. İndi `factorial(..)`-ı (dəfələrlə!) çağırdıqca onun daimi `cache`-i gizli qalır, amma yalnız `factorial(..)` üçün əlçatandır!'
        },
        {
          en: "OK, but... it's going to be tedious to define (and name!) a `hideTheCache(..)` function scope each time such a need for variable/function hiding occurs, especially since we'll likely want to avoid name collisions with this function by giving each occurrence a unique name. Ugh.",
          az: 'Yaxşı, amma... dəyişəni/funksiyanı gizlətmək ehtiyacı hər yarananda `hideTheCache(..)` funksiya scope-u təyin etmək (və ona ad vermək!) yorucu olacaq, xüsusən də bu funksiya ilə ad toqquşmasından qaçmaq üçün yəqin ki, hər dəfə unikal ad vermək istəyəcəyik. Uf.'
        },
        {
          en: '> **NOTE:** The illustrated technique — caching a function\'s computed output to optimize performance when repeated calls of the same inputs are expected — is quite common in the Functional Programming (FP) world, canonically referred to as "memoization" ([[memoization]]); this caching relies on closure (see Chapter 7). Also, there are memory usage concerns (addressed in "A Word About Memory" in Appendix B). FP libraries will usually provide an optimized and vetted utility for memoization of functions, which would take the place of `hideTheCache(..)` here. Memoization is beyond the *scope* (pun intended!) of our discussion, but see my *Functional-Light JavaScript* book for more information.',
          az: '> **QEYD:** Göstərilən texnika — eyni girişlərlə təkrar çağırışlar gözlənildikdə performansı optimallaşdırmaq üçün funksiyanın hesabladığı nəticəni keşləmək — Funksional Proqramlaşdırma (FP) dünyasında çox yayılıb və kanonik olaraq «memoization» ([[memoization]]) adlanır; bu keşləmə closure-a əsaslanır (bax: 7-ci fəsil). Həmçinin yaddaş istifadəsi ilə bağlı narahatlıqlar var (Əlavə B-dəki «Yaddaş haqqında bir söz» bölməsində). FP kitabxanaları adətən funksiyaların memoizasiyası üçün optimallaşdırılmış və yoxlanılmış utilit təqdim edir; o, buradakı `hideTheCache(..)`-ın yerini tutardı. Memoization müzakirəmizin *scope*-undan (söz oyunu qəsdəndir!) kənardadır, ətraflı məlumat üçün mənim *Functional-Light JavaScript* kitabıma bax.'
        },
        {
          en: 'Rather than defining a new and uniquely named function each time one of those scope-only-for-the-purpose-of-hiding-a-variable situations occurs, a perhaps better solution is to use a function expression:',
          az: '«Yalnız dəyişəni gizlətmək üçün scope» vəziyyətlərindən biri hər yarananda yeni və unikal adlı funksiya təyin etmək əvəzinə, bəlkə də daha yaxşı həll funksiya ifadəsindən istifadə etməkdir:'
        },
        {
          code: 'var factorial = (function hideTheCache() {\n  var cache = {};\n\n  function factorial(x) {\n    if (x < 2) return 1;\n    if (!(x in cache)) {\n      cache[x] = x * factorial(x - 1);\n    }\n    return cache[x];\n  }\n\n  return factorial;\n})();\n\nfactorial(6);\n// 720\n\nfactorial(7);\n// 5040'
        },
        {
          en: 'Wait! This is still using a function to create the scope for hiding `cache`, and in this case, the function is still named `hideTheCache`, so how does that solve anything?',
          az: 'Dayan! Bu, `cache`-i gizlətmək üçün scope yaratmaqdan ötrü yenə funksiyadan istifadə edir və bu halda funksiyanın adı yenə `hideTheCache`-dir — bəs bu nəyi həll edir?'
        },
        {
          en: 'Recall from "Function Name Scope" (in Chapter 3), what happens to the name identifier from a `function` expression. Since `hideTheCache(..)` is defined as a `function` expression instead of a `function` declaration, its name is in its own scope — essentially the same scope as `cache` — rather than in the outer/global scope.',
          az: '(3-cü fəsildəki) «Funksiya adının scope-u» bölməsindən xatırla: `function` ifadəsinin ad identifikatoru ilə nə baş verir. `hideTheCache(..)` `function` bəyannaməsi yox, `function` ifadəsi kimi təyin olunduğu üçün onun adı xarici/qlobal scope-da yox, öz scope-undadır — mahiyyətcə `cache` ilə eyni scope-da.'
        },
        {
          en: 'That means we can name every single occurrence of such a function expression the exact same name, and never have any collision. More appropriately, we can name each occurrence semantically based on whatever it is we\'re trying to hide, and not worry that whatever name we choose is going to collide with any other `function` expression scope in the program.',
          az: 'Bu o deməkdir ki, belə funksiya ifadəsinin hər birinə tamamilə eyni adı verə bilərik və heç vaxt toqquşma olmaz. Daha doğrusu, hər birinə gizlətməyə çalışdığımız şeyə əsasən semantik ad verə bilərik və seçdiyimiz adın proqramdakı hər hansı başqa `function` ifadəsi scope-u ilə toqquşacağından narahat olmayaq.'
        },
        {
          en: 'In fact, we could just leave off the name entirely — thus defining an "anonymous `function` expression" instead. But Appendix A will discuss the importance of names even for such scope-only functions.',
          az: 'Əslində adı tamamilə buraxa da bilərdik — beləliklə «anonim `function` ifadəsi» təyin edərdik. Lakin Əlavə A-da hətta yalnız scope üçün olan belə funksiyalar üçün adların vacibliyi müzakirə olunacaq.'
        }
      ],
      note: 'Bu, React-dəki `useMemo`/`React.memo`-nun ideya səviyyəsində əcdadıdır: nəticəni keşlə, eyni giriş gələndə yenidən hesablama.\n\nDiqqət et: `cache` gizlidir, amma **yaşayır** — çünki `factorial` ona istinad saxlayır. Bu, növbəti fəslin mövzusu olan [[closure]]-un ilk real nümunəsidir.',
      terms: ['usememo', 'react-memo']
    },
    {
      id: 'iife',
      heading: 'Invoking Function Expressions Immediately',
      headingAz: 'Funksiya ifadələrini dərhal çağırmaq',
      blocks: [
        {
          en: "There's another important bit in the previous factorial recursive program that's easy to miss: the line at the end of the `function` expression that contains `})();`.",
          az: 'Əvvəlki rekursiv faktorial proqramında gözdən qaçırmaq asan olan daha bir vacib detal var: `function` ifadəsinin sonundakı `})();` olan sətir.'
        },
        {
          en: "Notice that we surrounded the entire `function` expression in a set of `( .. )`, and then on the end, we added that second `()` parentheses set; that's actually calling the `function` expression we just defined. Moreover, in this case, the first set of surrounding `( .. )` around the function expression is not strictly necessary (more on that in a moment), but we used them for readability sake anyway.",
          az: 'Diqqət et ki, bütün `function` ifadəsini `( .. )` mötərizələrinə aldıq, sonra isə sonuna ikinci `()` mötərizə cütünü əlavə etdik; bu, əslində indicə təyin etdiyimiz `function` ifadəsini çağırmaqdır. Üstəlik, bu halda funksiya ifadəsinin ətrafındakı birinci `( .. )` cütü tam zəruri deyil (bu barədə bir azdan), amma oxunaqlılıq üçün yenə də onlardan istifadə etdik.'
        },
        {
          en: "So, in other words, we're defining a `function` expression that's then immediately invoked. This common pattern has a (very creative!) name: Immediately Invoked Function Expression ([[iife]]).",
          az: 'Başqa sözlə, dərhal çağırılan `function` ifadəsi təyin edirik. Bu geniş yayılmış nümunənin (çox yaradıcı!) adı var: Immediately Invoked Function Expression ([[iife]]) — dərhal çağırılan funksiya ifadəsi.'
        },
        {
          en: 'An IIFE is useful when we want to create a scope to hide variables/functions. Since it\'s an expression, it can be used in **any** place in a JS program where an expression is allowed. An IIFE can be named, as with `hideTheCache()`, or (much more commonly!) unnamed/anonymous. And it can be standalone or, as before, part of another statement — `hideTheCache()` returns the `factorial()` function reference which is then `=` assigned to the variable `factorial`.',
          az: 'IIFE dəyişənləri/funksiyaları gizlətmək üçün scope yaratmaq istəyəndə faydalıdır. İfadə olduğu üçün JS proqramında ifadəyə icazə verilən **istənilən** yerdə istifadə oluna bilər. IIFE `hideTheCache()`-dəki kimi adlı, ya da (daha çox!) adsız/anonim ola bilər. O, müstəqil də ola bilər, əvvəlki kimi başqa ifadənin hissəsi də — `hideTheCache()` `factorial()` funksiya istinadını qaytarır, o da `=` ilə `factorial` dəyişəninə mənimsədilir.'
        },
        { en: "For comparison, here's an example of a standalone IIFE:", az: 'Müqayisə üçün, budur müstəqil IIFE nümunəsi:' },
        { code: '// outer scope\n\n(function(){\n  // inner hidden scope\n})();\n\n// more outer scope' },
        {
          en: "Unlike earlier with `hideTheCache()`, where the outer surrounding `(..)` were noted as being an optional stylistic choice, for a standalone IIFE they're **required**; they distinguish the `function` as an expression, not a statement. For consistency, however, always surround an IIFE `function` with `( .. )`.",
          az: 'Xarici `(..)`-ın könüllü üslub seçimi kimi qeyd olunduğu əvvəlki `hideTheCache()` nümunəsindən fərqli olaraq, müstəqil IIFE üçün onlar **məcburidir**; onlar `function`-ı ifadə kimi fərqləndirir, bəyannamə kimi yox. Lakin ardıcıllıq üçün IIFE `function`-ını həmişə `( .. )` ilə əhatə et.'
        },
        {
          en: "> **NOTE:** Technically, the surrounding `( .. )` aren't the only syntactic way to ensure the `function` in an IIFE is treated by the JS parser as a function expression. We'll look at some other options in Appendix A.",
          az: '> **QEYD:** Texniki baxımdan əhatə edən `( .. )` IIFE-dəki `function`-ın JS parseri tərəfindən funksiya ifadəsi kimi qəbul olunmasını təmin etməyin yeganə sintaktik yolu deyil. Bəzi digər variantlara Əlavə A-da baxacağıq.'
        },
        { en: '## Function Boundaries', az: '## Funksiya sərhədləri' },
        {
          en: 'Beware that using an IIFE to define a scope can have some unintended consequences, depending on the code around it. Because an IIFE is a full function, the function boundary alters the behavior of certain statements/constructs.',
          az: 'Diqqət et ki, scope təyin etmək üçün IIFE istifadəsi ətrafdakı koddan asılı olaraq bəzi gözlənilməz nəticələr verə bilər. IIFE tam funksiya olduğu üçün funksiya sərhədi bəzi ifadələrin/konstruksiyaların davranışını dəyişir.'
        },
        {
          en: "For example, a `return` statement in some piece of code would change its meaning if an IIFE is wrapped around it, because now the `return` would refer to the IIFE's function. Non-arrow function IIFEs also change the binding of a `this` keyword — more on that in the *Objects & Classes* book. And statements like `break` and `continue` won't operate across an IIFE function boundary to control an outer loop or block.",
          az: 'Məsələn, kodun hansısa hissəsindəki `return` ifadəsinin ətrafına IIFE bükülsə, onun mənası dəyişər, çünki indi `return` IIFE-nin funksiyasına aid olar. Arrow olmayan funksiya IIFE-ləri həm də `this` açar sözünün bağlamasını dəyişir — bu barədə *Objects & Classes* kitabında ətraflı. `break` və `continue` kimi ifadələr isə xarici dövrü və ya bloku idarə etmək üçün IIFE funksiya sərhədindən keçə bilmir.'
        },
        {
          en: 'So, if the code you need to wrap a scope around has `return`, `this`, `break`, or `continue` in it, an IIFE is probably not the best approach. In that case, you might look to create the scope with a block instead of a function.',
          az: 'Deməli, ətrafına scope bükməli olduğun kodda `return`, `this`, `break` və ya `continue` varsa, IIFE yəqin ki, ən yaxşı yanaşma deyil. Bu halda scope-u funksiya əvəzinə blokla yaratmağa baxa bilərsən.'
        }
      ],
      note: 'IIFE ES modullarından əvvəlki dövrün əsas «modul» alətidir — jQuery plaginləri, köhnə kitabxanalar bununla qurulurdu. Bu gün onu əsasən iki yerdə görəcəksən:\n\n```js\n// 1. useEffect içində async funksiya\nuseEffect(() => {\n  (async () => {\n    const res = await fetch(url);\n    setData(await res.json());\n  })();\n}, [url]);\n```\n\n2. Bandlerin çıxışında (build nəticəsi) — Vite/Rollup kodu çox vaxt IIFE formatında yığır.',
      terms: ['async-await', 'this']
    },
    {
      id: 'block-scoping',
      heading: 'Scoping with Blocks',
      headingAz: 'Bloklarla scope yaratmaq',
      blocks: [
        {
          en: 'You should by this point feel fairly comfortable with the merits of creating scopes to limit identifier exposure.',
          az: 'Bu nöqtədə identifikatorların açıqlığını məhdudlaşdırmaq üçün scope yaratmağın üstünlükləri sənə kifayət qədər tanış olmalıdır.'
        },
        {
          en: "So far, we looked at doing this via `function` (i.e., IIFE) scope. But let's now consider using `let` declarations with nested blocks. In general, any `{ .. }` curly-brace pair which is a statement will act as a block, but **not necessarily** as a scope.",
          az: 'İndiyə qədər bunu `function` (yəni IIFE) scope-u vasitəsilə etməyə baxdıq. İndi isə `let` bəyannamələrini iç-içə bloklarla istifadə etməyə baxaq. Ümumiyyətlə, ifadə olan istənilən `{ .. }` fiqurlu mötərizə cütü blok kimi davranır, amma scope kimi **mütləq yox**.'
        },
        {
          en: 'A block only becomes a scope if necessary, to contain its block-scoped declarations (i.e., `let` or `const`). Consider:',
          az: 'Blok yalnız lazım olanda — öz blok scope-lu bəyannamələrini (yəni `let` və ya `const`) saxlamaq üçün — scope-a çevrilir. Buna bax:'
        },
        {
          code: '{\n  // not necessarily a scope (yet)\n\n  // ..\n\n  // now we know the block needs to be a scope\n  let thisIsNowAScope = true;\n\n  for (let i = 0; i < 5; i++) {\n    // this is also a scope, activated each\n    // iteration\n    if (i % 2 == 0) {\n      // this is just a block, not a scope\n      console.log(i);\n    }\n  }\n}\n// 0 2 4'
        },
        {
          en: 'Not all `{ .. }` curly-brace pairs create blocks (and thus are eligible to become scopes):\n\n- Object literals use `{ .. }` curly-brace pairs to delimit their key-value lists, but such object values are **not** scopes.\n- `class` uses `{ .. }` curly-braces around its body definition, but this is not a block or scope.\n- A `function` uses `{ .. }` around its body, but this is not technically a block — it\'s a single statement for the function body. It *is*, however, a (function) scope.\n- The `{ .. }` curly-brace pair on a `switch` statement (around the set of `case` clauses) does not define a block/scope.',
          az: 'Bütün `{ .. }` fiqurlu mötərizə cütləri blok yaratmır (və buna görə scope-a çevrilə bilmir):\n\n- Obyekt literalları açar-dəyər siyahılarını ayırmaq üçün `{ .. }` cütündən istifadə edir, amma belə obyekt dəyərləri scope **deyil**.\n- `class` gövdəsinin ətrafında `{ .. }` istifadə edir, amma bu, blok və ya scope deyil.\n- `function` gövdəsinin ətrafında `{ .. }` istifadə edir, amma bu, texniki baxımdan blok deyil — funksiya gövdəsi üçün tək ifadədir. Lakin o, (funksiya) scope-u*dur*.\n- `switch` ifadəsindəki (`case` bəndləri toplusunun ətrafındakı) `{ .. }` cütü blok/scope təyin etmir.'
        },
        {
          en: 'Other than such non-block examples, a `{ .. }` curly-brace pair can define a block attached to a statement (like an `if` or `for`), or stand alone by itself — see the outermost `{ .. }` curly brace pair in the previous snippet. An explicit block of this sort — if it has no declarations, it\'s not actually a scope — serves no operational purpose, though it can still be useful as a semantic signal.',
          az: 'Belə blok olmayan nümunələr istisna olmaqla, `{ .. }` cütü ifadəyə (məsələn, `if` və ya `for`-a) bağlı blok təyin edə bilər, ya da təkbaşına dura bilər — əvvəlki nümunədəki ən xarici `{ .. }` cütünə bax. Bu cür açıq blok — bəyannaməsi yoxdursa, əslində scope deyil — heç bir əməli məqsədə xidmət etmir, amma yenə də semantik siqnal kimi faydalı ola bilər.'
        },
        {
          en: "Explicit standalone `{ .. }` blocks have always been valid JS syntax, but since they couldn't be a scope prior to ES6's `let`/`const`, they are quite rare. However, post ES6, they're starting to catch on a little bit.",
          az: 'Açıq müstəqil `{ .. }` blokları həmişə keçərli JS sintaksisi olub, amma ES6-nın `let`/`const`-undan əvvəl scope ola bilmədikləri üçün olduqca nadir görünürlər. Lakin ES6-dan sonra bir az yayılmağa başlayırlar.'
        },
        {
          en: 'In most languages that support block scoping, an explicit block scope is an extremely common pattern for creating a narrow slice of scope for one or a few variables. So following the POLE principle, we should embrace this pattern more widespread in JS as well; use (explicit) block scoping to narrow the exposure of identifiers to the minimum practical.',
          az: 'Blok scope-u dəstəkləyən əksər dillərdə açıq blok scope-u bir və ya bir neçə dəyişən üçün dar scope dilimi yaratmağın son dərəcə geniş yayılmış nümunəsidir. Ona görə POLE prinsipinə əməl edərək bu nümunəni JS-də də daha geniş mənimsəməliyik; identifikatorların açıqlığını praktik minimuma endirmək üçün (açıq) blok scope-dan istifadə et.'
        },
        {
          en: 'An explicit block scope can be useful even inside of another block (whether the outer block is a scope or not).',
          az: 'Açıq blok scope-u hətta başqa blokun içində də (xarici blokun scope olub-olmamasından asılı olmayaraq) faydalı ola bilər.'
        },
        { en: 'For example:', az: 'Məsələn:' },
        {
          code: 'if (somethingHappened) {\n  // this is a block, but not a scope\n\n  {\n    // this is both a block and an\n    // explicit scope\n    let msg = somethingHappened.message();\n    notifyOthers(msg);\n  }\n\n  // ..\n\n  recoverFromSomething();\n}'
        },
        {
          en: "Here, the `{ .. }` curly-brace pair **inside** the `if` statement is an even smaller inner explicit block scope for `msg`, since that variable is not needed for the entire `if` block. Most developers would just block-scope `msg` to the `if` block and move on. And to be fair, when there's only a few lines to consider, it's a toss-up judgement call. But as code grows, these over-exposure issues become more pronounced.",
          az: 'Burada `if` ifadəsinin **içindəki** `{ .. }` cütü `msg` üçün daha da kiçik daxili açıq blok scope-dur, çünki həmin dəyişən bütün `if` bloku üçün lazım deyil. Əksər developerlər `msg`-i sadəcə `if` blokunun scope-una bağlayıb keçərdi. Düzünü desək, cəmi bir neçə sətir olanda bu, zövq məsələsidir. Lakin kod böyüdükcə bu həddindən artıq açıqlıq problemləri daha qabarıq olur.'
        },
        {
          en: 'So does it matter enough to add the extra `{ .. }` pair and indentation level? I think you should follow POLE and always (within reason!) define the smallest block for each variable. So I recommend using the extra explicit block scope as shown.',
          az: 'Bəs əlavə `{ .. }` cütü və girinti səviyyəsi əlavə etməyə dəyərmi? Məncə, POLE-a əməl edib həmişə (ağlabatan həddə!) hər dəyişən üçün ən kiçik bloku təyin etməlisən. Ona görə göstərildiyi kimi əlavə açıq blok scope-dan istifadəni tövsiyə edirəm.'
        },
        {
          en: 'Recall the discussion of TDZ errors from "Uninitialized Variables (TDZ)" (Chapter 5). My suggestion there was: to minimize the risk of TDZ errors with `let`/`const` declarations, always put those declarations at the top of their scope.',
          az: '(5-ci fəsildəki) «İlkinləşdirilməmiş dəyişənlər (TDZ)» bölməsindəki TDZ səhvləri müzakirəsini xatırla. Oradakı təklifim bu idi: `let`/`const` bəyannamələrində TDZ səhvləri riskini minimuma endirmək üçün həmin bəyannamələri həmişə scope-larının yuxarısına qoy.'
        },
        {
          en: 'If you find yourself placing a `let` declaration in the middle of a scope, first think, "Oh, no! TDZ alert!" If this `let` declaration isn\'t needed in the first half of that block, you should use an inner explicit block scope to further narrow its exposure!',
          az: '`let` bəyannaməsini scope-un ortasına qoyduğunu görsən, əvvəlcə düşün: «Yox! TDZ həyəcanı!» Bu `let` bəyannaməsi həmin blokun birinci yarısında lazım deyilsə, onun açıqlığını daha da daraltmaq üçün daxili açıq blok scope-dan istifadə etməlisən!'
        },
        { en: 'Another example with an explicit block scope:', az: 'Açıq blok scope-lu daha bir nümunə:' },
        {
          code: 'function getNextMonthStart(dateStr) {\n  var nextMonth, year;\n\n  {\n    let curMonth;\n    [ , year, curMonth ] = dateStr.match(\n      /(\\d{4})-(\\d{2})-\\d{2}/\n    ) || [];\n    nextMonth = (Number(curMonth) % 12) + 1;\n  }\n\n  if (nextMonth == 1) {\n    year++;\n  }\n\n  return `${ year }-${\n    String(nextMonth).padStart(2,"0")\n  }-01`;\n}\ngetNextMonthStart("2019-12-25");   // 2020-01-01'
        },
        {
          en: "Let's first identify the scopes and their identifiers:\n\n1. The outer/global scope has one identifier, the function `getNextMonthStart(..)`.\n2. The function scope for `getNextMonthStart(..)` has three: `dateStr` (parameter), `nextMonth`, and `year`.\n3. The `{ .. }` curly-brace pair defines an inner block scope that includes one variable: `curMonth`.",
          az: 'Əvvəlcə scope-ları və onların identifikatorlarını müəyyən edək:\n\n1. Xarici/qlobal scope-da bir identifikator var: `getNextMonthStart(..)` funksiyası.\n2. `getNextMonthStart(..)`-ın funksiya scope-unda üç identifikator var: `dateStr` (parametr), `nextMonth` və `year`.\n3. `{ .. }` cütü bir dəyişəni — `curMonth`-u — ehtiva edən daxili blok scope təyin edir.'
        },
        {
          en: "So why put `curMonth` in an explicit block scope instead of just alongside `nextMonth` and `year` in the top-level function scope? Because `curMonth` is only needed for those first two statements; at the function scope level it's over-exposed.",
          az: 'Bəs niyə `curMonth`-u sadəcə yuxarı səviyyəli funksiya scope-unda `nextMonth` və `year`-in yanına yox, açıq blok scope-a qoyduq? Çünki `curMonth` yalnız həmin ilk iki ifadə üçün lazımdır; funksiya scope-u səviyyəsində o, həddindən artıq açıqdır.'
        },
        {
          en: 'This example is small, so the hazards of over-exposing `curMonth` are pretty limited. But the benefits of the POLE principle are best achieved when you adopt the mindset of minimizing scope exposure by default, as a habit. If you follow the principle consistently even in the small cases, it will serve you more as your programs grow.',
          az: 'Bu nümunə kiçikdir, ona görə `curMonth`-un həddindən artıq açıqlığının təhlükələri olduqca məhduddur. Lakin POLE prinsipinin faydalarını ən yaxşı şəkildə scope açıqlığını standart olaraq, vərdiş kimi minimuma endirmə düşüncəsini mənimsədikdə əldə edirsən. Prinsipə hətta kiçik hallarda ardıcıl əməl etsən, proqramların böyüdükcə o, sənə daha çox xidmət edəcək.'
        },
        { en: "Let's now look at an even more substantial example:", az: 'İndi daha ciddi bir nümunəyə baxaq:' },
        {
          code: 'function sortNamesByLength(names) {\n  var buckets = [];\n\n  for (let firstName of names) {\n    if (buckets[firstName.length] == null) {\n      buckets[firstName.length] = [];\n    }\n    buckets[firstName.length].push(firstName);\n  }\n\n  // a block to narrow the scope\n  {\n    let sortedNames = [];\n\n    for (let bucket of buckets) {\n      if (bucket) {\n        // sort each bucket alphanumerically\n        bucket.sort();\n\n        // append the sorted names to our\n        // running list\n        sortedNames = [\n          ...sortedNames,\n          ...bucket\n        ];\n      }\n    }\n\n    return sortedNames;\n  }\n}\n\nsortNamesByLength([\n  "Sally",\n  "Suzy",\n  "Frank",\n  "John",\n  "Jennifer",\n  "Scott"\n]);\n// [ "John", "Suzy", "Frank", "Sally",\n//   "Scott", "Jennifer" ]'
        },
        {
          en: "There are six identifiers declared across five different scopes. Could all of these variables have existed in the single outer/global scope? Technically, yes, since they're all uniquely named and thus have no name collisions. But this would be really poor code organization, and would likely lead to both confusion and future bugs.",
          az: 'Beş fərqli scope-da altı identifikator elan olunub. Bu dəyişənlərin hamısı tək xarici/qlobal scope-da ola bilərdimi? Texniki baxımdan, bəli, çünki hamısının adı unikaldır və ad toqquşması yoxdur. Lakin bu, həqiqətən zəif kod təşkili olardı və çox güman ki, həm qarışıqlığa, həm də gələcək buglara aparardı.'
        },
        {
          en: 'We split them out into each inner nested scope as appropriate. Each variable is defined at the innermost scope possible for the program to operate as desired.',
          az: 'Onları uyğun gələn daxili iç-içə scope-lara payladıq. Hər dəyişən proqramın istənilən kimi işləməsi üçün mümkün olan ən daxili scope-da təyin olunub.'
        },
        {
          en: '`sortedNames` could have been defined in the top-level function scope, but it\'s only needed for the second half of this function. To avoid over-exposing that variable in a higher level scope, we again follow POLE and block-scope it in the inner explicit block scope.',
          az: '`sortedNames` yuxarı səviyyəli funksiya scope-unda təyin oluna bilərdi, amma o, yalnız bu funksiyanın ikinci yarısı üçün lazımdır. Həmin dəyişəni daha yüksək səviyyəli scope-da həddindən artıq açıq qoymamaq üçün yenə POLE-a əməl edib onu daxili açıq blok scope-a bağlayırıq.'
        }
      ],
      note: 'Açıq `{ }` bloku gündəlik kodda nadir görünür, amma `switch`-də çox faydalıdır:\n\n```js\nswitch (action.type) {\n  case \'add\': {\n    const item = action.payload;   // yalnız bu case-in içində\n    return [...state, item];\n  }\n  case \'remove\': {\n    const item = action.payload;   // toqquşma yoxdur\n    return state.filter((x) => x.id !== item.id);\n  }\n}\n```\n\nBloklar olmasaydı, iki `const item` `SyntaxError` verərdi — çünki `switch`-in `{ }`-u bütöv bir scope-dur. Reducer yazarkən bu nümunəni tez-tez istifadə edəcəksən.',
      terms: ['block-scope', 'tdz']
    },
    {
      id: 'var-and-let',
      heading: 'var and let',
      headingAz: 'var və let',
      blocks: [
        {
          en: "Next, let's talk about the declaration `var buckets`. That variable is used across the entire function (except the final `return` statement). Any variable that is needed across all (or even most) of a function should be declared so that such usage is obvious.",
          az: 'İndi `var buckets` bəyannaməsindən danışaq. Bu dəyişən bütün funksiya boyu (son `return` ifadəsi istisna olmaqla) istifadə olunur. Funksiyanın hamısında (və ya hətta çox hissəsində) lazım olan istənilən dəyişən bu istifadə açıq görünəcək şəkildə elan olunmalıdır.'
        },
        {
          en: "> **NOTE:** The parameter `names` isn't used across the whole function, but there's no way limit the scope of a parameter, so it behaves as a function-wide declaration regardless.",
          az: '> **QEYD:** `names` parametri bütün funksiya boyu istifadə olunmur, amma parametrin scope-unu məhdudlaşdırmağın yolu yoxdur, ona görə o, hər halda bütün funksiyaya aid bəyannamə kimi davranır.'
        },
        {
          en: "So why did we use `var` instead of `let` to declare the `buckets` variable? There's both semantic and technical reasons to choose `var` here.",
          az: 'Bəs `buckets` dəyişənini elan etmək üçün niyə `let` əvəzinə `var` istifadə etdik? Burada `var`-ı seçməyin həm semantik, həm də texniki səbəbləri var.'
        },
        {
          en: 'Stylistically, `var` has always, from the earliest days of JS, signaled "variable that belongs to a whole function." As we asserted in "Lexical Scope" (Chapter 1), `var` attaches to the nearest enclosing function scope, no matter where it appears. That\'s true even if `var` appears inside a block:',
          az: 'Üslub baxımından `var` JS-in ilk günlərindən həmişə «bütöv funksiyaya aid dəyişən» siqnalı verib. (1-ci fəsildəki) «Leksik scope» bölməsində dediyimiz kimi, `var` harada yazılmasından asılı olmayaraq ən yaxın əhatə edən funksiya scope-una bağlanır. `var` blokun içində yazılsa belə, bu, doğrudur:'
        },
        {
          code: 'function diff(x,y) {\n  if (x > y) {\n    var tmp = x;    // `tmp` is function-scoped\n    x = y;\n    y = tmp;\n  }\n\n  return y - x;\n}'
        },
        {
          en: 'Even though `var` is inside a block, its declaration is function-scoped (to `diff(..)`), not block-scoped.',
          az: '`var` blokun içində olsa da, onun bəyannaməsi blok scope-lu yox, funksiya scope-ludur (`diff(..)`-a aiddir).'
        },
        {
          en: 'While you can declare `var` inside a block (and still have it be function-scoped), I would recommend against this approach except in a few specific cases (discussed in Appendix A). Otherwise, `var` should be reserved for use in the top-level scope of a function.',
          az: '`var`-ı blokun içində elan etmək mümkün olsa da (və o, yenə funksiya scope-lu qalsa da), bir neçə xüsusi hal (Əlavə A-da müzakirə olunur) istisna olmaqla bu yanaşmanı tövsiyə etmirəm. Əks halda `var` funksiyanın yuxarı səviyyəli scope-unda istifadə üçün saxlanmalıdır.'
        },
        {
          en: 'Why not just use `let` in that same location? Because `var` is visually distinct from `let` and therefore signals clearly, "this variable is function-scoped." Using `let` in the top-level scope, especially if not in the first few lines of a function, and when all the other declarations in blocks use `let`, does not visually draw attention to the difference with the function-scoped declaration.',
          az: 'Niyə həmin yerdə sadəcə `let` istifadə etməyək? Çünki `var` vizual olaraq `let`-dən fərqlənir və buna görə aydın siqnal verir: «bu dəyişən funksiya scope-ludur». Yuxarı səviyyəli scope-da, xüsusən funksiyanın ilk bir neçə sətrində olmayanda və bloklardakı bütün digər bəyannamələr `let` istifadə edəndə `let` yazmaq funksiya scope-lu bəyannamə ilə fərqə vizual diqqət çəkmir.'
        },
        {
          en: 'In other words, I feel `var` better communicates function-scoped than `let` does, and `let` both communicates (and achieves!) block-scoping where `var` is insufficient. As long as your programs are going to need both function-scoped and block-scoped variables, the most sensible and readable approach is to use both `var` *and* `let` together, each for their own best purpose.',
          az: 'Başqa sözlə, məncə, `var` funksiya scope-unu `let`-dən daha yaxşı ifadə edir, `let` isə `var`-ın yetərsiz qaldığı yerdə blok scope-u həm ifadə edir, həm də (təmin edir!). Proqramlarına həm funksiya scope-lu, həm də blok scope-lu dəyişənlər lazım olacaqsa, ən ağıllı və oxunaqlı yanaşma `var` *və* `let`-dən birlikdə, hər birini öz ən yaxşı məqsədi üçün istifadə etməkdir.'
        },
        {
          en: "There are other semantic and operational reasons to choose `var` or `let` in different scenarios. We'll explore the case for `var` and `let` in more detail in Appendix A.",
          az: 'Müxtəlif ssenarilərdə `var` və ya `let` seçməyin başqa semantik və əməli səbəbləri də var. `var` və `let` lehinə arqumentləri Əlavə A-da daha ətraflı araşdıracağıq.'
        },
        {
          en: '> **WARNING:** My recommendation to use both `var` and `let` is clearly controversial and contradicts the majority. It\'s far more common to hear assertions like, "var is broken, let fixes it" and, "never use var, let is the replacement." Those opinions are valid, but they\'re merely opinions, just like mine. `var` is not factually broken or deprecated; it has worked since early JS and it will continue to work as long as JS is around.',
          az: '> **XƏBƏRDARLIQ:** Həm `var`, həm də `let` istifadə etmək tövsiyəm açıq-aydın mübahisəlidir və əksəriyyətin fikri ilə ziddiyyət təşkil edir. Daha çox belə iddialar eşidilir: «var xarabdır, let onu düzəldir» və «heç vaxt var istifadə etmə, let onu əvəz edir». Bu fikirlər əsaslıdır, amma sadəcə fikirdir — mənimki kimi. `var` faktiki olaraq xarab və ya köhnəlmiş deyil; o, erkən JS-dən bəri işləyir və JS mövcud olduqca işləməyə davam edəcək.'
        },
        { en: '## Where To `let`?', az: '## `let` harada?' },
        {
          en: 'My advice to reserve `var` for (mostly) only a top-level function scope means that most other declarations should use `let`. But you may still be wondering how to decide where each declaration in your program belongs?',
          az: '`var`-ı (əsasən) yalnız yuxarı səviyyəli funksiya scope-u üçün saxlamaq məsləhətim o deməkdir ki, digər bəyannamələrin əksəriyyəti `let` istifadə etməlidir. Amma yəqin hələ də düşünürsən: proqramındakı hər bəyannamənin harada olmalı olduğunu necə qərara alasan?'
        },
        {
          en: 'POLE already guides you on those decisions, but let\'s make sure we explicitly state it. The way to decide is not based on which keyword you want to use. The way to decide is to ask, "What is the most minimal scope exposure that\'s sufficient for this variable?"',
          az: 'POLE bu qərarlarda artıq sənə yol göstərir, amma gəl bunu açıq şəkildə ifadə edək. Qərar hansı açar sözü istifadə etmək istədiyinə əsaslanmır. Qərar vermək üçün soruşmalısan: «Bu dəyişən üçün kifayət edən ən minimal scope açıqlığı hansıdır?»'
        },
        {
          en: 'Once that is answered, you\'ll know if a variable belongs in a block scope or the function scope. If you decide initially that a variable should be block-scoped, and later realize it needs to be elevated to be function-scoped, then that dictates a change not only in the location of that variable\'s declaration, but also the declarator keyword used. The decision-making process really should proceed like that.',
          az: 'Buna cavab verəndən sonra dəyişənin blok scope-a, yoxsa funksiya scope-una aid olduğunu biləcəksən. Əvvəlcə dəyişənin blok scope-lu olmalı olduğuna qərar verib, sonra onu funksiya scope-una qaldırmaq lazım olduğunu anlasan, bu, həmin dəyişənin təkcə bəyannamə yerini yox, həm də istifadə olunan bəyannamə sözünü dəyişməyi tələb edir. Qərar prosesi həqiqətən belə getməlidir.'
        },
        {
          en: 'If a declaration belongs in a block scope, use `let`. If it belongs in the function scope, use `var` (again, just my opinion).',
          az: 'Bəyannamə blok scope-a aiddirsə, `let` istifadə et. Funksiya scope-una aiddirsə, `var` istifadə et (yenə deyirəm, sadəcə mənim fikrimdir).'
        },
        {
          en: "But another way to sort of visualize this decision making is to consider the pre-ES6 version of a program. For example, let's recall `diff(..)` from earlier:",
          az: 'Lakin bu qərarı vermənin başqa bir təsəvvür yolu proqramın ES6-dan əvvəlki versiyasını düşünməkdir. Məsələn, əvvəlki `diff(..)`-ı xatırlayaq:'
        },
        {
          code: 'function diff(x,y) {\n  var tmp;\n\n  if (x > y) {\n    tmp = x;\n    x = y;\n    y = tmp;\n  }\n\n  return y - x;\n}'
        },
        {
          en: "In this version of `diff(..)`, `tmp` is clearly declared in the function scope. Is that appropriate for `tmp`? I would argue, no. `tmp` is only needed for those few statements. It's not needed for the `return` statement. It should therefore be block-scoped.",
          az: '`diff(..)`-ın bu versiyasında `tmp` açıq şəkildə funksiya scope-unda elan olunub. Bu, `tmp` üçün uyğundurmu? Məncə, yox. `tmp` yalnız həmin bir neçə ifadə üçün lazımdır. `return` ifadəsi üçün lazım deyil. Deməli, o, blok scope-lu olmalıdır.'
        },
        {
          en: "Prior to ES6, we didn't have `let` so we couldn't *actually* block-scope it. But we could do the next-best thing in signaling our intent:",
          az: 'ES6-dan əvvəl `let` yox idi, ona görə onu *həqiqətən* blok scope-a bağlaya bilməzdik. Amma niyyətimizi bildirmək üçün növbəti ən yaxşı işi görə bilərdik:'
        },
        {
          code: 'function diff(x,y) {\n  if (x > y) {\n    // `tmp` is still function-scoped, but\n    // the placement here semantically\n    // signals block-scoping\n    var tmp = x;\n    x = y;\n    y = tmp;\n  }\n\n  return y - x;\n}'
        },
        {
          en: "Placing the `var` declaration for `tmp` inside the `if` statement signals to the reader of the code that `tmp` belongs to that block. Even though JS doesn't enforce that scoping, the semantic signal still has benefit for the reader of your code.",
          az: '`tmp` üçün `var` bəyannaməsini `if` ifadəsinin içinə qoymaq kodu oxuyana `tmp`-in həmin bloka aid olduğu siqnalını verir. JS bu scope-u məcbur etməsə də, semantik siqnal kodunu oxuyan üçün yenə faydalıdır.'
        },
        {
          en: "Following this perspective, you can find any `var` that's inside a block of this sort and switch it to `let` to enforce the semantic signal already being sent. That's proper usage of `let` in my opinion.",
          az: 'Bu baxışa əsasən, bu cür blokun içindəki istənilən `var`-ı tapıb onu `let`-ə dəyişə bilərsən ki, artıq verilən semantik siqnal məcburi olsun. Məncə, `let`-in düzgün istifadəsi budur.'
        },
        {
          en: 'Another example that was historically based on `var` but which should now pretty much always use `let` is the `for` loop:',
          az: 'Tarixən `var`-a əsaslanan, amma indi demək olar ki, həmişə `let` istifadə etməli olan başqa bir nümunə `for` dövrüdür:'
        },
        { code: 'for (var i = 0; i < 5; i++) {\n  // do something\n}' },
        {
          en: 'No matter where such a loop is defined, the `i` should basically always be used only inside the loop, in which case POLE dictates it should be declared with `let` instead of `var`:',
          az: 'Belə dövr harada təyin olunmasından asılı olmayaraq, `i` əsasən həmişə yalnız dövrün içində istifadə olunmalıdır; bu halda POLE onun `var` əvəzinə `let` ilə elan olunmasını tələb edir:'
        },
        { code: 'for (let i = 0; i < 5; i++) {\n  // do something\n}' },
        {
          en: 'Almost the only case where switching a `var` to a `let` in this way would "break" your code is if you were relying on accessing the loop\'s iterator (`i`) outside/after the loop, such as:',
          az: '`var`-ı bu şəkildə `let`-ə dəyişməyin kodunu «sındıracağı» demək olar ki, yeganə hal dövrün sayğacına (`i`) dövrdən kənarda/sonra müraciətə güvəndiyin haldır, məsələn:'
        },
        {
          code: 'for (var i = 0; i < 5; i++) {\n  if (checkValue(i)) {\n    break;\n  }\n}\n\nif (i < 5) {\n  console.log("The loop stopped early!");\n}'
        },
        {
          en: 'This usage pattern is not terribly uncommon, but most feel it smells like poor code structure. A preferable approach is to use another outer-scoped variable for that purpose:',
          az: 'Bu istifadə nümunəsi o qədər də nadir deyil, amma əksəriyyət onun zəif kod quruluşu «qoxusu» verdiyini düşünür. Daha üstün yanaşma bu məqsəd üçün xarici scope-da başqa dəyişəndən istifadə etməkdir:'
        },
        {
          code: 'var lastI;\n\nfor (let i = 0; i < 5; i++) {\n  lastI = i;\n  if (checkValue(i)) {\n    break;\n  }\n}\n\nif (lastI < 5) {\n  console.log("The loop stopped early!");\n}'
        },
        {
          en: '`lastI` is needed across this whole scope, so it\'s declared with `var`. `i` is only needed in (each) loop iteration, so it\'s declared with `let`.',
          az: '`lastI` bütün bu scope boyu lazımdır, ona görə `var` ilə elan olunub. `i` isə yalnız (hər) dövr iterasiyasında lazımdır, ona görə `let` ilə elan olunub.'
        }
      ],
      note: 'Burada müəllifin şəxsi mövqeyi ilə sənayedəki praktika fərqlənir — bunu bil:\n\n- **Müəllif:** funksiya səviyyəsində `var`, bloklarda `let`.\n- **Sənaye (Airbnb style guide, ESLint `no-var`, TypeScript layihələri):** `var` ümumiyyətlə yazılmır; standart `const`, dəyişməsi lazım olanda `let`.\n\nKomandada işləyəndə komandanın lint qaydalarına əməl et. Amma müəllifin əsas sualı hər iki yanaşmada qalır: **«bu dəyişən üçün ən kiçik kifayət edən scope hansıdır?»**',
      terms: ['eslint', 'lint-rule']
    },
    {
      id: 'catch',
      heading: "What's the Catch?",
      headingAz: 'Catch-in sirri nədir?',
      blocks: [
        {
          en: "So far we've asserted that `var` and parameters are function-scoped, and `let`/`const` signal block-scoped declarations. There's one little exception to call out: the `catch` clause.",
          az: 'İndiyə qədər demişik ki, `var` və parametrlər funksiya scope-ludur, `let`/`const` isə blok scope-lu bəyannamə siqnalı verir. Qeyd edilməli kiçik bir istisna var: `catch` bəndi.'
        },
        {
          en: 'Since the introduction of `try..catch` back in ES3 (in 1999), the `catch` clause has used an additional (little-known) block-scoping declaration capability:',
          az: '`try..catch` hələ ES3-də (1999-cu ildə) təqdim olunandan bəri `catch` bəndi əlavə (az tanınan) blok scope bəyannaməsi imkanından istifadə edir:'
        },
        {
          code: "try {\n  doesntExist();\n}\ncatch (err) {\n  console.log(err);\n  // ReferenceError: 'doesntExist' is not defined\n  // ^^^^ message printed from the caught exception\n\n  let onlyHere = true;\n  var outerVariable = true;\n}\n\nconsole.log(outerVariable);   // true\n\nconsole.log(err);\n// ReferenceError: 'err' is not defined\n// ^^^^ this is another thrown (uncaught) exception"
        },
        {
          en: 'The `err` variable declared by the `catch` clause is block-scoped to that block. This `catch` clause block can hold other block-scoped declarations via `let`. But a `var` declaration inside this block still attaches to the outer function/global scope.',
          az: '`catch` bəndinin elan etdiyi `err` dəyişəni həmin blokun scope-una bağlıdır. Bu `catch` bloku `let` vasitəsilə başqa blok scope-lu bəyannamələr də saxlaya bilər. Lakin bu blokun içindəki `var` bəyannaməsi yenə xarici funksiya/qlobal scope-a bağlanır.'
        },
        {
          en: 'ES2019 (recently, at the time of writing) changed `catch` clauses so their declaration is optional; if the declaration is omitted, the `catch` block is no longer (by default) a scope; it\'s still a block, though!',
          az: 'ES2019 (bu sətirlər yazılarkən yaxın vaxtlarda) `catch` bəndlərini dəyişdi və onların bəyannaməsi könüllü oldu; bəyannamə buraxılsa, `catch` bloku artıq (standart olaraq) scope deyil; amma yenə də blokdur!'
        },
        {
          en: "So if you need to react to the condition *that an exception occurred* (so you can gracefully recover), but you don't care about the error value itself, you can omit the `catch` declaration:",
          az: 'Deməli, *istisnanın baş verməsi* faktına reaksiya verməlisənsə (səliqəli bərpa üçün), amma səhv dəyərinin özü sənin üçün önəmli deyilsə, `catch` bəyannaməsini buraxa bilərsən:'
        },
        { code: 'try {\n  doOptionOne();\n}\ncatch {   // catch-declaration omitted\n  doOptionTwoInstead();\n}' },
        {
          en: 'This is a small but delightful simplification of syntax for a fairly common use case, and may also be slightly more performant in removing an unnecessary scope!',
          az: 'Bu, kifayət qədər yayılmış istifadə halı üçün sintaksisin kiçik, amma xoş sadələşdirilməsidir və lazımsız scope-u aradan qaldırdığı üçün bir az daha məhsuldar da ola bilər!'
        }
      ],
      note: 'Praktik qayda: `err` yalnız `catch` blokunun içində yaşayır. Onu çöldə istifadə etmək lazımdırsa, xaricdə `let` ilə elan et və içəridə mənimsət.\n\n`catch {}` (parametrsiz) forması `JSON.parse` kimi yerlərdə rahatdır:\n\n```js\nfunction safeParse(str) {\n  try { return JSON.parse(str); }\n  catch { return null; }\n}\n```',
      terms: ['try-catch']
    },
    {
      id: 'fib',
      heading: 'Function Declarations in Blocks (FiB)',
      headingAz: 'Bloklarda funksiya bəyannamələri (FiB)',
      blocks: [
        {
          en: 'We\'ve seen now that declarations using `let` or `const` are block-scoped, and `var` declarations are function-scoped. So what about `function` declarations that appear directly inside blocks? As a feature, this is called "FiB."',
          az: 'Artıq gördük ki, `let` və ya `const` ilə edilən bəyannamələr blok scope-lu, `var` bəyannamələri isə funksiya scope-ludur. Bəs birbaşa blokların içində olan `function` bəyannamələri? Bu imkan «FiB» adlanır.'
        },
        {
          en: 'We typically think of `function` declarations like they\'re the equivalent of a `var` declaration. So are they function-scoped like `var` is?',
          az: 'Adətən `function` bəyannamələrini `var` bəyannaməsinin ekvivalenti kimi düşünürük. Bəs onlar `var` kimi funksiya scope-ludurmu?'
        },
        { en: "No and yes. I know... that's confusing. Let's dig in:", az: 'Həm yox, həm hə. Bilirəm... bu, çaşdırıcıdır. Gəl dərindən baxaq:' },
        { code: 'if (false) {\n  function ask() {\n    console.log("Does this run?");\n  }\n}\nask();' },
        {
          en: 'What do you expect for this program to do? Three reasonable outcomes:\n\n1. The `ask()` call might fail with a `ReferenceError` exception, because the `ask` identifier is block-scoped to the `if` block scope and thus isn\'t available in the outer/global scope.\n2. The `ask()` call might fail with a `TypeError` exception, because the `ask` identifier exists, but it\'s `undefined` (since the `if` statement doesn\'t run) and thus not a callable function.\n3. The `ask()` call might run correctly, printing out the "Does it run?" message.',
          az: 'Bu proqramın nə edəcəyini gözləyirsən? Üç ağlabatan nəticə:\n\n1. `ask()` çağırışı `ReferenceError` istisnası ilə uğursuz ola bilər, çünki `ask` identifikatoru `if` blokunun scope-una bağlıdır və buna görə xarici/qlobal scope-da əlçatan deyil.\n2. `ask()` çağırışı `TypeError` istisnası ilə uğursuz ola bilər, çünki `ask` identifikatoru mövcuddur, amma `undefined`-dir (`if` ifadəsi işləmədiyi üçün) və buna görə çağırıla bilən funksiya deyil.\n3. `ask()` çağırışı düzgün işləyib «Does it run?» mesajını çap edə bilər.'
        },
        {
          en: "Here's the confusing part: depending on which JS environment you try that code snippet in, you may get different results! This is one of those few crazy areas where existing legacy behavior betrays a predictable outcome.",
          az: 'Çaşdırıcı hissə budur: bu kod parçasını hansı JS mühitində sınamağından asılı olaraq fərqli nəticələr ala bilərsən! Bu, mövcud köhnə davranışın proqnozlaşdırıla bilən nəticəni pozduğu nadir çılğın sahələrdən biridir.'
        },
        {
          en: 'The JS specification says that `function` declarations inside of blocks are block-scoped, so the answer should be (1). However, most browser-based JS engines (including v8, which comes from Chrome but is also used in Node) will behave as (2), meaning the identifier is scoped outside the `if` block but the function value is not automatically initialized, so it remains `undefined`.',
          az: 'JS spesifikasiyası deyir ki, blokların içindəki `function` bəyannamələri blok scope-ludur, deməli cavab (1) olmalıdır. Lakin brauzer əsaslı JS mühərriklərinin əksəriyyəti (Chrome-dan gələn, amma Node-da da istifadə olunan v8 daxil olmaqla) (2) kimi davranacaq: identifikator `if` blokundan kənarda scope-a bağlanır, amma funksiya dəyəri avtomatik ilkinləşdirilmir, ona görə `undefined` qalır.'
        },
        {
          en: 'Why are browser JS engines allowed to behave contrary to the specification? Because these engines already had certain behaviors around FiB before ES6 introduced block scoping, and there was concern that changing to adhere to the specification might break some existing website JS code. As such, an exception was made in Appendix B of the JS specification, which allows certain deviations for browser JS engines (only!).',
          az: 'Brauzer JS mühərriklərinin spesifikasiyaya zidd davranmasına niyə icazə verilir? Çünki bu mühərriklərin ES6 blok scope-u təqdim etməzdən əvvəl FiB ilə bağlı müəyyən davranışları artıq var idi və spesifikasiyaya uyğunlaşmaq üçün dəyişikliyin mövcud saytların JS kodunu sındıra biləcəyindən narahatlıq var idi. Buna görə JS spesifikasiyasının Əlavə B-sində (yalnız!) brauzer JS mühərrikləri üçün müəyyən kənarlaşmalara icazə verən istisna edildi.'
        },
        {
          en: "> **NOTE:** You wouldn't typically categorize Node as a browser JS environment, since it usually runs on a server. But Node's v8 engine is shared with Chrome (and Edge) browsers. Since v8 is first a browser JS engine, it adopts this Appendix B exception, which then means that the browser exceptions are extended to Node.",
          az: '> **QEYD:** Node adətən serverdə işlədiyi üçün onu brauzer JS mühiti kimi təsnif etməzsən. Lakin Node-un v8 mühərriki Chrome (və Edge) brauzerləri ilə ortaqdır. v8 ilk növbədə brauzer JS mühərriki olduğu üçün Əlavə B istisnasını qəbul edir, bu da o deməkdir ki, brauzer istisnaları Node-a da şamil olunur.'
        },
        {
          en: 'One of the most common use cases for placing a `function` declaration in a block is to conditionally define a function one way or another (like with an `if..else` statement) depending on some environment state. For example:',
          az: '`function` bəyannaməsini bloka qoymağın ən çox yayılmış istifadə hallarından biri hansısa mühit vəziyyətindən asılı olaraq funksiyanı (məsələn, `if..else` ifadəsi ilə) bu və ya digər şəkildə şərti təyin etməkdir. Məsələn:'
        },
        {
          code: 'if (typeof Array.isArray != "undefined") {\n  function isArray(a) {\n    return Array.isArray(a);\n  }\n}\nelse {\n  function isArray(a) {\n    return Object.prototype.toString.call(a)\n      == "[object Array]";\n  }\n}'
        },
        {
          en: "It's tempting to structure code this way for performance reasons, since the `typeof Array.isArray` check is only performed once, as opposed to defining just one `isArray(..)` and putting the `if` statement inside it — the check would then run unnecessarily on every call.",
          az: 'Kodu performans səbəbləri ilə bu cür qurmaq cəlbedicidir, çünki `typeof Array.isArray` yoxlaması yalnız bir dəfə aparılır — tək `isArray(..)` təyin edib `if` ifadəsini onun içinə qoymaqdan fərqli olaraq; o halda yoxlama hər çağırışda lazımsız yerə işləyərdi.'
        },
        {
          en: '> **WARNING:** In addition to the risks of FiB deviations, another problem with conditional-definition of functions is it\'s harder to debug such a program. If you end up with a bug in the `isArray(..)` function, you first have to figure out *which* `isArray(..)` implementation is actually running! Sometimes, the bug is that the wrong one was applied because the conditional check was incorrect! If you define multiple versions of a function, that program is always harder to reason about and maintain.',
          az: '> **XƏBƏRDARLIQ:** FiB kənarlaşmalarının risklərindən əlavə, funksiyaların şərti təyininin başqa bir problemi də belə proqramı debug etməyin daha çətin olmasıdır. `isArray(..)` funksiyasında bug çıxsa, əvvəlcə *hansı* `isArray(..)` reallaşdırmasının həqiqətən işlədiyini müəyyən etməlisən! Bəzən bug ondadır ki, şərti yoxlama səhv olduğu üçün yanlış variant tətbiq olunub! Funksiyanın bir neçə versiyasını təyin etsən, həmin proqram barədə düşünmək və onu saxlamaq həmişə daha çətindir.'
        },
        {
          en: 'In addition to the previous snippets, several other FiB corner cases are lurking; such behaviors in various browsers and non-browser JS environments (JS engines that aren\'t browser based) will likely vary. For example:',
          az: 'Əvvəlki nümunələrdən əlavə, daha bir neçə FiB künc halı gizlənir; müxtəlif brauzerlərdə və brauzer olmayan JS mühitlərində (brauzerə əsaslanmayan JS mühərriklərində) belə davranışlar çox güman ki, fərqlənəcək. Məsələn:'
        },
        {
          code: 'if (true) {\n  function ask() {\n    console.log("Am I called?");\n  }\n}\n\nif (true) {\n  function ask() {\n    console.log("Or what about me?");\n  }\n}\n\nfor (let i = 0; i < 5; i++) {\n  function ask() {\n    console.log("Or is it one of these?");\n  }\n}\n\nask();\n\nfunction ask() {\n  console.log("Wait, maybe, it\'s this one?");\n}'
        },
        {
          en: 'Recall that function hoisting as described in "When Can I Use a Variable?" (in Chapter 5) might suggest that the final `ask()` in this snippet, with "Wait, maybe..." as its message, would hoist above the call to `ask()`. Since it\'s the last function declaration of that name, it should "win," right? Unfortunately, no.',
          az: 'Xatırla ki, (5-ci fəsildəki) «Dəyişəni nə vaxt istifadə edə bilərəm?» bölməsində təsvir olunan function hoisting bu nümunədəki «Wait, maybe...» mesajlı son `ask()`-ın `ask()` çağırışından yuxarıya qaldırılacağını düşündürə bilər. O, bu addakı son funksiya bəyannaməsi olduğu üçün «qalib gəlməlidir», elə deyilmi? Təəssüf ki, yox.'
        },
        {
          en: "It's not my intention to document all these weird corner cases, nor to try to explain why each of them behaves a certain way. That information is, in my opinion, arcane legacy trivia.",
          az: 'Məqsədim bütün bu qəribə künc hallarını sənədləşdirmək və ya hər birinin niyə müəyyən şəkildə davrandığını izah etməyə çalışmaq deyil. Məncə, bu məlumat anlaşılmaz köhnə xırdalıqlardır.'
        },
        {
          en: 'My real concern with FiB is, what advice can I give to ensure your code behaves predictably in all circumstances?',
          az: 'FiB ilə bağlı əsl narahatlığım budur: kodunun bütün şəraitlərdə proqnozlaşdırıla bilən davranmasını təmin etmək üçün hansı məsləhəti verə bilərəm?'
        },
        {
          en: "As far as I'm concerned, the only practical answer to avoiding the vagaries of FiB is to simply avoid FiB entirely. In other words, never place a `function` declaration directly inside any block. Always place `function` declarations anywhere in the top-level scope of a function (or in the global scope).",
          az: 'Məncə, FiB-in şıltaqlıqlarından qaçmağın yeganə praktik cavabı FiB-dən tamamilə qaçmaqdır. Başqa sözlə, `function` bəyannaməsini heç vaxt birbaşa heç bir blokun içinə qoyma. `function` bəyannamələrini həmişə funksiyanın yuxarı səviyyəli scope-unun (və ya qlobal scope-un) istənilən yerinə qoy.'
        },
        {
          en: 'So for the earlier `if..else` example, my suggestion is to avoid conditionally defining functions if at all possible. Yes, it may be slightly less performant, but this is the better overall approach:',
          az: 'Deməli, əvvəlki `if..else` nümunəsi üçün təklifim mümkün olduqca funksiyaları şərti təyin etməkdən qaçmaqdır. Bəli, bu, bir az daha az məhsuldar ola bilər, amma ümumilikdə daha yaxşı yanaşma budur:'
        },
        {
          code: 'function isArray(a) {\n  if (typeof Array.isArray != "undefined") {\n    return Array.isArray(a);\n  }\n  else {\n    return Object.prototype.toString.call(a)\n      == "[object Array]";\n  }\n}'
        },
        {
          en: 'If that performance hit becomes a critical path issue for your application, I suggest you consider this approach:',
          az: 'Bu performans itkisi tətbiqin üçün kritik problemə çevrilsə, bu yanaşmanı nəzərdən keçirməyi təklif edirəm:'
        },
        {
          code: 'var isArray = function isArray(a) {\n  return Array.isArray(a);\n};\n\n// override the definition, if you must\nif (typeof Array.isArray == "undefined") {\n  isArray = function isArray(a) {\n    return Object.prototype.toString.call(a)\n      == "[object Array]";\n  };\n}'
        },
        {
          en: "It's important to notice that here I'm placing a `function` **expression**, not a declaration, inside the `if` statement. That's perfectly fine and valid, for `function` expressions to appear inside blocks. Our discussion about FiB is about avoiding `function` **declarations** in blocks.",
          az: 'Diqqət etmək vacibdir ki, burada `if` ifadəsinin içinə bəyannamə yox, `function` **ifadəsi** qoyuram. `function` ifadələrinin blokların içində olması tamamilə qaydasındadır və keçərlidir. FiB haqqında müzakirəmiz bloklarda `function` **bəyannamələrindən** qaçmaqla bağlıdır.'
        },
        {
          en: 'Even if you test your program and it works correctly, the small benefit you may derive from using FiB style in your code is far outweighed by the potential risks in the future for confusion by other developers, or variances in how your code runs in other JS environments.',
          az: 'Proqramını sınayıb onun düzgün işlədiyini görsən belə, kodunda FiB üslubundan əldə edə biləcəyin kiçik fayda gələcəkdə digər developerlərin çaşması və ya kodunun başqa JS mühitlərində fərqli işləməsi kimi potensial risklərdən xeyli azdır.'
        },
        { en: 'FiB is not worth it, and should be avoided.', az: 'FiB buna dəyməz və ondan qaçmaq lazımdır.' }
      ],
      note: 'Qısaca: **blokun içində `function ad() {}` yazma**. Şərtdən asılı funksiya lazımdırsa, ifadə istifadə et:\n\n```js\nconst format = isMobile\n  ? (d) => d.toLocaleDateString()\n  : (d) => d.toLocaleString();\n```\n\nES modullarında (sərt rejim) FiB spesifikasiyaya uyğun blok scope-lu işləyir, amma yenə də oxuyanı çaşdırır — ondan qaçmaq ən təhlükəsiz yoldur.',
      terms: ['function-hoisting', 'js-strict-mode']
    },
    {
      id: 'blocked-over',
      heading: 'Blocked Over',
      headingAz: 'Bloklarla yekun',
      blocks: [
        {
          en: "The point of lexical scoping rules in a programming language is so we can appropriately organize our program's variables, both for operational as well as semantic code communication purposes.",
          az: 'Proqramlaşdırma dilində leksik scope qaydalarının mənası proqramımızın dəyişənlərini həm əməli, həm də kodun semantik ünsiyyəti məqsədləri üçün düzgün təşkil edə bilməyimizdir.'
        },
        {
          en: 'And one of the most important organizational techniques is to ensure that no variable is over-exposed to unnecessary scopes (POLE). Hopefully you now appreciate block scoping much more deeply than before.',
          az: 'Ən vacib təşkil üsullarından biri isə heç bir dəyişənin lazımsız scope-lara həddindən artıq açıq olmamasını təmin etməkdir (POLE). Ümid edirəm, indi blok scope-u əvvəlkindən xeyli dərindən qiymətləndirirsən.'
        },
        {
          en: "Hopefully by now you feel like you're standing on much more solid ground with understanding lexical scope. From that base, the next chapter jumps into the weighty topic of closure.",
          az: 'Ümid edirəm ki, artıq leksik scope-u anlamaqda daha möhkəm zəmində dayandığını hiss edirsən. Bu təməldən növbəti fəsil closure kimi ağır mövzuya keçir.'
        }
      ],
      note: 'Fəsli bir yoxlama siyahısına çevir — hər dəyişən üçün:\n\n```text\n1. Bu dəyişən harada lazımdır? → ən kiçik scope-u seç\n2. Çağırışlar arasında yaşamalıdır? → aralıq scope (funksiya / modul)\n3. Blokun yarısında lazımdır? → daxili { } blok\n4. Şərtli funksiya? → ifadə, bəyannamə yox (FiB-dən qaç)\n```'
    }
  ],
  exam: exam6
};
