// pages/api/draw-winners.js
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const ADMIN_SECRET = process.env.ADMIN_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const secret = req.headers['x-admin-secret'] || req.query.secret;
  if (secret !== ADMIN_SECRET) return res.status(403).json({ error: 'forbidden' });

  try {
    // get all waitlist entries
    const { data: rows, error } = await supabaseAdmin
      .from('signups')
      .select('id, name, email')
      .eq('tier', 'waitlist');

    if (error) throw error;
    if (!rows || rows.length === 0) return res.json({ message: 'no waitlist entries' });

    // shuffle & pick winners
    const shuffled = rows.sort(() => Math.random() - 0.5);
    const WINNERS = Math.min(100, shuffled.length);
    const winners = shuffled.slice(0, WINNERS);
    const remaining = shuffled.slice(WINNERS);

    // update winners
    for (const w of winners) {
      await supabaseAdmin.from('signups').update({ tier: 'winner' }).eq('id', w.id);
    }
    // update rest to discount
    for (const r of remaining) {
      await supabaseAdmin.from('signups').update({ tier: 'discount' }).eq('id', r.id);
    }

    // Send emails (send only winners first, then a subset of discounts)
    const sendPromises = [];

    for (const w of winners) {
      const msg = {
        to: w.email,
        from: process.env.FROM_EMAIL,
        subject: 'You won — AutoDesk Pro for 1 month 🎉',
        text: `Hi ${w.name || 'there'},\n\nCongrats — you were randomly selected as one of the first AutoDesk Pro testers. You get 1 month Pro free. We'll follow up with activation instructions.\n\n— AutoDesk Team`
      };
      sendPromises.push(sgMail.send(msg));
    }

    // send discount email to everyone else but rate-limit (optional)
    for (const r of remaining.slice(0, 200)) { // send to first 200 to conserve quota
      const msg = {
        to: r.email,
        from: process.env.FROM_EMAIL,
        subject: 'Thanks — you’re eligible for 25% pre-launch discount',
        text: `Hi,\n\nThanks for joining AutoDesk! As an early supporter, you're eligible for 25% off when we launch. We'll send a promo (code) on launch day.\n\n— AutoDesk Team`
      };
      sendPromises.push(sgMail.send(msg));
    }

    // run send in background but wait here to report results
    await Promise.allSettled(sendPromises);

    return res.json({ message: 'Draw complete', winners: WINNERS, total: rows.length });
  } catch (e) {
    console.error('draw error', e);
    return res.status(500).json({ error: 'server error' });
  }
}
