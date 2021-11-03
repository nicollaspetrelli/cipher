const {argon2i} = require('argon2-ffi');
const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Callback para a pergunta da senha
rl.question("Qual sua senha? \x1b[2m", (password) => {

    if (!password.length) {
        console.log("\x1b[31mSaindo...\x1b[0m");
        rl.close();
        process.exit(1);
        return;
    }

    const salt = crypto.randomBytes(32);
    argon2i.hash(password, salt).then((hashedPassword) => {
        console.log("\x1b[2mHash gerado:\x1b[0m");
        console.log(hashedPassword);
        rl.close();
    });
});
