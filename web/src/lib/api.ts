/**
 * API client — añade Bearer JWT automáticamente a cada petición.
 * Uso: api.get("/taxpayers"), api.post("/taxpayers", body)
 */

import { supabase } from "./supabase.ts";
import { toast } from "./toast.tsx";

const BASE = import.meta.env.VITE_API_BASE as string;

async function getToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

interface RequestOptions {
  /** Suppress the automatic error toast — handle the error manually. */
  silent?: boolean;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<T> {
  const token = await getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err     = await res.json().catch(() => ({ error: res.statusText }));
    const message = (err as { error?: string }).error ?? res.statusText;
    if (!options.silent) toast.error(message);
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

export const api = {
  get:    <T>(path: string, opts?: RequestOptions)                => request<T>("GET",    path, undefined, opts),
  post:   <T>(path: string, body: unknown, opts?: RequestOptions) => request<T>("POST",   path, body,      opts),
  put:    <T>(path: string, body: unknown, opts?: RequestOptions) => request<T>("PUT",    path, body,      opts),
  patch:  <T>(path: string, body: unknown, opts?: RequestOptions) => request<T>("PATCH",  path, body,      opts),
  delete: <T>(path: string, opts?: RequestOptions)               => request<T>("DELETE", path, undefined, opts),
};
