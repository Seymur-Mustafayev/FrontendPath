const STEPS = [
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
    text: 'Mətndəki altı xətli termin və aşağıdakı çiplər pop-up açır: ingilis termin, azərbaycanca qarşılığı, izah. Mövzunu bitirəndə qutucuğu işarələ — tərəqqi brauzerində qalır.'
  }
];

export function Steps() {
  return (
    <section className="sec" id="nece">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">Necə işləyir</p>
          <h2 className="sh">Üç addım — oxu, terminləri öyrən, işarələ</h2>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
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
