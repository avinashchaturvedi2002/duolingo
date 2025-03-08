// models/User.js
const db = require('../db/database'); // Ensure this path is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const{jwtsecret}=require("../config")

class User {
    static async register(username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            return new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO users (username, password) VALUES (?, ?)',
                    [username, hashedPassword],
                    function (err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    }
                );
            });
        } catch (err) {
            throw err;
        }
    }

    static async login(username, password) {
        try {
            return new Promise((resolve, reject) => {
                // Find the user by username
                db.get(
                    'SELECT * FROM users WHERE username = ?',
                    [username],
                    async (err, user) => {
                        if (err) {
                            reject(err);
                        } else if (!user) {
                            reject('User not found');
                        } else {
                            // Compare the provided password with the hashed password
                            const isValid = await bcrypt.compare(password, user.password);
                            if (isValid) {
                                // Generate a JWT token
                                const token = jwt.sign({ id: user.id }, jwtsecret, { expiresIn: '1h' });
                                resolve(token);
                            } else {
                                reject('Invalid password');
                            }
                        }
                    }
                );
            });
        } catch (err) {
            throw err;
        }
    }
}

module.exports = User;