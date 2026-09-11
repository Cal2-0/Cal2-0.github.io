import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Activity,
  Search,
  Cpu,
  Eye,
  Shield,
  Code,
  Terminal,
  Key,
  Radio,
  FileCode,
  Database,
  Network,
  Zap,
  Layers,
  Boxes,
  GitBranch,
  Server,
  Crosshair
} from 'lucide-react';
import { techCategories, orbitalTiers } from '../../data/techArsenal';
import '../../styles/scenes/techArsenal.css';

// Safe icon component resolver with fallback
const iconMap = {
  Lock,
  Activity,
  Search,
  Cpu,
  Eye,
  Shield,
  Code,
  Terminal,
  Key,
  Radio,
  FileCode,
  Database,
  Network,
  Zap,
  Layers,
  Boxes,
  GitBranch,
  Server,
  Crosshair
};

const resolveIcon = (iconName) => {
  const Component = iconMap[iconName] || Shield;
  return Component;
};

const TechArsenal = () => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeNode, setActiveNode] = useState(orbitalTiers[0].nodes[0]);
  const [stageWidth, setStageWidth] = useState(900);

  // Measure container for responsive geometry
  useEffect(() => {
    const updateDimensions = () => {
      const screenW = window.innerWidth;
      const measured = Math.min(screenW * 0.92, 1000);
      setStageWidth(measured);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Geometry calculations
  const baseWidth = stageWidth;
  const centerX = baseWidth / 2;
  const centerY = baseWidth * 0.52;
  const stageHeight = centerY + 36;

  const isMobile = baseWidth < 640;
  const isTablet = baseWidth < 840;
  const nodeSize = isMobile ? 32 : isTablet ? 38 : 46;
  const iconSize = isMobile ? 15 : isTablet ? 18 : 22;

  return (
    <section className="bureau-arsenal" id="arsenal" ref={sectionRef}>
      <div className="bureau-arsenal-container">
        
        {/* Section Header */}
        <div className="arsenal-header">
          <div className="arsenal-classification">
            <span className="arsenal-status-dot" />
            <span>THE LAB // ACTIVE INSTRUMENTS</span>
          </div>
          <h2 className="arsenal-title">
            The Technical <em>Arsenal</em>
          </h2>
          <p className="arsenal-subtitle">
            Core technologies, frameworks, and forensic tools deployed across investigation platforms and high-stakes operations.
          </p>

          {/* Category Filter Tabs */}
          <div className="arsenal-filters" role="tablist">
            {techCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`arsenal-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Semi-Circular Orbital Stage */}
        <div
          className="orbit-stage"
          style={{ width: `${baseWidth}px`, height: `${stageHeight}px` }}
        >
          {/* Ambient Radar Sweep & Glow */}
          <div className="radar-sweep-beam" />
          <div className="orbit-dome-glow" />

          {/* SVG Orbital Track Geometry */}
          <svg
            className="orbit-svg-tracks"
            viewBox={`0 0 ${baseWidth} ${stageHeight}`}
            style={{ width: `${baseWidth}px`, height: `${stageHeight}px` }}
          >
            <defs>
              <linearGradient id="orbitGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(232, 213, 181, 0.08)" />
                <stop offset="50%" stopColor="rgba(232, 213, 181, 0.45)" />
                <stop offset="100%" stopColor="rgba(232, 213, 181, 0.08)" />
              </linearGradient>
              <linearGradient id="orbitVioletGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.08)" />
                <stop offset="50%" stopColor="rgba(139, 92, 246, 0.45)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.08)" />
              </linearGradient>
              <linearGradient id="orbitCyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.08)" />
                <stop offset="50%" stopColor="rgba(6, 182, 212, 0.4)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.08)" />
              </linearGradient>
            </defs>

            {orbitalTiers.map((tier) => {
              const r = baseWidth * tier.radiusRatio;
              const pathD = `M ${centerX - r} ${centerY} A ${r} ${r} 0 0 1 ${centerX + r} ${centerY}`;
              return (
                <g key={tier.tier}>
                  {/* Subtle Background Arc */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                  />
                  {/* Glowing Active Arc */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={
                      tier.tier === 1
                        ? 'url(#orbitVioletGrad)'
                        : tier.tier === 2
                        ? 'url(#orbitGoldGrad)'
                        : 'url(#orbitCyanGrad)'
                    }
                    strokeWidth={tier.tier === 1 ? '1.5' : '1'}
                    strokeDasharray={tier.tier === 2 ? '5 5' : 'none'}
                  />
                </g>
              );
            })}

            {/* Subtle Angular Guides */}
            {[30, 60, 90, 120, 150].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const innerR = baseWidth * 0.12;
              const outerR = baseWidth * 0.52;
              const x1 = centerX + Math.cos(rad) * innerR;
              const y1 = centerY - Math.sin(rad) * innerR;
              const x2 = centerX + Math.cos(rad) * outerR;
              const y2 = centerY - Math.sin(rad) * outerR;
              return (
                <line
                  key={deg}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(232, 213, 181, 0.05)"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                />
              );
            })}
          </svg>

          {/* Render Orbital Nodes across Tiers */}
          {orbitalTiers.map((tier) => {
            const radius = baseWidth * tier.radiusRatio;
            const items = tier.nodes;
            const count = items.length;

            return items.map((node, index) => {
              // angle goes from 180° (left horizon) to 0° (right horizon)
              const angleDeg = 180 - (index / (count - 1)) * 180;
              const angleRad = (angleDeg * Math.PI) / 180;
              const x = radius * Math.cos(angleRad);
              const y = radius * Math.sin(angleRad);

              const leftPos = centerX + x;
              const topPos = centerY - y;

              const isDimmed = activeCategory !== 'all' && node.category !== activeCategory;
              const isSelected = activeNode?.id === node.id;
              const IconComp = resolveIcon(node.icon);
              const tooltipAbove = angleDeg > 90;

              return (
                <div
                  key={node.id}
                  className={`orbit-node-wrapper ${isDimmed ? 'dimmed' : ''}`}
                  style={{
                    left: `${leftPos}px`,
                    top: `${topPos}px`,
                    width: `${nodeSize}px`,
                    height: `${nodeSize}px`
                  }}
                  onClick={() => setActiveNode(node)}
                  onMouseEnter={() => setActiveNode(node)}
                >
                  <div
                    className={`orbit-node ${isSelected ? 'active' : ''}`}
                    data-category={node.category}
                    style={{ width: `${nodeSize}px`, height: `${nodeSize}px` }}
                  >
                    <IconComp size={iconSize} strokeWidth={1.8} />
                  </div>

                  {/* Micro Tooltip */}
                  <div
                    className={`orbit-tooltip ${
                      tooltipAbove ? 'orbit-tooltip--above' : 'orbit-tooltip--below'
                    }`}
                  >
                    {node.short}
                  </div>
                </div>
              );
            });
          })}

          {/* Central Radar Origin Beacon */}
          <div
            className="orbit-origin-beacon"
            style={{
              left: `${centerX}px`,
              top: `${centerY}px`,
              transform: 'translate(-50%, -50%)'
            }}
            title="The Bureau Radar Core"
          >
            <Crosshair size={22} strokeWidth={1.5} />
          </div>

          {/* Bottom Horizon Rule */}
          <div className="arsenal-horizon-rule" style={{ top: `${centerY}px` }} />
        </div>

        {/* Active Telemetry Inspector HUD Card */}
        {activeNode && (
          <div className="arsenal-hud-container">
            <div className="arsenal-hud-card">
              <div className="hud-content">
                <div className="hud-meta-row">
                  <span className="hud-category-badge">
                    {activeNode.category === 'security'
                      ? 'FORENSICS & DEFENSE'
                      : activeNode.category === 'ai'
                      ? 'AI & COMPUTER VISION'
                      : 'CORE ARCHITECTURE'}
                  </span>
                  <span className="hud-status-badge">{activeNode.status}</span>
                </div>
                <h3 className="hud-instrument-name">
                  {activeNode.name}
                </h3>
                <div className="hud-role">{activeNode.role}</div>
                <p className="hud-description">{activeNode.description}</p>
              </div>

              <div className="hud-deployment-box">
                <div className="hud-deployment-label">DEPLOYED IN CASE FILE</div>
                <div className="hud-deployment-value">{activeNode.deployedIn}</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default TechArsenal;
