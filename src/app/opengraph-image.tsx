import { ImageResponse } from "next/og";
export const alt = "AI Notebook — Learn, connect, return.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#ffffff",
        color: "#0f172a",
        padding: 90,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#2563eb",
          marginBottom: 40,
        }}
      >
        AI Notebook / Ali Abnar
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          fontWeight: 600,
          letterSpacing: -3,
        }}
      >
        Learn, connect, return.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 26,
          color: "#64748b",
          marginTop: 30,
        }}
      >
        A personal notebook on AI, learning, and building.
      </div>
      <div
        style={{
          display: "flex",
          width: 100,
          height: 5,
          background: "#2563eb",
          marginTop: 60,
        }}
      />
    </div>,
    size,
  );
}
