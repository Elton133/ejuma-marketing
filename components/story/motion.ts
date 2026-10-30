import { gsap } from "gsap";

/** Characters inside `root` blink now and then and bob gently, forever. Call inside useGSAP so it's cleaned up. */
export function idleCast(root: Element | null) {
  if (!root) return;
  gsap.utils.toArray<SVGGElement>("[data-char-eyes]", root).forEach((eyes) => {
    gsap
      .timeline({ repeat: -1, repeatDelay: gsap.utils.random(2.2, 5), delay: gsap.utils.random(0.5, 3) })
      .to(eyes, { scaleY: 0.1, duration: 0.07 })
      .to(eyes, { scaleY: 1, duration: 0.12 });
  });
  gsap.utils.toArray<SVGGElement>("[data-char-head]", root).forEach((head, i) => {
    gsap.to(head, { y: -2.5, rotate: i % 2 ? 2 : -2, duration: 1.8 + i * 0.3, ease: "sine.inOut", yoyo: true, repeat: -1 });
  });
}

/** A wave from the character inside `root`, added to `tl` at `at`. */
export function wave(tl: gsap.core.Timeline, root: Element | null | undefined, at: number | string = 0, times = 3) {
  const hand = root?.querySelector("[data-char-hand]");
  if (!hand) return tl;
  return tl
    .set(hand, { opacity: 1 }, at)
    .fromTo(hand, { rotate: 0 }, { rotate: -24, duration: 0.16, yoyo: true, repeat: times * 2 - 1, ease: "sine.inOut" }, at)
    .to(hand, { opacity: 0, duration: 0.2 });
}

/** A happy nod from the character inside `root`. */
export function nod(tl: gsap.core.Timeline, root: Element | null | undefined, at: number | string = 0) {
  const head = root?.querySelector("[data-char-head]");
  if (head) tl.to(head, { rotate: 8, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, at);
  return tl;
}
