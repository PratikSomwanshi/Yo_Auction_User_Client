import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionCover from "@/components/sessionCover";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Real Time Auction and Bidding",
    description: "Real Time Auction and Bidding",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionCover>
                    <Navbar />
                    {children}
                </SessionCover>
            </body>
        </html>
    );
}
