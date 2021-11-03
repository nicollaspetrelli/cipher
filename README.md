# Workshop de Criptografia
Slides e códigos sobre os principais aspectos de Criptografia Simétrica, Assimétrica e Hashing. 

## Pasta `scripts/php`
### `scripts/php/encrypt-without-hash.php`
Script em PHP que utiliza a [libsodium](https://doc.libsodium.org) para gerar uma informação (como um _access token_ ou _cookie_) criptografada responsável por identificar um usuário e, com uma simples técnica de [bit-flipping](https://en.wikipedia.org/wiki/Bit-flipping_attack), fazer um ataque força-bruta para demonstrar a importância de **sempre** fazer o _hashing_ para garantir integridade e autenticidade do dado.

Para rodar o teste, basta executar
```sh
$ php encrypt-without-hash.php
```

| Se você não possuir um ambiente com PHP configurado com a `libsodium`, basta iniciar um novo Docker com:
```sh
$ ./run
```

## Pasta `scripts/node`
Na pasta `scripts/node`, há alguns scripts que devem ser rodados dentro de um Docker pois são necessários algumas
bibliotecas. Para rodar:

```sh
./run
```

### `scripts/node/symmetric`
`node-rsa-encrypt.js` e `node-rsa-decrypt.js` são scripts feitos em Node.js para implementar a criptografia híbrida com RSA

Para rodar os testes, basta executar
```sh
$ cd scripts/node/symmetric
$ node node-rsa-encrypt.js
# Digitar a mensagem que deseja criptografar
# Copiar o texto criptografado

$ node node-rsa-decrypt.js
# Colar o texto criptografado copiado anteriormente
```

Novamente, se quiser gerar sua própria chave simétrica, execute:

```sh
# Se não possuir o pwgen, você pode acessar algum site para gerar chaves
$ pwgen -sy1 32 > symmetric.key
```

### `scripts/node/asymmetric`
`node-rsa-encrypt.js` e `node-rsa-decrypt.js` são scripts feitos em Node.js para implementar a criptografia híbrida com RSA

Para rodar os testes, basta executar
```sh
$ cd scripts/node/asymmetric

$ node node-rsa-encrypt.js
# Digitar a mensagem que deseja criptografar
# Copiar o texto criptografado

$ node node-rsa-decrypt.js
# Colar o texto criptografado copiado anteriormente
```

PS: as chaves assimétricas já foram geradas anteriormente para facilitar o processo. Se você quiser gerar as suas próprias chaves, basta executar:
```sh
$ ssh-keygen -t rsa -b 2048 -m PEM -f ./id_rsa && \
    ssh-keygen -e -m PEM -f id_rsa > id_rsa.pub
```
