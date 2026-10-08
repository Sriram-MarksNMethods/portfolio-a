import { ImageResponse } from "next/og";

// Home-screen icon for iPhones/iPads: the same folder as the favicon, on the paper colour.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f1ee" }}>
        <svg width="132" height="132" viewBox="0 0 32 32">
          <path d="M2 8.5Q2 5 5.5 5H12l3.2 4H26.5Q30 9 30 12.5V25.5Q30 29 26.5 29H5.5Q2 29 2 25.5Z" fill="#8a3a4b" />
          <path d="M7 24C10.5 23.6 12.5 21.5 15.5 20.5S21 16.5 24.5 13" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="24.5" cy="13" r="2.4" fill="#fff" />
        </svg>
      </div>
    ),
    size,
  );
}
