const assert = require('assert');
const Game = require('./game.js');
const Board = require('./board.js');
const HumanPlayer = require('./player.js');

// Test case for checking if the game is initialized correctly
describe('Game initialization', function () {
  it('Should create a new game object with all properties initialized', function () {
    const game = new Game();
    assert.equal(game.row, 6);
    assert.equal(game.col, 7);
    assert.deepEqual(game.board, new Board(game.row, game.col));
    assert.deepEqual(game.players, [new HumanPlayer('Player 1', 'red', game.board), new ComputerPlayer('Player 2', 'yellow', game.board)]);
    assert.equal(game.currentPlayerIndex, 0);
    assert.equal(game.isGameOver, false);
    assert.equal(game.winner, null);
    assert.equal(game.gameResult, null);
  });
});

// Test case for checking if the game status is updated correctly after a move is made
describe('Playing a step in the game', function () {
  it('Should update the game status after a step is played', function () {
    const game = new Game();
    const currentPlayer = game.getCurrentUser();
    const move = currentPlayer.getMove(); // For testing, let's assume the current player's move is column 0
    game.playStep(move);
    assert.equal(game.isGameOver, false); // Game should not be over after a single move
    assert.equal(game.currentPlayerIndex, 1); // The current player should be the second player after the first move
  });
});

// Test case for checking if the game correctly identifies the winner
describe('Checking for a winner', function () {
  it('Should correctly identify the winner', function () {
    const game = new Game();
    game.board.dropToken(0, 'red');
    game.board.dropToken(1, 'red');
    game.board.dropToken(2, 'red');
    game.board.dropToken(3, 'red');
    game.checkGameStatus();
    assert.equal(game.isGameOver, true);
    assert.equal(game.winner.name, 'Player 1');
  });
});

// Test case for checking if the game correctly identifies a tie
describe('Checking for a tie', function () {
  it('Should correctly identify a tie', function () {
    const game = new Game();
    game.board.dropToken(0, 'red');
    game.board.dropToken(1, 'yellow');
    game.board.dropToken(2, 'red');
    game.board.dropToken(3, 'yellow');
    game.board.dropToken(4, 'yellow');
    game.board.dropToken(5, 'red');
    game.board.dropToken(6, 'red');
    game.board.dropToken(0, 'yellow');
    game.board.dropToken(1, 'red');
    game.board.dropToken(2, 'yellow');
    game.board.dropToken(3, 'red');
    game.board.dropToken(4, 'red');
    game.board.dropToken(5, 'yellow');
    game.board.dropToken(6, 'yellow');
    game.checkGameStatus();
    assert.equal(game.isGameOver, true);
    assert.equal(game.gameResult, "It's a tie!");
  });
});

