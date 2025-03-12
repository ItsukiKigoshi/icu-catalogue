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
  
      // 許可されたフィールドに基づいてクエリ条件を構築
      allowedFilters.forEach(field => {
        const value = searchParams.get(field);
        if (value) {
          query = query.eq(field, value);
        }
      });
      // リクエストに `period` パラメータが含まれている場合
      // JSONB フィールド `schedule` の `period` プロパティを `contains` でフィルタリング   
      const period = searchParams.get('period');
      if (period) {
        query = query.contains('schedule', { period });
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