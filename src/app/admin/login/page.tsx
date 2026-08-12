'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Loader2, Lock, Mail, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err?.message || 'লগইন ব্যর্থ। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-stone-950 px-4 py-12 selection:bg-amber-500 selection:text-stone-950">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[32rem] w-[32rem] rounded-full bg-amber-600/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-stone-900/80 text-amber-400 shadow-xl shadow-amber-900/20 backdrop-blur-md">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-amber-400">KAHF Treasure</h1>
          <p className="mt-1.5 text-xs font-medium tracking-wide text-stone-400 uppercase">অ্যাডমিন প্যানেলে লগইন করুন</p>
        </div>

        {/* Login Card Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-amber-900/30 bg-stone-900/90 p-8 shadow-2xl shadow-black/80 backdrop-blur-xl"
        >
          <div>
            <label className="mb-2 block text-xs font-semibold text-stone-300">ইমেইল ঠিকানা</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-stone-800 bg-stone-950/80 py-3 pl-10 pr-4 text-sm text-stone-100 placeholder:text-stone-500 outline-none transition duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                placeholder="admin@kahftreasure.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-stone-300">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl border border-stone-800 bg-stone-950/80 py-3 pl-10 pr-4 text-sm text-stone-100 placeholder:text-stone-500 outline-none transition duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-800/40 bg-red-950/40 p-3 text-xs text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-amber-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-600/20 transition duration-200 hover:bg-amber-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'লগইন করুন'}
          </button>

          <div className="border-t border-stone-800/80 pt-4 text-center">
            <p className="text-xs text-stone-400">
              ডিফল্ট অ্যাডমিন: <span className="font-mono text-stone-300">admin@kahftreasure.com</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
