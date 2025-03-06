// Create and store gameBoard in gameObject

const gameBoard = {
    board: ["X", "X", "", "", "", "", "", "", ""] ,

    // c FIX game flow logic

    placeMarker: function(index,playerMarker){
        if(this.board[index] === ""){
            this.board[index] = playerMarker
            this.winner()
        }
        else{
        console.log("Position Taken")
    }
    },

    resetBoard: function(){
        this.board = ["", "", "", "", "", "", "", "", ""]
       
    },

    winner: function(marker){
        winF = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];
        for (pattern of winF){
            const [a, b, c] = pattern;
            if (this.board[a] ===marker && this.board[b] === marker && this.board[c] === marker){
                console.log("WINNER")
            }
           
        }
    }



}

function createPlayer(marker){
    return{marker}
}

const playerOne = createPlayer("X")
const playerTwo = createPlayer("O")


