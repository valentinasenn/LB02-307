// read form element
// Event listeners
//
// Selektoren für name, lastname, mobile, password2

const form = document.getElementById('form');
const gender = document.getElementById('gender');
const name = document.getElementById('name');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('passwordRepeat')
const number = document.getElementById('number');
const message = document.getElementById('message');
const file = document.getElementById('file');
const button = document.getElementById('button')

function alertdialog() {
    alert('Hallo')
}

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkSurname(input) {
    const regex = /^[a-z ,.'-]+$/i;
    if (regex.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Surname should not contain numbers')
    }
}

function checkLastname(input) {
    const regex = /^[a-z ,.'-]+$/i;
    if (regex.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Lastname should not contain numbers')
    }
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function checkTel(input) {
    var regex = /^\d{10}$/;
    if (regex.text(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Telephone Number is not valid');
    }
}


function matchPassword(input, repeatInput) {
    if (input === repeatInput) {
        showSuccess(input)
    } else {
        showError(input, 'Passwords don\'t match');
    }
}

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateForm() {
    if (!checkRequired([name, lastname, email, password, repeatPassword, message])) {
        checkLength(name, 3, 15);
        checkLength(lastname, 2, 50)
        checkLength(password, 6, 10);
        checkEmail(email);
        checkTel(number);
        matchPassword(password, repeatPassword);
        checkLastname(lastname)
        checkSurname(name);
  // }
}

// Event listeners
form.addEventListener('submit', function (e) {
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
});
