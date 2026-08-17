import Image from "next/image";

export function TradesBar() {
  return (
    <section id="partners" className="border-t border-black/8 bg-white py-14 text-black md:py-20">
      <div className="mx-auto max-w-[1300px] px-6 md:px-10 lg:px-14">
        <p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-between">
          <Image src="/black.png" alt="Trades Bar" width={100} height={100} />
        </div>
      </div>
    </section>
  );
}
