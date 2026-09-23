import { useLocale } from '../i18n/useLocale';
import { LOCALES } from '../i18n/units';

export function LangSwitch() {
  const { locale, setLocale, ui } = useLocale();
  return (
    <div className="lang" role="group" aria-label={ui.lang.label}>
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={locale === l}
          title={ui.lang.names[l]}
          onClick={() => setLocale(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
