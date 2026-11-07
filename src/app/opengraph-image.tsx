import { ImageResponse } from "next/og";
export const alt = "Ali Abnar — Software & Product Engineer";
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
        Ali Abnar / Selected work & engineering notes
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 64,
          fontWeight: 600,
          letterSpacing: -3,
        }}
      >
        Software. Product. Applied AI.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 26,
          color: "#64748b",
          marginTop: 30,
        }}
      >
        Thoughtful interfaces. Useful systems. Inspectable evidence.
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
