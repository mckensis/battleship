import Gameboard from "./Gameboard";

class Player {
    constructor(name) {
        this.name = name;
        this.cpu = false;
        this.board = new Gameboard(this.name);
        this.moved = false;
    }

    //Takes in a player to attack as well as the coordinates to attack
    attackEnemy(player, coordinates) {
        return player.board.receiveAttack(coordinates);
    }

    //The AI player uses this function to check nearby cells if they successfully hit a ship
    #checkNearbyCoordinates(board) {
        let horizontal = true;

        for (let row = 0; row < 10; row++) {
            for (let column = 0; column < 10; column++) {
                
                //If a ship was hit
                if (board.shots[row][column] === 'hit') {

                    //If both nearby columns resulted in a miss
                    //Or if either of the nearby rows have resulted in a hit
                    //Then we know the ship is placed vertically
                    if (board.shots[row][column + 1] === 'miss' && board.shots[row][column - 1] === 'miss') {
                        horizontal = false;
                    } else if (board.shots[row + 1][column] === 'hit' || board.shots[row - 1][column] === 'hit') {
                        horizontal = false;
                    } 
                    
                    //If both nearby rows resulted in a miss
                    //Or if either of the nearby columns have resulted in a hit
                    //Then we know the ship is placed horizontally
                    if (board.shots[row + 1][column] === 'miss' && board.shots[row - 1][column] === 'miss') {
                        horizontal = true;
                    } else if (board.shots[row][column + 1] === 'hit' || board.shots[row][column - 1] === 'hit') {
                        horizontal = true;
                    }

                    if (horizontal) {
                        //Try the cell to the right
                        if (!board.shots[row][column + 1] && (column + 1 < 10)) {
                            return { row: row, column: column + 1 };
                        }
                        //Try the cell to the left
                        if (!board.shots[row][column - 1] && (column - 1) >= 0) {
                            return { row: row, column: column - 1 };
                        }
                    } else {    
                        //Try the cell below
                        if (!board.shots[row + 1][column] && (row + 1 < 10)) {
                            return { row: row + 1, column: column };
                        }
                        //Try the cell above
                        if (!board.shots[row - 1][column] && (row - 1) >= 0) {
                            return { row: row - 1, column: column }; 
                        }
                    }
                }
            }
        }
        //If there are no nearby cells to attack, then just return false
        return false;
    }

    //For CPU player
    //Returns a random row and column to attack that haven't been attacked yet
    chooseRandomCoordinates(player) {
        let board = player.board;

        //Check for any nearby coordinates to attack
        if (this.#checkNearbyCoordinates(board)) {
            return this.#checkNearbyCoordinates(board);
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