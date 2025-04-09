// src/api/search/route.ts

import {NextResponse} from 'next/server';
import supabase from '../../../lib/supabase';
import {Course} from '../../../types/types';

// Filters without schedule
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
        const {searchParams} = new URL(request.url);
        let query = supabase.from('static_data').select('*');
        // Filters without schedule
        allowedFilters.forEach(field => {
            const value = searchParams.get(field);
            if (value) {
                const values = value.split(",").map((v) => v.trim()).filter(Boolean);
                if (values.length > 0) {
                    const orConditions = values.map(val => `${field}.ilike.%${val}%`).join(',');
                    query = query.or(orConditions); // or
                }
            }
        });
        // schedule filter
        const scheduleParam = searchParams.get('schedule');
        if (scheduleParam) {
            const scheduleParams = scheduleParam.split(",").map((v) => v.trim()).filter(Boolean);

            if (scheduleParams.length > 0) {
                const scheduleRegex = /^(\*?)(\d+)\/([A-Za-z]+)$/;

                for (const param of scheduleParams) {
                    const match = param.match(scheduleRegex);
                    if (!match) {
                        return NextResponse.json(
                            {error: 'Invalid schedule format. Expected pattern: period/day (e.g. 3/M or *3/M)'},
                            {status: 400}
                        );
                    }

                    const [_, isSuperFlag, periodStr, day] = match;
                    const isSuper = Boolean(isSuperFlag);
                    const period = parseInt(periodStr);

                    const scheduleFilter = {
                        day: day.toUpperCase(),
                        period: period,
                        isSuper: isSuper,
                    };
                    query = query.filter('schedule', 'cs', `[${JSON.stringify(scheduleFilter)}]`); // and
                }
            }
        }

        // Execute query
        const {data, error} = await query;
        if (error) {
            return NextResponse.json({error: error.message}, {status: 500});
        }

        const courses = data as Course[];
        return NextResponse.json({result: courses});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({error: errorMessage}, {status: 500});
    }
}