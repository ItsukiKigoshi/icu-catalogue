import { NextResponse } from 'next/server';
import supabase from '../../../lib/supabase';
import { Course } from '../../../type/Types';

// Filters without period
const allowedFilters = [
  'status',
  'regno',
  'season',
  'ay',
  'no',
  'major',
  'level',
  'lang',
  'j',
  'e',
  'room',
  'instructor',
  'unit'
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let query = supabase.from('static_data').select('*');

    allowedFilters.forEach(field => {
      const value = searchParams.get(field);
      if (value) {
        query = query.or(`${field}.ilike.%${value}%`);
      }
    });

    const scheduleParam = searchParams.get('schedule');
    if (scheduleParam) {
      const scheduleRegex = /^(\*?)(\d+)\/([A-Za-z]+)$/;
      const match = scheduleParam.match(scheduleRegex);

      if (!match) {
        return NextResponse.json(
          { error: 'Invalid schedule format. Expected pattern: period/day (e.g. 3/M or *3/M)' },
          { status: 400 }
        );
      }

      const [_, isSuperFlag, periodStr, day] = match;
      const isSuper = Boolean(isSuperFlag); 
      const period = parseInt(periodStr);

      const scheduleFilter = {
        day: day.toUpperCase(),
        period: period,
        isSuper: isSuper
      };

      query = query.filter('schedule', 'cs', `[${JSON.stringify(scheduleFilter)}]`);
    }

    // Execute query
    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const courses = data as Course[];
    return NextResponse.json({ result: courses });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}