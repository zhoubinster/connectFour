//This class defines game business logic
class Game {
  constructor() {
    // board row
    this.row = 6;
    // board col
    this.col = 7;
    this.board = new Board(this.row,this.col);
    this.players = this.createUsers();
    this.currentPlayerIndex = 0;
    this.isGameOver = false;
    this.winner = null;
    this.gameResult = null;
  }

  //game go-on
  playStep(col) {
    if (this.isGameOver) {
      return this.isGameOver;
    }
    const currentPlayer = this.players[this.currentPlayerIndex];
    this.board.dropToken(col, currentPlayer.token);
    this.checkGameStatus();
    if (this.isGameOver) {
      return this.isGameOver;
    }
    //switch users
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    const newCurrentPlayer = this.players[this.currentPlayerIndex];
    if (!newCurrentPlayer.isHuman) {
      const move = newCurrentPlayer.getMove();
      return this.playStep(move);
    }
    return this.isGameOver;
  }

  //Check Game Status 
  checkGameStatus(){
    const currentPlayer = this.players[this.currentPlayerIndex];
    if (this.board.hasFourInARow(currentPlayer.token)) {
      this.winner = currentPlayer;
      this.gameResult = "game over.winner is:"+currentPlayer.name;
      this.isGameOver = true;
    } else if (this.board.isFull()) {
      console.log("It's a tie!");
      this.isGameOver = true;
      this.gameResult = "It's a tie!";
    } 
  }

  getCurrentUser() {
    return this.players[this.currentPlayerIndex];
  }

  //create users.mode:1."default" -- human to computer;
  createUsers(mode) {
    return [new HumanPlayer('Player 1', 'red',this.board), new ComputerPlayer('Player 2', 'yellow',this.board)];
  }

}