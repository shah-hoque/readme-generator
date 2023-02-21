// these modules (dependencies) will load as long as 'node_modules' is located at the root folder
const inquirer = require('inquirer');
const fs = require('fs')
const util = require('util');

// using util.promisify, converts fs.writeFile from a callback-based function to a promise-based function
const fsWriteFilePromisified = util.promisify(fs.writeFile)


// FUNC) THAT PROMPTS THE USER & WRITES RESPONSE TO FILE USING A PROMISE FUNC
const askQuestions = () => {
    inquirer.prompt([
        {
            name: "title",
            message: "What is the title of your application? \n",
            type:"input",
        },
        {
            name: "description",
            message: "Write a description for your application: \n",
            type:"input",
        },
        {
            name: "installation",
            message: "Write instructions users need to follow to run your application (if any): \n",
            type:"input",
        },
        {
            name: "usage",
            message: "Write how users should use your application: \n",
            type:"input",
        },
        {
            name: "license",
            message: "Choose the license for this application using the arrow keys then press enter \n",
            type:"list",
            choices: [
                "None",

                "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",

                "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)", 

                "[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic%202.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)", 

                "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)"
                ],
        },
        {
            name: "contribution",
            message: "Mention anyone else who contributed to this application (if any): \n",
            type:"input",
        },
        {
            name: "tests",
            message: "Explain how to test your application: \n",
            type:"input",
        },
        {
            name: "github",
            message: "What is your GitHub username? \n",
            type:"input",
        },
        {
            name: "email",
            message: "What is your email address? \n",
            type:"input",
        },
    ]).then(answers => {
        // pass into this promise func the type of file to create & its file content
        fsWriteFilePromisified('generated_README.md', writeMarkdown(answers))
        console.log('Your README file has been generated')

    }).catch((err) => console.error(err));
};


// FUNC) THAT POPULATES THE TEXT THAT WILL BE PASSED TO fsWriteFilePromisified
function writeMarkdown(answers) {
return  `
# ${answers.title}

## License
${answers.license}

## Description 
${answers.description}

## Table of Contents
1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Contribution](#Contribution)
4. [Tests](#Tests)
5. [Questions](#Questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contribution
${answers.contribution}

## Tests
${answers.tests}

## Questions
GitHub: wwww.github.com/${answers.github} \n
For any questions, you can reach out on ${answers.email}
`;
}


// call func to prompt the user for input
askQuestions();