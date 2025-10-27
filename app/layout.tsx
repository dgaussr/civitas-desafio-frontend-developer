import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Painel de Qualidade do Ar - Rio de Janeiro",
  description: "Acompanhe em tempo real a qualidade do ar nos bairros do Rio de Janeiro. Dados atualizados sobre poluição e índice de qualidade do ar (IQA).",
  keywords: ["qualidade do ar", "Rio de Janeiro", "poluição", "IQA", "meio ambiente"],
  authors: [{ name: "Prefeitura do Rio de Janeiro" }],
  openGraph: {
    title: "Painel de Qualidade do Ar - Rio de Janeiro",
    description: "Acompanhe em tempo real a qualidade do ar nos bairros do Rio de Janeiro",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
