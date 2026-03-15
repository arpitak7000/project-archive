// Admin dashboard script

const ADMIN_PASSWORD = 'admin123';

function getAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

function setAdminLoggedIn(value) {
    localStorage.setItem('adminLoggedIn', value ? 'true' : 'false');

    // Ensure we don't mix admin and customer sessions
    if (value) {
        localStorage.setItem('customerLoggedIn', 'false');
        localStorage.removeItem('customerData');
    }

    // Update navigation links
    if (window.updateAdminLink) window.updateAdminLink();
    if (window.updateLoginLink) window.updateLoginLink();
}

function showElement(el) {
    if (!el) return;
    el.style.display = '';
}

function hideElement(el) {
    if (!el) return;
    el.style.display = 'none';
}

function renderSalesSummary(filterText = '') {
    const summaryEl = document.getElementById('sales-summary-content');
    if (!summaryEl) return;

    const productStats = (window.store ? window.store.getSalesStats() : []);
    if (productStats.length === 0) {
        summaryEl.innerHTML = '<p>No sales data yet.</p>';
        return;
    }

    const filtered = productStats
        .filter(stat => {
            if (!filterText) return true;
            return stat.name.toLowerCase().includes(filterText.toLowerCase());
        });

    if (filtered.length === 0) {
        summaryEl.innerHTML = '<p>No products match your search.</p>';
        return;
    }

    const rows = filtered
        .sort((a, b) => b.revenue - a.revenue)
        .map(stat => `
            <tr>
                <td>${stat.name}</td>
                <td>${stat.sold}</td>
                <td>₹${stat.revenue}</td>
            </tr>
        `)
        .join('');

    summaryEl.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Units Sold</th>
                    <th>Revenue</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
}

function renderStockSummary() {
    const stockEl = document.getElementById('stock-summary-content');
    if (!stockEl) return;

    const products = window.store ? window.store.getAllProducts() : [];

    if (products.length === 0) {
        stockEl.innerHTML = '<p>No products configured.</p>';
        return;
    }

    const rows = products
        .map(p => `
            <tr>
                <td>${p.name}</td>
                <td>${p.stock}</td>
                <td>${p.stock <= 0 ? '<strong>Sold Out</strong>' : 'Available'}</td>
            </tr>
        `)
        .join('');

    stockEl.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Stock</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
}

function renderTopTrends() {
    const trendsEl = document.getElementById('trends-content');
    if (!trendsEl) return;

    const top = window.store ? window.store.getTopSellingProducts(5) : [];
    if (top.length === 0) {
        trendsEl.innerHTML = '<p>No sales data yet.</p>';
        return;
    }

    const items = top.map(item => `
        <div class="trend-item">
            <div class="trend-item__name">${item.name}</div>
            <div class="trend-item__meta">${item.sold} sold • ₹${item.revenue}</div>
        </div>
    `).join('');

    trendsEl.innerHTML = items;
}

function renderDashboardSummary() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const products = window.store ? window.store.getAllProducts() : [];

    // Total Revenue
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    document.getElementById('total-revenue').textContent = `₹${totalRevenue}`;

    // Total Orders
    document.getElementById('total-orders').textContent = orders.length;

    // Total Products
    document.getElementById('total-products').textContent = products.length;

    // Low Stock Items (assuming low stock is <= 5)
    const lowStockCount = products.filter(p => p.stock <= 5).length;
    document.getElementById('low-stock-count').textContent = lowStockCount;
}

function renderOrdersList(filterText = '') {
    const container = document.getElementById('orders-table-container');
    if (!container) return;

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const filtered = orders.filter(order => {
        if (!filterText) return true;
        const lower = filterText.toLowerCase();
        const customerName = order.customer?.name?.toLowerCase() || '';
        const customerEmail = order.customer?.email?.toLowerCase() || '';
        return customerName.includes(lower) || customerEmail.includes(lower) || order.id.toLowerCase().includes(lower);
    });

    if (filtered.length === 0) {
        container.innerHTML = '<p>No matching orders found.</p>';
        return;
    }

    const rows = filtered.map(order => {
        const customer = order.customer || {};
        return `
            <tr>
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>${customer.name || '–'}</td>
                <td>${customer.email || '–'}</td>
                <td>₹${order.total}</td>
                <td>${order.status}</td>
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
}

function renderAdminDashboard() {
    renderDashboardSummary();
    renderSalesSummary();
    renderStockSummary();
    renderTopTrends();
    renderOrdersList();
}

function initAdminPage() {
    const loginSection = document.getElementById('admin-login');
    const dashboardSection = document.getElementById('admin-dashboard');

    const loginButton = document.getElementById('admin-login-button');
    const logoutButton = document.getElementById('admin-logout');
    const loginError = document.getElementById('admin-login-error');
    const orderSearchInput = document.getElementById('order-search');
    const orderSearchButton = document.getElementById('order-search-btn');
    const orderResetButton = document.getElementById('order-reset-btn');

    const salesSearchInput = document.getElementById('sales-search');
    const salesSearchButton = document.getElementById('sales-search-btn');
    const salesResetButton = document.getElementById('sales-reset-btn');

    // Quick action buttons
    const viewAllProductsBtn = document.getElementById('view-all-products');
    const viewAllOrdersBtn = document.getElementById('view-all-orders');
    const addNewProductBtn = document.getElementById('add-new-product');
    const exportDataBtn = document.getElementById('export-data');

    function showLogin() {
        showElement(loginSection);
        hideElement(dashboardSection);
    }

    function showDashboard() {
        hideElement(loginSection);
        showElement(dashboardSection);
        renderAdminDashboard();
    }

    if (getAdminLoggedIn()) {
        showDashboard();
    } else {
        showLogin();
    }

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const passwordInput = document.getElementById('admin-password');
            const value = passwordInput?.value || '';
            if (value === ADMIN_PASSWORD) {
                setAdminLoggedIn(true);
                if (loginError) loginError.textContent = '';
                showDashboard();
            } else {
                if (loginError) loginError.textContent = 'Incorrect password. Please try again.';
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            setAdminLoggedIn(false);
            showLogin();
        });
    }

    if (orderSearchButton) {
        orderSearchButton.addEventListener('click', () => {
            const filter = orderSearchInput?.value || '';
            renderOrdersList(filter);
        });
    }

    if (orderResetButton) {
        orderResetButton.addEventListener('click', () => {
            if (orderSearchInput) orderSearchInput.value = '';
            renderOrdersList();
        });
    }

    if (salesSearchButton) {
        salesSearchButton.addEventListener('click', () => {
            const filter = salesSearchInput?.value || '';
            renderSalesSummary(filter);
        });
    }

    if (salesResetButton) {
        salesResetButton.addEventListener('click', () => {
            if (salesSearchInput) salesSearchInput.value = '';
            renderSalesSummary();
        });
    }

    // Quick action event listeners
    if (viewAllProductsBtn) {
        viewAllProductsBtn.addEventListener('click', () => {
            window.location.href = 'products.html';
        });
    }

    if (viewAllOrdersBtn) {
        viewAllOrdersBtn.addEventListener('click', () => {
            // Scroll to orders widget
            document.getElementById('customer-orders').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (addNewProductBtn) {
        addNewProductBtn.addEventListener('click', () => {
            alert('Add New Product feature is disabled.');
        });
    }

    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', () => {
            alert('Export Data feature is disabled.');
        });
    }
}


document.addEventListener('DOMContentLoaded', initAdminPage);
