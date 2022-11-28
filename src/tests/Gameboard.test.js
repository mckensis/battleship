import Gameboard from "../factories/Gameboard";

test('creating a board', () => {
    const board = new Gameboard('Aidan');
    expect(board.player).toEqual('Aidan');
});

//Placing a ship on the board
test('placing a ship', () => {
    const board = new Gameboard('Aidan');
    expect(board.placeShip({ row: 3, column: 0, type: 'patrol'})).toEqual('ship placed');
})

//Can't overlap ships on the board
//The first ship will place but subsequent ships will not
test('overlapping ships', () => {
    const board = new Gameboard('Aidan');
    
    expect(board.placeShip({ row: 1, column: 2, type: 'carrier' })).toEqual('ship placed');
    expect(board.placeShip({ row: 1, column: 2, type: 'destroyer' })).toBe(null);
})

//Placing multiple ships across different rows on the grid
test('placing multiple ships', () => {
    const board = new Gameboard('Aidan');

    expect(board.placeShip({ row: 0, column: 0, type: 'carrier' })).toEqual('ship placed');
    expect(board.placeShip({ row: 1, column: 0, type: 'submarine' })).toEqual('ship placed');
    expect(board.placeShip({ row: 2, column: 0, type: 'patrol' })).toEqual('ship placed');
})

test('receive an attack on the board that hits', () => {
    const board = new Gameboard('Aidan');

    board.placeShip({ row: 0, column: 0, type: 'carrier' });

    expect(board.receiveAttack({ row: 0, column: 1 })).toEqual('hit');
})

test('receive an attack on the board that misses', () => {
    const board = new Gameboard('Aidan');

    board.placeShip({ row: 0, column: 0, type: 'carrier' });

    expect(board.receiveAttack({ row: 6, column: 4 })).toEqual('miss');
})

test('all ships sunk', () => {
    const board = new Gameboard('Aidan');

    board.placeShip({ row: 0, column: 0, type: 'carrier'});
    board.placeShip({ row: 1, column: 0, type: 'battleship'});
    board.placeShip({ row: 2, column: 0, type: 'destroyer'});
    board.placeShip({ row: 3, column: 0, type: 'submarine'});
    board.placeShip({ row: 4, column: 0, type: 'patrol'});

    board.receiveAttack({ row: 0, column: 0 });
    board.receiveAttack({ row: 0, column: 1 });
    board.receiveAttack({ row: 0, column: 2 });
    board.receiveAttack({ row: 0, column: 3 });
    board.receiveAttack({ row: 0, column: 4 });

    board.receiveAttack({ row: 1, column: 0 });
    board.receiveAttack({ row: 1, column: 1 });
    board.receiveAttack({ row: 1, column: 2 });
    board.receiveAttack({ row: 1, column: 3 });

    board.receiveAttack({ row: 2, column: 0 });
    board.receiveAttack({ row: 2, column: 1 });
    board.receiveAttack({ row: 2, column: 2 });

    board.receiveAttack({ row: 3, column: 0 });
    board.receiveAttack({ row: 3, column: 1 });
    board.receiveAttack({ row: 3, column: 2 });

    board.receiveAttack({ row: 4, column: 0 });
    board.receiveAttack({ row: 4, column: 1 });

    expect(board.allSunk()).toBeTruthy();
})