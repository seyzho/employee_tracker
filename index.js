const inquirer = require("inquirer");
require("console.table");
const connection = require("./db/connection");

function runIndex() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee role",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.start) {
        case "View all departments":
          viewDepartment();
          break;
        case "View all roles":
          viewRole();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update employee role":
          updateRole();
          break;
      }
    });
}

function viewDepartment() {
  let query = `SELECT id AS Department_ID, name AS Department_NAME FROM department;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runIndex();
  });
}

function viewRole() {
    let query = `SELECT
                 title AS Title,
                 role.id AS Role_Id,
                 department.name AS Department_Name,
                 salary AS salary
                 FROM role
                 LEFT JOIN department ON role.department_id = department.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runIndex();
    });
}

function viewEmployees() {
    let query = `SELECT
    employee.id,
    CONCAT (employee.first_name, ' ', employee.last_name) AS 'Name',
    role.title AS 'Title',
    department.name AS 'Department Name',
    role.salary AS 'Salary',
    CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager'
    FROM employee
    LEFT JOIN role on employee.role_id=role.id
    LEFT JOIN department on role.department_id=department.id
    LEFT JOIN employee manager on manager.id = employee.manager_id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        runIndex();
    });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newdept',
      message: 'What is the new department called?'
    }
  ]).then((answer)=> {
    let query = `INSERT INTO tracker.department (department.name) VALUES (?)`;
    let params = [answer.newdept];
    connection.query(query, params, (err, res) => {
        if (err) throw err
        console.table(res);
        runIndex();
    });
  });
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: "What is the new role?"
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the new salary?"
    },
    {
      type: 'input',
      name: 'deptId',
      message: "What is the id of the department the role is in"
    }
  ]).then((answer) => {
    let query = `INSERT INTO tracker.role (role.title, role.salary, role.department_id) VALUES (?, ?, ?)`;
    let params = [answer.title, answer.salary, answer.deptId];
    connection.query(query, params, (err, res) => {
      if (err) throw err
      console.table(res);
      runIndex();
    });
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the new employee's first name?"
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the new employee's last name?"
    },
    {
      type: 'input',
      name: 'role',
      message: "What is the new employee's role's id number?"
    },
    {
      type: 'input',
      name: 'managerId',
      message: "What is the new employee's manager's id number?"
    }
  ]).then((answer) => {
    let query = `INSERT INTO tracker.employee (employee.first_name, employee.last_name, employee.role_id, employee.manager_id) VALUES (?, ?, ?, ?)`;
    let params = [answer.firstName, answer.lastName, answer.role, answer.managerId];
    connection.query(query, params, (err, res) => {
      if (err) throw err
      console.table(res);
      runIndex();
    });
  });
}

function updateRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newRole',
      message: "What is the employee's new role's id number?"
    },
    {
      type: 'input',
      name: "newManagerId",
      message: "What is the employee's new manager's id number?"
    },
    {
      type: 'input',
      name: 'whichEmployee',
      message: "Which employee are you updating? (Please input id number)"
    }
  ]).then((answer) => {
    let query = `UPDATE tracker.employee SET employee.role_id = ?, employee.manager_id = ? WHERE employee.id = ?`;
    let params = [answer.newRole, answer.newManagerId, answer.whichEmployee];
    connection.query(query, params, (err, res) => {
        if (err) throw err
        console.table(res);
        runIndex();
    });
  });
}

runIndex();

