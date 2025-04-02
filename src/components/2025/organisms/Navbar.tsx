import {Stack, Tooltip, UnstyledButton} from "@mantine/core";
import {IconCalendarWeek, IconSearch} from "@tabler/icons-react";

export default function Navbar() {
    return (
        <Stack justify="center" gap={0}>
            <Tooltip label={"Search"} position="right">
                <UnstyledButton component={"a"} href={"/search"}>
                    <IconSearch/>
                </UnstyledButton>
            </Tooltip>
            <Tooltip label={"Timetable"} position="right">
                <UnstyledButton component={"a"} href={"/"}>
                    <IconCalendarWeek/>
                </UnstyledButton>
            </Tooltip>
        </Stack>
    );
};
