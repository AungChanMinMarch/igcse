const log = console.log;
const fs = require('fs');
const cheerio = require('cheerio');
const minify = require('html-minifier').minify;
const { getModel, getSearchObj } = require('../utils/getDocuments.js');

function saveToDB(configKey, configValue){
    const myModel = getModel(configKey, configValue);
    const defaultObj = (configKey === 'qp') ? {qp: [configValue]} : getSearchObj(configKey, configValue);

    let promises = [];

    const data = fs.readFileSync('temp.json');
    const jsonData = JSON.parse(data);
    
    const html = fs.readFileSync('temp.html', 'utf8');
    const $ = cheerio.load(html);

    const sections = $('section:not(section > section)');
    sections.each((i, el) => {
        const dataId = $(el).attr('data-db-id');
        if(!!dataId && $(el).attr('data-action') === 'delete'){
            log('deleting...');
            return promises.push(myModel.findByIdAndRemove(dataId))
        }
        if(!!dataId){
            $(el).removeAttr('data-db-id');
            let oldDocs = jsonData[dataId];
            const newContent = minify($.html(el), {collapseWhitespace: true})
            if(oldDocs.number == i+1 && oldDocs.content == newContent){
                return log('no need to update...')
            }
            log('updating...');
            return promises.push(myModel.findByIdAndUpdate(dataId, {
                ...defaultObj,
                ...jsonData[dataId], 
                content: newContent, 
                number: i+1
            }))
        }
        const newId = $(el).attr('data-new-id');
        if(!!newId){
            log('creating...')
            $(el).removeAttr('data-new-id');
            let newDocs = new myModel({
                ...defaultObj,
                ...jsonData[newId],
                content : minify($.html(el), {collapseWhitespace: true}),
                number : i+1
            });
            return promises.push(newDocs.save());
        }
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