import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Zap, Activity, Gamepad2, Monitor, Gauge, Wifi, Battery, ShieldCheck, Laptop, Smartphone, Terminal, Server, Radio, Flame, Sparkles } from 'lucide-react';

export const VaultHardware = () => {
  // Live visitor hardware detection
  const [visitorData, setVisitorData] = useState({
    cores: navigator.hardwareConcurrency || 8,
    memory: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : '8 GB (Sandboxed)',
    gpu: 'Scanning WebGL accelerator...',
    resolution: `${window.screen.width} × ${window.screen.height}`,
    dpr: window.devicePixelRatio || 1,
    colorDepth: window.screen.colorDepth || 24,
    platform: 'Detecting OS...',
    touchPoints: navigator.maxTouchPoints || 0,
    network: 'Broadband Uplink',
    downlink: 'Measuring...',
    batteryLevel: null,
    isCharging: null,
    isMobileDevice: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent),
  });

  const [fps, setFps] = useState(60);
  const [viewMode, setViewMode] = useState('DUAL'); // 'DUAL', 'WORKSTATION', 'VISITOR'

  // Calvin's Workstation Live Telemetry Fluctuations
  const [cpuUsage, setCpuUsage] = useState(24);
  const [clockSpeed, setClockSpeed] = useState(4.45);
  const [memUsage, setMemUsage] = useState(11.8);
  const [gpuUsage, setGpuUsage] = useState(36);
  const [gpuTemp, setGpuTemp] = useState(44);

  // Measure visitor GPU and system Web APIs
  useEffect(() => {
    // 1. Detect WebGL GPU
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const unmaskedGpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          const cleanGpu = unmaskedGpu
            .replace(/^ANGLE \(/, '')
            .replace(/\)$/, '')
            .replace(/Direct3D11 vs_5_0 ps_5_0.*/, '')
            .replace(/Direct3D12.*/, '')
            .trim();
          setVisitorData(prev => ({ ...prev, gpu: cleanGpu || 'Hardware Accelerated WebGL' }));
        } else {
          setVisitorData(prev => ({ ...prev, gpu: gl.getParameter(gl.RENDERER) || 'Hardware Accelerated WebGL' }));
        }
      }
    } catch {
      setVisitorData(prev => ({ ...prev, gpu: 'Integrated Video Buffer' }));
    }

    // 2. Detect Platform
    let detectedPlatform = 'Host Machine';
    if (navigator.userAgentData?.platform) {
      detectedPlatform = navigator.userAgentData.platform;
    } else {
      const ua = navigator.userAgent;
      if (ua.includes('Macintosh') || ua.includes('Mac OS')) detectedPlatform = 'macOS (Apple Silicon / Intel)';
      else if (ua.includes('Windows')) detectedPlatform = 'Windows 11 (x86_64)';
      else if (ua.includes('Android')) detectedPlatform = 'Android Mobile OS';
      else if (ua.includes('iPhone') || ua.includes('iPad')) detectedPlatform = 'Apple iOS';
      else if (ua.includes('Linux')) detectedPlatform = 'GNU/Linux Kernel';
    }
    setVisitorData(prev => ({ ...prev, platform: detectedPlatform }));

    // 3. Detect Network
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      setVisitorData(prev => ({
        ...prev,
        network: `${conn.effectiveType?.toUpperCase() || 'Broadband'} (${conn.rtt || 24}ms RTT)`,
        downlink: conn.downlink ? `${conn.downlink} Mbps` : 'High-Bandwidth'
      }));
    }

    // 4. Detect Battery API if supported
    if (navigator.getBattery) {
      navigator.getBattery().then(bat => {
        setVisitorData(prev => ({
          ...prev,
          batteryLevel: Math.round(bat.level * 100),
          isCharging: bat.charging
        }));

        bat.addEventListener('levelchange', () => {
          setVisitorData(prev => ({ ...prev, batteryLevel: Math.round(bat.level * 100) }));
        });
        bat.addEventListener('chargingchange', () => {
          setVisitorData(prev => ({ ...prev, isCharging: bat.charging }));
        });
      }).catch(() => {});
    }

    // 5. Measure real render FPS
    let frameCount = 0;
    let lastTime = performance.now();
    let animId;

    const measureFps = (now) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };
    animId = requestAnimationFrame(measureFps);

    // 6. Realistic workstation hardware load loop
    const hostTimer = setInterval(() => {
      setCpuUsage(prev => Math.min(68, Math.max(16, Math.round(prev + (Math.random() * 10 - 5)))));
      setClockSpeed(prev => +(Math.min(4.90, Math.max(3.95, prev + (Math.random() * 0.16 - 0.08))).toFixed(2)));
      setMemUsage(prev => +(Math.min(13.2, Math.max(11.2, prev + (Math.random() * 0.2 - 0.1))).toFixed(1)));
      setGpuUsage(prev => Math.min(72, Math.max(22, Math.round(prev + (Math.random() * 8 - 4)))));
      setGpuTemp(prev => Math.min(52, Math.max(42, Math.round(prev + (Math.random() * 2 - 1)))));
    }, 2200);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(hostTimer);
    };
  }, []);

  const games = [
    { title: "Valorant", tag: "RIOT PROTOCOL", desc: "Tactical 5v5 with crosshair discipline & utility lineups.", icon: "🎯", color: "#ff4655" },
    { title: "Fortnite", tag: "BATTLE ROYALE", desc: "Fast box-fights, rotations & high-ground retakes.", icon: "⚡", color: "#00d2ff" },
    { title: "Minecraft", tag: "SANDBOX OS", desc: "Redstone automation circuits & subterranean bunkers.", icon: "⛏️", color: "#4caf50" },
    { title: "FIFA / FC", tag: "EA TELEMETRY", desc: "Tiki-taka counter attacks & 90th-minute winners.", icon: "⚽", color: "#ffd700" },
  ];

  return (
    <div className="vault-panel">
      {/* Header */}
      <div className="vault-panel-header" style={{ flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h3 className="vault-panel-title">
            <Cpu size={20} color="var(--color-gold)" /> HARDWARE TELEMETRY // WORKSTATION & CLIENT PROBE
          </h3>
          <p style={{ color: 'var(--color-silver, #8E8D8A)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', margin: '4px 0 0 0' }}>
            Primary combat workstation architecture alongside live hardware discovery from your client browser.
          </p>
          <p style={{ color: '#8E8D8A', fontFamily: 'var(--font-mono)', fontSize: '0.76rem', margin: '8px 0 0 0', lineHeight: 1.5, maxWidth: '580px', fontStyle: 'italic', borderLeft: '2px solid var(--color-gold, #C5A880)', paddingLeft: '12px' }}>
            "I'm a huge geek. I love hardware — the smell of thermal paste, the click of a mechanical keyboard, benchmarking GPUs at 3 AM. Building systems is my therapy."
          </p>
        </div>

        {/* View Mode Controls */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setViewMode('DUAL')}
            style={{
              background: viewMode === 'DUAL' ? 'var(--color-gold)' : 'rgba(20,20,26,0.8)',
              color: viewMode === 'DUAL' ? '#070709' : 'var(--color-gold)',
              border: '1px solid var(--color-gold)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              padding: '6px 14px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={14} /> DUAL TELEMETRY
          </button>

          <button
            onClick={() => setViewMode('WORKSTATION')}
            style={{
              background: viewMode === 'WORKSTATION' ? 'var(--color-gold)' : 'rgba(20,20,26,0.8)',
              color: viewMode === 'WORKSTATION' ? '#070709' : 'var(--color-silver)',
              border: '1px solid rgba(197, 168, 128, 0.3)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              padding: '6px 14px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Server size={14} /> CALVIN'S RIG
          </button>

          <button
            onClick={() => setViewMode('VISITOR')}
            style={{
              background: viewMode === 'VISITOR' ? 'var(--color-gold)' : 'rgba(20,20,26,0.8)',
              color: viewMode === 'VISITOR' ? '#070709' : 'var(--color-silver)',
              border: '1px solid rgba(197, 168, 128, 0.3)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              padding: '6px 14px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {visitorData.isMobileDevice ? <Smartphone size={14} /> : <Laptop size={14} />}
            YOUR CLIENT
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: CALVIN'S WORKSTATION (SHOWN IN 'DUAL' & 'WORKSTATION')
         ───────────────────────────────────────────────────────────── */}
      {(viewMode === 'DUAL' || viewMode === 'WORKSTATION') && (
        <div style={{ marginBottom: '28px' }}>
          {/* Subheader Banner */}
          <div style={{ 
            background: 'linear-gradient(90deg, rgba(197, 168, 128, 0.12), rgba(20, 20, 26, 0.6))', 
            border: '1px solid rgba(197, 168, 128, 0.35)', 
            borderLeft: '4px solid var(--color-gold)',
            padding: '12px 16px', 
            borderRadius: '4px', 
            marginBottom: '16px', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)' }}>
              <Server size={16} />
              <span style={{ fontWeight: 'bold' }}>OPERATIVE RIG: MSI HIGH-TENSOR COMBAT WORKSTATION</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="vault-panel-tag" style={{ background: 'rgba(0, 255, 170, 0.1)', color: '#00ffaa', border: '1px solid #00ffaa', padding: '2px 8px', fontSize: '0.7rem' }}>
                STATUS: NOMINAL
              </span>
              <span className="vault-panel-tag" style={{ background: 'rgba(197, 168, 128, 0.15)', color: 'var(--color-gold)', border: '1px solid var(--color-gold)', padding: '2px 8px', fontSize: '0.7rem' }}>
                BOOST: 4.90 GHz
              </span>
            </div>
          </div>

          {/* 3 Main Hardware Cards: CPU, RAM, GPU */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', fontFamily: 'var(--font-mono)' }}>
            
            {/* 1. CPU PANEL */}
            <div style={{ background: 'rgba(20, 20, 26, 0.75)', border: '1px solid rgba(197, 168, 128, 0.25)', padding: '18px', borderRadius: '6px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ color: '#00ffcc', fontSize: '0.82rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Cpu size={16} /> 13TH GEN INTEL CORE
                </span>
                <span style={{ color: 'var(--color-gold)', fontSize: '0.74rem' }}>i7-13700H</span>
              </div>

              <div style={{ fontSize: '1.45rem', fontWeight: 'bold', color: '#FFF', marginBottom: '4px' }}>
                {clockSpeed} GHz <span style={{ fontSize: '0.85rem', color: '#8E8D8A' }}>/ {cpuUsage}% LOAD</span>
              </div>

              {/* Dynamic Progress Bar */}
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', margin: '8px 0 12px' }}>
                <div style={{ width: `${cpuUsage}%`, height: '100%', background: 'linear-gradient(90deg, #00ffcc, var(--color-gold))', transition: 'width 0.8s ease' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.72rem', color: '#8E8D8A' }}>
                <div>CORES: <span style={{ color: '#FFF' }}>14 (6P + 8E)</span></div>
                <div>THREADS: <span style={{ color: '#FFF' }}>20 LOGICAL</span></div>
                <div>BASE CLOCK: <span style={{ color: '#FFF' }}>2.40 GHz</span></div>
                <div>L3 CACHE: <span style={{ color: '#FFF' }}>24 MB SMART</span></div>
              </div>
            </div>

            {/* 2. MEMORY (RAM) PANEL */}
            <div style={{ background: 'rgba(20, 20, 26, 0.75)', border: '1px solid rgba(197, 168, 128, 0.25)', padding: '18px', borderRadius: '6px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ color: '#ff9500', fontSize: '0.82rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Activity size={16} /> HIGH-SPEED MEMORY
                </span>
                <span style={{ color: 'var(--color-gold)', fontSize: '0.74rem' }}>DDR5 5200 MT/s</span>
              </div>

              <div style={{ fontSize: '1.45rem', fontWeight: 'bold', color: '#FFF', marginBottom: '4px' }}>
                {memUsage} GB <span style={{ fontSize: '0.85rem', color: '#8E8D8A' }}>/ 16.0 GB ({(memUsage / 16.0 * 100).toFixed(0)}%)</span>
              </div>

              {/* Dynamic Progress Bar */}
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', margin: '8px 0 12px' }}>
                <div style={{ width: `${(memUsage / 16.0 * 100)}%`, height: '100%', background: 'linear-gradient(90deg, #ff9500, #ff3333)', transition: 'width 0.8s ease' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.72rem', color: '#8E8D8A' }}>
                <div>CHANNELS: <span style={{ color: '#FFF' }}>DUAL DDR5</span></div>
                <div>BANDWIDTH: <span style={{ color: '#FFF' }}>83.2 GB/s</span></div>
                <div>CACHE POOL: <span style={{ color: '#FFF' }}>LOW LATENCY</span></div>
                <div>SWAP POOL: <span style={{ color: '#FFF' }}>NVMe ZRAM</span></div>
              </div>
            </div>

            {/* 3. GPU PANEL */}
            <div style={{ background: 'rgba(20, 20, 26, 0.75)', border: '1px solid rgba(197, 168, 128, 0.25)', padding: '18px', borderRadius: '6px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ color: '#00ff66', fontSize: '0.82rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Gauge size={16} /> GRAPHICS ARRAY
                </span>
                <span style={{ color: '#00ff66', fontSize: '0.74rem' }}>ADA LOVELACE</span>
              </div>

              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#00ff66', marginBottom: '4px' }}>
                RTX 4060 Laptop GPU
              </div>

              {/* Dynamic Progress Bar */}
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', margin: '8px 0 12px' }}>
                <div style={{ width: `${gpuUsage}%`, height: '100%', background: '#00ff66', transition: 'width 0.8s ease' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.72rem', color: '#8E8D8A' }}>
                <div>VRAM: <span style={{ color: '#FFF' }}>8GB GDDR6</span></div>
                <div>THERMAL: <span style={{ color: '#00ff66' }}>{gpuTemp}°C (COOL)</span></div>
                <div>CUDA CORES: <span style={{ color: '#FFF' }}>3,072</span></div>
                <div>STORAGE: <span style={{ color: '#FFF' }}>1TB Gen4 NVMe</span></div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: VISITOR CLIENT PROBE (SHOWN IN 'DUAL' & 'VISITOR')
         ───────────────────────────────────────────────────────────── */}
      {(viewMode === 'DUAL' || viewMode === 'VISITOR') && (
        <div style={{ marginBottom: '28px', borderTop: viewMode === 'DUAL' ? '1px dashed rgba(197, 168, 128, 0.2)' : 'none', paddingTop: viewMode === 'DUAL' ? '20px' : '0' }}>
          {/* Subheader Banner */}
          <div style={{ 
            background: 'linear-gradient(90deg, rgba(52, 211, 153, 0.1), rgba(20, 20, 26, 0.6))', 
            border: '1px solid rgba(52, 211, 153, 0.35)', 
            borderLeft: '4px solid #34d399',
            padding: '12px 16px', 
            borderRadius: '4px', 
            marginBottom: '16px', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399' }}>
              <ShieldCheck size={16} />
              <span style={{ fontWeight: 'bold' }}>REMOTE CLIENT PROBE: LIVE TELEMETRY QUERY FROM YOUR DEVICE</span>
            </div>
            <div style={{ color: 'var(--color-gold)' }}>
              LIVE RENDERER: <span style={{ color: '#FFF', fontWeight: 'bold' }}>{fps} FPS V-SYNC</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontFamily: 'var(--font-mono)' }}>
            
            {/* Client CPU */}
            <div style={{ background: 'rgba(20, 20, 26, 0.65)', border: '1px solid rgba(197, 168, 128, 0.25)', padding: '16px', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#00ffcc', fontSize: '0.78rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Cpu size={15} /> CLIENT PROCESSOR
                </span>
                <span style={{ color: 'var(--color-gold)', fontSize: '0.7rem' }}>HARDWARE</span>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#FFF', marginBottom: '2px' }}>
                {visitorData.cores} <span style={{ fontSize: '0.8rem', color: '#8E8D8A' }}>CPU THREADS</span>
              </div>
              <p style={{ fontSize: '0.72rem', color: '#8E8D8A', margin: '4px 0 8px 0', lineHeight: 1.3 }}>
                Detected via browser hardware concurrency primitive.
              </p>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-silver)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                HOST OS: <span style={{ color: '#FFF' }}>{visitorData.platform}</span>
              </div>
            </div>

            {/* Client GPU */}
            <div style={{ background: 'rgba(20, 20, 26, 0.65)', border: '1px solid rgba(197, 168, 128, 0.25)', padding: '16px', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#34d399', fontSize: '0.78rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Gauge size={15} /> CLIENT ACCELERATOR
                </span>
                <span style={{ color: '#34d399', fontSize: '0.7rem' }}>WEBGL 2.0</span>
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 'bold', color: '#FFF', marginBottom: '4px', lineHeight: 1.3, wordBreak: 'break-word', minHeight: '38px' }}>
                {visitorData.gpu}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#8E8D8A', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                RENDER LOOP: <span style={{ color: '#34d399' }}>{fps} FPS ACTIVE</span>
              </div>
            </div>

            {/* Client Display */}
            <div style={{ background: 'rgba(20, 20, 26, 0.65)', border: '1px solid rgba(197, 168, 128, 0.25)', padding: '16px', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#ff9500', fontSize: '0.78rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Monitor size={15} /> VIEWPORT & OPTICAL
                </span>
                <span style={{ color: 'var(--color-gold)', fontSize: '0.7rem' }}>SCREEN</span>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#FFF', marginBottom: '2px' }}>
                {visitorData.resolution}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '0.7rem', color: '#8E8D8A', marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                <div>PIXEL RATIO: <span style={{ color: '#FFF' }}>{visitorData.dpr}x DPR</span></div>
                <div>COLOR: <span style={{ color: '#FFF' }}>{visitorData.colorDepth}-bit</span></div>
                <div>INPUT: <span style={{ color: '#FFF' }}>{visitorData.touchPoints > 0 ? 'Touch' : 'Mouse'}</span></div>
                <div>MEMORY: <span style={{ color: '#FFF' }}>{visitorData.memory}</span></div>
              </div>
            </div>

            {/* Client Uplink & Power */}
            <div style={{ background: 'rgba(20, 20, 26, 0.65)', border: '1px solid rgba(197, 168, 128, 0.25)', padding: '16px', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#60a5fa', fontSize: '0.78rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Wifi size={15} /> UPLINK & POWER
                </span>
                <span style={{ color: '#60a5fa', fontSize: '0.7rem' }}>TELEMETRY</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#FFF', marginBottom: '2px' }}>
                {visitorData.network}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '0.7rem', color: '#8E8D8A', marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                <div>DOWNLINK: <span style={{ color: '#FFF' }}>{visitorData.downlink}</span></div>
                <div>
                  BATTERY: <span style={{ color: visitorData.batteryLevel !== null ? '#00ffcc' : '#8E8D8A' }}>
                    {visitorData.batteryLevel !== null 
                      ? `${visitorData.batteryLevel}% ${visitorData.isCharging ? '⚡' : ''}` 
                      : 'AC Connected'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: INSTALLED GAMING PROTOCOLS
         ───────────────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(197, 168, 128, 0.2)', paddingTop: '18px' }}>
        <h4 style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '1px' }}>
          <Gamepad2 size={16} /> INSTALLED GAMING PROTOCOLS // ROTATION ACTIVE
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontFamily: 'var(--font-mono)' }}>
          {games.map((g, i) => (
            <div 
              key={i}
              style={{
                background: 'rgba(15, 15, 20, 0.8)',
                border: '1px solid rgba(197, 168, 128, 0.2)',
                borderLeft: `3px solid ${g.color}`,
                padding: '12px 14px',
                borderRadius: '4px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = g.color}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.2)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ color: '#FFF', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{g.icon}</span> {g.title}
                </span>
                <span style={{ color: g.color, fontSize: '0.68rem', letterSpacing: '0.5px' }}>[{g.tag}]</span>
              </div>
              <p style={{ color: '#8E8D8A', fontSize: '0.74rem', margin: '4px 0 0 0', lineHeight: 1.3 }}>
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
export default VaultHardware;
