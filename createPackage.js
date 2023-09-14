const chalk = require("chalk");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const LOG = console.log;
const directory = process.cwd();
let projectName = "";

const repoUrl = "https://github.com/theghost27/MasterBackend.git";

function init() {
    LOG(chalk.green("Creating a new project..."));
    const argsLength = process.argv.length;
    if (argsLength == 3) {
        projectName = process.argv[2];
    }
    cloneRepo();
}

function cloneRepo() {
    exec(`git clone ${repoUrl} .`, (error, stdout, stderr) => {
        if (error) {
            LOG(
                chalk.red(
                    "Issues setting up project. Contact Project Maintainer."
                )
            );
            process.exit(1);
        } else {
            LOG(chalk.green("Cloned base repo"));
            removeGit();
            initGit();
            changePackageJson();
        }
    });
}

function removeGit() {
    exec(`rm -rf .git`, (error, stdout, stderr) => {
        if (error) {
            LOG(
                chalk.red(
                    "Issues setting up project. Contact Project Maintainer."
                )
            );
            process.exit(1);
        }
    });
}

function initGit() {
    exec(`git init`, (error, stdout, stderr) => {
        if (error) {
            LOG(
                chalk.red(
                    "Issues setting up project. Contact Project Maintainer."
                )
            );
            process.exit(1);
        } else {
            LOG(chalk.green("Initialized git"));
            LOG(
                chalk.green(
                    "Congratulation you successfully setup a new project!"
                )
            );
        }
    });
}

function changePackageJson() {
    if (projectName !== "") {
        const packageJsonPath = path.join(directory, "package.json");
        const packageJson = require(packageJsonPath);
        packageJson.name = projectName;
        fs.writeFile(
            packageJsonPath,
            JSON.stringify(packageJson, null, 2),
            "utf8",
            (err) => {
                if (err) {
                    process.exit(1);
                }
            }
        );
    }
}

module.exports = { init };
