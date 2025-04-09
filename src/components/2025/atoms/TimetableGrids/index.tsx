import React from 'react';
import {Grid} from "@mui/material";
import {Course} from "@/src/types/types";
import TimetableCourseCard from "@/src/components/2025/atoms/TimetableCourseCard";
import {normalPeriodHeight, superPeriodHeight} from "@/src/constants/periodHeights";

const setGridHeight = (period) => {
    let gridHeight;
    switch (period) {
        case "4":
            gridHeight = superPeriodHeight + normalPeriodHeight;
            break;
        case "5&6":
            gridHeight = normalPeriodHeight * 2 + 0.5;
            break;
        case "7":
            gridHeight = normalPeriodHeight + superPeriodHeight;
            break;
        default:
            gridHeight = normalPeriodHeight;
    }
    return gridHeight
}


const TimetableGrids = (props: { coursesInSlot: Course[], period: string, day: string, empty? }) => {
    return (
        <Grid container sx={{height: setGridHeight(props.period)}}>
            {props.coursesInSlot.map((course) => {
                return <TimetableCourseCard course={course} numOfCourses={props.coursesInSlot.length} day={props.day}
                                            period={props.period}/>
            })}
        </Grid>
    );
};

export default TimetableGrids;