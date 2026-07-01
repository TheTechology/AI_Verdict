"use client";

import { useTranslations } from "next-intl";
import { Leaf } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-ink-800 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-400">
        <p className="flex items-center gap-1.5 text-center sm:text-left">
          <Leaf className="h-3.5 w-3.5 text-verde-400 shrink-0" />
          <span>
            {t("textPre")}{" "}
            <a
              href="https://grupulverde.ro/proiecte/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-ink-200 underline decoration-verde-400/50 hover:decoration-verde-400"
            >
              {t("textLinkText")}
            </a>{" "}
            {t("textPost")}
          </span>
        </p>
        <div className="flex items-center gap-4">
          <a href="#top" className="hover:underline">
            {t("backToTop")}
          </a>
          <Link href="/confidentialitate" className="hover:underline">
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
