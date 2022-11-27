import Gameboard from "../factories/Gameboard";
import Ship from "../factories/Ship";

//Testing returns false
test('ships are not all sunk', () => {
    const board = new Gameboard('a');
    expect(board.allSunk()).not.toBeTruthy();
})

//Placing a ship on the board
test('place a ship', () => {
    const board = new Gameboard('a');
    board.placeShip({ horizontal: 'A', vertical: '3'});
})

//Can't overlap ships on the board
//The first ship will place but subsequent ships will not
test('overlap a ship', () => {
    const board = new Gameboard('a');

    board.placeShip({ horizontal: 'B', vertical: '3'});
    board.placeShip({ horizontal: 'A', vertical: '3'});
    board.placeShip({ horizontal: 'C', vertical: '3'});

    console.log(board.ships);
    
    expect(board.placements.patrol).toEqual(['B3', 'C3', 'D3', 'E3', 'F3']);
})