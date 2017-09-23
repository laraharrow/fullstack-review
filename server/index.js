const express = require('express');
const bodyParser = require('body-parser');
const helper = require('../helpers/github.js');
const db = require('../database/index.js');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/repos', function (req, res) {
  //console.log('this is the post req body on the server: ', req.body);
  console.log('username on server: ', req.body.term)
  helper.getReposByUsername(req.body.term, (username, reposArr) => {
  	db.save(username, reposArr, (data) => {
    	console.log('data stored on db: ', data);
  	});
  });
  
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

