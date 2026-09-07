import React, { useState, useMemo, useRef } from 'react';
import { 
  Gauge, Volume2, Plus, Minus, Search, Star, Layers, Activity, 
  X, ChevronRight, Zap, Shield, Sparkles, SlidersHorizontal, ArrowUpDown, Check
} from 'lucide-react';
import { 
  GARAGE_CARS, 
  GARAGE_TIERS, 
  BRANDS, 
  CALVIN_APPROVED_IDS, 
  getDatabaseStats 
} from '../../data/garageDatabase';

const MAX_BAYS = 5;

export const VaultGarage = () => {
  // 5-Bay Active Fleet State (Default starting cars: Empty as requested)
  const [garageBays, setGarageBays] = useState([]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [selectedFilter, setSelectedFilter] = useState('ALL'); // 'ALL' | 'APPROVED' | 'HYPER' | 'DAILY'
  const [sortBy, setSortBy] = useState('price-desc');
  const [inspectedCar, setInspectedCar] = useState(null);

  // Audio Telemetry State
  const [activeSoundCar, setActiveSoundCar] = useState(null);
  const audioCtxRef = useRef(null);

  // 1. Calculate Active 5-Bay Fleet Telemetry
  const activeFleetCars = useMemo(() => {
    return garageBays.map(id => GARAGE_CARS.find(c => c.id === id)).filter(Boolean);
  }, [garageBays]);

  const fleetStats = useMemo(() => {
    const totalCost = activeFleetCars.reduce((sum, c) => sum + (c.cost || 0), 0);
    
    // Calculate total horsepower
    const totalHP = activeFleetCars.reduce((sum, c) => {
      const match = c.power.match(/([0-9,]+)\s*(HP|CV|PS)/i);
      const val = match ? parseInt(match[1].replace(/,/g, '')) : 0;
      return sum + val;
    }, 0);

    // Calculate average 0-100
    const times = activeFleetCars
      .map(c => parseFloat(c.zeroHundred))
      .filter(t => !isNaN(t) && t > 0);
    const avgZeroHundred = times.length > 0 ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(1) : 0;

    return {
      count: activeFleetCars.length,
      totalCost,
      totalCostFormatted: totalCost >= 10000000 
        ? `₹${(totalCost / 10000000).toFixed(1)} Crore` 
        : `₹${(totalCost / 100000).toFixed(1)} Lakh`,
      totalHP,
      avgZeroHundred
    };
  }, [activeFleetCars]);

  // 2. Toggle Car in 5-Bay Garage
  const toggleCarInGarage = (carId) => {
    if (garageBays.includes(carId)) {
      setGarageBays(garageBays.filter(id => id !== carId));
    } else {
      if (garageBays.length < MAX_BAYS) {
        setGarageBays([...garageBays, carId]);
      } else {
        // If 5 bays full, queue behavior (push to end, remove first)
        setGarageBays([...garageBays.slice(1), carId]);
      }
    }
  };

  const removeBayCar = (index) => {
    const updated = [...garageBays];
    updated.splice(index, 1);
    setGarageBays(updated);
  };

  // 3. Procedural Engine Sound Synthesis
  const playEngineRev = (car) => {
    setActiveSoundCar(car);
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      if (audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;
        let baseFreq = 110;
        let peakFreq = 720;
        let isElectric = car.soundType === 'ev-turbine';

        if (car.soundType?.includes('v12')) {
          baseFreq = 150; peakFreq = 920;
        } else if (car.soundType?.includes('v10')) {
          baseFreq = 135; peakFreq = 840;
        } else if (car.soundType === 'inline4') {
          baseFreq = 95; peakFreq = 420;
        }

        const master = ctx.createGain();
        master.gain.setValueAtTime(0.001, now);
        master.gain.exponentialRampToValueAtTime(0.2, now + 0.3);
        master.gain.exponentialRampToValueAtTime(0.26, now + 1.1);
        master.gain.exponentialRampToValueAtTime(0.001, now + 2.6);
        master.connect(ctx.destination);

        for (let i = 1; i <= 6; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
          const sf = baseFreq * (i * 0.7);
          const pf = peakFreq * (i * 0.7);

          osc.frequency.setValueAtTime(sf, now);
          osc.frequency.exponentialRampToValueAtTime(pf, now + 1.0);
          osc.frequency.exponentialRampToValueAtTime(sf * 1.1, now + 2.5);

          gain.gain.setValueAtTime((1 / i) * 0.35, now);
          osc.connect(gain);
          gain.connect(master);
          osc.start(now);
          osc.stop(now + 2.6);
        }
      }
    } catch (e) {
      console.warn("Audio synthesis unavailable", e);
    }

    setTimeout(() => setActiveSoundCar(null), 2600);
  };

  // 4. Filter & Search Showroom Cars
  const showroomCars = useMemo(() => {
    return GARAGE_CARS.filter(car => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = car.name.toLowerCase().includes(q) ||
                      car.brandName.toLowerCase().includes(q) ||
                      car.engine.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Brand
      if (selectedBrand !== 'ALL' && car.brand !== selectedBrand) {
        return false;
      }

      // Filter Tabs
      if (selectedFilter === 'APPROVED' && !car.isCalvinApproved) return false;
      if (selectedFilter === 'HYPER' && !['HYPERCAR', 'ULTRA', 'COLLECTOR', 'NUCLEAR'].includes(car.tier)) return false;
      if (selectedFilter === 'DAILY' && !['DAILY', 'PERFORMANCE'].includes(car.tier)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.cost - a.cost;
      if (sortBy === 'price-asc') return a.cost - b.cost;
      if (sortBy === 'rating-desc') return (b.calvinRating + (b.isCalvinApproved ? 3 : 0)) - (a.calvinRating + (a.isCalvinApproved ? 3 : 0));
      if (sortBy === 'power-desc') {
        const pA = parseInt(a.power.replace(/[^0-9]/g, '')) || 0;
        const pB = parseInt(b.power.replace(/[^0-9]/g, '')) || 0;
        return pB - pA;
      }
      return 0;
    });
  }, [searchQuery, selectedBrand, selectedFilter, sortBy]);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', fontFamily: 'var(--font-mono, monospace)', color: '#E8D5B5' }}>
      
      {/* =========================================================================
          1. TOP BOX: 5-BAY MASTER GARAGE (HANGAR TELEMETRY)
          ========================================================================= */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(20, 20, 28, 0.95) 0%, rgba(12, 12, 16, 0.98) 100%)',
        border: '1px solid var(--color-gold, #C5A880)',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '36px',
        boxShadow: '0 15px 45px rgba(0,0,0,0.7), inset 0 0 30px rgba(197, 168, 128, 0.06)'
      }}>
        
        {/* Garage Master HUD Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(197, 168, 128, 0.2)', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--color-gold)', fontSize: '0.74rem', letterSpacing: '2px', fontWeight: 'bold' }}>
                [ MASTER SHOWROOM // 5-BAY FLEET ARCHITECTURE ]
              </span>
              <span style={{ background: 'rgba(0, 255, 204, 0.1)', color: '#00ffcc', border: '1px solid rgba(0, 255, 204, 0.3)', padding: '2px 8px', borderRadius: '3px', fontSize: '0.68rem' }}>
                CAPACITY: {activeFleetCars.length} / {MAX_BAYS} BAYS ACTIVE
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#FFF', margin: '4px 0 0 0', fontWeight: 500 }}>
              Calvin's 5-Bay Classified Garage
            </h2>
            <p style={{ color: '#8E8D8A', fontFamily: 'var(--font-mono)', fontSize: '0.76rem', margin: '8px 0 0 0', lineHeight: 1.5, maxWidth: '520px', fontStyle: 'italic', borderLeft: '2px solid var(--color-gold, #C5A880)', paddingLeft: '12px' }}>
              "Why 128+ cars? I love cars. My passion for cars is something crazy — it's not about flexing, it's a genuine obsession with engineering, design, and the sound of a flat-plane crank V8 at 9,000 RPM."
            </p>
          </div>

          {/* Master Telemetry Stats Grid */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(10, 10, 15, 0.8)', border: '1px solid rgba(197, 168, 128, 0.25)', padding: '8px 16px', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.65rem', color: '#8E8D8A', letterSpacing: '0.5px' }}>TOTAL FLEET POWER</div>
              <div style={{ fontSize: '1.2rem', color: '#ff5555', fontWeight: 'bold' }}>
                {fleetStats.totalHP.toLocaleString()} HP
              </div>
            </div>

            <div style={{ background: 'rgba(10, 10, 15, 0.8)', border: '1px solid rgba(197, 168, 128, 0.25)', padding: '8px 16px', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.65rem', color: '#8E8D8A', letterSpacing: '0.5px' }}>FLEET VALUATION</div>
              <div style={{ fontSize: '1.2rem', color: 'var(--color-gold)', fontWeight: 'bold' }}>
                {fleetStats.totalCostFormatted}
              </div>
            </div>

            <div style={{ background: 'rgba(10, 10, 15, 0.8)', border: '1px solid rgba(197, 168, 128, 0.25)', padding: '8px 16px', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.65rem', color: '#8E8D8A', letterSpacing: '0.5px' }}>AVG 0-100 SPRINT</div>
              <div style={{ fontSize: '1.2rem', color: '#00ffcc', fontWeight: 'bold' }}>
                {fleetStats.avgZeroHundred}s
              </div>
            </div>
          </div>
        </div>

        {/* 5 Physical Garage Bay Doors */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '14px' }}>
          {[0, 1, 2, 3, 4].map((bayIndex) => {
            const carId = garageBays[bayIndex];
            const car = carId ? GARAGE_CARS.find(c => c.id === carId) : null;

            return (
              <div
                key={bayIndex}
                style={{
                  background: car ? 'rgba(24, 24, 32, 0.85)' : 'rgba(12, 12, 16, 0.4)',
                  border: car ? '1px solid var(--color-gold, #C5A880)' : '1px dashed rgba(197, 168, 128, 0.25)',
                  borderTop: car ? '3px solid var(--color-gold, #C5A880)' : '1px dashed rgba(197, 168, 128, 0.25)',
                  borderRadius: '6px',
                  padding: '16px',
                  minHeight: '170px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Bay Indicator */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.68rem', color: car ? 'var(--color-gold)' : '#8E8D8A', fontWeight: 'bold', letterSpacing: '1px' }}>
                    BAY 0{bayIndex + 1}
                  </span>
                  {car && (
                    <button
                      onClick={() => removeBayCar(bayIndex)}
                      title="Vacate this bay"
                      style={{
                        background: 'rgba(255, 51, 51, 0.15)',
                        border: '1px solid rgba(255, 51, 51, 0.3)',
                        color: '#ff5555',
                        width: '20px',
                        height: '20px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                {/* Bay Content */}
                {car ? (
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '1.05rem', color: '#FFF', margin: '0 0 2px 0', lineHeight: 1.25 }}>
                      {car.name}
                    </h4>
                    <div style={{ color: 'var(--color-silver, #8E8D8A)', fontSize: '0.72rem', marginBottom: '8px' }}>
                      {car.brandName}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', background: 'rgba(10,10,15,0.7)', padding: '6px 8px', borderRadius: '4px' }}>
                      <span style={{ color: '#00ffcc', fontWeight: 'bold' }}>{car.power.split('/')[0]}</span>
                      <span style={{ color: 'var(--color-gold)', fontWeight: 'bold' }}>{car.priceDisplay}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                      <button
                        onClick={() => playEngineRev(car)}
                        style={{
                          flex: 1,
                          background: 'rgba(197, 168, 128, 0.12)',
                          border: '1px solid rgba(197, 168, 128, 0.3)',
                          color: 'var(--color-gold)',
                          padding: '5px',
                          borderRadius: '3px',
                          fontSize: '0.68rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px'
                        }}
                      >
                        <Volume2 size={12} /> REV
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '10px 0' }}>
                    <span style={{ fontSize: '1.4rem', opacity: 0.3, marginBottom: '4px' }}>🏎️</span>
                    <span style={{ color: '#8E8D8A', fontSize: '0.72rem', fontStyle: 'italic' }}>
                      VACANT BAY
                    </span>
                    <span style={{ color: 'var(--color-gold)', fontSize: '0.65rem', marginTop: '4px' }}>
                      Select car below
                    </span>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

      {/* =========================================================================
          2. SHOWROOM SUPERMARKET (CLEAN REFINED CATALOG)
          ========================================================================= */}
      
      {/* Supermarket Header & Search Controls */}
      <div style={{ borderBottom: '1px solid rgba(197, 168, 128, 0.25)', paddingBottom: '16px', marginBottom: '22px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ color: 'var(--color-gold)', fontSize: '0.74rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              [ SHOWROOM CATALOG // 138 CURATED MACHINES ]
            </span>
            <h3 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '1.4rem', color: '#FFF', margin: '2px 0 0 0' }}>
              Select Machines for your 5-Bay Garage
            </h3>
          </div>

          {/* Quick Filter Tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: 'ALL MACHINES (138)' },
              { id: 'APPROVED', label: '⭐ CALVIN APPROVED' },
              { id: 'HYPER', label: '👑 HYPERCARS' },
              { id: 'DAILY', label: '⚡ DAILY & ICONS' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                style={{
                  background: selectedFilter === tab.id ? 'var(--color-gold, #C5A880)' : 'rgba(20, 20, 28, 0.6)',
                  color: selectedFilter === tab.id ? '#070709' : 'var(--color-silver, #8E8D8A)',
                  border: `1px solid ${selectedFilter === tab.id ? 'var(--color-gold)' : 'rgba(197, 168, 128, 0.2)'}`,
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  fontWeight: selectedFilter === tab.id ? 'bold' : 'normal',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Sort Controls Bar */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={15} color="var(--color-silver)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by car name, brand, or engine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 15, 22, 0.85)',
                border: '1px solid rgba(197, 168, 128, 0.25)',
                color: '#FFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                padding: '8px 12px 8px 36px',
                borderRadius: '4px',
                outline: 'none'
              }}
            />
          </div>

          {/* Marque Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(15, 15, 22, 0.85)', border: '1px solid rgba(197, 168, 128, 0.25)', padding: '6px 12px', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.72rem', color: '#8E8D8A' }}>MARQUE:</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#FFF', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', outline: 'none', cursor: 'pointer' }}
            >
              {BRANDS.map(b => (
                <option key={b.id} value={b.id} style={{ background: '#0a0a0f' }}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(15, 15, 22, 0.85)', border: '1px solid rgba(197, 168, 128, 0.25)', padding: '6px 12px', borderRadius: '4px' }}>
            <ArrowUpDown size={13} color="var(--color-gold)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#FFF', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', outline: 'none', cursor: 'pointer' }}
            >
              <option value="price-desc" style={{ background: '#0a0a0f' }}>Price: High → Low</option>
              <option value="price-asc" style={{ background: '#0a0a0f' }}>Price: Low → High</option>
              <option value="power-desc" style={{ background: '#0a0a0f' }}>Horsepower</option>
              <option value="rating-desc" style={{ background: '#0a0a0f' }}>Calvin Rating</option>
            </select>
          </div>
        </div>

      </div>

      {/* Supermarket Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {showroomCars.map((car) => {
          const inGarage = garageBays.includes(car.id);
          const isBaleno = car.id === 'maruti-baleno';

          return (
            <div
              key={car.id}
              style={{
                background: inGarage ? 'rgba(24, 24, 34, 0.9)' : 'rgba(18, 18, 24, 0.65)',
                border: `1px solid ${inGarage ? 'var(--color-gold, #C5A880)' : isBaleno ? 'rgba(0, 255, 204, 0.35)' : 'rgba(197, 168, 128, 0.18)'}`,
                borderTop: `3px solid ${inGarage ? 'var(--color-gold)' : isBaleno ? '#00ffcc' : 'rgba(197, 168, 128, 0.3)'}`,
                borderRadius: '6px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (!inGarage) e.currentTarget.style.borderColor = 'var(--color-gold)';
              }}
              onMouseLeave={(e) => {
                if (!inGarage) e.currentTarget.style.borderColor = isBaleno ? 'rgba(0, 255, 204, 0.35)' : 'rgba(197, 168, 128, 0.18)';
              }}
            >
              <div>
                {/* Card Top Pill */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--color-gold)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                    {car.brandName} • {car.rarity || 'LIMITED'}
                  </span>
                  
                  {car.isPersonalFavorite ? (
                    <span style={{ fontSize: '0.65rem', background: 'rgba(0,255,204,0.12)', color: '#00ffcc', border: '1px solid rgba(0,255,204,0.3)', padding: '2px 6px', borderRadius: '3px' }}>
                      👑 CROWN JEWEL
                    </span>
                  ) : car.isCalvinApproved ? (
                    <span style={{ fontSize: '0.65rem', background: 'rgba(197,168,128,0.15)', color: 'var(--color-gold)', padding: '2px 6px', borderRadius: '3px' }}>
                      ★ CALVIN APPROVED
                    </span>
                  ) : null}
                </div>

                {/* Full-width Model Name */}
                <h4 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '1.25rem', color: inGarage ? 'var(--color-gold)' : '#FFF', margin: '0 0 8px 0', lineHeight: 1.2, width: '100%' }}>
                  {car.name}
                </h4>

                {/* Dedicated Valuation Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.45)', padding: '6px 10px', borderRadius: '4px', marginBottom: '12px', border: '1px solid rgba(197, 168, 128, 0.15)' }}>
                  <span style={{ fontSize: '0.65rem', color: '#8E8D8A', letterSpacing: '0.5px' }}>VALUATION</span>
                  <span style={{ color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'right' }}>
                    {car.priceDisplay}
                  </span>
                </div>

                {/* Telemetry 4-Metric Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', background: 'rgba(10, 10, 15, 0.65)', padding: '8px 10px', borderRadius: '4px', fontSize: '0.72rem', color: '#8E8D8A', marginBottom: '12px' }}>
                  <div>POWER: <span style={{ color: '#FFF', fontWeight: 'bold' }}>{car.power.split('/')[0]}</span></div>
                  <div>0-100: <span style={{ color: '#00ffcc', fontWeight: 'bold' }}>{car.zeroHundred}</span></div>
                  <div>SPEED: <span style={{ color: '#ff5555' }}>{car.topSpeed}</span></div>
                  <div>ENGINE: <span style={{ color: '#FFF' }}>{car.soundType?.split('-')[0]?.toUpperCase() || 'TURBO'}</span></div>
                </div>

                {/* Curator Quote */}
                <p style={{ color: 'var(--color-silver, #8E8D8A)', fontSize: '0.75rem', fontStyle: 'italic', margin: '0 0 14px 0', lineHeight: 1.35 }}>
                  "{car.notes.substring(0, 110)}..."
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(197, 168, 128, 0.12)', paddingTop: '12px' }}>
                <button
                  onClick={() => toggleCarInGarage(car.id)}
                  style={{
                    flex: 1,
                    background: inGarage ? 'rgba(255, 51, 51, 0.15)' : 'rgba(197, 168, 128, 0.15)',
                    border: `1px solid ${inGarage ? '#ff5555' : 'var(--color-gold)'}`,
                    color: inGarage ? '#ff5555' : 'var(--color-gold)',
                    padding: '8px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {inGarage ? <Minus size={13} /> : <Plus size={13} />}
                  {inGarage ? 'VACATE FROM BAY' : `+ PARK IN BAY (${garageBays.filter(Boolean).length}/${MAX_BAYS})`}
                </button>

                <button
                  onClick={() => playEngineRev(car)}
                  title="Acoustic Engine Telemetry"
                  style={{
                    background: 'rgba(197, 168, 128, 0.1)',
                    border: '1px solid rgba(197, 168, 128, 0.25)',
                    color: 'var(--color-gold)',
                    padding: '0 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <Volume2 size={15} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
