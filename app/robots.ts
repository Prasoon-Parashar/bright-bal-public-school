
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/admin/login"],
        disallow: [
          "/admin/dashboard",
          "/admin/admissions",
          "/admin/registered-students",
          "/admin/enquiries",
          "/admin/settings",
          "/admin/gallery",
          "/admin/notices",
          "/api/",
        ],
      },
    ],
    sitemap: "https://bright-bal-public-school.vercel.app/sitemap.xml",
    host: "https://bright-bal-public-school.vercel.app",
  };
}
