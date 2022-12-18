import Player from "../factories/Player";

function setEnemy() {
    //Create the enemy
    //Set up their ships
    let enemy = new Player('CPU');
    enemy.cpu = true;

    for (const ship of enemy.board.ships) {
        enemy.board.placeShipRandom({ type: ship.type });
    }

    return enemy;
}

export default setEnemy;