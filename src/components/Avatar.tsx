import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { BRAND, PROFILE } from "../content";
import { HEAD } from "./core";

/** Avatar Coach TAF: guna foto jika `PROFILE.avatarImage` diisi, jika tidak papar monogram. */
export const Avatar: React.FC<{ size: number }> = ({ size }) => {
  const frame = useCurrentFrame();
  const rot = frame * 1.2;
  const ring = size * 0.06;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div
        style={{
          position: "absolute",
          inset: -ring,
          borderRadius: "50%",
          background: `conic-gradient(from ${rot}deg, ${BRAND.cyan}, ${BRAND.gold}, ${BRAND.cyan})`,
          filter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          overflow: "hidden",
          background: `radial-gradient(circle at 35% 30%, ${BRAND.deep}, ${BRAND.navy})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 ${size * 0.25}px rgba(34,211,238,0.45)`,
        }}
      >
        {PROFILE.avatarImage ? (
          <Img
            src={staticFile(PROFILE.avatarImage)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span
            style={{
              fontFamily: HEAD,
              fontWeight: 900,
              fontSize: size * 0.32,
              letterSpacing: size * 0.01,
              background: `linear-gradient(135deg, ${BRAND.white}, ${BRAND.cyan})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {PROFILE.monogram}
          </span>
        )}
      </div>
    </div>
  );
};
