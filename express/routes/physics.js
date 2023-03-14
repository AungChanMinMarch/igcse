var express = require('express');
var router = express.Router();
const path = require('path');
const noteModel = require('../models/note.js');
const choiceQuestionModel = require('../models/choiceQuestion.js');
const shortQuestionModel = require('../models/shortQuestion.js');
const practicalQuestionModel = require('../models/practicalQuestion.js');
function buildSearchObj(paramStr){
  const [chapter, subChapter, number] = paramStr.split('.');
    let searchObj = { chapter : Number.parseInt(chapter)};
    if(!!subChapter){
      searchObj.subChapter = Number.parseInt(subChapter);
    }
    if(!!number){
      searchObj.number= Number.parseInt(number)
    }
    return searchObj
}
function responer(model, hasSearchObj){
  return function(req, res){
    const searchObj = hasSearchObj ? buildSearchObj(req.params.id) : {}
    model.find(searchObj).then(function(documents){
      res.render('index', {title: 'IGCSE PHYSICS', documents: documents});
    }).catch(function(err) {
      console.log(err);
    });
  }
}
router.get('/', function(req, res) {
  res.render('index', {title: 'IGCSE PHYSICS', documents: []});
});

router.get('/ch', responer(noteModel, false));
router.get('/ch/:id', responer(noteModel, true));

router.get('/cq', responer(choiceQuestionModel, false));
router.get('/cq/:id', responer(choiceQuestionModel, true));

router.get('/sq', responer(shortQuestionModel, false));
router.get('/sq/:id', responer(shortQuestionModel, true));

router.get('/pq', responer(practicalQuestionModel, false));
router.get('/pq/:id', responer(practicalQuestionModel, true));

router.get('/qp/:id', function(req, res){
  let myModel;
  const questionPaper = req.params.id;
  console.log(questionPaper)
  const paperNumber = questionPaper[questionPaper.length -1];
  if(paperNumber == '1' || paperNumber == '2'){
    myModel = choiceQuestionModel;
  }
  else if(paperNumber == '3' || paperNumber == '4'){
    myModel = shortQuestionModel;
  }
  else if(paperNumber == '5' || paperNumber == '6'){
    myModel = practicalQuestionModel;
  }
  console.log(paperNumber)
  myModel.find({ qp : { $in : [questionPaper] } }).then(function(documents){
      res.render('index', {title: 'CIE PAST PAPER', documents: documents});
    }).catch(function(err) {
      console.log(err);
    });
})
module.exports = router;
