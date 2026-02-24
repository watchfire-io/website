const features = [
  {
    title: "Task Orchestration",
    description:
      "Define tasks in YAML, let agents execute them. The daemon watches task files for changes — when an agent marks a task as done, Watchfire automatically stops the session and chains to the next task.",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        {/* Task cards */}
        <rect x="40" y="30" width="140" height="40" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
        <rect x="52" y="42" width="60" height="4" rx="2" fill="#a855f7" opacity="0.6" />
        <rect x="52" y="52" width="100" height="3" rx="1.5" fill="#52525b" />
        <circle cx="160" cy="50" r="8" fill="#22c55e" opacity="0.2" />
        <polyline points="156,50 159,53 164,47" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        <rect x="40" y="85" width="140" height="40" rx="8" fill="#27272a" stroke="#a855f7" strokeWidth="1" opacity="0.9" />
        <rect x="52" y="97" width="50" height="4" rx="2" fill="#a855f7" opacity="0.8" />
        <rect x="52" y="107" width="90" height="3" rx="1.5" fill="#52525b" />
        <circle cx="160" cy="105" r="8" fill="#a855f7" opacity="0.2" />
        <rect x="157" y="102" width="6" height="6" rx="1" fill="none" stroke="#a855f7" strokeWidth="1.5" />

        <rect x="40" y="140" width="140" height="40" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="1" opacity="0.5" />
        <rect x="52" y="152" width="70" height="4" rx="2" fill="#52525b" />
        <rect x="52" y="162" width="80" height="3" rx="1.5" fill="#3f3f46" />

        {/* Arrow flow */}
        <path d="M200 105 L240 105" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
        <polygon points="240,101 248,105 240,109" fill="#a855f7" opacity="0.5" />

        {/* Agent terminal */}
        <rect x="260" y="60" width="120" height="90" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
        <circle cx="274" cy="74" r="3" fill="#ef4444" opacity="0.6" />
        <circle cx="284" cy="74" r="3" fill="#eab308" opacity="0.6" />
        <circle cx="294" cy="74" r="3" fill="#22c55e" opacity="0.6" />
        <rect x="272" y="88" width="40" height="3" rx="1.5" fill="#a855f7" opacity="0.4" />
        <rect x="272" y="97" width="80" height="3" rx="1.5" fill="#52525b" />
        <rect x="272" y="106" width="60" height="3" rx="1.5" fill="#52525b" />
        <rect x="272" y="115" width="70" height="3" rx="1.5" fill="#52525b" />
        <rect x="272" y="127" width="8" height="10" rx="1" fill="#a855f7" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.2s" repeatCount="indefinite" />
        </rect>
      </svg>
    ),
  },
  {
    title: "Git Worktree Isolation",
    description:
      "Every task runs in its own git worktree on a dedicated branch. Agents work in parallel without stepping on each other. Completed work is automatically merged back to your default branch.",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        {/* Main branch */}
        <line x1="60" y1="140" x2="340" y2="140" stroke="#3f3f46" strokeWidth="2" />
        <circle cx="80" cy="140" r="6" fill="#a855f7" />
        <circle cx="320" cy="140" r="6" fill="#a855f7" />

        {/* Branch 1 - top */}
        <path d="M120 140 C140 140 140 70 160 70" stroke="#22c55e" strokeWidth="1.5" fill="none" />
        <line x1="160" y1="70" x2="260" y2="70" stroke="#22c55e" strokeWidth="1.5" />
        <path d="M260 70 C280 70 280 140 300 140" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
        <circle cx="160" cy="70" r="4" fill="#22c55e" />
        <circle cx="210" cy="70" r="4" fill="#22c55e" />
        <circle cx="260" cy="70" r="4" fill="#22c55e" />
        <text x="165" y="55" fill="#22c55e" fontSize="10" fontFamily="monospace" opacity="0.8">watchfire/001</text>

        {/* Branch 2 - bottom */}
        <path d="M140 140 C160 140 160 210 180 210" stroke="#eab308" strokeWidth="1.5" fill="none" />
        <line x1="180" y1="210" x2="250" y2="210" stroke="#eab308" strokeWidth="1.5" />
        <circle cx="180" cy="210" r="4" fill="#eab308" />
        <circle cx="215" cy="210" r="4" fill="#eab308" />
        <circle cx="250" cy="210" r="4" fill="#eab308">
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="185" y="235" fill="#eab308" fontSize="10" fontFamily="monospace" opacity="0.8">watchfire/002</text>

        {/* Merge arrow */}
        <text x="285" y="125" fill="#52525b" fontSize="9" fontFamily="monospace">merged</text>
      </svg>
    ),
  },
  {
    title: "Sandboxed Execution",
    description:
      "Agents run inside macOS sandbox-exec with restricted permissions. Credentials, sensitive directories, and git hooks are blocked. Full network access and installed tools remain available.",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        {/* Shield outline */}
        <path d="M200 40 L280 75 L280 160 C280 210 200 250 200 250 C200 250 120 210 120 160 L120 75 Z" fill="#a855f7" opacity="0.1" stroke="#a855f7" strokeWidth="1.5" />

        {/* Inner shield */}
        <path d="M200 70 L255 95 L255 155 C255 190 200 220 200 220 C200 220 145 190 145 155 L145 95 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />

        {/* Checkmarks - allowed */}
        <g transform="translate(165, 110)">
          <circle r="10" fill="#22c55e" opacity="0.15" />
          <polyline points="-4,0 -1,3 5,-3" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
        <text x="185" y="114" fill="#a1a1aa" fontSize="10" fontFamily="monospace">filesystem</text>

        <g transform="translate(165, 140)">
          <circle r="10" fill="#22c55e" opacity="0.15" />
          <polyline points="-4,0 -1,3 5,-3" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
        <text x="185" y="144" fill="#a1a1aa" fontSize="10" fontFamily="monospace">network</text>

        <g transform="translate(165, 170)">
          <circle r="10" fill="#ef4444" opacity="0.15" />
          <line x1="-4" y1="-4" x2="4" y2="4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4" y1="-4" x2="-4" y2="4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <text x="185" y="174" fill="#a1a1aa" fontSize="10" fontFamily="monospace">~/.ssh, ~/.aws</text>

        <g transform="translate(165, 200)">
          <circle r="10" fill="#ef4444" opacity="0.15" />
          <line x1="-4" y1="-4" x2="4" y2="4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4" y1="-4" x2="-4" y2="4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <text x="185" y="204" fill="#a1a1aa" fontSize="10" fontFamily="monospace">.git/hooks</text>
      </svg>
    ),
  },
  {
    title: "Multi-Project Management",
    description:
      "Run multiple projects in parallel from a single daemon. The system tray gives you a bird's-eye view, and each project maintains its own task queue, worktrees, and agent sessions.",
    illustration: (
      <svg viewBox="0 0 400 280" fill="none" className="h-full w-full">
        {/* Central daemon */}
        <rect x="155" y="110" width="90" height="60" rx="10" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
        <text x="172" y="137" fill="#a855f7" fontSize="10" fontFamily="monospace">watchfired</text>
        <text x="183" y="155" fill="#52525b" fontSize="9" fontFamily="monospace">daemon</text>

        {/* Project 1 - top left */}
        <rect x="30" y="30" width="100" height="50" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
        <rect x="42" y="42" width="40" height="4" rx="2" fill="#22c55e" opacity="0.6" />
        <rect x="42" y="52" width="70" height="3" rx="1.5" fill="#52525b" />
        <rect x="42" y="61" width="55" height="3" rx="1.5" fill="#3f3f46" />
        <line x1="100" y1="80" x2="175" y2="110" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 3" />

        {/* Project 2 - top right */}
        <rect x="270" y="30" width="100" height="50" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
        <rect x="282" y="42" width="50" height="4" rx="2" fill="#eab308" opacity="0.6" />
        <rect x="282" y="52" width="65" height="3" rx="1.5" fill="#52525b" />
        <rect x="282" y="61" width="45" height="3" rx="1.5" fill="#3f3f46" />
        <line x1="300" y1="80" x2="225" y2="110" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 3" />

        {/* Project 3 - bottom left */}
        <rect x="30" y="200" width="100" height="50" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
        <rect x="42" y="212" width="45" height="4" rx="2" fill="#3b82f6" opacity="0.6" />
        <rect x="42" y="222" width="75" height="3" rx="1.5" fill="#52525b" />
        <rect x="42" y="231" width="50" height="3" rx="1.5" fill="#3f3f46" />
        <line x1="100" y1="200" x2="175" y2="170" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 3" />

        {/* Project 4 - bottom right */}
        <rect x="270" y="200" width="100" height="50" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
        <rect x="282" y="212" width="55" height="4" rx="2" fill="#ef4444" opacity="0.6" />
        <rect x="282" y="222" width="60" height="3" rx="1.5" fill="#52525b" />
        <rect x="282" y="231" width="70" height="3" rx="1.5" fill="#3f3f46" />
        <line x1="300" y1="200" x2="225" y2="170" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 3" />

        {/* Pulse on daemon */}
        <circle cx="200" cy="140" r="35" fill="none" stroke="#a855f7" strokeWidth="0.5" opacity="0.3">
          <animate attributeName="r" values="35;50;35" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
  },
];

export default function KeyFeatures() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Key Features
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-zinc-400">
          Built for real-world agent workflows
        </p>

        <div className="mt-16 space-y-24">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`flex flex-col items-center gap-12 lg:flex-row ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>
              <div className="w-full max-w-md flex-1 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                {feature.illustration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
