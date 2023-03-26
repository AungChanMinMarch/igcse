const noteModel = require('../models/note.js');
const choiceQuestionModel = require('../models/choiceQuestion.js');
const shortQuestionModel = require('../models/shortQuestion.js');
const practicalQuestionModel = require('../models/practicalQuestion.js');

function getSearchObj(modelName, searchStr) {
	if(modelName === 'qp'){
		return {'paper.name' : searchStr} 
	}
	if(searchStr === ''){
		return {};
	}
	const [chapter, subChapter, number] = searchStr.split('.');
    let searchObj = { chapter : Number.parseInt(chapter)};
    if(!!subChapter){
      searchObj.subChapter = Number.parseInt(subChapter);
    }
    if(!!number){
      searchObj.number= Number.parseInt(number)
    }
    return searchObj
}

function getModel(modelName, searchStr){
	if(modelName === 'ch') return noteModel;
	if(modelName === 'cq') return choiceQuestionModel;
	if(modelName === 'sq') return shortQuestionModel;
	if(modelName === 'pq') return practicalQuestionModel;
	if(modelName === 'qp'){
  		const paperNumber = searchStr[searchStr.length -1];
		if(paperNumber == '1' || paperNumber == '2'){
		 return choiceQuestionModel;
		}
		if(paperNumber == '3' || paperNumber == '4'){
			return shortQuestionModel;
		}
		if(paperNumber == '5' || paperNumber == '6'){
			return practicalQuestionModel;
		}
	}
}
function createGetNumberFn(paperName) {
	return function(paperArray){
		for(let i=0, len = paperArray.length; i<len; i++){
			if(paperArray[i].name === paperName)
				return paperArray[i].number
		}
	}
}
async function getDocuments(modelName, searchStr){
	const model = getModel(modelName, searchStr);
	const searchObj = getSearchObj(modelName, searchStr);
	try {
	    let documents = await model.find(searchObj);
	    if(modelName === 'ch')
		    documents.sort(function(a, b) {
		    	if(a.chapter !== b.chapter) return a.chapter - b.chapter;
		    	if(a.subChapter !== b.subChapter) return a.subChapter - b.subChapter;
				  return a.number - b.number;
				});//try inside query
		  else if(modelName === 'qp'){
		  	const getNumber = createGetNumberFn(searchStr);
		  	documents.sort(function(a,b){
		  		return getNumber(a.paper) - getNumber(b.paper);
		  	})
		  }
	    return documents;
	} catch (error) {
	    console.log('An error occurred:', error);
	    return error
	}
}
module.exports = getDocuments;
module.exports.getModel = getModel;
module.exports.getSearchObj = getSearchObj;