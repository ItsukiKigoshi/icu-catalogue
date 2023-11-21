"use client";
import {
  Card,
  Text,
  SimpleGrid,
  Anchor,
  Group,
  useMantineTheme,
} from "@mantine/core";
import classes from "./Timetable.module.css";
import React from "react";

interface TimetableItem {
  rgno: string;
  season: string;
  ay: string;
  no: string;
  cno: string | null;
  lang: string;
  section: string | null;
  e: string;
  j: string;
  schedule: string | null;
  room: string | null;
  comment: string | null;
  maxnum: string | null;
  flg: string;
  instructor: string;
  unit: string;
  deleted: string;
  Label1: string | null;
}

const timetableData: TimetableItem[][] = [
  [
    {
      rgno: "20315",
      season: "Autumn",
      ay: "2023",
      no: "GES054",
      cno: null,
      lang: "E",
      section: null,
      e: "S2: The World of Language Interpreters ",
      j: "Ｓ２: 通訳の世界",
      schedule: "5/TH,6/TH,7/TH",
      room: null,
      comment: null,
      maxnum: "(150)",
      flg: "Face to Face",
      instructor: "TAMURA, Tomoko",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "20316",
      season: "Autumn",
      ay: "2023",
      no: "GES055",
      cno: null,
      lang: "E",
      section: null,
      e: "S2: Language documentation and linguistics ",
      j: "Ｓ２：言語記録と言語学",
      schedule: "1/TU,2/TU,1/TH",
      room: null,
      comment: null,
      maxnum: "(150)",
      flg: "Face to Face",
      instructor: "LEE, Seunghun",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31188",
      season: "Winter",
      ay: "2023",
      no: "ENV301",
      cno: null,
      lang: "J",
      section: null,
      e: "Environmental Conservation ",
      j: "環境保全",
      schedule: "5/F,6/F",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "TOBAI, Sadayosi",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31189",
      season: "Winter",
      ay: "2023",
      no: "ENV302",
      cno: null,
      lang: "J",
      section: null,
      e: "Environmental Toxicology ",
      j: "環境毒性学",
      schedule: "3/M,3/W",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "FUJINUMA, Ryosuke/NUNOSHIBA, Tatsuo",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31190",
      season: "Winter",
      ay: "2023",
      no: "GSS201",
      cno: null,
      lang: "E",
      section: null,
      e: "Gender and International Relations ",
      j: "ジェンダーと国際関係",
      schedule: "2/M,2/W,2/F",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "TAKAMATSU, Kana",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
  ],
  [
    {
      rgno: "31191",
      season: "Winter",
      ay: "2023",
      no: "HST106",
      cno: null,
      lang: "E",
      section: null,
      e: "History of Japan (Modern) III ",
      j: "日本史（近代）III",
      schedule: "3/TU,2/TH,3/TH",
      room: null,
      comment: null,
      maxnum: "(180)",
      flg: "Face to Face",
      instructor: "BORLAND, Janet Lorraine",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31192",
      season: "Winter",
      ay: "2023",
      no: "HST222",
      cno: null,
      lang: "E",
      section: null,
      e: "History of Japan in Asia ",
      j: "日本対外交流史",
      schedule: "*4/TU,*4/TH",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "OLAH, Csaba",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31193",
      season: "Winter",
      ay: "2023",
      no: "HST224",
      cno: null,
      lang: "E",
      section: null,
      e: "Modern Japan and ICU ",
      j: "近代日本とICU",
      schedule: "5/TU,6/TU,7/TU",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "KISHI, Yu",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31194",
      season: "Winter",
      ay: "2023",
      no: "HST226",
      cno: null,
      lang: "J",
      section: null,
      e: "Introductory Readings in Early Modern Japanese History ",
      j: "近世日本史文献基礎講読",
      schedule: "5/F,6/F",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "TSUBAKIDA, Yukiko",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31195",
      season: "Winter",
      ay: "2023",
      no: "HST228",
      cno: null,
      lang: "E",
      section: null,
      e: "Introductory Readings in Contemporary Japanese History ",
      j: "現代日本史文献基礎講読",
      schedule: "1/TU,2/TU",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "BORLAND, Janet Lorraine",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
  ],
  [
    {
      rgno: "31196",
      season: "Winter",
      ay: "2023",
      no: "HST234",
      cno: null,
      lang: "J",
      section: null,
      e: "History of Southeast Asia ",
      j: "東南アジア史",
      schedule: "5/F,6/F,7/F",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "NEMOTO, Kei",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31197",
      season: "Winter",
      ay: "2023",
      no: "HST235",
      cno: null,
      lang: "J",
      section: null,
      e: "History of the Middle East ",
      j: "中東史",
      schedule: "5/TU,6/TU,7/TU",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "TSUJI, Asuka",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31198",
      season: "Winter",
      ay: "2023",
      no: "HST239",
      cno: null,
      lang: "J",
      section: null,
      e: "Introductory Readings in Modern East Asian History ",
      j: "近代東アジア史文献基礎講読",
      schedule: "5/W,6/W",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "KIKUCHI, Hideaki",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31199",
      season: "Winter",
      ay: "2023",
      no: "HST242",
      cno: null,
      lang: "J",
      section: null,
      e: "Economic History of Europe ",
      j: "ヨーロッパ経済史",
      schedule: "5/M,6/M,7/M",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "KONISHI, Emi",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31200",
      season: "Winter",
      ay: "2023",
      no: "HST321",
      cno: null,
      lang: "J",
      section: null,
      e: "Colloquium in Medieval Japanese History ",
      j: "中世日本史特別研究",
      schedule: "5/M,6/M,7/M",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "OLAH, Csaba",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
  ],
  [
    {
      rgno: "31201",
      season: "Winter",
      ay: "2023",
      no: "HST342",
      cno: null,
      lang: "J",
      section: null,
      e: "Colloquium in European History II ",
      j: "西洋史特別研究 II",
      schedule: "5/F,6/F,7/F",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "YAMAMOTO, Taeko",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31202",
      season: "Winter",
      ay: "2023",
      no: "IRL103",
      cno: null,
      lang: "E",
      section: null,
      e: "Japan's International Relations ",
      j: "日本の国際関係",
      schedule: "3/TU,2/TH,3/TH",
      room: null,
      comment: null,
      maxnum: "(180)",
      flg: "Face to Face",
      instructor: "VOSSE, Wilhelm M.",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31203",
      season: "Winter",
      ay: "2023",
      Label1: "[change]",
      no: "IRL220",
      cno: null,
      lang: "J",
      section: null,
      e: "Global Civil Society ",
      j: "地球市民社会論",
      schedule: "2/TH,3/TH",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "MORI, Katsuhiko",
      unit: "2",
      deleted: "true",
    },
    {
      rgno: "31204",
      season: "Winter",
      ay: "2023",
      no: "IRL236",
      cno: null,
      lang: "E",
      section: null,
      e: "Politics and International Relations in Korea ",
      j: "朝鮮半島の政治と国際関係",
      schedule: "5/W,6/W",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "SUH, Jae-Jung",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31205",
      season: "Winter",
      ay: "2023",
      no: "IRL239",
      cno: null,
      lang: "E",
      section: null,
      e: "Politics and International Relations in the Middle East ",
      j: "中東の政治と国際関係",
      schedule: "5/F,6/F",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "IKEDA, Akifumi",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
  ],
  [
    {
      rgno: "31206",
      season: "Winter",
      ay: "2023",
      no: "IRL311",
      cno: null,
      lang: "J",
      section: null,
      e: "Global Environment and Sustainable Development ",
      j: "地球環境と持続可能な開発",
      schedule: "1/TU,2/TU",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "MORI, Katsuhiko",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31207",
      season: "Winter",
      ay: "2023",
      no: "IRL381",
      cno: null,
      lang: "E",
      section: null,
      e: "Advanced Studies in International Security ",
      j: "国際安全保障特別研究",
      schedule: "4/W,5/W",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "VOSSE, Wilhelm M.",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31208",
      season: "Winter",
      ay: "2023",
      no: "IRL385",
      cno: null,
      lang: "E",
      section: null,
      e: "Advanced Studies in Human Security ",
      j: "人間の安全保障特別研究",
      schedule: "6/TH,7/TH",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "SHANI, Giorgiandrea",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31209",
      season: "Winter",
      ay: "2023",
      no: "IRL388",
      cno: null,
      lang: "E",
      section: null,
      e: "Advanced Studies in International Relations ",
      j: "国際関係学特別研究",
      schedule: "5/TH,6/TH",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "SALTON, Herman",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31210",
      season: "Winter",
      ay: "2023",
      Label1: "[change]",
      no: "ISC102",
      cno: null,
      lang: "J",
      section: null,
      e: "Elements of Discrete Mathematics ",
      j: "離散数学基礎",
      schedule: null,
      room: "I-212",
      comment: null,
      maxnum: "(63)",
      flg: "Face to Face",
      instructor: "TBA",
      unit: "2",
      deleted: "false",
    },
  ],
  [
    {
      rgno: "31211",
      season: "Winter",
      ay: "2023",
      no: "ISC106",
      cno: null,
      lang: "J",
      section: null,
      e: "Laboratory in Information Science ",
      j: "情報科学実験",
      schedule: "5/TH,(6/TH,7/TH)",
      room: "I-106",
      comment: null,
      maxnum: "(81)",
      flg: "Face to Face",
      instructor: "KABURAGI, Takashi",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31212",
      season: "Winter",
      ay: "2023",
      no: "ISC212",
      cno: null,
      lang: "J",
      section: null,
      e: "Information Network Security ",
      j: "情報ネットワークセキュリティー",
      schedule: "5/TH,(6/TH,7/TH)",
      room: "I-206",
      comment: null,
      maxnum: "(50)",
      flg: "Face to Face",
      instructor: "ISHIBASHI, Keisuke",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31213",
      season: "Winter",
      ay: "2023",
      no: "ISC225",
      cno: null,
      lang: "J",
      section: null,
      e: "Data Science Concepts ",
      j: "データサイエンス概念",
      schedule: "5/M,(6/M,7/M)",
      room: "I-206",
      comment: null,
      maxnum: "(50)",
      flg: "Face to Face",
      instructor: "ISHIBASHI, Keisuke",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31214",
      season: "Winter",
      ay: "2023",
      no: "ISC251",
      cno: null,
      lang: "J",
      section: null,
      e: "Multimedia Systems ",
      j: "マルチメディアシステム",
      schedule: "5/M,(6/M,7/M)",
      room: "I-212",
      comment: null,
      maxnum: "(63)",
      flg: "Face to Face",
      instructor: "OHTA, Keiji",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31215",
      season: "Winter",
      ay: "2023",
      no: "ISC313",
      cno: null,
      lang: "E",
      section: null,
      e: "Database Systems ",
      j: "デ一タベ一ス論",
      schedule: "5/TH,6/TH",
      room: null,
      comment: null,
      maxnum: "(150)",
      flg: "Online",
      instructor: "KUTICSNE MATZ, Andrea",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
  ],
  [
    {
      rgno: "31216",
      season: "Winter",
      ay: "2023",
      no: "ISC315",
      cno: null,
      lang: "J",
      section: null,
      e: "Senior Seminar in Information Science I ",
      j: "情報科学四年次セミナー I",
      schedule: "2/TH,3/TH",
      room: "I-212",
      comment: null,
      maxnum: "(63)",
      flg: "Face to Face",
      instructor: "KABURAGI, Takashi",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31217",
      season: "Winter",
      ay: "2023",
      no: "ISC342",
      cno: null,
      lang: "J",
      section: null,
      e: "Robotics ",
      j: "ロボット工学",
      schedule: "4/F,5/F,6/F",
      room: "I-212",
      comment: null,
      maxnum: "(63)",
      flg: "Face to Face",
      instructor: "KABURAGI, Takashi",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31218",
      season: "Winter",
      ay: "2023",
      no: "ISC343",
      cno: null,
      lang: "J",
      section: null,
      e: "Topics in Information Technology ",
      j: "情報技術特論",
      schedule: "4/M,4/W",
      room: "I-212",
      comment: null,
      maxnum: "(63)",
      flg: "Face to Face",
      instructor: "OHTA, Keiji",
      unit: "2",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31219",
      season: "Winter",
      ay: "2023",
      no: "LED102",
      cno: null,
      lang: "J",
      section: null,
      e: "Principles of Language Learning and Teaching ",
      j: "言語教授法原論",
      schedule: "3/M,3/W,3/F",
      room: null,
      comment: null,
      maxnum: "(180)",
      flg: "Face to Face",
      instructor: "SHIROZA, Saran/TSUJITA, Mari",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
    {
      rgno: "31220",
      season: "Winter",
      ay: "2023",
      no: "LED214",
      cno: null,
      lang: "E",
      section: null,
      e: "Pragmatics and Language Learning ",
      j: "言語学習における語用論",
      schedule: "3/TU,2/TH,3/TH",
      room: null,
      comment: null,
      maxnum: null,
      flg: "Face to Face",
      instructor: "QUAY, Suzanne",
      unit: "3",
      deleted: "false",
      Label1: null,
    },
  ],
];

export function Timetable() {
  const theme = useMantineTheme();

  const weekDays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const weekDayItems = weekDays.map((day) => (
    <Card key={day} className={classes.item} style={{ height: "30px" }}>
      <Text size="lg" mt={3} fw={700}>
        {day}
      </Text>
    </Card>
  ));

  const timetableItems: JSX.Element[][] = [];

  for (let i = 0; i < timetableData.length; i++) {
    timetableItems[i] = timetableData[i].map((item) => (
      <Card key={item.no} className={classes.item} p={1}>
        <Text size="xs">{item.e}</Text>
      </Card>
    ));
  }

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group justify="space-between">
        <Text className={classes.title}>Timetable</Text>
        <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}></Anchor>
      </Group>
      <SimpleGrid cols={6} spacing="xs" verticalSpacing="xs" mt="md">
        <Card></Card>
        {weekDayItems}
        <Card className={classes.item} p={1}>
          <Text size="xs" c="dimmed">
            8:50
          </Text>
          <Text size="md" my="10">
            1
          </Text>
          <Text size="xs" c="dimmed">
            10:00
          </Text>
        </Card>
        {timetableItems[0]}
        <Card className={classes.item} p={1}>
          <Text size="xs" c="dimmed">
            10:10
          </Text>
          <Text size="md" my="10">
            2
          </Text>
          <Text size="xs" c="dimmed">
            11:20
          </Text>
        </Card>
        {timetableItems[1]}
        <Card className={classes.item} p={1}>
          <Text size="xs" c="dimmed">
            11:30
          </Text>
          <Text size="md" my="10">
            3
          </Text>
          <Text size="xs" c="dimmed">
            12:40
          </Text>
        </Card>
        {timetableItems[2]}
        <Card className={classes.item} p={1}>
          <Text size="md" my="10">
            Lunch
          </Text>
        </Card>
        {timetableItems[2]}
        <Card className={classes.item} p={1}>
          <Text size="xs" c="dimmed">
            13:50
          </Text>
          <Text size="md" my="10">
            4
          </Text>
          <Text size="xs" c="dimmed">
            15:00
          </Text>
        </Card>
        {timetableItems[3]}
        <Card className={classes.item} p={1}>
          <Text size="xs" c="dimmed">
            15:10
          </Text>
          <Text size="md" my="10">
            5
          </Text>
          <Text size="xs" c="dimmed">
            16:20
          </Text>
        </Card>
        {timetableItems[4]}
        <Card className={classes.item} p={1}>
          <Text size="xs" c="dimmed">
            16:30
          </Text>
          <Text size="md" my="10">
            6
          </Text>
          <Text size="xs" c="dimmed">
            17:40
          </Text>
        </Card>
        {timetableItems[5]}
        <Card className={classes.item} p={1}>
          <Text size="xs" c="dimmed">
            17:50
          </Text>
          <Text size="md" my="10">
            7
          </Text>
          <Text size="xs" c="dimmed">
            19:00
          </Text>
        </Card>
        {timetableItems[6]}
      </SimpleGrid>
    </Card>
  );
}
