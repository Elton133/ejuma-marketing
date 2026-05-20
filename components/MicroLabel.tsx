export function MicroLabel({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
        light ? "text-black/50" : "text-white/70"
      }`}
    >
      {children}
    </p>
  );
}
