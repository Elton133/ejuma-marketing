import type { Metadata } from "next";
import { ProductStoryPage } from "@/components/ProductStoryPage";
import { vendorStory } from "@/lib/product-stories";
export const metadata: Metadata = { title: "For vendors", description: "Bring your shop online, manage products and orders, and reach local service demand through Beagine." };
export default function VendorsPage(){ return <ProductStoryPage {...vendorStory}/>; }
