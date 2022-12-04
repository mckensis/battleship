import './style.css';
import Player from './factories/Player';
import handleSubmit from './helpers/handleSubmit';
import createBoard from './helpers/createBoard';
import { formatFormData, shipPlacement } from './helpers/shipPlacement';
import { removeForm, addMainDisplay } from './helpers/updateElements';
import displayError from './helpers/errorHandling';

window.addEventListener('load', playerForm);

function setEnemy() {
    //Create the enemy
    //Set up their ships
    let enemy = new Player('CPU');
    enemy.cpu = true;

    for (const ship of enemy.board.ships) {
        let type = ship.type;
        enemy.board.placeShipRandom({ type });
    }

    console.log(enemy.board);
    return enemy;
}

function startGame(player, ships) {
    //copy the player's ships in just now for testing
    let enemy = setEnemy();
    removeForm();
    addMainDisplay();

    //Display the player and enemy boards on the page
    //TO DO: display enemy's "shots" board rather than their actual grid
    //TO DO: display a combination of the player's grid and "shots" over the top of it 
    const playerDisplay = document.querySelector('.boardContainer.player');
    const enemyDisplay = document.querySelector('.boardContainer.enemy');
    playerDisplay.appendChild(createBoard(player));
    enemyDisplay.appendChild(createBoard(enemy));
}

function playerForm() {
    const form = document.querySelector('form');
    const input = document.querySelector('.playerName');
    input.focus();

    //for quick testing
    input.value = 'a';

    const selects = Array.from(document.querySelectorAll('select'));

    selects.forEach(select => {
        select.addEventListener('change', () => {
            let column = select.previousElementSibling;
            let row = column.previousElementSibling;
            let length = Number(row.previousElementSibling.textContent);
            
            if (select.value === 'vertical') {
                column.max = '10';
                row.max = (10 - length) + 1;
                if (!row.value <= row.max) {
                    row.value = row.max;
                }
            } else {
                column.max = (10 - length) + 1;
                row.max = '10';
                if (!column.value <= column.max) {
                    column.value = column.max;
                }
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
        //Remove the error from ship placement if it exists, and start the game
        //I've commented this out to test if it's still there after game over
        //Uncomment this later!
        //removeError();

        startGame(player, ships);
    })
}