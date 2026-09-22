import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2A2326",
          color: "#D2938C",
          fontSize: 36,
          fontFamily: "serif",
        }}
      >
        K
      </div>
    ),
    { ...size }
  );
}
