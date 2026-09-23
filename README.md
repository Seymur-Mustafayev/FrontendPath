# Frontend Yol Xəritəsi

Junior-dan Middle frontend developerə gedən öyrənmə saytı — **React + TypeScript + Vite**.

15 öyrənmə yolu, 83 mövzu (fəsil formatında izah, kod nümunələri, mentor qeydləri) və 236 texniki
termin (ingiliscə termin → azərbaycanca qarşılıq + izah, pop-up ilə).

## İşə salmaq

```bash
npm install
npm run dev        # http://localhost:5173
```

Digər skriptlər:

```bash
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build (dist/)
npm run preview    # build nəticəsinə baxmaq
```

Node 20+ tövsiyə olunur.

## Qovluq strukturu

```
src/
  data/                 məzmun qatı (UI-dan tam ayrıdır)
    glossary.ts         236 + 24 termin: [en, az, izah, kod nümunəsi?]
    paths.ts            15 yol + mövzu siyahısı (başlıq, səviyyə, qısa mətn, mentor qeydi)
    deep.ts             mövzuların geniş mətnləri, açar: `${pathId}.${index}`
    books.ts            kitab fəsilləri: paralel bloklar {en, az} + kod blokları {code}
    terms.book.ts       kitab terminləri — glossary.ts-ə qarışdırılır
  lib/
    content.ts          mövzu id-si, mətn seçimi, termin toplama, mərhələlər
    search.ts           mövzu + termin axtarışı
    useProgress.tsx     tərəqqi konteksti (localStorage, try/catch ilə qorunub)
    useTermDialog.tsx   termin pop-up konteksti
  components/           NavBar, Hero, Steps, StageList, PathRail, TopicItem,
                        TopicBody, TermChips, TermDialog, ProgressBar, ...
  pages/                HomePage, PathPage, BooksPage, ChapterPage, GlossaryPage,
                        SearchPage, NotFoundPage
  styles/global.css     token əsaslı qlobal stillər (light + dark)
  types.ts              Level, Topic, LearningPath, TermEntry, TopicHit
```

## Marşrutlar

| Yol | Səhifə |
| --- | --- |
| `/` | Hero, «necə işləyir», mərhələlər üzrə yol kartları |
| `/yol/:pathId` | Yolun mövzuları (sol rail + oxuma paneli) |
| `/yol/:pathId?t=3` | Həmin mövzu açıq gəlir və ekrana gətirilir |
| `/kitab` | Kitabxana: kitablar və fəsil siyahısı |
| `/kitab/:bookId/:chapterId` | Fəsil oxuma: solda orijinal, sağda tərcümə (Paralel / yalnız EN / yalnız AZ) |
| `/luget` | A–Z termin lüğəti, öz axtarışı ilə |
| `/axtar?q=...` | Mövzu və termin axtarışının nəticəsi |

## Məzmun formatı

`deep.ts` içindəki mətnlər `TopicBody` komponenti tərəfindən parse olunur:

| Yazılış | Nəticə |
| --- | --- |
| `## Başlıq` | alt başlıq |
| ` ```kod``` ` | kod bloku |
| `> mətn` | sitat/qeyd bloku |
| `[[term-key]]` | lüğət termini — klikləndə pop-up açılır |
| `` `kod` `` | sətiriçi kod |

**Kitab fəsli əlavə etmək:** mətni `books.ts`-də bölmələrə böl; hər bölmə bloklardan ibarətdir —
`{ en, az }` paralel sətir kimi (solda orijinal abzas, sağda tərcüməsi), `{ code, caption? }` isə iki
sütunun altında bütöv kod bloku kimi render olunur. Bölmənin `note` sahəsi tərcümə deyil, mentor
izahıdır. Yeni terminləri `terms.book.ts`-ə yaz. Kitab terminlərinin `def` sahəsi çoxparaqraflı ola bilər — pop-up onu eyni
parser ilə render edir, yəni içində kod bloku və başqa terminə keçid işləyir.

Yeni mövzu əlavə etmək: `paths.ts`-də uyğun yolun `topics` massivinə obyekt əlavə et, geniş mətn
lazımdırsa `deep.ts`-ə `"pathId.index"` açarı ilə yaz. Yeni termin: `glossary.ts`-ə bir sətir.

## Texniki qeydlər

- **Tərəqqi** `localStorage`-də (`fe-path-progress-v1`) saxlanılır; oxuma/yazma `try/catch`
  daxilindədir, ona görə private rejimdə və ya bloklanmış saytlarda sayt yenə işləyir.
- **Termin pop-up-ı** native `<dialog>` elementidir: fokus tələsi, Escape ilə bağlanma və backdrop
  brauzerdən gəlir.
- **Şriftlər** Azərbaycan əlifbası (`ə ğ ı İ ö ş ç ü`) üçün seçilib: Source Serif 4 / Source Sans 3 /
  JetBrains Mono, hər stack-də `Noto Sans` ehtiyat qlif mənbəyi kimi.
- **Tema** `prefers-color-scheme` ilə avtomatik dəyişir; bütün rənglər `:root`-da token kimi təyin
  olunub.
- **Bundle** üç chunk-a bölünüb (`vendor`, `content`, `index`) — məzmun faylı ayrıca keşlənir.

## Deploy

`npm run build` → `dist/` qovluğu statik hostinqə (Azure Static Web Apps, Vercel, Netlify) qoyulur.

SPA olduğu üçün server tərəfdə **fallback** qaydası lazımdır: bütün naməlum yollar `index.html`-ə
yönləndirilməlidir, əks halda `/yol/react` ünvanını birbaşa açanda 404 gəlir.

- Vercel: konfiqurasiya tələb olunmur.
- Azure Static Web Apps: `staticwebapp.config.json` → `"navigationFallback": { "rewrite": "/index.html" }`.
- Nginx: `try_files $uri /index.html;`
