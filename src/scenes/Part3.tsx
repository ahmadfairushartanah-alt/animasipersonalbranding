import React from "react";
import { AbsoluteFill, interpolate, Img, staticFile, useCurrentFrame } from "remotion";
import { BRAND, CAPTIONS, CTA, PROFILE, STATS, TESTIMONIAL } from "../content";
import { Background, BODY, Caption, Glow, HEAD, PlaceholderTag, useIn, useLayout, useOut } from "../components/core";
import { Avatar } from "../components/Avatar";

type CaptionProp = { captions?: string[] };

// ---------------------------------------------------------------------
// SCENE 9 — STATISTIK (counter)
// ---------------------------------------------------------------------
export const StatsScene: React.FC<CaptionProp> = ({ captions = CAPTIONS.stats }) => {
  const frame = useCurrentFrame();
  const { s, vertical } = useLayout();
  const out = useOut(8);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Background tint={BRAND.gold} />
      <PlaceholderTag show={STATS.placeholder} />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: vertical ? "column" : "row",
          gap: (vertical ? 50 : 70) * s,
          paddingBottom: 60 * s,
        }}
      >
        {STATS.items.map((st, i) => {
          const start = 6 + i * 10;
          const v = useIn(start, 12);
          const n = Math.round(
            interpolate(frame, [start, start + 45], [0, st.value], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: (t) => 1 - Math.pow(1 - t, 3),
            }),
          );
          return (
            <div
              key={st.label}
              style={{
                width: (vertical ? 720 : 480) * s,
                padding: `${40 * s}px ${30 * s}px`,
                borderRadius: 30 * s,
                textAlign: "center",
                background: "rgba(255,255,255,0.05)",
                border: `2px solid rgba(245,183,0,0.5)`,
                transform: `scale(${v})`,
                opacity: v,
              }}
            >
              <div style={{ fontFamily: HEAD, fontWeight: 900, fontSize: 120 * s, color: BRAND.gold, lineHeight: 1 }}>
                {n.toLocaleString("en-US")}
                {st.suffix}
              </div>
              <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 38 * s, color: BRAND.white, marginTop: 14 * s }}>
                {st.label}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
      <Caption lines={captions} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------
// SCENE 10 — TESTIMONI
// ---------------------------------------------------------------------
export const TestimonialScene: React.FC<CaptionProp> = ({ captions = CAPTIONS.testimonial }) => {
  const frame = useCurrentFrame();
  const { s, vertical } = useLayout();
  const card = useIn(0, 13);
  const out = useOut(8);
  const words = TESTIMONIAL.quote.split(" ");
  const shownWords = Math.floor(interpolate(frame, [10, 10 + words.length * 2.2], [0, words.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Background />
      <PlaceholderTag show={TESTIMONIAL.placeholder} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 80 * s }}>
        <div
          style={{
            width: (vertical ? 900 : 1300) * s,
            padding: `${60 * s}px ${70 * s}px`,
            borderRadius: 36 * s,
            background: "linear-gradient(135deg, rgba(34,211,238,0.12), rgba(255,255,255,0.03))",
            border: `2px solid rgba(34,211,238,0.45)`,
            transform: `scale(${card})`,
            opacity: card,
          }}
        >
          <div style={{ fontFamily: HEAD, fontWeight: 900, fontSize: 160 * s, color: BRAND.gold, lineHeight: 0.6 }}>“</div>
          <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: (vertical ? 50 : 56) * s, color: BRAND.white, lineHeight: 1.35 }}>
            {words.map((w, i) => (
              <span key={i} style={{ opacity: i < shownWords ? 1 : 0.12 }}>
                {w}{" "}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 36 * s, display: "flex", alignItems: "center", gap: 20 * s }}>
            <div style={{ width: 70 * s, height: 6 * s, background: BRAND.cyan, borderRadius: 3 * s }} />
            <div>
              <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 36 * s, color: BRAND.white }}>{TESTIMONIAL.name}</div>
              <div style={{ fontFamily: BODY, fontSize: 28 * s, color: BRAND.muted }}>{TESTIMONIAL.role}</div>
            </div>
            <div style={{ marginLeft: "auto", fontSize: 40 * s, color: BRAND.gold, letterSpacing: 4 * s }}>★★★★★</div>
          </div>
        </div>
      </AbsoluteFill>
      <Caption lines={captions} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------
// SCENE 11 — CTA
// ---------------------------------------------------------------------
export const CtaScene: React.FC<CaptionProp & { headline?: string }> = ({
  captions = CAPTIONS.cta,
  headline = CTA.headline,
}) => {
  const frame = useCurrentFrame();
  const { s, vertical } = useLayout();
  const a = useIn(0, 12);
  const h = useIn(8, 12);
  const b = useIn(22, 9);
  const out = useOut(6);
  const pulse = 1 + Math.sin(frame * 0.25) * 0.04 * b;
  const avatar = (vertical ? 360 : 300) * s;
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Background />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 50 * s, paddingBottom: 80 * s }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${a})` }}>
          <Glow size={avatar * 2.4} />
          <Avatar size={avatar} />
        </div>
        <div
          style={{
            fontFamily: HEAD,
            fontWeight: 900,
            fontSize: (vertical ? 82 : 86) * s,
            color: BRAND.white,
            textAlign: "center",
            maxWidth: (vertical ? 960 : 1500) * s,
            lineHeight: 1.1,
            opacity: h,
            transform: `translateY(${(1 - h) * 40 * s}px)`,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontFamily: HEAD,
            fontWeight: 800,
            fontSize: 48 * s,
            color: BRAND.navy,
            background: `linear-gradient(90deg, ${BRAND.gold}, #FFD75E)`,
            padding: `${24 * s}px ${64 * s}px`,
            borderRadius: 999,
            transform: `scale(${b * pulse})`,
            boxShadow: `0 0 ${50 * s}px rgba(245,183,0,0.55)`,
          }}
        >
          {CTA.button} →
        </div>
      </AbsoluteFill>
      <Caption lines={captions} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------
// SCENE 12 — LOGO STING + HUBUNGAN (juga digunakan sebagai Bumper)
// ---------------------------------------------------------------------
export const OutroScene: React.FC<CaptionProp & { showContact?: boolean }> = ({
  captions = CAPTIONS.outro,
  showContact = true,
}) => {
  const frame = useCurrentFrame();
  const { s, vertical } = useLayout();
  const ring = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" });
  const logo = useIn(4, 9, 0.6);
  const word = useIn(14, 14);
  const info = useIn(26, 14);
  const sweep = interpolate(frame, [18, 45], [-120, 220], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 30 * s }}>
        <div
          style={{
            position: "absolute",
            width: 900 * s * ring,
            height: 900 * s * ring,
            borderRadius: "50%",
            border: `${4 * s}px solid ${BRAND.cyan}`,
            opacity: 1 - ring,
          }}
        />
        <div style={{ transform: `scale(${logo}) rotate(${(1 - logo) * -90}deg)` }}>
          {PROFILE.logoImage ? (
            <Img src={staticFile(PROFILE.logoImage)} style={{ height: 260 * s }} />
          ) : (
            <Avatar size={260 * s} />
          )}
        </div>
        <div style={{ position: "relative", overflow: "hidden", opacity: word }}>
          <div
            style={{
              fontFamily: HEAD,
              fontWeight: 900,
              fontSize: 130 * s,
              color: BRAND.white,
              letterSpacing: 8 * s * word,
              lineHeight: 1,
            }}
          >
            {PROFILE.name}
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${sweep}%`,
              width: "30%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
              transform: "skewX(-20deg)",
            }}
          />
        </div>
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 36 * s, color: BRAND.gold, opacity: word, textAlign: "center" }}>
          {PROFILE.tagline}
        </div>
        {showContact && (
          <div
            style={{
              marginTop: 30 * s,
              display: "flex",
              flexDirection: vertical ? "column" : "row",
              gap: (vertical ? 14 : 40) * s,
              alignItems: "center",
              fontFamily: BODY,
              fontWeight: 600,
              fontSize: (vertical ? 30 : 30) * s,
              color: BRAND.white,
              opacity: info,
              transform: `translateY(${(1 - info) * 30 * s}px)`,
            }}
          >
            <span>🌐 {CTA.website}</span>
            <span>📱 {CTA.whatsapp}</span>
            <span>✦ {CTA.social}</span>
          </div>
        )}
      </AbsoluteFill>
      {showContact && <Caption lines={captions} />}
    </AbsoluteFill>
  );
};
