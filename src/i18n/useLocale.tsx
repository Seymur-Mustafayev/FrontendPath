import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { buildContent, loadTranslations } from './content';
import type { Content } from './content';
import { UI_TEXT } from './ui';
import type { UI } from './ui';
import { LOCALES } from './units';
import type { Locale } from './units';

const LOCALE_KEY = 'fe-locale';

function readLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_KEY);
    if (saved && (LOCALES as string[]).includes(saved)) return saved as Locale;
  } catch {
    /* yaddaş bağlıdır */
  }
  return 'az';
}

interface LocaleValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  ui: UI;
  content: Content;
}

const LocaleContext = createContext<LocaleValue | null>(null);

/** Azərbaycanca məzmun paketə daxildir, ona görə ilk render gözləmir. */
const AZ_CONTENT = buildContent('az', new Map());

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocale);
  // Yüklənmiş dil: tərcümə faylları gələnə qədər əvvəlki dil göstərilir.
  const [loaded, setLoaded] = useState<{ locale: Locale; content: Content }>(() => ({
    locale: 'az',
    content: AZ_CONTENT
  }));
  // Saxlanmış dil AZ deyilsə, ilk açılışda azərbaycanca mətn görünüb itməsin deyə gözlənilir.
  const [booted, setBooted] = useState(locale === 'az');

  useEffect(() => {
    let cancelled = false;
    if (locale === 'az') {
      setLoaded({ locale, content: AZ_CONTENT });
      return;
    }
    loadTranslations(locale).then((tr) => {
      if (cancelled) return;
      setLoaded({ locale, content: buildContent(locale, tr) });
      setBooted(true);
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const ui = UI_TEXT[loaded.locale];

  useEffect(() => {
    document.documentElement.lang = loaded.locale;
    document.title = ui.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', ui.meta.description);
  }, [loaded.locale, ui]);

  const value = useMemo<LocaleValue>(
    () => ({
      locale: loaded.locale,
      setLocale: (next) => {
        try {
          localStorage.setItem(LOCALE_KEY, next);
        } catch {
          /* yaddaş bağlıdır — seçim yalnız bu sessiyada qalır */
        }
        setLocaleState(next);
      },
      ui,
      content: loaded.content
    }),
    [loaded, ui]
  );

  if (!booted) return <div className="boot" aria-busy="true" />;

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider');
  return ctx;
}

/** Qısa yol: seçilmiş dildə interfeys mətnləri. */
export function useUI(): UI {
  return useLocale().ui;
}

/** Qısa yol: seçilmiş dildə məzmun. */
export function useContent(): Content {
  return useLocale().content;
}
