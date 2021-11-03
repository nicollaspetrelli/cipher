// https://nodejs.org/api/crypto.html#crypto_ccm_mode

const { createCipheriv, randomBytes } = require('crypto');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl._writeToOutput = function _writeToOutput(stringToWrite) {
    if (!rl.stdoutMuted) {
        rl.output.write(stringToWrite);
    }
};

rl.question("Qual mensagem você deseja criptografar?\n\x1b[2m> \x1b[0m", (plaintext) => {
    const key = fs.readFileSync('symmetric.key').toString().trim();
    const nonce = randomBytes(12);

    const cipher = createCipheriv('aes-256-gcm', key, nonce, {
        authTagLength: 16
    });
    const ciphertext = cipher.update(plaintext, 'utf8');
    cipher.final();
    const tag = cipher.getAuthTag();

    console.log();
    console.log("Ciphertext: \x1b[36m", ciphertext, "\x1b[0m");
    console.log("Nonce:      \x1b[36m", nonce, "\x1b[0m");
    console.log("Tag:        \x1b[36m", tag, "\x1b[0m");

    console.log();
    console.log('Mensagem a ser transmitida:');
    console.log("\x1b[32m" + Buffer.concat([nonce, tag, ciphertext]).toString('hex') + "\x1b[0m");

    rl.close();
});
