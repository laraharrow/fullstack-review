const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  // reposArr => [0] = repo name, [1] = repo url, [2] = watchers count;
  var reposArr = [];
  var username;
  request(options, (err, res, data) => {
    if (!err && res.statusCode === 200) {
      //console.log('parsedData on request: ', JSON.parse(data));
      var GHData = JSON.parse(data);
      username = GHData[0].owner.login;
      GHData.forEach((repo) => {
        reposArr.push([repo.name, repo.owner.repos_url, repo.watchers]);
      });
    }
    callback(username, reposArr);
  })
}

module.exports.getReposByUsername = getReposByUsername;



