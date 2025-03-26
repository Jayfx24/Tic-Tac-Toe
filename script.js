// // Create and store gameBoard in gameObject

// const gameBoard = {
//   board: ["X", "X", "", "", "", "", "", "", ""],

//   //  FIX game flow logic

//   flow: function () {
//     let currentPlayer = playerOne;
//     return function () {
//       currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
//       return currentPlayer;
//     };
//   },

//   init: function () {
//     this.currentMaker = this.flow();
//   },

//   checkCon : function (){
//     if (!this.board.includes("")){
//         console.log("It's a draw")
//         console.log('New round')
//         this.resetBoard()

//     }
//   },
//   // score and round
//   placeMarker: function (index) {
//     if (this.board[index] === "") {
//       activePlayer = this.currentMaker();
//       this.board[index] = activePlayer.marker;
//       console.log(this.board);
//       this.winner(activePlayer);
//     } else {
//       console.log("Position Taken");
//       console.log(this.board);
//     }
//     this.checkCon()

   
//   },

//   resetBoard: function () {
//     this.board = ["", "", "", "", "", "", "", "", ""];
//     this.init();
    
//   },
//   resetGame: function () {
//     this.board = ["", "", "", "", "", "", "", "", ""];
//     this.init();
//     playerOne.resetScore()
//     playerTwo.resetScore()
    
//   },
// // /
//   winner: function (checkPlayer) {
   
//     let marker = checkPlayer.marker;
//     let winF = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//     ];
//     for (pattern of winF) {
//       const [a, b, c] = pattern;
//       if (
//         this.board[a] === marker &&
//         this.board[b] === marker &&
//         this.board[c] === marker
//       ) {
//         checkPlayer.addScore();
//         console.log(`${checkPlayer.name} wins this round! :)`);
//         console.log(`${playerOne.name}: ${playerOne.showScore()} | ${playerTwo.name}: ${playerTwo.showScore()} `);

//         if (checkPlayer.showScore() === 3){
//             console.log(`${checkPlayer.name} win :)`);
//             this.resetGame()
    
//         }
       
//         console.log(this.board);
//         this.resetBoard();
//         return;

        
//       }

//     }
//   },
//   createPlayer: function (marker, name) {
    
  
//     return {
//       marker,
//       name,
//       score : 0,
//       addScore: function () {
//         this.score++;
//       },
//       showScore: function (){
//           return this.score;
//       },
//       resetScore : function(){
//         this.score = 0;
//       }
//     };
//   }
// };



// const playerOne = gameBoard.createPlayer("X", "james");
// const playerTwo = gameBoard.createPlayer("O", "peter");
// gameBoard.init();

