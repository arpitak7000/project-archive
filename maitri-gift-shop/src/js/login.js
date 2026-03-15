// Customer login functionality

function getCustomerLoggedIn() {
    return localStorage.getItem('customerLoggedIn') === 'true';
}

function setCustomerLoggedIn(value, customerData = null) {
    localStorage.setItem('customerLoggedIn', value ? 'true' : 'false');

    // Make sure admin access is cleared when a customer logs in.
    if (value) {
        localStorage.setItem('adminLoggedIn', 'false');
    }

    if (value && customerData) {
        localStorage.setItem('customerData', JSON.stringify(customerData));
    } else {
        localStorage.removeItem('customerData');
    }

    if (window.updateLoginLink) window.updateLoginLink();
    if (window.updateAdminLink) window.updateAdminLink();
}

function getCustomerData() {
    const data = localStorage.getItem('customerData');
    return data ? JSON.parse(data) : null;
}

document.addEventListener('DOMContentLoaded', () => {
    // Update cart count
    updateCartCount();

    // Update login / logout links based on current session
    if (window.updateLoginLink) window.updateLoginLink();

    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const registerLink = document.getElementById('register-link');
    const forgotPasswordLink = document.getElementById('forgot-password-link');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const fullName = document.getElementById('fullName').value.trim();
            const username = document.getElementById('username').value.trim();
            const birthdate = document.getElementById('birthdate').value;
            const gender = document.getElementById('gender').value;

            // Clear previous error
            if (loginError) loginError.textContent = '';

            // Validate input (password is optional now, but we'll accept any)
            if (!email || !fullName || !username || !birthdate || !gender) {
                if (loginError) loginError.textContent = 'Please fill in all required fields.';
                return;
            }

            // Accept any email and password, proceed with login
            const customerData = {
                email: email,
                name: fullName,
                fullName: fullName,
                username: username,
                birthdate: birthdate,
                gender: gender
            };
            setCustomerLoggedIn(true, customerData);
            window.location.href = 'index.html';
        });
    }

    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Registration is not required! Simply enter any email and password along with your details to log in.');
        });
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Password reset is not needed! You can use any password to log in.');
        });
    }

    // Redirect if already logged in
    if (getCustomerLoggedIn()) {
        // Could redirect to profile page if it existed
        // For now, just stay on login page or redirect to home
    }
});