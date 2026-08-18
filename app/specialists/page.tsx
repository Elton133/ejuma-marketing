import type { Metadata } from "next";
import { ProductStoryPage } from "@/components/ProductStoryPage";
import { specialistStory } from "@/lib/product-stories";
export const metadata: Metadata = { title: "For specialists", description: "Get nearby jobs, manage your work, document results and grow your skilled-trade business with Beagine." };
export default function SpecialistsPage(){ return <ProductStoryPage {...specialistStory}/>; }
