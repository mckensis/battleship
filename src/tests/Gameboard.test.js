import Gameboard from "../factories/Gameboard";

test('creating a board', () => {
    const board = new Gameboard('Aidan');
    expect(board.player).toEqual('Aidan');
})

//Placing a ship on the board
test('placing a ship', () => {
    const board = new Gameboard('Aidan');
    expect(board.placeShip({ row: 3, column: 0, type: 'patrol', direction: 'horizontal' })).toEqual('ship placed');
})

//Can't overlap ships on the board
//The first ship will place but subsequent ships will not
test('overlapping ships', () => {
    const board = new Gameboard('Aidan');
    
    expect(board.placeShip({ row: 1, column: 2, type: 'carrier', direction: 'horizontal' })).toEqual('ship placed');
    expect(board.placeShip({ row: 1, column: 2, type: 'destroyer', direction: 'horizontal' })).toBe('ship not placed');
})

//Placing multiple ships across different rows on the grid
test('placing multiple ships', () => {
    const board = new Gameboard('Aidan');

    expect(board.placeShip({ row: 0, column: 0, type: 'carrier', direction: 'horizontal' })).toEqual('ship placed');
    expect(board.placeShip({ row: 1, column: 0, type: 'submarine', direction: 'horizontal' })).toEqual('ship placed');
    expect(board.placeShip({ row: 2, column: 0, type: 'patrol', direction: 'vertical' })).toEqual('ship placed');
})

//Receiving an attack that hits a ship will return 'hit'
test('receive an attack on the board that hits', () => {
    const board = new Gameboard('Aidan');

    board.placeShip({ row: 0, column: 0, type: 'carrier', direction: 'horizontal' });

    expect(board.receiveAttack({ row: 0, column: 1 })).toEqual('hit');
})

//Receiving an attack that misses will return 'miss'
test('receive an attack on the board that misses', () => {
    const board = new Gameboard('Aidan');

    board.placeShip({ row: 0, column: 0, type: 'carrier', direction: 'horizontal' });

    expect(board.receiveAttack({ row: 6, column: 4 })).toEqual('miss');
})

//Sinking all ships on the board returns true
test('all ships sunk', () => {
    const board = new Gameboard('Aidan');

    board.placeShip({ row: 0, column: 0, type: 'carrier', direction: 'horizontal'});
    board.placeShip({ row: 1, column: 0, type: 'battleship', direction: 'horizontal'});
    board.placeShip({ row: 2, column: 0, type: 'destroyer', direction: 'horizontal'});
    board.placeShip({ row: 3, column: 0, type: 'submarine', direction: 'horizontal'});
    board.placeShip({ row: 4, column: 0, type: 'patrol', direction: 'horizontal'});

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

test('place ships randomly', () => {
    const board = new Gameboard('Aidan');

    expect(board.placeShipRandom({ type: 'carrier', direction: 'vertical' })).toEqual('ship placed');
    expect(board.placeShipRandom({ type: 'battleship', direction: 'horizontal' })).toEqual('ship placed');
    expect(board.placeShipRandom({ type: 'destroyer', direction: 'horizontal' })).toEqual('ship placed');
    expect(board.placeShipRandom({ type: 'submarine', direction: 'horizontal' })).toEqual('ship placed');
    expect(board.placeShipRandom({ type: 'patrol', direction: 'horizontal' })).toEqual('ship placed');

    console.log(board.grid);
})