# FrontendPath

A learning roadmap from **Junior to Middle frontend developer** — built with **React + TypeScript + Vite**.

**Live site:** https://frontend-path-psi.vercel.app

- **15 learning paths, 83 topics** — each written as a chapter: the mechanism, code examples, common mistakes and a mentor note
- **329 technical terms** — click any underlined term for an explanation in a pop-up
- **Book reading** — all 8 chapters of *You Don't Know JS Yet: Scope & Closures*, with mentor notes after every section
- **Three languages** — Azerbaijani, English and Russian (switch with **AZ / EN / RU** in the top bar)
- **Progress sync across devices** — mark topics as done and see the same progress on your phone
- **Ask Claude** — every term pop-up can send a ready-made question to Claude
- **Coding tasks** — 25 JavaScript tasks in 6 topics, checked against tests right in the browser

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build (dist/)
npm run preview    # preview the production build
npm run i18n:check # verify that the EN and RU translations are complete
```

Node 20+ is recommended.

Everything works locally with `npm run dev` except cross-device sync, which needs the serverless
function and a database — see [Deploy your own copy on Vercel](#deploy-your-own-copy-on-vercel).

## Features

### Languages

The whole site is available in three languages: all interface text, every topic and chapter, the
glossary and the book's mentor notes.

- **AZ** — the original content; the book is shown side by side with an Azerbaijani translation.
- **EN** — the book is shown in the original English only.
- **RU** — the book is shown side by side with a Russian translation.

The chosen language is remembered in the browser. English and Russian content is loaded only when
that language is selected, so the default bundle doesn't grow.

### Progress and cross-device sync

Any topic can be marked as done. Progress is first saved in the browser. To see it on your phone or
another computer too:

1. At the bottom of the site (footer → **Progress**) click **Turn on sync** — you get a code, for
   example `k7mn-p2qx-a9wd-t4ze`.
2. Open the site on the other device, enter the code in the same section and click **Connect**.
3. Your progress and your saved Claude chat link are now the same on every device. Changes made on
   another device arrive when the tab is opened again.

There's no sign-up and no password — anyone who knows the code can see that data, so don't share it.

### Coding tasks

The **Tasks** page (`/tapsiriqlar`) has 25 JavaScript tasks in 6 topics: scope and closures, arrays,
objects and immutability, functions, async code, and strings. Each task has a description, a hint and
a solution you can reveal.

Press **Check** (or `Ctrl+Enter`) and your code runs against the task's tests in a Web Worker, so an
infinite loop can't freeze the page — it's stopped after a timeout. Every test runs in a fresh copy of
your code. When all tests pass, the task is marked as solved and counts as synced progress; the code
you write is kept in the browser.

**Adding a task:** add an object to `TASKS` in `src/data/tasks.ts` with the text in all three
languages, `starter`, `solution` and `tests` (`{ call, expect }` or `{ call, throws: true }`, where
`call` is an expression that may return a Promise).

### Asking Claude from a term pop-up

Every term pop-up has a **Learn more — ask Claude** button:

- **With nothing installed:** the button opens a new Claude chat with the question.
- **Always in the same chat:** paste the link of a Claude chat (`https://claude.ai/chat/...`) at the
  bottom of the pop-up and click **Save**. The question is copied to the clipboard and the chat
  opens — press `Ctrl+V`, then `Enter`.
- **Fully automatic (with the userscript):** the question is typed into your open Claude tab and
  sent, without opening a new tab. Setup is below.

#### Installing the userscript

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension.
2. Allow userscripts:
   - **Chrome:** `chrome://extensions` → Tampermonkey → **Details** → turn on **Allow User Scripts**
     (if it isn't there, turn on **Developer mode** in the top-right corner).
   - **Edge:** `edge://extensions` → turn on **Developer mode** in the bottom-left corner.
3. Tampermonkey icon → **Create a new script** → delete the template → paste the contents of
   [`public/claude-ask.user.js`](public/claude-ask.user.js) → `Ctrl+S`.
4. If you deploy the site on your own domain, add a line for it to the script header:
   `// @match https://your-domain/*`
5. Reload the open claude.ai and site tabs (`F5`).

> If the icon isn't visible, click the 🧩 icon in the top-right corner of the browser and pin
> Tampermonkey with 📌. The script depends on claude.ai's page structure; if the Claude interface
> changes, the selectors for the input field and the “Send” button need updating. Errors show up in
> the browser console prefixed with `[claude-ask]`.

## Project structure

```
api/
  sync.js               Vercel function: stores synced data in Upstash Redis (GET/PUT)
public/
  claude-ask.user.js    Tampermonkey script: sends the question to the open Claude tab
scripts/
  i18n.mjs              translation completeness check and source export
src/
  data/                 content layer, Azerbaijani source (fully separate from the UI)
    glossary.ts         terms: [en, az, explanation, code example?]
    paths.ts            15 paths + topic list (title, level, short text, mentor note)
    deep.ts             long chapter texts per topic, key: `${pathId}.${index}`
    books.ts            book chapters: parallel blocks {en, az} + code blocks {code}
    book-scope/         chapters 2–8 of the book, one file per chapter
    terms.book.ts       book terms (chapter 1) — merged into glossary.ts
    terms.scope.ts      book terms (chapters 2–8) — merged into glossary.ts
    tasks.ts            coding tasks: text in AZ/EN/RU, starter code, solution and tests
  i18n/
    ui.ts               interface text in AZ / EN / RU
    units.ts            translation unit keys and the translation file parser
    content.ts          builds the content for the selected language
    useLocale.tsx       language context: useLocale / useUI / useContent
    locales/en/*.txt    English translations
    locales/ru/*.txt    Russian translations
  lib/
    content.ts          topic ids, text selection, term collection, stages
    search.ts           topic + term search
    useProgress.tsx     progress + Claude chat link + sync (localStorage and server)
    sync.ts             sync code and /api/sync requests
    useTermDialog.tsx   term pop-up context
    runTests.ts         runs task code against its tests in a Web Worker (with a timeout)
  components/           NavBar, LangSwitch, Hero, Steps, StageList, PathRail, TopicItem,
                        TopicBody, TermChips, TermDialog, SyncPanel, ProgressBar, ...
  pages/                HomePage, PathPage, BooksPage, ChapterPage, GlossaryPage,
                        SearchPage, NotFoundPage
  styles/global.css     token-based global styles (light + dark)
  types.ts              Level, Topic, LearningPath, TermEntry, TopicHit
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Hero, “how it works”, path cards grouped by stage |
| `/yol/:pathId` | A path's topics (left rail + reading panel) |
| `/yol/:pathId?t=3` | Opens that topic and scrolls to it |
| `/kitab` | Library: books and their chapters |
| `/kitab/:bookId/:chapterId` | Chapter reading: original on the left, translation on the right |
| `/tapsiriqlar?m=scope` | Coding tasks, grouped by topic |
| `/tapsiriqlar/:taskId` | A task: description, code editor and test results |
| `/luget` | A–Z glossary with its own search |
| `/axtar?q=...` | Topic and term search results |

## Content format

Texts are parsed by the `TopicBody` component:

| Syntax | Result |
| --- | --- |
| `## Heading` | subheading |
| ` ```code``` ` | code block |
| `> text` | quote/note block |
| `[[term-key]]` | glossary term — opens a pop-up on click |
| `` `code` `` | inline code |

**Adding a topic:** add an object to the path's `topics` array in `paths.ts`; if it needs a long
text, add it to `deep.ts` under the `"pathId.index"` key. **Adding a term:** one line in
`glossary.ts`.

**Adding a book chapter:** split the text into sections in `books.ts`; each section consists of
blocks — `{ en, az }` renders as a parallel row (original paragraph on the left, translation on the
right), and `{ code, caption? }` renders as a full-width code block under both columns. A section's
`note` field isn't a translation, it's the mentor's explanation. New terms go into `terms.book.ts` or `terms.scope.ts`.

### Translating new content

After adding Azerbaijani content, add its English and Russian versions:

```bash
node scripts/i18n.mjs export en missing-en.txt   # writes the units that aren't translated yet
node scripts/i18n.mjs export ru missing-ru.txt
```

Translate the exported file (keep every `@@ key` line and every `[[term]]` reference as is) and put it
into `src/i18n/locales/<lang>/`. Then run:

```bash
npm run i18n:check
```

The check reports missing or extra keys, mismatched `[[term]]` references, a different number of
code blocks and any Azerbaijani letters left in a translation. Until a unit is translated, the site
falls back to the Azerbaijani text.

## Technical notes

- **Progress** is stored in `localStorage` (`fe-path-progress-v1`); reads and writes are wrapped in
  `try/catch`, so the site still works in private mode or with blocked site data.
- **Sync**, when enabled, makes the server the source of truth: data is loaded from the server when
  the page opens and when the tab becomes visible again, and changes are sent with an 800 ms debounce
  via `PUT /api/sync?code=...`. The Redis key is `sync:<code>` and the value is a `{ done, chat }`
  JSON document (max 100 KB).
- **The term pop-up** is a native `<dialog>` element: focus trapping, closing with Escape and the
  backdrop come from the browser.
- **Fonts** are chosen for the Azerbaijani alphabet and Cyrillic: Source Serif 4 / Source Sans 3 /
  JetBrains Mono, with `Noto Sans` as a fallback glyph source in every stack.
- **Theme** follows `prefers-color-scheme`; all colors are defined as tokens on `:root`.
- **Bundle** is split into chunks (`vendor`, `content`, `index`, plus per-language translation
  chunks) — content files are cached separately.

## Deploy your own copy on Vercel

1. **Fork** this repo (or clone it and push it to your own GitHub).
2. [vercel.com/new](https://vercel.com/new) → sign in with GitHub → **Import** the repo →
   **Deploy**. No settings need changing: Vite is detected automatically, the `api/` folder becomes a
   serverless function, and [`vercel.json`](vercel.json) routes SPA paths to `index.html`.
3. A database for sync: in the project, **Storage → Create Database → Upstash for Redis** → free
   plan → **Connect to project**. This adds the `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment
   variables automatically.
4. **Deployments → latest deployment → ⋯ → Redeploy** — environment variables only apply to new
   deployments.
5. Check it: click **Turn on sync** in the site footer — you should see “Synced ✓”. If you see
   “Could not reach the server”, check steps 3 and 4.

From then on, every push to the `main` branch is deployed automatically.

If you use another Redis provider (for example [Upstash](https://upstash.com) directly), add the
environment variables by hand: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

### Other hosting

`npm run build` → the `dist/` folder can be put on any static hosting, but sync won't work
(`api/sync.js` is a Vercel function). Since it's a SPA, a **fallback** rule is needed: all unknown
paths must be routed to `index.html`, otherwise opening `/yol/react` directly returns a 404.

- Azure Static Web Apps: `staticwebapp.config.json` → `"navigationFallback": { "rewrite": "/index.html" }`.
- Nginx: `try_files $uri /index.html;`
