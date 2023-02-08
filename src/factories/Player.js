import Gameboard from "./Gameboard";

class Player {
    constructor(name) {
        this.name = name;
        this.cpu = false;
        this.board = new Gameboard(this.name);
    }

    //Takes in a player to attack as well as the coordinates to attack
    attackEnemy(player, coordinates) {
        return player.board.receiveAttack(coordinates);
    }

    //Decide direction to attack
    chooseDirection(board) {
        const MIN = 0;
        const MAX = 9;

        for (let row = 0; row < 10; row++) {
            for (let column = 0; column < 10; column++) {
                if (board.shots[row][column] === 'hit') {
                    //Check nearby columns
                    if (column < MAX && column > MIN) {
                        if (board.shots[row][column + 1] === 'miss'
                            && board.shots[row][column - 1] === 'miss') {
                                return false;
                        }
                        if (board.shots[row][column + 1] === 'hit'
                            || board.shots[row][column - 1] === 'hit') {
                                return true;
                        }
                    }
                    //Check nearby columns
                    if (column === MAX) {
                        if (board.shots[row][column - 1] === 'miss') {
                            return false;
                        }
                        if (board.shots[row][column - 1] === 'hit') {
                            return true;
                        }
                    }
                    
                    //Check nearby columns
                    if (column === MIN) {
                        if (board.shots[row][column + 1] === 'miss') {
                            return false;
                        }
                        if (board.shots[row][column + 1] === 'hit') {
                            return true;
                        }
                    }
                    
                    //Check nearby rows
                    if (row < MAX && row > MIN) {
                        if (board.shots[row + 1][column] === 'miss'
                        && board.shots[row - 1][column] === 'miss') {
                            return true;
                        }
                        if (board.shots[row + 1][column] === 'hit'
                        || board.shots[row - 1][column] === 'hit') {
                            return false;
                        }
                    }

                    //Check nearby rows
                    if (row === MAX) {
                        if (board.shots[row - 1][column] === 'miss') {
                            return true;
                        }
                        if (board.shots[row - 1][column] === 'hit') {
                            return false;
                        }
                    }

                    //Check nearby rows
                    if (row === MIN) {
                        if (board.shots[row + 1][column] === 'miss') {
                            return true;
                        }
                        if (board.shots[row + 1][column] === 'hit') {
                            return false;
                        }
                    }
                }
            }
        }
        return;
    }

    checkNearbyGrid(board) {
        const MIN = 0;
        const MAX = 9;
        let horizontal = this.chooseDirection(board);
        
        for (let row = MIN; row <= MAX; row++) {
            for (let column = MIN; column <= MAX; column++) {
                if (board.shots[row][column] === 'hit') {
                    if (horizontal) {
                        //If you haven't tried the cell to the right
                        if (!board.shots[row][column + 1] && (column + 1 < MAX)) {
                            return { row: row, column: column + 1 };
                        }
                        //If you haven't tried the cell to the left
                        if (!board.shots[row][column - 1] && (column - 1) > MIN) {
                            return { row: row, column: column - 1 };
                        }
                    }
                    if (!horizontal) {
                        //If you havent tried the cell below
                        if (!board.shots[row + 1][column] && (row + 1 < MAX)) {
                            return { row: row + 1, column: column };
                        }
                        //If you havent tried the cell above
                        if (!board.shots[row - 1][column] && (row - 1) > MIN) {
                            return { row: row - 1, column: column };
                        }
                    }
                }
            }
        }
        return false;
    }

    //For CPU player
    //Returns a random row and column to attack that haven't been attacked yet
    chooseRandomCoordinates(player) {
        let board = player.board;
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);

        let nearby = this.checkNearbyGrid(player.board);

        if (nearby) {
            return { row: nearby.row, column: nearby.column };
        }

        //Choose any random available coordinate to attack
        while (board.shots[row][column]) {
            return this.chooseRandomCoordinates(player);
        }

        return { row, column };
    }
}

export default Player;