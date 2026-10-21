
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/admin/login"],
      disallow: ["/admin/", "/api/"],
    },
    sitemap: "https://bright-bal-public-school.vercel.app/sitemap.xml",
  };
}
