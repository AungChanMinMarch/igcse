var express = require('express');
var router = express.Router();
const getDocuments = require('../utils/getDocuments.js');

router.get('/', function(req, res) {
  res.render('index', {title: 'IGCSE PHYSICS', documents: []});
});

router.get('/ch', function(req, res){
    getDocuments('ch', '').then(function(documents){
        res.render('index', {title: 'IGCSE PHYSICS', documents: documents});
    }).catch(function(err) {
        console.log(err);
    });
});
router.get('/ch/:id', function(req, res){
    getDocuments('ch', req.params.id).then(function(documents){
        res.render('index', {title: 'IGCSE PHYSICS', documents: documents});
    }).catch(function(err) {
        console.log(err);
    });
});

router.get('/cq', function(req, res){
    getDocuments('cq', '').then(function(documents){
        res.render('index', {title: 'IGCSE PHYSICS', documents: documents});
    }).catch(function(err) {
        console.log(err);
    });
});
router.get('/cq/:id', function(req, res){
    getDocuments('cq', req.params.id).then(function(documents){
        res.render('index', {title: 'IGCSE PHYSICS', documents: documents});
    }).catch(function(err) {
        console.log(err);
    });
});

router.get('/sq', function(req, res){
    getDocuments('sq', '').then(function(documents){
        res.render('index', {title: 'IGCSE PHYSICS', documents: documents});
    }).catch(function(err) {
        console.log(err);
    });
});
router.get('/sq/:id', function(req, res){
    getDocuments('sq', req.params.id).then(function(documents){
        res.render('index', {title: 'IGCSE PHYSICS', documents: documents});
    }).catch(function(err) {
        console.log(err);
    });
});

router.get('/pq', function(req, res){
    getDocuments('pq', '').then(function(documents){
        res.render('index', {title: 'IGCSE PHYSICS', documents: documents});
    }).catch(function(err) {
        console.log(err);
    });
});
router.get('/pq/:id', function(req, res){
    getDocuments('pq', req.params.id).then(function(documents){
        res.render('index', {title: 'IGCSE PHYSICS', documents: documents});
    }).catch(function(err) {
        console.log(err);
    });
});

router.get('/qp/:id', function(req, res){
    getDocuments('qp', req.params.id).then(function(documents){
        res.render('index', {title: 'CIE PAST PAPER', documents: documents});
    }).catch(function(err) {
        console.log(err);
    });
})

module.exports = router;
