import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://beagine.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/features`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/waitlist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/install`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
