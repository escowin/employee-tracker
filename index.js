const inquirer = require("inquirer");
const db = require("./db");
table = require("console.table");

// NEW startApp CODE
startApp = () => {
    const logoIcon = logo({ name: "employee manager" }).render();
    consolelog(logoIcon);
    startApp();
};

// START PROMPTS
const start = () => {
    inquirer
    .prompt([
        {
            type: "list",
            name: "start",
            message: "choose from the following:",
            choices: ["view", "add", "update", "exit"],
        },
    ])
    .then((res) => {
        switch (res.start) {
            case "view":
                view();
                break;
            case "add":
                add();
                break;
            case "update":
                update();
                break;
            case "exit":
                console.log("exiting.");
                db.end();
                break;
        }
    });
};

const view = () => {
    inquirer
    .prompt([
        {
            type: "list",
            name: "view",
            message: "select view",
            choices: ["department view", "employee view", "role view"],
        },
    ])
    .then((res) => {
        switch (res.view) {
            case "department view":
                viewDepartments();
                break;
            case "employee view":
                viewEmployees();
                break;
            case "role view":
                viewRoles();
                break;
        }
    });
};

// PROMPT | CREATE DEPARTMENT, EMPLOYEE, ROLE
const add = () => {
    inquirer
    .prompt([
        {
            type: "list",
            name: "add",
            message: "select create option",
            choices: ["create department", "create employee", "create role"],
        },
    ])
    .then((res) => {
        switch (res.add) {
            case "department":
                createDeptartment();
                break;
            case "employee":
                cerateEmployee();
                break;
            case "role":
                createRole();
                break;
        }
    });
};

// PROMPT | UPDATE ROLE
const update = () => {
    inquirer
    .prompt([
        {
            name: "edit",
            type: "list",
            message: "update:",
            choices: ["employee role"],
        },
    ])
    .then((res) => {
        switch (res.edit) {
            case "employee role":
                updateRole();
                break;
        }
    });
};

// DEPARTMENTS
// VIEW | DEPARTMENTS
const viewDepartments = () => {
    db.query(
        `SELECT deptartment_name, deptartment_id FROM department`,
        (err, result) => {
            if (err) throw err;
            console.table(result);
            start();
        }
    );
};

// CREATE | DEPARTMENT
const createDeptartment = () => {
    inquirer
    .prompt([
        {
            name: "department",
            type: "input",
            message: "enter department name",
            validate: (addDepartment) => {
                if (addDepartment) {
                    return true;
                } else {
                    console.log("department name required");
                }
            },
        },
    ])
    .then((answers) => {
        db.query(
            `INSERT INTO department(deptartment_name) VALUE (?)`,
            [answers.department],
            (err) => {
                if (err) throw err;
                console.log(
                    answers.department + " " + "added to department table"
                );
                allDepartment();
            }
        );
    });
};

// EMPLOYEES
// VIEW EMPLOYEES
viewEmployees = () => {
    db.query(
        `SELECT employee.employee_id AS empl, employee.first_name, employee.last_name, role.job_title AS title, department.deptartment_name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager from employee LEFT JOIN role ON employee.role_id = role.role_id LEFT JOIN department On role.deptartment_id = department.deptartment_id LEFT JOIN employee manager ON manager.employee_id = employee.manager_id`,
        (err, result) => {
            if (err) throw err;
            console.table(result);
            start();
        }
    );
};

// CREATE | EMPLOYEE
createEmployee = () => {
    inquirer
    .prompt([
        {
            name: "first name",
            type: "input",
            message: "enter employee's  first name",
            validate: (isFirstname) => {
                if (isFirstname) {
                    return true;
                } else {
                    console.log("first name required");
                    return false;
                }
            }
        },
        {
            name: "last name",
            type: "input",
            message: "enter employee's last name",
            validate: (isLasrName) => {
                if (isLasrName) {
                    return true;
                } else {
                    console.log("last name required");
                    return false;
                }
            }
        },
    ])
    .then((answers) => {
        const employee = [answers.first_name, answers.last_name];
        let roles = `SELECT role.role_id, role.job_title FROM role`;
        db.query(roles, (err, result) => {
            if (err) throw err;
            const roleArray = result.map(({ role_id, job_title }) => ({
                name: job_title,
                value: role_id,
            }));
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "role",
                        message: "select role",
                        choices: roleArray,
                    },
                ])
                .then((selectedRole) => {
                const role = selectedRole.role;
                employee.push(role);
                const manager = `SELECT * FROM employee`;
                db.query(manager, (err, result) => {
                    if (err) throw err;
                    const managerArray = result.map(
                        ({ employee_id, first_name, last_name }) => ({
                            name: first_name + " " + last_name,
                            value: employee_id
                        }));
                    inquirer
                    .prompt([
                        {
                            type: "list",
                            name: "manager",
                            message: "select employee's manager",
                            choices: managerArray,
                        },
                    ])
                    .then((data) => {
                        console.log(data)
                        const mang = data.leader;
                        employee.push(mang);
                        console.log(mang);
                        const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE (?,?,?,?)`;
                        db.query(sql, employee, (err) => {
                            if (err) throw err;
                            console.log(" A new employee been add to employee table");
                            allEmployee();
                        });
                    });
                });
            });
        });
    });
};

// ROLES
// VIEW | ROLE
viewRole = () => {
    db.query(
        `select role.job_title, role.role_id, department.deptartment_name AS department, role.salary FROM role LEFT JOIN department ON department.deptartment_id = role.deptartment_id`,
        (err, result) => {
            if (err) throw err;
            console.table(result);
            start();
        }
    );
};

// CREATE | ROLE
createRole = () => {
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        deptartmentArray = [];
        res.forEach((department) => { deptartmentArray.push(department.deptartment_name); });
        deptartmentArray.push('create department')
        inquirer
            .prompt([
                {
                    name: "department name",
                    type: "list",
                    meassage: "select department role",
                    choices: deptartmentArray,
                },
            ])
            .then((answers) => {
                if (answers.departmentName === "create department") {
                    createDeptartment();
                } else {
                    addRole(answers);
                }
            });

        addRole = (data) => {
            inquirer
                .prompt([
                    {
                        name: "new role",
                        type: "input",
                        message: "enter role title:",
                        validate: (answer) => {
                            if (answer) {
                                return true;
                            } else {
                                console.log("role title required.");
                                return false;
                            }
                        },
                    },
                    {
                        name: "salary",
                        type: "input",
                        message: "enter salary",
                        validate: validator.validateSalary,
                    },
                ])
                // get prompt answers
                .then((answers) => {
                    let createdRole = answers.newRole;
                    let deptartmentId;
                    res.forEach((department) => {
                        if (data.departmentName === department.deptartment_name) {
                            deptartmentId = department.deptartment_id;
                        }
                    });
                    console.log("deptartment id", deptId)
                    let sql = `INSERT INTO role(job_title, salary, deptartment_id) VALUES (?,?,?)`;
                    let params = [createdRole, answers.salary, deptId];
                    db.query(sql, params, (err) => {
                        if (err) throw err;
                        console.log("role added");
                        viewRole();
                    });
                });
        };
    });
};

// EDIT | ROLE
editRole = () => {
    db.query(`SELECT * FROM employee`, (err, res) => {
        if (err) throw err;
        const employee = res.map(({ employee_id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: employee_id
        }))
        inquirer
        .prompt([
            {
                name: "selected employee",
                type: "list",
                message: "select employee to update role",
                choices: employee
            }
        ])
        .then((answer) => {
        const saveName = answer.selectedEmployee;
        db.query(`SELECT * FROM role`, (err, res) => {
            if (err) throw err;
            const role = res.map(({ role_id, job_title }) => ({
                name: job_title,
                value: role_id,
            }))
            inquirer
                .prompt([
                    {
                        name: "selected role",
                        type: "list",
                        message: "enter new role",
                        choices: role
                    }
                ]).then((answers) => {
                    const saveRole = answers.selectRole;
                    console.log(saveName);
                    console.log(saveRole);
                    db.query(`UPDATE employee SET ? WHERE employee_id = ?`,
                        [
                            {
                                role_id: saveRole
                            }, saveName
                        ],
                    )
                    console.log('employee role updated');
                    allEmployees();
                });
            });
        });
    });
};

// call
startApp();
