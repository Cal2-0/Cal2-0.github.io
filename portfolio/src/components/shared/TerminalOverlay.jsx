import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { lenisInstance } from '../../utils/smoothScroll';
import '../../styles/components/terminal-overlay.css';

const COMMAND_LIST = [
  'whoami', 'help', 'skills', 'specs', 'garage', 'vault', 'movies',
  'food', 'contact', 'ls', 'cat', 'clear', 'nmap', 'neofetch', 'matrix', 'exit'
];

const TerminalOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState([
    {
      id: 0,
      command: null,
      output: 'Bureau Terminal v2.4.1. Type "help" for command manual, or click any chip above.'
    }
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  // Handle global shortcuts and custom events
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle with backtick (`) unless typing in another input
      if (e.key === '`' && !e.ctrlKey && !e.metaKey) {
        const activeTag = document.activeElement?.tagName;
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
          e.preventDefault();
          setIsOpen(prev => !prev);
        } else if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
      }

      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);
    const handleCustomToggle = () => setIsOpen(prev => !prev);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openTerminal', handleCustomOpen);
    window.addEventListener('toggleTerminal', handleCustomToggle);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openTerminal', handleCustomOpen);
      window.removeEventListener('toggleTerminal', handleCustomToggle);
    };
  }, [isOpen]);

  // Lock body scroll and pause Lenis when terminal is open
  useEffect(() => {
    if (isOpen) {
      lenisInstance?.stop();
      document.body.classList.add('terminal-open');
    } else {
      lenisInstance?.start();
      document.body.classList.remove('terminal-open');
    }

    return () => {
      lenisInstance?.start();
      document.body.classList.remove('terminal-open');
    };
  }, [isOpen]);

  // Auto-scroll to bottom on open or when history changes
  const scrollToBottom = (instant = false) => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
    bottomRef.current?.scrollIntoView({
      behavior: instant ? 'auto' : 'smooth',
      block: 'nearest'
    });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
      const timer = setTimeout(() => {
        scrollToBottom(true);
        inputRef.current?.focus();
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [isOpen, history]);

  const handleCommand = (cmd) => {
    const rawCmd = cmd.trim();
    if (!rawCmd) return;

    // Record command history for up/down arrow navigation
    setCmdHistory(prev => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const args = rawCmd.toLowerCase().split(' ');
    let output = '';

    switch (args[0]) {
      case 'help':
        output = `COMMAND MANUAL:
---------------
whoami     - Display operator dossier
skills     - List technical proficiencies
specs      - Operator workstation hardware telemetry
movies     - Top classified cinema watchlist
food       - Primary fuel matrix & food roadmap
garage     - The ₹100 Crore dream hypercar fleet
vault      - Launch Secret Protocols / Hidden Me
contact    - Establish secure comms link
ls         - List directory contents
cat <file> - Read file contents
clear      - Clear terminal output
nmap       - Network exploration tool
neofetch   - System information
matrix     - Enter the Matrix
exit       - Terminate session`;
        break;
      case 'specs':
      case 'hardware':
        output = `OPERATOR HARDWARE TELEMETRY
---------------------------
[+] CPU:      13th Gen Intel(R) Core(TM) i7-13700H (14C / 20T, 5.0 GHz)
[+] GPU:      NVIDIA GeForce RTX 4070 Laptop GPU (8GB GDDR6) + Iris Xe
[+] RAM:      16.0 GB DDR5 @ 5200 MHz
[+] STORAGE:  NVMe M.2 High-Speed SSD
[+] GAMING:   Valorant, Fortnite, Minecraft, FIFA
[+] THERMAL:  44°C Nominal // Power Overclocked`;
        break;
      case 'movies':
      case 'cinema':
        output = `CLASSIFIED CINEMA PICKS
-----------------------
[+] COMEDY:   Kingsman, Johnny English, Naked Gun, White Chicks, Superbad, 21 Jump Street
[+] ROM-COM:  The Proposal, How to Lose a Guy in 10 Days, The Bounty Hunter, Grown Ups
[+] CRIME:    Heat, Casino, The Godfather, No Country for Old Men, Zodiac, Prisoners
[+] SCIFI:    Interstellar, 2001: Space Odyssey, Ready Player One, Transformers, Cars
[+] ACTION:   Baahubali, KGF Chapter 1 & 2
(Type 'vault' to access the interactive recommendation engine)`;
        break;
      case 'food':
        output = `CULINARY DOSSIER // PRIMARY FUEL
--------------------------------
[+] STAPLES:      PizzaExpress, Meghana's Biryani, Dubai KFC, Gulati's Butter Chicken
[+] MASTERCHEF:   500+ Hours broadcast analysis
[+] MISSION:      Operation: The Great India Food Roadtrip (Kerala → Sikkim Momos)`;
        break;
      case 'garage':
      case 'cars':
        output = `THE ₹100 CRORE HYPERCAR FLEET
-----------------------------
[+] #01: Porsche 918 Spyder (4.6L V8 Hybrid, 875 HP, 0-100: 2.6s) [₹18 Cr]
[+] #02: Pagani Huayra R (6.0L NA AMG V12, 850 HP, 9000 RPM)       [₹32 Cr]
[+] #03: Ferrari FXX-K (6.3L V12 + KERS, 1036 HP, Track Only)     [₹36 Cr]
[+] STATUS: ALLOCATED ₹86 CR / ₹100 CR (Remaining: ₹14 Cr)`;
        break;
      case 'larp':
      case 'normal':
        document.body.classList.remove('audit-mode');
        output = '[✔] AUDIT OVERRIDE DEACTIVATED // RESTORED TO PRISTINE NORMAL MODE.';
        break;
      case 'audit':
        document.body.classList.toggle('audit-mode');
        output = document.body.classList.contains('audit-mode')
          ? '[!] RED TEAM AUDIT MODE ENGAGED. Type "larp" or "normal" to restore.'
          : '[✔] AUDIT MODE RESTORED TO NORMAL.';
        break;
      case 'vault':
      case 'game':
      case 'quiz':
        output = 'Initiating direct neural jump to Bureau Vault...';
        setTimeout(() => {
          setIsOpen(false);
          navigate('/vault');
        }, 600);
        break;
      case 'whoami':
        output = `OPERATOR DOSSIER
----------------
NAME:       Calvin Jude D'Souza
ROLE:       Cybersecurity Researcher & Systems Architect
CLEARANCE:  Team Lead Intern @ Army Cyber Group
STATUS:     Building machines that look for proof.
LOCATION:   Earth (Usually)`;
        break;
      case 'skills':
        output = `TECHNICAL PROFICIENCIES
-----------------------
[+] CORE:      Cybersecurity, AI, Forensics, Research
[+] DOMAINS:   Blockchain Intelligence, Deepfake Detection
[+] INTERESTS: Cinephile, Automotive, F1 Telemetry
[+] STATUS:    Building investigation platforms.`;
        break;
      case 'contact':
        output = `SECURE COMMS LINK
-----------------
[+] EMAIL:    calvinja320@gmail.com
[+] PHONE:    +91-8971192706
[+] GITHUB:   github.com/Cal2-0
[+] LINKEDIN: linkedin.com/in/calvin-jude-dsouza
[+] INSTA:    @_______.cal`;
        break;
      case 'ls':
        if (args[1] === 'projects') {
          output = 'axon.md kensho.md neurometric.md';
        } else if (args[1] === '-la') {
          output = 'drwxr-xr-x 2 root root 4096 Aug 30 12:00 .\ndrwxr-xr-x 4 root root 4096 Aug 30 11:00 ..\n-rw-r--r-- 1 root root  128 Aug 30 11:30 classified.txt\n-rw-r--r-- 1 root root 1024 Aug 30 12:00 top_secret.enc\n-rwxr-xr-x 1 root root   42 Aug 30 11:15 .ghost_protocol';
        } else {
          output = 'home work writing gallery uses timeline classified.txt top_secret.enc';
        }
        break;
      case 'cat':
        if (args[1] === 'classified.txt') {
          output = '[FILE REDACTED // ACCESS RESTRICTED BY BUREAU COMMAND]';
        } else if (args[1] === 'top_secret.enc') {
          output = 'ERROR: Decryption key required. File is AES-256 encrypted.';
        } else if (args[1] === '.ghost_protocol') {
          output = <span style={{ color: 'rgba(232, 213, 181, 0.4)' }}>You found it. The Ghost Protocol is active. Trust no one.</span>;
        } else {
          output = `cat: ${args[1] || ''}: No such file or directory`;
        }
        break;
      case 'nmap':
        output = 'Starting Nmap 7.92 ( https://nmap.org )\nScanning localhost (127.0.0.1)\nPORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https\n31337/tcp open Elite\nNmap done: 1 IP address (1 host up) scanned in 0.04 seconds';
        break;
      case 'ping':
        output = 'PING 127.0.0.1 (127.0.0.1): 56 data bytes\n64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms\n64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.045 ms\n--- 127.0.0.1 ping statistics ---\n3 packets transmitted, 3 packets received, 0.0% packet loss';
        break;
      case 'neofetch':
        output = `
       \\         OS: BureauOS v1.0
        \\        Host: Mainframe-01
         \\       Kernel: 5.15.0-generic
          \\      Uptime: 42 days, 3 hours, 14 mins
           \\     Packages: 1337 (dpkg)
            \\    Shell: bash 5.1.16
       ____  \\   Terminal: Bureau-Term
      /    \\  \\  CPU: Quantum Core i9
     |      |  | RAM: 64TB / 128TB
      \\____/  /
           \\ /
            V
`;
        break;
      case 'matrix':
        output = 'Wake up, Neo...\nThe Matrix has you...\nFollow the white rabbit.';
        break;
      case 'ghost':
        output = <span style={{ color: 'rgba(232, 213, 181, 0.4)' }}>The phantom protocol is active. This text is invisible until selected.</span>;
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'hack':
        output = "That's... that's not how this works.";
        break;
      case 'sudo':
        if (rawCmd.includes('rm -rf /')) {
          output = 'Nice try. ACCESS DENIED. Incident logged.';
        } else if (args[1] === 'make' && args[2] === 'me' && args[3] === 'a' && args[4] === 'sandwich') {
          output = 'Okay.';
        } else {
          output = 'User is not in the sudoers file. This incident will be reported.';
        }
        break;
      case 'rm':
        if (args[1] === '-rf' && args[2] === '/') {
          output = 'Nice try. ACCESS DENIED. Incident logged.';
        } else {
          output = 'rm: permission denied';
        }
        break;
      case 'the':
        if (args[1] === 'cake' && args[2] === 'is' && args[3] === 'a' && args[4] === 'lie') {
          output = 'Aperture Science Enrichment Center confirms this statement.';
        } else {
          output = `Command not found: ${args[0]}`;
        }
        break;
      case 'do':
        if (args[1] === 'a' && args[2] === 'barrel' && args[3] === 'roll') {
          output = 'Executing barrel roll...';
          document.body.style.transition = 'transform 1s ease-in-out';
          document.body.style.transform = 'rotate(360deg)';
          setTimeout(() => {
            document.body.style.transition = 'none';
            document.body.style.transform = 'rotate(0deg)';
          }, 1000);
        } else {
          output = `Command not found: ${args[0]}`;
        }
        break;
      case 'exit':
        setIsOpen(false);
        return;
      default:
        output = `Command not found: ${args[0]}. Type "help" for a list of commands.`;
    }

    setHistory(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        command: rawCmd,
        output
      }
    ]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  // Keyboard navigation for history, tabs, and shortcuts
  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(cmdHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex < cmdHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.trim().toLowerCase();
      if (!current) return;
      const match = COMMAND_LIST.find(cmd => cmd.startsWith(current));
      if (match) {
        setInput(match);
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setHistory([]);
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setHistory(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          command: input,
          output: '^C'
        }
      ]);
      setInput('');
      setHistoryIndex(-1);
    }
  };

  // Click anywhere to focus input
  const handleContainerClick = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    inputRef.current?.focus();
  };

  const executeChip = (cmd) => {
    handleCommand(cmd);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="terminal-overlay-backdrop"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Main Terminal Overlay */}
      <section
        className={`terminal-overlay-container ${isMaximized ? 'is-maximized' : ''}`}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onClick={handleContainerClick}
        aria-label="Bureau Root Terminal"
      >
        {/* Pinned Top Bar */}
        <div className="terminal-header" data-lenis-prevent="true">
          <div className="terminal-title-group">
            {/* macOS / Unix traffic lights */}
            <div className="terminal-traffic-lights" aria-label="Terminal controls">
              <button
                type="button"
                className="terminal-light terminal-light-close"
                onClick={() => setIsOpen(false)}
                title="Close terminal (Esc)"
              />
              <button
                type="button"
                className="terminal-light terminal-light-minimize"
                onClick={() => setHistory([])}
                title="Clear screen (Ctrl+L)"
              />
              <button
                type="button"
                className="terminal-light terminal-light-maximize"
                onClick={() => setIsMaximized(prev => !prev)}
                title="Toggle maximize"
              />
            </div>

            <span className="terminal-title">BUREAU TERMINAL // ROOT</span>
          </div>

          {/* Quick command clickable chips */}
          <div className="terminal-quick-chips">
            {['whoami', 'help', 'skills', 'specs', 'garage', 'vault', 'clear'].map((chip) => (
              <button
                key={chip}
                type="button"
                className="terminal-chip"
                onClick={() => executeChip(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="terminal-actions">
            <button
              type="button"
              className="terminal-btn"
              onClick={() => setIsMaximized(prev => !prev)}
            >
              {isMaximized ? '[ ⛶ HALF ]' : '[ ⛶ FULL ]'}
            </button>
            <button
              type="button"
              className="terminal-btn terminal-btn-close"
              onClick={() => setIsOpen(false)}
            >
              [ ✕ CLOSE ]
            </button>
          </div>
        </div>

        {/* Scrollable Terminal Output Body */}
        <div
          ref={bodyRef}
          className="terminal-body"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {history.map((item) => (
            <div key={item.id || Math.random()} className="terminal-entry">
              {item.command && (
                <div className="terminal-line terminal-line-command">
                  <span className="terminal-prompt">root@bureau:~$</span>
                  <span>{item.command}</span>
                </div>
              )}
              {item.output && (
                <div className="terminal-line terminal-line-output">
                  {item.output}
                </div>
              )}
            </div>
          ))}

          {/* Active Command Input Line */}
          <form onSubmit={onSubmit} className="terminal-input-form">
            <label htmlFor="terminal-cli-input" className="terminal-prompt">
              root@bureau:~$
            </label>
            <div className="terminal-input-wrapper">
              <input
                id="terminal-cli-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="terminal-input"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Terminal command input"
              />
              <span className="terminal-blinking-cursor" aria-hidden="true" />
            </div>
          </form>

          {/* Anchor for auto-scrolling */}
          <div ref={bottomRef} style={{ height: '1px' }} />
        </div>

        {/* Bottom Status / Keyboard Hint Bar */}
        <div className="terminal-footer-hint">
          <div className="terminal-status-tag">
            <span className="terminal-status-dot" />
            <span>SESSION: ACTIVE // ROOT ENCRYPTED</span>
          </div>
          <div>
            <span>[ESC] Close • [↑/↓] History • [TAB] Complete • [CTRL+L] Clear</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default TerminalOverlay;
