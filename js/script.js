// Selectors
const form = document.querySelector('form');
const nameInput = form.querySelector('#name');
const emailInput = form.querySelector('#mail');
const jobRoleDropdown = form.querySelector('#title');
const basicBlock = form.querySelector('.basic-info');
const shirtBlock = document.querySelector('.shirt-box');
const sizeDropdown = shirtBlock.querySelector('#size');
const designDropdown = shirtBlock.querySelector('#design');
const colorDiv = shirtBlock.querySelector('#colors-js-puns');
const colorDropdown = shirtBlock.querySelector('#color');
const colorDropdownList = colorDropdown.children;
colorDiv.style.display = 'none';
const activities = document.querySelector('.activities');
const labels = activities.querySelectorAll('label');
const paymentMethodDropdown = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const submitButton = document.getElementsByTagName('button')[0];
const requiredFields = document.querySelectorAll('[type="text"]');
const creditCardInput = document.querySelector('#cc-num');
const zipInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');
const payment_method = document.querySelector('.payment-methods');
let p = document.createElement('p');
p.className = 'payment_error';
p.textContent = 'Please select payment method';

/**
 * 
 * VALIDATORS
 *  
 */

// Can only contain letters a-z in lowercase
function isValidName(user) {
    return /^[a-z]+$/.test(user);
};

// Must be a valid email address
function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
};

// Must be a valid CC number
function isValidCCNumber(cc) {
    return /^\d{4} ?\d{4} ?\d{4} ?\d{1,4}$/.test(cc);
};

// Must be a valid zip code
function isValidZipCode(zip) {
    return /^\d{5}$/.test(zip);
};

// Must be a valid cvv number
function isValidCVV(cvv) {
    return /^\d{3}$/.test(cvv);
};

function validateInput() {
    if(isValidName(nameInput.value) === true && 
       isValidEmail(emailInput.value) === true &&
       isValidCCNumber(creditCardInput.value) === true &&
       isValidZipCode(zipInput.value) === true &&
       isValidCVV(cvvInput.value) === true) {
        return true;
       } 
       else {
           return false;
       }
};

const userInfo = document.querySelectorAll('.user-info');
for(let i = 0; i < userInfo.length; i+=1) {
    userInfo[i].style.display = 'none';
}


function showOrHideTip(show, element) {
    // show element when show is true, hide when false
    if (show) {
      element.style.display = "inherit";
    } else {
      element.style.display = "none";
    }
  }
  
  function createListener(validator) {
    return e => {
      const text = e.target.value;
      const valid = validator(text);
      const showTip = text !== "" && !valid;
      const tooltip = e.target.nextElementSibling;
      showOrHideTip(showTip, tooltip);
    };
  };

  nameInput.addEventListener("input", createListener(isValidName));
  emailInput.addEventListener("input", createListener(isValidEmail))
  creditCardInput.addEventListener("input", createListener(isValidCCNumber))
  zipInput.addEventListener("input", createListener(isValidZipCode))
  cvvInput.addEventListener("input", createListener(isValidCVV))

/**
 * 
 * FORMATTING FUNCTIONS
 * 
 */

function formatCCNumber(text) {
    let regex = /^(\d{4}) ?(\d{4}) ?(\d{4}) ?(\d{1,4})$/
    let replacement = '$1 $2 $3 $4';
    console.log(text.replace(regex, replacement));
    return text.replace(regex, replacement);
};

// Event listener to higlight required empty fields
submitButton.addEventListener('click', (e) => {

    let inputs = [nameInput, emailInput, creditCardInput, zipInput, cvvInput];

    e.preventDefault();

    var counter = 0;

    for (let i = 0; i < inputs.length; i += 1) {
        if (required(inputs[i]) === false) {
            inputs[i].style.border = "3px solid #ff0000";
            const errorMessage = document.createElement('span');
            errorMessage.textContent = 'Field is required';
            basicBlock.appendChild(errorMessage, inputs[i]);
            counter++;
        } else {
            inputs[i].style.border = "";
        }
    };

    if (counter === 0 && validateInput() === true) {
        window.location.reload();
    } else {
        console.log('Input is invalid')
    }

});

// Function to check if all required fields are filled




// Function to return true in input field is not empty, and false if input field empty
function required(input) {
    if (input.value.length === 0) {
        return false;
    }
    return true;
};

// The "Credit Card" payment option is selected by default.
paymentMethodDropdown.selectedIndex = '1';
bitcoin.style.display = 'none';
paypal.style.display = 'none';


// Fuction fo show/hide payment methods based on user selection
function showPaymentMethod(paymentMethod) {
    

    if (paymentMethod === 'credit card') {
        creditCard.style.display = '';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
        p.style.display = 'none';

    }
    if (paymentMethod === 'paypal') {
        creditCard.style.display = 'none';
        paypal.style.display = '';
        bitcoin.style.display = 'none';
        p.style.display = 'none';

    }
    if (paymentMethod === 'bitcoin') {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = '';
        p.style.display = 'none';
    }
    if (paymentMethod === 'select method') {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
        payment_method.appendChild(p, paymentMethodDropdown);
        p.style.display = '';

    }
};

// Event listener to show/hide payment options based on user selection 
paymentMethodDropdown.addEventListener('change', (e) => {
    if (e.target.value === 'paypal') {
        showPaymentMethod('paypal')
    } else if (e.target.value === 'bitcoin') {
        showPaymentMethod('bitcoin')

    } else if (e.target.value === 'credit card') {
        showPaymentMethod('credit card')

    } else if (e.target.value === 'select method') {
        showPaymentMethod('select method')
    }
});


// Change class name based of checkbox elements based on status (checked or unchecked)
activities.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const label = checkbox.parentNode;

    if (checked) {
        label.className = 'checked';
    } else {
        label.className = '';
    }
});



// Autofocus on the first field
function formfocus() {
    nameInput.focus();
}
window.onload = formfocus;

// Even to create an additional text box if 'Other' option is selected from Job Role dropdown
jobRoleDropdown.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        let input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Your Job Role';
        basicBlock.appendChild(input);

        jobRoleDropdown.addEventListener('change', (ele) => {
            if (e.target.value !== 'other') {
                input.style.display = 'none';
            }
        });
    }
});

// Function to show or hide color dropdown
function displayColor(flag) {
    if (flag === 'on') {
        colorDiv.style.display = '';
    } else if (flag === 'off') {
        colorDiv.style.display = 'none';
    }
};

// Function to hide or show color options based on design selected
function hideOptions(theme) {
    if (theme === 'js puns') {
        colorDropdownList[3].style.display = 'none';
        colorDropdownList[4].style.display = 'none';
        colorDropdownList[5].style.display = 'none';

        colorDropdownList[0].style.display = '';
        colorDropdownList[1].style.display = '';
        colorDropdownList[2].style.display = '';
    }
    if (theme === 'heart js') {
        colorDropdownList[0].style.display = 'none';
        colorDropdownList[1].style.display = 'none';
        colorDropdownList[2].style.display = 'none';

        colorDropdownList[3].style.display = '';
        colorDropdownList[4].style.display = '';
        colorDropdownList[5].style.display = '';

    }
};

// Event to display color options based on design option
designDropdown.addEventListener('change', (e) => {
    if (e.target.value === 'js puns') {
        displayColor('on');
        hideOptions('js puns');
        colorDropdown.selectedIndex = '0';
        designDropdown.addEventListener('change', (e) => {
            if (e.target.value === 'select theme') {
                displayColor('off');
            }
        })
    }
    if (e.target.value === 'heart js') {
        displayColor('on');
        hideOptions('heart js');
        colorDropdown.selectedIndex = '3';
        designDropdown.addEventListener('change', (e) => {
            if (e.target.value === 'select theme') {
                displayColor('off');
            }
        })
    }
});