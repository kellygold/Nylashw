const { query } = require('express');
var express = require('express');
var router = express.Router();
const request = require('request')



var logger = function (req, res, next){
    //console.log(req.query)
    next()
}

router.use(logger)

router.get('/', function(req, res) {
    console.log(req.query.challenge)
   res.send(req.query.challenge)
});

router.post('/', function(req, res) {
    console.log(req.body)
    res.send(req.body)
});

module.exports = router;