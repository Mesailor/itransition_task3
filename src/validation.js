

class Validation {
    validateMoves(moves) {
        let uniqueMoves = [];
        
        for (let i = 0; i < moves.length; i++) {
            if (!uniqueMoves.includes(moves[i])) {
                uniqueMoves.push(moves[i]);
            }
            else {
                return "not unique";
            }
        }
        if (moves.length <= 1) {
            return "too less";
        }
        if (moves.length % 2 === 0) {
            return "even";
        }
    }
}

module.exports = new Validation();