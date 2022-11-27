import Ship from "./Ship";

/* 
GAMEBOARD CLASS - 
    placeShip function -

    receiveAttack function -
        takes a pair of coordinates
        (horitzontal (letter) then vertical (number))

        (
            to get end coords of ship
            initialLetter = ship.
            old number = String.charCodeAt(letter)
            new letter String.fromCharCode(old number + ship.length))
        )
*/

class Gameboard {
    constructor(player) {
        this.player = player;
        //Gameboards should keep track of missed attacks so they can display them properly.
        this.misses = [];
        this.ships = [];
        this.placements = {
            carrier: [],
            battleship: [],
            destroyer: [],
            submarine: [],
            patrol: [],
        };
    }

    //Checks that there isn't already a boat on the chosen coordinates
    checkOverlap(temp) {
        let allPlacements = [];
        for (const [key, value] of Object.entries(this.placements)) {
            for (let i = 0; i < value.length; i++) {
                allPlacements.push(value[i]);
            }
        }
        return temp.some(item => allPlacements.includes(item));
    }

    //Creates the five boats for the game
    createBoats() {
        const carrier = new Ship(5);
        const battleship = new Ship(4);
        const destroyer = new Ship(3);
        const submarine = new Ship(3);
        const patrol = new Ship(2);
    }

    //Creates an array that will contain every grid space that the passed in boat will cover
    createAllCoordinates(data) {
        let temp = [];

        for (let i = 0; i < data.boat.length; i++) {
            let letterCode = data.coordinates.horizontal.charCodeAt(0);
            let horizontal = String.fromCharCode(letterCode + i);
            let vertical = data.coordinates.vertical;
            temp.push(`${horizontal}${vertical}`);
            if (this.checkOverlap(temp)) {
                return;
            }
        }
        return temp;
    }

    //Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
    //TO - DO: pass in a boat to placeShip so that it's position can be chosen
    //Right now it's hard coded
    //TO - DO: should be able to rotate boat and place vertically
    placeShip(data) {
        const patrolBoat = new Ship(5);
        this.ships.push(patrolBoat);
        let tempCoordinates = this.createAllCoordinates({ boat: patrolBoat, coordinates: data });

        if (tempCoordinates) {
            for (const item of tempCoordinates) {
                this.placements.patrol.push(item);
            }
        }
    }

    //Gameboards should have a receiveAttack function that takes a pair of coordinates,
    //determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship,
    //or records the coordinates of the missed shot.
    receiveAttack(coordinates) {
        if (!this.checkOverlap()) {
            this.misses.push(coordinates);
            return;
        }
    }

    //Report whether or not all of the gameboard's ships have been sunk.
    allSunk() {
        for (const ship of this.ships) {
            if (!this.ship.isSunk()) {
                return false;
            }
            return true;
        }
    }
}

export default Gameboard;