import type { BookChapter } from '../books';

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
          en: 'So far our focus has been explaining the mechanics of how scopes and variables work. With that foundation now firmly in place, our attention raises to a higher level of thinking: decisions and patterns we apply across the whole program. To begin, we\'re going to look at how and why we should be using different levels of scope (functions and blocks) to organize our program\'s variables, specifically to reduce scope over-exposure.',
          az: 'İndiyə qədər diqqətimiz scope-ların və dəyişənlərin necə işlədiyinin mexanikasını izah etməkdə idi. Bu təməl möhkəm qurulduğuna görə, diqqətimiz daha yüksək düşüncə səviyyəsinə qalxır: bütün proqram boyu tətbiq etdiyimiz qərarlar və nümunələr. Başlamaq üçün proqram dəyişənlərini təşkil etməkdə, xüsusən scope-un həddən artıq açıqlığını azaltmaq üçün müxtəlif scope səviyyələrindən (funksiyalar və bloklar) necə və niyə istifadə etməli olduğumuza baxacağıq.'
        }
      ]
    },
    {
      id: 'least-exposure',
      heading: 'Least Exposure',
      headingAz: 'Ən az açıqlıq',
      blocks: [
        {
          en: 'Software engineering articulates a fundamental discipline, typically applied to software security, called "The Principle of Least Privilege" (POLP). And a variation of this principle that applies to our current discussion is typically labeled as "Least Exposure" ([[pole]]).',
          az: 'Proqram mühəndisliyində adətən proqram təhlükəsizliyinə tətbiq olunan fundamental bir prinsip var: «Ən az imtiyaz prinsipi» (POLP). Bu prinsipin indiki müzakirəmizə aid variantı isə adətən «Ən az açıqlıq» ([[pole]]) adlanır.'
        },
        {
          en: 'In following POLE, what do we want to minimize the exposure of? Simply: the variables registered in each scope. Think of it this way: why shouldn\'t you just place all the variables of your program out in the global scope? When variables used by one part of the program are exposed to another part of the program, via scope, there are three main hazards that often arise:',
          az: 'POLE-a əməl edərkən nəyin açıqlığını minimuma endirmək istəyirik? Sadəcə: hər scope-da qeydiyyata alınmış dəyişənlərin. Belə düşün: niyə proqramının bütün dəyişənlərini sadəcə qlobal scope-a qoymamalısan? Proqramın bir hissəsinin istifadə etdiyi dəyişənlər scope vasitəsilə digər hissəyə açıq olanda, adətən üç əsas təhlükə yaranır:'
        },
        {
          en: '**Naming Collisions:** if you use a common and useful variable/function name in two different parts of the program, but the identifier comes from one shared scope (like the global scope), then name collision occurs. For example, imagine if all your loops used a single global `i` index variable.\n\n**Unexpected Behavior:** if you expose variables/functions whose usage is otherwise private to a piece of the program, it allows other developers to use them in ways you didn\'t intend, which can violate expected behavior and cause bugs.\n\n**Unintended Dependency:** if you expose variables/functions unnecessarily, it invites other developers to use and depend on those otherwise private pieces. That creates a refactoring hazard in the future, because now you cannot as easily refactor that variable or function without potentially breaking other parts of the software that you don\'t control.',
          az: '**Ad toqquşmaları:** proqramın iki fərqli hissəsində ümumi və faydalı dəyişən/funksiya adından istifadə edirsənsə, amma identifikator bir ortaq scope-dan (məsələn, qlobal scope-dan) gəlirsə, ad toqquşması baş verir. Məsələn, təsəvvür et ki, bütün dövrlərin tək qlobal `i` indeks dəyişənindən istifadə edir.\n\n**Gözlənilməz davranış:** istifadəsi əslində proqramın bir hissəsinə məxsus olan dəyişən/funksiyaları açsan, digər developerlərə onlardan sənin nəzərdə tutmadığın şəkildə istifadə etməyə imkan verirsən; bu, gözlənilən davranışı poza və bug yarada bilər.\n\n**Arzuolunmaz asılılıq:** dəyişən/funksiyaları lüzumsuz yerə açsan, digər developerləri əslində gizli olan bu hissələrdən istifadə etməyə və onlardan asılı olmağa dəvət edirsən. Bu, gələcəkdə refaktorinq təhlükəsi yaradır: artıq həmin dəyişəni və ya funksiyanı nəzarət etmədiyin digər hissələri sındırmadan asanlıqla dəyişə bilmirsən.'
        },
        {
          en: 'POLE, as applied to variable/function scoping, essentially says, default to exposing the bare minimum necessary, keeping everything else as private as possible. Declare variables in as small and deeply nested of scopes as possible, rather than placing everything in the global (or even outer function) scope.',
          az: 'Dəyişən/funksiya scope-larına tətbiq olunan POLE mahiyyətcə deyir: standart olaraq yalnız ən zəruri minimumu aç, qalan hər şeyi mümkün qədər gizli saxla. Hər şeyi qlobal (və ya hətta xarici funksiya) scope-una qoymaq əvəzinə, dəyişənləri mümkün qədər kiçik və dərin iç-içə scope-larda elan et.'
        },
        {
          caption: '`tmp` yalnız lazım olduğu `if` blokunda yaşayır',
          code: 'function diff(x,y) {\n  if (x > y) {\n    let tmp = x;\n    x = y;\n    y = tmp;\n  }\n  return y - x;\n}\n\ndiff(3,7);   // 4\ndiff(7,5);   // 2'
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
          en: 'It should now be clear why it\'s important to hide our variable and function declarations in the lowest (most deeply nested) scopes possible. But what about hiding `var` or `function` declarations in scopes? That can easily be done by wrapping a function scope around a declaration.',
          az: 'Artıq aydın olmalıdır ki, dəyişən və funksiya bəyannamələrimizi mümkün qədər aşağı (ən dərin iç-içə) scope-larda gizlətmək niyə vacibdir. Bəs `var` və ya `function` bəyannamələrini scope-larda necə gizlətmək olar? Bunu bəyannamənin ətrafına funksiya scope-u bükməklə asanlıqla etmək olar.'
        },
        {
          en: 'If you calculate factorial for `6`, then later want to calculate factorial for `7`, you might unnecessarily re-calculate the factorials of all the integers from 2 up to 6. If you\'re willing to trade memory for speed, you can solve that wasted computation by caching each integer\'s factorial as it\'s calculated:',
          az: '`6` üçün faktorialı hesablayıb, sonra `7` üçün hesablamaq istəsən, 2-dən 6-ya qədər bütün tam ədədlərin faktoriallarını lüzumsuz yerə yenidən hesablaya bilərsən. Yaddaşı sürətə dəyişməyə hazırsansa, hər ədədin faktorialını hesablandıqca keşləyərək bu boşa gedən hesablamanın qarşısını ala bilərsən:'
        },
        {
          code: 'var cache = {};\n\nfunction factorial(x) {\n  if (x < 2) return 1;\n  if (!(x in cache)) {\n    cache[x] = x * factorial(x - 1);\n  }\n  return cache[x];\n}\n\nfactorial(6);   // 720\nfactorial(7);   // 5040'
        },
        {
          en: 'The `cache` variable is pretty obviously a private detail of how `factorial(..)` works, not something that should be exposed in an outer scope — especially not the global scope. But since we need `cache` to survive multiple calls, it must be located in a scope outside that function. So what can we do? Define another middle scope for `cache` to be located:',
          az: '`cache` dəyişəni açıq-aydın `factorial(..)`-in necə işlədiyinin gizli detalıdır, xarici scope-da — xüsusən qlobal scope-da — açılmalı olan bir şey deyil. Lakin `cache`-in bir neçə çağırışdan sağ çıxması lazım olduğu üçün o, həmin funksiyadan kənardakı scope-da olmalıdır. Bəs nə edək? `cache` üçün başqa, aralıq scope təyin edək:'
        },
        {
          caption: '`cache` artıq çöldən görünmür, amma `factorial(..)` ona çıxışı saxlayır',
          code: 'var factorial = (function hideTheCache() {\n  var cache = {};\n\n  function factorial(x) {\n    if (x < 2) return 1;\n    if (!(x in cache)) {\n      cache[x] = x * factorial(x - 1);\n    }\n    return cache[x];\n  }\n\n  return factorial;\n})();\n\nfactorial(6);   // 720\nfactorial(7);   // 5040'
        },
        {
          en: 'Since `hideTheCache(..)` is defined as a function expression instead of a function declaration, its name is in its own scope — essentially the same scope as `cache` — rather than in the outer/global scope. That means we can name every single occurrence of such a function expression the exact same name, and never have any collision.',
          az: '`hideTheCache(..)` funksiya bəyannaməsi yox, funksiya ifadəsi kimi təyin olunduğu üçün onun adı xarici/qlobal scope-da deyil, öz scope-undadır — mahiyyətcə `cache` ilə eyni scope-da. Bu o deməkdir ki, belə funksiya ifadələrinin hər birinə eyni adı verə bilərik və heç vaxt toqquşma olmayacaq.'
        },
        {
          en: '> **NOTE:** The illustrated technique — caching a function\'s computed output to optimize performance when repeated calls of the same inputs are expected — is quite common in the Functional Programming (FP) world, canonically referred to as [[memoization]]; this caching relies on closure (see Chapter 7).',
          az: '> **QEYD:** Göstərilən texnika — eyni girişlərlə təkrar çağırışlar gözlənildikdə performansı optimallaşdırmaq üçün funksiyanın hesabladığı nəticəni keşləmək — funksional proqramlaşdırma (FP) dünyasında çox yayılıb və kanonik olaraq [[memoization]] adlanır; bu keşləmə closure-a əsaslanır (bax: 7-ci fəsil).'
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
          en: 'Notice that we surrounded the entire function expression in a set of `( .. )`, and then on the end, we added that second `()` parentheses set; that\'s actually calling the function expression we just defined. So, in other words, we\'re defining a function expression that\'s then immediately invoked. This common pattern has a (very creative!) name: Immediately Invoked Function Expression ([[iife]]).',
          az: 'Diqqət et: bütün funksiya ifadəsini `( .. )` mötərizələrinə aldıq, sonunda isə ikinci `()` mötərizə cütünü əlavə etdik; bu, indicə təyin etdiyimiz funksiya ifadəsini çağırır. Başqa sözlə, funksiya ifadəsi təyin edirik və o, dərhal çağırılır. Bu geniş yayılmış nümunənin (çox yaradıcı!) adı var: Dərhal çağırılan funksiya ifadəsi ([[iife]]).'
        },
        {
          caption: 'Müstəqil IIFE',
          code: '// outer scope\n\n(function(){\n  // inner hidden scope\n})();\n\n// more outer scope'
        },
        {
          en: 'For a standalone IIFE, the surrounding `( .. )` are required; they distinguish the function as an expression, not a statement. For consistency, however, always surround an IIFE function with `( .. )`.',
          az: 'Müstəqil IIFE üçün ətrafdakı `( .. )` məcburidir; onlar funksiyanı ifadə (expression) kimi ayırır, bəyannamə (statement) kimi yox. Ardıcıllıq üçün isə IIFE funksiyasını həmişə `( .. )` ilə əhatə et.'
        },
        {
          en: '## Function Boundaries',
          az: '## Funksiya sərhədləri'
        },
        {
          en: 'Because an IIFE is a full function, the function boundary alters the behavior of certain statements/constructs. A `return` statement would change its meaning if an IIFE is wrapped around it. Non-arrow function IIFEs also change the binding of a `this` keyword. And statements like `break` and `continue` won\'t operate across an IIFE function boundary to control an outer loop or block. So, if the code you need to wrap a scope around has `return`, `this`, `break`, or `continue` in it, an IIFE is probably not the best approach. In that case, you might look to create the scope with a block instead of a function.',
          az: 'IIFE tam funksiya olduğu üçün funksiya sərhədi bəzi ifadə/konstruksiyaların davranışını dəyişir. `return` ifadəsinin ətrafına IIFE bükülsə, onun mənası dəyişər. Arrow olmayan IIFE-lər həm də `this` açar sözünün bağlamasını dəyişir. `break` və `continue` kimi ifadələr isə IIFE funksiya sərhədindən keçib xarici dövrü və ya bloku idarə edə bilmir. Deməli, scope ilə əhatə etmək istədiyin kodda `return`, `this`, `break` və ya `continue` varsa, IIFE yəqin ki, ən yaxşı yanaşma deyil. Belə halda scope-u funksiya ilə yox, blokla yaratmağı düşün.'
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
          en: 'In general, any `{ .. }` curly-brace pair which is a statement will act as a block, but not necessarily as a scope. A block only becomes a scope if necessary, to contain its block-scoped declarations (i.e., `let` or `const`).',
          az: 'Ümumən, ifadə (statement) olan hər `{ .. }` fiqurlu mötərizə cütü blok kimi çıxış edir, lakin mütləq scope kimi yox. Blok yalnız zərurət olduqda — blok-scope-lu bəyannamələrini (yəni `let` və ya `const`) saxlamaq üçün — scope-a çevrilir.'
        },
        {
          code: '{\n  // not necessarily a scope (yet)\n\n  // now we know the block needs to be a scope\n  let thisIsNowAScope = true;\n\n  for (let i = 0; i < 5; i++) {\n    // this is also a scope, activated each iteration\n    if (i % 2 == 0) {\n      // this is just a block, not a scope\n      console.log(i);\n    }\n  }\n}\n// 0 2 4'
        },
        {
          en: 'Not all `{ .. }` curly-brace pairs create blocks: object literals use `{ .. }` to delimit their key-value lists, but such object values are not scopes; `class` uses `{ .. }` around its body definition, but this is not a block or scope; a function uses `{ .. }` around its body, but this is not technically a block — it is, however, a (function) scope; the `{ .. }` on a `switch` statement (around the set of `case` clauses) does not define a block/scope.',
          az: 'Bütün `{ .. }` cütləri blok yaratmır: obyekt literalları açar-dəyər siyahılarını `{ .. }` ilə ayırır, lakin belə obyekt dəyərləri scope deyil; `class` gövdəsinin ətrafında `{ .. }` istifadə edir, lakin bu, nə blok, nə scope-dur; funksiya gövdəsinin ətrafında `{ .. }` istifadə edir, lakin bu, texniki olaraq blok deyil — amma (funksiya) scope-udur; `switch` ifadəsindəki `{ .. }` (`case` bəndlərinin ətrafında) blok/scope təyin etmir.'
        },
        {
          en: 'In most languages that support block scoping, an explicit block scope is an extremely common pattern for creating a narrow slice of scope for one or a few variables. So following the POLE principle, we should embrace this pattern more widespread in JS as well; use (explicit) block scoping to narrow the exposure of identifiers to the minimum practical.',
          az: 'Blok scope-u dəstəkləyən əksər dillərdə açıq blok scope bir və ya bir neçə dəyişən üçün dar scope dilimi yaratmağın son dərəcə geniş yayılmış nümunəsidir. POLE prinsipinə əməl edərək bu nümunəni JS-də də daha geniş tətbiq etməliyik: identifikatorların açıqlığını praktik minimuma endirmək üçün (açıq) blok scope-dan istifadə et.'
        },
        {
          caption: '`curMonth` yalnız ilk iki ifadə üçün lazımdır — ona görə açıq blokdadır',
          code: 'function getNextMonthStart(dateStr) {\n  var nextMonth, year;\n  {\n    let curMonth;\n    [ , year, curMonth ] = dateStr.match(\n      /(\\d{4})-(\\d{2})-\\d{2}/\n    ) || [];\n    nextMonth = (Number(curMonth) % 12) + 1;\n  }\n  if (nextMonth == 1) {\n    year++;\n  }\n  return `${ year }-${ String(nextMonth).padStart(2,\'0\') }-01`;\n}\ngetNextMonthStart(\'2019-12-25\');   // 2020-01-01'
        },
        {
          en: 'If you find yourself placing a `let` declaration in the middle of a scope, first think, "Oh, no! TDZ alert!" If this `let` declaration isn\'t needed in the first half of that block, you should use an inner explicit block scope to further narrow its exposure!',
          az: '`let` bəyannaməsini scope-un ortasına qoyduğunu görsən, əvvəlcə düşün: «Oy! TDZ həyəcanı!» Bu `let` bəyannaməsi həmin blokun birinci yarısında lazım deyilsə, onun açıqlığını daha da daraltmaq üçün daxili açıq blok scope-dan istifadə etməlisən!'
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
          en: 'Stylistically, `var` has always, from the earliest days of JS, signaled "variable that belongs to a whole function." `var` attaches to the nearest enclosing function scope, no matter where it appears. That\'s true even if `var` appears inside a block:',
          az: 'Üslub baxımından `var` JS-in ilk günlərindən bəri həmişə «bütöv funksiyaya aid dəyişən» siqnalı verib. `var` harada görünməsindən asılı olmayaraq ən yaxın əhatə edən funksiya scope-una bağlanır. `var` blokun içində olsa belə, bu doğrudur:'
        },
        {
          code: 'function diff(x,y) {\n  if (x > y) {\n    var tmp = x;   // `tmp` is function-scoped\n    x = y;\n    y = tmp;\n  }\n  return y - x;\n}'
        },
        {
          en: 'The way to decide is not based on which keyword you want to use. The way to decide is to ask, **"What is the most minimal scope exposure that\'s sufficient for this variable?"** Once that is answered, you\'ll know if a variable belongs in a block scope or the function scope. If a declaration belongs in a block scope, use `let`. If it belongs in the function scope, use `var` (again, just my opinion).',
          az: 'Qərar hansı açar sözü istifadə etmək istədiyinə əsasən verilmir. Qərar vermək üçün soruşmaq lazımdır: **«Bu dəyişən üçün kifayət edən ən minimal scope açıqlığı hansıdır?»** Buna cavab verəndən sonra dəyişənin blok scope-a, yoxsa funksiya scope-una aid olduğunu biləcəksən. Bəyannamə blok scope-a aiddirsə, `let` istifadə et. Funksiya scope-una aiddirsə, `var` istifadə et (yenə də, bu, sadəcə mənim fikrimdir).'
        },
        {
          en: 'Another example that was historically based on `var` but which should now pretty much always use `let` is the `for` loop. No matter where such a loop is defined, the `i` should basically always be used only inside the loop, in which case POLE dictates it should be declared with `let` instead of `var`.',
          az: 'Tarixən `var`-a əsaslanan, lakin indi demək olar ki, həmişə `let` istifadə etməli olan başqa bir nümunə `for` dövrüdür. Belə dövr harada təyin olunmasından asılı olmayaraq, `i` əsasən həmişə yalnız dövrün içində istifadə olunmalıdır; bu halda POLE onun `var` yox, `let` ilə elan olunmasını tələb edir.'
        },
        {
          en: '> **WARNING:** My recommendation to use both `var` and `let` is clearly controversial and contradicts the majority. It\'s far more common to hear assertions like, "var is broken, let fixes it" and, "never use var, let is the replacement." Those opinions are valid, but they\'re merely opinions, just like mine. `var` is not factually broken or deprecated; it has worked since early JS and it will continue to work as long as JS is around.',
          az: '> **XƏBƏRDARLIQ:** Həm `var`, həm də `let` istifadə etmək tövsiyəm açıq-aydın mübahisəlidir və əksəriyyətin fikrinə ziddir. «var xarabdır, let onu düzəldir» və «heç vaxt var istifadə etmə, let onu əvəz edir» kimi iddiaları daha tez-tez eşidəcəksən. Bu fikirlər əsaslıdır, lakin mənimki kimi sadəcə fikirdir. `var` faktiki olaraq xarab və ya köhnəlmiş deyil; o, JS-in ilk dövrlərindən işləyir və JS mövcud olduqca işləməyə davam edəcək.'
        }
      ],
      note: 'Burada müəllifin şəxsi mövqeyi ilə sənayedəki praktika fərqlənir — bunu bil:\n\n- **Müəllif:** funksiya səviyyəsində `var`, bloklarda `let`.\n- **Sənaye (Airbnb style guide, ESLint `no-var`, TypeScript layihələri):** `var` ümumiyyətlə yazılmır; standart `const`, dəyişməsi lazım olanda `let`.\n\nKomandada işləyəndə komandanın lint qaydalarına əməl et. Amma müəllifin əsas sualı hər iki yanaşmada qalır: **«bu dəyişən üçün ən kiçik kifayət edən scope hansıdır?»**',
      terms: ['eslint', 'lint-rule']
    },
    {
      id: 'catch',
      heading: 'What\'s the Catch?',
      headingAz: 'Catch-in sirri nədir?',
      blocks: [
        {
          en: 'So far we\'ve asserted that `var` and parameters are function-scoped, and `let` / `const` signal block-scoped declarations. There\'s one little exception to call out: the `catch` clause. The `err` variable declared by the `catch` clause is block-scoped to that block. But a `var` declaration inside this block still attaches to the outer function/global scope.',
          az: 'İndiyə qədər dedik ki, `var` və parametrlər funksiya scope-una, `let` / `const` isə blok scope-a aiddir. Qeyd edilməli kiçik bir istisna var: `catch` bəndi. `catch` bəndinin elan etdiyi `err` dəyişəni həmin bloka məxsus blok scope-dadır. Lakin bu blokun içindəki `var` bəyannaməsi yenə də xarici funksiya/qlobal scope-a bağlanır.'
        },
        {
          code: 'try {\n  doesntExist();\n}\ncatch (err) {\n  console.log(err);\n  // ReferenceError: \'doesntExist\' is not defined\n  let onlyHere = true;\n  var outerVariable = true;\n}\n\nconsole.log(outerVariable);   // true\n\nconsole.log(err);\n// ReferenceError: \'err\' is not defined'
        },
        {
          en: 'ES2019 changed `catch` clauses so their declaration is optional; if the declaration is omitted, the `catch` block is no longer (by default) a scope; it\'s still a block, though! So if you need to react to the condition that an exception occurred, but you don\'t care about the error value itself, you can omit the `catch` declaration:',
          az: 'ES2019 `catch` bəndlərini dəyişdi və onların bəyannaməsi məcburi olmadı; bəyannamə buraxılanda `catch` bloku artıq (standart olaraq) scope deyil; amma yenə də blokdur! Deməli, istisnanın baş verməsinə reaksiya vermək lazımdırsa, amma səhv dəyərinin özü maraqlı deyilsə, `catch` bəyannaməsini buraxa bilərsən:'
        },
        {
          code: 'try {\n  doOptionOne();\n}\ncatch {   // catch-declaration omitted\n  doOptionTwoInstead();\n}'
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
          en: 'We\'ve seen now that declarations using `let` or `const` are block-scoped, and `var` declarations are function-scoped. So what about `function` declarations that appear directly inside blocks? As a feature, this is called [[fib]].',
          az: 'Artıq gördük ki, `let` və ya `const` bəyannamələri blok scope-a, `var` bəyannamələri isə funksiya scope-una aiddir. Bəs birbaşa blokların içində yerləşən `function` bəyannamələri? Bu xüsusiyyət [[fib]] adlanır.'
        },
        {
          code: 'if (false) {\n  function ask() {\n    console.log(\'Does this run?\');\n  }\n}\nask();'
        },
        {
          en: 'What do you expect for this program to do? Three reasonable outcomes: (1) the `ask()` call might fail with a `ReferenceError`, because the `ask` identifier is block-scoped to the `if` block; (2) it might fail with a `TypeError`, because the `ask` identifier exists, but it\'s `undefined`; (3) it might run correctly. Here\'s the confusing part: depending on which JS environment you try that code snippet in, you may get different results!',
          az: 'Bu proqramın nə edəcəyini gözləyirsən? Üç ağlabatan nəticə var: (1) `ask()` çağırışı `ReferenceError` ilə uğursuz ola bilər, çünki `ask` identifikatoru `if` blokunun scope-una aiddir; (2) `TypeError` ilə uğursuz ola bilər, çünki `ask` identifikatoru mövcuddur, lakin `undefined`-dır; (3) düzgün işləyə bilər. Çaşdırıcı hissə budur: kodu hansı JS mühitində sınamağından asılı olaraq fərqli nəticələr ala bilərsən!'
        },
        {
          en: 'The JS specification says that function declarations inside of blocks are block-scoped, so the answer should be (1). However, most browser-based JS engines (including v8, which comes from Chrome but is also used in Node) will behave as (2), meaning the identifier is scoped outside the `if` block but the function value is not automatically initialized, so it remains `undefined`.',
          az: 'JS spesifikasiyası deyir ki, bloklardakı funksiya bəyannamələri blok scope-a aiddir, deməli, cavab (1) olmalıdır. Lakin brauzer əsaslı JS mühərriklərinin əksəriyyəti (Chrome-dan gələn, həm də Node-da istifadə olunan v8 daxil olmaqla) (2) kimi davranır: identifikator `if` blokundan kənarda scope-a alınır, lakin funksiya dəyəri avtomatik ilkinləşdirilmir, ona görə `undefined` qalır.'
        },
        {
          en: 'The only practical answer to avoiding the vagaries of FiB is to simply avoid FiB entirely. In other words, never place a `function` declaration directly inside any block. Always place `function` declarations anywhere in the top-level scope of a function (or in the global scope). It\'s perfectly fine and valid for function **expressions** to appear inside blocks:',
          az: 'FiB-in qəribəliklərindən qaçmağın yeganə praktik yolu FiB-dən tamamilə qaçmaqdır. Başqa sözlə, heç vaxt `function` bəyannaməsini birbaşa hər hansı blokun içinə qoyma. `function` bəyannamələrini həmişə funksiyanın yuxarı səviyyəli scope-unda (və ya qlobal scope-da) yerləşdir. Funksiya **ifadələrinin** bloklarda olması isə tamamilə normal və düzgündür:'
        },
        {
          code: 'var isArray = function isArray(a) {\n  return Array.isArray(a);\n};\n\n// override the definition, if you must\nif (typeof Array.isArray == \'undefined\') {\n  isArray = function isArray(a) {\n    return Object.prototype.toString.call(a) == \'[object Array]\';\n  };\n}'
        }
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
          en: 'The point of lexical scoping rules in a programming language is so we can appropriately organize our program\'s variables, both for operational as well as semantic code communication purposes. And one of the most important organizational techniques is to ensure that no variable is over-exposed to unnecessary scopes (POLE).',
          az: 'Proqramlaşdırma dilində leksik scope qaydalarının məqsədi proqram dəyişənlərini həm əməliyyat, həm də kodun semantik ünsiyyəti baxımından düzgün təşkil edə bilməyimizdir. Ən vacib təşkilati üsullardan biri isə heç bir dəyişənin lüzumsuz scope-lara həddən artıq açılmamasını təmin etməkdir (POLE).'
        }
      ],
      note: 'Fəsli bir yoxlama siyahısına çevir — hər dəyişən üçün:\n\n```text\n1. Bu dəyişən harada lazımdır? → ən kiçik scope-u seç\n2. Çağırışlar arasında yaşamalıdır? → aralıq scope (funksiya / modul)\n3. Blokun yarısında lazımdır? → daxili { } blok\n4. Şərtli funksiya? → ifadə, bəyannamə yox (FiB-dən qaç)\n```'
    }
  ]
};
