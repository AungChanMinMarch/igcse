const log = console.log;

const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.DB_URI;

const mongoose = require('mongoose');

mongoose.connect(uri).then(()=>{
    log("connected to MongoDB");
});