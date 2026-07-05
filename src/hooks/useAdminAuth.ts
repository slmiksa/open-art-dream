import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getAdminStatus } from "@/lib/admin.functions";

export type AdminAuthStatus = "loading" | "unauth" | "forbidden" | "admin";

export function useAdminAuth() {
  const [status, setStatus] = useState<AdminAuthStatus>("loading");
  const mountedRef = useRef(false);
  const checkRunRef = useRef(0);

  const check = useCallback(async () => {
    const runId = ++checkRunRef.current;
    const setCurrentStatus = (next: AdminAuthStatus) => {
      if (mountedRef.current && checkRunRef.current === runId) setStatus(next);
    };

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setCurrentStatus("unauth");
        return;
      }
      const res = await getAdminStatus();
      setCurrentStatus(res.isAdmin ? "admin" : "forbidden");
    } catch {
      setCurrentStatus("forbidden");
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    let timeoutId: number | undefined;

    const safeCheck = () => {
      if (mountedRef.current) void check();
    };

    void check();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (!mountedRef.current) return;
      if (event === "SIGNED_OUT") {
        checkRunRef.current += 1;
        setStatus("unauth");
        return;
      }
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        setStatus("loading");
        timeoutId = window.setTimeout(safeCheck, 50);
      }
    });
    return () => {
      mountedRef.current = false;
      checkRunRef.current += 1;
      if (timeoutId) window.clearTimeout(timeoutId);
      sub.subscription.unsubscribe();
    };
  }, [check]);

  return { status, recheck: check };
}
