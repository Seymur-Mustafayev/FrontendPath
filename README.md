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

Lokal rejimdə (`npm run dev`) sayt tam işləyir, yalnız cihazlar arası sinxron işləmir. Onun üçün
server funksiyası və baza lazımdır — bax: [Öz nüsxəni Vercel-də yerləşdir](#öz-nüsxəni-vercel-də-yerləşdir).

## İmkanlar

### Tərəqqi və cihazlar arası sinxron

Hər mövzunu «tamamlandı» kimi qeyd etmək olar. Qeydlər əvvəlcə brauzerdə saxlanılır. Telefonda və ya
başqa kompüterdə də görünməsi üçün:

1. Saytın aşağısında (footer → **Tərəqqi**) **Sinxronu aç** düyməsinə bas — sənə kod verilir,
   məsələn `k7mn-p2qx-a9wd-t4ze`.
2. Digər cihazda saytı aç, həmin bölmədə kodu daxil et və **Qoşul** bas.
3. Qeydlər və Claude söhbət linki bütün cihazlarda eyni olur. Başqa cihazdakı dəyişiklik tab yenidən
   açılanda gəlir.

Qeydiyyat və parol yoxdur — kodu bilən hər kəs həmin datanı görə bilər, ona görə kodu paylaşma.

### Termin pop-up-ından Claude-a sual

Hər termin pop-up-ında **Daha çox məlumat — Claude-dan soruş** düyməsi var:

- **Heç nə quraşdırmadan:** düymə sualla yeni Claude söhbəti açır.
- **Həmişə eyni söhbətdə:** pop-up-ın aşağısına Claude söhbətinin linkini
  (`https://claude.ai/chat/...`) yapışdır və **Yadda saxla** bas. Sual buferə kopyalanır və söhbət
  açılır — `Ctrl+V`, `Enter`.
- **Tam avtomatik (userscript ilə):** sual açıq Claude tabına özü yazılır və göndərilir, yeni tab
  açılmır. Quraşdırma aşağıdadır.

#### Userscript-in quraşdırılması

1. Brauzerə [Tampermonkey](https://www.tampermonkey.net/) genişlənməsini quraşdır.
2. Userscript-lərə icazə ver:
   - **Chrome:** `chrome://extensions` → Tampermonkey → **Details** → **Allow User Scripts** aç
     (yoxdursa, sağ yuxarıda **Developer mode**-u aç).
   - **Edge:** `edge://extensions` → sol aşağıda **Developer mode**-u aç.
3. Tampermonkey ikonu → **Create a new script** → içindəkini sil →
   [`public/claude-ask.user.js`](public/claude-ask.user.js) faylının məzmununu yapışdır → `Ctrl+S`.
4. Öz domenində yerləşdirmisənsə, skriptin başlığına həmin domen üçün sətir əlavə et:
   `// @match https://sənin-domenin/*`
5. Açıq claude.ai və sayt tablarını yenilə (`F5`).

> İkon görünmürsə: brauzerin sağ yuxarısındakı 🧩 ikonuna bas və Tampermonkey-i 📌 ilə sabitlə.
> Skript claude.ai-nin səhifə quruluşuna bağlıdır; Claude interfeysi dəyişsə, yazı sahəsi və
> «Send» düyməsinin seçiciləri yenilənməlidir. Xəta brauzer konsolunda `[claude-ask]` ilə görünür.

## Qovluq strukturu

```
api/
  sync.js               Vercel funksiyası: sinxron datanı Upstash Redis-də saxlayır (GET/PUT)
public/
  claude-ask.user.js    Tampermonkey skripti: sualı açıq Claude tabına göndərir
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
    useProgress.tsx     tərəqqi + Claude söhbət linki + sinxron (localStorage və server)
    sync.ts             sinxron kodu və /api/sync sorğuları
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
- **Sinxron** açıqdırsa, server əsas mənbədir: səhifə açılanda və tab yenidən görünəndə data
  serverdən yüklənir, dəyişikliklər 800 ms gecikmə ilə `PUT /api/sync?code=...` ilə göndərilir.
  Redis-də açar `sync:<kod>`, dəyər `{ done, chat }` JSON-udur (maks. 100 KB).
- **Termin pop-up-ı** native `<dialog>` elementidir: fokus tələsi, Escape ilə bağlanma və backdrop
  brauzerdən gəlir.
- **Şriftlər** Azərbaycan əlifbası (`ə ğ ı İ ö ş ç ü`) üçün seçilib: Source Serif 4 / Source Sans 3 /
  JetBrains Mono, hər stack-də `Noto Sans` ehtiyat qlif mənbəyi kimi.
- **Tema** `prefers-color-scheme` ilə avtomatik dəyişir; bütün rənglər `:root`-da token kimi təyin
  olunub.
- **Bundle** üç chunk-a bölünüb (`vendor`, `content`, `index`) — məzmun faylı ayrıca keşlənir.

## Öz nüsxəni Vercel-də yerləşdir

1. Bu repo-nu **Fork** et (və ya klonla və öz GitHub-una push et).
2. [vercel.com/new](https://vercel.com/new) → GitHub ilə daxil ol → repo-nu **Import** et →
   **Deploy**. Ayar dəyişmək lazım deyil: Vite avtomatik tanınır, `api/` qovluğu server
   funksiyasına çevrilir, [`vercel.json`](vercel.json) isə SPA marşrutlarını `index.html`-ə yönləndirir.
3. Sinxron üçün baza: layihədə **Storage → Create Database → Upstash for Redis** → pulsuz plan →
   **Connect to project**. Bu, `KV_REST_API_URL` və `KV_REST_API_TOKEN` env dəyişənlərini avtomatik
   əlavə edir.
4. **Deployments → sonuncu deploy → ⋯ → Redeploy** — env dəyişənləri yalnız yeni deploy-da görünür.
5. Yoxla: saytın footer-ində **Sinxronu aç** bas — «Sinxronlaşdırılıb ✓» görünməlidir.
   «Serverə qoşulmaq alınmadı» görünürsə, 3-cü və 4-cü addımı yoxla.

Bundan sonra `main` branch-ına hər push avtomatik deploy olunur.

Başqa Redis provayderi (məsələn birbaşa [Upstash](https://upstash.com)) istifadə edirsənsə, env
dəyişənlərini əl ilə əlavə et: `UPSTASH_REDIS_REST_URL` və `UPSTASH_REDIS_REST_TOKEN`.

### Başqa hostinq

`npm run build` → `dist/` qovluğu istənilən statik hostinqə qoyula bilər, lakin sinxron işləmir
(`api/sync.js` Vercel funksiyasıdır). SPA olduğu üçün **fallback** qaydası lazımdır: bütün naməlum
yollar `index.html`-ə yönləndirilməlidir, əks halda `/yol/react` ünvanını birbaşa açanda 404 gəlir.

- Azure Static Web Apps: `staticwebapp.config.json` → `"navigationFallback": { "rewrite": "/index.html" }`.
- Nginx: `try_files $uri /index.html;`
