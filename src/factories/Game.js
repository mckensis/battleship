import sleep from '../helpers/sleep';
import hit from '../assets/sounds/hit.wav';
import gameover from '../assets/sounds/gameover.wav';
import sunk from '../assets/sounds/sunk.wav';

class Game {
    constructor(player, enemy) {
        this.players = [ player, enemy ];
        this.currentPlayer = this.players[0];
        this.currentEnemy = this.players[1];
        this.parents = Array.from(document.querySelectorAll('.boardContainer'));
        this.parents[1].classList.add('inactive');
        this.announcements = document.querySelector('.announcements');
        this.muteBtn = document.querySelector('.muteButton');
        this.audio = new Audio();
        this.audio.volume = 0.1;
        this.playRound();
    }

    #announce(player, type) {
        switch (type) {
            case 'turn':
                if (player.cpu) {
                    this.announcements.textContent = `${player.name} is thinking...`;
                } else {
                    this.announcements.textContent = `${player.name}'s turn...`;
                }
                break;
            case 'miss':
                this.announcements.textContent = `${player.name} missed!`;
                break;
            case 'hit':
                this.audio.src = hit;
                this.audio.play();
                this.announcements.textContent = `${player.name} hit a ship!`;
                break;
            case 'sunk':
                this.audio.src = sunk;
                this.audio.play();
                this.announcements.textContent = `${[player.name]} sunk a ship!`;
                break;
            case 'gameover':
                this.announcements.textContent = `${player.name} wins!`;       
                this.audio.src = gameover;
                this.audio.play();
                break;
        }
    }

    #bindClick(parents) {
        if (!this.currentPlayer.cpu) {
            //Get the enemy's board and apply a click listener to each cell
            parents.forEach(board => {
                if (board.classList.contains('enemy')) {
                    let cells = Array.from(board.lastChild.children);
                    cells.forEach(cell => {
                        cell.addEventListener('click', () => {
                            let coordinates = {
                                row: Number(cell.classList[0].slice(1)),
                                column: Number(cell.classList[1].slice(1)),
                            }
                            let result = this.currentPlayer.attackEnemy(this.currentEnemy, coordinates);

                            //If this cell has already been attacked then do not end the player's turn
                            if (result === 'already chosen') {
                                return;
                            }
                            this.#announce(this.currentPlayer, result);
                            this.displayBoards(this.players);
                            this.endTurn();
                        })
                    })
                }
            })
        }
    }

    #clearBoard(parent) {
        while (parent.children.length > 2) {
            parent.removeChild(parent.lastChild);
        }
    }

    #displayGameOver() {
        this.parents.forEach(parent => {
            parent.classList.add('inactive');
        })
        this.#announce(this.currentPlayer, 'gameover');
    }

    #cpuTurn() {
        let coordinates = this.currentPlayer.chooseRandomCoordinates(this.currentEnemy);
        let result = this.currentPlayer.attackEnemy(this.currentEnemy, coordinates);
        this.#announce(this.currentPlayer, result);    
        this.displayBoards(this.players);
        this.endTurn();
    }

    displayBoards(players) {
        for (const player of players) {
            let parent;
            if (!player.cpu) {
                parent = document.querySelector('.boardContainer.player');
            } else {
                parent = document.querySelector('.boardContainer.enemy');
            }

            //Empty the current board
            this.#clearBoard(parent);
            const element = document.createElement('div');
            element.classList.add('board');
        
            for (let rows = 0; rows < 10; rows++) {
                for (let columns = 0; columns < 10; columns++) {
                    const div = document.createElement('div');
                    div.classList.add(`R${rows}`)
                    div.classList.add(`C${columns}`);
    
                    if (!player.cpu) {
                        //If the cell in the player's board has a ship in it then style the cell accordingly
                        //TO DO: also display the 'shots' board for the player
                        if (player.board.grid[rows][columns]) {
                            div.classList.add('occupied');
                        }
                        if (player.board.shots[rows][columns]) {
                            div.classList.add(player.board.shots[rows][columns]);
                        }
                    }
                    if (player.cpu) {
                        //Display the 'shots' board for the enemy so that the player cannot see their ships
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

    toggleActiveBoard() {
        this.parents.forEach(parent => {
            parent.classList.toggle('inactive');
        })
    }

    async endTurn() {
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
    
    async playRound() {
        this.displayBoards(this.players);
        this.#announce(this.currentPlayer, 'turn');
        if (!this.currentPlayer.cpu) {
            this.#bindClick(this.parents);
        } else {
            await sleep(500);
            this.#cpuTurn();
        }
    }
}

export default Game;