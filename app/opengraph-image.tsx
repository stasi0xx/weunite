import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WeUnite — Strony internetowe i marketing dla domków letniskowych";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
          fontFamily: "sans-serif",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Accent blob */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,90,31,0.3) 0%, transparent 70%)",
          }}
        />

        {/* Logo / brand */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          WeUnite
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          Strona internetowa dla Twojego domku letniskowego
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: "26px",
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: "700px",
            marginBottom: "48px",
          }}
        >
          System rezerwacji online · Social media · Automatyzacje
        </div>

        {/* CTA badge */}
        <div
          style={{
            background: "#ff5a1f",
            color: "#ffffff",
            fontSize: "20px",
            fontWeight: 700,
            padding: "14px 36px",
            borderRadius: "50px",
          }}
        >
          Bezpłatna konsultacja i wizualizacja
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            right: "80px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          weunite.pl
        </div>
      </div>
    ),
    { ...size }
  );
}
