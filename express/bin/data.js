const log = console.log;

const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.DB_URI;

const fs = require('fs');

const mongoose = require('mongoose');
const ChoiceQuestion = require("../models/choiceQuestion.js");

mongoose.connect(uri).then(()=>{
    log("connected to MongoDB");
    ChoiceQuestion.find({}).then(function(questions){
        let file = '';
        for (let i = 0, len = questions.length; i < len; i++) {
            const question = questions[i];
            const html = `<section> ${question.q} </section>           `;
            file += html
        }
        fs.writeFile('express/views/temp.html', file, function(err){
            if(err){ 
                return log(err);
            }
            log('written')
        });
    })
});

