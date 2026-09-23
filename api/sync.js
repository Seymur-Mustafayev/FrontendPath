const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const CODE_RE = /^[a-z0-9]{4}(-[a-z0-9]{4}){3}$/;
const MAX_BYTES = 100_000;

async function redis(command) {
  const res = await fetch(REDIS_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    body: JSON.stringify(command)
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.result;
}

function codeFrom(request) {
  const code = new URL(request.url).searchParams.get('code') ?? '';
  return CODE_RE.test(code) ? code : null;
}

function json(body, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function GET(request) {
  if (!REDIS_URL) return json({ error: 'Baza qoşulmayıb' }, 503);
  const code = codeFrom(request);
  if (!code) return json({ error: 'Yanlış kod' }, 400);
  const raw = await redis(['GET', `sync:${code}`]);
  return json({ data: raw ? JSON.parse(raw) : null });
}

export async function PUT(request) {
  if (!REDIS_URL) return json({ error: 'Baza qoşulmayıb' }, 503);
  const code = codeFrom(request);
  if (!code) return json({ error: 'Yanlış kod' }, 400);
  const text = await request.text();
  if (text.length > MAX_BYTES) return json({ error: 'Data çox böyükdür' }, 413);
  try {
    JSON.parse(text);
  } catch {
    return json({ error: 'JSON deyil' }, 400);
  }
  await redis(['SET', `sync:${code}`, text]);
  return json({ ok: true });
}
