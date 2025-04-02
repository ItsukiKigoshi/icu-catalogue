import {ComboboxItem} from "@mantine/core";

export interface Schedule {
    day: string;       // 例如 "M", "TU" 等
    period: string;    // 例如 "1", "2" 等
    isOR?: boolean;    // 可选，是否为 OR 条件
    isSuper?: boolean; // 可选，是否为超级时段
}


export interface Course {
    regno: number;
    season: string;
    ay: number;
    no: string;
    lang: string;
    e: string;
    j: string;
    schedule: Schedule[];
    instructor?: string;
    unit: number;
    room: string;
    color: string;
    isEnrolled: boolean;
    note: string;
    modified: Date;
}

export type Term = ComboboxItem & { season: string; ay: string };

export interface DevServerCourse {
    cno: string;
    term: string;
    title_j: string;
    title_e: string;
    regno: number;
    lang: string;
    summary_e: string;
    summary_j: string;
}