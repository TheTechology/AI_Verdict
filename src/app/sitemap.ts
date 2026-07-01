import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: siteUrl,
          ro: `${siteUrl}/ro`,
        },
      },
    },
    {
      url: `${siteUrl}/confidentialitate`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          en: `${siteUrl}/confidentialitate`,
          ro: `${siteUrl}/ro/confidentialitate`,
        },
      },
    },
  ];
}
