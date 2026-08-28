import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WAEC Result Checker & PDF Delivery | Nogadex Consults",
  description:
    "Check your WASSCE, NOVDEC, BECE, GBCE result and get a printable PDF slip emailed to you. GH₵30.",
  keywords: [
    "WAEC Result Checker Ghana",
    "WASSCE Result 2025",
    "NOVDEC Result Checker",
    "BECE Result Checker",
    "Nogadex Consults",
    "WAEC PDF Delivery",
  ],
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
      </body>
    </html>
  );
}