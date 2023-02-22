class Player {
  constructor(name, token, board, isHuman) {
    this.name = name;
    this.token = token;
    this.board = board;
    this.isHuman = isHuman;
  }

  makeMove(column) {
    // TODO: make a move in the specified column
  }
}

//define Human Player class
class HumanPlayer extends Player {
  constructor(name, token, board) {
    super(name,token,board,true);
  }
}

//define computer Player class
class ComputerPlayer extends Player{
  constructor(name,token,board) {
    super(name,token,board,false);
  }

  getMove() {
    const validMoves = this.board.getValidMoves();
    
    // play a random valid move
    const move = validMoves[Math.floor(Math.random() * validMoves.length)];
    // this.board.dropToken(move, this.token);
    return move;
  }
}

