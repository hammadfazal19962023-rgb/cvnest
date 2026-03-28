import { supabaseClient } from './client';
import { supabaseServer } from './server';

export const supabase =
  typeof window !== "undefined"
    ? supabaseClient
    : supabaseServer;