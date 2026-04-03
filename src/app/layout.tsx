import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { Metadata } from "next";

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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
          <title>ICU Catalogue</title>
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          <Notifications />
          {children}
        </MantineProvider>
        {/*Cloudflare Web Analytics*/}
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "5feda417a7d545c8a2b5c7fdeb7a2bf6"}'></script>
        {/*End Cloudflare Web Analytics*/}
      </body>
    </html>
  );
}
