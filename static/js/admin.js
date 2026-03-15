const ADMIN_PASSWORD = 'admin123';

function getAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

function setAdminLoggedIn(value) {
    localStorage.setItem('adminLoggedIn', value ? 'true' : 'false');
    if (value) {
        localStorage.setItem('customerLoggedIn', 'false');
        localStorage.removeItem('customerData');
    }
    if (window.updateAdminLink) window.updateAdminLink();
    if (window.updateLoginLink) window.updateLoginLink();
}

function showElement(el) { if (el) el.style.display = ''; }
function hideElement(el) { if (el) el.style.display = 'none'; }

function renderSalesSummary(filterText = '') {
    const summaryEl = document.getElementById('sales-summary-content');
    if (!summaryEl) return;

    const productStats = window.store ? window.store.getSalesStats() : [];
    if (productStats.length === 0) {
        summaryEl.innerHTML = '<p>No sales data yet.</p>';
        return;
    }

    const filtered = productStats.filter(stat =>
        !filterText || stat.name.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filtered.length === 0) {
        summaryEl.innerHTML = '<p>No products match your search.</p>';
        return;
    }

    const rows = filtered
        .sort((a, b) => b.revenue - a.revenue)
        .map(stat => `<tr><td>${stat.name}</td><td>${stat.sold}</td><td>₹${stat.revenue}</td></tr>`)
        .join('');

    summaryEl.innerHTML = `
        <table class="table">
            <thead><tr><th>Product</th><th>Units Sold</th><th>Revenue</th></tr></thead>
            <tbody>${rows}</tbody>
        </table>`;
}

function renderStockSummary() {
    const stockEl = document.getElementById('stock-summary-content');
    if (!stockEl) return;

    const products = window.store ? window.store.getAllProducts() : [];
    if (products.length === 0) {
        stockEl.innerHTML = '<p>No products configured.</p>';
        return;
    }

    const rows = products.map(p => `
        <tr>
            <td>${p.name}</td>
            <td>${p.stock}</td>
            <td>${p.stock <= 0 ? '<strong>Sold Out</strong>' : 'Available'}</td>
        </tr>`).join('');

    stockEl.innerHTML = `
        <table class="table">
            <thead><tr><th>Product</th><th>Stock</th><th>Status</th></tr></thead>
            <tbody>${rows}</tbody>
        </table>`;
}

function renderTopTrends() {
    const trendsEl = document.getElementById('trends-content');
    if (!trendsEl) return;

    const top = window.store ? window.store.getTopSellingProducts(5) : [];
    if (top.length === 0) {
        trendsEl.innerHTML = '<p>No sales data yet.</p>';
        return;
    }

    trendsEl.innerHTML = top.map(item => `
        <div class="trend-item">
            <div class="trend-item__name">${item.name}</div>
            <div class="trend-item__meta">${item.sold} sold • ₹${item.revenue}</div>
        </div>`).join('');
}

async function renderDashboardSummary() {
    try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();

        if (data.success) {
            document.getElementById('total-revenue').textContent = `₹${data.stats.total_revenue}`;
            document.getElementById('total-orders').textContent = data.stats.total_orders;
            document.getElementById('total-products').textContent = data.stats.total_products;
            document.getElementById('low-stock-count').textContent = data.stats.low_stock_count;
            return;
        }
    } catch (err) { }

    // Fallback to localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const products = window.store ? window.store.getAllProducts() : [];
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    document.getElementById('total-revenue').textContent = `₹${totalRevenue}`;
    document.getElementById('total-orders').textContent = orders.length;
    document.getElementById('total-products').textContent = products.length;
    document.getElementById('low-stock-count').textContent = products.filter(p => p.stock <= 5).length;
}

async function renderOrdersList(filterText = '') {
    const container = document.getElementById('orders-table-container');
    if (!container) return;

    let orders = [];
    try {
        const url = filterText
            ? `/api/admin/orders?search=${encodeURIComponent(filterText)}`
            : '/api/admin/orders';
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
            orders = data.orders;
        } else {
            orders = getLocalFilteredOrders(filterText);
        }
    } catch (err) {
        orders = getLocalFilteredOrders(filterText);
    }

    if (orders.length === 0) {
        container.innerHTML = '<p>No matching orders found.</p>';
        return;
    }

    const rows = orders.map(order => {
        const customer = order.customer || {};
        return `
            <tr>
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>${customer.name || '–'}</td>
                <td>${customer.email || '–'}</td>
                <td>₹${order.total}</td>
                <td>${order.status}</td>
            </tr>`;
    }).join('');

    container.innerHTML = `
        <table class="table">
            <thead><tr><th>Order</th><th>Date</th><th>Customer</th><th>Email</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>${rows}</tbody>
        </table>`;
}

function getLocalFilteredOrders(filterText) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (!filterText) return orders;
    const lower = filterText.toLowerCase();
    return orders.filter(order => {
        const name = order.customer?.name?.toLowerCase() || '';
        const email = order.customer?.email?.toLowerCase() || '';
        return name.includes(lower) || email.includes(lower) || String(order.id).toLowerCase().includes(lower);
    });
}

async function renderAdminDashboard() {
    await renderDashboardSummary();
    renderSalesSummary();
    renderStockSummary();
    renderTopTrends();
    await renderOrdersList();
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
    const viewAllProductsBtn = document.getElementById('view-all-products');
    const viewAllOrdersBtn = document.getElementById('view-all-orders');
    const addNewProductBtn = document.getElementById('add-new-product');
    const exportDataBtn = document.getElementById('export-data');

    function showLogin() { showElement(loginSection); hideElement(dashboardSection); }
    function showDashboard() { hideElement(loginSection); showElement(dashboardSection); renderAdminDashboard(); }

    if (getAdminLoggedIn()) {
        showDashboard();
    } else {
        showLogin();
    }

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const value = document.getElementById('admin-password')?.value || '';
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
        logoutButton.addEventListener('click', () => { setAdminLoggedIn(false); showLogin(); });
    }

    if (orderSearchButton) {
        orderSearchButton.addEventListener('click', () => { renderOrdersList(orderSearchInput?.value || ''); });
    }
    if (orderResetButton) {
        orderResetButton.addEventListener('click', () => { if (orderSearchInput) orderSearchInput.value = ''; renderOrdersList(); });
    }
    if (salesSearchButton) {
        salesSearchButton.addEventListener('click', () => { renderSalesSummary(salesSearchInput?.value || ''); });
    }
    if (salesResetButton) {
        salesResetButton.addEventListener('click', () => { if (salesSearchInput) salesSearchInput.value = ''; renderSalesSummary(); });
    }

    if (viewAllProductsBtn) { viewAllProductsBtn.addEventListener('click', () => { window.location.href = '/products'; }); }
    if (viewAllOrdersBtn) { viewAllOrdersBtn.addEventListener('click', () => { document.getElementById('customer-orders').scrollIntoView({ behavior: 'smooth' }); }); }
    if (addNewProductBtn) { addNewProductBtn.addEventListener('click', () => { alert('Add New Product feature coming soon.'); }); }
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/admin/orders');
                const data = await response.json();
                if (data.success) {
                    const blob = new Blob([JSON.stringify(data.orders, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'maitri-orders.json';
                    a.click();
                    URL.revokeObjectURL(url);
                }
            } catch (err) {
                alert('Export failed. Please try again.');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initAdminPage);
