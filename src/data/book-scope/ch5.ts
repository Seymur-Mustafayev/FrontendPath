import type { BookChapter } from '../books';
import { exam5 } from './exam-ch5';

export const ch5: BookChapter = {
  id: 'ch5',
  no: 5,
  title: 'The (Not So) Secret Lifecycle of Variables',
  titleAz: 'Dəyişənlərin (o qədər də gizli olmayan) həyat dövrü',
  sum: 'Dəyişən nə vaxt istifadəyə hazır olur: function və var hoisting-i, hoisting-in metafora olması, təkrar bəyannamə, const, dövrlər və TDZ.',
  sections: [
    {
      id: 'intro',
      heading: 'Chapter 5: The (Not So) Secret Lifecycle of Variables',
      headingAz: 'Fəsil 5: Dəyişənlərin həyat dövrü',
      blocks: [
        {
          en: "By now you should have a decent grasp of the nesting of scopes, from the global scope downward — called a program's scope chain.",
          az: 'Artıq qlobal scope-dan aşağıya doğru scope-ların iç-içə yerləşməsini — proqramın scope zəncirini — yaxşı başa düşməlisən.'
        },
        {
          en: 'But just knowing which scope a variable comes from is only part of the story. If a variable declaration appears past the first statement of a scope, how will any references to that identifier *before* the declaration behave? What happens if you try to declare the same variable twice in a scope?',
          az: 'Lakin dəyişənin hansı scope-dan gəldiyini bilmək hekayənin yalnız bir hissəsidir. Dəyişən bəyannaməsi scope-un ilk ifadəsindən sonra gəlirsə, həmin identifikatora bəyannamədən *əvvəl* edilən istinadlar necə davranacaq? Eyni dəyişəni bir scope-da iki dəfə elan etməyə çalışsan, nə baş verər?'
        },
        {
          en: "JS's particular flavor of lexical scope is rich with nuance in how and when variables come into existence and become available to the program.",
          az: 'JS-in özünəməxsus leksik scope-u dəyişənlərin necə və nə vaxt yarandığı və proqram üçün əlçatan olduğu məsələsində incəliklərlə zəngindir.'
        }
      ]
    },
    {
      id: 'when-can-i-use',
      heading: 'When Can I Use a Variable?',
      headingAz: 'Dəyişəni nə vaxt istifadə edə bilərəm?',
      blocks: [
        {
          en: 'At what point does a variable become available to use within its scope? There may seem to be an obvious answer: *after* the variable has been declared/created. Right? Not quite.',
          az: 'Dəyişən öz scope-unda hansı andan istifadəyə hazır olur? Cavab açıq görünə bilər: dəyişən elan olunduqdan/yaradıldıqdan *sonra*. Elə deyilmi? Tam yox.'
        },
        { en: 'Consider:', az: 'Buna bax:' },
        { code: "greeting();\n// Hello!\n\nfunction greeting() {\n  console.log('Hello!');\n}" },
        {
          en: 'This code works fine. You may have seen or even written code like it before. But did you ever wonder how or why it works? Specifically, why can you access the identifier `greeting` from line 1 (to retrieve and execute a function reference), even though the `greeting()` function declaration doesn\'t occur until line 4?',
          az: 'Bu kod qaydasında işləyir. Bəlkə də belə kodu görmüsən, hətta yazmısan. Bəs heç düşünmüsənmi ki, o, necə və niyə işləyir? Xüsusən, `greeting()` funksiya bəyannaməsi yalnız 4-cü sətirdə olduğu halda, `greeting` identifikatoruna 1-ci sətirdən (funksiya istinadını götürüb icra etmək üçün) necə müraciət edə bilirsən?'
        },
        {
          en: 'Recall Chapter 1 points out that all identifiers are registered to their respective scopes during compile time. Moreover, every identifier is *created* at the beginning of the scope it belongs to, **every time that scope is entered**.',
          az: 'Xatırla ki, 1-ci fəsildə bütün identifikatorların kompilyasiya zamanı öz scope-larında qeydiyyata alındığı göstərilmişdi. Üstəlik, hər identifikator aid olduğu scope-un əvvəlində, **həmin scope-a hər dəfə daxil olanda** *yaradılır*.'
        },
        {
          en: 'The term most commonly used for a variable being visible from the beginning of its enclosing scope, even though its declaration may appear further down in the scope, is called [[hoisting]].',
          az: 'Bəyannaməsi scope-un daha aşağısında olsa belə, dəyişənin əhatə edən scope-un əvvəlindən görünməsi üçün ən çox işlədilən termin [[hoisting]]-dir.'
        },
        {
          en: "But hoisting alone doesn't fully answer the question. We can see an identifier called `greeting` from the beginning of the scope, but why can we *call* the `greeting()` function before it's been declared?",
          az: 'Lakin hoisting təkbaşına suala tam cavab vermir. `greeting` adlı identifikatoru scope-un əvvəlindən görə bilirik, bəs `greeting()` funksiyasını elan olunmazdan əvvəl niyə *çağıra* bilirik?'
        },
        {
          en: "In other words, how does the variable `greeting` have any value (the function reference) assigned to it, from the moment the scope starts running? The answer is a special characteristic of formal `function` declarations, called *function hoisting* ([[function-hoisting]]). When a `function` declaration's name identifier is registered at the top of its scope, it's additionally auto-initialized to that function's reference. That's why the function can be called throughout the entire scope!",
          az: 'Başqa sözlə, scope işləməyə başladığı andan `greeting` dəyişəninə necə dəyər (funksiya istinadı) mənimsədilmiş olur? Cavab rəsmi `function` bəyannamələrinin xüsusi xassəsidir: *function hoisting* ([[function-hoisting]]). `function` bəyannaməsinin ad identifikatoru scope-un yuxarısında qeydiyyata alınanda o, əlavə olaraq avtomatik həmin funksiyanın istinadı ilə ilkinləşdirilir. Buna görə funksiya bütün scope boyu çağırıla bilir!'
        },
        {
          en: 'One key detail is that both *function hoisting* and `var`-flavored *variable hoisting* attach their name identifiers to the nearest enclosing **function scope** (or, if none, the global scope), not a block scope.',
          az: 'Əsas detallardan biri budur: həm *function hoisting*, həm də `var` tipli *variable hoisting* öz ad identifikatorlarını blok scope-a yox, ən yaxın əhatə edən **funksiya scope-una** (o yoxdursa, qlobal scope-a) bağlayır.'
        },
        {
          en: '> **NOTE:** Declarations with `let` and `const` still hoist (see the TDZ discussion later in this chapter). But these two declaration forms attach to their enclosing block rather than just an enclosing function as with `var` and `function` declarations. See "Scoping with Blocks" in Chapter 6 for more information.',
          az: '> **QEYD:** `let` və `const` bəyannamələri də hoist olunur (bax: bu fəsildə aşağıda TDZ müzakirəsi). Lakin bu iki bəyannamə forması `var` və `function` bəyannamələrində olduğu kimi sadəcə əhatə edən funksiyaya yox, əhatə edən bloka bağlanır. Ətraflı məlumat üçün 6-cı fəsildəki «Bloklarla scope yaratmaq» bölməsinə bax.'
        }
      ],
      terms: ['block-scope', 'function-scope']
    },
    {
      id: 'declaration-vs-expression',
      heading: 'Hoisting: Declaration vs. Expression',
      headingAz: 'Hoisting: bəyannamə və ifadə',
      blocks: [
        {
          en: '*Function hoisting* only applies to formal `function` declarations (specifically those which appear outside of blocks — see "FiB" in Chapter 6), not to `function` expression assignments. Consider:',
          az: '*Function hoisting* yalnız rəsmi `function` bəyannamələrinə (xüsusən blokların xaricində olanlara — bax: 6-cı fəsildə «FiB») aiddir, `function` ifadəsi mənimsətmələrinə yox. Buna bax:'
        },
        { code: "greeting();\n// TypeError\n\nvar greeting = function greeting() {\n  console.log('Hello!');\n};" },
        {
          en: 'Line 1 (`greeting();`) throws an error. But the *kind* of error thrown is very important to notice. A `TypeError` means we\'re trying to do something with a value that is not allowed. Depending on your JS environment, the error message would say something like, "\'undefined\' is not a function," or more helpfully, "\'greeting\' is not a function."',
          az: '1-ci sətir (`greeting();`) səhv atır. Lakin atılan səhvin *növünə* diqqət etmək çox vacibdir. `TypeError` o deməkdir ki, dəyərlə icazə verilməyən bir iş görməyə çalışırıq. JS mühitindən asılı olaraq səhv mesajı təxminən belə olacaq: «\'undefined\' is not a function» və ya daha faydalı şəkildə «\'greeting\' is not a function».'
        },
        {
          en: "Notice that the error is **not** a `ReferenceError`. JS isn't telling us that it couldn't find `greeting` as an identifier in the scope. It's telling us that `greeting` was found but doesn't hold a function reference at that moment. Only functions can be invoked, so attempting to invoke some non-function value results in an error.",
          az: 'Diqqət et ki, səhv `ReferenceError` **deyil**. JS bizə scope-da `greeting` identifikatorunu tapa bilmədiyini demir. O deyir ki, `greeting` tapıldı, amma həmin an funksiya istinadı saxlamır. Yalnız funksiyalar çağırıla bilər, ona görə funksiya olmayan dəyəri çağırmağa cəhd səhvlə nəticələnir.'
        },
        {
          en: 'But what does `greeting` hold, if not the function reference?',
          az: 'Bəs `greeting` funksiya istinadı deyilsə, nə saxlayır?'
        },
        {
          en: 'In addition to being hoisted, variables declared with `var` are also automatically initialized to `undefined` at the beginning of their scope — again, the nearest enclosing function, or the global. Once initialized, they\'re available to be used (assigned to, retrieved from, etc.) throughout the whole scope.',
          az: '`var` ilə elan olunan dəyişənlər hoist olunmaqla yanaşı, öz scope-larının əvvəlində — yenə deyirəm, ən yaxın əhatə edən funksiyanın və ya qlobal scope-un — avtomatik `undefined` ilə ilkinləşdirilir. İlkinləşdirildikdən sonra bütün scope boyu istifadəyə (dəyər yazmaq, oxumaq və s.) hazırdırlar.'
        },
        {
          en: "So on that first line, `greeting` exists, but it holds only the default `undefined` value. It's not until line 4 that `greeting` gets assigned the function reference.",
          az: 'Deməli, həmin birinci sətirdə `greeting` mövcuddur, amma yalnız standart `undefined` dəyərini saxlayır. `greeting`-ə funksiya istinadı yalnız 4-cü sətirdə mənimsədilir.'
        },
        {
          en: 'Pay close attention to the distinction here. A `function` declaration is hoisted **and initialized to its function value** (again, called *function hoisting*). A `var` variable is also hoisted, and then auto-initialized to `undefined`. Any subsequent `function` expression assignments to that variable don\'t happen until that assignment is processed during runtime execution.',
          az: 'Buradakı fərqə diqqətlə bax. `function` bəyannaməsi hoist olunur **və funksiya dəyəri ilə ilkinləşdirilir** (bunu yenə *function hoisting* adlandırırıq). `var` dəyişəni də hoist olunur, sonra isə avtomatik `undefined` ilə ilkinləşdirilir. Həmin dəyişənə sonrakı `function` ifadəsi mənimsətmələri isə yalnız icra zamanı həmin mənimsətmə emal olunanda baş verir.'
        },
        {
          en: "In both cases, the name of the identifier is hoisted. But the function reference association isn't handled at initialization time (beginning of the scope) unless the identifier was created in a formal `function` declaration.",
          az: 'Hər iki halda identifikatorun adı hoist olunur. Lakin identifikator rəsmi `function` bəyannaməsində yaradılmayıbsa, funksiya istinadı ilə əlaqə ilkinləşdirmə zamanı (scope-un əvvəlində) qurulmur.'
        }
      ],
      note: 'Səhv növü diaqnoz alətidir:\n\n```text\nReferenceError: x is not defined        → dəyişən heç yoxdur (undeclared)\nReferenceError: Cannot access x before… → var, amma TDZ-dədir (let/const)\nTypeError: x is not a function          → var, amma dəyəri funksiya deyil (çox vaxt undefined)\n```\n\nReact-də `const handleClick = () => {}` ilə yazılan funksiyanı yuxarıda istifadə etsən, TDZ səhvi alarsan. `function handleClick() {}` isə hoist olunur.',
      terms: ['tdz']
    },
    {
      id: 'variable-hoisting',
      heading: 'Variable Hoisting',
      headingAz: 'Dəyişən hoisting-i',
      blocks: [
        { en: "Let's look at another example of *variable hoisting*:", az: 'Gəl *variable hoisting*-in başqa bir nümunəsinə baxaq:' },
        { code: "greeting = 'Hello!';\nconsole.log(greeting);\n// Hello!\n\nvar greeting = 'Howdy!';" },
        {
          en: "Though `greeting` isn't declared until line 5, it's available to be assigned to as early as line 1. Why?",
          az: '`greeting` yalnız 5-ci sətirdə elan olunsa da, ona hələ 1-ci sətirdən dəyər yazmaq olur. Niyə?'
        },
        {
          en: "There's two necessary parts to the explanation:\n\n- the identifier is hoisted,\n- **and** it's automatically initialized to the value `undefined` from the top of the scope.",
          az: 'İzahın iki zəruri hissəsi var:\n\n- identifikator hoist olunur,\n- **və** scope-un yuxarısından avtomatik `undefined` dəyəri ilə ilkinləşdirilir.'
        },
        {
          en: '> **NOTE:** Using *variable hoisting* of this sort probably feels unnatural, and many readers might rightly want to avoid relying on it in their programs. But should all hoisting (including *function hoisting*) be avoided? We\'ll explore these different perspectives on hoisting in more detail in Appendix A.',
          az: '> **QEYD:** Bu cür *variable hoisting*-dən istifadə yəqin qeyri-təbii görünür və bir çox oxucu haqlı olaraq proqramlarında ona güvənməkdən qaçmaq istəyə bilər. Bəs bütün hoisting-dən (o cümlədən *function hoisting*-dən) qaçmaq lazımdırmı? Hoisting-ə dair bu fərqli baxışları Əlavə A-da daha ətraflı araşdıracağıq.'
        },
        { en: '## Hoisting: Yet Another Metaphor', az: '## Hoisting: daha bir metafora' },
        {
          en: 'Chapter 2 was full of metaphors (to illustrate scope), but here we are faced with yet another: hoisting itself. Rather than hoisting being a concrete execution step the JS engine performs, it\'s more useful to think of hoisting as a visualization of various actions JS takes in setting up the program **before execution**.',
          az: '2-ci fəsil (scope-u təsvir etmək üçün) metaforlarla dolu idi, burada isə daha biri ilə qarşılaşırıq: hoisting-in özü. Hoisting-i JS mühərrikinin yerinə yetirdiyi konkret icra addımı kimi yox, JS-in proqramı **icradan əvvəl** hazırlayarkən gördüyü müxtəlif işlərin vizuallaşdırılması kimi düşünmək daha faydalıdır.'
        },
        {
          en: 'The typical assertion of what hoisting means: *lifting* — like lifting a heavy weight upward — any identifiers all the way to the top of a scope. The explanation often asserted is that the JS engine will actually *rewrite* that program before execution, so that it looks more like this:',
          az: 'Hoisting-in mənası haqqında tipik iddia budur: identifikatorları — ağır yükü yuxarı qaldırmaq kimi — scope-un ən yuxarısına *qaldırmaq*. Çox vaxt deyilən izah budur ki, JS mühərriki icradan əvvəl proqramı həqiqətən *yenidən yazır* və o, təxminən belə görünür:'
        },
        {
          code: "var greeting;           // hoisted declaration\ngreeting = 'Hello!';    // the original line 1\nconsole.log(greeting);  // Hello!\ngreeting = 'Howdy!';    // `var` is gone!"
        },
        {
          en: 'The hoisting (metaphor) proposes that JS pre-processes the original program and re-arranges it a bit, so that all the declarations have been moved to the top of their respective scopes, before execution. Moreover, the hoisting metaphor asserts that `function` declarations are, in their entirety, hoisted to the top of each scope. Consider:',
          az: 'Hoisting (metaforu) iddia edir ki, JS icradan əvvəl orijinal proqramı ilkin emal edib bir az yenidən düzür və bütün bəyannamələr öz scope-larının yuxarısına köçürülür. Üstəlik, hoisting metaforu iddia edir ki, `function` bəyannamələri bütövlükdə hər scope-un yuxarısına qaldırılır. Buna bax:'
        },
        {
          code: "studentName = 'Suzy';\ngreeting();\n// Hello Suzy!\n\nfunction greeting() {\n  console.log(`Hello ${ studentName }!`);\n}\nvar studentName;"
        },
        {
          en: 'The "rule" of the hoisting metaphor is that function declarations are hoisted first, then variables are hoisted immediately after all the functions. Thus, the hoisting story suggests that program is *re-arranged* by the JS engine to look like this:',
          az: 'Hoisting metaforunun «qaydası» budur ki, əvvəl funksiya bəyannamələri, bütün funksiyalardan dərhal sonra isə dəyişənlər qaldırılır. Beləliklə, hoisting hekayəsinə görə JS mühərriki proqramı belə görünəcək şəkildə *yenidən düzür*:'
        },
        {
          code: "function greeting() {\n  console.log(`Hello ${ studentName }!`);\n}\nvar studentName;\n\nstudentName = 'Suzy';\ngreeting();\n// Hello Suzy!"
        },
        {
          en: "This hoisting metaphor is convenient. Its benefit is allowing us to hand wave over the magical look-ahead pre-processing necessary to find all these declarations buried deep in scopes and somehow move (hoist) them to the top; we can just think about the program as if it's executed by the JS engine in a **single pass**, top-down.",
          az: 'Bu hoisting metaforu rahatdır. Onun faydası budur ki, scope-ların dərinliyində gizlənmiş bütün bəyannamələri tapıb birtəhər yuxarıya köçürmək (qaldırmaq) üçün lazım olan sehrli «irəlini görən» ilkin emalı nəzərə almaya bilirik; proqramı sanki JS mühərriki onu **tək gedişlə**, yuxarıdan aşağı icra edirmiş kimi düşünə bilirik.'
        },
        {
          en: "Single-pass definitely seems more straightforward than Chapter 1's assertion of a two-phase processing.",
          az: 'Tək gediş 1-ci fəsildəki iki mərhələli emal iddiasından, şübhəsiz, daha sadə görünür.'
        },
        {
          en: "Hoisting as a mechanism for re-ordering code may be an attractive simplification, but it's not accurate. The JS engine doesn't actually re-arrange the code. It can't magically look ahead and find declarations; the only way to accurately find them, as well as all the scope boundaries in the program, would be to fully parse the code.",
          az: 'Kodu yenidən düzən mexanizm kimi hoisting cəlbedici sadələşdirmə ola bilər, lakin dəqiq deyil. JS mühərriki kodu əslində yenidən düzmür. O, sehrli şəkildə irəlini görüb bəyannamələri tapa bilməz; onları, eləcə də proqramdakı bütün scope sərhədlərini dəqiq tapmağın yeganə yolu kodu tam parse etmək olardı.'
        },
        {
          en: "Guess what parsing is? The first phase of the two-phase processing! There's no magical mental gymnastics that gets around that fact.",
          az: 'Təxmin et, parse nədir? İki mərhələli emalın birinci mərhələsi! Bu faktdan yan keçən heç bir sehrli zehni gimnastika yoxdur.'
        },
        {
          en: "So if the hoisting metaphor is (at best) inaccurate, what should we do with the term? I think it's still useful — indeed, even members of TC39 regularly use it! — but I don't think we should claim it's an actual re-arrangement of source code.",
          az: 'Hoisting metaforu (ən yaxşı halda) qeyri-dəqiqdirsə, bu terminlə nə edək? Məncə, o, hələ də faydalıdır — hətta TC39 üzvləri də onu mütəmadi işlədir! — amma onun mənbə kodunun həqiqi yenidən düzülməsi olduğunu iddia etməməliyik.'
        },
        {
          en: "> **WARNING:** Incorrect or incomplete mental models often still seem sufficient because they can occasionally lead to accidental right answers. But in the long run it's harder to accurately analyze and predict outcomes if your thinking isn't particularly aligned with how the JS engine works.",
          az: '> **XƏBƏRDARLIQ:** Yanlış və ya natamam zehni modellər çox vaxt kifayət edirmiş kimi görünür, çünki bəzən təsadüfən düzgün cavaba apara bilir. Lakin uzun müddətdə düşüncən JS mühərrikinin iş prinsipi ilə uzlaşmırsa, nəticələri dəqiq təhlil və proqnoz etmək daha çətin olur.'
        },
        {
          en: 'I assert that hoisting *should* be used to refer to the **compile-time operation** of generating runtime instructions for the automatic registration of a variable at the beginning of its scope, each time that scope is entered.',
          az: 'İddia edirəm ki, hoisting termini dəyişənin hər dəfə scope-a daxil olanda həmin scope-un əvvəlində avtomatik qeydiyyatı üçün icra təlimatlarının yaradılması — yəni **kompilyasiya zamanı əməliyyat** — mənasında işlədilməli*dir*.'
        },
        {
          en: "That's a subtle but important shift, from hoisting as a runtime behavior to its proper place among compile-time tasks.",
          az: 'Bu, incə, amma vacib keçiddir: hoisting-i icra zamanı davranışı kimi görməkdən onu kompilyasiya tapşırıqları arasındakı layiqli yerinə qoymağa.'
        }
      ],
      note: 'Müsahibədə «hoisting nədir?» sualına iki səviyyəli cavab ver:\n\n1. **Sadə:** bəyannamələr scope-un əvvəlinə «qaldırılmış» kimi davranır.\n2. **Dəqiq:** kod yerindən oynamır — kompilyasiya zamanı bütün bəyannamələr tapılır və scope-a hər girişdə onların qeydiyyatı üçün təlimat yaradılır.\n\nİkinci cavab middle səviyyəsini göstərir, çünki [[two-phases]] modelini bildiyini sübut edir.'
    },
    {
      id: 'redeclaration',
      heading: 'Re-declaration?',
      headingAz: 'Təkrar bəyannamə?',
      blocks: [
        {
          en: 'What do you think happens when a variable is declared more than once in the same scope? Consider:',
          az: 'Sənə görə, dəyişən eyni scope-da bir dəfədən çox elan olunanda nə baş verir? Buna bax:'
        },
        {
          code: "var studentName = 'Frank';\nconsole.log(studentName);\n// Frank\n\nvar studentName;\nconsole.log(studentName);   // ???"
        },
        {
          en: 'What do you expect to be printed for that second message? Many believe the second `var studentName` has re-declared the variable (and thus "reset" it), so they expect `undefined` to be printed.',
          az: 'İkinci mesajda nəyin çap olunmasını gözləyirsən? Çoxları elə bilir ki, ikinci `var studentName` dəyişəni yenidən elan edib (və beləliklə onu «sıfırlayıb»), ona görə `undefined` çap olunacağını gözləyirlər.'
        },
        {
          en: 'But is there such a thing as a variable being "re-declared" in the same scope? No.',
          az: 'Bəs eyni scope-da dəyişənin «yenidən elan olunması» deyilən bir şey varmı? Xeyr.'
        },
        {
          en: 'If you consider this program from the perspective of the hoisting metaphor, the code would be re-arranged like this for execution purposes:',
          az: 'Bu proqrama hoisting metaforu baxımından baxsan, kod icra üçün belə yenidən düzülərdi:'
        },
        {
          code: "var studentName;\nvar studentName;    // clearly a pointless no-op!\n\nstudentName = 'Frank';\nconsole.log(studentName);\n// Frank\n\nconsole.log(studentName);\n// Frank"
        },
        {
          en: "Since hoisting is actually about registering a variable at the beginning of a scope, there's nothing to be done in the middle of the scope where the original program actually had the second `var studentName` statement. It's just a no-op(eration), a pointless statement.",
          az: 'Hoisting əslində dəyişənin scope-un əvvəlində qeydiyyatı ilə bağlı olduğu üçün orijinal proqramda ikinci `var studentName` ifadəsinin olduğu scope-un ortasında görüləsi iş yoxdur. Bu, sadəcə heç nə etməyən əməliyyat (no-op), mənasız ifadədir.'
        },
        {
          en: '> **TIP:** In the style of the conversation narrative from Chapter 2, *Compiler* would find the second `var` declaration statement and ask the *Scope Manager* if it had already seen a `studentName` identifier; since it had, there wouldn\'t be anything else to do.',
          az: '> **MƏSLƏHƏT:** 2-ci fəsildəki söhbət üslubunda desək, *Kompilyator* ikinci `var` bəyannaməsini tapıb *Scope Manager*-dən `studentName` identifikatorunu artıq görüb-görmədiyini soruşardı; gördüyü üçün başqa görüləsi iş olmazdı.'
        },
        {
          en: "It's also important to point out that `var studentName;` doesn't mean `var studentName = undefined;`, as most assume. Let's prove they're different by considering this variation of the program:",
          az: 'Onu da qeyd etmək vacibdir ki, `var studentName;` çoxlarının güman etdiyi kimi `var studentName = undefined;` demək deyil. Proqramın bu variantına baxaraq onların fərqli olduğunu sübut edək:'
        },
        {
          code: "var studentName = 'Frank';\nconsole.log(studentName);   // Frank\n\nvar studentName;\nconsole.log(studentName);   // Frank <--- still!\n\n// let's add the initialization explicitly\nvar studentName = undefined;\nconsole.log(studentName);   // undefined <--- see!?"
        },
        {
          en: "See how the explicit `= undefined` initialization produces a different outcome than assuming it happens implicitly when omitted? In the next section, we'll revisit this topic of initialization of variables from their declarations.",
          az: 'Görürsənmi, açıq `= undefined` ilkinləşdirməsi yazılmayanda bunun gizli baş verdiyini fərz etməkdən fərqli nəticə verir? Növbəti bölmədə dəyişənlərin bəyannamələrdən ilkinləşdirilməsi mövzusuna yenidən qayıdacağıq.'
        },
        {
          en: "A repeated `var` declaration of the same identifier name in a scope is effectively a do-nothing operation. Here's another illustration, this time across a function of the same name:",
          az: 'Scope-da eyni identifikator adının təkrar `var` bəyannaməsi faktiki olaraq heç nə etməyən əməliyyatdır. Budur başqa bir nümunə, bu dəfə eyni adlı funksiya ilə:'
        },
        {
          code: "var greeting;\n\nfunction greeting() {\n  console.log('Hello!');\n}\n\n// basically, a no-op\nvar greeting;\n\ntypeof greeting;        // \"function\"\n\nvar greeting = 'Hello!';\n\ntypeof greeting;        // \"string\""
        },
        {
          en: "The first `greeting` declaration registers the identifier to the scope, and because it's a `var` the auto-initialization will be `undefined`. The `function` declaration doesn't need to re-register the identifier, but because of *function hoisting* it overrides the auto-initialization to use the function reference. The second `var greeting` by itself doesn't do anything since `greeting` is already an identifier and *function hoisting* already took precedence for the auto-initialization.",
          az: 'Birinci `greeting` bəyannaməsi identifikatoru scope-da qeydiyyata alır və `var` olduğu üçün avtomatik ilkinləşdirmə `undefined` olacaq. `function` bəyannaməsinin identifikatoru yenidən qeydiyyata almasına ehtiyac yoxdur, lakin *function hoisting* səbəbindən o, avtomatik ilkinləşdirməni funksiya istinadı ilə əvəz edir. İkinci `var greeting` isə özlüyündə heç nə etmir, çünki `greeting` artıq identifikatordur və avtomatik ilkinləşdirmədə *function hoisting* artıq üstünlük qazanıb.'
        },
        {
          en: 'Actually assigning `"Hello!"` to `greeting` changes its value from the initial `function greeting()` to the string; `var` itself doesn\'t have any effect.',
          az: '`greeting`-ə həqiqətən `"Hello!"` mənimsətmək onun dəyərini ilkin `function greeting()`-dən sətrə dəyişir; `var`-ın özünün heç bir təsiri yoxdur.'
        },
        {
          en: 'What about repeating a declaration within a scope using `let` or `const`?',
          az: 'Bəs scope daxilində bəyannaməni `let` və ya `const` ilə təkrarlasaq?'
        },
        { code: "let studentName = 'Frank';\n\nconsole.log(studentName);\n\nlet studentName = 'Suzy';" },
        {
          en: 'This program will not execute, but instead immediately throw a `SyntaxError`. Depending on your JS environment, the error message will indicate something like: "studentName has already been declared." In other words, this is a case where attempted "re-declaration" is explicitly not allowed!',
          az: 'Bu proqram icra olunmayacaq, əvəzində dərhal `SyntaxError` atacaq. JS mühitindən asılı olaraq səhv mesajı təxminən belə olacaq: «studentName has already been declared». Başqa sözlə, bu, «yenidən elan etmə» cəhdinə açıq şəkildə icazə verilməyən haldır!'
        },
        {
          en: "It's not just that two declarations involving `let` will throw this error. If either declaration uses `let`, the other can be either `let` or `var`, and the error will still occur, as illustrated with these two variations:",
          az: 'Söhbət yalnız iki `let` bəyannaməsinin bu səhvi atmasından getmir. Bəyannamələrdən biri `let` istifadə edirsə, digəri `let` də ola bilər, `var` da — səhv yenə baş verəcək; bu iki variantda göstərildiyi kimi:'
        },
        { code: "var studentName = 'Frank';\n\nlet studentName = 'Suzy';" },
        { en: 'and:', az: 'və:' },
        { code: "let studentName = 'Frank';\n\nvar studentName = 'Suzy';" },
        {
          en: 'In both cases, a `SyntaxError` is thrown on the *second* declaration. In other words, the only way to "re-declare" a variable is to use `var` for all (two or more) of its declarations.',
          az: 'Hər iki halda *ikinci* bəyannamədə `SyntaxError` atılır. Başqa sözlə, dəyişəni «yenidən elan etməyin» yeganə yolu onun bütün (iki və ya daha çox) bəyannaməsində `var` istifadə etməkdir.'
        },
        {
          en: 'But why disallow it? The reason for the error is not technical per se, as `var` "re-declaration" has always been allowed; clearly, the same allowance could have been made for `let`.',
          az: 'Bəs niyə qadağan edilib? Səhvin səbəbi özlüyündə texniki deyil, çünki `var`-ın «yenidən elan olunmasına» həmişə icazə verilib; açıq-aydın, eyni icazə `let` üçün də verilə bilərdi.'
        },
        {
          en: 'It\'s really more of a "social engineering" issue. "Re-declaration" of variables is seen by some, including many on the TC39 body, as a bad habit that can lead to program bugs. So when ES6 introduced `let`, they decided to prevent "re-declaration" with an error.',
          az: 'Bu, daha çox «sosial mühəndislik» məsələsidir. Dəyişənlərin «yenidən elan olunması» bəziləri, o cümlədən TC39-un bir çox üzvü tərəfindən proqram buglarına apara bilən pis vərdiş sayılır. Ona görə ES6 `let`-i təqdim edəndə «yenidən elan etmənin» qarşısını səhvlə almağa qərar verdilər.'
        },
        {
          en: "> **NOTE:** This is of course a stylistic opinion, not really a technical argument. Many developers agree with the position, and that's probably in part why TC39 included the error (as well as `let` conforming to `const`). But a reasonable case could have been made that staying consistent with `var`'s precedent was more prudent, and that such opinion-enforcement was best left to opt-in tooling like linters. In Appendix A, we'll explore whether `var` (and its associated behavior, like \"re-declaration\") can still be useful in modern JS.",
          az: '> **QEYD:** Bu, əlbəttə, üslub fikridir, əslində texniki arqument deyil. Bir çox developer bu mövqe ilə razıdır və TC39-un bu səhvi daxil etməsinin (həmçinin `let`-in `const`-a uyğunlaşmasının) səbəblərindən biri yəqin budur. Lakin `var`-ın presedentinə sadiq qalmağın daha ağıllı olduğunu və bu cür fikir tətbiqinin linter kimi könüllü alətlərə buraxılmasının daha yaxşı olduğunu əsaslandırmaq da mümkün idi. Əlavə A-da `var`-ın (və «yenidən elan etmə» kimi ona aid davranışın) müasir JS-də hələ də faydalı ola bilib-bilmədiyini araşdıracağıq.'
        },
        {
          en: 'When *Compiler* asks *Scope Manager* about a declaration, if that identifier has already been declared, and if either/both declarations were made with `let`, an error is thrown. The intended signal to the developer is "Stop relying on sloppy re-declaration!"',
          az: '*Kompilyator* *Scope Manager*-dən bəyannamə barədə soruşanda həmin identifikator artıq elan olunubsa və bəyannamələrdən biri/hər ikisi `let` ilə edilibsə, səhv atılır. Developerə nəzərdə tutulan siqnal budur: «Səliqəsiz yenidən elan etməyə güvənməyi dayandır!»'
        }
      ],
      note: 'Bu qadağa real layihədə səni qoruyur: böyük komponentdə eyni adla iki `const` yazsan, build dərhal düşəcək — bug istehsala çatmayacaq.\n\nYadda saxla: `var x;` dəyəri **sıfırlamır**. `let x;` isə `let x = undefined;` ilə eynidir, çünki `let` scope-un əvvəlində ilkinləşmir.',
      terms: ['syntax-error']
    },
    {
      id: 'constants',
      heading: 'Constants?',
      headingAz: 'Sabitlər?',
      blocks: [
        {
          en: 'The `const` keyword is more constrained than `let`. Like `let`, `const` cannot be repeated with the same identifier in the same scope. But there\'s actually an overriding technical reason why that sort of "re-declaration" is disallowed, unlike `let` which disallows "re-declaration" mostly for stylistic reasons.',
          az: '`const` açar sözü `let`-dən daha məhduddur. `let` kimi, `const` da eyni scope-da eyni identifikatorla təkrarlana bilməz. Lakin bu cür «yenidən elan etmənin» qadağan olunmasının əslində həlledici texniki səbəbi var — «yenidən elan etməni» əsasən üslub səbəbləri ilə qadağan edən `let`-dən fərqli olaraq.'
        },
        {
          en: 'The `const` keyword requires a variable to be initialized, so omitting an assignment from the declaration results in a `SyntaxError`:',
          az: '`const` açar sözü dəyişənin ilkinləşdirilməsini tələb edir, ona görə bəyannamədə mənimsətməni buraxmaq `SyntaxError` ilə nəticələnir:'
        },
        { code: 'const empty;   // SyntaxError' },
        { en: '`const` declarations create variables that cannot be re-assigned:', az: '`const` bəyannamələri yenidən mənimsədilə bilməyən dəyişənlər yaradır:' },
        { code: "const studentName = 'Frank';\nconsole.log(studentName);\n// Frank\n\nstudentName = 'Suzy';   // TypeError" },
        {
          en: "The `studentName` variable cannot be re-assigned because it's declared with a `const`.",
          az: '`studentName` dəyişəninə yenidən dəyər mənimsədilə bilməz, çünki o, `const` ilə elan olunub.'
        },
        {
          en: '> **WARNING:** The error thrown when re-assigning `studentName` is a `TypeError`, not a `SyntaxError`. The subtle distinction here is actually pretty important, but unfortunately far too easy to miss. Syntax errors represent faults in the program that stop it from even starting execution. Type errors represent faults that arise during program execution. In the preceding snippet, `"Frank"` is printed out before we process the re-assignment of `studentName`, which then throws the error.',
          az: '> **XƏBƏRDARLIQ:** `studentName`-ə yenidən dəyər yazanda atılan səhv `SyntaxError` yox, `TypeError`-dur. Buradakı incə fərq əslində olduqca vacibdir, amma təəssüf ki, gözdən qaçırmaq çox asandır. Sintaksis səhvləri proqramın hətta icraya başlamasına mane olan qüsurlardır. Tip səhvləri isə proqramın icrası zamanı yaranan qüsurlardır. Əvvəlki nümunədə `studentName`-ə yenidən mənimsətmə emal olunmazdan əvvəl `"Frank"` çap olunur, səhv isə sonra atılır.'
        },
        {
          en: 'So if `const` declarations cannot be re-assigned, and `const` declarations always require assignments, then we have a clear technical reason why `const` must disallow any "re-declarations": any `const` "re-declaration" would also necessarily be a `const` re-assignment, which can\'t be allowed!',
          az: 'Deməli, `const` bəyannamələrinə yenidən dəyər yazmaq olmursa və `const` bəyannamələri həmişə mənimsətmə tələb edirsə, `const`-un hər hansı «yenidən elan etməni» niyə qadağan etməli olduğuna dair aydın texniki səbəbimiz var: istənilən `const` «yenidən elan etməsi» həm də mütləq `const`-a yenidən mənimsətmə olardı, buna isə icazə verilə bilməz!'
        },
        { code: "const studentName = 'Frank';\n\n// obviously this must be an error\nconst studentName = 'Suzy';" },
        {
          en: 'Since `const` "re-declaration" must be disallowed (on those technical grounds), TC39 essentially felt that `let` "re-declaration" should be disallowed as well, for consistency. It\'s debatable if this was the best choice, but at least we have the reasoning behind the decision.',
          az: '`const`-un «yenidən elan olunması» (həmin texniki səbəblərə görə) qadağan olunmalı olduğu üçün TC39 mahiyyətcə ardıcıllıq naminə `let`-in «yenidən elan olunmasının» da qadağan edilməli olduğunu düşündü. Bunun ən yaxşı seçim olub-olmadığı mübahisəlidir, amma heç olmasa qərarın arxasındakı məntiqi bilirik.'
        }
      ],
      note: 'Ən çox qarışdırılan məqam: `const` **dəyəri** yox, **bağlamanı** dondurur.\n\n```js\nconst user = { name: \'Aysel\' };\nuser.name = \'Leyla\';   // olar — obyektin içi dəyişir\nuser = {};             // TypeError — dəyişənə yeni dəyər yazmaq olmaz\n```\n\nReact state-i ilə işləyəndə bu fərq kritikdir: obyekti yerində dəyişmək re-render yaratmır — yeni obyekt lazımdır ([[immutability]]).'
    },
    {
      id: 'loops',
      heading: 'Loops',
      headingAz: 'Dövrlər',
      blocks: [
        {
          en: 'So it\'s clear from our previous discussion that JS doesn\'t really want us to "re-declare" our variables within the same scope. That probably seems like a straightforward admonition, until you consider what it means for repeated execution of declaration statements in loops. Consider:',
          az: 'Əvvəlki müzakirədən aydındır ki, JS dəyişənlərimizi eyni scope daxilində «yenidən elan etməyimizi» əslində istəmir. Bu, sadə xəbərdarlıq kimi görünə bilər — ta ki bunun dövrlərdə bəyannamə ifadələrinin təkrar icrası üçün nə demək olduğunu düşünənə qədər. Buna bax:'
        },
        {
          code: 'var keepGoing = true;\nwhile (keepGoing) {\n  let value = Math.random();\n  if (value > 0.5) {\n    keepGoing = false;\n  }\n}'
        },
        {
          en: 'Is `value` being "re-declared" repeatedly in this program? Will we get errors thrown? No.',
          az: 'Bu proqramda `value` təkrar-təkrar «yenidən elan olunur»mu? Səhv atılacaqmı? Xeyr.'
        },
        {
          en: 'All the rules of scope (including "re-declaration" of `let`-created variables) are applied *per scope instance*. In other words, each time a scope is entered during execution, everything resets.',
          az: 'Scope-un bütün qaydaları (`let` ilə yaradılmış dəyişənlərin «yenidən elan olunması» da daxil olmaqla) *hər scope nüsxəsinə ayrıca* tətbiq olunur. Başqa sözlə, icra zamanı scope-a hər dəfə daxil olanda hər şey sıfırlanır.'
        },
        {
          en: 'Each loop iteration is its own new scope instance, and within each scope instance, `value` is only being declared once. So there\'s no attempted "re-declaration," and thus no error. Before we consider other loop forms, what if the `value` declaration in the previous snippet were changed to a `var`?',
          az: 'Dövrün hər iterasiyası öz yeni scope nüsxəsidir və hər scope nüsxəsində `value` yalnız bir dəfə elan olunur. Deməli, «yenidən elan etmə» cəhdi yoxdur və buna görə səhv də yoxdur. Digər dövr formalarına baxmazdan əvvəl: əvvəlki nümunədə `value` bəyannaməsi `var`-a dəyişdirilsəydi nə olardı?'
        },
        {
          code: 'var keepGoing = true;\nwhile (keepGoing) {\n  var value = Math.random();\n  if (value > 0.5) {\n    keepGoing = false;\n  }\n}'
        },
        {
          en: 'Is `value` being "re-declared" here, especially since we know `var` allows it? No. Because `var` is not treated as a block-scoping declaration (see Chapter 6), it attaches itself to the global scope. So there\'s just one `value` variable, in the same scope as `keepGoing` (global scope, in this case). No "re-declaration" here, either!',
          az: 'Burada `value` «yenidən elan olunur»mu, xüsusən `var`-ın buna icazə verdiyini bildiyimiz halda? Xeyr. `var` blok scope bəyannaməsi sayılmadığı üçün (bax: 6-cı fəsil) özünü qlobal scope-a bağlayır. Deməli, `keepGoing` ilə eyni scope-da (bu halda qlobal scope-da) yalnız bir `value` dəyişəni var. Burada da «yenidən elan etmə» yoxdur!'
        },
        {
          en: "One way to keep this all straight is to remember that `var`, `let`, and `const` keywords are effectively *removed* from the code by the time it starts to execute. They're handled entirely by the compiler.",
          az: 'Bütün bunları qarışdırmamağın bir yolu yadda saxlamaqdır ki, kod icra olunmağa başlayanda `var`, `let` və `const` açar sözləri faktiki olaraq koddan *silinmiş* olur. Onları tamamilə kompilyator emal edir.'
        },
        {
          en: 'If you mentally erase the declarator keywords and then try to process the code, it should help you decide if and when (re-)declarations might occur.',
          az: 'Bəyannamə açar sözlərini zehnində silib, sonra kodu emal etməyə çalışsan, bu, (təkrar) bəyannamələrin baş verib-vermədiyini və nə vaxt baş verdiyini müəyyən etməyə kömək edəcək.'
        },
        {
          en: 'What about "re-declaration" with other loop forms, like `for`-loops?',
          az: 'Bəs `for` dövrü kimi digər dövr formalarında «yenidən elan etmə»?'
        },
        {
          code: 'for (let i = 0; i < 3; i++) {\n  let value = i * 10;\n  console.log(`${ i }: ${ value }`);\n}\n// 0: 0\n// 1: 10\n// 2: 20'
        },
        {
          en: 'It should be clear that there\'s only one `value` declared per scope instance. But what about `i`? Is it being "re-declared"?',
          az: 'Aydın olmalıdır ki, hər scope nüsxəsində yalnız bir `value` elan olunur. Bəs `i`? O, «yenidən elan olunur»mu?'
        },
        {
          en: "To answer that, consider what scope `i` is in. It might seem like it would be in the outer (in this case, global) scope, but it's not. It's in the scope of `for`-loop body, just like `value` is. In fact, you could sorta think about that loop in this more verbose equivalent form:",
          az: 'Buna cavab vermək üçün `i`-nin hansı scope-da olduğunu düşün. Xarici (bu halda qlobal) scope-da olduğu görünə bilər, amma elə deyil. O, eynilə `value` kimi, `for` dövrünün gövdəsinin scope-undadır. Əslində həmin dövrü bu daha uzun ekvivalent formada təsəvvür edə bilərsən:'
        },
        {
          code: "{\n  // a fictional variable for illustration\n  let $$i = 0;\n\n  for ( /* nothing */; $$i < 3; $$i++) {\n    // here's our actual loop `i`!\n    let i = $$i;\n\n    let value = i * 10;\n    console.log(`${ i }: ${ value }`);\n  }\n  // 0: 0\n  // 1: 10\n  // 2: 20\n}"
        },
        {
          en: 'Now it should be clear: the `i` and `value` variables are both declared exactly once **per scope instance**. No "re-declaration" here.',
          az: 'İndi aydın olmalıdır: həm `i`, həm də `value` dəyişənləri **hər scope nüsxəsində** düz bir dəfə elan olunur. Burada «yenidən elan etmə» yoxdur.'
        },
        { en: 'What about other `for`-loop forms?', az: 'Bəs `for` dövrünün digər formaları?' },
        {
          code: 'for (let index in students) {\n  // this is fine\n}\n\nfor (let student of students) {\n  // so is this\n}'
        },
        {
          en: 'Same thing with `for..in` and `for..of` loops: the declared variable is treated as *inside* the loop body, and thus is handled per iteration (aka, per scope instance). No "re-declaration."',
          az: '`for..in` və `for..of` dövrlərində də eyni şeydir: elan olunan dəyişən dövr gövdəsinin *içində* sayılır və buna görə hər iterasiyada (yəni hər scope nüsxəsində) ayrıca emal olunur. «Yenidən elan etmə» yoxdur.'
        },
        {
          en: "OK, I know you're thinking that I sound like a broken record at this point. But let's explore how `const` impacts these looping constructs. Consider:",
          az: 'Yaxşı, bilirəm, indi düşünürsən ki, xarab plastinka kimi eyni şeyi təkrarlayıram. Amma gəl `const`-un bu dövr konstruksiyalarına necə təsir etdiyinə baxaq. Buna bax:'
        },
        {
          code: 'var keepGoing = true;\nwhile (keepGoing) {\n  // ooo, a shiny constant!\n  const value = Math.random();\n  if (value > 0.5) {\n    keepGoing = false;\n  }\n}'
        },
        {
          en: 'Just like the `let` variant of this program we saw earlier, `const` is being run exactly once within each loop iteration, so it\'s safe from "re-declaration" troubles. But things get more complicated when we talk about `for`-loops.',
          az: 'Bu proqramın əvvəl gördüyümüz `let` variantında olduğu kimi, `const` hər iterasiyada düz bir dəfə işləyir, ona görə «yenidən elan etmə» problemlərindən qorunur. Lakin `for` dövrlərindən danışanda iş mürəkkəbləşir.'
        },
        { en: '`for..in` and `for..of` are fine to use with `const`:', az: '`for..in` və `for..of`-u `const` ilə istifadə etmək olar:' },
        {
          code: 'for (const index in students) {\n  // this is fine\n}\n\nfor (const student of students) {\n  // this is also fine\n}'
        },
        { en: 'But not the general `for`-loop:', az: 'Amma adi `for` dövrünü yox:' },
        {
          code: 'for (const i = 0; i < 3; i++) {\n  // oops, this is going to fail with\n  // a Type Error after the first iteration\n}'
        },
        {
          en: 'What\'s wrong here? We could use `let` just fine in this construct, and we asserted that it creates a new `i` for each loop iteration scope, so it doesn\'t even seem to be a "re-declaration."',
          az: 'Burada nə səhvdir? Bu konstruksiyada `let`-dən rahatca istifadə edə bilərdik və onun hər iterasiya scope-u üçün yeni `i` yaratdığını demişdik, yəni bu, heç «yenidən elan etmə» kimi də görünmür.'
        },
        { en: 'Let\'s mentally "expand" that loop like we did earlier:', az: 'Gəl həmin dövrü əvvəlki kimi zehnimizdə «açaq»:' },
        {
          code: "{\n  // a fictional variable for illustration\n  const $$i = 0;\n\n  for ( ; $$i < 3; $$i++) {\n    // here's our actual loop `i`!\n    const i = $$i;\n    // ..\n  }\n}"
        },
        {
          en: 'Do you spot the problem? Our `i` is indeed just created once inside the loop. That\'s not the problem. The problem is the conceptual `$$i` that must be incremented each time with the `$$i++` expression. That\'s **re-assignment** (not "re-declaration"), which isn\'t allowed for constants.',
          az: 'Problemi görürsənmi? Bizim `i` həqiqətən dövrün içində yalnız bir dəfə yaradılır. Problem bu deyil. Problem hər dəfə `$$i++` ifadəsi ilə artırılmalı olan konseptual `$$i`-dədir. Bu, **yenidən mənimsətmədir** («yenidən elan etmə» yox) və sabitlər üçün buna icazə verilmir.'
        },
        {
          en: 'Remember, this "expanded" form is only a conceptual model to help you intuit the source of the problem. You might wonder if JS could have effectively made the `const $$i = 0` instead into `let $ii = 0`, which would then allow `const` to work with our classic `for`-loop? It\'s possible, but then it could have introduced potentially surprising exceptions to `for`-loop semantics.',
          az: 'Unutma, bu «açılmış» forma problemin mənbəyini hiss etməyə kömək edən konseptual modeldir. Düşünə bilərsən: JS `const $$i = 0`-ı faktiki olaraq `let $ii = 0`-a çevirə bilməzdimi, onda `const` klassik `for` dövrü ilə işləyərdi? Mümkündür, amma onda bu, `for` dövrünün semantikasına potensial olaraq təəccüblü istisnalar gətirə bilərdi.'
        },
        {
          en: 'For example, it would have been a rather arbitrary (and likely confusing) nuanced exception to allow `i++` in the `for`-loop header to skirt strictness of the `const` assignment, but not allow other re-assignments of `i` inside the loop iteration, as is sometimes useful.',
          az: 'Məsələn, `for` dövrünün başlığındakı `i++`-a `const` mənimsətməsinin sərtliyindən yan keçməyə icazə verib, dövr iterasiyasının içində `i`-yə digər yenidən mənimsətmələrə (bəzən faydalı olsa da) icazə verməmək olduqca özbaşına (və çox güman ki, çaşdırıcı) incə istisna olardı.'
        },
        {
          en: 'The straightforward answer is: `const` can\'t be used with the classic `for`-loop form because of the required re-assignment.',
          az: 'Sadə cavab budur: `const` tələb olunan yenidən mənimsətmə səbəbindən klassik `for` dövrü formasında istifadə oluna bilməz.'
        },
        { en: "Interestingly, if you don't do re-assignment, then it's valid:", az: 'Maraqlıdır ki, yenidən mənimsətmə etməsən, bu, keçərlidir:' },
        {
          code: 'var keepGoing = true;\n\nfor (const i = 0; keepGoing; /* nothing here */ ) {\n  keepGoing = (Math.random() > 0.5);\n  // ..\n}'
        },
        {
          en: "That works, but it's pointless. There's no reason to declare `i` in that position with a `const`, since the whole point of such a variable in that position is **to be used for counting iterations**. Just use a different loop form, like a `while` loop, or use a `let`!",
          az: 'Bu işləyir, amma mənasızdır. `i`-ni həmin mövqedə `const` ilə elan etməyin heç bir səbəbi yoxdur, çünki həmin mövqedəki belə dəyişənin bütün mənası **iterasiyaları saymaq üçün istifadə olunmaqdır**. Sadəcə `while` kimi başqa dövr formasından, ya da `let`-dən istifadə et!'
        }
      ],
      note: 'Məşhur müsahibə sualı buradan çıxır:\n\n```js\nfor (var i = 0; i < 3; i++) setTimeout(() => console.log(i));\n// 3 3 3 — bütün callback-lər EYNİ i-ni görür\nfor (let i = 0; i < 3; i++) setTimeout(() => console.log(i));\n// 0 1 2 — hər iterasiyanın öz i-si var\n```\n\nSəbəb bu bölmədəki «hər iterasiya yeni scope nüsxəsidir» qaydasıdır. 7-ci fəsil bunu [[closure]] baxımından yenidən göstərəcək.'
    },
    {
      id: 'tdz',
      heading: 'Uninitialized Variables (aka, TDZ)',
      headingAz: 'İlkinləşdirilməmiş dəyişənlər (yəni TDZ)',
      blocks: [
        {
          en: 'With `var` declarations, the variable is "hoisted" to the top of its scope. But it\'s also automatically initialized to the `undefined` value, so that the variable can be used throughout the entire scope.',
          az: '`var` bəyannamələrində dəyişən öz scope-unun yuxarısına «qaldırılır». Lakin o, həm də avtomatik `undefined` dəyəri ilə ilkinləşdirilir ki, bütün scope boyu istifadə oluna bilsin.'
        },
        {
          en: 'However, `let` and `const` declarations are not quite the same in this respect.',
          az: 'Lakin `let` və `const` bəyannamələri bu baxımdan tam eyni deyil.'
        },
        { en: 'Consider:', az: 'Buna bax:' },
        { code: "console.log(studentName);\n// ReferenceError\n\nlet studentName = 'Suzy';" },
        {
          en: 'The result of this program is that a `ReferenceError` is thrown on the first line. Depending on your JS environment, the error message may say something like: "Cannot access studentName before initialization."',
          az: 'Bu proqramın nəticəsi birinci sətirdə `ReferenceError` atılmasıdır. JS mühitindən asılı olaraq səhv mesajı təxminən belə ola bilər: «Cannot access studentName before initialization».'
        },
        {
          en: '> **NOTE:** The error message as seen here used to be much more vague or misleading. Thankfully, several of us in the community were successfully able to lobby for JS engines to improve this error message so it more accurately tells you what\'s wrong!',
          az: '> **QEYD:** Buradakı səhv mesajı əvvəllər xeyli qeyri-müəyyən və ya çaşdırıcı idi. Xoşbəxtlikdən icmadan bir neçəmiz JS mühərriklərinin bu mesajı yaxşılaşdırması üçün uğurla təşəbbüs göstərə bildik ki, o, nəyin səhv olduğunu daha dəqiq desin!'
        },
        {
          en: "That error message is quite indicative of what's wrong: `studentName` exists on line 1, but it's not been initialized, so it cannot be used yet. Let's try this:",
          az: 'Bu səhv mesajı nəyin səhv olduğunu kifayət qədər aydın göstərir: `studentName` 1-ci sətirdə mövcuddur, amma ilkinləşdirilməyib, ona görə hələ istifadə oluna bilməz. Gəl bunu yoxlayaq:'
        },
        {
          code: "studentName = 'Suzy';   // let's try to initialize it!\n// ReferenceError\n\nconsole.log(studentName);\n\nlet studentName;"
        },
        {
          en: 'Oops. We still get the `ReferenceError`, but now on the first line where we\'re trying to assign to (aka, initialize!) this so-called "uninitialized" variable `studentName`. What\'s the deal!?',
          az: 'Vay. Yenə `ReferenceError` alırıq, amma bu dəfə bu sözdə «ilkinləşdirilməmiş» `studentName` dəyişəninə dəyər yazmağa (yəni onu ilkinləşdirməyə!) çalışdığımız birinci sətirdə. Məsələ nədir!?'
        },
        {
          en: 'The real question is, how do we initialize an uninitialized variable? For `let`/`const`, the **only way** to do so is with an assignment attached to a declaration statement. An assignment by itself is insufficient! Consider:',
          az: 'Əsl sual budur: ilkinləşdirilməmiş dəyişəni necə ilkinləşdirək? `let`/`const` üçün bunun **yeganə yolu** bəyannamə ifadəsinə bağlı mənimsətmədir. Təkbaşına mənimsətmə kifayət deyil! Buna bax:'
        },
        { code: "let studentName = 'Suzy';\nconsole.log(studentName);   // Suzy" },
        {
          en: 'Here, we are initializing the `studentName` (in this case, to `"Suzy"` instead of `undefined`) by way of the `let` declaration statement form that\'s coupled with an assignment.',
          az: 'Burada `studentName`-i mənimsətmə ilə birləşmiş `let` bəyannamə ifadəsi forması vasitəsilə ilkinləşdiririk (bu halda `undefined` yox, `"Suzy"` ilə).'
        },
        { en: 'Alternatively:', az: 'Alternativ olaraq:' },
        {
          code: "// ..\n\nlet studentName;\n// or:\n// let studentName = undefined;\n\n// ..\n\nstudentName = 'Suzy';\n\nconsole.log(studentName);\n// Suzy"
        },
        {
          en: "> **NOTE:** That's interesting! Recall from earlier, we said that `var studentName;` is *not* the same as `var studentName = undefined;`, but here with `let`, they behave the same. The difference comes down to the fact that `var studentName` automatically initializes at the top of the scope, where `let studentName` does not.",
          az: '> **QEYD:** Bu, maraqlıdır! Xatırla ki, əvvəl `var studentName;`-in `var studentName = undefined;` ilə eyni *olmadığını* demişdik, burada isə `let` ilə onlar eyni davranır. Fərq ondadır ki, `var studentName` scope-un yuxarısında avtomatik ilkinləşir, `let studentName` isə yox.'
        },
        {
          en: 'Remember that we\'ve asserted a few times so far that *Compiler* ends up removing any `var`/`let`/`const` declarators, replacing them with the instructions at the top of each scope to register the appropriate identifiers.',
          az: 'Xatırla ki, indiyə qədər bir neçə dəfə demişik: *Kompilyator* bütün `var`/`let`/`const` bəyannamə sözlərini sonda silir və onları hər scope-un yuxarısında müvafiq identifikatorları qeydiyyata alan təlimatlarla əvəz edir.'
        },
        {
          en: 'So if we analyze what\'s going on here, we see that an additional nuance is that *Compiler* is also adding an instruction in the middle of the program, at the point where the variable `studentName` was declared, to handle that declaration\'s auto-initialization. We cannot use the variable at any point prior to that initialization occuring. The same goes for `const` as it does for `let`.',
          az: 'Burada nə baş verdiyini təhlil etsək, əlavə bir incəlik görürük: *Kompilyator* həm də proqramın ortasına, `studentName` dəyişəninin elan olunduğu nöqtəyə, həmin bəyannamənin avtomatik ilkinləşdirilməsini emal edən təlimat əlavə edir. Həmin ilkinləşdirmə baş verməzdən əvvəl dəyişəni heç bir nöqtədə istifadə edə bilmərik. `let` üçün doğru olan `const` üçün də doğrudur.'
        },
        {
          en: 'The term coined by TC39 to refer to this *period of time* from the entering of a scope to where the auto-initialization of the variable occurs is: Temporal Dead Zone ([[tdz]]).',
          az: 'TC39-un scope-a daxil olmaqdan dəyişənin avtomatik ilkinləşdirilməsinə qədər olan bu *zaman kəsiyi* üçün yaratdığı termin: Temporal Dead Zone ([[tdz]]).'
        },
        {
          en: 'The TDZ is the time window where a variable exists but is still uninitialized, and therefore cannot be accessed in any way. Only the execution of the instructions left by *Compiler* at the point of the original declaration can do that initialization. After that moment, the TDZ is done, and the variable is free to be used for the rest of the scope.',
          az: 'TDZ dəyişənin mövcud olduğu, amma hələ ilkinləşdirilmədiyi və buna görə heç bir şəkildə müraciət oluna bilmədiyi zaman pəncərəsidir. Bu ilkinləşdirməni yalnız *Kompilyatorun* orijinal bəyannamə nöqtəsində qoyduğu təlimatların icrası edə bilər. Həmin andan sonra TDZ bitir və dəyişən scope-un qalan hissəsində sərbəst istifadə oluna bilər.'
        },
        {
          en: 'A `var` also has technically has a TDZ, but it\'s zero in length and thus unobservable to our programs! Only `let` and `const` have an observable TDZ.',
          az: 'Texniki baxımdan `var`-ın da TDZ-si var, amma onun uzunluğu sıfırdır və ona görə proqramlarımız üçün müşahidə olunmur! Müşahidə olunan TDZ yalnız `let` və `const`-dadır.'
        },
        {
          en: 'By the way, "temporal" in TDZ does indeed refer to *time* not *position in code*. Consider:',
          az: 'Yeri gəlmişkən, TDZ-dəki «temporal» sözü həqiqətən *kodda mövqeyə* yox, *zamana* işarə edir. Buna bax:'
        },
        {
          code: "askQuestion();\n// ReferenceError\n\nlet studentName = 'Suzy';\n\nfunction askQuestion() {\n  console.log(`${ studentName }, do you know?`);\n}"
        },
        {
          en: 'Even though positionally the `console.log(..)` referencing `studentName` comes *after* the `let studentName` declaration, timing wise the `askQuestion()` function is invoked *before* the `let` statement is encountered, while `studentName` is still in its TDZ! Hence the error.',
          az: 'Mövqe baxımından `studentName`-ə istinad edən `console.log(..)` `let studentName` bəyannaməsindən *sonra* gəlsə də, zaman baxımından `askQuestion()` funksiyası `let` ifadəsinə çatmazdan *əvvəl*, `studentName` hələ TDZ-də ikən çağırılır! Səhvin səbəbi budur.'
        },
        {
          en: "There's a common misconception that TDZ means `let` and `const` do not hoist. This is an inaccurate, or at least slightly misleading, claim. They definitely hoist.",
          az: 'Geniş yayılmış yanlış təsəvvür var ki, TDZ `let` və `const`-un hoist olunmadığını göstərir. Bu, qeyri-dəqiq və ya heç olmasa bir az çaşdırıcı iddiadır. Onlar mütləq hoist olunur.'
        },
        {
          en: 'The actual difference is that `let`/`const` declarations do not automatically initialize at the beginning of the scope, the way `var` does. The *debate* then is if the auto-initialization is *part of* hoisting, or not? I think auto-registration of a variable at the top of the scope (i.e., what I call "hoisting") and auto-initialization at the top of the scope (to `undefined`) are distinct operations and shouldn\'t be lumped together under the single term "hoisting."',
          az: 'Əsl fərq budur ki, `let`/`const` bəyannamələri `var` kimi scope-un əvvəlində avtomatik ilkinləşmir. Deməli, *mübahisə* avtomatik ilkinləşdirmənin hoisting-in *bir hissəsi* olub-olmamasındadır. Məncə, dəyişənin scope-un yuxarısında avtomatik qeydiyyatı (yəni mənim «hoisting» dediyim) və scope-un yuxarısında avtomatik ilkinləşdirilməsi (`undefined` ilə) ayrı əməliyyatlardır və vahid «hoisting» termini altında birləşdirilməməlidir.'
        },
        {
          en: 'We\'ve already seen that `let` and `const` don\'t auto-initialize at the top of the scope. But let\'s *prove* that `let` and `const` *do* hoist (auto-register at the top of the scope), courtesy of our friend shadowing (see "Shadowing" in Chapter 3):',
          az: '`let` və `const`-un scope-un yuxarısında avtomatik ilkinləşmədiyini artıq gördük. İndi isə dostumuz kölgələmənin köməyi ilə (bax: 3-cü fəsildə «Shadowing») `let` və `const`-un hoist *olunduğunu* (scope-un yuxarısında avtomatik qeydiyyata alındığını) *sübut edək*:'
        },
        {
          code: "var studentName = 'Kyle';\n\n{\n  console.log(studentName);\n  // ???\n\n  // ..\n\n  let studentName = 'Suzy';\n\n  console.log(studentName);\n  // Suzy\n}"
        },
        {
          en: 'What\'s going to happen with the first `console.log(..)` statement? If `let studentName` didn\'t hoist to the top of the scope, then the first `console.log(..)` *should* print `"Kyle"`, right? At that moment, it would seem, only the outer `studentName` exists, so that\'s the variable `console.log(..)` should access and print.',
          az: 'Birinci `console.log(..)` ifadəsi ilə nə baş verəcək? `let studentName` scope-un yuxarısına hoist olunmasaydı, birinci `console.log(..)` `"Kyle"` çap *etməli* idi, elə deyilmi? Görünür, həmin an yalnız xarici `studentName` mövcuddur, deməli `console.log(..)` məhz ona müraciət edib onu çap etməlidir.'
        },
        {
          en: "But instead, the first `console.log(..)` throws a TDZ error, because in fact, the inner scope's `studentName` **was** hoisted (auto-registered at the top of the scope). What **didn't** happen (yet!) was the auto-initialization of that inner `studentName`; it's still uninitialized at that moment, hence the TDZ violation!",
          az: 'Lakin əvəzində birinci `console.log(..)` TDZ səhvi atır, çünki əslində daxili scope-un `studentName`-i hoist **olunub** (scope-un yuxarısında avtomatik qeydiyyata alınıb). Baş **verməyən** (hələlik!) həmin daxili `studentName`-in avtomatik ilkinləşdirilməsidir; o, həmin an hələ ilkinləşdirilməyib, TDZ pozuntusu da buna görədir!'
        },
        {
          en: 'So to summarize, TDZ errors occur because `let`/`const` declarations *do* hoist their declarations to the top of their scopes, but unlike `var`, they defer the auto-initialization of their variables until the moment in the code\'s sequencing where the original declaration appeared. This window of time (hint: temporal), whatever its length, is the TDZ.',
          az: 'Xülasə etsək, TDZ səhvləri ona görə baş verir ki, `let`/`const` bəyannamələri öz bəyannamələrini scope-larının yuxarısına hoist *edir*, lakin `var`-dan fərqli olaraq dəyişənlərinin avtomatik ilkinləşdirilməsini kodun ardıcıllığında orijinal bəyannamənin göründüyü ana qədər təxirə salır. Uzunluğundan asılı olmayaraq bu zaman pəncərəsi (ipucu: temporal) TDZ-dir.'
        },
        { en: 'How can you avoid TDZ errors?', az: 'TDZ səhvlərindən necə qaçmaq olar?' },
        {
          en: "My advice: always put your `let` and `const` declarations at the top of any scope. Shrink the TDZ window to zero (or near zero) length, and then it'll be moot.",
          az: 'Məsləhətim: `let` və `const` bəyannamələrini həmişə istənilən scope-un yuxarısına qoy. TDZ pəncərəsini sıfır (və ya sıfıra yaxın) uzunluğa endir, onda o, əhəmiyyətini itirəcək.'
        },
        {
          en: "But why is TDZ even a thing? Why didn't TC39 dictate that `let`/`const` auto-initialize the way `var` does? Just be patient, we'll come back to explore the *why* of TDZ in Appendix A.",
          az: 'Bəs TDZ ümumiyyətlə niyə var? TC39 niyə `let`/`const`-un `var` kimi avtomatik ilkinləşməsini təyin etmədi? Səbirli ol, TDZ-nin *niyə* mövcud olduğunu araşdırmaq üçün Əlavə A-da buna qayıdacağıq.'
        }
      ],
      note: 'TDZ-ni iki ayrı əməliyyatla yadda saxla:\n\n```text\n              qeydiyyat (hoisting)   ilkinləşdirmə\nvar           scope-un əvvəlində     scope-un əvvəlində (undefined)\nlet / const   scope-un əvvəlində     bəyannamə sətrində  ← arada TDZ\nfunction      scope-un əvvəlində     scope-un əvvəlində (funksiya)\n```\n\nReact-də: aşağıda `const` ilə elan olunmuş funksiyanı `useEffect`-in içindən çağırmaq problemsizdir (effekt sonra işləyir), amma render zamanı bəyannamədən yuxarıda çağırsan, TDZ səhvi alarsan. Qayda sadədir — əvvəl elan et, sonra istifadə et.'
    },
    {
      id: 'finally-initialized',
      heading: 'Finally Initialized',
      headingAz: 'Nəhayət ilkinləşdi',
      blocks: [
        {
          en: 'Working with variables has much more nuance than it seems at first glance. Hoisting, (re)declaration, and the TDZ are common sources of confusion for developers, especially those who have worked in other languages before coming to JS. Before moving on, make sure your mental model is fully grounded on these aspects of JS scope and variables.',
          az: 'Dəyişənlərlə işləmək ilk baxışda göründüyündən xeyli çox incəlik tələb edir. Hoisting, (təkrar) bəyannamə və TDZ developerlər, xüsusən JS-ə gəlməzdən əvvəl başqa dillərdə işləyənlər üçün tez-tez qarışıqlıq mənbəyidir. Davam etməzdən əvvəl zehni modelinin JS scope-unun və dəyişənlərinin bu cəhətlərinə möhkəm söykəndiyinə əmin ol.'
        },
        {
          en: "Hoisting is generally cited as an explicit mechanism of the JS engine, but it's really more a metaphor to describe the various ways JS handles variable declarations during compilation. But even as a metaphor, hoisting offers useful structure for thinking about the life-cycle of a variable — when it's created, when it's available to use, when it goes away.",
          az: 'Hoisting adətən JS mühərrikinin açıq mexanizmi kimi təqdim olunur, lakin əslində o, JS-in kompilyasiya zamanı dəyişən bəyannamələrini emal etməsinin müxtəlif yollarını təsvir edən metaforadır. Amma metafora kimi də hoisting dəyişənin həyat dövrü — nə vaxt yarandığı, nə vaxt istifadəyə hazır olduğu, nə vaxt yox olduğu — barədə düşünmək üçün faydalı struktur verir.'
        },
        {
          en: 'Declaration and re-declaration of variables tend to cause confusion when thought of as runtime operations. But if you shift to compile-time thinking for these operations, the quirks and shadows diminish.',
          az: 'Dəyişənlərin bəyannaməsi və təkrar bəyannaməsi icra zamanı əməliyyatları kimi düşünüləndə çaşqınlıq yaradır. Lakin bu əməliyyatlar üçün kompilyasiya zamanı düşüncəsinə keçsən, qəribəliklər və kölgələr azalır.'
        },
        {
          en: "The TDZ (temporal dead zone) error is strange and frustrating when encountered. Fortunately, TDZ is relatively straightforward to avoid if you're always careful to place `let`/`const` declarations at the top of any scope.",
          az: 'TDZ (temporal dead zone) səhvi rast gəlinəndə qəribə və əsəbiləşdiricidir. Xoşbəxtlikdən, `let`/`const` bəyannamələrini həmişə diqqətlə istənilən scope-un yuxarısına qoysan, TDZ-dən qaçmaq nisbətən asandır.'
        },
        {
          en: 'As you successfully navigate these twists and turns of variable scope, the next chapter will lay out the factors that guide our decisions to place our declarations in various scopes, especially nested blocks.',
          az: 'Dəyişən scope-unun bu dolanbac yollarından uğurla keçərkən növbəti fəsil bəyannamələrimizi müxtəlif scope-larda, xüsusən iç-içə bloklarda yerləşdirmə qərarlarımızı istiqamətləndirən amilləri izah edəcək.'
        }
      ]
    }
  ],
  exam: exam5
};
