//Command line interface file. Write inquirer prompts in this file
const inquirer = require('inquirer');
const server = require('./server');
const { pool } = require('./connection');
const { connectToDb } = require('./connection');



function mainMenu(){
    inquirer.prompt([
        { 
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]) .then(answer => {
        if (answer.action === `View all departments`){
            // server.viewDepartments()
        }
        if (answer.action === `View all roles`){
            // server.viewRoles()
        }
        if (answer.action === `View all employees`){
            // server.viewEmployees()
        }
        if (answer.action === `Add a department`){
            // server.addDepartment()
        }
        if (answer.action === `Add a role`){
            // server.addRole()
        }
        if (answer.action === `Add an employee`){
            // server.addEmployee()
        }
        if (answer.action === `Update an employee role`){
            // server.updateEmployeeRole()
        }
        if (answer.action === `Exit`){
            console.log('Goodbye!')
            process.exit();
        }
    });
}

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the name of the department:'
        }
    ]) .then(answer => {
        server.addDepartment(answer.department).then(() => mainMenu())
    });
}

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role:'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID of the role:'
        }
    ]) .then(answer => {
        //server.addRole(answer.title, answer.salary, answer.department_id).then(() => mainMenu())
    })
}

function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee:'
        },
        {
            type: 'input',
            name: 'role',
            message: 'Enter the role of the employee:'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Enter the manager of the employee:'
        }
    ]) .then(answer => {
        //server.addEmployee(answer.first_name, answer.last_name, answer.role, answer.manager).then(() => mainMenu())
    })
}

function updateEmployeeRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee',
            message: 'Enter the name of the employee:'
        },
        {
            type: 'input',
            name: 'role',
            message: 'Enter the name of the new role:'
        }
    ]) .then(answer => {
        //server.updateEmployeeRole(answer.employee, answer.role).then(() => mainMenu())
    })
}