import React from 'react';
import {Grid} from "@mantine/core";
import {Course} from "@/src/lib/types";

function GridTimetableCard(props: {
    courses: Course[]
}) {
    return (
        <Grid gutter={0}>
            {props.courses.map((course) => {
                return (
                    <Grid.Col span="auto">
                        {course.j}
                    </Grid.Col>
                )
            })}

        </Grid>
    );
}

export default GridTimetableCard;