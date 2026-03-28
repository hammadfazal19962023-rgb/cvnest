import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

export const supabaseClient = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      // Only use localStorage in browser, use a dummy storage on server
      storage: isBrowser ? window.localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      },
      persistSession: isBrowser, // Only persist sessions in browser
      autoRefreshToken: isBrowser, // Only auto-refresh in browser
    }
  }
);