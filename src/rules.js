
class Rules {
    checkWinner(computersMoveIndex, usersMoveIndex, moves) {
        if (usersMoveIndex >= moves.length) return "Unnown move";
        
        switch(Math.sign((usersMoveIndex - computersMoveIndex + Math.floor(moves.length / 2) + moves.length) % moves.length - Math.floor(moves.length / 2))) {
            case 1:
                return "Win";
            case 0: 
                return "Draw";
            case -1:
                return "Lose";
        }
    }
}

module.exports = new Rules();