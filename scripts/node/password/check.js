const {argon2i} = require('argon2-ffi');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Callback para a pergunta da senha
rl.question("Qual o hash gerado?    \x1b[2m", (hashedPassword) => {

    if (!hashedPassword.length) {
        console.log("\x1b[31mSaindo...\x1b[0m");
        rl.close();
        process.exit(1);
        return;
    }

    rl.question("\x1b[0mQual a senha a checar? \x1b[2m", (password) => {
        argon2i.verify(hashedPassword, password).then((status) => {
            if (!status) {
                throw new Error();
            }
            console.log("\x1b[97;42m Senhas conferem \x1b[0m");
        }).catch((err) => {
            console.log("\x1b[97;41m Senhas não conferem \x1b[0m");
        }).finally(() => {
            rl.close()
        });
    });
});
