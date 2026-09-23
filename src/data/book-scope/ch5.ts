import type { BookChapter } from '../books';

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
          en: 'By now you should have a decent grasp of the nesting of scopes, from the global scope downward — called a program\'s scope chain. But just knowing which scope a variable comes from is only part of the story. If a variable declaration appears past the first statement of a scope, how will any references to that identifier before the declaration behave? What happens if you try to declare the same variable twice in a scope?',
          az: 'Artıq qlobal scope-dan aşağıya doğru scope-ların iç-içə quruluşunu — proqramın scope zəncirini — yaxşı başa düşməlisən. Lakin dəyişənin hansı scope-dan gəldiyini bilmək hekayənin yalnız bir hissəsidir. Dəyişən bəyannaməsi scope-un ilk ifadəsindən sonra gəlirsə, bəyannamədən əvvəlki istinadlar necə davranacaq? Eyni dəyişəni bir scope-da iki dəfə elan etməyə çalışsan, nə baş verəcək?'
        },
        {
          en: 'JS\'s particular flavor of lexical scope is rich with nuance in how and when variables come into existence and become available to the program.',
          az: 'JS-in leksik scope-a xas özəllikləri dəyişənlərin necə və nə vaxt yarandığı, proqram üçün nə vaxt əlçatan olduğu baxımından incəliklərlə zəngindir.'
        }
      ]
    },
    {
      id: 'when-can-i-use',
      heading: 'When Can I Use a Variable?',
      headingAz: 'Dəyişəni nə vaxt istifadə edə bilərəm?',
      blocks: [
        {
          code: 'greeting();\n// Hello!\n\nfunction greeting() {\n  console.log(\'Hello!\');\n}'
        },
        {
          en: 'This code works fine. But did you ever wonder how or why it works? Specifically, why can you access the identifier `greeting` from line 1, even though the `greeting()` function declaration doesn\'t occur until line 4? Every identifier is created at the beginning of the scope it belongs to, **every time that scope is entered**.',
          az: 'Bu kod qüsursuz işləyir. Bəs heç düşünmüsənmi ki, necə və niyə işləyir? Konkret olaraq: `greeting()` funksiya bəyannaməsi yalnız 4-cü sətirdə gəldiyi halda, niyə `greeting` identifikatoruna 1-ci sətirdən müraciət edə bilirsən? Hər identifikator aid olduğu scope-un əvvəlində yaradılır — **həmin scope-a hər daxil olanda**.'
        },
        {
          en: 'The term most commonly used for a variable being visible from the beginning of its enclosing scope, even though its declaration may appear further down in the scope, is called [[hoisting]].',
          az: 'Dəyişənin bəyannaməsi scope-da daha aşağıda olsa belə, əhatə edən scope-un əvvəlindən görünməsi üçün ən çox istifadə olunan termin [[hoisting]]-dir.'
        },
        {
          en: 'But hoisting alone doesn\'t fully answer the question: why can we call the `greeting()` function before it\'s been declared? The answer is a special characteristic of formal `function` declarations, called [[function-hoisting]]. When a function declaration\'s name identifier is registered at the top of its scope, it\'s additionally auto-initialized to that function\'s reference.',
          az: 'Lakin hoisting təkbaşına suala tam cavab vermir: niyə `greeting()` funksiyasını elan olunmazdan əvvəl çağıra bilirik? Cavab rəsmi `function` bəyannamələrinin xüsusi xüsusiyyətidir: [[function-hoisting]]. Funksiya bəyannaməsinin ad identifikatoru scope-un yuxarısında qeydiyyata alınanda, əlavə olaraq həmin funksiyanın istinadı ilə avtomatik ilkinləşdirilir.'
        },
        {
          en: 'One key detail is that both function hoisting and `var`-flavored variable hoisting attach their name identifiers to the nearest enclosing **function scope** (or, if none, the global scope), not a block scope. Declarations with `let` and `const` still hoist, but these two declaration forms attach to their enclosing block.',
          az: 'Əsas detallardan biri: həm funksiya hoisting-i, həm də `var` tipli dəyişən hoisting-i ad identifikatorlarını blok scope-a yox, ən yaxın əhatə edən **funksiya scope-una** (o yoxdursa, qlobal scope-a) bağlayır. `let` və `const` bəyannamələri də hoist olunur, lakin bu iki forma əhatə edən bloka bağlanır.'
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
          en: 'Function hoisting only applies to formal `function` declarations (specifically those which appear outside of blocks — see "FiB" in Chapter 6), not to function expression assignments:',
          az: 'Funksiya hoisting-i yalnız rəsmi `function` bəyannamələrinə aiddir (xüsusən blokların xaricində olanlara — bax: 6-cı fəsildə «FiB»), funksiya ifadəsi mənimsətmələrinə yox:'
        },
        {
          code: 'greeting();\n// TypeError\n\nvar greeting = function greeting() {\n  console.log(\'Hello!\');\n};'
        },
        {
          en: 'Notice that the error is not a `ReferenceError`. JS isn\'t telling us that it couldn\'t find `greeting` as an identifier in the scope. It\'s telling us that `greeting` was found but doesn\'t hold a function reference at that moment. Only functions can be invoked, so attempting to invoke some non-function value results in an error.',
          az: 'Diqqət et: səhv `ReferenceError` deyil. JS demir ki, scope-da `greeting` identifikatorunu tapa bilmədi. O deyir ki, `greeting` tapıldı, lakin həmin an funksiya istinadı saxlamır. Yalnız funksiyaları çağırmaq olar, ona görə funksiya olmayan dəyəri çağırmaq cəhdi səhvlə nəticələnir.'
        },
        {
          en: 'In addition to being hoisted, variables declared with `var` are also automatically initialized to `undefined` at the beginning of their scope. So on that first line, `greeting` exists, but it holds only the default `undefined` value. It\'s not until line 4 that `greeting` gets assigned the function reference.',
          az: '`var` ilə elan olunan dəyişənlər hoist olunmaqla yanaşı, scope-larının əvvəlində avtomatik `undefined` ilə ilkinləşdirilir. Deməli, birinci sətirdə `greeting` mövcuddur, lakin yalnız standart `undefined` dəyərini saxlayır. `greeting`-ə funksiya istinadı yalnız 4-cü sətirdə mənimsədilir.'
        },
        {
          en: 'In both cases, the name of the identifier is hoisted. But the function reference association isn\'t handled at initialization time (beginning of the scope) unless the identifier was created in a formal `function` declaration.',
          az: 'Hər iki halda identifikatorun adı hoist olunur. Lakin identifikator rəsmi `function` bəyannaməsində yaradılmayıbsa, funksiya istinadı ilə əlaqə ilkinləşdirmə zamanı (scope-un əvvəlində) qurulmur.'
        }
      ],
      note: 'Səhv növü diaqnoz alətidir:\n\n```text\nReferenceError: x is not defined        → dəyişən heç yoxdur (undeclared)\nReferenceError: Cannot access x before… → var, amma TDZ-dədir (let/const)\nTypeError: x is not a function          → var, amma dəyəri funksiya deyil (çox vaxt undefined)\n```\n\nReact-də `const handleClick = () => {}` ilə yazılan funksiyanı yuxarıda istifadə etsən, TDZ səhvi alarsan. `function handleClick() {}` isə hoist olunur.',
      terms: ['tdz']
    },
    {
      id: 'variable-hoisting',
      heading: 'Variable Hoisting — Yet Another Metaphor',
      headingAz: 'Dəyişən hoisting-i — daha bir metafora',
      blocks: [
        {
          code: 'greeting = \'Hello!\';\nconsole.log(greeting);\n// Hello!\n\nvar greeting = \'Howdy!\';'
        },
        {
          en: 'Though `greeting` isn\'t declared until line 5, it\'s available to be assigned to as early as line 1. There\'s two necessary parts to the explanation: the identifier is hoisted, and it\'s automatically initialized to the value `undefined` from the top of the scope.',
          az: '`greeting` yalnız 5-ci sətirdə elan olunsa da, ona 1-ci sətirdən dəyər yazmaq mümkündür. İzahın iki vacib hissəsi var: identifikator hoist olunur və scope-un yuxarısından avtomatik `undefined` dəyəri ilə ilkinləşdirilir.'
        },
        {
          en: 'The typical assertion of what hoisting means: lifting — like lifting a heavy weight upward — any identifiers all the way to the top of a scope. The explanation often asserted is that the JS engine will actually rewrite that program before execution, so that all the declarations have been moved to the top of their respective scopes. The "rule" of the hoisting metaphor is that function declarations are hoisted first, then variables are hoisted immediately after all the functions.',
          az: 'Hoisting-in adi izahı: identifikatorları scope-un ən yuxarısına qaldırmaq — ağır yükü yuxarı qaldırmaq kimi. Tez-tez deyilir ki, JS mühərriki proqramı icradan əvvəl həqiqətən yenidən yazır və bütün bəyannamələr öz scope-larının yuxarısına köçürülür. Hoisting metaforunun «qaydası» budur: əvvəl funksiya bəyannamələri, bütün funksiyalardan dərhal sonra isə dəyişənlər qaldırılır.'
        },
        {
          caption: 'Metafora proqramı belə «yenidən düzür» (əslində belə olmur)',
          code: 'function greeting() {\n  console.log(`Hello ${ studentName }!`);\n}\nvar studentName;\n\nstudentName = \'Suzy\';\ngreeting();\n// Hello Suzy!'
        },
        {
          en: 'Hoisting as a mechanism for re-ordering code may be an attractive simplification, but it\'s not accurate. The JS engine doesn\'t actually re-arrange the code. It can\'t magically look ahead and find declarations; the only way to accurately find them, as well as all the scope boundaries in the program, would be to fully parse the code. Guess what parsing is? The first phase of the two-phase processing!',
          az: 'Hoisting-i kodu yenidən düzən mexanizm kimi təsəvvür etmək cəlbedici sadələşdirmə ola bilər, lakin dəqiq deyil. JS mühərriki kodu əslində yenidən düzmür. O, sehrli şəkildə irəli baxıb bəyannamələri tapa bilməz; onları, eləcə də proqramdakı bütün scope sərhədlərini dəqiq tapmağın yeganə yolu kodu tam parse etməkdir. Tap görək, parse nədir? İki mərhələli emalın birinci mərhələsi!'
        },
        {
          en: 'I assert that hoisting should be used to refer to the **compile-time operation** of generating runtime instructions for the automatic registration of a variable at the beginning of its scope, each time that scope is entered. That\'s a subtle but important shift, from hoisting as a runtime behavior to its proper place among compile-time tasks.',
          az: 'Hesab edirəm ki, hoisting termini **kompilyasiya zamanı əməliyyatına** — dəyişənin hər dəfə scope-a daxil olanda scope-un əvvəlində avtomatik qeydiyyata alınması üçün icra təlimatlarının yaradılmasına — işarə etməlidir. Bu, incə, lakin vacib dəyişiklikdir: hoisting icra zamanı davranışı kimi yox, kompilyasiya tapşırıqları arasındakı layiqli yerində.'
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
          code: 'var studentName = \'Frank\';\nconsole.log(studentName);   // Frank\n\nvar studentName;\nconsole.log(studentName);   // ???'
        },
        {
          en: 'Many believe the second `var studentName` has re-declared the variable (and thus "reset" it), so they expect `undefined` to be printed. But is there such a thing as a variable being "re-declared" in the same scope? No. Since hoisting is actually about registering a variable at the beginning of a scope, there\'s nothing to be done in the middle of the scope where the original program actually had the second `var studentName` statement. It\'s just a no-op(eration), a pointless statement ([[redeclaration]]).',
          az: 'Çoxları elə bilir ki, ikinci `var studentName` dəyişəni təkrar elan edib (yəni «sıfırlayıb»), ona görə `undefined` çap olunacağını gözləyirlər. Bəs eyni scope-da dəyişənin «təkrar elan olunması» deyə bir şey varmı? Yox. Hoisting əslində dəyişənin scope-un əvvəlində qeydiyyata alınması olduğu üçün, proqramda ikinci `var studentName` ifadəsinin durduğu yerdə — scope-un ortasında — görüləcək heç bir iş yoxdur. Bu, sadəcə heç nə etməyən (no-op), mənasız ifadədir ([[redeclaration]]).'
        },
        {
          en: 'It\'s also important to point out that `var studentName;` doesn\'t mean `var studentName = undefined;`, as most assume:',
          az: 'Onu da qeyd etmək vacibdir ki, çoxlarının güman etdiyi kimi, `var studentName;` `var studentName = undefined;` demək deyil:'
        },
        {
          code: 'var studentName = \'Frank\';\nconsole.log(studentName);   // Frank\n\nvar studentName;\nconsole.log(studentName);   // Frank <--- still!\n\n// let\'s add the initialization explicitly\nvar studentName = undefined;\nconsole.log(studentName);   // undefined <--- see!?'
        },
        {
          en: 'What about repeating a declaration within a scope using `let` or `const`? The program will not execute, but instead immediately throw a `SyntaxError`: "studentName has already been declared." If either declaration uses `let`, the other can be either `let` or `var`, and the error will still occur. The only way to "re-declare" a variable is to use `var` for all (two or more) of its declarations.',
          az: 'Bəs scope daxilində bəyannaməni `let` və ya `const` ilə təkrarlasaq? Proqram icra olunmayacaq, əvəzində dərhal `SyntaxError` atacaq: «studentName has already been declared». Bəyannamələrdən biri `let` istifadə edirsə, digəri istər `let`, istər `var` olsun — səhv yenə baş verir. Dəyişəni «təkrar elan etməyin» yeganə yolu onun bütün (iki və ya daha çox) bəyannamələri üçün `var` istifadə etməkdir.'
        },
        {
          en: 'But why disallow it? The reason for the error is not technical per se, as `var` "re-declaration" has always been allowed. It\'s really more of a "social engineering" issue. "Re-declaration" of variables is seen by some, including many on the TC39 body, as a bad habit that can lead to program bugs. So when ES6 introduced `let`, they decided to prevent "re-declaration" with an error.',
          az: 'Bəs niyə qadağandır? Səhvin səbəbi özlüyündə texniki deyil, çünki `var` ilə «təkrar bəyannamə»yə həmişə icazə verilib. Bu, daha çox «sosial mühəndislik» məsələsidir. Dəyişənlərin «təkrar bəyannaməsi» bəziləri, o cümlədən TC39-un bir çox üzvü tərəfindən proqramda buglara səbəb ola bilən pis vərdiş sayılır. Ona görə ES6 `let`-i gətirəndə «təkrar bəyannamə»nin qarşısını səhvlə almağa qərar verdilər.'
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
          en: 'The `const` keyword is more constrained than `let`. Like `let`, `const` cannot be repeated with the same identifier in the same scope. But there\'s actually an overriding technical reason why that sort of "re-declaration" is disallowed. The `const` keyword requires a variable to be initialized, so omitting an assignment from the declaration results in a `SyntaxError`, and `const` declarations create variables that cannot be re-assigned:',
          az: '`const` açar sözü `let`-dən daha məhduddur. `let` kimi, `const` da eyni scope-da eyni identifikatorla təkrarlana bilməz. Lakin bu cür «təkrar bəyannamə»nin qadağan olunmasının əslində üstün texniki səbəbi var. `const` dəyişənin ilkinləşdirilməsini tələb edir, ona görə bəyannamədə mənimsətməni buraxmaq `SyntaxError` ilə nəticələnir; `const` bəyannamələri isə yenidən mənimsədilə bilməyən dəyişənlər yaradır:'
        },
        {
          code: 'const empty;   // SyntaxError\n\nconst studentName = \'Frank\';\nconsole.log(studentName);\n// Frank\n\nstudentName = \'Suzy\';   // TypeError'
        },
        {
          en: '> **WARNING:** The error thrown when re-assigning `studentName` is a `TypeError`, not a `SyntaxError`. Syntax errors represent faults in the program that stop it from even starting execution. Type errors represent faults that arise during program execution. In the preceding snippet, "Frank" is printed out before we process the re-assignment of `studentName`, which then throws the error.',
          az: '> **XƏBƏRDARLIQ:** `studentName`-ə yenidən dəyər yazanda atılan səhv `SyntaxError` yox, `TypeError`-dur. Sintaksis səhvləri proqramın heç icraya başlamasına imkan verməyən qüsurlardır. Tip səhvləri isə proqramın icrası zamanı yaranan qüsurlardır. Yuxarıdakı parçada `studentName`-in yenidən mənimsədilməsi emal olunmazdan əvvəl «Frank» çap olunur, sonra səhv atılır.'
        },
        {
          en: 'So if `const` declarations cannot be re-assigned, and `const` declarations always require assignments, then we have a clear technical reason why `const` must disallow any "re-declarations": any `const` "re-declaration" would also necessarily be a `const` re-assignment, which can\'t be allowed! TC39 essentially felt that `let` "re-declaration" should be disallowed as well, for consistency.',
          az: 'Deməli, `const` bəyannamələri yenidən mənimsədilə bilmirsə və həmişə mənimsətmə tələb edirsə, `const`-un istənilən «təkrar bəyannamə»ni qadağan etməsinin aydın texniki səbəbi var: `const`-un hər «təkrar bəyannaməsi» həm də mütləq `const`-a yenidən mənimsətmə olardı, buna isə icazə vermək olmaz! TC39 isə ardıcıllıq naminə `let`-in «təkrar bəyannaməsi»nin də qadağan olunmasını lazım bildi.'
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
          code: 'var keepGoing = true;\nwhile (keepGoing) {\n  let value = Math.random();\n  if (value > 0.5) {\n    keepGoing = false;\n  }\n}'
        },
        {
          en: 'Is `value` being "re-declared" repeatedly in this program? No. All the rules of scope (including "re-declaration" of `let`-created variables) are applied per scope instance. In other words, each time a scope is entered during execution, everything resets. Each loop iteration is its own new scope instance, and within each scope instance, `value` is only being declared once.',
          az: 'Bu proqramda `value` təkrar-təkrar «elan olunur»mu? Yox. Scope-un bütün qaydaları (o cümlədən `let` ilə yaradılan dəyişənlərin «təkrar bəyannaməsi») hər scope nüsxəsinə ayrıca tətbiq olunur. Başqa sözlə, icra zamanı scope-a hər daxil olanda hər şey sıfırlanır. Dövrün hər iterasiyası öz yeni scope nüsxəsidir və hər nüsxədə `value` yalnız bir dəfə elan olunur.'
        },
        {
          en: 'One way to keep this all straight is to remember that `var`, `let`, and `const` keywords are effectively removed from the code by the time it starts to execute. They\'re handled entirely by the compiler. If you mentally erase the declarator keywords and then try to process the code, it should help you decide if and when (re-)declarations might occur.',
          az: 'Bunların hamısını düzgün yadda saxlamağın bir yolu: `var`, `let` və `const` açar sözləri kod icra olunmağa başlayanda artıq faktiki olaraq koddan silinib. Onları tamamilə kompilyator emal edir. Bəyannamə açar sözlərini zehnən silib kodu emal etməyə çalışsan, (təkrar) bəyannamələrin baş verib-vermədiyini və nə vaxt baş verdiyini anlamağa kömək edəcək.'
        },
        {
          caption: '`for` dövründə `i` hər iterasiyanın öz scope-undadır',
          code: 'for (let i = 0; i < 3; i++) {\n  let value = i * 10;\n  console.log(`${ i }: ${ value }`);\n}\n// 0: 0\n// 1: 10\n// 2: 20\n\n// ...conceptually expands to:\n{\n  // a fictional variable for illustration\n  let $$i = 0;\n  for ( /* nothing */; $$i < 3; $$i++) {\n    // here\'s our actual loop `i`!\n    let i = $$i;\n    let value = i * 10;\n    console.log(`${ i }: ${ value }`);\n  }\n}'
        },
        {
          en: '`for..in` and `for..of` are fine to use with `const`. But not the general `for`-loop: `for (const i = 0; i < 3; i++)` fails with a `TypeError` after the first iteration. The problem is the conceptual `$$i` that must be incremented each time with the `$$i++` expression. That\'s re-assignment (not "re-declaration"), which isn\'t allowed for constants.',
          az: '`for..in` və `for..of` ilə `const` istifadə etmək olar. Amma adi `for` dövrü ilə yox: `for (const i = 0; i < 3; i++)` birinci iterasiyadan sonra `TypeError` ilə dayanır. Problem hər dəfə `$$i++` ifadəsi ilə artırılmalı olan konseptual `$$i`-dədir. Bu, yenidən mənimsətmədir («təkrar bəyannamə» yox), sabitlər üçün isə buna icazə verilmir.'
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
          en: 'With `var` declarations, the variable is "hoisted" to the top of its scope. But it\'s also automatically initialized to the `undefined` value, so that the variable can be used throughout the entire scope. However, `let` and `const` declarations are not quite the same in this respect:',
          az: '`var` bəyannamələrində dəyişən scope-un yuxarısına «qaldırılır». Həm də avtomatik `undefined` dəyəri ilə ilkinləşdirilir ki, bütün scope boyu istifadə oluna bilsin. Lakin `let` və `const` bəyannamələri bu baxımdan tam eyni deyil:'
        },
        {
          code: 'console.log(studentName);\n// ReferenceError: Cannot access studentName before initialization\n\nlet studentName = \'Suzy\';'
        },
        {
          en: 'How do we initialize an uninitialized variable? For `let` / `const`, the only way to do so is with an assignment attached to a declaration statement. An assignment by itself is insufficient! Compiler adds an instruction in the middle of the program, at the point where the variable was declared, to handle that declaration\'s auto-initialization. We cannot use the variable at any point prior to that initialization occurring.',
          az: 'İlkinləşdirilməmiş dəyişəni necə ilkinləşdiririk? `let` / `const` üçün yeganə yol bəyannamə ifadəsinə bağlı mənimsətmədir. Təkbaşına mənimsətmə kifayət deyil! Kompilyator proqramın ortasına, dəyişənin elan olunduğu nöqtəyə, həmin bəyannamənin avtomatik ilkinləşdirilməsi üçün təlimat əlavə edir. Bu ilkinləşdirmə baş verməzdən əvvəl dəyişəni heç bir nöqtədə istifadə edə bilmərik.'
        },
        {
          en: 'The term coined by TC39 to refer to this period of time from the entering of a scope to where the auto-initialization of the variable occurs is: Temporal Dead Zone ([[tdz]]). The TDZ is the time window where a variable exists but is still uninitialized, and therefore cannot be accessed in any way. A `var` also has technically has a TDZ, but it\'s zero in length and thus unobservable to our programs!',
          az: 'TC39-un scope-a daxil olmaqdan dəyişənin avtomatik ilkinləşdirilməsinə qədərki bu dövr üçün təklif etdiyi termin: Temporal Dead Zone ([[tdz]]). TDZ dəyişənin mövcud olduğu, lakin hələ ilkinləşdirilmədiyi və buna görə heç bir şəkildə müraciət edilə bilmədiyi zaman pəncərəsidir. Texniki olaraq `var`-ın da TDZ-si var, lakin onun uzunluğu sıfırdır və proqramlarımız üçün müşahidə olunmur!'
        },
        {
          caption: '«Temporal» — koddakı mövqe yox, ZAMAN deməkdir',
          code: 'askQuestion();\n// ReferenceError\n\nlet studentName = \'Suzy\';\n\nfunction askQuestion() {\n  console.log(`${ studentName }, do you know?`);\n}'
        },
        {
          en: 'There\'s a common misconception that TDZ means `let` and `const` do not hoist. This is an inaccurate, or at least slightly misleading, claim. They definitely hoist. Let\'s prove it, courtesy of our friend shadowing:',
          az: 'Geniş yayılmış yanlış təsəvvür var ki, TDZ `let` və `const`-un hoist olunmadığını göstərir. Bu, qeyri-dəqiq, ən azı bir qədər çaşdırıcı iddiadır. Onlar mütləq hoist olunur. Dostumuz shadowing-in köməyi ilə bunu sübut edək:'
        },
        {
          code: 'var studentName = \'Kyle\';\n{\n  console.log(studentName);\n  // ??? — TDZ error, not "Kyle"!\n  let studentName = \'Suzy\';\n  console.log(studentName);\n  // Suzy\n}'
        },
        {
          en: 'If `let studentName` didn\'t hoist to the top of the scope, then the first `console.log(..)` should print "Kyle". But instead, it throws a TDZ error, because in fact, the inner scope\'s `studentName` was hoisted (auto-registered at the top of the scope). What didn\'t happen (yet!) was the auto-initialization of that inner `studentName`. **My advice:** always put your `let` and `const` declarations at the top of any scope. Shrink the TDZ window to zero (or near zero) length, and then it\'ll be moot.',
          az: '`let studentName` scope-un yuxarısına hoist olunmasaydı, birinci `console.log(..)` «Kyle» çap etməli idi. Əvəzində isə TDZ səhvi atır, çünki daxili scope-un `studentName`-i əslində hoist olunub (scope-un yuxarısında avtomatik qeydiyyata alınıb). (Hələ!) baş verməyən isə həmin daxili `studentName`-in avtomatik ilkinləşdirilməsidir. **Məsləhətim:** `let` və `const` bəyannamələrini həmişə istənilən scope-un yuxarısına qoy. TDZ pəncərəsini sıfır (və ya sıfıra yaxın) uzunluğa endir, onda bu problem öz-özünə aradan qalxacaq.'
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
          en: 'Hoisting is generally cited as an explicit mechanism of the JS engine, but it\'s really more a metaphor to describe the various ways JS handles variable declarations during compilation. But even as a metaphor, hoisting offers useful structure for thinking about the life-cycle of a variable — when it\'s created, when it\'s available to use, when it goes away.',
          az: 'Hoisting adətən JS mühərrikinin açıq mexanizmi kimi təqdim olunur, lakin əslində daha çox JS-in kompilyasiya zamanı dəyişən bəyannamələrini emal etməsinin müxtəlif yollarını təsvir edən metaforadır. Amma metafora kimi də hoisting dəyişənin həyat dövrü — nə vaxt yarandığı, nə vaxt istifadəyə hazır olduğu, nə vaxt yox olduğu — barədə düşünmək üçün faydalı struktur verir.'
        },
        {
          en: 'Declaration and re-declaration of variables tend to cause confusion when thought of as runtime operations. But if you shift to compile-time thinking for these operations, the quirks and shadows diminish. The TDZ error is strange and frustrating when encountered. Fortunately, TDZ is relatively straightforward to avoid if you\'re always careful to place `let` / `const` declarations at the top of any scope.',
          az: 'Dəyişənlərin bəyannaməsi və təkrar bəyannaməsi icra zamanı əməliyyatları kimi düşünüləndə çaşqınlıq yaradır. Lakin bu əməliyyatlar barədə kompilyasiya zamanı düşüncəsinə keçsən, qəribəliklər və kölgələr azalır. TDZ səhvi qarşılaşanda qəribə və əsəbiləşdirici olur. Xoşbəxtlikdən, `let` / `const` bəyannamələrini həmişə scope-un yuxarısına qoymağa diqqət etsən, TDZ-dən qaçmaq nisbətən asandır.'
        }
      ]
    }
  ]
};
