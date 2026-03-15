// Utility: Show cart message
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
    setTimeout(() => {
        msgDiv.style.display = 'none';
    }, 2500);
}
// Cart management including loading, displaying, and updating cart items

// Function to load and display cart items on cart.html
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="products.html">Continue Shopping</a></p>';
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

    const subtotalElement = document.getElementById('subtotal-price');
    const taxElement = document.getElementById('tax-amount');
    subtotalElement.textContent = subtotal;
    taxElement.textContent = gstAmount;
    totalPriceElement.textContent = totalPrice;

    // Add event listeners for remove buttons
    document.querySelectorAll('.btn-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            removeFromCart(parseInt(e.target.getAttribute('data-id')));
            loadCart();
            updateCartCount();
        });
    });

    // Add event listeners for quantity change buttons
    document.querySelectorAll('.btn-change-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const action = e.target.getAttribute('data-action');
            updateQuantity(productId, action);
            loadCart();
        });
    });
}

// Function to remove an item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update quantity of an item
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

// Function to update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => {
        el.textContent = `(${totalItems})`;
    });
}

// Function to get cart items
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem('cart');
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="products.html">Continue Shopping</a></p>';
    }
    updateCartCount();
}

// Load cart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartCount();
});

// Function to save order to localStorage (includes customer info)
function saveOrder(cartItems, customer) {
        showCartMessage('Order placed successfully! Generating bill...');
        showCartMessage('Order placed! Thank you for shopping.');
    if (window.store) {
        window.store.reduceStockForOrder(cartItems);
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderId = 'ORD' + Date.now();
    const orderDate = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = {
        id: orderId,
        date: orderDate,
        items: cartItems,
        total: totalPrice,
        status: 'On the Way',
        timestamp: Date.now(),
        customer: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            fullName: customer.fullName || customer.name,
            username: customer.username || '',
            birthdate: customer.birthdate || '',
            gender: customer.gender || ''
        }
    };

    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Show checkout modal with customer information form
function showCheckoutModal() {
        showCartMessage('Please fill in your details to place the order.');
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    // Pre-fill form with logged-in customer data if available
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
        showCartMessage('Please fill in all required fields.');
        return 'Please fill in all required fields.';
    }
    if (!data.email.includes('@')) {
        showCartMessage('Please enter a valid email address.');
        return 'Please enter a valid email address.';
    }
    showCartMessage('Checkout details validated.');
    return null;
}

// Handle checkout button
const checkoutButton = document.getElementById('checkout-button');
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        const cart = getCartItems();
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        showCheckoutModal();
    });
}

// Handle checkout form submission
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const errorElement = document.getElementById('checkout-error');
        const formData = getCheckoutFormData();
        const error = validateCheckoutData(formData);

        if (error) {
            if (errorElement) errorElement.textContent = error;
            return;
        }

        const cart = getCartItems();
        saveOrder(cart, formData);
        clearCart();
        loadCart();
        hideCheckoutModal();
        showCheckoutSuccess();
    });
}

const checkoutCancelButton = document.getElementById('checkout-cancel');
if (checkoutCancelButton) {
    checkoutCancelButton.addEventListener('click', () => {
        hideCheckoutModal();
    });
}

// Handle print bill button
const printBillButton = document.getElementById('print-bill-button');
if (printBillButton) {
    printBillButton.addEventListener('click', () => {
        const cart = getCartItems();
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const gstPercent = 0.18;
        const gstAmount = Math.round(subtotal * gstPercent);
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
            <html>
            <head>
                <title>Invoice - Maitri Gift Shop</title>
                <style>${styles}</style>
            </head>
            <body>
                <h1>Maitri Gift Shop</h1>
                <h2>Invoice</h2>
                <p>Date: ${new Date().toLocaleString('en-IN')}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>
                <table class="totals">
                    <tr>
                        <td class="label">Subtotal:</td>
                        <td class="value">₹${subtotal}</td>
                    </tr>
                    <tr>
                        <td class="label">GST (18%):</td>
                        <td class="value">₹${gstAmount}</td>
                    </tr>
                    <tr>
                        <td class="label">Total:</td>
                        <td class="value">₹${total}</td>
                    </tr>
                </table>
                <div class="footer">Thank you for shopping with Maitri Gift Shop.</div>
                <script>window.print();</script>
            </body>
            </html>
        `);

        invoiceWindow.document.close();
    });
}