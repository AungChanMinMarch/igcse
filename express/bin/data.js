const log = console.log;

const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.DB_URI;

const fs = require('fs');
const prettier = require('prettier');
                process.stdout.write(`\rformat success index-${index} \n`);

const mongoose = require('mongoose');
const ChoiceQuestion = require("../models/choiceQuestion.js");

mongoose.connect(uri).then(()=>{
    log("connected to MongoDB");
    ChoiceQuestion.find({}).then(function(questions){
        let formattedHtml = '';
        for (let i = 0, len = questions.length; i < len; i++) {
            const question = questions[i];
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