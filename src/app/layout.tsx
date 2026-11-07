import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ali Abnar · Software & Product Engineer",
    template: "%s · Ali Abnar",
  },
  description: site.description,
  authors: [{ name: site.author, url: site.github }],
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: "Ali Abnar · Software & Product Engineer",
    url: site.url,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.author,
              url: site.url,
              jobTitle: "Software Engineer",
              description: site.description,
              sameAs: [site.github, site.linkedin],
              knowsAbout: [
                "Frontend engineering",
                "Product engineering",
                "TypeScript",
                "Retrieval-augmented generation",
              ],
            }).replace(/</g, "\u003c"),
          }}
        />
        <Providers>
          <a
            className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:translate-y-0"
            href="#main-content"
          >
            Skip to content
          </a>
          <Header />
          <main
            id="main-content"
            className="page-container page-main"
            tabIndex={-1}
          >
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
