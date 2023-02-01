const express = require("express");
const inquirer = require("inquirer");
const db = require("./db/connection");
const { department, role, employee } = require("./utils");
require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// connecting to server
db.connect((err) => {
  if (err) throw err;
  console.log("database connected");
  app.listen(PORT, () => {
    console.log(`
    server is running on localhost:${PORT}`);
    init();
  });
});

const crud = {
  getDepartments: `view ${department}s`,
  getRoles: `view ${role}s`,
  getEmployees: `view ${employee}s`,
  postDepartment: `add a ${department}`,
  postRole: `add a ${role}`,
  postEmployee: `add a ${employee}`,
  putEmployeeRole: `update an ${employee} ${role}`,
};

// inquirer
// - start up | a welcome screen & a call to the main menu
function init() {
  let date = new Date().getFullYear();

  console.log(`
  ==========================
   employee tracker v.2.0.1
   \u00a9${date} Edwin M. Escobar
  ==========================
  `);

  mainMenu();
}

// - main menu | a list of options to perform the main crud operations
function mainMenu() {
  const question = [
    {
      type: "list",
      name: "options",
      message: "what would you like to do?",
      choices: [
        crud.getDepartments,
        // crud.getRoles,
        // crud.getEmployees,
        // crud.postDepartment,
        // crud.postRole,
        // crud.postEmployee,
        // crud.putEmployeeRole,
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
        default:
          console.log("nothing selected");
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
}

// crud operators for employee_tracker_db
// - read | get specified tables from the database
function viewDepartments() {
  const sql = `SELECT * FROM ${department}`
  // mysql | .query(request, response), if there are no errors, err is null & returns response. 
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(`${department}s: `);
    console.table(rows);
  });
  mainMenu();
}

function viewRoles() {
  const sql = `SELECT * FROM ${role}`
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(`${role}s: `);
    console.table(rows);
  });
}

function viewEmployees() {
  const sql = `SELECT * FROM ${employee}`
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(`${employee}s: `);
    console.table(rows);
  });
}

// - post | add a new department, role, or employee to employee_tracker_db.
function addDepartment() {
  const sql = `INSERT INTO ${department} (id, name) VALUES (?,?)`;
  // const params = [2, 'Finance']
  db.query(sql, params, (err, result) => {
    if (err) throw err;
    console.log(result);
  })

  // captures key values
  // const question = [
  //   {
  //     type: "input",
  //     name: "departmentName",
  //     message: "enter department name",
  //     validate: (input) => {
  //       if (input) {
  //         return true;
  //       } else {
  //         console.log("enter department name");
  //         return false;
  //       }
  //     },
  //   },
  // ];

  // inquirer.prompt(question).then((answer) => console.log(answer));
}

function addRole() {
  console.log(`add ${role}`);
  const question = [
    {
      type: "input",
      name: "roleName",
      message: "enter role name",
      validate: (input) => {
        if (input) {
          return true;
        } else {
          console.log("enter role name");
          return false;
        }
      },
    },
    {
      type: "number",
      name: "salary",
      message: "enter salary",
      validate: (input) => {
        if (!input) {
          console.log("enter salary");
          return false;
        }
        return true;
      },
    },
    {
      type: "choices",
      name: "department",
      message: "which department does this role belong to?",
      options: "",
      validate: (input) => {
        if (!input) {
          console.log(
            "which department does this role belong to? enter department id"
          );
          return false;
        }
        return true;
      },
    },
  ];

  // inquirer.prompt(question).then((answer) => console.log(answer));
}

function addEmployee() {
  const question = [
    {
      type: "input",
      name: "firstName",
      message: "enter first name",
      validate: (input) => {
        if (input) {
          return true;
        } else {
          console.log("enter last name");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "lastName",
      message: "enter last name",
      validate: (input) => {
        if (input) {
          return true;
        } else {
          console.log("enter last name");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "role",
      message: "enter employee role",
      validate: (input) => {
        if (input) {
          return true;
        } else {
          console.log("enter name employee role");
          return false;
        }
      },
    },
  ];

  inquirer.prompt(question).then((answer) => console.log(answer));
}

// - put | update an employee's role
function updateEmployeeRole() {
  // sql read query via employee id
  const sql = `SELECT * FROM ${employee} WHERE id = 1`;
  db.query(sql, (err, row) => {
    if (err) throw err;
    console.log(row)
  })

  // prompt([]);
  // const question = [
  //   {
  //     type: "input",
  //     name: "role",
  //     message: "enter new role",
  //   },
  // ];

  // inquirer.prompt(question).then((answer) => console.log(answer));
}

// function deleteFunction() {
  // const sql = `DELETE FROM ${} WHERE id = ?`
  // // parameters (request, number of rows affected, response)
  // db.query(sql, 1, (err, result) => {})
// }