import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { transmissions } from '../../data/transmissions';
import '../../styles/scenes/evidence.css';
import { CoverflowCarousel } from '../ui/CoverflowCarousel';

gsap.registerPlugin(ScrollTrigger);

const FieldEvidence = () => {
  const evidenceRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.evidence-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: evidenceRef.current,
          start: 'top 80%',
        }
      });
      gsap.from('.cf-carousel-container', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: evidenceRef.current,
          start: 'top 80%',
        }
      });
    }, evidenceRef);

    return () => ctx.revert();
  }, []);

  // Prioritize Indian Army Cyber Group internship as the primary / main slide
  const armyTx = transmissions.find(tx => tx.id === 'tx-04' || (tx.content && tx.content.includes('Indian Army')));
  const otherTxs = transmissions.filter(tx => tx.image && tx !== armyTx);
  const orderedTransmissions = armyTx ? [armyTx, ...otherTxs] : transmissions.filter(tx => tx.image);

  const slides = orderedTransmissions.map(tx => {
    const isArmy = tx === armyTx;
    return {
      src: tx.image,
      alt: isArmy ? "Indian Army Cyber Group // Cyber Forensics Laboratory" : tx.type,
      title: isArmy ? "INDIAN ARMY CYBER GROUP // CYBER FORENSICS" : `${tx.type} // ${tx.date}`,
      subtitle: tx.content.length > 130 ? tx.content.substring(0, 130) + '...' : tx.content,
      link: tx.link,
    };
  });

  return (
    <section className="evidence-scene" ref={evidenceRef} style={{ paddingBottom: '6rem' }}>
      <div className="bureau-container">
        <div className="evidence-header" style={{ marginBottom: '4rem' }}>
          <h2 className="evidence-title">FIELD EVIDENCE</h2>
          <span className="evidence-subtitle">VERIFIABLE CLAIMS // EVENTS</span>
        </div>

        <div className="evidence-carousel-wrapper" style={{ width: '100%', overflow: 'hidden' }}>
          <CoverflowCarousel slides={slides} />
        </div>
      </div>
    </section>
  );
};

export default FieldEvidence;
