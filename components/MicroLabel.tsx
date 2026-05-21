export function MicroLabel({
  children,
  light,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
        light ? "text-black/50" : "text-white/70"
      } ${className}`.trim()}
    >
      {children}
    </p>
  );
}
