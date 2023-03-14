var express = require('express');
var router = express.Router();
const path = require('path');
const noteModel = require('../models/note.js');

router.get('/', function(req, res) {
  res.render('index', {title: 'IGCSE PHYSICS', documents: []});
});

router.get('/ch/:id', function(req, res){
  const [chapter, subChapter, number] = req.params.id.split('.');
  let searchObj = {};
  if(!!chapter){
    searchObj.chapter = Number.parseInt(chapter);
  }
  if(!!subChapter){
    searchObj.subChapter = Number.parseInt(subChapter);
  }
  if(!!number){
    searchObj.number= Number.parseInt(number)
  }
  noteModel.find(searchObj).then(function(documents){
    res.render('index', {title: 'IGCSE PHYSICS', documents: documents});
  }).catch(function(err) {
    console.log(err);
  });
})

module.exports = router;
