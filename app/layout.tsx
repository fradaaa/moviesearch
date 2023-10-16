import Header from "@/components/header/Header";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--montserrat",
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
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-sky-950 text-white">
        <Header />
        <main className="mx-auto my-0 min-h-screen max-w-6xl p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
