const inquirer = require("inquirer");
const db = require("../db/connection");
// const { mainMenu } = require("./menu");
const { employee } = require("../utils");
require("console.table");

// - employee | get, post, put, delete
function viewEmployees() {
  const sql = `SELECT * FROM ${employee}`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(`${employee}s: `);
    console.table(rows);
    //   mainMenu();
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
          // mainMenu();
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
          // mainMenu();
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
        //   mainMenu();
      });
    });
  });
}

module.exports = {
  viewEmployees,
  addEmployee,
  updateEmployeeRole,
  deleteEmployee,
};
