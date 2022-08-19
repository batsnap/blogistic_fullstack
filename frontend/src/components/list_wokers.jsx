import React from "react";
import jwtDecode from "jwt-decode";	
const axios = require('axios');
class WorkersList extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
		post: [],
	  };
	  this.sorting_id=this.sorting_id.bind(this);
	  this.sorting_experience=this.sorting_experience.bind(this);
	  this.sorting_name=this.sorting_name.bind(this);
	  this.sorting_position=this.sorting_position.bind(this);
	  this.sorting_phone_number=this.sorting_phone_number.bind(this);
	}
	sorting_id(){
	  this.setState({post:this.state.post.sort((a, b) => a.id_operator > b.id_operator ? 1:-1)});
	}
	sorting_name(){
	  this.setState({post:this.state.post.sort((a, b) => a.Full_name > b.Full_name ? 1:-1)});
	}
	sorting_experience(){
	  this.setState({post:this.state.post.sort((a, b) => a.experience > b.experience ? 1:-1)});
	}
	sorting_position(){
	  this.setState({post:this.state.post.sort((a, b) => a.position > b.position ? 1:-1)});
	}
	sorting_phone_number(){
	  this.setState({post:this.state.post.sort((a, b) => a.phone_number > b.phone_number ? 1:-1)});
	}

	componentDidMount() 
	{
	if (Math.round(new Date().getTime()/1000.0)<jwtDecode(localStorage.token)['exp'])
	  	{
				
			fetch("http://localhost:8000/api/Workers/",
			{
			'method':'get',
			'headers':{
			'Authorization':"Bearer "+localStorage.token}
			})
			.then(res =>res.json())
			.then(
				(result) => 
				{
					this.setState({
					post: result
					});
				})
		}
		else
		{
			axios.post('http://localhost:8000/api/token/refresh',{'refresh':localStorage.refresh})
			.then(res=>
			{
			localStorage.setItem('token',res.data.access);
			});
			console.log(10);
			window.location.replace('/Operators');
		}
	}
	render() {
	  if (this.state.post.code==="token_not_valid"){
		return(
		  <div className="col-sm-8 text-center">
			<h3>Yo are not log in</h3>
		  </div>
		)
	  }
	  else{
	  return (
		
		  <div className="col-sm-8 text-center bg-info text-light ">
		  <table className="table">
			<thead>
			  <tr>
				<th><button className="btn btn-info" onClick={this.sorting_id}>        id</button></th>
				<th><button className="btn btn-info" onClick={this.sorting_name}>      Full name</button></th>
				<th><button className="btn btn-info" onClick={this.sorting_experience}>  experience</button></th>
				<th><button className="btn btn-info" onClick={this.sorting_position}>      position</button></th>
				<th><button className="btn btn-info" onClick={this.sorting_phone_number}>      phone_number</button></th>
			  </tr>
			</thead>
			<tbody>
			  {this.state.post.map(posts=>
				  <tr>
					<td><a href={"operators/"+posts.id_worker} key={posts.id_worker} className="text-light">{posts.id_worker }</a></td>
					<td>{posts.Full_name}</td>
					<td>{posts.experience}</td>
					<td>{posts.position}</td>
					<td>{posts.phone_number}</td>
				  </tr>
			  )}
			</tbody>
		  </table>
		  </div>
		  
		);
	  }
	}
	};
export default WorkersList;