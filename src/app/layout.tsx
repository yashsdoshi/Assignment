import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import StoreProvider from "./redux/store_provider";

export const metadata: Metadata = {
  title: "Todoist | Create todo lists in a very efficient way",
  description: "Create todo lists",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link rel="icon" type="image/x-icon" href="/logo.png" />
        </head>
        <body
          style={{
            margin: 0,
            backgroundImage:
              "repeating-linear-gradient(135deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 10px, transparent 10px, transparent 11px)," +
              "repeating-linear-gradient(22.5deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 10px, transparent 10px, transparent 11px)," +
              "linear-gradient(90deg, hsl(194, 74%, 56%), hsl(266, 74%, 56%), hsl(338, 74%, 56%), hsl(50, 74%, 56%), hsl(122, 74%, 56%))",
            minHeight: "100vh",
            maxHeight: "100%",
          }}
        >
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
