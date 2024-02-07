const { AsciiTable3 } = require('ascii-table3');
const { checkWinner } = require('./rules');

class TableGen {
    generateTable(moves) {
        const table = new AsciiTable3("Game Rules");
        table.setHeading("v User\\Computer >", ...moves);
        for (let i = 0; i < moves.length; i++) {
            let row = [moves[i]];
            for (let j = 0; j < moves.length; j++) {
                row.push(checkWinner(j, i, moves));
            }
            table.addRow(...row);
        }
        return table.toString();
    }
}

module.exports = new TableGen();