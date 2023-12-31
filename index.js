const inquirer = require('inquirer');
// const mysql2 = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'localhost', 
//     user: 'root',
//     database: 'company_db'
// });

const questions = [{
    type: 'list',
    message: 'What would you like to do?', 
    name: 'options',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
}
]
const runPrompts = () => { 
inquirer
    .prompt(questions)
    .then((answers) => {
        console.log(answers);
    })
}
const viewEmployees = () => {
    console.log('World');
}
const addEmployee = () => {
    console.log('Hello');
}
const updateEmployee = () => {

}
runPrompts();