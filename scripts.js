const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  function getBoard() {
    return board;
  }

  function placeMarker(index, marker) {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  }

  function checkWinner(marker) {
    const winPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    return winPattern.find((pattern) =>
      pattern.every((index) => board[index] == marker)
    );
  }

  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
  }

  function draw() {
    return !board.includes("");
  }

  return {
    getBoard,
    placeMarker,
    checkWinner,
    resetBoard,
    draw,
  };
})();

const createPlayer = function (marker, name) {
  let score = 0;

  const addScore = () => score++;
  const getScore = () => score;
  const resetScore = () => score = 0;
  const getMarker = () => marker;
  const getName = () => name;

  return {
    addScore,
    getScore,
    getMarker,
    getName,
    resetScore,
  };
};

const gameLogic = (function () {
  let playerOne ;
  let playerTwo;
  let currentPlayer ;

  
  function setPlayers(pOne,pTwo){
   
    playerOne = createPlayer("X", pOne);
    playerTwo = createPlayer("O", pTwo);
    currentPlayer = playerOne;
    // displayController.displayScore()
    
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  }

  function getTurn(index) {
    if (gameBoard.placeMarker(index, currentPlayer.getMarker())) {
      console.log(
        `${currentPlayer.getName()} placed ${currentPlayer.getMarker()} at ${index}`
      );
      if (gameBoard.checkWinner(currentPlayer.getMarker())) {
        currentPlayer.addScore();
        console.log(`${currentPlayer.getName()} wins the round!`);
        console.log(`${currentPlayer.getScore()} wins the round!`);
      } else if (gameBoard.draw()) {
        // gameBoard.resetBoard()
        console.log(`This round is a draw!`);
      } else {
        switchPlayer();
      }
      return true;
    } else {
      console.log("Position already taken! Try again...");
      return false;
    }
  }

  function resetGame() {
    gameBoard.resetBoard();
   
  }
  function playerTurn() {
    return currentPlayer;
  }
  function getPlayers() {
    return { playerOne, playerTwo };
  }
  return { getTurn, resetGame, playerTurn, getPlayers, setPlayers };
})();

const getElements = () => ({
  container: document.querySelector('.container'),
  //

  startButton: document.getElementById("startGame"),
  form: document.getElementById("gameForm"),


  // 
  startPrompt: document.querySelector(".start-prompt"),
  //
  boardContainer: document.querySelector(".board-container"),
  showText: document.querySelector(".show-text"),
  boardUi: document.querySelector(".board"),
  //

  playerOneName: document.getElementById("playerOneName"),
  playerOneScore: document.getElementById("playerOneScore"),
  playerTwoName: document.getElementById("playerTwoName"),
  playerTwoScore: document.getElementById("playerTwoScore"),
  //
  playerOneDetails: document.querySelector(".p1"),
  playerTwoDetails: document.querySelector(".p2"),
  //
  gameOverDiv: document.querySelector(".game-over"),
  //
  restartButton: document.querySelector(".restart"),
});

const displayController = {
  displayPrompt: function () {
    const elements = getElements()
    const startPrompt = elements.startPrompt;
    const form = elements.form
    const boardContainer = elements.boardContainer;
    const gameOverDiv = elements.gameOverDiv;

    boardContainer.classList.add("hidden");
    
   
    form.addEventListener('submit', (event)=>{
      event.preventDefault(); // Prevent page reload

      const formData = new FormData(form);
      const playerOne = formData.get('xPlayerName')||"Player One"
      const playerTwo = formData.get('oPlayerName') ||"Player Two"


      console.log(playerOne,playerTwo)
      gameLogic.setPlayers(playerOne, playerTwo)
      this.displayBoard()
      this.displayScore()

      form.reset()
      startPrompt.classList.add("hidden");
      gameOverDiv.classList.add("hidden");
      boardContainer.classList.remove("hidden");

      


      


    })
  },

  
  displayUI: function () {
    this.displayPrompt()
    // this.displayBoard()
    //   this.displayScore()

    this.playDialog.addEventListener("close", () => {
      if (this.playDialog.returnValue === "yes") {
        console.log("Play again");
        getElements().boardUi.innerHTML = "";
        gameBoard.resetBoard();
        this.displayBoard();
      } else {
        console.log("Game ended");
        this.displayEndGame();
      }
    });
  },
  displayEndGame: function () {
    const players = gameLogic.getPlayers();
    const { playerOne, playerTwo } = players;
    const elements = getElements();
    const boardUi = elements.boardUi;
    const gameOverDiv = elements.gameOverDiv;
    const showText = elements.showText;
    const startPrompt = elements.startPrompt;


    gameOverDiv.classList.remove("hidden");
    boardUi.classList.add("hidden");
    showText.classList.add("hidden");

   
    elements.playerOneDetails.innerHTML = `${playerOne.getName()} : ${playerOne.getScore()}`;
    elements.playerTwoDetails.innerHTML = `${playerTwo.getName()} : ${playerTwo.getScore()}`;

    elements.restartButton.addEventListener("click", () => {
      // prompt name
    
      // boardUi.innerHTML = ''  

      gameOverDiv.classList.add("hidden");
      boardUi.classList.remove('hidden'); 
      showText.classList.remove('hidden'); 
      gameLogic.resetGame();
      Object.values(players).forEach(player => player.resetScore())
    //   playerOne.resetScore()
    //   playerTwo.resetScore()

      this.displayPrompt()
      startPrompt.classList.remove('hidden'); 



    });
  },
  playDialog: document.querySelector(".again-dialog"),

  displayBoard: function () {
    const showWinner = document.querySelector(".winner");
    const getBoard = gameBoard.getBoard();
    const boardUi = getElements().boardUi;

    boardUi.innerHTML = '' 

    for (let i = 0; i < getBoard.length; i++) {
      const newBox = document.createElement("div");
      newBox.className = "board-box";

      boardUi.appendChild(newBox);

      newBox.addEventListener("click", () => {
        const turn = gameLogic.playerTurn();

        // Check if slot is avaiable if true display icon and fill board index

        if (turn.getMarker() === "O") {
          if (gameLogic.getTurn(i)) {
            newBox.innerHTML =
              '<svg class = "board-icon" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M12.021,24c-5.514,0-10-4.486-10-10v-4c.504-13.251,19.5-13.241,20,0v4c0,5.514-4.486,10-10,10Zm0-22c-4.411,0-8,3.589-8,8v4c.377,10.591,15.627,10.583,16,0v-4c0-4.411-3.589-8-8-8Z"/></svg>';
              newBox.classList.add("filled")
            }
        } else if (turn.getMarker() === "X") {
          if (gameLogic.getTurn(i)) {
            newBox.innerHTML =
              '<svg class = "board-icon"  xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M13.93,12L21.666,2.443c.521-.644,.422-1.588-.223-2.109-.645-.522-1.588-.421-2.109,.223l-7.334,9.06L4.666,.557c-1.241-1.519-3.56,.357-2.332,1.887l7.736,9.557L2.334,21.557c-.521,.644-.422,1.588,.223,2.109,.64,.519,1.586,.424,2.109-.223l7.334-9.06,7.334,9.06c.524,.647,1.47,.742,2.109,.223,.645-.521,.744-1.466,.223-2.109l-7.736-9.557Z"/></svg>';
              newBox.classList.add("filled")
            
            }
        }

        const winningP = gameBoard.checkWinner(turn.getMarker());
        if (winningP) {
          showWinner.innerHTML = `<strong>${turn.getName()}</strong> wins!`;
          const winningDivs = winningP.map((index) => boardUi.children[index]);
          winningDivs.forEach((div) => {
            div.classList.add("winning-divs");
          });
          this.displayScore();

          this.playDialog.showModal();
        } else if (gameBoard.draw()) {
          showWinner.innerHTML = `Draw`;
          this.playDialog.showModal();

        }
      });
    }
  },
  displayScore: function () {
  

    const players = gameLogic.getPlayers();
    const { playerOne, playerTwo } = players;
    const elements = getElements();

    elements.playerOneName.textContent = playerOne.getName();
    elements.playerOneScore.textContent = playerOne.getScore();
    elements.playerTwoName.textContent = playerTwo.getName();
    elements.playerTwoScore.textContent = playerTwo.getScore();
  
  },
};
// displayController.displayPrompt();
displayController.displayUI();
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".container").style.visibility = "visible";
  document.querySelector(".container").style.opacity = "1";

});

