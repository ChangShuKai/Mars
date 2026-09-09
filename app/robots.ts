import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // Replace with your actual domain when deploying
    sitemap: "https://your-domain.com/sitemap.xml",
  };
}
