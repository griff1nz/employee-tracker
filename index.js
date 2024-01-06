const inquirer = require('inquirer');
const mysql2 = require('mysql2');
require('dotenv').config();

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD, //I am using environmental variables for the purpose of hiding my password
    database: 'company_db'
});
const viewEmployees = () => {
    connection.query(
        'SELECT * FROM employee',
        function (err, results, fields) {
            console.table(results);
            if (err) {
                console.log(err);
            }
            runPrompts(questions);
        }
    )
}
const addEmployee = () => {
    var roleList = [];
    var managerList = [];
    connection.query(
        'SELECT title FROM role',
        function (err, results) {
            results.forEach((roleName) => {
                roleList.push(roleName.title);
            });
            console.log(roleList);
            if (err) {
                console.log(err);
            }
        });
    connection.query(
        'SELECT first_name, last_name FROM employee WHERE is_manager = true',
        function (err, results) {
            results.forEach((managerName) => {
                managerList.push(managerName.first_name + ' ' + managerName.last_name);
                managerList.push("None");
            });
            console.log(managerList);
            if (err) {
                console.log(err);
            }
        }
    )
    inquirer.prompt([{
        type: 'input',
        message: "What is the employee's first name?",
        name: 'firstName',
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'lastName',
    },
    {
        type: 'list',
        message: "What is the employee's role?",
        name: 'empRole',
        choices: roleList,
    },
    {
        type: 'confirm',
        message: 'Is the employee a manager?',
        name: 'isManager',
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'managerAssignment',
        choices: managerList,
        when: (answers) => answers.isManager === false
    }
    ])
        .then((answers) => {
            if (answers.managerAssignment === 'None') {
                answers.managerAssignment = null;
            }
    connection.query(
        `INSERT INTO employee (first_name, last_name, role_name, is_manager, manager)
        VALUES ('${answers.firstName}', '${answers.lastName}', '${answers.empRole}', ${answers.isManager}, '${answers.managerAssignment}');`,
        function (err, results) {
            if (err) {
                console.log(err);
            }
        }
    )})
    .then(() => {
    connection.query(
        `UPDATE employee e
        JOIN role r ON e.role_name = r.title
        SET e.role_id = r.id 
        WHERE e.role_name = r.title;`,
        function(err, results) {
            if (err) {
                console.log(err);
            }
        }
    )
})
.then(() => {
    connection.query(
        `UPDATE employee e 
        SET e.manager_id = (
            SELECT id FROM (
                SELECT id, CONCAT(first_name, ' ', last_name) AS full_name
                FROM employee /* Thanks ChatGPT */
            ) AS e2
            WHERE e2.full_name = e.manager
        )
        WHERE e.manager IS NOT NULL;`,
        function(err, results) {
            if(err) {
                console.log(err);
            }
            console.log('Added employee to database');
            runPrompts(questions);
        }
    )
})
}
const updateEmployee = () => {
    var roleList = [];
    connection.query(
        'SELECT title FROM role',
        function (err, results) {
            results.forEach((roleName) => {
                roleList.push(roleName.title);
            });
            console.log(roleList);
            if (err) {
                console.log(err);
            }
        });
}
const viewRoles = () => {
    connection.query(
        'SELECT * FROM role',
        function (err, results, fields) {
            console.table(results);
            if (err) {
                console.log(err);
            }
            runPrompts(questions);
        }
    )
}
const addRole = () => {
    var departmentList = [];
    connection.query(
        'SELECT name FROM department',
        function (err, results) {
            results.forEach((dept) => {
                departmentList.push(dept.name);
            });
            console.log(departmentList)
            if (err) {
                console.log(err);
            }
        });
    inquirer.prompt([{
        type: 'input',
        message: 'What is the name of the role? ',
        name: 'newRole',
    },
    {
        type: 'input',
        message: 'What is the salary for this role? ',
        name: 'roleSalary',
    },
    {
        type: 'list',
        message: 'What department does the role belong to? ',
        name: 'roleDept',
        choices: departmentList,

    }])
        .then((answers) => {
            connection.query(
                `INSERT INTO role (title, salary, department_name)
            VALUES ('${answers.newRole}', '${answers.roleSalary}', '${answers.roleDept}');`,
                function (err, results) {
                    if (err) {
                        console.log(err);
                    }

                }
            )
        })
        .then(() => {
            connection.query(
                `UPDATE role r 
            JOIN department d ON r.department_name = d.name
            SET r.department_id = d.id
            WHERE r.department_name = d.name;`,
                function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    console.log('Added role to database');
                    runPrompts(questions);
                }
            )
        })

}
const viewDepartments = () => {
    connection.query(
        'SELECT * FROM department',
        function (err, results) {
            console.table(results);
            if (err) {
                console.log(err);
            }
            runPrompts(questions);
        }
    )

}
const addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        message: 'What is the name of the department? ',
        name: 'newDepartment'
    })
        .then((answers) => {
            connection.query(
                `INSERT INTO department (name)
        VALUES ("${answers.newDepartment}")`,
                function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    console.log('Added Department to the database');
                    runPrompts(questions);
                }
            )
        })
}

const questions = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'options',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
}
]
const runPrompts = (prompts) => {
    inquirer
        .prompt(prompts)
        .then((answers) => {
            console.log(answers);
            if (answers.options === 'View All Roles') {
                viewRoles();
            }
            if (answers.options === 'View All Departments') {
                viewDepartments();
            }
            if (answers.options === 'Add Department') {
                addDepartment();
            }
            if (answers.options === 'View All Employees') {
                viewEmployees();
            }
            if (answers.options === 'Add Role') {
                addRole();
            }
            if (answers.options === 'Add Employee') {
                addEmployee();
            }
        })
}
runPrompts(questions);