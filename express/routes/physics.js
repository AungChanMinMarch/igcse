var express = require('express');
var router = express.Router();
const path = require('path');

function serveHTML(fileName){
  return function (req, res) {
    res.sendFile(path.resolve(__dirname, `../views/${fileName}.html`));
  }
}
router.use('/textbook/ch04/', express.static(path.resolve(__dirname, '../views')));

router.get('/', function(req, res) {
  res.render('layout', {title: 'IGCSE PHYSICS'});
});

module.exports = router;
