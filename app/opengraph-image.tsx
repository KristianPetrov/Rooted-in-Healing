import { createSocialImage, getSocialImageSize } from "./og-image";
import { SITE_NAME } from "./seo/site";

export const runtime = "nodejs";

export const alt = `${SITE_NAME} — Indigenous-led Healing & Red Road Journeys`;
export const size = getSocialImageSize("openGraph");
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return createSocialImage("openGraph");
}

