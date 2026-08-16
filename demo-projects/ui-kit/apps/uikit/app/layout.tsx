import { IBM_Plex_Mono, Manrope } from "next/font/google"

import "@ui-kit/ui/globals.css"
import { Toaster } from "@ui-kit/ui/components/sonner"
import { TooltipProvider } from "@ui-kit/ui/components/tooltip"
import { SiteHeader } from "@/components/site-header"
import { CustomizeSheet } from "@/components/showcase/customize-sheet"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@ui-kit/ui/lib/utils"

// Inter/Geist/Roboto/Fraunces/Plus Jakarta Sans/Space Grotesk are flagged as
// overused defaults by the Impeccable design-quality check. Manrope covers
// both --font-sans and --font-heading (a component-library site's headings
// are labels, not a marketing voice — one distinctive family is enough).
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "style-nova antialiased",
        fontMono.variable,
        "font-sans",
        sans.variable
      )}
      style={{ "--font-heading": "var(--font-sans)" } as React.CSSProperties}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <SiteHeader />
            {children}
            <CustomizeSheet />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
        {/* impeccable-live-start */}
        {process.env.NODE_ENV === "development" ? (
          <script
            async
            src="http://localhost:8400/live.js?token=eb9ecef2-a56a-424a-a53f-fc71b5512965"
          />
        ) : null}
        {/* impeccable-live-end */}
      </body>
    </html>
  )
}
