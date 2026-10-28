import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { getAllCourses } from "@/data/courses";
import { WORK_READY } from "@/data/work";

// No `lastModified`: the pages have no tracked edit date, and stamping every URL with the
// build time would tell crawlers everything changed on every deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/courses",
    "/why-kala",
    // Listed once its first chapter of photographs exists; until then the page is noindex.
    ...(WORK_READY ? ["/the-work"] : []),
    "/about",
    "/contact",
  ].map((path) => ({ url: `${siteUrl}${path}` }));

  const courseRoutes: MetadataRoute.Sitemap = getAllCourses().map((course) => ({
    url: `${siteUrl}/courses/${course.slug}`,
  }));

  return [...staticRoutes, ...courseRoutes];
}
