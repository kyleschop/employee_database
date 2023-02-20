const connection = require('./config/connection');
const inq = require('inquirer');

//Creating a connect to database
connection.connect((error) => 
{
    if (error) console.log(error);
});

//Displaying Options
function showOptions(){
    inq.prompt([
        {
            type: 'list',
            message: 'Select an option below',
            name: 'dbChoice',
            choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add employee',
            'Add role',
            'Add department', 
            'Exit'],
        }
    ]).then((response) => {
        console.log("You chose" + response.dbChoice)
        //Switch statement for each choice
        switch(response.dbChoice){
            case 'View all employees': showEmployeeList();
            break;
            case 'View all departments': showDepartmentList();
            break;
            case 'View all roles': showRolesList();
            break;
            case 'Add employee': addEmployee();
            break;
            case 'Add role': addRole();
            break;
            case 'Add department': addDepartment();
            break;
            default: console.log("Exiting Interface!");
            break;
        }  
    });
}

function showDepartmentList(){
    const sqlDepartment = "select * from department;"
    connection.query(sqlDepartment, (error, depData) =>{
        if (error) throw error;
        console.table(depData);
        showOptions();
    })
}

function showEmployeeList(){
    const sqlEmployee = "select * from employee;"
    connection.query(sqlEmployee, (error, empData) =>{
        if (error) throw error;
        console.table(empData);
        showOptions();
    })
}

function showRolesList(){
    const sqlRoles = "select * from roles;"
    connection.query(sqlRoles, (error, roleData) =>{
        if (error) throw error;
        console.table(roleData);
        showOptions();
    })
}

function addDepartment(){
    inq.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the id of the new department?",
        },
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the new department?",
        },
    ]).then((answer) => {
        const { id, departmentName } = answer;
        // Insert the new department into the database
        connection.query(
            "INSERT INTO department SET ?",
            {
                id: id,
                name: departmentName,
            },
            (error) => {
                if (error) throw error;
                console.log(`The department ${departmentName} was added successfully to the database.`)
                showOptions();
            });
            }
        );
    };

function addRole(){
    const sql = "SELECT * FROM department";
    connection.query(sql, (error, response) => {
        if (error) throw error;
        // Map departments and create an object with name and value properties
        const department = response.map((department) => ({
            name: department.department_name,
            value: department.id,
        }));
        // Prompt the user to input the title, salary, and department of the new role
        inq.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the title of the new role?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the id of the new role?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the new role?",
            },
            {
                type: "list",
                name: "departmentId",
                message: "What department does the new role belong to?",
                choices: department,
            },
        ]).then((answer) => {
            const { id, title, salary, departmentId } = answer;
            // Insert the new role into the database
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    id,
                    title,
                    salary,
                    department_id: departmentId,
                },
                (error) => {
                    if (error) throw error;
                    console.log(`The role ${title} was added successfully to the database.`);
                    // Show the main menu after the new role has been added
                    showOptions();
                }
            );
        });
    });
}

function addEmployee(){
    const sql = "SELECT * FROM roles";
    connection.query(sql, (error, response) => {
        if (error) throw error;
        const role = response.map((role) => ({
            name: role.title,
            value: role.id,
        }));
        inq.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the employee's id?",
            },
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
            },
            {
                type: "list",
                name: "roleId",
                message: "What is the employee's role?",
                choices: role,
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the employee's manager's id?",
            },
        ]).then((answer) => {
            const { id, firstName, lastName, roleId, managerId } = answer;
            // Insert the employee into the database
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    id: id,
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleId,
                    manager_id: managerId,
                },
                (error) => {
                    if (error) throw error;
                    // Confirm that the employee was added successfully to the database
                    console.log(
                        `Employee ${firstName} ${lastName} was added successfully to the database.`);
                     showOptions();
                }
            );
        });
    });
}

function startApp(){
    showOptions();
}

startApp();