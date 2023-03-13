const log = console.log;
const {configKey, configValue} = require('./data-validate.js')

const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.DB_URI;
const port = process.env.PORT;

const fs = require('fs');
const prettier = require('prettier');
const mongoose = require('mongoose');
const cheerio = require('cheerio');

const saveToDB = require('./data-save.js');

process.stdout.write('connecting to MongoDB')
mongoose.connect(uri).then(()=>{
    process.stdout.write("\rconnected to MongoDB \n");
    const [myModel, searchObj] = processConfig();
    myModel.find(searchObj).then(function(documents){
        let formattedHtml = '';
        for (let index = 0, len = documents.length; index < len; index++) {
            const docs = documents[index];

            const html = docs.content || '';
            const $ = cheerio.load(html);
            $('section:not(section > section)').attr('data-id', docs._id.toString())
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
            loghow()
            process.stdin.setEncoding('utf8');
            process.stdin.on('data', (input) => {
                input = input.trim()
                if(input == 's'){
                    saveToDB(myModel, searchObj);
                }
                if(input == 'c'){
                    cancel()
                }
                loghow();
                log('your input is ', input);
            });
        });
    })
});

function loghow(){
    console.log(`please press s key and enter to save`);
    console.log(`please press c key and enter to cancel`);
}
function cancel(){
    log('canceling')
    process.exit(1); // terminate with exit code 1 (optional)
}
function processConfig(){
    let myModel; 
    let searchObj = {};
    if(configKey === 'ch'){
        myModel = require('../models/note.js');
        const [chapter, subChapter, number] = configValue.split('.');
        searchObj.chapter = Number.parseInt(chapter);
        if(!!subChapter){
            searchObj.subChapter = Number.parseInt(subChapter);
            if(!!number) searchObj.number = Number.parseInt(number);
        }
    }else if(configKey === 'qp'){
        //check which paper here
        //currently only choice paper exist
        let paperNumber = configKey.charAt(configKey.length - 1); // get the last character using the charAt() method
        if(paperNumber == 1 || paperNumber ==2){
            myModel= require('../models/choiceQuestion.js');
            searchObj = { qp: configValue};
        }

    }
    if(!myModel){ //this may not be needed we have check in data-validate.js
        process.exit(1); // terminate with exit code 1 (optional)
    }
    return [myModel, searchObj]
}