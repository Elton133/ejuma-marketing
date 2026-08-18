import type { Metadata } from "next";
import { ProductStoryPage } from "@/components/ProductStoryPage";
import { safetyStory } from "@/lib/product-stories";

export const metadata: Metadata = {
  title: "Trust & safety",
  description: "Learn how Beagine builds identity, communication, emergency support and accountability into every job.",
};

export default function SafetyPage() {
  return <ProductStoryPage {...safetyStory} />;
}
