const express = require("express");
const inquirer = require("inquirer");
const db = require("./db/connection");

const PORT = process.env.PORT || 3001;
const app = express();

// connecting to server
db.connect((err) => {
  if (err) throw err;
  console.log("database connected");
  app.listen(PORT, () => {
    console.log(`
    server is running on port ${PORT}
    localhost:${PORT}`);
    init();
  });
  // viewDepartments();
  // viewRoles();
  // viewEmployees();
});

// inquirer prompt
function init() {
  let date = new Date().getFullYear();

  console.log(`
  ==========================
   employee tracker v.2.0.1
   \u00a9${date} Edwin M. Escobar
  ==========================
  `);

  initPrompts();
}

// inquirer prompts
function initPrompts() {
  const questions = [
    {
      type: "list",
      name: "options",
      message: "what would you like to do?",
      choices: ["view departments", "view roles", "view employees"],
    },
  ];

  inquirer
    .prompt(questions)
    .then((answer) => {
      switch (answer.options) {
        case "view departments":
          viewDepartments();
          break;
        case "view roles":
          viewRoles();
          break;
        case "view employees":
          viewEmployees();
          break;
        default:
          console.log('nothing selected');
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
}

// crud operators for employee_tracker_db
// - read | gets specified tables from the database
function viewDepartments() {
  db.query("SELECT * FROM department", (err, result) => {
    if (err) throw err;
    console.log("All departments: ");
    console.table(result);
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", (err, result) => {
    if (err) throw err;
    console.log("All roles: ");
    console.table(result);
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) throw err;
    console.log("All roles: ");
    console.table(result);
  });
}

// cli app crud:
// - get routes | view all departments, roles, employees.
// - post routes | add a department, a role, and employee.
// - update routes | update an employee's role.

// POST to database
// add department prompt : enter name.
// add role prompt : enter name, salary, and department.
// add employee prompt : enter first name, last name, role, and manager.

// UPDATE database
// role prompt : select an employee, update their role.
