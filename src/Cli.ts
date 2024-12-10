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
             server.viewDepartments();
        }
        if (answer.action === `View all roles`){
             server.viewRoles();
        }
        if (answer.action === `View all employees`){
             server.viewEmployees();
        }
        if (answer.action === `Add a department`){
            addDepartmentPrompt();
        }
        if (answer.action === `Add a role`){
            addRolePrompt();
        }
        if (answer.action === `Add an employee`){
            addEmployeePrompt();
        }
        if (answer.action === `Update an employee role`){
            updateEmployeeRolePrompt();
        }
        if (answer.action === `Exit`){
            console.log('Goodbye!')
            process.exit();
        }
    });
}

async function addDepartmentPrompt(){
    const name = await inquirer.prompt([
        {type: 'input',
        name: 'name',
        message: 'Enter the name of the department:'
        },
    ]);
    await server.addDepartment(name);
    console.log(`Added ${name} to departments`);
    mainMenu();

    // inquirer.prompt([
    //     {
    //         type: 'input',
    //         name: 'department',
    //         message: 'Enter the name of the department:'
    //     }
    // ]) .then(answer => {
    //     server.addDepartment(answer.department).then(() => mainMenu())
    // });
}

async function addRolePrompt(){
    const departments: any[] = await server.viewDepartments();
    const departmentChoices = departments.map(department => ({name: department.name, value: department.id}));
    const role = await inquirer.prompt([
        {type: 'input',
        name: 'title',
        message: 'Enter the title of the role:'
        },
        {type: 'input',
        name: 'salary',
        message: 'Enter the salary of the role:'
        },
        {type: 'list',
        name: 'department_id',
        message: 'Choose the department of the role:',
        choices: departmentChoices
        },
    ]);
    await server.addRole(role.title, role.salary, role.department_id);
    console.log(`Added ${role.title} to the database`);
    mainMenu();
    // inquirer.prompt([
    //     {
    //         type: 'input',
    //         name: 'title',
    //         message: 'Enter the title of the role:'
    //     },
    //     {
    //         type: 'input',
    //         name: 'salary',
    //         message: 'Enter the salary of the role:'
    //     },
    //     {
    //         type: 'input',
    //         name: 'department_id',
    //         message: 'Enter the department ID of the role:'
    //     }
    // ]) .then(answer => {
    //     //server.addRole(answer.title, answer.salary, answer.department_id).then(() => mainMenu())
    // })
}
//Department should be a choice from a list of departments

async function addEmployeePrompt(){
    const roles: any[] = await server.viewRoles();
    const roleChoices = roles.map(role => ({name: role.title, value: role.id}));
    const employees: any[] = await server.viewEmployees();
    const managerChoices = employees.map(employee => ({name: `${employee.first_name} ${employee.last_name}`, value: employee.id}));
    const {first_name, last_name, role, manager} = inquirer.prompt([
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
            type: 'list',
            name: 'role',
            message: 'Select the employee role:',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select the manager of the employee:',
            choices: managerChoices,
        }
    ]) 
    await server.addEmployee(first_name, last_name, role, manager);
    console.log(`Added ${first_name} ${last_name} to employees`);
    mainMenu();
}

async function updateEmployeeRolePrompt(){
    const employees: any[] = await server.viewEmployees();
    const employeeChoices = employees.map(employee => ({name: `${employee.first_name} ${employee.last_name}`, value: employee.id}));
    const roles: any[] = await server.viewRoles();
    const roleChoices = roles.map(role => ({name: role.title, value: role.id}));
    const {employeeID, roleID}= await inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Enter the name of the employee:',
            choices: employeeChoices,
            //choose from a list
        },
        {
            type: 'list',
            name: 'role',
            message: 'Enter the name of the new role:',
            choices: roleChoices,
            //choose from a list
        }
    ]) 
    await server.updateEmployeeRole(employeeID, roleID);
    console.log(`Updated ${employeeID} to ${roleID}`);
    mainMenu();
}