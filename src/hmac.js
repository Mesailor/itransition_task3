const crypto = require("crypto");

class Hmac {
    createHmac(computerMove, hmacKey) {
        return crypto.createHmac("sha256", hmacKey).update(computerMove).digest("base64");
    }
}

module.exports = new Hmac();