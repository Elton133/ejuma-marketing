import { MicroLabel } from "./MicroLabel";

export function MissionSection() {
  return (
    <section id="mission" className="bg-white px-6 py-16 text-black md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <MicroLabel light>Mission</MicroLabel>
        <h2 className="mt-5 max-w-4xl text-[clamp(1.875rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight">
          Bringing you skilled specialists —{" "}
          <em className="text-[#FF5F15] not-italic">verified</em>,{" "}
          <em className="text-[#FF5F15] not-italic">bookable</em>, and{" "}
          <em className="text-[#FF5F15] not-italic">trackable</em>.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
          Access plumbers, electricians, masons, and more — all in one place
          with flexible booking for how, where, and when you need work done.
        </p>
      </div>
    </section>
  );
}
