// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bhkeeghwbqqpboctlqzd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoa2VlZ2h3YnFxcGJvY3RscXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMzQ4NjQsImV4cCI6MjA1NjcxMDg2NH0.owo_9H7_2IQjr8I0KGjMQp7CyNXb94_j1o_9c7qUQFo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);