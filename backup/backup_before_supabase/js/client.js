
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = '';https://tvixfmeeaoqrgzqitxxl.supabase.co/rest/v1/
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_MHkOmxn55Rufmhbf6t2IdA_Dg83TuOr';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);