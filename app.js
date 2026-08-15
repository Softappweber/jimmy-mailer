// =====================================================
// Jimmy Mailer v1
// Supabase Authentication
// =====================================================

const SUPABASE_URL = 'https://noqomcunnjpseckfwexq.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_JEy64MEHECql-Om23gaqdA_TEcl3T5O';

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


// =====================================================
// DOM
// =====================================================

const loginScreen = document.getElementById('loginScreen');
const app = document.getElementById('app');

const loginBox = document.getElementById('loginBox');
const signupBox = document.getElementById('signupBox');

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const showSignupButton = document.getElementById('showSignup');
const showLoginButton = document.getElementById('showLogin');

const logoutButton = document.getElementById('logoutButton');

const userEmail = document.getElementById('userEmail');

const loadingOverlay = document.getElementById('loadingOverlay');


// =====================================================
// Loading
// =====================================================

function showLoading(show) {

    loadingOverlay.classList.toggle('hidden', !show);

}


// =====================================================
// Toast
// =====================================================

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
    }, 3500);

}


// =====================================================
// Show Login Screen
// =====================================================

function showLoginScreen() {

    loginScreen.classList.remove('hidden');
    app.classList.add('hidden');

}


// =====================================================
// Show Dashboard
// =====================================================

function showApp(user) {

    loginScreen.classList.add('hidden');
    app.classList.remove('hidden');

    userEmail.textContent =
        user?.email || '';

}


// =====================================================
// Sign Up
// =====================================================

async function signup(name, email, password) {

    showLoading(true);

    try {

        const { data, error } =
            await supabaseClient.auth.signUp({

                email: email,
                password: password,

                options: {
                    data: {
                        name: name
                    }
                }

            });


        if (error) {
            throw error;
        }


        // Email confirmation required
        if (!data.session) {

            showToast(
                'Account created. Please check your email to confirm your account.'
            );

            signupBox.classList.add('hidden');
            loginBox.classList.remove('hidden');

            return;
        }


        // Email confirmation not required
        showApp(data.user);

        showToast(
            'Account created successfully!'
        );


    } catch (error) {

        console.error('Signup error:', error);

        showToast(
            error.message || 'Signup failed.'
        );

    } finally {

        showLoading(false);

    }

}


// =====================================================
// Sign In
// =====================================================

async function login(email, password) {

    showLoading(true);

    try {

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({

                email: email,
                password: password

            });


        if (error) {
            throw error;
        }


        if (!data.session || !data.user) {
            throw new Error(
                'Login succeeded but no session was returned.'
            );
        }


        showApp(data.user);

        showToast(
            'Welcome to Jimmy Mailer!'
        );


    } catch (error) {

        console.error('Login error:', error);

        showToast(
            error.message || 'Login failed.'
        );

    } finally {

        showLoading(false);

    }

}


// =====================================================
// Logout
// =====================================================

async function logout() {

    showLoading(true);

    try {

        const { error } =
            await supabaseClient.auth.signOut();

        if (error) {
            throw error;
        }

        showLoginScreen();

        loginForm.reset();
        signupForm.reset();

        signupBox.classList.add('hidden');
        loginBox.classList.remove('hidden');

        showToast('Logged out.');

    } catch (error) {

        console.error('Logout error:', error);

        showToast(
            error.message || 'Logout failed.'
        );

    } finally {

        showLoading(false);

    }

}


// =====================================================
// Check Existing Session
// =====================================================

async function checkAuth() {

    showLoading(true);

    try {

        const {
            data: { session }
        } = await supabaseClient.auth.getSession();


        if (session?.user) {

            showApp(session.user);

        } else {

            showLoginScreen();

        }

    } catch (error) {

        console.error(
            'Session check error:',
            error
        );

        showLoginScreen();

    } finally {

        showLoading(false);

    }

}


// =====================================================
// Auth State Listener
// =====================================================

supabaseClient.auth.onAuthStateChange(
    (event, session) => {

        console.log(
            'Auth event:',
            event
        );

        if (session?.user) {

            showApp(session.user);

        } else {

            showLoginScreen();

        }

    }
);


// =====================================================
// UI Events
// =====================================================

showSignupButton.addEventListener(
    'click',
    () => {

        loginBox.classList.add('hidden');
        signupBox.classList.remove('hidden');

    }
);


showLoginButton.addEventListener(
    'click',
    () => {

        signupBox.classList.add('hidden');
        loginBox.classList.remove('hidden');

    }
);


// =====================================================
// Login Form
// =====================================================

loginForm.addEventListener(
    'submit',
    async (event) => {

        event.preventDefault();

        const email =
            document.getElementById('loginEmail')
                .value
                .trim();

        const password =
            document.getElementById('loginPassword')
                .value;

        await login(
            email,
            password
        );

    }
);


// =====================================================
// Signup Form
// =====================================================

signupForm.addEventListener(
    'submit',
    async (event) => {

        event.preventDefault();

        const name =
            document.getElementById('signupName')
                .value
                .trim();

        const email =
            document.getElementById('signupEmail')
                .value
                .trim();

        const password =
            document.getElementById('signupPassword')
                .value;

        await signup(
            name,
            email,
            password
        );

    }
);


// =====================================================
// Logout
// =====================================================

logoutButton.addEventListener(
    'click',
    logout
);


// =====================================================
// Start
// =====================================================

checkAuth();
