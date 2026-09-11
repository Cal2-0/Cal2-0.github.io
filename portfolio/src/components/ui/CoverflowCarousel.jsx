import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';
import "../../styles/components/coverflow.css";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function CoverflowCarousel({
  slides = [],
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(240px, 40vw, 400px)",
  gap = 0.05,
  loop = true,
  showCaption = true,
  showPagination = true,
  showNavigation = true,
  label = "Cover carousel",
  initialIndex = 0,
}) {
  const count = slides.length;

  const frameRef = useRef(null);
  const cardRefs = useRef([]);
  const posRef = useRef(initialIndex);
  const targetRef = useRef(initialIndex);
  const widthRef = useRef(0);
  const rafRef = useRef(null);
  const dragRef = useRef(null);

  const [selected, setSelected] = useState(initialIndex);

  const indexAt = useCallback(
    (pos) => {
      if (!count) return 0;
      return ((Math.round(pos) % count) + count) % count;
    },
    [count],
  );

  const paint = useCallback(() => {
    const width = widthRef.current;
    if (!width || count === 0) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;
      if (loop && count > 1) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform = `translateX(calc(-50% + ${offset * pitch}px)) translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = loop && count > 1 ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const clamp = useCallback(
    (pos) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );

  const settle = useCallback(
    (target) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = targetRef.current - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = targetRef.current;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.18;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint],
  );

  const goTo = useCallback(
    (index) => {
      if (!count) return;
      const current = targetRef.current;
      const normalizedCurrent = ((Math.round(current) % count) + count) % count;
      let diff = index - normalizedCurrent;
      if (loop && count > 1) {
        if (diff > count / 2) diff -= count;
        if (diff < -count / 2) diff += count;
      }
      settle(clamp(Math.round(current) + diff));
    },
    [clamp, count, loop, settle],
  );

  const nudge = useCallback(
    (by) => {
      settle(clamp(Math.round(targetRef.current) + by));
    },
    [clamp, settle],
  );

  const onPointerDown = (event) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
      hasMoved: false,
    };
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.hasMoved && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
      drag.hasMoved = true;
    }

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.startX) / pitch);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    try {
      if (event.currentTarget && event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch (_) {}

    const carried = Math.max(-2, Math.min(2, (drag.v || 0) * 0.18));
    const target = clamp(Math.round(posRef.current + carried));
    dragRef.current = null;
    settle(target);
  };

  const handleCardClick = (index, slide) => {
    if (dragRef.current?.hasMoved) return;
    if (index !== selected) {
      goTo(index);
    } else if (slide.link) {
      window.open(slide.link, '_blank', 'noopener,noreferrer');
    }
  };

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const active = slides[selected];

  if (!count) return null;

  return (
    <div className="cf-carousel-container" style={{ "--cf-card": cardWidth }} role="region" aria-roledescription="carousel" aria-label={label}>
      <div 
        className="cf-carousel-frame"
        ref={frameRef}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            nudge(-1);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            nudge(1);
          }
        }}
        style={{ perspective: `calc(var(--cf-card) * ${perspective})` }}
      >
        <div className="cf-carousel-track" style={{ height: "var(--cf-card)" }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              className={`cf-card-wrapper ${index === selected ? "active" : ""}`}
              style={{ width: "var(--cf-card)" }}
              onClick={() => handleCardClick(index, slide)}
            >
              <img 
                src={slide.src} 
                alt={slide.alt || `Evidence slide ${index + 1}`} 
                draggable={false} 
                className="cf-card-image" 
                loading="lazy" 
                style={{ opacity: 0, transition: 'opacity 0.5s ease' }} 
                onLoad={(e) => { e.target.style.opacity = 1; }} 
              />
              {index === selected && slide.link && (
                <div className="cf-card-link-badge">
                  <span>↗ VERIFIED</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showNavigation && count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              nudge(-1);
            }}
            className="cf-nav-button cf-nav-button-left"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              nudge(1);
            }}
            className="cf-nav-button cf-nav-button-right"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {showCaption && active?.title && (
        <div key={selected} className="cf-caption">
          <p className="cf-caption-title">{active.title}</p>
          {active.subtitle && <p className="cf-caption-subtitle">{active.subtitle}</p>}
          {active.link && (
            <a 
              href={active.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cf-caption-link"
            >
              ↗ VERIFY EVIDENCE RECORD
            </a>
          )}
          {active.slug && !active.link && (
            <Link to={`/field-notes/${active.slug}`} className="cf-caption-link">
              ↗ INVESTIGATE FILE
            </Link>
          )}
        </div>
      )}

      {showPagination && count > 1 && (
        <div className="cf-pagination">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                goTo(index);
              }}
              className={`cf-dot ${index === selected ? "active" : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
