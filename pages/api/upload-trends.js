import { fetchDailyTrends } from '../../lib/fetchTrends';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const trends = await fetchDailyTrends();

  for (const trend of trends) {
    await supabase.from('trends').insert(trend);
  }

  res.status(200).json({ status: 'Inserted successfully', count: trends.length });
}
