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
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "WAEC Result Checker & PDF Delivery | Nogadex Consults",
  description:
    "Check your WASSCE, NOVDEC, BECE, GBCE result and get a printable PDF slip emailed to you. GH₵30.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nogadex WAEC",
  },
  alternates: {
    canonical: "https://nogadexconsults.app",
  },
  category: "education",
  keywords: [
    "WAEC Result Checker Ghana",
    "WASSCE Result 2025",
    "Buy WASSCE Result Checker with MoMo",
    "Download WAEC Result Slip PDF",
    "NOVDEC Result Checker Ghana",
    "BECE Results Checker 2025",
    "Check WAEC Result on Phone Ghana",
    "Nogadex Consults WAEC",
    "WAEC PDF Delivery Service",
    "ghana waecdirect org checker",
    "MTN MoMo WAEC checker voucher",
    "Telecel Cash WAEC result checker",
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

        {/* Search Engine Verification Tags */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
        {process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && (
          <meta
            name="msvalidate.01"
            content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION}
          />
        )}

        {/* Geo Targeting — Tells search engines this site targets Ghana */}
        <meta name="geo.region" content="GH" />
        <meta name="geo.placename" content="Ghana" />
        <meta name="ICBM" content="7.9465, -1.0232" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="author" content="Nogadex Consults" />

        {/* AEO & SEO Structured Data Graph (Schema.org) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://nogadexconsults.app/#organization",
                  "name": "Nogadex Consults",
                  "url": "https://nogadexconsults.app",
                  "logo": "https://nogadexconsults.app/logo.png",
                  "description":
                    "Ghana's premier educational verification service providing official WAEC result checking and printable PDF result slip delivery.",
                  "areaServed": "Ghana",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+233593000000",
                    "contactType": "customer service",
                    "availableLanguage": ["English", "Twi"],
                  },
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://nogadexconsults.app/#webapp",
                  "name": "Nogadex Consults WAEC Result Checker",
                  "url": "https://nogadexconsults.app",
                  "applicationCategory": "EducationalApplication",
                  "operatingSystem": "All",
                  "offers": {
                    "@type": "AggregateOffer",
                    "lowPrice": "18.00",
                    "highPrice": "30.00",
                    "priceCurrency": "GHS",
                  },
                  "description":
                    "Fast, secure WAEC result checking and printable PDF result slip delivery service in Ghana.",
                },
                {
                  "@type": "Service",
                  "@id": "https://nogadexconsults.app/#service",
                  "name": "WAEC Result Checking & Printable PDF Delivery",
                  "provider": { "@id": "https://nogadexconsults.app/#organization" },
                  "areaServed": "Ghana",
                  "serviceType": "Educational Document Delivery",
                  "description":
                    "Complete verification of WASSCE, NOVDEC, BECE results on ghana.waecdirect.org with automated PDF slip delivery to email and mobile phone.",
                },
                {
                  "@type": "HowTo",
                  "name": "How to Check Your WAEC Result and Get a Printable PDF Slip in Ghana",
                  "description":
                    "Step-by-step guide to checking WASSCE, NOVDEC, or BECE results online and receiving an official printable PDF result slip on your phone.",
                  "step": [
                    {
                      "@type": "HowToStep",
                      "name": "Enter Candidate Information",
                      "text":
                        "Visit nogadexconsults.app and enter your 10-digit WAEC Index Number, select your Exam Type (WASSCE, NOVDEC, BECE), Exam Year, and Date of Birth.",
                    },
                    {
                      "@type": "HowToStep",
                      "name": "Pay Securely via Mobile Money",
                      "text":
                        "Select Mobile Money (MTN MoMo, Telecel Cash, AT Money) or Card, enter your phone number, and approve the payment prompt.",
                    },
                    {
                      "@type": "HowToStep",
                      "name": "Receive and Download Your Result Slip PDF",
                      "text":
                        "Your official printable WAEC result slip PDF is generated, verified, and sent directly to your email and tracking screen ready for printing.",
                    },
                  ],
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "How do I check my WASSCE / NOVDEC / BECE result online in Ghana?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text":
                          "Visit nogadexconsults.app, enter your 10-digit Index Number, select Exam Type and Exam Year, pay GH₵30.00 securely via Mobile Money (MTN, Telecel, AT), and your official printable PDF result slip will be delivered to your email and phone immediately.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "Can I pay for WAEC Result Checker with Mobile Money (MoMo)?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text":
                          "Yes, Nogadex Consults supports instant Mobile Money payments across all Ghanaian networks including MTN MoMo, Telecel Cash, AT Money, and Visa/Mastercard.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "How do I download my WAEC result slip as a PDF without going to a cyber cafe?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text":
                          "Nogadex Consults automatically converts and formats your official WAEC grade breakdown into a high-resolution, printable PDF slip delivered straight to your email inbox and available for 1-tap download on your smartphone.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "What if the WAEC portal is down or slow on release day?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text":
                          "Nogadex Consults queues your request securely. Our automated system monitors the WAEC portal and retrieves your result the instant servers respond, delivering your PDF without you having to repeatedly refresh a crashing website.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-red-600 selection:text-white"
        style={{ fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif" }}
      >
        {children}

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