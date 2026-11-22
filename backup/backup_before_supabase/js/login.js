// Authentication Portal Logicimport
//  { supabase } from './supabase-client.js';
import { supabase } from './supabase-client.js';
let currentAuthMode = 'login';

function switchAuthMode(mode) {
  currentAuthMode = mode;
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
    tabSignup.className = "flex-1 py-2 rounded-lg font-label-lg text-label-lg transition-all shadow-sm bg-surface-container-lowest text-on-surface font-semibold text-center";
    tabLogin.className = "flex-1 py-2 rounded-lg font-label-lg text-label-lg transition-all text-on-surface-variant hover:text-on-surface font-medium text-center";

    authTitle.innerText = "Join the Recovery Network";
    authSubtitle.innerText = "Set up your student or commuter account in less than a minute.";
    fullNameField.classList.remove('hidden');
    forgotPasswordLink.classList.add('hidden');
    rememberLabel.innerText = "Agree to University Safety Code & Privacy Terms";
    ssoLabel.innerText = "Sign up with University SSO";
    authSubmitBtn.innerHTML = '<span>Create Free Account</span><span class="material-symbols-outlined text-body-md">arrow_forward</span>';
    switchPromptText.innerText = "Already registered on Lost Link?";
    switchPromptBtn.innerText = "Log in";
  } else {
    tabLogin.className = "flex-1 py-2 rounded-lg font-label-lg text-label-lg transition-all shadow-sm bg-surface-container-lowest text-on-surface font-semibold text-center";
    tabSignup.className = "flex-1 py-2 rounded-lg font-label-lg text-label-lg transition-all text-on-surface-variant hover:text-on-surface font-medium text-center";

    authTitle.innerText = "Welcome to Lost Link";
    authSubtitle.innerText = "Enter your credentials or university SSO to access your recovery dashboard.";
    fullNameField.classList.add('hidden');
    forgotPasswordLink.classList.remove('hidden');
    rememberLabel.innerText = "Remember this device";
    ssoLabel.innerText = "Continue with University SSO";
    authSubmitBtn.innerHTML = '<span>Log In to Lost Link</span><span class="material-symbols-outlined text-body-md">arrow_forward</span>';
    switchPromptText.innerText = "Don’t have an account?";
    switchPromptBtn.innerText = "Sign up for free";
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

async function handleAuthSubmit(event)
async function handleAuthSubmit(event) {
  event.preventDefault();

  const submitBtn = document.getElementById('auth-submit-btn');
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const fullName = document.getElementById('fullName').value.trim();

  submitBtn.disabled = true;
  submitBtn.innerText = 'Please wait...';

  try {
    if (currentAuthMode === 'signup') {
      if (!fullName) {
        throw new Error('Please enter your full name.');
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });

      if (error) throw error;

      alert('Account created! Please check your email for confirmation.');

    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      window.location.href = 'dashboard.html';
    }

  } catch (error) {
    alert(error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = currentAuthMode === 'signup'
      ? 'Create Free Account'
      : 'Log In to Lost Link';
  }
}
  
// Make functions accessible to HTML
window.switchAuthMode = switchAuthMode;
window.toggleModeFromFooter = toggleModeFromFooter;
window.togglePasswordVisibility = togglePasswordVisibility;
window.handleAuthSubmit = handleAuthSubmit;