const authenticator = require('otplib').authenticator;
authenticator.options = { window: 1 };

exports.authenticator = authenticator;
exports.secret = 'FYETIZLZLUMROFDB'; // authenticator.generateSecret();
