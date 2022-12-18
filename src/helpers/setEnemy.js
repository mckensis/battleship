import Player from "../factories/Player";

//Create the enemy and set up their ships
function setEnemy() {
    let enemy = new Player('CPU');
    enemy.cpu = true;

    for (const ship of enemy.board.ships) {
        enemy.board.placeShipRandom({ type: ship.type });
    }
    return enemy;
}

export default setEnemy;