import createGrid from "./createGrid";
import Ship from "./Ship";


class Gameboard {

    #hits;
    #misses;
    #grid;

    constructor(player) {
        this.player = player;
        this.#grid = createGrid();
        //Gameboards should keep track of missed attacks so they can display them properly.
        this.#misses = createGrid();
        this.#hits = createGrid();
        this.ships = this.#createBoats();
    };

    //Checks that there isn't already a boat on the chosen coordinates
    #checkOverlap(temp) {
        for (let i = 0; i < this.#grid.length; i++) {
            for (let j = 0; j < this.#grid[i].length; j++) {
                if (temp[i][j] !== undefined) {
                    if (this.#grid[i][j] !== undefined) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    //Creates the five boats for the game
    #createBoats() {
        let boats = [];
        const carrier = new Ship(5, 'carrier');
        const battleship = new Ship(4, 'battleship');
        const destroyer = new Ship(3, 'destroyer');
        const submarine = new Ship(3, 'submarine');
        const patrol = new Ship(2, 'patrol');
        boats.push(carrier, battleship, destroyer, submarine, patrol);
        return boats;
    }

    //Helper function to create an array that will contain every grid space that the passed in boat will cover
    #createAllCoordinates(data) {
        let temp = createGrid();

        //TO-DO: if orientation is vertical then increment row instead of column
        for (let boatGridLength = 0; boatGridLength < data.boat.length; boatGridLength++) {
            let column = data.column + boatGridLength;
            let row = data.row;
            let type = data.boat.type;
            //Set the appropriate row & column to be the type of boat which will be placed there
            temp[row][column] = type;
        }
        return temp;
    }

    //Helper function to copy the temp array into the Gameboard's grid
    #copyTempIntoGrid(tempCoordinates) {
        for (let i = 0; i < this.#grid.length; i++) {
            for (let j = 0; j < this.#grid[i].length; j++) {
                if (tempCoordinates[i][j]) {
                    this.#grid[i][j] = tempCoordinates[i][j];
                }
            }
        }
        return this.#grid;
    }

    //Places the provided ship at the provided location 
    placeShip(data) {
        const boat = this.ships.find(element => element.type === data.type);
        let column = data.column;
        let row = data.row;
        let tempCoordinates = this.#createAllCoordinates({ boat, row, column });

        if (tempCoordinates) {
            //Check that the new ship's whole position won't overlap any current ships on the grid
            if (this.#checkOverlap(tempCoordinates)) {
                return null;
            }

            //Place the new ship in the Gameboard's grid
            this.#copyTempIntoGrid(tempCoordinates);
            return 'ship placed';
        }
    }

    //Gameboards should have a receiveAttack function that takes a pair of coordinates,
    //determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship,
    //or records the coordinates of the missed shot.
    receiveAttack(coordinates) {
        let row = coordinates.row;
        let column = coordinates.column;

        if (!this.#grid[row][column]) {
            this.#misses[row][column] = "miss";
            return 'miss';
        } else {
            let attack = this.#grid[row][column];
            for (const ship of this.ships) {
                if (ship.type === attack) {
                    ship.hit();
                    this.#hits[row][column] = "hit";
                    return 'hit';
                }
            }
        }
    }

    //Report whether or not all of the gameboard's ships have been sunk.
    allSunk() {
        for (const ship of this.ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }
}

export default Gameboard;