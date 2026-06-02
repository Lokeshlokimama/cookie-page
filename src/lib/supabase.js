import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables (VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY) are missing. ' +
    'Please configure them in your .env file to enable authentication and purchase history.'
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
