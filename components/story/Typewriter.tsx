"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";

const CARET = "ml-1 inline-block h-[0.85em] w-[0.12em] min-w-[2px] translate-y-[0.08em] animate-pulse rounded-full bg-[#FF5F15]";

/**
 * Types each line in turn with a blinking caret. Tapping it finishes the
 * typing at once, so nobody has to wait to read. `instant` shows the text
 * already typed (e.g. coming back to a scene).
 */
export function Typewriter({
  lines,
  speed = 32,
  delay = 200,
  instant = false,
  className,
  lineClassName,
  onDone,
}: {
  lines: string[];
  speed?: number;
  delay?: number;
  instant?: boolean;
  className?: string;
  lineClassName?: (index: number) => string;
  onDone?: () => void;
}) {
  const text = lines.join("\n");
  const total = text.length - (lines.length - 1);
  const [shown, setShown] = useState(instant ? total : 0);
  const skipped = useRef(instant);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    if (skipped.current || prefersReducedMotion()) {
      setShown(total);
      return;
    }
    setShown(0);
    let frame = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      if (skipped.current) return;
      const next = Math.max(0, Math.min(total, Math.floor((now - start) / speed)));
      setShown(next);
      if (next < total) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, total, speed, delay]);

  const finished = shown >= total;
  useEffect(() => {
    if (finished) doneRef.current?.();
  }, [finished]);

  const starts = lines.map((_, index) => lines.slice(0, index).reduce((sum, line) => sum + line.length, 0));
  const caretLine = finished ? lines.length - 1 : lines.findIndex((line, index) => shown < starts[index] + line.length);

  return (
    <div
      className={className}
      onClick={() => {
        skipped.current = true;
        setShown(total);
      }}
    >
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, index) => {
        const visible = line.slice(0, Math.max(0, shown - starts[index]));
        if (index > caretLine) return null;
        return (
          <p key={index} className={lineClassName?.(index)} aria-hidden="true">
            {visible}
            {index === caretLine ? <span className={CARET} /> : null}
          </p>
        );
      })}
    </div>
  );
}
