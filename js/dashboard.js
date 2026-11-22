// Lost Link - Dashboard Route Guard & Session Management
// Protects dashboard.html against unauthenticated access and handles logout

document.addEventListener('DOMContentLoaded', async () => {

  // --- DEMO MODE BYPASS ---
  const isDemoMode = localStorage.getItem('lostlink_demo_mode') === 'true';
  if (isDemoMode) {
    const displayName = 'Demo User';
    const email = 'demo@lostlink.app';

    const profileNameEl = document.querySelector('aside .flex-col span.text-on-surface');
    if (profileNameEl) profileNameEl.textContent = displayName;

    const profileBadgeEl = document.querySelector('aside .flex-col span.text-secondary');
    if (profileBadgeEl) {
      profileBadgeEl.textContent = email;
      profileBadgeEl.title = email;
    }

    // Show a demo banner at the top
    const banner = document.createElement('div');
    banner.id = 'demo-banner';
    banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9999;background:#1a1a2e;color:#fff;text-align:center;padding:8px 16px;font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:12px;';
    banner.innerHTML = `<span>⚡ Demo Mode — Viewing a sample dashboard</span><a href="login.html?logout=true" onclick="localStorage.removeItem('lostlink_demo_mode')" style="background:#fff;color:#1a1a2e;padding:3px 12px;border-radius:999px;font-size:12px;text-decoration:none;">Exit Demo</a>`;
    document.body.prepend(banner);
    // Offset the fixed header to account for the banner
    const fixedHeader = document.querySelector('header');
    if (fixedHeader) fixedHeader.style.top = banner.offsetHeight + 'px';

    // Logout links should clear demo mode
    const logoutLinks = document.querySelectorAll('a[aria-label="Sign out"], a[data-path="login"]');
    logoutLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('lostlink_demo_mode');
        window.location.replace('login.html?logout=true');
      });
    });

    return; // Skip Supabase auth check in demo mode
  }
  // --- END DEMO MODE ---

  if (!window.supabaseClient) {
    console.error('Supabase client is not initialized.');
    window.location.replace('login.html');
    return;
  }

  try {
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();

    if (error || !session || !session.user) {
      console.warn('Unauthenticated access to dashboard. Redirecting to login.html...');
      window.location.replace('login.html');
      return;
    }

    // Authenticated session verified
    const user = session.user;
    const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Member';
    const email = user.email || '';

    // Update sidebar profile elements if present
    const profileNameEl = document.querySelector('aside .flex-col span.text-on-surface');
    if (profileNameEl) {
      profileNameEl.textContent = displayName;
    }

    const profileBadgeEl = document.querySelector('aside .flex-col span.text-secondary');
    if (profileBadgeEl && email) {
      profileBadgeEl.textContent = email;
      profileBadgeEl.title = email;
    }

    // Bind sign-out link
    const logoutLinks = document.querySelectorAll('a[aria-label="Sign out"], a[data-path="login"]');
    logoutLinks.forEach(link => {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          await window.supabaseClient.auth.signOut();
        } catch (err) {
          console.warn('Sign out error:', err);
        } finally {
          window.location.replace('login.html?logout=true');
        }
      });
    });

    // Listen for auth state changes (e.g. sign out or session expiration)
    window.supabaseClient.auth.onAuthStateChange((event, currentSession) => {
      if (event === 'SIGNED_OUT' || !currentSession) {
        window.location.replace('login.html');
      }
    });

  } catch (err) {
    console.error('Error verifying auth session:', err);
    window.location.replace('login.html');
  }
});
