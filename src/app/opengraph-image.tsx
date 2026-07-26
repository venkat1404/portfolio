import { ImageResponse } from "next/og";
import { hero } from "@/data/hero";
import { site } from "@/data/site";

export const alt = "Venkat Gollangi · Data Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default OG image for the site (home, projects listing, about, resume).
// Per-project case studies override this with their own opengraph-image.tsx.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0b",
          color: "#ededed",
          padding: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 20,
            color: "#9ca0a6",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#1a1b1f",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              borderRadius: 12,
              fontSize: 20,
              fontWeight: 600,
              color: "#ededed",
            }}
          >
            VG
          </div>
          {site.name}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {hero.headline}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#9ca0a6",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            Data Engineer · UMD Smith (MS Info Systems, GPA 3.95) · Available Fall 2026 & Jan 2027
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
