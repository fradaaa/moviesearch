import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Movie Search",
  description: "A site where you can find everything about movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-sky-950">
        <main className="mx-auto my-0 min-h-screen max-w-6xl p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
