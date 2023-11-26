import {
  Anchor,
  Card,
  Group,
  NativeSelect,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import classes from "./RequirementTable.module.css";

const majorRequirements = [
  { course: "EDU113", credit: 3 },
  { course: "DPS101", credit: 7 },
  { course: "IRL102", credit: 39 },
  { course: "PCS101", credit: 56 },
  { course: "PCS102", credit: 58 },
  { course: "ECO101", credit: 58 },
  { course: "ECO102", credit: 58 },
];

const gradRequirements = [
  { course: "Lang.", credit: 3 },
  { course: "GE", credit: 7 },
  { course: "PE", credit: 39 },
  { course: "Found.", credit: 56 },
  { course: "Area", credit: 58 },
];

export default function RequirementTable() {
  const majorRequirementsRows = majorRequirements.map((item) => (
    <Table.Tr key={item.course}>
      <Table.Td>{item.course}</Table.Td>
      <Table.Td>{item.credit}</Table.Td>
    </Table.Tr>
  ));

  const gradRequirementsRows = gradRequirements.map((item) => (
    <Table.Tr key={item.course}>
      <Table.Td>{item.course}</Table.Td>
      <Table.Td>{item.credit}</Table.Td>
    </Table.Tr>
  ));

  return (
    <SimpleGrid cols={{ base: 2, md: 1, lg: 1 }}>
      <Card withBorder radius="md" className={classes.card}>
        <Group justify="space-between">
          <Text className={classes.title}>Major Req.</Text>
          <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}></Anchor>
        </Group>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Subject</Table.Th>
              <Table.Th>Unit</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{majorRequirementsRows}</Table.Tbody>
        </Table>
      </Card>
      <Stack>
        <Card withBorder radius="md" className={classes.card}>
          <Group justify="space-between">
            <Text className={classes.title}>Grad. Req.</Text>
            <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}></Anchor>
          </Group>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Subject</Table.Th>
                <Table.Th>Unit</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{gradRequirementsRows}</Table.Tbody>
          </Table>
        </Card>
        <NativeSelect
          label="Major"
          data={[
            "",
            "American Studies",
            "Anthropology",
            "Art and Cultural Heritage",
            "Asian Studies",
            "Biology",
            "Business",
            "Chemistry",
            "Development Studies",
            "Economics",
            "Education",
            "Environmental Studies",
            "Gender and Sexuality Studies",
            "Global Studies",
            "History",
            "Information Science",
            "International Relations",
            "Japan Studies",
            "Language Education",
            "Law",
            "Linguistics",
            "Literature",
            "Mathematics",
            "Media, Communication and Culture",
            "Music",
            "Peace Studies",
            "Philosophy and Religion",
            "Physics",
            "Politics",
            "Psychology",
            "Public Policy",
            "Sociology",
          ]}
        />
        <NativeSelect
          label="Major 2 / Minor"
          data={[
            "",
            "American Studies",
            "Anthropology",
            "Art and Cultural Heritage",
            "Asian Studies",
            "Biology",
            "Business",
            "Chemistry",
            "Development Studies",
            "Economics",
            "Education",
            "Environmental Studies",
            "Gender and Sexuality Studies",
            "Global Studies",
            "History",
            "Information Science",
            "International Relations",
            "Japan Studies",
            "Language Education",
            "Law",
            "Linguistics",
            "Literature",
            "Mathematics",
            "Media, Communication and Culture",
            "Music",
            "Peace Studies",
            "Philosophy and Religion",
            "Physics",
            "Politics",
            "Psychology",
            "Public Policy",
            "Sociology",
          ]}
        />

        {/* If "Major 2 / Minor" is not selected, this SegmentedControl will be disabled */}
        <SegmentedControl data={["Major 2", "Minor"]} />
      </Stack>
    </SimpleGrid>
  );
}
