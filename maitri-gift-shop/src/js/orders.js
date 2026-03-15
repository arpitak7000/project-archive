// This file handles the order management functionality, including displaying past orders and their details.

document.addEventListener('DOMContentLoaded', () => {
    const ordersList = document.getElementById('orders-list');
    
    // Update cart count
    updateCartCount();

    function displayOrders() {
        const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const isLoggedIn = localStorage.getItem('customerLoggedIn') === 'true';
        const customerData = JSON.parse(localStorage.getItem('customerData') || 'null');

        // Filter orders by logged-in customer if applicable
        let orders = allOrders;
        if (isLoggedIn && customerData) {
            orders = allOrders.filter(order =>
                order.customer && order.customer.email === customerData.email
            );
        }

        if (orders.length === 0) {
            if (isLoggedIn) {
                ordersList.innerHTML = '<div class="no-orders"><p>No orders found. <a href="products.html">Start Shopping</a></p></div>';
            } else {
                ordersList.innerHTML = '<div class="no-orders"><p>Please <a href="login.html">login</a> to view your orders.</p></div>';
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

            const customerInfo = order.customer ? `
                <div class="order-customer">
                    <p><strong>Customer:</strong> ${order.customer.fullName || order.customer.name || ''}</p>
                    <p><strong>Email:</strong> ${order.customer.email || ''}</p>
                    <p><strong>Phone:</strong> ${order.customer.phone || ''}</p>
                    ${order.customer.username ? `<p><strong>Username:</strong> ${order.customer.username}</p>` : ''}
                    ${order.customer.birthdate ? `<p><strong>Birth Date:</strong> ${new Date(order.customer.birthdate).toLocaleDateString()}</p>` : ''}
                    ${order.customer.gender ? `<p><strong>Gender:</strong> ${order.customer.gender}</p>` : ''}
                </div>
            ` : '';

            const orderDetails = `
                <div class="order-header">
                    <div>
                        <h3>Order #${order.id}</h3>
                        <p class="order-date">${order.date}</p>
                        ${customerInfo}
                    </div>
                    <span class="order-status ${statusClass}">${order.status}</span>
                </div>
                <div class="order-items-container">
                    ${itemsHtml}
                </div>
                <div class="order-footer">
                    <p class="order-total">Total: <strong>₹${order.total}</strong></p>
                </div>
            `;

            orderElement.innerHTML = orderDetails;
            ordersList.appendChild(orderElement);
        });
    }

    displayOrders();
});