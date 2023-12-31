const inquirer = require('inquirer');
const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'company_db'
});
const viewEmployees = () => {
    console.log('World');
}
const addEmployee = () => {
    console.log('Hello');
}
const updateEmployee = () => {

}
const viewRoles = () => {
    connection.query(
        'SELECT * FROM role',
        function(err, results, fields) {
            console.log(results);
            console.log(fields);
            if (err) {
                console.log(err);
            }
        }
    )
}
const addRole = () => {

}
const viewDepartments = () => {
    connection.query(
        'SELECT * FROM department',
        function(err, results) {
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
        function(err, results) {
            console.log('Added Department to the database');
            if (err) {
                console.log(err);
            }
            runPrompts(questions)
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
    })
}
runPrompts(questions);