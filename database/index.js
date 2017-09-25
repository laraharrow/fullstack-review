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
	Repo.find({}).
	sort('-watchers').
	//limit(25).
	exec((err, repoData) => {
		if(err) { console.error(err)}	
		callback(repoData);	
	})
}



const save = (reposArr, callback) => {

	Repo.remove({name: reposArr[0].username}, async (err) => {
	
		for (var repo of reposArr) {	
	
			var newRepo = new Repo ({
				username: repo.username,
			  repoName: repo.repoName,
			  repoUrl: repo.repoUrl,
			  watchers: repo.watchers
			});

			await newRepo.save();	
		}
		callback('repos saved')	
	})

}

module.exports.findRepos = findRepos;
module.exports.save = save;