

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const { JWT_TIME_EXPIRED } = require('../config/index');
const SALT = process.env.SALT;
const JWT_SECRET = process.env.JWT_SECRET;


class Auth {
    static generateToken(data) {
        return {
            token: jwt.sign(data, JWT_SECRET, { expiresIn: JWT_TIME_EXPIRED }),
            expiredAt: moment().add(JWT_TIME_EXPIRED, 'seconds').format('x')
        }
    };

    static generateHash(password) {
        return crypto.pbkdf2Sync(String(password), new Buffer(SALT, 'base64'), 1000, 64, 'SHA1').toString('base64');
    }

    static async validatePassword({ typePassword, realPassword, temporaryPassword }) {
        const typePasswordHash = Auth.generateHash(typePassword);
    
        return typePasswordHash === realPassword || typePasswordHash === temporaryPassword;
    };
}

module.exports = Auth;



