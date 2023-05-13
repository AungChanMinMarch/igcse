const log = console.log;

log('hello world')
const args = process.argv.slice(2); // slice the first two elements which are not arguments
log(process.argv)