class Ship {
    #sunk = Boolean;
    #hits = Number;

    constructor(length, type) {
        this.#hits = 0;
        this.#sunk = false;
        this.type = type;
        this.placed = false;
        // Length can be in range 2 - 5 
        this.length = length > 5 ? 5 : length < 2 ? 2 : length;
    }

    //Find out if the ship has sunk    
    #sink() {
        return this.#sunk = true;
    }

    //Increases number of hits on the ship
    hit() {
        if (this.#sunk) {
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
        return this.#hits === this.length ? true : false;
    }
}

export default Ship;