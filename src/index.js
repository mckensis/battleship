import './style.css';
import createBoard from './helpers/createBoard';
import playerForm from './helpers/playerForm';
//import chooseCell from './helpers/chooseCell';
import announce from './helpers/announce';
import displayAttack from './helpers/displayAttack';

//Show the starting form when the window loads
window.addEventListener('load', playerForm);

async function game(data) {
    let player = data.player;
    let enemy = data.enemy;
    let currentPlayer = data.currentPlayer;
    let playerBoard = data.playerBoard;
    let enemyBoard = data.cpuBoard;
    let cpuTurn = false;
    
    //what should the game controller do?

    //check if the current player has moved
    //allow a player to take a turn
    //change the player
    //check if any player has lost
    //loop

    //create function takeTurn within here which will be able
    //to update the variables inside the function ie change turns around etc

    if (!currentPlayer) {
        currentPlayer = data.enemy;
    }

    //If all of the current player's ships have sunk
    if (player.board.allSunk() || enemy.board.allSunk()) {
        return;
    }

    //Announce whose turn it is
    announce({ type: 'turn', player: currentPlayer });

    //If it's the CPU's turn
    if (currentPlayer.cpu) {
        if (!currentPlayer.moved) {
            const coordinates = currentPlayer.chooseRandomCoordinates(player);
            const result = player.board.receiveAttack(coordinates);
            displayAttack({ result, coordinates, enemyBoard: playerBoard });
            announce({ player: currentPlayer, type: result });   
            currentPlayer = data.player;
        }
    }

    //If it's the player's turn
    if (!currentPlayer.cpu) {
        if (!currentPlayer.moved) {
            enemyBoard.forEach(cell => {
                cell.addEventListener('click', () => {
                    const coordinates = {
                        row: cell.classList[0].slice(1),
                        column: cell.classList[1].slice(1)
                    }
                    const result = enemy.board.receiveAttack(coordinates);
                    displayAttack({ result, coordinates, enemyBoard });
                    currentPlayer = data.enemy;
                })
            })
        }
    }
}

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
    
    let playerBoard = Array.from(document.querySelectorAll('.boardContainer.player .board div'));
    let cpuBoard = Array.from(document.querySelectorAll('.boardContainer.enemy .board div'));

    let player = data.player;
    let enemy = data.enemy;
    game({ player, enemy, playerBoard, cpuBoard });
}

export { startGame };