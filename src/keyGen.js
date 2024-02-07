let crypto = require("crypto");

class KeyGen {
    generateKey() {
        return crypto.randomBytes(32).toString('hex');
    }
}

module.exports = new KeyGen();