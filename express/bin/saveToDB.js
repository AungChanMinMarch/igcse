const log = console.log;
const fs = require('fs');
const cheerio = require('cheerio');
const minify = require('html-minifier').minify;
const { getModel, getSearchObj } = require('../utils/getDocuments.js');

function createNumHandler(configKey, configValue){
    if(configKey === 'qp')
        return function(document, number){
            if(Object.keys(document.paper)?.length > 0){
                newDocs.paper.map((obj, index) => {
                    if(obj.name === configValue) newDocs.paper[index].number = number
                })
            } else {
                newDocs.paper = {
                    name:configValue,
                    number: number
                }
            }
        }
    if(configKey === 'ch')
        return function(document, number){
            if(document.number === number) return document;
            log('updating number to ', number);
            document.number = number;
            return document;
        }
}

function saveToDB(configKey, configValue){
    const myModel = getModel(configKey, configValue);
    const defaultObj = (configKey === 'qp') ? {} : getSearchObj(configKey, configValue);
    const handleNum = createNumHandler(configKey, configValue);
    let promises = [];

    const data = fs.readFileSync('temp.json');
    const jsonData = JSON.parse(data);
    
    const html = fs.readFileSync('temp.html', 'utf8');
    const $ = cheerio.load(html);

    const sections = $('section:not(section > section)');
    let number = 1;
    sections.each((i, el) => {
        const dataId = $(el).attr('data-db-id');
        if(!!dataId && $(el).attr('data-delete') !== undefined){
            log('deleting...');
            return promises.push(myModel.findByIdAndRemove(dataId))
        }
        if(!!dataId){
            $(el).removeAttr('data-db-id');
            let oldDocs = jsonData[dataId];
            const newContent = minify($.html(el), {collapseWhitespace: true})
            if(oldDocs.number == number && oldDocs.content == newContent){
                number +=1;
                return log('no need to update...')
            }
            log('updating...');
            let newDocs = {
                ...defaultObj,
                ...oldDocs, 
                content: newContent, 
            }
            newDocs = handleNum(newDocs, number);
            log(newDocs);
            number += 1;
            return promises.push(myModel.findByIdAndUpdate(dataId, newDocs))
        }
        log('creating...');
        const newId = $(el).attr('data-new');
        let metaValue = {};
        if(!!newId){
            $(el).removeAttr('data-new');
            metaValue = jsonData[newId];
        }
        let newDocs = new myModel({
            ...defaultObj,
            ...metaValue,
            content : minify($.html(el), {collapseWhitespace: true})
        });
        newDocs = handleNum(newDocs, number);
        number +=1;
        return promises.push(newDocs.save());
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