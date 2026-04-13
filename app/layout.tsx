import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.altensia.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ALTENSIA — Conseil en transformation digitale et intelligence artificielle",
    template: "%s | ALTENSIA",
  },
  description:
    "ALTENSIA accompagne les organisations dans l’accélération de leur transformation digitale grâce à une approche progressive de l’intelligence artificielle : initiation, intégration et automatisation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
