import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Crimson_Text, Inter, Lato, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const crimson = Crimson_Text({
    weight: ['400', '600', '700'],
    subsets: ["latin"],
    variable: "--font-crimson"
});
const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat"
});
const lato = Lato({
    weight: ['400', '700'],
    subsets: ["latin"],
    variable: "--font-lato"
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
            <body className={`${inter.variable} ${crimson.variable} ${montserrat.variable} ${lato.variable} font-sans antialiased`}>
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
