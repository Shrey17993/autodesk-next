// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// ✅ Next.js automatically injects NEXT_PUBLIC_* vars at build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase environment variables:");
  console.error("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl);
  console.error(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY:",
    supabaseKey ? "Loaded ✅" : "Missing ❌"
  );
  throw new Error("Supabase URL or Key missing in environment variables");
}

console.log("✅ Supabase client initialized:", supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseKey);
