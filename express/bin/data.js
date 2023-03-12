const log = console.log;

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
        for (let i = 0, len = questions.length; i < len; i++) {
            const question = questions[i];
            const html = `<section> ${question.q} </section>           `;
            formattedHtml += html;
            try {
                formattedHtml += prettier.format(html, { parser: 'html' });
            }catch{
                formattedHtml += html
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