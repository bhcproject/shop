/**
 * Created by Chang on 2017/5/16.
 */

var express = require('express');
var router = express.Router();
var util = require('util');
var assert = require('assert');

router.get('/', function(req, res, next) {

    res.render('goods.pug', { title: '商品类目' });

    //res.json({title:'Express json'});
});

router.get('/category', function(req, res, next) {

    var cursor = db.collection('goods').aggregate([
        { $group: {"_id": "$category", "count": {$sum: 1}}}
    ]);

    db.collection('goods').count(function(err, count) {
        assert.equal(null, err);

        console.log("total: " + count);

        var arr = [];

        arr.push({"_id": "全部商品", "count": count, "text": "All (1)"});

        console.dir(arr);

        cursor.toArray(function(err, docs) {
            console.dir(docs);

            arr = arr.concat(docs);

            console.dir(arr);

            res.json(arr);

        });
    });

    //console.dir(cursor);
    //res.jsonp([{name:req.query.c}]);
});


router.get('/read', function(req, res, next) {

    console.log("/read?c=" + req.query.c);

    var filter;
    if (req.query.c == "全部商品") filter = {};
    else filter = {"category":req.query.c};

    var cursor = db.collection('goods').find(filter);

    cursor.toArray(function(err, docs) {
        console.dir(docs);

        res.jsonp(docs);

    });
    //console.dir(cursor);
    //res.jsonp([{name:req.query.c}]);
});

router.post('/create', function(req, res, next) {

    console.log("/create " + util.inspect(req.body));

    var item = req.body;

    delete item._id;

    global.db.collection('goods').insertOne(item, function(err, result) {
        assert.equal(err, null);

        console.log("/create in db " + util.inspect(result.insertedId));

        item._id = result.insertedId;

        res.jsonp(item);
    });

    //req.body._id = "1";

    //res.jsonp(req.body);
});

router.post('/update', function(req, res, next) {

    console.log("/update " + util.inspect(req.body));

    res.jsonp(req.body);
});


module.exports = router;
