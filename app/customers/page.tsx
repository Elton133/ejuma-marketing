import type { Metadata } from "next";
import { ProductStoryPage } from "@/components/ProductStoryPage";
import { customerStory } from "@/lib/product-stories";
export const metadata: Metadata = { title: "For customers", description: "Find trusted specialists, manage bookings, stay safe and shop for materials with Beagine." };
export default function CustomersPage(){ return <ProductStoryPage {...customerStory}/>; }
