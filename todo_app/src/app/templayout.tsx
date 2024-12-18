"use client";
import type { Metadata } from "next";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import StoreProvider from "./redux/store_provider";
import { useAppSelector } from "./redux/hooks";
import ToDoList from "./components/to_do_list/page";

export const metadata: Metadata = {
  title: "Todoist | Create todo lists in very efficient way",
  description: "Create todo lists",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  const lists = useAppSelector((state) => state.task.lists);

  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link rel="icon" type="image/x-icon" href="/logo.png" />
        </head>
        <body style={{ margin: 0, background: 'linear-gradient(to right,rgb(10, 0, 101),rgb(61, 53, 143),rgb(73, 73, 113))', minHeight: '100vh', maxHeight: '100%' }}>
          <ThemeProvider theme={theme}>
            {children}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              {lists.map((list) => (
                <ToDoList key={list.id} listId={list.id} />
              ))}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}