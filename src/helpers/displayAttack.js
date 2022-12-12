//Helps the CPU find the cell they are attacking
function cellLookup(data) {
    for (const cell of data.board) {
        if (cell.classList.contains(`R${data.row}`)) {
            if (cell.classList.contains(`C${data.column}`)) {
                return cell;
            }
        }
    }
}

//Display the player's attack on the DOM
function displayAttack(data) {
    //Get the enemy's board
    const board = data.enemyBoard;

    //Get the cell where the attack will be displayed
    const row = data.coordinates.row;
    const column = data.coordinates.column;
    const cell = cellLookup({ board, row, column });

    //Style the cell for either a hit or a miss
    if (data.result === 'miss') {
        cell.classList.add('missed');
    }
    if (data.result === 'hit') {
        cell.classList.add('hit');
    }
}

export default displayAttack;