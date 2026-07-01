import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Date de test/demonstrație — NU sunt evaluări reale ale unor publicații.
// Pentru producție, acest tabel se populează din integrări reale
// (NewsGuard, MBFC, EDMO) conform secțiunii 8.3 din specificație.
const DEMO_SOURCE_PROFILES = [
  {
    domain: "exemplu-redactie-verificata.ro",
    entityType: "media_outlet" as const,
    historicalCredibilityScore: 82,
    note: "Sursă demo: redacție cu politică editorială transparentă și istoric de corectări publice.",
  },
  {
    domain: "exemplu-blog-anonim.example",
    entityType: "individual" as const,
    historicalCredibilityScore: 28,
    note: "Sursă demo: fără pagină 'Despre noi', fără date de contact verificabile.",
  },
  {
    domain: "exemplu-institutie-publica.ro",
    entityType: "institution" as const,
    historicalCredibilityScore: 75,
    note: "Sursă demo: instituție publică cu comunicare oficială documentată.",
  },
];

async function main() {
  for (const profile of DEMO_SOURCE_PROFILES) {
    await prisma.sourceProfile.upsert({
      where: { domain: profile.domain },
      update: profile,
      create: profile,
    });
  }
  console.log(`Seed complet: ${DEMO_SOURCE_PROFILES.length} profiluri de surse demo.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
