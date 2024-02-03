export interface Course {
  regno: number;
  season: string;
  ay: number;
  no: string;
  lang: string;
  e: string;
  j: string;
  schedule: string[] | [];
  instructor: string;
  unit: number;
  room?: string;
  color: string;
  isEnrolled: boolean;
  modified: Date;
}

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
