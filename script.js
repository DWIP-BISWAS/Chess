const boardElement = document.getElementById('chessboard');
const statusElement = document.getElementById('status');

let board = [];
let selectedSquare = null;
let currentPlayer = 'white';

// Initialize the chessboard
function initBoard() {
    const initialSetup = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ];

    board = initialSetup.map(row => row.slice());
    renderBoard();
}

// Render the chessboard
function renderBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = 'square ' + ((row + col) % 2 === 0 ? 'light' : 'dark');
            square.dataset.row = row;
            square.dataset.col = col;

            if (board[row][col]) {
                square.textContent = board[row][col];
            }

            square.addEventListener('click', handleSquareClick);
            boardElement.appendChild(square);
        }
    }
    updateStatus();
}

// Handle square click
function handleSquareClick(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (selectedSquare) {
        // Move the piece if the square is valid
        const fromRow = selectedSquare.row;
        const fromCol = selectedSquare.col;
        if (isValidMove(fromRow, fromCol, row, col)) {
            // Move piece
            board[row][col] = board[fromRow][fromCol];
            board[fromRow][fromCol] = null;
            selectedSquare = null;
            currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
        } else {
            // Invalid move, deselect
            selectedSquare = null;
        }
    } else {
        // Select the piece
        if (board[row][col] && isCurrentPlayerPiece(row, col)) {
            selectedSquare = { row, col };
        }
    }
    renderBoard();
}

// Check if the move is valid (basic validation)
function isValidMove(fromRow, fromCol, toRow, toCol) {
    // Basic validation: check if the destination is empty or occupied by an opponent
    const piece = board
	[fromRow][fromCol]; const opponent = piece.toUpperCase() === piece ? 'black' : 'white'; return board[toRow][toCol] === null || board[toRow][toCol].toUpperCase() === opponent; }

// Check if the piece belongs to the current player function isCurrentPlayerPiece(row, col) { const piece = board[row][col]; return piece && piece.toUpperCase() === piece ? currentPlayer === 'white' : currentPlayer === 'black'; }
// Update the game status function updateStatus() { statusElement.textContent = Current turn: ${currentPlayer.toUpperCase()}; }

initBoard();
