// src/stroies/atoms.ts
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Course } from '../type/Types';

// user selectedCourse（storaged in localStorage）
export const selectedCoursesAtom = atomWithStorage<Course[]>('selectedCourses', []);

// generate timeTable from selectedCourses Atom(DerivedAtom) 
export const timetableAtom = atom((get) => {
  const courses = get(selectedCoursesAtom);
  const timetable: Record<string, Course[]> = {};

  courses.forEach((course) => {
    //check the type of schedule in timetable
    // might need:
    // const timeKey = `${time.period}/${time.day}`; 
    // if (!timetable[timeKey]) { ...

    course.schedule.forEach((time) => { 
      if (!timetable[time]) {
        timetable[time] = [];
      }
      timetable[time].push(course);
    });
  });

  return timetable;
});


