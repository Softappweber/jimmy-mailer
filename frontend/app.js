// =====================================================
// Jimmy Mailer v1
// Step 1 - Frontend Foundation
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

    const loginScreen = document.getElementById('loginScreen');
    const app = document.getElementById('app');

    const loginBox = document.getElementById('loginBox');
    const signupBox = document.getElementById('signupBox');

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');

    const logoutButton = document.getElementById('logoutButton');

    const userEmail = document.getElementById('userEmail');


    // ============================
    // Show Sign Up
    // ============================

    showSignup.addEventListener('click', () => {

        loginBox.classList.add('hidden');
        signupBox.classList.remove('hidden');

    });


    // ============================
    // Show Sign In
    // ============================

    showLogin.addEventListener('click', () => {

        signupBox.classList.add('hidden');
        loginBox.classList.remove('hidden');

    });


    // ============================
    // Temporary Sign In
    // ============================

    loginForm.addEventListener('submit', (event) => {

        event.preventDefault();

        const email =
            document.getElementById('loginEmail').value.trim();

        if (!email) {
            showToast('Please enter your email.');
            return;
        }

        loginScreen.classList.add('hidden');
        app.classList.remove('hidden');

        userEmail.textContent = email;

        showToast('Signed in successfully.');

    });


    // ============================
    // Temporary Sign Up
    // ============================

    signupForm.addEventListener('submit', (event) => {

        event.preventDefault();

        const name =
            document.getElementById('signupName').value.trim();

        const email =
            document.getElementById('signupEmail').value.trim();

        if (!name || !email) {
            showToast('Please complete all fields.');
            return;
        }

        loginScreen.classList.add('hidden');
        app.classList.remove('hidden');

        userEmail.textContent = email;

        showToast('Account created successfully.');

    });


    // ============================
    // Logout
    // ============================

    logoutButton.addEventListener('click', () => {

        app.classList.add('hidden');
        loginScreen.classList.remove('hidden');

        loginForm.reset();
        signupForm.reset();

        signupBox.classList.add('hidden');
        loginBox.classList.remove('hidden');

        showToast('Logged out.');

    });


    // ============================
    // Toast
    // ============================

    function showToast(message) {

        const container =
            document.getElementById('toastContainer');

        const toast =
            document.createElement('div');

        toast.className = 'toast';
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {

            toast.remove();

        }, 3000);

    }

});
