import Header from "@/components/layout/Header";
import React from "react";
import type {Metadata} from "next";

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
        <>
            <Header/>
            <div className="container xl:max-w-screen-xl">{children}</div>
        </>
    );
}
