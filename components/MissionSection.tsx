import { MicroLabel } from "./MicroLabel";

export function MissionSection() {
  return (
    <section id="mission" className="bg-white px-6 py-16 text-black md:py-28">
      <div className="mx-auto max-w-[1300px]">
        <MicroLabel light>Mission</MicroLabel>
        <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
          <p className="max-w-xs text-lg text-black/70">
            Connecting people to trusted specialists, anytime they need help.
          </p>
          <h2 className="font-heading text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.1]">
            Access plumbers, electricians, masons, and more -{" "}
            <em className="text-[#FF5F15] not-italic">all in one place </em>
            with flexible booking for how, where, and when you need work done.
          </h2>
        </div>
      </div>
    </section>
  );
}
