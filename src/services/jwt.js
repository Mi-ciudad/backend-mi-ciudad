var jwt = require('jwt-simple');

var key = "lNXhYBhZH7zz-f-xl4takG7FZi3rfe0eJRUbBoE3M9Pme5Fq9q1AzXGMCcTlN4rJ5v4wT6L0qFhD3dD5bzTo5j8Yb9fJhY6r7Ap2HSEViy_ylPB3wHeRP1QuchUR1aPiQ0n1hhCGZl3XI1KhHCG48OnhvlCBtwCsBkgNpBRv9usju0Q6c4viabjYMNMvqRg0KosxSASMIjGQVRcr9H0A9X-_1kN9InTmspKmcPw2DIvYmtFImSQU6QqCQOyN5gO-8ihRL03kWiTqCWDXce9_OIvLYJArv9f8DDWncn2QexCONfocmyQ9dUbdiEvcVZiwuzAKqDGOtWTVWuw1TQFp_w";

const jwtService = new class jwtService {
    async createToken(payload) {
        try {
            return new Promise(resolve => resolve(jwt.encode(payload, key)));
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = {
    jwtService
}