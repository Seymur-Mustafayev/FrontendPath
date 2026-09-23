import { build } from 'esbuild';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

async function load(entry) {
  const dir = mkdtempSync(join(tmpdir(), 'i18n-'));
  const out = join(dir, 'out.mjs');
  await build({
    entryPoints: [join(root, entry)],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: out,
    logLevel: 'error'
  });
  const mod = await import(pathToFileURL(out).href);
  rmSync(dir, { recursive: true, force: true });
  return mod;
}

const units = await load('src/i18n/units.ts');
const AZ_LETTERS = /[əğıİşçöüƏĞŞÇÖÜ]/;

function readLocale(locale) {
  const dir = join(root, 'src/i18n/locales', locale);
  const out = new Map();
  let files = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.txt'));
  } catch {
    return out;
  }
  for (const f of files) {
    for (const [k, v] of units.parseUnits(readFileSync(join(dir, f), 'utf8'))) {
      if (out.has(k)) console.log(`  təkrar açar: ${k} (${f})`);
      out.set(k, v);
    }
  }
  return out;
}

const refs = (s) => [...s.matchAll(/\[\[([a-z0-9-]+)\]\]/g)].map((m) => m[1]).sort().join(',');
const fences = (s) => (s.match(/```/g) ?? []).length;

const [cmd, arg, file] = process.argv.slice(2);

if (cmd === 'export') {
  const src = units.sourceUnits(arg);
  const done = readLocale(arg);
  let text = '';
  for (const [k, v] of src) if (!done.has(k)) text += `@@ ${k}\n${v}\n\n`;
  writeFileSync(file, text);
  console.log(`${[...src.keys()].filter((k) => !done.has(k)).length} vahid → ${file}`);
} else if (cmd === 'check') {
  let problems = 0;
  const report = (msg) => {
    problems++;
    if (problems <= 60) console.log('  ' + msg);
  };

  for (const locale of ['en', 'ru']) {
    const src = units.sourceUnits(locale);
    const tr = readLocale(locale);
    console.log(`\n[${locale}] ${tr.size}/${src.size} vahid`);
    for (const [k, az] of src) {
      const t = tr.get(k);
      if (t === undefined) {
        report(`çatışmır: ${k}`);
        continue;
      }
      if (!t.trim()) report(`boşdur: ${k}`);
      if (refs(az) !== refs(t)) report(`termin fərqi: ${k}\n      az: ${refs(az)}\n      ${locale}: ${refs(t)}`);
      if (fences(az) !== fences(t)) report(`kod bloku sayı fərqlidir: ${k}`);
      const line = t.split('\n').find((l) => AZ_LETTERS.test(l));
      if (line) report(`azərbaycanca hərf qalıb: ${k}: ${line.trim().slice(0, 90)}`);
    }
    for (const k of tr.keys()) if (!src.has(k)) report(`artıq açar: ${k}`);
  }

  const { UI_TEXT } = await load('src/i18n/ui.ts');
  const walk = (value, path, locale) => {
    if (typeof value === 'string') {
      if (AZ_LETTERS.test(value) && !path.endsWith('names.az')) report(`[${locale}] UI: ${path}: ${value}`);
    } else if (typeof value === 'function') {
      const sample = value(1, 2, 3, 4);
      if (AZ_LETTERS.test(sample)) report(`[${locale}] UI: ${path}(): ${sample}`);
    } else if (value && typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`, locale);
    }
  };
  for (const locale of ['en', 'ru']) walk(UI_TEXT[locale], 'ui', locale);

  console.log(problems ? `\n${problems} problem tapıldı.` : '\nHər şey tərcümə olunub ✓');
  process.exit(problems ? 1 : 0);
} else {
  console.log('İstifadə: node scripts/i18n.mjs check | export <en|ru> <fayl>');
}
