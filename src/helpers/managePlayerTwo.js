//Toggles the second player as CPU or human
function togglePlayerTwo() {
    const playerTwo = document.querySelector('.playerTwoName');
    if (this.checked) {
        playerTwo.disabled = true;
        playerTwo.value = '';
        playerTwo.placeholder = 'CPU';
    } else {
        playerTwo.disabled = false;
        playerTwo.placeholder = 'Player Two';
    }
}

function managePlayerTwo() {
    const tickbox = document.querySelector('input[type=checkbox');
    tickbox.addEventListener('change', togglePlayerTwo.bind(tickbox));
}

export default managePlayerTwo;