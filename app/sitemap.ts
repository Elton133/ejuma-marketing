import type { MetadataRoute } from "next";
import { TRADES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://beagine.com";
  
  const tradeRoutes = TRADES.map((trade) => ({
    url: `${base}/hire/${trade.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/features`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/waitlist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/install`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...tradeRoutes,
  ];
}
