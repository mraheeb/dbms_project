const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static('public', { index: 'login.html' }));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './templates')));


// Import route files
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

// You can import other route files here


// Use routes
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);


// You can use other route files here

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
