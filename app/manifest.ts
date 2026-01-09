import type { MetadataRoute } from "next";
import { BRAND, LOGO_PATH, SITE_DESCRIPTION, SITE_NAME } from "./seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: BRAND.background,
    theme_color: BRAND.background,
    icons: [
      {
        src: LOGO_PATH,
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}

