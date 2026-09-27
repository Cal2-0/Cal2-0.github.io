import React, { useEffect, useRef, useState } from 'react';
import '../../styles/scenes/entry.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../../data/profile';
import meImage from '../../assets/me.JPG';
import meWebp from '../../assets/me.webp';
import ClipReveal from '../motion/ClipReveal';
import Magnetic from '../motion/Magnetic';
import '../../styles/scenes/person.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const portraitRef = useRef(null);
  const portraitImgRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [typedThesis, setTypedThesis] = useState('');

  // Typewriter effect for thesis
  useEffect(() => {
    const thesis = profile.thesis;
    let index = 0;
    const timer = setInterval(() => {
      if (index <= thesis.length) {
        setTypedThesis(thesis.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 45);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Media query check to disable complex scroll triggers on mobile if needed
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      // 1. Entrance Animation (Plays once on load)
      const tlEnter = gsap.timeline();
      
      gsap.set(portraitRef.current, { 
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        WebkitClipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
      });
      gsap.set(portraitImgRef.current, {
        scale: 1.12,
        opacity: 0
      });
      gsap.set('.name-char', { y: 150, opacity: 0 });
      gsap.set('.hero-reveal-element', { opacity: 0, y: 20 });
      gsap.set('.entry-disciplines, .entry-actions-row', { opacity: 0, y: 15 });

      // Synchronized entrance animation
      const startAnimation = () => {
        tlEnter
          .to(portraitRef.current, {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            WebkitClipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.4,
            ease: 'power3.inOut'
          }, 0)
          .to(portraitImgRef.current, {
            scale: 1,
            opacity: 1,
            duration: 1.6,
            ease: 'power3.out'
          }, 0.1)
          .to('.name-char', {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.04,
            ease: 'power4.out'
          }, 0.3)
          .to('.hero-reveal-element', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
          }, 0.6)
          .to('.entry-disciplines, .entry-actions-row', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out'
          }, 0.8);
      };

      if (imageLoaded) {
        startAnimation();
      } else {
        // Fast start even if cached or fast-decode
        const fallbackTimer = setTimeout(startAnimation, 1200);
        const checkImage = setInterval(() => {
          if (imageLoaded) {
            clearTimeout(fallbackTimer);
            clearInterval(checkImage);
            startAnimation();
          }
        }, 50);
      }

      // 2. Cinematic Scroll Parallax (Scrubbed Pinned Scene)
      if (!isMobile) {
        const tlScroll = gsap.timeline();

        tlScroll
          // Phase 1: Entry Content moves up and fades out
          .to('.entry-content-col', { opacity: 0, y: -90, duration: 1 }, 0)
          
          // Phase 2: Person Content moves up and fades in
          .fromTo('.person-content-col', 
            { opacity: 0, y: 90 }, 
            { opacity: 1, y: 0, duration: 1 }, 0.4)
            
          // Add a pause at the end so you can read the bio before it unpins
          .to({}, { duration: 0.8 });

        ScrollTrigger.create({
          trigger: containerRef.current,
          pin: stageRef.current,
          start: 'top top',
          end: '+=160%',
          scrub: 1.2,
          animation: tlScroll,
          pinSpacing: true,
          invalidateOnRefresh: true,
        });
      } else {
        // Fallback for mobile: ensure disciplines and action buttons are visible cleanly
        gsap.to('.entry-disciplines, .entry-actions-row', { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
      }

    }, containerRef);

    // 3. Mousemove Parallax on Portrait
    const handleMouseMove = (e) => {
      if (isMobile || !portraitImgRef.current) return;
      
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20; // -10px to 10px
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(portraitImgRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars && (st.vars.trigger === containerRef.current || st.vars.pin === stageRef.current)) {
          st.kill(true);
        }
      });
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [imageLoaded]);

  const words = profile.name.split(' ');

  return (
    <div className="hero-scroll-container" ref={containerRef}>
      <section className="entry-scene" id="person" ref={stageRef}>
        

        <div className="entry-grid">
          
          {/* Portrait Slot */}
          <div className="entry-portrait-col">
            <div className="entry-masthead hero-reveal-element">
              <span className="entry-label">THE BUREAU</span>
              <span className="entry-label">EST. 2024 ✦ 001</span>
            </div>
            <div className="entry-portrait-wrapper" ref={portraitRef} style={{ overflow: 'hidden' }}>
              <picture>
                <source srcSet={meWebp} type="image/webp" />
                <img 
                  ref={portraitImgRef}
                  src={meImage} 
                  alt="Calvin Dsouza" 
                  className={`entry-portrait-img ${imageLoaded ? 'img-loaded' : ''}`}
                  loading="eager"
                  decoding="async"
                  onLoad={() => setImageLoaded(true)}
                />
              </picture>
            </div>
          </div>

          {/* Right Side Wrapping Container */}
          <div className="entry-content-wrapper">
            
            {/* Typography Slot (Fades Out) */}
            <div className="entry-content-col">
              <h1 className="entry-name">
                {words.map((word, wIdx) => (
                  <div key={wIdx} className="entry-name-line">
                    {word.split('').map((char, cIdx) => (
                      <span key={cIdx} className="name-char">
                        {char}
                      </span>
                    ))}
                  </div>
                ))}
              </h1>
              
              <h2 className="entry-thesis hero-reveal-element">
                {typedThesis}
                <span style={{ 
                  display: 'inline-block',
                  width: '2px',
                  height: '1em',
                  background: 'var(--color-gold)',
                  marginLeft: '2px',
                  animation: 'blink 1s step-end infinite',
                  verticalAlign: 'text-bottom'
                }} />
                <style>{`@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`}</style>
              </h2>
              
              <div className="entry-disciplines">
                {profile.disciplines.map((disc, i) => (
                  <span key={i}>✦ {disc}</span>
                ))}
              </div>

              <div className="entry-actions-row">
                <Magnetic>
                  <a 
                    href="https://linkedin.com/in/calvin-jude-dsouza" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="entry-linkedin-btn"
                  >
                    [ CONNECT ON LINKEDIN ]
                  </a>
                </Magnetic>
                
                <Magnetic>
                  <a 
                    href="/resume.pdf" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="entry-linkedin-btn entry-dossier-btn"
                  >
                    [ DOWNLOAD DOSSIER ]
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* Person Bio Slot (Fades In on Scroll) */}
            <div className="person-content-col">
              <div className="person-header" style={{ marginBottom: '1.25rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: 'var(--color-gold)', margin: 0, lineHeight: 1 }}>THE PERSON</h2>
                <p className="entry-label" style={{ margin: '0.4rem 0 0 0', letterSpacing: '0.15em' }}>PROFILE // CLASSIFIED</p>
              </div>
              
              <div className="person-bio" style={{ marginBottom: '1.8rem' }}>
                {profile.bio.map((para, i) => (
                  <p key={i} className="bio-paragraph" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)', color: 'var(--color-silver)', lineHeight: 1.6, marginBottom: '0.9rem', maxWidth: '620px' }}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="person-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.2rem 2.5rem', maxWidth: '520px' }}>
                {profile.stats.map((stat, i) => (
                  <div key={i} className="stat-block">
                    <span className="stat-value" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)', color: i === 2 ? 'var(--color-gold)' : 'var(--color-white)', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                      {stat.value}
                    </span>
                    <span className="stat-label" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-graphite)', letterSpacing: '0.12em' }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        <div className="entry-scroll-indicator hero-reveal-element">
          SCROLL TO INVESTIGATE ↗
        </div>

      </section>
    </div>
  );
};

export default Hero;
