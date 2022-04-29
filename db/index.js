const { findAllEmployees } = require("../../UTA-VIRT-BO-FSF-PT-10-2021-U-B/challenge-solutions/week-12/02-Challenge/Main/db");
const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    // FIND | ALL EMPLOYEES & JOIN ROLES, SALARIES, DEPARTMENTS, MANAGERS
    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN alone on employee.role_id = role.id LEFT JOIN department on role. department_id = department.id LEFT JOIN employee manager on manger.id = employee.manager_id"
        );
    }
    // FIND | ALL EMPLOYEES (SANS EMPLOYEE ID)
    findAllPossibleManagers(employeeId) {
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM employee WHERE id !=?",
            employeeId
        );
    }


    // CREATE | EMPLOYEE
    createEmployee(employee) {
        return this.connection.promise().query(
            "INSERT INTO employee SET ?",
            employee)
    }
    // UPDATE | EMPLOYEE ROLE
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }
    // UPDATE | EMPLOYEE MANAGER
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.promise().query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerId, employeeId]
        );
    }


    // FIND | ROLE
    findAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }
    // CREATE | ROLE
    createRole(role) {
        return this.connection.promise().query(
            "INSERT INTO role SET ?", role
        );
    }

    // FIND | DEPARTMENTS
    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }


    // VIEW | DEPARTMENT & JOIN EMPLOYEES, ROLE TABLES
    viewDepartmentBudgets() {
        return this.connection.promise().query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }
    // CREATE | DEPARTMENT
    createDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    }

    // FIND | EMPLOYEES IN SPECIFIC DEPARTMENT, JOIN ROLES TABLE (TITLE)
    findAllEmployeesByDepartment(departmentId) {
        return this.connection.promise().query(
          "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
          departmentId
        );
      }

    // FIND | EMPLOYEES BY MANAGER, JOIN DEPARTMENT & ROLES TABLE (NAMES) 
    findAllEmployeesByManager(managerId) {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
      managerId
    );
  }
}


module.exports = new DB(connection);