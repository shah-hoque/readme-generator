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
            name: "Title",
            message: "What is the title of your project?",
            type:"input",
        },
    ]).then(answers => {
        writeToFile(answers)
        console.log('Your README file has been generated')
    }).catch((err) => console.error(err));
};


// FUNC) THAT USES A PROMISE FUNC THAT TAKES IN THE TYPE OF FILE TO CREATE & THE FILE CONTENT
const writeToFile = answers => {
    fsWriteFilePromisified('README.md', writeMarkdown(answers))
}


// FUNC) THAT POPULATES THE TEXT THAT WILL BE PASSED TO fsWriteFilePromisified
function writeMarkdown(answers) {
return  `
## Title
${answers.Title}
`;
}


// call func to prompt the user for input
askQuestions();