import ConditionalLayout from "@/components/ConditionalLayout"
import { SEOResources } from "@/lib/resources"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const objektiv = Montserrat({
  subsets: ["latin"],
  variable: "--font-objektiv",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: SEOResources.defaultTitle,
  description: SEOResources.defaultDescription,
  icons: {
    icon: '/assets/favicon.png',
    shortcut: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${objektiv.variable} font-sans antialiased`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
