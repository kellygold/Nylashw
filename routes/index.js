var express = require('express');
var router = express.Router();

const Nylas = require('nylas');

Nylas.config({ clientId: '8tu5utxqfvgbrldmvzwn5q1xp', clientSecret: '8696g5bq72eycuaymi9agn5us'});
options = {
  loginHint: 'you_email@example.com',
  redirectURI: 'http://localhost:3000/callback',
  scopes: ['email.read_only', 'email.send','email.folders_and_labels'],
};
auth_url = Nylas.urlForAuthentication(options);

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { data: {title: 'Nylas Homework App', authUrl: auth_url }});
});

module.exports = router;
