import { Anchor, Card, Group, Table, Text } from "@mantine/core";
import classes from "./RequirementTable.module.css";

const elements = [
  { position: 3, name: "Language" },
  { position: 7, name: "General Education" },
  { position: 39, name: "PE" },
  { position: 56, name: "Foundation" },
  { position: 58, name: "Area" },
];

export default function RequirementTable() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.position}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group justify="space-between">
        <Text className={classes.title}>Requirement</Text>
        <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}></Anchor>
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Subject</Table.Th>
            <Table.Th>Unit</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
}
