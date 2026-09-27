import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../../styles/scenes/layeredText.css';

/**
 * LayeredText — Isometric 3D text hover effect
 * Adapted from the TSX component for The Bureau's vanilla CSS stack.
 */
const LayeredText = ({
  lines = [
    { top: '\u00A0', bottom: 'CYBERSECURITY' },
    { top: 'CYBERSECURITY', bottom: 'FORENSICS' },
    { top: 'FORENSICS', bottom: 'ENGINEERING' },
    { top: 'ENGINEERING', bottom: 'RESEARCH' },
    { top: 'RESEARCH', bottom: 'INNOVATION' },
    { top: 'INNOVATION', bottom: 'FUTURE' },
    { top: 'FUTURE', bottom: '\u00A0' },
  ],
  fontSize = '72px',
  fontSizeMd = '36px',
  lineHeight = 60,
  lineHeightMd = 35,
  className = '',
}) => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeLineHeight = isMobile ? lineHeightMd : lineHeight;
  const activeFontSize = isMobile ? fontSizeMd : fontSize;

  const calculateTranslateX = (index) => {
    const baseOffset = isMobile ? 18 : 35;
    const centerIndex = Math.floor(lines.length / 2);
    return (index - centerIndex) * baseOffset;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const paragraphs = container.querySelectorAll('p');

    const yShift = -activeLineHeight;

    if (timelineRef.current) timelineRef.current.kill();

    timelineRef.current = gsap.timeline({ paused: true });

    timelineRef.current.to(paragraphs, {
      y: yShift,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.08,
    });

    const handleMouseEnter = () => {
      timelineRef.current?.play();
    };

    const handleMouseLeave = () => {
      timelineRef.current?.reverse();
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [lines, activeLineHeight]);

  return (
    <div
      ref={containerRef}
      className={`layered-text-container ${className}`}
      style={{ fontSize: activeFontSize }}
    >
      <ul className="layered-text-list">
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index);
          const isEven = index % 2 === 0;

          return (
            <li
              key={index}
              className="layered-text-item"
              style={{
                height: `${activeLineHeight}px`,
                transform: `translateX(${translateX}px) skew(${isEven ? '60deg, -30deg' : '0deg, -30deg'}) scaleY(${isEven ? 0.66667 : 1.33333})`,
              }}
            >
              <p
                className="layered-text-line"
                onClick={(e) => {
                  if (line.onClickTop) {
                    e.stopPropagation();
                    line.onClickTop();
                  }
                }}
                style={{
                  height: `${activeLineHeight}px`,
                  lineHeight: `${activeLineHeight}px`,
                  pointerEvents: line.onClickTop ? 'auto' : 'inherit',
                }}
              >
                {line.top}
              </p>
              <p
                className="layered-text-line"
                onClick={(e) => {
                  if (line.onClickBottom) {
                    e.stopPropagation();
                    line.onClickBottom();
                  }
                }}
                style={{
                  height: `${activeLineHeight}px`,
                  lineHeight: `${activeLineHeight}px`,
                  pointerEvents: line.onClickBottom ? 'auto' : 'inherit',
                }}
              >
                {line.bottom}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LayeredText;
