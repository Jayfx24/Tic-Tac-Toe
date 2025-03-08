// Create and store gameBoard in gameObject

const gameBoard = {
    board: ["X", "X", "", "", "", "", "", "", ""] ,

    //  FIX game flow logic
    
    flow: function(){

        let currentPlayer = playerOne;
        return function(){
            currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne; 
            return currentPlayer;
                
        }

    },
       
    init :  function(){
        this.currentMaker = this.flow()    

    },
    
    placeMarker: function(index){
        if(this.board[index] === ""){
            activePlayer = this.currentMaker()
            this.board[index] = activePlayer.marker
            console.log(this.board)
            this.winner(activePlayer)
        }

        else{
            console.log("Position Taken")
            console.log(this.board)

    }
    },

    resetBoard: function(){
        this.board = ["", "", "", "", "", "", "", "", ""]
        this.init()
       
    },

    winner: function(checkPlayer){
        marker = checkPlayer.marker
        winF = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];
        for (pattern of winF){
            const [a, b, c] = pattern;
            if (this.board[a] === marker && this.board[b] === marker && this.board[c] === marker){
                return console.log(`${checkPlayer.name} wins this round! :)`)
            }
           
        }
    }
    
    }




function createPlayer(marker, name){
    return{marker,name}
}

const playerOne = createPlayer("X",'james')
const playerTwo = createPlayer("O",'peter')

gameBoard.init()
