import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/scenes/notfound.css';

const NotFound = () => {
  const [caseId] = useState(() => {
    const hex = Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
    return `0x${hex}`;
  });
  const [timestamp] = useState(() => {
    const now = new Date();
    return now.toISOString().replace('T', ' // ').split('.')[0] + ' UTC';
  });
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Glitch animation on the 404 title
    const chars = titleRef.current?.querySelectorAll('.notfound-char');
    if (chars && chars.length) {
      gsap.fromTo(
        chars,
        { y: 80, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      // Periodic glitch
      const glitchInterval = setInterval(() => {
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        gsap.to(randomChar, {
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 4,
          color: Math.random() > 0.5 ? '#8B5CF6' : '#E8D5B5',
          duration: 0.08,
          yoyo: true,
          repeat: 3,
          onComplete: () => {
            gsap.set(randomChar, { x: 0, y: 0, color: '' });
          },
        });
      }, 3000);

      return () => clearInterval(glitchInterval);
    }
  }, []);

  return (
    <div className="notfound-scene" ref={containerRef}>
      {/* Scanline overlay */}
      <div className="notfound-scanlines" />

      {/* Content */}
      <div className="notfound-container">
        {/* Classification header */}
        <div className="notfound-classification">
          <span className="notfound-class-dot" />
          CLASSIFIED // RESTRICTED ACCESS
        </div>

        {/* The 404 */}
        <h1 className="notfound-title" ref={titleRef}>
          {'404'.split('').map((char, i) => (
            <span key={i} className="notfound-char">
              {char}
            </span>
          ))}
        </h1>

        {/* Message */}
        <div className="notfound-message">
          <p className="notfound-primary">FILE NOT FOUND.</p>
          <p className="notfound-secondary">
            The requested document has been redacted,
            <br />
            relocated, or does not exist in our records.
          </p>
        </div>

        {/* Case details */}
        <div className="notfound-details">
          <div className="notfound-detail-row">
            <span className="notfound-detail-key">CASE ID</span>
            <span className="notfound-detail-val">{caseId}</span>
          </div>
          <div className="notfound-detail-row">
            <span className="notfound-detail-key">TIMESTAMP</span>
            <span className="notfound-detail-val">{timestamp}</span>
          </div>
          <div className="notfound-detail-row">
            <span className="notfound-detail-key">CLEARANCE</span>
            <span className="notfound-detail-val notfound-denied">
              INSUFFICIENT
            </span>
          </div>
          <div className="notfound-detail-row">
            <span className="notfound-detail-key">REQUESTED PATH</span>
            <span className="notfound-detail-val">
              {window.location.pathname}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="notfound-actions">
          <Link to="/" className="notfound-btn notfound-btn-primary">
            [ RETURN TO HQ ]
          </Link>
          <Link to="/work" className="notfound-btn notfound-btn-secondary">
            [ VIEW ARCHIVE ]
          </Link>
          <Link to="/writing" className="notfound-btn notfound-btn-secondary">
            [ READ FILES ]
          </Link>
        </div>

        {/* Footer */}
        <div className="notfound-footer">
          <span>THE BUREAU — EST. 2024</span>
          <span className="notfound-cursor">█</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
