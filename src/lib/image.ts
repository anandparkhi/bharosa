import { IMAGE_LIMITS } from "../constants";

/**
 * Downscales and re-encodes an image on a canvas before it leaves the browser.
 * Vercel Functions hard-cap the request body at 4.5 MB (raw JSON, not gzipped);
 * a base64 photo inflates ~33% over the original, so an unprocessed phone photo
 * (often 2-8 MB) fails with a 413 that the client can only see as "check failed".
 * Shrinking to MAX_DIMENSION px and re-encoding as JPEG keeps every real screenshot
 * comfortably under the limit while staying legible enough for the model to read.
 */
export async function prepareImage(file: File): Promise<{ base64: string; mediaType: string }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, IMAGE_LIMITS.MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const [width, height] = [Math.round(bitmap.width * scale), Math.round(bitmap.height * scale)];

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unsupported");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let quality = IMAGE_LIMITS.INITIAL_QUALITY;
  let dataUrl = canvas.toDataURL("image/jpeg", quality);
  while (dataUrl.length > IMAGE_LIMITS.MAX_DATA_URL_CHARS && quality > IMAGE_LIMITS.MIN_QUALITY) {
    quality -= IMAGE_LIMITS.QUALITY_STEP;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }
  return { base64: dataUrl.split(",")[1], mediaType: "image/jpeg" };
}
