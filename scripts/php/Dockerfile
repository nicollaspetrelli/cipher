FROM php:8-cli-alpine

WORKDIR /app

RUN apk add --no-cache --virtual build-deps autoconf gcc make musl-dev \
  && pecl install xdebug \
  && docker-php-ext-enable xdebug \
  && apk del --no-cache build-deps \
  && echo "xdebug.cli_color=2" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Copying rest of the files
COPY . ./

CMD "sh"
