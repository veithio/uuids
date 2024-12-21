import type {Metadata} from "next";
import "./globals.css";
import {Inter} from 'next/font/google'
import {cn} from "@/lib/utils";
import {ReactNode} from "react";
import {Providers} from "@/app/providers";

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
      <html lang="en" className={cn(inter.className, "antialiased")} suppressHydrationWarning>
      <head>
          <script
              dangerouslySetInnerHTML={{
                  __html: `
                      try {
                        if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                          document.querySelector('meta[name="theme-color"]').setAttribute('content', '#09090b')
                        }
                      } catch (_) {}
                    `,
              }}
          />
      </head>
      <body>
      <Providers>
          {children}
      </Providers>
      </body>
      </html>
  );
}
