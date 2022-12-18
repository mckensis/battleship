import Player from '../factories/Player';
import setEnemy from './setEnemy';
import { startGame } from '../index';
import { removeForm, addMainDisplay } from './updateElements'; 

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
    const section = document.querySelector('.formContainer');
    
    const span = document.createElement('span');
    span.classList.add('shipPlacementSpan');
    span.textContent = result;

    const display = document.createElement('p');
    display.classList.add('shipPlacementDisplay')
    display.innerHTML = `Please check your <span class="shipPlacementSpan">${result}</span> coordinates. No coordinates have been set yet!`;
    section.appendChild(display);
}

//Handles placing all ships into the player's board
//Using data from the starting form
function shipPlacement(player, ships) {
    while (ships.length > 0) {
        let type = ships.shift();
        let row = ships.shift() -1;
        let column = ships.shift() -1;
        let direction = ships.shift();
        player.board.placeShip({ type, row, column, direction });
    }

    for (const ship of player.board.ships) {
        if (!ship.placed) return ship.type;
    }
    return 'All Ships Placed!';
}

//The form on the first page of the game
function playerForm() {
    const form = document.querySelector('form');
    const input = document.querySelector('input[name="playerName"]');
    input.focus();

    const selects = Array.from(document.querySelectorAll('select'));
    selects.forEach(select => {
        select.addEventListener('change', () => {
            let row = select.parentElement.parentElement.children[1].childNodes[1];            
            let column = select.parentElement.parentElement.children[2].childNodes[1];
            let length = Number(select.parentElement.parentElement.dataset.length);
            
            //If the ship direction changes
            //Check the current values for the coordinates
            //Lower them if they're above maximum
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

        })
    });

    form.addEventListener('submit', (e) => {
        //Form input validation
        if (!handleSubmit(e, form)) {
            return;
        }

        let inputs = [];
        let playerName; 
        //Set the player's name to the input value from the form
        for (const input of form) {
            if (input.dataset.name) {
                inputs.push(input.dataset.name);
            }
            if (input.name === 'playerName') {
                playerName = input.value;
            } else {
                if (input.value) {
                    inputs.push(input.value);
                }
            }
        }

        //Create a new player and turn the form coordinates into data valid for placing the  ships
        const player = new Player(playerName);
        let result = shipPlacement(player, inputs);

        //If any ship wasn't placed then let the user know and do not start the game
        if (result !== 'All Ships Placed!') {
            displayError(result);
            return;
        }
        let enemy = setEnemy();
        removeForm();
        addMainDisplay();
        startGame({ player, enemy });
    })
}

export default playerForm;