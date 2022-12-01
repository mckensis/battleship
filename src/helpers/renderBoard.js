function renderBoard(board) {
    const element = document.querySelector('.activePlayer');
    for (let rows = 0; rows < 10; rows++) {
        for (let columns = 0; columns < 10; columns++) {
            const div = document.createElement('div');
            div.classList.add(`row:${rows}`,`column${columns}`);
            element.appendChild(div);
        }
    }
    element.style.display = 'grid';
}

export default renderBoard;