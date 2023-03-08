var express = require('express');
var router = express.Router();
const path = require('path');

function serveHTML(req, res) {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
}
router.get('/', serveHTML);
router.get('/index', serveHTML);
router.get('/index.html', serveHTML);

router.get('/', function(req, res) {
  res.render('layout', {title: 'IGCSE PHYSICS'});
});

module.exports = router;
