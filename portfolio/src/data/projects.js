export const projects = [
  {
    id: "001",
    title: "AXON",
    status: "ACTIVE",
    category: "BLOCKCHAIN FORENSICS",
    stack: ["React", "FastAPI", "D3.js", "Alchemy", "Forta"],
    description: "Built a 5-layer behavioural forensics engine analyzing transaction rhythms, fan-out topology, and OSINT threat intelligence to evaluate 13,847+ threat entities.",
    why: "I wanted to understand what a wallet actually does, rather than trusting what someone says it is.",
    metrics: [
      { value: "13,847+", label: "THREAT ENTITIES" },
      { value: "5", label: "ANALYSIS LAYERS" },
      { value: "D3.js", label: "GRAPH ENGINE" },
      { value: "FORTA", label: "THREAT INTEL" }
    ],
    visualKey: "blockchain_nodes",
    image: "/pics/1000014877.jpg",
    links: {
      github: "https://github.com/Cal2-0/Axon",
      demo: "https://theaxonapp.vercel.app/",
      research: null
    },
    featured: true
  },
  {
    id: "002",
    title: "SentinelAI",
    status: "ACTIVE",
    category: "INCIDENT RESPONSE",
    stack: ["Python", "Streamlit", "Gemini 2.0 Flash", "Isolation Forest"],
    description: "Multi-agent Linux auditing system analyzing auth history, package vulnerabilities, and AST-level Python code behavior.",
    why: "I wanted a rapid way to determine if a machine exhibited indicators of compromise across multiple vectors.",
    metrics: [
      { value: "3", label: "AGENT VECTORS" },
      { value: "AST", label: "CODE ANALYSIS" },
      { value: "ML", label: "ANOMALY MODEL" },
      { value: "REAL-TIME", label: "AUDIT SPEED" }
    ],
    visualKey: "terminal_anomaly",
    image: "/pics/1000025201.jpg",
    links: {
      github: "https://github.com/Cal2-0/Sentinel-IP-",
      demo: null,
      research: null
    },
    featured: true
  },
  {
    id: "003",
    title: "SecureCI",
    status: "ACTIVE",
    category: "DEVSECOPS",
    stack: ["Python", "YAML", "Gemini", "GitHub Actions"],
    description: "Command-line tool that audits workflows for unpinned actions, poisoned pipelines, and generates AI-assisted remediations.",
    why: "I wanted to automatically prove a CI/CD pipeline is safe from common misconfigurations.",
    metrics: [
      { value: "6", label: "VULN CATEGORIES" },
      { value: "AI", label: "AUTO-FIX ENGINE" },
      { value: "YAML", label: "STATIC ANALYSIS" },
      { value: "CLI", label: "INTERFACE" }
    ],
    visualKey: "yaml_scan",
    image: "/pics/1000038973.jpg",
    links: {
      github: "https://github.com/Danish4h-135/SecureCI",
      demo: null,
      research: null
    },
    featured: true
  },
  {
    id: "004",
    title: "Kalera",
    status: "RESEARCH",
    category: "POST-QUANTUM CRYPTO",
    stack: ["ML-KEM-1024", "SPHINCS+", "FastAPI"],
    description: "Hybrid post-quantum key establishment, layered encryption, and steganographic transport via chaos-positioned LSBs.",
    why: "I wanted to explore what happens when today's cryptographic assumptions stop being enough.",
    metrics: [
      { value: "ML-KEM", label: "KEY EXCHANGE" },
      { value: "4D", label: "CHAOS KEYSTREAM" },
      { value: "SHA-3", label: "HASH FUNCTION" },
      { value: "LSB", label: "STEGANOGRAPHY" }
    ],
    visualKey: "encrypted_image",
    links: {
      github: "https://github.com/betrayed1996/Kalera",
      demo: "https://kaleraapp.netlify.app/",
      research: null
    },
    featured: true
  },
  {
    id: "005",
    title: "NetScope X",
    status: "ACTIVE",
    category: "NETWORK INTELLIGENCE",
    stack: ["Python", "Flask", "Scapy", "D3.js"],
    description: "Real-time browser platform visualizing live topology, detecting ARP spoofing, port scans, and DNS tunnelling.",
    why: "I wanted to observe and map a network without disturbing it.",
    metrics: [
      { value: "4", label: "ATTACK DETECTIONS" },
      { value: "LIVE", label: "TOPOLOGY MAP" },
      { value: "SCAPY", label: "PACKET ENGINE" },
      { value: "D3.js", label: "VISUALIZATION" }
    ],
    visualKey: "network_topology",
    links: {
      github: "https://github.com/Cal2-0/Projects/tree/main/netscope",
      demo: null,
      research: null
    },
    featured: true
  },
  {
    id: "006",
    title: "Lucent.ai",
    status: "RESEARCH",
    category: "SYNTHETIC MEDIA",
    stack: ["PyTorch", "OpenCV", "FFT", "FastAPI"],
    description: "Investigating frequency-domain anomaly analysis and diffusion reconstruction errors to detect deepfakes.",
    why: "I wanted to know whether deepfake detection could be explained through interpretable signal anomalies rather than an opaque classifier.",
    metrics: [
      { value: "FFT", label: "FREQ ANALYSIS" },
      { value: "DIFFUSION", label: "ERROR DETECTION" },
      { value: "PyTorch", label: "MODEL ENGINE" },
      { value: "PAPER", label: "IN PROGRESS" }
    ],
    visualKey: "signal_waveform",
    links: {
      github: null,
      demo: null,
      research: "#"
    },
    featured: true
  },
  {
    id: "007",
    title: "MassEd.ex",
    status: "PROTOTYPE",
    category: "COMPUTER VISION",
    stack: ["OpenCV", "YOLOv8", "DeepSORT", "Flask"],
    description: "Crowd intelligence and event safety platform generating dynamic density heatmaps from continuous video telemetry.",
    why: "I wanted to explore whether computer vision could turn a crowd from a video stream into a continuously changing safety signal.",
    metrics: [
      { value: "YOLOv8", label: "DETECTION MODEL" },
      { value: "DeepSORT", label: "TRACKING" },
      { value: "24HR", label: "HACKATHON BUILD" },
      { value: "LIVE", label: "HEATMAPS" }
    ],
    visualKey: "crowd_heatmap",
    links: {
      github: "https://github.com/Cal2-0/Projects/tree/main/Massex",
      demo: null,
      research: null
    },
    featured: true
  },
  {
    id: "008",
    title: "OuchMyBrain",
    status: "ARCHIVED",
    category: "GENERATIVE AI",
    stack: ["Python", "OpenAI", "OCR", "ElevenLabs"],
    description: "2nd Place at ACEathon. An adaptive learning platform transforming unstructured material into summaries, flashcards, and audio lessons.",
    why: "I wanted an AI to convert chaotic notes into structured study workflows.",
    metrics: [
      { value: "🥈", label: "ACEathon 2025" },
      { value: "OCR", label: "INPUT ENGINE" },
      { value: "TTS", label: "AUDIO OUTPUT" },
      { value: "GPT-4", label: "AI BACKBONE" }
    ],
    visualKey: "ocr_flow",
    links: {
      github: "https://github.com/ACEathon-2025/Team-39",
      demo: null,
      research: null
    },
    featured: true
  },
  {
    id: "009",
    title: "Lyra",
    status: "ACTIVE",
    category: "SOFTWARE ENGINEERING",
    stack: ["React", "Vite", "Fuse.js", "Framer Motion"],
    description: "Curated developer-resource platform with 640+ APIs, featuring fuzzy semantic search and keyboard-first (⌘K) navigation.",
    why: "I wanted to reorganize how developers actually search for intent rather than category.",
    metrics: [
      { value: "640+", label: "DEV TOOLS" },
      { value: "FUZZY", label: "SEARCH ENGINE" },
      { value: "⌘K", label: "KEYBOARD NAV" },
      { value: "200+", label: "LI ENGAGEMENT" }
    ],
    visualKey: "search_interface",
    links: {
      github: "https://github.com/Cal2-0/guide",
      demo: "https://thelyraapp.netlify.app/",
      research: null
    },
    featured: true
  }
];

export const labProjects = [
  {
    id: "lab-01",
    title: "CalHive",
    desc: "NLP-powered productivity SPA with natural-language task classification using spaCy.",
    github: null
  },
  {
    id: "lab-02",
    title: "Warehouse Inventory System",
    desc: "Full-stack inventory management covering stock movement, RBAC, capacity tracking.",
    github: null
  },
  {
    id: "lab-03",
    title: "Movieszbt",
    desc: "Authenticated movie catalogue and personal watchlist integrating TMDB.",
    github: null
  },
  {
    id: "lab-04",
    title: "Secure Rooms Chat",
    desc: "Password-protected room-based communication using WebSocket broadcasting.",
    github: null
  },
  {
    id: "lab-05",
    title: "Melkit",
    desc: "Digital-forensics utility for extracting and visualising EXIF metadata and GPS coordinates.",
    github: null
  },
  {
    id: "lab-06",
    title: "SnapShop",
    desc: "Image-based product recommendation using CLIP vision-language embeddings and similarity search.",
    github: null
  },
  {
    id: "lab-07",
    title: "Cipher Lab",
    desc: "Interactive environment for experimenting with classical cryptographic algorithms.",
    github: null
  }
];
