// Lost Link - Supabase Client Configuration
// Initialized via the official Supabase JS v2 browser library (window.supabase)

(function () {
  const SUPABASE_URL = 'https://tvixfmeeaoqrgzqitxxl.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_MHkOmxn55Rufmhbf6t2IdA_Dg83TuOr';

  if (!window.supabase) {
    console.error('Supabase library (v2) is not loaded. Please ensure the CDN script is included before supabase-client.js.');
    return;
  }

  // Initialize and attach the client globally to window
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
})();
