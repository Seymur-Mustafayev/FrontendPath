import type { Level } from '../types';
import type { Locale } from './units';

function ru(n: number, one: string, few: string, many: string): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

const en = (n: number, one: string, many: string) => (n === 1 ? one : many);

const az = {
  meta: {
    title: 'Frontend Yol Xəritəsi',
    description:
      'Junior-dan Middle frontend developerə gedən yol: öyrənmə yolları, mövzular və ingiliscə-azərbaycanca texniki terminlər.'
  },
  lang: { label: 'Dil', names: { az: 'Azərbaycanca', en: 'English', ru: 'Русский' } },
  loading: 'Yüklənir…',
  progressAria: (done: number, total: number) => `${done} / ${total} mövzu tamamlanıb`,
  nav: {
    brand: 'Yol Xəritəsi',
    aria: 'Əsas naviqasiya',
    home: 'Ana səhifə',
    paths: 'Yollar',
    book: 'Kitab',
    glossary: 'Lüğət',
    searchLabel: 'Mövzu və termin axtarışı',
    searchPlaceholder: 'Mövzu və ya termin axtar…',
    menuOpen: 'Menyunu aç',
    menuClose: 'Menyunu bağla',
    stat: (done: number, total: number) => `${done} / ${total} mövzu`
  },
  hero: {
    titleBefore: 'Junior-dan ',
    titleAfter: ' frontend developerə gedən yol',
    lede: (paths: number, topics: number, terms: number) =>
      `${paths} yol, ${topics} mövzu və ${terms}-dan çox texniki termin. Mövzunun üstünə bas — fəsil formatında izah açılır; ingilis terminə bas — tərcüməsi və izahı pop-up-da görünür.`,
    start: 'Yollara başla',
    read: 'Kitab oxu',
    glossary: 'Termin lüğətinə bax',
    statPaths: 'öyrənmə yolu',
    statTopics: 'mövzu',
    statTerms: 'termin (EN → AZ)',
    statStages: 'səviyyə mərhələsi'
  },
  steps: {
    kicker: 'Necə işləyir',
    title: 'Üç addım — oxu, terminləri öyrən, işarələ',
    items: [
      {
        no: 'ADDIM 01',
        title: 'Yolu seç',
        text: 'Yollar mərhələyə görə düzülüb: əvvəl təməl, sonra React və TypeScript, ən sonda testing, CI/CD və arxitektura. İşində indi lazım olanı əvvələ çəkə bilərsən.'
      },
      {
        no: 'ADDIM 02',
        title: 'Mövzunu aç və oxu',
        text: 'Hər mövzu fəsil formatındadır: mexanizm, kod nümunələri, tez-tez edilən səhvlər və «nə vaxt istifadə etmə» qeydi. İzah azərbaycanca, texniki terminlər ingiliscədir.'
      },
      {
        no: 'ADDIM 03',
        title: 'Terminə bas, sonra işarələ',
        text: 'Mətndəki altı xətli termin və aşağıdakı çiplər pop-up açır: ingilis termin, azərbaycanca qarşılığı, izah. Mövzunu bitirəndə qutucuğu işarələ — tərəqqi yadda qalır.'
      }
    ]
  },
  stages: {
    kicker: 'Mərhələlər',
    title: 'Yolların səviyyə üzrə bölgüsü',
    intro: 'Kartın üstünə bas — həmin yolun mövzuları açılır.',
    items: {
      j: {
        title: 'Mərhələ 01 — Təməl: veb, markup və stil',
        description: 'Bunlarsız React öyrənmək mühərriki bilmədən maşın sürməkdir.'
      },
      jp: {
        title: 'Mərhələ 02 — Dil və çərçivə: JS, TypeScript, React',
        description: 'Gündəlik işin nüvəsi. Burada dərinlik junior ilə middle arasındakı fərqi yaradır.'
      },
      m: {
        title: 'Mərhələ 03 — Middle: sistem, keyfiyyət və komanda',
        description:
          'Kod yazmaqdan qərar verməyə keçid: state modeli, testing, CI/CD, performans, arxitektura.'
      }
    } as Record<Level, { title: string; description: string }>,
    pathNo: (no: string) => `YOL ${no}`,
    topics: (done: number, total: number) => `${done}/${total} mövzu`
  },
  rail: {
    aria: 'Öyrənmə yolları',
    count: (n: number) => `${n} yol`
  },
  path: {
    kicker: 'Oxuma paneli',
    title: 'Yollar və mövzular',
    intro: 'Solda yolu seç, mövzu başlığına basıb izahı aç, altındakı terminlərə basıb tərcüməni oxu.',
    head: (no: string, level: string, done: number, total: number) =>
      `YOL ${no} · ${level} · ${done}/${total} TAMAMLANIB`,
    goal: 'Hədəf',
    navAria: 'Yollar arası keçid',
    first: 'İlk yol',
    last: 'Sonuncu yol'
  },
  topic: {
    markAria: (title: string) => `«${title}» mövzusunu tamamlandı kimi işarələ`,
    deep: 'GENİŞ MƏTN · ',
    minutes: (n: number) => `~${n} DƏQİQƏ OXU`,
    mentor: 'Mentor qeydi',
    terms: 'Əsas terminlər — üstünə bas'
  },
  term: {
    kind: 'Termin',
    ask: 'Daha çox məlumat — Claude-dan soruş ↗',
    close: 'Bağla',
    question: (en: string, tr: string) =>
      `"${en}" (${tr}) frontend termini haqqında daha çox məlumat ver: nədir, nə üçün lazımdır, real nümunələrlə izah et. Azərbaycan dilində cavab ver.`,
    sentToTab: 'Sual açıq Claude tabına göndərildi — cavab üçün o taba keçin.',
    sentCopied: 'Sual Claude-a göndərildi. Userscript quraşdırılmayıbsa: Ctrl+V, sonra Enter.',
    sent: 'Sual Claude-a göndərildi.',
    chatCurrent: 'Suallar bu söhbətə gedir:',
    chatChange: 'dəyiş',
    chatRemove: 'sil',
    scriptBefore: 'Avtomatik göndərmə üçün',
    scriptLink: 'userscript-i quraşdır',
    chatLabel: 'Həmişə eyni söhbətdə soruşmaq üçün Claude söhbətinin linkini yapışdır:',
    save: 'Yadda saxla',
    cancel: 'Ləğv et'
  },
  sync: {
    loading: 'Yüklənir…',
    saved: 'Sinxronlaşdırılıb ✓',
    error: 'Serverə qoşulmaq alınmadı',
    code: 'Sinxron kodun:',
    copy: 'kopyala',
    copied: 'kopyalandı',
    hint: 'Telefonda və ya başqa kompüterdə bu kodu daxil et — eyni qeydlər gələcək.',
    offConfirm: 'Bu cihazda sinxron söndürülsün? Serverdəki data silinmir.',
    off: 'Bu cihazda söndür',
    intro: 'Qeydlərin telefonda və başqa kompüterdə də görünsün:',
    start: 'Sinxronu aç (yeni kod)',
    haveCode: 'Kodun var? Daxil et:',
    join: 'Qoşul'
  },
  footer: {
    about:
      'Junior-dan middle səviyyəyə qədər lazım olan sahələrin tam siyahısı. Məzmun 2026 praktikasına uyğundur: React Server Components, TanStack Query, Vitest, Core Web Vitals (INP), müasir CSS.',
    sections: 'Bölmələr',
    home: 'Ana səhifə',
    paths: 'Yollar və mövzular',
    library: 'Kitabxana',
    glossary: 'Termin lüğəti',
    progress: 'Tərəqqi',
    order: 'Ardıcıllıq təklifdir — işinə uyğun dəyiş.',
    resetConfirm: 'Bütün tərəqqi silinsin?',
    reset: 'Tərəqqini sıfırla'
  },
  books: {
    kicker: 'Kitabxana',
    title: 'Kitab oxuma bölməsi',
    intro:
      'Orijinal mətn solda, azərbaycanca tərcüməsi sağda — abzas-abzas paralel. Mətndəki terminlərə basanda geniş izah pop-up-da açılır.',
    chapterNo: (no: string) => `FƏSİL ${no}`,
    chapterFoot: (sections: number, minutes: number) => `${sections} bölmə · ~${minutes} dəqiqə`,
    howTo: 'Yeni fəsil əlavə etmək: mətn src/data/books.ts faylına bölmə-bölmə yazılır, yeni terminlər isə src/data/terms.book.ts faylına.'
  },
  chapter: {
    library: 'Kitabxana',
    chapter: (no: number) => `Fəsil ${no}`,
    sections: 'Bölmələr',
    tocMeta: (sections: number, minutes: number, terms: number) =>
      `${sections} bölmə · ~${minutes} dəq · ${terms} termin`,
    viewsAria: 'Sütun görünüşü',
    viewBoth: 'Paralel',
    viewEn: 'Yalnız orijinal',
    viewTr: 'Yalnız tərcümə',
    read: 'Oxudum',
    tocRead: (done: number, total: number) => `${done} / ${total} bölmə oxunub`,
    colEn: 'Orijinal · EN',
    colTr: 'Tərcümə · AZ',
    tag: 'AZ',
    mentor: 'Mentor qeydi',
    sectionTerms: 'Bu bölmənin terminləri',
    allTerms: 'Bu fəsildəki bütün terminlər',
    allTermsChips: (n: number) => `${n} termin — üstünə bas`,
    source: 'Mənbə:',
    sourceNote: 'Tərcümə və mentor qeydləri bu sayta aiddir.'
  },
  glossary: {
    kicker: 'Lüğət',
    title: 'Frontend terminləri — ingiliscə və azərbaycanca',
    intro: 'Müsahibədə və sənəddə qarşına çıxan terminlər. Kartın üstünə basanda izah açılır.',
    searchLabel: 'Termin axtarışı',
    searchPlaceholder: 'Termin axtar — closure, hydration, rebase…',
    count: (shown: number, total: number) => `${shown} / ${total} termin`,
    empty: 'Bu sorğuya uyğun termin tapılmadı.'
  },
  search: {
    kicker: 'Axtarış nəticəsi',
    found: (topics: number, terms: number) => `${topics} mövzu, ${terms} termin tapıldı.`,
    pathNo: (no: string) => `Yol ${no}`,
    terms: 'Uyğun terminlər',
    empty: 'Nəticə yoxdur. Başqa söz yoxla — məsələn «closure», «rebase», «hydration».'
  },
  tasks: {
    nav: 'Tapşırıqlar',
    kicker: 'Praktika',
    title: 'Kod tapşırıqları',
    intro: 'Mövzu seç, tapşırığı həll et və «Yoxla» bas — kodun brauzerdə testlərlə yoxlanılır. Həll olunmuş tapşırıqlar tərəqqinə düşür.',
    topics: 'Mövzular',
    solvedOf: (done: number, total: number) => `${done} / ${total} həll olunub`,
    fromPath: 'Yol:',
    solved: 'Həll olunub',
    open: 'Aç',
    back: 'Bütün tapşırıqlar',
    editor: 'Sənin kodun',
    editorHint: 'Ctrl+Enter — yoxla',
    run: 'Yoxla',
    running: 'Yoxlanılır…',
    reset: 'Başlanğıc koda qaytar',
    resetConfirm: 'Yazdığın kod silinsin və başlanğıc kod qaytarılsın?',
    hint: 'İpucu',
    solution: 'Həlli göstər',
    solutionHide: 'Həlli gizlət',
    solutionConfirm: 'Həlli görmək istədiyinə əminsən? Əvvəlcə özün cəhd etsən, daha çox öyrənərsən.',
    useSolution: 'Həlli redaktora köçür',
    tests: 'Testlər',
    notRun: 'Hələ yoxlanılmayıb — «Yoxla» düyməsini bas.',
    expected: 'Gözlənilən',
    actual: 'Alınan',
    throws: 'xəta atmalıdır',
    error: 'Xəta',
    timeout: 'Vaxt bitdi — sonsuz dövr və ya bitməyən Promise ola bilər.',
    logs: 'console',
    passed: (n: number, total: number) => `${n} / ${total} test keçdi`,
    allPassed: 'Əla! Bütün testlər keçdi — tapşırıq həll olunub.',
    prev: 'Əvvəlki',
    next: 'Növbəti'
  },
  timer: {
    title: 'Oxu taymeri',
    start: '▶ Başlat',
    pause: 'Fasilə',
    resume: '▶ Davam et',
    finish: 'Bitir',
    discard: 'Ləğv et',
    discardConfirm: 'Bu sessiya yadda saxlanmadan silinsin?',
    running: 'Gedir',
    paused: 'Fasilədə',
    elsewhere: 'Taymer başqa fəsildə işləyir:',
    startHere: 'Bu fəsildə başlat',
    tooShort: '10 saniyədən qısa sessiya yadda saxlanmır.',
    saved: 'Sessiya jurnala yazıldı.',
    chapterTotal: 'Bu fəsildə cəmi',
    sessions: 'Sessiyalar',
    noSessions: 'Hələ sessiya yoxdur — «Başlat» bas və oxumağa başla.',
    remove: 'Sil',
    removeConfirm: 'Bu sessiya jurnaldan silinsin?',
    navAria: 'Oxu taymeri — fəsilə keç',
    logKicker: 'Oxu jurnalı',
    logTitle: 'Nə qədər oxumusan',
    logEmpty: 'Hələ oxu sessiyası yoxdur. Fəsli aç və soldakı taymeri başlat — hər sessiya burada görünəcək.',
    totalTime: 'Ümumi vaxt',
    sessionsCount: (n: number) => `${n} sessiya`,
    byChapter: 'Fəsillər üzrə',
    byDay: 'Günlər üzrə',
    today: 'Bu gün',
    yesterday: 'Dünən',
    showAll: (n: number) => `Hamısını göstər (${n})`,
    showLess: 'Az göstər',
    chapterShort: (no: number) => `Fəsil ${no}`,
    months: ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avq', 'sen', 'okt', 'noy', 'dek'],
    monthsLong: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'],
    dur: (ms: number) => {
      const m = Math.round(ms / 60000);
      if (ms < 60000) return `${Math.round(ms / 1000)} san`;
      return m >= 60 ? `${Math.floor(m / 60)} saat ${m % 60} dəq` : `${m} dəq`;
    }
  },
  notFound: {
    title: 'Belə səhifə yoxdur',
    text: 'Ünvan səhv ola bilər. Yollara qayıdıb davam et.',
    back: 'Yollara qayıt'
  }
};

export type UI = typeof az;

const enUI: UI = {
  meta: {
    title: 'Frontend Roadmap',
    description:
      'The path from Junior to Middle frontend developer: learning paths, topics and a glossary of technical terms.'
  },
  lang: { label: 'Language', names: { az: 'Azərbaycanca', en: 'English', ru: 'Русский' } },
  loading: 'Loading…',
  progressAria: (done, total) => `${done} of ${total} ${en(total, 'topic', 'topics')} done`,
  nav: {
    brand: 'Roadmap',
    aria: 'Main navigation',
    home: 'Home',
    paths: 'Paths',
    book: 'Book',
    glossary: 'Glossary',
    searchLabel: 'Search topics and terms',
    searchPlaceholder: 'Search topics or terms…',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    stat: (done, total) => `${done} / ${total} ${en(total, 'topic', 'topics')}`
  },
  hero: {
    titleBefore: 'The path from Junior to ',
    titleAfter: ' frontend developer',
    lede: (paths, topics, terms) =>
      `${paths} paths, ${topics} topics and over ${terms} technical terms. Click a topic to open a chapter-style explanation; click a term to see its explanation in a pop-up.`,
    start: 'Start the paths',
    read: 'Read the book',
    glossary: 'Browse the glossary',
    statPaths: 'learning paths',
    statTopics: 'topics',
    statTerms: 'terms explained',
    statStages: 'level stages'
  },
  steps: {
    kicker: 'How it works',
    title: 'Three steps — read, learn the terms, mark it done',
    items: [
      {
        no: 'STEP 01',
        title: 'Pick a path',
        text: 'Paths are ordered by stage: fundamentals first, then React and TypeScript, and finally testing, CI/CD and architecture. Feel free to move whatever your job needs right now to the front.'
      },
      {
        no: 'STEP 02',
        title: 'Open a topic and read',
        text: 'Every topic is written as a chapter: the mechanism, code examples, common mistakes and a “when not to use it” note.'
      },
      {
        no: 'STEP 03',
        title: 'Click a term, then mark it done',
        text: 'Underlined terms in the text and the chips below open a pop-up with the term and its explanation. When you finish a topic, tick the checkbox — your progress is saved.'
      }
    ]
  },
  stages: {
    kicker: 'Stages',
    title: 'Paths grouped by level',
    intro: 'Click a card to open the topics of that path.',
    items: {
      j: {
        title: 'Stage 01 — Foundations: web, markup and styling',
        description: 'Learning React without these is like driving a car without knowing what an engine is.'
      },
      jp: {
        title: 'Stage 02 — Language and framework: JS, TypeScript, React',
        description: 'The core of day-to-day work. Depth here is what separates a junior from a middle developer.'
      },
      m: {
        title: 'Stage 03 — Middle: systems, quality and teamwork',
        description:
          'Moving from writing code to making decisions: state models, testing, CI/CD, performance, architecture.'
      }
    },
    pathNo: (no) => `PATH ${no}`,
    topics: (done, total) => `${done}/${total} ${en(total, 'topic', 'topics')}`
  },
  rail: {
    aria: 'Learning paths',
    count: (n) => `${n} ${en(n, 'path', 'paths')}`
  },
  path: {
    kicker: 'Reading panel',
    title: 'Paths and topics',
    intro: 'Pick a path on the left, click a topic title to open the explanation, and click the terms below it to read what they mean.',
    head: (no, level, done, total) => `PATH ${no} · ${level} · ${done}/${total} DONE`,
    goal: 'Goal',
    navAria: 'Navigate between paths',
    first: 'First path',
    last: 'Last path'
  },
  topic: {
    markAria: (title) => `Mark “${title}” as done`,
    deep: 'LONG READ · ',
    minutes: (n) => `~${n} MIN READ`,
    mentor: 'Mentor note',
    terms: 'Key terms — click to open'
  },
  term: {
    kind: 'Term',
    ask: 'Learn more — ask Claude ↗',
    close: 'Close',
    question: (term) =>
      `Tell me more about the frontend term "${term}": what it is, why it matters, and explain it with real-world examples.`,
    sentToTab: 'Question sent to your open Claude tab — switch to it for the answer.',
    sentCopied: 'Question sent to Claude. If the userscript is not installed: Ctrl+V, then Enter.',
    sent: 'Question sent to Claude.',
    chatCurrent: 'Questions go to this chat:',
    chatChange: 'change',
    chatRemove: 'remove',
    scriptBefore: 'For automatic sending,',
    scriptLink: 'install the userscript',
    chatLabel: 'To always ask in the same chat, paste the link of a Claude chat:',
    save: 'Save',
    cancel: 'Cancel'
  },
  sync: {
    loading: 'Loading…',
    saved: 'Synced ✓',
    error: 'Could not reach the server',
    code: 'Your sync code:',
    copy: 'copy',
    copied: 'copied',
    hint: 'Enter this code on your phone or another computer to get the same progress.',
    offConfirm: 'Turn off sync on this device? Data on the server is not deleted.',
    off: 'Turn off on this device',
    intro: 'Keep your progress on your phone and other computers too:',
    start: 'Turn on sync (new code)',
    haveCode: 'Have a code? Enter it:',
    join: 'Connect'
  },
  footer: {
    about:
      'A complete list of the areas you need to grow from junior to middle level. The content follows 2026 practice: React Server Components, TanStack Query, Vitest, Core Web Vitals (INP), modern CSS.',
    sections: 'Sections',
    home: 'Home',
    paths: 'Paths and topics',
    library: 'Library',
    glossary: 'Glossary',
    progress: 'Progress',
    order: 'The order is a suggestion — adapt it to your work.',
    resetConfirm: 'Delete all progress?',
    reset: 'Reset progress'
  },
  books: {
    kicker: 'Library',
    title: 'Book reading',
    intro: 'Read the original text with mentor notes after each section. Click a term in the text to open a detailed explanation.',
    chapterNo: (no) => `CHAPTER ${no}`,
    chapterFoot: (sections, minutes) =>
      `${sections} ${en(sections, 'section', 'sections')} · ~${minutes} min`,
    howTo: 'To add a chapter: its text goes into src/data/books.ts section by section, and new terms go into src/data/terms.book.ts.'
  },
  chapter: {
    library: 'Library',
    chapter: (no) => `Chapter ${no}`,
    sections: 'Sections',
    tocMeta: (sections, minutes, terms) =>
      `${sections} ${en(sections, 'section', 'sections')} · ~${minutes} min · ${terms} ${en(terms, 'term', 'terms')}`,
    viewsAria: 'Column view',
    viewBoth: 'Side by side',
    viewEn: 'Original only',
    viewTr: 'Translation only',
    read: 'Read',
    tocRead: (done, total) => `${done} / ${total} ${en(total, 'section', 'sections')} read`,
    colEn: 'Original · EN',
    colTr: 'Translation',
    tag: '',
    mentor: 'Mentor note',
    sectionTerms: 'Terms in this section',
    allTerms: 'All terms in this chapter',
    allTermsChips: (n) => `${n} ${en(n, 'term', 'terms')} — click to open`,
    source: 'Source:',
    sourceNote: 'The mentor notes belong to this site.'
  },
  glossary: {
    kicker: 'Glossary',
    title: 'Frontend terms explained',
    intro: 'Terms you will meet in interviews and documentation. Click a card to open the explanation.',
    searchLabel: 'Search terms',
    searchPlaceholder: 'Search terms — closure, hydration, rebase…',
    count: (shown, total) => `${shown} / ${total} ${en(total, 'term', 'terms')}`,
    empty: 'No terms match this search.'
  },
  search: {
    kicker: 'Search results',
    found: (topics, terms) =>
      `Found ${topics} ${en(topics, 'topic', 'topics')} and ${terms} ${en(terms, 'term', 'terms')}.`,
    pathNo: (no) => `Path ${no}`,
    terms: 'Matching terms',
    empty: 'No results. Try another word — for example “closure”, “rebase”, “hydration”.'
  },
  tasks: {
    nav: 'Tasks',
    kicker: 'Practice',
    title: 'Coding tasks',
    intro: 'Pick a topic, solve a task and press “Check” — your code is checked against tests right in the browser. Solved tasks count towards your progress.',
    topics: 'Topics',
    solvedOf: (done, total) => `${done} / ${total} solved`,
    fromPath: 'Path:',
    solved: 'Solved',
    open: 'Open',
    back: 'All tasks',
    editor: 'Your code',
    editorHint: 'Ctrl+Enter — check',
    run: 'Check',
    running: 'Checking…',
    reset: 'Reset to the starter code',
    resetConfirm: 'Delete your code and restore the starter code?',
    hint: 'Hint',
    solution: 'Show the solution',
    solutionHide: 'Hide the solution',
    solutionConfirm: 'Are you sure you want to see the solution? You will learn more if you try it yourself first.',
    useSolution: 'Copy the solution into the editor',
    tests: 'Tests',
    notRun: 'Not checked yet — press “Check”.',
    expected: 'Expected',
    actual: 'Received',
    throws: 'should throw an error',
    error: 'Error',
    timeout: 'Timed out — maybe an infinite loop or a Promise that never settles.',
    logs: 'console',
    passed: (n, total) => `${n} / ${total} ${en(total, 'test', 'tests')} passed`,
    allPassed: 'Great! All tests passed — the task is solved.',
    prev: 'Previous',
    next: 'Next'
  },
  timer: {
    title: 'Reading timer',
    start: '▶ Start',
    pause: 'Pause',
    resume: '▶ Resume',
    finish: 'Finish',
    discard: 'Discard',
    discardConfirm: 'Delete this session without saving it?',
    running: 'Running',
    paused: 'Paused',
    elsewhere: 'The timer is running in another chapter:',
    startHere: 'Start in this chapter',
    tooShort: 'Sessions shorter than 10 seconds are not saved.',
    saved: 'The session was added to your log.',
    chapterTotal: 'Total in this chapter',
    sessions: 'Sessions',
    noSessions: 'No sessions yet — press “Start” and begin reading.',
    remove: 'Delete',
    removeConfirm: 'Delete this session from the log?',
    navAria: 'Reading timer — go to the chapter',
    logKicker: 'Reading log',
    logTitle: 'How much you have read',
    logEmpty: 'No reading sessions yet. Open a chapter and start the timer on the left — every session shows up here.',
    totalTime: 'Total time',
    sessionsCount: (n) => `${n} ${en(n, 'session', 'sessions')}`,
    byChapter: 'By chapter',
    byDay: 'By day',
    today: 'Today',
    yesterday: 'Yesterday',
    showAll: (n) => `Show all (${n})`,
    showLess: 'Show less',
    chapterShort: (no) => `Chapter ${no}`,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    monthsLong: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dur: (ms) => {
      const m = Math.round(ms / 60000);
      if (ms < 60000) return `${Math.round(ms / 1000)} s`;
      return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`;
    }
  },
  notFound: {
    title: 'This page does not exist',
    text: 'The address may be wrong. Go back to the paths and carry on.',
    back: 'Back to the paths'
  }
};

const ruUI: UI = {
  meta: {
    title: 'Дорожная карта фронтенда',
    description:
      'Путь от Junior до Middle фронтенд-разработчика: учебные пути, темы и англо-русский словарь технических терминов.'
  },
  lang: { label: 'Язык', names: { az: 'Azərbaycanca', en: 'English', ru: 'Русский' } },
  loading: 'Загрузка…',
  progressAria: (done, total) => `Пройдено ${done} из ${total}`,
  nav: {
    brand: 'Дорожная карта',
    aria: 'Основная навигация',
    home: 'Главная',
    paths: 'Пути',
    book: 'Книга',
    glossary: 'Словарь',
    searchLabel: 'Поиск по темам и терминам',
    searchPlaceholder: 'Искать тему или термин…',
    menuOpen: 'Открыть меню',
    menuClose: 'Закрыть меню',
    stat: (done, total) => `${done} / ${total} ${ru(total, 'тема', 'темы', 'тем')}`
  },
  hero: {
    titleBefore: 'Путь от Junior до ',
    titleAfter: ' фронтенд-разработчика',
    lede: (paths, topics, terms) =>
      `${paths} путей, ${topics} ${ru(topics, 'тема', 'темы', 'тем')} и более ${terms} технических терминов. Нажми на тему — откроется объяснение в формате главы; нажми на английский термин — перевод и объяснение появятся во всплывающем окне.`,
    start: 'Начать пути',
    read: 'Читать книгу',
    glossary: 'Открыть словарь',
    statPaths: 'учебных путей',
    statTopics: 'тем',
    statTerms: 'терминов (EN → RU)',
    statStages: 'этапа по уровням'
  },
  steps: {
    kicker: 'Как это работает',
    title: 'Три шага — читай, учи термины, отмечай',
    items: [
      {
        no: 'ШАГ 01',
        title: 'Выбери путь',
        text: 'Пути упорядочены по этапам: сначала основы, затем React и TypeScript, в конце тестирование, CI/CD и архитектура. То, что нужно на работе прямо сейчас, можно пройти раньше.'
      },
      {
        no: 'ШАГ 02',
        title: 'Открой тему и читай',
        text: 'Каждая тема написана как глава: механизм, примеры кода, частые ошибки и заметка «когда не стоит использовать». Объяснения на русском, технические термины — на английском.'
      },
      {
        no: 'ШАГ 03',
        title: 'Нажми на термин, потом отметь',
        text: 'Подчёркнутые термины в тексте и чипы ниже открывают всплывающее окно: английский термин, русский эквивалент и объяснение. Закончив тему, поставь галочку — прогресс сохраняется.'
      }
    ]
  },
  stages: {
    kicker: 'Этапы',
    title: 'Пути, сгруппированные по уровню',
    intro: 'Нажми на карточку — откроются темы этого пути.',
    items: {
      j: {
        title: 'Этап 01 — Основы: веб, разметка и стили',
        description: 'Учить React без этого — всё равно что водить машину, не зная, что такое двигатель.'
      },
      jp: {
        title: 'Этап 02 — Язык и фреймворк: JS, TypeScript, React',
        description: 'Ядро повседневной работы. Именно глубина здесь отличает junior от middle.'
      },
      m: {
        title: 'Этап 03 — Middle: система, качество и команда',
        description:
          'Переход от написания кода к принятию решений: модель состояния, тестирование, CI/CD, производительность, архитектура.'
      }
    },
    pathNo: (no) => `ПУТЬ ${no}`,
    topics: (done, total) => `${done}/${total} ${ru(total, 'тема', 'темы', 'тем')}`
  },
  rail: {
    aria: 'Учебные пути',
    count: (n) => `${n} ${ru(n, 'путь', 'пути', 'путей')}`
  },
  path: {
    kicker: 'Панель чтения',
    title: 'Пути и темы',
    intro: 'Слева выбери путь, нажми на заголовок темы, чтобы открыть объяснение, и на термины под ним, чтобы прочитать перевод.',
    head: (no, level, done, total) => `ПУТЬ ${no} · ${level} · ${done}/${total} ПРОЙДЕНО`,
    goal: 'Цель',
    navAria: 'Переход между путями',
    first: 'Первый путь',
    last: 'Последний путь'
  },
  topic: {
    markAria: (title) => `Отметить тему «${title}» как пройденную`,
    deep: 'РАЗВЁРНУТЫЙ ТЕКСТ · ',
    minutes: (n) => `~${n} МИН ЧТЕНИЯ`,
    mentor: 'Заметка ментора',
    terms: 'Ключевые термины — нажми'
  },
  term: {
    kind: 'Термин',
    ask: 'Подробнее — спросить Claude ↗',
    close: 'Закрыть',
    question: (en, tr) =>
      `Расскажи подробнее о фронтенд-термине "${en}" (${tr}): что это, зачем нужно, объясни на реальных примерах. Отвечай на русском языке.`,
    sentToTab: 'Вопрос отправлен в открытую вкладку Claude — переключись на неё, чтобы увидеть ответ.',
    sentCopied: 'Вопрос отправлен в Claude. Если userscript не установлен: Ctrl+V, затем Enter.',
    sent: 'Вопрос отправлен в Claude.',
    chatCurrent: 'Вопросы уходят в этот чат:',
    chatChange: 'изменить',
    chatRemove: 'удалить',
    scriptBefore: 'Для автоматической отправки',
    scriptLink: 'установи userscript',
    chatLabel: 'Чтобы всегда спрашивать в одном чате, вставь ссылку на чат Claude:',
    save: 'Сохранить',
    cancel: 'Отмена'
  },
  sync: {
    loading: 'Загрузка…',
    saved: 'Синхронизировано ✓',
    error: 'Не удалось подключиться к серверу',
    code: 'Твой код синхронизации:',
    copy: 'копировать',
    copied: 'скопировано',
    hint: 'Введи этот код на телефоне или другом компьютере — появятся те же отметки.',
    offConfirm: 'Отключить синхронизацию на этом устройстве? Данные на сервере не удаляются.',
    off: 'Отключить на этом устройстве',
    intro: 'Пусть твои отметки будут видны и на телефоне, и на другом компьютере:',
    start: 'Включить синхронизацию (новый код)',
    haveCode: 'Есть код? Введи его:',
    join: 'Подключиться'
  },
  footer: {
    about:
      'Полный список областей, необходимых для роста от junior до middle. Содержание соответствует практике 2026 года: React Server Components, TanStack Query, Vitest, Core Web Vitals (INP), современный CSS.',
    sections: 'Разделы',
    home: 'Главная',
    paths: 'Пути и темы',
    library: 'Библиотека',
    glossary: 'Словарь терминов',
    progress: 'Прогресс',
    order: 'Порядок — лишь рекомендация, меняй его под свою работу.',
    resetConfirm: 'Удалить весь прогресс?',
    reset: 'Сбросить прогресс'
  },
  books: {
    kicker: 'Библиотека',
    title: 'Чтение книг',
    intro:
      'Оригинальный текст слева, русский перевод справа — параллельно, абзац за абзацем. Нажми на термин в тексте, чтобы открыть подробное объяснение.',
    chapterNo: (no) => `ГЛАВА ${no}`,
    chapterFoot: (sections, minutes) =>
      `${sections} ${ru(sections, 'раздел', 'раздела', 'разделов')} · ~${minutes} мин`,
    howTo: 'Чтобы добавить главу: текст записывается в src/data/books.ts по разделам, а новые термины — в src/data/terms.book.ts.'
  },
  chapter: {
    library: 'Библиотека',
    chapter: (no) => `Глава ${no}`,
    sections: 'Разделы',
    tocMeta: (sections, minutes, terms) =>
      `${sections} ${ru(sections, 'раздел', 'раздела', 'разделов')} · ~${minutes} мин · ${terms} ${ru(terms, 'термин', 'термина', 'терминов')}`,
    viewsAria: 'Вид колонок',
    viewBoth: 'Параллельно',
    viewEn: 'Только оригинал',
    viewTr: 'Только перевод',
    read: 'Прочитано',
    tocRead: (done, total) => `Прочитано ${done} из ${total}`,
    colEn: 'Оригинал · EN',
    colTr: 'Перевод · RU',
    tag: 'RU',
    mentor: 'Заметка ментора',
    sectionTerms: 'Термины этого раздела',
    allTerms: 'Все термины этой главы',
    allTermsChips: (n) => `${n} ${ru(n, 'термин', 'термина', 'терминов')} — нажми`,
    source: 'Источник:',
    sourceNote: 'Перевод и заметки ментора принадлежат этому сайту.'
  },
  glossary: {
    kicker: 'Словарь',
    title: 'Фронтенд-термины — на английском и русском',
    intro: 'Термины, которые встречаются на собеседованиях и в документации. Нажми на карточку, чтобы открыть объяснение.',
    searchLabel: 'Поиск терминов',
    searchPlaceholder: 'Искать термин — closure, hydration, rebase…',
    count: (shown, total) => `${shown} / ${total} ${ru(total, 'термин', 'термина', 'терминов')}`,
    empty: 'По этому запросу терминов не найдено.'
  },
  search: {
    kicker: 'Результаты поиска',
    found: (topics, terms) =>
      `Найдено: ${topics} ${ru(topics, 'тема', 'темы', 'тем')}, ${terms} ${ru(terms, 'термин', 'термина', 'терминов')}.`,
    pathNo: (no) => `Путь ${no}`,
    terms: 'Подходящие термины',
    empty: 'Ничего не найдено. Попробуй другое слово — например «closure», «rebase», «hydration».'
  },
  tasks: {
    nav: 'Задачи',
    kicker: 'Практика',
    title: 'Задачи по коду',
    intro: 'Выбери тему, реши задачу и нажми «Проверить» — код проверяется тестами прямо в браузере. Решённые задачи засчитываются в прогресс.',
    topics: 'Темы',
    solvedOf: (done, total) => `Решено ${done} из ${total}`,
    fromPath: 'Путь:',
    solved: 'Решено',
    open: 'Открыть',
    back: 'Все задачи',
    editor: 'Твой код',
    editorHint: 'Ctrl+Enter — проверить',
    run: 'Проверить',
    running: 'Проверяем…',
    reset: 'Вернуть начальный код',
    resetConfirm: 'Удалить твой код и вернуть начальный?',
    hint: 'Подсказка',
    solution: 'Показать решение',
    solutionHide: 'Скрыть решение',
    solutionConfirm: 'Точно показать решение? Ты научишься большему, если сначала попробуешь сам.',
    useSolution: 'Скопировать решение в редактор',
    tests: 'Тесты',
    notRun: 'Ещё не проверено — нажми «Проверить».',
    expected: 'Ожидалось',
    actual: 'Получено',
    throws: 'должно выбросить ошибку',
    error: 'Ошибка',
    timeout: 'Время вышло — возможно, бесконечный цикл или Promise, который никогда не завершится.',
    logs: 'console',
    passed: (n, total) => `Пройдено ${n} из ${total}`,
    allPassed: 'Отлично! Все тесты пройдены — задача решена.',
    prev: 'Назад',
    next: 'Далее'
  },
  timer: {
    title: 'Таймер чтения',
    start: '▶ Старт',
    pause: 'Пауза',
    resume: '▶ Продолжить',
    finish: 'Завершить',
    discard: 'Отменить',
    discardConfirm: 'Удалить эту сессию, не сохраняя её?',
    running: 'Идёт',
    paused: 'На паузе',
    elsewhere: 'Таймер идёт в другой главе:',
    startHere: 'Начать в этой главе',
    tooShort: 'Сессии короче 10 секунд не сохраняются.',
    saved: 'Сессия записана в журнал.',
    chapterTotal: 'Всего в этой главе',
    sessions: 'Сессии',
    noSessions: 'Сессий пока нет — нажми «Старт» и начни читать.',
    remove: 'Удалить',
    removeConfirm: 'Удалить эту сессию из журнала?',
    navAria: 'Таймер чтения — перейти к главе',
    logKicker: 'Журнал чтения',
    logTitle: 'Сколько ты прочитал',
    logEmpty: 'Сессий чтения пока нет. Открой главу и запусти таймер слева — каждая сессия появится здесь.',
    totalTime: 'Общее время',
    sessionsCount: (n) => `${n} ${ru(n, 'сессия', 'сессии', 'сессий')}`,
    byChapter: 'По главам',
    byDay: 'По дням',
    today: 'Сегодня',
    yesterday: 'Вчера',
    showAll: (n) => `Показать все (${n})`,
    showLess: 'Свернуть',
    chapterShort: (no) => `Глава ${no}`,
    months: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    monthsLong: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    dur: (ms) => {
      const m = Math.round(ms / 60000);
      if (ms < 60000) return `${Math.round(ms / 1000)} с`;
      return m >= 60 ? `${Math.floor(m / 60)} ч ${m % 60} мин` : `${m} мин`;
    }
  },
  notFound: {
    title: 'Такой страницы нет',
    text: 'Возможно, адрес указан неверно. Вернись к путям и продолжай.',
    back: 'Вернуться к путям'
  }
};

export const UI_TEXT: Record<Locale, UI> = { az, en: enUI, ru: ruUI };
