// pages/api/recent.js
import { supabaseAdmin } from '../../lib/supabaseAdmin';

export default async function handler(req, res) {
  const limit = Math.min(30, Number(req.query.limit || 12));
  try {
    const { data, error } = await supabaseAdmin
      .from('signups')
      .select('name, role, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    const recent = (data || []).map(r => {
      const first = (r.name || '').split(' ')[0] || 'Friend';
      return { name: first, role: r.role || 'user', when: r.created_at };
    });
    return res.json({ recent });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'server error' });
  }
}
