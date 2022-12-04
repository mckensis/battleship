import createGrid from "./createGrid";
import Ship from "./Ship";

class Gameboard {

    constructor(player) {
        this.player = player;
        this.grid = createGrid();
        //Gameboards should keep track of missed attacks so they can display them properly.
        this.shots = createGrid();
        this.ships = this.#createBoats();
    };

    //Checks that there isn't already a boat on the chosen coordinates
    #checkOverlap(temp) {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (temp[i][j] !== undefined) {
                    if (this.grid[i][j] !== undefined) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

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
    };

    //Helper function to create an array that will contain every grid space that the passed in boat will cover
    #createAllCoordinates(data) {
        let temp = createGrid();
        let row = data.row;
        let column = data.column;
        //TO-DO: if orientation is vertical then increment row instead of column
        for (let boatGridLength = 0; boatGridLength < data.boat.length; boatGridLength++) {
            if (data.direction === 'vertical') {   
                row = data.row + boatGridLength;
                column = column;
            } else {
                row = row;
                column = data.column + boatGridLength;
            }
            //Set the appropriate row & column to be the type of boat which will be placed there
            let type = data.boat.type;
            temp[row][column] = type;
        }
        return temp;
    };

    //Helper function to copy the temp array into the Gameboard's grid
    #copyTempIntoGrid(tempCoordinates) {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (tempCoordinates[i][j]) {
                    this.grid[i][j] = tempCoordinates[i][j];
                }
            }
        }
        return this.grid;
    };

    //Places the provided ship at the provided location 
    placeShip(data) {
        
        const boat = this.ships.find(element => element.type === data.type);
        if (boat.placed) {
            return 'ship placed';
        }
        let column = data.column;
        let row = data.row;
        let direction = data.direction;
        let tempCoordinates = this.#createAllCoordinates({ boat, row, column, direction });

        if (tempCoordinates) {
            //Check that the new ship's whole position won't overlap any current ships on the grid
            if (this.#checkOverlap(tempCoordinates)) {
                return 'ship not placed';
            }
            //Place the new ship in the Gameboard's grid
            this.#copyTempIntoGrid(tempCoordinates);
            boat.placed = true;
            return 'ship placed';
        }
    };

    chooseRandomDirection() {
        return Math.random() >= 0.5 ? 'horizontal' : 'vertical';
    }

    chooseRandomCoordinates() {
        return Math.floor(Math.random() * 10);
    }

    placeShipRandom(data) {
        const boat = this.ships.find(element => element.type === data.type);
        let type = data.type;
        let result = String;
        let direction = this.chooseRandomDirection();
        let row = this.chooseRandomCoordinates();
        let column = this.chooseRandomCoordinates();

        //Ensures the ship won't overflow the grid
        if (direction === 'horizontal') {
            while((boat.length + column) > 10) {
                column = this.chooseRandomCoordinates();
            }
        }
        if (direction === 'vertical') {
            while((boat.length + row) > 10) {
                row = this.chooseRandomCoordinates();
            }
        }

        result = this.placeShip({ row, column, type, direction });
        if (result === 'ship not placed') {
            this.placeShipRandom({ type, direction });
        }
        
        result = 'ship placed';
        return result;
    }

    //Takes coordinates and determines if the attack is a 'hit' or a 'miss'
    receiveAttack(coordinates) {
        let row = coordinates.row;
        let column = coordinates.column;

        if (!this.grid[row][column]) {
            this.shots[row][column] = "miss";
            return 'miss';
        } else {
            let attack = this.grid[row][column];
            for (const ship of this.ships) {
                if (ship.type === attack) {
                    ship.hit();
                    this.shots[row][column] = "hit";
                    return 'hit';
                }
            }
        }
    };

    //Report whether or not all of the gameboard's ships have been sunk.
    allSunk() {
        for (const ship of this.ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    };
}

export default Gameboard;