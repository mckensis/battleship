import createBoard from "./helpers/createBoard";

function startGame(players) {
    const game = document.querySelector('.gameplay');
    game.style.display = "grid";
    createBoard(players.playerOne);
}

function initialiseGame() {
    //Deals with toggling the second player as CPU or human
    managePlayerTwo();
    const nextBtn = document.querySelector('.nextBtn');
    const form = document.querySelector('form');
    resetForm(form);
    nextBtn.addEventListener('click', (e) => {
        if (!handleSubmit(e, form)) {
            return;
        }
        const players = setPlayers(form);
        const section = document.querySelector('.start');
        hideSection(section);
        //renderBoard();
    })
}

export { startGame, initialiseGame };