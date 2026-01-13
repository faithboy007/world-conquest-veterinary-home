// PWA Installation Handler
let deferredPrompt;
let installButton;

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Create install prompt UI
function createInstallUI() {
  const installPrompt = document.createElement('div');
  installPrompt.id = 'pwa-install-prompt';
  installPrompt.innerHTML = `
    <div class="pwa-prompt-content">
      <button class="pwa-close-btn" id="pwaCloseBtn">✕</button>
      <div class="pwa-icon">📱</div>
      <h3>Install Our App</h3>
      <p>Install World Conquest Veterinary Home on your device for quick access and offline use!</p>
      <button class="pwa-install-btn" id="pwaInstallBtn">
        <span>⬇️</span> Install App
      </button>
      <button class="pwa-later-btn" id="pwaLaterBtn">Maybe Later</button>
    </div>
  `;
  document.body.appendChild(installPrompt);

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    #pwa-install-prompt {
      position: fixed;
      bottom: -400px;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      max-width: 400px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px 20px 0 0;
      box-shadow: 0 -10px 40px rgba(102, 126, 234, 0.4);
      z-index: 10001;
      transition: bottom 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      overflow: hidden;
    }

    #pwa-install-prompt.show {
      bottom: 0;
    }

    .pwa-prompt-content {
      padding: 30px 25px 25px;
      text-align: center;
      color: white;
      position: relative;
    }

    .pwa-close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pwa-close-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: rotate(90deg);
    }

    .pwa-icon {
      font-size: 60px;
      margin-bottom: 15px;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .pwa-prompt-content h3 {
      font-size: 24px;
      margin: 0 0 10px 0;
      font-weight: 700;
    }

    .pwa-prompt-content p {
      font-size: 15px;
      margin: 0 0 20px 0;
      opacity: 0.95;
      line-height: 1.5;
    }

    .pwa-install-btn {
      background: white;
      color: #667eea;
      border: none;
      padding: 14px 30px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      width: 100%;
      margin-bottom: 10px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .pwa-install-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    .pwa-install-btn span {
      font-size: 20px;
    }

    .pwa-later-btn {
      background: transparent;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.5);
      padding: 12px 30px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      transition: all 0.3s ease;
    }

    .pwa-later-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: white;
    }

    @media (max-width: 480px) {
      #pwa-install-prompt {
        width: 100%;
        max-width: 100%;
        border-radius: 20px 20px 0 0;
      }

      .pwa-prompt-content {
        padding: 25px 20px 20px;
      }

      .pwa-prompt-content h3 {
        font-size: 20px;
      }

      .pwa-prompt-content p {
        font-size: 14px;
      }
    }
  `;
  document.head.appendChild(style);

  return installPrompt;
}

// Capture the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default mini-infobar
  e.preventDefault();
  
  // Store the event for later use
  deferredPrompt = e;
  
  // Create and show custom install prompt after a delay
  setTimeout(() => {
    showInstallPrompt();
  }, 5000); // Show after 5 seconds
});

// Show install prompt
function showInstallPrompt() {
  if (!deferredPrompt) return;

  // Check if user has dismissed the prompt before
  const dismissedTime = localStorage.getItem('pwa-dismissed');
  if (dismissedTime) {
    const hoursSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60);
    if (hoursSinceDismissed < 24) {
      // Don't show again if dismissed within last 24 hours
      return;
    }
  }

  const installPrompt = createInstallUI();
  
  // Show prompt with animation
  setTimeout(() => {
    installPrompt.classList.add('show');
  }, 100);

  // Install button click
  document.getElementById('pwaInstallBtn').addEventListener('click', async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);

    // Clear the deferred prompt
    deferredPrompt = null;

    // Hide and remove the custom prompt
    installPrompt.classList.remove('show');
    setTimeout(() => {
      installPrompt.remove();
    }, 500);
  });

  // Close button click
  document.getElementById('pwaCloseBtn').addEventListener('click', () => {
    installPrompt.classList.remove('show');
    setTimeout(() => {
      installPrompt.remove();
    }, 500);
    localStorage.setItem('pwa-dismissed', Date.now().toString());
  });

  // Later button click
  document.getElementById('pwaLaterBtn').addEventListener('click', () => {
    installPrompt.classList.remove('show');
    setTimeout(() => {
      installPrompt.remove();
    }, 500);
    localStorage.setItem('pwa-dismissed', Date.now().toString());
  });
}

// Track installation
window.addEventListener('appinstalled', (evt) => {
  console.log('PWA was installed successfully!');
  // Track the installation event
  if (typeof gtag !== 'undefined') {
    gtag('event', 'pwa_install', {
      'event_category': 'engagement',
      'event_label': 'PWA Installation'
    });
  }
});

// Show install button in navigation if not installed
if ('standalone' in window.navigator && !window.navigator.standalone) {
  // Add install button to navigation
  window.addEventListener('load', () => {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && deferredPrompt) {
      const installNavItem = document.createElement('li');
      installNavItem.innerHTML = `
        <button class="nav-link" id="navInstallBtn" style="background: #10b981; border: none; cursor: pointer;">
          📱 Install App
        </button>
      `;
      navMenu.appendChild(installNavItem);

      document.getElementById('navInstallBtn').addEventListener('click', () => {
        showInstallPrompt();
      });
    }
  });
}
