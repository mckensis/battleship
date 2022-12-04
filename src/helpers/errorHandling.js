//Removes the error if it exists
function removeError() {
    if (document.contains(document.querySelector('.shipPlacementDisplay'))) {
        document.querySelector('.shipPlacementDisplay').remove();
    }
    return;
}

//Handles an error if a ship wasn't able to be placed where the user selected
function displayError(result) {
    removeError();
    const section = document.querySelector('.formContainer')
    const display = document.createElement('p');
    display.classList.add('shipPlacementDisplay')
    display.textContent = `Please check your ${result} coordinates. No coordinates have been set yet!`;
    section.appendChild(display);
}

export default displayError;