import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from '@mui/material/styles'; 
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import theme from './theme/theme';
import StoreProvider from "./redux/store_provider";

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
  description: "Create todo lists",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <StoreProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider theme={theme}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
    </StoreProvider>
  );
}
