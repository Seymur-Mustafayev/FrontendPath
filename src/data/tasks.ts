import type { Level } from '../types';

export interface Text3 {
  az: string;
  en: string;
  ru: string;
}

export interface TaskTest {
  call: string;
  expect?: unknown;
  throws?: boolean;
}

export interface Task {
  id: string;
  topic: string;
  lvl: Level;
  title: Text3;
  desc: Text3;
  hint: Text3;
  starter: string;
  solution: string;
  tests: TaskTest[];
}

export interface TaskTopic {
  id: string;
  path: string;
  title: Text3;
  sum: Text3;
}

export const TASK_TOPICS: TaskTopic[] = [
  {
    id: 'scope',
    path: 'js',
    title: { az: 'Scope, closure və hoisting', en: 'Scope, closures and hoisting', ru: 'Scope, замыкания и hoisting' },
    sum: {
      az: 'Gizli state saxlayan funksiyalar, dövrdəki closure tələsi, memoizasiya və modul nümunəsi.',
      en: 'Functions that keep hidden state, the closure-in-a-loop trap, memoization and the module pattern.',
      ru: 'Функции со скрытым состоянием, ловушка замыканий в цикле, мемоизация и паттерн «модуль».'
    }
  },
  {
    id: 'arrays',
    path: 'js',
    title: { az: 'Massivlər və data çevirmə', en: 'Arrays and data transformation', ru: 'Массивы и преобразование данных' },
    sum: {
      az: 'map, filter, reduce və sort ilə serverdən gələn datanı UI-yə hazırlamaq.',
      en: 'Preparing server data for the UI with map, filter, reduce and sort.',
      ru: 'Подготовка данных с сервера для UI с помощью map, filter, reduce и sort.'
    }
  },
  {
    id: 'objects',
    path: 'state',
    title: { az: 'Obyektlər və immutability', en: 'Objects and immutability', ru: 'Объекты и иммутабельность' },
    sum: {
      az: 'State-i yerində dəyişmədən yeniləmək, dərin müqayisə və reducer yazmaq.',
      en: 'Updating state without mutating it, deep comparison and writing a reducer.',
      ru: 'Обновление state без мутаций, глубокое сравнение и написание редьюсера.'
    }
  },
  {
    id: 'functions',
    path: 'perf',
    title: { az: 'Funksiyalar və utilitlər', en: 'Functions and utilities', ru: 'Функции и утилиты' },
    sum: {
      az: 'debounce, curry və pipe — hər frontend layihəsində olan kiçik alətlər.',
      en: 'debounce, curry and pipe — the small tools found in every frontend project.',
      ru: 'debounce, curry и pipe — маленькие инструменты, которые есть в каждом фронтенд-проекте.'
    }
  },
  {
    id: 'async',
    path: 'async',
    title: { az: 'Async və Promise-lər', en: 'Async and promises', ru: 'Async и промисы' },
    sum: {
      az: 'Gözləmə, timeout, öz Promise.all-ını yazmaq və yenidən cəhd məntiqi.',
      en: 'Waiting, timeouts, writing your own Promise.all and retry logic.',
      ru: 'Ожидание, таймауты, собственный Promise.all и логика повторных попыток.'
    }
  },
  {
    id: 'strings',
    path: 'html',
    title: { az: 'Sətirlər və validasiya', en: 'Strings and validation', ru: 'Строки и валидация' },
    sum: {
      az: 'Formalar üçün yoxlama, URL-lər üçün slug və query sətirlərinin parse edilməsi.',
      en: 'Validation for forms, slugs for URLs and parsing query strings.',
      ru: 'Проверка для форм, slug для URL и разбор query-строк.'
    }
  }
];

export const TASKS: Task[] = [
  {
    id: 'counter',
    topic: 'scope',
    lvl: 'j',
    title: { az: 'Gizli sayğac', en: 'A private counter', ru: 'Скрытый счётчик' },
    desc: {
      az: '`createCounter(start = 0)` funksiyasını yaz. O, üç metodu olan obyekt qaytarmalıdır: `inc()` sayğacı 1 artırır, `dec()` 1 azaldır, `value()` cari dəyəri qaytarır.\n\nSayğacın özü çöldən görünməməlidir — yalnız metodlar vasitəsilə əlçatan olsun. Hər `createCounter` çağırışı öz müstəqil sayğacını yaratmalıdır.\n\n```js\nconst c = createCounter(10);\nc.inc(); c.inc(); c.dec();\nc.value();   // 11\nc.count;     // undefined\n```',
      en: 'Write a `createCounter(start = 0)` function. It should return an object with three methods: `inc()` increases the counter by 1, `dec()` decreases it by 1, and `value()` returns the current value.\n\nThe counter itself must not be visible from outside — only reachable through the methods. Every `createCounter` call must create its own independent counter.\n\n```js\nconst c = createCounter(10);\nc.inc(); c.inc(); c.dec();\nc.value();   // 11\nc.count;     // undefined\n```',
      ru: 'Напиши функцию `createCounter(start = 0)`. Она должна вернуть объект с тремя методами: `inc()` увеличивает счётчик на 1, `dec()` уменьшает на 1, `value()` возвращает текущее значение.\n\nСам счётчик не должен быть виден снаружи — только через методы. Каждый вызов `createCounter` должен создавать свой независимый счётчик.\n\n```js\nconst c = createCounter(10);\nc.inc(); c.inc(); c.dec();\nc.value();   // 11\nc.count;     // undefined\n```'
    },
    hint: {
      az: 'Sayğacı `createCounter`-in içində `let` ilə elan et. Qaytardığın metodlar onun üzərində closure saxlayacaq.',
      en: 'Declare the counter with `let` inside `createCounter`. The methods you return will keep a closure over it.',
      ru: 'Объяви счётчик через `let` внутри `createCounter`. Возвращаемые методы будут замыкаться на него.'
    },
    starter: 'function createCounter(start = 0) {\n  // your code\n}\n',
    solution: 'function createCounter(start = 0) {\n  let count = start;\n  return {\n    inc: () => { count++; },\n    dec: () => { count--; },\n    value: () => count\n  };\n}\n',
    tests: [
      { call: '(() => { const c = createCounter(); c.inc(); c.inc(); return c.value(); })()', expect: 2 },
      { call: '(() => { const c = createCounter(10); c.dec(); return c.value(); })()', expect: 9 },
      { call: '(() => { const a = createCounter(); const b = createCounter(5); a.inc(); return [a.value(), b.value()]; })()', expect: [1, 5] },
      { call: '(() => { const c = createCounter(3); return c.count; })()', expect: undefined }
    ]
  },
  {
    id: 'once',
    topic: 'scope',
    lvl: 'j',
    title: { az: 'Yalnız bir dəfə', en: 'Only once', ru: 'Только один раз' },
    desc: {
      az: '`once(fn)` funksiyasını yaz. O, yeni funksiya qaytarır: ilk çağırışda `fn`-i verilən arqumentlərlə çağırır və nəticəni qaytarır, sonrakı bütün çağırışlarda `fn`-i bir daha çağırmadan ilk nəticəni qaytarır.\n\n```js\nconst init = once(() => console.log(\'init\'));\ninit();   // init\ninit();   // heç nə\n```\n\nPraktikada: analitikanın bir dəfə qoşulması, «Ödə» düyməsinin iki dəfə basılmasının qarşısını almaq.',
      en: 'Write a `once(fn)` function. It returns a new function: on the first call it calls `fn` with the given arguments and returns the result; on every later call it returns the first result without calling `fn` again.\n\n```js\nconst init = once(() => console.log(\'init\'));\ninit();   // init\ninit();   // nothing\n```\n\nIn practice: initializing analytics only once, preventing a “Pay” button from being pressed twice.',
      ru: 'Напиши функцию `once(fn)`. Она возвращает новую функцию: при первом вызове вызывает `fn` с переданными аргументами и возвращает результат, а при всех последующих возвращает первый результат, не вызывая `fn` снова.\n\n```js\nconst init = once(() => console.log(\'init\'));\ninit();   // init\ninit();   // ничего\n```\n\nНа практике: однократная инициализация аналитики, защита кнопки «Оплатить» от двойного нажатия.'
    },
    hint: {
      az: 'İki dəyişən lazımdır: çağırılıb-çağırılmadığını göstərən bayraq və ilk nəticə. İkisi də qaytarılan funksiyanın closure-unda yaşayır.',
      en: 'You need two variables: a flag that shows whether it was called, and the first result. Both live in the closure of the returned function.',
      ru: 'Нужны две переменные: флаг «уже вызывали» и первый результат. Обе живут в замыкании возвращаемой функции.'
    },
    starter: 'function once(fn) {\n  // your code\n}\n',
    solution: 'function once(fn) {\n  let called = false;\n  let result;\n  return (...args) => {\n    if (!called) {\n      called = true;\n      result = fn(...args);\n    }\n    return result;\n  };\n}\n',
    tests: [
      { call: '(() => { let n = 0; const f = once(() => ++n); f(); f(); f(); return n; })()', expect: 1 },
      { call: '(() => { const f = once((a, b) => a + b); return [f(2, 3), f(10, 10)]; })()', expect: [5, 5] },
      { call: '(() => { const f = once(() => undefined); let n = 0; const g = once(() => { n++; }); g(); g(); return [f(), n]; })()', expect: [undefined, 1] }
    ]
  },
  {
    id: 'loop-closure',
    topic: 'scope',
    lvl: 'j',
    title: { az: 'Dövrdəki closure tələsi', en: 'The closure-in-a-loop trap', ru: 'Ловушка замыкания в цикле' },
    desc: {
      az: '`makeGetters(n)` `n` funksiyadan ibarət massiv qaytarmalıdır; `i`-ci funksiya `i` qaytarmalıdır. Hazırkı kodda bug var: bütün funksiyalar eyni rəqəmi qaytarır.\n\nBugı tap və düzəlt.\n\n```js\nmakeGetters(3).map((g) => g());   // [0, 1, 2] olmalıdır\n```',
      en: '`makeGetters(n)` should return an array of `n` functions; the `i`-th function should return `i`. The current code has a bug: all the functions return the same number.\n\nFind the bug and fix it.\n\n```js\nmakeGetters(3).map((g) => g());   // should be [0, 1, 2]\n```',
      ru: '`makeGetters(n)` должна возвращать массив из `n` функций; `i`-я функция должна возвращать `i`. В текущем коде баг: все функции возвращают одно и то же число.\n\nНайди и исправь баг.\n\n```js\nmakeGetters(3).map((g) => g());   // должно быть [0, 1, 2]\n```'
    },
    hint: {
      az: '`var i` bütün funksiya üçün tək dəyişəndir. `let` isə dövrün hər iterasiyası üçün yeni dəyişən yaradır (5-ci və 7-ci fəsillər).',
      en: '`var i` is a single variable for the whole function. `let`, on the other hand, creates a new variable for every loop iteration (Chapters 5 and 7).',
      ru: '`var i` — одна переменная на всю функцию. А `let` создаёт новую переменную на каждой итерации цикла (главы 5 и 7).'
    },
    starter: 'function makeGetters(n) {\n  var getters = [];\n  for (var i = 0; i < n; i++) {\n    getters.push(function () {\n      return i;\n    });\n  }\n  return getters;\n}\n',
    solution: 'function makeGetters(n) {\n  const getters = [];\n  for (let i = 0; i < n; i++) {\n    getters.push(() => i);\n  }\n  return getters;\n}\n',
    tests: [
      { call: 'makeGetters(3).map((g) => g())', expect: [0, 1, 2] },
      { call: 'makeGetters(5)[4]()', expect: 4 },
      { call: 'makeGetters(0).length', expect: 0 }
    ]
  },
  {
    id: 'memoize',
    topic: 'scope',
    lvl: 'm',
    title: { az: 'Memoizasiya', en: 'Memoization', ru: 'Мемоизация' },
    desc: {
      az: '`memoize(fn)` funksiyasını yaz. Qaytarılan funksiya eyni arqumentlərlə ikinci dəfə çağırılanda `fn`-i yenidən çağırmamalı, nəticəni keşdən qaytarmalıdır.\n\nArqumentlər bir neçə ola bilər: `add(1, 2)` və `add(2, 1)` fərqli çağırışlardır.\n\n```js\nconst slowSquare = (x) => { /* bahalı hesablama */ return x * x; };\nconst fast = memoize(slowSquare);\nfast(4);   // hesablayır\nfast(4);   // keşdən\n```',
      en: 'Write a `memoize(fn)` function. When the returned function is called a second time with the same arguments, it must not call `fn` again but return the result from the cache.\n\nThere may be several arguments: `add(1, 2)` and `add(2, 1)` are different calls.\n\n```js\nconst slowSquare = (x) => { /* expensive work */ return x * x; };\nconst fast = memoize(slowSquare);\nfast(4);   // computes\nfast(4);   // from the cache\n```',
      ru: 'Напиши функцию `memoize(fn)`. Когда возвращаемую функцию вызывают повторно с теми же аргументами, она не должна снова вызывать `fn`, а должна вернуть результат из кэша.\n\nАргументов может быть несколько: `add(1, 2)` и `add(2, 1)` — разные вызовы.\n\n```js\nconst slowSquare = (x) => { /* дорогие вычисления */ return x * x; };\nconst fast = memoize(slowSquare);\nfast(4);   // вычисляет\nfast(4);   // из кэша\n```'
    },
    hint: {
      az: 'Keşi `Map` kimi closure-da saxla. Açar üçün arqumentləri sətirə çevir, məsələn `JSON.stringify(args)`.',
      en: 'Keep the cache as a `Map` in the closure. For the key, turn the arguments into a string, for example `JSON.stringify(args)`.',
      ru: 'Храни кэш в замыкании как `Map`. Для ключа преврати аргументы в строку, например `JSON.stringify(args)`.'
    },
    starter: 'function memoize(fn) {\n  // your code\n}\n',
    solution: 'function memoize(fn) {\n  const cache = new Map();\n  return (...args) => {\n    const key = JSON.stringify(args);\n    if (!cache.has(key)) cache.set(key, fn(...args));\n    return cache.get(key);\n  };\n}\n',
    tests: [
      { call: '(() => { let calls = 0; const sq = memoize((x) => { calls++; return x * x; }); sq(4); sq(4); sq(5); return [sq(4), calls]; })()', expect: [16, 2] },
      { call: '(() => { let calls = 0; const add = memoize((a, b) => { calls++; return a + b; }); return [add(1, 2), add(1, 2), add(2, 1), calls]; })()', expect: [3, 3, 3, 2] },
      { call: '(() => { const a = memoize((x) => x + 1); const b = memoize((x) => x + 100); return [a(1), b(1)]; })()', expect: [2, 101] }
    ]
  },
  {
    id: 'account',
    topic: 'scope',
    lvl: 'm',
    title: { az: 'Bank hesabı modulu', en: 'A bank account module', ru: 'Модуль банковского счёта' },
    desc: {
      az: '`createAccount(initial)` modul fabrikini yaz. O, `deposit(amount)`, `withdraw(amount)` və `balance()` metodlarını qaytarır.\n\n- Balans çöldən birbaşa dəyişdirilə bilməməlidir.\n- `deposit` və `withdraw` müsbət olmayan məbləğ alanda `Error` atmalıdır.\n- `withdraw` balansdan çox məbləğ istəyəndə `Error` atmalıdır və balans dəyişməməlidir.\n- Qaytarılan obyektdə yalnız bu üç metod olmalıdır.',
      en: 'Write a `createAccount(initial)` module factory. It returns the methods `deposit(amount)`, `withdraw(amount)` and `balance()`.\n\n- The balance must not be changeable directly from outside.\n- `deposit` and `withdraw` must throw an `Error` when the amount isn\'t positive.\n- `withdraw` must throw an `Error` when asked for more than the balance, and the balance must not change.\n- The returned object must contain only these three methods.',
      ru: 'Напиши фабрику модуля `createAccount(initial)`. Она возвращает методы `deposit(amount)`, `withdraw(amount)` и `balance()`.\n\n- Баланс нельзя менять напрямую снаружи.\n- `deposit` и `withdraw` должны выбрасывать `Error`, если сумма не положительная.\n- `withdraw` должен выбрасывать `Error`, если запрошено больше баланса, и баланс не должен меняться.\n- В возвращаемом объекте должны быть только эти три метода.'
    },
    hint: {
      az: 'Bu, 8-ci fəsildəki klassik moduldur: gizli `let balance` və onu dəyişən funksiyalar. Yoxlamaları metodun əvvəlində apar və `throw new Error(...)` et.',
      en: 'This is the classic module from Chapter 8: a hidden `let balance` and functions that change it. Do the checks at the start of each method and `throw new Error(...)`.',
      ru: 'Это классический модуль из главы 8: скрытая `let balance` и функции, которые её меняют. Делай проверки в начале метода и `throw new Error(...)`.'
    },
    starter: 'function createAccount(initial = 0) {\n  // your code\n}\n',
    solution: 'function createAccount(initial = 0) {\n  let balance = initial;\n  const check = (amount) => {\n    if (!(amount > 0)) throw new Error(\'Amount must be positive\');\n  };\n  return {\n    deposit(amount) {\n      check(amount);\n      balance += amount;\n    },\n    withdraw(amount) {\n      check(amount);\n      if (amount > balance) throw new Error(\'Insufficient funds\');\n      balance -= amount;\n    },\n    balance: () => balance\n  };\n}\n',
    tests: [
      { call: '(() => { const a = createAccount(100); a.deposit(50); a.withdraw(30); return a.balance(); })()', expect: 120 },
      { call: '(() => { const a = createAccount(10); a.withdraw(50); })()', throws: true },
      { call: '(() => { const a = createAccount(10); try { a.withdraw(50); } catch {} return a.balance(); })()', expect: 10 },
      { call: '(() => { const a = createAccount(10); a.deposit(-5); })()', throws: true },
      { call: 'Object.keys(createAccount(0)).sort()', expect: ['balance', 'deposit', 'withdraw'] }
    ]
  },

  {
    id: 'cart-total',
    topic: 'arrays',
    lvl: 'j',
    title: { az: 'Səbətin cəmi', en: 'Cart total', ru: 'Сумма корзины' },
    desc: {
      az: '`cartTotal(items)` səbətdəki məhsulların ümumi qiymətini qaytarmalıdır. Hər məhsul `{ price, qty }` obyektidir. Nəticəni 2 onluq rəqəmə yuvarlaqla (rəqəm kimi qaytar).\n\n```js\ncartTotal([{ price: 9.99, qty: 2 }, { price: 5, qty: 1 }]);   // 24.98\ncartTotal([]);   // 0\n```',
      en: '`cartTotal(items)` should return the total price of the products in a cart. Each product is a `{ price, qty }` object. Round the result to 2 decimal places (return it as a number).\n\n```js\ncartTotal([{ price: 9.99, qty: 2 }, { price: 5, qty: 1 }]);   // 24.98\ncartTotal([]);   // 0\n```',
      ru: '`cartTotal(items)` должна возвращать общую стоимость товаров в корзине. Каждый товар — объект `{ price, qty }`. Округли результат до 2 знаков после запятой (верни число).\n\n```js\ncartTotal([{ price: 9.99, qty: 2 }, { price: 5, qty: 1 }]);   // 24.98\ncartTotal([]);   // 0\n```'
    },
    hint: {
      az: '`reduce` ilə başlanğıc dəyəri `0` olan cəm tap. Yuvarlaqlaşdırma: `Math.round(x * 100) / 100`.',
      en: 'Use `reduce` with a starting value of `0`. Rounding: `Math.round(x * 100) / 100`.',
      ru: 'Используй `reduce` с начальным значением `0`. Округление: `Math.round(x * 100) / 100`.'
    },
    starter: 'function cartTotal(items) {\n  // your code\n}\n',
    solution: 'function cartTotal(items) {\n  const sum = items.reduce((total, item) => total + item.price * item.qty, 0);\n  return Math.round(sum * 100) / 100;\n}\n',
    tests: [
      { call: 'cartTotal([{ price: 9.99, qty: 2 }, { price: 5, qty: 1 }])', expect: 24.98 },
      { call: 'cartTotal([])', expect: 0 },
      { call: 'cartTotal([{ price: 0.1, qty: 3 }])', expect: 0.3 }
    ]
  },
  {
    id: 'group-by',
    topic: 'arrays',
    lvl: 'j',
    title: { az: 'Qruplaşdırma', en: 'Group by', ru: 'Группировка' },
    desc: {
      az: '`groupBy(list, keyFn)` massivin elementlərini `keyFn(element)`-in qaytardığı açara görə qruplaşdırmalıdır. Nəticə obyektdir: açar → həmin açara düşən elementlərin massivi (ilkin sıra ilə).\n\n```js\ngroupBy([1, 2, 3, 4], (n) => (n % 2 ? \'odd\' : \'even\'));\n// { odd: [1, 3], even: [2, 4] }\n```',
      en: '`groupBy(list, keyFn)` should group the array\'s elements by the key returned by `keyFn(element)`. The result is an object: key → the array of elements with that key (in their original order).\n\n```js\ngroupBy([1, 2, 3, 4], (n) => (n % 2 ? \'odd\' : \'even\'));\n// { odd: [1, 3], even: [2, 4] }\n```',
      ru: '`groupBy(list, keyFn)` должна группировать элементы массива по ключу, который возвращает `keyFn(element)`. Результат — объект: ключ → массив элементов с этим ключом (в исходном порядке).\n\n```js\ngroupBy([1, 2, 3, 4], (n) => (n % 2 ? \'odd\' : \'even\'));\n// { odd: [1, 3], even: [2, 4] }\n```'
    },
    hint: {
      az: '`reduce` ilə boş obyektdən başla. Açar hələ yoxdursa, `acc[key] = []` yarat, sonra `push` et.',
      en: 'Start from an empty object with `reduce`. If the key doesn\'t exist yet, create `acc[key] = []`, then `push`.',
      ru: 'Начни с пустого объекта в `reduce`. Если ключа ещё нет, создай `acc[key] = []`, затем сделай `push`.'
    },
    starter: 'function groupBy(list, keyFn) {\n  // your code\n}\n',
    solution: 'function groupBy(list, keyFn) {\n  return list.reduce((acc, item) => {\n    const key = keyFn(item);\n    (acc[key] ??= []).push(item);\n    return acc;\n  }, {});\n}\n',
    tests: [
      { call: "groupBy([1, 2, 3, 4], (n) => (n % 2 ? 'odd' : 'even'))", expect: { odd: [1, 3], even: [2, 4] } },
      { call: "groupBy([{ n: 'Ann', city: 'Baku' }, { n: 'Bob', city: 'Ganja' }, { n: 'Cem', city: 'Baku' }], (u) => u.city)", expect: { Baku: [{ n: 'Ann', city: 'Baku' }, { n: 'Cem', city: 'Baku' }], Ganja: [{ n: 'Bob', city: 'Ganja' }] } },
      { call: 'groupBy([], (x) => x)', expect: {} }
    ]
  },
  {
    id: 'unique-by',
    topic: 'arrays',
    lvl: 'j',
    title: { az: 'Təkrarları silmək', en: 'Remove duplicates', ru: 'Удаление дубликатов' },
    desc: {
      az: '`uniqueBy(list, key)` eyni `key` xassəsinə malik elementlərdən yalnız **birincisini** saxlamalı və ilkin sıranı qorumalıdır. İlkin massiv dəyişməməlidir.\n\n```js\nuniqueBy([{ id: 1, v: \'a\' }, { id: 2, v: \'b\' }, { id: 1, v: \'c\' }], \'id\');\n// [{ id: 1, v: \'a\' }, { id: 2, v: \'b\' }]\n```\n\nPraktikada: səhifələmə ilə yüklənən siyahıda eyni elementin iki dəfə görünməsinin qarşısını almaq.',
      en: '`uniqueBy(list, key)` should keep only the **first** of the elements that share the same `key` property and preserve the original order. The original array must not change.\n\n```js\nuniqueBy([{ id: 1, v: \'a\' }, { id: 2, v: \'b\' }, { id: 1, v: \'c\' }], \'id\');\n// [{ id: 1, v: \'a\' }, { id: 2, v: \'b\' }]\n```\n\nIn practice: preventing the same item from appearing twice in a paginated list.',
      ru: '`uniqueBy(list, key)` должна оставить только **первый** из элементов с одинаковым свойством `key` и сохранить исходный порядок. Исходный массив не должен меняться.\n\n```js\nuniqueBy([{ id: 1, v: \'a\' }, { id: 2, v: \'b\' }, { id: 1, v: \'c\' }], \'id\');\n// [{ id: 1, v: \'a\' }, { id: 2, v: \'b\' }]\n```\n\nНа практике: чтобы один и тот же элемент не появлялся дважды в списке с пагинацией.'
    },
    hint: {
      az: 'Görülmüş açarları `Set`-də saxla və `filter` ilə yalnız yeni açarlı elementləri buraxıb keç.',
      en: 'Keep the keys you have seen in a `Set` and let only elements with new keys through `filter`.',
      ru: 'Храни уже встреченные ключи в `Set` и пропускай через `filter` только элементы с новыми ключами.'
    },
    starter: 'function uniqueBy(list, key) {\n  // your code\n}\n',
    solution: 'function uniqueBy(list, key) {\n  const seen = new Set();\n  return list.filter((item) => {\n    if (seen.has(item[key])) return false;\n    seen.add(item[key]);\n    return true;\n  });\n}\n',
    tests: [
      { call: "uniqueBy([{ id: 1, v: 'a' }, { id: 2, v: 'b' }, { id: 1, v: 'c' }], 'id')", expect: [{ id: 1, v: 'a' }, { id: 2, v: 'b' }] },
      { call: "(() => { const list = [{ id: 1 }, { id: 1 }]; uniqueBy(list, 'id'); return list.length; })()", expect: 2 },
      { call: "uniqueBy([], 'id')", expect: [] }
    ]
  },
  {
    id: 'chunk',
    topic: 'arrays',
    lvl: 'j',
    title: { az: 'Hissələrə bölmək', en: 'Split into chunks', ru: 'Разбиение на части' },
    desc: {
      az: '`chunk(list, size)` massivi `size` ölçülü hissələrə bölməlidir. Sonuncu hissə daha qısa ola bilər. `size` 1-dən kiçikdirsə, boş massiv qaytar.\n\n```js\nchunk([1, 2, 3, 4, 5], 2);   // [[1, 2], [3, 4], [5]]\n```\n\nPraktikada: kartları sətirlərə düzmək, sorğuları paketlərlə göndərmək.',
      en: '`chunk(list, size)` should split the array into chunks of `size` elements. The last chunk may be shorter. If `size` is less than 1, return an empty array.\n\n```js\nchunk([1, 2, 3, 4, 5], 2);   // [[1, 2], [3, 4], [5]]\n```\n\nIn practice: laying out cards in rows, sending requests in batches.',
      ru: '`chunk(list, size)` должна разбить массив на части по `size` элементов. Последняя часть может быть короче. Если `size` меньше 1, верни пустой массив.\n\n```js\nchunk([1, 2, 3, 4, 5], 2);   // [[1, 2], [3, 4], [5]]\n```\n\nНа практике: раскладка карточек по строкам, отправка запросов пачками.'
    },
    hint: {
      az: '`for (let i = 0; i < list.length; i += size)` dövrü və `list.slice(i, i + size)` kifayətdir.',
      en: 'A `for (let i = 0; i < list.length; i += size)` loop and `list.slice(i, i + size)` are enough.',
      ru: 'Достаточно цикла `for (let i = 0; i < list.length; i += size)` и `list.slice(i, i + size)`.'
    },
    starter: 'function chunk(list, size) {\n  // your code\n}\n',
    solution: 'function chunk(list, size) {\n  if (size < 1) return [];\n  const out = [];\n  for (let i = 0; i < list.length; i += size) {\n    out.push(list.slice(i, i + size));\n  }\n  return out;\n}\n',
    tests: [
      { call: 'chunk([1, 2, 3, 4, 5], 2)', expect: [[1, 2], [3, 4], [5]] },
      { call: 'chunk([1, 2, 3], 5)', expect: [[1, 2, 3]] },
      { call: 'chunk([], 3)', expect: [] },
      { call: 'chunk([1, 2], 0)', expect: [] }
    ]
  },
  {
    id: 'leaderboard',
    topic: 'arrays',
    lvl: 'm',
    title: { az: 'Liderlər cədvəli', en: 'Leaderboard', ru: 'Таблица лидеров' },
    desc: {
      az: '`topPlayers(players, n)` ən yüksək `score`-u olan `n` oyunçunun **adlarını** qaytarmalıdır. Xal azalan sıra ilə; xallar bərabərdirsə, adlar əlifba sırası ilə. İlkin massiv dəyişməməlidir.\n\n```js\ntopPlayers([\n  { name: \'Leyla\', score: 90 },\n  { name: \'Anar\', score: 95 },\n  { name: \'Elvin\', score: 90 }\n], 2);\n// [\'Anar\', \'Elvin\']\n```',
      en: '`topPlayers(players, n)` should return the **names** of the `n` players with the highest `score`. Scores in descending order; if scores are equal, names in alphabetical order. The original array must not change.\n\n```js\ntopPlayers([\n  { name: \'Leyla\', score: 90 },\n  { name: \'Anar\', score: 95 },\n  { name: \'Elvin\', score: 90 }\n], 2);\n// [\'Anar\', \'Elvin\']\n```',
      ru: '`topPlayers(players, n)` должна вернуть **имена** `n` игроков с наибольшим `score`. Очки по убыванию; при равных очках — имена по алфавиту. Исходный массив не должен меняться.\n\n```js\ntopPlayers([\n  { name: \'Leyla\', score: 90 },\n  { name: \'Anar\', score: 95 },\n  { name: \'Elvin\', score: 90 }\n], 2);\n// [\'Anar\', \'Elvin\']\n```'
    },
    hint: {
      az: '`sort` massivi yerində dəyişir — əvvəl surət çıxar (`[...players]`). Müqayisə: `b.score - a.score || a.name.localeCompare(b.name)`.',
      en: '`sort` mutates the array in place — copy it first (`[...players]`). Comparison: `b.score - a.score || a.name.localeCompare(b.name)`.',
      ru: '`sort` меняет массив на месте — сначала сделай копию (`[...players]`). Сравнение: `b.score - a.score || a.name.localeCompare(b.name)`.'
    },
    starter: 'function topPlayers(players, n) {\n  // your code\n}\n',
    solution: 'function topPlayers(players, n) {\n  return [...players]\n    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))\n    .slice(0, n)\n    .map((p) => p.name);\n}\n',
    tests: [
      { call: "topPlayers([{ name: 'Leyla', score: 90 }, { name: 'Anar', score: 95 }, { name: 'Elvin', score: 90 }], 2)", expect: ['Anar', 'Elvin'] },
      { call: "(() => { const p = [{ name: 'B', score: 1 }, { name: 'A', score: 2 }]; topPlayers(p, 1); return p[0].name; })()", expect: 'B' },
      { call: "topPlayers([{ name: 'A', score: 1 }], 5)", expect: ['A'] }
    ]
  },

  {
    id: 'set-in',
    topic: 'objects',
    lvl: 'm',
    title: { az: 'İç-içə state-i yeniləmək', en: 'Updating nested state', ru: 'Обновление вложенного state' },
    desc: {
      az: '`setIn(obj, path, value)` `path` massivi ilə göstərilən iç-içə xassəni yeni dəyərlə əvəz edən **yeni** obyekt qaytarmalıdır. İlkin obyekt dəyişməməlidir. Yolda olmayan obyektlər yaradılmalıdır. Dəyişməyən qollar köhnə istinadı saxlamalıdır — React bununla nəyin dəyişdiyini tez tapır.\n\n```js\nconst s = { user: { name: \'Aysel\' }, cart: { items: [] } };\nconst n = setIn(s, [\'user\', \'name\'], \'Leyla\');\nn.user.name;           // \'Leyla\'\ns.user.name;           // \'Aysel\'\nn.cart === s.cart;     // true\n```',
      en: '`setIn(obj, path, value)` should return a **new** object in which the nested property given by the `path` array is replaced with the new value. The original object must not change. Objects missing along the path must be created. Unchanged branches must keep the old reference — that\'s how React quickly finds what changed.\n\n```js\nconst s = { user: { name: \'Aysel\' }, cart: { items: [] } };\nconst n = setIn(s, [\'user\', \'name\'], \'Leyla\');\nn.user.name;           // \'Leyla\'\ns.user.name;           // \'Aysel\'\nn.cart === s.cart;     // true\n```',
      ru: '`setIn(obj, path, value)` должна вернуть **новый** объект, в котором вложенное свойство, заданное массивом `path`, заменено новым значением. Исходный объект не должен меняться. Отсутствующие по пути объекты нужно создать. Неизменённые ветки должны сохранять старые ссылки — так React быстро находит, что изменилось.\n\n```js\nconst s = { user: { name: \'Aysel\' }, cart: { items: [] } };\nconst n = setIn(s, [\'user\', \'name\'], \'Leyla\');\nn.user.name;           // \'Leyla\'\ns.user.name;           // \'Aysel\'\nn.cart === s.cart;     // true\n```'
    },
    hint: {
      az: 'Rekursiya: `path` boşdursa `value` qaytar; əks halda `{ ...obj, [head]: setIn(obj?.[head] ?? {}, rest, value) }`.',
      en: 'Recursion: if `path` is empty, return `value`; otherwise `{ ...obj, [head]: setIn(obj?.[head] ?? {}, rest, value) }`.',
      ru: 'Рекурсия: если `path` пуст, верни `value`; иначе `{ ...obj, [head]: setIn(obj?.[head] ?? {}, rest, value) }`.'
    },
    starter: 'function setIn(obj, path, value) {\n  // your code\n}\n',
    solution: 'function setIn(obj, path, value) {\n  if (path.length === 0) return value;\n  const [head, ...rest] = path;\n  return { ...obj, [head]: setIn(obj?.[head] ?? {}, rest, value) };\n}\n',
    tests: [
      { call: "(() => { const s = { a: { b: 1 }, c: { d: 2 } }; const n = setIn(s, ['a', 'b'], 5); return [n.a.b, s.a.b, n.c === s.c, n !== s]; })()", expect: [5, 1, true, true] },
      { call: "setIn({}, ['x', 'y'], 1)", expect: { x: { y: 1 } } },
      { call: "setIn({ a: 1 }, ['b'], 2)", expect: { a: 1, b: 2 } }
    ]
  },
  {
    id: 'deep-equal',
    topic: 'objects',
    lvl: 'm',
    title: { az: 'Dərin müqayisə', en: 'Deep equality', ru: 'Глубокое сравнение' },
    desc: {
      az: '`deepEqual(a, b)` iki dəyəri struktur baxımından müqayisə etməlidir: primitivlər `===` ilə, massivlər və adi obyektlər isə bütün açarları və iç-içə dəyərləri eyni olduqda bərabərdir.\n\n```js\ndeepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] });   // true\ndeepEqual([1, 2], { 0: 1, 1: 2 });                       // false\n```',
      en: '`deepEqual(a, b)` should compare two values structurally: primitives with `===`, while arrays and plain objects are equal when all their keys and nested values are the same.\n\n```js\ndeepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] });   // true\ndeepEqual([1, 2], { 0: 1, 1: 2 });                       // false\n```',
      ru: '`deepEqual(a, b)` должна сравнивать два значения структурно: примитивы через `===`, а массивы и обычные объекты равны, когда совпадают все их ключи и вложенные значения.\n\n```js\ndeepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] });   // true\ndeepEqual([1, 2], { 0: 1, 1: 2 });                       // false\n```'
    },
    hint: {
      az: 'Əvvəl `a === b` yoxla. Sonra ikisinin də obyekt olduğunu, `Array.isArray` nəticələrinin eyni olduğunu və açar saylarının bərabərliyini yoxla, hər açar üçün rekursiv çağır.',
      en: 'First check `a === b`. Then check that both are objects, that their `Array.isArray` results match and that they have the same number of keys, and recurse for every key.',
      ru: 'Сначала проверь `a === b`. Затем — что оба являются объектами, что результаты `Array.isArray` совпадают и число ключей одинаково, и рекурсивно сравни каждый ключ.'
    },
    starter: 'function deepEqual(a, b) {\n  // your code\n}\n',
    solution: "function deepEqual(a, b) {\n  if (a === b) return true;\n  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;\n  if (Array.isArray(a) !== Array.isArray(b)) return false;\n  const keys = Object.keys(a);\n  if (keys.length !== Object.keys(b).length) return false;\n  return keys.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k]));\n}\n",
    tests: [
      { call: 'deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })', expect: true },
      { call: 'deepEqual([1, 2], { 0: 1, 1: 2 })', expect: false },
      { call: 'deepEqual({ a: 1 }, { a: 1, b: undefined })', expect: false },
      { call: 'deepEqual(null, {})', expect: false },
      { call: "deepEqual('x', 'x')", expect: true }
    ]
  },
  {
    id: 'omit',
    topic: 'objects',
    lvl: 'j',
    title: { az: 'Xassələri çıxarmaq', en: 'Omit properties', ru: 'Исключение свойств' },
    desc: {
      az: '`omit(obj, keys)` `keys` massivindəki xassələr olmadan **yeni** obyekt qaytarmalıdır. İlkin obyekt dəyişməməlidir.\n\n```js\nomit({ id: 1, password: \'x\', name: \'Anar\' }, [\'password\']);\n// { id: 1, name: \'Anar\' }\n```\n\nPraktikada: formu serverə göndərməzdən əvvəl lazımsız sahələri atmaq.',
      en: '`omit(obj, keys)` should return a **new** object without the properties listed in `keys`. The original object must not change.\n\n```js\nomit({ id: 1, password: \'x\', name: \'Anar\' }, [\'password\']);\n// { id: 1, name: \'Anar\' }\n```\n\nIn practice: dropping unneeded fields before sending a form to the server.',
      ru: '`omit(obj, keys)` должна вернуть **новый** объект без свойств из массива `keys`. Исходный объект не должен меняться.\n\n```js\nomit({ id: 1, password: \'x\', name: \'Anar\' }, [\'password\']);\n// { id: 1, name: \'Anar\' }\n```\n\nНа практике: убрать лишние поля перед отправкой формы на сервер.'
    },
    hint: {
      az: '`Object.entries(obj)`, `filter` və `Object.fromEntries` üçlüyü.',
      en: 'The `Object.entries(obj)`, `filter` and `Object.fromEntries` trio.',
      ru: 'Связка `Object.entries(obj)`, `filter` и `Object.fromEntries`.'
    },
    starter: 'function omit(obj, keys) {\n  // your code\n}\n',
    solution: 'function omit(obj, keys) {\n  return Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));\n}\n',
    tests: [
      { call: "omit({ id: 1, password: 'x', name: 'Anar' }, ['password'])", expect: { id: 1, name: 'Anar' } },
      { call: "(() => { const o = { a: 1, b: 2 }; omit(o, ['a']); return o; })()", expect: { a: 1, b: 2 } },
      { call: "omit({ a: 1 }, ['z'])", expect: { a: 1 } }
    ]
  },
  {
    id: 'todo-reducer',
    topic: 'objects',
    lvl: 'm',
    title: { az: 'Todo reducer', en: 'A todo reducer', ru: 'Редьюсер задач' },
    desc: {
      az: '`todosReducer(state, action)` yaz. `state` — `{ id, text, done }` obyektlərindən ibarət massivdir. Action-lar:\n\n- `{ type: \'add\', id, text }` — sona `done: false` ilə yeni todo əlavə edir;\n- `{ type: \'toggle\', id }` — həmin todonun `done` dəyərini tərsinə çevirir;\n- `{ type: \'remove\', id }` — todonu silir;\n- naməlum action — state-i olduğu kimi (eyni istinadla) qaytarır.\n\nState heç vaxt yerində dəyişdirilməməlidir.',
      en: 'Write `todosReducer(state, action)`. `state` is an array of `{ id, text, done }` objects. Actions:\n\n- `{ type: \'add\', id, text }` — appends a new todo with `done: false`;\n- `{ type: \'toggle\', id }` — flips that todo\'s `done` value;\n- `{ type: \'remove\', id }` — removes the todo;\n- an unknown action — returns the state as it is (the same reference).\n\nThe state must never be mutated in place.',
      ru: 'Напиши `todosReducer(state, action)`. `state` — массив объектов `{ id, text, done }`. Действия:\n\n- `{ type: \'add\', id, text }` — добавляет в конец новую задачу с `done: false`;\n- `{ type: \'toggle\', id }` — инвертирует `done` у этой задачи;\n- `{ type: \'remove\', id }` — удаляет задачу;\n- неизвестное действие — возвращает state как есть (ту же ссылку).\n\nState нельзя менять на месте.'
    },
    hint: {
      az: '`switch (action.type)`: add üçün `[...state, item]`, toggle üçün `map` və `{ ...t, done: !t.done }`, remove üçün `filter`.',
      en: '`switch (action.type)`: `[...state, item]` for add, `map` with `{ ...t, done: !t.done }` for toggle, `filter` for remove.',
      ru: '`switch (action.type)`: для add — `[...state, item]`, для toggle — `map` и `{ ...t, done: !t.done }`, для remove — `filter`.'
    },
    starter: 'function todosReducer(state, action) {\n  // your code\n}\n',
    solution: "function todosReducer(state, action) {\n  switch (action.type) {\n    case 'add':\n      return [...state, { id: action.id, text: action.text, done: false }];\n    case 'toggle':\n      return state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));\n    case 'remove':\n      return state.filter((t) => t.id !== action.id);\n    default:\n      return state;\n  }\n}\n",
    tests: [
      { call: "todosReducer([], { type: 'add', id: 1, text: 'Read' })", expect: [{ id: 1, text: 'Read', done: false }] },
      { call: "todosReducer([{ id: 1, text: 'a', done: false }], { type: 'toggle', id: 1 })", expect: [{ id: 1, text: 'a', done: true }] },
      { call: "(() => { const s = [{ id: 1, text: 'a', done: false }]; todosReducer(s, { type: 'toggle', id: 1 }); return s[0].done; })()", expect: false },
      { call: "todosReducer([{ id: 1, text: 'a', done: false }, { id: 2, text: 'b', done: false }], { type: 'remove', id: 1 })", expect: [{ id: 2, text: 'b', done: false }] },
      { call: "(() => { const s = []; return todosReducer(s, { type: 'nope' }) === s; })()", expect: true }
    ]
  },

  {
    id: 'debounce',
    topic: 'functions',
    lvl: 'm',
    title: { az: 'Debounce', en: 'Debounce', ru: 'Debounce' },
    desc: {
      az: '`debounce(fn, ms)` yaz. Qaytarılan funksiya çağırılanda `fn` dərhal işləmir: son çağırışdan `ms` millisaniyə keçəndən sonra, **son** çağırışın arqumentləri ilə yalnız bir dəfə işləyir.\n\n```js\nconst search = debounce((q) => fetchResults(q), 300);\nsearch(\'r\'); search(\'re\'); search(\'rea\');\n// 300 ms sonra yalnız fetchResults(\'rea\')\n```',
      en: 'Write `debounce(fn, ms)`. When the returned function is called, `fn` doesn\'t run right away: it runs only once, `ms` milliseconds after the last call, with the arguments of the **last** call.\n\n```js\nconst search = debounce((q) => fetchResults(q), 300);\nsearch(\'r\'); search(\'re\'); search(\'rea\');\n// after 300 ms, only fetchResults(\'rea\')\n```',
      ru: 'Напиши `debounce(fn, ms)`. При вызове возвращаемой функции `fn` не выполняется сразу: она срабатывает один раз, через `ms` миллисекунд после последнего вызова, с аргументами **последнего** вызова.\n\n```js\nconst search = debounce((q) => fetchResults(q), 300);\nsearch(\'r\'); search(\'re\'); search(\'rea\');\n// через 300 мс — только fetchResults(\'rea\')\n```'
    },
    hint: {
      az: 'Taymerin id-sini closure-da saxla. Hər çağırışda `clearTimeout(timer)`, sonra yeni `setTimeout`.',
      en: 'Keep the timer id in the closure. On every call, `clearTimeout(timer)`, then a new `setTimeout`.',
      ru: 'Храни id таймера в замыкании. При каждом вызове — `clearTimeout(timer)`, затем новый `setTimeout`.'
    },
    starter: 'function debounce(fn, ms) {\n  // your code\n}\n',
    solution: 'function debounce(fn, ms) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n}\n',
    tests: [
      { call: '(async () => { let n = 0; const d = debounce(() => n++, 30); d(); d(); d(); await new Promise((r) => setTimeout(r, 80)); return n; })()', expect: 1 },
      { call: '(async () => { let v; const d = debounce((x) => { v = x; }, 20); d(1); d(2); d(3); await new Promise((r) => setTimeout(r, 60)); return v; })()', expect: 3 },
      { call: '(async () => { let n = 0; const d = debounce(() => n++, 20); d(); return n; })()', expect: 0 }
    ]
  },
  {
    id: 'curry',
    topic: 'functions',
    lvl: 'm',
    title: { az: 'Currying', en: 'Currying', ru: 'Каррирование' },
    desc: {
      az: '`curry(fn)` yaz. Qaytarılan funksiya arqumentləri istənilən qruplarla qəbul etməlidir; `fn.length` qədər arqument toplananda `fn` çağırılır.\n\n```js\nconst add3 = curry((a, b, c) => a + b + c);\nadd3(1)(2)(3);   // 6\nadd3(1, 2)(3);   // 6\nadd3(1)(2, 3);   // 6\n```',
      en: 'Write `curry(fn)`. The returned function should accept arguments in any grouping; once `fn.length` arguments have been collected, `fn` is called.\n\n```js\nconst add3 = curry((a, b, c) => a + b + c);\nadd3(1)(2)(3);   // 6\nadd3(1, 2)(3);   // 6\nadd3(1)(2, 3);   // 6\n```',
      ru: 'Напиши `curry(fn)`. Возвращаемая функция должна принимать аргументы любыми группами; когда набрано `fn.length` аргументов, вызывается `fn`.\n\n```js\nconst add3 = curry((a, b, c) => a + b + c);\nadd3(1)(2)(3);   // 6\nadd3(1, 2)(3);   // 6\nadd3(1)(2, 3);   // 6\n```'
    },
    hint: {
      az: 'Daxili `collect(...args)` funksiyası: `args.length >= fn.length` olarsa `fn(...args)` qaytar, əks halda `(...more) => collect(...args, ...more)`.',
      en: 'An inner `collect(...args)` function: if `args.length >= fn.length`, return `fn(...args)`; otherwise `(...more) => collect(...args, ...more)`.',
      ru: 'Внутренняя функция `collect(...args)`: если `args.length >= fn.length`, верни `fn(...args)`, иначе — `(...more) => collect(...args, ...more)`.'
    },
    starter: 'function curry(fn) {\n  // your code\n}\n',
    solution: 'function curry(fn) {\n  const collect = (...args) =>\n    args.length >= fn.length ? fn(...args) : (...more) => collect(...args, ...more);\n  return collect;\n}\n',
    tests: [
      { call: 'curry((a, b, c) => a + b + c)(1)(2)(3)', expect: 6 },
      { call: 'curry((a, b, c) => a + b + c)(1, 2)(3)', expect: 6 },
      { call: 'curry((a, b, c) => a + b + c)(1)(2, 3)', expect: 6 },
      { call: "(() => { const greet = curry((g, name) => g + ', ' + name); const hi = greet('Hi'); return [hi('Ann'), hi('Bob')]; })()", expect: ['Hi, Ann', 'Hi, Bob'] }
    ]
  },
  {
    id: 'pipe',
    topic: 'functions',
    lvl: 'j',
    title: { az: 'Pipe', en: 'Pipe', ru: 'Pipe' },
    desc: {
      az: '`pipe(...fns)` funksiyaları soldan sağa birləşdirən yeni funksiya qaytarmalıdır: birincinin nəticəsi ikinciyə ötürülür və s. Funksiya verilməyibsə, dəyəri olduğu kimi qaytarsın.\n\n```js\nconst slug = pipe((s) => s.trim(), (s) => s.toLowerCase(), (s) => s.replaceAll(\' \', \'-\'));\nslug(\'  Hello World \');   // \'hello-world\'\n```',
      en: '`pipe(...fns)` should return a new function that chains the functions from left to right: the first one\'s result is passed to the second, and so on. If no functions are given, it returns the value as is.\n\n```js\nconst slug = pipe((s) => s.trim(), (s) => s.toLowerCase(), (s) => s.replaceAll(\' \', \'-\'));\nslug(\'  Hello World \');   // \'hello-world\'\n```',
      ru: '`pipe(...fns)` должна вернуть новую функцию, которая соединяет функции слева направо: результат первой передаётся во вторую и так далее. Если функции не переданы, значение возвращается как есть.\n\n```js\nconst slug = pipe((s) => s.trim(), (s) => s.toLowerCase(), (s) => s.replaceAll(\' \', \'-\'));\nslug(\'  Hello World \');   // \'hello-world\'\n```'
    },
    hint: {
      az: '`(x) => fns.reduce((acc, fn) => fn(acc), x)` — bir sətir kifayətdir.',
      en: '`(x) => fns.reduce((acc, fn) => fn(acc), x)` — one line is enough.',
      ru: '`(x) => fns.reduce((acc, fn) => fn(acc), x)` — достаточно одной строки.'
    },
    starter: 'function pipe(...fns) {\n  // your code\n}\n',
    solution: 'function pipe(...fns) {\n  return (x) => fns.reduce((acc, fn) => fn(acc), x);\n}\n',
    tests: [
      { call: "pipe((s) => s.trim(), (s) => s.toLowerCase(), (s) => s.replaceAll(' ', '-'))('  Hello World ')", expect: 'hello-world' },
      { call: 'pipe((x) => x + 1, (x) => x * 2)(3)', expect: 8 },
      { call: 'pipe()(42)', expect: 42 }
    ]
  },

  {
    id: 'sleep',
    topic: 'async',
    lvl: 'j',
    title: { az: 'Gözləmə', en: 'Sleep', ru: 'Пауза' },
    desc: {
      az: '`sleep(ms)` `ms` millisaniyədən sonra resolve olan Promise qaytarmalıdır.\n\n```js\nawait sleep(500);\nconsole.log(\'yarım saniyə keçdi\');\n```',
      en: '`sleep(ms)` should return a Promise that resolves after `ms` milliseconds.\n\n```js\nawait sleep(500);\nconsole.log(\'half a second passed\');\n```',
      ru: '`sleep(ms)` должна возвращать Promise, который выполняется через `ms` миллисекунд.\n\n```js\nawait sleep(500);\nconsole.log(\'прошло полсекунды\');\n```'
    },
    hint: {
      az: '`new Promise((resolve) => setTimeout(resolve, ms))`.',
      en: '`new Promise((resolve) => setTimeout(resolve, ms))`.',
      ru: '`new Promise((resolve) => setTimeout(resolve, ms))`.'
    },
    starter: 'function sleep(ms) {\n  // your code\n}\n',
    solution: 'function sleep(ms) {\n  return new Promise((resolve) => setTimeout(resolve, ms));\n}\n',
    tests: [
      { call: 'sleep(10) instanceof Promise', expect: true },
      { call: '(async () => { const t = Date.now(); await sleep(50); return Date.now() - t >= 45; })()', expect: true },
      { call: '(async () => { let done = false; sleep(40).then(() => { done = true; }); await new Promise((r) => setTimeout(r, 5)); return done; })()', expect: false }
    ]
  },
  {
    id: 'with-timeout',
    topic: 'async',
    lvl: 'm',
    title: { az: 'Timeout ilə sorğu', en: 'A request with a timeout', ru: 'Запрос с таймаутом' },
    desc: {
      az: '`withTimeout(promise, ms)` yaz. `promise` `ms` millisaniyə ərzində bitərsə, onun nəticəsi ilə resolve (və ya xətası ilə reject) olmalıdır. Bitməzsə, mesajı `\'timeout\'` olan `Error` ilə reject olmalıdır.\n\n```js\nawait withTimeout(fetch(\'/api/slow\'), 3000);\n// 3 saniyədən çox çəkərsə: Error(\'timeout\')\n```',
      en: 'Write `withTimeout(promise, ms)`. If `promise` settles within `ms` milliseconds, it should resolve with its result (or reject with its error). Otherwise it should reject with an `Error` whose message is `\'timeout\'`.\n\n```js\nawait withTimeout(fetch(\'/api/slow\'), 3000);\n// if it takes more than 3 seconds: Error(\'timeout\')\n```',
      ru: 'Напиши `withTimeout(promise, ms)`. Если `promise` завершится за `ms` миллисекунд, результат должен выполниться с его значением (или отклониться с его ошибкой). Иначе — отклониться с `Error` с сообщением `\'timeout\'`.\n\n```js\nawait withTimeout(fetch(\'/api/slow\'), 3000);\n// если дольше 3 секунд: Error(\'timeout\')\n```'
    },
    hint: {
      az: '`Promise.race([promise, timer])` — burada `timer` `ms` sonra reject olan Promise-dir.',
      en: '`Promise.race([promise, timer])` — where `timer` is a Promise that rejects after `ms`.',
      ru: '`Promise.race([promise, timer])`, где `timer` — Promise, который отклоняется через `ms`.'
    },
    starter: 'function withTimeout(promise, ms) {\n  // your code\n}\n',
    solution: "function withTimeout(promise, ms) {\n  const timer = new Promise((_, reject) =>\n    setTimeout(() => reject(new Error('timeout')), ms)\n  );\n  return Promise.race([promise, timer]);\n}\n",
    tests: [
      { call: 'withTimeout(Promise.resolve(7), 50)', expect: 7 },
      { call: "(async () => { try { await withTimeout(new Promise((r) => setTimeout(r, 200)), 20); return 'no error'; } catch (e) { return e.message; } })()", expect: 'timeout' },
      { call: "(async () => { try { await withTimeout(Promise.reject(new Error('boom')), 50); } catch (e) { return e.message; } })()", expect: 'boom' }
    ]
  },
  {
    id: 'promise-all',
    topic: 'async',
    lvl: 'm',
    title: { az: 'Öz Promise.all-ın', en: 'Your own Promise.all', ru: 'Свой Promise.all' },
    desc: {
      az: '`promiseAll(items)` yaz — `Promise.all`-dan istifadə etmədən. O, nəticələri **ilkin sıra ilə** saxlayan massivlə resolve olmalıdır (hansı Promise-in əvvəl bitməsindən asılı olmayaraq). Biri reject olarsa, dərhal həmin xəta ilə reject olmalıdır. Massivdə adi dəyərlər də ola bilər. Boş massiv üçün `[]`.',
      en: 'Write `promiseAll(items)` — without using `Promise.all`. It should resolve with an array that keeps the results **in the original order** (regardless of which Promise finishes first). If one of them rejects, it should reject right away with that error. The array may also contain plain values. For an empty array: `[]`.',
      ru: 'Напиши `promiseAll(items)` — без использования `Promise.all`. Он должен выполниться массивом результатов **в исходном порядке** (независимо от того, какой Promise завершится первым). Если один из них отклонится, нужно сразу отклониться с этой ошибкой. В массиве могут быть и обычные значения. Для пустого массива — `[]`.'
    },
    hint: {
      az: '`new Promise` içində hər elementi `Promise.resolve(item)` ilə bük, nəticəni `results[i]`-yə yaz və bitənləri say; say massivin uzunluğuna çatanda resolve et.',
      en: 'Inside `new Promise`, wrap every element with `Promise.resolve(item)`, write the result to `results[i]` and count how many finished; resolve when the count reaches the array\'s length.',
      ru: 'Внутри `new Promise` оберни каждый элемент в `Promise.resolve(item)`, записывай результат в `results[i]` и считай завершённые; когда счётчик дойдёт до длины массива — resolve.'
    },
    starter: 'function promiseAll(items) {\n  // your code\n}\n',
    solution: 'function promiseAll(items) {\n  return new Promise((resolve, reject) => {\n    const results = [];\n    let left = items.length;\n    if (left === 0) return resolve(results);\n    items.forEach((item, i) => {\n      Promise.resolve(item).then((value) => {\n        results[i] = value;\n        if (--left === 0) resolve(results);\n      }, reject);\n    });\n  });\n}\n',
    tests: [
      { call: 'promiseAll([new Promise((r) => setTimeout(() => r(1), 40)), new Promise((r) => setTimeout(() => r(2), 10)), 3])', expect: [1, 2, 3] },
      { call: 'promiseAll([])', expect: [] },
      { call: "(async () => { try { await promiseAll([Promise.resolve(1), Promise.reject(new Error('fail'))]); } catch (e) { return e.message; } })()", expect: 'fail' },
      { call: "(() => { const orig = Promise.all; Promise.all = () => { throw new Error('Promise.all is not allowed'); }; try { return promiseAll([1, 2]); } finally { Promise.all = orig; } })()", expect: [1, 2] }
    ]
  },
  {
    id: 'retry',
    topic: 'async',
    lvl: 'm',
    title: { az: 'Yenidən cəhd', en: 'Retry', ru: 'Повторные попытки' },
    desc: {
      az: '`retry(fn, attempts)` yaz. `fn` async funksiyadır (Promise qaytarır). `retry` onu çağırır; uğursuz olarsa, ən çoxu `attempts` dəfə cəhd edir. Uğurlu cəhdin nəticəsini qaytarır; bütün cəhdlər uğursuz olarsa, **sonuncu** xətanı atır.\n\n```js\nconst data = await retry(() => fetchJson(\'/api/orders\'), 3);\n```',
      en: 'Write `retry(fn, attempts)`. `fn` is an async function (it returns a Promise). `retry` calls it and, if it fails, tries at most `attempts` times in total. It returns the result of the successful attempt; if every attempt fails, it throws the **last** error.\n\n```js\nconst data = await retry(() => fetchJson(\'/api/orders\'), 3);\n```',
      ru: 'Напиши `retry(fn, attempts)`. `fn` — async-функция (возвращает Promise). `retry` вызывает её и при неудаче делает не более `attempts` попыток всего. Возвращает результат успешной попытки; если все попытки неудачны — выбрасывает **последнюю** ошибку.\n\n```js\nconst data = await retry(() => fetchJson(\'/api/orders\'), 3);\n```'
    },
    hint: {
      az: '`async function` içində `for` dövrü və `try { return await fn(); } catch (e) { last = e; }`, dövrdən sonra `throw last`.',
      en: 'Inside an `async function`, a `for` loop with `try { return await fn(); } catch (e) { last = e; }`, and `throw last` after the loop.',
      ru: 'Внутри `async function` — цикл `for` с `try { return await fn(); } catch (e) { last = e; }`, а после цикла — `throw last`.'
    },
    starter: 'async function retry(fn, attempts) {\n  // your code\n}\n',
    solution: 'async function retry(fn, attempts) {\n  let last;\n  for (let i = 0; i < attempts; i++) {\n    try {\n      return await fn();\n    } catch (e) {\n      last = e;\n    }\n  }\n  throw last;\n}\n',
    tests: [
      { call: "(async () => { let n = 0; const r = await retry(async () => { n++; if (n < 3) throw new Error('no'); return 'ok'; }, 5); return [r, n]; })()", expect: ['ok', 3] },
      { call: "(async () => { let n = 0; try { await retry(async () => { n++; throw new Error('e' + n); }, 3); } catch (e) { return [e.message, n]; } })()", expect: ['e3', 3] },
      { call: "(async () => { let n = 0; await retry(async () => { n++; return 1; }, 4); return n; })()", expect: 1 }
    ]
  },

  {
    id: 'email',
    topic: 'strings',
    lvl: 'j',
    title: { az: 'E-poçt yoxlaması', en: 'Email check', ru: 'Проверка email' },
    desc: {
      az: '`isValidEmail(value)` sadə qaydalarla yoxlamalıdır:\n\n- kənardakı boşluqlar nəzərə alınmır;\n- tam olaraq bir `@` var;\n- `@`-dan əvvəl ən azı bir simvol var;\n- `@`-dan sonrakı hissədə nöqtə var, nöqtədən əvvəl və sonra ən azı bir simvol var;\n- daxildə boşluq yoxdur.\n\n```js\nisValidEmail(\'anar@mail.az\');   // true\nisValidEmail(\'anar@mail\');      // false\n```',
      en: '`isValidEmail(value)` should check with simple rules:\n\n- surrounding whitespace is ignored;\n- there is exactly one `@`;\n- there is at least one character before `@`;\n- the part after `@` contains a dot, with at least one character before and after it;\n- there are no spaces inside.\n\n```js\nisValidEmail(\'anar@mail.az\');   // true\nisValidEmail(\'anar@mail\');      // false\n```',
      ru: '`isValidEmail(value)` должна проверять по простым правилам:\n\n- пробелы по краям не учитываются;\n- ровно один символ `@`;\n- перед `@` есть хотя бы один символ;\n- в части после `@` есть точка, и до и после неё есть хотя бы по одному символу;\n- внутри нет пробелов.\n\n```js\nisValidEmail(\'anar@mail.az\');   // true\nisValidEmail(\'anar@mail\');      // false\n```'
    },
    hint: {
      az: 'Regex: `/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/` və `value.trim()`.',
      en: 'Regex: `/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/` and `value.trim()`.',
      ru: 'Регулярное выражение: `/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/` и `value.trim()`.'
    },
    starter: 'function isValidEmail(value) {\n  // your code\n}\n',
    solution: 'function isValidEmail(value) {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value.trim());\n}\n',
    tests: [
      { call: "isValidEmail('anar@mail.az')", expect: true },
      { call: "isValidEmail('  leyla.m@company.co.uk ')", expect: true },
      { call: "isValidEmail('anar@mail')", expect: false },
      { call: "isValidEmail('a@@b.com')", expect: false },
      { call: "isValidEmail('an ar@mail.az')", expect: false },
      { call: "isValidEmail('@mail.az')", expect: false }
    ]
  },
  {
    id: 'slugify',
    topic: 'strings',
    lvl: 'j',
    title: { az: 'URL üçün slug', en: 'A slug for URLs', ru: 'Slug для URL' },
    desc: {
      az: '`slugify(text)` mətni URL-ə yararlı hala salmalıdır: kiçik hərflər, latın hərfləri və rəqəmlərdən başqa hər şey `-` ilə əvəz olunur, ardıcıl `-`-lər birləşir, kənardakı `-`-lər silinir.\n\n```js\nslugify(\'  React & TypeScript: Guide! \');   // \'react-typescript-guide\'\n```',
      en: '`slugify(text)` should make the text usable in a URL: lowercase letters; everything except Latin letters and digits is replaced with `-`; consecutive `-` are merged; `-` at the ends is removed.\n\n```js\nslugify(\'  React & TypeScript: Guide! \');   // \'react-typescript-guide\'\n```',
      ru: '`slugify(text)` должна сделать текст пригодным для URL: строчные буквы; всё, кроме латинских букв и цифр, заменяется на `-`; подряд идущие `-` сливаются; `-` по краям удаляются.\n\n```js\nslugify(\'  React & TypeScript: Guide! \');   // \'react-typescript-guide\'\n```'
    },
    hint: {
      az: '`toLowerCase()`, sonra `replace(/[^a-z0-9]+/g, \'-\')`, sonda `replace(/^-+|-+$/g, \'\')`.',
      en: '`toLowerCase()`, then `replace(/[^a-z0-9]+/g, \'-\')`, and finally `replace(/^-+|-+$/g, \'\')`.',
      ru: '`toLowerCase()`, затем `replace(/[^a-z0-9]+/g, \'-\')`, в конце `replace(/^-+|-+$/g, \'\')`.'
    },
    starter: 'function slugify(text) {\n  // your code\n}\n',
    solution: "function slugify(text) {\n  return text\n    .toLowerCase()\n    .replace(/[^a-z0-9]+/g, '-')\n    .replace(/^-+|-+$/g, '');\n}\n",
    tests: [
      { call: "slugify('  React & TypeScript: Guide! ')", expect: 'react-typescript-guide' },
      { call: "slugify('Hello   World')", expect: 'hello-world' },
      { call: "slugify('Top 10 tips')", expect: 'top-10-tips' },
      { call: "slugify('---')", expect: '' }
    ]
  },
  {
    id: 'parse-query',
    topic: 'strings',
    lvl: 'm',
    title: { az: 'Query sətrini parse etmək', en: 'Parsing a query string', ru: 'Разбор query-строки' },
    desc: {
      az: '`parseQuery(qs)` URL-in query hissəsini obyektə çevirməlidir. Əvvəldəki `?` nəzərə alınmır, dəyərlər decode olunur. Eyni açar bir neçə dəfə gələrsə, dəyər massiv olur. Boş sətir üçün `{}`.\n\n```js\nparseQuery(\'?q=react%20hooks&page=2&tag=a&tag=b\');\n// { q: \'react hooks\', page: \'2\', tag: [\'a\', \'b\'] }\n```',
      en: '`parseQuery(qs)` should turn the query part of a URL into an object. A leading `?` is ignored and values are decoded. If the same key appears several times, the value becomes an array. For an empty string: `{}`.\n\n```js\nparseQuery(\'?q=react%20hooks&page=2&tag=a&tag=b\');\n// { q: \'react hooks\', page: \'2\', tag: [\'a\', \'b\'] }\n```',
      ru: '`parseQuery(qs)` должна превратить query-часть URL в объект. Начальный `?` игнорируется, значения декодируются. Если один и тот же ключ встречается несколько раз, значение становится массивом. Для пустой строки — `{}`.\n\n```js\nparseQuery(\'?q=react%20hooks&page=2&tag=a&tag=b\');\n// { q: \'react hooks\', page: \'2\', tag: [\'a\', \'b\'] }\n```'
    },
    hint: {
      az: '`new URLSearchParams(qs)` üzərində `for (const [key, value] of params)` dövrü. Açar artıq varsa, massivə çevir.',
      en: 'Loop over `new URLSearchParams(qs)` with `for (const [key, value] of params)`. If the key already exists, turn it into an array.',
      ru: 'Пройди циклом `for (const [key, value] of params)` по `new URLSearchParams(qs)`. Если ключ уже есть — преврати значение в массив.'
    },
    starter: 'function parseQuery(qs) {\n  // your code\n}\n',
    solution: 'function parseQuery(qs) {\n  const out = {};\n  for (const [key, value] of new URLSearchParams(qs)) {\n    if (!(key in out)) out[key] = value;\n    else if (Array.isArray(out[key])) out[key].push(value);\n    else out[key] = [out[key], value];\n  }\n  return out;\n}\n',
    tests: [
      { call: "parseQuery('?q=react%20hooks&page=2&tag=a&tag=b')", expect: { q: 'react hooks', page: '2', tag: ['a', 'b'] } },
      { call: "parseQuery('')", expect: {} },
      { call: "parseQuery('a=1&a=2&a=3')", expect: { a: ['1', '2', '3'] } }
    ]
  },
  {
    id: 'duration',
    topic: 'strings',
    lvl: 'j',
    title: { az: 'Müddəti formatlamaq', en: 'Formatting a duration', ru: 'Форматирование длительности' },
    desc: {
      az: '`formatDuration(seconds)` saniyələri video pleyerdəki kimi göstərməlidir: bir saatdan azdırsa `m:ss`, çoxdursa `h:mm:ss`. Kəsr hissə atılır.\n\n```js\nformatDuration(75);     // \'1:15\'\nformatDuration(3605);   // \'1:00:05\'\n```',
      en: '`formatDuration(seconds)` should display seconds like a video player does: `m:ss` if less than an hour, otherwise `h:mm:ss`. The fractional part is dropped.\n\n```js\nformatDuration(75);     // \'1:15\'\nformatDuration(3605);   // \'1:00:05\'\n```',
      ru: '`formatDuration(seconds)` должна показывать секунды как в видеоплеере: `m:ss`, если меньше часа, иначе `h:mm:ss`. Дробная часть отбрасывается.\n\n```js\nformatDuration(75);     // \'1:15\'\nformatDuration(3605);   // \'1:00:05\'\n```'
    },
    hint: {
      az: '`Math.floor` ilə saat, dəqiqə, saniyəni tap; `String(n).padStart(2, \'0\')` iki rəqəmli etmək üçün.',
      en: 'Find the hours, minutes and seconds with `Math.floor`; use `String(n).padStart(2, \'0\')` to make two digits.',
      ru: 'Найди часы, минуты и секунды через `Math.floor`; `String(n).padStart(2, \'0\')` — чтобы получить две цифры.'
    },
    starter: 'function formatDuration(seconds) {\n  // your code\n}\n',
    solution: "function formatDuration(seconds) {\n  const total = Math.floor(seconds);\n  const h = Math.floor(total / 3600);\n  const m = Math.floor((total % 3600) / 60);\n  const s = String(total % 60).padStart(2, '0');\n  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;\n}\n",
    tests: [
      { call: 'formatDuration(75)', expect: '1:15' },
      { call: 'formatDuration(3605)', expect: '1:00:05' },
      { call: 'formatDuration(9.9)', expect: '0:09' },
      { call: 'formatDuration(0)', expect: '0:00' }
    ]
  }
];

export function getTask(id: string): Task | undefined {
  return TASKS.find((t) => t.id === id);
}

export function topicTasks(topicId: string): Task[] {
  return TASKS.filter((t) => t.topic === topicId);
}
