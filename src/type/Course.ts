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