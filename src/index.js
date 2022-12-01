import './style.css';
import managePlayerTwo from './helpers/managePlayerTwo';
import handleSubmit from './helpers/handleSubmit';
import setPlayers from './helpers/setPlayers';
import resetForm from './helpers/resetForm';
import hideSection from './helpers/hideSection';
import renderBoard from './helpers/renderBoard';

window.addEventListener('load', initialisePage);

function startGame(players) {

    const playerOne = players.playerOne;
    const playerTwo = players.playerTwo;
    const section = document.querySelector('.start');

    hideSection(section);
    renderBoard(playerOne.board);
    //playerOne.board.placeShip({  });
}

function initialisePage() {
    //Deals with toggling the second player as CPU or human
    managePlayerTwo();
    const startGameBtn = document.querySelector('.startGameBtn');
    const form = document.querySelector('form');
    resetForm(form);
    startGameBtn.addEventListener('click', (e) => {
        if (!handleSubmit(e, form)) {
            return;
        }
        const players = setPlayers(form);
        startGame(players);
    })
}