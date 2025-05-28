// Triggering redeploy to fix 404

import { fetchDailyTrends } from '../../lib/fetchTrends';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    console.log('Fetching trends...');
    const trends = await fetchDailyTrends();
    console.log('Fetched trends:', trends.length);

    for (const trend of trends) {
      const { error } = await supabase.from('trends').insert(trend);
      if (error) {
        console.error('Insert error:', error);
        throw error;
      }
    }

    res.status(200).json({ status: 'Inserted successfully', count: trends.length });
  } catch (err) {
    console.error('API route error:', err.message || err);
    res.status(500).json({ status: 'error', message: err.message || 'Unknown error' });
  }
}
