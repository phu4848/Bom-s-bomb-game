const rows = 8;
const cols = 8;
const minesCount = 10;
let mines = [];
let board = [];

function initBoard() {
    board = Array(rows).fill().map(() => Array(cols).fill(0));
    mines = [];
    
    // Place mines
    while (mines.length < minesCount) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (!mines.some(m => m.r === r && m.c === c)) {
            mines.push({ r, c });
            board[r][c] = -1; // -1 represents a mine
            updateNeighborCounts(r, c);
        }
    }
}

function updateNeighborCounts(r, c) {
    for (let i = r - 1; i <= r + 1; i++) {
        for (let j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < rows && j >= 0 && j < cols && board[i][j] !== -1) {
                board[i][j]++;
            }
        }
    }
}

function revealCell(r, c) {
    const cell = document.getElementById(`cell-${r}-${c}`);
    if (cell.classList.contains('revealed') || cell.classList.contains('mine')) {
        return;
    }

    cell.classList.add('revealed');
    if (board[r][c] === -1) {
        cell.classList.add('mine');
        gameOver();
    } else if (board[r][c] === 0) {
        cell.classList.add('zero');
        for (let i = r - 1; i <= r + 1; i++) {
            for (let j = c - 1; j <= c + 1; j++) {
                if (i >= 0 && i < rows && j >= 0 && j < cols) {
                    revealCell(i, j);
                }
            }
        }
    } else {
        cell.textContent = board[r][c];
    }
}

function gameOver() {
    mines.forEach(mine => {
        const cell = document.getElementById(`cell-${mine.r}-${mine.c}`);
        cell.classList.add('mine');
    });
    alert("Game Over");
}

function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.id = `cell-${r}-${c}`;
            cell.className = 'cell';
            cell.addEventListener('click', () => revealCell(r, c));
            boardElement.appendChild(cell);
        }
    }
}

function restartGame() {
    initBoard();
    createBoard();
}

initBoard();
createBoard();
