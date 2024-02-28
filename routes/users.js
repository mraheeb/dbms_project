const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

router.route('/')
    // GET request to retrieve all users
    .get(async (req, res) => {
        try {
            const connection = await getConnection();
            const [rows] = await connection.execute('SELECT * FROM users');
            await connection.end();
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error retrieving users:', error);
            res.status(500).json({ error: 'Failed to retrieve users' });
        }
    })
    // POST request to create a new user
    .post(async (req, res) => {
        try {
            const { username, email, role } = req.body;
            const connection = await getConnection();
            await connection.execute('INSERT INTO users (username, email, role) VALUES (?, ?, ?)', [username, email, role]);
            await connection.end();
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    });

router.route('/:userId')
    // PUT request to update the role of a user
    .put(async (req, res) => {
        try {
            const { userId } = req.params;
            const { role } = req.body;
            const connection = await getConnection();
            await connection.execute('UPDATE users SET role = ? WHERE user_id = ?', [role, userId]);
            await connection.end();
            res.status(200).json({ message: 'User role updated successfully' });
        } catch (error) {
            console.error('Error updating user role:', error);
            res.status(500).json({ error: 'Failed to update user role' });
        }
    });

module.exports = router;
