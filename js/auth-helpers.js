// ================================
// Authentication Helper Functions
// ================================

// Show signup modal
function showSignupModal() {
    const loginOverlay = document.getElementById('loginModalOverlay');
    const signupOverlay = document.getElementById('signupModalOverlay');
    
    if (loginOverlay) {
        loginOverlay.classList.add('hidden');
    }
    
    if (signupOverlay) {
        signupOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Hide signup modal
function hideSignupModal() {
    const signupOverlay = document.getElementById('signupModalOverlay');
    
    if (signupOverlay) {
        signupOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Handle signup link click
function handleSignupClick(e) {
    e.preventDefault();
    showSignupModal();
}

// Handle back to login
function handleBackToLogin(e) {
    e.preventDefault();
    hideSignupModal();
    
    const loginOverlay = document.getElementById('loginModalOverlay');
    if (loginOverlay) {
        loginOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Show signup error
function showSignupError(message) {
    const errorDiv = document.getElementById('signupError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

// Show signup success
function showSignupSuccess(message) {
    const successDiv = document.getElementById('signupSuccess');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    }
}

// Handle signup form submission
function handleSignupSubmit(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('signupConfirmPassword');
    const signupBtn = document.getElementById('signupBtn');
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Show loading state
    signupBtn.classList.add('loading');
    signupBtn.textContent = 'Creating account...';
    
    // Call registration function
    window.wcvhLogin.register(email, password, confirmPassword)
        .then((user) => {
            // Success!
            signupBtn.textContent = '✓ Account Created!';
            signupBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            showSignupSuccess('Account created successfully! Please login with your credentials.');
            
            // DON'T store user info or log them in
            // They must login manually
            
            // Hide signup modal and show login modal
            setTimeout(() => {
                hideSignupModal();
                
                // Show login modal
                const loginOverlay = document.getElementById('loginModalOverlay');
                if (loginOverlay) {
                    loginOverlay.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                }
                
                // Pre-fill email in login form for convenience
                const loginEmailInput = document.getElementById('loginEmail');
                if (loginEmailInput) {
                    loginEmailInput.value = user.email;
                }
                
                // Focus on password field
                const loginPasswordInput = document.getElementById('loginPassword');
                if (loginPasswordInput) {
                    loginPasswordInput.focus();
                }
                
                // Reset signup form
                emailInput.value = '';
                passwordInput.value = '';
                confirmPasswordInput.value = '';
                signupBtn.textContent = 'Create Account';
                signupBtn.style.background = '';
                signupBtn.classList.remove('loading');
                
                // Show info message on login screen
                const loginError = document.getElementById('loginError');
                if (loginError) {
                    loginError.textContent = '✓ Account created! Please login with your credentials.';
                    loginError.style.background = '#f0fdf4';
                    loginError.style.borderColor = '#86efac';
                    loginError.style.color = '#059669';
                    loginError.classList.add('show');
                    
                    setTimeout(() => {
                        loginError.classList.remove('show');
                        loginError.style.background = '';
                        loginError.style.borderColor = '';
                        loginError.style.color = '';
                    }, 8000);
                }
            }, 2000);
        })
        .catch((error) => {
            showSignupError(error.message);
            signupBtn.textContent = 'Create Account';
            signupBtn.classList.remove('loading');
        });
}

// Toggle password visibility for signup
function toggleSignupPassword(inputId, toggleBtnId) {
    const input = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleBtnId);
    
    if (input && toggleBtn) {
        if (input.type === 'password') {
            input.type = 'text';
            toggleBtn.innerHTML = '👁️';
        } else {
            input.type = 'password';
            toggleBtn.innerHTML = '👁️‍🗨️';
        }
    }
}

// Handle forgot password link click
function handleForgotPasswordClick(e) {
    e.preventDefault();
    
    // Get email from input or prompt
    let email = document.getElementById('loginEmail')?.value.trim();
    
    if (!email) {
        email = prompt('Enter your email address to reset password:');
    }
    
    if (!email) return;
    
    // Show loading message
    const forgotLink = document.getElementById('forgotPasswordLink');
    const originalText = forgotLink?.textContent;
    if (forgotLink) {
        forgotLink.textContent = 'Sending...';
    }
    
    // Call password reset function
    window.wcvhLogin.resetPassword(email)
        .then((message) => {
            alert(message);
        })
        .catch((error) => {
            alert('Password reset failed: ' + error.message);
        })
        .finally(() => {
            if (forgotLink) {
                forgotLink.textContent = originalText;
            }
        });
}

// Initialize auth helpers
function initAuthHelpers() {
    // Signup link listeners
    const signupLink = document.getElementById('signupLink');
    if (signupLink) {
        signupLink.addEventListener('click', handleSignupClick);
    }
    
    const signupBtnTop = document.getElementById('signupBtnTop');
    if (signupBtnTop) {
        signupBtnTop.addEventListener('click', handleSignupClick);
    }
    
    // Signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
    }
    
    // Back to login link
    const backToLoginLink = document.getElementById('backToLoginLink');
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', handleBackToLogin);
    }
    
    // Password toggle buttons for signup
    const signupPasswordToggle = document.getElementById('signupPasswordToggle');
    if (signupPasswordToggle) {
        signupPasswordToggle.addEventListener('click', () => {
            toggleSignupPassword('signupPassword', 'signupPasswordToggle');
        });
    }
    
    const signupConfirmPasswordToggle = document.getElementById('signupConfirmPasswordToggle');
    if (signupConfirmPasswordToggle) {
        signupConfirmPasswordToggle.addEventListener('click', () => {
            toggleSignupPassword('signupConfirmPassword', 'signupConfirmPasswordToggle');
        });
    }
    
    // Forgot password link
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', handleForgotPasswordClick);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthHelpers);
} else {
    initAuthHelpers();
}
