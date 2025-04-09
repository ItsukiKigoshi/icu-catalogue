"use client"
import React from 'react';
import {Grid, Skeleton, Stack} from "@mui/material";
import TimetableGrid from "../../atoms/TimetableGrids";
import {atomWithStorage} from "jotai/utils";
import {Course} from "@/src/types/types";
import {useAtom} from "jotai";
import {periods, weekdays} from "@/src/constants/schedule";

export const coursesAtom = atomWithStorage<Course[]>("coursesAtom", [])

const Timetable = () => {
    const [hydrated, setHydrated] = React.useState(false);
    const [courses, setCourses] = useAtom(coursesAtom);

    React.useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) return <Skeleton/>;

    return (
        <Stack>
            {
                periods.map((period) => (
                    <Grid container key={period}>
                        {weekdays.map((day) => {
                            const coursesInSlot = courses.filter(course =>
                                course.schedule.some(schedule =>
                                    // TODO - Make this simpler to process the courses more quickly
                                    (schedule.day === day && schedule.period === period) || (period === "5&6" && (schedule.period == "5" || schedule.period == "6") && schedule.day === day)
                                )
                            );

                            return (
                                <Grid
                                    key={`${day}-${period}`}
                                    size={Math.floor(12 / weekdays.length)}
                                >
                                    <TimetableGrid coursesInSlot={coursesInSlot} day={day} period={period}/>
                                </Grid>
                            );
                        })}
                    </Grid>
                ))
            }
        </Stack>
    );


};

export default Timetable;