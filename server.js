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
// - start up | welcome & main menu
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

function mainMenu() {
  const question = [
    {
      type: "list",
      name: "options",
      message: "what would you like to do?",
      choices: [
        // crud.getDepartments,
        // crud.getRoles,
        // crud.getEmployees,
        // crud.postDepartment,
        crud.postRole,
        crud.postEmployee,
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

// crud operators to use on employee_tracker_db
// - read | get specified tables from the database
function viewDepartments() {
  const sql = `SELECT * FROM ${department}`;
  // mysql | .query(request, response), if there are no errors, err is null & returns response.
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(`${department}s: `);
    console.table(rows);
  });
}

function viewRoles() {
  const sql = `SELECT * FROM ${role}`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(`${role}s: `);
    console.table(rows);
  });
}

function viewEmployees() {
  const sql = `SELECT * FROM ${employee}`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(`${employee}s: `);
    console.table(rows);
  });
}

// - post | add a new department, role, or employee to employee_tracker_db.
function addDepartment() {
  const question = [
    {
      type: "input",
      name: "name",
      message: "enter department name",
      validate: (input) => {
        if (input) {
          return true;
        } else {
          console.log("enter department name");
          return false;
        }
      },
    },
  ];

  inquirer.prompt(question).then((answer) => {
    // post answer into the database table
    const sql = `INSERT INTO ${department} (name) VALUES (?)`;
    params = answer.name;

    db.query(sql, params, (err, result) => {
      if (err) throw err;
      console.log(`${params} added to ${department}`);
      mainMenu();
    });
  });
}

function addRole() {
  const sql = `SELECT * FROM ${department}`;
  db.query(sql, (err, table) => {
    if (err) throw err;
    // es6 | .map() | each department in the database
    const departments = table.map((row) => {
      return { value: row.id, name: row.name }
    });

    const questions = [
      {
        type: "input",
        name: "title",
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
        type: "input",
        name: "salary",
        message: "enter salary",
      },
      {
        type: "list",
        name: "department_id",
        message: "which department does this role belong to?",
        choices: departments,
      },
    ];

    inquirer.prompt(questions).then((answer) => {
      const sql = `INSERT INTO ${role} (title) VALUES (?)`;
      console.log(answer);
    });
  });
}

function addEmployee() {
  //
  db.query(`SELECT * FROM ${employee}`, (err, table) => {
    console.log(table);
  });
  const question = [
    {
      type: "input",
      name: "first_name",
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
      name: "last_name",
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
      type: "list",
      name: "role_id",
      message: "select role",
      choices: [""],
    },
    {
      type: "list",
      name: "has_manager",
      message: "does this employee have a manager?",
      choices: ["Yes", "No"],
      default: "Yes",
    },
    {
      type: "list",
      name: "manager_id",
      message: "select employee's manager",
      when: (answers) => answers.has_manager === "Yes",
      choices: [],
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    let manager_id = null;
    if (answers.has_manager === "Yes") {
      manager_id = answers.manager_id;
    }
    console.log(answers);

    const sql = `INSERT INTO ${employee} (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params =
      (answers.first_name,
      answers.last_name,
      answers.role_id,
      answers.manager_id);
  });
}

// - put | update an employee's role
function updateEmployeeRole() {
  // sql read query via employee id
  const sql = `SELECT * FROM ${employee} WHERE id = 1`;
  db.query(sql, (err, row) => {
    if (err) throw err;
    console.log(row);
  });

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
