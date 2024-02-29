const mysql = require('mysql2');

const dbConfig = {
    host: 'localhost',
    user: 'dbms_root', // Change to your database username
    password: 'dbms_root', // Change to your database password
    database: 'dbms_root' // Change to your database name
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
