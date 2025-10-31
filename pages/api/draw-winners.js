import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminSecret = req.headers['x-admin-secret'];
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const { data: signups, error } = await supabase
      .from('signups')
      .select('*');

    if (error) throw error;

    // Randomly pick 100 winners
    const winners = signups.sort(() => 0.5 - Math.random()).slice(0, 100);

    // Mark them in DB
    for (const winner of winners) {
      await supabase
        .from('signups')
        .update({ winner: true })
        .eq('id', winner.id);
    }

    return res.status(200).json({ success: true, winners: winners.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
