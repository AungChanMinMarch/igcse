var express = require('express');
var router = express.Router();
const path = require('path');

function serveHTML(fileName){
  return function (req, res) {
    res.sendFile(path.resolve(__dirname, `../views/${fileName}.html`));
  }
}
router.get('/4.1', serveHTML('4.1'));
router.get('/4.2', serveHTML('4.2'));
router.get('/4.3', serveHTML('4.3'));
router.get('/4.4', serveHTML('4.4'));
router.get('/4.5', serveHTML('4.5'));
router.get('/4.6', serveHTML('4.6'));
router.get('/4.7', serveHTML('4.7'));
router.get('/4.8', serveHTML('4.8'));
router.get('/4.9', serveHTML('4.9'));
router.get('/', serveHTML('index'));
router.get('/index', serveHTML('index'));
router.get('/index.html', serveHTML('index'));

router.get('/', function(req, res) {
  res.render('layout', {title: 'IGCSE PHYSICS'});
});

module.exports = router;
