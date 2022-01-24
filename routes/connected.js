var express = require('express');
var router = express.Router();
const request = require('request')

const Nylas = require('nylas');

const app = require('../app');
Nylas.config({ clientId: '8tu5utxqfvgbrldmvzwn5q1xp', clientSecret: '8696g5bq72eycuaymi9agn5us'});
options = {
  loginHint: 'you_email@example.com',
  redirectURI: 'http://localhost:3000/callback',
  scopes: ['email.read_only', 'email.send','email.folders_and_labels','email.modify'],
};
auth_url = Nylas.urlForAuthentication(options);

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('connected', { data: {title: 'Success!', authUrl: auth_url, token: app.locals.access_token }});
});

router.get('/createlabel', function(req, res, next){
    var nylas = Nylas.with(app.locals.access_token)
    label = nylas.labels.build();
    label.displayName = 'nylas_challenges8'
    label.save();
    nylas.labels.list().then(labels => {
        //console.log(JSON.stringify(labels[0]))
        console.log(labels)
        for (let i = 0; i < labels.length; i++){
            if (labels[i].displayName == "nylas_challenges8"){
                app.locals.labelId = labels[i].id
                console.log(app.locals.labelId)
            }
        }
    });
    res.redirect('/connected/labelcreated');
})

router.get('/labelcreated', function(req, res, next){
    var nylas = Nylas.with(app.locals.access_token)
    nylas.labels.list().then(labels => {
        //console.log(JSON.stringify(labels[0]))
        for (let i = 0; i < labels.length; i++){
            if (labels[i].displayName == "nylas_challenges8"){
                app.locals.labelId = labels[i].id
                console.log(app.locals.labelId)
            }
        }
    });
    res.render('createlabel', { data: {title: 'Success!', authUrl: auth_url, token: app.locals.access_token }});
})

router.get('/sendemail', function(req, res, next){
    var nylas = Nylas.with(app.locals.access_token)
    const draft = nylas.drafts.build({
        subject: 'With Love, from Nylas',
        body: 'This email was sent using the Nylas email API. Visit https://nylas.com for details.',
        to: [{ name: 'My Nylas Friend', email: 'kgoldfishspam@gmail.com' }]
    });   
    draft.send().then(message => {
    console.log(`${message.id} was sent`);
    app.locals.messageId = message.id
    res.render('sendemail', { data: {title: 'Success!', authUrl: auth_url, token: app.locals.access_token }});
});

router.get('/findemail', function(req, res, next){
    var nylas = Nylas.with(app.locals.access_token)
    nylas.messages.list({to: 'kgoldfishspam@gmail.com', limit: 1}).then(resp => {
        //console.log(JSON.stringify(resp[0].id))
        app.locals.messageId = resp[0].id
        console.log(resp[0])
        //console.log(app.locals.messageId)
        res.redirect('/connected/foundEmail')
    });
    console.log(app.locals.messageId)
    // Get a single message, by its id

    // res.render('sendemail', { data: {title: 'Success!', authUrl: auth_url, token: app.locals.access_token, messageId: app.locals.messageId }});
})
})

router.get('/foundemail', function(req, res, next){
    var nylas = Nylas.with(app.locals.access_token)
    console.log("asdfasdf")
    console.log(app.locals.messageId + " -----messageid")
    console.log(app.locals.labelId + " -----labelId")
    var messageURL = "https://api.nylas.com/messages/"+app.locals.messageId
    var body = JSON.stringify({"label_ids":[`${app.locals.labelId}`, "4x00jvij0w8ekb91yx3zhfgtx"]})
    //console.log(body)
    request.put({
        headers: {'accept' : 'application/json', 'Authorization' : app.locals.access_token},
        url: messageURL,
        body: body
      }, function(error, response, body){
        console.log(response.body)
      });
      res.render('updateemail', { data: {title: 'Success!', authUrl: auth_url, token: app.locals.access_token, messageId: app.locals.messageId }});
});


router.get('/agenda', function(req, res, next){
    app.innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
    res.render('agenda')
});

router.get('/composer', function(req, res, next){
    app.innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
    res.render('composer')
});

router.get('/availability', function(req, res, next){
    app.innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
    res.render('availability')
});

router.get('/scheduler', function(req, res, next){
    //var nylas = Nylas.with(app.locals.access_token)
    res.render('scheduler')
});
router.get('/scheduler-editor', function(req, res, next){
    //var nylas = Nylas.with(app.locals.access_token)
    res.render('scheduler-editor')
});


router.get('/scheduler', function(req, res, next){
    //var nylas = Nylas.with(app.locals.access_token)
    res.render('scheduler')
});

router.get('/mailbox', function(req, res, next){
    //var nylas = Nylas.with(app.locals.access_token)
    res.render('mailbox')
});

router.get('/contact-list', function(req, res, next){
    //var nylas = Nylas.with(app.locals.access_token)
    res.render('contact-list')
});

router.get('/conversation', function(req, res, next){
    //var nylas = Nylas.with(app.locals.access_token)
    res.render('conversation')
});

router.get('/scheduler-component', function(req, res, next){
    //var nylas = Nylas.with(app.locals.access_token)
    res.render('scheduler-component')
});
router.get('/email', function(req, res, next){
    //var nylas = Nylas.with(app.locals.access_token)
    res.render('email')
});
module.exports = router;
