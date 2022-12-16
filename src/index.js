import './style.css';
import playerForm from './helpers/playerForm';
import Game from './factories/Game';

//Show the starting form when the window loads
window.addEventListener('load', playerForm);

//Function is called when the form is successfully submitted
//Passed in the player and the enemy as "data"
function startGame(data) {
    let player = data.player;
    let enemy = data.enemy;
    new Game(player, enemy);
}

export { startGame };