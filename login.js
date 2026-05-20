
const authForm = document.querySelector('.auth-form');
const emailInput = authForm?.querySelector('#emailAddress');
const roleSelect = authForm?.querySelector('#role');
const loginPassword = authForm?.querySelector('#password');
const signupPassword = authForm?.querySelector('#signupPassword');
const confirmPassword = authForm?.querySelector('#confirmPassword');
const fullNameInput = authForm?.querySelector('#fullName');
const phoneInput =
document.getElementById('phoneNumber');

phoneInput.addEventListener('input', () => {

    /* REMOVE NON-NUMBERS */

    phoneInput.value =
    phoneInput.value.replace(/[^0-9]/g, '');

    /* LIMIT TO 10 DIGITS */

    if(phoneInput.value.length > 10){

        phoneInput.value =
        phoneInput.value.slice(0,10);

    }

});
if (authForm) {
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearFormErrors();

        if (loginPassword && !fullNameInput) {
            handleLogin();
        } else if (signupPassword && fullNameInput && confirmPassword) {
            handleSignup();
        }
    });
}
function clearFormErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
}

function validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/.test(email);
}

function handleLogin() {
    const email = emailInput?.value.trim() ?? '';
    const passwordValue = loginPassword?.value.trim() ?? '';
    let valid = true;

    if (!email) {
        showError(emailInput, 'Please enter your email');
        valid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, 'Email must end with .com or .in');
        valid = false;
    }

    if (!passwordValue) {
        showError(loginPassword, 'Please enter your password');
        valid = false;
    }

    if (!valid) return;

    const selectedRole = roleSelect?.value || '';
    if (['User', 'Customer'].includes(selectedRole)) {
        window.location.href = 'products.html';
    } else if (['Admin', 'Hotel'].includes(selectedRole)) {
        window.location.href = 'about.html';
    } else {
        window.location.href = 'login.html';
    }
}

function handleSignup() {
    const name = fullNameInput?.value.trim() ?? '';
    const email = emailInput?.value.trim() ?? '';
    const passwordValue = signupPassword?.value.trim() ?? '';
    const confirmPasswordValue = confirmPassword?.value.trim() ?? '';
    let valid = true;

    if (!name) {
        showError(fullNameInput, 'Please enter your name');
        valid = false;
    }

    if (!email) {
        showError(emailInput, 'Please enter your email');
        valid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, 'Email must end with .com or .in');
        valid = false;
    }

    if (!passwordValue) {
        showError(signupPassword, 'Please enter a password');
        valid = false;
    }

    if (!confirmPasswordValue) {
        showError(confirmPassword, 'Please confirm your password');
        valid = false;
    }

    if (passwordValue && confirmPasswordValue && passwordValue !== confirmPasswordValue) {
        showError(confirmPassword, 'Passwords do not match');
        valid = false;
    }

    if (!valid) return;

    window.location.href = './login.html';
}

/* PASSWORD SHOW/HIDE */

function setupPasswordToggle(toggleId, fieldId) {
    const toggleButton = document.getElementById(toggleId);
    const passwordField = document.getElementById(fieldId);
    const eyeIcon = toggleButton?.querySelector('i');

    if (!toggleButton || !passwordField || !eyeIcon) {
        return;
    }

    toggleButton.addEventListener('click', () => {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
        }
    });
}

setupPasswordToggle('togglePassword', 'password');
setupPasswordToggle('toggleSignupPassword', 'signupPassword');
setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');

/* EMAIL VALIDATION */

const emailField = document.getElementById('emailAddress');

emailField?.addEventListener('input', () => {
    const existingError =
        emailField.parentElement?.querySelector('.error-message');

    if (existingError) {
        existingError.remove();
    }

    const email = emailField.value.trim();
    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;

    if (email.length > 0 && !emailPattern.test(email)) {
        showError(
            emailField,
            'Email must end with .com or .in'
        );
    }
});


/* SHOW ERROR FUNCTION */

function showError(input, message){
    if (!input || !input.parentElement) {
        return;
    }

    const error = document.createElement('small');
    error.className = 'error-message';
    error.style.color = 'red';
    error.style.marginTop = '5px';
    error.innerText = message;
    input.parentElement.appendChild(error);
}