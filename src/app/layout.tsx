import type {Metadata} from "next";
import {Inter} from "next/font/google";
import vazirFont from "@/constants/localFont";
import "@/styles/globals.css";
import {Toaster} from "react-hot-toast";
import AuthProvier from "@/context/AuthContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "برنامه مدیریت تسک های کارکنان",
    description: "برنامه مدیریت تسک های کارکنان",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="fa" dir="rtl" className="dark-mode">
         <body className={`min-h-screen  ${vazirFont.variable} font-sans ${inter.className}`}>
              <Toaster/>
                   <ReactQueryProvider>
                        <AuthProvier>{children}</AuthProvier>
                  </ReactQueryProvider>
         </body>
        </html>
    );
}
