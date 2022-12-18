//Creates a 10 x 10 grid for the gameboard's shots, grid, and temp arrays to use
function createGrid() {

    let grid = [...Array(10)].map(e => Array(10));
    
    return grid;
}

export default createGrid;