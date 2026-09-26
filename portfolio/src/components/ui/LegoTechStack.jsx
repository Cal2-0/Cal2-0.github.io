import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
  Shield,
  Code,
  Cpu,
  Eye,
  Terminal,
  Database,
  Network,
  Lock,
  Search,
  Activity,
  Layers,
  Zap,
  GitBranch,
  Server,
  Radio,
  FileCode,
  User,
  Key,
  Box,
  Layout,
  Cloud,
  Settings,
  PenTool,
  Hash
} from 'lucide-react';
import '../../styles/scenes/legoTech.css';

/* ─── GRID CONSTANTS ────────────────────────────────────────── */
const GRID_CONSTANTS = {
  STUD_WIDTH: 65,
  ROW_HEIGHT: 80,
  MAX_ROWS: 20,
  COLS: 6,
  APEX_HEIGHT: 150,
};

/* ─── STUD THEMES (CSS-only, no Tailwind) ───────────────────── */
const STUD_THEMES = {
  gold: {
    wall: 'linear-gradient(90deg, #8B6914 0%, #B59661 20%, #E8D5B5 38%, #F5E6CC 50%, #E8D5B5 62%, #B59661 80%, #8B6914 100%)',
    cap: 'linear-gradient(135deg, #F5E6CC 0%, #E8D5B5 40%, #B59661 70%, #8B6914 100%)',
    shadow: 'radial-gradient(ellipse, rgba(60,40,0,0.6) 0%, transparent 70%)',
    rim: 'rgba(255,255,255,0.6)',
  },
  dark: {
    wall: 'linear-gradient(90deg, #09090b 0%, #18181b 20%, #27272a 38%, #3f3f46 50%, #27272a 62%, #18181b 80%, #09090b 100%)',
    cap: 'linear-gradient(135deg, #52525b 0%, #3f3f46 40%, #27272a 70%, #18181b 100%)',
    shadow: 'radial-gradient(ellipse, rgba(0,0,0,0.8) 0%, transparent 70%)',
    rim: 'rgba(255,255,255,0.2)',
  },
  violet: {
    wall: 'linear-gradient(90deg, #4c1d95 0%, #6d28d9 20%, #7c3aed 38%, #8b5cf6 50%, #7c3aed 62%, #6d28d9 80%, #4c1d95 100%)',
    cap: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 40%, #8b5cf6 70%, #7c3aed 100%)',
    shadow: 'radial-gradient(ellipse, rgba(40,0,80,0.6) 0%, transparent 70%)',
    rim: 'rgba(255,255,255,0.6)',
  },
  teal: {
    wall: 'linear-gradient(90deg, #134e4a 0%, #0d9488 20%, #14b8a6 38%, #2dd4bf 50%, #14b8a6 62%, #0d9488 80%, #134e4a 100%)',
    cap: 'linear-gradient(135deg, #99f6e4 0%, #5eead4 40%, #2dd4bf 70%, #14b8a6 100%)',
    shadow: 'radial-gradient(ellipse, rgba(0,40,40,0.6) 0%, transparent 70%)',
    rim: 'rgba(255,255,255,0.6)',
  },
  brown: {
    wall: 'linear-gradient(90deg, #4A2C17 0%, #6B4226 20%, #8B6914 38%, #A0784A 50%, #8B6914 62%, #6B4226 80%, #4A2C17 100%)',
    cap: 'linear-gradient(135deg, #D4A574 0%, #B59661 40%, #8B6914 70%, #6B4226 100%)',
    shadow: 'radial-gradient(ellipse, rgba(40,20,0,0.6) 0%, transparent 70%)',
    rim: 'rgba(255,255,255,0.5)',
  },
  blue: {
    wall: 'linear-gradient(90deg, #1e3a8a 0%, #2563eb 20%, #3b82f6 38%, #60a5fa 50%, #3b82f6 62%, #2563eb 80%, #1e3a8a 100%)',
    cap: 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 40%, #3b82f6 70%, #2563eb 100%)',
    shadow: 'radial-gradient(ellipse, rgba(0,20,80,0.6) 0%, transparent 70%)',
    rim: 'rgba(255,255,255,0.6)',
  },
  red: {
    wall: 'linear-gradient(90deg, #7f1d1d 0%, #dc2626 20%, #ef4444 38%, #f87171 50%, #ef4444 62%, #dc2626 80%, #7f1d1d 100%)',
    cap: 'linear-gradient(135deg, #fca5a5 0%, #f87171 40%, #ef4444 70%, #dc2626 100%)',
    shadow: 'radial-gradient(ellipse, rgba(80,0,0,0.6) 0%, transparent 70%)',
    rim: 'rgba(255,255,255,0.6)',
  },
};

/* ─── LEGO STUD ─────────────────────────────────────────────── */
const LegoStud = ({ color = 'gold', yOffset = 0 }) => {
  const t = STUD_THEMES[color];
  const studHeight = 16;
  const studWidth = 72;
  const studCapHeight = 16;

  return (
    <div className="lego-stud-wrapper" style={{ transform: `translateY(${yOffset}px)` }}>
      <div className="lego-stud-shadow" style={{ background: t.shadow }} />
      <div className="lego-stud-body" style={{ width: `${studWidth}%`, maxWidth: '42px' }}>
        <div
          className="lego-stud-wall"
          style={{ height: `${studHeight}px`, background: t.wall }}
        >
          <div className="lego-stud-wall-shine" />
        </div>
        <div
          className="lego-stud-cap"
          style={{
            top: `-${studCapHeight / 2}px`,
            height: `${studCapHeight}px`,
            background: t.cap,
            borderTop: `1px solid ${t.rim}`,
          }}
        >
          <span className="lego-stud-text">UI</span>
        </div>
      </div>
    </div>
  );
};

/* ─── LEGO BLOCK ────────────────────────────────────────────── */
const LegoBlock = ({
  mouseX, mouseY,
  topColor, faceGradient, bottomColor,
  topHeight = 19, bottomHeight = 15,
  roundedTop = false, roundedBottom = false,
  className = '',
  children, studs = 0, studColor = 'gold', hideStuds = false,
  studYOffset = 12,
}) => {
  const highlightBg = useMotionTemplate`radial-gradient(circle 120px at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.25), transparent)`;

  return (
    <div className={`lego-block ${className}`}>
      {/* Top plate */}
      <div
        className="lego-block-top"
        style={{
          height: `${topHeight}px`,
          background: `linear-gradient(to bottom, ${topColor}, color-mix(in srgb, ${topColor} 100%, black))`,
          borderRadius: roundedTop ? '4px 4px 0 0' : '0',
        }}
      >
        {studs > 0 && (
          <div className="lego-studs-row">
            {[...Array(studs)].map((_, i) => {
              const isHidden = Array.isArray(hideStuds) ? hideStuds.includes(i) : hideStuds;
              return isHidden ? (
                <div key={i} className="lego-stud-spacer" />
              ) : (
                <LegoStud key={i} color={studColor} yOffset={studYOffset} />
              );
            })}
          </div>
        )}
      </div>

      {/* Face */}
      <div className="lego-block-face" style={{ background: faceGradient }}>
        <motion.div
          className="lego-block-highlight"
          style={{ background: highlightBg }}
        />
        <div className="lego-block-content">{children}</div>
      </div>

      {/* Bottom plate */}
      <div
        className="lego-block-bottom"
        style={{
          height: `${bottomHeight}px`,
          background: bottomColor,
          borderRadius: roundedBottom ? '0 0 4px 4px' : '0',
        }}
      />
    </div>
  );
};

/* ─── MODULE DATA (Cybersecurity-themed, Bureau aesthetic) ──── */
const MODULES = [
  { id: 'react', name: 'React', desc: 'UI Library', icon: Code, studs: 2, colors: { topColor: '#3b82f6', faceGradient: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)', bottomColor: '#1e3a8a', studColor: 'blue' } },
  { id: 'nextjs', name: 'Next.js', desc: 'React Framework', icon: Layout, studs: 2, colors: { topColor: '#27272a', faceGradient: 'linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)', bottomColor: '#09090b', studColor: 'dark' } },
  { id: 'python', name: 'Python', desc: 'Backend', icon: FileCode, studs: 3, colors: { topColor: '#E8D5B5', faceGradient: 'linear-gradient(180deg, #F5E6CC 0%, #E8D5B5 50%, #B59661 100%)', bottomColor: '#8B6914', studColor: 'gold' } },
  { id: 'nodejs', name: 'Node.js', desc: 'Runtime', icon: Server, studs: 2, colors: { topColor: '#2dd4bf', faceGradient: 'linear-gradient(180deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)', bottomColor: '#115e59', studColor: 'teal' } },
  { id: 'docker', name: 'Docker', desc: 'Containers', icon: Box, studs: 2, colors: { topColor: '#3b82f6', faceGradient: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)', bottomColor: '#1e3a8a', studColor: 'blue' } },
  { id: 'aws', name: 'AWS', desc: 'Cloud', icon: Cloud, studs: 3, colors: { topColor: '#E8D5B5', faceGradient: 'linear-gradient(180deg, #F5E6CC 0%, #E8D5B5 50%, #B59661 100%)', bottomColor: '#8B6914', studColor: 'gold' } },
  { id: 'postgres', name: 'PostgreSQL', desc: 'Database', icon: Database, studs: 2, colors: { topColor: '#3b82f6', faceGradient: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)', bottomColor: '#1e3a8a', studColor: 'blue' } },
  { id: 'linux', name: 'Linux', desc: 'OS', icon: Terminal, studs: 2, colors: { topColor: '#27272a', faceGradient: 'linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)', bottomColor: '#09090b', studColor: 'dark' } },
  { id: 'tailwind', name: 'Tailwind CSS', desc: 'Styling', icon: PenTool, studs: 2, colors: { topColor: '#2dd4bf', faceGradient: 'linear-gradient(180deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)', bottomColor: '#115e59', studColor: 'teal' } },
  { id: 'fastapi', name: 'FastAPI', desc: 'API Framework', icon: Zap, studs: 2, colors: { topColor: '#2dd4bf', faceGradient: 'linear-gradient(180deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)', bottomColor: '#115e59', studColor: 'teal' } },
  { id: 'redis', name: 'Redis', desc: 'Cache', icon: Database, studs: 1, colors: { topColor: '#ef4444', faceGradient: 'linear-gradient(180deg, #f87171 0%, #ef4444 50%, #dc2626 100%)', bottomColor: '#7f1d1d', studColor: 'red' } },
  { id: 'git', name: 'Git', desc: 'VCS', icon: GitBranch, studs: 1, colors: { topColor: '#E8D5B5', faceGradient: 'linear-gradient(180deg, #D4A574 0%, #B59661 50%, #8B6914 100%)', bottomColor: '#6B4226', studColor: 'brown' } },
  { id: 'github', name: 'GitHub', desc: 'Source Code', icon: Hash, studs: 2, colors: { topColor: '#27272a', faceGradient: 'linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)', bottomColor: '#09090b', studColor: 'dark' } },
  { id: 'figma', name: 'Figma', desc: 'Design', icon: PenTool, studs: 2, colors: { topColor: '#8b5cf6', faceGradient: 'linear-gradient(180deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)', bottomColor: '#4c1d95', studColor: 'violet' } },
  { id: 'postman', name: 'Postman', desc: 'API Testing', icon: Network, studs: 2, colors: { topColor: '#E8D5B5', faceGradient: 'linear-gradient(180deg, #F5E6CC 0%, #E8D5B5 50%, #B59661 100%)', bottomColor: '#8B6914', studColor: 'gold' } },
  { id: 'forensics', name: 'Wireshark', desc: 'Net Forensics', icon: Search, studs: 3, colors: { topColor: '#8b5cf6', faceGradient: 'linear-gradient(180deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)', bottomColor: '#4c1d95', studColor: 'violet' } },
  { id: 'ai', name: 'PyTorch / ML', desc: 'Intelligence', icon: Cpu, studs: 3, colors: { topColor: '#ef4444', faceGradient: 'linear-gradient(180deg, #f87171 0%, #ef4444 50%, #dc2626 100%)', bottomColor: '#7f1d1d', studColor: 'red' } },
  { id: 'cloudflare', name: 'Cloudflare', desc: 'CDN / Edge', icon: Cloud, studs: 2, colors: { topColor: '#E8D5B5', faceGradient: 'linear-gradient(180deg, #F5E6CC 0%, #E8D5B5 50%, #B59661 100%)', bottomColor: '#8B6914', studColor: 'gold' } },
  { id: 'blockchain', name: 'EVM / Solidity', desc: 'Smart Contracts', icon: Layers, studs: 3, colors: { topColor: '#27272a', faceGradient: 'linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)', bottomColor: '#09090b', studColor: 'dark' } },
  { id: 'systems', name: 'C / C++', desc: 'Low-level', icon: Settings, studs: 2, colors: { topColor: '#3b82f6', faceGradient: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)', bottomColor: '#1e3a8a', studColor: 'blue' } },
  { id: 'bash', name: 'Bash', desc: 'Scripting', icon: Terminal, studs: 1, colors: { topColor: '#27272a', faceGradient: 'linear-gradient(180deg, #3f3f46 0%, #27272a 50%, #18181b 100%)', bottomColor: '#09090b', studColor: 'dark' } }
];

/* ─── MODULE BLOCK ──────────────────────────────────────────── */
const ModuleBlock = ({
  module,
  hiddenStuds = [],
  onClick,
  isAnimating,
  startRect,
  mouseX,
  mouseY,
  onAnimationComplete,
}) => {
  const widthPx = module.studs * GRID_CONSTANTS.STUD_WIDTH;
  const isCompact = module.studs <= 2;
  const wrapperRef = useRef(null);
  const IconComp = module.icon;

  useEffect(() => {
    if (isAnimating && startRect && wrapperRef.current) {
      const endRect = wrapperRef.current.getBoundingClientRect();
      const dx = startRect.left - endRect.left;
      const dy = startRect.top - endRect.top;
      const apexY = Math.min(dy, 0) - GRID_CONSTANTS.APEX_HEIGHT;

      const animation = wrapperRef.current.animate(
        [
          { transform: `translate(${dx}px, ${dy}px) scale(1, 1)`, filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.2))', offset: 0 },
          { transform: `translate(${dx}px, ${dy}px) scale(1.1, 0.85)`, filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.3))', offset: 0.15 },
          { transform: `translate(${dx * 0.75}px, ${dy + (apexY - dy) * 0.5}px) scale(0.9, 1.15)`, filter: 'drop-shadow(0px 30px 20px rgba(0,0,0,0.05))', offset: 0.35 },
          { transform: `translate(${dx * 0.5}px, ${apexY}px) scale(1, 1)`, filter: 'drop-shadow(0px 40px 20px rgba(0,0,0,0))', offset: 0.55 },
          { transform: `translate(${dx * 0.25}px, ${apexY * 0.5}px) scale(0.9, 1.15)`, filter: 'drop-shadow(0px 30px 20px rgba(0,0,0,0.05))', offset: 0.75 },
          { transform: `translate(0px, 0px) scale(1.15, 0.85)`, filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.3))', offset: 0.9 },
          { transform: `translate(0px, 0px) scale(1, 1)`, filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.2))', offset: 1 },
        ],
        {
          duration: 1200,
          easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
          fill: 'both',
        }
      );

      animation.onfinish = () => onAnimationComplete?.();
      return () => animation.cancel();
    }
  }, [isAnimating, startRect]);

  return (
    <div ref={wrapperRef} className="lego-module-wrapper" style={{ width: widthPx }}>
      <button
        type="button"
        onClick={onClick}
        aria-label={`Equip ${module.name}`}
        className="lego-module-btn"
      >
        <div className="lego-module-hover-overlay" />
        <LegoBlock
          mouseX={mouseX}
          mouseY={mouseY}
          topColor={module.colors.topColor}
          faceGradient={module.colors.faceGradient}
          bottomColor={module.colors.bottomColor}
          roundedTop
          roundedBottom
          studs={module.studs}
          studColor={module.colors.studColor}
          hideStuds={hiddenStuds}
        >
          <div className={`lego-module-inner ${isCompact ? 'compact' : ''}`}>
            <div className={`lego-module-icon-box ${isCompact ? 'compact' : ''}`}>
              <IconComp size={isCompact ? 18 : 24} strokeWidth={1.8} color="white" />
            </div>
            <h4 className="lego-module-name">{module.name}</h4>
          </div>
        </LegoBlock>
      </button>
    </div>
  );
};

/* ─── MAIN COMPONENT ────────────────────────────────────────── */
const LegoTechStack = ({ modules = MODULES, className = '' }) => {
  const [equippedIds, setEquippedIds] = useState([]);
  const [animatingBlocks, setAnimatingBlocks] = useState({});
  const controls = useAnimation();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const handlePointerMove = (e) => {
    mouseX.set((e.clientX / window.innerWidth) * 100);
    mouseY.set((e.clientY / window.innerHeight) * 100);
  };

  const handleToggleEquip = (id, e) => {
    if (animatingBlocks[id]) return;
    const el = e.currentTarget.closest('.lego-module-wrapper');
    if (!el) return;
    const startRect = el.getBoundingClientRect();

    setAnimatingBlocks((prev) => ({ ...prev, [id]: startRect }));
    setEquippedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

    setTimeout(() => {
      controls.start({
        y: [0, 10, -3, 0],
        transition: { duration: 0.4, times: [0, 0.4, 0.7, 1], ease: 'easeInOut' },
      });
    }, 1080);
  };

  const equippedModules = equippedIds.map((id) => modules.find((m) => m.id === id));
  const unequippedModules = modules.filter((m) => !equippedIds.includes(m.id));

  const { grid, positionedModules } = useMemo(() => {
    const calculatedGrid = [];
    const positioned = equippedModules.map((m) => {
      let placedRow = -1;
      let placedCol = -1;
      for (let r = 0; r < GRID_CONSTANTS.MAX_ROWS; r++) {
        if (!calculatedGrid[r]) calculatedGrid[r] = Array(GRID_CONSTANTS.COLS).fill(null);
        let contiguous = 0;
        for (let c = 0; c < GRID_CONSTANTS.COLS; c++) {
          if (!calculatedGrid[r][c]) {
            contiguous++;
            if (contiguous === m.studs) {
              placedRow = r;
              placedCol = c - m.studs + 1;
              break;
            }
          } else {
            contiguous = 0;
          }
        }
        if (placedRow !== -1) break;
      }
      if (placedRow !== -1) {
        for (let i = 0; i < m.studs; i++) {
          calculatedGrid[placedRow][placedCol + i] = m.id;
        }
      } else {
        placedRow = 0;
        placedCol = 0;
      }
      return { module: m, rowIndex: placedRow, colIndex: placedCol };
    });
    return { grid: calculatedGrid, positionedModules: positioned };
  }, [equippedModules]);

  const hiddenServerStuds = [];
  if (grid[0]) {
    grid[0].forEach((occupantId, idx) => {
      if (occupantId && !animatingBlocks[occupantId]) hiddenServerStuds.push(idx);
    });
  }

  const towerHeight =
    equippedModules.length > 0
      ? (Math.max(...positionedModules.map((m) => m.rowIndex)) + 1) * GRID_CONSTANTS.ROW_HEIGHT
      : 0;

  return (
    <div onPointerMove={handlePointerMove} className={`lego-tech-stage ${className}`}>
      <div className="lego-tech-layout">
        {/* LEFT: Available Blocks */}
        <div className="lego-tech-palette">
          <div className="lego-palette-label">
            <span className="lego-palette-dot" />
            <span>CLICK TO EQUIP DISCIPLINES</span>
          </div>
          <div className="lego-palette-grid">
            {unequippedModules.map((module) => {
              const startRect = animatingBlocks[module.id];
              return (
                <ModuleBlock
                  key={module.id}
                  module={module}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  isAnimating={!!startRect}
                  startRect={startRect || null}
                  onAnimationComplete={() => {
                    setAnimatingBlocks((prev) => {
                      const next = { ...prev };
                      delete next[module.id];
                      return next;
                    });
                  }}
                  onClick={(e) => handleToggleEquip(module.id, e)}
                />
              );
            })}
          </div>
        </div>

        {/* RIGHT: Profile Tower */}
        <div className="lego-tech-tower-area">
          <div className="lego-tower-scale">
            <motion.div
              animate={controls}
              className="lego-tower-wrapper"
              style={{ marginTop: `${towerHeight}px` }}
            >
              {/* Stacked equipped modules */}
              <div className="lego-tower-stack" style={{ bottom: 'calc(100% - 14px)' }}>
                {positionedModules.map(({ module, rowIndex, colIndex }) => {
                  const hiddenLocalStuds = [];
                  if (grid[rowIndex + 1]) {
                    for (let i = 0; i < module.studs; i++) {
                      const occupantId = grid[rowIndex + 1][colIndex + i];
                      if (occupantId && !animatingBlocks[occupantId]) {
                        hiddenLocalStuds.push(i);
                      }
                    }
                  }
                  const startRect = animatingBlocks[module.id];
                  return (
                    <div
                      key={module.id}
                      className="lego-tower-block"
                      style={{
                        bottom: rowIndex * GRID_CONSTANTS.ROW_HEIGHT,
                        left: colIndex * GRID_CONSTANTS.STUD_WIDTH,
                        zIndex: rowIndex * 10,
                      }}
                    >
                      <ModuleBlock
                        module={module}
                        hiddenStuds={hiddenLocalStuds}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        isAnimating={!!startRect}
                        startRect={startRect || null}
                        onAnimationComplete={() => {
                          setAnimatingBlocks((prev) => {
                            const next = { ...prev };
                            delete next[module.id];
                            return next;
                          });
                        }}
                        onClick={(e) => handleToggleEquip(module.id, e)}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Base Profile Block */}
              <LegoBlock
                mouseX={mouseX}
                mouseY={mouseY}
                topColor="#E8D5B5"
                faceGradient="linear-gradient(180deg, #F5E6CC 0%, #E8D5B5 50%, #B59661 100%)"
                bottomColor="#8B6914"
                roundedTop
                roundedBottom
                studs={6}
                studColor="gold"
                hideStuds={hiddenServerStuds}
                className="lego-base-block"
              >
                <div className="lego-profile-face">
                  <div className="lego-profile-icon-box">
                    <User size={24} strokeWidth={1.8} color="white" />
                  </div>
                  <div className="lego-profile-info">
                    <h3 className="lego-profile-name">My Stack</h3>
                    <p className="lego-profile-xp">
                      {equippedModules.length === 0
                        ? 'SELECT DISCIPLINES'
                        : `LEVEL: ${equippedModules.length * 10}XP`}
                    </p>
                  </div>
                </div>
              </LegoBlock>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="lego-cta-area">
            <AnimatePresence>
              {equippedModules.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="lego-cta-text"
                >
                  {equippedModules.map((m) => m.name).join(' · ')}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegoTechStack;
