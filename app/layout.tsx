import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Preloader } from "@/components/Preloader";
import { THEME_BOOT_SCRIPT } from "@/components/ThemeToggle";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "María & Malguin — We're getting married",
  description: "Join us to celebrate the wedding of María & Malguin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>
        <Preloader />
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
