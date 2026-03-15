// This file handles the order management functionality, including displaying past orders and their details.

document.addEventListener('DOMContentLoaded', () => {
    const ordersList = document.getElementById('orders-list');
    
    // Update cart count
    updateCartCount();

    function displayOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        
        if (orders.length === 0) {
            ordersList.innerHTML = '<div class="no-orders"><p>No orders found. <a href="products.html">Start Shopping</a></p></div>';
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

            const orderDetails = `
                <div class="order-header">
                    <div>
                        <h3>Order #${order.id}</h3>
                        <p class="order-date">${order.date}</p>
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