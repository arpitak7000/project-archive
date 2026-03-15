document.addEventListener('DOMContentLoaded', async () => {
    const ordersList = document.getElementById('orders-list');
    updateCartCount();

    const isLoggedIn = localStorage.getItem('customerLoggedIn') === 'true';
    const customerData = JSON.parse(localStorage.getItem('customerData') || 'null');

    // Try to fetch orders from the backend, fall back to localStorage
    let orders = [];
    try {
        const url = isLoggedIn && customerData
            ? `/api/orders?email=${encodeURIComponent(customerData.email)}`
            : '/api/orders';
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
            orders = data.orders;
        } else {
            orders = getLocalOrders(isLoggedIn, customerData);
        }
    } catch (err) {
        orders = getLocalOrders(isLoggedIn, customerData);
    }

    displayOrders(orders, isLoggedIn, customerData);
});

function getLocalOrders(isLoggedIn, customerData) {
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    if (isLoggedIn && customerData) {
        return allOrders.filter(order => order.customer && order.customer.email === customerData.email);
    }
    return allOrders;
}

function displayOrders(orders, isLoggedIn, customerData) {
    const ordersList = document.getElementById('orders-list');

    if (orders.length === 0) {
        if (isLoggedIn) {
            ordersList.innerHTML = '<div class="no-orders"><p>No orders found. <a href="/products">Start Shopping</a></p></div>';
        } else {
            ordersList.innerHTML = '<div class="no-orders"><p>Please <a href="/login">login</a> to view your orders.</p></div>';
        }
        return;
    }

    ordersList.innerHTML = '<h2>Your Past Orders</h2>';

    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order-card');

        const itemsHtml = order.items.map(item => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="order-item-image">
                <div class="order-item-details">
                    <p class="order-item-name">${item.name}</p>
                    <p class="order-item-qty">Qty: ${item.quantity}</p>
                    <p class="order-item-price">₹${item.price}</p>
                </div>
                <p class="order-item-subtotal">₹${item.price * item.quantity}</p>
            </div>
        `).join('');

        const statusClass = order.status === 'On the Way' ? 'status-onway' : 'status-delivered';

        const customer = order.customer || {};
        const customerInfo = customer.name ? `
            <div class="order-customer">
                <p><strong>Customer:</strong> ${customer.fullName || customer.name}</p>
                <p><strong>Email:</strong> ${customer.email || ''}</p>
                <p><strong>Phone:</strong> ${customer.phone || ''}</p>
            </div>
        ` : '';

        orderElement.innerHTML = `
            <div class="order-header">
                <div>
                    <h3>Order #${order.id}</h3>
                    <p class="order-date">${order.date}</p>
                    ${customerInfo}
                </div>
                <span class="order-status ${statusClass}">${order.status}</span>
            </div>
            <div class="order-items-container">${itemsHtml}</div>
            <div class="order-footer">
                <p class="order-total">Total: <strong>₹${order.total}</strong></p>
            </div>
        `;

        ordersList.appendChild(orderElement);
    });
}
