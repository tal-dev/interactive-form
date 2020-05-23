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
    if(theme === 'heart js'){
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
    if(e.target.value === 'heart js') {
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