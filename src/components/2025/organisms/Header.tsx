import {ActionIcon, Button, ComboboxData, Container, Group, NativeSelect, Text,} from "@mantine/core";
import {IconSettings} from "@tabler/icons-react";
import React from "react";

export function Header(props: {
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
                    <Text size="lg" fw={700}>
                        ICU Catalogue
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
                    <Button component={"a"} size={"md"} variant={"default"} href="/classic-2024">Go to Classic</Button>
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
