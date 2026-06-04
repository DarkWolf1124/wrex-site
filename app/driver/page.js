'use client';
import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://fgxwrdelotuynufjklkw.supabase.co',
  'sb_publishable_fozIr8sv43Jjsph7T3VGFA_r8wuVniZ'
);

export default function DriverPage() {
  const [sessionId, setSessionId] = useState('');
  const [status, setStatus] = useState('idle');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState('');
  const [coords, setCoords] = useState(null);
  const watchRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('session');
    if (id) setSessionId(id);
  }, []);

  const sendLocation = async (latitude, longitude, sid) => {
    try {
      const { error } = await supabase
        .from('tracking_sessions')
        .update({ driver_lat: latitude, driver_lng: longitude, updated_at: new Date().toISOString() })
        .eq('id', sid);
      if (error) throw error;
      setLastUpdate(new Date().toLocaleTimeString());
      setCoords({ latitude, longitude });
    } catch (e) {
      setError('Failed to send location. Check your connection.');
    }
  };

  const startTracking = (sid) => {
    if (!navigator.geolocation) { setError('GPS not supported on this device.'); setStatus('error'); return; }
    setStatus('tracking'); setError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => sendLocation(pos.coords.latitude, pos.coords.longitude, sid),
      () => { setError('Could not get GPS. Make sure location is enabled.'); setStatus('error'); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
    watchRef.current = navigator.geolocation.watchPosition(
      (pos) => sendLocation(pos.coords.latitude, pos.coords.longitude, sid),
      () => setError('GPS signal lost.'),
      { enableHighAccuracy: true, maximumAge: 5000 }
    );
  };

  const stopTracking = async () => {
    if (watchRef.current) navigator.geolocation.clearWatch(watchRef.current);
    if (sessionId) await supabase.from('tracking_sessions').update({ status: 'completed' }).eq('id', sessionId);
    setStatus('done');
  };

  const handleStart = () => {
    if (!sessionId.trim()) { setError('Please enter a session ID.'); return; }
    startTracking(sessionId.trim());
  };

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#080D18', color:'#fff', fontFamily:'-apple-system, BlinkMacSystemFont, sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px' }}>
      <div style={{ marginBottom:32, textAlign:'center' }}>
        <div style={{ fontSize:28, fontWeight:800, letterSpacing:6 }}>WREX</div>
        <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', marginTop:4 }}>Driver Tracking</div>
      </div>

      <div style={{ backgroundColor:'#0F1829', borderRadius:20, padding:28, width:'100%', maxWidth:400, border:'1px solid rgba(77,171,247,0.2)' }}>

        {status === 'idle' && (
          <>
            <div style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>Start Job Tracking</div>
            <div style={{ fontSize:14, color:'rgba(255,255,255,0.55)', marginBottom:24, lineHeight:1.6 }}>Enter your session ID or open this page from the link your dispatcher sent.</div>
            <label style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.6)', letterSpacing:0.5 }}>SESSION ID</label>
            <input type="text" value={sessionId} onChange={(e)=>setSessionId(e.target.value)} placeholder="Paste session ID here..." style={{ width:'100%', padding:'12px', marginTop:6, marginBottom:20, backgroundColor:'#162033', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, color:'#fff', fontSize:15, boxSizing:'border-box' }}/>
            {error && <div style={{ backgroundColor:'rgba(231,76,60,0.15)', borderRadius:10, padding:12, marginBottom:16, fontSize:13, color:'#E74C3C' }}>{error}</div>}
            <button onClick={handleStart} style={{ width:'100%', padding:'16px', backgroundColor:'#4DABF7', border:'none', borderRadius:12, color:'#fff', fontSize:16, fontWeight:700, cursor:'pointer' }}>Start Sharing Location</button>
          </>
        )}

        {status === 'tracking' && (
          <>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
              <div style={{ width:16, height:16, borderRadius:8, backgroundColor:'#27AE60', boxShadow:'0 0 0 4px rgba(39,174,96,0.3)' }}/>
              <div>
                <div style={{ fontSize:18, fontWeight:700 }}>Broadcasting Location</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,0.55)', marginTop:2 }}>Customer can see your location</div>
              </div>
            </div>
            {coords && (
              <div style={{ backgroundColor:'#162033', borderRadius:12, padding:16, marginBottom:20 }}>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', letterSpacing:1, marginBottom:8 }}>YOUR LOCATION</div>
                <div style={{ fontSize:14, color:'#4DABF7', fontWeight:600 }}>{coords.latitude.toFixed(6)}, {coords.longitude.toFixed(6)}</div>
                {lastUpdate && <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', marginTop:6 }}>Last updated: {lastUpdate}</div>}
              </div>
            )}
            <div style={{ backgroundColor:'rgba(39,174,96,0.1)', borderRadius:10, padding:12, marginBottom:20, fontSize:13, color:'#27AE60', lineHeight:1.6 }}>
              Keep this page open while driving. Your location updates automatically.
            </div>
            {error && <div style={{ backgroundColor:'rgba(231,76,60,0.15)', borderRadius:10, padding:12, marginBottom:16, fontSize:13, color:'#E74C3C' }}>⚠️ {error}</div>}
            <button onClick={stopTracking} style={{ width:'100%', padding:'16px', backgroundColor:'transparent', border:'1.5px solid #E74C3C', borderRadius:12, color:'#E74C3C', fontSize:16, fontWeight:700, cursor:'pointer' }}>Job Complete — Stop Tracking</button>
          </>
        )}

        {status === 'done' && (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:64, marginBottom:16 }}>✅</div>
            <div style={{ fontSize:22, fontWeight:700, marginBottom:8 }}>Job Complete!</div>
            <div style={{ fontSize:14, color:'rgba(255,255,255,0.55)', lineHeight:1.6 }}>Location sharing has stopped. The customer has been notified.</div>
          </div>
        )}

        {status === 'error' && (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:64, marginBottom:16 }}>⚠️</div>
            <div style={{ fontSize:22, fontWeight:700, marginBottom:8 }}>GPS Error</div>
            <div style={{ fontSize:14, color:'rgba(255,255,255,0.55)', lineHeight:1.6, marginBottom:24 }}>{error}</div>
            <button onClick={()=>setStatus('idle')} style={{ padding:'14px 32px', backgroundColor:'#4DABF7', border:'none', borderRadius:12, color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer' }}>Try Again</button>
          </div>
        )}
      </div>

      <div style={{ marginTop:24, fontSize:12, color:'rgba(255,255,255,0.2)', textAlign:'center' }}>Wrex Driver Portal · Keep this page open while on the job</div>
    </div>
  );
}
