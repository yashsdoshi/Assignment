import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
//import "./globals.css";
//import Providers from "./nextauth_providers";
import { CssBaseline } from '@mui/material';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To Do App",
  description: "create todo lists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <Providers>
          {children}
        </Providers> */}
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
