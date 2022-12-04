import './style.css';
import createBoard from './helpers/createBoard';
import playerForm from './helpers/playerForm';

//Handles the starting form
//startGame will be called, passing in the player and enemy
window.addEventListener('load', playerForm);

//Function is called when the form is successfully submitted
//Passed in the player and the enemy as "data"
function startGame(data) {
    //Display the player and enemy boards on the page
    //TO DO: display enemy's "shots" board rather than their actual grid
    //TO DO: display a combination of the player's grid and "shots" over the top of it 
    const playerDisplay = document.querySelector('.boardContainer.player');
    const enemyDisplay = document.querySelector('.boardContainer.enemy');
    playerDisplay.appendChild(createBoard(data.player));
    enemyDisplay.appendChild(createBoard(data.enemy));
    
    //gameLoop(data);
}

export { startGame };