const gameBoard = (function (){
    let board = ["X", "X", "", "", "", "", "", "", ""]

    function getBoard(){
        return board;
    }

    function placeMarker (index, marker){
        if (board[index] === ""){
            board[index] = marker;
            return true
        }
        return false
    }

    function checkWinner(marker){
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

        return winPattern.some(pattern => pattern.every(index => board[index] == marker));
    } 

    function resetBoard(){
        board = ["", "", "", "", "", "", "", "", ""];
    }

    function draw(){
        return !board.includes("")
    }
    
    return{
        getBoard, placeMarker, checkWinner, resetBoard, draw
    }

})();

const createPlayer =function (marker, name) {
    
    let score = 0

    const addScore = () => score++;
    const getScore = () => score;
    // const resetScore = () => score = 0;
    const getMarker = () => marker;
    const getName = () => name;


    return {
        addScore,getScore,getMarker,getName
    };
}


const gameLogic = (function (){
    let playerOne = createPlayer("X","James")
    let playerTwo = createPlayer("O","Peters")
    let currentPlayer = playerOne;

    function switchPlayer()  {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    function getTurn(index){
        if (gameBoard.placeMarker(index,currentPlayer.getMarker())){
        console.log(`${currentPlayer.getName()} placed ${currentPlayer.getMarker()} at ${index}`);
            if (gameBoard.checkWinner(currentPlayer.getMarker())){
                console.log(`${currentPlayer.getName()} wins the round!`);
                currentPlayer.addScore()
            }
            else if(gameBoard.draw()){
                gameBoard.resetBoard()
                console.log(`This round is a draw!`);

            }
            else{
                switchPlayer()
            }
        }
        else{
            console.log("Position already taken! Try again...")
        }
    }

    function resetGame(){
        gameBoard.resetBoard();
        playerOne = createPlayer("X","James");
        playerTwo = createPlayer("O","Peters");
        currentPlayer = playerOne;
    }
    return { getTurn, resetGame };

})()
