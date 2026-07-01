# VERITAS AI — Schelet MVP

Schelet de cod pentru Faza 1 (MVP) a platformei VERITAS AI, conform
[specificatie-platforma-anti-dezinformare.md](./specificatie-platforma-anti-dezinformare.md).

Acoperă: analiză text (Pilonii 2 și 4, via Claude API), profiluri de bază pentru surse
(Pilonul 1), dashboard cu Indicele Compozit de Încredere (ICI). Pilonul 3 (verificare
surse citate) e marcat ca „disponibil în Faza 2" — nu e implementat încă.

## Cerințe

- Node.js 20+ și npm — `.nvmrc` fixează versiunea (`nvm use`)
- O bază de date PostgreSQL — recomandat [Neon](https://neon.tech) (tier gratuit, integrare
  nativă cu Vercel). SQLite NU e o opțiune: pe hosting serverless discul e efemer.
- O cheie API Anthropic (Claude) — [console.anthropic.com](https://console.anthropic.com)

## Pornire locală

```bash
npm install    # rulează automat și `prisma generate` (script postinstall)

cp .env.example .env
# editează .env:
#   ANTHROPIC_API_KEY=sk-ant-...
#   DATABASE_URL=<connection string Postgres, ex. din Neon>

npm run prisma:migrate   # creează tabelele (prisma migrate dev --name init)
npm run prisma:seed      # populează câteva profiluri de surse demo

npm run dev
```

Aplicația pornește pe [http://localhost:3000](http://localhost:3000).

## Verificări

```bash
npm run typecheck   # verificare de tipuri
npm run build        # build de producție (Next.js + Prisma Client)
```

## Deploy pe Vercel + Neon

1. **Baza de date** — creează un proiect nou pe [neon.tech](https://neon.tech), copiază
   connection string-ul (cu `?sslmode=require`).
2. **Repo** — pune codul pe GitHub (vezi mai jos secțiunea Git).
3. **Vercel** — [vercel.com/new](https://vercel.com/new) → importă repo-ul. Framework
   Preset „Next.js" e detectat automat, fără configurare suplimentară.
4. **Variabile de mediu** (Vercel → Project Settings → Environment Variables):
   - `ANTHROPIC_API_KEY`
   - `DATABASE_URL` (connection string-ul Neon)
   - `NEXT_PUBLIC_SITE_URL` (domeniul final, ex. `https://veritas-ai.ro`) — setează-l
     după primul deploy, când cunoști URL-ul real
5. **Migrații** — Vercel doar face build, nu rulează migrații. Din mașina locală, cu
   `DATABASE_URL` setat la baza de date de producție:
   ```bash
   npm run prisma:deploy   # prisma migrate deploy — aplică migrațiile fără să le regenereze
   ```
6. **Seed (opțional, o singură dată)** — `npm run prisma:seed` cu același `DATABASE_URL`.
7. Redeploy din Vercel după ce variabilele de mediu sunt setate.

## Ce e deja pregătit pentru producție

- **Headere de securitate + CSP** — `next.config.ts` (active doar în build de producție,
  ca să nu blocheze HMR-ul din `npm run dev`)
- **Rate limiting de bază** pe `/api/analyze` — `src/lib/rateLimit.ts`, în memorie, 10
  cereri/minut per IP. **Limitare cunoscută**: pe Vercel (multi-instanță) limita reală e
  mai permisivă, fiindcă fiecare instanță serverless are propriul contor. Pentru limitare
  distribuită corectă, migrează la [Upstash Redis](https://upstash.com) (`@upstash/ratelimit`).
- **Limită de lungime text** (20.000 caractere) pe `/api/analyze`, pentru a limita costul
  per cerere la Claude API
- **`/api/health`** — endpoint pentru monitorizare uptime (verifică conexiunea la DB)
- **SEO/OpenGraph** — `robots.ts`, `sitemap.ts`, metadate în `layout.tsx`
- **`/confidentialitate`** — schiță, NU politică de confidențialitate publicabilă. Trebuie
  revizuită de un jurist înainte de lansare (vezi nota din pagină)

## Ce NU e încă pregătit pentru trafic real (de discutat cu echipa înainte de lansare publică)

- Rate limiting distribuit real (vezi mai sus)
- Autentificare/conturi de utilizator (platforma e complet publică/anonimă momentan)
- Politică de confidențialitate și termeni de utilizare revizuiți legal
- Monitorizare/alertare (Grafana + Prometheus sunt în arhitectura propusă, secțiunea 8.2,
  neimplementate în acest schelet)

## Structură

- `src/app/page.tsx` — pagina principală (formular + dashboard)
- `src/app/api/analyze/route.ts` — endpoint-ul care orchestrează pipeline-ul de analiză
- `src/lib/anthropic.ts` — apelul către Claude API (Pilonii 2 și 4)
- `src/lib/sourceProfile.ts` — lookup/creare profil de sursă (Pilonul 1, simplificat)
- `src/lib/scoring.ts` — agregarea scorurilor în Indicele Compozit de Încredere (ICI)
- `prisma/schema.prisma` — schema bazei de date (PostgreSQL)

## Git

Repo-ul local e inițializat cu un prim commit. Pentru a-l pune pe GitHub:

```bash
gh repo create veritas-ai --private --source=. --remote=origin
git push -u origin main
```

(sau creează manual un repo pe github.com și adaugă-l cu `git remote add origin <url>`)

## Notă

`prisma/seed.ts` conține date de test fictive, NU evaluări reale ale unor publicații.
Pentru date reale de credibilitate a surselor, integrează NewsGuard/MBFC/EDMO conform
secțiunii 8.3 din specificație.
