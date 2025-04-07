"use client"
import "@mantine/carousel/styles.css";
import {ColorSchemeScript, MantineProvider} from "@mantine/core";
import "@mantine/core/styles.css";
import {Notifications} from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import {Analytics} from "@vercel/analytics/react";

export default function RootLayout({children}: { children: any }) {
    return (
        <html lang="en">
        <head title="icu-catalogue">
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <ColorSchemeScript defaultColorScheme="auto"/>
            <link rel="icon" href="/favicon.ico" sizes="any"/>
            <link rel="shortcut icon" href="./favicon.svg"/>
            <link rel="manifest" href="/manifest.json"/>
            <link rel="apple-touch-icon" href="./icon.png"/>
        </head>
        <body>
        <MantineProvider defaultColorScheme="auto">
            <Notifications/>
            {children}
        </MantineProvider>
        <Analytics/>
        </body>
        </html>
    );
}
