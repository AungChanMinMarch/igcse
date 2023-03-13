const fs = require('fs');
const cheerio = require('cheerio');
const minify = require('html-minifier').minify;
const mongoose = require('mongoose');

function saveToDB(myModel, searchObj){
    const html = fs.readFileSync('express/views/temp.html', 'utf8');
    const $ = cheerio.load(html);
    const ObjectId = mongoose.Types.ObjectId;
    let promises = [];
    const sections = $('section:not(section > section)');
    let num = 0;
    sections.each((i, el) => {
        const dataId = $(el).attr('data-id');
        if(!!dataId && $(el).attr('data-action') === 'delete'){
            return promises.push(myModel.findByIdAndRemove(dataId))
        }
        if(!dataId){
            const newDocs = new myModel({
                ...searchObj,
                content: minify($.html(el), {collapseWhitespace: true}),
                number: num++
            })
            return promises.push(newDocs.save());
        }
        $(el).removeAttr('data-id');
        return promises.push(myModel.findByIdAndUpdate(
            dataId,
            {q: minify($.html(el), {collapseWhitespace: true}), number : num++},
            {multi: true}
        ));
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
module.exports = saveToDB;