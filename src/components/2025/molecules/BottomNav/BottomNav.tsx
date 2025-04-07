"use client";

import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MapIcon from "@mui/icons-material/Map";
import React from "react";
import {usePathname, useRouter} from "next/navigation";

const actionItems = [
    {path: "/", label: "Timetable", icon: <CalendarMonthIcon/>},
    {path: "/search", label: "Search", icon: <SearchIcon/>},
    {path: "/plan", label: "Plan", icon: <MapIcon/>},
];

const BottomNav = () => {
    const router = useRouter();
    const pathname = usePathname();

    const currentIndex = actionItems.findIndex(item => item.path === pathname);
    const [value, setValue] = React.useState(currentIndex === -1 ? 0 : currentIndex);

    React.useEffect(() => {
        if (currentIndex !== -1) {
            setValue(currentIndex);
        }
    }, [currentIndex]);

    return (
        <Paper sx={{position: "fixed", bottom: 0, left: 0, right: 0}} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    router.push(actionItems[newValue].path);
                }}
            >
                {actionItems.map((item, index) => (
                    <BottomNavigationAction
                        key={item.path}
                        label={item.label}
                        icon={item.icon}
                    />
                ))}
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNav;
