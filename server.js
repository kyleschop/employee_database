// Import modules
const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'placeholder',
      database: 'employee_db'
    },
  );
 
  // Connect to the database
db.connect((error) => {
    if (error) throw error;
});

inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'command',
            choices: ['View all employees', 'View all employees by department', 'View all employees by manager', 'Add employee', 'Remove employee', 'Update employee role', 'Update employee manager'],
        }
    ])
    .then((data) => {
        console.log(data)
    });