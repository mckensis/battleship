import Gameboard from "./Gameboard";
/*
Create Player.
Players can take turns playing the game by attacking the enemy Gameboard.
The game is played against the computer, so make ‘computer’ players capable of making random plays. The AI does not have to be smart, but it should know whether or not a given move is legal. (i.e. it shouldn’t shoot the same coordinate twice).
Create the main game loop and a module for DOM interaction.
At this point it is appropriate to begin crafting your User Interface.
The game loop should set up a new game by creating Players and Gameboards. For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.
*/
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

    //For CPU player
    //Returns a random row and column to attack that haven't been attacked yet
    chooseRandomCoordinates(player) {
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);

        while (player.board.shots[row][column]) {
            this.chooseRandomCoordinates(player);
        }
        return { row, column };
    }
}

export default Player;