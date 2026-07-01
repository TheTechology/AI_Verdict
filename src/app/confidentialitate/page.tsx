export const metadata = { title: "Confidențialitate — VERIDIC" };

export default function ConfidentialitatePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10 space-y-4 text-sm text-ink-200">
      <h1 className="font-serif text-2xl font-bold text-ink-50">Confidențialitate — schiță</h1>
      <p className="italic text-ink-400">
        Acest text e o schiță pentru echipa de dezvoltare, NU o politică de confidențialitate
        publicabilă. Înainte de lansarea publică, această pagină trebuie revizuită de un jurist
        și adaptată la fluxul real de date al platformei (secțiunea 11 din specificație —
        conformitate GDPR).
      </p>
      <p>
        VERIDIC stochează textul trimis pentru analiză, scorurile rezultate și dovezile
        generate, pentru a putea afișa rezultatul și a îmbunătăți platforma. Analizele
        individuale nu sunt asociate identității utilizatorului fără consimțământ explicit.
      </p>
      <p>
        Textul trimis este transmis către Anthropic (furnizorul modelului Claude) pentru
        procesare, conform{" "}
        <a
          href="https://www.anthropic.com/legal/privacy"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          politicii de confidențialitate Anthropic
        </a>
        .
      </p>
      <p className="italic text-ink-400">
        [TODO echipă: adaugă aici adresa de contact reală pentru întrebări despre date
        (ex. o adresă dedicată @grupulverde.ro), după ce e stabilită.]
      </p>
    </main>
  );
}
