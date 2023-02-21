// these modules (dependencies) will load as long as 'node_modules' is located at the root folder
const inquirer = require('inquirer');
const fs = require('fs')
const util = require('util');

// using util.promisify, converts fs.writeFile from a callback-based function to a promise-based function
const fsWriteFilePromisified = util.promisify(fs.writeFile)


// FUNC) THAT PROMPTS THE USER & DIRECTS TO WRITE RESPONSE TO FILE USING A PROMISE FUNC
const askQuestions = () => {
    inquirer.prompt([
        {
            name: "title",
            message: "What is the title of your project? \n",
            type:"input",
        },
        {
            name: "description",
            message: "Write a description for your project: \n",
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
            message: "Choose the license for this project using the arrow keys then press enter \n",
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
            name: "contributing",
            message: "Mention anyone else who contributed to this project (if any): \n",
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
            name: "linkedIn",
            message: "What is your linkedIn username? \n",
            type:"input",
        },
        {
            name: "email",
            message: "What is your email address? \n",
            type:"input",
        },
        
    ]).then(answers => {
        writeToFile(answers)
        console.log('Your README file has been generated')
    }).catch((err) => console.error(err));
};


// FUNC) THAT USES A PROMISE FUNC THAT TAKES IN THE TYPE OF FILE TO CREATE & THE FILE CONTENT
const writeToFile = answers => {
    fsWriteFilePromisified('generated_README.md', writeMarkdown(answers))
}


// FUNC) THAT POPULATES THE TEXT THAT WILL BE PASSED TO fsWriteFilePromisified
function writeMarkdown(answers) {
return  `
## License
${answers.license}

## Title
${answers.title}

## Description 
${answers.description}

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
${answers.github}
${answers.linkedIn}
${answers.email}








`;
}


// call func to prompt the user for input
askQuestions();