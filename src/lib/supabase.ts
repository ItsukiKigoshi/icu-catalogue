// /lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// .env.local に以下が設定されていることが前提
// NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
// NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxx

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'SupabaseのURLまたはAnonキーが設定されていません。envファイルを確認してください。'
  );
}

// クライアントの作成（クライアントサイドで利用）
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;