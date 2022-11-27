import Ship from "../factories/Ship";

test('ship length', () => {
    const boat = new Ship(4);
    expect(boat.length).toBe(4);
});

test('minimum ship length is 2', () => {
    const boat = new Ship(1);
    expect(boat.length).toBe(2);
});

test('maximum ship length is 5', () => {
    const boat = new Ship(7);
    expect(boat.length).toBe(5);
});

test('hitting the boat returns array of hits', () => {
    const boat = new Ship(5);
    expect(boat.hit()).toBe(1);
});

test('boat sinks when times hit matches length', () => {
    const boat = new Ship(2);
    boat.hit();
    expect(boat.hit()).toBeTruthy();
})

test('can\'t hit boat more times than it\'s length', () => {
    const boat = new Ship(2);
    boat.hit();
    boat.hit();
    expect(boat.hit()).not.toBeTruthy();
});

test('isSunk returns true when hits matches length', () => {
    const boat = new Ship(2);
    boat.hit();
    boat.hit();
    expect(boat.isSunk()).toBeTruthy();
})

test('isSunk returns false when hits don\'t match length', () => {
    const boat = new Ship(2);
    expect(boat.isSunk()).not.toBeTruthy();
})