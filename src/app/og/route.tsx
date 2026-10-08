import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { stegaClean } from "next-sanity";
import { getHome, getSettings } from "@/sanity/content";

// The share image (1200 × 630) shown when a page is posted on LinkedIn, WhatsApp, X…
// /og                                  → home: the folder cover with "port / folio"
// /og?title=…&label=Case%20study       → a page: its title on the folder
// A share image uploaded in the dashboard replaces this for that page (see src/lib/seo.ts).

const maroon = "#8a3a4b";
const maroonDark = "#6f2c3b";
const paper = "#f3f1ee";
const rose = "#ead6db";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const title = params.get("title")?.slice(0, 120);
  const label = params.get("label")?.slice(0, 30);

  const [anton, settings, home] = await Promise.all([readFile(join(process.cwd(), "assets/Anton-Regular.ttf")), getSettings(), getHome()]);
  const hero = home.sections.find((s) => s._type === "heroSection");
  const ticker = home.sections.find((s) => s._type === "tickerSection");
  const words = (ticker?._type === "tickerSection" ? ticker.items : undefined) ?? [];
  const name = stegaClean(settings.name);
  const role = stegaClean(settings.role);
  const tab = label ? label.toUpperCase() : stegaClean(hero?._type === "heroSection" ? hero.year : undefined) || "PORTFOLIO";
  const word1 = stegaClean(hero?._type === "heroSection" ? hero.bigWord1 : undefined) || "port";
  const word2 = stegaClean(hero?._type === "heroSection" ? hero.bigWord2 : undefined) || "folio";
  const titleSize = !title ? 0 : title.length > 60 ? 58 : title.length > 28 ? 72 : 96;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: paper, position: "relative" }}>
        {/* folder shape: tab + body */}
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          <path d="M48 66 Q48 36 78 36 L318 36 L370 92 L1118 92 Q1152 92 1152 126 L1152 560 L48 560 Z" fill={maroon} />
          {/* rising growth line, like the cover card */}
          <path d="M640 470 C720 466 760 474 820 450 S930 430 980 400 S1060 350 1100 300 S1130 250 1140 238" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="5" strokeLinecap="round" />
          <circle cx="1140" cy="238" r="9" fill="#ffffff" />
        </svg>

        <div style={{ position: "absolute", top: 46, left: 82, display: "flex", fontFamily: "Anton", fontSize: 30, letterSpacing: 2, color: "#ffffff" }}>{tab}</div>

        {/* "position #1" label */}
        <div
          style={{
            position: "absolute",
            top: 150,
            right: 84,
            display: "flex",
            background: "#161314",
            color: "#ffffff",
            fontSize: 22,
            padding: "10px 18px",
            borderRadius: 12,
            transform: "rotate(-3deg)",
          }}
        >
          position #1
        </div>

        <div style={{ position: "absolute", top: 130, left: 92, right: 300, display: "flex", flexDirection: "column", color: "#ffffff" }}>
          <div style={{ fontSize: 30, fontWeight: 700, display: "flex" }}>{label ? name : role}</div>
          {title ? (
            <div style={{ marginTop: 24, fontFamily: "Anton", fontSize: titleSize, lineHeight: 1.05, display: "flex" }}>{title}</div>
          ) : (
            <div style={{ marginTop: 6, display: "flex", flexDirection: "column", fontFamily: "Anton", fontSize: 168, lineHeight: 0.92, letterSpacing: -2 }}>
              <span style={{ color: "#ffffff" }}>{word1}</span>
              <span style={{ color: rose, paddingLeft: 90 }}>{word2}</span>
            </div>
          )}
        </div>

        <div style={{ position: "absolute", left: 92, bottom: 100, display: "flex", gap: 18, alignItems: "center", color: "#ffffff", fontSize: 26 }}>
          {label ? <span>{role}</span> : <span style={{ fontWeight: 700 }}>{name}</span>}
        </div>

        {/* ticker band */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 70,
            background: maroonDark,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            paddingLeft: 40,
            fontFamily: "Anton",
            fontSize: 30,
            letterSpacing: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {[...words, ...words].map((word, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div style={{ display: "flex" }}>{stegaClean(word).toUpperCase()}</div>
              {/* small diamond between the words (the ✦ character isn't in the font) */}
              <div style={{ display: "flex", width: 12, height: 12, background: rose, transform: "rotate(45deg)", margin: "0 26px" }} />
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Anton", data: anton, weight: 400, style: "normal" }],
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" },
    },
  );
}
