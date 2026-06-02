import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://dopmfrvftsalqtybxcml.supabase.co';

// Fallback values to prevent application startup crashes if env variables are not yet set
const configuredUrl = import.meta.env.VITE_SUPABASE_URL || supabaseUrl;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';

// Display warning in console to guide developers
export const isSupabaseConfigured = !!(
  configuredUrl &&
  supabaseAnonKey
);

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase publishable key is missing from env variables. ' +
    'Set VITE_SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_ANON_KEY. ' +
    'Using placeholder settings to prevent page crashes.'
  );
}

export const supabase = createClient(configuredUrl, supabaseAnonKey || 'placeholder-anon-key');
