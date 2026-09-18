import React, { useState, useMemo } from 'react';
import { 
  Lock, Unlock, ShieldAlert, Sparkles, Heart, Compass, Flame, Coffee, 
  Film, Car, UserCheck, Search, Filter, CheckCircle2, Zap, Terminal, Eye, EyeOff, ThumbsUp
} from 'lucide-react';

export const CONFESSIONS_DATA = [
  {
    id: "ambition",
    category: "ULTIMATE DIRECTIVE",
    categoryKey: "DIRECTIVE",
    icon: Heart,
    color: "#ff3366",
    title: "The True Life Ambition (The 'Why')",
    tag: "RESTRICTED ACCESS // ALPHA",
    summary: "Why I build, grind, and code late into the night.",
    confession: "People ask what my benchmark of 'making it' is. It’s not a Forbes 30 Under 30 badge or a fancy corporate title. It is retiring my parents young so they never, ever have to look at the right side of a menu or a price tag again in their lives. And alongside that: building a multi-billion dollar breakthrough deep-tech company from scratch with my day-one best friends.",
    redactedDetail: "Day-one squad priority is non-negotiable.",
    truthRating: "100% UNFILTERED",
    status: "ACTIVE DIRECTIVE",
    securityLevel: "LEVEL 6"
  },
  {
    id: "yap-matrix",
    category: "PERSONALITY LORE",
    categoryKey: "PERSONALITY",
    icon: UserCheck,
    color: "#00ffcc",
    title: "The 'Resting Attitude' Misconception & The 4-Hour Yap",
    tag: "CLEARANCE LEVEL 1",
    summary: "What people think when they first see me vs reality.",
    confession: "A lot of people who see me from afar or look at photos think I have a huge ego, attitude, or that I'm unapproachable. The reality? My ego is literally zero. If you walk up to me and mention Christopher Nolan movies, Formula 1 telemetry, Pagani aero physics, or a weird AI bug, I will yap with you for 4 hours straight without stopping. I am fundamentally a 97.8% Jake Peralta clone.",
    redactedDetail: "Verified: Will debate Interstellar docking acoustics for 240+ minutes.",
    truthRating: "VERIFIED REALITY",
    status: "FACT CHECKED",
    securityLevel: "LEVEL 1"
  },
  {
    id: "flowstate",
    category: "NEURAL TELEMETRY",
    categoryKey: "TECH_FLOW",
    icon: Coffee,
    color: "#c084fc",
    title: "The 3:17 AM Flow State Anomaly",
    tag: "HABIT MATRIX",
    summary: "Why daytime meetings are inferior to midnight coding.",
    confession: "My brain operates on a completely different frequency between 12:00 AM and 4:30 AM. Put on Hans Zimmer's Interstellar organ score, synthwave cyberpunk mixes, or 2000s Bollywood nostalgia on loop, hand me South Indian filter coffee, and I will build an entire multi-service microservice platform in a single continuous fever dream while the rest of the world is asleep.",
    redactedDetail: "Fuel Source: 4+ cups South Indian filter coffee & dark roast.",
    truthRating: "NEURAL FACT",
    status: "OPERATIONAL",
    securityLevel: "LEVEL 3"
  },
  {
    id: "spontaneous",
    category: "FIELD OPERATIONS",
    categoryKey: "FIELD_OPS",
    icon: Compass,
    color: "#ff9500",
    title: "The 30-Minute Cross-Border Escape",
    tag: "LORE EVIDENCE",
    summary: "The single most spontaneous trip of my life.",
    confession: "Woke up at 6:00 AM on a random morning. Had zero tickets booked, no hotel reservations, and zero plans. Packed a single backpack in 20 minutes, booked a train 10 minutes before departure, crossed state borders into Kasaragod & Mysore, wandered through unknown streets, explored, ate incredible food, and took a night train back. Total planning time: negative 5 minutes.",
    redactedDetail: "State borders crossed with zero itinerary.",
    truthRating: "100% TRUE STORY",
    status: "DELEGATED MISSION",
    securityLevel: "LEVEL 2"
  },
  {
    id: "garage-dream",
    category: "AUTOMOTIVE ADDICTION",
    categoryKey: "AUTOMOTIVE",
    icon: Car,
    color: "#38bdf8",
    title: "The ₹100 Crore Financial Priority",
    tag: "PETROLHEAD LORE",
    summary: "What happens if a massive lottery wire hits tomorrow.",
    confession: "If ₹100 Crore lands in my bank account tomorrow morning, financial advisors would tell me to diversify across index funds, real estate, and municipal bonds. In reality, ₹86 Crore is going directly toward acquiring a Porsche 918 Spyder, a track-only Pagani Huayra R, a Koenigsegg Jesko Attack, and a Ferrari FXX-K. The remaining ₹14 Crore is strictly reserved for unlimited pizza, server GPU bills, and spontaneous road trips.",
    redactedDetail: "Pagani Huayra R exhaust telemetry sound curves priority #1.",
    truthRating: "NON-NEGOTIABLE",
    status: "PRIORITY ALPHA",
    securityLevel: "LEVEL 5"
  },
  {
    id: "gaming",
    category: "TACTICAL GAMING",
    categoryKey: "GAMING",
    icon: Sparkles,
    color: "#a3e635",
    title: "The 'I Am Bad At Games' Paradox",
    tag: "SQUAD TELEMETRY",
    summary: "Queuing Valorant, Fortnite, Minecraft & FIFA.",
    confession: "I constantly tell people I'm terrible at gaming. But you will still find me queuing competitive Valorant matches at midnight, cranking frantic builds in Fortnite, creating redstone automation in Minecraft, and conceding 90th-minute heartbreaks in FIFA. My mechanical aim might be 4/10, but my comms hype and tactical yapping are undisputed 10/10.",
    redactedDetail: "Comms Hype Rating: 10/10 undisputed.",
    truthRating: "SQUAD TESTED",
    status: "VERIFIED",
    securityLevel: "LEVEL 2"
  },
  {
    id: "masterchef",
    category: "CULINARY SECRET",
    categoryKey: "CULINARY",
    icon: Flame,
    color: "#ffd60a",
    title: "The 500-Hour MasterChef Critique",
    tag: "CLASSIFIED SHAME",
    summary: "Self-proclaimed 3-Star Michelin judge credentials.",
    confession: "I have consumed over 500+ hours of MasterChef Australia, US, and world finals. I know what a 'flavour profile', 'jus reduction', and 'acid balancing' mean in theory. Can I actually cook a delicate beef wellington or make laminated puff pastry? Absolutely not. Will I still passionately critique a restaurant's plating like Gordon Ramsay while devouring a Bangalore CTR benne dosa or Mangalore ghee roast? 100% yes.",
    redactedDetail: "Specialty: Ordering crispy benne dosa and reviewing it like a Michelin judge.",
    truthRating: "CRUCIAL CONFESSION",
    status: "UNFILTERED",
    securityLevel: "LEVEL 1"
  },
  {
    id: "undercover-craft",
    category: "SECRET SKILL",
    categoryKey: "VISUAL_CRAFT",
    icon: Film,
    color: "#ec4899",
    title: "The Darkroom Colorist & Visual Poetry",
    tag: "DEVELOPMENT CELL",
    summary: "The creative craft I obsess over in silence.",
    confession: "Behind the code and cybersecurity research, I spend dozens of hours meticulously studying film grading, 35mm grain emulation, color theory, and cinematic lighting curves in Lightroom. I treat color palettes in UI and photography like visual poetry — every hex code is tuned like a film negative.",
    redactedDetail: "Curates 35mm film LUT curves for every digital scene.",
    truthRating: "CREATIVE CORE",
    status: "EVOLVING",
    securityLevel: "LEVEL 3"
  },
  {
    id: "mentorship",
    category: "CRAFT ETHOS",
    categoryKey: "DIRECTIVE",
    icon: Zap,
    color: "#22c55e",
    title: "The Zero-Gatekeeping Pair Programming Code",
    tag: "OPEN SOURCE CORE",
    summary: "Why engineering is meant to be shared openly.",
    confession: "I despise engineering gatekeeping. Whether someone is struggling with their first Git commit or debugging a complex multi-agent framework or low-level CUDA neural kernel, I will gladly drop what I am doing to hop on a call, share screen, and debug until the build passes. We all start with broken code.",
    redactedDetail: "Always available for pairing on weird architecture bugs.",
    truthRating: "OPEN SOURCE ETHIC",
    status: "PERPETUAL",
    securityLevel: "LEVEL 2"
  }
];

const CATEGORY_TABS = [
  { id: "ALL", label: "ALL DOSSIERS" },
  { id: "DIRECTIVE", label: "🎯 DIRECTIVES" },
  { id: "TECH_FLOW", label: "⚡ NIGHT FLOW" },
  { id: "PERSONALITY", label: "🕶️ PERSONALITY" },
  { id: "AUTOMOTIVE", label: "🏎️ HYPERCARS" },
  { id: "FIELD_OPS", label: "🧭 FIELD OPS" },
  { id: "CULINARY", label: "🍕 CULINARY" },
  { id: "GAMING", label: "🎮 GAMING" },
  { id: "VISUAL_CRAFT", label: "🎨 VISUAL CRAFT" },
];

export const VaultSecrets = () => {
  const [decryptedCards, setDecryptedCards] = useState(['ambition', 'yap-matrix', 'flowstate']);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRedacted, setHoveredRedacted] = useState(null);

  const toggleDecrypt = (id) => {
    if (decryptedCards.includes(id)) {
      setDecryptedCards(decryptedCards.filter(c => c !== id));
    } else {
      setDecryptedCards([...decryptedCards, id]);
    }
  };

  const decryptAll = () => {
    if (decryptedCards.length === CONFESSIONS_DATA.length) {
      setDecryptedCards([]);
    } else {
      setDecryptedCards(CONFESSIONS_DATA.map(c => c.id));
    }
  };

  // Removed unused toggleAcknowledge function

  // Filtered Dossiers
  const filteredConfessions = useMemo(() => {
    return CONFESSIONS_DATA.filter(item => {
      const matchesCat = selectedCategory === 'ALL' || item.categoryKey === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        item.title.toLowerCase().includes(q) || 
        item.confession.toLowerCase().includes(q) || 
        item.category.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div style={{
      background: 'linear-gradient(180deg, rgba(16, 16, 20, 0.9) 0%, rgba(10, 10, 12, 0.95) 100%)',
      border: '1px solid rgba(232, 213, 181, 0.15)',
      borderRadius: '8px',
      padding: '28px',
      marginBottom: '32px'
    }}>
      
      {/* Header Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(232, 213, 181, 0.15)',
        paddingBottom: '16px',
        marginBottom: '22px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h3 style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: '1.4rem',
              color: '#FFF',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Lock size={18} color="var(--color-gold, #E8D5B5)" /> Complete Classified Archive
            </h3>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--color-gold, #E8D5B5)',
              border: '1px solid rgba(232, 213, 181, 0.3)',
              background: 'rgba(232, 213, 181, 0.08)',
              padding: '2px 8px',
              borderRadius: '2px'
            }}>
              ALL 9 CASE FILES
            </span>
          </div>
          <p style={{ color: 'var(--color-silver, #8E8D8A)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', margin: '4px 0 0 0' }}>
            Browse and decrypt the full unedited record of personal lore, late-night habits & core life directives.
          </p>
        </div>

        {/* Global Controls */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#8E8D8A' }}>
            DECRYPTED: <strong style={{ color: 'var(--color-gold, #E8D5B5)' }}>{decryptedCards.length}/{CONFESSIONS_DATA.length}</strong>
          </span>
          <button
            onClick={decryptAll}
            style={{
              background: decryptedCards.length === CONFESSIONS_DATA.length ? 'rgba(232, 213, 181, 0.15)' : 'rgba(232, 213, 181, 0.08)',
              border: '1px solid var(--color-gold, #E8D5B5)',
              color: 'var(--color-gold, #E8D5B5)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: '600',
              padding: '6px 14px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            {decryptedCards.length === CONFESSIONS_DATA.length ? <Lock size={13} /> : <Unlock size={13} />}
            {decryptedCards.length === CONFESSIONS_DATA.length ? 'SEAL ALL DOSSIERS' : 'DECRYPT ALL DOSSIERS'}
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginBottom: '22px', flexWrap: 'wrap' }}>
        
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%', scrollbarWidth: 'none' }}>
          {CATEGORY_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              style={{
                background: selectedCategory === tab.id ? 'var(--color-gold, #E8D5B5)' : 'rgba(20, 20, 26, 0.6)',
                color: selectedCategory === tab.id ? '#0A0A0B' : '#8E8D8A',
                border: `1px solid ${selectedCategory === tab.id ? 'var(--color-gold, #E8D5B5)' : 'rgba(232, 213, 181, 0.12)'}`,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: selectedCategory === tab.id ? 'bold' : 'normal',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div style={{ position: 'relative', minWidth: '220px', flex: '1', maxWidth: '300px' }}>
          <Search size={13} color="#8E8D8A" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dossier archive..."
            style={{
              width: '100%',
              background: 'rgba(12, 12, 16, 0.9)',
              border: '1px solid rgba(232, 213, 181, 0.18)',
              borderRadius: '4px',
              padding: '6px 12px 6px 30px',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-gold, #E8D5B5)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(232, 213, 181, 0.18)'}
          />
        </div>

      </div>

      {/* Confessions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', fontFamily: 'var(--font-mono)' }}>
        {filteredConfessions.map((item) => {
          const isDecrypted = decryptedCards.includes(item.id);
          const IconComp = item.icon;

          return (
            <div
              key={item.id}
              style={{
                background: isDecrypted ? 'rgba(20, 20, 26, 0.75)' : 'rgba(14, 14, 18, 0.55)',
                border: `1px solid ${isDecrypted ? 'rgba(232, 213, 181, 0.25)' : 'rgba(255, 255, 255, 0.08)'}`,
                borderTop: `2px solid var(--color-gold, #E8D5B5)`,
                borderRadius: '6px',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: 'rgba(232, 213, 181, 0.1)', padding: '5px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconComp size={15} color="var(--color-gold, #E8D5B5)" />
                    </div>
                    <div>
                      <span style={{ color: 'var(--color-gold, #E8D5B5)', fontSize: '0.68rem', fontWeight: 'bold', letterSpacing: '0.8px' }}>
                        [{item.category}]
                      </span>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)', color: '#8E8D8A', padding: '2px 6px', borderRadius: '2px' }}>
                    {item.securityLevel}
                  </span>
                </div>

                {/* Title */}
                <h4 style={{ color: '#FFF', fontFamily: 'var(--font-display, serif)', fontSize: '1.18rem', margin: '0 0 10px 0', lineHeight: 1.3 }}>
                  {item.title}
                </h4>

                {/* Content */}
                {isDecrypted ? (
                  <div style={{ margin: '8px 0 12px 0' }}>
                    <p style={{ color: '#E8D5B5', fontSize: '0.85rem', margin: '0 0 10px 0', lineHeight: 1.55 }}>
                      "{item.confession}"
                    </p>

                    {/* Redacted Secret Sub-note */}
                    {item.redactedDetail && (
                      <div style={{ marginTop: '8px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{ color: '#8E8D8A' }}>FIELD NOTE:</span>
                        <span 
                          className="redacted-strip"
                          onMouseEnter={() => setHoveredRedacted(item.id)}
                          onMouseLeave={() => setHoveredRedacted(null)}
                          style={{
                            background: hoveredRedacted === item.id ? 'rgba(232, 213, 181, 0.12)' : 'rgba(0,0,0,0.5)',
                            color: hoveredRedacted === item.id ? 'var(--color-gold, #E8D5B5)' : '#666',
                            borderBottom: '1px dotted var(--color-gold, #E8D5B5)'
                          }}
                        >
                          {hoveredRedacted === item.id ? item.redactedDetail : '████████ [ HOVER TO REVEAL ] ████████'}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ margin: '8px 0 12px 0' }}>
                    <p style={{ color: '#8E8D8A', fontSize: '0.78rem', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                      {item.summary}
                    </p>
                    <div style={{ background: 'rgba(0,0,0,0.4)', padding: '8px 10px', borderRadius: '3px', filter: 'blur(3px)', userSelect: 'none', color: '#555', fontSize: '0.72rem', letterSpacing: '1px' }}>
                      ████████████ ████████ ██████████████ ████████ ████████████ ████████.
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(232, 213, 181, 0.1)', paddingTop: '10px', marginTop: '6px', fontSize: '0.72rem', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ color: isDecrypted ? '#00ffcc' : '#8E8D8A' }}>
                  {isDecrypted ? `[ ${item.truthRating} ]` : '[ STATUS: ENCRYPTED ]'}
                </span>

                <button
                  onClick={() => toggleDecrypt(item.id)}
                  style={{
                    background: isDecrypted ? 'rgba(255, 255, 255, 0.05)' : 'rgba(232, 213, 181, 0.12)',
                    border: `1px solid ${isDecrypted ? 'rgba(255, 255, 255, 0.15)' : 'var(--color-gold, #E8D5B5)'}`,
                    color: isDecrypted ? '#BBB' : 'var(--color-gold, #E8D5B5)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    padding: '4px 10px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isDecrypted ? <Lock size={11} /> : <Unlock size={11} />}
                  {isDecrypted ? 'RE-SEAL' : 'DECRYPT TRUTH'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default VaultSecrets;

