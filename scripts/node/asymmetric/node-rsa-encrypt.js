// https://www.sohamkamani.com/nodejs/rsa-encryption/

const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Qual mensagem você deseja criptografar?\n\x1b[2m> \x1b[0m", (plaintext) => {
    const publicKey = crypto.createPublicKey(
        fs.readFileSync('./id_rsa.pub').toString()
    );

    const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha512',
        },
        Buffer.from(plaintext)
    );

    console.log();
    console.log('Mensagem criptografada:');
    console.log("\x1b[32m" + encryptedData.toString('hex') + "\x1b[0m");

    rl.close();
});
