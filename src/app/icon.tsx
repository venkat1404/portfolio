import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// VG monogram favicon. Generated at build time; matches the nav brand mark.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0b",
          color: "#ededed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 12,
        }}
      >
        VG
      </div>
    ),
    { ...size },
  );
}
