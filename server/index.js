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
  helper.getReposByUsername(req.body.term, (reposArr) => {
    	db.save(reposArr, (data) => {
      	//console.log('data stored on db: ', data);
  	    res.send('it worked!');
      });
  });
  
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
	db.findRepos((data) => {
		console.log('server get request: ', data)
		res.send(data);
	});
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

