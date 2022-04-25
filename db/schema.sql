DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department(
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

-- department > employee role
CREATE TABLE employee_role(
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
);

-- employee role > employee
CREATE TABLE employee(
    employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    role_id INTEGER,
    CONSTRAINT fk_employee_role FOREIGN KEY (role_id) REFERENCES employee_role(role_id) ON DELETE CASCADE,
    manager_id INTEGER REFERENCES employee(employee_id) ON DELETE SET NULL
);