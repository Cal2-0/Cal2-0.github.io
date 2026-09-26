import React from 'react';
import LegoTechStack from '../components/ui/LegoTechStack';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const StackBuilder = () => {
  return (
    <div style={{ backgroundColor: '#070709', minHeight: '100vh', padding: '120px 20px 40px', color: '#E8D5B5', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <Link to="/vault" style={{ color: 'var(--color-gold, #C5A880)', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '1px', marginBottom: '20px' }}>
          <ArrowLeft size={16} />
          RETURN TO VAULT
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFF', margin: '0 0 10px 0', letterSpacing: '1px', textAlign: 'center' }}>
          Interactive Stack Builder
        </h1>
        <p style={{ fontFamily: 'var(--font-mono, monospace)', color: '#8E8D8A', fontSize: '0.85rem', textAlign: 'center', marginBottom: '40px', letterSpacing: '1px' }}>
          MIX & MATCH OVER 20+ TECHNOLOGIES TO BUILD CUSTOM ARCHITECTURES
        </p>
      </div>
      <div style={{ padding: '20px', border: '1px solid rgba(197, 168, 128, 0.2)', borderRadius: '12px', background: 'rgba(10, 10, 15, 0.6)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <LegoTechStack />
      </div>
    </div>
  );
};

export default StackBuilder;
