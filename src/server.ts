import express from 'express';
import {QueryResult} from 'pg';
import {pool, connectToDb} from './connection';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

export async function viewDepartments(){
    try {
        const result = await pool.query('SELECT * FROM department');
        console.table(result.rows);
    } catch (err) {
        console.error('Error fetching departments:', err);
        throw err;
    }
};

export async function viewRoles(){
    try {
        const result = await pool.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id');
        console.table(result.rows);
    } catch (err) {
        console.error('Error fetching roles:', err);
        throw err;
    }
};

export async function viewEmployees(){
    try {
        const result = await pool.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
        return result.rows;
    } catch (err) {
        console.error('Error fetching employees:', err);
        throw err;}
};

export async function addDepartment(name: string) {
    try {
        const result = await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.table(result.rows);
    } catch (err) {
        console.error('Error adding department:', err);
        throw err;
    }
};

export async function addRole(title: string, salary: number, department_id: number){
    try {
        await pool.query('INSERT INTO role (name, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id])
        console.log(`Added ${title} to roles`);
    } catch (err) {
        console.error('Error adding role:', err);
        throw err;
    }
};

//need to get manager_id from manager name and role_id from role name
export async function addEmployee(first_name: string, last_name: string, role_id: number, manager_id: number){
    try{
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
        console.log(`Added ${first_name} ${last_name} to employees`);
    }
    catch (err) {
        console.error('Error adding employee:', err);
        throw err;
    };
};

export async function updateEmployeeRole(employee_id: number, role_id: number){
    try {
        pool.query(`UPDATE employee SET role_id = $1 WHERE id = $2`, [role_id, employee_id]);
        console.log(`Updated employee role`);
    } catch (err) {
        console.error(`Error updating employee role:`, err);
        throw err;
    }
};

