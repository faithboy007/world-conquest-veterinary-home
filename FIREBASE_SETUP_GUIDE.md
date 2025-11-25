# Firebase Authentication Setup Guide

This guide will walk you through setting up Firebase Authentication for your World Conquest Veterinary Home website.

---

## Step 1: Create a Firebase Project

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Create a New Project**
   - Click "Add project" or "Create a project"
   - Enter project name: `world-conquest-veterinary` (or your preferred name)
   - Click "Continue"

3. **Google Analytics (Optional)**
   - Choose whether to enable Google Analytics
   - If enabled, select or create an Analytics account
   - Click "Create project"
   - Wait for project creation to complete (takes about 30 seconds)

---

## Step 2: Enable Email/Password Authentication

1. **Navigate to Authentication**
   - In your Firebase Console, click "Authentication" in the left sidebar
   - Click "Get started" if this is your first time

2. **Enable Email/Password Provider**
   - Click the "Sign-in method" tab
   - Find "Email/Password" in the list
   - Click on it
   - Toggle "Enable" to ON
   - Click "Save"

---

## Step 3: Get Your Firebase Configuration

1. **Go to Project Settings**
   - Click the gear icon (⚙️) next to "Project Overview" in the left sidebar
   - Select "Project settings"

2. **Add a Web App**
   - Scroll down to "Your apps" section
   - Click the web icon `</>` (third icon after iOS and Android)
   - Enter app nickname: `World Conquest Veterinary Web`
   - **IMPORTANT**: Check "Also set up Firebase Hosting" (optional but recommended)
   - Click "Register app"

3. **Copy Your Configuration**
   - You'll see a code snippet with `firebaseConfig`
   - Copy the configuration object that looks like this:

   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:xxxxxxxxxxxxx"
   };
   ```

---

## Step 4: Update Your Configuration File

1. **Open** `js/firebase-config.js` in your code editor

2. **Replace the placeholder values** with your actual Firebase configuration:

   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_ACTUAL_API_KEY",
       authDomain: "YOUR_ACTUAL_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_ACTUAL_PROJECT_ID",
       storageBucket: "YOUR_ACTUAL_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
       appId: "YOUR_ACTUAL_APP_ID"
   };
   ```

3. **Save the file**

---

## Step 5: Configure Authorized Domains (Important!)

1. **Go to Authentication Settings**
   - In Firebase Console, click "Authentication"
   - Click the "Settings" tab
   - Scroll to "Authorized domains"

2. **Add Your Domain**
   - `localhost` should already be there (for testing)
   - Click "Add domain"
   - Add your actual website domain when you deploy (e.g., `worldconquestveterinary.com`)

---

## Step 6: Test Your Setup

1. **Open your website** in a browser (you can use Live Server in VS Code or open `index.html` directly)

2. **The login modal should appear**

3. **Test Registration:**
   - Click "Sign up here" at the bottom
   - Enter a test email and password
   - If successful, you'll see a success message and be logged in

4. **Test Login:**
   - Refresh the page
   - Enter your credentials
   - Click "Login"
   - You should be logged in

5. **Test Password Reset:**
   - Click "Forgot password?"
   - Enter your email
   - Check your email inbox for the password reset link

---

## Step 7: View Users in Firebase Console

1. **Navigate to Authentication > Users**
   - You'll see all registered users
   - You can manually add, edit, or delete users
   - View user details, creation date, last sign-in

---

## Features Now Available

### ✅ User Registration
- New users can create accounts with email and password
- Automatic validation (email format, password length, matching passwords)
- Click "Sign up here" at the bottom of the login modal

### ✅ User Login
- Registered users can log in with their credentials
- "Remember me" checkbox for persistent sessions
- Comprehensive error messages

### ✅ Password Reset
- Click "Forgot password?" on the login screen
- Enter email address
- Receive password reset email from Firebase
- Click the link in email to reset password

### ✅ Guest Access
- Click "Continue as Guest" for temporary access
- No account required
- Session ends when browser closes

### ✅ Logout
- Call `window.wcvhLogin.logout()` to log out
- Can be added to navigation or user profile menu

---

## Security Best Practices

### 1. Keep Your API Key Secure
- Your Firebase API key is safe to expose in client-side code
- Firebase uses security rules, not API key hiding, for security
- However, ALWAYS set up proper authentication and database rules

### 2. Set Password Requirements
Firebase automatically enforces:
- Minimum 6 characters
- You can add custom validation in `js/login.js` if needed

### 3. Email Verification (Optional but Recommended)
To require email verification:

```javascript
// In js/login.js, after user registration:
user.sendEmailVerification()
    .then(() => {
        alert('Verification email sent! Please check your inbox.');
    });
```

### 4. Monitor Authentication Activity
- Check Firebase Console > Authentication > Users regularly
- Review sign-in methods and user activity
- Set up alerts for suspicious activity

---

## Troubleshooting

### Error: "auth/configuration-not-found"
- **Solution**: Make sure you've updated `firebase-config.js` with your actual Firebase configuration

### Error: "auth/operation-not-allowed"
- **Solution**: Enable Email/Password authentication in Firebase Console

### Error: "auth/unauthorized-domain"
- **Solution**: Add your domain to Authorized Domains in Firebase Console > Authentication > Settings

### Login/Registration not working
1. Open browser console (F12 or right-click > Inspect > Console)
2. Check for JavaScript errors
3. Verify Firebase scripts are loading (Network tab)
4. Confirm `firebase-config.js` has correct values

### Password reset email not received
1. Check spam/junk folder
2. Verify email address is correct
3. Check Firebase Console > Authentication > Templates to customize email
4. Ensure sender email is not blocked

---

## Customization Options

### Change Email Templates
1. Go to Firebase Console > Authentication > Templates
2. Customize:
   - Password reset email
   - Email verification
   - Email address change
   - SMS verification (if using phone auth)

### Add Custom Claims (Advanced)
For role-based access (admin, user, etc.):
- Use Firebase Admin SDK (requires backend)
- Set custom claims on user tokens
- Check claims in your app

### Add Social Login (Optional)
Firebase supports:
- Google Sign-In
- Facebook Login
- Twitter
- GitHub
- Apple
- Microsoft

Enable in Authentication > Sign-in method

---

## Cost Information

### Firebase Free Tier (Spark Plan)
- **50,000 verifications/month** - More than enough for most websites
- **Unlimited authenticated users**
- **No credit card required**

### Paid Tier (Blaze Plan)
- Only pay if you exceed free tier limits
- Very affordable for small-medium websites
- More details: https://firebase.google.com/pricing

---

## Next Steps

### 1. Add Logout Button
Add to your navigation (in `index.html`):

```html
<button onclick="window.wcvhLogin.logout()">Logout</button>
```

### 2. Display User Info
Show logged-in user's email:

```javascript
const userEmail = sessionStorage.getItem('wcvh_user_email') || 
                  localStorage.getItem('wcvh_user_email');
console.log('Logged in as:', userEmail);
```

### 3. Protect Content
Check if user is logged in:

```javascript
if (window.wcvhLogin.checkLoginStatus()) {
    // User is logged in
    console.log('User authenticated');
} else {
    // Show login modal
    window.wcvhLogin.showLoginModal();
}
```

### 4. Deploy Your Website
When ready to go live:
1. Update Authorized Domains in Firebase
2. Deploy to hosting (Netlify, Vercel, Firebase Hosting, etc.)
3. Test authentication on live site

---

## Support & Resources

### Firebase Documentation
- Authentication Guide: https://firebase.google.com/docs/auth
- JavaScript SDK Reference: https://firebase.google.com/docs/reference/js/auth

### Your Website Contact
- Email: worldconquestvh2065@gmail.com
- Phone: +234 706 785 7625

### Common Firebase Console Links
- **Console**: https://console.firebase.google.com/
- **Authentication Users**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication/users`
- **Project Settings**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/settings/general`

---

## Quick Reference

### JavaScript Functions Available

```javascript
// Check login status
window.wcvhLogin.checkLoginStatus()

// Show login modal
window.wcvhLogin.showLoginModal()

// Hide login modal
window.wcvhLogin.hideLoginModal()

// Logout
window.wcvhLogin.logout()

// Register new user (returns Promise)
window.wcvhLogin.register(email, password, confirmPassword)

// Reset password (returns Promise)
window.wcvhLogin.resetPassword(email)
```

### User Data Storage

```javascript
// Get logged-in user email
const email = sessionStorage.getItem('wcvh_user_email') || 
              localStorage.getItem('wcvh_user_email');

// Get user ID
const uid = sessionStorage.getItem('wcvh_user_id') || 
            localStorage.getItem('wcvh_user_id');

// Check if guest mode
const isGuest = sessionStorage.getItem('wcvh_guest_mode') === 'true';
```

---

**Last Updated**: November 2025  
**Version**: 1.0.0 with Firebase Integration  
**Status**: Production Ready
