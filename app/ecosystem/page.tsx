import type { Metadata } from "next";
import { ProductStoryPage } from "@/components/ProductStoryPage";
import { ProductFamilySwitcher } from "@/components/ProductFamilySwitcher";
import { ecosystemStory } from "@/lib/product-stories";

export const metadata: Metadata = {
  title: "Engineering ecosystem",
  description: "See how Beagine connects customers, skilled specialists and local vendors in one engineering ecosystem.",
};

export default function EcosystemPage() {
  return <ProductStoryPage {...ecosystemStory} featureStyleHero={false} hideFinalShowcase afterStats={<ProductFamilySwitcher />} />;
}
