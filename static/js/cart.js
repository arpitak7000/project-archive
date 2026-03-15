function showCartMessage(message) {
    let msgDiv = document.getElementById('cart-message');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'cart-message';
        msgDiv.className = 'cart-message';
        document.body.appendChild(msgDiv);
    }
    msgDiv.textContent = message;
    msgDiv.style.display = 'block';
    setTimeout(() => { msgDiv.style.display = 'none'; }, 2500);
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="/products">Continue Shopping</a></p>';
        const subtotalElement = document.getElementById('subtotal-price');
        const taxElement = document.getElementById('tax-amount');
        if (subtotalElement) subtotalElement.textContent = '0';
        if (taxElement) taxElement.textContent = '0';
        totalPriceElement.textContent = '0';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">₹${item.price}</p>
                <p class="cart-item-description">${item.description || ''}</p>
                <div class="cart-item-quantity">
                    <label>Quantity: ${item.quantity}</label>
                    <button class="btn-change-quantity" data-id="${item.id}" data-action="decrease">-</button>
                    <button class="btn-change-quantity" data-id="${item.id}" data-action="increase">+</button>
                </div>
            </div>
            <div class="cart-item-subtotal">
                <p class="subtotal-price">₹${item.price * item.quantity}</p>
                <button class="btn-remove" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    const gstPercent = 0.18;
    const gstAmount = Math.round(subtotal * gstPercent);
    const totalPrice = subtotal + gstAmount;

    document.getElementById('subtotal-price').textContent = subtotal;
    document.getElementById('tax-amount').textContent = gstAmount;
    totalPriceElement.textContent = totalPrice;

    document.querySelectorAll('.btn-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            removeFromCart(parseInt(e.target.getAttribute('data-id')));
            loadCart();
            updateCartCount();
        });
    });

    document.querySelectorAll('.btn-change-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const action = e.target.getAttribute('data-action');
            updateQuantity(productId, action);
            loadCart();
        });
    });
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateQuantity(productId, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(product => product.id === productId);
    if (!item) return;

    const stock = window.store ? window.store.getStockForProduct(productId) : Infinity;

    if (action === 'increase') {
        if (item.quantity + 1 > stock) {
            alert('Cannot increase quantity beyond available stock.');
            return;
        }
        item.quantity += 1;
    } else if (action === 'decrease' && item.quantity > 1) {
        item.quantity -= 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = `(${totalItems})`;
    });
}

function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function clearCart() {
    localStorage.removeItem('cart');
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="/products">Continue Shopping</a></p>';
    }
    updateCartCount();
}

async function saveOrder(cartItems, customer) {
    showCartMessage('Placing your order...');

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gstAmount = Math.round(subtotal * 0.18);
    const total = subtotal + gstAmount;

    // Save to backend
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customer,
                items: cartItems,
                subtotal,
                gst: gstAmount,
                total
            })
        });
        const data = await response.json();

        if (data.success && data.order) {
            // Also save to localStorage for orders.js to display
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.unshift(data.order);
            localStorage.setItem('orders', JSON.stringify(orders));
        }
    } catch (err) {
        // Fallback: save to localStorage only
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const orderId = 'ORD' + Date.now();
        const orderDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
        orders.unshift({
            id: orderId, date: orderDate, items: cartItems, total,
            status: 'On the Way', timestamp: Date.now(),
            customer: { name: customer.name, email: customer.email, phone: customer.phone, address: customer.address }
        });
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    if (window.store) window.store.reduceStockForOrder(cartItems);
    showCartMessage('Order placed! Thank you for shopping.');
}

function showCheckoutModal() {
    showCartMessage('Please fill in your details to place the order.');
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    const isLoggedIn = localStorage.getItem('customerLoggedIn') === 'true';
    const customerData = JSON.parse(localStorage.getItem('customerData') || 'null');

    if (isLoggedIn && customerData) {
        const nameField = document.getElementById('customer-name');
        const emailField = document.getElementById('customer-email');
        if (nameField) nameField.value = customerData.name || '';
        if (emailField) emailField.value = customerData.email || '';
    }

    modal.classList.add('show');
}

function hideCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;
    modal.classList.remove('show');
}

function getCheckoutFormData() {
    return {
        name: document.getElementById('customer-name')?.value.trim(),
        email: document.getElementById('customer-email')?.value.trim(),
        phone: document.getElementById('customer-phone')?.value.trim(),
        address: document.getElementById('customer-address')?.value.trim()
    };
}

function validateCheckoutData(data) {
    if (!data.name || !data.email || !data.phone || !data.address) {
        return 'Please fill in all required fields.';
    }
    if (!data.email.includes('@')) {
        return 'Please enter a valid email address.';
    }
    if (!/^\+?[\d\s\-]{7,15}$/.test(data.phone)) {
        return 'Please enter a valid phone number.';
    }
    return null;
}

function showCheckoutSuccess() {
    showCartMessage('Your order has been placed successfully!');
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartCount();
});

const checkoutButton = document.getElementById('checkout-button');
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        const cart = getCartItems();
        if (cart.length === 0) { alert('Your cart is empty!'); return; }
        showCheckoutModal();
    });
}

const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const errorElement = document.getElementById('checkout-error');
        const formData = getCheckoutFormData();
        const error = validateCheckoutData(formData);

        if (error) {
            if (errorElement) errorElement.textContent = error;
            return;
        }
        if (errorElement) errorElement.textContent = '';

        const cart = getCartItems();
        await saveOrder(cart, formData);
        clearCart();
        loadCart();
        hideCheckoutModal();
        showCheckoutSuccess();
    });
}

const checkoutCancelButton = document.getElementById('checkout-cancel');
if (checkoutCancelButton) {
    checkoutCancelButton.addEventListener('click', () => { hideCheckoutModal(); });
}

const printBillButton = document.getElementById('print-bill-button');
if (printBillButton) {
    printBillButton.addEventListener('click', () => {
        const cart = getCartItems();
        if (cart.length === 0) { alert('Your cart is empty!'); return; }

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const gstAmount = Math.round(subtotal * 0.18);
        const total = subtotal + gstAmount;

        const invoiceWindow = window.open('', '_blank');
        if (!invoiceWindow) return;

        const styles = `
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2 { margin: 0; }
            h1 { font-size: 24px; margin-bottom: 10px; }
            h2 { font-size: 18px; margin: 12px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
            th { background: #f5f5f5; }
            .totals { margin-top: 20px; width: 100%; }
            .totals td { padding: 8px; }
            .totals .label { text-align: right; font-weight: 700; }
            .totals .value { width: 120px; text-align: right; }
            .footer { margin-top: 30px; font-size: 0.9em; color: #555; }
        `;

        const itemsHtml = cart.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${item.price * item.quantity}</td>
            </tr>
        `).join('');

        invoiceWindow.document.write(`
            <html><head><title>Invoice - Maitri Gift Shop</title><style>${styles}</style></head>
            <body>
                <h1>Maitri Gift Shop</h1><h2>Invoice</h2>
                <p>Date: ${new Date().toLocaleString('en-IN')}</p>
                <table>
                    <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead>
                    <tbody>${itemsHtml}</tbody>
                </table>
                <table class="totals">
                    <tr><td class="label">Subtotal:</td><td class="value">₹${subtotal}</td></tr>
                    <tr><td class="label">GST (18%):</td><td class="value">₹${gstAmount}</td></tr>
                    <tr><td class="label">Total:</td><td class="value">₹${total}</td></tr>
                </table>
                <div class="footer">Thank you for shopping with Maitri Gift Shop.</div>
                <script>window.print();<\/script>
            </body></html>
        `);
        invoiceWindow.document.close();
    });
}
