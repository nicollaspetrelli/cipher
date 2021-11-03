// https://www.sohamkamani.com/nodejs/rsa-encryption/

const fs = require('fs');
const crypto = require('crypto');
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

rl.question("Qual mensagem você deseja descriptografar?\n\x1b[2m> \x1b[0m", (message) => {
    // Callback para a pergunta da senha
    rl.on('line', (passphrase) => {
        rl.stdoutMuted = false;
        const privateKey = crypto.createPrivateKey({
            key: fs.readFileSync('./id_rsa').toString(),
            passphrase: passphrase
        });
        const decryptedData = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha512',
            },
            Buffer.from(message, 'hex')
        );

        console.log();
        console.log();
        console.log('Mensagem descriptografada:');
        console.log("\x1b[32m" + decryptedData.toString() + "\x1b[0m");

        rl.close();
    });

    console.log();
    rl.setPrompt("\x1b[2mQual a passphrase da chave privada (aperte ENTER para nenhuma)? \x1b[0m");
    rl.prompt();
    rl.stdoutMuted = true;
});
