import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const siteDescription =
  "Paraiba Technology PLC builds practical, reliable and beautiful technology — Ethiopian brilliance translated into modern digital products.";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.ROOT_DOMAIN || "paraibatech.com"}`),
  title: {
    default: "Paraiba Technology PLC",
    template: "%s — Paraiba Technology PLC",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: "Paraiba Technology PLC",
    title: "Paraiba Technology PLC",
    description: siteDescription,
    images: [{ url: "/paraiba-logo-full.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paraiba Technology PLC",
    description: siteDescription,
    images: ["/paraiba-logo-full.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
