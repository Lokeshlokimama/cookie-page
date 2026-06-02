import { createClient } from '@supabase/supabase-js';

// Fallback values to prevent application startup crashes if env variables are not yet set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project-id.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'placeholder-anon-key';

// Display warning in console to guide developers
export const isSupabaseConfigured = !!(
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase credentials (VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY) are missing from env variables. ' +
    'Please create a .env file in the project root with your credentials. ' +
    'Using placeholder settings to prevent page crashes.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
