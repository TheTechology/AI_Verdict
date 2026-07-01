import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title") };
}

export default async function ConfidentialitatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <main className="max-w-2xl mx-auto px-4 py-10 space-y-4 text-sm text-ink-200">
      <h1 className="font-serif text-2xl font-bold text-ink-50">{t("title")}</h1>
      <p className="italic text-ink-400">{t("draftNotice")}</p>
      <p>{t("paragraph1")}</p>
      <p>
        {t("paragraph2Pre")}{" "}
        <a
          href="https://www.anthropic.com/legal/privacy"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          {t("paragraph2LinkText")}
        </a>
        {t("paragraph2Post")}
      </p>
      <p className="italic text-ink-400">{t("todoNote")}</p>
    </main>
  );
}
