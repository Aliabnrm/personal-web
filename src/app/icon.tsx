import { ImageResponse } from "next/og";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#2563eb",
        width: 32,
        height: 32,
        borderRadius: 6,
        color: "white",
        fontSize: 15,
        fontWeight: 700,
      }}
    >
      aa
    </div>,
    size,
  );
}
