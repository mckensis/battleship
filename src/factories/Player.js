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

    checkNearbyCoordinates(board) {
        for (let row = 0; row < 10; row++) {
            for (let column = 0; column < 10; column++) {
                if (board.shots[row][column] === 'hit') {
                    if (!board.shots[row -1][column]) {
                        return { row: row -1, column };
                    }
                    if (!board.shots[row + 1][column]) {
                        return { row: row +1, column };
                    }
                    if (!board.shots[row][column -1]) {
                        return { row, column: column -1 };
                    }
                    if (!board.shots[row][column +1]) {
                        return { row, column: column +1 };
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

        if (this.checkNearbyCoordinates(board)) {
            return this.checkNearbyCoordinates(board);
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