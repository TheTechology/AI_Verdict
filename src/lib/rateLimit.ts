// Rate limiter minimal, în memorie — suficient pentru un singur runtime/instanță.
// Pe hosting serverless cu multiple instanțe concurente (Vercel), fiecare instanță
// are propriul contor, deci limita reală e mai permisivă decât valoarea configurată.
// Pentru limitare distribuită corectă la trafic real, migrează la Upstash Redis
// (@upstash/ratelimit) — vezi nota din README.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;

export function checkRateLimit(identifier: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const bucket = buckets.get(identifier);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true };
}
