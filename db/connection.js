const mysql = require('mysql2');

const dbConfig = {
    host: 'localhost',
    user: 'finalTest', // Change to your database username
    password: 'finalTest', // Change to your database password
    database: 'finaltest' // Change to your database name
};

const pool = mysql.createPool(dbConfig);

const getConnection = () => {
    return pool.promise();
};

// Handle unexpected errors
pool.on('error', (err) => {
    console.error('Unexpected database error occurred:', err.message);
});

module.exports = { getConnection };
