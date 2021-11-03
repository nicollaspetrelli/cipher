const {authenticator, secret} = require('./utils');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Qual token a ser comparado?\n\x1b[2m> \x1b[0m", (token) => {
    try {
        console.log(
            authenticator.check(token, secret)
        );
    } catch (err) {
        console.error(err);
    }
    rl.close();
});
