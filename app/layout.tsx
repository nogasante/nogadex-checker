import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WAEC Result Checker + Official PDF Delivery | Nogadex Consults",
  description:
    "Check your WASSCE, NOVDEC, BECE, GBCE result and receive the official high-resolution PDF certificate directly in your email for GH₵30.00.",
  keywords: [
    "WAEC Result Checker Ghana",
    "WASSCE Result 2025",
    "NOVDEC Result Checker",
    "BECE Result Checker",
    "Nogadex Consults",
    "WAEC PDF Delivery",
  ],
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
      className={`${plusJakarta.variable} ${outfit.variable} h-full antialiased font-sans`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#080d1a] text-slate-100 selection:bg-red-600 selection:text-white"
      >
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}