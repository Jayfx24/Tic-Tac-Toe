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
            return true
        }
        else{
            console.log("Position already taken! Try again...")
            return false
        }
    }

    function resetGame(){
        gameBoard.resetBoard();
        playerOne = createPlayer("X","James");
        playerTwo = createPlayer("O","Peters");
        currentPlayer = playerOne;
    }
    function playerTurn(){
        return currentPlayer
    }
    return { getTurn, resetGame, playerTurn };


})()

const displayController = {
    container : document.querySelector('.container'),
    displayPrompt : function (){
        const  dialog = document.querySelector('dialog');
       

        dialog.showModal()

    }, 
    displayUI : function (){
        // this.displayPrompt()
        this.displayBoard()

    },
    displayEndGame : function(){

    },

    displayBoard : function(){
        const boardUi = document.querySelector(".board");

        const getBoard = gameBoard.getBoard()

        for (let i = 0; i < getBoard.length; i++){
            const newBox = document.createElement('div')
            newBox.className = 'board-box'

          

            boardUi.appendChild(newBox)
            
            newBox.addEventListener('click',()=>{
                const turn = gameLogic.playerTurn()
                if (turn.getMarker() === 'O'){
                    if(gameLogic.getTurn(i)){
                        newBox.innerHTML = '<svg class = "board-icon" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M12.021,24c-5.514,0-10-4.486-10-10v-4c.504-13.251,19.5-13.241,20,0v4c0,5.514-4.486,10-10,10Zm0-22c-4.411,0-8,3.589-8,8v4c.377,10.591,15.627,10.583,16,0v-4c0-4.411-3.589-8-8-8Z"/></svg>'
                    }
                }
                else if (turn.getMarker() === 'X'){
                    if(gameLogic.getTurn(i)){

                    newBox.innerHTML = '<svg class = "board-icon"  xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M13.93,12L21.666,2.443c.521-.644,.422-1.588-.223-2.109-.645-.522-1.588-.421-2.109,.223l-7.334,9.06L4.666,.557c-1.241-1.519-3.56,.357-2.332,1.887l7.736,9.557L2.334,21.557c-.521,.644-.422,1.588,.223,2.109,.64,.519,1.586,.424,2.109-.223l7.334-9.06,7.334,9.06c.524,.647,1.47,.742,2.109,.223,.645-.521,.744-1.466,.223-2.109l-7.736-9.557Z"/></svg>'
                    }
                    
                }
            })
        }


    }


}

displayController.displayUI()