import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  stagger?: boolean;
};

export function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  stagger = false,
}: ScrollRevealProps) {
  const attr = stagger ? { "data-reveal-stagger": true } : { "data-reveal": true };

  return (
    <Tag className={className} {...attr}>
      {children}
    </Tag>
  );
}
