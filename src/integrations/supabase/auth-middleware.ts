import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./db-types";

const SUPABASE_URL =
  process.env.EXT_SUPABASE_URL ?? "https://ilqvsjwlajkmflutcxhh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  process.env.EXT_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_TQHQY9mSkSfVgr5IiRz0sg_AQ05L50T";

/**
 * Middleware for createServerFn that validates the caller's bearer token and
 * exposes an RLS-scoped Supabase client, the userId, and the JWT claims.
 */
export const requireSupabaseAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const authHeader = getRequestHeader("authorization");
    if (!authHeader) {
      throw new Response("Unauthorized: No authorization header provided", {
        status: 401,
      });
    }

    const token = authHeader.replace(/^Bearer\s+/i, "");

    const supabase = createClient<Database>(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
        auth: { persistSession: false, autoRefreshToken: false },
      },
    );

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      throw new Response("Unauthorized", { status: 401 });
    }

    return next({
      context: {
        supabase,
        userId: data.user.id,
        claims: data.user,
      },
    });
  },
);
