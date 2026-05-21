/* ================= PASSWORD TOGGLE FUNCTION ================= */

function setupPasswordToggle(buttonId, inputId){

    const toggleBtn =
    document.getElementById(buttonId);

    const passwordInput =
    document.getElementById(inputId);

    if(toggleBtn && passwordInput){

        toggleBtn.addEventListener('click', () => {

            if(passwordInput.type === 'password'){

                passwordInput.type = 'text';

                toggleBtn.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                passwordInput.type = 'password';

                toggleBtn.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

            }

        });

    }

}

/* ================= ENABLE PASSWORD TOGGLES ================= */

setupPasswordToggle(
    'toggleSignupPassword',
    'signupPassword'
);

setupPasswordToggle(
    'toggleConfirmPassword',
    'confirmPassword'
);

/* ================= INPUTS ================= */

const fullNameInput =
document.getElementById('fullName');

const phoneInput =
document.getElementById('phoneNumber');

const emailInput =
document.getElementById('emailAddress');

const passwordInput =
document.getElementById('signupPassword');

const confirmPasswordInput =
document.getElementById('confirmPassword');

const form =
document.querySelector('.auth-form');

/* ================= PHONE VALIDATION ================= */

/* BLOCK LETTERS */

phoneInput.addEventListener('keydown', (e) => {

    const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'Tab'
    ];

    if(allowedKeys.includes(e.key)){

        return;

    }

    /* ONLY NUMBERS */

    if(!/^\d$/.test(e.key)){

        e.preventDefault();

    }

});

/* CLEAN INPUT */

phoneInput.addEventListener('input', () => {

    removeSingleError(phoneInput);

    /* REMOVE NON-NUMBERS */

    phoneInput.value =
    phoneInput.value.replace(/[^0-9]/g, '');

    /* LIMIT TO 10 DIGITS */

    if(phoneInput.value.length > 10){

        phoneInput.value =
        phoneInput.value.slice(0, 10);

    }

    /* LIVE VALIDATION */

    if(
        phoneInput.value.length > 0 &&
        phoneInput.value.length < 10
    ){

        showError(
            phoneInput,
            'Phone number must contain exactly 10 digits.'
        );

    }

});

/* ================= EMAIL VALIDATION ================= */

emailInput.addEventListener('input', () => {

    removeSingleError(emailInput);

    const email =
    emailInput.value.trim();

    const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;

    if(
        email.length > 0 &&
        !emailPattern.test(email)
    ){

        showError(
            emailInput,
            'Email must end with .com or .in'
        );

    }

});

/* ================= PASSWORD VALIDATION ================= */

passwordInput.addEventListener('input', () => {

    removeSingleError(passwordInput);

    const password =
    passwordInput.value;

    const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if(
        password.length > 0 &&
        !passwordPattern.test(password)
    ){

        showError(
            passwordInput,
            'Password must contain 6+ characters, letters and numbers.'
        );

    }

});

/* ================= CONFIRM PASSWORD ================= */

confirmPasswordInput.addEventListener('input', () => {

    removeSingleError(confirmPasswordInput);

    if(
        confirmPasswordInput.value.length > 0 &&
        passwordInput.value !==
        confirmPasswordInput.value
    ){

        showError(
            confirmPasswordInput,
            'Passwords do not match.'
        );

    }

});

/* ================= FORM SUBMIT ================= */

form.addEventListener('submit', function(e){

    e.preventDefault();

    removeErrors();

    let isValid = true;

    /* ================= FULL NAME VALIDATION ================= */

    const fullName =
    fullNameInput.value.trim();

    const namePattern =
    /^[A-Za-z\s]+$/;

    if(!namePattern.test(fullName)){

        showError(
            fullNameInput,
            'Name should contain only letters and spaces.'
        );

        isValid = false;

    }

    /* ================= PHONE VALIDATION ================= */

    if(
        !/^\d{10}$/.test(phoneInput.value)
    ){

        showError(
            phoneInput,
            'Phone number must contain exactly 10 digits.'
        );

        isValid = false;

    }

    /* ================= EMAIL VALIDATION ================= */

    const email =
    emailInput.value.trim();

    const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;

    if(!emailPattern.test(email)){

        showError(
            emailInput,
            'Enter a valid email address.'
        );

        isValid = false;

    }

    /* ================= PASSWORD VALIDATION ================= */

    const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if(!passwordPattern.test(passwordInput.value)){

        showError(
            passwordInput,
            'Password must contain 6+ characters, letters and numbers.'
        );

        isValid = false;

    }

    /* ================= PASSWORD MATCH ================= */

    if(
        passwordInput.value !==
        confirmPasswordInput.value
    ){

        showError(
            confirmPasswordInput,
            'Passwords do not match.'
        );

        isValid = false;

    }

    /* ================= SUCCESS ================= */

    if(isValid){


        /* REDIRECT TO LOGIN PAGE */

        window.location.href =
        'login.html';

    }

});

/* ================= SHOW ERROR ================= */

function showError(input, message){

    removeSingleError(input);

    const error =
    document.createElement('small');

    error.className =
    'error-message';

    error.innerText =
    message;

    if(
        input.parentElement.classList.contains('password-field')
    ){

        input.parentElement.parentElement
        .appendChild(error);

    } else {

        input.parentElement
        .appendChild(error);

    }

}

/* ================= REMOVE SINGLE ERROR ================= */

function removeSingleError(input){

    let error;

    if(
        input.parentElement.classList.contains('password-field')
    ){

        error =
        input.parentElement.parentElement
        .querySelector('.error-message');

    } else {

        error =
        input.parentElement
        .querySelector('.error-message');

    }

    if(error){

        error.remove();

    }

}

/* ================= REMOVE ALL ERRORS ================= */

function removeErrors(){

    document
    .querySelectorAll('.error-message')
    .forEach(error => {

        error.remove();

    });

}