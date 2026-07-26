import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { seo } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${seo.siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${seo.siteUrl}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${seo.siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${seo.siteUrl}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${seo.siteUrl}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
