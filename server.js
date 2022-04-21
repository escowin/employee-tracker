const inquirer = require("inquirer");
const db = require("./config/connection");
table = require("console.table");


// START | SELECT VIEW, ADD, UPDATE, OR EXIT. 
const startApp = () => {
    inquirer
    .prompt([
        {
            type: "list",
            name: "start",
            message: "select a view:",
            choices: ["view", "add", "update", "exit"],
        },
    ])
    .then((res) => {
        switch (res.startApp) {
            case "view":
                viewTables();
                break;
            case "add":
                add();
                break;
            case "update":
                update();
                break;
            case "exit":
                console.log('exiting.')
                break;
                default:
                    console.log('default');
        }
    });
};

// VIEW BY DEPT, EMPLOYEE, ROLE
const viewTables = () => {
    inquirer
    .prompt([
        {
            type: "list",
            name: "view",
            message: "select a view:",
            choices: [
              'department view',
              'employee view',
              'role view',
            ],
        },
    ])
    .then((res) => {
        switch (res.viewTables) {
            case "department view":
              viewDepartment();
              break;
            case "employee view":
              viewEmployee();
              break;
            case "role view":
              viewRole();
              break;
              default:
                  console.log('default');
        }
    });
};

viewDepartment = async () => {
    const departments = await db.viewAllDepartments();
    console.table(departments)
};

addDepartment = () => {};

editDepartment = () => {};

// EMPLOYEE
viewEmployee = async () => {
    const employees = await db.viewAllEmployees();
    console.table(employees)
};

addEmployee = () => {};

editEmployee = () => {};

// ROLE OPTIONS
viewRole = async () => {
    const roles = await db.viewAllRoles();
    console.table(roles)
};

addRole = () => {};

editRole = () => {};


// call
startApp();