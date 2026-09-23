"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Leader = {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
};

const LEADERS: Leader[] = [
  {
    id: "elton-morden",
    name: "Elton Morden",
    title: "Co-Founder & CEO",
    bio: "Elton leads Engine’s technology direction, turning ideas into products, features, and systems that move the company forward. He’s at his best with a good problem to solve, a keyboard in front of him, and enough room to figure things out.",
    imageUrl: "/elton.jpg",
  },
  {
    id: "edwin-annan",
    name: "Edwin Annan",
    title: "Co-Founder & COO",
    bio: "He runs operations with an engineer’s eye for systems and a very low tolerance for things being left unfinished. From engineering and maintenance to keeping an entire company moving, Edwin has made chasing details something of a profession.",
    imageUrl: "/edwin.jpg",
  },
  {
    id: "leslie-paul-ajayi",
    name: "Leslie Paul Ajayi",
    title: "CTO · Chief Technology Officer",
    bio: "Leslie leads Engine’s engineering team and builds the systems behind the platform. He has a talent for spotting the detail hiding inside the bigger problem—and making sure it gets solved properly. Backend engineering is his territory, and he takes that responsibility seriously.",
    imageUrl: "/leslie.jpeg",
  },
  {
    id: "joyce-elli",
    name: "Joyce Elli",
    title: "Head of Product",
    bio: "Joyce leads product at Beagine, bringing together customer needs, ideas, and technology to create products people actually want to use. She’s calm, thoughtful, and detail-oriented—and tends to let the work do most of the talking.",
    imageUrl: "/joyce.jpg",
  },
  {
    id: "julius-arhin",
    name: "Julius Arhin",
    title: "CTSO · Chief Trust & Security Officer",
    bio: "Julius leads trust, data protection, and operational security at Beagine, helping keep the ecosystem safe for the people and businesses that use it. With experience across data protection, engineering, GIS, and technical environments, he brings a practical and detail-focused approach to protecting what matters.",
    imageUrl: "/julius.jpg",
  },
  {
    id: "irene-kekeli-sefenu",
    name: "Irene Kekeli Sefenu",
    title: "Head of Research",
    bio: "Irene leads research at Beagine, turning questions into insight and insight into better decisions. With years of research experience, she has a talent for looking past the obvious and finding the detail that changes the picture. Quiet, thoughtful, and rarely willing to accept the first answer.",
    imageUrl: "/irene.jpg",
  },
  {
    id: "yayra-sunnu",
    name: "Yayra Sunnu",
    title: "Head of Community",
    bio: "Yayra looks after the people who make Beagine what it is—customers, specialists, vendors, and everyone in between. With experience in customer relationships, security programmes, and policy, she brings structure to the community while keeping the human side firmly in focus. And fortunately, she’s one of the easier people on the team to talk to.",
    imageUrl: "/yayra.jpg",
  },
  {
    id: "marietha-appiah",
    name: "Marietha Appiah",
    title: "Head of Marketing",
    bio: "Marietha Appiah leads Beagine’s marketing, bringing together experience in marketing and people relations with a natural instinct for understanding audiences. She asks a lot of questions, knows how to turn ideas into stories, and isn't afraid of being the face of one either.",
    imageUrl: "/marrieta.jpeg",
  },
  {
    id: "harry",
    name: "Harry",
    title: "Marketing Associate & Social Media",
    bio: "A marketer with an engineer’s attention to detail. Harry brings a technical background to marketing and social media, giving him a slightly different way of looking at content, campaigns, and the details that make them work. Methodical, curious, and always looking for the better version, he makes sure Beagine has something worth saying—and says it well.",
    imageUrl: "/harry.jpg",
  },
];

export function TeamGrid() {
  const [selectedId, setSelectedId] = useState(LEADERS[0].id);
  const [modalLeader, setModalLeader] = useState<Leader | null>(null);
  const selectedLeader = LEADERS.find((leader) => leader.id === selectedId) ?? LEADERS[0];

  useEffect(() => {
    if (!modalLeader) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalLeader(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [modalLeader]);

  return (
    <section className="w-full bg-[#fafafa]">
      <div className="mx-auto flex max-w-7xl flex-col px-6 py-24 md:px-14 lg:px-24">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex w-full max-w-2xl flex-col gap-12" data-reveal-stagger>
            <div data-reveal-item className="flex flex-wrap gap-y-4 -space-x-3">
              {LEADERS.map((leader, index) => (
                <button
                  key={leader.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(leader.id);
                    setModalLeader(leader);
                  }}
                  className={`group relative h-20 w-20 shrink-0 touch-manipulation overflow-hidden rounded-full border-4 border-[#fafafa] bg-zinc-200 transition-all duration-300 md:h-24 md:w-24 ${
                    selectedId === leader.id
                      ? "z-20 ring-2 ring-[#FF5F15] ring-offset-2 ring-offset-[#fafafa]"
                      : "z-10 hover:z-30 hover:-translate-y-2 hover:shadow-xl"
                  } focus-visible:z-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5F15]`}
                  aria-label={`View ${leader.name}’s full profile`}
                  aria-pressed={selectedId === leader.id}
                  style={{ zIndex: selectedId === leader.id ? 20 : index + 1 }}
                >
                  <Image
                    src={leader.imageUrl}
                    alt={`Portrait of ${leader.name}`}
                    fill
                    sizes="(min-width: 768px) 96px, 80px"
                    className="pointer-events-none object-cover"
                  />
                </button>
              ))}
            </div>

            <div data-reveal-item className="flex flex-col" key={selectedId}>
              <h3 className="text-2xl font-bold text-black md:text-3xl">{selectedLeader.name}</h3>
              <p className="mt-1 font-semibold text-[#FF5F15]">{selectedLeader.title}</p>
              <p className="mt-6 text-lg leading-relaxed text-black/70 md:text-xl">
                {selectedLeader.bio}
              </p>
            </div>
          </div>

          <div data-reveal-stagger className="flex w-full max-w-md flex-col lg:items-end lg:text-right">
            <h2 data-reveal-item className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold leading-tight tracking-tight text-black">
              Behind every great platform, <br />
              are great <span className="text-[#FF5F15]">humans.</span>
            </h2>
          </div>
        </div>
      </div>

      {modalLeader ? createPortal(
        <div
          className="fixed inset-0 z-[10000] flex items-end justify-center overflow-y-auto overscroll-contain bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModalLeader(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="leader-dialog-title"
            className="relative grid max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] bg-[#111] text-white shadow-2xl sm:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] sm:rounded-[2rem]"
          >
            <button
              type="button"
              onClick={() => setModalLeader(null)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-xl text-white backdrop-blur transition hover:bg-[#FF5F15] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Close profile"
              autoFocus
            >
              ×
            </button>

            <div className="relative min-h-[52dvh] bg-black sm:min-h-[620px]">
              <Image
                src={modalLeader.imageUrl}
                alt={`Full portrait of ${modalLeader.name}`}
                fill
                sizes="(min-width: 640px) 55vw, 100vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="flex flex-col justify-end p-7 sm:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF7B3D]">
                Meet the team
              </p>
              <h3 id="leader-dialog-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {modalLeader.name}
              </h3>
              <p className="mt-2 font-semibold text-[#FF7B3D]">{modalLeader.title}</p>
              <p className="mt-7 text-base leading-relaxed text-white/65 sm:text-lg">
                {modalLeader.bio}
              </p>
            </div>
          </section>
        </div>
        , document.body) : null}
    </section>
  );
}
