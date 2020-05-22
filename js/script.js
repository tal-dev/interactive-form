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


function hideOptions(list, text) {
    for(let i = 0; i < list.length; i+=1) {
        if(list[i].text.includes(text)) {
            list[i].style.display = 'none';
        }
    }
};

designDropdown.addEventListener('change', (e) => {
    if(e.target.value === 'js puns') {
        colorDiv.style.display = '';
        hideOptions(colorDropdownList, 'JS Puns shirt only');



    }
});



// Autofocus on the first field
function formfocus() {
    nameInput.focus();
}
window.onload = formfocus;


// Function to create an additional text box if 'Other' option is selected from Job Role dropdown
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


