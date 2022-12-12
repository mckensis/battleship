function chooseCell(board) {
    board.forEach(cell => {
        cell.addEventListener('click', () => {
            return cell;
        });
    });
}

export default chooseCell;