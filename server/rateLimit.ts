// Per-instance defence only. Configure a deployment-wide firewall/rate limit on
// the hosting platform before public scale; serverless instances do not share state.
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;
const MAX_KEYS = 2000;
const requests = new Map<string, { count: number; expires: number }>();
export function allowRequest(key: string, now = Date.now()): boolean {
  for (const [k, value] of requests) if (value.expires <= now) requests.delete(k);
  const entry = requests.get(key);
  if (entry) return ++entry.count <= MAX_REQUESTS;
  if (requests.size >= MAX_KEYS) return false;
  requests.set(key, { count: 1, expires: now + WINDOW_MS });
  return true;
}
