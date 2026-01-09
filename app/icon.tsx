import { ImageResponse } from "next/og";
import { LOGO_PATH } from "./seo/site";
import { readPublicFileAsDataUrl } from "./seo/assets";

export const runtime = "nodejs";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default async function Icon() {
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
          background: "transparent",
        }}
      >
        <img
          src={logoDataUrl}
          width={32}
          height={32}
          style={{ borderRadius: 6 }}
          alt=""
        />
      </div>
    ),
    size,
  );
}

