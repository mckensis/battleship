import Player from '../factories/Player';
import shipPlacement from './shipPlacement';
import setEnemy from './setEnemy';
import { startGame } from '../index';
import displayError from './errorHandling';
import { removeForm, addMainDisplay } from './updateElements'; 

//Takes the ship coordinates form and formats it
//To prepare for placing the ships
function formatFormData(form) {
    let ships = {
        carrier: {
            type: 'carrier',
            direction: '',
            coords: [],
        },
        battleship: {
            type: 'battleship',
            direction: '',
            coords: [],
        },
        destroyer: {
            type: 'destroyer',
            direction: '',
            coords: [],
        },
        submarine: {
            type: 'submarine',
            direction: '',
            coords: [],
        },
        patrol: {
            type: 'patrol',
            direction: '',
            coords: [],
        }
    }
    
    //Minus 1 from the input value to format for zero-indexed arrays
    form.querySelectorAll('input').forEach(input => {
        if (!input) {
            return;
        }
        if (input.dataset.type) {
            ships[input.dataset.type]["coords"].push(input.value -1);
        }
    });

    let values = [];
    
    form.querySelectorAll('select').forEach(select => {
        ships[select.dataset.type]['direction'] = select.value;
    })

    return ships;
}

//Handles basic validity checking of player name inputs
function handleSubmit(e, form) {
    e.preventDefault();
    let status = form.checkValidity();
    form.reportValidity();
    if (status) {
        return true;
    }
    return false;
}

function playerForm() {
    const form = document.querySelector('form');
    const input = document.querySelector('input[name="playerName"]');
    input.focus();

    //for quick testing
    input.value = 'a';

    const selects = Array.from(document.querySelectorAll('select'));
    selects.forEach(select => {
        select.addEventListener('change', () => {
            let column = select.previousElementSibling;
            let row = column.previousElementSibling;
            let length = Number(row.previousElementSibling.textContent);
            
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

        let playerName; 
        //Set the player's name to the input value from the form
        for (const input of form) {
            if (input.name === 'playerName') {
                playerName = input.value;
            }
        }

        //Create a new player and turn the form coordinates into data valid for placing the  ships
        const player = new Player(playerName);
        let ships = formatFormData(form);
        let result = shipPlacement(player, ships);

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