import Player from '../factories/Player';
import setEnemy from './setEnemy';
import { startGame } from '../index';

//Handles basic validity checking of form inputs
function handleSubmit(e, form) {
    e.preventDefault();
    let status = form.checkValidity();
    form.reportValidity();
    if (status) {
        return true;
    }
    return false;
}

//Handles an error if a ship wasn't able to be placed where the user selected
function displayError(result) {
    //If the error already exists then remove it so that we don't have more than one identical element
    if (document.contains(document.querySelector('.shipPlacementDisplay'))) {
        document.querySelector('.shipPlacementDisplay').remove();
    }

    const section = document.querySelector('.formContainer');
    
    const span = document.createElement('span');
    span.classList.add('shipPlacementSpan');
    span.textContent = result;

    const display = document.createElement('p');
    display.classList.add('shipPlacementDisplay')
    display.innerHTML = `Please check your <span class="shipPlacementSpan">${result}</span> coordinates. No coordinates have been set yet!`;
    section.appendChild(display);
}

//Show the gameplay section and remove the form after the form has been submitted
function updateDisplay() {
    document.querySelector('.formContainer').remove();
    document.querySelector('.gameplay').style.display = 'grid';
    return;
}

//Handles placing all ships into the player's board
//Using data from the starting form
function shipPlacement(player, ships) {

    //Place each ship from the passed in ships array into the player's board
    //Minus one from the row and column because arrays are zero-indexed but our starting form and our grid on the DOM is not
    while (ships.length > 0) {
        let type = ships.shift();
        let row = ships.shift() -1;
        let column = ships.shift() -1;
        let direction = ships.shift();
        player.board.placeShip({ type, row, column, direction });
    }

    //If the ship wasn't placed then return that ship type
    for (const ship of player.board.ships) {
        if (!ship.placed) return ship.type;
    }
    
    //If all ships were successfully placed
    return 'All Ships Placed!';
}

//Ensures we can't place our ships outside of the grid
//Set the maximum value of row/column inputs if the value was higher when ship direction was changed
function updateMaxValues() {
    let select = this;
    let row = select.parentElement.parentElement.children[1].childNodes[1];            
    let column = select.parentElement.parentElement.children[2].childNodes[1];
    let length = Number(select.parentElement.parentElement.dataset.length);
    
    if (select.value === 'vertical') {
        row.max = (10 - length) + 1;
        column.max = 10;
    } 
    if (select.value === 'horizontal') {
        row.max = 10;
        column.max = (10 - length) + 1;
    }
    if (Number(row.value) > Number(row.max)) {
        row.value = row.max;
    }
    if (Number(column.value) > Number(column.max)) {
        column.value = column.max;
    }
}

function toggleShipSettings() {

    const options = document.querySelector('.fieldsets');

    if (this.checked) {
        options.style.display = 'none';
    } else {
        options.style.display = 'grid';
    }

}

//The form on the first page of the game
function playerForm() {
    const form = document.querySelector('form');
    const input = document.querySelector('input[name="playerName"]');
    input.focus();
    
    const checkbox = document.querySelector('input[type=checkbox');
    checkbox.addEventListener('change', toggleShipSettings);

    const selects = Array.from(document.querySelectorAll('select'));
    selects.forEach(select => {
        select.addEventListener('change', updateMaxValues);
    });

    form.addEventListener('submit', (e) => {
        //Form input validation
        if (!handleSubmit(e, form)) {
            return;
        }

        let inputs = [];
        let playerName;
        let random = false;
        let result = String;

        //Set the player's name to the input value from the form
        for (const input of form) {
            if (input.checked) {
                random = true;
            } else {
                //Get the name of each ship
                if (input.dataset.name) {
                    inputs.push(input.dataset.name);
                }
                //Get the player's name
                if (input.name === 'playerName') {
                    playerName = input.value;
                } else {
                    //Get the row / column and directional values
                    if (input.value && input.value !== 'on') {
                        inputs.push(input.value);
                    }
                }
            }
        }

        //Create the human player and place their ships on to their board
        //Using the coordinates from the starting form
        const player = new Player(playerName);

        //Place the player's ships randomly
        if (random) {
            for (const ship of player.board.ships) {
                player.board.placeShipRandom({ type: ship.type });
                if (!ship.placed) {
                    result = ship.type;
                } else {
                    result = 'All Ships Placed!';
                }
            }
        } else {
            result = shipPlacement(player, inputs);
        }

        //If any ship wasn't placed then let the user know and do not start the game
        if (result !== 'All Ships Placed!') {
            displayError(result);
            return;
        }

        //Create the AI enemy player
        let enemy = setEnemy();
        
        updateDisplay();
        startGame({ player, enemy });
    })
}

export default playerForm;