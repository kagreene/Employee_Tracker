INSERT INTO department (name) 
VALUES ('Engineering'), ('Finance'), ('Legal'), ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 100000, 1), ('Accountant', 80000, 2), ('Lawyer', 120000, 3), ('Salesperson', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Alice', 'Henderson', 1, NULL), ('Bob', 'Smith', 2, 1), ('Charlie', 'Brown', 3, 1), ('Diane', 'Johnson', 4, 1);
