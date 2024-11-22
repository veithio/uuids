import type {Metadata} from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import {cn} from "@/lib/utils";
import { ReactNode } from "react";
import {ThemeProvider} from "@/components/providers/theme.provider";

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: "UUIDs",
    description: "Random UUIDs to copy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
      <html lang="en" className={cn(inter.className, "antialiased")} suppressHydrationWarning={process.env.NODE_ENV === 'production'}>
      <body>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
