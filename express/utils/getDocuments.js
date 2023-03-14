const noteModel = require('../models/note.js');
const choiceQuestionModel = require('../models/choiceQuestion.js');
const shortQuestionModel = require('../models/shortQuestion.js');
const practicalQuestionModel = require('../models/practicalQuestion.js');

function getSearchObj(modelName, searchStr) {
	if(modelName === 'qp'){
		return {qp : {$in : [searchStr]}}
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
async function getDocuments(modelName, searchStr){
	const model = getModel(modelName, searchStr);
	const searchObj = getSearchObj(modelName, searchStr);
	try {
	    const documents = await model.find(searchObj);
	    return documents;
	} catch (error) {
	    console.log('An error occurred:', error);
	    return error
	}
}
module.exports = getDocuments;
module.exports.getModel = getModel;
module.exports.getSearchObj = getSearchObj;