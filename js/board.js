/**
*  this file defines game board 
**/
class Board {

  constructor(rowNum,colNum) {
    this.row=rowNum;
    this.col=colNum;
    this.grid = [];
    for (let i = 0; i < this.row; i++) {
      this.grid.push(new Array(this.col).fill(null));
    }
  }

  /**
   * Returns true if the board is full, false otherwise.
   */
  isFull() {
    for (let col = 0; col < this.col; col++) {
      if (this.grid[0][col] === null) {
        return false;
      }
    }
    return true;
  }

  // Check if the column is full
  isValidMove(col) {
    return this.grid[0][col] === null;
  }

  // Update the board with a new move
  dropToken(col, color) {
    if (this.grid[0][col] !== null) {
      return false;
    }
    for (let i = 5; i >= 0; i--) {
      if (this.grid[i][col] === null) {
        this.grid[i][col] = color;
        return true;
      }
    }
    return false;
  }

  /**
   * Returns the color of the token at the given row and column.
   * Returns null if there is no token at that location.
   */
  getToken(row, col) {
    return this.grid[row][col];
  }

  // get the valid moves for the current board state
  getValidMoves() {
    const validMoves = [];
    for (let col = 0; col < this.col; col++) {
      if (this.grid[0][col] === null) {
        validMoves.push(col);
      }
    }
    return validMoves;
  }

 //get the first empty row in a given column
 getEmptyRow(col) {
    for (let i = this.row - 1; i >= 0; i--) {
      if (this.grid[i][col] === null) {
        return i;
      }
    }

    return null;
  }

  // Check if the game has a winner
  checkWinner() {
    // Check horizontal
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.grid[row][col] !== null &&
          this.grid[row][col] === this.grid[row][col+1] &&
          this.grid[row][col] === this.grid[row][col+2] &&
          this.grid[row][col] === this.grid[row][col+3]) {
          return this.grid[row][col];
        }
      }
    }

    // Check vertical
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        if (this.grid[row][col] !== null &&
          this.grid[row][col] === this.grid[row+1][col] &&
          this.grid[row][col] === this.grid[row+2][col] &&
          this.grid[row][col] === this.grid[row+3][col]) {
          return this.grid[row][col];
        }
      }
    }

    // Check diagonal
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.grid[row][col] !== null &&
          this.grid[row][col] === this.grid[row+1][col+1] &&
          this.grid[row][col] === this.grid[row+2][col+2] &&
          this.grid[row][col] === this.grid[row+3][col+3]) {
          return this.grid[row][col];
        }
      }
    }

    // Check reverse diagonal
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.grid[row][col] !== null &&
          this.grid[row][col] === this.grid[row-1][col+1] &&
          this.grid[row][col] === this.grid[row-2][col+2] &&
          this.grid[row][col] === this.grid[row-3][col+3]) {
          return this.grid[row][col];
        }
      }
    }

    // Check for a tie
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (this.grid[row][col] === null) {
          return null;
        }
      }
    }

    return "tie";
  }

  /**
   * Returns true if the given color has a four-in-a-row on the board, false otherwise.
   */
  hasFourInARow(color) {
    // Check for horizontal win
    for (let row = 0; row < this.row; row++) {
      for (let col = 0; col < this.col - 3; col++) {
        if (this.grid[row][col] === color &&
            this.grid[row][col+1] === color &&
            this.grid[row][col+2] === color &&
            this.grid[row][col+3] === color) {
          return true;
        }
      }
    }

    // Check for vertical win
    for (let row = 0; row < this.row - 3; row++) {
      for (let col = 0; col < this.col; col++) {
        if (this.grid[row][col] === color &&
            this.grid[row+1][col] === color &&
            this.grid[row+2][col] === color &&
            this.grid[row+3][col] === color) {
          return true;
        }
      }
    }

    // Check for diagonal win (bottom-left to top-right)
    for (let row = 3; row < this.row; row++) {
      for (let col = 0; col < this.col - 3; col++) {
        if (this.grid[row][col] === color &&
            this.grid[row-1][col+1] === color &&
            this.grid[row-2][col+2] === color &&
            this.grid[row-3][col+3] === color) {
          return true;
        }
      }
    }

    // Check for diagonal win (top-left to bottom-right)
    for (let row = 0; row < this.row - 3; row++) {
      for (let col = 0; col < this.col - 3; col++) {
        if (this.grid[row][col] === color &&
            this.grid[row+1][col+1] === color &&
            this.grid[row+2][col+2] === color &&
            this.grid[row+3][col+3] === color) {
          return true;
        }
      }
    }

    return false;
  }

}
