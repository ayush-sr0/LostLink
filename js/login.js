// Lost Link - Authentication Portal Logic
// Handles Supabase Email/Password Signup, Email/Password Login, and Password Reset

let currentAuthMode = 'login';

function showAuthAlert(message, type = 'error') {
  const alertEl = document.getElementById('auth-alert');
  if (!alertEl) {
    alert(message);
    return;
  }

  let colorClasses = 'bg-error-container text-on-error-container border border-error/20';
  let iconName = 'error';

  if (type === 'success') {
    colorClasses = 'bg-tertiary-fixed/30 text-on-tertiary-fixed-variant border border-tertiary-fixed-dim/40';
    iconName = 'check_circle';
  } else if (type === 'info') {
    colorClasses = 'bg-surface-container text-on-surface border border-secondary/20';
    iconName = 'info';
  }

  alertEl.className = `${colorClasses} p-3.5 rounded-xl font-body-sm text-body-sm flex items-start gap-2.5 transition-all`;
  alertEl.innerHTML = `
    <span class="material-symbols-outlined text-[18px] flex-shrink-0 mt-0.5">${iconName}</span>
    <span class="leading-relaxed">${message}</span>
  `;
  alertEl.classList.remove('hidden');
}

function clearAuthAlert() {
  const alertEl = document.getElementById('auth-alert');
  if (alertEl) {
    alertEl.innerHTML = '';
    alertEl.className = 'hidden p-3.5 rounded-xl font-body-sm text-body-sm transition-all';
  }
}

function switchAuthMode(mode) {
  currentAuthMode = mode;
  clearAuthAlert();

  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const authTitle = document.getElementById('auth-title');
  const authSubtitle = document.getElementById('auth-subtitle');
  const fullNameField = document.getElementById('full-name-field');
  const authSubmitBtn = document.getElementById('auth-submit-btn');
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  const switchPromptText = document.getElementById('switch-prompt-text');
  const switchPromptBtn = document.getElementById('switch-prompt-btn');
  const rememberLabel = document.getElementById('remember-label');
  const ssoLabel = document.getElementById('sso-label');

  if (mode === 'signup') {
    if (tabSignup) tabSignup.className = "flex-1 py-2 rounded-lg font-label-lg text-label-lg transition-all shadow-sm bg-surface-container-lowest text-on-surface font-semibold text-center";
    if (tabLogin) tabLogin.className = "flex-1 py-2 rounded-lg font-label-lg text-label-lg transition-all text-on-surface-variant hover:text-on-surface font-medium text-center";

    if (authTitle) authTitle.innerText = "Join the Recovery Network";
    if (authSubtitle) authSubtitle.innerText = "Set up your student or commuter account in less than a minute.";
    if (fullNameField) fullNameField.classList.remove('hidden');
    if (forgotPasswordLink) forgotPasswordLink.classList.add('hidden');
    if (rememberLabel) rememberLabel.innerText = "Agree to University Safety Code & Privacy Terms";
    if (ssoLabel) ssoLabel.innerText = "Sign up with University SSO";
    if (authSubmitBtn) authSubmitBtn.innerHTML = '<span>Create Free Account</span><span class="material-symbols-outlined text-body-md">arrow_forward</span>';
    if (switchPromptText) switchPromptText.innerText = "Already registered on Lost Link?";
    if (switchPromptBtn) switchPromptBtn.innerText = "Log in";
  } else {
    if (tabLogin) tabLogin.className = "flex-1 py-2 rounded-lg font-label-lg text-label-lg transition-all shadow-sm bg-surface-container-lowest text-on-surface font-semibold text-center";
    if (tabSignup) tabSignup.className = "flex-1 py-2 rounded-lg font-label-lg text-label-lg transition-all text-on-surface-variant hover:text-on-surface font-medium text-center";

    if (authTitle) authTitle.innerText = "Welcome to Lost Link";
    if (authSubtitle) authSubtitle.innerText = "Enter your credentials or university SSO to access your recovery dashboard.";
    if (fullNameField) fullNameField.classList.add('hidden');
    if (forgotPasswordLink) forgotPasswordLink.classList.remove('hidden');
    if (rememberLabel) rememberLabel.innerText = "Remember this device";
    if (ssoLabel) ssoLabel.innerText = "Continue with University SSO";
    if (authSubmitBtn) authSubmitBtn.innerHTML = '<span>Log In to Lost Link</span><span class="material-symbols-outlined text-body-md">arrow_forward</span>';
    if (switchPromptText) switchPromptText.innerText = "Don’t have an account?";
    if (switchPromptBtn) switchPromptBtn.innerText = "Sign up for free";
  }
}

function toggleModeFromFooter() {
  switchAuthMode(currentAuthMode === 'login' ? 'signup' : 'login');
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eye-icon');
  if (!passwordInput || !eyeIcon) return;
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeIcon.innerText = 'visibility_off';
  } else {
    passwordInput.type = 'password';
    eyeIcon.innerText = 'visibility';
  }
}

async function handleForgotPassword(event) {
  if (event) event.preventDefault();
  clearAuthAlert();

  if (!window.supabaseClient) {
    showAuthAlert("Supabase client is not loaded. Please refresh the page.", "error");
    return;
  }

  const emailInput = document.getElementById('email');
  let email = emailInput ? emailInput.value.trim() : '';

  if (!email) {
    email = window.prompt("Enter your registered email address to receive a password reset link:");
    if (!email) return;
    email = email.trim();
    if (emailInput) emailInput.value = email;
  }

  const forgotBtn = document.getElementById('forgot-password-link');
  if (forgotBtn) forgotBtn.innerText = 'Sending link...';

  try {
    const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });

    if (error) {
      showAuthAlert(error.message, "error");
    } else {
      showAuthAlert(`Password reset link sent! Check your inbox at ${email}.`, "success");
    }
  } catch (err) {
    showAuthAlert(err.message || "Unable to send password reset email. Please try again.", "error");
  } finally {
    if (forgotBtn) forgotBtn.innerText = 'Forgot password?';
  }
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  clearAuthAlert();

  const submitBtn = document.getElementById('auth-submit-btn');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const fullNameInput = document.getElementById('fullName');

  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';
  const fullName = fullNameInput ? fullNameInput.value.trim() : '';

  if (!window.supabaseClient) {
    showAuthAlert("Supabase authentication client is not initialized. Please refresh the page.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <span class="inline-block animate-spin mr-2">⟳</span>
    <span>Please wait...</span>
  `;

  try {
    if (currentAuthMode === 'signup') {
      if (!fullName) {
        throw new Error('Please enter your full name.');
      }
      if (!email) {
        throw new Error('Please enter a valid email address.');
      }
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }

      const { data, error } = await window.supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });

      if (error) {
        if (error.message && error.message.includes('User already registered')) {
          throw new Error('An account with this email already exists. Please log in instead.');
        }
        if (error.message && error.message.toLowerCase().includes('rate limit')) {
          throw new Error('Email sending rate limit reached. Please wait a few minutes before requesting another verification email.');
        }
        throw error;
      }

      // Check whether session exists or if email confirmation is required
      if (data.user && !data.session) {
        showAuthAlert(`Account created successfully! We sent a verification link to ${email}. Please confirm your email before logging in.`, "success");
        switchAuthMode('login');
        if (emailInput) emailInput.value = email;
        if (passwordInput) passwordInput.value = '';
      } else if (data.session) {
        // Direct session confirmed
        window.location.href = 'dashboard.html';
      }

    } else {
      // Login mode
      if (!email || !password) {
        throw new Error('Please enter both your email and password.');
      }

      const { data, error } = await window.supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        const errorMsg = (error.message || '').toLowerCase();
        if (errorMsg.includes('invalid login credentials')) {
          throw new Error('Invalid email or password. Please verify your credentials and try again.');
        } else if (errorMsg.includes('email not confirmed')) {
          throw new Error('Your email address has not been confirmed yet. Please verify your email via the confirmation link sent to your inbox.');
        } else {
          throw error;
        }
      }

      if (data.session) {
        // Authentic session established - redirect to dashboard
        window.location.href = 'dashboard.html';
      } else {
        throw new Error('Authentication succeeded but no active session was returned.');
      }
    }

  } catch (error) {
    showAuthAlert(error.message || 'An unexpected authentication error occurred.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = currentAuthMode === 'signup'
      ? '<span>Create Free Account</span><span class="material-symbols-outlined text-body-md">arrow_forward</span>'
      : '<span>Log In to Lost Link</span><span class="material-symbols-outlined text-body-md">arrow_forward</span>';
  }
}

// Check session on load (if already logged in, redirect to dashboard)
document.addEventListener('DOMContentLoaded', async () => {
  if (!window.supabaseClient) return;

  const urlParams = new URLSearchParams(window.location.search);
  const isLogout = urlParams.has('logout');

  // Handle password recovery link redirect if hash contains type=recovery
  if (window.location.hash && window.location.hash.includes('type=recovery')) {
    showAuthAlert('Password recovery link verified. You can now update your password.', 'info');
  }

  if (!isLogout) {
    try {
      const { data: { session } } = await window.supabaseClient.auth.getSession();
      if (session && session.user) {
        window.location.href = 'dashboard.html';
      }
    } catch (e) {
      console.warn('Session verification error:', e);
    }
  }
});

function startDemoMode() {
  localStorage.setItem('lostlink_demo_mode', 'true');
  window.location.href = 'dashboard.html';
}

// Make functions accessible to HTML onclick / onsubmit attributes
window.switchAuthMode = switchAuthMode;
window.toggleModeFromFooter = toggleModeFromFooter;
window.togglePasswordVisibility = togglePasswordVisibility;
window.handleForgotPassword = handleForgotPassword;
window.handleAuthSubmit = handleAuthSubmit;
window.startDemoMode = startDemoMode;
