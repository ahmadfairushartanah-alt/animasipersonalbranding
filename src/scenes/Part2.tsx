import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND, CAPTIONS, CREDENTIALS, FRAMEWORK, MEDIA } from "../content";
import { Background, BODY, Caption, Glow, HEAD, Icon, useIn, useLayout, useOut } from "../components/core";

type CaptionProp = { captions?: string[] };

// ---------------------------------------------------------------------
// SCENE 5 — KREDIBILITI: lencana muncul satu-satu
// ---------------------------------------------------------------------
export const CredentialsScene: React.FC<CaptionProp> = ({ captions = CAPTIONS.credentials }) => {
  const { s, vertical } = useLayout();
  const title = useIn(0);
  const out = useOut(8);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Background tint={BRAND.gold} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 56 * s }}>
        <div
          style={{
            fontFamily: HEAD,
            fontWeight: 800,
            fontSize: 64 * s,
            color: BRAND.white,
            opacity: title,
            letterSpacing: 2 * s,
          }}
        >
          KREDIBILITI <span style={{ color: BRAND.gold }}>COACH TAF</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: vertical ? "1fr" : "1fr 1fr",
            gap: 30 * s,
          }}
        >
          {CREDENTIALS.map((c, i) => {
            const v = useIn(10 + i * 12, 10);
            return (
              <div
                key={c.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 26 * s,
                  width: (vertical ? 860 : 760) * s,
                  padding: `${28 * s}px ${36 * s}px`,
                  borderRadius: 24 * s,
                  background: "linear-gradient(135deg, rgba(245,183,0,0.16), rgba(255,255,255,0.04))",
                  border: `2px solid rgba(245,183,0,${0.3 + v * 0.4})`,
                  transform: `scale(${v}) translateY(${(1 - v) * 40 * s}px)`,
                  opacity: v,
                  boxShadow: `0 0 ${30 * s * v}px rgba(245,183,0,0.25)`,
                }}
              >
                <div
                  style={{
                    width: 90 * s,
                    height: 90 * s,
                    borderRadius: "50%",
                    background: "rgba(245,183,0,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={c.icon} size={54 * s} />
                </div>
                <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 40 * s, color: BRAND.white, lineHeight: 1.2 }}>
                  {c.label}
                </div>
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
// SCENE 6 — FRAMEWORK: 4 langkah dengan garis penyambung
// ---------------------------------------------------------------------
export const FrameworkScene: React.FC<CaptionProp> = ({ captions = CAPTIONS.framework }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { s, vertical } = useLayout();
  const title = useIn(0);
  const out = useOut(8);
  const stepGap = Math.max(8, Math.floor((durationInFrames * 0.55) / FRAMEWORK.length));
  const line = interpolate(frame, [10, 10 + stepGap * FRAMEWORK.length], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Background />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: (vertical ? 50 : 70) * s,
          paddingBottom: (vertical ? 220 : 40) * s,
        }}
      >
        <div style={{ textAlign: "center", opacity: title }}>
          <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 32 * s, color: BRAND.cyan, letterSpacing: 6 * s }}>
            KAEDAH COACH TAF
          </div>
          <div style={{ fontFamily: HEAD, fontWeight: 900, fontSize: (vertical ? 84 : 92) * s, color: BRAND.white }}>
            AI = <span style={{ color: BRAND.gold }}>STAF DIGITAL</span>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: vertical ? "column" : "row",
            gap: (vertical ? 28 : 50) * s,
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              background: `linear-gradient(${vertical ? "180deg" : "90deg"}, ${BRAND.cyan}, ${BRAND.gold})`,
              borderRadius: 4 * s,
              ...(vertical
                ? { left: "50%", top: 0, width: 6 * s, height: `${line * 100}%`, transform: "translateX(-50%)" }
                : { top: "50%", left: 0, height: 6 * s, width: `${line * 100}%`, transform: "translateY(-50%)" }),
            }}
          />
          {FRAMEWORK.map((f, i) => {
            const v = useIn(10 + i * stepGap, 11);
            return (
              <div
                key={f.title}
                style={{
                  position: "relative",
                  width: (vertical ? 680 : 340) * s,
                  padding: `${(vertical ? 18 : 40) * s}px ${24 * s}px`,
                  borderRadius: 28 * s,
                  background: BRAND.navy,
                  border: `2px solid ${i === FRAMEWORK.length - 1 ? BRAND.gold : BRAND.cyan}`,
                  textAlign: "center",
                  transform: `scale(${v})`,
                  opacity: v,
                  boxShadow: `0 0 ${36 * s}px rgba(34,211,238,0.3)`,
                }}
              >
                <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 32 * s, color: BRAND.cyan }}>{f.step}</div>
                <div style={{ fontFamily: HEAD, fontWeight: 900, fontSize: 46 * s, color: BRAND.white, margin: `${6 * s}px 0` }}>
                  {f.title}
                </div>
                <div style={{ fontFamily: BODY, fontWeight: 400, fontSize: 28 * s, color: BRAND.muted }}>{f.sub}</div>
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
// SCENE 7 — SEBELUM vs SELEPAS
// ---------------------------------------------------------------------
const Bar: React.FC<{ label: string; pct: number; color: string; s: number; width: number }> = ({
  label,
  pct,
  color,
  s,
  width,
}) => (
  <div style={{ marginBottom: 22 * s }}>
    <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 28 * s, color: BRAND.white, marginBottom: 8 * s }}>
      {label}
    </div>
    <div style={{ width, height: 22 * s, background: "rgba(255,255,255,0.08)", borderRadius: 11 * s }}>
      <div style={{ width: width * pct, height: "100%", background: color, borderRadius: 11 * s }} />
    </div>
  </div>
);

export const BeforeAfterScene: React.FC<CaptionProp> = ({ captions = CAPTIONS.beforeAfter }) => {
  const frame = useCurrentFrame();
  const { s, vertical } = useLayout();
  const left = useIn(0);
  const right = useIn(25);
  const tag = useIn(55, 10);
  const out = useOut(8);
  const grow = (start: number, target: number) =>
    interpolate(frame, [start, start + 30], [0, target], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panelW = (vertical ? 860 : 760) * s;
  const barW = panelW - 100 * s;
  const tasks = ["Content & caption", "Balas chat customer", "Laporan & proposal"];
  const panel = (title: string, color: string, v: number, values: number[], start: number, note: string) => (
    <div
      style={{
        width: panelW,
        padding: `${36 * s}px ${50 * s}px`,
        borderRadius: 28 * s,
        background: "rgba(255,255,255,0.04)",
        border: `2px solid ${color}`,
        opacity: v,
        transform: `translateY(${(1 - v) * 60 * s}px)`,
      }}
    >
      <div style={{ fontFamily: HEAD, fontWeight: 900, fontSize: 54 * s, color, marginBottom: 24 * s }}>{title}</div>
      {tasks.map((t, i) => (
        <Bar key={t} label={t} pct={grow(start + i * 6, values[i])} color={color} s={s} width={barW} />
      ))}
      <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 30 * s, color: BRAND.white, marginTop: 10 * s }}>{note}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Background />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: vertical ? "column" : "row",
          gap: 50 * s,
          paddingBottom: (vertical ? 120 : 80) * s,
        }}
      >
        {panel("SEBELUM", BRAND.danger, left, [0.95, 0.9, 0.85], 5, "⏳ Kerja manual berjam-jam")}
        {panel("SELEPAS", BRAND.cyan, right, [0.2, 0.15, 0.18], 30, "⚡ AI siapkan dalam beberapa minit")}
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: vertical ? "flex-start" : "flex-start", paddingTop: (vertical ? 180 : 70) * s }}>
        <div
          style={{
            fontFamily: HEAD,
            fontWeight: 900,
            fontSize: 56 * s,
            color: BRAND.navy,
            background: BRAND.gold,
            padding: `${12 * s}px ${36 * s}px`,
            borderRadius: 16 * s,
            transform: `scale(${tag})`,
            opacity: tag,
          }}
        >
          LEBIH MASA UNTUK JUAL
        </div>
      </AbsoluteFill>
      <Caption lines={captions} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------
// SCENE 8 — LATIHAN HANDS-ON (guna footage sebenar jika ada)
// ---------------------------------------------------------------------
export const TrainingScene: React.FC<CaptionProp> = ({ captions = CAPTIONS.training }) => {
  const frame = useCurrentFrame();
  const { s, vertical } = useLayout();
  const title = useIn(0);
  const out = useOut(8);
  if (MEDIA.trainingFootage) {
    const zoom = interpolate(frame, [0, 200], [1, 1.1]);
    return (
      <AbsoluteFill style={{ opacity: out, backgroundColor: BRAND.navy }}>
        <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
          <OffthreadVideo src={staticFile(MEDIA.trainingFootage)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </AbsoluteFill>
        <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(6,14,38,0.85) 0%, transparent 50%)" }} />
        <Caption lines={captions} />
      </AbsoluteFill>
    );
  }
  const seats = vertical ? { cols: 4, rows: 4 } : { cols: 6, rows: 3 };
  const cell = (vertical ? 170 : 150) * s;
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Background />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 50 * s }}>
        <div style={{ textAlign: "center", opacity: title }}>
          <div style={{ fontFamily: HEAD, fontWeight: 900, fontSize: (vertical ? 86 : 96) * s, color: BRAND.white }}>
            LATIHAN <span style={{ color: BRAND.cyan }}>HANDS-ON</span>
          </div>
          <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 40 * s, color: BRAND.gold }}>Terus boleh guna dalam bisnes</div>
        </div>
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${seats.cols}, ${cell}px)`, gap: 20 * s }}>
          <Glow size={cell * 6} opacity={0.2} />
          {new Array(seats.cols * seats.rows).fill(0).map((_, i) => {
            const v = useIn(8 + i * 2, 12);
            const lit = frame > 30 + i * 3;
            return (
              <div
                key={i}
                style={{
                  height: cell * 0.8,
                  borderRadius: 18 * s,
                  background: lit ? "rgba(34,211,238,0.18)" : "rgba(255,255,255,0.05)",
                  border: `2px solid ${lit ? BRAND.cyan : "rgba(148,163,184,0.3)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 56 * s,
                  transform: `scale(${v})`,
                  boxShadow: lit ? `0 0 ${18 * s}px rgba(34,211,238,0.45)` : "none",
                }}
              >
                {lit ? "💻" : "🧑"}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <Caption lines={captions} />
    </AbsoluteFill>
  );
};
