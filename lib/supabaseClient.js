// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // ✅ FIXED NAME

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables:');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? 'Loaded ✅' : 'Missing ❌');
  throw new Error('Supabase URL or Key missing in environment variables');
}

console.log('✅ Supabase client initialized with:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseKey);
