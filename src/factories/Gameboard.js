import Ship from './Ship';

//Each player has their own gameboard
//Holds the player's grid as well as any shots they have received
//Holds the player's ships
class Gameboard {
    constructor(player) {
        this.player = player;
        //The grid will hold all placed ship coordinates
        this.grid = this.#createGrid();
        //Shots will contain any hits and misses from received attacks
        this.shots = this.#createGrid();
        //Contains the ship objects
        this.ships = this.#createShips();
    };

    //Returns a 2-dimensional 10x10 array which will be used for the player's grid / shots / temp arrays
    #createGrid() {
        return [...Array(10)].map(e => Array(10));
    }

    //Checks that there isn't already a ship on the chosen coordinates
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

    //Creates the five ships for the game
    #createShips() {
        let ships = [];
        const carrier = new Ship(5, 'carrier');
        const battleship = new Ship(4, 'battleship');
        const destroyer = new Ship(3, 'destroyer');
        const submarine = new Ship(3, 'submarine');
        const patrol = new Ship(2, 'patrol');
        ships.push(carrier, battleship, destroyer, submarine, patrol);
        return ships;
    };

    //Creates a temp array that will decide which cells a ship will occupy
    #createAllCoordinates(data) {
        let temp = this.#createGrid();
        let row = data.row;
        let column = data.column;
        //TO-DO: if orientation is vertical then increment row instead of column
        for (let shipGridLength = 0; shipGridLength < data.ship.length; shipGridLength++) {
            if (data.direction === 'vertical') {   
                row = data.row + shipGridLength;
                column = column;
            } else {
                row = row;
                column = data.column + shipGridLength;
            }
            //Set the appropriate row & column to be the type of ship which will be placed there
            let type = data.ship.type;
            temp[row][column] = type;
        }
        return temp;
    };

    //Copies the temp array from #createAllCoordinates into the gameboard's grid
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

    //Places a ship into the grid
    //After checking for overlaps 
    placeShip(data) {
        const ship = this.ships.find(element => element.type === data.type);
        if (ship.placed) {
            return 'ship already placed';
        }
        let row = data.row;
        let column = data.column;
        let direction = data.direction;
        let tempCoordinates = this.#createAllCoordinates({ ship, row, column, direction });

        if (tempCoordinates) {
            //Check that the new ship's whole position won't overlap any current ships on the grid
            if (this.#checkOverlap(tempCoordinates)) {
                return 'ship not placed';
            }
            //Place the new ship in the Gameboard's grid
            this.#copyTempIntoGrid(tempCoordinates);
            ship.placed = true;
            return 'ship placed';
        }
    };

    //The AI player will use this to choose a direction when placing a ship
    #chooseRandomDirection() {
        return Math.random() >= 0.5 ? 'horizontal' : 'vertical';
    }
    
    //The AI player will use this to choose coordinates when placing a ship
    #chooseRandomCoordinates() {
        return Math.floor(Math.random() * 10);
    }

    //Places ships randomly in the grid
    placeShipRandom(data) {
        const ship = this.ships.find(element => element.type === data.type);
        let type = data.type;
        let result = String;
        let direction = this.#chooseRandomDirection();
        let row = this.#chooseRandomCoordinates();
        let column = this.#chooseRandomCoordinates();

        //Ensures the ship won't overflow the grid
        if (direction === 'horizontal') {
            while((ship.length + column) > 10) {
                column = this.#chooseRandomCoordinates();
            }
        }
        if (direction === 'vertical') {
            while((ship.length + row) > 10) {
                row = this.#chooseRandomCoordinates();
            }
        }

        result = this.placeShip({ row, column, type, direction });
        if (result === 'ship not placed') {
            this.placeShipRandom({ type, direction });
        }
        
        result = 'ship placed';
        return result;
    }

    //Takes coordinates and determines if the attack is a hit or a miss
    //Also lets the player know if they have sunk a ship
    receiveAttack(coordinates) {
        let row = coordinates.row;
        let column = coordinates.column;
        if (this.shots[row][column]) {
            return 'already chosen';
        }
        if (!this.grid[row][column]) {
            this.shots[row][column] = 'miss';
            return 'miss';
        } else {
            let attack = this.grid[row][column];
            for (const ship of this.ships) {
                if (ship.type === attack) {
                    ship.hit();
                    this.shots[row][column] = 'hit';
                    if (ship.isSunk()) {
                        return 'sunk';
                    }
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