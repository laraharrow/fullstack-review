import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/repos',
      success: (data) => {
        console.log('get req response: ', data);
        // var reposUrl = [];
        // data.forEach((repo) => {
        //   reposUrl.push([repo.username, repo.repoName, repo.repoUrl])
        // })
        this.setState({
          repos: data
        });  

      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: 'POST',
      url: '/repos', 
      data: {term: term},
      success: function(data) { console.log('this is data in client post req', data); },
      error: function(error) { console.log('this is error in client post req', error); }
    });  
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));