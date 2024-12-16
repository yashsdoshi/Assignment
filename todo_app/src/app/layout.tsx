import type { Metadata } from "next";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import StoreProvider from "./redux/store_provider";

export const metadata: Metadata = {
  title: "Todoist | Create todo lists in very efficient way",
  description: "Create todo lists",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link rel="icon" type="image/x-icon" href="/logo.png" />
        </head>
        <body style={{ margin: 0, background: 'linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(60,60,60,1) 64%, rgba(255,255,255,1) 100%)', minHeight: '100vh', maxHeight: '100%' }}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
