import React, { useRef } from 'react';
import '../../styles/scenes/techArsenal.css';

const skills = [
  'js','ts','react','nextjs','tailwind','html','css','nodejs',
  'fastapi','mongodb','postgres','redis','git','github',
  'vscode','figma','postman'
];

const cyberSkills = [
  'kali','linux','ubuntu','bash','powershell','python','cpp','rust',
  'aws','docker','kubernetes','githubactions','cloudflare','regex','vim','neovim'
];

const TechArsenal = () => {
  const sectionRef = useRef(null);

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
            Core systems, programming languages, and full-stack frameworks powering deployed applications.
          </p>
        </div>

        {/* The Skill Icons Layout - Development */}
        <div className="skill-icons-container" style={{ marginBottom: '24px' }}>
           {skills.map((skill, index) => (
             <div 
               key={skill} 
               className="skill-icon-wrapper"
               style={{ animationDelay: `${index * 0.02}s` }}
             >
               <img 
                 src={`https://skillicons.dev/icons?i=${skill}&theme=dark`} 
                 alt={skill} 
                 className="skill-icon-img"
               />
               <div className="skill-tooltip">{skill}</div>
             </div>
           ))}
        </div>

        {/* The Skill Icons Layout - Cybersecurity & Infrastructure */}
        <div className="skill-icons-container">
           {cyberSkills.map((skill, index) => (
             <div 
               key={skill} 
               className="skill-icon-wrapper"
               style={{ animationDelay: `${index * 0.02}s` }}
             >
               <img 
                 src={`https://skillicons.dev/icons?i=${skill}&theme=dark`} 
                 alt={skill} 
                 className="skill-icon-img"
               />
               <div className="skill-tooltip">{skill}</div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default TechArsenal;
