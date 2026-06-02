'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [partner, setPartner] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const token = localStorage.getItem('wrex_partner_token');
    const stored = localStorage.getItem('wrex_partner');
    if (!token || !stored) { router.push('/partners/login'); return; }
    const p = JSON.parse(stored);
    setPartner(p);
    setForm(p);
    // Fetch fresh data from API
    fetchPartner(token);
  }, []);

  const fetchPartner = async (token) => {
    try {
      const res = await fetch('/api/partners/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.partner) {
        setPartner(data.partner);
        setForm(data.partner);
        localStorage.setItem('wrex_partner', JSON.stringify(data.partner));
      } else if (res.status === 401) {
        logout();
      }
    } catch {}
  };

  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const token = localStorage.getItem('wrex_partner_token');
      const res = await fetch('/api/partners/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.partner) {
        setPartner(data.partner);
        localStorage.setItem('wrex_partner', JSON.stringify(data.partner));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.error || 'Could not save changes.');
      }
    } catch {
      setError('Network error.');
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('wrex_partner_token');
    localStorage.removeItem('wrex_partner');
    router.push('/partners/login');
  };

  if (!partner) return (
    <div style={{ minHeight: '100vh', background: '#080D18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)' }}>Loading...</p>
    </div>
  );

  const memberSince = partner.created_at ? new Date(partner.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—';
  const renewalDate = partner.renewal_date ? new Date(partner.renewal_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—';

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(77,171,247,0.2)',
    borderRadius: 10, color: '#fff', padding: '11px 14px', width: '100%',
    fontSize: 14, outline: 'none', transition: 'border-color 0.2s',
  };
  const labelStyle = { fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 5, letterSpacing: 0.5 };

  return (
    <div style={{ minHeight: '100vh', background: '#080D18', color: '#fff' }}>

      {/* Top nav */}
      <nav style={{
        background: 'rgba(0,0,0,0.9)', borderBottom: '1px solid rgba(77,171,247,0.15)',
        padding: '0 24px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="font-display" style={{ fontSize: 20, fontWeight: 700, letterSpacing: 5, color: '#fff' }}>WREX</span>
          </Link>
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.15)' }}/>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Partner Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{partner.company_name}</span>
          <button onClick={logout} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
            Sign out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>

        {/* Status card */}
        <div style={{
          background: partner.is_active ? 'rgba(39,174,96,0.1)' : 'rgba(243,156,18,0.1)',
          border: `1px solid ${partner.is_active ? 'rgba(39,174,96,0.3)' : 'rgba(243,156,18,0.3)'}`,
          borderRadius: 16, padding: '20px 24px', marginBottom: 32,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: partner.is_active ? '#27AE60' : '#F39C12' }}/>
            <span style={{ fontWeight: 700, color: partner.is_active ? '#27AE60' : '#F39C12' }}>
              {partner.is_active ? 'Active — Listed in Wrex App' : 'Pending Activation'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>MEMBER SINCE</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{memberSince}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>RENEWAL DATE</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{renewalDate}</div>
            </div>
          </div>
        </div>

        {/* Tab nav */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 32, background: '#0F1829', padding: 4, borderRadius: 12, width: 'fit-content' }}>
          {['profile', 'contact', 'account'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '8px 20px', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, textTransform: 'capitalize',
              background: activeTab === tab ? '#4DABF7' : 'transparent',
              color: activeTab === tab ? '#000' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.2s',
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Profile tab */}
        {activeTab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Listing info</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 8 }}>This is what drivers see in the Wrex app.</p>

            <div>
              <label style={labelStyle}>COMPANY NAME</label>
              <input style={inputStyle} value={form.company_name || ''} onChange={e => up('company_name', e.target.value)}/>
            </div>
            <div>
              <label style={labelStyle}>TAGLINE <span style={{ fontWeight: 400 }}>(shown under your name)</span></label>
              <input style={inputStyle} value={form.tagline || ''} onChange={e => up('tagline', e.target.value)} placeholder="Fast response · Licensed & insured"/>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>EST. ARRIVAL (minutes)</label>
                <input style={inputStyle} type="number" value={form.eta_minutes || ''} onChange={e => up('eta_minutes', parseInt(e.target.value))} placeholder="15"/>
              </div>
              <div>
                <label style={labelStyle}>HOURS</label>
                <input style={inputStyle} value={form.hours || ''} onChange={e => up('hours', e.target.value)} placeholder="Mon–Fri 7am–9pm"/>
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.is24_7 || false} onChange={e => up('is24_7', e.target.checked)} style={{ accentColor: '#4DABF7', width: 16, height: 16 }}/>
              <span style={{ fontSize: 14 }}>We're open 24/7</span>
            </label>
          </div>
        )}

        {/* Contact tab */}
        {activeTab === 'contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Contact & location</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 8 }}>Your address is used to calculate distance to drivers. Keep it accurate.</p>

            <div>
              <label style={labelStyle}>PHONE NUMBER</label>
              <input style={inputStyle} type="tel" value={form.phone || ''} onChange={e => up('phone', e.target.value)} placeholder="(801) 555-0100"/>
            </div>
            <div>
              <label style={labelStyle}>STREET ADDRESS</label>
              <input style={inputStyle} value={form.address || ''} onChange={e => up('address', e.target.value)} placeholder="123 Main St"/>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>CITY</label>
                <input style={inputStyle} value={form.city || ''} onChange={e => up('city', e.target.value)}/>
              </div>
              <div>
                <label style={labelStyle}>STATE</label>
                <input style={inputStyle} value={form.state || ''} onChange={e => up('state', e.target.value)} maxLength={2}/>
              </div>
              <div>
                <label style={labelStyle}>ZIP</label>
                <input style={inputStyle} value={form.zip || ''} onChange={e => up('zip', e.target.value)}/>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>LATITUDE <span style={{ fontWeight: 400 }}>(auto-filled when possible)</span></label>
                <input style={inputStyle} type="number" step="any" value={form.lat || ''} onChange={e => up('lat', parseFloat(e.target.value))} placeholder="40.7608"/>
              </div>
              <div>
                <label style={labelStyle}>LONGITUDE</label>
                <input style={inputStyle} type="number" step="any" value={form.lng || ''} onChange={e => up('lng', parseFloat(e.target.value))} placeholder="-111.8910"/>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
              To find your coordinates: open Google Maps, right-click your location, and copy the numbers at the top of the menu.
            </p>
          </div>
        )}

        {/* Account tab */}
        {activeTab === 'account' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Account settings</h3>
            <div>
              <label style={labelStyle}>OWNER / CONTACT NAME</label>
              <input style={inputStyle} value={form.owner_name || ''} onChange={e => up('owner_name', e.target.value)}/>
            </div>
            <div>
              <label style={labelStyle}>EMAIL ADDRESS</label>
              <input style={inputStyle} type="email" value={form.email || ''} onChange={e => up('email', e.target.value)}/>
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '8px 0' }}/>
            <div>
              <label style={labelStyle}>NEW PASSWORD <span style={{ fontWeight: 400 }}>(leave blank to keep current)</span></label>
              <input style={inputStyle} type="password" value={form.new_password || ''} onChange={e => up('new_password', e.target.value)} placeholder="Enter new password"/>
            </div>
            <div style={{ background: 'rgba(77,171,247,0.06)', border: '1px solid rgba(77,171,247,0.2)', borderRadius: 12, padding: 16 }}>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                Membership renews on <strong style={{ color: '#fff' }}>{renewalDate}</strong> for $25.00. To cancel your membership, email <a href="mailto:hello@wrexapp.me" style={{ color: '#4DABF7' }}>hello@wrexapp.me</a>.
              </p>
            </div>
          </div>
        )}

        {/* Save button */}
        <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={save} disabled={saving} className="wrex-btn" style={{ minWidth: 160 }}>
            {saving ? 'Saving...' : 'Save changes'}
          </button>
          {saved && <span style={{ color: '#27AE60', fontSize: 14, fontWeight: 600 }}>✓ Changes saved</span>}
          {error && <span style={{ color: '#E74C3C', fontSize: 14 }}>{error}</span>}
        </div>
      </div>
    </div>
  );
}
