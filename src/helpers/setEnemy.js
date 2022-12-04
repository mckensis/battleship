import Player from "../factories/Player";

function setEnemy() {
    //Create the enemy
    //Set up their ships
    let enemy = new Player('CPU');
    enemy.cpu = true;

    for (const ship of enemy.board.ships) {
        let type = ship.type;
        enemy.board.placeShipRandom({ type });
    }

    return enemy;
}

export default setEnemy;