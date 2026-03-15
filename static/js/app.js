document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateAdminLink();
    updateLoginLink();

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            navLinks.forEach(nav => nav.classList.remove('active'));
            event.target.classList.add('active');
        });
    });
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = `(${totalItems})`;
    });
}

function getAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

function getCustomerLoggedIn() {
    return localStorage.getItem('customerLoggedIn') === 'true';
}

function updateAdminLink() {
    const adminNavItem = document.getElementById('admin-nav-item');
    if (!adminNavItem) return;

    const isAdmin = getAdminLoggedIn();
    const isCustomer = getCustomerLoggedIn();

    if (isCustomer && !isAdmin) {
        adminNavItem.style.display = 'none';
        return;
    }

    adminNavItem.style.display = '';
    const adminLink = adminNavItem.querySelector('a');
    if (adminLink) {
        adminLink.textContent = isAdmin ? 'Admin Dashboard' : 'Admin';
    }
}

function updateLoginLink() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    // Remove existing static login link (href="/login") and any logout link
    const existingLoginLink = navLinks.querySelector('a[href="/login"]');
    const existingLogoutLink = navLinks.querySelector('.logout-link');

    if (existingLoginLink) existingLoginLink.parentElement.remove();
    if (existingLogoutLink) existingLogoutLink.parentElement.remove();

    const isAdmin = getAdminLoggedIn();
    const isCustomer = getCustomerLoggedIn();
    const customerData = JSON.parse(localStorage.getItem('customerData') || 'null');

    if (isAdmin) {
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = `<a href="#" class="logout-link">Logout (Admin)</a>`;
        navLinks.appendChild(logoutLi);
        logoutLi.querySelector('.logout-link').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('adminLoggedIn', 'false');
            updateLoginLink();
            updateAdminLink();
            window.location.href = '/';
        });
        return;
    }

    if (isCustomer && customerData) {
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = `<a href="#" class="logout-link">Logout (${customerData.name})</a>`;
        navLinks.appendChild(logoutLi);
        logoutLi.querySelector('.logout-link').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('customerLoggedIn', 'false');
            localStorage.removeItem('customerData');
            updateLoginLink();
            updateAdminLink();
            window.location.href = '/';
        });
    } else {
        const loginLi = document.createElement('li');
        loginLi.innerHTML = '<a href="/login">Login</a>';
        navLinks.appendChild(loginLi);
    }
}
