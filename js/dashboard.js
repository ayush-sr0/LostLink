// Lost Link - Dashboard Route Guard & Session Management
// Protects dashboard.html against unauthenticated access and handles logout

document.addEventListener('DOMContentLoaded', async () => {
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
