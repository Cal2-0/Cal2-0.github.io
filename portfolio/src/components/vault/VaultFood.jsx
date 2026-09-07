import React, { useState } from 'react';
import { Utensils, MapPin, Award, Flame, Compass, ChevronRight, Check } from 'lucide-react';

const ROADTRIP_STAGES = [
  { step: 1, state: "Kerala", target: "Malabar Biryani & Kerala Beef Fry", status: "FLAVOR EXPLOSION", note: "Starting the journey with authentic Malabar spices, coconut oil, and slow-cooked layered meat." },
  { step: 2, state: "Tamil Nadu", target: "Ghee Roast Dosa & Crispy Medu Vada", status: "MORNING ESSENTIAL", note: "Golden brown paper-thin fermented crepes served with 3 spicy chutneys and piping hot sambar." },
  { step: 3, state: "Hyderabad", target: "Authentic Dum Biryani", status: "ROYAL HERITAGE", note: "Zaffrani basmati rice, tender marinated mutton cooked under dum seal. Absolutely mandatory pitstop." },
  { step: 4, state: "Mumbai", target: "Buttery Pav Bhaji & Street Vada Pav", status: "COASTAL CHAOS", note: "Midnight street food run by the beach with extra butter and garlic chutney." },
  { step: 5, state: "Goa", target: "Goan Prawn Curry & Fish Recheado", status: "BEACH PROTOCOL", note: "Fresh coastal catch cooked in rich coconut, kokum, and fiery red masala." },
  { step: 6, state: "Delhi", target: "Gulati's Butter Chicken & Jama Masjid Kebabs", status: "CULINARY MONARCHY", note: "Rich velvety tomato-cashew gravy with charcoal roasted tandoori chicken and melt-in-mouth seekh kebabs." },
  { step: 7, state: "Sikkim & Nepal", target: "Himalayan Steaming Momos & Thukpa", status: "MISSION COMPLETE", note: "Juicy hand-folded dumplings with spicy mountain chili dip overlooking high altitude peaks." }
];

const FOOD_RECOMMENDATIONS = [
  { name: "PizzaExpress", location: "Bangalore / Anywhere", item: "Calabrese & Dough Balls", badge: "ELITE PIZZA" },
  { name: "Meghana Foods", location: "Bangalore", item: "Special Boneless Biryani", badge: "CRITICAL ADDICTION" },
  { name: "Dubai KFC", location: "Dubai, UAE", item: "Spicy Zinger & Crispy Tenders", badge: "SUPERIOR CRUNCH" },
  { name: "Gulati Restaurant", location: "Pandara Road, Delhi", item: "Butter Chicken & Garlic Naan", badge: "BENCHMARK POULTRY" },
  { name: "Jama Masjid Kebab Stalls", location: "Old Delhi", item: "Seekh & Shami Kebabs", badge: "SMOKY PERFECTION" },
  { name: "Gulf Shawarma Stalls", location: "Middle East", item: "Garlic Toum & Pickled Shawarma", badge: "AUTHENTIC WRAP" }
];

export const VaultFood = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="vault-panel">
      <div className="vault-panel-header">
        <div>
          <h3 className="vault-panel-title">
            <Utensils size={20} color="var(--color-gold)" /> CULINARY DOSSIER // PRIMARY FUEL & ROADTRIP MAP
          </h3>
          <p style={{ color: 'var(--color-silver, #8E8D8A)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', margin: '4px 0 0 0' }}>
            Personal food preferences, vetted restaurant targets & the master India culinary road trip mission.
          </p>
          <p style={{ color: '#8E8D8A', fontFamily: 'var(--font-mono)', fontSize: '0.76rem', margin: '8px 0 0 0', lineHeight: 1.5, maxWidth: '580px', fontStyle: 'italic', borderLeft: '2px solid var(--color-gold, #C5A880)', paddingLeft: '12px' }}>
            "I'm a real chef — born and raised in a kitchen. Huge foodie. Cooking for people I love is one of the things that makes me happiest. Culinary arts isn't a hobby, it's a calling."
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="vault-panel-tag" style={{ background: 'rgba(255, 149, 0, 0.1)', color: '#ff9500', border: '1px solid #ff9500' }}>
            MASTERCHEF EXP: 500+ HRS
          </span>
          <span className="vault-panel-tag" style={{ background: 'rgba(0, 255, 204, 0.1)', color: '#00ffcc', border: '1px solid #00ffcc' }}>
            CAPACITY: 100%
          </span>
        </div>
      </div>

      {/* Operation: India Food Road Trip Interactive Timeline */}
      <div style={{ background: 'rgba(20, 20, 26, 0.6)', border: '1px solid rgba(197, 168, 128, 0.25)', padding: '20px', borderRadius: '6px', marginBottom: '24px', fontFamily: 'var(--font-mono)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={16} /> OPERATION: THE GREAT INDIA FOOD ROAD TRIP
          </span>
          <span style={{ color: '#8E8D8A', fontSize: '0.74rem' }}>
            MISSION: EAT AS MUCH AS PHYSICALLY POSSIBLE
          </span>
        </div>

        {/* Horizontal Steps Navigator */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '16px' }}>
          {ROADTRIP_STAGES.map((stg, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              style={{
                background: activeStep === i ? 'var(--color-gold)' : 'rgba(15, 15, 20, 0.8)',
                color: activeStep === i ? '#070709' : '#8E8D8A',
                border: `1px solid ${activeStep === i ? 'var(--color-gold)' : 'rgba(197, 168, 128, 0.2)'}`,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: activeStep === i ? 'bold' : 'normal',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>0{stg.step}.</span> {stg.state}
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Card */}
        {ROADTRIP_STAGES[activeStep] && (
          <div style={{ background: 'rgba(10, 10, 15, 0.9)', borderLeft: '3px solid var(--color-gold)', padding: '16px', borderRadius: '4px', animation: 'fadeIn 0.25s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                STAGE 0{ROADTRIP_STAGES[activeStep].step} // {ROADTRIP_STAGES[activeStep].state.toUpperCase()}
              </span>
              <span style={{ color: '#00ffcc', fontSize: '0.7rem', background: 'rgba(0,255,204,0.1)', padding: '2px 8px', borderRadius: '3px' }}>
                [{ROADTRIP_STAGES[activeStep].status}]
              </span>
            </div>
            <h4 style={{ color: '#FFF', fontFamily: 'var(--font-display, serif)', fontSize: '1.2rem', margin: '4px 0 8px 0' }}>
              {ROADTRIP_STAGES[activeStep].target}
            </h4>
            <p style={{ color: 'var(--color-silver, #8E8D8A)', fontSize: '0.82rem', margin: 0, lineHeight: 1.4 }}>
              {ROADTRIP_STAGES[activeStep].note}
            </p>
          </div>
        )}
      </div>

      {/* Vetted Known Culinary Targets */}
      <div>
        <h4 style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '1px' }}>
          <Award size={16} /> CLASSIFIED FOOD INTELLIGENCE // TOP VETTED DESTINATIONS
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', fontFamily: 'var(--font-mono)' }}>
          {FOOD_RECOMMENDATIONS.map((f, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(20, 20, 26, 0.6)',
                border: '1px solid rgba(197, 168, 128, 0.2)',
                borderRadius: '6px',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <span style={{ color: '#FFF', fontWeight: 'bold', fontSize: '0.95rem' }}>{f.name}</span>
                  <span style={{ color: 'var(--color-gold)', fontSize: '0.65rem', background: 'rgba(197,168,128,0.1)', padding: '2px 6px', borderRadius: '2px' }}>
                    {f.badge}
                  </span>
                </div>
                <div style={{ color: '#8E8D8A', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                  <MapPin size={12} color="var(--color-gold)" /> {f.location}
                </div>
              </div>
              <div style={{ color: '#DDD', fontSize: '0.78rem', borderTop: '1px solid rgba(197, 168, 128, 0.15)', paddingTop: '8px' }}>
                Primary Order: <span style={{ color: '#00ffcc' }}>{f.item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
