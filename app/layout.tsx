import "./globals.css";
import Image from "next/image";
import { Urbanist, Fraunces } from "next/font/google";
import type { Metadata } from "next";
import { ReactQueryProvider } from "@/lib/react-query/provider";
import ConditionalLayout from "@/components/layouts/ConditionalLayout";
import { Toaster } from "sonner";
import Background from "@/assets/images/image_background.png";

export const metadata: Metadata = {
  title: "Lively Events",
  description: "Your event platform",
};

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${urbanist.variable} ${fraunces.variable}`}>
      <body className="min-h-screen overflow-x-hidden text-white font-urbanist">
        {/* === Background Layers === */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,85,34,0.12),_transparent_60%)]" />
        <Image
          src={Background}
          alt="Decorative background lines"
          fill
          className="object-cover opacity-100 pointer-events-none select-none"
        />

        {/* === App Providers & Layout === */}
        <ReactQueryProvider>
          <ConditionalLayout>
            <Toaster position="top-right" theme="dark" richColors />
            {children}
          </ConditionalLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
