const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

router.route('/')
    // GET request to retrieve all projects
    .get(async (req, res) => {
        try {
            const connection = await getConnection();
            const [rows] = await connection.execute('SELECT * FROM projects');
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error retrieving projects:', error);
            res.status(500).json({ error: 'Failed to retrieve projects', message: error.message });
        }
    })
    // POST request to create a new project
    .post(async (req, res) => {
        try {
            const { project_name, project_description, start_date, end_date, status } = req.body;
            const connection = await getConnection();
            await connection.execute('INSERT INTO projects (project_name, project_description, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)', [project_name, project_description, start_date, end_date, status]);
            res.status(201).json({ message: 'Project created successfully' });
        } catch (error) {
            console.error('Error creating project:', error);
            res.status(500).json({ error: 'Failed to create project' });
        }
    });
    // PUT request to update project status
    router.put('/:project_id',async (req, res) => {
        try {
            const { project_id } = req.params; // Extract project_id from URL params
            
            const { status } = req.body; // Extract status from request body
            // console.log("within projects.js value of projectid and status",project_id,status);
            const connection = await getConnection();
            await connection.execute('UPDATE projects SET status = ? WHERE project_id = ?', [status, project_id]);
            res.status(200).json({ message: 'Project status updated successfully' });
        } catch (error) {
            console.error('Error updating project status:', error);
            res.status(500).json({ error: 'Failed to update project status' });
        }
    });

module.exports = router;
