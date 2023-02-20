const mysql = require('mysql2');
const connection = mysql.createConnection({
  user: "root",
  password: "PlaceHolder",
  database: "employee_db",
  host: 'localhost',
  port: 3306,
  });
module.exports = connection;