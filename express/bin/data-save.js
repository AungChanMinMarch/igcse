const fs = require('fs');
const cheerio = require('cheerio');
const minify = require('html-minifier').minify;
const mongoose = require('mongoose');

const html = fs.readFileSync('express/views/temp.html', 'utf8');
const $ = cheerio.load(html);

function saveToDB(){
    const ChoiceQuestion = require("../models/choiceQuestion.js");
    const ObjectId = mongoose.Types.ObjectId;
    let promises = [];
    const sections = $('section');
    sections.each((i, el) => {
        const dataId = $(el).attr('data-id');
        $(el).removeAttr('data-id');
        promises.push(ChoiceQuestion.findByIdAndUpdate(
            dataId,
            {q: minify($.html(el), {collapseWhitespace: true})},
            {multi: true}
        ))
    });   

    Promise.all(promises)
        .then((results) => {
            console.log(`Updated ${results.length} documents`);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(()=>{
            process.exit(1); // terminate with exit code 1 (optional)
        })
}
module.exports = saveToDB