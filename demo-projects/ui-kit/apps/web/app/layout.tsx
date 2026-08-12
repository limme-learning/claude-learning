import { IBM_Plex_Mono, Manrope } from "next/font/google"

import "@workspace/ui/globals.css"
import { Toaster } from "@workspace/ui/components/sonner"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils";

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
      className={cn("antialiased", fontMono.variable, "font-sans", sans.variable)}
      style={{ "--font-heading": "var(--font-sans)" } as React.CSSProperties}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <SiteHeader />
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
