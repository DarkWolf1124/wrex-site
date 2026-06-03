'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ background: '#080D18', minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(77,171,247,0.15)',
        padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <img src="/wrex.svg" alt="Wrex" style={{ height: 44, objectFit: "contain", width: "auto" }}/> 
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="#how-it-works" className="nav-link" style={{ fontSize: 14 }}>How It Works</a>
          <a href="#for-towers" className="nav-link" style={{ fontSize: 14 }}>For Towing Companies</a>
          <Link href="/partners/login" className="nav-link" style={{ fontSize: 14 }}>Partner Login</Link>
          <a href="#download" className="wrex-btn" style={{ padding: '8px 20px', fontSize: 13 }}>Get the App</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 60px', textAlign: 'center', position: 'relative',
      }}>
        {/* Glow blobs */}
        <div className="glow-blob" style={{ width: 500, height: 500, background: 'rgba(77,171,247,0.08)', top: '10%', left: '50%', transform: 'translateX(-50%)' }}/>
        <div className="glow-blob" style={{ width: 300, height: 300, background: 'rgba(0,212,200,0.06)', bottom: '20%', right: '10%' }}/>


        <h1 className="font-display" style={{
          fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 700, letterSpacing: 2,
          lineHeight: 1.05, marginBottom: 24,
          opacity: 1,
        }}>
          When accidents happen,<br/>
          <span style={{ color: '#4DABF7' }}>we've got you covered.</span>
        </h1>

        <p style={{
          fontSize: 18, color: 'rgba(255,255,255,0.6)', maxWidth: 520,
          lineHeight: 1.7, marginBottom: 48,
          opacity: 1,
        }}>
          Wrex guides you through every step of an accident — documenting the scene, 
          contacting insurance, and connecting you with trusted towing partners near you.
        </p>

        <div style={{
          display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
          opacity: 1,
        }} id="download">
          <a href="https://apps.apple.com" target="_blank" rel="noreferrer"
            style={{
              background: '#000', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 12, padding: '12px 24px',
              display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: '#fff',
              transition: 'border-color 0.2s',
            }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Download on the</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>App Store</div>
            </div>
          </a>

          <a href="https://play.google.com" target="_blank" rel="noreferrer"
            style={{
              background: '#000', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 12, padding: '12px 24px',
              display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: '#fff',
            }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3.18 23.76c.3.17.64.24.99.19l12.49-7.22-2.79-2.79-10.69 9.82zM.5 1.1C.18 1.47 0 2.01 0 2.7v18.61c0 .69.18 1.23.51 1.6l.08.08 10.43-10.43v-.23L.58 1.02.5 1.1zm19.13 10.9l-2.83-2.83L13.97 12l2.83 2.83 2.83-2.83zM16.67 4.05L4.18.83c-.34-.09-.66-.05-.95.12L13.93 9.61l2.74-5.56z" fill="white"/>
            </svg>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Get it on</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Google Play</div>
            </div>
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{ marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.4 }}>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, #4DABF7, transparent)' }}/>
          <span style={{ fontSize: 11, letterSpacing: 2 }}>SCROLL</span>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#4DABF7', fontSize: 12, letterSpacing: 3, fontWeight: 600, marginBottom: 16 }}>FOR DRIVERS</p>
        <h2 className="font-display" style={{ textAlign: 'center', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, marginBottom: 64 }}>
          Calm in the chaos.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {[
            { num: '01', title: 'Tap for help', desc: 'The moment you\'re in an accident, tap the big button. Wrex walks you through exactly what to do — step by step.' },
            { num: '02', title: 'Document everything', desc: 'Capture the other driver\'s info, take photos of the scene, call police, and record everything that matters for your claim.' },
            { num: '03', title: 'Get a tow', desc: 'Connect with a verified Wrex preferred towing partner near you, or search Google for the nearest available service.' },
          ].map(({ num, title, desc }) => (
            <div key={num} className="partner-card" style={{
              background: '#0F1829', border: '1px solid rgba(77,171,247,0.15)',
              borderRadius: 20, padding: 32,
            }}>
              <div className="font-display" style={{ fontSize: 48, color: 'rgba(77,171,247,0.25)', fontWeight: 700, marginBottom: 16 }}>{num}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: 15 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOR TOWING COMPANIES ── */}
      <section id="for-towers" style={{
        padding: '100px 24px',
        background: 'linear-gradient(180deg, #080D18 0%, #0A1828 100%)',
        borderTop: '1px solid rgba(77,171,247,0.1)',
        borderBottom: '1px solid rgba(77,171,247,0.1)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', color: '#4DABF7', fontSize: 12, letterSpacing: 3, fontWeight: 600, marginBottom: 16 }}>FOR TOWING COMPANIES</p>
          <h2 className="font-display" style={{ textAlign: 'center', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, marginBottom: 16 }}>
            Be there when it matters most.
          </h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.55)', fontSize: 17, maxWidth: 580, margin: '0 auto 64px', lineHeight: 1.7 }}>
            Wrex Preferred Partners appear first when drivers near you need a tow — right at the moment of an accident.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 64 }}>
            {[
              { icon: '📍', title: 'Location-based', desc: 'Only shown to drivers within 20 miles of your location.' },
              { icon: '⭐', title: 'Top placement', desc: 'Listed above Google results — first thing drivers see.' },
              { icon: '📞', title: 'Direct calls', desc: 'Drivers call you directly. No middleman, no commission.' },
              { icon: '✏️', title: 'Your control', desc: 'Update your info, hours, and profile anytime from your dashboard.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="partner-card" style={{
                background: '#0F1829', border: '1px solid rgba(77,171,247,0.15)',
                borderRadius: 16, padding: 24, textAlign: 'center',
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Pricing card */}
          <div style={{
            maxWidth: 480, margin: '0 auto',
            background: 'linear-gradient(135deg, #0F1829, #0A1828)',
            border: '2px solid rgba(77,171,247,0.4)',
            borderRadius: 24, padding: 48, textAlign: 'center',
            boxShadow: '0 0 60px rgba(77,171,247,0.1)',
          }}>
            <p style={{ color: '#4DABF7', fontSize: 12, letterSpacing: 3, fontWeight: 600, marginBottom: 8 }}>PREFERRED PARTNER</p>
            <div className="font-display" style={{ fontSize: 72, fontWeight: 700, lineHeight: 1 }}>$25</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 32, fontSize: 15 }}>per year · cancel anytime</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36, textAlign: 'left' }}>
              {['Listed in Wrex app near your location','Top placement above Google results','Direct customer calls — no commission','Your own partner dashboard','Update info anytime, instantly'].map(item => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M12 2L4 6V12C4 17 7.5 21 12 22C16.5 21 20 17 20 12V6L12 2Z" fill="rgba(77,171,247,0.2)" stroke="#4DABF7" strokeWidth="1.5"/>
                    <path d="M9 12L11 14L15 10" stroke="#4DABF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link href="/partners/signup" className="wrex-btn" style={{ width: '100%', display: 'block', textDecoration: 'none', textAlign: 'center' }}>
              Become a Preferred Partner →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: '48px 24px', textAlign: 'center',
        borderTop: '1px solid rgba(77,171,247,0.1)',
      }}>
        <span className="font-display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: 6, color: '#fff', display: 'block', marginBottom: 20 }}/> 
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginBottom: 20 }}>We've got you covered.</p>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 32 }}>
          <Link href="/partners/login" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>Partner Login</Link>
          <Link href="/partners/signup" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>Become a Partner</Link>
          <a href="mailto:hello@wrexapp.me" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>Contact</a>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>© {new Date().getFullYear()} Wrex. All rights reserved.</p>
      </footer>
    </div>
  );
}
