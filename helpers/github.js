const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username, callback) => {
  
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, data) => {
    if (!err && res.statusCode === 200) {
      var GHData = JSON.parse(data);
      var username = GHData[0].owner.login;
      var reposArr = [];
      GHData.forEach((repo) => {
        reposArr.push({username: username, repoName: repo.name, repoUrl: repo.html_url, watchers: repo.watchers});
      });
      callback(reposArr);
    }
  })
}

module.exports.getReposByUsername = getReposByUsername;



