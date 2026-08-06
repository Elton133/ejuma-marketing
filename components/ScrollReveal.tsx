import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  stagger?: boolean;
  stacked?: boolean;
};

export function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  stagger = false,
  stacked = false,
}: ScrollRevealProps) {
  const attr = stagger ? { "data-reveal-stagger": true } : { "data-reveal": true };
  const stackedAttr = stacked ? { "data-stacked-section": true } : {};

  return (
    <Tag className={className} {...attr} {...stackedAttr}>
      {children}
    </Tag>
  );
}
