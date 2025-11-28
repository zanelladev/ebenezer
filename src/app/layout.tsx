import type React from "react"
import ConditionalLayout from "@/components/ConditionalLayout"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
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
  title: "Ebenezer Church - Faith, Community, Hope",
  description: "Welcome to Ebenezer Church - A community of faith, love, and hope",
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
