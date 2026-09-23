import { useUI } from '../i18n/useLocale';

export function Steps() {
  const { steps } = useUI();
  return (
    <section className="sec" id="nece">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">{steps.kicker}</p>
          <h2 className="sh">{steps.title}</h2>
        </div>
        <div className="steps">
          {steps.items.map((s) => (
            <div className="step" key={s.no}>
              <b>{s.no}</b>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
