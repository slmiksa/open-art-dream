import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getAdminStatus } from "@/lib/admin.functions";

export type AdminAuthStatus = "loading" | "unauth" | "forbidden" | "admin";

export function useAdminAuth() {
  const [status, setStatus] = useState<AdminAuthStatus>("loading");

  const check = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setStatus("unauth");
      return;
    }
    try {
      const res = await getAdminStatus();
      setStatus(res.isAdmin ? "admin" : "forbidden");
    } catch {
      setStatus("forbidden");
    }
  }, []);

  useEffect(() => {
    let active = true;

    const safeCheck = () => {
      if (active) void check();
    };

    check();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (!active) return;
      if (event === "SIGNED_OUT") {
        setStatus("unauth");
        return;
      }
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        window.setTimeout(safeCheck, 0);
      }
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [check]);

  return { status, recheck: check };
}
