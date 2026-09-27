import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/scenes/techArsenal.css';

const SKILL_LABELS = {
  js: 'JavaScript',
  ts: 'TypeScript',
  react: 'React 19',
  nextjs: 'Next.js',
  tailwind: 'Tailwind CSS',
  html: 'HTML5',
  css: 'CSS3',
  nodejs: 'Node.js',
  fastapi: 'FastAPI',
  mongodb: 'MongoDB',
  postgres: 'PostgreSQL',
  redis: 'Redis',
  git: 'Git',
  github: 'GitHub',
  vscode: 'VS Code',
  figma: 'Figma',
  postman: 'Postman',

  kali: 'Kali Linux',
  linux: 'Linux Kernel',
  ubuntu: 'Ubuntu Server',
  bash: 'Bash Shell',
  powershell: 'PowerShell',
  python: 'Python 3',
  cpp: 'C++',
  rust: 'Rust',
  pytorch: 'PyTorch (AI/ML)',
  tensorflow: 'TensorFlow',
  opencv: 'OpenCV (Vision)',
  aws: 'AWS Cloud',
  docker: 'Docker Sandboxes',
  kubernetes: 'Kubernetes',
  githubactions: 'GitHub Actions',
  cloudflare: 'Cloudflare',
  regex: 'RegEx Forensics',
  neovim: 'Neovim'
};

const skills = [
  'js','ts','react','nextjs','tailwind','html','css','nodejs',
  'fastapi','mongodb','postgres','redis','git','github',
  'vscode','figma','postman'
];

const cyberSkills = [
  'kali','linux','ubuntu','bash','powershell','python','cpp','rust',
  'pytorch','tensorflow','opencv','aws','docker','kubernetes',
  'githubactions','cloudflare','regex','neovim'
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

        {/* Cluster 01: Frameworks & Developer Tools */}
        <div className="arsenal-cluster">
          <div className="arsenal-cluster-header">
            <div className="arsenal-cluster-badge-row">
              <span className="arsenal-cluster-badge">
                <span className="arsenal-cluster-dot" />
                SUBSYSTEM 01 // DEV & RUNTIMES
              </span>
              <span className="arsenal-cluster-count">{skills.length} INSTRUMENTS</span>
            </div>
            <h3 className="arsenal-cluster-title">Frameworks & Developer Tools</h3>
            <p className="arsenal-cluster-desc">
              Full-stack frameworks, reactive interfaces, backend API runtimes, distributed databases, and core dev toolchains.
            </p>
          </div>

          <div className="skill-icons-container">
            {skills.map((skill, index) => (
              <div 
                key={skill} 
                className="skill-icon-wrapper"
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                <img 
                  src={`https://skillicons.dev/icons?i=${skill}&theme=dark`} 
                  alt={SKILL_LABELS[skill] || skill} 
                  className="skill-icon-img"
                />
                <div className="skill-tooltip">{SKILL_LABELS[skill] || skill}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cluster 02: Cybersecurity, Systems & AI Tools */}
        <div className="arsenal-cluster">
          <div className="arsenal-cluster-header">
            <div className="arsenal-cluster-badge-row">
              <span className="arsenal-cluster-badge cyber">
                <span className="arsenal-cluster-dot cyber" />
                SUBSYSTEM 02 // DEFENSE, SYSTEMS & AI
              </span>
              <span className="arsenal-cluster-count">{cyberSkills.length} INSTRUMENTS</span>
            </div>
            <h3 className="arsenal-cluster-title">Cybersecurity, Systems & AI Tools</h3>
            <p className="arsenal-cluster-desc">
              Offensive security distributions, low-level memory programming, deep learning vision models, and sandboxing infrastructure.
            </p>
          </div>

          <div className="skill-icons-container">
            {cyberSkills.map((skill, index) => (
              <div 
                key={skill} 
                className="skill-icon-wrapper"
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                <img 
                  src={`https://skillicons.dev/icons?i=${skill}&theme=dark`} 
                  alt={SKILL_LABELS[skill] || skill} 
                  className="skill-icon-img"
                />
                <div className="skill-tooltip">{SKILL_LABELS[skill] || skill}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Architecture Lab Bridge */}
        <div className="arsenal-bridge-card">
          <div className="bridge-glow-orb" />
          <div className="bridge-content">
            <div className="bridge-tag-row">
              <span className="bridge-status-dot" />
              <span className="bridge-tag">SIMULATION LAB // PROTOCOL BENCHMARK</span>
            </div>
            <h4 className="bridge-title">Interactive Technology Stack Builder</h4>
            <p className="bridge-desc">
              Compose, stack, and simulate custom technology layers across frontend, backend, security, and hardware.
            </p>
          </div>
          <Link to="/build-stack" className="bridge-action-btn">
            <span>LAUNCH BUILDER</span>
            <span className="bridge-btn-arrow">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TechArsenal;
