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

const init = () => {
    renderBoard();
    renderNumPad();
}

const renderBoard = () => {
    const board = document.getElementById('board')
    board.innerHTML = '';
    for (let i = 0; i < state.board.length; i++) {
        const cell = document.createElement('div')
        cell.className = 'cell';
        cell.innerHTML = '';
        cell.addEventListener('click', () => {
            console.log(state.board[i])
            if (state.board[i] === 0) {
                state.board[i] = keyboardNumberInput();
                renderBoard();
            }
        })
        board.appendChild(cell);
    }
}

const renderNumPad = () => {
    const numPad = document.getElementById('numPad');
    numPad.innerHTML = ''
    for (let i = 1; i <= 9; i++) {
        const button = document.createElement('button');
        button.className = 'numPadButton';
        button.innerHTML = i;
        button.addEventListener('click', () => {
            const index = state.board.indexOf(0)
            if (index !== -1) {
                state.board[index] = i
                renderBoard();
            }
        })
        numPad.appendChild(button);
    }
}

const keyboardNumberInput = (event) => {
    const number = event.key
    if (number >= 1 && number <= 9) {
        const index = state.board.indexOf(0)
        if (index !== -1) {
            state.board[index] = parseInt(number)
            renderBoard()
        }
    }
}

init();