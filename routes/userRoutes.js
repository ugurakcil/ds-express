const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');

router.get('/xuser', async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.status(200).send(users);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send('Database error.');
    }
});

router.post('/user', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username, password });
        
        if (!user) {
            res.status(401).send('Invalid username or password');
        } else {
            res.status(200).send('Successfully logged in');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error occurred while logging in');
    }
});

// ... Diğer route'larınız

module.exports = router;
