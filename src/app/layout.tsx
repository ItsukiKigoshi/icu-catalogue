import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import {CssBaseline, ThemeProvider} from "@mui/material";
import darkTheme from "@/src/lib/theme";
import BottomNav from "@/src/components/2025/molecules/BottomNav/BottomNav";


export default function RootLayout({children}: { children: any }) {
    return (
        <html lang="en">
        <body>
        <AppRouterCacheProvider>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                {children}
                <BottomNav/>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
