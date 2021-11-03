const {secret} = require('./utils');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Qual o label? (Padrão: Workshop)\n\x1b[2m> \x1b[0m", (label) => {
    if (!label.length) {
        label = 'Workshop';
    }

    rl.question("Qual o issuer? (Padrão: Criptografia)\n\x1b[2m> \x1b[0m", (issuer) => {
        if (!issuer.length) {
            issuer = 'Criptografia';
        }

        const checkUsername = function() {
            rl.question("Qual o usuário?\n\x1b[2m> \x1b[0m", (username) => {
                if (!username.length) {
                    checkUsername();
                    return;
                }

                /**
                 * @link https://github.com/google/google-authenticator/wiki/Key-Uri-Format
                 */
                label = encodeURIComponent(label);
                issuer = encodeURIComponent(issuer);
                username = encodeURIComponent(username);
                const data = encodeURIComponent(`otpauth://totp/${label}:${username}?secret=${secret}&issuer=${issuer}`);
                const uri = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${data}`;
                console.log(uri);

                rl.close();
                process.exit();
            });
        }

        checkUsername();
    });
});
