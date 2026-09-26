import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/scenes/vogue.css';

// Using available images from assets
import coverImg from '../assets/me-original.JPG';
import internImg from '../assets/tx-army-internship.jpg';
import hackImg from '../assets/tx-innovex.jpg';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Masthead animation
      gsap.fromTo('.vogue-masthead',
        { y: 50, opacity: 0, letterSpacing: '0em' },
        { y: 0, opacity: 1, letterSpacing: '-0.05em', duration: 2, ease: 'power4.out', delay: 0.2 }
      );

      // Cover text fade
      gsap.fromTo('.vogue-headline-left, .vogue-headline-right',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.3, ease: 'power3.out', delay: 1 }
      );

      // Content reveal on scroll
      gsap.utils.toArray('.vogue-paragraph, .vogue-pullquote, .vogue-image-full, .vogue-image-half').forEach(el => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
          }
        );
      });
      
      // Explore cards
      gsap.fromTo('.vogue-explore-card',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.vogue-explore-grid', start: 'top 85%' }
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="vogue-magazine" ref={pageRef}>
      
      {/* ── Top Nav ── */}
      <nav className="vogue-nav">
        <Link to="/" className="vogue-back-link">← RETURN TO BUREAU</Link>
        <span className="vogue-issue-date">ISSUE NO. 01 // DECLASSIFIED</span>
      </nav>

      {/* ── Cover Spread ── */}
      <header className="vogue-cover">
        <img src={coverImg} alt="Calvin D'Souza" className="vogue-cover-image" />
        <div className="vogue-cover-gradient" />
        
        <h1 className="vogue-masthead">CALVIN<br/>DSOUZA</h1>
        
        <div className="vogue-cover-headlines">
          <div className="vogue-headline-left">
            <h2 className="vogue-sub-mast">The Architect</h2>
            <p className="vogue-cover-text">Building investigation platforms.<br/>Bridging cybersecurity, AI, and forensics.</p>
          </div>
          <div className="vogue-headline-right">
            <h2 className="vogue-sub-mast">The Explorer</h2>
            <p className="vogue-cover-text">"Jack of all trades,<br/>master of none,<br/>explorer of many."</p>
          </div>
        </div>
      </header>

      {/* ── Editorial Content ── */}
      <main className="vogue-spread">
        
        <h2 className="vogue-article-title">Who Am I?</h2>
        
        <div className="vogue-columns">
          
          <div className="vogue-col-left">
            <span className="vogue-drop-cap">I</span>
            <p className="vogue-paragraph">
              f you ever met me at a hackathon at 3 AM, you'd probably find me hunched over a terminal, eyes lit up, grinning at a packet capture like it just told me a secret. It's the kind of obsessive energy that makes people wonder whether I run on caffeine or pure, unadulterated curiosity. The honest answer? Probably both.
            </p>
            <p className="vogue-paragraph">
              Originally from Mangalore and raised in the UAE as an NRI, I consider myself a true Indian at heart. From a young age, I was fascinated by machines and how things were built. It wasn't just about using technology; it was an obsession with <em>systems</em> — pulling them apart, seeing what makes them tick, and putting them back together. That curiosity naturally led me to where I am today.
            </p>
          </div>
          
          <div className="vogue-col-right">
            <p className="vogue-paragraph">
              I'm currently 20 years old, navigating my third year of Computer Science (Cybersecurity) at NMAMIT. But I don't just want to be an engineer. I'm on a relentless pursuit to learn everything, to become the all-knowing architect of the platforms I build. Currently, I'm interning as a Team Lead at the Indian Army Cyber Group. It's exactly as intense as it sounds — dealing with digital forensics, tracking illicit fund flows across decentralised networks, and building systems that care deeply about <em>evidence and provenance</em>.
            </p>
          </div>

          {/* Image Breakout */}
          <div className="vogue-image-full">
            <img src={internImg} alt="Indian Army Cyber Group Internship" />
            <div className="vogue-image-caption">FIG 1. FIELD DEPLOYMENT // ARMY CYBER GROUP</div>
          </div>

          <div className="vogue-pullquote-container">
            <h3 className="vogue-pullquote">
              "Jack of all trades, master of none — but oftentimes better than a master of one, and an explorer of many."
            </h3>
          </div>

          <div className="vogue-col-left">
            <p className="vogue-paragraph">
              But here's the thing a standard résumé won't tell you: I am profoundly, almost aggressively interested in <em>everything</em>. Whether it's the engineering precision of Formula 1 telemetry, cinematic lighting, or the way a perfectly composed frame can evoke emotion before you even understand why. I study machines the way a curator studies a collection — with patience, obsession, and the quiet belief that understanding how something works is the most beautiful thing a person can do.
            </p>
          </div>

          <div className="vogue-col-right">
            <p className="vogue-paragraph">
              I'm always moving. Hopping from one hackathon to another, one CTF to the next event, trading a late-night idea for an early-morning prototype. I thrive in the organised chaos of startup culture, genuinely believing that the next big thing in tech is just waiting to be found by someone stubborn enough to keep looking.
            </p>
            <p className="vogue-paragraph">
              I don't just want to work in tech. I want to <em>inhabit</em> it. To understand every signal, chase every anomaly, and leave behind systems that prove something happened. 
            </p>
          </div>

          {/* Half Images Breakout */}
          <div className="vogue-image-half">
            <div>
              <img src={hackImg} alt="Innovex Hackathon" />
              <div className="vogue-image-caption">FIG 2. HACKATHON PROTOTYPING</div>
            </div>
            <div>
              <img src={coverImg} alt="Portrait" style={{ objectPosition: 'top' }} />
              <div className="vogue-image-caption">FIG 3. THE ARCHITECT</div>
            </div>
          </div>

        </div>

        {/* ── Explore Links (Vogue Style) ── */}
        <div className="vogue-explore">
          <h2 className="vogue-explore-title">Keep Exploring</h2>
          
          <div className="vogue-explore-grid">
            <Link to="/writing" className="vogue-explore-card">
              <span className="vogue-explore-icon">✎</span>
              <span className="vogue-explore-label">Writings</span>
              <span className="vogue-explore-sub">Essays & Field Notes</span>
            </Link>

            <Link to="/gallery" className="vogue-explore-card">
              <span className="vogue-explore-icon">◎</span>
              <span className="vogue-explore-label">Gallery</span>
              <span className="vogue-explore-sub">Moments Captured</span>
            </Link>

            <Link to="/work" className="vogue-explore-card">
              <span className="vogue-explore-icon">⬡</span>
              <span className="vogue-explore-label">Work</span>
              <span className="vogue-explore-sub">12 Case Files</span>
            </Link>

            <Link to="/timeline" className="vogue-explore-card">
              <span className="vogue-explore-icon">◷</span>
              <span className="vogue-explore-label">Timeline</span>
              <span className="vogue-explore-sub">The Journey</span>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AboutMe;
