import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Statically generate one OG image per slug, in step with the parent route's
// generateStaticParams (see [slug]/page.tsx).
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return new ImageResponse(<div>Not found</div>, size);
  }

  const topMetric = project.metrics[0];

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
          {site.name} · Case study
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {project.title}
          </div>
          {topMetric && (
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 20,
                fontFamily: "monospace",
              }}
            >
              <span
                style={{
                  fontSize: 44,
                  color: "#4dabff",
                  fontWeight: 500,
                }}
              >
                {topMetric.value}
              </span>
              <span
                style={{
                  fontSize: 22,
                  color: "#9ca0a6",
                }}
              >
                {topMetric.label}
              </span>
            </div>
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
