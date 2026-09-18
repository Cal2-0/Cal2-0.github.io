import React from 'react';
import { Sticker, getTechColor } from '../shared/Sticker';
import { Polaroid } from '../shared/Polaroid';

const ProjectSpread = ({ project }) => {
  return (
    <section className="project-spread section container-wide">
      <div className="spread project-layout">
        
        {/* Left Page */}
        <div className="page-left project-visuals">
          <div className="project-chapter">CHAPTER {project.chapter}</div>
          <h2 className="project-title">
            {project.title} ✨
            <svg className="title-underline" viewBox="0 0 300 15" preserveAspectRatio="none">
              <path d="M0 10 Q 75 0 150 10 T 300 10" stroke="var(--color-accent-primary)" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </h2>

          <div className="project-hero-image">
             {project.heroImage ? (
                <img src={project.heroImage} alt={project.title} className="hero-img-full" />
             ) : (
                <div className="hero-img-placeholder"></div>
             )}
            <div className="tape tape-top-left"></div>
            <div className="tape tape-top-right"></div>
          </div>

          <div className="project-tech-stack">
            {project.tech.map((t, idx) => {
              // Rotation between -5 and 5
              const rot = (Math.random() * 10 - 5).toFixed(1);
              return (
                <Sticker 
                  key={idx} 
                  label={t} 
                  color={getTechColor(t)} 
                  rotation={rot} 
                />
              );
            })}
          </div>
        </div>

        {/* Right Page */}
        <div className="page-right project-details">
          <div className="project-meta">
            <span className="project-date">{project.date}</span>
            <h3 className="project-role">{project.role}</h3>
            {project.context && <p className="project-context">{project.context}</p>}
          </div>

          <div className="project-description">
            {project.description.map((paragraph, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
            ))}
          </div>

          {project.demoImage && (
            <div className="project-demo-polaroid">
              <Polaroid 
                image={project.demoImage} 
                caption={project.demoCaption || `${project.title} Interface`} 
                rotation={3} 
                size="small"
              />
              <svg className="doodle-arrow" viewBox="0 0 50 50">
                <path d="M10 10 Q 30 10 40 30" stroke="currentColor" fill="none" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                  </marker>
                </defs>
              </svg>
            </div>
          )}

          <div className="project-impact">
            <h4 className="impact-title">THE IMPACT:</h4>
            <ul className="impact-list">
              {project.impact.map((item, idx) => (
                <li key={idx}><span className="bullet">✦</span> {item}</li>
              ))}
            </ul>
          </div>

          {project.badge && (
            <div className="project-badge">
              <span className="badge-icon">{project.badge.icon}</span>
              <span className="badge-text">{project.badge.text}</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default ProjectSpread;
