import { ImageResponse } from "next/og";
import { BRAND, LOGO_PATH, SITE_DESCRIPTION, SITE_NAME } from "./seo/site";
import { readPublicFileAsDataUrl } from "./seo/assets";

export const runtime = "nodejs";
export const contentType = "image/png";

type SocialVariant = "openGraph" | "twitter";

export function getSocialImageSize(variant: SocialVariant) {
  return variant === "openGraph"
    ? { width: 1200, height: 630 }
    : { width: 1200, height: 600 };
}

export async function createSocialImage(variant: SocialVariant) {
  const { width, height } = getSocialImageSize(variant);
  const logoDataUrl = await readPublicFileAsDataUrl(LOGO_PATH, "image/png");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: BRAND.background,
          color: BRAND.foreground,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 15%, rgba(176,141,87,0.28), transparent 55%), radial-gradient(circle at 80% 30%, rgba(111,127,91,0.22), transparent 60%)",
          }}
        />

        <div style={{ position: "relative", display: "flex", gap: 24 }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 28,
              background: "rgba(176,141,87,0.10)",
              border: "1px solid rgba(176,141,87,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={logoDataUrl}
              width={96}
              height={96}
              style={{ borderRadius: 22 }}
              alt=""
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 58, fontWeight: 700, letterSpacing: -1 }}>
              {SITE_NAME}
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 28,
                lineHeight: 1.25,
                maxWidth: 860,
                color: "rgba(246,241,230,0.88)",
              }}
            >
              Indigenous-led Healing &amp; Red Road Journeys
            </div>
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", gap: 20 }}>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.3,
              maxWidth: variant === "openGraph" ? 980 : 1040,
              color: "rgba(246,241,230,0.86)",
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "rgba(246,241,230,0.78)",
            }}
          >
            Ceremony • Community • Traditional teachings • Land connection
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(246,241,230,0.72)",
              border: "1px solid rgba(246,241,230,0.16)",
              padding: "10px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.04)",
            }}
          >
            rooted-in-healing
          </div>
        </div>
      </div>
    ),
    { width, height },
  );
}

