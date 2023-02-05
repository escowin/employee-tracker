const inquirer = require("inquirer");
const db = require("../db/connection");
const { department } = require("../utils");
require("console.table");

// - department | get, post
function viewDepartments() {
  const sql = `SELECT * FROM ${department}`;
  // mysql | .query(request, response), if there are no errors, err is null & returns response.
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(`
      ${department}s: `);
    console.table(rows);
    require("./menu").mainMenu();
  });
}

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
      require("./menu").mainMenu();
    });
  });
}

module.exports = { viewDepartments, addDepartment }