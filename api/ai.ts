import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkMessage } from "../server/check.js";
import { phoneHelp } from "../server/phoneHelp.js";
import { allowRequest } from "../server/rateLimit.js";
import { InputError, validateBody } from "../server/validation.js";

const STATUS = { OK: 200, BAD_REQUEST: 400, FORBIDDEN: 403, METHOD: 405, RATE: 429, UNAVAILABLE: 503 };
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(STATUS.METHOD).json({ error: "post_required" });
  }
  const { origin } = req.headers;
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.host)
        return res.status(STATUS.FORBIDDEN).json({ error: "invalid_origin" });
    } catch {
      return res.status(STATUS.FORBIDDEN).json({ error: "invalid_origin" });
    }
  }
  try {
    const body = validateBody(req.body);
    // Phone guides have no model cost and cannot expose a general-purpose AI.
    if (body.mode === "ask") return res.status(STATUS.OK).json(phoneHelp(body.text, body.lang));
    const ip = String(req.headers["x-vercel-forwarded-for"] ?? req.socket?.remoteAddress ?? "unknown").split(",")[0];
    if (!allowRequest(ip)) {
      res.setHeader("Retry-After", "60");
      return res.status(STATUS.RATE).json({ error: "too_many_requests" });
    }
    return res.status(STATUS.OK).json(await checkMessage(body));
  } catch (error) {
    if (error instanceof InputError) return res.status(STATUS.BAD_REQUEST).json({ error: error.message });
    // No prompts, provider response bodies, images or personal data in logs/client errors.
    console.error("Bharosa request failed");
    return res.status(STATUS.UNAVAILABLE).json({ error: "service_unavailable" });
  }
}
