const log = console.log;
const {configKey, configValue} = require('./data-validate.js');

const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.DB_URI;
const port = process.env.PORT;

const fs = require('fs');
const prettier = require('prettier');
const mongoose = require('mongoose');
const cheerio = require('cheerio');

const getDocuments = require('../utils/getDocuments.js');

process.stdout.write('connecting to MongoDB')
mongoose.connect(uri).then(()=>{
    process.stdout.write("\rconnected to MongoDB \n");
    getDocuments(configKey, configValue).then(function(documents){
        let formattedHtml = '';
        let json = {};
        for (let index = 0, len = documents.length; index < len; index++) {
            const docs = documents[index];
            const id = docs._id.toString();

            delete docs._id;
            json[id] = docs;

            const html = docs.content || '';
            const $ = cheerio.load(html);
            $('section:not(section > section)').attr('data-db-id', id);
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
        fs.writeFileSync('temp.json', prettier.format(JSON.stringify(json), { parser: 'json' }));
        log('written json');
        fs.writeFileSync('temp.html', formattedHtml)
        log('written html');
        process.exit(1);
    })
});