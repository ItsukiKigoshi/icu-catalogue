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
  modified: Date;
  isEnrolled: boolean;
  color: string;
}
