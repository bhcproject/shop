/**
 * Created by Chang on 2017/5/16.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    res.render('goods.pug', { title: '商品类目' });

    //res.json({title:'Express json'});
});

//router.get('/add')

module.exports = router;
