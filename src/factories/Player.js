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

    #checkNearbyCoordinates(board) {
        let horizontal = true;

        for (let row = 0; row < 10; row++) {
            for (let column = 0; column < 10; column++) {
                
                //If you hit a ship
                if (board.shots[row][column] === 'hit') {

                    if (board.shots[row][column + 1] === 'miss' && board.shots[row][column - 1] === 'miss') {
                        horizontal = false;
                    } else if (board.shots[row + 1][column] === 'hit' || board.shots[row - 1][column] === 'hit') {
                        horizontal = false;
                    } 
                    
                    if (board.shots[row][column + 1] === 'hit' || board.shots[row][column - 1] === 'hit') {
                        horizontal = true;
                    } else if (board.shots[row + 1][column] === 'miss' && board.shots[row - 1][column] === 'miss') {
                        horizontal = true;
                    }

                    if (horizontal) {
                        //If you haven't tried the cell to the right
                        if (!board.shots[row][column + 1] && (column + 1 < 10)) {
                            return { row: row, column: column + 1 };
                        }
                        //If you haven't tried the cell to the left
                        if (!board.shots[row][column - 1] && (column - 1) >= 0) {
                            return { row: row, column: column - 1 };
                        }
                    } else {    
                        //If you havent tried the cell below
                        if (!board.shots[row + 1][column] && (row + 1 < 10)) {
                            return { row: row + 1, column: column };
                        }
                        //If you havent tried the cell above
                        if (!board.shots[row - 1][column] && (row - 1) >= 0) {
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

        if (this.#checkNearbyCoordinates(board)) {
            return this.#checkNearbyCoordinates(board);
        }

        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);

        while (board.shots[row][column]) {
            return this.chooseRandomCoordinates(player);
        }

        return { row, column };
    }
}

export default Player;