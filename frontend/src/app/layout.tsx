import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

export const metadata: Metadata = {
  title: "ÇAKÜ Spor Kulübü",
  description:
    "Çankırı Karatekin Üniversitesi Spor Kulübü - Spor ve E-Spor",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="tr">
      <body className="antialiased min-h-screen flex flex-col">
        {!isAdmin && <ParticleBackground />}
        {!isAdmin && <Navbar />}
        {isAdmin ? (
          children
        ) : (
          <main className="flex-1 relative z-[1]">{children}</main>
        )}
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
