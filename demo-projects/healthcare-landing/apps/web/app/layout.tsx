import { IBM_Plex_Sans, Newsreader } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils";

// Inter/Geist/Roboto/Fraunces/Plus Jakarta Sans/Space Grotesk are flagged as
// overused defaults by the Impeccable design-quality check — picking a pair
// outside that list for a distinct, warmer voice fitting a primary care brand.
const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
})

const headingFont = Newsreader({
  subsets: ["latin"],
  variable: "--font-heading",
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
      className={cn("antialiased", "font-sans", bodyFont.variable, headingFont.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
