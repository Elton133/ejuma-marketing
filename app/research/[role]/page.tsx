import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { ResearchForm } from "@/components/research/ResearchForm";
import { getResearchTitle, type ResearchRole } from "@/lib/research-questions";

const researchRoles: ResearchRole[] = ["user", "specialist"];

function isResearchRole(role: string): role is ResearchRole {
  return researchRoles.includes(role as ResearchRole);
}

export function generateStaticParams() {
  return researchRoles.map((role) => ({ role }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;

  return isResearchRole(role)
    ? {
        title: getResearchTitle(role),
        description: "Share your experience and help us build a better Beagine.",
      }
    : {};
}

export default async function ResearchRolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;

  if (!isResearchRole(role)) notFound();

  return (
    <>
      <main>
        <ResearchForm role={role} />
      </main>
      <Footer />
    </>
  );
}
