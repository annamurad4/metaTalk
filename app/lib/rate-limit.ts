type Window = { start: number; count: number };
const WINDOW_MS = 10 * 60 * 1000; // 10 dk
const LIMIT = 20; // IP başına 10 dk içinde 20 istek (MVP)

const globalStore = globalThis as unknown as { rl?: Map<string, Window> };
const store = globalStore.rl ?? new Map<string, Window>();
if (process.env.NODE_ENV !== 'production') globalStore.rl = store;

export function rateLimitOk(key: string, limit = LIMIT, windowMs = WINDOW_MS) {
	const now = Date.now();
	const w = store.get(key);
	if (!w || now - w.start > windowMs) {
		store.set(key, { start: now, count: 1 });
		return true;
	}
	if (w.count >= limit) return false;
	w.count += 1;
	return true;
}


