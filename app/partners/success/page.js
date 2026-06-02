'use client';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080D18', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      <div style={{ width: 72, height: 72, borderRadius: 36, background: 'rgba(39,174,96,0.15)', border: '2px solid #27AE60', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17L4 12" stroke="#27AE60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1 className="font-display" style={{ fontSize: 40, fontWeight: 700, marginBottom: 12 }}>Welcome to Wrex!</h1>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, maxWidth: 420, lineHeight: 1.7, marginBottom: 32 }}>
        Your payment was successful. Your company is now listed as a <strong style={{ color: '#4DABF7' }}>Wrex Preferred Partner</strong>. You'll receive a confirmation email shortly.
      </p>
      <Link href="/partners/login" className="wrex-btn">
        Sign in to your dashboard →
      </Link>
    </div>
  );
}
