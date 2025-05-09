// Form visibility functions
function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('forgotForm').classList.add('hidden');
    document.getElementById('signupForm').classList.add('hidden');
}

function showForgotPassword() {
    document.getElementById('loginForm').classList.add('hidden');
   
    document.getElementById('signupForm').classList.add('hidden');
}

function showSignup() {
    document.getElementById('loginForm').classList.add('hidden');
    
    document.getElementById('signupForm').classList.remove('hidden');
}

// Form handling functions
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Add your login validation logic here
    if (validateEmail(email) && password.length >= 6) {
        console.log('Login successful:', { email, password });
        // Add your login API call here
    } else {
        showError('loginForm', 'Invalid email or password');
    }
}

function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value;

    if (validateEmail(email)) {
        console.log('Reset password email sent to:', email);
        // Add your password reset API call here
        alert('Password reset instructions have been sent to your email.');
        showLogin();
    } else {
        showError('forgotForm', 'Please enter a valid email address');
    }
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!validateEmail(email)) {
        showError('signupForm', 'Please enter a valid email address');
        return false;
    }

    if (password.length < 6) {
        showError('signupForm', 'Password must be at least 6 characters long');
        return false;
    }

    if (password !== confirmPassword) {
        showError('signupForm', 'Passwords do not match');
        return false;
    }

    console.log('Signup successful:', { name, email, password });
    // Add your signup API call here
    alert('Account created successfully!');
    showLogin();
}

// Utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(formId, message) {
    const form = document.getElementById(formId);
    let errorDiv = form.querySelector('.error');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        form.querySelector('form').appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    form.classList.add('shake');
    setTimeout(() => form.classList.remove('shake'), 500);
}

let timer;

function sendResetCode() {
    const email = document.getElementById('resetEmail').value;
    if (validateEmail(email)) {
        document.getElementById('emailStep').classList.add('hidden');
        document.getElementById('verifyStep').classList.remove('hidden');
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
        startTimer();
    } else {
        showError('forgotForm', 'Please enter a valid email address');
    }
}

function startTimer() {
    let timeLeft = 300; // 5 minutes
    const timerDisplay = document.getElementById('timer');
    const resendButton = document.getElementById('resendButton');
    
    clearInterval(timer);
    resendButton.classList.add('disabled');
    
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            resendButton.classList.remove('disabled');
        }
    }, 1000);
}

function resendCode() {
    startTimer();
    // Add your resend code logic here
}

function verifyCode() {
    const code = document.getElementById('resetCode').value;
    if (code.length === 6) {
        document.getElementById('verifyStep').classList.add('hidden');
        document.getElementById('resetStep').classList.remove('hidden');
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');
        clearInterval(timer);
    } else {
        showError('forgotForm', 'Please enter a valid 6-digit code');
    }
}