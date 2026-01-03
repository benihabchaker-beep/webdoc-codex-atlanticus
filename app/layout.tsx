import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codex Atlanticus 2.0 | L'Héritage Numérique",
  description: "Un voyage immersif dans le sauvetage du manuscrit de Léonard de Vinci.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-[#0f1014] text-slate-100 overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-100">
        {children}
      </body>
    </html>
  );
}
