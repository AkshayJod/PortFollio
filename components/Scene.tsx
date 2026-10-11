import { asset } from "@/lib/asset";

type SceneProps = { kind: "orbit" | "builder" | "corridor"; video: string };

// A full-bleed cinematic layer. Plays assets/video/<video>.mp4 (scrubbed by scroll) when the
// file exists; otherwise the canvas renders a procedural stand-in. See BUILD-PLAN.md §5.
export default function Scene({ kind, video }: SceneProps) {
  return (
    <div
      className="scene"
      data-scene={kind}
      data-src={asset(`assets/video/${video}.mp4`)}
      data-src-mobile={asset(`assets/video/${video}-mobile.mp4`)}
    >
      <canvas className="scene__canvas" aria-hidden="true" />
      <video className="scene__video" muted playsInline preload="none" aria-hidden="true" />
    </div>
  );
}
