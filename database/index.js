const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

let repoSchema = mongoose.Schema({
  name: String,
  repos: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (callback) => {
	
	var newRepo = new Repo ({
		name: name,
		repos: owner.repos_url,
		watchers: watchers
	})

	newRepo.save( (err, newRepo) => {
		if (err) { console.log(err); }
		callback(newRepo);
	})
		
}

module.exports.save = save;