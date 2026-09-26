import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../../data/profile';
import '../../styles/scenes/person.css';
import SocialCard from '../shared/SocialCard';

gsap.registerPlugin(ScrollTrigger);

const RecordCard = ({ category, isExpanded, onClick }) => {
  const { label, icon, entries, summary } = category;

  return (
    <div 
      className={`record-card ${isExpanded ? 'is-expanded' : ''}`}
      onClick={onClick}
    >
      <div className="record-card-header">
        <span className="record-icon">{icon}</span>
        <div className="record-card-info">
          <h4 className="record-card-label">{label}</h4>
          <span className="record-card-summary">{summary}</span>
        </div>
        <span className="record-expand-icon">{isExpanded ? '−' : '+'}</span>
      </div>

      <div className={`record-card-entries ${isExpanded ? 'show' : ''}`}>
        {entries.map((entry, i) => (
          <div key={i} className="record-entry">
            <span className="record-entry-event">{entry.event}</span>
            <span className="record-entry-result">{entry.result}</span>
            {entry.detail && <span className="record-entry-detail">{entry.detail}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

const Person = () => {
  const sectionRef = useRef(null);
  const [expandedCard, setExpandedCard] = useState('internship');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.person-bio-block',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.person-bio-block',
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.dossier-identity', 
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const recordCategories = Object.entries(profile.record);

  const handleCardClick = (key) => {
    setExpandedCard(expandedCard === key ? null : key);
  };

  return (
    <section id="person-dossier" ref={sectionRef} className="dossier-scene">
      <div className="bureau-container">

        <div className="dossier-label-bar">
          <span className="dossier-label">THE PERSON</span>
          <span className="dossier-label">PROFILE // CLASSIFIED</span>
        </div>

        {/* ── Short Bio ──────────────────────────────────────────── */}
        <div className="person-bio-block">
          {profile.bio.map((paragraph, i) => {
            const keywords = ['machines', 'systems', 'architect', 'explorer', 'Cybersecurity', 'NMAMIT', 'Calvin'];
            return (
              <p key={i} className={`person-bio-paragraph ${i === 0 ? 'bio-lead' : ''}`}>
                {paragraph.split(' ').map((word, w) => {
                  const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
                  const isHighlight = keywords.some(k => cleanWord.toLowerCase() === k.toLowerCase());
                  
                  return (
                    <span key={`${i}-${w}`} className={`bio-word ${isHighlight ? 'bio-word-highlight' : ''}`}>
                      {word}
                    </span>
                  );
                })}
              </p>
            );
          })}
          <Link to="/me" className="person-readmore-link">
            Read more about me <span className="person-readmore-arrow">→</span>
          </Link>
        </div>

        {/* ── Dossier Grid ───────────────────────────────────────── */}
        <div className="dossier-grid">

          {/* LEFT — Identity Card */}
          <div className="dossier-identity">
            <div className="identity-name-block">
              <h2 className="identity-name">CALVIN JUDE<br/>D'SOUZA</h2>
              <div className="identity-rule" />
            </div>

            <div className="identity-details">
              <div className="identity-row">
                <span className="identity-key">EDUCATION</span>
                <span className="identity-val">{profile.education.degree}</span>
              </div>
              <div className="identity-row">
                <span className="identity-key">INSTITUTION</span>
                <span className="identity-val">{profile.education.institution}</span>
              </div>
              <div className="identity-row">
                <span className="identity-key">CGPA</span>
                <span className="identity-val highlight">{profile.education.cgpa} / 10</span>
              </div>
              <div className="identity-row">
                <span className="identity-key">CLEARANCE</span>
                <span className="identity-val">{profile.currentRole.organization}</span>
              </div>
              <div className="identity-row">
                <span className="identity-key">ROLE</span>
                <span className="identity-val">{profile.currentRole.title}</span>
              </div>
            </div>

            <div className="identity-currently">
              <span className="identity-section-label">CURRENTLY</span>
              {profile.currently.map((item, i) => (
                <div key={i} className="currently-item">
                  <span className="currently-action">{item.activity}</span>
                  <span className="currently-focus">{item.focus}</span>
                </div>
              ))}
            </div>

            <div className="identity-links" style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
              <SocialCard />
            </div>
          </div>

          {/* RIGHT — The Record */}
          <div className="dossier-record">
            <h3 className="record-title">THE RECORD</h3>
            <p className="record-subtitle">Verifiable achievements — not decoration.</p>

            <div className="record-grid">
              {recordCategories.map(([key, category]) => (
                <RecordCard
                  key={key}
                  category={category}
                  isExpanded={expandedCard === key}
                  onClick={() => handleCardClick(key)}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Person;
