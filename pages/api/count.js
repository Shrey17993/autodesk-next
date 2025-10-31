// pages/api/count.js
import { supabaseAdmin } from '../../lib/supabaseAdmin';

export default async function handler(req, res) {
  try {
    const { count, error } = await supabaseAdmin
      .from('signups')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return res.json({ count: count || 0 });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'server error' });
  }
}
