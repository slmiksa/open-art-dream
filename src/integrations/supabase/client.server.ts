import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Service-role client. Server-only. BYPASSES RLS. Never import into the browser.
const url = process.env.EXT_SUPABASE_URL;
const serviceRoleKey = process.env.EXT_SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error(
    "Missing EXT_SUPABASE_URL or EXT_SUPABASE_SERVICE_ROLE_KEY environment variables.",
  );
}

export const supabaseAdmin = createClient<Database>(url, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
