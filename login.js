/* ================= FORM ELEMENTS ================= */

const authForm = document.querySelector('.auth-form');

const emailInput =
document.getElementById('emailAddress');

const roleSelect =
document.getElementById('role');

const passwordInput =
document.getElementById('password');

/* ================= FORM SUBMIT ================= */

authForm.addEventListener('submit', function(e){

    e.preventDefault();

    clearErrors();

    let valid = true;

    /* EMAIL */

    const email =
    emailInput.value.trim();

    const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;

    if(email === ''){

        showError(
            emailInput,
            'Please enter your email'
        );

        valid = false;

    } else if(!emailPattern.test(email)){

        showError(
            emailInput,
            'Email must end with .com or .in'
        );

        valid = false;

    }

    /* PASSWORD */

    if(passwordInput.value.trim() === ''){

        showError(
            passwordInput,
            'Please enter your password'
        );

        valid = false;

    }

    /* ROLE */

    const selectedRole =
    roleSelect.value;

    if(selectedRole === ''){

        showError(
            roleSelect,
            'Please select a role'
        );

        valid = false;

    }

    /* STOP IF INVALID */

    if(!valid){

        return;

    }

    /* REDIRECT */

    if(selectedRole === 'User'){

        window.location.href =
        'User.html';

    }

    else if(selectedRole === 'Admin'){

        window.location.href =
        'admin.html';

    }

});

/* ================= SHOW ERROR ================= */

function showError(input, message){

    const oldError =
    input.parentElement
    .querySelector('.error-message');

    if(oldError){

        oldError.remove();

    }

    const error =
    document.createElement('small');

    error.className =
    'error-message';

    error.innerText =
    message;

    error.style.color =
    'red';

    error.style.display =
    'block';

    error.style.marginTop =
    '6px';

    input.parentElement
    .appendChild(error);

}

/* ================= CLEAR ERRORS ================= */

function clearErrors(){

    document
    .querySelectorAll('.error-message')
    .forEach(error => {

        error.remove();

    });

}

/* ================= PASSWORD TOGGLE ================= */

function setupPasswordToggle(toggleId, inputId){

    const toggleBtn =
    document.getElementById(toggleId);

    const passwordField =
    document.getElementById(inputId);

    const eyeIcon =
    toggleBtn.querySelector('i');

    toggleBtn.addEventListener('click', () => {

        if(passwordField.type === 'password'){

            passwordField.type =
            'text';

            eyeIcon.classList.remove(
                'fa-eye'
            );

            eyeIcon.classList.add(
                'fa-eye-slash'
            );

        }

        else{

            passwordField.type =
            'password';

            eyeIcon.classList.remove(
                'fa-eye-slash'
            );

            eyeIcon.classList.add(
                'fa-eye'
            );

        }

    });

}

setupPasswordToggle(
    'togglePassword',
    'password'
);