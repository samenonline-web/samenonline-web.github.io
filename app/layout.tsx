import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samen Online 🇳🇱 • Vriendelijke gids voor Nederlandse bedrijven en websites",
  description: "Ontdek, zoek en steun Nederlandse bedrijven, duurzame initiatieven, e-commerce webshops en tech startups.",
  keywords: ["Samen Online", "Nederlandse bedrijven", "Websites Nederland", "Dutch webshops", "Duurzaam Nederland", "Tech startups NL"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-white text-stone-900 font-sans">
        {children}
      </body>
    </html>
  );
}
