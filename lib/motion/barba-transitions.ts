import { gsap } from "gsap";

type TransitionData = {
  current: { container: HTMLElement };
  next: { container: HTMLElement };
};

export const pageTransition = {
  name: "ejuma-fade",
  async leave(data: TransitionData) {
    await gsap.to(data.current.container, {
      opacity: 0,
      y: -12,
      duration: 0.28,
      ease: "power2.inOut",
    });
  },
  async enter(data: TransitionData) {
    gsap.set(data.next.container, { opacity: 0, y: 16 });
    await gsap.to(data.next.container, {
      opacity: 1,
      y: 0,
      duration: 0.42,
      ease: "power2.out",
      clearProps: "transform",
    });
  },
};
