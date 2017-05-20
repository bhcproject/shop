/**
 * Created by Chang on 2017/5/18.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    res.render('kendo/index.pug', { title: 'Kendo Samples' });

    //res.json({title:'Express json'});
});

//router.get('/add')

module.exports = router;
