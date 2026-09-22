import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { getAllCourses } from "@/data/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/courses",
    "/why-kala",
    "/the-work",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));

  const courseRoutes: MetadataRoute.Sitemap = getAllCourses().map((course) => ({
    url: `${siteUrl}/courses/${course.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...courseRoutes];
}
