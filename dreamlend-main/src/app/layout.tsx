import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ContextProvider from "@/context";
import Navigation from "@/components/Navigation";
import SpaceBackground from "@/components/SpaceBackground";
import {
  generateSEOMetadata,
  generateOrganizationSchema,
  StructuredData,
} from "@/lib/seo";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "P2P Lending / Borrowing",
    description:
      "Lend, borrow, and earn with letslend Finance - the most secure P2P crypto lending platform built on Somnia L1. Get instant crypto loans or earn high yields on your digital assets.",
    canonical: "/",
    keywords: [
      "crypto lending platform",
      "best DeFi lending",
      "secure crypto loans",
      "high yield crypto",
      "Somnia L1 DeFi",
      "institutional crypto lending",
    ],
  }),
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://letslend.finance"
  ),
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <StructuredData data={generateOrganizationSchema()} />

        {/* HARD override: kill any global overlays that might cover canvas */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .gradient-bg { display: none !important; }
              html::before, html::after, body::before, body::after { display: none !important; }
            `,
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NFR4X8L7V8" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NFR4X8L7V8');
            `,
          }}
        />
      </head>

      <body className="min-h-screen antialiased text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <ContextProvider>
            <div className="relative min-h-screen">
              {/* z-0 canvas background */}
              <SpaceBackground />

              {/* all app UI above the canvas */}
              <div className="relative z-10">
                <Navigation />
                <main>
                  <div className="container mx-auto px-4 lg:px-6 py-6">
                    {children}
                  </div>
                </main>
                <Toaster
                  position="top-right"
                  expand={false}
                  richColors={true}
                  closeButton={true}
                  toastOptions={{
                    style: {
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      color: "hsl(var(--card-foreground))",
                    },
                  }}
                />
              </div>
            </div>
          </ContextProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
