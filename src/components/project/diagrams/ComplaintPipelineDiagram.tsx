// Architecture diagram for the CFPB Financial Complaint Resolution System.
// SVG uses `currentColor` for strokes/text so light + dark themes work.
export function ComplaintPipelineDiagram() {
  return (
    <svg
      viewBox="0 0 720 540"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto block w-full max-w-[720px] text-foreground"
      aria-labelledby="complaint-pipeline-title complaint-pipeline-desc"
      role="img"
    >
      <title id="complaint-pipeline-title">
        Financial Complaint Resolution System architecture
      </title>
      <desc id="complaint-pipeline-desc">
        A four-stage pipeline: CSV preprocessing feeds three sequential Claude
        agents, ending in a Streamlit dashboard.
      </desc>

      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>

      {/* Source dataset */}
      <g>
        <rect
          x="240"
          y="20"
          width="240"
          height="60"
          rx="10"
          fill="var(--bg-surface-elevated)"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
        <text
          x="360"
          y="46"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.55"
          letterSpacing="1.5"
        >
          SOURCE
        </text>
        <text
          x="360"
          y="66"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="13"
          fill="currentColor"
        >
          49,332 CFPB complaints (with narratives)
        </text>
      </g>

      <line x1="360" y1="80" x2="360" y2="110" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#arrow)" />

      {/* Preprocess */}
      <g>
        <rect
          x="200"
          y="110"
          width="320"
          height="56"
          rx="10"
          fill="var(--bg-surface-elevated)"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
        <text
          x="360"
          y="134"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="13"
          fill="currentColor"
        >
          Stratified 1% sample · sentence-boundary truncation
        </text>
        <text
          x="360"
          y="152"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.5"
        >
          ~500 complaints
        </text>
      </g>

      <line x1="360" y1="166" x2="360" y2="196" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#arrow)" />

      {/* Agent 1 */}
      <g>
        <rect
          x="140"
          y="196"
          width="440"
          height="70"
          rx="10"
          fill="var(--accent-soft)"
          stroke="var(--accent)"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <text
          x="160"
          y="220"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="var(--accent)"
          letterSpacing="1.5"
        >
          AGENT 1 · CLAUDE HAIKU
        </text>
        <text
          x="160"
          y="240"
          fontFamily="var(--font-sans)"
          fontSize="14"
          fontWeight="500"
          fill="currentColor"
        >
          Classifier
        </text>
        <text
          x="160"
          y="256"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fill="currentColor"
          fillOpacity="0.7"
        >
          product · issue · severity 1–5 · compliance risk flag
        </text>
      </g>

      <line x1="360" y1="266" x2="360" y2="296" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#arrow)" />
      <text x="370" y="284" fontFamily="var(--font-mono)" fontSize="10" fill="currentColor" fillOpacity="0.5">JSON</text>

      {/* Agent 2 */}
      <g>
        <rect
          x="140"
          y="296"
          width="440"
          height="70"
          rx="10"
          fill="var(--accent-soft)"
          stroke="var(--accent)"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <text
          x="160"
          y="320"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="var(--accent)"
          letterSpacing="1.5"
        >
          AGENT 2 · CLAUDE SONNET
        </text>
        <text
          x="160"
          y="340"
          fontFamily="var(--font-sans)"
          fontSize="14"
          fontWeight="500"
          fill="currentColor"
        >
          Root cause + router
        </text>
        <text
          x="160"
          y="356"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fill="currentColor"
          fillOpacity="0.7"
        >
          fraud · billing · servicing · operations
        </text>
      </g>

      <line x1="360" y1="366" x2="360" y2="396" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#arrow)" />
      <text x="370" y="384" fontFamily="var(--font-mono)" fontSize="10" fill="currentColor" fillOpacity="0.5">JSON</text>

      {/* Agent 3 */}
      <g>
        <rect
          x="140"
          y="396"
          width="440"
          height="70"
          rx="10"
          fill="var(--accent-soft)"
          stroke="var(--accent)"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <text
          x="160"
          y="420"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="var(--accent)"
          letterSpacing="1.5"
        >
          AGENT 3 · CLAUDE SONNET
        </text>
        <text
          x="160"
          y="440"
          fontFamily="var(--font-sans)"
          fontSize="14"
          fontWeight="500"
          fill="currentColor"
        >
          Resolution planner
        </text>
        <text
          x="160"
          y="456"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fill="currentColor"
          fillOpacity="0.7"
        >
          remediation steps · letter citing FCRA / GLBA / Reg Z
        </text>
      </g>

      <line x1="360" y1="466" x2="360" y2="496" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#arrow)" />

      {/* Delivery */}
      <g>
        <rect
          x="200"
          y="496"
          width="320"
          height="40"
          rx="10"
          fill="var(--bg-surface-elevated)"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
        <text
          x="360"
          y="521"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="13"
          fill="currentColor"
        >
          Streamlit dashboard · batch view · patterns · single case
        </text>
      </g>
    </svg>
  );
}
