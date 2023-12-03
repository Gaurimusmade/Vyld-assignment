const mysql = require('mysql');

module.exports = mysql.createConnection({
  user: process.env.DB_USER || 'root',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'vyld',
  password: process.env.DB_PASSWORD || '',
});


