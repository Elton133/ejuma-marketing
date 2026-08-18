import type { Metadata } from "next";
import { ProductStoryPage } from "@/components/ProductStoryPage";
import { marketplaceStory } from "@/lib/product-stories";
export const metadata: Metadata = { title: "Marketplace", description: "Discover local shops and source the products and materials behind skilled work on Beagine." };
export default function MarketplacePage(){ return <ProductStoryPage {...marketplaceStory}/>; }
