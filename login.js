
document.querySelector('.auth-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email =
    document.getElementById('emailAddress').value;

    sessionStorage.setItem('userEmail', email);

    const role =
document.getElementById('role').value;

sessionStorage.setItem(
    'userRole',
    role
);

    if (role === 'User') {

        window.location.href =
        'User.html';

    } else if (role === 'Admin') {

        window.location.href =
        'Admin.html';

    } else {

        alert('Please select a role.');
    }
});


/* PASSWORD SHOW/HIDE */

const togglePassword =
document.getElementById('togglePassword');

const password =
document.getElementById('password');

togglePassword.addEventListener('click', () => {

    if(password.type === 'password'){

        password.type = 'text';

        togglePassword.innerHTML =
        '<i class="fas fa-eye-slash"></i>';

    } else {

        password.type = 'password';

        togglePassword.innerHTML =
        '<i class="fas fa-eye"></i>';
    }

});


/* EMAIL VALIDATION */

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


/* SHOW ERROR FUNCTION */

function showError(input, message){

    const error =
    document.createElement('small');

    error.className = 'error-message';

    error.style.color = 'red';

    error.style.marginTop = '5px';

    error.innerText = message;

    input.parentElement.appendChild(error);
}