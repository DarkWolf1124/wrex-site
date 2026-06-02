'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [step, setStep] = useState(1); // 1=info, 2=payment
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    companyName: '', ownerName: '', email: '', password: '', confirmPassword: '',
    phone: '', address: '', city: '', state: '', zip: '',
    hours: '', is24_7: false, tagline: '',
  });

  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.companyName || !form.email || !form.password || !form.phone || !form.address) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setStep(2);
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partnerData: form }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080D18', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 520 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="font-display" style={{ fontSize: 28, fontWeight: 700, letterSpacing: 6, color: '#fff' }}>WREX</span>
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 6 }}>Preferred Partner Signup</p>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {['Company Info', 'Payment'].map((s, i) => (
            <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ height: 3, borderRadius: 2, background: i < step ? '#4DABF7' : 'rgba(255,255,255,0.1)' }}/>
              <span style={{ fontSize: 11, color: i < step ? '#4DABF7' : 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1829', border: '1px solid rgba(77,171,247,0.2)', borderRadius: 20, padding: 36 }}>

          {step === 1 && (
            <form onSubmit={handleInfoSubmit}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Your company info</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>COMPANY NAME *</label>
                  <input className="wrex-input" value={form.companyName} onChange={e => up('companyName', e.target.value)} placeholder="Ace Towing & Recovery" required/>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>OWNER / CONTACT NAME *</label>
                  <input className="wrex-input" value={form.ownerName} onChange={e => up('ownerName', e.target.value)} placeholder="John Smith" required/>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>EMAIL ADDRESS *</label>
                  <input className="wrex-input" type="email" value={form.email} onChange={e => up('email', e.target.value)} placeholder="john@acetowing.com" required/>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>PASSWORD *</label>
                    <input className="wrex-input" type="password" value={form.password} onChange={e => up('password', e.target.value)} placeholder="Min 8 characters" required/>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>CONFIRM *</label>
                    <input className="wrex-input" type="password" value={form.confirmPassword} onChange={e => up('confirmPassword', e.target.value)} placeholder="Repeat password" required/>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>PHONE NUMBER *</label>
                  <input className="wrex-input" type="tel" value={form.phone} onChange={e => up('phone', e.target.value)} placeholder="(801) 555-0100" required/>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>BUSINESS ADDRESS *</label>
                  <input className="wrex-input" value={form.address} onChange={e => up('address', e.target.value)} placeholder="123 Main St" required/>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>CITY</label>
                    <input className="wrex-input" value={form.city} onChange={e => up('city', e.target.value)} placeholder="Salt Lake City"/>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>STATE</label>
                    <input className="wrex-input" value={form.state} onChange={e => up('state', e.target.value)} placeholder="UT" maxLength={2}/>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>ZIP</label>
                    <input className="wrex-input" value={form.zip} onChange={e => up('zip', e.target.value)} placeholder="84101"/>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>HOURS</label>
                  <input className="wrex-input" value={form.hours} onChange={e => up('hours', e.target.value)} placeholder="Mon–Fri 7am–9pm"/>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.is24_7} onChange={e => up('is24_7', e.target.checked)} style={{ accentColor: '#4DABF7', width: 16, height: 16 }}/>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>We're open 24/7</span>
                  </label>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>SHORT TAGLINE <span style={{ fontWeight: 400 }}>(optional)</span></label>
                  <input className="wrex-input" value={form.tagline} onChange={e => up('tagline', e.target.value)} placeholder="Fast response · Licensed & insured"/>
                </div>
              </div>

              {error && <p style={{ color: '#E74C3C', fontSize: 13, marginTop: 16 }}>{error}</p>}

              <button type="submit" className="wrex-btn" style={{ width: '100%', marginTop: 28 }}>
                Continue to Payment →
              </button>
            </form>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Review & pay</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 28 }}>You'll be redirected to Stripe's secure checkout.</p>

              <div style={{ background: 'rgba(77,171,247,0.06)', border: '1px solid rgba(77,171,247,0.2)', borderRadius: 14, padding: 20, marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Company</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{form.companyName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Email</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{form.email}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Location</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{form.city}, {form.state}</span>
                </div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '16px 0' }}/>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Annual membership</span>
                  <span style={{ fontWeight: 700, fontSize: 18, color: '#4DABF7' }}>$25.00</span>
                </div>
              </div>

              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 24, lineHeight: 1.6 }}>
                Your account will be activated immediately after payment. You can update your listing anytime from your dashboard. Annual renewal applies.
              </div>

              {error && <p style={{ color: '#E74C3C', fontSize: 13, marginBottom: 16 }}>{error}</p>}

              <button onClick={handlePayment} disabled={loading} className="wrex-btn" style={{ width: '100%', marginBottom: 12 }}>
                {loading ? 'Redirecting to Stripe...' : 'Pay $25 & Activate Account →'}
              </button>
              <button onClick={() => setStep(1)} className="wrex-btn-outline" style={{ width: '100%' }}>
                ← Back to edit info
              </button>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 20 }}>
          Already a partner?{' '}
          <Link href="/partners/login" style={{ color: '#4DABF7', textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
