import {ActionIcon, Burger, Button, ComboboxData, Container, Group, NativeSelect, Text,} from "@mantine/core";
import {IconSettings} from "@tabler/icons-react";
import React from "react";

export function Header(props: {
    navbarOpened: boolean;
    toggleNavbar: () => void;
    weekdays: string[];
    toggleSaturday: () => void;
    terms: ComboboxData;
    selectedTermValue: string;
    setSelectedTermValue: (value: string) => void;
    modalSettingOpen: () => void;
}) {
    return (
        <header>
            <Container
                size="max"
                style={{
                    height: "56px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Group gap={5}>
                    <Burger
                        opened={props.navbarOpened}
                        onClick={() => {
                            props.toggleNavbar();
                        }}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Text size="lg" fw={700}>
                        ICU Catalogue Classic (2024)
                    </Text>
                </Group>
                <Group gap={5}>
                    <NativeSelect
                        value={props.selectedTermValue}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                            props.setSelectedTermValue(event.currentTarget.value)
                        }
                        data={props.terms}
                    />
                </Group>
                <Group gap={5}>
                    <Button component={"a"} size={"md"} variant={"default"} href="/">Go to Latest</Button>
                    <ActionIcon
                        color="gray"
                        variant="default"
                        size="xl"
                        aria-label="Settings"
                        onClick={props.modalSettingOpen}
                    >
                        <IconSettings/>
                    </ActionIcon>
                </Group>
            </Container>
        </header>
    );
}
