"use client";
import { useEffect, useState } from 'react';

type User = {
	name?: string | null;
	surname?: string | null;
	department?: string | null;
	class_year?: number | null;
	avatar_url?: string | null;
};

type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7; // 1 = Pazartesi, 7 = Pazar

const DAYS_OF_WEEK = [
	{ value: 1, label: 'Pazartesi' },
	{ value: 2, label: 'Salı' },
	{ value: 3, label: 'Çarşamba' },
	{ value: 4, label: 'Perşembe' },
	{ value: 5, label: 'Cuma' },
	{ value: 6, label: 'Cumartesi' },
	{ value: 7, label: 'Pazar' },
];

export default function ProfileForm() {
	const [form, setForm] = useState<User>({});
	const [loading, setLoading] = useState(false);
	const [msg, setMsg] = useState<string | null>(null);
	const [languages, setLanguages] = useState<{ code: string; name: string }[]>([]);
	const [learn, setLearn] = useState<{ code: string; level: string }[]>([]);
	const [teach, setTeach] = useState<{ code: string; level: string }[]>([]);
	const [availableDays, setAvailableDays] = useState<DayOfWeek[]>([]);

	useEffect(() => {
		Promise.all([
			fetch('/api/profile').then((r) => r.json()),
			fetch('/api/languages').then((r) => r.json()),
			fetch('/api/user-languages').then((r) => r.json()),
			fetch('/api/user-availability').then((r) => r.json()).catch(() => ({ data: [] })), // Yeni endpoint, henüz yoksa boş liste döndür
		]).then(([p, l, ul, ua]) => {
			if (p?.data) setForm(p.data);
			if (l?.data) setLanguages(l.data);
			if (ul?.data) {
				setLearn(
					ul.data
						.filter((x: any) => x.role === 'learn')
						.map((x: any) => ({ code: x.language.code, level: x.level })),
				);
				setTeach(
					ul.data
						.filter((x: any) => x.role === 'teach')
						.map((x: any) => ({ code: x.language.code, level: x.level })),
				);
			}
			if (ua?.data) {
				setAvailableDays(ua.data.map((x: any) => x.day as DayOfWeek));
			}
		});
	}, []);

	function set<K extends keyof User>(key: K, value: User[K]) {
		setForm((p) => ({ ...p, [key]: value }));
	}

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setMsg(null);
		// Profil bilgileri
		const res = await fetch('/api/profile', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form),
		});
		const data = await res.json();
		if (!res.ok) {
			setLoading(false);
			setMsg(data?.error ?? 'Hata');
			return;
		}
		// Diller (öğren & öğret)
		await fetch('/api/user-languages', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ role: 'learn', items: learn }),
		});
		await fetch('/api/user-languages', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ role: 'teach', items: teach }),
		});
		// Müsait günler
		await fetch('/api/user-availability', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ days: availableDays }),
		});
		setLoading(false);
		setMsg('Profil güncellendi.');
	}

	return (
		<form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={onSubmit}>
			<label className="grid gap-1">
				<span className="text-sm">Ad</span>
				<input className="rounded-md border border-neutral-300 px-3 py-2" value={form.name ?? ''} onChange={(e) => set('name', e.target.value)} />
			</label>
			<label className="grid gap-1">
				<span className="text-sm">Soyad</span>
				<input className="rounded-md border border-neutral-300 px-3 py-2" value={form.surname ?? ''} onChange={(e) => set('surname', e.target.value)} />
			</label>
			<label className="grid gap-1 md:col-span-2">
				<span className="text-sm">Bölüm</span>
				<input className="rounded-md border border-neutral-300 px-3 py-2" value={form.department ?? ''} onChange={(e) => set('department', e.target.value)} />
			</label>
			<label className="grid gap-1">
				<span className="text-sm">Sınıf (1-8)</span>
				<input className="rounded-md border border-neutral-300 px-3 py-2" value={form.class_year ?? ''} onChange={(e) => set('class_year', Number(e.target.value))} type="number" min={1} max={8} />
			</label>
			<label className="grid gap-1">
				<span className="text-sm">Avatar URL (opsiyonel)</span>
				<input className="rounded-md border border-neutral-300 px-3 py-2" value={form.avatar_url ?? ''} onChange={(e) => set('avatar_url', e.target.value)} />
			</label>

			{/* Diller bölümü */}
			<div className="md:col-span-2 grid grid-cols-1 gap-4">
				<div>
					<span className="mb-1 block text-sm font-medium">Öğrenmek istediği diller</span>
					{learn.map((it, idx) => (
						<div key={`l-${idx}`} className="flex gap-2 py-1">
							<select className="rounded-md border border-neutral-300 px-2 py-1" value={it.code} onChange={(e) => setLearn((arr) => arr.map((x, i) => (i === idx ? { ...x, code: e.target.value } : x)))}>
								{languages.map((l) => (
									<option key={l.code} value={l.code}>{l.name}</option>
								))}
							</select>
							<select className="rounded-md border border-neutral-300 px-2 py-1" value={it.level} onChange={(e) => setLearn((arr) => arr.map((x, i) => (i === idx ? { ...x, level: e.target.value } : x)))}>
								{['A1','A2','B1','B2','C1','C2'].map((lv) => (<option key={lv} value={lv}>{lv}</option>))}
							</select>
							<button type="button" className="text-sm" onClick={() => setLearn((arr) => arr.filter((_, i) => i !== idx))}>Kaldır</button>
						</div>
					))}
					<button type="button" className="rounded-md border border-neutral-300 px-2 py-1 text-sm" onClick={() => setLearn((arr) => [...arr, { code: languages[0]?.code ?? 'en', level: 'A1' }])}>Dil ekle</button>
				</div>
				<div>
					<span className="mb-1 block text-sm font-medium">Öğretebileceği diller</span>
					{teach.map((it, idx) => (
						<div key={`t-${idx}`} className="flex gap-2 py-1">
							<select className="rounded-md border border-neutral-300 px-2 py-1" value={it.code} onChange={(e) => setTeach((arr) => arr.map((x, i) => (i === idx ? { ...x, code: e.target.value } : x)))}>
								{languages.map((l) => (<option key={l.code} value={l.code}>{l.name}</option>))}
							</select>
							<select className="rounded-md border border-neutral-300 px-2 py-1" value={it.level} onChange={(e) => setTeach((arr) => arr.map((x, i) => (i === idx ? { ...x, level: e.target.value } : x)))}>
								{['A1','A2','B1','B2','C1','C2'].map((lv) => (<option key={lv} value={lv}>{lv}</option>))}
							</select>
							<button type="button" className="text-sm" onClick={() => setTeach((arr) => arr.filter((_, i) => i !== idx))}>Kaldır</button>
						</div>
					))}
					<button type="button" className="rounded-md border border-neutral-300 px-2 py-1 text-sm" onClick={() => setTeach((arr) => arr.concat({ code: languages[0]?.code ?? 'en', level: 'B1' }))}>Dil ekle</button>
				</div>
				
				{/* Müsait günler bölümü */}
				<div>
					<span className="mb-1 block text-sm font-medium">Müsait olduğunuz günler</span>
					<div className="flex flex-wrap gap-2 py-2">
						{DAYS_OF_WEEK.map((day) => (
							<label key={day.value} className="flex items-center gap-2 border rounded-md border-neutral-300 px-3 py-2">
								<input
									type="checkbox"
									checked={availableDays.includes(day.value as DayOfWeek)}
									onChange={(e) => {
										if (e.target.checked) {
											setAvailableDays(prev => [...prev, day.value as DayOfWeek]);
										} else {
											setAvailableDays(prev => prev.filter(d => d !== day.value));
										}
									}}
								/>
								<span>{day.label}</span>
							</label>
						))}
					</div>
				</div>
			</div>
			<div className="md:col-span-2">
				<button disabled={loading} className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-60">{loading ? 'Kaydediliyor...' : 'Kaydet'}</button>
				{msg && <span className="ml-3 text-sm text-neutral-600">{msg}</span>}
			</div>
		</form>
	);
}



