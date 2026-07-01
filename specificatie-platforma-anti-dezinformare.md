# VERITAS AI — Platformă Națională de Analiză și Combatere a Dezinformării
### Document de Specificații Tehnice și Funcționale (v2.0 — Premium Edition)

**Destinatar:** Echipa de dezvoltare
**Beneficiar:** Asociația Grupul Verde, Adjud, Vrancea
**Coordonator proiect:** Marian Dumitru — IT Coordinator, Project Manager & Director de Programe Educaționale
**Realizat de:** un grup de tineri din România, prin Asociația Grupul Verde
**Data:** Iulie 2026

---

## 0. Cauza — de ce există acest proiect

Dezinformarea nu mai este un fenomen marginal — este o problemă structurală de securitate informațională la nivel european, iar România se numără printre statele cele mai expuse din Uniunea Europeană.

**Context statistic (cifre de referință, de verificat/actualizat de echipă la lansare, sursă: Eurobarometru și Media Literacy Index):**

- Conform **Eurobarometrului Special privind fake news și dezinformarea online** (Comisia Europeană), o marjă covârșitoare a cetățenilor europeni — peste 8 din 10 — consideră știrile false o amenințare directă la adresa democrației, iar o proporție semnificativă declară că întâlnesc conținut de tip fake news săptămânal sau chiar zilnic.
- Conform rapoartelor **Media Literacy Index** (Open Society Institute – Sofia), România se regăsește constant în partea inferioară a clasamentului european privind reziliența populației la dezinformare, alături de un grup restrâns de state din regiune — un indicator direct al nevoii de infrastructură educațională și tehnologică dedicată.
- La nivel european, **Digital Services Act (DSA)** a instituit pentru prima dată obligații legale pentru platformele online privind combaterea dezinformării sistemice, recunoscând oficial fenomenul drept risc sistemic pentru spațiul public digital.

> *Notă pentru echipă: aceste cifre trebuie reconfirmate din sursele primare (ec.europa.eu/eurobarometer, Open Society Institute Sofia — Media Literacy Index, rapoartele DSA) înainte de publicare, pentru a folosi cea mai recentă ediție disponibilă la momentul lansării platformei.*

**Concluzia care motivează proiectul:** România nu duce lipsă doar de fact-checking — duce lipsă de **infrastructură educațională digitală** care să formeze cetățeni capabili să recunoască singuri mecanismele dezinformării. VERITAS AI este construit ca instrument dublu: unealtă de verificare **și** unealtă de educație civică digitală, aliniată direct cu misiunea Asociației Grupul Verde de alfabetizare digitală și activism civic în rândul tinerilor.

---

## 1. Despre proiect și echipă

**VERITAS AI** este dezvoltat de un grup de tineri din România, sub umbrela **Asociației Grupul Verde** (Adjud, județul Vrancea) — organizație activă din 2021 pe patru piloni: educație digitală și tehnologie, mediu și biodiversitate, tineret și activism civic, dezvoltare comunitară rurală.

Proiectul reprezintă o convergență naturală a acestor piloni: tehnologie de vârf (AI, NLP, computer vision) pusă în slujba unei cauze civice reale, dezvoltată chiar de tinerii pe care Grupul Verde îi formează prin programele sale de educație digitală (Cisco NetAcad, Code.org, AI literacy).

### Coordonator de proiect — Marian Dumitru

**Marian Dumitru** coordonează proiectul VERITAS AI în calitate de IT Coordinator și Project Manager al Asociației Grupul Verde, unde ocupă și funcția de Director de Programe Educaționale. Este formator acreditat ANC, instructor certificat Cisco Networking Academy și trainer acreditat FPED pe zona de educație AI, cu experiență extinsă în scriere și management de proiecte europene (Horizon Europe, programul LIFE, Erasmus+) și în coordonarea de consorții internaționale multi-partener. Pe lângă activitatea din cadrul asociației, activează independent în domeniul tehnologiei prin propria entitate, oferind servicii de dezvoltare web, UI/UX design și consultanță IT. Combinația dintre expertiza tehnică, experiența în management de proiecte finanțate european și implicarea directă în educația digitală a tinerilor din Vrancea face din Marian Dumitru coordonatorul potrivit pentru un proiect care unește tehnologia AI cu o cauză civică de interes național.

---

## 2. Viziune și obiectiv

VERITAS AI nu este un simplu "detector de fake news" cu verdict binar (adevărat/fals). Este un **sistem premium de analiză contextuală multi-dimensională**, care oferă utilizatorului o imagine completă asupra unui conținut informațional, permițându-i să își formeze propria judecată în cunoștință de cauză.

Filozofia platformei: **"Nu îți spunem ce să crezi. Îți arătăm ce să observi."**

Platforma se adresează:
- Cetățenilor și elevilor (educație media și digitală)
- Jurnaliștilor și fact-checkerilor profesioniști
- Instituțiilor publice, ONG-urilor și mediului academic
- Profesorilor care predau gândire critică și alfabetizare digitală
- Redacțiilor mass-media care doresc un badge de verificare încorporabil

---

## 3. Principii de proiectare (obligatorii)

1. **Transparență algoritmică** — utilizatorul vede întotdeauna *de ce* platforma a ajuns la o concluzie, nu doar concluzia.
2. **Fără cenzură, ci contextualizare** — platforma nu blochează conținut, ci îl adnotează.
3. **Scor granular, nu verdict binar** — indici de încredere pe mai multe axe, nu "adevărat/fals".
4. **Explicabilitate (Explainable AI)** — fiecare componentă de scor se poate desfășura până la dovada brută.
5. **Actualizare continuă** — sursele, autorii și pattern-urile de manipulare evoluează; sistemul învață incremental.
6. **Confidențialitate** — analizele individuale nu sunt asociate identității utilizatorului fără consimțământ explicit.
7. **Experiență premium** — calitatea vizuală, viteza și rafinamentul interacțiunii sunt cerințe de business, nu opționale — platforma concurează cu produse SaaS internaționale de top, nu doar cu alte instrumente ONG.

---

## 4. Arhitectura funcțională — cei 4 piloni de analiză

### PILON 1 — Analiza Sursei / Cine Publică

- Identitatea și istoricul autorului/publicației (persoană fizică, redacție, cont anonim, bot)
- Reputația istorică a domeniului (scor de credibilitate acumulat în timp)
- Date WHOIS, țara de găzduire, ascunderea deliberată a proprietarului
- Transparență redacțională: pagină "Despre noi", politică editorială, date de contact reale
- Istoric de corectări și retractări publice
- Verificare încrucișată cu baze de date de credibilitate media (tip NewsGuard, Media Bias/Fact Check, EDMO)
- Vechime și pattern de activitate a conturilor sociale asociate (uman vs. automatizat)
- Rețeaua de amplificare: cine distribuie conținutul și ce altceva mai distribuie (semnal de coordonare/bot farms)

**Output:** Scor de Credibilitate a Sursei (0-100) + fișă de profil sursă + istoric verificabil

### PILON 2 — Analiza Stilului de Scriere și Prezentare

- Ton emoțional excesiv (indignare, frică, urgență artificială)
- CAPS LOCK, exclamări multiple, titluri "clickbait"
- Coerență argumentativă, sofisme identificabile (ad hominem, strawman, apel la frică, falsă dihotomie, generalizare pripită)
- Discrepanța titlu-conținut
- Lizibilitate și complexitate lingvistică
- Limbaj absolutist ("întotdeauna", "niciodată", "toată lumea știe")
- Detectare text generat de AI vs. scris uman (cu marcaj explicit de incertitudine)
- Analiza vizuală a prezentării (layout tabloid, densitate reclame, pop-up-uri agresive)

**Output:** Scor de Manipulare Retorică (0-100) + evidențiere inline a fragmentelor problematice

### PILON 3 — Verificarea Surselor Citate

- Existența reală a surselor citate (linkuri funcționale, studii reale, persoane reale)
- Dacă sursele citate spun de fapt ceea ce articolul pretinde (citare selectivă, scoatere din context)
- Circularitatea referințelor ("spălare de dezinformare")
- Vechimea surselor față de evenimentul descris
- Tip sursă: primară vs. secundară vs. terțiară
- Verificare imagine inversă (reverse image search)
- Verificare video: reîncadrare temporală sau geografică

**Output:** Hartă de Proveniență a Surselor (graf interactiv) + Scor de Verificabilitate (0-100)

### PILON 4 — Detectarea Semnelor de Manipulare

- Tehnici de propagandă (astroturfing, whataboutism, gaslighting narativ, "firehose of falsehood")
- Coordonare inautentică (conținut identic pe multiple canale/conturi, simultan)
- Narrative tracking (încadrare în narațiuni cunoscute de dezinformare, bază de date actualizată continuu)
- Detectare deepfake imagine/video/audio
- Manipulare statistică (axe trunchiate, procente fără bază, corelație vs. cauzalitate)
- Fabricarea de expertiză (titluri false, "studii" fără peer-review, institute fictive)

**Output:** Listă de Steaguri Roșii (Red Flags) explicate individual + Scor de Risc Manipulare (0-100)

---

## 5. Catalog complet de funcționalități pe domeniu

Pentru a acoperi tot domeniul combaterii dezinformării, platforma include, pe lângă cei 4 piloni, următoarele categorii complete de funcționalități:

### 5.1 Verificare & Analiză
- Analiză text, imagine, video și audio (deepfake detection multi-modal)
- Extragere automată de claim-uri (Claim Extraction) și verificare individuală a fiecărei afirmații factuale
- Reverse image/video search integrat
- Detectare text generat de AI (cu marcaj de incertitudine, nu certitudine absolută)
- Analiză de coordonare inautentică și grafuri de rețea de distribuție
- Context Timeline — reconstrucția cronologică reală a unui eveniment
- Radar de Narative — identificarea și monitorizarea narativelor de dezinformare emergente, în timp real
- Monitorizare specială în perioade critice (alegeri, crize sanitare, dezastre naturale, conflicte)

### 5.2 Educație & Alfabetizare Media
- Modul educațional per-analiză ("de ce contează asta" + resurse de aprofundare)
- Cursuri interactive de alfabetizare media, cu certificare la finalizare
- Quiz-uri gamificate și provocări de recunoaștere a dezinformării, cu leaderboard
- Portal dedicat pentru profesori (integrabil cu platforme școlare / Google Classroom)
- Competiții și hackathoane pentru tineri, organizate prin rețeaua Grupul Verde
- Bibliotecă de cazuri reale analizate, anonimizată și adnotată pedagogic

### 5.3 Comunitate & Participare
- Raportare comunitară de conținut suspect, cu coadă de prioritizare
- Sistem de reputație pentru utilizatori activi/verificatori voluntari
- Forum moderat de discuție pe cazuri ambigue
- Newsletter și alerte personalizate pe teme de interes urmărite de utilizator

### 5.4 Instituțional & Enterprise
- Dashboard instituțional pentru școli, ONG-uri, instituții publice și redacții
- Rapoarte exportabile (PDF cu antet personalizat, branding instituțional)
- API public și widget/badge de verificare încorporabil pe site-uri terțe
- Acces API dedicat pentru cercetare academică și fact-checkeri profesioniști
- Panou de administrare și moderare pentru echipa internă

### 5.5 Acces & Integrări Tehnice
- Aplicație web premium (desktop și mobil responsive)
- Extensie de browser (Chrome, Firefox, Edge) cu overlay de analiză în timp real
- Bot de verificare rapidă pentru WhatsApp/Telegram (verificare prin trimiterea unui link/imagine)
- Aplicații native iOS și Android
- Suport multilingv, cu prioritate română–engleză, extensibil regional

### 5.6 Conformitate & Politici Publice
- Aliniere la cerințele **Digital Services Act (DSA)** — mecanism de tip "trusted flagger"
- Conformitate GDPR completă, cu anonimizare implicită a datelor de utilizator
- Jurnal de audit complet (fiecare scor trasabil până la sursele care l-au generat)
- Rapoarte de transparență publice periodice privind funcționarea și acuratețea sistemului
- Cooperare instituțională (posibilă interfațare cu CERT-RO, autorități media, mediul academic)

---

## 6. Modelul de scor — Indicele Compozit de Încredere (ICI)

**Nu se afișează un singur "verdict".** Se afișează un tablou de bord cu 4 axe independente + un indice compozit orientativ.

```
┌─────────────────────────────────────────────┐
│  INDICE COMPOZIT DE ÎNCREDERE (ICI): 42/100  │
│  ⚠ Recomandare: Verificare suplimentară      │
├─────────────────────────────────────────────┤
│  Credibilitate Sursă .................. 35   │
│  Integritate Retorică .................. 55   │
│  Verificabilitate Surse ................ 40   │
│  Risc Manipulare ....................... 62   │
└─────────────────────────────────────────────┘
```

Fiecare axă este **expandabilă** — click → dovezi punctuale, linkuri, extrase evidențiate.

ICI-ul global se calculează printr-o **medie ponderată configurabilă**, deoarece importanța fiecărui pilon diferă în funcție de tipul de conținut.

**Categorii de rezultat:**
- 🟢 80-100: Indicatori solizi de fiabilitate
- 🟡 50-79: Fiabilitate mixtă — necesită context suplimentar
- 🟠 25-49: Indicatori multipli de risc — verificare recomandată
- 🔴 0-24: Indicatori severi de dezinformare/manipulare

---

## 7. Identitate de brand și experiență premium

Platforma trebuie percepută vizual și funcțional la nivelul unui produs SaaS internațional de top, nu ca un instrument ONG minimal. Recomandări obligatorii pentru echipa de design/frontend:

- **Design system propriu**, cu paletă de culori sobră, profesională, cu accent de brand (recomandat: un albastru-petrol de încredere combinat cu un verde discret — ecou al identității Grupul Verde — și un accent de alertă calibrat, nu agresiv, pentru scorurile de risc)
- **Tipografie premium** — pereche de fonturi serif/sans-serif de calitate editorială (nu fonturi implicite de sistem)
- **Micro-interacțiuni și motion design** discret la expandarea dovezilor, fără a distrage de la conținut
- **Mod întunecat/luminos** complet, cu tranziții fluide
- **Onboarding premium** — tutorial interactiv la prima utilizare, nu ecrane statice
- **Rapoarte instituționale cu identitate vizuală proprie**, exportabile ca documente de prezentare, nu simple capturi de ecran
- **Accesibilitate WCAG 2.1 AA** integrată din start, nu adăugată ulterior
- **Performanță percepută** — încărcare progresivă a rezultatelor (nu ecran de "loading" gol), cu indicatori de progres pe fiecare pilon în timp real

---

## 8. Arhitectură tehnică propusă

### 8.1 Arhitectură generală (microservicii)

```
┌──────────────┐     ┌──────────────────┐     ┌────────────────────┐
│   Frontend    │────▶│   API Gateway     │────▶│   Orchestrator      │
│ (Web+Mob+Ext) │◀────│  (Auth, Rate Lim) │◀────│  (Analysis Router)  │
└──────────────┘     └──────────────────┘     └─────────┬──────────┘
                                                          │
        ┌─────────────────┬─────────────────┬────────────┼────────────────┬──────────────────┐
        ▼                 ▼                 ▼            ▼                ▼                  ▼
 ┌─────────────┐  ┌──────────────┐  ┌──────────────┐ ┌───────────┐ ┌───────────────┐  ┌──────────────┐
 │ Source       │  │ Style/Rhetoric│  │ Source        │ │Manipulation│ │ Media Forensics│  │ FactCheck     │
 │ Credibility  │  │ Analysis      │  │ Verification  │ │ Detection  │ │ (deepfake/img)│  │ Cross-Ref     │
 │ Service      │  │ Service (NLP) │  │ Service        │ │ Service    │ │ Service        │  │ Service       │
 └─────────────┘  └──────────────┘  └──────────────┘ └───────────┘ └───────────────┘  └──────────────┘
        │                 │                 │            │                │                  │
        └─────────────────┴─────────────────┴────────────┴────────────────┴──────────────────┘
                                              │
                                              ▼
                                   ┌───────────────────────┐
                                   │  Aggregation Engine    │
                                   │  (Scoring + Explainer) │
                                   └───────────┬───────────┘
                                               ▼
                                   ┌───────────────────────┐
                                   │   Rezultat + Dovezi     │
                                   │   (JSON structurat)     │
                                   └───────────────────────┘
```

### 8.2 Stack tehnologic recomandat

| Componentă | Tehnologie sugerată |
|---|---|
| Backend orchestrare | Python (FastAPI) sau Node.js (NestJS) |
| Motor NLP / LLM reasoning | API Claude (Anthropic) pentru raționament complex, clasificatoare fine-tunate local pentru sarcini repetitive |
| Analiză imagine/video | Modele CV open-source pentru detecție deepfake preliminară + servicii specializate pentru forensics avansat |
| Bază de date relațională | PostgreSQL |
| Bază de date graf (rețele de distribuție, proveniență surse) | Neo4j |
| Căutare full-text / similaritate | Elasticsearch sau OpenSearch |
| Vector store (similaritate semantică claim-uri) | pgvector sau Qdrant |
| Coadă de procesare asincronă | RabbitMQ / Redis Queue |
| Cache | Redis |
| Frontend web | React / Next.js |
| Aplicații mobile | React Native sau Flutter |
| Extensie browser | WebExtensions API (Manifest V3) |
| Bot mesagerie | WhatsApp Business API / Telegram Bot API |
| Infrastructură | Docker + Kubernetes (scalabilitate pe vârfuri de trafic viral) |
| Monitorizare | Grafana + Prometheus |

### 8.3 Surse de date externe necesare (integrare API/licențiere)

- Baze de date de credibilitate media (NewsGuard, MBFC sau echivalent european)
- Rețea de fact-checkeri certificați IFCN + EDMO (European Digital Media Observatory)
- WHOIS / domain intelligence
- Reverse image search (Google Vision API / TinEye API)
- Baze de date de dezinformare cunoscută (EUvsDisinfo pentru context regional relevant România/UE)

---

## 9. Model de date — schema principală (simplificată)

```sql
-- Entitate analizată
TABLE content_items (
    id UUID PRIMARY KEY,
    url TEXT,
    raw_text TEXT,
    content_type ENUM('article','social_post','image','video'),
    submitted_at TIMESTAMP,
    language VARCHAR(5)
);

-- Rezultatul agregat
TABLE analysis_results (
    id UUID PRIMARY KEY,
    content_item_id UUID REFERENCES content_items(id),
    ici_score DECIMAL(5,2),
    source_credibility_score DECIMAL(5,2),
    rhetoric_integrity_score DECIMAL(5,2),
    verifiability_score DECIMAL(5,2),
    manipulation_risk_score DECIMAL(5,2),
    category ENUM('solid','mixed','risky','severe'),
    generated_at TIMESTAMP
);

-- Dovezi individuale (explicabilitate)
TABLE evidence_items (
    id UUID PRIMARY KEY,
    analysis_result_id UUID REFERENCES analysis_results(id),
    pillar VARCHAR(50),
    evidence_type VARCHAR(50),
    description TEXT,
    text_excerpt TEXT,
    confidence DECIMAL(5,2),
    source_reference TEXT
);

-- Profiluri de surse (persistente, îmbogățite în timp)
TABLE source_profiles (
    id UUID PRIMARY KEY,
    domain_or_handle TEXT UNIQUE,
    entity_type ENUM('media_outlet','individual','bot_suspected','institution'),
    historical_credibility_score DECIMAL(5,2),
    first_seen TIMESTAMP,
    last_updated TIMESTAMP,
    metadata JSONB
);

-- Claim-uri extrase și verificate individual
TABLE extracted_claims (
    id UUID PRIMARY KEY,
    content_item_id UUID REFERENCES content_items(id),
    claim_text TEXT,
    verification_status ENUM('confirmed','disputed','false','unverifiable'),
    supporting_evidence JSONB
);

-- Comunitate & educație
TABLE user_reports (
    id UUID PRIMARY KEY,
    content_item_id UUID REFERENCES content_items(id),
    reported_by UUID,
    reason TEXT,
    status ENUM('pending','reviewed','actioned'),
    created_at TIMESTAMP
);

TABLE education_progress (
    id UUID PRIMARY KEY,
    user_id UUID,
    course_id UUID,
    quiz_score DECIMAL(5,2),
    certificate_issued BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP
);
```

---

## 10. Fluxul de analiză (pipeline pas cu pas)

1. **Ingestie** — utilizatorul introduce un URL, text, imagine sau video (sau extensia/botul detectează automat conținutul)
2. **Preprocesare** — extragere text curat, metadate, identificare limbă, extragere imagini/video asociate
3. **Fan-out paralel** — cei 4 piloni + modulele suplimentare rulează în paralel
4. **Extragere claim-uri** — LLM identifică afirmațiile factuale verificabile
5. **Verificare claim-uri** — cross-reference cu fact-checkeri + surse citate + căutare web
6. **Agregare** — motorul de scoring combină semnalele într-un rezultat structurat, ponderat adaptiv
7. **Generare explicații** — LLM transformă semnalele tehnice în explicații clare, în limbaj natural
8. **Livrare rezultat** — dashboard interactiv + export (raport PDF branded, pentru cazuri instituționale/educaționale)
9. **Feedback loop** — moderatorii/experții corectează rezultate, alimentând îmbunătățirea continuă a modelelor

---

## 11. Cerințe non-funcționale

- **Timp de răspuns:** analiză preliminară sub 5 secunde; analiză completă (inclusiv forensics media) sub 60 secunde, cu progres incremental afișat
- **Scalabilitate:** auto-scaling pentru vârfuri de trafic în jurul evenimentelor virale
- **Multilingv:** prioritate română și engleză, extensibil
- **Accesibilitate:** conformitate WCAG 2.1 AA
- **Confidențialitate:** GDPR compliant; conținut analizat individual nestocat public fără consimțământ; anonimizare implicită
- **Auditabilitate:** fiecare scor trasabil până la sursele și modelele care l-au generat
- **Rezistență la manipularea sistemului însuși:** protecție împotriva adversarial prompting și spam de rapoarte comunitare

---

## 12. Roadmap sugerat (MVP → Platformă completă)

**Faza 1 — MVP (3 luni)**
- Analiza text (Pilonii 2 și 4: stil retoric + semne de manipulare) folosind LLM
- Profiluri de bază pentru surse (Pilonul 1)
- Dashboard premium cu cele 4 scoruri
- Website public cu identitate de brand completă

**Faza 2 — Extindere (luna 4-7)**
- Verificare surse citate + reverse image search (Pilonul 3)
- Integrare fact-checkeri (IFCN/EDMO)
- Extragere și verificare claim-uri individuale
- API public v1 + primul badge încorporabil
- Modulul educațional (cursuri + quiz-uri)

**Faza 3 — Maturizare (luna 8-12)**
- Detectare deepfake video/audio
- Extensie browser + bot WhatsApp/Telegram
- Grafuri de rețea de distribuție (coordonare inautentică)
- Dashboard instituțional pentru școli/ONG-uri
- Aplicații mobile iOS/Android

**Faza 4 — Scalare**
- API widget pentru redacții partenere
- Suport multilingv extins (regiune UE/Balcani)
- Raportare comunitară + moderare hibridă om-AI
- Aliniere formală DSA (trusted flagger) și parteneriate instituționale

---

## 13. Metrici de succes

- **Precizie** a claim-verification vs. evaluare umană de control (target inițial: >85% acord)
- **Rata de fals-pozitiv** pe conținut legitim (critică pentru credibilitatea platformei)
- **Timp mediu de analiză**
- **Rata de adopție** a explicațiilor (indicator al succesului educațional real, nu doar tehnic)
- **Feedback de la fact-checkeri profesioniști** parteneri
- **Număr de utilizatori certificați** prin modulul educațional (indicator de impact civic, relevant pentru raportarea către finanțatori)

---

## 14. Note pentru echipa de dezvoltare

- Prioritizează **explicabilitatea** peste acuratețea brută a unui singur scor.
- Evită orice interfață care încurajează consumul pasiv al verdictului fără citirea raționamentului.
- Testează activ cu conținut **legitim dar controversat** pentru a calibra împotriva supra-marcării opiniilor legitime ca "dezinformare".
- Documentează public metodologia de scoring (transparența e parte din brand, nu doar din etică).
- Menține consecvent identitatea vizuală premium în orice modul nou adăugat — un produs perceput ca "amator" subminează chiar mesajul de credibilitate pe care platforma îl transmite.

---

*Document realizat de echipa de tineri din cadrul Asociației Grupul Verde, sub coordonarea IT a lui Marian Dumitru, ca bază de discuție tehnică pentru dezvoltarea platformei VERITAS AI. Proiectul este relevant pentru linii de finanțare europene aliniate cu profilul organizației (Horizon Europe, Digital Europe Programme, Erasmus+), datorită componentei duale de tehnologie AI și educație civică digitală.*
