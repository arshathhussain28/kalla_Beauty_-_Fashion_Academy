import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { getAllCourses } from "@/data/courses";

// No `lastModified`: the pages have no tracked edit date, and stamping every URL with the
// build time would tell crawlers everything changed on every deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/courses",
    "/why-kala",
    "/the-work",
    "/about",
    "/contact",
  ].map((path) => ({ url: `${siteUrl}${path}` }));

  const courseRoutes: MetadataRoute.Sitemap = getAllCourses().map((course) => ({
    url: `${siteUrl}/courses/${course.slug}`,
  }));

  return [...staticRoutes, ...courseRoutes];
}
