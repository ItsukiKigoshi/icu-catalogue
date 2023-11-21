import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript, Container } from "@mantine/core";
import { theme } from "../../theme";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICU Catalogue",
  description: `'ICU Catalogue' enables ICU students to create their own timetables easily. Please feel free to create issues/pull requests.`,
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
