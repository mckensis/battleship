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

    //AI player will try to guess what direction a ship is facing
    decideDirection(board) {
        const MIN = 0;
        const MAX = 9;

        for (let row = MIN; row <= MAX; row++) {
            for (let column = MIN; column <= MAX; column++) {
                if (board.shots[row][column] === 'hit') {
                    if (row > MIN && row < MAX) {
                        if (board.shots[row - 1][column] === 'miss') {
                            if (board.shots[row + 1][column] === 'miss') {
                                return 'horizontal';
                            }
                        }
                        if (board.shots[row][column - 1] === 'hit') {
                            return 'horizontal';
                        }
                        if (board.shots[row][column - 1] === 'hit') {
                            return 'horizontal';
                        }
                    }
                    if (column > MIN && column < MAX) {
                        if (board.shots[row][column - 1] === 'miss') {
                            if (board.shots[row][column + 1] === 'miss') {
                                return 'vertical';
                            }
                        }
                        if (board.shots[row - 1][column] === 'hit') {
                            return 'vertical';
                        }
                        if (board.shots[row + 1][column] === 'hit') {
                            return 'vertical';
                        }
                    }
                    if (column === MIN) {
                        if (board.shots[row][column + 1] === 'miss') {
                            return 'vertical';
                        }
                    }
                    if (column === MAX) {
                        if (board.shots[row][column - 1] === 'miss') {
                            return 'vertical';
                        }
                    }
                    if (row === MIN) {
                        if (board.shots[row + 1][column] === 'miss') {
                            return 'horizontal';
                        }
                    }
                    if (row === MAX) {
                        if (board.shots[row - 1][column] === 'miss') {
                            return 'horizontal';
                        }
                    }
                }
            }
        }
        return 'unsure';
    }

    checkNearbyGrid(board) {
        const MIN = 0;
        const MAX = 9;
        let direction = this.decideDirection(board);

        for (let row = MIN; row <= MAX; row++) {
            for (let column = MIN; column <= MAX; column++) {
                if (board.shots[row][column] === 'hit') {
                    if (direction === 'horizontal') {
                        if (row < MAX || row === MIN) {
                            if (!board.shots[row + 1][column]) {
                                return { row: row + 1, column };
                            }
                        }
                        if (row > MIN || row === MAX) {
                            if (!board.shots[row - 1][column]) {
                                return { row: row - 1, column };
                            }
                        }
                    } else if (direction === 'vertical') {
                        if (column < MAX || column === MIN) {
                            if (!board.shots[row][column + 1]) {
                                return { row, column: column + 1 };
                            }
                        }
                        if (column > MIN || column === MAX) {
                            if (!board.shots[row][column - 1]) {
                                return { row, column: column - 1 };
                            }
                        }
                    } else {
                        if (row < MAX || row === MIN) {
                            if (!board.shots[row + 1][column]) {
                                return { row: row + 1, column };
                            }
                        }
                        if (row > MIN || row === MAX) {
                            if (!board.shots[row - 1][column]) {
                                return { row: row - 1, column };
                            }
                        }
                        if (column < MAX || column === MIN) {
                            if (!board.shots[row][column + 1]) {
                                return { row, column: column + 1 };
                            }
                        }
                        if (column > MIN || column === MAX) {
                            if (!board.shots[row][column - 1]) {
                                return { row, column: column - 1 };
                            }
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