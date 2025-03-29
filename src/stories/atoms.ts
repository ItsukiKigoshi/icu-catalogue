// src/stroies/atoms.ts
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Course } from '../type/2025/Types';

// generate timeTable from selectedCourses Atom(DerivedAtom) 
export interface TimetableCell {
  day: string;
  period: string;
  isSuper?: boolean;
  courses: Course[];
}

// user selectedCourse（storaged in localStorage）
export const selectedCoursesAtom = atomWithStorage<Course[]>('selectedCourses', []);

export const timetableAtom = atom((get) => {
  const courses = get(selectedCoursesAtom);
  const timeSlots = new Map<string, TimetableCell>();
  
  courses.forEach(course => {
    course.schedule.forEach(slot => {
      const key = `${slot.day}-${slot.period}`;
      if (!timeSlots.has(key)) {
        timeSlots.set(key, {
          day: slot.day,
          period: slot.period,
          isSuper: slot.isSuper,
          courses: []
        });
      }
      timeSlots.get(key)!.courses.push(course);
    });
  });

  return Array.from(timeSlots.values());
});