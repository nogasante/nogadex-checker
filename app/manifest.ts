import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nogadex Consults - WAEC Results Checker",
    short_name: "Nogadex WAEC",
    description: "Check your WASSCE, NOVDEC, BECE, GBCE result and receive your official PDF result slip instantly.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#dc2626",
    orientation: "portrait",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
