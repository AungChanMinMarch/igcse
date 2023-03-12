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
    if(validKeys.includes(name)){
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
log('connecting to MongoDB')
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
            log('written');
            const app = require('../app');
            const http = require('http');           
            const server = http.createServer(app);
            const port = process.env.PORT;
            server.listen(port, function () {
                console.log(`Server is running on http://localhost:${port}`);
                console.log(`please press s key and enter to save`);
                console.log(`please press c key and enter to cancel`);
                process.stdin.setEncoding('utf8');
                process.stdin.on('data', (input) => {
                    input = input.trim()
                    if(input == 's'){
                        saveToDB()
                    }
                    if(input == 'c'){
                        cancel()
                    }
                    log('your input is ', input)
                    console.log(`please press s key and enter to save`);
                    console.log(`please press c key and enter to cancel`);
                });
            });
        });
    })
});
function saveToDB(){
    log('saving');
    process.exit(1); // terminate with exit code 1 (optional)
}

function cancel(){
    log('canceling')
    process.exit(1); // terminate with exit code 1 (optional)
}