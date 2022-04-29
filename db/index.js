const { findAllEmployees } = require("../../UTA-VIRT-BO-FSF-PT-10-2021-U-B/challenge-solutions/week-12/02-Challenge/Main/db");
const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    // FIND | EMPLOYEE & JOIN ROLES, SALARIES, DEPARTMENTS, MANAGERS
    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN alone on employee.role_id = role.id LEFT JOIN department on role. department_id = department.id LEFT JOIN employee manager on manger.id = employee.manager_id"
        );
    }

    // FIND | EMPLOYEES (SANS ID)
    findAllPossibleManagers(employeeId) {
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM employee WHERE id !=?",
            employeeId
        );
    }

    // CREATE | EMPLOYEE
    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee)
    }

    // UPDATE | EMPLOYEE ROLE

    // UPDATE | EMPLOYEE MANAGER


    // FIND | ROLE
    // CREATE | ROLE

    // FIND | DEPARTMENT
    // CREATE | DEPARTMENT

module.exports = new DB(connection);