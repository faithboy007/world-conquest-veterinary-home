# How to Update Your PWA Content

## 🔄 Your PWA Now Updates Automatically!

I've updated the service worker to use a **network-first** strategy. This means:

✅ **Users always see the latest content** when online  
✅ **Automatic cache updates** - no manual clearing needed  
✅ **Offline fallback** - cached content when no internet  
✅ **Instant updates** - changes appear immediately for users  

## 📝 What Changed

### Service Worker Strategy:
- **Before**: Cache-first (showed old cached content)
- **After**: Network-first (always fetches fresh content, falls back to cache when offline)

### Cache Version:
- Updated from `wcvh-v1` to `wcvh-v3`
- Old caches automatically deleted on activation

## 🚀 How It Works Now

1. **User opens PWA** → Service worker checks for updates
2. **Fetches fresh content** from network first
3. **Updates cache** with new content automatically
4. **If offline** → Shows cached content
5. **New service worker** → Auto-activates and claims all clients

## 🎯 For Users

When you push updates to GitHub:
1. Users open the PWA
2. Fresh content loads automatically (if online)
3. Cache updates in background
4. No action needed from users!

## 🔧 For Developers

### Making Changes:
1. Edit your HTML, CSS, or JS files
2. Update cache version in `sw.js`:
   ```javascript
   const CACHE_NAME = 'wcvh-v4'; // Increment version number
   ```
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin master
   ```

### Users Get Updates:
- **Automatically** when they open the PWA (if online)
- **Network-first** ensures fresh content
- **Old cache** deleted automatically

## 🧪 Testing Updates

1. Make changes to your website
2. Push to GitHub
3. Wait 1-2 minutes for GitHub Pages to deploy
4. Open the PWA
5. Press **Ctrl+R** or **Cmd+R** to refresh (if needed)
6. See your changes immediately!

## 📱 Force Update (If Needed)

If users aren't seeing updates:

### Method 1: Hard Refresh
- **Windows/Linux**: Ctrl + Shift + R
- **Mac**: Cmd + Shift + R

### Method 2: Clear Service Worker
1. Open PWA
2. Press F12 (DevTools)
3. Go to Application tab
4. Click "Service Workers"
5. Click "Unregister"
6. Reload page

### Method 3: Reinstall PWA
1. Uninstall the PWA
2. Visit website in browser
3. Reinstall the PWA

## 🎨 What Updates Automatically

✅ HTML changes (index.html)  
✅ CSS changes (all stylesheets)  
✅ JavaScript changes (all scripts)  
✅ Images (when URLs change)  
✅ Manifest updates  

## ⚡ Cache Strategy Explained

```
User Request → Network First
     ↓
  Network Available?
     ↓              ↓
   YES             NO
     ↓              ↓
Fetch Fresh    Use Cache
     ↓              ↓
Update Cache   (Offline Mode)
     ↓
Show Content
```

## 🐛 Troubleshooting

### Updates not showing?
1. Check you're online (network-first requires internet)
2. Wait a few minutes after pushing to GitHub
3. Do a hard refresh (Ctrl+Shift+R)
4. Check browser console for errors

### Old cache persisting?
- Increment cache version in `sw.js`
- Old caches are auto-deleted on activation

### Service worker not updating?
- Close all PWA windows
- Wait 24 hours, or
- Unregister service worker manually (DevTools)

## 📊 Version History

- **v1**: Initial release (cache-first)
- **v2**: Added PWA functionality
- **v3**: Network-first strategy (CURRENT)
  - Fresh content always loads
  - Automatic cache updates
  - Offline fallback support
  - Better user experience

## 🎉 Benefits of Network-First

1. **Always Fresh**: Users see latest content
2. **Automatic Updates**: No manual cache clearing
3. **Better UX**: Instant updates for users
4. **Offline Support**: Still works without internet
5. **Developer-Friendly**: Just push and forget

---

**Your PWA now updates automatically!** 🚀

Users will always see your latest changes when they're online, and the PWA will gracefully fall back to cached content when offline.
