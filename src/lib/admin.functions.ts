import { supabase } from "@/integrations/supabase/client";

export const ADMIN_TABLES = [
  "slides",
  "services",
  "offers",
  "systems",
  "clients",
  "news",
  "social_links",
] as const;

export type AdminTable = (typeof ADMIN_TABLES)[number];

const ORDER: Record<AdminTable, { col: string; asc: boolean }> = {
  slides: { col: "sort_order", asc: true },
  services: { col: "sort_order", asc: true },
  offers: { col: "sort_order", asc: true },
  systems: { col: "sort_order", asc: true },
  clients: { col: "sort_order", asc: true },
  social_links: { col: "sort_order", asc: true },
  news: { col: "published_at", asc: false },
};

type Wrapped<T> = T | { data: T };

function unwrap<T>(input: Wrapped<T>): T {
  return input && typeof input === "object" && "data" in input ? input.data : input;
}

async function getCurrentUserId() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Unauthorized");
  return user.id;
}

async function assertAdmin() {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden");
  return userId;
}

/** Returns whether the currently signed-in user is an admin. */
export async function getAdminStatus() {
  try {
    const userId = await getCurrentUserId();
    const { data } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data), userId };
  } catch {
    return { isAdmin: false, userId: null };
  }
}

/** Lists all rows (including inactive) of an allow-listed table. */
export async function adminList(input: Wrapped<{ table: AdminTable }>) {
  const data = unwrap(input);
  if (!ADMIN_TABLES.includes(data.table)) throw new Error("Invalid table");
  await assertAdmin();
  const ord = ORDER[data.table];
  const db = supabase as any;
  const { data: rows, error } = await db
    .from(data.table)
    .select("*")
    .order(ord.col, { ascending: ord.asc, nullsFirst: false });
  if (error) throw new Error(error.message);
  return rows ?? [];
}

/** Inserts (no id) or updates (with id) a row in an allow-listed table. */
export async function adminUpsert(
  input: Wrapped<{ table: AdminTable; row: Record<string, unknown> }>,
) {
  const data = unwrap(input);
  if (!ADMIN_TABLES.includes(data.table)) throw new Error("Invalid table");
  if (!data.row || typeof data.row !== "object") throw new Error("Invalid row");
  await assertAdmin();

  const db = supabase as any;
  const { id, ...fields } = data.row;
  if (id) {
    const { data: row, error } = await db
      .from(data.table)
      .update(fields)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  }

  const { data: row, error } = await db.from(data.table).insert(fields).select().single();
  if (error) throw new Error(error.message);
  return row;
}

/** Deletes a row by id from an allow-listed table. */
export async function adminDelete(input: Wrapped<{ table: AdminTable; id: string }>) {
  const data = unwrap(input);
  if (!ADMIN_TABLES.includes(data.table)) throw new Error("Invalid table");
  if (!data.id) throw new Error("Missing id");
  await assertAdmin();
  const db = supabase as any;
  const { error } = await db.from(data.table).delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

/** Uploads an image to the public `media` bucket and returns its URL. */
export async function adminUploadImage(input: Wrapped<{ filename: string; dataUrl: string }>) {
  const data = unwrap(input);
  if (!data?.dataUrl || !data.dataUrl.startsWith("data:")) throw new Error("Invalid file");
  await assertAdmin();

  const response = await fetch(data.dataUrl);
  const blob = await response.blob();
  const ext = (data.filename.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from("media")
    .upload(path, blob, { contentType: blob.type || "application/octet-stream", upsert: true });
  if (error) throw new Error(error.message);
  const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
  return { url: pub.publicUrl };
}
