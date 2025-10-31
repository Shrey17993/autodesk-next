// pages/api/signup.js
import { supabaseAdmin } from '../../lib/supabaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, role, referrer } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    // create referral code for user if not exists
    const referral_code = (Math.random().toString(36).slice(2, 8)).toUpperCase();

    // Upsert (ignore duplicate email)
    const { error } = await supabaseAdmin
      .from('signups')
      .upsert(
        { name, email: email.toLowerCase(), role, referrer, referral_code },
        { onConflict: 'email', returning: 'representation' }
      );

    if (error) {
      console.error('supabase upsert error', error);
      return res.status(500).json({ error: 'DB error' });
    }

    // If referrer present: increment referrals for that referrer code
    if (referrer) {
      try {
        await supabaseAdmin
          .from('signups')
          .update({ referrals: supabaseAdmin.raw('referrals + 1') })
          .eq('referral_code', referrer);
      } catch (e) { console.error('referrer increment error', e); }
    }

    // Optionally return success
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
}
