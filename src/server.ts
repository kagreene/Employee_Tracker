
import { pool, connectToDb } from './connection.js';
import { mainMenu } from './Cli.js';
await connectToDb();



export interface Department {
    id: number;
    name: string;
}

export interface Role {
    id: number;
    title: string;
    salary: number;
    department_id: number;
}

export interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    role_id: number;
    manager_id: number | null;
    department?: string;
    salary?: number;
    manager?: string;
}


export async function viewDepartments() {
    const sql = 'SELECT * FROM department';
    try {
        console.log(`Fetching departments`);
        const result = await pool.query(sql);
        return result.rows;
    } catch (err) {
        console.error('Error fetching departments:', err);
        throw err;
    }
};
// await pool.query(sql, (err: Error, res: QueryResult) => {
//     if (err) {
//         console.log(`Error fetching departments: ${err}`);
//     }
//     else { return res.rows };
// })


export async function viewRoles() {
    const sql = 'SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id';
    try {
        const result = await pool.query(sql);
        return result.rows;
    } catch (err) {
        console.error('Error fetching roles:', err);
        throw err;
    }
    // await pool.query(sql, (err: Error, res: QueryResult) => {
    //     if (err) { console.log(`Error fetching roles: ${err}`) }
    //     else { console.table(res.rows) }
    // });

};

export async function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,  
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;
    try {
        const result = await pool.query(sql)
        return result.rows;
    } catch (err) {
        console.error('Error fetching employees:', err);
        throw err;
    }
    // await pool.query(sql, (err: Error, res: QueryResult) => {
    //     if (err) {
    //         console.log(`Error fetching employees: ${err}`);
    //     }
    //     else { console.table(res.rows) };
    // })

};

export async function addDepartment(name: string) {
    const sql = 'INSERT INTO department (name) VALUES ($1)';
    try {
        const result = await pool.query(sql, [name]);
        return result.rows;
    } catch (err) {
        console.error('Error adding department:', err);
        throw err;
    }
    // await pool.query(sql, [name], (err: Error, res: QueryResult) => {
    //     if (err) { console.log(`Error adding department: ${err}`) }
    //     else { console.table(res.rows) }
    // });

};

export async function addRole(title: string, salary: number, department_id: number) {
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
    try {
        await pool.query(sql, [title, salary, department_id])
        console.log(`Added ${title} to roles`);
    } catch (err) {
        console.error('Error adding role:', err);
        throw err;
    }
};
// await pool.query(sql, [role, salary, department_id], (err: Error, res: QueryResult) => {
//     if (err) { console.log(`Error adding role: ${err}`) }
//     else { console.table(res.rows) }
// });



//need to get manager_id from manager name and role_id from role name
export async function addEmployee(first_name: string, last_name: string, role_id: number, manager_id: number) {
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
    try {
        await pool.query(sql, [first_name, last_name, role_id, manager_id]);
        console.log(`Added ${first_name} ${last_name} to employees`);
    }
    catch (err) {
        console.error('Error adding employee:', err);
        throw err;
    };
    // await pool.query(sql, [first_name, last_name, role_id, manager_id], (err: Error, res: QueryResult) => {
    //     if (err) { console.log(`Error adding employee: ${err}`) }
    //     else { console.table(res.rows) }
    // });
};

export async function updateEmployeeRole(employee_id: number, role_id: number) {
    const sql = 'UPDATE employee SET role_id = $1 WHERE id = $2';
       try {
        pool.query(sql, [role_id, employee_id]);
        console.log(`Updated employee role`);
    } catch (err) {
        console.error(`Error updating employee role:`, err);
        throw err;
    }
    // await pool.query(sql, [role_id, employee_id], (err: Error, res: QueryResult) => {
    //     if (err) { console.log(`Error updating employee role: ${err}`) }
    //     else { console.table(res.rows) }
    // });
    // try {
    //     pool.query(`UPDATE employee SET role_id = $1 WHERE id = $2`, [role_id, employee_id]);
    //     console.log(`Updated employee role`);
    // } catch (err) {
    //     console.error(`Error updating employee role:`, err);
    //     throw err;
    // }
};

mainMenu();

