const mysql = require('mysql2');

const dbConfig = {
    host: 'localhost',
    user: 'dbms_root',
    password: 'dbms_root',
    database: 'dbms_root'
};

const getConnection = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch (error) {
        console.error('Error establishing database connection:', error);
        throw error;
    }
};

module.exports = { getConnection };
