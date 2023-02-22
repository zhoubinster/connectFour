/**
  *This file mainly defines view logic and is used for page interaction.
**/

// Define variables to represent the game 
let game = null;

// Define a function to initialize the game
function initGame() {
  game = new Game();
}

// Define a function to render the game board to the screen
function renderBoard() {
  const boardEl = document.getElementById("board");
  boardEl.innerHTML = null;
  const table = document.createElement("table");
  table.classList.add("table");
  boardEl.appendChild(table);
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  //add table head
  const thead = document.createElement("thead");
  const rowHead = document.createElement("tr");
  thead.appendChild(rowHead);
  for (let i = 0; i < game.board.col; i++) {
    const cellEl = document.createElement("th");
    cellEl.setAttribute("data-col", i);
    cellEl.addEventListener("click", handleCellClick);
    cellEl.innerHTML=i+1;
    rowHead.appendChild(cellEl);
  }
  table.appendChild(thead);


  //create table body
  for (let i = 0; i < game.board.row; i++) {
    const rowEl = document.createElement("tr");

    for (let j = 0; j < game.board.col; j++) {
      const cellEl = document.createElement("td");
      cellEl.innerHTML="A";
      cellEl.setAttribute("data-row", i);
      cellEl.setAttribute("data-col", j);
      cellEl.classList.add(getCellStyle(game.board.grid[i][j]));
      
      rowEl.appendChild(cellEl);
    }

    tbody.appendChild(rowEl);
  }
}

function renderHint(msg) {
  const hintArea = document.getElementById("hintArea");
  hintArea.innerHTML=msg;
}

// Define a function to handle a cell click event
function handleCellClick(event) {
  const col = event.target.getAttribute("data-col");
  renderHint("Current user is:"+game.getCurrentUser().name+".Last column is:"+col);
  if (!game.board.isValidMove(col)) {
    alert("not valid move");
    return;
  }

  const gameOver = game.playStep(col);
  if (gameOver) {
    alert(game.gameResult);
    renderHint(game.gameResult);
  } 

  renderBoard(); 
}

//get cell class according to user's token
function getCellStyle(token) {
  if (token === "red") {
    return "token-red";
  } else if (token === "yellow") {
    return "token-yellow";
  } else {
    return "token-default";
  }
}


function initialize() {
  initGame();
  renderBoard();
}

// Initialize the game and render it to the screen
initialize();
