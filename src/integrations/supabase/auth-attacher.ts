import { createMiddleware } from "@tanstack/react-start";
import { supabase } from "./client";

/**
 * Client-side function middleware that attaches the current Supabase bearer
 * token to every server-function request so requireSupabaseAuth can validate it.
 */
export const attachSupabaseAuth = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return next({
      headers: session?.access_token
        ? { Authorization: `Bearer ${session.access_token}` }
        : undefined,
    });
  },
);
