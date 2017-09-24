import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <br/>
    <br/>
	  {this.props.repos.map((data) => (
   		<h3 key={item._id}>{this.props.data.username}</h3>	
   	))}
  </div>
)

export default RepoList;


//| {this.props.data.repoName} | {this.props.data.repoUrl}
