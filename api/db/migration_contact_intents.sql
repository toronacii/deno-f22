-- =============================================================================
-- Migración: contact_intents — intenciones de pago manuales
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.contact_intents (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_code     TEXT        NOT NULL,
  plan_name     TEXT        NOT NULL,
  billing_cycle TEXT        NOT NULL CHECK (billing_cycle IN ('monthly', 'annual')),
  phone         TEXT        NOT NULL,
  message       TEXT,
  status        TEXT        NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending', 'contacted', 'converted')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_intents_user_idx   ON public.contact_intents (user_id);
CREATE INDEX IF NOT EXISTS contact_intents_status_idx ON public.contact_intents (status, created_at DESC);

-- RLS: solo el backend con service_role puede leer/escribir
ALTER TABLE public.contact_intents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contact_intents: select own" ON public.contact_intents
  FOR SELECT USING (auth.uid() = user_id);
