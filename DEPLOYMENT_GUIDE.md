# 🚀 Deployment Guide - Namecheap Hosting

## Overview
This guide will help you deploy your World Conquest Veterinary Home website to Namecheap hosting.

---

## 📋 Prerequisites

You'll need from your friend:
1. **cPanel Login URL** (e.g., `https://server.namecheaphosting.com:2083`)
2. **cPanel Username**
3. **cPanel Password**
4. **Domain Name** (e.g., `worldconquestveterinary.com`)

---

## 🌐 Method 1: Using cPanel File Manager (Recommended)

### Step 1: Login to cPanel
1. Open the cPanel URL in your browser
2. Enter username and password
3. Click "Log in"

### Step 2: Access File Manager
1. In cPanel, find and click **"File Manager"**
2. Navigate to `public_html` folder (this is your website root)
3. If there are existing files, you may want to:
   - **Delete** them (if starting fresh), OR
   - **Create a subfolder** for your site

### Step 3: Upload Your Files

**Option A: Upload via File Manager**
1. Click **"Upload"** button at the top
2. Drag and drop or select these files/folders:
   - `index.html`
   - `css` folder (entire folder)
   - `js` folder (entire folder)
   - `images` folder (entire folder)
3. Wait for upload to complete (watch the progress bar)

**Option B: Upload as ZIP (Faster for many files)**
1. First, create a ZIP file of your website:
   - Right-click on your project folder
   - Select "Send to" → "Compressed (zipped) folder"
   - Name it `website.zip`
2. In cPanel File Manager, click **"Upload"**
3. Upload the `website.zip` file
4. Once uploaded, right-click the ZIP file
5. Select **"Extract"**
6. Move extracted files to `public_html` root

### Step 4: Set Permissions (Important!)
1. Select all uploaded folders (css, js, images)
2. Right-click → **"Change Permissions"**
3. Set to **755** for folders
4. Set to **644** for files (index.html, CSS, JS files)

### Step 5: Test Your Website
1. Open your browser
2. Visit your domain (e.g., `http://yourdomain.com`)
3. Your website should now be live! 🎉

---

## 🔥 Method 2: Using FTP (FileZilla)

### Step 1: Install FileZilla
1. Download FileZilla Client from [https://filezilla-project.org/](https://filezilla-project.org/)
2. Install it on your computer

### Step 2: Get FTP Credentials
Ask your friend for:
- **FTP Host**: Usually `ftp.yourdomain.com` or the server IP
- **FTP Username**: Same as cPanel username
- **FTP Password**: Same as cPanel password
- **Port**: 21 (standard FTP) or 22 (SFTP - more secure)

### Step 3: Connect via FileZilla
1. Open FileZilla
2. Enter connection details:
   - **Host**: `ftp.yourdomain.com`
   - **Username**: Your FTP username
   - **Password**: Your FTP password
   - **Port**: 21
3. Click **"Quickconnect"**

### Step 4: Upload Files
1. **Left side** (Local Site): Navigate to your project folder
   ```
   C:\Users\DELL\Desktop\world-conquest-veterinary-home
   ```
2. **Right side** (Remote Site): Navigate to `/public_html/`
3. Select these items on the left:
   - `index.html`
   - `css` folder
   - `js` folder
   - `images` folder
4. Right-click → **"Upload"**
5. Wait for transfer to complete

### Step 5: Verify Upload
1. Check the right panel to ensure all files are uploaded
2. Visit your website in a browser

---

## 🎯 Method 3: Using Git Deployment (Advanced)

If your friend's hosting supports Git (check cPanel for "Git Version Control"):

### Step 1: Access Git in cPanel
1. Login to cPanel
2. Find **"Git Version Control"**

### Step 2: Create Repository
1. Click **"Create"**
2. Enter your GitHub repository URL:
   ```
   https://github.com/faithboy007/world-conquest-veterinary-home.git
   ```
3. Set repository path to `/public_html/`
4. Click **"Create"**

### Step 3: Deploy
1. Click **"Manage"** on your repository
2. Click **"Pull or Deploy"**
3. Select **"Deploy HEAD Commit"**
4. Your site is now live!

**Benefits:**
- ✅ Easy updates (just push to GitHub and pull on server)
- ✅ Version control
- ✅ Automatic deployment

---

## 🔧 Important Configuration Steps

### 1. Update Firebase Configuration
After uploading, you may need to add your domain to Firebase:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized Domains**
4. Add your new domain: `yourdomain.com`

### 2. Enable HTTPS (SSL Certificate)
1. In cPanel, find **"SSL/TLS Status"**
2. Select your domain
3. Click **"Run AutoSSL"**
4. Wait for certificate to install
5. Your site will now work with `https://`

**Or use Let's Encrypt:**
1. In cPanel, find **"Let's Encrypt SSL"**
2. Select your domain
3. Click **"Issue"**

### 3. Set Up Email (Optional)
1. In cPanel, go to **"Email Accounts"**
2. Create email like `info@yourdomain.com`
3. Use it for your contact form

### 4. Configure DNS (If needed)
If the domain isn't pointing to the hosting yet:
1. Login to Namecheap account
2. Go to **Domain List** → **Manage**
3. Update **Nameservers** to hosting provider's nameservers
4. Wait 24-48 hours for propagation

---

## 📁 Required Files Structure on Server

```
public_html/
├── index.html          (Your main page)
├── css/
│   ├── styles.css
│   ├── login.css
│   └── cart.css
├── js/
│   ├── script.js
│   ├── login.js
│   ├── auth-helpers.js
│   ├── cart.js
│   └── firebase-config.js
└── images/            (If you have any local images)
```

---

## ✅ Post-Deployment Checklist

After uploading, test these features:

- [ ] Homepage loads correctly
- [ ] All CSS styles are applied
- [ ] Navigation works
- [ ] Product images load
- [ ] Shopping cart works
- [ ] Add to cart functionality
- [ ] Checkout process
- [ ] Flutterwave payment (use test mode first!)
- [ ] Login/Signup works
- [ ] Firebase authentication
- [ ] Contact form
- [ ] Responsive design on mobile

---

## 🐛 Common Issues & Solutions

### Issue 1: Website Shows "Index of /" or Directory Listing
**Solution:** 
- Make sure `index.html` is in the `public_html` root folder
- Check file name is exactly `index.html` (not `Index.html`)

### Issue 2: CSS/JS Files Not Loading
**Solution:**
- Check file paths in `index.html` are relative (not absolute)
- Verify folder names are lowercase: `css`, `js`, `images`
- Clear browser cache (Ctrl + F5)

### Issue 3: Images Not Showing
**Solution:**
- Since you're using ImageKit CDN, this shouldn't be an issue
- All your images are hosted externally

### Issue 4: Flutterwave Payment Not Working
**Solution:**
- Verify your Flutterwave public key is correct in `js/script.js`
- Check browser console for errors (F12)
- Test with Flutterwave test cards first

### Issue 5: Firebase Not Working
**Solution:**
- Add new domain to Firebase authorized domains
- Check Firebase config in `js/firebase-config.js`

### Issue 6: 404 Errors
**Solution:**
- Create `.htaccess` file in `public_html` with:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]
```

---

## 🚀 Quick Deployment Steps (TL;DR)

1. **Login** to cPanel
2. **Open** File Manager
3. **Go to** `public_html` folder
4. **Upload** all your files
5. **Visit** your domain
6. **Test** all features
7. **Enable** SSL certificate
8. **Update** Firebase with new domain

**That's it! Your site is live! 🎉**

---

## 📞 Support Resources

### Namecheap Support
- **Knowledge Base**: [https://www.namecheap.com/support/knowledgebase/](https://www.namecheap.com/support/knowledgebase/)
- **Live Chat**: Available 24/7
- **Ticket System**: For complex issues

### Helpful Articles
- [How to Upload a Website](https://www.namecheap.com/support/knowledgebase/article.aspx/1045/2186/how-to-upload-a-website/)
- [cPanel File Manager Guide](https://www.namecheap.com/support/knowledgebase/article.aspx/1044/2186/how-to-use-file-manager/)
- [SSL Certificate Installation](https://www.namecheap.com/support/knowledgebase/category.aspx/69/ssl-certificates/)

---

## 💡 Pro Tips

1. **Backup First**: Before uploading, backup any existing files
2. **Use SFTP**: More secure than regular FTP (port 22)
3. **Enable Gzip**: In cPanel → Optimize Website
4. **Set up Cron Jobs**: For automated tasks (if needed)
5. **Monitor Traffic**: Use Google Analytics
6. **Regular Backups**: Use cPanel Backup feature
7. **Keep Updated**: Update JavaScript libraries regularly

---

## 🎨 Optional Enhancements

### Add robots.txt
Create `robots.txt` in root:
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

### Add sitemap.xml
For better SEO, create a sitemap

### Set up Google Search Console
1. Verify your domain
2. Submit sitemap
3. Monitor search performance

---

## 📊 Performance Optimization

After deployment, optimize your site:

1. **Enable Caching**
   - In cPanel: Find "Cache Manager"
   - Enable for static files

2. **Minify Assets**
   - Use online tools to minify CSS/JS
   - Or use cPanel optimization tools

3. **Optimize Images**
   - You're already using ImageKit (good!)
   - Ensure images are properly sized

4. **Enable CDN**
   - Consider Cloudflare (free tier available)
   - Speeds up global access

---

## ✨ You're All Set!

Your website is now ready to go live on Namecheap hosting!

**Need Help?**
- Check Namecheap knowledge base
- Contact Namecheap support
- Review this guide
- Check browser console for errors (F12)

**Good luck with your launch! 🚀🐾**

---

*Last Updated: November 2025*
