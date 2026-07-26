// Architecture diagram for the Short-Term Rental Quality Classification project.
export function RentalPipelineDiagram() {
  return (
    <svg
      viewBox="0 0 720 520"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto block w-full max-w-[720px] text-foreground"
      aria-labelledby="rental-pipeline-title rental-pipeline-desc"
      role="img"
    >
      <title id="rental-pipeline-title">
        Short-term rental quality classification pipeline
      </title>
      <desc id="rental-pipeline-desc">
        A four-stage pipeline: raw CSVs feed feature engineering, then a
        preprocessing pipeline, then nested cross-validation across six model
        families, ending in the tuned LightGBM winner.
      </desc>

      <defs>
        <marker
          id="arrow-r"
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

      {/* Source */}
      <g>
        <rect
          x="240"
          y="20"
          width="240"
          height="56"
          rx="10"
          fill="var(--bg-surface-elevated)"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
        <text
          x="360"
          y="44"
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
          y="62"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="13"
          fill="currentColor"
        >
          airbnb_train_x_2026.csv · train_y · test_x
        </text>
      </g>

      <line x1="360" y1="76" x2="360" y2="106" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#arrow-r)" />

      {/* Feature engineering */}
      <g>
        <rect
          x="120"
          y="106"
          width="480"
          height="120"
          rx="10"
          fill="var(--accent-soft)"
          stroke="var(--accent)"
          strokeOpacity="0.5"
        />
        <text
          x="140"
          y="130"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="var(--accent)"
          letterSpacing="1.5"
        >
          FEATURE ENGINEERING · 100+ FEATURES
        </text>
        <text
          x="140"
          y="152"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fill="currentColor"
          fillOpacity="0.85"
        >
          log(price) · price_per_person · 15 amenity flags · presence flags
        </text>
        <text
          x="140"
          y="170"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fill="currentColor"
          fillOpacity="0.85"
        >
          host_tenure_days · days_since_last_review · interaction terms
        </text>
        <text
          x="140"
          y="188"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fill="currentColor"
          fillOpacity="0.85"
        >
          TF-IDF × 3 text cols · TruncatedSVD → 25 comps · target encoding
        </text>
        <text
          x="140"
          y="206"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fill="currentColor"
          fillOpacity="0.85"
        >
          KMeans cluster labels · external cost-of-living index
        </text>
      </g>

      <line x1="360" y1="226" x2="360" y2="256" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#arrow-r)" />

      {/* Nested CV */}
      <g>
        <rect
          x="140"
          y="256"
          width="440"
          height="60"
          rx="10"
          fill="var(--bg-surface-elevated)"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
        <text
          x="360"
          y="280"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="13"
          fill="currentColor"
        >
          Nested holdout · 20% outer · 5-fold inner CV
        </text>
        <text
          x="360"
          y="298"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="currentColor"
          fillOpacity="0.6"
        >
          AUC-focused tuning · 3 rounds early stopping
        </text>
      </g>

      <line x1="360" y1="316" x2="360" y2="346" stroke="currentColor" strokeOpacity="0.4" markerEnd="url(#arrow-r)" />

      {/* Model bake-off */}
      <g>
        {[
          { x: 60, label: "LightGBM", winner: true },
          { x: 160, label: "Bagging" },
          { x: 260, label: "RF" },
          { x: 340, label: "GBM" },
          { x: 420, label: "LogReg" },
          { x: 520, label: "KNN" },
        ].map((m) => (
          <g key={m.label}>
            <rect
              x={m.x + 40}
              y="346"
              width="90"
              height="40"
              rx="8"
              fill={m.winner ? "var(--accent)" : "var(--bg-surface-elevated)"}
              stroke={m.winner ? "var(--accent)" : "currentColor"}
              strokeOpacity={m.winner ? "1" : "0.25"}
            />
            <text
              x={m.x + 85}
              y="371"
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontSize="12"
              fontWeight={m.winner ? "600" : "400"}
              fill={m.winner ? "var(--accent-contrast)" : "currentColor"}
            >
              {m.label}
            </text>
          </g>
        ))}
      </g>

      <line x1="145" y1="386" x2="145" y2="416" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-r)" />

      {/* Result */}
      <g>
        <rect
          x="100"
          y="416"
          width="520"
          height="80"
          rx="10"
          fill="var(--bg-surface-elevated)"
          stroke="var(--accent)"
          strokeOpacity="0.5"
        />
        <text
          x="360"
          y="446"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="12"
          fill="var(--accent)"
          letterSpacing="1.5"
        >
          RESULT
        </text>
        <text
          x="360"
          y="472"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="22"
          fontWeight="500"
          fill="currentColor"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          AUC 0.8214 · 8th of 35 teams
        </text>
      </g>
    </svg>
  );
}
