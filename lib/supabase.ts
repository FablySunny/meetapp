import { createServerClient, createBrowserClient } from '@supabase/ssr';

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// server-side helper (for API routes or app routes)
export const createServerSupabase = () =>
  createServerClient(supabaseUrl, supabaseKey);

// optionally expose a browser helper if you want a central import
export const createBrowserSupabase = () =>
  createBrowserClient(supabaseUrl, supabaseKey);