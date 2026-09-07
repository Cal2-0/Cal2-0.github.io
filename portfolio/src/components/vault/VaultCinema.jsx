import React, { useState } from 'react';
import { Film, Shuffle, Sparkles, Star, Tag, Check, Search } from 'lucide-react';

const MOVIES_DATABASE = [
  // COMEDY & CHAOS
  { title: "Kingsman: The Secret Service", category: "COMEDY_CHAOS", year: 2014, oneLiner: "Manners maketh man. Peak action-comedy with bespoke suits.", rewatch: "10+", tag: "ELITE TASTE" },
  { title: "Kingsman: The Golden Circle", category: "COMEDY_CHAOS", year: 2017, oneLiner: "Country roads, take me home. Electric lasso action.", rewatch: "8+", tag: "PURE ENTERTAINMENT" },
  { title: "Johnny English", category: "COMEDY_CHAOS", year: 2003, oneLiner: "Rowan Atkinson saving MI7 by pure accidental luck.", rewatch: "15+", tag: "NOSTALGIA GOLD" },
  { title: "The Naked Gun", category: "COMEDY_CHAOS", year: 1988, oneLiner: "Leslie Nielsen slapstick perfection. Every frame has a hidden joke.", rewatch: "∞", tag: "LEGENDARY" },
  { title: "The Pink Panther", category: "COMEDY_CHAOS", year: 2006, oneLiner: "Steve Martin as Inspector Clouseau attempting a hamburger accent.", rewatch: "12+", tag: "HILARIOUS" },
  { title: "Airplane!", category: "COMEDY_CHAOS", year: 1980, oneLiner: "Surely you can't be serious. (I am serious, and don't call me Shirley.)", rewatch: "7+", tag: "PARODY BENCHMARK" },
  { title: "White Chicks", category: "COMEDY_CHAOS", year: 2004, oneLiner: "Marlon & Shawn Wayans delivering the single funniest undercover mission.", rewatch: "20+", tag: "ESSENTIAL REWATCH" },
  { title: "Superbad", category: "COMEDY_CHAOS", year: 2007, oneLiner: "McLovin ID card will forever remain unmatched in cinema history.", rewatch: "10+", tag: "CLASSIC" },
  { title: "Bridesmaids", category: "COMEDY_CHAOS", year: 2011, oneLiner: "Absolute uncontrolled chaos at the bridal shop.", rewatch: "6+", tag: "COMEDY GOLD" },
  { title: "Scary Movie Series", category: "COMEDY_CHAOS", year: 2000, oneLiner: "The Wayans brothers roasting every horror trope known to humanity.", rewatch: "14+", tag: "MIDNIGHT ESSENTIAL" },
  { title: "The Hangover", category: "COMEDY_CHAOS", year: 2009, oneLiner: "Tiger in the bathroom, missing tooth, Mike Tyson singalong.", rewatch: "10+", tag: "VEGAS CHAOS" },
  { title: "American Pie", category: "COMEDY_CHAOS", year: 1999, oneLiner: "Stifler and the crew defining late 90s teenage madness.", rewatch: "8+", tag: "CULT TEEN CLASSIC" },
  { title: "21 Jump Street", category: "COMEDY_CHAOS", year: 2012, oneLiner: "Jonah Hill & Channing Tatum chemistry that should not work this well.", rewatch: "11+", tag: "DYNAMIC DUO" },
  { title: "Step Brothers", category: "COMEDY_CHAOS", year: 2008, oneLiner: "Did we just become best friends? Yup! Catalina Wine Mixer.", rewatch: "12+", tag: "WILL FERRELL PEAK" },
  { title: "Neighbors", category: "COMEDY_CHAOS", year: 2014, oneLiner: "Seth Rogen vs Zac Efron fraternity turf war with airbag pranks.", rewatch: "6+", tag: "CHAOS WAR" },
  { title: "Horrible Bosses", category: "COMEDY_CHAOS", year: 2011, oneLiner: "Three normal dudes hiring a questionable murder consultant.", rewatch: "8+", tag: "DARK COMEDY" },

  // ROM-COMS & FEEL GOOD
  { title: "The Proposal", category: "ROM_COM", year: 2009, oneLiner: "Ryan Reynolds & Sandra Bullock fake engagement in Alaska.", rewatch: "9+", tag: "COMFORT WATCH" },
  { title: "How to Lose a Guy in 10 Days", category: "ROM_COM", year: 2003, oneLiner: "Matthew McConaughey & Kate Hudson trying to out-manipulate each other.", rewatch: "7+", tag: "CHARM 100%" },
  { title: "The Bounty Hunter", category: "ROM_COM", year: 2010, oneLiner: "Gerard Butler hunting down his ex-wife Jennifer Aniston.", rewatch: "6+", tag: "FUN ACTION ROM-COM" },
  { title: "Grown Ups", category: "ROM_COM", year: 2010, oneLiner: "Adam Sandler gathering all his real-life best friends to just chill.", rewatch: "10+", tag: "WHOLESOME CRACK" },
  { title: "50 First Dates", category: "ROM_COM", year: 2004, oneLiner: "Drew Barrymore & Adam Sandler in Hawaii with genuine heart.", rewatch: "8+", tag: "SWEET & FUNNY" },

  // CRIME & THRILLER
  { title: "Heat", category: "CRIME_THRILLER", year: 1995, oneLiner: "Pacino vs De Niro in the greatest downtown shootout ever filmed.", rewatch: "9+", tag: "CINEMATIC MASTERPIECE" },
  { title: "Casino", category: "CRIME_THRILLER", year: 1995, oneLiner: "Scorsese, Vegas glamour, and Joe Pesci menacing everyone.", rewatch: "7+", tag: "CRIME ROYALTY" },
  { title: "Scent of a Woman", category: "CRIME_THRILLER", year: 1992, oneLiner: "Al Pacino's legendary courtroom speech and Ferrari test drive.", rewatch: "5+", tag: "PACINO POWER" },
  { title: "The Godfather Series", category: "CRIME_THRILLER", year: 1972, oneLiner: "I'll make him an offer he can't refuse. Film study royalty.", rewatch: "6+", tag: "ALL-TIME GOAT" },
  { title: "No Country for Old Men", category: "CRIME_THRILLER", year: 2007, oneLiner: "Anton Chigurh and the scariest coin toss in movie history.", rewatch: "8+", tag: "TENSION PEAK" },
  { title: "Zodiac", category: "CRIME_THRILLER", year: 2007, oneLiner: "Fincher's meticulous forensic obsession. The basement scene is terrifying.", rewatch: "9+", tag: "FORENSIC THRILLER" },
  { title: "Prisoners", category: "CRIME_THRILLER", year: 2013, oneLiner: "Hugh Jackman & Jake Gyllenhaal in Denis Villeneuve's darkest maze.", rewatch: "5+", tag: "HEAVYWEIGHT NOIR" },
  { title: "Oppenheimer", category: "CRIME_THRILLER", year: 2023, oneLiner: "Cillian Murphy & Ludwig Göransson sound design creating pure existential dread.", rewatch: "4+", tag: "TECHNICAL MASTERWORK" },

  // SCI-FI & EPICS
  { title: "Interstellar", category: "SCIFI_EPIC", year: 2014, oneLiner: "Hans Zimmer organ + black hole acoustics. Cry every single time.", rewatch: "14+", tag: "FAVOURITE SCI-FI" },
  { title: "2001: A Space Odyssey", category: "SCIFI_EPIC", year: 1968, oneLiner: "Kubrick's visual opera. HAL 9000 is still the most chilling AI voice.", rewatch: "5+", tag: "PURE CINEMA" },
  { title: "Ready Player One", category: "SCIFI_EPIC", year: 2018, oneLiner: "Spielberg pop culture Easter egg overload with the DeLorean race.", rewatch: "8+", tag: "GAMER NOSTALGIA" },
  { title: "Transformers (2007)", category: "SCIFI_EPIC", year: 2007, oneLiner: "Optimus Prime first transforming in the alley. Unrivaled sound effects.", rewatch: "12+", tag: "AUDIO PEAK" },
  { title: "Cars (2006)", category: "SCIFI_EPIC", year: 2006, oneLiner: "Lightning McQueen & Doc Hudson. Life is a Highway will never get old.", rewatch: "18+", tag: "PETROLHEAD ORIGIN" },

  // PAN-INDIA & ACTION
  { title: "Baahubali: The Beginning & Conclusion", category: "PAN_INDIA", year: 2015, oneLiner: "SS Rajamouli scale, goosebumps elevation scenes, and the waterfall climb.", rewatch: "7+", tag: "INDIAN EPIC GOAT" },
  { title: "K.G.F: Chapter 1 & 2", category: "PAN_INDIA", year: 2018, oneLiner: "Prashanth Neel high-contrast cinematography, violence, and cigarette sparks.", rewatch: "8+", tag: "PURE ELEVATION" },
];

const CATEGORIES = [
  { id: 'ALL', label: 'ALL FILES' },
  { id: 'COMEDY_CHAOS', label: '😂 COMEDY / CHAOS' },
  { id: 'ROM_COM', label: '💕 ROM-COM / FEEL GOOD' },
  { id: 'CRIME_THRILLER', label: '🕴️ CRIME / THRILLER' },
  { id: 'SCIFI_EPIC', label: '🚀 SCI-FI / EPIC' },
  { id: 'PAN_INDIA', label: '🔥 PAN-INDIA / ACTION' },
];

export const VaultCinema = () => {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [randomMovie, setRandomMovie] = useState(null);

  const filteredMovies = MOVIES_DATABASE.filter(movie => {
    const matchesCat = selectedCat === 'ALL' || movie.category === selectedCat;
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          movie.oneLiner.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const pickRandom = () => {
    const list = selectedCat === 'ALL' ? MOVIES_DATABASE : MOVIES_DATABASE.filter(m => m.category === selectedCat);
    const chosen = list[Math.floor(Math.random() * list.length)];
    setRandomMovie(chosen);
  };

  return (
    <div className="vault-panel">
      <div className="vault-panel-header">
        <div>
          <h3 className="vault-panel-title">
            <Film size={20} color="var(--color-gold)" /> CINEMA CLEARANCE // ENTERTAINMENT DOSSIER
          </h3>
          <p style={{ color: 'var(--color-silver, #8E8D8A)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', margin: '4px 0 0 0' }}>
            Curated database of all-time favorite comedies, thrillers, sci-fi epics & guilty pleasures.
          </p>
          <p style={{ color: '#8E8D8A', fontFamily: 'var(--font-mono)', fontSize: '0.76rem', margin: '8px 0 0 0', lineHeight: 1.5, maxWidth: '580px', fontStyle: 'italic', borderLeft: '2px solid var(--color-gold, #C5A880)', paddingLeft: '12px' }}>
            "I'm a massive cinephile. One of my craziest facts? In 7 days, I watched 35 movies — that's 5 movies a day. I don't just watch films — I study the cinematography, the sound design, the editing rhythm. Cinema is art."
          </p>
        </div>

        <button
          onClick={pickRandom}
          style={{
            background: 'linear-gradient(135deg, rgba(197,168,128,0.25), rgba(197,168,128,0.05))',
            border: '1px solid var(--color-gold, #C5A880)',
            color: 'var(--color-gold, #C5A880)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 0 15px rgba(197, 168, 128, 0.2)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.color = '#070709'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(197,168,128,0.25), rgba(197,168,128,0.05))'; e.currentTarget.style.color = 'var(--color-gold)'; }}
        >
          <Shuffle size={15} /> RANDOMIZE TONIGHT'S WATCH
        </button>
      </div>

      {/* Random Recommendation Modal / Callout */}
      {randomMovie && (
        <div style={{ background: 'rgba(197, 168, 128, 0.08)', border: '1px solid var(--color-gold, #C5A880)', padding: '16px 20px', borderRadius: '6px', marginBottom: '24px', fontFamily: 'var(--font-mono)', animation: 'fadeIn 0.3s ease-out' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} /> AI RECOMMENDATION GENERATED
            </span>
            <button onClick={() => setRandomMovie(null)} style={{ background: 'none', border: 'none', color: '#8E8D8A', cursor: 'pointer', fontSize: '0.8rem' }}>✕ CLOSE</button>
          </div>
          <div style={{ color: '#FFF', fontSize: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: 'bold' }}>
            {randomMovie.title} ({randomMovie.year})
          </div>
          <p style={{ color: 'var(--color-silver)', fontSize: '0.85rem', margin: '6px 0 10px' }}>
            "{randomMovie.oneLiner}"
          </p>
          <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem' }}>
            <span style={{ color: '#00ffcc' }}>REWATCH COUNT: {randomMovie.rewatch}</span>
            <span style={{ color: '#ff9500' }}>VERDICT: {randomMovie.tag}</span>
          </div>
        </div>
      )}

      {/* Cinema Quick Stats Bar */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px', padding: '10px 16px', background: 'rgba(15, 14, 22, 0.7)', border: '1px solid rgba(197, 168, 128, 0.2)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
        <div><span style={{ color: 'var(--color-gold)' }}>CURATED ARCHIVE:</span> <span style={{ color: '#FFF' }}>{MOVIES_DATABASE.length} TITLES</span></div>
        <div><span style={{ color: 'var(--color-silver)' }}>CURRENT FILTER:</span> <span style={{ color: '#00ffcc' }}>{filteredMovies.length} MATCHES</span></div>
        <div><span style={{ color: 'var(--color-silver)' }}>CRITERIA:</span> <span style={{ color: '#FFF' }}>INFINITE REWATCHABILITY</span></div>
      </div>

      {/* Search & Category Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
          {CATEGORIES.map(cat => {
            const count = cat.id === 'ALL' ? MOVIES_DATABASE.length : MOVIES_DATABASE.filter(m => m.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                style={{
                  background: selectedCat === cat.id ? 'var(--color-gold)' : 'rgba(20, 20, 26, 0.6)',
                  color: selectedCat === cat.id ? '#070709' : 'var(--color-silver)',
                  border: `1px solid ${selectedCat === cat.id ? 'var(--color-gold)' : 'rgba(197, 168, 128, 0.2)'}`,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  padding: '6px 12px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontWeight: selectedCat === cat.id ? 'bold' : 'normal',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {cat.label} <span style={{ opacity: 0.7, fontSize: '0.65rem' }}>({count})</span>
              </button>
            );
          })}
        </div>

        <div style={{ position: 'relative', width: '220px', minWidth: '180px' }}>
          <input
            type="text"
            placeholder="Search movie archive..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(20, 20, 26, 0.8)',
              border: '1px solid rgba(197, 168, 128, 0.3)',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              padding: '6px 10px 6px 30px',
              borderRadius: '4px',
              outline: 'none'
            }}
          />
          <Search size={14} color="#8E8D8A" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      {/* Movie Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px', fontFamily: 'var(--font-mono)' }}>
        {filteredMovies.map((movie, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(16, 15, 22, 0.75)',
              border: '1px solid rgba(197, 168, 128, 0.2)',
              borderRadius: '4px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-gold, #C5A880)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <h4 style={{ color: '#FFF', fontFamily: 'var(--font-display, serif)', fontSize: '1.08rem', margin: 0, lineHeight: 1.25 }}>
                  {movie.title}
                </h4>
                <span style={{ fontSize: '0.68rem', color: 'var(--color-gold)', background: 'rgba(197,168,128,0.12)', border: '1px solid rgba(197,168,128,0.2)', padding: '2px 6px', borderRadius: '2px', whiteSpace: 'nowrap' }}>
                  {movie.year}
                </span>
              </div>
              <p style={{ color: 'var(--color-silver, #8E8D8A)', fontSize: '0.8rem', margin: '6px 0 14px 0', lineHeight: 1.45 }}>
                "{movie.oneLiner}"
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px', fontSize: '0.72rem' }}>
              <span style={{ color: '#00ffcc', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={12} fill="#00ffcc" color="#00ffcc" /> REWATCH: {movie.rewatch}
              </span>
              <span style={{ color: 'var(--color-gold)', fontSize: '0.68rem', letterSpacing: '0.5px' }}>
                [{movie.tag}]
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
