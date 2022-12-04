//Creates the board for the player
//If the cell has a boat in it, then colours the cell in
//TO DO: if it's creating the enemy's board then use the "shots" board rather than "grid"
function createBoard(player) {
    const element = document.createElement('div');
    element.classList.add('board');
    for (let rows = 0; rows < 10; rows++) {
        for (let columns = 0; columns < 10; columns++) {
            const div = document.createElement('div');
            div.classList.add(`R${rows}`)
            div.classList.add(`C${columns}`);

            //If the cell in the player's board has a boat in it then style the cell accordingly
            if (player.board.grid[rows][columns]) {
                div.style.backgroundColor = 'var(--darkpurple)';
            }
            element.appendChild(div);
        }
    }
    return element;
}

export default createBoard;