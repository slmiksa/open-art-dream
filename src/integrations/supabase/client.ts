import { createClient } from "@supabase/supabase-js";
import type { Database } from "./db-types";

// Publishable URL + key are safe to ship to the browser.
const SUPABASE_URL = "https://ilqvsjwlajkmflutcxhh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_TQHQY9mSkSfVgr5IiRz0sg_AQ05L50T";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);
