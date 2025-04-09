import Timetable from "@/src/components/2025/molecules/Timetable";
import React from "react";
import {Box, Grid, Paper, Stack} from "@mui/material";
import {normalPeriodHeight, superPeriodHeight} from "@/src/constants/periodHeights";

export default function Page() {
    const schedule = ["8:45-10:00", "10:10-11:25", "11:35-12:50", "13:20-15:15", "15:25-16:40", "16:50-18:05", "18:15-19:30"]
    return (
        <Box sx={{p: 2}}>
            <p>This is Timetable. Here will be Header</p>
            <Stack>
                <Grid container>
                    <Grid size={1}>
                        Sth
                    </Grid>
                    <Grid size={11}>
                        <Grid container spacing={1}>
                            <Grid size={2}>M</Grid>
                            <Grid size={2}>TU</Grid>
                            <Grid size={2}>W</Grid>
                            <Grid size={2}>TH</Grid>
                            <Grid size={2}>F</Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid size={1}>
                        <Stack>
                            <Paper sx={{height: normalPeriodHeight}} variant="outlined">
                                1
                            </Paper>
                            <Paper sx={{height: normalPeriodHeight}} variant="outlined">
                                2
                            </Paper>
                            <Paper sx={{height: normalPeriodHeight}} variant="outlined">
                                3
                            </Paper>
                            <Paper sx={{height: superPeriodHeight}} variant="outlined">
                                L
                            </Paper>
                            <Paper sx={{height: normalPeriodHeight}} variant="outlined">
                                4
                            </Paper>
                            <Paper sx={{height: normalPeriodHeight}} variant="outlined">
                                5
                            </Paper>
                            <Paper sx={{height: normalPeriodHeight}} variant="outlined">
                                6
                            </Paper>
                            <Paper sx={{height: normalPeriodHeight + superPeriodHeight}} variant="outlined">
                                7
                            </Paper>
                        </Stack>
                    </Grid>
                    <Grid size={11}>
                        <Timetable/>
                    </Grid>
                </Grid>
            </Stack>


        </Box>

    );
}