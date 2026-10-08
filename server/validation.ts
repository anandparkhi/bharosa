import { DEFAULT_LANG, MAX_INPUT_CHARS } from "./constants.js";

export type Language = "en" | "hi" | "mr";
export type RequestBody = {
  mode: "ask" | "check";
  text: string;
  lang: Language;
  imageBase64?: string;
  imageType?: "image/jpeg" | "image/png" | "image/webp";
};
const BASE64_BLOCK = 4;
const JPEG_HEADER = 3;
const PNG_HEADER = 8;
const RIFF_HEADER = 4;
const WEBP_OFFSET = 8;
const WEBP_END = 12;
const MAX_IMAGE_CHARS = 2_600_000;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export class InputError extends Error {}

export function validateBody(value: unknown): RequestBody {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new InputError("invalid_body");
  const body = value as Record<string, unknown>;
  if (body.mode !== "ask" && body.mode !== "check") throw new InputError("invalid_mode");
  const lang = body.lang ?? DEFAULT_LANG;
  if (lang !== "en" && lang !== "hi" && lang !== "mr") throw new InputError("invalid_language");
  const text = body.text ?? "";
  if (typeof text !== "string" || text.length > MAX_INPUT_CHARS) throw new InputError("invalid_text");
  const { imageBase64, imageType } = body;
  if (imageBase64 !== undefined || imageType !== undefined) {
    if (
      body.mode !== "check" ||
      typeof imageBase64 !== "string" ||
      !imageBase64.length ||
      imageBase64.length > MAX_IMAGE_CHARS ||
      imageBase64.length % BASE64_BLOCK !== 0 ||
      !/^[A-Za-z0-9+/]+={0,2}$/.test(imageBase64) ||
      !IMAGE_TYPES.includes(String(imageType))
    ) {
      throw new InputError("invalid_image");
    }
    const bytes = Buffer.from(imageBase64, "base64");
    const signature =
      imageType === "image/jpeg"
        ? bytes.subarray(0, JPEG_HEADER).toString("hex") === "ffd8ff"
        : imageType === "image/png"
          ? bytes.subarray(0, PNG_HEADER).toString("hex") === "89504e470d0a1a0a"
          : bytes.subarray(0, RIFF_HEADER).toString() === "RIFF" &&
            bytes.subarray(WEBP_OFFSET, WEBP_END).toString() === "WEBP";
    if (!signature) throw new InputError("invalid_image");
  }
  if (!text.trim() && !imageBase64) throw new InputError("empty_input");
  return { mode: body.mode, text: text.trim(), lang, imageBase64, imageType } as RequestBody;
}
