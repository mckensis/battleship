import Player from '../factories/Player';

//Sets up the two players for the game
//Player two will be either human or CPU
function setPlayers(data) {
    const form = new FormData(data);
    let playerOne;
    let playerTwo;

    for (const [key, value] of form) {
        if (key === 'cpuPlayer' && value === 'true' && !playerTwo) {
            playerTwo = new Player('CPU');
            playerTwo.cpu = true;
        }
        if (key === 'playerOneName') {
            playerOne = new Player(value);
        }
        if (key === 'playerTwoName' && !playerTwo) {
            playerTwo = new Player(value);
        }
    }
    return ({ playerOne, playerTwo });
}

export default setPlayers;