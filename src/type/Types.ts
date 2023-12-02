export interface Course {
  cno: string;
  term: string;
  title_j: string;
  title_e: string;
  regno: number;
  lang: string;
  summary_e: string;
  summary_j: string;
}

export interface CourseWithCheck extends Course {
  checked: boolean;
}

export interface TimetableItem {
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
