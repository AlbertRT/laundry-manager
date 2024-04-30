import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/styles/globals.css";
import Sidebar from "@/components/Navigation/Sidebar";
import Header from "@/components/Navigation/Header";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className={"flex min-h-screen w-full flex-col bg-background"}>
            <Sidebar />
            <div className={"flex flex-col sm:gap-4 sm:py-4 sm:pl-14"}>
                <Header />
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}
