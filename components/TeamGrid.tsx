"use client";

import { useState } from "react";
import Image from "next/image";

type Leader = {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
};

const LEADERS: Leader[] = [
  {
    id: "1",
    name: "Alex Rivera",
    title: "Chief Executive Officer",
    bio: "Alex is the visionary behind Beagine, bringing over 15 years of experience in scaling global platforms. Passionate about connecting people and building sustainable infrastructure, Alex leads our mission to revolutionize engineering services.",
    imageUrl: "/landing5.png"
  },
  {
    id: "2",
    name: "Sarah Chen",
    title: "Chief Technology Officer",
    bio: "Sarah is our technical powerhouse. Having led engineering teams at top tech firms, she is taking charge on making Beagine the most reliable, lightning-fast platform for both specialists and customers worldwide.",
    imageUrl: "/landing6.png"
  },
  {
    id: "3",
    name: "Marcus Johnson",
    title: "Head of Operations",
    bio: "Marcus ensures that every part of the Beagine ecosystem runs smoothly. From onboarding top-tier specialists to ensuring customer satisfaction, his relentless focus on operational excellence keeps the engine running.",
    imageUrl: "/landing7.png"
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    title: "VP of Product",
    bio: "Elena crafts the Beagine experience. With a sharp eye for design and a deep understanding of user needs, she ensures that booking a specialist or managing your trades business is as intuitive as ordering a ride.",
    imageUrl: "/landing8.png"
  },
  {
    id: "5",
    name: "David Kim",
    title: "Head of Trust & Safety",
    bio: "David is dedicated to building the safest platform in the world. He leads our rigorous vetting processes, dispute resolution, and community guidelines to ensure peace of mind for every single user.",
    imageUrl: "/landing9.png"
  },
  {
    id: "6",
    name: "Aisha Patel",
    title: "Chief Marketing Officer",
    bio: "Aisha tells the Beagine story. Her innovative campaigns and community-first approach have been instrumental in growing our platform across pilot cities and building a globally recognized brand.",
    imageUrl: "/landing1.png"
  },
  {
    id: "7",
    name: "James Wilson",
    title: "VP of Expansion",
    bio: "James is the driving force behind our rapid growth. He identifies new markets, establishes local hubs, and builds the foundational relationships needed to launch Beagine in cities across the globe.",
    imageUrl: "/landing2.png"
  },
  {
    id: "8",
    name: "Michael Chang",
    title: "Head of Financial Services",
    bio: "Michael bridges the gap between trades and fintech. He oversees our secure payment infrastructure, ensuring specialists get paid instantly and transparently, while offering seamless checkout for customers.",
    imageUrl: "/landing3.png"
  }
];

export function TeamGrid() {
  const [activeId, setActiveId] = useState<string>(LEADERS[0].id);

  const activeLeader = LEADERS.find((l) => l.id === activeId) || LEADERS[0];

  return (
    <section className="w-full bg-[#fafafa]">
      <div className="mx-auto flex max-w-7xl flex-col px-6 py-24 md:px-14 lg:px-24">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
          
          {/* Left Side: Avatars and Bio */}
          <div className="flex w-full max-w-2xl flex-col gap-12" data-reveal-stagger>
            
            {/* Avatar Grid (Slightly overlapping circles) */}
            <div data-reveal-item className="flex flex-wrap gap-y-4 -space-x-3">
              {LEADERS.map((leader) => (
                <button
                  key={leader.id}
                  onClick={() => setActiveId(leader.id)}
                  className={`group relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-[#fafafa] bg-zinc-200 transition-all duration-300 md:h-24 md:w-24 ${
                    activeId === leader.id 
                      ? "z-20 ring-2 ring-[#FF5F15] ring-offset-2 ring-offset-[#fafafa]" 
                      : "z-10 hover:z-20 hover:-translate-y-2 hover:shadow-xl"
                  }`}
                >
                  <Image
                    src={leader.imageUrl}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Active Leader Bio */}
            <div data-reveal-item className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeId}>
              <h3 className="text-2xl font-bold text-black md:text-3xl">{activeLeader.name}</h3>
              <p className="mt-1 font-semibold text-[#FF5F15]">{activeLeader.title}</p>
              <p className="mt-6 text-lg leading-relaxed text-black/70 md:text-xl">
                {activeLeader.bio}
              </p>
            </div>

          </div>

          {/* Right Side: Quote */}
          <div data-reveal-stagger className="flex w-full max-w-md flex-col lg:items-end lg:text-right">
            <h2 data-reveal-item className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold leading-tight tracking-tight text-black">
              Behind every great platform, <br />
              are great <span className="text-[#a5b4fc]">humans.</span>
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}
