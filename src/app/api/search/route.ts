import express from 'express';
import supabase from '../../../lib/supabase';
import {Course} from '../../../type/Types'

const app = express();
const port = process.env.PORT || 3000;

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

app.get('/api/search', async (req, res) => {
    try {
      let query = supabase.from('static_data').select('*');
  
      // 許可されたフィールドに基づいてクエリ条件を構築
      allowedFilters.forEach(field => {
        if (req.query[field]) {
          query = query.eq(field, req.query[field]);
        }
      });

      // リクエストに `period` パラメータが含まれている場合
      // JSONB フィールド `schedule` の `period` プロパティを `contains` でフィルタリング   
      if (req.query.period) {
        query = query.contains('schedule', { period: req.query.period });
      }

    // execute search
    const { data, error } = await query;
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const courses = data as Course[];
    res.json({ data: courses });
  } catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        // error が Error オブジェクトでない場合のフォールバック
        res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
