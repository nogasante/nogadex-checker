import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "WAEC Result Checker & PDF Delivery | Nogadex Consults",
  description:
    "Check your WASSCE, NOVDEC, BECE, GBCE result and get a printable PDF slip emailed to you. GH₵30.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nogadex WAEC",
  },
  keywords: [
    "WAEC Result Checker Ghana",
    "WASSCE Result 2025",
    "NOVDEC Result Checker",
    "BECE Result Checker",
    "Nogadex Consults",
    "WAEC PDF Delivery",
  ],
  openGraph: {
    title: "WAEC Result Checker & Printable PDF Delivery | Nogadex Consults",
    description:
      "Check your WASSCE, NOVDEC & BECE results online and get your official printable PDF result slip delivered to your phone & email. Fast & secure.",
    url: "https://nogadexconsults.app",
    siteName: "Nogadex Consults",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Nogadex Consults WAEC Results Checker",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WAEC Result Checker & PDF Delivery | Nogadex Consults",
    description:
      "Check WASSCE, NOVDEC & BECE results with instant PDF delivery. GH₵30.00.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-red-600 selection:text-white"
        style={{ fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif" }}
      >
        <ClerkProvider>
          {children}
        </ClerkProvider>

        {/* 1-Tap PWA Install & Notification Banner */}
        <PwaInstallPrompt />

        {/* Service Worker Auto-Registration for PWA & Push Notifications */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('SW registration note:', err.message);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}