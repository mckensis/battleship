import Player from "../factories/Player";

test('creating a player', () => {
    const playerOne = new Player('Aidan');
    expect(playerOne.name).toBe('Aidan');
});

test('creating a cpu player', () => {
    const playerTwo = new Player('CPU');
    playerTwo.cpu = true;

    expect(playerTwo.name).toBe('CPU');
    expect(playerTwo.cpu).toBeTruthy();
});

test('attacking the enemy and hitting', () => {
    const playerOne = new Player('Aidan');
    const playerTwo = new Player('CPU');

    playerTwo.board.placeShip({ row: 0, column: 0, type: 'carrier' });

    expect(playerOne.attackEnemy(playerTwo, { row: 0, column: 4 })).toBe('hit');
});

test('attacking the enemy and missing', () => {
    const playerOne = new Player('Aidan');
    const playerTwo = new Player('CPU');

    playerTwo.board.placeShip({ row: 0, column: 0, type: 'carrier' });

    expect(playerOne.attackEnemy(playerTwo, { row: 1, column: 0 })).toBe('miss');
});

test('choose random coordinates', () => {
    const playerOne = new Player('Aidan');
    const playerTwo = new Player('CPU');

    playerOne.board.placeShip({ row: 0, column: 0, type: 'carrier' });

    let coordinates = playerTwo.chooseRandomCoordinates(playerOne);

    expect(coordinates.row).toBeGreaterThanOrEqual(0);   
    expect(coordinates.row).toBeLessThanOrEqual(10);
    expect(coordinates.column).toBeGreaterThanOrEqual(0);    
    expect(coordinates.column).toBeLessThanOrEqual(10);
});

test('choose random coordinates then attack', () => {
    const playerOne = new Player('Aidan');
    const playerTwo = new Player('CPU');

    playerOne.board.placeShip({ row: 0, column: 0, type: 'carrier' });

    expect(playerTwo.attackEnemy(playerOne, playerTwo.chooseRandomCoordinates(playerOne))).not.toBe(undefined);
})