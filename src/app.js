const { generateKey } = require("./keyGen");
const { checkWinner } = require("./rules");
const { createHmac } = require("./hmac");
const { validateMoves } = require("./validation");
const { generateTable } = require("./tableGenerator");
const readline = require("node:readline/promises");


function startApp() {
    const moves = [];
    for (let i = 2; i < process.argv.length; i++) {
        moves.push(process.argv[i]);
    }

    switch (validateMoves(moves)) {
        case "not unique":
            console.log(
                "Incorrect input: arguments mustn't repeat!\nYour input: " +
                moves.join(" ") +
                "\nPlease insert different arguments\nExample: \"1 2 3\" or \"rock paper scissors\""
            );
            return;
        case "too less":
            console.log(
                "Incorrect input: arguments number must be more than 2!\nYour input: " +
                moves.join(" ") +
                "\nPlease insert more arguments\nExample: \"1 2 3\" or \"rock paper scissors\""
            );
            return;
        case "even":
            console.log(
                "Incorrect input: arguments number mustn't be even!\nYour input: " +
                moves.join(" ") +
                "\nPlease insert different arguments\nExample: \"1 2 3\" or \"rock paper scissors\""
            );
            return;
    }
    

    const hmacKey = generateKey();
    const compMoveIndex = Math.floor(Math.random() * moves.length)
    const computerMove = moves[compMoveIndex];
    const hmac = createHmac(computerMove, hmacKey);

    async function startInterface() {
        const rl = readline.createInterface(process.stdin, process.stdout);
        let userMove;
        let movesList = moves.reduce((accumulator, current, i) => {
            return accumulator += ++i + ". " + current + "\n";
        }, "")
        let message = "HMAC: " + hmac +
            "\nAvailable moves:\n" + movesList +
            "0. Exit\n?. Help\nEnter your move: "

        do {
            userMove = await rl.question(message);
            if (userMove == 0) {
                continue;
            }
            if (userMove == '?') {
                message = generateTable(moves) + "So your move is: "
                continue;
            }

            const finalMessage = "Your move: " + moves[userMove - 1] + "\n" +
                "Computer move: " + moves[compMoveIndex] + "\n";

            switch (checkWinner(compMoveIndex, userMove - 1, moves)) {
                case "Win":
                    console.log(finalMessage + "You win!\nHMAC key: " + hmacKey);
                    userMove = 0;
                    continue;
                case "Lose":
                    console.log(finalMessage + "You lose!\nHMAC key: " + hmacKey);
                    userMove = 0;
                    continue;
                case "Draw":
                    console.log(finalMessage + "It's draw!\nHMAC key: " + hmacKey);
                    userMove = 0;
                    continue;
                default:
                    console.log("Unnown move! Please try again!");
                    continue;
            }
        } while (userMove != 0);
        rl.close();
    }
    startInterface();
}
startApp();