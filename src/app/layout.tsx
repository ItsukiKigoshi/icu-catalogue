// src/app/layout.tsx

import "@mantine/carousel/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { theme } from "../app/theme";
import './globals.css';

export const metadata: Metadata = {
  title: "ICU Catalogue",
  description: `Brilliant Timetable App Designed for ICU students`,
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <ColorSchemeScript defaultColorScheme="auto" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <Notifications />
          {children}
        </MantineProvider>
        <Analytics />
      </body>
    </html>
  );
}
