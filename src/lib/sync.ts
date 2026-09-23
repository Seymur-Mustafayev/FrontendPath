const CODE_KEY = 'fe-sync-code';
export const CODE_RE = /^[a-z0-9]{4}(-[a-z0-9]{4}){3}$/;

export interface SyncDoc {
  done: Record<string, true>;
  chat: string;
}

export function readCode(): string {
  try {
    return localStorage.getItem(CODE_KEY) ?? '';
  } catch {
    return '';
  }
}

export function writeCode(code: string) {
  try {
    if (code) localStorage.setItem(CODE_KEY, code);
    else localStorage.removeItem(CODE_KEY);
  } catch {
  }
}

export function newCode(): string {
  const abc = 'abcdefghjkmnpqrstuvwxyz23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const chars = Array.from(bytes, (b) => abc[b % abc.length]).join('');
  return chars.match(/.{4}/g)!.join('-');
}

export function normalizeCode(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, '');
}

export async function pull(code: string): Promise<SyncDoc | null> {
  const res = await fetch(`/api/sync?code=${encodeURIComponent(code)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = (await res.json()) as { data: SyncDoc | null };
  return body.data;
}

export async function push(code: string, doc: SyncDoc): Promise<void> {
  const res = await fetch(`/api/sync?code=${encodeURIComponent(code)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doc)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
