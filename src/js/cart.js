// Cart management including loading, displaying, and updating cart items

// Function to load and display cart items on cart.html
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="products.html">Continue Shopping</a></p>';
        totalPriceElement.textContent = 'Total: ₹0';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
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

    totalPriceElement.textContent = `Total: ₹${totalPrice}`;

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
    
    if (item) {
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }
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

// Function to save order to localStorage
function saveOrder(cartItems) {
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
        timestamp: Date.now()
    };
    
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Function to show checkout success modal
function showCheckoutSuccess() {
    const modal = document.createElement('div');
    modal.className = 'checkout-modal';
    modal.innerHTML = `
        <div class="checkout-modal-content">
            <div class="checkout-icon">✓</div>
            <h2>Congratulations!</h2>
            <p>Your order is on the way</p>
            <button class="btn btn-primary" id="close-checkout-modal">Continue Shopping</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
    
    document.getElementById('close-checkout-modal').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            window.location.href = 'orders.html';
        }, 300);
    });
}

// Handle checkout button
const checkoutButton = document.getElementById('checkout-button');
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        const cart = getCartItems();
        if (cart.length > 0) {
            saveOrder(cart);
            clearCart();
            loadCart();
            showCheckoutSuccess();
        } else {
            alert('Your cart is empty!');
        }
    });
}