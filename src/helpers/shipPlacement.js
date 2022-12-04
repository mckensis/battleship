//Places each of the player's ships into their own board
function placeShips(ships, player) {

    let temp = [];
    //Getting the proposed locations of the ships
    //Taking the ships object and getting the coordinates and ship type from it
    for (const key in ships) {
        if (ships.hasOwnProperty(key)) {
            for (const k in ships[key]) {
                temp.push(ships[key][k]);
            }
        }
    }

    //Removing each ship from the temp array and placing the ship into the player's board
    while(temp.length > 0) {
        let boatType = temp.shift();
        let direction = temp.shift();
        let coords = temp.shift();
        player.board.placeShip({ row: coords[0], column: coords[1], type: boatType, direction });
    }
}

//Handles placing all ships into the player's board
//Using data from the starting form
function shipPlacement(player, ships) {
    placeShips(ships, player);
    for (const ship of player.board.ships) {
        if (!ship.placed) return ship.type;
    }
    return 'All Ships Placed!';
}

export default shipPlacement;