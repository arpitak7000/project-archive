document.addEventListener('DOMContentLoaded', async () => {
    const ordersList = document.getElementById('orders-list');
    updateCartCount();

    const isLoggedIn = localStorage.getItem('customerLoggedIn') === 'true';
    const customerData = JSON.parse(localStorage.getItem('customerData') || 'null');

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
    setupBillModal();
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

        const orderDataJson = encodeURIComponent(JSON.stringify(order));

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
                <button class="btn btn-primary view-bill-btn" data-order="${orderDataJson}">
                    🧾 View Bill
                </button>
            </div>
        `;

        ordersList.appendChild(orderElement);
    });

    document.querySelectorAll('.view-bill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const order = JSON.parse(decodeURIComponent(btn.dataset.order));
            const customerData = JSON.parse(localStorage.getItem('customerData') || 'null');
            openBillModal(order, customerData);
        });
    });
}

// ---------------------------------------------------------------------------
// Bill Modal
// ---------------------------------------------------------------------------

function setupBillModal() {
    document.getElementById('bill-modal-overlay').addEventListener('click', function (e) {
        if (e.target === this) closeBillModal();
    });
    document.getElementById('bill-close-btn').addEventListener('click', closeBillModal);
    document.getElementById('bill-print-btn').addEventListener('click', printBill);
}

function openBillModal(order, customerData) {
    const customer = order.customer || {};
    const birthdate = (customerData && customerData.birthdate) ? formatDate(customerData.birthdate) : '—';

    const billNumber = 'BILL-' + (order.id || 'ORD');
    const orderDate  = order.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    // Build items table rows
    const rows = order.items.map((item, i) => {
        const amount = (parseFloat(item.price) * parseInt(item.quantity)).toFixed(2);
        return `
            <tr>
                <td>${i + 1}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${parseFloat(item.price).toFixed(2)}</td>
                <td>₹${amount}</td>
            </tr>
        `;
    }).join('');

    const subtotal   = parseFloat(order.subtotal || 0).toFixed(2);
    const gst        = parseFloat(order.gst || 0).toFixed(2);
    const netTotal   = parseFloat(order.total || 0).toFixed(2);
    const gstRate    = subtotal > 0 ? ((parseFloat(gst) / parseFloat(subtotal)) * 100).toFixed(0) : 18;

    document.getElementById('bill-content').innerHTML = `
        <div class="bill-header">
            <div class="bill-shop-name">Maitri Gift Shop</div>
            <div class="bill-shop-sub">123 Main Street, City, State 12345, India</div>
            <div class="bill-shop-sub">📞 +91 98765 43210 &nbsp;|&nbsp; ✉ info@maitrigiftshop.com</div>
            <div class="bill-divider"></div>
            <div class="bill-title">TAX INVOICE / BILL</div>
        </div>

        <div class="bill-meta">
            <div class="bill-meta-left">
                <p><strong>Bill No.:</strong> ${billNumber}</p>
                <p><strong>Order Ref.:</strong> #${order.id}</p>
                <p><strong>Order Date:</strong> ${orderDate}</p>
            </div>
            <div class="bill-meta-right">
                <p><strong>Customer Name:</strong> ${customer.fullName || customer.name || '—'}</p>
                <p><strong>Date of Birth:</strong> ${birthdate}</p>
                <p><strong>Phone No.:</strong> ${customer.phone || '—'}</p>
                <p><strong>Address:</strong> ${customer.address || '—'}</p>
            </div>
        </div>

        <table class="bill-table">
            <thead>
                <tr>
                    <th>Sr. No.</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>

        <div class="bill-totals">
            <div class="bill-totals-row">
                <span>Total Amount</span>
                <span>₹${subtotal}</span>
            </div>
            <div class="bill-totals-row">
                <span>GST (${gstRate}%)</span>
                <span>₹${gst}</span>
            </div>
            <div class="bill-totals-row bill-net-total">
                <span>Net Payable Amount</span>
                <span>₹${netTotal}</span>
            </div>
        </div>

        <div class="bill-payment-method">
            <strong>Payment Method:</strong>
            <span class="bill-payment-badge">${order.payment_method || 'Cash on Delivery'}</span>
        </div>

        <div class="bill-footer-note">
            Thank you for shopping with Maitri Gift Shop! 🎁<br>
            This is a computer-generated bill and does not require a signature.
        </div>
    `;

    document.getElementById('bill-modal-overlay').classList.add('active');
}

function closeBillModal() {
    document.getElementById('bill-modal-overlay').classList.remove('active');
}

function printBill() {
    const billContent = document.getElementById('bill-content').innerHTML;
    const printWindow = window.open('', '_blank', 'width=800,height=700');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Bill - Maitri Gift Shop</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: Arial, sans-serif; font-size: 13px; color: #222; padding: 30px; }
                .bill-header { text-align: center; margin-bottom: 18px; }
                .bill-shop-name { font-size: 24px; font-weight: bold; color: #7b2d00; letter-spacing: 1px; }
                .bill-shop-sub { font-size: 12px; color: #555; margin-top: 3px; }
                .bill-divider { border-top: 2px solid #7b2d00; margin: 12px 0; }
                .bill-title { font-size: 16px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; }
                .bill-meta { display: flex; justify-content: space-between; margin-bottom: 18px; gap: 20px; }
                .bill-meta p { margin-bottom: 5px; font-size: 13px; }
                .bill-table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
                .bill-table th { background: #7b2d00; color: white; padding: 8px 10px; text-align: left; font-size: 13px; }
                .bill-table td { padding: 7px 10px; border-bottom: 1px solid #ddd; font-size: 13px; }
                .bill-table tbody tr:nth-child(even) { background: #fdf6f0; }
                .bill-totals { margin-left: auto; width: 280px; border-top: 2px solid #7b2d00; padding-top: 10px; }
                .bill-totals-row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 13px; }
                .bill-net-total { font-weight: bold; font-size: 15px; border-top: 2px solid #7b2d00; margin-top: 6px; padding-top: 8px; color: #7b2d00; }
                .bill-footer-note { text-align: center; margin-top: 24px; font-size: 12px; color: #777; border-top: 1px dashed #ccc; padding-top: 14px; }
                .bill-payment-method { margin-top: 16px; padding: 8px 12px; background: #fdf6f0; border: 1px solid #e8d5c4; border-radius: 6px; font-size: 13px; display: flex; align-items: center; gap: 10px; }
                .bill-payment-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; background: #7b2d00; color: white; font-size: 12px; font-weight: bold; }
            </style>
        </head>
        <body>${billContent}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 400);
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
}
