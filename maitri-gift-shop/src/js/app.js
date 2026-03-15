// This file contains the main JavaScript code for the Maitri Gift Shop Management System.
// It initializes the website, handles global functionality, and sets up event listeners.

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the cart count from local storage
    updateCartCount();

    // Show admin link if admin is logged in
    updateAdminLink();

    // Update login link based on customer login status
    updateLoginLink();

    // Add event listeners for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Highlight the active link
            navLinks.forEach(nav => nav.classList.remove('active'));
            event.target.classList.add('active');
        });
    });
});

// Function to update the cart count displayed in the navigation
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => {
        el.textContent = `(${totalItems})`;
    });
}

function getAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

function getCustomerLoggedIn() {
    return localStorage.getItem('customerLoggedIn') === 'true';
}

// Function to show/hide the admin link in navigation.
// When a customer is logged in, we hide the admin link to prevent accidental access.
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

// Function to update the login/logout link in navigation based on customer login status
function updateLoginLink() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const existingLoginLink = document.querySelector('.nav-links a[href="login.html"]');
    const existingLogoutLink = document.querySelector('.nav-links .logout-link');

    // Remove existing login/logout links
    if (existingLoginLink) existingLoginLink.parentElement.remove();
    if (existingLogoutLink) existingLogoutLink.parentElement.remove();

    const isAdmin = getAdminLoggedIn();
    const isCustomer = getCustomerLoggedIn();
    const customerData = JSON.parse(localStorage.getItem('customerData') || 'null');

    if (isAdmin) {
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = `<a href="#" class="logout-link">Logout (Admin)</a>`;
        navLinks.appendChild(logoutLi);

        const logoutLink = logoutLi.querySelector('.logout-link');
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('adminLoggedIn', 'false');
            updateLoginLink();
            updateAdminLink();
            window.location.href = 'index.html';
        });

        return;
    }

    if (isCustomer && customerData) {
        // Add logout link with customer name
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = `<a href="#" class="logout-link">Logout (${customerData.name})</a>`;
        navLinks.appendChild(logoutLi);

        // Add logout event listener
        const logoutLink = logoutLi.querySelector('.logout-link');
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('customerLoggedIn', 'false');
            localStorage.removeItem('customerData');
            updateLoginLink();
            updateAdminLink();
            window.location.href = 'index.html';
        });
    } else {
        // Add login link
        const loginLi = document.createElement('li');
        loginLi.innerHTML = '<a href="login.html">Login</a>';
        navLinks.appendChild(loginLi);
    }
}