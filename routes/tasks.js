const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

router.route('/')
    // GET request to retrieve all tasks
    .get(async (req, res) => {
        try {
            const connection = await getConnection();
            const [rows] = await connection.execute('SELECT * FROM tasks');
            await connection.end();
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error retrieving tasks:', error);
            res.status(500).json({ error: 'Failed to retrieve tasks' });
        }
    })
    // POST request to create a new task
    .post(async (req, res) => {
        try {
            const { task_name, task_description, project_id, assigned_to, due_date, status } = req.body;
            const connection = await getConnection();
            await connection.execute('INSERT INTO tasks (task_name, task_description, project_id, assigned_to, due_date, status) VALUES (?, ?, ?, ?, ?, ?)', [task_name, task_description, project_id, assigned_to, due_date, status]);
            await connection.end();
            res.status(201).json({ message: 'Task created successfully' });
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ error: 'Failed to create task' });
        }
    });

router.route('/:taskId')
    // PUT request to update the status of a task
    .put(async (req, res) => {
        try {
            const { taskId } = req.params;
            const { status } = req.body;
            const connection = await getConnection();
            await connection.execute('UPDATE tasks SET status = ? WHERE task_id = ?', [status, taskId]);
            await connection.end();
            res.status(200).json({ message: 'Task status updated successfully' });
        } catch (error) {
            console.error('Error updating task status:', error);
            res.status(500).json({ error: 'Failed to update task status' });
        }
    });

module.exports = router;
