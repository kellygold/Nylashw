var express = require('express');
var router = express.Router();
const Nylas = require('nylas');
const app = require('../app');
const request = require('request')

/* GET home page. */
app.locals = {}

var exchangeCodeForToken = function(req, res, next) {
    // Nylas.config({ clientId: '90m8dh2ue1rmjp2hvlja8rypf', clientSecret: '5y6iwa9cyx19w6t6r1jywolne'});
    console.log(req)
    console.log("asdf")
    code = req.query.code
    console.log(code)
    // let access_token
    // Nylas.exchangeCodeForToken(code).then(resp => {
    //   app.locals.access_token = resp
    //   console.log(app.locals.access_token)
    // });
    stringBody = JSON.stringify({
      client_id: '8tu5utxqfvgbrldmvzwn5q1xp',
      client_secret: '8696g5bq72eycuaymi9agn5us',
      grant_type: 'authorization_code',
      code: code
    })
    request.post({
      headers: {'accept' : 'application/json', 'Authorization' : 'Basic ODY5Nmc1YnE3MmV5Y3VheW1pOWFnbjV1cw===='},
      url: 'https://api.nylas.com/oauth/token',
      body: stringBody
    }, function(error, response, body){
      body = JSON.parse(response.body)
      app.locals.access_token = body.access_token
      res.redirect('/connected')
    });
};

router.get('/', [exchangeCodeForToken]);
module.exports = router;
