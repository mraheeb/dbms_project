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
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const user = rows[0];

            // Compare hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Authentication successful, create session or token
            // req.session.userId = user.user_id; // Example of session setup

            if (user.role === 'admin' || user.role === 'manager') {
                // Redirect to admin.html
                return res.status(200).json({ message: 'Admin login successful', redirectUrl: '/admin.html' });
            } else {
                // Redirect to index.html
                return res.status(200).json({ message: 'Login successful', redirectUrl: '/index.html' });
            }
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ error: 'Failed to login' });
        }
    });

module.exports = router;
