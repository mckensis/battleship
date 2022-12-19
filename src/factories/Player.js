import Gameboard from "./Gameboard";

class Player {
    constructor(name) {
        this.name = name;
        this.cpu = false;
        this.board = new Gameboard(this.name);
        this.moved = false;
        this.previousTarget;
        this.target;
    }

    foundTarget(coordinates) {
        this.target = coordinates;
    }

    //Takes in a player to attack as well as the coordinates to attack
    attackEnemy(player, coordinates) {
        return player.board.receiveAttack(coordinates);
    }

    //The AI player uses this function to check nearby cells if they successfully hit a ship
    #checkNearbyCoordinates(board) {
        let MIN = 0;
        let MAX = 9;
        let direction = 'unsure';

        const row = this.target.row;
        const column = this.target.column;
        const type = board.grid[row][column];
        let length;

        for (const ship of board.ships) {
            if (ship.type === type) {
                length = ship.length;
                if (ship.isSunk()) {
                    this.target = '';
                    return false;
                }
            }
        }

        console.log("checking cell", row, column);
        console.log(length);

        if (row < MAX && row > MIN) {
            if (board.shots[row + 1][column] === 'hit') {
                direction = 'vertical';
            }
            if (board.shots[row - 1][column] === 'hit') {
                direction = 'vertical';
            }
        }
        if (row === MAX) {
            if (board.shots[row - 1][column] === 'hit') {
                console.log("setting");
                direction = 'vertical';
            }
        }
        if (row === MIN) {
            if (board.shots[row + 1][column] === 'hit') {
                console.log("setting");
                direction = 'vertical'
            }
        }

        if (column < MAX && column > MIN) {
            if (board.shots[row][column + 1] === 'hit') {
                console.log("setting");
                direction = 'horizontal';
            }
            if (board.shots[row][column - 1] === 'hit') {
                console.log("setting");
                direction = 'horizontal';
            }
        }
        if (column === MAX) {
            if (board.shots[row][column - 1] === 'hit') {
                console.log("setting");
                direction = 'horizontal';
            }
        }
        if (column === MIN) {
            if (board.shots[row][column + 1] === 'hit') {
                console.log("setting");
                direction = 'horizontal';
            }
        }

        console.log(direction);
        
        if (direction === 'horizontal') {
            //Check the cell to the left
            if (column > MIN) {
                if (!board.shots[row][column - 1]) {
                    console.log("checking left");
                    return { row, column: column - 1 };
                }
            }
            //Check the cell to the right
            if (column < MAX) {
                if (!board.shots[row][column + 1]) {
                    console.log("checking right");
                    return { row, column: column + 1 };
                }
            }
        }

        if (direction === 'vertical') {
            //Check the cell below
            if (row < MAX) {
                if (!board.shots[row + 1][column]) {
                    console.log("checking below");
                    return { row: row + 1, column };
                }
            }
            //Check the cell above
            if (row > MIN) {
                if (!board.shots[row - 1][column]) {
                    console.log("checking above");
                    return { row: row - 1, column };
                }
            }   
        }

        if (direction === 'unsure') {
            //Check the cell to the right
            if (column < MAX) {
                if (!board.shots[row][column + 1]) {
                    console.log("checking right");
                    return { row, column: column + 1 };
                }
            }
            //Check the cell to the left
            if (column > MIN) {
                if (!board.shots[row][column - 1]) {
                    console.log("checking left");
                    return { row, column: column - 1 };
                }
            }
            //Check the cell below
            if (row < MAX) {
                if (!board.shots[row + 1][column]) {
                    console.log("checking below");
                    return { row: row + 1, column };
                }
            }
            //Check the cell above
            if (row > MIN) {
                if (!board.shots[row - 1][column]) {
                    console.log("checking above");
                    return { row: row - 1, column };
                }
            }
        }

        return false;
    }

    //For CPU player
    //Returns a random row and column to attack that haven't been attacked yet
    chooseRandomCoordinates(player) {
        let board = player.board;

        if (this.target) {
            this.previousTarget = this.target;
            let nearby = this.#checkNearbyCoordinates(board);

            if (nearby) {
                return { row: nearby.row, column: nearby.column };
            }
        }

        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);

        //Choose any random available coordinate to attack
        while (board.shots[row][column]) {
            return this.chooseRandomCoordinates(player);
        }

        return { row, column };
    }
}

export default Player;