const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');


const privPath = path.join(__dirname, '../certificates/priv_rsa.pem');
const PRIVATE_KEY = fs.readFileSync(privPath, 'utf8');

function createJWT(user){

    const _id = user._id;
    const expiration = '2w';
    const payload = {
        sub: _id,
        iat: Date.now()
    };

    return {
        token: "Bearer " + jsonwebtoken.sign(payload, PRIVATE_KEY, { expiresIn: expiration, algorithm: 'RS256' }),
        expiresIn: expiration
    }

};

module.exports.createJWT = createJWT;
