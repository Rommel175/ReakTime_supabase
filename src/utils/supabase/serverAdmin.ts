import { createClient } from '@supabase/supabase-js'

export const createClientAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ROLE_KEY!
  );