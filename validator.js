const Jwt = require('@hapi/jwt');
require('dotenv').config();

// Funktion för att verifiera token
const validateToken = async (authorization) => {
    if (!authorization) {
        throw new Error('Authorization header is missing');
    }

    const token = authorization.split(' ')[1];

    if (!token) {
        throw new Error('Token is missing');
    }

    try {
        const tokenObject = Jwt.token.decode(token);

        if (!tokenObject) {
            throw new Error('Invalid token format');
        }

        // Verifiera token
        Jwt.token.verify(tokenObject, {
            key: process.env.JWT_KEY,
            algorithms: ['HS256']
        });

        return tokenObject.decoded.payload; 
    } catch (error) {
        throw new Error('Token verification failed');
    }
};

module.exports = { validateToken };