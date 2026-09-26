import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LayeredText from '../ui/LayeredText';
import '../../styles/scenes/exploreLinks.css';

gsap.registerPlugin(ScrollTrigger);

const ExploreHyperlinks = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.explore-hyper-heading',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo('.explore-hyper-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.explore-hyper-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const links = [
    {
      label: 'Read About Me',
      sub: 'The human behind the terminal',
      icon: '👤',
      path: '/me',
      accent: 'var(--color-violet)',
    },
    {
      label: 'Read my Field Notes',
      sub: 'Essays, deep-dives & dispatches from the lab',
      icon: '✎',
      path: '/writing',
      accent: 'var(--color-gold)',
    },
    {
      label: 'Browse the Gallery',
      sub: 'Moments, events & field evidence — captured',
      icon: '◎',
      path: '/gallery',
      accent: 'var(--color-violet)',
    },
    {
      label: 'Explore the Case Files',
      sub: '12 investigation platforms & counting',
      icon: '⬡',
      path: '/work',
      accent: 'var(--color-gold)',
    }
  ];

  return (
    <section className="explore-hyper-section" ref={sectionRef}>
      <div className="bureau-container">

        {/* Layered Text Visual */}
        <div className="explore-hyper-text-visual">
          <LayeredText
            lines={[
              { 
                top: 'ABOUT ME', 
                bottom: 'FIELD NOTES',
                onClickTop: () => navigate('/me'),
                onClickBottom: () => navigate('/writing')
              },
              { 
                top: 'FIELD NOTES', 
                bottom: 'GALLERY',
                onClickTop: () => navigate('/writing'),
                onClickBottom: () => navigate('/gallery')
              },
              { 
                top: 'GALLERY', 
                bottom: 'PROJECTS',
                onClickTop: () => navigate('/gallery'),
                onClickBottom: () => navigate('/work')
              },
              { 
                top: 'PROJECTS', 
                bottom: 'TRANSMISSIONS',
                onClickTop: () => navigate('/work'),
                onClickBottom: () => navigate('/transmissions')
              },
              { 
                top: 'TRANSMISSIONS', 
                bottom: 'ABOUT ME',
                onClickTop: () => navigate('/transmissions'),
                onClickBottom: () => navigate('/me')
              },
            ]}
            fontSize="clamp(40px, 5vw, 75px)"
            fontSizeMd="clamp(32px, 4.5vw, 45px)"
            lineHeight={85}
            lineHeightMd={50}
          />
        </div>

        {/* Heading */}
        <div className="explore-hyper-heading">
          <span className="explore-hyper-mono-label">BEFORE YOU GO</span>
          <h2 className="explore-hyper-title">
            Want to dig <em>deeper?</em>
          </h2>
          <p className="explore-hyper-sub">
            There's more to the Bureau than what's above. Pick a door.
          </p>
        </div>

        {/* Link Cards */}
        <div className="explore-hyper-grid">
          {links.map((link, i) => (
            <button
              key={i}
              className="explore-hyper-card"
              onClick={() => navigate(link.path)}
              style={{ '--card-accent': link.accent }}
            >
              <span className="explore-hyper-card-icon">{link.icon}</span>
              <div className="explore-hyper-card-body">
                <span className="explore-hyper-card-label">{link.label}</span>
                <span className="explore-hyper-card-sub">{link.sub}</span>
              </div>
              <span className="explore-hyper-card-arrow">→</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExploreHyperlinks;
