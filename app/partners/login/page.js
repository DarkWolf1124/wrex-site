'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/partners/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('wrex_partner_token', data.token);
        localStorage.setItem('wrex_partner', JSON.stringify(data.partner));
        router.push('/partners/dashboard');
      } else {
        setError(data.error || 'Invalid email or password.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080D18', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="font-display" style={{ fontSize: 28, fontWeight: 700, letterSpacing: 6, color: '#fff' }}>WREX</span>
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 6 }}>Partner Portal</p>
        </div>

        <div style={{ background: '#0F1829', border: '1px solid rgba(77,171,247,0.2)', borderRadius: 20, padding: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Sign in</h2>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>EMAIL</label>
              <input className="wrex-input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@yourtowingco.com" required autoComplete="email"/>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>PASSWORD</label>
              <input className="wrex-input" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Your password" required autoComplete="current-password"/>
            </div>

            {error && <p style={{ color: '#E74C3C', fontSize: 13 }}>{error}</p>}

            <button type="submit" disabled={loading} className="wrex-btn" style={{ width: '100%', marginTop: 8 }}>
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 20 }}>
          Not a partner yet?{' '}
          <Link href="/partners/signup" style={{ color: '#4DABF7', textDecoration: 'none' }}>Sign up for $25/year</Link>
        </p>
      </div>
    </div>
  );
}
