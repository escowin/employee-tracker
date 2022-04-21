const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

const startApp = () => {
    inquirer
    .prompt([
        {
            // prompt kickoff
        }
    ])
    .then((res) => {
        switch (res.startApp) {
            // case department view
            // case employee view
            // case role view
        }
    });
};

// call
startApp();