import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Crimson_Text, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const crimson = Crimson_Text({
    weight: ['400', '600', '700'],
    subsets: ["latin"],
    variable: "--font-crimson"
});

export const metadata: Metadata = {
    title: "Ebenezer Church - Faith, Community, Hope",
    description: "Welcome to Ebenezer Church - A community of faith, love, and hope",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${crimson.variable} font-sans antialiased`}>
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
