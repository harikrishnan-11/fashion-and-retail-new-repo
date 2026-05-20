
/* PASSWORD TOGGLE FUNCTION */

function setupPasswordToggle(buttonId, inputId){

    const toggleBtn =
    document.getElementById(buttonId);

    const passwordInput =
    document.getElementById(inputId);

    toggleBtn.addEventListener('click', () => {

        if(passwordInput.type === 'password'){

            passwordInput.type = 'text';

            toggleBtn.innerHTML =
            '<i class="fas fa-eye-slash"></i>';

        } else {

            passwordInput.type = 'password';

            toggleBtn.innerHTML =
            '<i class="fas fa-eye"></i>';

        }

    });

}
/* MOBILE NUMBER VALIDATION */

/* PHONE NUMBER LIVE VALIDATION */

const phoneInput =
document.getElementById('phoneNumber');

phoneInput.addEventListener('input', () => {

    /* REMOVE OLD ERROR */

    const existingError =
    phoneInput.parentElement
    .querySelector('.error-message');

    if(existingError){

        existingError.remove();
    }

    /* REMOVE NON-NUMBERS */

    phoneInput.value =
    phoneInput.value.replace(/\D/g, '');

    /* SHOW ERROR IF MORE THAN 10 DIGITS */

    if(phoneInput.value.length > 10){

        showError(
            phoneInput,
            'Mobile number should not exceed 10 digits.'
        );

        phoneInput.value =
        phoneInput.value.slice(0,10);
    }

});
/* ENABLE PASSWORD TOGGLES */

setupPasswordToggle(
    'toggleSignupPassword',
    'signupPassword'
);

setupPasswordToggle(
    'toggleConfirmPassword',
    'confirmPassword'
);


/* CREATE ERROR ELEMENTS */

const fullNameInput =
document.getElementById('fullName');

const passwordInput =
document.getElementById('signupPassword');

const confirmPasswordInput =
document.getElementById('confirmPassword');

const form =
document.querySelector('.auth-form');


/* VALIDATION */

form.addEventListener('submit', function(e){

    e.preventDefault();

    removeErrors();

    let isValid = true;

    /* NAME VALIDATION */

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

    /* PASSWORD MATCH */

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

    /* SUCCESS */

    if(isValid){

        window.location.href =
        'index.html';

    }

});

/* LIVE EMAIL VALIDATION */

const emailInput =
document.getElementById('emailAddress');

emailInput.addEventListener('input', () => {

    /* REMOVE OLD ERROR */

    const existingError =
    emailInput.parentElement
    .querySelector('.error-message');

    if(existingError){

        existingError.remove();
    }

    const email =
    emailInput.value.trim();

    const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;

    /* SHOW ERROR ONLY WHEN USER TYPES */

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
/* SHOW ERROR */
function showError(input, message){

    const error =
    document.createElement('small');

    error.className =
    'error-message';

    error.innerText =
    message;

    /* PASSWORD FIELD FIX */

    if(input.parentElement.classList.contains('password-field')){

        input.parentElement.parentElement
        .appendChild(error);

    } else {

        input.parentElement
        .appendChild(error);

    }

}
/* REMOVE ERRORS */

function removeErrors(){

    document
    .querySelectorAll('.error-message')
    .forEach(error => {

        error.remove();

    });

}
