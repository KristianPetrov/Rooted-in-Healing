import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readPublicFileAsDataUrl(
  publicFilePath: string,
  mimeType: string,
): Promise<string> {
  const normalized = publicFilePath.replace(/^\//, "");
  const filePath = path.join(process.cwd(), "public", normalized);
  const buffer = await readFile(filePath);
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}

