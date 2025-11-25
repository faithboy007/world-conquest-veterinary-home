// ================================
// Login Modal Functionality
// ================================

// Check if user is already logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('wcvh_logged_in');
    const rememberMe = localStorage.getItem('wcvh_remember_me');
    
    if (isLoggedIn === 'true' && rememberMe === 'true') {
        hideLoginModal();
        updateNavForLoggedInUser();
        return true;
    }
    
    // Check session storage for current session
    const sessionLoggedIn = sessionStorage.getItem('wcvh_session_logged_in');
    if (sessionLoggedIn === 'true') {
        hideLoginModal();
        updateNavForLoggedInUser();
        return true;
    }
    
    updateNavForLoggedOutUser();
    return false;
}

// Show login modal
function showLoginModal() {
    const overlay = document.getElementById('loginModalOverlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Hide login modal
function hideLoginModal() {
    const overlay = document.getElementById('loginModalOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Update navigation UI to show user info and logout button
function updateNavForLoggedInUser() {
    const userEmail = sessionStorage.getItem('wcvh_user_email') || 
                      localStorage.getItem('wcvh_user_email');
    
    if (userEmail) {
        // Show logout button
        const logoutNav = document.getElementById('logoutNav');
        if (logoutNav) {
            logoutNav.style.display = 'block';
        }
        
        // Show user email
        const userInfoNav = document.getElementById('userInfoNav');
        const userEmailDisplay = document.getElementById('userEmailDisplay');
        if (userInfoNav && userEmailDisplay) {
            userInfoNav.style.display = 'block';
            const displayName = userEmail.split('@')[0];
            userEmailDisplay.textContent = `👤 ${displayName}`;
        }
    }
}

// Update navigation UI to hide user info and logout button
function updateNavForLoggedOutUser() {
    const logoutNav = document.getElementById('logoutNav');
    const userInfoNav = document.getElementById('userInfoNav');
    
    if (logoutNav) {
        logoutNav.style.display = 'none';
    }
    
    if (userInfoNav) {
        userInfoNav.style.display = 'none';
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorDiv.classList.remove('show');
        }, 5000);
    }
}

// Hide error message
function hideError() {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.classList.remove('show');
    }
}

// Password toggle functionality
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('loginPassword');
    const toggleBtn = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.innerHTML = '👁️';
    } else {
        passwordInput.type = 'password';
        toggleBtn.innerHTML = '👁️‍🗨️';
    }
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle login form submission with Firebase
function handleLogin(event) {
    event.preventDefault();
    hideError();
    
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const loginBtn = document.getElementById('loginBtn');
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;
    
    // Basic validation
    if (!email) {
        showError('Please enter your email address');
        emailInput.focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        emailInput.focus();
        return;
    }
    
    if (!password) {
        showError('Please enter your password');
        passwordInput.focus();
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        passwordInput.focus();
        return;
    }
    
    // Check if Firebase is initialized
    if (!window.firebaseAuth) {
        showError('Authentication system not initialized. Please check your Firebase configuration.');
        return;
    }
    
    // Show loading state
    loginBtn.classList.add('loading');
    loginBtn.textContent = 'Logging in...';
    
    // Firebase Authentication
    window.firebaseAuth.setPersistence(
        rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION
    )
    .then(() => {
        // Sign in with Firebase
        return window.firebaseAuth.signInWithEmailAndPassword(email, password);
    })
    .then((userCredential) => {
        // Login successful
        const user = userCredential.user;
        
        // Store user info
        if (rememberMe) {
            localStorage.setItem('wcvh_logged_in', 'true');
            localStorage.setItem('wcvh_remember_me', 'true');
            localStorage.setItem('wcvh_user_email', user.email);
            localStorage.setItem('wcvh_user_id', user.uid);
        } else {
            sessionStorage.setItem('wcvh_session_logged_in', 'true');
            sessionStorage.setItem('wcvh_user_email', user.email);
            sessionStorage.setItem('wcvh_user_id', user.uid);
        }
        
        // Success animation
        loginBtn.textContent = '✓ Login Successful!';
        loginBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Hide modal and show website
        setTimeout(() => {
            hideLoginModal();
            loginBtn.classList.remove('loading');
            loginBtn.textContent = 'Login';
            loginBtn.style.background = '';
            
            // Clear form
            emailInput.value = '';
            passwordInput.value = '';
            rememberMeCheckbox.checked = false;
            
            // Show welcome message and update navigation
            showWelcomeMessage(user.email);
            updateNavForLoggedInUser();
        }, 1000);
    })
    .catch((error) => {
        // Handle errors
        loginBtn.classList.remove('loading');
        loginBtn.textContent = 'Login';
        
        let errorMessage = 'An error occurred. Please try again.';
        
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email. Please sign up first.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password. Please try again.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address.';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many failed attempts. Please try again later.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your connection.';
                break;
            default:
                errorMessage = error.message || 'Login failed. Please try again.';
        }
        
        showError(errorMessage);
        console.error('Login error:', error);
    });
}


// Show welcome message
function showWelcomeMessage(email) {
    const userName = email.split('@')[0];
    
    // Create welcome notification
    const welcomeDiv = document.createElement('div');
    welcomeDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        animation: slideInRight 0.5s ease-out;
    `;
    welcomeDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">👋</span>
            <span>Welcome, ${userName}!</span>
        </div>
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(welcomeDiv);
    
    // Remove after 4 seconds
    setTimeout(() => {
        welcomeDiv.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => {
            welcomeDiv.remove();
        }, 500);
    }, 4000);
}

// Handle user registration with Firebase
function handleRegistration(email, password, confirmPassword) {
    return new Promise((resolve, reject) => {
        // Validation
        if (!email || !password || !confirmPassword) {
            reject(new Error('All fields are required'));
            return;
        }
        
        if (!isValidEmail(email)) {
            reject(new Error('Please enter a valid email address'));
            return;
        }
        
        if (password.length < 6) {
            reject(new Error('Password must be at least 6 characters'));
            return;
        }
        
        if (password !== confirmPassword) {
            reject(new Error('Passwords do not match'));
            return;
        }
        
        // Check if Firebase is initialized
        if (!window.firebaseAuth) {
            reject(new Error('Authentication system not initialized'));
            return;
        }
        
        // Create user with Firebase
        window.firebaseAuth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                resolve(userCredential.user);
            })
            .catch((error) => {
                let errorMessage = 'Registration failed. Please try again.';
                
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'This email is already registered. Please login instead.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address.';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'Password is too weak. Please choose a stronger password.';
                        break;
                    case 'auth/operation-not-allowed':
                        errorMessage = 'Email/password accounts are not enabled.';
                        break;
                    default:
                        errorMessage = error.message || errorMessage;
                }
                
                reject(new Error(errorMessage));
            });
    });
}

// Handle password reset with Firebase
function handlePasswordReset(email) {
    return new Promise((resolve, reject) => {
        if (!email) {
            reject(new Error('Please enter your email address'));
            return;
        }
        
        if (!isValidEmail(email)) {
            reject(new Error('Please enter a valid email address'));
            return;
        }
        
        // Check if Firebase is initialized
        if (!window.firebaseAuth) {
            reject(new Error('Authentication system not initialized'));
            return;
        }
        
        // Send password reset email
        window.firebaseAuth.sendPasswordResetEmail(email)
            .then(() => {
                resolve('Password reset email sent! Please check your inbox.');
            })
            .catch((error) => {
                let errorMessage = 'Failed to send reset email. Please try again.';
                
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'No account found with this email.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many attempts. Please try again later.';
                        break;
                    default:
                        errorMessage = error.message || errorMessage;
                }
                
                reject(new Error(errorMessage));
            });
    });
}

// Logout functionality with Firebase
function logout() {
    if (window.firebaseAuth) {
        window.firebaseAuth.signOut()
            .then(() => {
                // Clear local storage
                localStorage.removeItem('wcvh_logged_in');
                localStorage.removeItem('wcvh_remember_me');
                localStorage.removeItem('wcvh_user_email');
                localStorage.removeItem('wcvh_user_id');
                sessionStorage.clear();
                
                // Update navigation to hide logout button
                updateNavForLoggedOutUser();
                
                // Show login modal
                showLoginModal();
            })
            .catch((error) => {
                console.error('Logout error:', error);
                // Even if Firebase logout fails, clear local data
                localStorage.clear();
                sessionStorage.clear();
                updateNavForLoggedOutUser();
                showLoginModal();
            });
    } else {
        // Fallback if Firebase not available
        localStorage.clear();
        sessionStorage.clear();
        updateNavForLoggedOutUser();
        showLoginModal();
    }
}

// Initialize login modal
function initLoginModal() {
    // Check login status on page load
    const isLoggedIn = checkLoginStatus();
    
    if (!isLoggedIn) {
        showLoginModal();
    }
    
    // Set up event listeners
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const passwordToggle = document.querySelector('.password-toggle');
    if (passwordToggle) {
        passwordToggle.addEventListener('click', togglePasswordVisibility);
    }
    
    // Clear error on input
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    if (emailInput) {
        emailInput.addEventListener('input', hideError);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', hideError);
    }
    
    // Prevent modal close by clicking overlay (optional - you can enable this if desired)
    const overlay = document.getElementById('loginModalOverlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            // Only close if clicking directly on overlay, not on modal content
            if (e.target === overlay) {
                // Uncomment the line below to allow closing modal by clicking overlay
                // hideLoginModal();
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoginModal);
} else {
    initLoginModal();
}

// Expose functions globally for potential external use
window.wcvhLogin = {
    logout: logout,
    checkLoginStatus: checkLoginStatus,
    showLoginModal: showLoginModal,
    hideLoginModal: hideLoginModal,
    register: handleRegistration,
    resetPassword: handlePasswordReset
};
