'use client';
import Link from 'next/link';

export default function PrivacyPage() {
  const lastUpdated = 'June 15, 2026';

  return (
    <div style={{ minHeight: '100vh', background: '#080D18', color: '#fff', fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(77,171,247,0.15)',
        padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 6, color: '#fff', fontFamily: "'Rajdhani', sans-serif" }}>WREX</span>
        </Link>
        <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, textDecoration: 'none' }}>← Back to home</Link>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '100px 24px 80px' }}>

        <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 48 }}>Last updated: {lastUpdated}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <Section title="Overview">
            Wrex by Wolf Applications ("Wrex," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use the Wrex mobile application ("the App") and our website at wrexapp.com.
          </Section>

          <Section title="Information We Collect">
            <p style={{ marginBottom: 16 }}>When you set up Wrex, you voluntarily provide:</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Li>Your name, phone number, and driver's license information</Li>
              <Li>Vehicle information (year, make, model, color, license plate)</Li>
              <Li>Insurance carrier name, policy number, and claims contact information</Li>
              <Li>Emergency contact name and phone number</Li>
            </ul>
            <p style={{ marginTop: 16 }}>During an accident, you may also provide:</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              <Li>Photos of the accident scene, vehicle damage, and documents</Li>
              <Li>The other driver's information and insurance details</Li>
              <Li>Location data (used only to find nearby towing partners and to share with your emergency contact if you choose)</Li>
              <Li>A description of the accident for your report</Li>
            </ul>
          </Section>

          <Section title="How We Store Your Information">
            <strong style={{ color: '#4DABF7' }}>All data you enter into the Wrex app is stored locally on your device only.</strong>
            <p style={{ marginTop: 12 }}>We do not upload, transmit, or store your personal information, photos, or accident reports on our servers. Your data stays on your phone. If you delete the app, your data is deleted with it.
            </p>
            <p style={{ marginTop: 12 }}>
              The only exception is accident reports you choose to email to your insurance company — that transmission goes directly from your device to your email app and is not routed through Wrex servers.
            </p>
          </Section>

          <Section title="Location Data">
            Wrex requests access to your device's location only when you are actively using the towing feature or when you choose to share your location with an emergency contact during an accident. We do not track your location in the background, store your location history, or share your location with any third parties. Location data is used in real time and is not retained.
          </Section>

          <Section title="Camera and Photo Library">
            Wrex requests access to your camera and photo library only when you choose to take or upload photos during an accident report. Photos you capture are stored on your device only and are never uploaded to our servers.
          </Section>

          <Section title="Third-Party Services">
            <p style={{ marginBottom: 12 }}>The Wrex app uses the following third-party services:</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Li><strong style={{ color: '#fff' }}>Google Maps / Apple Maps</strong> — opened externally when searching for towing companies. Your device's location may be shared with these services when you open them. Their own privacy policies apply.</Li>
              <Li><strong style={{ color: '#fff' }}>Uber / Lyft</strong> — linked externally for rideshare options. Their own privacy policies apply.</Li>
              <Li><strong style={{ color: '#fff' }}>Expo (by Expo Inc.)</strong> — used to build and distribute the app. Expo may collect anonymous crash and usage diagnostics. See Expo's privacy policy at expo.dev/privacy.</Li>
            </ul>
          </Section>

          <Section title="Towing Partner Data">
            If you are a towing company registered as a Wrex Preferred Partner, your business information (company name, phone number, location, and hours) is stored in our secure database and displayed to Wrex app users near your location. This information is provided voluntarily by you when you sign up at wrexapp.com. Payment processing is handled by Stripe — see Stripe's privacy policy at stripe.com/privacy.
          </Section>

          <Section title="Children's Privacy">
            The Wrex app is not directed at children under 13. We do not knowingly collect personal information from children under 13.
          </Section>

          <Section title="Your Rights">
            Since your data is stored on your device, you have full control over it at all times. You can delete all app data by uninstalling the app. If you are a Wrex Preferred Partner and wish to have your business information removed from our database, contact us at the email below.
          </Section>

          <Section title="Changes to This Policy">
            We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the top of this page. Continued use of the app after changes constitutes acceptance of the updated policy.
          </Section>

          <Section title="Contact Us">
            If you have any questions about this Privacy Policy, please contact us at:
            <div style={{ marginTop: 12, padding: '16px 20px', background: 'rgba(77,171,247,0.08)', borderRadius: 10, border: '1px solid rgba(77,171,247,0.2)' }}>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>Wrex by Wolf Applications</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Utah, United States</p>
              <a href="mailto:cwolf4@proton.me" style={{ color: '#4DABF7', fontSize: 14 }}>cwolf4@proton.me</a>
            </div>
          </Section>

        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(77,171,247,0.1)', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>© {new Date().getFullYear()} Wrex by Wolf Applications. All rights reserved.</p>
      </footer>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#4DABF7', marginBottom: 12 }}>{title}</h2>
      <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: 15 }}>
        {children}
      </div>
    </div>
  );
}

function Li({ children }) {
  return (
    <li style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontSize: 15 }}>
      {children}
    </li>
  );
}
