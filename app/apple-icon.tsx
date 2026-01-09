import { ImageResponse } from "next/og";
import { LOGO_PATH } from "./seo/site";
import { readPublicFileAsDataUrl } from "./seo/assets";

export const runtime = "nodejs";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default async function AppleIcon() {
  const logoDataUrl = await readPublicFileAsDataUrl(LOGO_PATH, "image/png");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0F0E",
        }}
      >
        <div
          style={{
            width: 160,
            height: 160,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 36,
            background: "rgba(176,141,87,0.08)",
            border: "1px solid rgba(176,141,87,0.18)",
          }}
        >
          <img
            src={logoDataUrl}
            width={140}
            height={140}
            style={{ borderRadius: 28 }}
            alt=""
          />
        </div>
      </div>
    ),
    size,
  );
}

