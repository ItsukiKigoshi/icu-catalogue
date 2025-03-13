import { NextResponse } from 'next/server';
import supabase from '../../../lib/supabase';
import {Course} from '../../../type/Types'

// filters witohout period
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
        query = query.ilike(field, `%${value}%`);
      }
    });

    const scheduleParam = searchParams.get('schedule');
    if (scheduleParam) {
      const [periodStr, day] = scheduleParam.split('/');
    
      if (!periodStr || !day) {
        return NextResponse.json(
          { error: 'Invalid schedule format. Expected pattern: period/day (e.g. 3/M)' },
          { status: 400 }
        );
      }

      const period = parseInt(periodStr);
      if (isNaN(period)) {
        return NextResponse.json(
          { error: 'Invalid period value. Must be a number' },
          { status: 400 }
        );
      }

      const scheduleFilter = { 
        day: day.toUpperCase(),
        period: period
      };

      query = query.filter('schedule', 'cs', `[${JSON.stringify(scheduleFilter)}]`);
    }
    // execute search
    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const courses = data as Course[];
    return NextResponse.json({ result: courses });
  } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      } else {
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
      }
    }
}