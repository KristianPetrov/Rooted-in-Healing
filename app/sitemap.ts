import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL.toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

