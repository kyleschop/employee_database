DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee(
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

INSERT INTO department (name)
VALUES ("Finance"),
       ("Legal"),
       ("Management"),
       ("Sales"),
       ("Engineering");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Manager", 100000.00, 1),
       (2, "Cashier", 36000.00, 4),
       (3, "Lawyer", 90000.75, 2),
       (4, "Accountant", 80000.05, 3),
       (5, "Tech", 100000.00, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "James", "Schoppmann", 1, 1),
       (2, "Justus", "Schoppmann", 2, NULL),
       (3, "Kyle", "Schoppmann", 4, NULL),
       (4, "Austin", "Schoppmann", 3, 3);