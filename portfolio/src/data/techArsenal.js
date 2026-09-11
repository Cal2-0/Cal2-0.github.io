export const techCategories = [
  { id: 'all', label: 'ALL ARSENAL' },
  { id: 'security', label: 'FORENSICS & SECURITY' },
  { id: 'ai', label: 'APPLIED AI & VISION' },
  { id: 'systems', label: 'SYSTEMS & ARCHITECTURE' }
];

export const orbitalTiers = [
  {
    tier: 1,
    name: 'INNER DOME — SPECIALIZED FORENSICS & CRYPTOGRAPHY',
    description: 'Post-quantum key encapsulations, low-level network packet dissectors, and forensic signal pipelines.',
    radiusRatio: 0.22,
    nodes: [
      {
        id: 'pqc',
        name: 'ML-KEM-1024 / SPHINCS+',
        short: 'ML-KEM',
        category: 'security',
        icon: 'Lock',
        deployedIn: 'Kalera',
        role: 'Post-Quantum Key Encapsulation',
        description: 'Lattice-based cryptography resilient against Shor’s quantum algorithm with 4D chaos steganographic carrier transport.',
        status: 'RESEARCH // OPERATIONAL'
      },
      {
        id: 'scapy',
        name: 'Scapy & Wireshark',
        short: 'Scapy',
        category: 'security',
        icon: 'Activity',
        deployedIn: 'NetScope X & Army Cyber Group',
        role: 'Packet Dissection & Flow Analytics',
        description: 'Real-time protocol dissection, deep packet inspection (DPI), and detection of DNS tunneling & ARP spoofing heuristics.',
        status: 'TACTICAL FORENSICS'
      },
      {
        id: 'forensics',
        name: 'FTK Imager / Autopsy',
        short: 'Autopsy',
        category: 'security',
        icon: 'Search',
        deployedIn: 'Army Cyber Group',
        role: 'Chain of Custody & Disk Evidence',
        description: 'Digital forensics workflows, unallocated space carving, volatile memory dumping, and legally defensible artifact extraction.',
        status: 'DEFENSE GRADE'
      },
      {
        id: 'pytorch',
        name: 'PyTorch & FFT Analysis',
        short: 'PyTorch',
        category: 'ai',
        icon: 'Cpu',
        deployedIn: 'Lucent.AI & OuchMyBrain',
        role: 'Frequency-Domain Signal Anomaly',
        description: 'Analyzing high-frequency spectral artifacts and diffusion fingerprints to identify synthetically generated media.',
        status: 'RESEARCH GRADE'
      },
      {
        id: 'yolo',
        name: 'YOLOv8 & OpenCV',
        short: 'OpenCV',
        category: 'ai',
        icon: 'Eye',
        deployedIn: 'MASSED.EX',
        role: 'Real-Time Spatial Computer Vision',
        description: 'Sub-30ms crowd density estimation, bounding-box spatial clustering, and rapid emergency egress anomaly alerts.',
        status: 'SPECIAL COMMENDATION'
      },
      {
        id: 'chainintel',
        name: 'Alchemy & Forta Intel',
        short: 'Forta',
        category: 'security',
        icon: 'Shield',
        deployedIn: 'AXON',
        role: 'On-Chain Behavioral Heuristics',
        description: 'Evaluating 13,847+ illicit threat entities, fund flow topology, and behavioral graph patterns across EVM networks.',
        status: 'PRODUCTION FORENSICS'
      }
    ]
  },
  {
    tier: 2,
    name: 'MID DOME — CORE LANGUAGES & OFFENSIVE SECURITY',
    description: 'System-level memory control, smart contract verification, dynamic scripting, and audit tooling.',
    radiusRatio: 0.36,
    nodes: [
      {
        id: 'python',
        name: 'Python 3.12+',
        short: 'Python',
        category: 'systems',
        icon: 'Code',
        deployedIn: 'SentinelAI, AXON, SecureCI',
        role: 'Primary Tactical Engine',
        description: 'Custom AST parsers, asynchronous investigation microservices, scientific signal analysis, and ML inference pipelines.',
        status: 'DAILY DRIVER'
      },
      {
        id: 'cpp',
        name: 'C / C++ (C17 / C++20)',
        short: 'C/C++',
        category: 'systems',
        icon: 'Terminal',
        deployedIn: 'NetRecon & Cryptographic Engines',
        role: 'Raw Sockets & Low-Level Memory',
        description: 'Direct packet construction over AF_PACKET raw sockets, custom ICMP/ARP engines, and cache-optimized algorithms.',
        status: 'LOW-LEVEL DEV'
      },
      {
        id: 'solidity',
        name: 'Solidity & EVM Internals',
        short: 'Solidity',
        category: 'security',
        icon: 'Key',
        deployedIn: 'AXON & Web3 Security',
        role: 'Smart Contract Forensics',
        description: 'Disassembling bytecode, detecting reentrancy / flash loan exploit signatures, and tracing internal state transitions.',
        status: 'SECURITY AUDIT'
      },
      {
        id: 'nmap',
        name: 'Nmap & Metasploit',
        short: 'Nmap',
        category: 'security',
        icon: 'Radio',
        deployedIn: 'National CTFs & ACG Operations',
        role: 'Network Reconnaissance & Exploitation',
        description: 'Custom NSE scripting, banner grabbing, service enumeration, and vulnerability triage across enterprise subnets.',
        status: 'OFFENSIVE SECURITY'
      },
      {
        id: 'typescript',
        name: 'TypeScript & JavaScript (ESNext)',
        short: 'TS / JS',
        category: 'systems',
        icon: 'FileCode',
        deployedIn: 'Bureau Portfolio, Lyra, AXON',
        role: 'Strict Type-Safe Systems & Interfaces',
        description: 'Architecting high-frequency telemetry dashboards, robust state machines, and performant interactive canvas graphics.',
        status: 'MODERN FULLSTACK'
      },
      {
        id: 'linux',
        name: 'Linux / Kali / Bash',
        short: 'Linux',
        category: 'systems',
        icon: 'Terminal',
        deployedIn: 'All Investigative Platforms',
        role: 'Environment & Shell Automation',
        description: 'Kernel log monitoring, custom auditd rules, bash orchestrators, systemd sandboxes, and immutable evidence environments.',
        status: 'ROOT INFRA'
      },
      {
        id: 'sql',
        name: 'PostgreSQL & SQL',
        short: 'PostgreSQL',
        category: 'systems',
        icon: 'Database',
        deployedIn: 'Kenshō, IMS, Warehouse',
        role: 'Relational Provenance Storage',
        description: 'Complex transactional auditing, indexing temporal evidence chains, and high-concurrency relational data schemas.',
        status: 'EVIDENCE DATABASE'
      },
      {
        id: 'd3',
        name: 'D3.js Graph Engine',
        short: 'D3.js',
        category: 'systems',
        icon: 'Network',
        deployedIn: 'AXON & NetScope X',
        role: 'Topological Force Visualizations',
        description: 'Hardware-accelerated force-directed graph rendering for multi-hop wallet clusters and live node threat topologies.',
        status: 'DATA OBSERVATORY'
      }
    ]
  },
  {
    tier: 3,
    name: 'OUTER DOME — DISTRIBUTED INFRASTRUCTURE & PLATFORMS',
    description: 'High-throughput async backends, containerized microservices, edge defenses, and automated verification.',
    radiusRatio: 0.50,
    nodes: [
      {
        id: 'fastapi',
        name: 'FastAPI (Asynchronous)',
        short: 'FastAPI',
        category: 'systems',
        icon: 'Zap',
        deployedIn: 'AXON & Kalera Backend',
        role: 'High-Throughput ASGI APIs',
        description: 'Microsecond serialization, OpenAPI schema enforcement, and non-blocking worker pools for concurrent telemetry.',
        status: 'BACKEND CORE'
      },
      {
        id: 'react',
        name: 'React 19 & Next.js',
        short: 'React 19',
        category: 'systems',
        icon: 'Layers',
        deployedIn: 'Portfolio Bureau, Lyra, AXON',
        role: 'Component Architecture & UI Engineering',
        description: 'Concurrent rendering, custom shader hooks, GSAP timeline choreography, and Lenis smooth-scroll orchestration.',
        status: 'CLIENT RUNTIME'
      },
      {
        id: 'docker',
        name: 'Docker & Containers',
        short: 'Docker',
        category: 'systems',
        icon: 'Boxes',
        deployedIn: 'SecureCI, SentinelAI',
        role: 'Isolated Sandbox Environments',
        description: 'Deterministic build reproducibility, multi-stage minimal scratch containers, and air-gapped malware detonation pods.',
        status: 'INFRASTRUCTURE'
      },
      {
        id: 'redis',
        name: 'Redis Streaming & Cache',
        short: 'Redis',
        category: 'systems',
        icon: 'Database',
        deployedIn: 'Telemetry Engines',
        role: 'In-Memory State & Rate Limiting',
        description: 'Sub-millisecond pub/sub message brokers, token bucket rate limiters, and ephemeral session token validation.',
        status: 'HIGH VELOCITY'
      },
      {
        id: 'githubactions',
        name: 'GitHub Actions & CI/CD',
        short: 'GH Actions',
        category: 'security',
        icon: 'GitBranch',
        deployedIn: 'SecureCI',
        role: 'Pipeline Security & Provenance',
        description: 'Automated static code analysis, supply-chain pin verification, and automated vulnerability patch generation.',
        status: 'DEVSECOPS'
      },
      {
        id: 'flask',
        name: 'Flask Microservices',
        short: 'Flask',
        category: 'systems',
        icon: 'Server',
        deployedIn: 'NetScope X & Prototype Labs',
        role: 'Lightweight Service Endpoints',
        description: 'Zero-overhead daemon wrappers for background socket listeners and local forensic tool orchestration.',
        status: 'SERVICES'
      },
      {
        id: 'cloudflare',
        name: 'Cloudflare & Zero-Trust',
        short: 'Cloudflare',
        category: 'security',
        icon: 'Shield',
        deployedIn: 'VisionEX & Live Deployments',
        role: 'Edge Defense & Access Control',
        description: 'WAF rulesets, DDoS mitigation, mTLS authentication tunnels, and edge worker request filtering.',
        status: 'PERIMETER DEFENSE'
      },
      {
        id: 'git',
        name: 'Git Internals & Cryptographic Sign',
        short: 'Git',
        category: 'systems',
        icon: 'GitBranch',
        deployedIn: 'All Repositories',
        role: 'Version Control & Commit Provenance',
        description: 'GPG-signed commits, branch protection policies, audit trails, and strict release tagging architectures.',
        status: 'PROVENANCE VERIFIED'
      },
      {
        id: 'streamlit',
        name: 'Streamlit Intelligence',
        short: 'Streamlit',
        category: 'ai',
        icon: 'Activity',
        deployedIn: 'SentinelAI',
        role: 'Rapid Security Dashboarding',
        description: 'Interactive real-time triage interfaces for machine learning anomaly model outputs and AST inspection metrics.',
        status: 'RAPID INCIDENT UI'
      },
      {
        id: 'zerotrust',
        name: 'OAuth2 / RBAC / IAM',
        short: 'Zero-Trust',
        category: 'security',
        icon: 'Lock',
        deployedIn: 'VisionEX (6-Engineer Lead)',
        role: 'Identity & Access Architecture',
        description: 'Fine-grained policy enforcement, stateless JWT verification, and audit-verified role matrices with zero criticals.',
        status: 'IDENTITY ENGINE'
      }
    ]
  }
];
