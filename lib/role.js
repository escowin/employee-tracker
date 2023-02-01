const inquirer = require("inquirer");
const db = require("../db/connection");
// const { mainMenu } = require("./menu");
const { role } = require("../utils");
require("console.table");

// - role | get, post
function viewRoles() {
  const sql = `SELECT * FROM ${role}`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(`${role}s: `);
    console.table(rows);
    // mainMenu();
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
        // mainMenu();
      });
    });
  });
}

module.exports = { viewRoles, addRole }