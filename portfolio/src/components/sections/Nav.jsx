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

  const handleAboutClick = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('person-dossier');
        if (el) {
          if (lenisInstance) lenisInstance.scrollTo(el);
          else el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById('person-dossier');
      if (el) {
        if (lenisInstance) lenisInstance.scrollTo(el);
        else el.scrollIntoView({ behavior: 'smooth' });
      }
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
        <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
          CALVIN <span className="nav-logo-badge">DSOUZA</span>
        </Link>

        {/* Desktop Nav — 5 clear items */}
        <nav className="nav-links">
          <a href="#" onClick={handleAboutClick} className="nav-link">ABOUT</a>
          <Link to="/work" className="nav-link">WORK</Link>
          <Link to="/writing" className="nav-link">WRITING</Link>
          <Link to="/gallery" className="nav-link">GALLERY</Link>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="nav-link">RESUME</a>
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
          <a href="#" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); handleAboutClick(e); }}>
            <span className="mobile-link-num">01</span> ABOUT
          </a>
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
          <a href="#" onClick={handleContactClick} className="mobile-nav-link mobile-cta">
            CONTACT ↗
          </a>
        </div>
      </div>
    </header>
  );
};

export default Nav;
