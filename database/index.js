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
  repos: Array,
});

let Repo = mongoose.model('Repo', repoSchema);

const findUser = (user, callback) => {
	Repo.find({name: user}, (err, repo) => {
		if (err) { console.log(err); }
		callback(repo);
	});
}

const save = (name, reposArr, callback) => {

	var newRepo = new Repo ({
		name: name,
		repos: reposArr,
	})

	newRepo.save( (err, newRepo) => {
		if (err) { console.log(err); }
		callback(newRepo);
	})	
}


module.exports.save = save;