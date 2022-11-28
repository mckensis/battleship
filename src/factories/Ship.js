class Ship {

    //Private variables
    #sunk;
    #hits;

    constructor(length, type) {
        this.#hits = 0;
        this.#sunk = false;
        this.type = type;
        // Length can be in range 2 - 5 
        this.length = length > 5 ? 5 : length < 2 ? 2 : length;
    }

    //Private function
    #sink() {
        //console.log("ship has sank!");
        return this.#sunk = true;
    }

    //Increases number of hits on the ship
    hit() {
        if (this.#sunk) {
            //console.log('this ship has already sank');
            return;
        }
        if (this.#hits < this.length) {
            this.#hits++;
        }
        if (this.#hits === this.length) {
            this.#sink();
        }
        return this.#hits;
    }

    //Ship is sunk if number of hits matches length of ship
    isSunk() {
        console.log(this.#hits);
        return this.#hits === this.length ? true : false;
    }
}

//From Wikipedia:
//No.	Class of ship	Size
//1 	Carrier	        5
//2	    Battleship	    4
//3	    Destroyer	    3
//4	    Submarine	    3
//5	    Patrol Boat	    2

export default Ship;