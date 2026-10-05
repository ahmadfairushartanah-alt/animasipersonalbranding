import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { AI_TOOLS, BRAND, CAPTIONS, PROBLEMS, PROFILE } from "../content";
import { Background, BODY, Caption, Glow, HEAD, useIn, useLayout, useOut } from "../components/core";
import { Avatar } from "../components/Avatar";

type CaptionProp = { captions?: string[] };

// ---------------------------------------------------------------------
// SCENE 1 — HOOK: prompt ditaip, kemudian "meletup"
// ---------------------------------------------------------------------
export const HookScene: React.FC<
  CaptionProp & { typed?: string; punch?: string }
> = ({ typed = "Bisnes anda dah ada staf AI…", punch = "atau belum?", captions = CAPTIONS.hook }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { s, vertical } = useLayout();
  const charsPerFrame = 1.1;
  const typeEnd = Math.ceil(typed.length / charsPerFrame) + 4;
  const shown = typed.slice(0, Math.floor(frame * charsPerFrame));
  const cursorOn = Math.floor(frame / (fps / 4)) % 2 === 0;
  const burst = useIn(typeEnd, 10);
  const ring = interpolate(frame - typeEnd, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const out = useOut(8);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Background />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            position: "absolute",
            width: 1400 * s * ring,
            height: 1400 * s * ring,
            borderRadius: "50%",
            border: `${6 * s}px solid ${BRAND.cyan}`,
            opacity: 1 - ring,
          }}
        />
        <div
          style={{
            fontFamily: BODY,
            fontWeight: 600,
            fontSize: (vertical ? 62 : 70) * s,
            color: BRAND.white,
            background: "rgba(255,255,255,0.06)",
            border: `1px solid rgba(34,211,238,0.35)`,
            borderRadius: 20 * s,
            padding: `${26 * s}px ${40 * s}px`,
            maxWidth: vertical ? "86%" : "80%",
            textAlign: "center",
            transform: `translateY(${-burst * 70 * s}px) scale(${1 - burst * 0.12})`,
          }}
        >
          <span style={{ color: BRAND.cyan, marginRight: 16 * s }}>›</span>
          {shown}
          <span style={{ opacity: cursorOn ? 1 : 0, color: BRAND.cyan }}>▍</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: "58%",
            fontFamily: HEAD,
            fontWeight: 900,
            fontSize: (vertical ? 120 : 140) * s,
            color: BRAND.gold,
            textTransform: "uppercase",
            transform: `scale(${burst})`,
            opacity: burst,
            textShadow: `0 0 ${40 * s}px rgba(245,183,0,0.5)`,
          }}
        >
          {punch}
        </div>
      </AbsoluteFill>
      <Caption lines={captions} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------
// SCENE 2 — PROBLEM: kad masalah bertimbun + jam laju
// ---------------------------------------------------------------------
export const ProblemScene: React.FC<CaptionProp> = ({ captions = CAPTIONS.problem }) => {
  const frame = useCurrentFrame();
  const { s, vertical } = useLayout();
  const title = useIn(0);
  const out = useOut(8);
  const cols = vertical ? 1 : 2;
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Background tint={BRAND.danger} />
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 50 * s }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 30 * s, opacity: title }}>
          <svg width={110 * s} height={110 * s} viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={44} fill="none" stroke={BRAND.danger} strokeWidth={6} />
            <line
              x1={50}
              y1={50}
              x2={50}
              y2={16}
              stroke={BRAND.white}
              strokeWidth={6}
              strokeLinecap="round"
              transform={`rotate(${frame * 18} 50 50)`}
            />
            <line
              x1={50}
              y1={50}
              x2={72}
              y2={50}
              stroke={BRAND.white}
              strokeWidth={6}
              strokeLinecap="round"
              transform={`rotate(${frame * 1.5} 50 50)`}
            />
          </svg>
          <div style={{ fontFamily: HEAD, fontWeight: 900, fontSize: (vertical ? 70 : 84) * s, color: BRAND.white }}>
            SEMUA BENDA <span style={{ color: BRAND.danger }}>SENDIRI?</span>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, auto)`,
            gap: 28 * s,
          }}
        >
          {PROBLEMS.map((p, i) => {
            const d = 8 + i * 9;
            const v = useIn(d, 9);
            const shake = Math.sin((frame - d) * 1.6) * 4 * s * Math.max(0, 1 - (frame - d) / 20);
            return (
              <div
                key={p.text}
                style={{
                  transform: `scale(${v}) translateX(${shake}px)`,
                  opacity: v,
                  display: "flex",
                  alignItems: "center",
                  gap: 20 * s,
                  background: "rgba(244,63,94,0.12)",
                  border: `2px solid rgba(244,63,94,0.55)`,
                  borderRadius: 22 * s,
                  padding: `${22 * s}px ${36 * s}px`,
                  minWidth: 520 * s,
                }}
              >
                <span style={{ fontSize: 54 * s }}>{p.icon}</span>
                <span style={{ fontFamily: BODY, fontWeight: 600, fontSize: 44 * s, color: BRAND.white }}>
                  {p.text}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    background: BRAND.danger,
                    color: BRAND.white,
                    fontFamily: BODY,
                    fontWeight: 600,
                    fontSize: 26 * s,
                    borderRadius: 999,
                    padding: `${4 * s}px ${14 * s}px`,
                  }}
                >
                  {Math.max(1, Math.floor((frame - d) / 3))}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <Caption lines={captions} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------
// SCENE 3 — CHAOS: tool AI bersepah, tiada sistem
// ---------------------------------------------------------------------
export const ChaosScene: React.FC<CaptionProp> = ({ captions = CAPTIONS.chaos }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { s, width, height, vertical } = useLayout();
  const stampAt = Math.floor(durationInFrames * 0.5);
  const stamp = useIn(stampAt, 9);
  const out = useOut(8);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Background />
      {AI_TOOLS.map((t, i) => {
        // Susun di sekeliling elips (+ sedikit rawak) supaya tidak bertindih
        const ang = (i / AI_TOOLS.length) * Math.PI * 2 + 0.4;
        const bx = width / 2 + Math.cos(ang) * width * 0.34 + (random(`cx${i}`) - 0.5) * 60 * s;
        const by = height * 0.45 + Math.sin(ang) * height * (vertical ? 0.28 : 0.32) + (random(`cy${i}`) - 0.5) * 60 * s;
        const x = bx + Math.sin(frame * 0.07 + i * 2) * 60 * s;
        const y = by + Math.cos(frame * 0.05 + i * 3) * 50 * s;
        const r = Math.sin(frame * 0.04 + i) * 18;
        const appear = useIn(i * 3, 12);
        return (
          <div
            key={t}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%,-50%) rotate(${r}deg) scale(${appear})`,
              fontFamily: BODY,
              fontWeight: 600,
              fontSize: 40 * s,
              color: BRAND.white,
              background: "rgba(255,255,255,0.08)",
              border: "1px dashed rgba(148,163,184,0.6)",
              padding: `${14 * s}px ${28 * s}px`,
              borderRadius: 999,
              opacity: 0.85 - stamp * 0.5,
              whiteSpace: "nowrap",
            }}
          >
            {t}
          </div>
        );
      })}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: HEAD,
            fontWeight: 900,
            fontSize: (vertical ? 92 : 110) * s,
            textAlign: "center",
            lineHeight: 1.05,
            color: BRAND.white,
            transform: `scale(${2 - stamp}) rotate(${-4 * stamp}deg)`,
            opacity: stamp,
            background: "rgba(6,14,38,0.85)",
            border: `${6 * s}px solid ${BRAND.gold}`,
            padding: `${30 * s}px ${50 * s}px`,
            borderRadius: 24 * s,
          }}
        >
          BUKAN SALAH AI.
          <br />
          <span style={{ color: BRAND.gold }}>TIADA SISTEM.</span>
        </div>
      </AbsoluteFill>
      <Caption lines={captions} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------
// SCENE 4 — GUIDE: Coach TAF masuk, tool AI tersusun mengorbit
// ---------------------------------------------------------------------
export const GuideScene: React.FC<CaptionProp> = ({ captions = CAPTIONS.guide }) => {
  const frame = useCurrentFrame();
  const { s, vertical } = useLayout();
  const enter = useIn(0, 12);
  const name = useIn(12, 12);
  const orbitIn = useIn(6, 16);
  const out = useOut(8);
  const avatarSize = (vertical ? 400 : 340) * s;
  const radius = avatarSize * 0.82;
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Background />
      <AbsoluteFill
        style={{
          flexDirection: vertical ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: (vertical ? 220 : 260) * s,
          paddingBottom: (vertical ? 120 : 40) * s,
        }}
      >
        <div
          style={{
            position: "relative",
            width: avatarSize,
            height: avatarSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${enter})`,
            marginLeft: vertical ? 0 : 180 * s,
          }}
        >
          <Glow size={avatarSize * 2.2} />
          {AI_TOOLS.map((t, i) => {
            const a = (i / AI_TOOLS.length) * Math.PI * 2 + frame * 0.012;
            return (
              <div
                key={t}
                style={{
                  position: "absolute",
                  left: avatarSize / 2 + Math.cos(a) * radius * orbitIn,
                  top: avatarSize / 2 + Math.sin(a) * radius * orbitIn,
                  transform: "translate(-50%,-50%)",
                  fontFamily: BODY,
                  fontWeight: 600,
                  fontSize: 24 * s,
                  color: BRAND.navy,
                  background: BRAND.cyan,
                  padding: `${8 * s}px ${18 * s}px`,
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                  opacity: orbitIn,
                  boxShadow: `0 0 ${20 * s}px rgba(34,211,238,0.6)`,
                }}
              >
                {t}
              </div>
            );
          })}
          <Avatar size={avatarSize} />
        </div>
        <div
          style={{
            textAlign: vertical ? "center" : "left",
            opacity: name,
            transform: `translateX(${(1 - name) * (vertical ? 0 : 80) * s}px) translateY(${
              (1 - name) * (vertical ? 60 : 0) * s
            }px)`,
          }}
        >
          <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 34 * s, color: BRAND.cyan, letterSpacing: 6 * s }}>
            KENALKAN
          </div>
          <div style={{ fontFamily: HEAD, fontWeight: 900, fontSize: 150 * s, color: BRAND.white, lineHeight: 1 }}>
            {PROFILE.name}
          </div>
          <div
            style={{
              height: 8 * s,
              width: 260 * s * name,
              background: BRAND.gold,
              margin: vertical ? `${18 * s}px auto` : `${18 * s}px 0`,
              borderRadius: 4 * s,
            }}
          />
          <div
            style={{
              fontFamily: BODY,
              fontWeight: 400,
              fontSize: 38 * s,
              color: BRAND.white,
              maxWidth: 760 * s,
              lineHeight: 1.3,
            }}
          >
            {PROFILE.title}
          </div>
        </div>
      </AbsoluteFill>
      <Caption lines={captions} />
    </AbsoluteFill>
  );
};
