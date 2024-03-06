const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getConnection } = require('../db/connection');

router.route('/')
    .post(async (req, res) => {
    try {
        const { email, password } = req.body;

        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM Users WHERE email = ?', [email]);
    
        if (rows.length === 0) {
            return res.status(401).json({ error: 'in if Invalid email or password' });
        }

        const user = rows[0];
        const [pass1] = password;
        const [pass2] = user.password;
        const passwordMatch = pass1 === pass2;
        console.log(passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'in pass Invalid email or password' });
        }

        // Authentication successful, create session or token
        // req.session.userId = user.user_id; // Example of session setup

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

module.exports = router;
