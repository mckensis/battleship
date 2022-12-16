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

    //For CPU player
    //Returns a random row and column to attack that haven't been attacked yet
    chooseRandomCoordinates(player) {
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);

        while (player.board.shots[row][column]) {
            return this.chooseRandomCoordinates(player);
        }
        return { row, column };
    }
}

export default Player;