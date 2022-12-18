import sleep from '../helpers/sleep';
import Announcer from './Announcer';

class Game {
    //Set the players up, and get their respective board containers
    //Set the announcer up, display the starting boards, and start the first round
    constructor(player, enemy) {
        this.players = [ player, enemy ];
        this.currentPlayer = this.players[0];
        this.currentEnemy = this.players[1];
        this.parents = Array.from(document.querySelectorAll('.boardContainer'));
        this.parents[1].classList.add('inactive');
        this.announcer = new Announcer();
        this.displayBoards(this.players);
        this.playRound();
    }

    //This will handle the player taking their turn
    #bindClick(parents) {
        if (!this.currentPlayer.cpu) {
            //Get the enemy's board and apply a click listener to each cell
            parents.forEach(board => {
                if (board.classList.contains('enemy')) {
                    let cells = Array.from(board.lastChild.children);
                    cells.forEach(cell => {
                        cell.addEventListener('click', () => {
                            //Get the coordinates to attack from the cell which was clicked
                            let coordinates = {
                                row: Number(cell.classList[0].slice(1)),
                                column: Number(cell.classList[1].slice(1)),
                            }
                            //The result will be either 'hit', 'miss', or 'already chosen'
                            let result = this.currentPlayer.attackEnemy(this.currentEnemy, coordinates);

                            //If this cell has already been attacked then do not end the player's turn
                            if (result === 'already chosen') {
                                return;
                            }
                            //End the player's turn
                            this.endTurn(result);
                        })
                    })
                }
            })
        }
    }

    //Clears the board on the DOM in preparation for repopulating each cell with a hit or a miss
    #clearBoard(parent) {
        while (parent.children.length > 2) {
            parent.removeChild(parent.lastChild);
        }
    }

    //Announce a game over and set the inactive class on both boards
    #displayGameOver() {
        this.parents.forEach(parent => {
            parent.classList.add('inactive');
        })
        this.announcer.announce(this.currentPlayer, 'gameover');
    }

    //This is where the AI player will take their turn
    #cpuTurn() {
        let coordinates = this.currentPlayer.chooseRandomCoordinates(this.currentEnemy);
        let result = this.currentPlayer.attackEnemy(this.currentEnemy, coordinates);
        this.announcer.announce(this.currentPlayer, result);    
        this.displayBoards(this.players);
        this.endTurn();
    }

    //Called after every turn to display the most up to date board for each player
    displayBoards(players) {
        for (const player of players) {
            let parent;
            if (!player.cpu) {
                parent = document.querySelector('.boardContainer.player');
            } else {
                parent = document.querySelector('.boardContainer.enemy');
            }

            //Empty the currently displayed board
            this.#clearBoard(parent);
            const element = document.createElement('div');
            element.classList.add('board');
        
            //Populate the board with 100 empty cells,
            //Which will be filled in accordingly below
            for (let rows = 0; rows < 10; rows++) {
                for (let columns = 0; columns < 10; columns++) {
                    const div = document.createElement('div');
                    div.classList.add(`R${rows}`)
                    div.classList.add(`C${columns}`);
    
                    //Human player's board
                    if (!player.cpu) {
                        //If the cell has a ship in it then style the cell accordingly
                        if (player.board.grid[rows][columns]) {
                            div.classList.add('occupied');
                        }
                        //If the cell has also been attacked then display this too
                        if (player.board.shots[rows][columns]) {
                            div.classList.add(player.board.shots[rows][columns]);
                        }
                    }

                    //AI player's board
                    if (player.cpu) {
                        //Display the 'shots' board so that the player cannot see their ship placements
                        if (player.board.shots[rows][columns]) {
                            div.classList.add(`${player.board.shots[rows][columns]}`)
                        }
                    }
                    element.appendChild(div);
                }
            }
            parent.appendChild(element);
        }
    }

    //Controls the opacity of each board depending on the active player
    toggleActiveBoard() {
        this.parents.forEach(parent => {
            parent.classList.toggle('inactive');
        })
    }

    //Called after every turn,
    //Changes the current player around,
    //Checks for game over, and plays another round if it's not game over
    async endTurn(result) {
        this.announcer.announce(this.currentPlayer, result);
        this.displayBoards(this.players);
        await sleep(1000);
        //Call game over if current enemy's ships have all been sunk
        if (this.currentEnemy.board.allSunk()) {
            this.#displayGameOver();
            return;            
        }

        if (this.currentPlayer === this.players[0]) {
            this.currentPlayer = this.players[1]; 
            this.currentEnemy = this.players[0];
        } else {
            this.currentPlayer = this.players[0];
            this.currentEnemy = this.players[1];
        }
        this.toggleActiveBoard();
        this.playRound();
    }
    
    //Either allow the player to choose a cell to attack or let the ai player take their turn
    async playRound() {
        this.announcer.announce(this.currentPlayer, 'turn');
        if (!this.currentPlayer.cpu) {
            this.#bindClick(this.parents);
        } else {
            await sleep(500);
            this.#cpuTurn();
        }
    }
}

export default Game;