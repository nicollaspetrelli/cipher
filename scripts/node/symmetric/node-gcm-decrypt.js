// https://nodejs.org/api/crypto.html#crypto_ccm_mode

const { createDecipheriv } = require('crypto');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Qual mensagem você deseja descriptografar?\n\x1b[2m> \x1b[0m", (message) => {
    const key = fs.readFileSync('symmetric.key').toString().trim();
    const buffer = Buffer.from(message, 'hex');
    const nonce = buffer.slice(0, 12);
    const tag = buffer.slice(12, 28);
    const ciphertext = buffer.slice(28);

    console.log();
    console.log("Ciphertext: \x1b[36m", ciphertext, "\x1b[0m");
    console.log("Nonce:      \x1b[36m", nonce, "\x1b[0m");
    console.log("Tag:        \x1b[36m", tag, "\x1b[0m");

    const decipher = createDecipheriv('aes-256-gcm', key, nonce, {
        authTagLength: 16
    });
    decipher.setAuthTag(tag);

    try {
        const receivedPlaintext = decipher.update(ciphertext, null, 'utf8');
        decipher.final();
        console.log();
        console.log('Mensagem:   ', "\x1b[32m" + receivedPlaintext + "\x1b[0m");
    } catch (err) {
        console.error('Erro:', err.message);
    }

    rl.close();
});
