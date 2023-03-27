const log = console.log;
function command(arg){
	return `npm run data-init -- ${arg}`
}
function logger(type, arg, egType, egArg){
	return `to add edit a ${type} run \n ${command(arg)} \n \n For example to edit ${egType} run \n ${command(egArg)} \n \n`
}
log(logger('chapter', 'ch=<chapter number>', 'chapter 1.1', 'ch=1.1'));
log(logger('question paper', 'qp=<year-Monthe-number>', '2022 March paper 1', 'qp=2022-March-1'));

log(`To delete a document, add data-delete attribut to the document(section element in temp.html)`)