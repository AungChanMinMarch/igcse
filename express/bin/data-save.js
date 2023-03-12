const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('express/views/temp.html', 'utf8');
const $ = cheerio.load(html);

function saveToDB(){
    $('section').each((i, el) => {
        console.log($(el).html());
    });
    process.exit(1); // terminate with exit code 1 (optional)
}
module.exports = saveToDB