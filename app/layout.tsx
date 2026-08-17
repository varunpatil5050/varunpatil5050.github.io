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
  title: "Varun Patil — ML & Software Engineer",
  description: "Varun Patil engineers intelligent products across machine learning, distributed systems, and thoughtful design.",
  openGraph: {
    title: "Varun Patil — ML & Software Engineer",
    description: "Engineering intelligence into motion.",
    type: "website",
    images: [{ url: "/og-v2.png", width: 1731, height: 909, alt: "Varun Patil — engineering intelligence into motion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Varun Patil — ML & Software Engineer",
    description: "Engineering intelligence into motion.",
    images: ["/og-v2.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
