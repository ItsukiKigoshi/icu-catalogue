// src/app/page.tsx

"use client";
import {AppShell,} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {Header} from "@/src/components/2025/organisms/Header";
import ModalSetting from "@/src/components/2025/molecules/ModalSetting";
import Navbar from "@/src/components/2025/organisms/Navbar";
import Timetable from "@/src/components/2025/organisms/Timetable";
import {useLocalStorage} from "@/src/hooks/classic-2024/useLocalStorage";
import {Course, Term} from "@/src/lib/types";
import {useAtom} from "jotai";
import {selectedCoursesAtom, timetableAtom} from "../stories/atoms";

export default function Page() {
    // This "weekdays" handler can be refactored by using useToggle hook
    const [weekdays, setWeekdays] = useLocalStorage<string[]>("weekdays", [
        "M",
        "TU",
        "W",
        "TH",
        "F",
    ]);
    const toggleSaturday = () => {
        const updatedWeekdays =
            weekdays.length === 5
                ? ["M", "TU", "W", "TH", "F", "SA"]
                : ["M", "TU", "W", "TH", "F"];
        setWeekdays(updatedWeekdays);
    };

    const terms: { group: string; items: Term[] }[] = [
        {
            group: "2023",
            items: [
                {label: "2023S", ay: "2023", season: "Spring", value: "2023Spring"},
                {label: "2023A", ay: "2023", season: "Autumn", value: "2023Autumn"},
                {label: "2023W", ay: "2023", season: "Winter", value: "2023Winter"},
            ],
        },
        {
            group: "2024",
            items: [
                {label: "2024S", ay: "2024", season: "Spring", value: "2024Spring"},
                {label: "2024A", ay: "2024", season: "Autumn", value: "2024Autumn"},
                {label: "2024W", ay: "2024", season: "Winter", value: "2024Winter"},
            ],
        },
        {
            group: "2025",
            items: [
                {label: "2025S", ay: "2025", season: "Spring", value: "2025Spring"},
                {label: "2025A", ay: "2025", season: "Autumn", value: "2025Autumn"},
                {label: "2025W", ay: "2025", season: "Winter", value: "2025Winter"},
            ],
        },
        {
            group: "2026",
            items: [
                {label: "2026S", ay: "2026", season: "Spring", value: "2026Spring"},
                {label: "2026A", ay: "2026", season: "Autumn", value: "2026Autumn"},
                {label: "2026W", ay: "2026", season: "Winter", value: "2026Winter"},
            ],
        },
    ];
    const [selectedTermValue, setSelectedTermValue] = useState("2025Spring");
    const selectedTerm = terms
        .flatMap(term => term.items)
        .find(term => term.value === selectedTermValue);

    const [language, setLanguage] = useLocalStorage<string>("language", "E");

    const [
        modalSettingOpened,
        {open: modalSettingOpen, close: modalSettingClose},
    ] = useDisclosure(false);


    // const timetable: { [key: string]: Course[] } = {};
    const [selectedCourses, setSelectedCourses] = useAtom(selectedCoursesAtom);
    const [timetableCells] = useAtom(timetableAtom);

    const coursesInSelectedTerm = selectedCourses.filter(
        (course) =>
            course.season === selectedTerm?.season &&
            course.ay.toString() === selectedTerm?.ay
    );
    useEffect(() => {
        console.log("coursesInSelectedTerm:", coursesInSelectedTerm);
    }, [coursesInSelectedTerm]);

    const toggleIsEnrolled = (regno: number) => {
        setSelectedCourses(prev =>
            prev.map(course =>
                course.regno === regno ? {...course, isEnrolled: !course.isEnrolled} : course
            )
        );
    };

    // Update a certain course in the list "courses"
    // If the course is not in the list, add it
    const updateCourse = (course: Course) => {
        setSelectedCourses(prev => {
            const index = prev.findIndex(c => c.regno === course.regno);
            return index !== -1
                ? prev.map((c, i) => i === index ? course : c)
                : [...prev, course];
        });
    };

    // Delete a certain course from the list "courses"
    const deleteCourse = (regno: number) => {
        setSelectedCourses(prev => prev.filter(course => course.regno !== regno));
    };

    return (
        <AppShell
            header={{height: 60}}
            navbar={{
                width: "40px",
                breakpoint: "sm",
                collapsed: {mobile: true}
            }}
        >
            <AppShell.Header>
                <Header
                    weekdays={weekdays}
                    toggleSaturday={() => {
                        toggleSaturday();
                    }}
                    terms={terms}
                    selectedTermValue={selectedTermValue}
                    setSelectedTermValue={setSelectedTermValue}
                    modalSettingOpen={modalSettingOpen}
                />
                <ModalSetting
                    modalSettingOpened={modalSettingOpened}
                    close={modalSettingClose}
                    weekdays={weekdays}
                    toggleSaturday={() => {
                        toggleSaturday();
                    }}
                    languageController={{
                        language,
                        setLanguage,
                    }}
                    courses={selectedCourses}
                    setCourses={setSelectedCourses}
                />
            </AppShell.Header>
            <AppShell.Navbar>
                <Navbar/>
            </AppShell.Navbar>
            <AppShell.Main>
                <Timetable
                    // timetableCells={timetableCells}
                    enrolledCourses={coursesInSelectedTerm.filter(course => course.isEnrolled)}
                    courseController={{
                        toggleIsEnrolled,
                        updateCourse,
                        deleteCourse,
                    }}
                    language={language}
                    weekdays={weekdays}
                />
            </AppShell.Main>
            {/* <AppShell.Footer
        withBorder={false}
        h="60px"
        style={{ background: "rgba(0,0,0,0)" }}
      >

      </AppShell.Footer> */}
        </AppShell>
    );
}