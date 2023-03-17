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

function viewRoles() {
    const sql = 
    `SELECT role.id, role.title, role.salary, department.dep_name AS department 
    FROM role
    INNER JOIN department ON role.department_id = department.id `;
    console.log("Viewing all roles");
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

function viewDepartments() {
    const sql = 
    `SELECT department.id AS id, department.dep_name AS department FROM department`;
    console.log("Viewing all departments");
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

function addDepartment () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDep',
            message: 'Whats the name of the new department?'
        }
    ])
    .then(answer => {
        const depSql = `INSERT INTO department (dep_name) VALUES (?)`;
        connection.query(depSql, answer.addDep, (err, result) => {
            if (err) throw err;
            console.log('///////////////////////////////////')
            console.log('Added ' +answer.addDep+ ' to departments')

            viewDepartments();
        })
    })
};

function addRole () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addRole',
            message: 'Whats the name of the new role?'
        },
        {
            typw: 'input',
            name: 'addSalary',
            message: 'What is the salary for this role?'
        }
    ])
    .then(answer => {
        const roleInputs = [answer.addRole, answer.addSalary];
        const roleSql = `SELECT dep_name, id FROM department`;
        
        connection.query(roleSql, (err, data) => {
            if (err) throw err;

        const deptList = data.map(({ dep_name, id }) => ({ name: dep_name, value: id}));
        
        inquirer.prompt([
            {
                type: 'list',
                name: 'roleDep',
                message: 'What department is this role in?',
                choices: deptList
            }
        ])
            .then(answer => {
                const deptList = answer.roleDep;
                roleInputs.push(deptList)

                const roleDeptSql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

                connection.query(roleDeptSql, roleInputs, (err, result) => {
                    if (err) throw err;
                    console.log('Added ' + answer.addRole + ' to roles');

                viewRoles();
                })
            })
        })
    })

    // .then(answer => {
    //     const roleSql = ``;
    //     connection.query(roleSql, answer.addRole, (err, result) => {
    //         if (err) throw err;
    //         console.log('///////////////////////////////////')
    //         console.log('Added ' +answer.addRole+ ' to departments')

    //         viewRoles();
    //     })
    // })
};

function addEmployee () {
    const roles = data.map(({ id, title }) => ({ name: title, value: id }));
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employees last name?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employees role?',
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employees manager?',
            choices: managers
        }
    ])
        .then(answer => {
            const userInputs = [answer.firstName, answer.lastName]
            const roleSql = `SELECT role.id, role.title FROM role`;
            const managerSql = `SELECT * FROM employee`;
            const role = roleChoice.role;
            connection.promise().query(roleSql, (err, data) => {
                if (err) throw err;
            connection.promise().query(managerSql, (err, data) => {
                if (err) throw err;

                const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));
            })

            userInputs.push(role);
            
            })
        })
}