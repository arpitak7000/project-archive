function getCustomerLoggedIn() {
    return localStorage.getItem('customerLoggedIn') === 'true';
}

function setCustomerLoggedIn(value, customerData = null) {
    localStorage.setItem('customerLoggedIn', value ? 'true' : 'false');
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

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (window.updateLoginLink) window.updateLoginLink();

    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const registerLink = document.getElementById('register-link');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (loginError) loginError.textContent = '';

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const fullName = document.getElementById('fullName').value.trim();
            const username = document.getElementById('username').value.trim();
            const birthdate = document.getElementById('birthdate').value;
            const gender = document.getElementById('gender').value;

            if (!email || !fullName || !username || !birthdate || !gender) {
                if (loginError) loginError.textContent = 'Please fill in all required fields.';
                return;
            }

            if (!email.includes('@')) {
                if (loginError) loginError.textContent = 'Please enter a valid email address.';
                return;
            }

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, full_name: fullName, username, birthdate, gender })
                });
                const data = await response.json();

                if (data.success) {
                    const customerData = {
                        email,
                        name: fullName,
                        fullName,
                        username,
                        birthdate,
                        gender
                    };
                    setCustomerLoggedIn(true, customerData);
                    window.location.href = '/';
                } else {
                    if (loginError) loginError.textContent = data.error || 'Login failed. Please try again.';
                }
            } catch (err) {
                // Fallback: allow login anyway (client-only mode)
                const customerData = { email, name: fullName, fullName, username, birthdate, gender };
                setCustomerLoggedIn(true, customerData);
                window.location.href = '/';
            }
        });
    }

    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Registration is not required! Simply enter your details to log in and save your profile.');
        });
    }

});
