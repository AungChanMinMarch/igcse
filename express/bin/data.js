const log = console.log;
const {configKey, configValue} = require('./data-validate.js')

const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.DB_URI;

const fs = require('fs');
const prettier = require('prettier');
const saveToDB = require('./data-save.js');
const mongoose = require('mongoose');
const cheerio = require('cheerio');

const ChoiceQuestion = require("../models/choiceQuestion.js");
process.stdout.write('connecting to MongoDB')
mongoose.connect(uri).then(()=>{
    process.stdout.write("\rconnected to MongoDB \n");
    ChoiceQuestion.find({}).then(function(questions){
        let formattedHtml = '';
        for (let index = 0, len = questions.length; index < len; index++) {
            const question = questions[index];

            const html = question.q;
            const $ = cheerio.load(html);
            $('section').attr('data-id', question._id.toString())
            process.stdout.write(`formatting index -  ${index}...................`);
            try {
                formattedHtml += prettier.format($.html('section'), { parser: 'html' });
                process.stdout.write(`\rformat success index-${index} \n`);
            }catch{
                formattedHtml += $.html('section');
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
function cancel(){
    log('canceling')
    process.exit(1); // terminate with exit code 1 (optional)
}