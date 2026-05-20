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
            '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            passwordInput.type = 'password';

            toggleBtn.innerHTML =
            '<i class="fas fa-eye"></i>';

        }

    });

}

/* ENABLE PASSWORD TOGGLES */

setupPasswordToggle(
    'toggleSignupPassword',
    'signupPassword'
);

setupPasswordToggle(
    'toggleConfirmPassword',
    'confirmPassword'
);

/* INPUTS */

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

/* PHONE VALIDATION */

phoneInput.addEventListener('input', () => {

    removeSingleError(phoneInput);

    phoneInput.value =
    phoneInput.value.replace(/\D/g, '');

    if(phoneInput.value.length > 10){

        phoneInput.value =
        phoneInput.value.slice(0,10);

    }

});

/* EMAIL VALIDATION */

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

/* FORM SUBMIT */

form.addEventListener('submit', function(e){

    e.preventDefault();

    removeErrors();

    let isValid = true;

    /* FULL NAME VALIDATION */

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

    /* PHONE VALIDATION */

    if(phoneInput.value.length !== 10){

        showError(
            phoneInput,
            'Phone number must contain 10 digits.'
        );

        isValid = false;

    }

    /* EMAIL VALIDATION */

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

    /* PASSWORD LENGTH */

    if(passwordInput.value.length < 6){

        showError(
            passwordInput,
            'Password must be at least 6 characters.'
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

    /* SUCCESS MESSAGE */

    if(isValid){

        const oldSuccess =
        document.querySelector('.success-message');

        if(oldSuccess){

            oldSuccess.remove();

        }

        const successMessage =
        document.createElement('div');

        successMessage.className =
        'success-message';

        successMessage.innerText =
        'Account created successfully! Redirecting...';

        form.appendChild(successMessage);

        setTimeout(() => {

            window.location.href =
            'login.html';

        }, 2000);

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

/* REMOVE SINGLE ERROR */

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

/* REMOVE ALL ERRORS */

function removeErrors(){

    document
    .querySelectorAll('.error-message')
    .forEach(error => {

        error.remove();

    });

}