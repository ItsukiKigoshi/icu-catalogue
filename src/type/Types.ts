export interface Course {
  regno: number;
  season: string;
  ay: string;
  no: string;
  lang: string;
  e: string;
  j: string;
  instructor: string;
  schedule: string[] | null;
  unit: string;
  isEnrolled: boolean;
}
