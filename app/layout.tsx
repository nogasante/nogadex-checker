import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WAEC Result Checker + PDF Delivery | Nogadex Consults",
  description:
    "Get your WAEC result (WASSCE, NOVDEC, BECE, GBCE, ABCE) checked and receive an official PDF copy directly in your email for GH₵30.",
  keywords: [
    "WAEC Result Checker",
    "WASSCE Result Ghana",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-blue-600 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
