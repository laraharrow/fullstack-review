const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;

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

let save = (name, repos, watches, callback) => {
	findUser(name);
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

const findUser = (user, callback) => {
	Repo.find({user: user}, (err, repo) => {
		if (err) { console.log(err); }
		console.log(repo);
	});
	
}

module.exports.save = save;