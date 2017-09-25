import React from 'react';

class RepoList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
		  <div>
		    <h4> Repo List Component </h4>
		    There are {this.props.repos.length} repos.
		    <br/>
		    <br/>
		    <div>
					{this.props.repos.map((data, i) => {
						if (i <= 25) {
							return (
								<h3 key={data._id}> {data.watchers} - {data.username} || <a href={`${data.repoUrl}`}>{data.repoName}</a></h3> 
							)
						}	
					})}
				</div>			    
		  </div>
	  )
	}
}

export default RepoList;
