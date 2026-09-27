import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { lenisInstance } from '../../utils/smoothScroll';
import Magnetic from '../motion/Magnetic';
import '../../styles/scenes/nav.css';

const Nav = ({ onTransmitClick }) => {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Nav animation removed to ensure persistent visibility globally
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      setMobileOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: false });
      }
    } else {
      setMobileOpen(false);
    }
  };
  const handleContactClick = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (onTransmitClick) onTransmitClick();
  };

  const isStandalonePage = ['/classified', '/vault', '/protocols'].includes(location.pathname);
  if (isStandalonePage) return null;

  return (
    <header className="bureau-nav" ref={navRef}>
      {/* Covert F1 Trigger to Secret Protocols — Extreme Left, No Box */}
      <Link
        to="/vault"
        className="nav-f1-trigger"
        title="[ SECRET PROTOCOLS // DECLASSIFIED OVERRIDES ]"
        aria-label="Open Secret Protocols"
      >
        🏎️
      </Link>

      <div className="nav-container">
        {/* Left Side: Logo */}
        <Link to="/" className="nav-logo" onClick={handleLogoClick}>
          CALVIN <span className="nav-logo-badge">DSOUZA</span>
        </Link>

        {/* Desktop Nav — clear items + CLI trigger */}
        <nav className="nav-links">
          <Link to="/me" className="nav-link">ABOUT ME</Link>
          <Link to="/work" className="nav-link">WORK</Link>
          <Link to="/writing" className="nav-link">WRITING</Link>
          <Link to="/gallery" className="nav-link">GALLERY</Link>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="nav-link">RESUME</a>
          <button 
            type="button"
            className="nav-link nav-cli-btn"
            onClick={() => window.dispatchEvent(new CustomEvent('toggleTerminal'))}
            title="Open Bureau Terminal CLI (or press `)"
          >
            [ &gt;_ CLI ]
          </button>
          <Magnetic>
            <a href="#" onClick={handleContactClick} className="nav-link nav-cta" style={{ display: 'inline-block' }}>CONTACT</a>
          </Magnetic>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button 
          className={`nav-mobile-toggle ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span className="toggle-line" />
          <span className="toggle-line" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`nav-mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-links">
          <Link to="/me" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
            <span className="mobile-link-num">01</span> ABOUT ME
          </Link>
          <Link to="/work" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
            <span className="mobile-link-num">02</span> WORK
          </Link>
          <Link to="/writing" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
            <span className="mobile-link-num">03</span> WRITING
          </Link>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
            <span className="mobile-link-num">04</span> RESUME ↗
          </a>
          <Link to="/gallery" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
            <span className="mobile-link-num">05</span> GALLERY
          </Link>
          <Link to="/vault" className="mobile-nav-link" onClick={() => setMobileOpen(false)} style={{ color: 'var(--color-gold, #C5A880)' }}>
            <span className="mobile-link-num" style={{ color: 'var(--color-gold, #C5A880)' }}>06</span> 🏎️ SECRET PROTOCOLS
          </Link>
          <button
            type="button"
            className="mobile-nav-link"
            style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--color-gold)' }}
            onClick={() => {
              setMobileOpen(false);
              window.dispatchEvent(new CustomEvent('toggleTerminal'));
            }}
          >
            <span className="mobile-link-num" style={{ color: 'var(--color-gold)' }}>07</span> &gt;_ TERMINAL CLI
          </button>
          <a href="#" onClick={handleContactClick} className="mobile-nav-link mobile-cta">
            CONTACT ↗
          </a>
        </div>
      </div>
    </header>
  );
};

export default Nav;
