export const SITE_NAME = "Rooted in Healing";

export const SITE_DESCRIPTION =
  "Rooted in Healing is an Indigenous-led organization dedicated to strengthening the Red Road Journeys of our relatives through ceremony, community, traditional teachings, and connection to the land.";

export const SITE_KEYWORDS = [
  "Rooted in Healing",
  "Indigenous-led",
  "Indigenous healing",
  "Red Road",
  "Recovery support",
  "Cultural recovery",
  "Traditional teachings",
  "Ceremony",
  "Community",
  "Land-based healing",
  "Sacred Circle",
];

export const LOGO_PATH = "/rooted-in-healing-logo.png";

export const BRAND = {
  accent: "#B08D57",
  accent2: "#6F7F5B",
  background: "#0B0F0E",
  foreground: "#F6F1E6",
};

export const SITE_URL: URL = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return new URL(explicit);

  // Vercel provides VERCEL_URL without protocol.
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return new URL(`https://${vercel}`);

  return new URL("http://localhost:3000");
})();

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

