const inquirer = require("inquirer");
const db = require("../db/connection");
const { department, role, employee } = require("../utils");
const { viewDepartments, addDepartment } = require("./department");
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
    .then(() => {
      mainMenu();
    })
    .catch((err) => {
      if (err) throw err;
    });
}

// - role | get, post
function viewRoles() {
  const sql = `SELECT * FROM ${role}`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(`${role}s: `);
    console.table(rows);
    mainMenu();
  });
}

function addRole() {
  const sql = `SELECT * FROM ${department}`;
  db.query(sql, (err, table) => {
    if (err) throw err;
    // es6 | .map() | each department in the database
    const departments = table.map((row) => {
      return { value: row.id, name: row.name };
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
      const sql = `INSERT INTO ${role} (title, salary, department_id) VALUES (?,?,?)`;
      const params = [answer.title, answer.salary, answer.department_id];

      // mysql | query method posts role to database by taking the sql command & param values in its parameters
      db.query(sql, params, (err, res) => {
        if (err) throw err;
        console.log(`${params[0]} added to ${role}s`);
        mainMenu();
      });
    });
  });
}

// - employee | get, post, put, delete
function viewEmployees() {
  const sql = `SELECT * FROM ${employee}`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(`${employee}s: `);
    console.table(rows);
    mainMenu();
  });
}

function addEmployee() {
  // queries employee table to get a list of managers for inquirer prompt
  db.query(`SELECT * FROM ${employee}`, (err, table) => {
    if (err) throw err;
    const managers = table.map((row) => {
      return { value: row.id, name: `${row.first_name} ${row.last_name}` };
    });

    // queries role table to get a list of roles for inquirer prompt
    db.query(`SELECT * FROM ${role}`, (err, table) => {
      if (err) throw err;
      const roles = table.map((row) => {
        return { value: row.id, name: row.title };
      });

      const questions = [
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
          choices: roles,
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
          choices: managers,
        },
      ];

      // inquirer displays questions in cli, input values are then posted into database via query
      inquirer.prompt(questions).then((answer) => {
        let manager_id = null;
        if (answer.has_manager === "Yes") {
          manager_id = answer.manager_id;
        }

        const sql = `INSERT INTO ${employee} (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        const params = [
          answer.first_name,
          answer.last_name,
          answer.role_id,
          answer.manager_id,
        ];
        db.query(sql, params, (err, res) => {
          if (err) throw err;
          console.log(`${params[0]} ${params[1]} added to ${employee}s`);
          mainMenu();
        });
      });
    });
  });
}

function updateEmployeeRole() {
  // selects an existing employee from the database
  const sql = `SELECT * FROM ${employee}`;
  db.query(sql, (err, employeeTable) => {
    if (err) throw err;
    const employees = employeeTable.map((row) => {
      return { value: row.id, name: `${row.first_name} ${row.last_name}` };
    });

    const sql = `SELECT * FROM ${role}`;
    db.query(sql, (err, roleTable) => {
      if (err) throw err;
      const roles = roleTable.map((row) => {
        return { value: row.id, name: row.title };
      });

      const questions = [
        {
          type: "list",
          name: "id",
          message: "select employee",
          choices: employees,
        },
        {
          type: "list",
          name: "role_id",
          message: "select new role",
          choices: roles,
        },
      ];

      inquirer.prompt(questions).then((answer) => {
        const sql = `UPDATE ${employee} SET role_id = ? WHERE id = ? `;
        const params = [answer.role_id, answer.id];

        db.query(sql, params, (err, result) => {
          if (err) throw err;
          console.log(`${employees.first_name}'s ${role} has been updated`);
          mainMenu();
        });
      });
    });
  });
}

function deleteEmployee() {
  const sql = `SELECT * FROM ${employee}`;
  db.query(sql, (err, employeeTable) => {
    if (err) throw err;
    const employees = employeeTable.map((row) => {
      return { value: row.id, name: `${row.first_name} ${row.last_name}` };
    });

    const question = [
      {
        type: "list",
        name: "id",
        message: "select employee to delete",
        choices: employees,
      },
    ];

    inquirer.prompt(question).then((answer) => {
      const sql = `DELETE FROM ${employee} WHERE id = ?`;
      const params = answer.id;

      db.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log(`employee deleted`);
        mainMenu();
      });
    });
  });
}

module.exports = { init, mainMenu };
