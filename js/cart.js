// Shopping Cart System
class ShoppingCart {
    constructor() {
        this.cart = this.loadCart();
        this.cartModal = null;
        this.init();
    }
    init() {
        this.updateCartCount();
        this.createCartModal();
        this.attachEventListeners();
    }
    loadCart() {
        const savedCart = localStorage.getItem('wcvh_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }
    saveCart() {
        localStorage.setItem('wcvh_cart', JSON.stringify(this.cart));
        this.updateCartCount();
    }
    addItem(productName, productPrice) {
        const existingItem = this.cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                name: productName,
                price: productPrice,
                quantity: 1,
                id: Date.now() + Math.random()
            });
        }
        this.saveCart();
        this.showAddedNotification(productName);
        this.renderCart();
        return true;
    }
    removeItem(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.renderCart();
    }
    updateQuantity(itemId, newQuantity) {
        const item = this.cart.find(item => item.id === itemId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(itemId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.renderCart();
            }
        }
    }
    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    getItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = this.getItemCount();
        cartCountElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'flex' : 'none';
        });
    }
    showAddedNotification(productName) {
        if (typeof showNotification === 'function') {
            showNotification('✅ ' + productName + ' added to cart!', 'success');
        }
    }
    openCart() {
        this.renderCart();
        this.cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    closeCart() {
        this.cartModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    createCartModal() {
        const modalHTML = `
            <div class="cart-modal-overlay" id="cartModalOverlay">
                <div class="cart-modal">
                    <div class="cart-modal-header">
                        <h2>🛒 Shopping Cart</h2>
                        <button class="cart-close-btn" id="cartCloseBtn">&times;</button>
                    </div>
                    <div class="cart-modal-body" id="cartModalBody"></div>
                    <div class="cart-modal-footer">
                        <div class="cart-total">
                            <span class="cart-total-label">Total:</span>
                            <span class="cart-total-amount" id="cartTotalAmount">₦0</span>
                        </div>
                        <button class="cart-checkout-btn" id="cartCheckoutBtn">🔒 Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.cartModal = document.getElementById('cartModalOverlay');
        document.getElementById('cartCloseBtn').addEventListener('click', () => this.closeCart());
        this.cartModal.addEventListener('click', (e) => {
            if (e.target === this.cartModal) this.closeCart();
        });
        document.getElementById('cartCheckoutBtn').addEventListener('click', () => this.checkout());
    }

    renderCart() {
        const cartBody = document.getElementById('cartModalBody');
        const totalAmount = document.getElementById('cartTotalAmount');
        if (this.cart.length === 0) {
            cartBody.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty</p><button class="cart-continue-btn" onclick="shoppingCart.closeCart()">Continue Shopping</button></div>`;
            totalAmount.textContent = '₦0';
            return;
        }
        const cartItemsHTML = this.cart.map(item => `
            <div class="cart-item"><div class="cart-item-info"><h4 class="cart-item-name">${item.name}</h4><p class="cart-item-price">₦${item.price.toLocaleString()}</p></div><div class="cart-item-controls"><div class="cart-item-quantity"><button class="qty-btn qty-minus" onclick="shoppingCart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button><span class="qty-display">${item.quantity}</span><button class="qty-btn qty-plus" onclick="shoppingCart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button></div><div class="cart-item-subtotal">₦${(item.price * item.quantity).toLocaleString()}</div><button class="cart-item-remove" onclick="shoppingCart.removeItem(${item.id})">🗑️</button></div></div>
        `).join('');
        cartBody.innerHTML = cartItemsHTML;
        totalAmount.textContent = `₦${this.getTotal().toLocaleString()}`;
    }

    checkout() {
        if (this.cart.length === 0) {
            if (typeof showNotification === 'function') showNotification('❌ Your cart is empty!', 'error');
            return;
        }
        this.closeCart();
        this.showCheckoutForm();
    }

    showCheckoutForm() {
        const total = this.getTotal();
        const itemCount = this.getItemCount();
        const itemsList = this.cart.map(item => `${item.name} (x${item.quantity})`).join(', ');
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'checkout-modal-overlay';
        const modalContent = document.createElement('div');
        modalContent.className = 'checkout-modal';
        modalContent.innerHTML = `<div class="checkout-modal-header"><h2>🛍️ Complete Your Order</h2><button class="checkout-close-btn">&times;</button></div><div class="checkout-modal-body"><div class="checkout-product-info"><div class="checkout-product-icon">🛒</div><div class="checkout-product-details"><h3>${itemCount} Item${itemCount > 1 ? 's' : ''} in Cart</h3><p class="checkout-items-list">${itemsList}</p><p class="checkout-price">₦${total.toLocaleString()}</p></div></div><form class="checkout-form" id="checkoutFormCart"><div class="checkout-form-group"><label>📧 Email Address</label><input type="email" id="checkout-email-cart" placeholder="your.email@example.com" required><span class="checkout-error-msg" id="email-error-cart"></span></div><div class="checkout-form-group"><label>👤 Full Name</label><input type="text" id="checkout-name-cart" placeholder="Enter your full name" required><span class="checkout-error-msg" id="name-error-cart"></span></div><div class="checkout-form-group"><label>📞 Phone Number</label><input type="tel" id="checkout-phone-cart" placeholder="080XXXXXXXX" required><span class="checkout-error-msg" id="phone-error-cart"></span></div><div class="checkout-form-group"><label>📦 Delivery Address</label><textarea id="checkout-address-cart" placeholder="Enter your delivery address" rows="3" required></textarea><span class="checkout-error-msg" id="address-error-cart"></span></div><button type="submit" class="checkout-submit-btn"><span class="checkout-btn-text">🔒 Pay ₦${total.toLocaleString()}</span><span class="checkout-btn-loader" style="display: none;"><span class="loader-spinner"></span></span></button></form></div>`;
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        setTimeout(() => {modalOverlay.style.opacity = '1'; modalContent.style.transform = 'translateY(0)';}, 10);
        const closeBtn = modalContent.querySelector('.checkout-close-btn');
        closeBtn.addEventListener('click', () => this.closeCheckoutModal(modalOverlay));
        modalOverlay.addEventListener('click', (e) => {if (e.target === modalOverlay) this.closeCheckoutModal(modalOverlay);});
        const form = modalContent.querySelector('#checkoutFormCart');
        form.addEventListener('submit', (e) => {e.preventDefault(); this.processCheckout(form, modalOverlay);});
        setTimeout(() => document.getElementById('checkout-email-cart').focus(), 300);
    }

    processCheckout(form, modalOverlay) {
        const email = document.getElementById('checkout-email-cart').value.trim();
        const name = document.getElementById('checkout-name-cart').value.trim();
        const phone = document.getElementById('checkout-phone-cart').value.trim();
        const address = document.getElementById('checkout-address-cart').value.trim();
        let hasError = false;
        if (!this.validateEmail(email)) {this.showFieldError('email-error-cart', 'Valid email required'); hasError = true;} else {this.clearFieldError('email-error-cart');}
        if (name.length < 3) {this.showFieldError('name-error-cart', 'Full name required'); hasError = true;} else {this.clearFieldError('name-error-cart');}
        if (phone.length < 10) {this.showFieldError('phone-error-cart', 'Valid phone required'); hasError = true;} else {this.clearFieldError('phone-error-cart');}
        if (address.length < 5) {this.showFieldError('address-error-cart', 'Please enter your address'); hasError = true;} else {this.clearFieldError('address-error-cart');}
        if (hasError) return;
        const submitBtn = form.querySelector('.checkout-submit-btn');
        submitBtn.disabled = true;
        submitBtn.querySelector('.checkout-btn-text').style.display = 'none';
        submitBtn.querySelector('.checkout-btn-loader').style.display = 'inline-block';
        setTimeout(() => {this.closeCheckoutModal(modalOverlay); this.initializeCartPayment(email, name, phone, address);}, 500);
    }

    initializeCartPayment(email, name, phone, address) {
        const total = this.getTotal();
        const itemCount = this.getItemCount();
        const itemsDesc = this.cart.map(item => `${item.name} (x${item.quantity})`).join(', ');
        const txRef = 'WCV-CART-' + Date.now();
        if (typeof FlutterwaveCheckout === 'undefined') {if (typeof showNotification === 'function') showNotification('Payment loading...', 'error'); return;}
        FlutterwaveCheckout({public_key: FLUTTERWAVE_PUBLIC_KEY, tx_ref: txRef, amount: total, currency: 'NGN', payment_options: 'card, banktransfer, ussd, account', customer: {email: email, phone_number: phone, name: name}, meta: {items: itemsDesc, item_count: itemCount, delivery_address: address}, customizations: {title: BUSINESS_NAME, description: `🐾 ${itemCount} Item${itemCount > 1 ? 's' : ''}`, logo: 'https://ik.imagekit.io/esz8imvuw/Generated%20Image%20November%2007,%202025%20-%205_35PM.png?updatedAt=1762536984680', theme: {color: '#667eea', background_color: '#ffffff', button_color: '#667eea', button_text_color: '#ffffff'}}, callback: (response) => {if (response.status === 'successful') {if (typeof showNotification === 'function') showNotification(`✅ Payment successful! ID: ${response.transaction_id}`, 'success'); this.clearCart();} else {if (typeof showNotification === 'function') showNotification('❌ Payment failed', 'error');}}, onclose: () => {if (typeof showNotification === 'function') showNotification('❌ Payment cancelled', 'error');}});
    }

    clearCart() {this.cart = []; this.saveCart(); this.renderCart();}

    closeCheckoutModal(modalOverlay) {modalOverlay.style.opacity = '0'; modalOverlay.querySelector('.checkout-modal').style.transform = 'translateY(-50px)'; setTimeout(() => modalOverlay.remove(), 300);}

    showFieldError(errorId, message) {const el = document.getElementById(errorId); if (el) {el.textContent = message; el.style.display = 'block';}}

    clearFieldError(errorId) {const el = document.getElementById(errorId); if (el) {el.textContent = ''; el.style.display = 'none';}}

    attachEventListeners() {if (document.readyState === 'loading') {document.addEventListener('DOMContentLoaded', () => this.bindCartButtons());} else {this.bindCartButtons();}}

    bindCartButtons() {const cartButtons = document.querySelectorAll('.product-cart-btn'); cartButtons.forEach(button => {const newButton = button.cloneNode(true); button.parentNode.replaceChild(newButton, button); newButton.addEventListener('click', (e) => {e.preventDefault(); const productName = newButton.getAttribute('data-name'); const productPrice = parseInt(newButton.getAttribute('data-price')); if (productName && productPrice) {this.addItem(productName, productPrice);} else {if (typeof showNotification === 'function') showNotification('Product info missing', 'error');}});});}
}
let shoppingCart;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        shoppingCart = new ShoppingCart();
    });
} else {
    shoppingCart = new ShoppingCart();
}
