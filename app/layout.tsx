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
  metadataBase: new URL("https://varunpatil5050.github.io"),
  icons: { icon: "/favicon.svg" },
  title: "Varun Patil — Software Engineer · ML & LLM Systems",
  description:
    "Language models from scratch, real-time collaboration, and evidence-grounded LLM systems. Selected work by Varun Patil, M.Tech at IIIT Hyderabad.",
  openGraph: {
    title: "Varun Patil — Intelligence, built to work.",
    description:
      "Software engineering, language models, and real-time systems. From first principles to the last interaction.",
    type: "website",
    images: [
      {
        url: "/og-v3.png",
        width: 1200,
        height: 630,
        alt: "Varun Patil — Intelligence, built to work.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Varun Patil — Intelligence, built to work.",
    description:
      "Software engineering, language models, and real-time systems.",
    images: ["/og-v3.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
