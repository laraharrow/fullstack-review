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
  username: String,
  repoName: String,
  repoUrl: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

const findRepos = (callback) => {
	Repo.find((err, repoData) => {
		if(err) { console.error(err)}
		callback(repoData);	
	})
}

// const findRepos = (callback) => {
// 	Repo.find({}).
// 	sort('-watchers').
// 	limit(25).
// 	exec(err, repoData) => {
// 		if(err) { console.error(err)}	
// 		callback(repoData);	
// 	})
// }

const save = (username, repoName, repoUrl, watchers, callback) => {

	Repo.find({name: username}, (err, user) => {
		
		if (user.length) {
			Repo.update({name: name}, newRepo);
		} else {

			var newRepo = new Repo ({
				username: username,
			  repoName: repoName,
			  repoUrl: repoUrl,
			  watchers: watchers
			});

			newRepo.save( (err, newRepo) => {
				if (err) { console.log(err); }
				callback(newRepo);
			})	
		}
	})

}

module.exports.findRepos = findRepos;
module.exports.save = save;