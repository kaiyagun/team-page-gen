const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require('./lib/Intern');
const generateHtml = require("./util/generateHtml");

const team = [];

function askQuestion() {
  inquirer
    .prompt([
      {
        name: "question",
        message: "What would you like to do?",
        type: "list",
        choices: [
          "Add Manager",
          "Add Engineer",
          "Add Intern",
          "See team",
          "Generate Page!",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.question) {
        case "Add Manager":
          console.log("Add a manager");
          addManager();
          break;

        case "Add Engineer":
          console.log("add an engineer");
          addEngineer();
          break;
        case "Add Intern":
          console.log("add an intern");
          addIntern();
          break;
        case "See team":
          console.log("view your team");
          viewTeam();
          break;
        case "Generate Page!":
          console.log("Generating page...");
          makePage();
        default:
          console.log("Quit");
          break;
      }
    });
}


function addManager() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "Employee name:",
        type: "input",
      },
      {
        name: "id",
        message: "Employee ID:",
        type: "number",
      },
      {
        name: "officeNumber",
        type: "number",
        message: "Office Number:",
      },
      {
        name: "email",
        type: "input",
        message: "Email:",
      },
    ])
    .then(({ name, id, email, officeNumber, role }) => {
      console.log(name);
      const manager = new Manager(name, id, email, officeNumber, role);
      team.push(manager);
      console.log(team);
    })
    .then(() => {
      askQuestion();
    });
}

function addEngineer() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "Employee name:",
        type: "input",
      },
      {
        name: "id",
        message: "Employee ID:",
        type: "number",
      },
      {
        name: "github",
        type: "input",
        message: "GitHub:",
      },
      {
        name: "email",
        type: "input",
        message: "Email:",
      },
    ])
    .then(({ name, id, email, github, role }) => {
      console.log(name);
      const engineer = new Engineer(name, id, email, github, role);
      team.push(engineer);
      console.log(team);
    })
    .then(() => {
      askQuestion();
    });
}
function addIntern() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "Employee name:",
        type: "input",
      },
      {
        name: "id",
        message: "Employee ID:",
        type: "number",
      },
      {
        name: "school",
        type: "input",
        message: "School:",
      },
      {
        name: "email",
        type: "input",
        message: "Email:",
      },
    ])
    .then(({ name, id, email, school, role }) => {
      const intern = new Intern(name, id, email, school, role);
      team.push(intern);
      console.log(team);
    })
    .then(() => {
      askQuestion();
    });
}

function viewTeam() {
  if (team.length < 1) {
    console.log("There's nobody on your team!");
    return askQuestion();
  }

  console.log(team);
}

function makePage() {
    fs.writeFile('index.html', generateHtml(team), (err) =>
    err ? console.log(err) : console.log('Page created!'));
}

askQuestion();
