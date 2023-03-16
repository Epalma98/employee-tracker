const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection(
    {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    // console.log("Connected to employee_DB database.")
);  

connection.connect(function () {
    start();
})

afterConnection = () =>
    console.log('')
    console.log('+-----------------------+')
    console.log('|                       |')
    console.log('|   Employee Tracker    |')
    console.log('|                       |')
    console.log('+-----------------------+')

function start() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit',
            ],

        }
    ])
    .then((answer) => {
        switch (answer.choice) {
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;    
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Quit':
                Quit();
                break;
        }
    })
}
// function shows all employees
function viewEmployees() {
    const sql = 
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dep_name AS department, role.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    console.log("Viewing all employees");
    connection.query(sql, function(err, rows) {
        if (err) throw err;
        console.table(rows);
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What do you want to do?',
                choices: [
                    'Main Menu',
                    'Quit'
                ],
            }
        ])
        .then((answer) => {
            switch (answer.choice) {
                case 'Main Menu':
                    start();
                    break;
                case 'Quit':
                    quit();
            }
        })
    })
}
