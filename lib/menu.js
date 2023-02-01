const inquirer = require("inquirer");
const db = require("../db/connection");
const { department, role, employee } = require("../utils");
const { viewDepartments, addDepartment } = require("./department");
const { viewRoles, addRole } = require("./role");
const {
  viewEmployees,
  addEmployee,
  updateEmployeeRole,
  deleteEmployee,
} = require("./employee");
require("console.table");

const crud = {
  getDepartments: `view ${department}s`,
  postDepartment: `add a ${department}`,
  getRoles: `view ${role}s`,
  postRole: `add a ${role}`,
  getEmployees: `view ${employee}s`,
  postEmployee: `add an ${employee}`,
  putEmployeeRole: `update an ${employee} ${role}`,
  deleteEmployee: `delete an ${employee}`,
};

// - start up | welcome & main menu
function init() {
  let date = new Date().getFullYear();

  console.log(`
    ===============================================
      employee tracker v.2.0.1
      \u00a9${date} Edwin M. Escobar
  
      https://github.com/escowin/employee-tracker
    ===============================================
    `);

  mainMenu();
}

function mainMenu() {
  const question = [
    {
      type: "list",
      name: "options",
      message: "what would you like to do?",
      choices: [
        crud.getDepartments,
        crud.getRoles,
        crud.getEmployees,
        crud.postDepartment,
        crud.postRole,
        crud.postEmployee,
        crud.putEmployeeRole,
        crud.deleteEmployee,
      ],
    },
  ];

  inquirer
    .prompt(question)
    .then((answer) => {
      switch (answer.options) {
        case crud.getDepartments:
          viewDepartments();
          break;
        case crud.getRoles:
          viewRoles();
          break;
        case crud.getEmployees:
          viewEmployees();
          break;
        case crud.postDepartment:
          addDepartment();
          break;
        case crud.postRole:
          addRole();
          break;
        case crud.postEmployee:
          addEmployee();
          break;
        case crud.putEmployeeRole:
          updateEmployeeRole();
          break;
        case crud.deleteEmployee:
          deleteEmployee();
          break;
        default:
          console.log("nothing selected");
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
}

module.exports = { init, mainMenu };
