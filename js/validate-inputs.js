
// Selektoren für name, lastname, mobile, password

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
    formControl.className = 'form-group success';
}

// Validierung Vornamen
function checkSurname(input) {
    const regex = /^[a-z ,.'-]+$/i;
    if (regex.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Surname should not contain numbers')
    }
}
// Validierung Nachname
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
// Validierung Telefonnummer
function checkTelefon(input) {
    const regex = /^\d{10}$/;
    if (regex.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Telephone Number is not valid');
    }
}

// Validierung Übereinstimmung Passwörter
function matchPassword(input, repeatInput) {
    if (input === repeatInput) {
        showSuccess(input)
    } else {
        showError(input, 'Passwords don\'t match');
    }
}

// Validierung Datei Upload
function checkDataUpload(input) {
    const reg = /^(([a-zA-Z]:)|(\\{2}\w+)\$?)(\\(\w[\w].*))+(.jpeg|.JPEG|.gif|.GIF| .png|.PNG)$/;
    if (reg.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Data Type is not supported');
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

        checkLength(name, 3, 15);
        checkLength(lastname, 2, 50)
        checkLength(password, 6, 10);
        checkEmail(email);
        checkTelefon(number);
        matchPassword(password, repeatPassword);
        checkLastname(lastname)
        checkSurname(name);
}

function onsubmit() {
    if (!checkRequired([name, lastname, email, password, repeatPassword, message])){
        alert("verschickt");
    } else {
        alert("nicht geklappt");
    }
}

// Event listeners
form.addEventListener('submit', function (e) {
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
});
