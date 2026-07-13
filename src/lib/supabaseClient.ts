import { createClient } from '@supabase/supabase-js';

// Get environment variables or fall back to default project credentials
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://kgibprahnkpifyzjfzsf.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnaWJwcmFobmtwaWZ5empmenNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0Njg1NzIsImV4cCI6MjA5OTA0NDU3Mn0.02TizBxJL7CVjcwFPREG3re583u_DdksVDQ65o8-mko';

// Helper to check if Supabase is properly configured (with env variables or fallback)
export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are missing. Please configure them in the Settings to enable data saving.'
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

