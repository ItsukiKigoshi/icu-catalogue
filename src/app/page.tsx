import {Box, Grid, Stack} from "@mui/material";

export default function Page() {
    const schedule = ["8:45-10:00", "10:10-11:25", "11:35-12:50", "13:20-15:15", "15:25-16:40", "16:50-18:05", "18:15-19:30"]
    return (
        <Box sx={{flexGrow: 1, p: 2}}>
            <p>Hello Page</p>
            <Grid container spacing={0.5}>
                <Grid size={2}>
                    <Stack spacing={0.5}>
                        {schedule.map((item) => <p key={item}>{item}</p>)}
                    </Stack>
                </Grid>
                <Grid size={2}>
                    <Stack spacing={0.5}>
                        <p>M</p>
                        <p>1</p>
                        <p>2</p>
                    </Stack>
                </Grid>
                <Grid size={2}>
                    <Stack spacing={0.5}>
                        <p>TU</p>
                        <p>1</p>
                        <p>2</p>
                    </Stack>
                </Grid>
                <Grid size={2}>
                    <Stack spacing={0.5}>
                        <p>W</p>
                        <p>1</p>
                        <p>2</p>
                    </Stack>
                </Grid>
                <Grid size={2}>
                    <Stack spacing={0.5}>
                        <p>TH</p>
                        <p>1</p>
                        <p>2</p>
                    </Stack>
                </Grid>
                ,, <Grid size={2}>
                <Stack spacing={0.5}>
                    <p>F</p>
                    <p>1</p>
                    <p>2</p>
                </Stack>
            </Grid>
            </Grid>
        </Box>
    );
}