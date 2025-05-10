import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Espace Show + | Site Officiel",
  description: "Organisez vos événements et participez à des événements en toute quiétude et en toute sécurité.",
  keywords: '',
  authors: [{ name: 'Charbel MAMLANKOU -- at AFT GROUP SARL', url: '@MCDev3.0' }],
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="fr" suppressHydrationWarning suppressContentEditableWarning>
      <body className="">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
