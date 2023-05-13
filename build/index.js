const log = console.log;

const mongoose = require('mongoose');
const uri = process.argv[2]; // slice the first two elements which are not arguments

mongoose.connect(uri).then(()=>{
  log("connection success")
})
