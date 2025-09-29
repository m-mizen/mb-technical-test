import type { Metadata } from "next";
import { Lora, Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moneybox Web App",
  description: "A simple web app showcasing a list of products and their details.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${lora.variable} antialiased`}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-white text-black px-4 py-2 rounded shadow"
        >
          Jump to content
        </a>
        <div className="font-sans grid grid-rows-[80px_1fr] justify-items-stretch min-h-screen">
          <Header />
          <main id="content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
