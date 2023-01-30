const inquirer = require("inquirer");
const express = require("express");
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
  });
  viewDepartments();
  viewRoles();
  viewEmployees();
});

// crud operators for employee_tracker_db
// - read | gets specified tables from the database
const viewDepartments = () => {
  db.query("SELECT * FROM department", (err, result) => {
    if (err) throw err;
    console.log("All departments: ");
    console.table(result);
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM role", (err, result) => {
    if (err) throw err;
    console.log("All roles: ");
    console.table(result);
  });
};

const viewEmployees = () => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) throw err;
    console.log("All roles: ");
    console.table(result);
  });
};


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
