// ================================
// Smooth Scrolling
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// ================================
// Navbar Scroll Effect
// ================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ================================
// Mobile Menu Toggle
// ================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translate(5px, 5px)' 
        : 'rotate(0) translate(0, 0)';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -6px)' 
        : 'rotate(0) translate(0, 0)';
});

// ================================
// Parallax Scrolling Effect
// ================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    parallaxLayers.forEach(layer => {
        const speed = 0.5;
        layer.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Hero parallax effect
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - scrolled / 600;
        }
    }
    
    // Advanced Parallax for Veterinarian Profile Section
    const vetSection = document.querySelector('.parallax-vet-section');
    if (vetSection) {
        const rect = vetSection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Only apply parallax when section is in viewport
        if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
            const scrollProgress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
            
            // Parallax photo with depth effect
            const vetPhoto = document.querySelector('.parallax-photo');
            if (vetPhoto) {
                const photoOffset = (scrollProgress - 0.5) * 50;
                vetPhoto.style.transform = `translateZ(20px) translateY(${photoOffset}px)`;
            }
            
            // Parallax background with slower movement
            const vetBg = document.querySelector('.parallax-vet-bg');
            if (vetBg) {
                const bgOffset = scrollProgress * 100;
                vetBg.style.transform = `translateY(${bgOffset}px)`;
            }
            
            // Parallax decorations with different speeds
            const decorations = document.querySelectorAll('.parallax-decoration');
            decorations.forEach((deco, index) => {
                const speed = 0.3 + (index * 0.15);
                const offset = (scrollProgress - 0.5) * 80 * speed;
                const rotation = (scrollProgress - 0.5) * 30 * speed;
                deco.style.transform = `translateY(${offset}px) rotate(${rotation}deg)`;
            });
            
            // Parallax photo background glow
            const photoBg = document.querySelector('.parallax-photo-bg');
            if (photoBg) {
                const scale = 1 + (Math.sin(scrollProgress * Math.PI) * 0.1);
                photoBg.style.transform = `scale(${scale})`;
            }
        }
    }
});

// ================================
// Intersection Observer for Animations
// ================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
animatedElements.forEach(el => observer.observe(el));

// ================================
// Animated Statistics Counter
// ================================
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && counter.textContent === '0') {
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter);
    });
};

animateCounters();

// ================================
// Service Cards Hover Effect
// ================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(102, 126, 234, 0.1)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.transition = 'width 0.6s, height 0.6s';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.width = '300px';
            ripple.style.height = '300px';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ================================
// Contact Form Validation & Submission
// ================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.service) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully. We will contact you soon!', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// ================================
// Notification System
// ================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '30px';
    notification.style.padding = '1.5rem 2rem';
    notification.style.borderRadius = '10px';
    notification.style.background = type === 'success' 
        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
        : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    notification.style.color = 'white';
    notification.style.fontWeight = '600';
    notification.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slideInRight 0.5s ease';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Add animation keyframes for notifications
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

// ================================
// Newsletter Form
// ================================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            this.reset();
        }
    });
}

// ================================
// Back to Top Button
// ================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================
// Floating Elements Animation
// ================================
const floatingElements = document.querySelectorAll('.floating-element');

floatingElements.forEach((element, index) => {
    // Add random floating animation
    setInterval(() => {
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 2000 + index * 500);
});

// ================================
// Testimonial Cards Tilt Effect
// ================================
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ================================
// Team Cards Reveal Effect
// ================================
const teamCards = document.querySelectorAll('.team-card');

teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const placeholder = this.querySelector('.team-placeholder');
        if (placeholder) {
            placeholder.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const placeholder = this.querySelector('.team-placeholder');
        if (placeholder) {
            placeholder.style.transform = 'scale(1) rotate(0)';
        }
    });
});

// ================================
// Veterinarian Image Mouse Parallax Effect
// ================================
const vetImageFrame = document.querySelector('.parallax-image-wrapper');

if (vetImageFrame) {
    vetImageFrame.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt angles
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        // Apply 3D transform to the entire frame
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Move decorations based on mouse position
        const decorations = this.querySelectorAll('.parallax-decoration');
        decorations.forEach((deco, index) => {
            const multiplier = (index + 1) * 0.5;
            const moveX = ((x - centerX) / centerX) * 20 * multiplier;
            const moveY = ((y - centerY) / centerY) * 20 * multiplier;
            deco.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Enhance photo with subtle movement
        const photo = this.querySelector('.parallax-photo');
        if (photo) {
            const photoMoveX = ((x - centerX) / centerX) * 10;
            const photoMoveY = ((y - centerY) / centerY) * 10;
            photo.style.transform = `translateZ(20px) translate(${photoMoveX}px, ${photoMoveY}px) scale(1.05)`;
        }
    });
    
    vetImageFrame.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        
        const decorations = this.querySelectorAll('.parallax-decoration');
        decorations.forEach(deco => {
            deco.style.transform = 'translate(0, 0)';
        });
        
        const photo = this.querySelector('.parallax-photo');
        if (photo) {
            photo.style.transform = 'translateZ(20px) translate(0, 0) scale(1)';
        }
    });
}

// ================================
// Cursor Follow Effect (Optional Enhancement)
// ================================
let cursorDot = null;
let cursorOutline = null;

// Create custom cursor elements
function initCustomCursor() {
    cursorDot = document.createElement('div');
    cursorDot.style.width = '8px';
    cursorDot.style.height = '8px';
    cursorDot.style.background = '#667eea';
    cursorDot.style.borderRadius = '50%';
    cursorDot.style.position = 'fixed';
    cursorDot.style.pointerEvents = 'none';
    cursorDot.style.zIndex = '10001';
    cursorDot.style.transition = 'transform 0.1s ease';
    
    cursorOutline = document.createElement('div');
    cursorOutline.style.width = '40px';
    cursorOutline.style.height = '40px';
    cursorOutline.style.border = '2px solid #667eea';
    cursorOutline.style.borderRadius = '50%';
    cursorOutline.style.position = 'fixed';
    cursorOutline.style.pointerEvents = 'none';
    cursorOutline.style.zIndex = '10000';
    cursorOutline.style.transition = 'transform 0.15s ease';
    
    // Only add custom cursor on desktop
    if (window.innerWidth > 768) {
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);
        
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            cursorDot.style.transform = 'translate(-50%, -50%)';
            
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
            cursorOutline.style.transform = 'translate(-50%, -50%)';
        });
        
        // Expand cursor on hover over interactive elements
        document.querySelectorAll('a, button, .service-card, .team-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
}

// Initialize custom cursor
// Uncomment the line below to enable custom cursor
// initCustomCursor();

// ================================
// Page Load Animation
// ================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ================================
// Lazy Loading for Images (if added later)
// ================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ================================
// Paystack Payment Integration
// ================================
// IMPORTANT: Replace with your actual Paystack Public Key
const PAYSTACK_PUBLIC_KEY = 'pk_test_YOUR_PUBLIC_KEY_HERE';

// Create custom checkout modal
function createCheckoutModal(productName, productPrice) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'checkout-modal-overlay';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'checkout-modal';
    modalContent.innerHTML = `
        <div class="checkout-modal-header">
            <h2>🛍️ Complete Your Purchase</h2>
            <button class="checkout-close-btn">&times;</button>
        </div>
        <div class="checkout-modal-body">
            <div class="checkout-product-info">
                <div class="checkout-product-icon">🐾</div>
                <div class="checkout-product-details">
                    <h3>${productName}</h3>
                    <p class="checkout-price">₦${productPrice.toLocaleString()}</p>
                </div>
            </div>
            <form class="checkout-form" id="checkoutForm">
                <div class="checkout-form-group">
                    <label>📧 Email Address</label>
                    <input type="email" id="checkout-email" placeholder="your.email@example.com" required>
                    <span class="checkout-error-msg" id="email-error"></span>
                </div>
                <div class="checkout-form-group">
                    <label>👤 Full Name</label>
                    <input type="text" id="checkout-name" placeholder="Enter your full name" required>
                    <span class="checkout-error-msg" id="name-error"></span>
                </div>
                <div class="checkout-form-group">
                    <label>📞 Phone Number</label>
                    <input type="tel" id="checkout-phone" placeholder="080XXXXXXXX" required>
                    <span class="checkout-error-msg" id="phone-error"></span>
                </div>
                <div class="checkout-form-group">
                    <label>📦 Delivery Address (Optional)</label>
                    <textarea id="checkout-address" placeholder="Enter your delivery address" rows="3"></textarea>
                </div>
                <button type="submit" class="checkout-submit-btn">
                    <span class="checkout-btn-text">🔒 Proceed to Payment</span>
                    <span class="checkout-btn-loader" style="display: none;">
                        <span class="loader-spinner"></span>
                    </span>
                </button>
            </form>
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Animate in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
    }, 10);
    
    // Close button functionality
    const closeBtn = modalContent.querySelector('.checkout-close-btn');
    closeBtn.addEventListener('click', () => closeModal(modalOverlay));
    
    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });
    
    // Form submission
    const form = modalContent.querySelector('#checkoutForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('checkout-email').value.trim();
        const name = document.getElementById('checkout-name').value.trim();
        const phone = document.getElementById('checkout-phone').value.trim();
        const address = document.getElementById('checkout-address').value.trim();
        
        // Validate
        let hasError = false;
        
        if (!validateEmail(email)) {
            showFieldError('email-error', 'Please enter a valid email address');
            hasError = true;
        } else {
            clearFieldError('email-error');
        }
        
        if (name.length < 3) {
            showFieldError('name-error', 'Please enter your full name');
            hasError = true;
        } else {
            clearFieldError('name-error');
        }
        
        if (phone.length < 10) {
            showFieldError('phone-error', 'Please enter a valid phone number');
            hasError = true;
        } else {
            clearFieldError('phone-error');
        }
        
        if (hasError) return;
        
        // Show loading state
        const submitBtn = form.querySelector('.checkout-submit-btn');
        const btnText = submitBtn.querySelector('.checkout-btn-text');
        const btnLoader = submitBtn.querySelector('.checkout-btn-loader');
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        
        // Close modal and initialize payment
        setTimeout(() => {
            closeModal(modalOverlay);
            initializePayment(productName, productPrice, email, name, phone, address);
        }, 500);
    });
    
    // Focus first input
    setTimeout(() => {
        document.getElementById('checkout-email').focus();
    }, 300);
}

function closeModal(modalOverlay) {
    modalOverlay.style.opacity = '0';
    const modalContent = modalOverlay.querySelector('.checkout-modal');
    modalContent.style.transform = 'translateY(-50px)';
    
    setTimeout(() => {
        modalOverlay.remove();
    }, 300);
}

function showFieldError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearFieldError(errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

// Handle product purchase with Paystack
function initializePayment(productName, productPrice, email, name, phone, address) {
    // Generate unique reference
    const reference = 'WCV-' + Math.floor(Math.random() * 1000000000 + 1);
    
    // Initialize Paystack payment
    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: productPrice * 100, // Paystack expects amount in kobo
        currency: 'NGN',
        ref: reference,
        metadata: {
            custom_fields: [
                {
                    display_name: 'Product Name',
                    variable_name: 'product_name',
                    value: productName
                },
                {
                    display_name: 'Customer Name',
                    variable_name: 'customer_name',
                    value: name
                },
                {
                    display_name: 'Phone Number',
                    variable_name: 'phone_number',
                    value: phone
                },
                {
                    display_name: 'Delivery Address',
                    variable_name: 'delivery_address',
                    value: address || 'Not provided'
                }
            ]
        },
        callback: function(response) {
            // Payment successful
            showNotification(
                `✅ Payment successful! Reference: ${response.reference}. We'll contact you shortly for delivery.`,
                'success'
            );
            
            console.log('Payment successful:', response);
        },
        onClose: function() {
            showNotification('❌ Payment cancelled', 'error');
        }
    });
    
    handler.openIframe();
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add event listeners to all Add to Cart buttons
const productCartButtons = document.querySelectorAll('.product-cart-btn');

productCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-name');
        const productPrice = parseInt(this.getAttribute('data-price'));
        
        if (productName && productPrice) {
            // Check if Paystack is loaded
            if (typeof PaystackPop === 'undefined') {
                showNotification('Payment system is loading, please try again in a moment', 'error');
                return;
            }
            
            // Show custom checkout modal
            createCheckoutModal(productName, productPrice);
        } else {
            showNotification('Product information is missing', 'error');
        }
    });
});

// Optional: Backend verification function
// Uncomment and implement when you have a backend
/*
function verifyPayment(reference) {
    fetch('/verify-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reference: reference })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Payment verified:', data);
            // Process order, send confirmation email, etc.
        }
    })
    .catch(error => {
        console.error('Verification error:', error);
    });
}
*/

// ================================
// Console Welcome Message
// ================================
console.log('%c🐾 World Conquest Veterinary Home', 'font-size: 24px; color: #667eea; font-weight: bold;');
console.log('%cWelcome to our website! Built with modern web technologies.', 'font-size: 14px; color: #6b7280;');
console.log('%cIf you have any questions, feel free to contact us!', 'font-size: 14px; color: #6b7280;');
