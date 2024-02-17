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
    let emptyCells = findEmptyCells(); // Find all empty cells initially
    let attempts = 0; // Track the number of attempts
    const maxAttempts = 30000; // Maximum attempts before breaking out of the loop
    while (emptyCells.length > 0 && attempts < maxAttempts) { // Continue filling until there are no empty cells or max attempts reached
        attempts++;
        emptyCells.forEach(cellIndex => {
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            shuffle(numbers); // Shuffle the numbers 1-9
            let numberFound = false;
            const row = Math.floor(cellIndex / 9); // Calculate the row index
            const column = cellIndex % 9; // Calculate the column index
            for (const number of numbers) {
                if (isRowValid(row, number) && isColumnValid(column, number) && isBoxValid(cellIndex, number))  {
                    state.board[cellIndex] = number; // Update the correct cell
                    numberFound = true;
                    break; // Break out of the loop after finding a valid number
                }
            }
            if (!numberFound) {
                state.board[cellIndex] = 0; // Reset the cell to 0 if no valid number is found
            }
        });
        emptyCells = findEmptyCells(); // Update the list of empty cells
    }
}


const findEmptyCells = () => {
    const emptyCells = [];
    state.board.forEach((cell, index) => {
        if (cell === 0) {
            emptyCells.push(index);
        }
    });
    return emptyCells;
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

const isRowValid = (rowIndex, number) => {
    for (let i = 0; i < 9; i++) {
        const cellIndex = rowIndex * 9 + i;
        if (state.board[cellIndex] === number) {
            return false;
        }
    }
    return true;
};


const isColumnValid = (columnIndex, number) => {
    for (let i = 0; i < 9; i++) {
        const cellIndex = columnIndex + i * 9;
        if (state.board[cellIndex] === number) {
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