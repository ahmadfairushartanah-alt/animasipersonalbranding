import React from "react";
import { Audio, Composition, staticFile } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { MEDIA } from "./content";
import { ChaosScene, GuideScene, HookScene, ProblemScene } from "./scenes/Part1";
import { BeforeAfterScene, CredentialsScene, FrameworkScene, TrainingScene } from "./scenes/Part2";
import { CtaScene, OutroScene, StatsScene, TestimonialScene } from "./scenes/Part3";

const FPS = 30;
const T = 12; // frame transisi

type Shot = { el: React.ReactNode; sec: number };

const totalFrames = (shots: Shot[]) =>
  shots.reduce((a, b) => a + Math.round(b.sec * FPS), 0) - T * (shots.length - 1);

const Video: React.FC<{ shots: Shot[]; vo?: string | null }> = ({ shots, vo }) => (
  <>
    <TransitionSeries>
      {shots.map((shot, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <TransitionSeries.Transition
              presentation={i % 3 === 0 ? slide({ direction: "from-right" }) : fade()}
              timing={linearTiming({ durationInFrames: T })}
            />
          )}
          <TransitionSeries.Sequence durationInFrames={Math.round(shot.sec * FPS)}>
            {shot.el}
          </TransitionSeries.Sequence>
        </React.Fragment>
      ))}
    </TransitionSeries>
    {MEDIA.music && <Audio src={staticFile(MEDIA.music)} volume={vo ? 0.12 : 0.6} />}
    {vo && <Audio src={staticFile(vo)} />}
  </>
);

// ---------- MASTER 16:9 (±87s) ----------
const MASTER: Shot[] = [
  { el: <HookScene />, sec: 5 },
  { el: <ProblemScene />, sec: 7 },
  { el: <ChaosScene />, sec: 8 },
  { el: <GuideScene />, sec: 7 },
  { el: <CredentialsScene />, sec: 8 },
  { el: <FrameworkScene />, sec: 10 },
  { el: <BeforeAfterScene />, sec: 10 },
  { el: <TrainingScene />, sec: 7 },
  { el: <StatsScene />, sec: 10 },
  { el: <TestimonialScene />, sec: 6 },
  { el: <CtaScene />, sec: 8 },
  { el: <OutroScene />, sec: 5 },
];

// ---------- SOSIAL 30s 9:16 ----------
const SOCIAL30: Shot[] = [
  {
    el: <HookScene typed="Guna ChatGPT tapi hasil hambar?" punch="Bukan salah AI." captions={["Guna ChatGPT tapi hasil hambar? Bukan salah AI."]} />,
    sec: 4,
  },
  { el: <ChaosScene captions={["Masalahnya — tiada sistem.", "Content tak sempat, sales tak stabil."]} />, sec: 5 },
  { el: <GuideScene captions={["Kenalkan, Coach TAF."]} />, sec: 5 },
  { el: <CredentialsScene captions={["HRDCorp Accredited Trainer & eUsahawan Master Trainer MDEC."]} />, sec: 5 },
  { el: <FrameworkScene captions={["Prompt tepat. Workflow tersusun.", "AI kerja untuk anda."]} />, sec: 6 },
  { el: <CtaScene captions={["Jom upgrade bisnes anda dengan AI."]} />, sec: 4 },
  { el: <OutroScene captions={["Klik link sekarang."]} />, sec: 3.5 },
];

// ---------- TEASER 15s 9:16 ----------
const TEASER15: Shot[] = [
  { el: <HookScene captions={["Bisnes anda dah ada staf AI?"]} />, sec: 3.5 },
  { el: <GuideScene captions={["Coach TAF bantu usahawan & syarikat guna AI secara praktikal."]} />, sec: 4 },
  { el: <FrameworkScene captions={["Terus boleh guna."]} />, sec: 4 },
  { el: <CtaScene captions={["AI sebagai staf digital anda."]} />, sec: 3 },
  { el: <OutroScene captions={["Hubungi Coach TAF."]} />, sec: 2.5 },
];

const BUMPER: Shot[] = [{ el: <OutroScene showContact={false} />, sec: 2.5 }];

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Master"
      component={() => <Video shots={MASTER} vo={MEDIA.voiceOverMaster} />}
      durationInFrames={totalFrames(MASTER)}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="MasterVertical"
      component={() => <Video shots={MASTER} vo={MEDIA.voiceOverMaster} />}
      durationInFrames={totalFrames(MASTER)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition id="Social30" component={() => <Video shots={SOCIAL30} />} durationInFrames={totalFrames(SOCIAL30)} fps={FPS} width={1080} height={1920} />
    <Composition id="Teaser15" component={() => <Video shots={TEASER15} />} durationInFrames={totalFrames(TEASER15)} fps={FPS} width={1080} height={1920} />
    <Composition id="Bumper" component={() => <Video shots={BUMPER} />} durationInFrames={totalFrames(BUMPER)} fps={FPS} width={1920} height={1080} />
  </>
);
