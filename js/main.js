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
const board = document.getElementById('board')

const init = () => {
    fillBoard();
    renderBoard();
    renderNumPad();
}

const renderBoard = () => {
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

const fillBoard = () => {
    for (let i = 0; i < 81; i++) {
        if (state.board[i] === 0) {
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            shuffle(numbers); // Shuffle the numbers 1-9
            let numberFound = false;
            for (const number of numbers) {
                if (isRowValid(Math.floor(i / 9), number) && isColumnValid(i % 9, number) && isBoxValid(Math.floor(i / 27) * 3 + Math.floor((i % 9) / 3), number)) {
                    state.board[i] = number;
                    numberFound = true;
                    break; // Break out of the loop after finding a valid number
                }
            }
            if (!numberFound) {
                state.board[i] = 0; // Reset the cell to 0 if no valid number is found
            }
        }
    }
}

// Function to shuffle an array using the Fisher-Yates algorithm
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
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
            if (selectedCell !== null) {
                state.board[selectedCell] = i;
                renderBoard();
            }
        })
        numPad.appendChild(button);
    }
}

const isRowValid = (cellIndex, number) => {
    const row = Math.floor(cellIndex / 9);
    for (let i = row * 9; i < (row + 1) * 9; i++) {
        if (state.board[i] === number) {
            return false;
        }
    }
    return true;
};

const isColumnValid = (cellIndex, number) => {
    const column = cellIndex % 9;
    for (let i = column; i < 81; i += 9) {
        if (state.board[i] === number) {
            return false;
        }
    }
    return true;
};

const isBoxValid = (cellIndex, number) => {
    const startRow = Math.floor(cellIndex / 27) * 3;
    const startColumn = Math.floor((cellIndex % 9) / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const index = (startRow + i) * 9 + startColumn + j;
            if (state.board[index] === number) {
                return false;
            }
        }
    }
    return true;
};

init();