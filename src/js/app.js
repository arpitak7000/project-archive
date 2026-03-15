// This file contains the main JavaScript code for the Maitri Gift Shop Management System.
// It initializes the website, handles global functionality, and sets up event listeners.

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        // Show login modal
        document.getElementById('login-modal').style.display = 'block';
        document.getElementById('main-content').style.display = 'none';
    } else {
        // Show main content
        document.getElementById('login-modal').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        initializeApp();
    }

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication (in a real app, this would be server-side)
        if (username === 'admin' && password === 'password') {
            localStorage.setItem('isLoggedIn', 'true');
            document.getElementById('login-modal').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            initializeApp();
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
});

function initializeApp() {
    // Initialize the cart count from local storage
    updateCartCount();

    // Add event listeners for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Highlight the active link
            navLinks.forEach(nav => nav.classList.remove('active'));
            event.target.classList.add('active');
        });
    });
}

// Function to update the cart count displayed in the navigation
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => {
        el.textContent = `(${totalItems})`;
    });
}