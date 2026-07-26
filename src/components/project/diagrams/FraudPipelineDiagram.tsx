// Architecture diagram for the Healthcare Insurance Fraud Detection project.
export function FraudPipelineDiagram() {
  return (
    <svg
      viewBox="0 0 720 620"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto block w-full max-w-[720px] text-foreground"
      aria-labelledby="fraud-pipeline-title fraud-pipeline-desc"
      role="img"
    >
      <title id="fraud-pipeline-title">
        Healthcare fraud detection system architecture
      </title>
      <desc id="fraud-pipeline-desc">
        Four data sources merge into a provider view, feed a model bake-off,
        route through a 5-tier decision engine, and land in a 6-page Streamlit
        command center.
      </desc>

      <defs>
        <marker
          id="arrow-f"
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

      {/* Four data sources */}
      <g>
        {[
          { x: 20, label: "Beneficiary" },
          { x: 190, label: "Inpatient claims" },
          { x: 360, label: "Outpatient claims" },
          { x: 530, label: "Provider labels" },
        ].map((s) => (
          <g key={s.label}>
            <rect
              x={s.x}
              y="20"
              width="170"
              height="50"
              rx="8"
              fill="var(--bg-surface-elevated)"
              stroke="currentColor"
              strokeOpacity="0.25"
            />
            <text
              x={s.x + 85}
              y="50"
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontSize="12"
              fill="currentColor"
            >
              {s.label}
            </text>
          </g>
        ))}
      </g>

      {[105, 275, 445, 615].map((x) => (
        <line
          key={x}
          x1={x}
          y1="70"
          x2="360"
          y2="110"
          stroke="currentColor"
          strokeOpacity="0.3"
        />
      ))}

      {/* Merge */}
      <g>
        <rect
          x="200"
          y="110"
          width="320"
          height="50"
          rx="10"
          fill="var(--bg-surface-elevated)"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
        <text
          x="360"
          y="140"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="13"
          fill="currentColor"
        >
          Merge on BeneID + Provider → provider-level view
        </text>
      </g>

      <line x1="360" y1="160" x2="360" y2="190" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#arrow-f)" />

      {/* Feature engineering */}
      <g>
        <rect
          x="140"
          y="190"
          width="440"
          height="70"
          rx="10"
          fill="var(--accent-soft)"
          stroke="var(--accent)"
          strokeOpacity="0.5"
        />
        <text
          x="160"
          y="214"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="var(--accent)"
          letterSpacing="1.5"
        >
          PROVIDER-LEVEL FEATURES · 15+
        </text>
        <text
          x="160"
          y="234"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fill="currentColor"
          fillOpacity="0.85"
        >
          claim counts · avg reimbursed · unique beneficiaries + physicians
        </text>
        <text
          x="160"
          y="250"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fill="currentColor"
          fillOpacity="0.85"
        >
          avg patient age · chronic condition count · diagnosis code diversity
        </text>
      </g>

      <line x1="360" y1="260" x2="360" y2="290" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#arrow-f)" />

      {/* Model bake-off */}
      <g>
        {[
          { x: 100, label: "LogReg", auc: "0.951", winner: true },
          { x: 300, label: "Random Forest", auc: "" },
          { x: 490, label: "XGBoost / fallback", auc: "" },
        ].map((m) => (
          <g key={m.label}>
            <rect
              x={m.x}
              y="290"
              width="150"
              height="60"
              rx="8"
              fill={m.winner ? "var(--accent)" : "var(--bg-surface-elevated)"}
              stroke={m.winner ? "var(--accent)" : "currentColor"}
              strokeOpacity={m.winner ? "1" : "0.25"}
            />
            <text
              x={m.x + 75}
              y="315"
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontSize="12"
              fontWeight={m.winner ? "600" : "400"}
              fill={m.winner ? "var(--accent-contrast)" : "currentColor"}
            >
              {m.label}
            </text>
            {m.auc && (
              <text
                x={m.x + 75}
                y="335"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fill="var(--accent-contrast)"
                fillOpacity="0.9"
              >
                ROC-AUC {m.auc}
              </text>
            )}
          </g>
        ))}
      </g>

      <line x1="175" y1="350" x2="175" y2="380" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-f)" />

      {/* Decision engine */}
      <g>
        <rect
          x="60"
          y="380"
          width="600"
          height="130"
          rx="10"
          fill="var(--bg-surface-elevated)"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
        <text
          x="80"
          y="406"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.55"
          letterSpacing="1.5"
        >
          5-TIER DECISION AUTOMATION ENGINE
        </text>
        <g>
          {[
            { x: 80, label: "0.00–0.30", action: "Auto approve", tone: "success" },
            { x: 220, label: "0.30–0.70", action: "Human review", tone: "warning" },
            { x: 360, label: "0.70–1.00", action: "Investigate", tone: "warning" },
            { x: 500, label: "Any ≥ $10k", action: "Mandatory review", tone: "warning" },
          ].map((t) => (
            <g key={t.label}>
              <rect
                x={t.x}
                y="418"
                width="130"
                height="70"
                rx="6"
                fill={t.tone === "success" ? "var(--success-soft)" : "var(--warning-soft)"}
                stroke={t.tone === "success" ? "var(--success)" : "var(--warning)"}
                strokeOpacity="0.4"
              />
              <text
                x={t.x + 65}
                y="442"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="11"
                fill={t.tone === "success" ? "var(--success)" : "var(--warning)"}
              >
                {t.label}
              </text>
              <text
                x={t.x + 65}
                y="462"
                textAnchor="middle"
                fontFamily="var(--font-sans)"
                fontSize="12"
                fontWeight="500"
                fill="currentColor"
              >
                {t.action}
              </text>
            </g>
          ))}
        </g>
      </g>

      <line x1="360" y1="510" x2="360" y2="540" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#arrow-f)" />

      {/* Streamlit */}
      <g>
        <rect
          x="140"
          y="540"
          width="440"
          height="56"
          rx="10"
          fill="var(--bg-surface-elevated)"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
        <text
          x="360"
          y="565"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="13"
          fill="currentColor"
        >
          6-page Streamlit command center
        </text>
        <text
          x="360"
          y="584"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.55"
        >
          batch · threshold · case review · impact · responsible AI
        </text>
      </g>
    </svg>
  );
}
