const state = {
    board: [ 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0 ]
}

let selectedCell = null;

const init = () => {
    renderBoard();
    renderNumPad();
}

const renderBoard = () => {
    const board = document.getElementById('board')
    board.innerHTML = '';
    state.board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.innerHTML = cell === 0 ? '' : cell;
        cellElement.addEventListener('click', () => {
            selectedCell = index;
        })
        board.appendChild(cellElement);
    });
}

const renderNumPad = () => {
    const numPad = document.getElementById('numPad');
    numPad.innerHTML = ''
    for (let i = 1; i <= 9; i++) {
        const button = document.createElement('button');
        button.className = 'numPadButton';
        button.innerHTML = i;
        button.addEventListener('click', () => {
            if (selectedCell !== null) {
                state.board[selectedCell] = i;
                renderBoard();
            }
        })
        numPad.appendChild(button);
    }
}

init();