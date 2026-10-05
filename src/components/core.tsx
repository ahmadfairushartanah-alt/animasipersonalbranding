import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import { BRAND } from "../content";

export const HEAD = "Montserrat, sans-serif";
export const BODY = "Inter, sans-serif";

/** Skala & orientasi supaya scene sama boleh guna untuk 16:9 dan 9:16. */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const vertical = height > width;
  const s = Math.min(width, height) / 1080;
  return { width, height, vertical, s };
};

/** Nilai spring 0→1 bermula pada `delay` frame. */
export const useIn = (delay = 0, damping = 14, mass = 0.8) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass } });
};

/** Fade keluar pada hujung scene. */
export const useOut = (frames = 10) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return interpolate(frame, [durationInFrames - frames, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const Background: React.FC<{ tint?: string }> = ({ tint = BRAND.cyan }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const gridShift = (frame * 0.6) % 80;
  const particles = new Array(40).fill(0).map((_, i) => {
    const x = random(`x${i}`) * width;
    const baseY = random(`y${i}`) * height;
    const speed = 0.3 + random(`v${i}`) * 1.2;
    const y = (baseY - frame * speed + height) % height;
    const r = 1.5 + random(`r${i}`) * 3;
    const op = 0.2 + random(`o${i}`) * 0.6;
    return <circle key={i} cx={x} cy={y} r={r} fill={tint} opacity={op} />;
  });
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 35%, ${BRAND.deep} 0%, ${BRAND.navy} 70%)`,
      }}
    >
      <svg width={width} height={height} style={{ position: "absolute", opacity: 0.12 }}>
        <defs>
          <pattern
            id="grid"
            width={80}
            height={80}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(0 ${gridShift})`}
          >
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke={tint} strokeWidth={1} />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#grid)" />
      </svg>
      <svg width={width} height={height} style={{ position: "absolute" }}>
        {particles}
      </svg>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 40%, ${BRAND.navy} 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/** Sari kata bawah — baris bertukar sama rata sepanjang scene. */
export const Caption: React.FC<{ lines: string[] }> = ({ lines }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { s, vertical } = useLayout();
  if (!lines.length) return null;
  const per = durationInFrames / lines.length;
  const idx = Math.min(lines.length - 1, Math.floor(frame / per));
  const local = frame - idx * per;
  const op = interpolate(local, [0, 6, per - 6, per], [0, 1, 1, idx === lines.length - 1 ? 1 : 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: vertical ? 300 * s : 60 * s,
      }}
    >
      <div
        style={{
          opacity: op,
          fontFamily: BODY,
          fontWeight: 600,
          fontSize: (vertical ? 40 : 34) * s,
          color: BRAND.white,
          background: "rgba(6,14,38,0.72)",
          border: `1px solid rgba(34,211,238,0.25)`,
          padding: `${12 * s}px ${28 * s}px`,
          borderRadius: 14 * s,
          maxWidth: vertical ? "88%" : "75%",
          textAlign: "center",
          lineHeight: 1.35,
        }}
      >
        {lines[idx]}
      </div>
    </AbsoluteFill>
  );
};

export const PlaceholderTag: React.FC<{ show: boolean }> = ({ show }) => {
  const { s } = useLayout();
  if (!show) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 40 * s,
        right: 40 * s,
        fontFamily: BODY,
        fontWeight: 600,
        fontSize: 22 * s,
        color: BRAND.navy,
        background: BRAND.gold,
        padding: `${6 * s}px ${14 * s}px`,
        borderRadius: 8 * s,
        letterSpacing: 1,
      }}
    >
      CONTOH — SAHKAN
    </div>
  );
};

export const Glow: React.FC<{ color?: string; size: number; opacity?: number }> = ({
  color = BRAND.cyan,
  size,
  opacity = 0.35,
}) => (
  <div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
      opacity,
      filter: "blur(10px)",
    }}
  />
);

type IconName = "shield" | "star" | "chart" | "target";
export const Icon: React.FC<{ name: IconName; size: number; color?: string }> = ({
  name,
  size,
  color = BRAND.gold,
}) => {
  const paths: Record<IconName, React.ReactNode> = {
    shield: (
      <>
        <path d="M12 2l8 3v6c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V5z" fill="none" stroke={color} strokeWidth={2} />
        <path d="M8 12l3 3 5-6" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </>
    ),
    star: (
      <path
        d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    ),
    chart: (
      <>
        <path d="M3 21h18" stroke={color} strokeWidth={2} />
        <path d="M5 17l5-5 4 3 6-8" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </>
    ),
    target: (
      <>
        <circle cx={12} cy={12} r={9} fill="none" stroke={color} strokeWidth={2} />
        <circle cx={12} cy={12} r={5} fill="none" stroke={color} strokeWidth={2} />
        <circle cx={12} cy={12} r={1.5} fill={color} />
      </>
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
};
