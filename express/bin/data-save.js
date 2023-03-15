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
const saveToDB = require('./saveToDB.js');

process.stdout.write('connecting to MongoDB')
mongoose.connect(uri).then(()=>{
    process.stdout.write("\rconnected to MongoDB \n");
    saveToDB(configKey, configValue);
});