import React from 'react';
import {Box, Grid, Paper, Stack, Typography} from "@mui/material";
import {Course} from "@/src/types/types";
import {normalPeriodHeight, superPeriodHeight} from "@/src/constants/periodHeights";

const TimetableCourseCard = (props: { course: Course, numOfCourses: number, day: string, period: string }) => {
    const checkIfSuper = (course: Course, day: string, period: string): boolean => {
        // If the course is in period 4, 5, or 7, it cannot be super
        if (!["4", "5", "7"].includes(period)) {
            return false;
        }

        // Otherwise, check the schedule for isSuper
        return course.schedule.some(
            item => (item.day === day && item.period === period && item.isSuper) || ((props.period === "5&6") && item.day === day && item.period === "5&6" && item.isSuper)
        );
    };
    const isSuper = checkIfSuper(props.course, props.day, props.period)

    const courseCardHeight = isSuper ? superPeriodHeight + normalPeriodHeight : normalPeriodHeight;


    return (
        <Grid size={12 / props.numOfCourses}>
            <Stack>
                {
                    // Check if the course is super 4, and show blank if it's normal 4
                    !isSuper && props.period == "4" ? (
                        <Box sx={{height: superPeriodHeight, overflow: 'hidden'}}></Box>) : null
                }
                {
                    // Show blank if it's normal 6
                    // TODO - This will 無駄にする the rest of the Stack in 5&6 grid component
                    !isSuper && props.course.schedule.some(schedule =>
                        // TODO - Make this simpler to process the courses more quickly
                        (props.period == "5&6" && schedule.period === "6" && schedule.day === props.day)
                    ) ? (
                        <Box sx={{height: normalPeriodHeight}}></Box>) : null
                }
                <Paper sx={{
                    height: courseCardHeight,
                    overflow: 'hidden'
                }}><Typography>({props.period}/{props.day}){props.course.j}</Typography></Paper>
                {
                    // Check if the course is super 5, and show blank if it's normal 5
                    // TODO - This will 無駄にする the rest of the Stack in 5&6 grid component
                    !isSuper && props.course.schedule.some(schedule =>
                        // TODO - Make this simpler to process the courses more quickly
                        (props.period == "5&6" && schedule.period === "6" && schedule.day === props.day)
                    ) ? (
                        <Box sx={{height: normalPeriodHeight, overflow: 'hidden'}}></Box>) : null
                }
                {
                    // Check if the course is super 7, and show blank if it's normal 7
                    !isSuper && props.period == "7" ? (
                        <Box sx={{height: superPeriodHeight, overflow: 'hidden'}}></Box>) : null
                }
            </Stack>
        </Grid>
    );
};

export default TimetableCourseCard;