import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
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
          background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #7C3AED 100%)",
          borderRadius: "8px",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 7C9 5.89543 9.89543 5 11 5H21L27 11V29C27 30.1046 26.1046 31 25 31H11C9.89543 31 9 30.1046 9 29V7Z"
            fill="rgba(255,255,255,0.2)"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M21 5V11H27"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(255,255,255,0.4)"
          />
          <line
            x1="13.5"
            y1="15.5"
            x2="19.5"
            y2="15.5"
            stroke="#93C5FD"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <line
            x1="13.5"
            y1="20.5"
            x2="22.5"
            y2="20.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="13.5"
            y1="25.5"
            x2="18.5"
            y2="25.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}

