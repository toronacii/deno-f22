/**
 * Supabase client factory para el backend Deno.
 *
 *  getAdminClient()        — service_role key, bypasa RLS (solo backend)
 *  getUserClient(jwt)      — anon key + JWT del usuario, respeta RLS
 *  validateToken(jwt)      — valida un Bearer JWT y retorna { id, email }
 */

import { createClient, SupabaseClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL         = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY    = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_KEY) {
  throw new Error(
    "Faltan variables de entorno: SUPABASE_URL, SUPABASE_ANON_KEY y/o SUPABASE_SERVICE_ROLE_KEY",
  );
}

/** Cliente singleton con service_role — para operaciones admin (audit_logs, etc.) */
let _adminClient: SupabaseClient | null = null;

export function getAdminClient(): SupabaseClient {
  if (!_adminClient) {
    _adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
      auth: { persistSession: false },
    });
  }
  return _adminClient;
}

/**
 * Crea un cliente Supabase autenticado como el usuario que envió el JWT.
 * Todas las queries respetan RLS con la identidad de ese usuario.
 */
export function getUserClient(jwt: string): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
    global: {
      headers: { Authorization: `Bearer ${jwt}` },
    },
  });
}

/**
 * Valida un Bearer JWT y retorna el usuario de Supabase.
 * Lanza un error si el token es inválido o expiró.
 */
export async function validateToken(
  jwt: string,
): Promise<{ id: string; email: string }> {
  const { data: { user }, error } = await getAdminClient().auth.getUser(jwt);
  if (error || !user) {
    throw new Error("Token inválido o expirado");
  }
  return { id: user.id, email: user.email! };
}
