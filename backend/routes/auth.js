const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userId = await User.register(username, password);
        res.status(201).json({ message: 'User registered', userId });
    } catch (err) {
        res.status(400).json({ error: err.message || err });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await User.login(username, password);
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message || err });
    }
});

module.exports = router;