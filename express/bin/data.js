const log = console.log;
function exit(message){
    log(message)
    log('for more info run npm run data-help')
    process.exit(1); // terminate with exit code 1 (optional)
}
function warn(warning){
    console.warn('\x1b[31m', warning, '\x1b[0m');
}

const args = process.argv.slice(2); // slice the first two elements which are not arguments
if(args.length === 0){
    exit('please add a command line argument')
}
if(args.length > 1){
    log('detecting more than one argument.')
    warn('Only the first valid argument will be executed!!!!')
}
let configKey, configValue;
const validKeys = ['ch', 'qp'];
// Parse the command line arguments into the config object
for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const [name, value] = arg.split('=');
    if(!value){ 
        warn(`${arg} is not valid argument!! continuing the next one!!!`)
        continue;
    }
    if(validKeys.i ncludes(name)){
        log(`${arg} is valid. Working on it.`)
        configKey = name;
        configValue = value;
        break;
    }
}
if(!configKey || !configValue){
    exit('please add one valid command line argument')
}

const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.DB_URI;

const fs = require('fs');
const prettier = require('prettier');

const mongoose = require('mongoose');
const ChoiceQuestion = require("../models/choiceQuestion.js");

mongoose.connect(uri).then(()=>{
    log("connected to MongoDB");
    ChoiceQuestion.find({}).then(function(questions){
        let formattedHtml = '';
        for (let index = 0, len = questions.length; index < len; index++) {
            const question = questions[index];
            const html = `<section> ${question.q} </section>`;

            process.stdout.write(`formatting index -  ${index}...................`);
            try {
                formattedHtml += prettier.format(html, { parser: 'html' });
                process.stdout.write(`\rformat success index-${index} \n`);
            }catch{
                formattedHtml += html
                process.stdout.write(`\rformat fail index-${index} \n`);
            }finally{
                formattedHtml += '\n';
            }
        }
        fs.writeFile('express/views/temp.html', formattedHtml, function(err){
            if(err){ 
                return log(err);
            }
            log('written')
        });
    })
});