const inquirer = require("inquirer");

// employee tracker redux, sql exercise.

// cli app crud:
// - get routes | view all departments, roles, employees.
// - post routes | add a department, a role, and employee.
// - update routes | update an employee's role.


// GET from database
// view all departments : displays table with department names & id
// view all roles : displays job title, role id, its department, and its salary
// view all employees : displays employee id, first name, last name, job titles, departments, salaries, and employee's managers

// POST to database
// add department prompt : enter name.
// add role prompt : enter name, salary, and department.
// add employee prompt : enter first name, last name, role, and manager.

// UPDATE database
// role prompt : select an employee, update their role.