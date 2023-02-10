const inquirer = require('inquirer');

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